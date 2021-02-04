# Onboarding Micronaut based REST API service

When users want to develope JVM-based service, there is an obvious choice to use Spring framework. Zowe provides a quick way how to setup and register such application to Zowe API Mediation Layer. Purpose of this guide is to provide such possibility for developers, whose framework of choice is Micronaut.

**Tip:** For more information about how to utilize another onboarding method, see:

  * [Onboard a REST API service with the Plain Java Enabler (PJE)](onboard-plain-java-enabler.md)
  * [Onboard a REST service directly calling eureka with xml configuration](onboard-direct-eureka-call.md)
  * [Onboard an existing REST API service without code changes](onboard-static-definition.md)
  * [Onboarding a Spring Boot based REST API Service](onboard-spring-boot-enabler.md)

For Micronaut related documentation, visit official [website](https://docs.micronaut.io/latest/guide/index.html#introduction) of Micronaut framework.

# Gradle build automation system

For the time being, we created guideline for gradle tool only.

For Gradle, follow the steps:

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

4. In build.gralde file, add micronaut enabler as a dependency:

    ```groovy
    implementation "org.zowe.apiml.sdk:onboarding-enabler-micronaut:$zoweApimlVersion"
    ```
5. (Optional) Users who want to create runnable jar file, can leverage shadow plugin. If this is the case, update gradle.build file with plugin:

```
id 'com.github.johnrengelman.shadow' version '6.1.0'
```
Next, you will have to specify main class:
```
mainClassName = '${your.packa.name.MainClassName}' #replace with your main class
```

Then define how the output jar file should be called:
```
shadowJar {
        archiveBaseName.set('micronaut-enabler')
        archiveClassifier.set('')
        archiveVersion.set('1.0')
    }
```

Example of complete `gradle.build` file:


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
**Note** For shadow jar to be created, you need to execute gradle `shadowJar` task. For this sample, plugin will produce `micronaut-enabler-1.0.jar` in `build/libs` directory. Then you will be able to run application with command `java -jar micronaut-enabler-1.0.jar`.

6. From root directory of your project, start the application with `gradle run` command.

## Micronaut application configuration

To be consisten with the rest of the enablers, configuration can be provided in YAML file. Application then will search for file named `application.yml`. There are two importnat sections. First is related to API ML configuration and second is Micronaut related. Both are necessary to correctly register with Zowe API Mediation Layer.

### API ML configuration:
Within application.yml file, this section is prefixed with `apiml`

```yaml
apiml:
    enabled: true
    service:
        serviceId: ${fill.your.serviceId}      # The symbolic name of the service
    #rest of the configuration
```

1. Resolving properties

Nested objects within `apiml.servce` need to be structured as arryas. If not, they won't be resolved and will result as null.

Example:
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
**Note** Mind the `-` before `enabled` depicting the first element of the array.

Sample can be found in [API ML Onboarding Configuration Sample](onboard-spring-boot-enabler.md#api-ml-onboarding-configuration-sample)

### Micronaut configruation
What is new, is the micronaut related part. This configuration provides correct mapping between API ML and micronaut parameters. 

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


### Logging configuration

It is convenient to setup custom logging configuration. If you don't have one yet, following lines could be interesting for you.
As a starting point, you will need to create `logback.xml` file in `resources` folder. This is a place where `application.yml` file lives. Update the `logback.xml` file with following configuration:
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

After all is set and done, you can make sure that your application is visible within Zowe API ML. Follow this [validating guide](onboard-spring-boot-enabler.md#validating-the-discoverability-of-your-api-service-by-the-discovery-service), which is common for all enablers.