# Onboard an existing Java REST API service without Spring Boot 

As an API developer, use this guide to onboard a Java REST API service that is built without Spring Boot with the Zowe API Mediation Layer. This article outlines a step-by-step process to onboard a Java REST API application with the API Mediation Layer. More detail about each of these steps is described later in this article.

**Follow these steps:**
1. [Get enablers from the Artifactory](#get-enablers-from-the-artifactory)
    * [Gradle guide](#gradle-guide)
    * [Maven guide](#maven-guide)
2. [(Optional) Add Swagger Documentation to your project](#optional-add-swagger-documentation-to-your-project)
3. [Add endpoints to your API for API Mediation Layer integration](#add-endpoints-to-your-api-for-api-mediation-layer-integration)
4. [Add configuration for Eureka client](#add-configuration-for-eureka-client)
5. [Add context listener](#add-context-listener)
    1. [Add context listener class](#add-context-listener-class)
    2. [Register a listener](#register-a-listener)
6. [Run your service](#run-your-service)
7. [(Optional) Validate discovery of the API service by the Discovery Service](#optional-validate-discovery-of-the-api-service-by-the-discovery-service)

**Notes:** 
* This onboarding procedure uses the Spring framework for implementation of a REST API service, and describes how to generate Swagger documentation using a Springfox library.
* If you use another framework that is based on a Servlet API, you can use `ServletContextListener` that is described later in this article.
* If you use a framework that does not have a `ServletContextListener` class, check the [add context listener](#add-context-listener) section for details about how to register and unregister your service in the API Mediation Layer.

# Prerequisites
* Ensure that your REST API service that is written in Java.
* Ensure that your service has an endpoint that generates Swagger documentation. 

## Get enablers from the Artifactory

The first step to onboard a Java REST API into the Zowe ecosystem is to get enabler annotations from the Artifactory. Enablers prepare your service for discovery in the API Mediation Layer and for the retrieval of Swagger documentation.

You can use either Gradle or Maven build automation systems. 

### Gradle guide
Use the following procedure if you use Gradle as your build automation system.

**Follow these steps:**

1.  Create a *gradle.properties* file in the root of your project.
 
2.  In the *gradle.properties* file, set the following URL of the repository and customize the values of your credentials to access the repository:

    ```ini
    # Repository URL for getting the enabler-java artifact
    artifactoryMavenRepo=https://gizaartifactory.jfrog.io/gizaartifactory/libs-release
    
    # Artifactory credentials for builds:
    mavenUser=apilayer-build
    mavenPassword=lHj7sjJmAxL5k7obuf80Of+tCLQYZPMVpDob5oJG1NI=
    ```

    This file specifies the URL for the repository of the Artifactory. The enabler-java artifacts are downloaded from this repository.

3.  Add the following Gradle code block to the `build.gradle` file:

    ```gradle
    ext.mavenRepository = {
        maven {
            url artifactoryMavenSnapshotRepo
            credentials {
                username mavenUser
                password mavenPassword
            }
        }
    }

    repositories mavenRepositories
    ```

    The `ext` object declares the `mavenRepository` property. This property is used as the project repository. 

4.  In the same `build.gradle` file, add the following code to the dependencies code block to add the enabler-java artifact as a dependency of your project:
    ```gradle
    compile(group: 'com.ca.mfaas.sdk', name: 'mfaas-integration-enabler-java', version: '0.2.0')
    ```

5.  In your project directory, run the `gradle build` command to build your project.

### Maven guide

Use the following procedure if you use Maven as your build automation system.

**Follow these steps:**

1.  Add the following *xml* tags within the newly created `pom.xml` file:
    ```xml
    <repositories>
        <repository>
            <id>libs-release</id>
            <name>libs-release</name>
            <url>https://gizaartifactory.jfrog.io/gizaartifactory/libs-release</url>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
    </repositories>
    ```

    This file specifies the URL for the repository of the Artifactory where you download the enabler-java artifacts.

2.  In the same `pom.xml` file, copy the following *xml* tags to add the enabler-java artifact as a dependency of your project:
    ```xml
    <dependency>
        <groupId>com.ca.mfaas.sdk</groupId>
        <artifactId>mfaas-integration-enabler-java</artifactId>
        <version>0.2.0</version>
    </dependency>
    ```
3.  Create a `settings.xml` file and copy the following *xml* code block which defines the credentials for the Artifactory:
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>

    <settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      https://maven.apache.org/xsd/settings-1.0.0.xsd">
    <servers>
        <server>
           <id>libs-release</id>
           <username>apilayer-build</username>
           <password>lHj7sjJmAxL5k7obuf80Of+tCLQYZPMVpDob5oJG1NI=</password>
        </server>
    </servers>
    </settings>
    ```
4.  Copy the `settings.xml` file inside the `${user.home}/.m2/` directory.

5.  In the directory of your project, run the `mvn package` command to build the project.

## (Optional) Add Swagger Documentation to your project
If your application already has Swagger documentation enabled, skip this step. Use the following procedure if your application does not have Swagger documentation.

**Follow these steps:**

1.  Add a Springfox Swagger dependency.

    * For Gradle add the following dependency in `build.gradle`:

        ```gradle
        compile "io.springfox:springfox-swagger2:2.8.0"
        ```
    
    * For Maven add the following dependency in `pom.xml`:
        ```xml
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger2</artifactId>
            <version>2.8.0</version>
        </dependency>
        ```

2.  Add a Spring configuration class to your project:

    ```java
    package com.ca.mfaas.hellospring.configuration;

    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.web.servlet.config.annotation.EnableWebMvc;
    import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
    import springfox.documentation.builders.PathSelectors;
    import springfox.documentation.builders.RequestHandlerSelectors;
    import springfox.documentation.service.ApiInfo;
    import springfox.documentation.service.Contact;
    import springfox.documentation.spi.DocumentationType;
    import springfox.documentation.spring.web.plugins.Docket;
    import springfox.documentation.swagger2.annotations.EnableSwagger2;

    import java.util.ArrayList;

    @Configuration
    @EnableSwagger2
    @EnableWebMvc
    public class SwaggerConfiguration extends WebMvcConfigurerAdapter {
        @Bean
        public Docket api() {
            return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .apiInfo(new ApiInfo(
                    "Spring REST API",
                    "Example of REST API",
                    "1.0.0",
                    null,
                    null,
                    null,
                    null,
                    new ArrayList<>()
                ));
        }
    }
    ```
    Change this configuration according to [Springfox documentation](https://springfox.github.io/springfox/docs/snapshot/#configuring-springfox).

## Add endpoints to your API for API Mediation Layer integration
You need to add several endpoints to your application for integration with the API Mediation Layer:
* **Swagger documentation endpoint**

    The endpoint for the Swagger documentation.

* **Health endpoint**

    The endpoint used for health checks by the Discovery Service.

* **Info endpoint**

    The endpoint to get information about the service.

The following java code is an example of adding these endpoints with Spring Controller:

**Example:**

```java
package com.ca.mfaas.hellospring.controller;

import com.ca.mfaas.eurekaservice.model.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import springfox.documentation.annotations.ApiIgnore;

@Controller
@ApiIgnore
public class MfaasController {

    @GetMapping("/api-doc")
    public String apiDoc() {
        return "forward:/v2/api-docs";
    }

    @GetMapping("/application/health")
    public @ResponseBody Health getHealth() {
        return new Health("UP");
    }

    @GetMapping("/application/info")
    public @ResponseBody ResponseEntity<EmptyJsonResponse> getDiscoveryInfo() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return new ResponseEntity(new EmptyJsonResponse(), headers, HttpStatus.OK);
    }
}
```

## Add configuration for Eureka client
Add the following `service-configuration.yml` file to your resources directory:

```yaml
serviceId: hellospring
title: HelloWorld Spring REST API
description: POC for exposing a Spring REST API
baseUrl: http://localhost:10020/hellospring
homePageRelativeUrl:
statusPageRelativeUrl: /application/info
healthCheckRelativeUrl: /application/health
discoveryServiceUrls:
    - http://eureka:password@localhost:10011/eureka
routedServices:
- gatewayUrl: api/v1
  serviceUrl: /hellospring/api/v1

- gatewayUrl: api/v1/api-doc
  serviceUrl: /hellospring/api-doc
apiInfo:
    title: HelloWorld Spring
    description: REST API for a Spring Application
    version: 1.0.0
catalogUiTile:
    id: helloworld-spring
    title: HelloWorld Spring REST API
    description: Proof of Concept application to demonstrate exposing a REST API in the MFaaS ecosystem
    version: 1.0.0
```

Change configuration parameters to correspond with your API service specifications.
The following list describes the configuration parameters:
* **serviceId**

    Specifies the service instance identifier that is registered in the API Layer installation. 
    The service ID is used in the URL for routing to the API service through the gateway. 
    The service ID uniquely identifies instances of a microservice in the API Mediation Layer. 
    The system administrator at the customer site defines this parameter.
    
    **Important!**  Ensure that the service ID is set properly with the following considerations:

    * When two API services use the same service ID, the API gateway considers the services to be clones. An incoming API request can be routed to either of them.
    * The same service ID should be set only for multiple API service instances for API scalability.
    * The service ID value must contain only lowercase alphanumeric characters.
    * The service ID cannot contain more than 40 characters.
    * The service ID is linked to security resources. Changes to the service ID require an update of security resources.
    
    **Examples:**
    * If the customer system administrator sets the service ID to `sysviewlpr1`, the API URL in the API Gateway appears as the following URL: 
        ```
        https://gateway:port/api/v1/sysviewlpr1/endpoint1/...
        ```
    * If customer system administrator sets the service ID to vantageprod1, the API URL in the API Gateway appears as the following URL:
        ```
        http://gateway:port/api/v1/vantageprod1/endpoint1/...
        ```
* **title**

    Specifies the human readable name of the API service instance (for example, "Endevor Prod" or "Sysview LPAR1"). This value is displayed in the API catalog when a specific API service instance is selected. This parameter is externalized and set by the customer system administrator.

    **Example:**
    
    ![Service Status](diagrams/Service-Status.png)

    **Tip:** We recommend that you provide a specific default value of the `title`.
    Use a title that describes the service instance so that the end user knows the specific purpose of the service instance.

* **description**

    Specifies a short description of the API service.

    **Example:** "CA Endevor SCM - Production Instance" or "CA SYSVIEW running on LPAR1". 

    This value is displayed in the API Catalog when a specific API service instance is selected. This parameter is externalized and set by the customer system administrator.  

    **Tip:** Describe the service so that the end user knows the function of the service.

* **baseUrl**

    Specifies the URL to your service to the REST resource. It will be the prefix for the following URLs:
    
    * **homePageRelativeUrl**
    * **statusPageRelativeUrl**
    * **healthCheckRelativeUrl**. 
    
    **Examples:** 
    * `http://host:port/servicename` for HTTP service
    * `https://host:port/servicename` for HTTPS service

* **homePageRelativeUrl** 

    Specifies the relative path to the home page of your service. The path should start with `/`.
    If your service has no home page, leave this parameter blank.

    **Examples:**
    * `homePageRelativeUrl: ` The service has no home page
    * `homePageRelativeUrl: /` The service has home page with URL `${baseUrl}/`

* **statusPageRelativeUrl**

    Specifies the relative path to the status page of your service.
    This is the endpoint that you defined in the `MfaasController` controller in the `getDiscoveryInfo` method.
    Start this path with `/`.

    **Example:**
    * `statusPageRelativeUrl: /application/info` the result URL will be `${baseUrl}/application/info`
* **healthCheckRelativeUrl**

    Specifies the relative path to the health check endpoint of your service. 
    This is the endpoint that you defined in the `MfaasController` controller in the 
    `getHealth` method. Start this URL with `/`.

    **Example:**
    * `healthCheckRelativeUrl: /application/health`. This results in the URL:
    `${baseUrl}/application/health`

* **discoveryServiceUrls**

    Specifies the public URL of the Discovery Service (Eureka). The system administrator at the customer site defines this parameter. 

    **Example:**
    * `http://eureka:password@141.202.65.33:10311/eureka/`

* **routedServices**

    The routing rules between the gateway service and your service.
    * **routedServices.gatewayUrl**
    
        Both gateway-url and service-url parameters specify how the API service endpoints are mapped to the API
        gateway endpoints. The gateway-url parameter sets the target endpoint on the gateway.
    * **routedServices.serviceUrl**
    
        Both gateway-url and service-url parameters specify how the API service endpoints are mapped to the API
        gateway endpoints. The service-url parameter points to the target endpoint on the gateway.

* **apiInfo.title**

    Specifies the title of your service API.
* **apiInfo.description**

    Specifies the high-level function description of your service API.

* **apiInfo.version**

    Specifies the actual version of the API in semantic format.

* **catalogUiTile.id**

    Specifies the unique identifier for the API services product family. 
    This is the grouping value used by the API Mediation Layer to group multiple API services 
    together into "tiles". 
    Each unique identifier represents a single API Catalog UI dashboard tile. 
    Specify a value that does not interfere with API services from other products.

* **catalogUiTile.title**

    Specifies the title of the API services product family. This value is displayed in the API catalog UI dashboard as the tile title.
    
    **Example:**
    
    ![Expanded Catalog Tile](diagrams/Expanded-Catalog-Tile.png)

* **catalogUiTile.description**

    Specifies the detailed description of the API services product family. 
    This value is displayed in the API catalog UI dashboard as the tile description.

* **catalogUiTile.version**

    Specifies the semantic version of this API Catalog tile. 
    Increase the number of the version when you introduce new changes to the product family details of the API services 
    including the title and description.

## Add context listener
The context listener invokes the `apiMediationClient.register(config)` method to register the application with 
the API Mediation Layer when the application starts. The context listener also invokes the `apiMediationClient.unregister()` method 
before the application shuts down to unregister the application in API Mediation Layer.

**Note:** If you do not use a Java Servlet API based framework, you can still call the same methods for `apiMediationClient` 
to register and unregister your application.
### Add context listener class
Add the following code block to add a context listener class:
```java
package com.ca.mfaas.hellospring.listener;

import com.ca.mfaas.eurekaservice.client.ApiMediationClient;
import com.ca.mfaas.eurekaservice.client.config.ApiMediationServiceConfig;
import com.ca.mfaas.eurekaservice.client.impl.ApiMediationClientImpl;
import com.ca.mfaas.eurekaservice.client.util.ApiMediationServiceConfigReader;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;


public class ApiDiscoveryListener implements ServletContextListener {
    private ApiMediationClient apiMediationClient;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        apiMediationClient = new ApiMediationClientImpl();
        String configurationFile = "/service-configuration.yml";
        ApiMediationServiceConfig config = new ApiMediationServiceConfigReader(configurationFile).readConfiguration();
        apiMediationClient.register(config);
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        apiMediationClient.unregister();
    }
}
```

### Register a listener
Register a listener to start Eureka client. Add the following code block to the 
deployment descriptor `web.xml` to register a listener.
``` xml
<listener>
    <listener-class>com.ca.mfaas.hellospring.listener.ApiDiscoveryListener</listener-class>
</listener>
```

## Run your service
After adding all configurations and controllers, you are ready to run your service in the API Mediation Layer ecosystem.

**Follow these steps:**

1.  Run the following services to onboard your application:

    **Tip:** For more information about how to run the API Mediation Layer locally, see [Running the API Mediation Layer on Local Machine.](https://github.com/gizafoundation/api-layer/blob/master/docs/local-configuration.md) 
    
    * Gateway Service  
    * Discovery Service
    * API Catalog Service

2.  Run your Java application. 

    **Tip:** Wait for the services to be ready. This process may take a few minutes.

3.  Go to the following URL to reach the API Catalog through the Gateway (port 10010):
    ```
    https://localhost:10010/ui/v1/caapicatalog/#/ui/dashboard
    ``` 

    You successfully onboarded your Java application if your service is running and you can access the API documentation. 

## (Optional) Validate discovery of the API service by the Discovery Service
The following procedure enables you to check if your service is discoverable by the Discovery Service.

**Follow these steps:**

1. Go to `http://localhost:10011`. 
2. Enter *eureka* as a username and *password* as a password.
3. Check if your application appears in the Discovery Service UI.

If your service appears in the Discovery Service UI, you successfully finished onboarding your Java REST API service.