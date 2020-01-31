# Onboarding a Spring Boot based REST API Service

This guide is part of a series of guides to onboard a REST API service with the Zowe API Mediation Layer.
As an API developer, you can onboard your REST API service built with the Spring Boot framework with the 
Zowe API Mediation Layer.

**Note:** Before version 1.12, the API ML provided an integration enabler based on Spring Cloud Netflix components.
From version 1.12 and later, the enabler has been replaced with new implimentation based on the Plain Java Enabler (PJE) 
that is not backwards compatiable with the previous enabler versions.

TOC

**Tip:** For more information about how to utilize another API ML enabler, see:
    
<font color="red">TODO: Or actually with an other enabler or without enabler at all</font>
           
  * [Onboard a REST API service with the Plain Java Enabler (PJE)](api-mediation-onboard-an-existing-java-rest-api-service_plain-java-enabler.md) 
  * [Onboard a REST service directly calling eureka with xml configuration](api-mediation-onboard-rest-service-direct-eureka-call.md)  
  * [Onboard an existing REST API service without code changes](api-mediation-onboard-an-existing-rest-api-service-without-code-changes.md)
  * [Java REST APIs service without Spring Boot](api-mediation-onboard-an-existing-java-rest-api-service-without-spring-boot-with-zowe-api-mediation-layer.md)

## Outline of onboarding a REST service using Spring Boot

The following steps outline the overall process to onboard a REST service with the API ML using a Spring Boot enabler.
Each step is described in further detail in this article. 

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

To configure a Spring Boot based service, it is useful to first understand how API ML enabled service Spring Boot based 
configuration relates to configuration using the Plain Java Enabler.

Spring Boot expects to find the default configuration of an application in an `application.yml` file that is placed on 
the classpath. Typically `application.yml` contains Spring Boot specific properties such as properties that are used to 
start a web application container including TLS security, different spring configuration profiles definitions and other 
properties. This `application.yml` must contain the Plain Java Enabler API ML service configuration under 
the `apiml.service` prefix. The API ML configuration under this prefix is necessary to synchronize the configuration 
of `apiml.service` with the spring `server` configuration. 

Configuration properties belong to two categories:

- Service related properties which include end-points, relative paths or API documentation definitions.
- Environment related properties which include host names, ports, context etc. 

Service related properties can be configured in the `application.yml` configuration file which resides inside the 
application package. In most cases these properties don't have to be changed, because their values don't depend on 
the target execution environment.
 
Execution environment related properties on the other hand depend on the target execution environment. Their values  
can be provided by different configuration mechanisms, specific for the target execution environment. 
In development environment it can be implemented by Spring e.g providing additional `YAML` file with 
`-Dspring.config.additional-location=PATH_TO_YAML_FILE` system property. On MF system currently we use 
Java system properties to provide additional configuration properties and values for existing configuration properties. 


1. Provide a configuration section for onboarding with API ML in the `application.yml` file.

    If you have already onboarded your service with API ML, copy and paste the contents of your existing API ML onboarding configuration file (defaults to `service-configuration.yml`) into the `application.yml` file under the `apiml.service` prefix.

    If you have not yet onboarded your REST service with API ML, use `the example configuration` <font color = "red">Add link here</font> provided to get started. 

2. Modify the API ML related properties of the `application.yml` file.

    If you reused your existing API ML onboarding configuration, perform the following steps:

    a) Remove certain properties under the `apiml.service` section, which must be externalized. These properties for removal are described in the example bellow.
  
    b) Provide the following additional properties under the `apiml` section.
    ```
    enabled: true # If true, the service will automatically register with API ML discovery service.  

    enableUrlEncodedCharacters: true
    ```

```
# In the following sample API ML onboarding configuration, properties commented with ### (3 hashtags) 
# indicate that their value must be provided externally to the deploymet package. On a MF environment this can be done 
# using the -Dsystem.property.key=PROPERTY_VALUE notation to provde the property value on the JAVA command line.
# The -Dsystem.property.key must be the same as the flattened path of the YAML property which is commented out with ###.
# These properties must not be defined (uncommented) in your default service YAML configuration file.
#
# Example:
#     apiml:
#         service:
#             ### hostname: 
#
# For MF deploymnet provide -Dapiml.service.hostname=YOUR-MAINFRAME-HOSTNAME-VALUE on
# the java execution command line when the application service is run on the MF. 
# Since this value is provided on the java execution command line, leave the property commented out in the `application.yml`.
#
# For development purposes you can replace or add any property by providing the same configuration structure in an external 
# YAML configuration file. When running your application, provide the name of the external/additional configuration file 
# on the command line by using:
# `-Dspring.config.additional-location=PATH_TO_YOUR_EXTERNAL_CONFIG_FILE`
# 
#
# A property notation in the format -Dproperty.key=PROPERTY_VALUE can be used
# in two different ways:
#
#    - To provide a run-time value for any `YAML` property if
#    ${property.key} is used as its value (after ':') in the YAML configuration
#    file.
#    Example:
#    ```  
#        some_property_path:    
#            property:
#                key: ${property.key}
#    ```
#
#    - To add a property to configuration 
#    (if the property does not already exist).
#    Example:        
#
#    ```
#        property:
#            key: PROPERT_VALUE
#    ```
# NOTE: System properties provided with -D on the command line will not replace properties defined 
# in any of the YAML configuration files.
#
# TODO: Remove the obvious comments and place them as information above the sample config.
#############################################################################################################################

