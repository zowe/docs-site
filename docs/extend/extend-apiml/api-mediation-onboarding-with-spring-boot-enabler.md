# Onboarding a Spring Boot based REST API Service

This guide is part of a series of guides to onboard a REST API service with the Zowe API Mediation Layer.
As an API developer, you can onboard your REST API service built with the Spring Boot framework with the Zowe API Mediation Layer.

**Note:** Before version 1.12, the API ML provided an integration enabler based on Spring Cloud Netflix components. From version 1.12 and later, the enabler has been replaced with a new implimentation based on the Plain Java Enabler (PJE) that is not backwards compatiable with the previous enabler versions.


**Tip:** For more information about how to utilize another onboarding method, see:

  * [Onboard a REST API service with the Plain Java Enabler (PJE)](api-mediation-onboard-an-existing-java-rest-api-service_plain-java-enabler.md)
  * [Onboard a REST service directly calling eureka with xml configuration](api-mediation-onboard-rest-service-direct-eureka-call.md)
  * [Onboard an existing REST API service without code changes](api-mediation-onboard-an-existing-rest-api-service-without-code-changes.md)
  * [Java REST APIs service without Spring Boot](api-mediation-onboard-an-existing-java-rest-api-service-without-spring-boot-with-zowe-api-mediation-layer.md)

## Outline of onboarding a REST service using Spring Boot

The following steps outline the overall process to onboard a REST service with the API ML using a Spring Boot enabler. Each step is described in further detail in this article.

