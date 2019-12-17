# Onboarding a REST API service with the Plain Java Enabler (PJE)

This article is part of a series of onboarding guides, which outline the process of onboarding REST API services to the Zowe API Mediation Layer (API ML). As a service developer, you can onboard a REST service with the API ML with the Zowe API Mediation Layer using our Plain Java Eabler (_PJE_). This enabler is built without a dependency on Spring Cloud, Spring Boot, or SpringFramework.

**Tip:** For more information about onboarding API services with the API ML, see the [Onboarding Overview](api-mediation-onboard-overview.md).

## Introduction

Zowe API ML is a lightweight API management system based on the following Netflix components:

* Eureka - a discovery service used for services registration and discovery
* Zuul - reverse proxy / API Gateway
* Ribbon - load ballancer

The API ML Discovery Service component uses Netflix/Eureka as a REST services registry.
Eureka endpoints are used to register a service with the API ML Discovery Service. 

The API ML provides onboarding enabler libraries. Using these libraries is the recommended approach to onboard a REST service with the API ML. While it is possible to call the Eureka registration endpoint directly, this approach requires preparing corresponding configuration data. Doing so is unnecessarily complex and time-consuming. 
 
Additionally, while the _PJE_ library can be used in REST API projects based on SpringFramework or the Spring Boot framework, it is not recommended to use this enabler in projects that depend on SpringCloud Netflix components. Configuration settings in the _PJE_ and SpringCloud Eureka Client are different. Using the two configuration settings in combination makes the result state of the discovery registry unpredictable.


**Tip:** For more information about how to utilize another API ML enabler, see: 
  * [Onboard a Spring Boot REST API service](api-mediation-onboard-a-spring-boot-rest-api-service.md) 
  * [Onboard a REST service directly calling eureka with xml configuration](api-mediation-onboard-rest-service-direct-eureka-call.md)  
  * [Onboard an existing REST API service without code changes](api-mediation-onboard-an-existing-rest-api-service-without-code-changes.md)
  * [Java REST APIs service without Spring Boot](api-mediation-onboard-an-existing-java-rest-api-service-without-spring-boot-with-zowe-api-mediation-layer.md)

## Onboarding your REST service with API ML

The following steps outline the overall process to onboard a REST service with the API ML using the _PJE_. Each step is described in further detail in this article. 