spring:
    application:
        name: ${apiml.service.id}           # Same name as for `apiml.service.serviceId`

apiml:
    enabled: true                           
    enableUrlEncodedCharacters: true        
    service:                                # The root of API ML onboarding configuration
    
        serviceId: ${apiml.service.id}      
        title: ${service.title}             
        description: ${service.description} 

        scheme: https               
        ### hostname:                                # Hostname must be defined by -Dapiml.service.hostname on MF or external application.yml property for development
        ### port:                                    # Port must be defined by -Dapiml.service.port on MF or external application.yml property for development
        serviceIpAddress: ${apiml.service.ipAddress} # serviceIpAddress must be provided by -Dapiml.service.ipAddress on MF or external application.yml property for development

        baseUrl: ${apiml.service.scheme}://${apiml.service.hostname}:${apiml.service.port}
        contextPath: /${apiml.service.id}            # By default the contextPath is set to be the same as apiml.service.serviceId

        homePageRelativeUrl: ${apiml.service.contextPath}
        statusPageRelativeUrl: ${apiml.service.contextPath}/application/info
        healthCheckRelativeUrl: ${apiml.service.contextPath}/application/health

        ### discoveryServiceUrls:                   # discoveryServiceUrls must be defined by -Dapiml.service.discoveryServiceUrls on MF or external application.yml property for development  
                
        routes:
            -   gateway-url: "ui/v1"
                service-url: ${apiml.service.contextPath}         
            -   gateway-url: "api/v1"
                service-url: ${apiml.service.contextPath}/api/v1
            -   gateway-url: "ws/v1"
                service-url: ${apiml.service.contextPath}/ws
        apiInfo:
            -   apiId: org.zowe.discoverableclient
                version: 1.0.0
                gatewayUrl: api/v1
                swaggerUrl: ${apiml.service.scheme}://${apiml.service.hostname}:${apiml.service.port}${apiml.service.contextPath}/v2/api-docs
                documentationUrl: https://www.zowe.org
        catalog:
            tile:
                id: cademoapps                                    
                title: Sample API Mediation Layer Applications
                description: Applications which demonstrate how to make a service integrated to the API Mediation Layer ecosystem
                version: 1.0.1
        ssl:
            enabled: ${server.ssl.enabled}
            verifySslCertificatesOfServices: ${apiml.security.verifySslCertificatesOfServices} #true
            ciphers: ${server.ssl.ciphers}
            protocol: ${server.ssl.protocol}
            enabled-protocols: ${server.ssl.protocol}
            keyStoreType: ${server.ssl.keyStoreType}
            trustStoreType: ${server.ssl.trustStoreType}

            keyAlias: ${server.ssl.keyAlias}
            keyPassword: ${server.ssl.keyPassword}
            keyStore: ${server.ssl.keyStore}
            keyStorePassword: ${server.ssl.keyStorePassword}
            trustStore: ${server.ssl.trustStore}
            trustStorePassword: ${server.ssl.trustStorePassword}

server:
    scheme: ${apiml.service.scheme}                 # Java application server address scheme - http or https
    hostname: ${apiml.service.hostname}             # Java application server hostname 
    port: ${apiml.service.port} #10012              # Java application server port 
    address: ${apiml.service.ipAddress}             # address must be provided by -Dapiml.service.ipAddress on MF or external application.yml property for development
  
    servlet:
        contextPath: /${apiml.service.contextPath}  # Must be the same as the apiml.service.contextPath

    ssl:
        ### enabled:                                # `enabled` must be defined by -Dserver.ssl.enabled on MF or external application.yml property for development
        protocol: TLSv1.2
        enabled-protocols: TLSv1.2
        ciphers: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384
        keyStoreType: PKCS12
        trustStoreType: PKCS12
```

3. For a local machine runtime environment, provide the following parameter on your command line:
  
    ```
    -Dspring.config.additional-location=PATH-TO-EXTERNAL-YAML-CONFIG-FILE
    ```
    At runtime, Spring will merge the two configuration files, whereby the properties in the external file have higher priority.

   For Mainframe Provide environment specific configuration properties on a mainframe execution environment by defining these configuration properties through Java System Properties provided on your command line. These properties are part of the `JAVA_OPTIONS` argument. 

    <font color = "red"> Let's add an example here. </font>

    **Important!** Ensure that the default configuration contains only properties which are not dependent on the deployment environment. Do not include security sensitive data in the default configuration.    


    TODO-Clarify:

    **Note:** For the procedure to configure your Spring Boot based service, see [Configuring your service](api-mediation-onboard-an-existing-java-rest-api-service_plain-java-enabler#configuring-your-service) in the article _Onboarding a REST API service with the Plain Java Enabler (PJE)_.   


## Registering your service with API ML

To register your REST service with API ML using a Spring Boot Enabler, you only need to annotate your application `main` class with `@EnableApiDiscovery ` 
    
The Registration process starts immediately after Spring finishes its Context Factory initialization.
    
When your application stops, the Spring Enabler receives an event that the Spring Context is to be destroyed. The Spring Enabler handles this event by gracefully unregistering your application from API ML Discovery service.     
    

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


