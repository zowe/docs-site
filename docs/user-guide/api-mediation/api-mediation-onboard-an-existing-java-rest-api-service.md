# Onboarding an existing Java Spring REST API service without Spring Boot 

As an API developer, use this guide to onboard your Java Spring REST API service that is built without Spring Boot into the Zowe API Mediation Layer. This article outlines a step-by-step process to make your API service available in the API Mediation Layer.

The following procedure is an overview of steps to onboard a Java REST API application with the API Mediation Layer. 

**Follow these steps:**

1. [Get enablers from the Artifactory](#get-enablers-from-the-artifactory)
2. [(Optional) Add Swagger Documentation to your project](#optional-add-swagger-documentation-to-your-project)
3. [Add endpoints to your API for API Mediation Layer integration](#add-endpoints-to-your-api-for-api-mediation-layer-integration)
4. [Add Eureka client configuration](#add-eureka-client-configuration)
5. [Add context listener](#add-context-listener)
6. [Run your service](#run-your-service)
7. [(Optional) Validate discovery of the API service by the Discovery Service](#optional-validate-discovery-of-the-api-service-by-the-discovery-service)

## Get enablers from the Artifactory

The first step to onboard a Java REST API into the Zowe ecosystem is to get enabler annotations from the Artifactory. Enablers prepare your service for discovery in the API Mediation Layer and for the retrieval of Swagger documentation.

You can use either Gradle or Maven build automation systems. 

### Gradle guide
Use the following procedure if you use Gradle as your build automation system.

**Tip:** To migrate from Maven to Gradle, go to your project directory and run `gradle init`. This converts the Maven build to a Gradle build by generating a *setting.gradle* file and a *build.gradle* file.

**Follow these steps:**

1.  Create a *gradle.properties* file in the root of your project.
 
2.  In the *gradle.properties* file, set the following URL of the repository and customize the values of your credentials to access the repository:

    ```ini
    # Repository URL for getting the enabler-java artifact
    artifactoryMavenRepo=https://gizaartifactory.jfrog.io/gizaartifactory/libs-release
   
    # Artifactory credentials for builds:
    mavenUser={username}
    mavenPassword={password}
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
   
4. In the same `build.gradle` file, add the following code to the dependencies code block to add the enabler-java artifact as a dependency of your project:

    ```gradle
    compile(group: 'com.ca.mfaas.sdk', name: 'mfaas-integration-enabler-java', version: '0.2.0')
    ```

5. In your project directory, run the `gradle build` command to build your project.

### Maven guide

Use the following procedure if you use Maven as your build automation system.

**Tip:** To migrate from Gradle to Maven, go to your project directory and run `gradle install`. This command automatically generates a `pom-default.xml` inside the `build/poms` subfolder where all of the dependencies are contained. 

**Follow these steps:**

1. Add the following *xml* tags within the newly created `pom.xml` file:

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

2. In the same `pom.xml` file, copy the following *xml* tags to add the enabler-java artifact as a dependency of your project:
   ```xml
    <dependency>
        <groupId>com.ca.mfaas.sdk</groupId>
        <artifactId>mfaas-integration-enabler-java</artifactId>
        <version>0.2.0</version>
    </dependency>
   ```
3. Create a `settings.xml` file and copy the following *xml* code block which defines the credentials for the Artifactory:
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>

    <settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      https://maven.apache.org/xsd/settings-1.0.0.xsd">
    <servers>
        <server>
           <id>libs-release</id>
           <username>{username}</username>
           <password>{password}</password>
        </server>
    </servers>
    </settings>
    ```
4. Copy the `settings.xml` file inside the `${user.home}/.m2/` directory.

5. In the directory of your project, run the `mvn package` command to build the project.

##(Optional) Add Swagger Documentation to your project
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
                    "Spring REST API documentation",
                    "1.0.0",
                    "",
                    new Contact("Company", "http://example.com", ""),
                    "MIT",
                    "https://opensource.org/licenses/MIT",
                    new ArrayList<>()
                ));
        }
    }
    ```
    Change this configuration according to [Springfox documentation](https://springfox.github.io/springfox/docs/snapshot/#configuring-springfox).

## Add endpoints to your API for API Mediation Layer integration
You need to add several endpoints to your application for integration with the API Mediation Layer:
* **Swagger documentation endpoint**
    
    The endpoint for the Swagger documentation
    
* **Health endpoint**

    Endpoint used for health checks by the Discovery Service

* **Info endpoint**

    Endpoint to get information about the service

The following java code is an example of adding these endpoints with Spring Controller:

**Example:**

```java
package com.ca.mfaas.hellospring.controller;

import com.ca.mfaas.eurekaservice.model.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ResourceBundle;

@Controller
@ApiIgnore
public class MfaasController {
    private static ResourceBundle eurekaProperties = ResourceBundle.getBundle("eureka-client");

    @GetMapping("/api/v1/api-doc")
    public String apiDoc() {
        return "forward:/v2/api-docs";
    }

    @GetMapping("/application/health")
    public @ResponseBody Health getHealth() {
        return new Health("UP");
    }

    @GetMapping("/application/info")
    public @ResponseBody InstanceInfo getDiscoveryInfo() {
        return new InstanceInfo(

            new App(
                eurekaProperties.getString("eureka.metadata.mfaas.api-info.apiVersionProperties.v1.title"),
                eurekaProperties.getString("eureka.metadata.mfaas.api-info.apiVersionProperties.v1.description"),
                eurekaProperties.getString("eureka.metadata.mfaas.api-info.apiVersionProperties.v1.version")
            ),

            new MFaasInfo(
                new DiscoveryInfo(
                    eurekaProperties.getString("eureka.service.hostname"),
                    Boolean.valueOf(eurekaProperties.getString("eureka.securePortEnabled")),
                    eurekaProperties.getString("eureka.name"),
                    Integer.valueOf(eurekaProperties.getString("eureka.port")),
                    "CLIENT",
                    eurekaProperties.getString("eureka.name"),
                    Boolean.TRUE,
                    eurekaProperties.getString("eureka.metadata.mfaas.discovery.catalogUiTile.description")
                )
            )
        );
    }
}
```

## Add Eureka client configuration
Add the following `eureka-client.properties` file to your resources directory:

```ini
server.contextPath=/hellospring
eureka.registration.enabled=true
eureka.decoderName=JacksonJson
eureka.region=default
eureka.name=hellospring
eureka.vipAddress=hellospring
eureka.port=10020
eureka.shouldUseDns=false
eureka.serviceUrl.default=http://eureka:password@localhost:10011/eureka
eureka.shouldOnDemandUpdateStatusChange=false
eureka.validateInstanceId=false

eureka.service.hostname=localhost
eureka.service.ipAddress=127.0.0.1
eureka.nonSecurePortEnabled=true
eureka.securePortEnabled=false
eureka.lease.duration=6
eureka.lease.renewalInterval=5
eureka.preferIpAddress=false
eureka.statusPageUrl=http://localhost:10020/hellospring/application/info
eureka.healthCheckUrl=http://localhost:10020/hellospring/application/health
eureka.homePageUrl=

# API Documentation endpoint
eureka.metadata.routed-services.apidoc.gateway-url=api/v1/api-doc
eureka.metadata.routed-services.apidoc.service-url=/hellospring/api-doc

# API mapping
eureka.metadata.routed-services.api.gateway-url=api/v1/
eureka.metadata.routed-services.api.service-url=/hellospring/api/v1

eureka.metadata.mfaas.api-info.apiVersionProperties.v1.title=HelloWorld Spring
eureka.metadata.mfaas.api-info.apiVersionProperties.v1.description=REST API for a Spring Application
eureka.metadata.mfaas.api-info.apiVersionProperties.v1.version=1.0.0

eureka.metadata.mfaas.discovery.catalogUiTile.id=helloworld-spring
eureka.metadata.mfaas.discovery.catalogUiTile.title=HelloWorld Spring REST API
eureka.metadata.mfaas.discovery.catalogUiTile.description=Proof of Concept application to demonstrate exposing a REST API in the MFaaS ecosystem
eureka.metadata.mfaas.discovery.catalogUiTile.version=1.0.0
eureka.metadata.mfaas.discovery.service.title=HelloWorld Spring REST API
eureka.metadata.mfaas.discovery.service.description=P.O.C for exposing a Spring REST API

eureka.client.client.refresh.interval=5
eureka.client.appinfo.initial.replicate.time=5
eureka.client.appinfo.replicate.interval=5
eureka.client.serviceUrldefaultZone=http://eureka:password@localhost:10011/eureka/
eureka.client.healthcheck.enabled=false
```

## Add context listener

Register the listener to start Eureka client. Reference the listener by adding the following code block to the deployment descriptor `web.xml`.
``` xml
<listener>
    <listener-class>com.ca.mfaas.eurekaservice.RestEurekaListener</listener-class>
</listener>
```

## Run your service

After adding all configurations and controllers, you are ready to run your service in the API Mediation Layer Ecosystem.

**Follow these steps:**

1. Run the following services to onboard your application:

    **Tip:** For more information about how to run the API Mediation Layer locally, see [Running the API Mediation Layer on Local Machine.](https://github.com/gizafoundation/api-layer/blob/master/docs/local-configuration.md) 
    
    * Gateway Service  
    * Discovery Service
    * API Catalog Service

2. Run your Java application. 

    **Tip:** Wait for the services to be ready. This process may take a few minutes.

3. Go to the following URL to reach the API Catalog through the Gateway (port 10010):
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