1. [Prerequisites](#prerequisites)

2. [Configuring your project](#configuring-your-project)

    * [Gradle guide](#gradle-guide)
    * [Maven guide](#maven-guide)

3. [Configuring your service](#configuring-your-service)
    * [REST service identification](#rest-service-identification)
    * [Administrative endponts](#administrative-endponts)
    * [API info](#api-info)
    * [API routing information](#api=routing-information)
    * [API Catalog information](#api-catalog-information)
    * [API Security](#api-security)
    * [Eureka Discovery Service](#eureka-discovery-service)

4. [Registering your service with API ML](#registering-your-service-with-api-ml)
    * [Add a web application context listener class](#add-a-web-application-context-listener-class)
    * [Register a web application context listener](#register-a-web-application-context-listener)
    * [Load service configuration](#load-service-configuration)
    * [Initialize Eureka Client](#initialize-eureka-client)
    * [Register with Eureka Discovery Service](#register-with-eureka-discovery-service)

5. [Adding API documentation](#adding-api-documentation)
    

6. (Optional) [Validating your API service discoverability](#validating-the-discoverability-of-your-api-service-by-the-discovery-service) 

## Prerequisites

Ensure that the following prerequisites are met before you begin to use the _PJE_ to onboard your REST service with the API ML:

* Your REST API service is written in Java.
* The service is enabled to communicate with API ML Discovery Service over a TLS v1.2 secured connection.

**Notes:** 

* This documentation is valid for `ZoweApimlVersion 1.2.0` and higher. We recommend that you check the Giza Artifactory for newer versions. 

* Following this guide enables REST services to be deployed on a z/OS environment. Deployment to a z/OS environment, however, is not required. As such, you can first develop on a local machine before you deploy on z/OS. 

## Configuring your project

Use either _Gradle_ or _Maven_ build automation systems to configure your project. Use the appropriate configuration procedure corresponding to your build automation system. 

**Note:** You can use either the Giza Artifactory or an Artifactory of your choice. However, if you decide to build the API ML from source, you are required to publish the enabler artifact to your Artifactory. Publish the enabler artifact by using the provided _Gradle_ tasks provided in the source code. 

### Gradle build automation system
Use the following procedure to use _Gradle_ as your build automation system.

**Follow these steps:**

1. Create a `gradle.properties` file in the root of your project if one does not already exist.
 
2. In the `gradle.properties` file, set the URL of the specific Artifactory containing the _PJE_ artifact. Provide the corresponding credentials to gain access to the Maven repository. 

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
4.  In the same `build.gradle` file, add the necessary dependencies for your service. If you use the Java enabler from the Giza Artifactory, add the following code block to your `build.gradle` script: 
    
    ```gradle
    implementation "com.ca.mfaas.sdk:mfaas-integration-enabler-java:$zoweApimlVersion"
    implementation "com.ca.mfaas.sdk:common-service-core:$zoweApimlVersion"
    ```    
    **Note:** The published artifact from the Giza Artifactory also contains the enabler dependencies from other software packages. If you are using an Artifactory other than Giza, manually provide the following dependencies in your service `build.gradle` script: 

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

3. Copy the `settings.xml` file inside the `${user.home}/.m2/` directory.

4. In the directory of your project, run the `mvn package` command to build the project.



## Configuring your service

Provide default service configuration in the `service-configuration.yml` file located in your service source tree resources directory.

**Note:** To externalize service onboarding configuration, see: [Externalizing onboarding configuration](api-mediation-onboard-enabler-external-configuration.md).   

The following code snippet shows an example of `service-configuration.yml`. Some parameters values which are specific for your service deployment 
are written in `#{parameterValue}` format. For your service configuration file, provide actual values or externalize your onboarding configuration.

**Example:**

 ```yaml
 serviceId: sampleservice
 title: Hello API ML 
 description: Sample API ML REST Service
 baseUrl: https://${samplehost}:${sampleport}/${sampleservice}
 serviceIpAddress: ${sampleHostIpAddress}

 homePageRelativeUrl: /application/home
 statusPageRelativeUrl: /application/info
 healthCheckRelativeUrl: /application/health
 
 discoveryServiceUrls:
     - https://${discoveryServiceHost1}:${discoveryServicePort1}/eureka
     - https://${discoveryServiceHost2}:${discoveryServicePort2}/eureka
 
 routes:
     - gatewayUrl: api/v1
       serviceUrl: /sampleservice/api/v1
 
 apiInfo:
     - apiId: org.zowe.sampleservice
       gatewayUrl: api/v1
       swaggerUrl: http://${sampleServiceSwaggerHost}:${sampleServiceSwaggerPort}/sampleservice/api-doc
       doumentationUrl: http://
       version: v1
 catalog:
     tile:
         id: sampleservice
         title: Hello API ML
         description: Sample application to demonstrate exposing a REST API in the ZOWE API ML
         version: 1.0.0

 ssl:
    enabled: true
    verifySslCertificatesOfServices: true
    protocol: TLSv1.2
    ciphers: TLS_RSA_WITH_AES_128_CBC_SHA, TLS_DHE_RSA_WITH_AES_256_CBC_SHA,TLS_ECDH_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDH_RSA_WITH_AES_256_CBC_SHA384,TLS_ECDH_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDH_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA256,TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA384,TLS_ECDH_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDH_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_EMPTY_RENEGOTIATION_INFO_SCSV
    keyAlias: localhost
    keyPassword: password
    keyStore: keystore/localhost.keystore.p12
    keyStoreType: PKCS12
    keyStorePassword: password
    trustStore: keystore/localhost.truststore.p12
    trustStoreType: PKCS12
    trustStorePassword: password
 ```

The onboarding configuration parameters are broken down into the following groups:

- [REST service identification](#rest-service-identification) 
- [Administrative endpoints](#administrative-endpoints)
- [API info](#api-info)
- [API routing information](#api-routing-information)
- [API catalog information](#api-catalog-information)
- [API security](#api-security)
- [Eureka Discovery Service](#eureka-discovery-service) 

### REST service identification

* **serviceId**
    
    The `serviceId` uniquely identifies one or more instance of a microservice in the API ML and is used as part of the service URL path in the API ML gateway address space.
    Additionally, the API ML Gateway uses the `serviceId` for routing to the API service instances.
    When two API services use the same `serviceId`, the API Gateway considers the services as clones of each other. 
    An incoming API request can be routed to either of them through utilized load balancing mechanism.
            
    **Important!**  Ensure that the `serviceId` is set properly with the following considerations:
     
    * The same `servicedId` should only be set for multiple API service instances for API scalability.
    * The `servicedId` value must only contain lowercase alphanumeric characters.
    * The `servicedId` cannot contain more than 40 characters.

    **Example:**
    * If the `serviceId` is `sampleservice`, the service URL in the API ML Gateway address space appears as the following path: 
            
       ```
       https://gateway-host:gateway-port/api/v1/sampleservice/...
       ```

* **title** 
    
  This parameter specifies the human readable name of the API service instance. This value is displayed in the API Catalog when a specific API service instance is selected. 
  This parameter can be externalized and set by the customer system administrator.

  **Tip:** We recommend that service developer provides a default value of the `title`. Use a title that describes the service instance so that the end user knows the specific purpose of the service instance.
    
* **description** 
    
    This parameter is a short description of the API service. This value is displayed in the API Catalog when a specific API service instance is selected. This parameter can be externalized and set by the customer system administrator.  
    
  **Tip:** Describe the service so that the end user understands the function of the service.

* **baseUrl** 

    This parameter specifies the base URL for the following administrative endpoints: 

    * **homePageRelativeUrl**
    * **statusPageRelativeUrl**
    * **healthCheckRelativeUrl** 
      
    Use the following format to include your service name in the URL path: 

     `protocol://host:port/servicename`
  
*  **serviceIpAddress** (Optional) 


    This parameter specifies the IP address of the service and can be provided by system administrator in externalized service configuration. 
    If this parameter is not present in the configuration file or is not set as a service context parameter, it will be resolved from the hostname part of the `baseUrl`.  
      

### Administrative endpoints 

   The following snippet presents the format of the administrative endpoint properties:

   ```
homePageRelativeUrl:
statusPageRelativeUrl: /application/info
healthCheckRelativeUrl: /application/health
```
where:

* **homePageRelativeUrl**  
    
    specifies the relative path to the home page of your service. The path should start with `/`.
    If your service has no home page, leave this parameter blank.
    
    **Examples:**
    * `homePageRelativeUrl: ` This service has no home page
    * `homePageRelativeUrl: /` This service has a home page with URL `${baseUrl}/`
    
    
* **statusPageRelativeUrl** 
    
    specifies the relative path to the status page of your service.
    
    Start this path with `/`.
    
    **Example:**

    `statusPageRelativeUrl: /application/info`
    
     This results in the URL:  
    `${baseUrl}/application/info` 

* **healthCheckRelativeUrl** 
    
    specifies the relative path to the health check endpoint of your service. 
    
    Start this URL with `/`.
    
    **Example:**

    `healthCheckRelativeUrl: /application/health` 
    
     This results in the URL:  
    `${baseUrl}/application/health` 

### API info

REST services can provide multiple APIs. Add API info parameters for each API that your service wants to expose on the API ML.

The following snippet presents the information properties of a single API:

```
apiInfo:
    - apiId: org.zowe.sampleservice
    version: v1 
    gatewayUrl: api/v1
    swaggerUrl: http://localhost:10021/sampleservice/api-doc
    documentationUrl: http://your.service.documentation.url
```

where:
* **apiInfo.apiId** 

    specifies the API identifier that is registered in the API ML installation.
        The API ID uniquely identifies the API in the API ML. 
         The `apiId` can be used to locate the same APIs that are provided by different service instances. The API developer defines this ID.
        The `apiId` must be a string of up to 64 characters
        that uses lowercase alphanumeric characters and a dot: `.` .

* **apiInfo.version** 

    specifies the api `version`. This parameter is used to correctly retrieve the API documentation according to requested version of the API.
    
* **apiInfo.gatewayUrl** 

    specifies the base path at the API Gateway where the API is available. 
    Ensure that this value is the same path as the `gatewayUrl` value in the `routes` sections that apply to this API.

* **apiInfo.swaggerUrl** (Optional)

     specifies the Http or Https address where the Swagger JSON document is available. 
        
* **apiInfo.documentationUrl** (Optional)

     specifies the link to the external documentation. A link to the external documentation can be included along with the Swagger documentation. 
    
    
### API routing information

The API routing group provides the required routing information used by the API ML Gateway when routing incoming requests to the corresponding REST API service.
A single route can be used to direct REST calls to multiple resources or API endpoints. The route definition provides rules used by the API ML Gateway to rewrite the URL 
in the Gateway address space. Currently, the routing information consists of two parameters per route: The `gatewayUrl` and `serviceUrl`. These two parameters together specify a rule for how the API service endpoints are mapped to the API Gateway endpoints.  

The following snippet is an example of the API routing information properties.

**Example:**
   
```
routes:
    - gatewayUrl: api
    serviceUrl: /sampleservice
    - gatewayUrl: api/v1
    serviceUrl: /sampleservice/api/v1
    - gatewayUrl: api/v1/api-doc
    serviceUrl: /sampleservice/api-doc
```
   where:

* **routes** 
    
    specifies the container element for the routes.

* **routes.gatewayUrl** 
        
    The gatewayUrl parameter specifies the portion of the gateway URL which is replaced by the serviceUrl path part.

* **routes.serviceUrl** 
        
    The serviceUrl parameter provides a portion of the service instance URL path which replaces the gatewayUrl part. 

**Note:** The routes configuration contains a prefix before the `gatewayUrl` and `serviceUrl`.
This prefix is used to differentiate the routes. It is automatically calculated by the API ML enabler.

**Tip:** For more information about API ML routing, see: [API Gateway Routing](https://github.com/zowe/api-layer/wiki/API-Gateway-Routing).

### API Catalog information

The API ML Catalog UI displays information about discoverable REST services registered with the API ML Discovery Service. 
Information displayed in the Catalog is defined by the metadata provided by your service during registration. 
The Catalog groups correlated services in the same tile, if these services are configured with the same `catalog.tile.id` metadata parameter. 

The following code block is an example of configuration of a service tile in the Catalog:

**Example:**

 ```
    catalog:
      tile:
        id: apimediationlayer
        title:  API Mediation Layer API
        description: The API Mediation Layer for z/OS internal API services.
        version: 1.0.0
```

where:

* **catalog.tile.id**
    
    specifies the unique identifier for the product family of API services. 
    This is a value used by the API ML to group multiple API services into a single tile. 
    Each unique identifier represents a single API dashboard tile in the Catalog. 

    **Tip:**  Specify a value that does not interfere with API services from other products. We recommend that you use your company and product name as part of the ID.
    
* **catalog.tile.title**
    
    specifies the title of the product family of the API service. This value is displayed in the API Catalog dashboard as the tile title.
    
* **catalog.tile.description**
    
    is the detailed description of the API services product family. This value is displayed in the API Catalog UI dashboard as the tile description.
    
* **catalog.tile.version**
    
    specifies the semantic version of this API Catalog tile. 

    **Note:** Ensure that you increase the version number when you introduce changes to the API service product family details. 

### API Security 

REST services onboarded with the API ML act as both a client and a server. When communicating to API ML Discovery service, a REST service acts as a client. When the API ML Gateway is routing requests to a service, the REST service acts as a server.
These two roles have different requirements. 
The Zowe API ML Discovery Service communicates with its clients in secure Https mode. As such, TLS/SSL configuration setup is required when a service is acting as a server. In this case, the system administrator decides if the service will communicate with its clients securely or not.

Client services need to configure several TLS/SSL parameters in order to communicate with the API ML Discovery service.
When an enabler is used to onboard a service, the configuration is provided in the `ssl` section/group in the same _YAML_ file that is used to configure the Eureka paramaters and the service metadata. 

For more information about API ML security see: [API ML security](#api-mediation-security.md)

TLS/SSL configuration consists of the following parameters:
  
* **verifySslCertificatesOfServices**

  This parameter makes it possible to prevent server certificate validation.

  **Important!** Ensure that this parameter is set to `true` in production environments. Setting this parameter to `false` in production environemnts significantly degrades the overall security of the system.
  
* **protocol**

    This parameter specifies the TLS protocol version currently used by Zowe API ML Discovery Service. 
    
    **Tip:** We recommend you use `TLSv1.2` as your security protocol

* **keyAlias**
  
  This parameter specifies the `alias` used to address the private key in the keystore. 

* **keyPassword**

  This parameter specifies the password associated with the private key. 
  
* **keyStore**

  This parameter specifies the keystore file used to store the private key. 

* **keyStorePassword**

  This parameter specifies the password used to unlock the keystore.

* **keyStoreType**

  This parameter specifies the type of the keystore. 

* **trustStore**
  
  This parameter specifies the truststore file used to keep other parties public keys and certificates. 

* **trustStorePassword: password**

  This parameter specifies the password used to unlock the truststore.

* **trustStoreType: PKCS12**

  This parameter specifies the truststore type. The default for this parameter is PKCS12.

* **ciphers:** (Optional)

    This parameter specifies the recommended ciphers. 

    ```
    TLS_RSA_WITH_AES_128_CBC_SHA, TLS_DHE_RSA_WITH_AES_256_CBC_SHA,TLS_ECDH_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDH_RSA_WITH_AES_256_CBC_SHA384,TLS_ECDH_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDH_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA256,TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA384,TLS_ECDH_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDH_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_EMPTY_RENEGOTIATION_INFO_SCSV
    ```
  To secure the transfer of data, TLS/SSL uses one or more cipher suites. A cipher suite is a combination of authentication, encryption, and message authentication code (MAC) algorithms. CIphers are used during the negotiation of security settings for a TLS/SSL connection as well as for the transfer of data.

**Notes:** 

* Ensure that you define both the key store and the trust store even if your server is not using an Https port.
* Currently `ciphers` is not used. It is optional and serves as a place holder only.

### Eureka Discovery Service

Eureka Discovery Service parameters group contains a single parameter used to address Eureka Discovery Service location.
An example is presented in the following snippet: 

```
discoveryServiceUrls:
- https://localhost:10011/eureka
- http://......
```
 where:      

* **discoveryServiceUrls** 
    
    specifies the public URL of the Discovery Service. The system administrator at the customer site defines this parameter.
    It is possible to provide multiple values in order to utilize fail over and/or load balancing mechanisms.  
    
 
##  Registering your service with API ML

The following steps outline the process of registering your service with API ML. Each step is described in detail in this article.

1. Add a web application context listener class
2. Register a web application context listener
3. Load service configuration
4. Register with Eureka discovery service
5. Unregister your service

**Follow these steps:**

1. Add a web application context listener class.

    The web application context listener implements two methods to perform necessary actions at application start-up time as well as when the application context is destroyed:

     - The `contextInitialized` method invokes the `apiMediationClient.register(config)` method to register the application with API Mediation Layer when the application starts. 
     - The `contextDestroyed` method invokes the `apiMediationClient.unregister()` method when the application shuts down. This unregisters the application from the API Mediation Layer.

2. Register a web application context listener.

    Add the following code block to the deployment descriptor `web.xml` to register a context listener:
    ``` xml
    <listener>
        <listener-class>com.your.package.ApiDiscoveryListener</listener-class>
    </listener>
    ```

3. Load the service configuration.

    Load your service configuration from a file `service-configuration.yml` file. 
    The configuration parameters are described in the preceding section, [Configuring your service](#configuring-your-service). 
    
    Use the following code as an example of how to load the service configuration.

    **Example:**
     ```
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ...
        String configurationFile = "/service-configuration.yml";
        ApiMediationServiceConfig config = new ApiMediationServiceConfigReader().loadConfiguration(configurationFile);
        ...
    ```
    **Note:** The `ApiMediationServiceConfigReader` class also provides other methods for loading the configuration from two files, `java.util.Map` instances, or directly from a string. Check the `ApiMediationServiceConfigReader` class JavaDoc for details.

4. Register with Eureka Discovery Service.

     Use the following call to register your service instance with Eureka Discovery Service:

    ```
      try {
          apiMediationClient = new ApiMediationClientImpl()
          apiMediationClient.register(config);
      } catch (ServiceDefinitionException sde) {
          log.error("Service configuration failed. Check log for previous errors: ", sde);
      }
    ```

5. Unregister your service.

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
The following code block is a full example of a context listener class implementation.

**Example:** 

    import com.ca.mfaas.eurekaservice.client.ApiMediationClient;
    import com.ca.mfaas.eurekaservice.client.config.ApiMediationServiceConfig;
    import com.ca.mfaas.eurekaservice.client.impl.ApiMediationClientImpl;
    import com.ca.mfaas.eurekaservice.client.util.ApiMediationServiceConfigReader;
    import com.ca.mfaas.exception.ServiceDefinitionException;
    import lombok.extern.slf4j.Slf4j;
    
    import javax.servlet.ServletContextEvent;
    import javax.servlet.ServletContextListener;

    /**
     *  API ML Micro service implementation of ServletContextListener interface.
     */
    @Slf4j
    public class ApiDiscoveryListener implements ServletContextListener {
    
        /**
         * @{link ApiMediationClient} instance used to register and unregister the service with API ML Discovery service.
         */
        private ApiMediationClient apiMediationClient;
    
        /**
         *  Loads a {@link ApiMediationServiceConfig} using an instance of class ApiMediationServiceConfigReader
         *  and registers this micro service with API ML.
         *
         *  {@link ApiMediationServiceConfigReader} has several methods for loading configuration from YAML file,
         *  {@link java.util.Map} or a string containing the configuration data.
         *
         *  Here we use the most convenient method for our Java Servlet based service,
         *  i.e expecting all the necessary initialization information to be present
         *  in the  {@link javax.servlet.ServletContext} init parameters.
    
         *  After successful initialization, this method creates an {@link ApiMediationClient} instance,
         *  which is then used to register this service with API ML Discovery Service.
         *
         *  The registration method of ApiMediationClientImpl catches all RuntimeExceptions
         *  and only can throw {@link ServiceDefinitionException} checked exception.
         *
         * @param sce
         */
        @Override
        public void contextInitialized(ServletContextEvent sce) {
            try {
                /*
                 * Load configuration method with ServletContext
                 */
                ApiMediationServiceConfig config = new ApiMediationServiceConfigReader().loadConfiguration(sce.getServletContext());
                if (config  != null) {
                    /*
                     * Instantiate {@link ApiMediationClientImpl} which is used to un/register the service with API ML Discovery Service.
                     */
                    apiMediationClient = new ApiMediationClientImpl();
    
                    /*
                     * Call the {@link ApiMediationClient} instance to register your micro service with API ML Discovery Service.
                     */
                    apiMediationClient.register(config);
                }
            } catch (ServiceDefinitionException sde) {
                log.error("Service configuration failed. Check log for previous errors: ", sde);
            }
        }
    
        /**
         * If apiMediationClient is not null, attmpts to unregister this service from API ML registry.
         */
        @Override
        public void contextDestroyed(ServletContextEvent sce) {
            if (apiMediationClient != null) {
                apiMediationClient.unregister();
            }
            
            apiMediationClient = null;
        }
    }
    



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
