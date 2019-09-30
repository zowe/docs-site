# Java REST APIs service without Spring Boot

This article is a part of a guides series, whcih outline REST API services onboarding process on (Zowe) API-ML (API-ML for short).

In order to onboard a REST style <font color='green'>service</font> on API-ML, it is necessary to:
*  provide service discovery information including base URI, home page, status page and health check end-point
* provide routing metadata of all service end-points for the API ML Gateway
* provide service description and API documentation metadata for the API Catalog
* register the service with (Zowe) Discovery Service instance using all the above 

All the actions above can be achieved by preparing the corresponding data and calling directly a REST end-point of Eureka Discovery service. An other option is to use <font color='green'>(one of)</font> our API-ML enabler library/ies which make this task significantly easier. 

This guide describes a step-by-step process of onboarding a REST API <font color='yellow'>application</font>/<font color="green">service</font> built using plain Java language (without Spring Boot or SpringFramework dependencies). For instructions how to utilize other types of API-ML enablers, please follow the links bellow:

* [Spring Boot API-ML Enabler](api-mediation-onboard-a-spring-boot-rest-api-service.md)
* [Existing REST API Service - no code changes needed](api-mediation-onboard-an-existing-rest-api-service-without-code-changes.md) (deprecated)

**Follow these steps:**
1. [Project configuration](#project-configuration)
    * [Gradle guide](#gradle-guide)
    * [Maven guide](#maven-guide)
2. [(Optional) Add Swagger API documentation to your project](#optional-add-swagger-api-documentation-to-your-project)

3. [Add API-ML integration endpoints to your service](#add-endpoints-to-your-api-for-api-mediation-layer-integration)

4. [Add Discovery Client configuration](#add-configuration-for-discovery-client)

5. [Add a context listener](#add-a-context-listener)
    * [Add a context listener class](#add-a-context-listener-class)
    * [Register a context listener](#register-a-context-listener)

6. [Run your service](#run-your-service)

7. [Validate your REST service is discoverable by the API ML Discovery Service](#optional-validate-discovery-of-the-api-service-by-the-discovery-service)

**Notes:** 
* Some steps are shared with onboarding process of other types of API services. The common steps are marked as <font color='green'>(COM)</font>*
* The plain Java enabler library can be used in projects based on SpringFramework or Spring Boot framework. It should not be used iin projects depending on Netflix Spring Cloud components.
<font color='yellow'>
* This guide describes how to generate Swagger API documentation using a Springfox library.
* If you use another framework that is based on a Servlet API, you can use `ServletContextListener` that is described later in this article.
* If you use a framework that does not have a `ServletContextListener` class, see the [add context listener](#add-a-context-listener) section in this article for details about how to register and unregister your service with the API-ML.
</font>

# Prerequisites
* Your REST API service written in Java can be deployed and run on z/OS.
* The service has an endpoint that generates Swagger documentation.
* The service is secured by digital certificate according to TLS v?.? specification


## Project configuration

You can use either Gradle or Maven build automation systems. 

### Gradle guide
Use the following procedure if you use Gradle as your build automation system.

**Follow these steps:**

1.  If not already exists, create a *gradle.properties* file in the root of your project.
 
2.  In the *gradle.properties* file, set the URL of the <font color="yellow">ZOWE (aka Giza)</font> Artifactory, containing the plain java enabler artifact. Use the credentials in the following code block to gain access to the Maven repository:

    ```ini
    # Repository URL for getting the enabler-java artifact
    artifactoryMavenRepo=https://gizaartifactory.jfrog.io/gizaartifactory/libs-release
    
    # Artifactory credentials for builds:
    mavenUser=apilayer-build
    mavenPassword=lHj7sjJmAxL5k7obuf80Of+tCLQYZPMVpDob5oJG1NI=
    ```

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
    implementation "com.ca.mfaas.sdk:mfaas-integration-enabler-java:$zoweApimlVersion")
    ```
*Note* At time of writing this guide, ZoweApimlVersion is '1.1.11'. Adjust accordnigly.
 

5.  In your project home directory, run `gradle clean build` command to build your project. Alternatively you may run gradlew to use gradle version specificly working for your project.

<font color="red">**TODO** What gradle version is minimum required for Plain Java Enabler?</font>


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

    This file specifies the URL of the repository of the Artifactory where you download the enabler-java artifacts.

2.  In the same `pom.xml` file, copy the following *xml* tags to add the enabler-java artifact as a dependency of your project:
    ```xml
    <dependency>
        <groupId>com.ca.mfaas.sdk</groupId>
        <artifactId>mfaas-integration-enabler-java</artifactId>
        <version>1.1.2</version>
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

## (Optional) Add Swagger API documentation to your project
If your application already has Swagger API documentation enabled, skip this step. 
Use the following procedure if your application does not have Swagger API documentation.

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
3.  Customize this configuration according to your specifications. For more information about customization properties, 
see [Springfox documentation](https://springfox.github.io/springfox/docs/snapshot/#configuring-springfox).

## Add endpoints to your API for API-ML integration
To integrate your service with the API-ML, add the following endpoints to your application:
* **Swagger documentation endpoint**

    The endpoint for the Swagger documentation.

* **Health endpoint**

    The endpoint used for health checks by the Discovery Service.

* **Info endpoint**

    The endpoint to get information about the service.

The following java code is an example of these endpoints added to the Spring Controller:

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

## Add configuration for Discovery client
After you add API-ML integration endpoints, you are ready to add service configuration for Discovery client.

**Follow these steps:**
1.  Create the file `service-configuration.yml` in your resources directory.

2.  Add the following configuration to your `service-configuration.yml`:

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
    routes:
        - gatewayUrl: api/v1
          serviceUrl: /hellospring/api/v1    
    apiInfo:
        - apiId: ${mfaas.discovery.serviceId}
          gatewayUrl: api/v1
          swaggerUrl: ${mfaas.server.scheme}://${mfaas.service.hostname}:${mfaas.server.port}${mfaas.server.contextPath}/api-doc
          documentationUrl: https://zowe.github.io/docs-site
    catalogUiTile:
        id: helloworld-spring
        title: HelloWorld Spring REST API
        description: Proof of Concept application to demonstrate exposing a REST API in the MFaaS ecosystem
        version: 1.0.0
    ```
3.  Customize your configuration parameters to correspond with your API service specifications.

    The following list describes the configuration parameters:
    * **serviceId**
    
        Specifies the service instance identifier that is registered in the API-ML installation. 
        The service ID is used in the URL for routing to the API service through the gateway. 
        The service ID uniquely identifies instances of a microservice in the API-ML. 
        The system administrator at the customer site defines this parameter.
        
        **Important!**  Ensure that the service ID is set properly with the following considerations:
    
        * When two API services use the same service ID, the API Gateway considers the services to be clones. An incoming API request can be routed to either of them.
        * The same service ID should be set only for multiple API service instances for API scalability.
        * The service ID value must contain only lowercase alphanumeric characters.
        * The service ID cannot contain more than 40 characters.
        * The service ID is linked to security resources. Changes to the service ID require an update of security resources.
        
        **Examples:**
        * If the customer system administrator sets the service ID to `sysviewlpr1`, the API URL in the API Gateway appears as the following URL: 
            ```
            https://gateway:port/api/v1/sysviewlpr1/endpoint1/...
            ```
        * If a customer system administrator sets the service ID to vantageprod1, the API URL in the API Gateway appears as the following URL:
            ```
            http://gateway:port/api/v1/vantageprod1/endpoint1/...
            ```
    * **title**
    
        Specifies the human readable name of the API service instance (for example, "Endevor Prod" or "Sysview LPAR1"). This value is displayed in the API Catalog when a specific API service instance is selected. This parameter is externalized and set by the customer system administrator.

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
    
        Specifies the public URL of the Discovery Service. The system administrator at the customer site defines this parameter. 
    
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
    
    * **apiInfo.apiId**

        Specifies the API identifier that is registered in the API-ML installation.
        The API ID uniquely identifies the API in the API-ML.
        The same API can be provided by multiple services. The API ID can be used
        to locate the same APIs that are provided by different services.
        The creator of the API defines this ID.
        The API ID needs to be a string of up to 64 characters
        that uses lowercase alphanumeric characters and a dot: `.`.
        We recommend that you use your organization as the prefix.

    * **apiInfo.gatewayUrl**

        The base path at the API Gateway where the API is available. Ensure that this is
        the same path as the _gatewayUrl_ value in the _routes_ sections.

    * **apiInfo.swaggerUrl**

        (Optional) Specifies the HTTP or HTTPS address where the Swagger JSON document is available. 
        
    * **apiInfo.documentationUrl**

        (Optional) Link to external documentation, if needed. The link to the external documentation can be included along with the Swagger documentation.

    * **catalogUiTile.id**
    
        Specifies the unique identifier for the API services product family. 
        This is the grouping value used by the API-ML to group multiple API services 
        together into "tiles". 
        Each unique identifier represents a single API Catalog UI dashboard tile. 
        Specify a value that does not interfere with API services from other products.
    
    * **catalogUiTile.title**
    
        Specifies the title of the API services product family. This value is displayed in the API catalog UI dashboard as the tile title.
    
    * **catalogUiTile.description**
    
        Specifies the detailed description of the API services product family. 
        This value is displayed in the API catalog UI dashboard as the tile description.
    
    * **catalogUiTile.version**
    
        Specifies the semantic version of this API Catalog tile. 
        Increase the number of the version when you introduce new changes to the product family details of the API services 
        including the title and description.

## Add a context listener
The context listener invokes the `apiMediationClient.register(config)` method to register the application with 
the API-ML when the application starts. The context listener also invokes the `apiMediationClient.unregister()` method 
before the application shuts down to unregister the application in API-ML.

**Note:** If you do not use a Java Servlet API based framework, you can still call the same methods for `apiMediationClient` 
to register and unregister your application.

### Add a context listener class
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

### Register a context listener
Register a context listener to start Discovery client. Add the following code block to the 
deployment descriptor `web.xml` to register a context listener:
``` xml
<listener>
    <listener-class>com.ca.mfaas.hellospring.listener.ApiDiscoveryListener</listener-class>
</listener>
```


## Setup key store with the service certificate

All API services require a certificate that is trusted by API-ML in order to register with it.

**Follow these steps:**

1. Follow instructions at [Generating certificate for a new service on localhost](https://github.com/zowe/api-layer/tree/master/keystore#generating-certificate-for-a-new-service-on-localhost)

    If the service runs on localhost, the command uses the following format:

       <api-layer-repository>/scripts/apiml_cm.sh --action new-service --service-alias localhost --service-ext SAN=dns:localhost.localdomain,dns:localhost --service-keystore keystore/localhost.keystore.p12 --service-truststore keystore/localhost.truststore.p12 --service-dname "CN=Sample REST API Service, OU=Mainframe, O=Zowe, L=Prague, S=Prague, C=Czechia" --service-password password --service-validity 365 --local-ca-filename <api-layer-repository>/keystore/local_ca/localca    

    Alternatively, copy or use the `<api-layer-repository>/keystore/localhost.truststore.p12` in your service without generating a new certificate, for local development.

2. Update the configuration of your service `service-configuration.yml` to contain the HTTPS configuration by adding the following code:

    ```
        ssl:
            protocol: TLSv1.2
            ciphers: TLS_RSA_WITH_AES_128_CBC_SHA,TLS_DHE_RSA_WITH_AES_256_CBC_SHA,TLS_ECDH_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDH_RSA_WITH_AES_256_CBC_SHA384,TLS_ECDH_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDH_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA256,TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA384,TLS_ECDH_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDH_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_EMPTY_RENEGOTIATION_INFO_SCSV
            keyAlias: localhost
            keyPassword: password
            keyStore: keystore/localhost.keystore.p12
            keyStoreType: PKCS12
            keyStorePassword: password
            trustStore: keystore/localhost.truststore.p12
            trustStoreType: PKCS12
            trustStorePassword: password
     eureka:
         instance:
             nonSecurePortEnabled: false
             securePortEnabled: true
    ```
**Note:** You need to define both key store and trust store even if your server is not using HTTPS port.

## Run your service
After you add all configurations and controllers, you are ready to run your service in the API-ML ecosystem.

**Follow these steps:**

1.  Run the following services to onboard your application: 
    
    * Gateway Service  
    * Discovery Service
    * API Catalog Service

    **Tip:** For more information about how to run the API-ML locally, 

    see [Running the API-ML on Local Machine.](https://github.com/zowe/api-layer/blob/master/docs/local-configuration.md)


2.  Run your Java application. 

    **Tip:** Wait for the Discovery Service to discover your service. This process may take a few minutes.

3.  Go to the following URL to reach the API Catalog through the Gateway (port 10010):
    ```
    https://localhost:10010/ui/v1/apicatalog/
    ``` 

You successfully onboarded your Java application with the API-ML if your service is running and you can access the API documentation. 

## (Optional) Validate discovery of the API service by the Discovery Service
If your service is not visible in the API Catalog, you can check if your service is discovered by the Discovery Service.

**Follow these steps:**

1. Go to `http://localhost:10011`. 
2. Enter *eureka* as a username and *password* as a password.
3. Check if your application appears in the Discovery Service UI.

If your service appears in the Discovery Service UI but is not visible in the API Catalog, check to ensure 
that your configuration settings are correct. 