1. [Selecting a Spring Boot Enabler](#selecting-a-spring-boot-enabler)

2. [Configuring your project](#configuring-your-project)

    * [Gradle build automation system](#gradle-build-automation-system)
    * [Maven build automation system](#maven-build-automation-system)

3. [Configuring your Spring Boot based service to onboard with API ML](#configuring-your-spring-boot-based-service-to-onboard-with-api-ml)

4. [Registering and unregistering your service with API ML](#registering-and-unregistering-your-service-with-api-ml)

5. [Adding API documentation](#adding-api-documentation)

6. (Optional) [Validating your API service discoverability](#validating-the-discoverability-of-your-api-service-by-the-discovery-service)


## Selecting a Spring Boot Enabler

 Add a dependency on the Spring Enabler version to your project build configuration that corresponds to the Spring Boot version that you use for the whole project:
- onboarding-enabler-spring-v1
- onboarding-enabler-spring-v2

**Note:** The process of onboarding an API service is the same for both Spring Boot enabler versions.

## Configuring your project

Use either _Gradle_ or _Maven_ build automation systems to manage your project builds.

**Note:** You can download the selected enabler artifact from the Giza Artifactory. Alternatively, if you decide to build the API ML from source, you are required to publish the enabler artifact to your Artifactory. Publish the enabler artifact by using the _Gradle_ tasks provided in the source code.

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
implementation "org.zowe.apiml.sdk:mfaas-onboarding-enabler-java:$zoweApimlVersion"
implementation "org.zowe.apiml.sdk:common-service-core:$zoweApimlVersion"
```
**Note:** The published artifact from the Giza Artifactory also contains the enabler dependencies from other software packages. If you are using an Artifactory other than Giza, manually provide the following dependencies in your service `build.gradle` script:

<font color="red">TODO#Check what other dependencies are required for SE</font>
```gradle
implementation "org.zowe.apiml.sdk:mfaas-onboarding-enabler-java:$zoweApimlVersion"
implementation "org.zowe.apiml.sdk:common-service-core:$zoweApimlVersion"
implementation libraries.eureka_client
implementation libraries.httpcore
implementation libraries.jackson_databind
implementation libraries.jackson_dataformat_yaml

providedCompile libraries.javax_servlet_api
compileOnly libraries.lombok
```

**Notes:**
* You may need to add additional dependencies as required by your service implementation.
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

To configure a Spring Boot based service, it is useful to first understand how API ML enabled service Spring Boot based configuration relates to configuration using the Plain Java Enabler.

Spring Boot expects to find the default configuration of an application in an `application.yml` file that is placed on the classpath. Typically `application.yml` contains Spring Boot specific properties such as properties that are used to start a web application container including TLS security, different spring configuration profiles definitions, and other properties. This `application.yml` must contain the Plain Java Enabler API ML service configuration under the `apiml.service` prefix. The API ML configuration under this prefix is necessary to synchronize the configuration of `apiml.service` with the spring `server` configuration.

Configuration properties belong to two categories:

- Service related properties which include end-points, relative paths, or API documentation definitions.
- Environment related properties which include host names, ports, context etc.

Execution environment related properties should be provided by additional configuration mechanisms that are specific to the target execution environment. Execution environment related properties for development deployments on a local machine differ with those properties on a mainframe system. 

- In a development environment, execution environment related properties can be implemented by providing an additional `YAML` file with the system property in the following format:
    ```
    -Dspring.config.additional-location=PATH_TO_YAML_FILE
    ```

- On the mainframe system, provide additional configuration properties and values for existing configuration properties through Java system properties.

    Execution environments for local development deployments and mainframe deployment are described in detail later in this article.

<font color = "red"> It would be good to describe the additonal configuration mechanism (i.e an external yaml file, etc)</font>




**Follow these steps:**

1. Provide a configuration section for onboarding with API ML in the `application.yml` file.

    - If you have already onboarded your service with API ML, copy and paste the contents of your existing API ML onboarding configuration file. The default of the API ML onboarding configuration file is the `service-configuration.yml` in the `application.yml` file under the `apiml.service` prefix.

    - If you have not yet onboarded your REST service with API ML, use `the example configuration` <font color = "red">Add link here</font> provided to get started.

2. If you are reusing your existing API ML onboarding configuration, modify the API ML related properties of the `application.yml` file.

    a) Remove certain properties under the `apiml.service` section, which must be externalized. These properties for removal are described in the following sample of API ML onboarding configuration.

    b) Provide the following additional properties under the `apiml` section.
    ```
    enabled: true # If true, the service will automatically register with API ML discovery service.

    enableUrlEncodedCharacters: true
    ```
    These additional properties are contained in the following sample.


### Sample API ML Onboarding Configuration

In the following sample API ML onboarding configuration, properties prefixed with `###` (3 hashtags) indicate that their value must be provided as `-Dsystem.property.key=PROPERTY_VALUE` defined in the MF execution environment.
The `-Dsystem.property.key` must be the same as the flattened path of the YAML property which is commented out with `###`.
These properties must not be defined (uncommented) in your default service YAML configuration file.

**Example:**
```
     apiml:
         service:
            ### hostname:
```
In this example from the YAML configuration file, provide `-Dapiml.service.hostname=YOUR-MAINFRAME-HOSTNAME-VALUE` on
the java execution command line when the application service is run on the mainframe.
Since this value is provided in the java execution command line, leave the property commented out in the `application.yml`.

For development purposes you can replace or add any property by providing the same configuration structure in an external
YAML configuration file. When running your application, provide the name of the external/additional
configuration file on the command line in the following format:

 `-Dspring.config.additional-location=PATH_TO_YOUR_EXTERNAL_CONFIG_FILE`

A property notation in the format `-Dproperty.key=PROPERTY_VALUE` can be used
in two different ways:

 - To provide a runtime value for any `YAML` property if
`${property.key}` is used as its value (after `:`) in the YAML configuration file.

    **Example:**
    ```
    some_property_path:
        property:
            key: ${property.key}
    ```
- To add a property to configuration if the property does not already exist.

    **Example:**

```
    property:
        key: PROPERTY_VALUE
```

**Note**: System properties provided with `-D` on the command line will not replace properties defined
in any of the YAML configuration files.

### API ML Onboarding Configuration Sample
```
spring:
    application:
        name: ${apiml.service.id}           # Same name as for `apiml.service.serviceId`

apiml:
    enabled: true                           # Decision if the service should automatically register with API ML discovery service
    enableUrlEncodedCharacters: true        # Decision if the service requests the API ML GW to receive encoded characters in the URL
    service:                                # The root of API ML onboarding configuration

        serviceId: ${apiml.service.id}      # The symbolic name of the service. Must be the same as `spring.application.name`
        title: ${service.title}
        description: ${service.description} # API service description

        scheme: https
        ### hostname:                                # Hostname must be defined by -Dapiml.service.hostname on MF
        ### port:                                    # Port must be defined by -Dapiml.service.port on MF:
        serviceIpAddress: ${apiml.service.ipAddress} # serviceIpAddress must be provided by -Dapiml.service.ipAddress on MF

        baseUrl: ${apiml.service.scheme}://${apiml.service.hostname}:${apiml.service.port}
        contextPath: /${apiml.service.id}            # By default the contextPath is set to be the same as apiml.service.serviceId

        homePageRelativeUrl: ${apiml.service.contextPath}
        statusPageRelativeUrl: ${apiml.service.contextPath}/application/info
        healthCheckRelativeUrl: ${apiml.service.contextPath}/application/health

        ### discoveryServiceUrls: ${apiml.service.discoveryServiceUrls} # discoveryServiceUrls must be defined by -Dapiml.service.discoveryServiceUrls on MF:

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
                id: cademoapps                                    # Provide ID for your service Catalog tile
                title: Sample API Mediation Layer Applications
                description: Applications which demonstrate how to make a service integrated to the API Mediation Layer ecosystem
                version: 1.0.1
        ssl:
            enabled: ${server.ssl.enabled}
            verifySslCertificatesOfServices: true
            ciphers: ${server.ssl.ciphers}
            protocol: ${server.ssl.protocol}
            enabled-protocols: ${server.ssl.protocol}
            keyStoreType: ${server.ssl.keyStoreType}
            trustStoreType: ${server.ssl.trustStoreType}

            ### DEFINE FOLLOWING PROPERTIES IN EXTERNAL CONFIGURATION
            keyAlias: ${server.ssl.keyAlias} #localhost-blah
            keyPassword: ${server.ssl.keyPassword} #password-blah
            keyStore: ${server.ssl.keyStore} #keystore/localhost/localhost.keystore.p12-blah
            keyStorePassword: ${server.ssl.keyStorePassword} #password-blah
            trustStore: ${server.ssl.trustStore} #keystore/localhost/localhost.truststore.p12-blah
            trustStorePassword: ${server.ssl.trustStorePassword} #password-blah

server:
    scheme: ${apiml.service.scheme}
    hostname: ${apiml.service.hostname} #localhost # Hostname that is advertised in Eureka. Default is valid only for localhost
    port: ${apiml.service.port} #10012         # Default port name for discoverable-client service
    address: ${apiml.service.ipAddress} #127.0.0.1

    servlet:
        contextPath: /${apiml.service.id}

    ssl:
        enabled: true
        protocol: TLSv1.2
        enabled-protocols: TLSv1.2
        ciphers: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384
        keyStoreType: PKCS12
        trustStoreType: PKCS12
```


3. Provide the suitable parameter corresponding to your runtime environment:

- For a local machine runtime environment, provide the following parameter on your command line:

    ```
    -Dspring.config.additional-location=PATH-TO_EXTERNAL-YAML-CONFIG-FILE
    ```

   At runtime, Spring will merge the two `YAML` configuration files, whereby the properties in the external file have higher priority.

- For a mainframe execution environment, provide environment specific configuration properties. Define these configuration properties and provide them using Java System Properties on the application execution command line.

    **Important!** Ensure that the default configuration contains only properties which are not dependent on the deployment environment.
    Do not include security sensitive data in the default configuration.

    **Note:** For details about the configuration properties,
    see [Configuring your service](api-mediation-onboard-an-existing-java-rest-api-service_plain-java-enabler#configuring-your-service)
    in the article _Onboarding a REST API service with the Plain Java Enabler (PJE)_.

## Registering and unregistering your service with API ML

Onboarding a REST service with API ML means registering the service with the API ML Discovery service. The registration is triggered automatically by Spring after the service application context is fully initialized by firing a `ContextRefreshed` event.

To register your REST service with API ML using a Spring Boot enabler, annotate your application `main` class with `@EnableApiDiscovery`.

### Unregistering your service with API ML

Unregistering a service onboarded with API ML is done automatically at the end of the service application shutdown process in which Spring fires a `ContextClosed` event. The Spring onboarding enabler listens for this event and issues an `unregister` REST call to the API ML Discovery service.

## Adding API documentation

Use the following procedure to add Swagger API documentation to your project.

**Follow these steps:**

1. Add a SpringFox Swagger dependency.

    * For _Gradle_ add the following dependency in `build.gradle`:

        ```gradle
        compile "io.springfox:springfox-swagger2:2.8.0"
        ```

    * For _Maven_ add the following dependency in `pom.xml`:
        ```xml
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger2</artifactId>
            <version>2.9.2</version>
        </dependency>
        ```

2. Add a Spring configuration class to your project.

   **Example:**

    ```java
    package org.zowe.apiml.sampleservice.configuration;

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


    **Note:** The current SpringFox Version 2.9.2 does not support OpenAPI 3.0.
    For more information about the open feature request see this [issue](https://github.com/springfox/springfox/issues/2022).

## Validating the discoverability of your API service by the Discovery Service

Once you build and start your service successfully, you can use the option of validating that your service is registered correctly with the API ML Discovery Service.

Validating your service registration can be done in the API ML Discovery Service and the API ML Catalog.
If your service appears in the Discovery Service UI but is not visible in the API Catalog,
check to make sure that your configuration settings are correct.

Specific addresses and user credentials for the individual API ML components depend on your target runtime environment.

**Note:** If you are working with local installation of API ML and you are using our dummy identity provider, enter `user`
for both `username` and `password`. If API ML was installed by system administrators, ask them to provide you
with actual addresses of API ML components and the respective user credentials.

**Tip:** Wait for the Discovery Service to fully register your service. This process may take a few minutes after your
service was successfully started.

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
