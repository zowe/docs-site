# Onboarding a Spring Boot based REST API Service

This guide is part of a series of guides to onboard a REST API service with the Zowe API Mediation Layer. As an API developer, you can onboard your REST API service built with the Spring Boot framework with the Zowe API Mediation Layer. 

**Note:** Before version 1.12, the API ML provided an integration enabler based on Spring Cloud Netflix components. From version 1.12 and later, the enabler has been replaced with new implimentation based on the Plain Java Enabler (PJE) that is not backwards compatiable with the previous enabler versions.

TOC

**Tip:** For more information about how to utilize another API ML enabler, see:
    
<font color="red">TODO: Or actually with an other enabler or without enabler at all</font>
             
  * [Onboard a REST API service with the Plain Java Enabler (PJE)](api-mediation-onboard-an-existing-java-rest-api-service_plain-java-enabler.md) 
  * [Onboard a REST service directly calling eureka with xml configuration](api-mediation-onboard-rest-service-direct-eureka-call.md)  
  * [Onboard an existing REST API service without code changes](api-mediation-onboard-an-existing-rest-api-service-without-code-changes.md)
  * [Java REST APIs service without Spring Boot](api-mediation-onboard-an-existing-java-rest-api-service-without-spring-boot-with-zowe-api-mediation-layer.md)

## Outline of onboarding a REST service using Spring Boot

The following steps outline the overall process to onboard a REST service with the API ML using a Spring Boot enabler. Each step is described in further detail in this article. 

