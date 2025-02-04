# Onboarding a Spring Boot based REST API Service

This guide is part of a series of guides to onboard a REST API service with the Zowe API Mediation Layer.
As an API developer, you can onboard your REST API service built with the Spring Boot framework with the Zowe API Mediation Layer.

:::note
Before API ML version 1.2, the API ML provided an integration enabler based on Spring Cloud Netflix components. From version 1.3 and later, the API ML uses a new implementation based on the Plain Java Enabler (PJE) that is not backwards compatible with the previous enabler versions. API ML core services (Discovery Service, Gateway, and API Catalog) support both the old and new enabler versions. 
:::

:::tip
For more information about how to utilize another onboarding method, see:

  * [Onboard a REST API service with the Plain Java Enabler (PJE)](onboard-plain-java-enabler.md)
  * [Onboard a REST service directly calling eureka with xml configuration](onboard-direct-eureka-call.md)
  * [Onboard an existing REST API service without code changes](onboard-static-definition.md)
:::

## Outline of onboarding a REST service using Spring Boot

The following steps outline the overall process to onboard a REST service with the API ML using a Spring Boot enabler. Each step is described in further detail in this article.

1. [Selecting a Spring Boot Enabler](#selecting-a-spring-boot-enabler)

2. [Configuring your project](#configuring-your-project)

    * [Gradle build automation system](#gradle-build-automation-system)
    * [Maven build automation system](#maven-build-automation-system)

3. [Configuring your Spring Boot based service to onboard with API ML](#configuring-your-spring-boot-based-service-to-onboard-with-api-ml)

    * [Sample API ML Onboarding Configuration](#sample-api-ml-onboarding-configuration)
    * [Authentication properties](#authentication-properties)
    * [API ML Onboarding Configuration Sample](#api-ml-onboarding-configuration-sample)
    * [SAF Keyring configuration](#saf-keyring-configuration)
    * [Custom Metadata](#custom-metadata)
    
4. [Registering and unregistering your service with API ML](#registering-and-unregistering-your-service-with-api-ml)
    
    * [Unregistering your service with API ML](#unregistering-your-service-with-api-ml)
    * [Basic routing](#basic-routing)
    
5. [Adding API documentation](#adding-api-documentation)

6. (Optional) [Validating the discoverability of your API service by the Discovery Service](#validating-the-discoverability-of-your-api-service-by-the-discovery-service)

7. (Optional) [Troubleshooting](#troubleshooting)
    * [Log messages during registration problems](#log-messages-during-registration-problems)

## Selecting a Spring Boot Enabler

Add a dependency on the Spring Enabler version to your project build configuration that corresponds to the Spring Boot version that you use for the whole project:

  * onboarding-enabler-spring-v1
  * onboarding-enabler-spring-v2

:::note
The process of onboarding an API service is the same for both Spring Boot enabler versions.
:::

## Configuring your project

Use either _Gradle_ or _Maven_ as your build automation system to manage your project builds.

:::note
You can download the selected enabler artifact from the [Zowe Artifactory](https://zowe.jfrog.io/zowe/libs-release/org/zowe/apiml/sdk/onboarding-enabler-java/) for latest stable versions.. Alternatively, if you decide to build the API ML from source, it is necessary to publish the enabler artifact to your Artifactory. Publish the enabler artifact by using the _Gradle_ tasks provided in the source code.
:::

### Gradle build automation system
Use the following procedure to use _Gradle_ as your build automation system.

**Follow these steps:**

1. Create a `gradle.properties` file in the root of your project if one does not already exist.

2. In the `gradle.properties` file, set the URL of the specific Artifactory containing the _SpringEnabler_ artifact.

    ```
    # Repository URL for getting the enabler-java artifact
    artifactoryMavenRepo=https://zowe.jfrog.io/zowe/libs-release/
    ```

3. Add the following _Gradle_ code block to the `repositories` section of your `build.gradle` file:

    ```gradle
    repositories {
        ...

        maven {
            url artifactoryMavenRepo
        }
    }
    ```
   
4.  In the same `build.gradle` file, add the necessary dependencies for your service. If you use the _SpringEnabler_ from the Zowe Artifactory, add the following code block to your `build.gradle` script:

    Use the corresponding artifact according to the Zowe APIML version you are using.

    - Use the latest version of the following artifact:

        ```groovy
        implementation "org.zowe.apiml.sdk:onboarding-enabler-spring:$zoweApimlVersion"
        ```

    **Notes:**
    * You may need to add additional dependencies as required by your service implementation.
    * Replace `zoweApimlVersion` with the latest update of the major version according to your Zowe installation.

5. In your project home directory, run the `gradle clean build` command to build your project. Alternatively, you can run `gradlew` to use the specific gradle version that is working with your project.

### Maven build automation system

Use the following procedure if you use _Maven_ as your build automation system.

**Follow these steps:**

1. Add the following _XML_ tags within the newly created `pom.xml` file:
    ```xml
    <repositories>
        <repository>
            <id>libs-release</id>
            <name>libs-release</name>
            <url>https://zowe.jfrog.io/zowe/libs-release/</url>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
    </repositories>
    ```
   
    **Tip:** If you want to use snapshot version, replace libs-release with libs-snapshot in the repository url and change snapshots->enabled to true.

2. Add the proper dependencies

    - Use the latest version of the following artifact:

        ```XML
        <dependency>
            <groupId>org.zowe.apiml.sdk</groupId>
            <artifactId>onboarding-enabler-spring</artifactId>
            <version>$zoweApimlVersion</version>
        </dependency>
        ```
   **Notes:**
    * Replace `zoweApimlVersion` with the latest update of the major version according to your Zowe installation.


3. In the directory of your project, run the `mvn clean package` command to build the project.

## Configuring your Spring Boot based service to onboard with API ML

To configure a Spring Boot based service, it is useful to first understand how API ML enabled service Spring Boot based configuration relates to configuration using the Plain Java Enabler.

Spring Boot expects to find the default configuration of an application in an `application.yml` file that is placed on the classpath. Typically `application.yml` contains Spring Boot specific properties such as properties that are used to start a web application container including TLS security, different spring configuration profiles definitions, and other properties. This `application.yml` must contain the Plain Java Enabler API ML service configuration under the `apiml.service` prefix. The API ML configuration under this prefix is necessary to synchronize the configuration of `apiml.service` with the spring `server` configuration.

Configuration properties belong to two categories:

  * Service related properties which include endpoints, relative paths, or API documentation definitions.
  * Environment related properties which include host names, ports, context etc.

Execution environment related properties should be provided by additional configuration mechanisms that are specific to the target execution environment. Execution environment related properties for development deployments on a local machine differ with those properties on a mainframe system. 

  * In a development environment, provide execution environment related properties in an additional `YAML` file with the system property in the following format:
    ```
    -Dspring.config.additional-location=PATH_TO_YAML_FILE
    ```

  * On the mainframe system, provide additional configuration properties and values for existing configuration properties through Java system properties.

    Execution environments for local development deployments and mainframe deployment are described in detail later in this article.

**Follow these steps:**

1. Provide a configuration section for onboarding with API ML in the `application.yml` file.

    * If you have already onboarded your service with API ML, copy and paste the contents of your existing API ML onboarding configuration file. The default of the API ML onboarding configuration file is the `service-configuration.yml` in the `application.yml` file under the `apiml.service` prefix.

    * If you have not yet onboarded your REST service with API ML, use the [Sample API Onboarding Configuration](#sample-api-ml-onboarding-configuration) to get started.

2. If you are reusing your existing API ML onboarding configuration, modify the API ML related properties of the `application.yml` file.

    a) Remove certain properties under the `apiml.service` section, which must be externalized. Properties for removal are described in the following sample of API ML onboarding configuration.

    b) Provide the following additional properties under the `apiml` section:
    
    ```
    enabled: true # If true, the service will automatically register with API ML discovery service.

    enableUrlEncodedCharacters: true
    ```
   
    These additional properties are contained in the following sample.


### Sample API ML Onboarding Configuration

In the following sample API ML onboarding configuration, properties prefixed with `###` (3 hashtags) indicate that their value must be provided as `-Dsystem.property.key=PROPERTY_VALUE` defined in the mainframe execution environment.
The `-Dsystem.property.key` must be the same as the flattened path of the YAML property which is commented out with `###`.
These properties must not be defined (uncommented) in your default service YAML configuration file.

**Example:**

```yaml
     apiml:
         service:
            ### hostname:
```

In this example from the YAML configuration file, when the application service is run on the mainframe, provide your mainframe hostname value on the Java execution command line in the following format:
```
-Dapiml.service.hostname=YOUR-MAINFRAME-HOSTNAME-VALUE
```
Since this value is provided in the Java execution command line, leave the property commented out in the `application.yml`.

For development purposes, you can replace or add any property by providing the same configuration structure in an external
YAML configuration file. When running your application, provide the name of the external/additional
configuration file on the command line in the following format:
```
-Dspring.config.additional-location=PATH_TO_YOUR_EXTERNAL_CONFIG_FILE
```

A property notation provided in the format `-Dproperty.key=PROPERTY_VALUE` can be used for two purposes:

  * To provide a runtime value for any `YAML` property if
    `${property.key}` is used as its value (after `:`) in the YAML configuration file

    **Example:**
    
    ```yaml
    some_property_path:
        property:
            key: ${property.key}
    ```
   
  * To add a property to configuration if the property does not already exist

    **Example:**

    ```yaml
    property:
        key: PROPERTY_VALUE
    ```

:::note
System properties provided with `-D` notation on the command line will not replace properties defined
in any of the YAML configuration files.
:::

### Authentication properties
These parameters are not required. If a parameter is not specified, a default value is used. See [Authentication Parameters for Onboarding REST API Services](./authentication-for-apiml-services.md#authentication-parameters) for more details.

### API ML Onboarding Configuration Sample

Some parameters which are specific for your service deployment
are written in `${fill.your.parameterValue}` format. For your service configuration file, provide actual values or externalize your configuration using `-D` java commandline parameters.

```yaml
spring:
    application:
        name: ${apiml.service.serviceId}           # Has to be same as apiml.service.serviceId property

apiml:
    enabled: true                           # Decision if the service should automatically register with API ML discovery service
    enableUrlEncodedCharacters: true        # Decision if the service requests the API ML GW to receive encoded characters in the URL
    service:                                # The root of API ML onboarding configuration

        serviceId: ${fill.your.serviceId}      # The symbolic name of the service
        title: ${fill.your.title} 
        description: ${fill.your.description}  # API service description

        scheme: https
        hostname: ${fill.your.hostname}                           # hostname can be externalized by specifying -Dapiml.service.hostname command line parameter
        port: ${fill.your.port}                                    # port can be externalized by specifying -Dapiml.service.port command line parameter
        serviceIpAddress: ${fill.your.ipAddress}                    # serviceIpAddress can be externalized by specifying -Dapiml.service.ipAddress command line parameter

        baseUrl: ${apiml.service.scheme}://${apiml.service.hostname}:${apiml.service.port}
        contextPath: /${apiml.service.serviceId}      # By default the contextPath is set to be the same as apiml.service.serviceId, but doesn't have to be the same

        homePageRelativeUrl: ${apiml.service.contextPath}
        statusPageRelativeUrl: ${apiml.service.contextPath}/application/info
        healthCheckRelativeUrl: ${apiml.service.contextPath}/application/health

        discoveryServiceUrls: https://${fill.your.discoveryServiceHost1}:${fill.your.discoveryServicePort1}/eureka # discoveryServiceUrlscan be externalized by specifying -Dapiml.service.discoveryServiceUrls command line parameter

        routes:
            -   gateway-url: "ui/v1"
                service-url: ${apiml.service.contextPath}
            -   gateway-url: "api/v1"
                service-url: ${apiml.service.contextPath}/api/v1
            -   gateway-url: "ws/v1"
                service-url: ${apiml.service.contextPath}/ws

        authentication:
            scheme: httpBasicPassTicket
            applid: ZOWEAPPL

        apiInfo:
            -   apiId: zowe.apiml.sampleservice
                version: 1.0.0
                gatewayUrl: api/v1
                swaggerUrl: ${apiml.service.scheme}://${apiml.service.hostname}:${apiml.service.port}${apiml.service.contextPath}/v3/api-docs/apiv1
                documentationUrl: https://www.zowe.org
            -   apiId: zowe.apiml.sampleservice
                version: 2.0.0
                gatewayUrl: api/v2
                swaggerUrl: ${apiml.service.scheme}://${apiml.service.hostname}:${apiml.service.port}${apiml.service.contextPath}/v3/api-docs/apiv2
                documentationUrl: https://www.zowe.org

        catalog:
            tile:
                id: cademoapps                                    # Provide ID for your service Catalog tile
                title: Sample API Mediation Layer Applications
                description: Applications which demonstrate how to make a service integrated to the API Mediation Layer ecosystem
                version: 1.0.1

        ssl:
            ## This part configures the http client that connects to Discovery Service. You might reuse your server.ssl.xxx properties that configure your application's servlet.
            enabled: true
            verifySslCertificatesOfServices: true
            protocol: TLSv1.3
            enabled-protocols: TLSv1.3
            keyStoreType: ${fill.your.keystoretype}
            trustStoreType: ${fill.your.truststoretype}

            ### DEFINE FOLLOWING PROPERTIES IN EXTERNAL CONFIGURATION
            keyAlias: ${fill.your.keyAlias}
            keyPassword: ${fill.your.keyPassword}
            keyStore: ${fill.your..keyStore}
            keyStorePassword: ${fill.your.keyStorePassword}
            trustStore: ${fill.your.trustStore}
            trustStorePassword: ${fill.your.trustStorePassword}
        
        # Optional metadata section
        customMetadata:
            yourqualifier:
                key1: value1
                key2: value2

# rest of your configuration
# server: ....
# yourApplicationConfiguration: ....
# and other properties
```

:::tip
To determine if your configuration is complete, set the logging level to `debug` and run your application. Setting the logging level to 'debug' enables you to troubleshoot issues with certificates for HTTPS and connections with other services.

```yaml
logging:
   level:
     ROOT: INFO
     org.zowe.apiml: DEBUG
```
:::

3. Provide the suitable parameter corresponding to your runtime environment:

  * For a local machine runtime environment, provide the following parameter on your command line:

    ```
    -Dspring.config.additional-location=PATH-TO_EXTERNAL-YAML-CONFIG-FILE
    ```

    At runtime, Spring will merge the two `YAML` configuration files, whereby the properties in the external file have higher priority.

  * For a mainframe execution environment, provide environment specific configuration properties. Define these configuration properties and provide them using Java System Properties on the application execution command line.

    **Important!** Ensure that the default configuration contains only properties which are not dependent on the deployment environment.
    Do not include security sensitive data in the default configuration.

    **Note:** For details about the configuration properties,
    see [Configuring your service](onboard-plain-java-enabler.md#configuring-your-service)
    in the article _Onboarding a REST API service with the Plain Java Enabler (PJE)_.

### SAF Keyring configuration

You can choose to use a SAF keyring instead of keystore and truststore for storing certificates.
For information about required certificates, see [Zowe API ML TLS requirements](./zowe-api-mediation-layer-security-overview.md#zowe-api-ml-tls-requirements). For information about running Java on z/OS with a keyring, see [SAF Keyring](./certificate-management-in-zowe-apiml.md). Make sure that the enabler can access and read the keyring. Please refer to documentation of your security system for details.

The following example shows enabler configuration with keyrings: 
```
ssl:
    keyAlias: localhost
    keyPassword: password
    keyStore: safkeyring://my_racf_id/my_key_ring
    keyStorePassword: password
    keyStoreType: JCERACFKS
    trustStore: safkeyring://my_racf_id/my_key_ring
    trustStoreType: JCERACFKS
    trustStorePassword: password
```

### Custom Metadata

For information about customizing metadata to add to the instance information registered in the Discovery Service, see [Customizing Metadata](./custom-metadata.md).

## Registering and unregistering your service with API ML

Onboarding a REST service to the API ML means registering the service with the API ML Discovery Service. The registration is triggered automatically by Spring after the service application context is fully initialized by firing a `ContextRefreshed` event.

To register your REST service with API ML using a Spring Boot enabler, annotate your application `main` class with `@EnableApiDiscovery`.

### Unregistering your service with API ML

Unregistering a service onboarded with API ML is done automatically at the end of the service application shutdown process in which Spring fires a `ContextClosed` event. The Spring onboarding enabler listens for this event and issues an `unregister` REST call to the API ML Discovery Service.

### Basic routing

For information about basic routing in the API ML, see [API ML Basic Routing](./api-mediation-routing.md) 

## Adding API documentation

Use the following procedure to add Swagger API documentation to your project.

**Follow these steps:**

1. Add a SpringFox Swagger dependency.

    * For _Gradle_, add the following dependency in `build.gradle`:

        ```groovy
        implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.2'
        ```

      * For _Maven_, add the following dependency in `pom.xml`:
    
          ```xml
          <dependency>
             <groupId>org.springdoc</groupId>
             <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
             <version>2.8.2</version>
          </dependency>
          ```

2. Add a Spring configuration class to your project.

   **Example:**

    ```java

    package org.zowe.apiml.sampleservice.configuration;
    
    import io.swagger.v3.oas.models.Components;
    import io.swagger.v3.oas.models.OpenAPI;
    import io.swagger.v3.oas.models.info.Info;
    import io.swagger.v3.oas.models.security.SecurityScheme;
    import org.springdoc.core.models.GroupedOpenApi;
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    
    @Configuration
    public class SwaggerConfiguration {
    
        @Value("${apiml.service.title}")
        private String apiTitle;
    
        @Value("${apiml.service.apiInfo[0].version}")
        private String apiVersionRest1;
    
        @Value("${apiml.service.apiInfo[1].version}")
        private String graphqlVersion;
    
        @Value("${apiml.service.apiInfo[2].version}")
        private String apiVersionRest2;
    
        @Value("${apiml.service.description}")
        private String apiDescription;
    
        @Bean
        public OpenAPI openAPI() {
            return new OpenAPI()
                .info(new Info()
                    .title("Spring REST API")
                    .description("Example of REST API"))
                .components(new Components().addSecuritySchemes("ESM token",
                    new SecurityScheme().type(SecurityScheme.Type.APIKEY).in(SecurityScheme.In.HEADER).name("esmToken"))
                );
        }
    
        @Bean
        public GroupedOpenApi apiV1() {
            return GroupedOpenApi.builder()
                .group("apiv1")
                .pathsToMatch("/api/v1/**")
                .addOpenApiCustomizer(openApi -> openApi.setInfo(openApi.getInfo().version("1.0.0")))
                .build();
        }
    
        @Bean
        public GroupedOpenApi apiV2() {
            return GroupedOpenApi.builder()
                .group("apiv2")
                .pathsToMatch("/api/v2/**")
                .addOpenApiCustomizer(openApi -> openApi.setInfo(openApi.getInfo().version("2.0.0")))
                .build();
        }
        
    }

    ```
   
3. Customize this configuration according to your specifications. For more information about customization properties,
see [Springdoc configuration](https://springdoc.org/#properties).

## Validating the discoverability of your API service by the Discovery Service

Once you build and start your service successfully, you can use the option of validating that your service is registered correctly with the API ML Discovery Service.

**Follow these steps:**
  1. [Validate successful onboarding](./onboard-overview.md#verify-successful-onboarding-to-the-api-ml)
 
  2. Check that you can access your API service endpoints through the Gateway.

  3. (Optional) Check that you can access your API service endpoints directly outside of the Gateway.

Specific addresses and user credentials for the individual API ML components depend on your target runtime environment.

:::note
If you are working with local installation of API ML and you are using our dummy identity provider, enter `user`
for both `username` and `password`. If API ML was installed by system administrators, ask them to provide you
with actual addresses of API ML components and the respective user credentials.
:::

:::tip
Wait for the Discovery Service to fully register your service. This process may take a few minutes after your service was successfully started.
:::


## Troubleshooting

#### Log messages during registration problems

When an Enabler connects to the Discovery Service and fails, an error message prints to the Enabler log. The default setting does not suppress these messages as they are useful to resolve problems during the Enabler registration. Possible reasons for failure include the location of Discovery Service is not correct, the Discovery Service is down, or the TLS certificate is invalid. These messages continue to print to the Enabler log, while the Enabler retries to connect to the Discovery Service. 

To fully suppress these messages in your logging framework, set the log levels to `OFF` on the following loggers:

  ```
  com.netflix.discovery.DiscoveryClient, com.netflix.discovery.shared.transport.decorator.RedirectingEurekaHttpClient
  ```
  
Some logging frameworks provide other tools to suppress repeated messages. Consult the documentation of the logging framework you use to find out what tools are available. The following example demonstrates how the Logback framework can be used to suppress repeated messages.

**Example:** 

Add the following code to your configuration file if you use XML configuration: 

```
    <turboFilter class="ch.qos.logback.classic.turbo.DuplicateMessageFilter">
        <AllowedRepetitions>0</AllowedRepetitions>
    </turboFilter>
```    

:::note
For more information, see the [full configuration used in the Core Services](https://github.com/zowe/api-layer/blob/master/apiml-common/src/main/resources/logback.xml) in GitHub. 
:::
