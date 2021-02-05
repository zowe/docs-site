# Onboarding a Micronaut based REST API service

As an API developer, you can onboard a REST service to the Zowe API Mediation Layer using the Micronaut framework. While using the Spring framework to develop a JVM-based service to register to the API ML is the recommended method, you can use the procedure described in this article to onboard a service using the Micronaut framework.

**Note:** For more information about onboarding API services with the API ML, see the [Onboarding Overview](onboard-overview.md).

For Micronaut related documentation, visit the official [Micronaut website](https://docs.micronaut.io/latest/guide/index.html#introduction).

- [Set up your build automation system](#set-up-your-build-automation-system)
  - [Specify the main class](#specify-the-main-class)
  - [Define the output jar file](#define-the-output-jar-file)
  - (Optional) [Create a shadow jar](#create-a-shadow-jar)
  - [Start the application](#start-the-application)
- [Configure the Micronaut application](#configure-the-micronaut-application)
  - [Add API ML configuration](#add-api-ml-configuration)
  - [

## Set up your build automation system

Currently, the only build automation system for use with onboarding a Micronaut based service is _Gradle_.

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

4. In build.gradle file, add the micronaut enabler as a dependency:

    ```groovy
    implementation "org.zowe.apiml.sdk:onboarding-enabler-micronaut:$zoweApimlVersion"
    ```
5. (Optional) Add a shadow plug-in to create a runnable jar file. Update the `gradle.build file` with a plugin:

```
id 'com.github.johnrengelman.shadow' version '6.1.0'
```

6. Specify the main class with the following script:

```
mainClassName = '${your.packa.name.MainClassName}' #replace with your main class
```

7. Define the output jar file 

Add the following script to define the output of the jar file:

```
shadowJar {
        archiveBaseName.set('micronaut-enabler')
        archiveClassifier.set('')
        archiveVersion.set('1.0')
    }
```
The following example shows a sample `gradle.build` file:

**Example:**

    plugins {
        id "io.micronaut.application" version '1.0.5'
        id 'com.github.johnrengelman.shadow' version '6.1.0'
    }
    mainClassName = 'org.zowe.apiml.Application'

    shadowJar {
        archiveBaseName.set('micronaut-enabler')
        archiveClassifier.set('')
        archiveVersion.set('1.0')
    }
    version "0.1"
    group "org.zowe.apiml"

    repositories {
        url artifactoryMavenRepo
    }

    micronaut {
        version = "2.1.3"
        runtime "netty"
        testRuntime "junit5"
        processing {
            incremental true
            annotations "org.zowe.apiml.*"
        }
    }

    dependencies {
        implementation "org.zowe.apiml.sdk:onboarding-enabler-micronaut:$zoweApimlVersion"
    }

    java {
        sourceCompatibility = JavaVersion.toVersion('1.8')
        targetCompatibility = JavaVersion.toVersion('1.8')
    }

8. (Optional) Create a shadow jar.

To create a shadow jar, execute the gradle `shadowJar` task. For this sample, the plugin produces the jar `micronaut-enabler-1.0.jar` in `build/libs` directory.

You can now run your application with the command `java -jar micronaut-enabler-1.0.jar`.

9. Start the application.

From the root directory of your project, start the application with the command **`gradle run`**.

## Configure the Micronaut application

Use a yaml file to configure your Micronaut application. 
Create the following two sections in your yaml file:

* `apiml` for API ML configuration
* `micronaut` for micronaut configuration

### Add API ML configuration
Use the following procedure to add API ML configuration to the application.yaml. 

**Follow these steps:**

1. Add the following configuration to the `apiml` section in the yaml file. 

```yaml
apiml:
    enabled: true
    service:
        serviceId: ${fill.your.serviceId}      # The symbolic name of the service
    #rest of the configuration
```

where:

- **`fill.your.service`** 

  is the ID of your service
  
2. Add SSL resolving properties as shown in the following example. Ensure to structure the nested objects within `apiml.service'  as arrays. Ensure to include `-` before `enabled` thereby indicating the first element of the array.

**Example:**

```yaml
apiml:
    service:
        ssl:
          - enabled: true
            verifySslCertificatesOfServices: true
            protocol: TLSv1.2
            enabled-protocols: TLSv1.2
            keyStoreType: ${fill.your.keystoretype}
            trustStoreType: ${fill.your.truststoretype}

            keyAlias: ${fill.your.keyAlias}
            keyPassword: ${fill.your.keyPassword}
            keyStore: ${fill.your..keyStore}
            keyStorePassword: ${fill.your.keyStorePassword}
            trustStore: ${fill.your.trustStore}
            trustStorePassword: ${fill.your.trustStorePassword}
            ciphers: ${fill.your.ciphers}

```
**Note:** For a sample of this configuration, see [API ML Onboarding Configuration Sample](onboard-spring-boot-enabler.md#api-ml-onboarding-configuration-sample).

The yaml now contains configuration to register to the API Mediation Layer. 

### Add Micronaut configuration
Once you complete API ML configuration, add configuration to provide correct mapping between API ML and micronaut parameters. 

**Follow these steps:**

1. Add the following yaml snippet with the micronaut configuration parameters:

```yaml
micronaut:
    application:
        name: ${apiml.service.serviceId}
    server:
        port: ${apiml.service.port}
        context-path: /${apiml.service.serviceId}
    ssl:
        enabled: true
        key-store:
            password: ${apiml.service.ssl[0].keyPassword}
            type: ${apiml.service.ssl[0].keyStoreType}
            path: file:${apiml.service.ssl[0].keyStore}
        key:
            alias: ${apiml.service.ssl[0].keyAlias}
            password: ${apiml.service.ssl[0].keyPassword}
        trust-store:
            password: ${apiml.service.ssl[0].trustStorePassword}
            path: file:${apiml.service.ssl[0].trustStore}
            type: ${apiml.service.ssl[0].trustStoreType}
        port: ${apiml.service.port}
        ciphers: ${apiml.service.ssl[0].ciphers}
        protocol: ${apiml.service.ssl[0].protocol}
```
where:

- **`apiml.service.serviceId`**

is the ID of your service
- **`apiml.service.port`**

port on which the service will be listening
- **`apiml.service.ssl[0].keyPassword`**

password protecting the key in keystore
- **`apiml.service.ssl[0].keyStoreType`**

type of the keystore, e.g. PKCS12 
- **`apiml.service.ssl[0].keyStore`**

relative path to the keystore from the point of running application
- **`apiml.service.ssl[0].keyAlias`**

alias under which the key is stored in the keystore
- **`apiml.service.ssl[0].trustStorePassword`**

password protecting the certificates in truststore
- **`apiml.service.ssl[0].trustStore`**

relative path to the trustorestore from the point of running application
- **`apiml.service.ssl[0].trustStoreType`**
type of the truststore, e.g. PKCS12 
- **`apiml.service.ssl[0].ciphers`**
list of ciphers that user wants to enable for TLS communication 
- **`apiml.service.ssl[0].protocol`**
type of SSL/TLS protocol, e.g. TLSv1.2
### (Optional) Logging configuration

Setup custom logging configuration to ..... 
**Follwo these steps:**

1. Create a `logback.xml` file in the `resources` folder and include the `application.yml`. Update the `logback.xml` file with following configuration:

```xml
<configuration>
    <property resource="application.yml" />

    <turboFilter class="ch.qos.logback.classic.turbo.DuplicateMessageFilter">
        <AllowedRepetitions>0</AllowedRepetitions>
    </turboFilter>
    <conversionRule conversionWord="clr" converterClass="org.springframework.boot.logging.logback.ColorConverter" />
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%cyan(%d{yyyy-MM-dd HH:mm:ss.SSS,UTC}) %gray(&lt;${logbackService:-${logbackServiceName}}:%thread:${PID:- }&gt;){magenta} %X{userid:-} %highlight(%-5level) %magenta(\(%logger{15}\)){cyan} %msg%n</pattern>
        </encoder>
    </appender>

    <root level="info">
        <appender-ref ref="STDOUT" />
    </root>
</configuration>
```

### Validate successful registration

After you complete the configuration, make sure that your application is visible within Zowe API ML. For more information, see the article [validating the discoverability of your API service by teh Discovery Service](onboard-spring-boot-enabler.md#validating-the-discoverability-of-your-api-service-by-the-discovery-service), which describes the validation procedure common for all enablers.
