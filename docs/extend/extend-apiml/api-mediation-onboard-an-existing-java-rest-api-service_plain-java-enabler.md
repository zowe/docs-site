# REST APIs service Plain Java Enabler

This article is a part of a series of onboarding guides, which outline the process of onboarding REST API services to the Zowe API Mediation Layer (API ML). As a service developer, you can onboard a REST service with the API ML with the Zowe API Mediation Layer using our Plain Java Eabler (_PJE_). This enabler is built without a dependency on Spring Cloud, Spring Boot, or SpringFramework.

**Tip:** For more information about onboarding API services with the API ML, see the [Onboarding Overview](api-mediation-onboard-overview.md)

## Introduction

Zowe API ML is a lightweight API management system based on the following Netflix components:
* Eureka - a discovery service used for services registration and discovery
* Zuul - reverse proxy / API Gateway
* Ribbon - load ballancer

Using the API enabler libraries is the recommended approach to onboard a REST service with the API ML. While it is possible to call the Eureka registration endpoint directly, this approach requires preparing corresponding configuration data. Doing so is unnecessarily complex and time-consuming. 
 
Additionally, while the plain Java enabler library can be used in REST API projects based on SpringFramework or the Spring Boot framework, it is not recommended to use this enabler in projects that depend on SpringCloud Netflix components. Configuration settings in the _PJE_ and SpringCloud Eureka Client are different. Using the two configuration settings in combination makes the result state of the discovery registry unpredictable.