1. [Select a Spring Boot Enabler](#select-an-spring-boot-enabler)

2. [Configuring your project](#configuring-your-project)

    * [Gradle guide](#gradle-guide)
    * [Maven guide](#maven-guide)

3. [Configuring your Spring Boot based service with API ML](#configuring-your-spring-boot-based-service-with-api-ml)

4. [Registering your service with API ML](#registering-your-service-with-api-ml)

5. [Adding API documentation](#adding-api-documentation)

6. (Optional) [Validating your API service discoverability](#validating-the-discoverability-of-your-api-service-by-the-discovery-service) 



## Select a  Spring Boot Enabler

Add to your project build configuration a dependency on Spring Enabler version corresponding to the Spring Boot version, that you use for the whole project:
- onboarding-enabler-spring-v1
- onboarding-enabler-spring-v2

**Note:** The process of onboarding an API service is the same for both Spring Boot enabler versions.

## Configuring your project

Use either _Gradle_ or _Maven_ build automation systems to manage your project builds. 

**Note:** You can download the selected enabler artifact from the Giza Artifactory or  if you decide to build the API ML from source, you are required to publish the enabler artifact to your Artifactory.
 Publish the enabler artifact by using the _Gradle_ tasks provided in the source code. 

### Gradle build automation system
Use the following procedure to use _Gradle_ as your build automation system.

**Follow these steps:**

1. Create a `gradle.properties` file in the root of your project if one does not already exist.
 
2. In the `gradle.properties` file, set the URL of the specific Artifactory containing the _SpringEnabler_ artifact. Provide the corresponding credentials to gain access to the Maven repository. 

    If you are using the Giza Artifactory, use the credentials in the following code block: 

    ```ini
    # Repository URL for getting the enabler-java artifact
    artifactoryMavenRepo=https://gizaartifactory.jfrog.io/gizaartifactory/libs-release
    
    # Artifactory credentials for builds:
    mavenUser=apilayer-build
    mavenPassword=lHj7sjJmAxL5k7obuf80Of+tCLQYZPMVpDob5oJG1NI=
    ```

3. Add the following _Gradle_ code block to the `repositories` section of your `build.gradle` file:

    ```gradle
    repositories {
        ...

        maven {
            url artifactoryMavenRepo
            credentials {
                username mavenUser
                password mavenPassword
            }
        }
    }
    ```
4.  In the same `build.gradle` file, add the necessary dependencies for your service. If you use the _SpringEnabler_ from the Giza Artifactory, add the following code block to your `build.gradle` script: 

<font color="red">TODO#FindOut what name will be SE published under</font>

    ```gradle
    implementation "com.ca.mfaas.sdk:mfaas-integration-enabler-java:$zoweApimlVersion"
    implementation "com.ca.mfaas.sdk:common-service-core:$zoweApimlVersion"
    ```    
    **Note:** The published artifact from the Giza Artifactory also contains the enabler dependencies from other software packages. If you are using an Artifactory other than Giza, manually provide the following dependencies in your service `build.gradle` script: 

<font color="red">TODO#Check what other dependencies are required for SE</font>
    ```gradle
    implementation "com.ca.mfaas.sdk:mfaas-integration-enabler-java:$zoweApimlVersion"
    implementation "com.ca.mfaas.sdk:common-service-core:$zoweApimlVersion"
    implementation libraries.eureka_client
    implementation libraries.httpcore
    implementation libraries.jackson_databind
    implementation libraries.jackson_dataformat_yaml
        
    providedCompile libraries.javax_servlet_api
    compileOnly libraries.lombok
    ```

    **Notes:** 
    * You may need to add more dependencies as required by your service implementation.     
    * The information provided in this file is valid for `ZoweApimlVersion 1.1.12` and above.
<font color="red">TODO#Check the version of  SE above</font>

5. In your project home directory, run the `gradle clean build` command to build your project. Alternatively, you can run `gradlew` to use the specific gradle version that is working with your project.

### Maven build automation system

Use the following procedure if you use _Maven_ as your build automation system.

**Follow these steps:**

1. Add the following _XML_ tags to your project `pom.xml` file:
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

2. Create a `settings.xml` file and copy the following _XML_ code block that defines the credentials for the Artifactory:

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
    **Tip:** If you want to use _snapshot_ version, set the `/servers/server/id` to `libs-snapshot`.

3. Copy the `settings.xml` file inside the `${user.home}/.m2/` directory. If the file already exists, include the contents of the project related `settings.xml` into the original `settings.xml` file.

4. In the directory of your project, run the `mvn clean package` command to build the project.

## Configuring your Spring Boot based service to onboard with API ML

To configure a Spring Boot based service, it is useful to first understand how Spring Boot based configuration compares to configuration using the Plain Java Enabler.

Spring Boot expects to find the default configuration of an application in an `application.yml` file that is placed on the classpath. This `application.yml` integrates the Plain Java Enabler  API ML service configuration under the `apiml.service` prefix. 

Additionally, this `application.yml` typically contains Spring Boot specific properties such as properties that are used to start a web application container including TLS security, different spring configuration profiles definitions, or application management properties. Execution environment related properties should be provided by additional configuration mechanisms, which differ for development deployments on a local machine, or on a mainframe system. 

**Follow these steps:**

1. (Optional) Provide environment specific configuration properties for a local machine execution environment by placing these configuration properties in an additional YAML file resembling the structure of the default `application.yml`.

    **Example:**
    <font color = "red"> Add an example here. </font>

    At service startup time, Spring rewrites the configuration properties of the default config file with the values of the same properties from the additional configuration file.

2. For a local machine runtime environment, provide the following parameter on your command line:
  
    ```
    -Dspring.config.additional-location=PATH-TO-EXTERNAL-YAML-CONFIG-FILE
    ```
    At runtime, Spring will merge the two configuration files, whereby the properties in the external file have higher priority.

3. Select an active profile among all profiles defined by the above merged configuration by providing the profile name as a command line parameter:
    
    ```
    -Dspring.profiles.active=PROFILE-NAME
    ```
4. Provide environment specific configuration properties on a mainframe execution environment by defining these configuration properties through Java System Properties provided on your command line. These properties are part of the `JAVA_OPTIONS` argument. 

    <font color = "red"> Let's add an example here. </font>

    **Important!** Ensure that the default configuration contains only properties which are not dependent on the deployment environment. Do not include security sensitive data in the default configuration.    


    TODO-Clarify:

    **Note:** For the procedure to configure your Spring Boot based service, see [Configuring your service](api-mediation-onboard-an-existing-java-rest-api-service_plain-java-enabler#configuring-your-service) in the article _Onboarding a REST API service with the Plain Java Enabler (PJE)_.   






## Registering your service with API ML

To register your REST service with API ML using a Spring Boot Enabler, you only need to annotate your application `main` class with `@EnableApiDiscovery ` 
    
The Registration process starts immediately after Spring finishes its Context Factory initialization.
    
When your application stops, the Spring Enabler receives an event that the Spring Context is to be destroyed. The Spring Enabler handles this event by gracefully unregistering your application from API ML Discovery service.     
    
## Adding documentation   




## Validating your API service discoverability










<font color = "red"> REVIEW THE FOLLOWING SECTIONS TO DETERMINE RELEVANCE TO THIS ATICLE </font>


## Configuring your Spring Boot based service

Configure your Spring Boot based service by following the steps described in [Configuring your service](./api-mediation-onboard-an-existing-java-rest-api-service_plain-java-enabler.md#configuring-your-service) in the onboarding guide using the Plain Java Enabler (PJE).  

Provide default service configuration in the `service-configuration.yml` file located in your service source tree resources directory.

**Note:** To externalize service onboarding configuration, see: [Externalizing onboarding configuration](api-mediation-onboard-enabler-external-configuration.md).   
    
 
##  Registering your service with API ML

The following steps outline the process of registering your service with API ML. Each step is described in detail in this article.

<font color = "red"> Provide simple example with the @EnableApiDiscovery annotation on main app class.</font>

## Unregister your service with API ML
 <font color = "red"> NOTE: SHould this process for unregistering a service with API ML be included in this document? </font>


    Use the `contextDestroyed` method to unregister your service instance from Eureka Discovery Service in the following format:

    ```
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        if (apiMediationClient != null) {
            apiMediationClient.unregister();
        }

        apiMediationClient = null;
    }
    ```

## Adding API documentation

Use the following procedure to add Swagger API documentation to your project.

**Follow these steps:**

1. Add a Springfox Swagger dependency.

    * For _Gradle_ add the following dependency in `build.gradle`:

        ```gradle
        compile "io.springfox:springfox-swagger2:2.8.0"
        ```
    
    * For _Maven_ add the following dependency in `pom.xml`:
        ```xml
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger2</artifactId>
            <version>2.8.0</version>
        </dependency>
        ```

2. Add a Spring configuration class to your project.

   **Example:**

    ```java
    package com.ca.mfaas.sampleservice.configuration;

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
3. Customize this configuration according to your specifications. For more information about customization properties, 
see [Springfox documentation](https://springfox.github.io/springfox/docs/snapshot/#configuring-springfox).


    **Note:** The current SpringFox Version 2.8 does not support OpenAPI 3.0. 
    For more information about the open feature request see this [issue](https://github.com/springfox/springfox/issues/2022).
  
## Validating the discoverability of your API service by the Discovery Service

Once you are able to build and start your service successfully, you can use the option of validating that your service is registered correctly with the API ML Discovery Service. 

Validatiing your service registration can be done in the API ML Discovery Service and the API ML Catalog. If your service appears in the Discovery Service UI but is not visible in the API Catalog, 
check to make sure that your configuration settings are correct.

Specific addresses and user credentials for the individual API ML components depend on your target runtime environment. 

**Note:** If you are working with local installation of API ML and you are using our dummy identity provider, enter `user` 
for both `username` and `password`. If API ML was installed by system administrators, ask them to provide you 
with actual addresses of API ML components and the respective user credentials.

**Tip:** Wait for the Discovery Service to discover your service. This process may take a few minutes after your service was successfully started.

**Follow these steps:**

 1. Use the Http `GET` method in the following format to query the Discovery Service for your service instance information:
 
    ```
    http://{eureka_hostname}:{eureka_port}/eureka/apps/{serviceId}
    ```
    
 2. Check your service metadata. 

    **Response example:**
  
    ```xml
    <application>
        <name>{serviceId}</name>
        <instanceId>{hostname}:{serviceId}:{port}</instanceId>
        <hostName>{hostname}</hostName>
        <app>{serviceId}</app>
        <ipAddr>{ipAddress}</ipAddr>
        <status>UP</status>
        <port enabled="false">{port}</port>
        <securePort enabled="true">{port}</securePort>
        <vipAddress>{serviceId}</vipAddress>
        <secureVipAddress>{serviceId}</secureVipAddress>
        <metadata>
                <apiml.service.description>Sample API service showing how to onboard the service</apiml.service.description>
                <apiml.routes.api__v1.gatewayUrl>api/v1</apiml.routes.api__v1.gatewayUrl>
                <apiml.catalog.tile.version>1.0.1</apiml.catalog.tile.version>
                <apiml.routes.ws__v1.serviceUrl>/sampleclient/ws</apiml.routes.ws__v1.serviceUrl>
                <apiml.routes.ws__v1.gatewayUrl>ws/v1</apiml.routes.ws__v1.gatewayUrl>
                <apiml.catalog.tile.description>Applications which demonstrate how to make a service integrated to the API Mediation Layer ecosystem</apiml.catalog.tile.description>
                <apiml.service.title>Sample Service ©</apiml.service.title>
                <apiml.routes.ui__v1.gatewayUrl>ui/v1</apiml.routes.ui__v1.gatewayUrl>
                <apiml.apiInfo.0.apiId>org.zowe.sampleclient</apiml.apiInfo.0.apiId>
                <apiml.apiInfo.0.gatewayUrl>api/v1</apiml.apiInfo.0.gatewayUrl>
                <apiml.apiInfo.0.documentationUrl>https://www.zowe.org</apiml.apiInfo.0.documentationUrl>
                <apiml.catalog.tile.id>samples</apiml.catalog.tile.id>
                <apiml.routes.ui__v1.serviceUrl>/sampleclient</apiml.routes.ui__v1.serviceUrl>
                <apiml.routes.api__v1.serviceUrl>/sampleclient/api/v1</apiml.routes.api__v1.serviceUrl>
                <apiml.apiInfo.0.swaggerUrl>https://hostname/sampleclient/api-doc</apiml.apiInfo.0.swaggerUrl>
                <apiml.catalog.tile.title>Sample API Mediation Layer Applications</apiml.catalog.tile.title>
        </metadata>
    </application>
    ```
    
  3. Check that your API service is displayed in the API Catalog and all information including API documentation is correct.
 
  4. Check that you can access your API service endpoints through the Gateway.
 
  5. (Optional) Check that you can access your API service endpoints directly outside of the Gateway.  




built on was  the new Java enabler is not compatible with pervious Spring Enablers (version 1.12).<font color = "red"> ??? </font>