<<<<<<< HEAD
**Tip:** For more information about how to utilize other API ML enabler approaches, see: 
  * [Onboard a Spring Boot REST API service](#api-mediation-onboard-a-spring-boot-rest-api-service.md) 
=======
  For instructions about how to utilize other API ML enablers types, see the following links: 
>>>>>>> 82c2cf4df6675445ff17e3566cc42a5c050b4c5a
  * [Onboard a rest service directly calling eureka with xml configuration](#api-mediation-onboard-rest-service-direct-eureka-call.md)  
  * [Onboard an existing REST API service without code changes](#api-mediation-onboard-an-existing-rest-api-service-without-code-changes.md)

## Onboarding your REST service with API ML

The following steps outline the overall process to onboard a REST service with the API ML. Each step is described in further detail in this article. 

1. [Prerequisites](#prerequisites)

2. [Configuring your project](#configuring-your-project)

    * [Gradle guide](#gradle-guide)
    * [Maven guide](#maven-guide)

3. [Configuring your service](#configuring-your-service)
    * [Eureka discovery service](#eureka-discovery-service)
    * [REST service information](#rest-service-information)
    * [API information](#api-information)
    * [API Catalog information](#api-catalog-information)

4. [Register your service to API ML](#register-your-service-to-api-ml)
    * [Add a web application context listener class](#add-a-web-application-context-listener-class)
    * [Registering a context listener](#registering-a-context-listener)
    * [Reading service configuration](#reading-service-configuration)
    * [Initializing Eureka Client](#initializing-eureka-client)
    * [Registering with Eureka discovery service](#registering-with-eureka-discovery)

5. [Documenting your API](#documenting-your-api)
    * [(Optional) Add Swagger API documentation to your project](#optional-add-swagger-api-documentation-to-your-project)
    * [Add Discovery Client configuration](#add-configuration-for-discovery-client)

6. (Optional) [Validating your API service discoverability](#validating-the-discovery-of-your-api-service-by-the-discovery-service)

## Prerequisites

* Your REST API service is written in Java.
* The service is enabled to communicate with API ML Discovery Service over a TLS v1.2 secured connection.

<<<<<<< HEAD
**Note:** Following this guide enables REST services to be deployed on a z/OS environment. Deployment to a z/OS environment is, however, not required. 
=======
  **Note:**: It is presumed that your REST service will be deployed on a z/OS environment. However, this is not required.
>>>>>>> 82c2cf4df6675445ff17e3566cc42a5c050b4c5a

## Configuring your project

Use either Gradle or Maven build automation systems to configure your project. Use the appropriate configuration procedure corresponding to your build automation system. 

<<<<<<< HEAD
**Note:** You can use either the Giza Artifactory or an Artifactory of your choice. However, note that if you decide to build the API ML from source, you are required to publish the enabler artifact to your Artifactory. Do this by using the provided gradle tasks provided in the source code. 
=======
ZOWE publishes the API ML artifacts in its own artifactory called GIZA at __https://gizaartifactory.jfrog.io/gizaartifactory/libs-release__.

If you want to use your own API ML binaries built from source code, you'll have to publish the enabler artifact to an other artifactory.
You can use for this purpose the gradle tasks provided with the source code. Set the address and user credentials for your artifactory 
in the gradle.properties file in the source tree root.

The following steps assume using Giza artifactory.
>>>>>>> 82c2cf4df6675445ff17e3566cc42a5c050b4c5a

### Gradle guide
Use the following procedure to use Gradle as your build automation system.

**Follow these steps:**

1. Create a `gradle.properties` file in the root of your project if one does not already exist.
 
<<<<<<< HEAD
2. In the `gradle.properties` file, set the URL of the specific Artifactory containing the _PLE_ artifact. Provide the corresponding credentials to gain access to the Maven repository. 

If you are using the Zowe Giza artifactory, use the credentials in the following code block:
=======
2. In the *gradle.properties* file, set the URL of the artifactory containing the plain java enabler artifact.
Provide the corresponding credentials to gain access to the Maven repository. 
In case of Zowe Giza artifactory use the credentials in the following code block:
>>>>>>> 82c2cf4df6675445ff17e3566cc42a5c050b4c5a

    ```ini
    # Repository URL for getting the enabler-java artifact
    artifactoryMavenRepo=https://gizaartifactory.jfrog.io/gizaartifactory/libs-release
    
    # Artifactory credentials for builds:
    mavenUser=apilayer-build
    mavenPassword=lHj7sjJmAxL5k7obuf80Of+tCLQYZPMVpDob5oJG1NI=
    ```

3. Add the following Gradle code block to the `repositories` section of your `build.gradle` file:

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
    **Note:** The published artifact from the Giza artifactory also contains the enabler dependencies from other software packages.

<<<<<<< HEAD
    If you are using artifactory other than Giza,  manually provide the following dependencies in your service `build.gradle` script: 

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
=======
  **Notes:** 
>>>>>>> 82c2cf4df6675445ff17e3566cc42a5c050b4c5a
    * You may need to add more dependencies as required by your service implementation.     
    * The information provided in this file is valid for ZoweApimlVersion '1.1.12' and above.

<<<<<<< HEAD
5. In your project home directory, run the `gradle clean build` command to build your project. Alternatively. you can run `gradlew` to use the specific gradle version that is working with your project.
=======
5. In your project home directory, run the `gradle clean build` command to build your project. 
Alternatively you may run `gradlew` to use the specific gradle version that is working with your project.
>>>>>>> 82c2cf4df6675445ff17e3566cc42a5c050b4c5a

### Maven guide

Use the following procedure if you use Maven as your build automation system.

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

2. Create a `settings.xml` file and copy the following *xml* code block that defines the credentials for the Artifactory:
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
3. Copy the `settings.xml` file inside the `${user.home}/.m2/` directory.

4. In the directory of your project, run the `mvn package` command to build the project.

  **Notes:** 
     * You may need to add more dependencies as required by your service implementation.     
     * The information provided in this file is valid for ZoweApimlVersion '1.1.12' and above.
     * If you want to use snapshot version set the __/servers/server/id__ in step 2 to __libs-snapshot__

## Configuring your service

Provide default service configuration in the `service-configuration.yml` file located in your service source tree resources directory.
The service on-boarding configuration can be externalized as described in detail in [Externalizing onboarding configuration](#api-mediation-onboard-enabler-external-configuration.md)   

The following code snippet shows an example of `service-configuration.yml`. Some parameters values which are specific for your service deployment 
are written in #{parameterValue} format. In real configuration file provide actual values or externalize the configuration as described in the document linked above. 

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

The on-boarding configuration parameters belong to one of the following groups:

- [REST service identification](rest-service-identification) 
- [Administrative endpoints](administrative-endpoints)
- [API info](api-info)
- [API routing information](api-routing-information)
- [API catalog information](api-catalog-information)
- [API security](api-security)
- [Eureka discovery service](eureka-discovery-service) 

### REST service identification

* **serviceId**
    
    The `serviceId` uniquely identifies instances of a microservice in the API ML.
    The serviceId is used as part of the service URL path in the API ML gateway address space.
    The API ML Gateway then uses the serviceId for routing to the API service instances.
    When two API services use the same service ID, the API Gateway considers the services as clones of each other. 
    An incoming API request can be routed to either of them through utilized load balancing mechanism.
            
    **Important!**  Ensure that the service ID is set properly with the following considerations:
     
    * The same service ID should only be set for multiple API service instances for API scalability.
    * The service ID value must only contain lowercase alphanumeric characters.
    * The service ID cannot contain more than 40 characters.
    * The service ID is linked to (mainframe) security resources. Changes to the service ID require an update of the related security resources.

    **Example:**
    * If the serviceId is `sampleservice`, the service URL in the API ML Gateway address space appears as: 
            
       ```
       https://gateway-host:gateway-port/api/v1/sampleservice/...
       ```

* **title** 
    
  This parameter specifies the human readable name of the API service instance (for example, "Endevor Prod" or "Sysview LPAR1"). 
  This value is displayed in the API Catalog when a specific API service instance is selected. 
  This parameter can be externalized and set by the customer system administrator.

  **Tip:** We recommend that service developer provides a default value of the `title`.
        Use a title that describes the service instance so that the end user knows the specific purpose of the service instance.
    
* **description** 
    
    This parameter specifies a short description of the API service.
    
    **Examples:** 
    
    "CA Endevor SCM - Production Instance" or "CA SYSVIEW running on LPAR1". 
    
     This value is displayed in the API Catalog when a specific API service instance is selected. 
     This parameter can be externalized and set by the customer system administrator.  
    
  **Tip:** Describe the service so that the end user understands the function of the service.

* **baseUrl** 

    specifies the base URL pointing to your service.
        
    `baseUrl` will be then used as a prefix in combination with the administrative end points relative addresses to construct their absolute URL:
    * **homePageRelativeUrl**
    * **statusPageRelativeUrl**
    * **healthCheckRelativeUrl** 
      
    **Example:** 
    * `https://host:port/servicename` for HTTPS service
  
*  **serviceIpAddress** (_Optional_) (_XML_ Path: `/instance/ipAddr`)

    specifies the IP address of the service. This parameter can be provided by system administrator in the externalized service configuration. 
    If this parameter is not present in the YAML/XML configuration file or is not set as service context parameter, it will be resolved from the hostname part of the baseUrl property using `java.net.InetAddress` capabilities.  
      

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
        Multiple services can provide the same API. The API ID can be used
        to locate the same APIs that are provided by different services.
        The creator of the API defines this ID.
        The API ID needs to be a string of up to 64 characters
        that uses lowercase alphanumeric characters and a dot: `.` .
       
     We recommend that you use your organization as the prefix.
s

* **apiInfo.version** 

    specifies the api `version`. This parameter is used to correctly retrieve the API documentation according to requested version of the API.
    
* **apiInfo.gatewayUrl** 

    specifies the base path at the API Gateway where the API is available. 
    Ensure that this value is the same path as the `gatewayUrl` value in the `routes` sections for the routes, which belong to this API.

* **apiInfo.swaggerUrl** 

    (Optional) specifies the HTTP or HTTPS address where the Swagger JSON document is available. 
        
* **apiInfo.documentationUrl** 

    (Optional) specifies the link to the external documentation, if necessary. 
    A link to the external documentation can be included along with the Swagger documentation. 
    
    
### API routing information

The API routing group provides necessary routing information used by the API ML Gateway when routing incoming requests to the corresponding REST API service.
A single route can be used to direct REST calls to multiple resources or API endpoints. The route definition provides rules used by the API ML Gateway to rewrite the URL 
in the gateway address space. Currently the routing information consists of two parameters per route: The gatewayUrl and serviceUrl parameters. These two parameters together specify a rule of how the API service endpoints are mapped to the API gateway endpoints.  

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
        
    The gatewayUrl parameter specifies the portion of the gateway URL which is replaced by the serviceUrl path part

* **routes.serviceUrl** 
        
    The serviceUrl parameter provides a portion of the service instance URL path which replaces the gatewayUrl part (see `gatewayUrl`).

**Note:** The routes configuration contains a prefix before the gatewayUrl and serviceUrl.
This prefix is used to differentiate the routes. It is automatically calculated by the API ML enabler.

For detailed information about API ML routing, please follow this link: [API Gateway Routing](https://github.com/zowe/api-layer/wiki/API-Gateway-Routing)

### API Catalog information

The API ML Catalog UI displays information about discoverable REST services registered with the API ML Discovery Service. 
Information displayed in the catalog is defined by the metadata provided by your service during registration. 
The catalog can group correlated services in the same tile, if these services are configured with the same `catalog.tile.id` metadata parameter. 

The following code block is an example of configuration of a service tile in the catalog:

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
    This is a value used by the API ML to group multiple API services together into tiles. 
    Each unique identifier represents a single API Catalog UI dashboard tile. 

    **Tip:**  Specify a value that does not interfere with API services from other products.
    
* **catalog.tile.title**
    
    specifies the title of the API services product family. This value is displayed in the API Catalog UI dashboard as the tile title.
    
* **catalog.tile.description**
    
    specifies the detailed description of the API services product family. 
    This value is displayed in the API Catalog UI dashboard as the tile description.
    
* **catalog.tile.version**
    
    specifies the semantic version of this API Catalog tile. 

    **Note:** Ensure that you increase the number of the version when you introduce new changes to the product family details of the API services 
    including the title and description.


### API Security 

REST services onboarded on API ML act as both a client and a server. When communicating to API ML Discovery service, REST services are in a client role. On contrary, when the API ML Gateway is routing requests to a service, the service acts as a server.
These two roles have different requirements. 
ZOWE API ML discovery service communicates with its clients in secure https mode. As such, TLS (aka SSL) configuration setup is required when in a service is in server role. In this case, the system administrator decides if the service will communicate with its clients securely or not.

Client services need to configure several TLS/SSL parameters in order to be able to communicate with the API ML Discovery service.
When an enabler is used to onboard the service, the configuration is provided in the `ssl` section/group in the same _YAML_ file that is used to configure the Eureka paramaters and the service metadata. 

For more information about API ML security see the following link: [API ML security](#api-mediation-security.md)

The tls/ssl configuration consists of the following parameters:

  
* **verifySslCertificatesOfServices**
  Allows to prevent server certificate validation.
  *CAUTION* Use with care! Should not be used in production environments, as this will significantly degrade overal security of the system.
  
* **protocol**
  TLSv1.2

  This is the TLS protocol version currently used by ZOWE API ML Discovery service

* **keyAlias**
  
  The `alias` used to address the private key in the keystore 

* **keyPassword**

  The password associated with the private key 
  
* **keyStore**

  The keystore file used to store the private key 

* **keyStorePassword**

  The password used to unlock the keystore

* **keyStoreType**

  The type of the keystore: 


* **trustStore**
  
  A truststore file used to keep other parties public keys and certificates. 

* **trustStorePassword: password**

  The password used to unlock the truststore

* **trustStoreType: PKCS12**

  The truststore type. One of: PKCS12 default

* **ciphers: TLS_RSA_WITH_AES_128_CBC_SHA, TLS_DHE_RSA_WITH_AES_256_CBC_SHA,TLS_ECDH_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDH_RSA_WITH_AES_256_CBC_SHA384,TLS_ECDH_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDH_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA256,TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA384,TLS_ECDH_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDH_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_EMPTY_RENEGOTIATION_INFO_SCSV**

  To secure the transfer of data, TLS/SSL uses one or more cipher suites. A cipher suite is a combination of authentication, encryption, and message authentication code (MAC) algorithms. They are used during the negotiation of security settings for a TLS/SSL connection as well as for the transfer of data.

**Notes:** 
    * You need to define both the key store and the trust store even if your server is not using an HTTPS port.
    * Currently 'ciphers' is not used. It is an optional and serves as a place holder only.

### Eureka discovery service

Eureka discovery service parameters group contains a single parameter used to address Eureka discovery service location.
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
    
     **Example:**

    `http://eureka:password@141.202.65.33:10311/eureka/`


##  Registering your service with API ML

The following steps outline the process of registering your service with API ML:

- [Add a web application context listener class](#add-a-web-application-context-listener)
- [Register a web application context listener](#register-a-web-application-context-listener)
- [Load service configuration](#load-service-configuration)
- [Initialize Eureka Client](#initialize-eureka-client)
- [Register with Eureka discovery service](#register-with-eureka-discovery-service)
- [Unregister your service](#unregister-your-service)


**Follow these steps:**

1. Add a web application context listener class.

    The web application context listener implements two methods to perform necessary actions at application start-up time and also when the application context is destroyed:

     - `contextInitialized` method invokes the `apiMediationClient.register(config)` method to register the application with API Mediation Layer when the application starts. 
     - `contextDestroyed` method invokes the `apiMediationClient.unregister()` method when the application shuts down to unregister the application from API Mediation Layer.

2. Register a web application context listener.

    Add the following code block to the deployment descriptor `web.xml` to register a context listener:
    ``` xml
    <listener>
        <listener-class>com.your.package.ApiDiscoveryListener</listener-class>
    </listener>
    ```

3. Load the service configuration.

    Load your service configuration from a file `service-configuration.yml` file. 
    The configuration parameters are described in the preceding section: [Configuring your service](#configuring-your-service). 
    
    Use the following code as an example of how to load the service configuration:

    **Example:**
     ```
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ...
        String configurationFile = "/service-configuration.yml";
        ApiMediationServiceConfig config = new ApiMediationServiceConfigReader().loadConfiguration(configurationFile);
        ...
    ```
*  **Note** ApiMediationServiceConfigReader class has also other methods for loading the configuration
  from two files, java.util.Map instances or directly from a string. Check ApiMediationServiceConfigReader class JavaDoc for details.

4. Register with Eureka discovery service.

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

    Use the `contextDestroyed` method to unregister your service instance from Eureka discovery service in the following format:

    ```
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        if (apiMediationClient != null) {
            apiMediationClient.unregister();
        }

        apiMediationClient = null;
    }
    ```



**Full example** The following code snippet is a full example of a context listener class implementation:

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
    

### Periodic heartbeat (call) to the API ML Discovery Service

REST services must renew their registration lease by sending heartbeats to the Eureka Discovery Service. 
The heartbeat informs the Eureka Discovery Service that the instance is still alive. 
REST services that are onboarded using an enabler, incorporate a Eureka client instance, which automatically sends heartbeats to the Eureka Discovery Service.      

The Eureka client in the onboarded REST service sends a heartbeat request to the Eureka Server every 30 sec by default.
If the server does not receive a renewal in 90 seconds, it removes the instance from its registry. 

**Note:** The default interval of the EurekaClient heartbeat is one evry 30 seconds.
This is a configurable setting, however, we do not recommend changing this interval. The server uses that information to determine if there is a widespread problem with the client to server communication. If you choose to reconfigure the heartbeat setting, we recommend that the interval for the heartbeat is no longer than 30 seconds.

The heartbeat is issued by EurekaClient using `PUT` HTTP method in the following format:

`https://{eureka_hostname}:{eureka_port}/eureka/apps/{serviceId}/{instanceId}`

After you add API ML integration endpoints, you are ready to add service configuration for the Discovery client.

## API documentation

Use the following procedure to add Swagger API documentation to your project.

**Follow these steps:**

1. Add a Springfox Swagger dependency.

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


  **Note** Version 2.8 of SpringFox which is actual at time of wrting this document does not support OpenAPI 3.0. 
  See the open feature request at GitHub: https://github.com/springfox/springfox/issues/2022 for details.
  If you need to provide your service documentation in OpenAPI 3.0 format, please use an other tool.
  
## (Optional) Validating the discoverability of your API service by the Discovery Service
Once you are able to build and start your service successfully, it is time to validate that it can register correctly with your configured APIML Discovery Service. 

Validatiing your service registration can be done in the API ML Discovery service and the API ML Catalog. 
If your service appears in the Discovery Service UI but is not visible in the API Catalog, 
check to ensure that your configuration settings are correct.

Concrete addresses and user credentials for the individual API ML components will depend on your target runtime environment. 
If you are working with local installation of API ML and you decide to use our dummy identity provider, use the word *'user'* 
as both username and  password. In case API ML was installed by system administrators, ask them to provide you 
with actual addresses of API ML components and the respective user credentials.

**Tip:** Wait for the Discovery Service to discover your service. This process may take a few minutes after your service was successfully started.

**Follow these steps:**

 1. Use the HTTP `GET` method in the following format to query the Discovery Service for your service instance information:
 
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
