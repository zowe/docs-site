# REST APIs service plain Java enabler

This guide is a part of a series of onboarding guides, which outline the onboarding process for REST API services to the ZOWE API Mediation Layer (API ML). This article describes a step-by-step process to onboard a REST API <font color='yellow'>application</font>/<font color="green">service</font> using our plain Java language enabler, which is built without a dependency on Spring Cloud, Spring Boot, or SpringFramework.

**Tip:** For more information about onboarding of API services to the API Mediation Layer, see the [Onboarding Overview](api-mediation-onboard-overview.md)

ZOWE API ML is a lightweight API management system based on the following Netflix components:
* Eureka - a discovery service used for services registration and discovery
* Zuul - reverse proxy / API Gateway
* Ribbon - load ballancer

## Requirements for onboarding a REST API to the API ML

The following criteria must be satisfied to onboard a REST API to the API ML:

* Service discovery information including but not limited to the base URI, home page, status page, and health check endpoint
* Routing metadata of service endpoints. This metadata is used by the API ML Gateway to route HTTP requests
* A service description and API documentation metadata for the API Catalog
* Registeration of the service with the Eureka discovery service instance. Registration includes providing service discovery information, routing metadata, a service description, and API documentation metadata.

**Tip:**

 We recommend you onboard your service using the API ML enabler libraries.  We do not recommend that you prepare corresponding configuration data and call the dedicated Eureka registration endpoint directly. Doing so is unnecessarily complex and time-consuming. While the plain Java enabler library can be used in REST API projects based on SpringFramework or Spring Boot framework, it is not recommended to use this enabler in projects, which depend on SpringCloud Netflix components. Configuration in the Plain Java Enabler and SpringCloud Eureka Client are different. Using the two in combination makes the result state of the discovery registry unpredictable.


  For instructions about how to utilize other API ML enablers types, see the following links: 
  * [Onboard a Spring Boot REST API service](api-mediation-onboard-a-spring-boot-rest-api-service.md) 
  * [Onboard an existing REST API service without code changes](api-mediation-onboard-an-existing-rest-api-service-without-code-changes.md) (deprecated)

## Onboarding your REST service to API ML

The following steps outline the process of onboarding your REST service. Each step is described in further detail in this article. 

1. [Prerequisites](#prerequisites)

2. [Configuring your project](#configuring-your-project)

    * [Gradle guide](#gradle-guide)
    * [Maven guide](#maven-guide)

3. [Changing your source code](#changing-your-source-code)

    * [Adding endpoints](#adding-endpoints)
    * [Registering your service to API ML](#registering-your-service-to-api-ml)
    
        * [Adding a context listener class](#adding-a-context-listener-class)
        * [Register a context listener](#registering-a-context-listener)
        * [Reading service configuration](#reading-service-configuration)
        * [Initializing Eureka Client](#initializing-eureka-client)
        * [Registering with Eureka discovery service](#registering-with-eureka-discovery)

    * [Implementing a periodic call (heartbeat) to the API ML Discovery Service](implementing-a-periodic-call-(heartbeat)-to-the-api-ml-discovery-service) <font color="red">TODO: HeartBeat</font>

4. [Configuring your service](#configuring-your-service)
    * [Eureka discovery service](#eureka-discovery-service)
    * [REST service information](#rest-service-information)
    * [API information](#api-information)
    * [API Catalog information](#api-catalog-information)

5. [Documenting your API](#documenting-your-api)
    * [(Optional) Add Swagger API documentation to your project](#optional-add-swagger-api-documentation-to-your-project)
    * [Add Discovery Client configuration](#add-configuration-for-discovery-client)

6. [Building and Running your service](#building-and-running-your-service)

7. (Optional) [Validating the discovery of your API service by the Discovery Service](#validating-the-discovery-of-your-api-service-by-the-discovery-service)

**Notes:** 
<font color='yellow'> TODO: REMOVE?
* This guide describes how to generate Swagger API documentation using a Springfox library.
* If you use another framework that is based on a Servlet API, you can use `ServletContextListener` that is described later in this article.
* If you use a framework that does not have a `ServletContextListener` class, see the [add context listener](#add-a-context-listener) section in this article for details about how to register and unregister your service with the API ML.
</font>

## Prerequisites

Ensure that the following prerequisites are satified before you begin this onboarding process:

* Your REST API service is written in Java can be deployed and run on z/OS.
* The service has an endpoint that generates Swagger documentation.
* The service container is secured by digital certificate according to TLS v1.2 and accepts requests on HTTPS.


## Configuring your project

You can use either Gradle or Maven build automation systems. Use the appropriate configuration procedure corresponding to your build automation system. 

### Gradle guide
Use the following procedure if you use Gradle as your build automation system.

**Follow these steps:**

1. Create a *gradle.properties* file in the root of your project if one does not already exist.
 
2. In the *gradle.properties* file, set the URL of the ZOWE (aka Giza) Artifactory containing the plain java enabler artifact. Use the credentials in the following code block to gain access to the Maven repository:

    ```ini
    # Repository URL for getting the enabler-java artifact
    artifactoryMavenRepo=https://gizaartifactory.jfrog.io/gizaartifactory/libs-release
    
    # Artifactory credentials for builds:
    mavenUser=apilayer-build
    mavenPassword=lHj7sjJmAxL5k7obuf80Of+tCLQYZPMVpDob5oJG1NI=
    ```

3. Add the following Gradle code block to the `build.gradle` file:

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

    where:

    * **ext** 
    
       Declares the `mavenRepository` property. This property is used as the project repository. 

4. In the same `build.gradle` file, add the following code to the dependencies code block. Doing so adds the enabler-java artifact as a dependency of your project:
    ```gradle
    implementation "com.ca.mfaas.sdk:mfaas-integration-enabler-java:$zoweApimlVersion"
    ```
    **Note:** At time of writing this guide, ZoweApimlVersion is '1.1.11'. Adjust the version to the latest available ZoweApimlVersion. 

5. In your project home directory, run the `gradle clean build` command to build your project. Alternatively you may run `gradlew` to use the specific gradle version that is working with your project.

**Note:** 
  - At time of writing the Plain Java Enabler is build with Gradle v 4.9.
  s

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

    This file specifies the URL of the repository of the Artifactory where you download the enabler-java artifacts.

2. In the same `pom.xml` file, copy the following *xml* tags to add the enabler-java artifact as a dependency of your project:
    ```xml
    <dependency>
        <groupId>com.ca.mfaas.sdk</groupId>
        <artifactId>mfaas-integration-enabler-java</artifactId>
        <version>1.1.2</version>
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
           <username>apilayer-build</username>
           <password>lHj7sjJmAxL5k7obuf80Of+tCLQYZPMVpDob5oJG1NI=</password>
        </server>
    </servers>
    </settings>
    ```
4. Copy the `settings.xml` file inside the `${user.home}/.m2/` directory.

5. In the directory of your project, run the `mvn package` command to build the project.

## Changing your source code

Several changes are required in the source code to successfully onboard your REST API to the API ML. Changes to the source code include the following steps: 

* [Adding endpoints](#adding-endpoints)
* <font color="red">[Registering your service to API ML]</font>(#registering-your-service-to-api-ml)
* [Implementing a periodic call (heartbeat) to the API ML](#implementing-a-periodic-call-(heartbeat)-to-the-api-ml)

### Adding endpoints
 
Add the following endpoints to your application:

   * **Swagger documentation endpoint**

     The endpoint for the Swagger documentation

   * **Health endpoint**

     The endpoint used for health checks by the Discovery Service

   * **Info endpoint**

     The endpoint to get information about the service

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
### Registering your service to API ML

**Follow these steps:**

1. Add a context listener class
The context listener invokes the `apiMediationClient.register(config)` method to register the application with the API Mediation Layer when the application starts. The context listener also invokes the `apiMediationClient.unregister()` method before the application shuts down to unregister the application in API Mediation Layer.

**Note:** If you do not use a Java Servlet API based framework, you can still call the same methods for `apiMediationClient` to register and unregister your application.

Add the following code block to add a context listener class:
    ```

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

2. Register a context listener

Register a context listener to start Discovery client. Add the following code block to the deployment descriptor `web.xml` to register a context listener:

``` xml
    <listener>
        <listener-class>com.ca.mfaas.hellospring.listener.ApiDiscoveryListener</listener-class>
    </listener>
```

3. Add security settings to sevice configuration 

All API services require a certificate that is trusted by API Mediation Layer in order to register with it.

**Follow these steps:**

1. Follow instructions at [Generating certificate for a new service on localhost](https://github.com/zowe/api-layer/tree/master/keystore#generating-certificate-for-a-new-service-on-localhost)

    If the service runs on localhost, the command uses the following format:

       <api-layer-repository>/scripts/apiml_cm.sh --action new-service --service-alias localhost --service-ext SAN=dns:localhost.localdomain,dns:localhost --service-keystore keystore/localhost.keystore.p12 --service-truststore keystore/localhost.truststore.p12 --service-dname "CN=Sample REST API Service, OU=Mainframe, O=Zowe, L=Prague, S=Prague, C=Czechia" --service-password password --service-validity 365 --local-ca-filename <api-layer-repository>/keystore/local_ca/localca    

    Alternatively, copy or use the `<api-layer-repository>/keystore/localhost.truststore.p12` in your service without generating a new certificate, for localhost development.

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

4. Read the service configuration file
In order to register your service with API ML discovery service, read your service configuration from the contezt listener **contextInitialized** implementation:

    ```
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        String configurationFile = "/service-configuration.yml";
        ApiMediationServiceConfig config = new ApiMediationServiceConfigReader(configurationFile).readConfiguration();
        ...
    ```

5. Register with Eureka discovery service
    ```
        ...
        new ApiMediationClientImpl().register(config);
    }
    ```
6. Unregister your service 
Use ContextListener **contextDestroyed** method to unregister your service instance from Eureka discovery service:
    ```
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        apiMediationClient.unregister();
    }
    ```


### Implementing a periodic call (heartbeat) to the API ML Discovery Service

After successful registration, configure your service to send a heartbeat periodically to the Discovery Service. This hearbeat indicates that the service is available. When the Discovery Service does not receive a heartbeat after set period of time, it removes the service instance from the registry.

**Note:** We recommend that the interval for the heartbeat is no longer than 30 seconds.

<font color="yellow">Where is the PUT command issued?</font> Use the `PUT` HTTP method in the following format to tell the Discovery Service that your service is available:

`https://{eureka_hostname}:{eureka_port}/eureka/apps/{serviceId}/{instanceId}`

After you add API ML integration endpoints, you are ready to add service configuration for the Discovery client.

## Configuring your service

Provide your service configuration in the `service-configuration.yml` file located in your resources directory. 

The following code snippet shows `service-configuration.yml` content as an example of a service configuration with the serviceId "hellowspring".

**Example:**

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
 sec    
 routes:
     - gatewayUrl: api/v1
       serviceUrl: /hellospring/api/v1    
 apiInfo:
     - apiId: ${mfaas.discovery.serviceId}
       gatewayUrl: api/v1
       swaggerUrl: ${mfaas.server.scheme}://${mfaas.service.hostname}:${mfaas.server.port}${mfaas.server.contextPath}/api-doc
 catalog:
     tile:
         id: helloworld-spring
         title: HelloWorld Spring REST API
         description: Proof of Concept application to demonstrate exposing a REST API in the MFaaS ecosystem
         version: 1.0.0
 ```

**Note:** The configuration can be externalized <font color="red">TODO: Explain HOW </font>

The content and the structure of the configuration file example above is broken into several parts:

- [REST service identification](#rest-service-identification) 
- [Administrative endpoints](#administrative-endpoints)
- [API Security](#api-security)
- [Eureka discovery service](#eureka-discovery-service) 
- [API routing information](api-routing-information)
- [API info](#api-info) (API Documentation)
- [API Catalog information](#api-catalog-information)

### REST service identification

The following snippet is an example of the service identification properties.

**Example:**

```
serviceId: hellospring
title: Hello Spring REST API
description: Example for exposing a Spring REST API
```

where:
* **serviceId**
    
    Specifies the service instance identifier that is registered in the API ML installation. <font color='yellow'> (in the API ML installation file?)</font>
    The service ID is used in the URL for routing to the API service through the gateway. 
    The service ID uniquely identifies instances of a microservice in the API ML. 
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

### Administrative endpoints 

   The following snippet presents the format of the administrative endpoint properties:
   
   ```
baseUrl: http://localhost:10021/hellospring
homePageRelativeUrl:
statusPageRelativeUrl: /application/info
healthCheckRelativeUrl: /application/health
```
where:

* **baseUrl**
    
    Specifies the URL to your service to the REST resource. It will be the prefix for the following URLs:
        
    * **homePageRelativeUrl**
    * **statusPageRelativeUrl**
    * **healthCheckRelativeUrl** 
        
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

    `statusPageRelativeUrl: /application/info`
    
     This results in the URL:  
    `${baseUrl}/application/info` 

* **healthCheckRelativeUrl**
    
    Specifies the relative path to the health check endpoint of your service. 
    This is the endpoint that you defined in the `MfaasController` controller in the 
    `getHealth` method. Start this URL with `/`.
    
    **Example:**

    `healthCheckRelativeUrl: /application/health`. 
    
     This results in the URL:  
    `${baseUrl}/application/health` 

### API Security 

Use the following procedure to configure API security.
      
**Follow these steps:**

1. Set up a key store with the service certificate.

    All API services require a TLS certificate trusted by API ML in order to register with the API ML.

    **Note:** Follow instructions at [Generating certificate for a new service on localhost](https://github.com/zowe/api-layer/tree/master/keystore#generating-certificate-for-a-new-service-on-localhost)

    If the service runs on localhost, the command uses the following format:

    ```
    <api-layer-repository>/scripts/apiml_cm.sh --action new-service --service-alias localhost --service-ext SAN=dns:localhost.localdomain,dns:localhost --service-keystore keystore/localhost.keystore.p12 --service-truststore keystore/localhost.truststore.p12 --service-dname "CN=Sample REST API Service, OU=Mainframe, O=Zowe, L=Prague, S=Prague, C=Czechia" --service-password password --service-validity 365 --local-ca-filename <api-layer-repository>/keystore/local_ca/localca    
    ```

2. (Optional) For local development, copy or use the following snippet in your service without generating a new certificate:

     `<api-layer-repository>/keystore/localhost.truststore.p12` 

3. Update the configuration of your service `service-configuration.yml` to contain the HTTPS configuration by adding the following code:
      ```
    ssl:
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
    **Note:** You need to define both the key store and the trust store even if your server is not using an HTTPS port.

### Eureka discovery service

Add Eureka discovery parameters to your service.

Eureka discovery service parameters are presented in the following snippet: 

```
discoveryServiceUrls:
- https://localhost:10011/eureka
- http://......
```
 where:      

* **discoveryServiceUrls**
    
    Specifies the public URL of the Discovery Service. The system administrator at the customer site defines this parameter. 
    
     **Example:**

    `http://eureka:password@141.202.65.33:10311/eureka/`


### API routing information

Add API routing information to your service.

The following snippet is an example of the API routing information properties.

**Example:**
   
```
routes:
    - gatewayUrl: api
    serviceUrl: /hellospring
    - gatewayUrl: api/v1
     serviceUrl: /hellospring/api/v1
    - gatewayUrl: api/v1/api-doc
    serviceUrl: /hellospring/api-doc
```
   where:

* **routedServices**
    
    Specifies the routing rules between the gateway service and your service.

* **routedServices.gatewayUrl**
        
    Both gateway-url and service-url parameters specify how the API service endpoints are mapped to the API
            gateway endpoints. The gateway-url parameter sets the target endpoint on the gateway.

* **routedServices.serviceUrl**
        
    Both gateway-url and service-url parameters specify how the API service endpoints are mapped to the API
    gateway endpoints. The service-url parameter points to the target endpoint on the gateway.

### API info

Add API info parameters to your service.

The following snippet presents the API information properties:

```
apiInfo:
    - apiId: org.zowe.hellospring
    gatewayUrl: api/v1
    swaggerUrl: http://localhost:10021/hellospring/api-doc
```
where:

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
        
* **apiInfo.documentationUrl** <font color="yellow">This parameter is not contained in the aforementioned example </font>

    (Optional) Link to external documentation, if needed. The link to the external documentation can be included along with the Swagger documentation.


### API Catalog information

Add API Catalog information to your service.

The following snippet presents API Catalog information properties:

```
catalog:
    tile:
       id: cademoapps
       title: Sample API Mediation Layer Applications
       description: Sample application integrating a service to API-ML
       version: 1.0.0
```
where:

**TO DO: list and describe Catalog parameters.**


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

2. Add a Spring configuration class to your project:

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
3. Customize this configuration according to your specifications. For more information about customization properties, 
see [Springfox documentation](https://springfox.github.io/springfox/docs/snapshot/#configuring-springfox).

3. Customize your configuration parameters to correspond with your API service specifications.

   where:

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


## Building and running your service

After you customize your configuration parameters, you are ready to build and run your service.

**Follow these steps:**

1. Execute `gradle clean build`.

2.  Run your Java application. 

    **Tip:** Wait for the Discovery Service to discover your service. This process may take a few minutes.

3.  Go to the following URL to reach the API Catalog through the Gateway (port 10010):
    ```
    https://localhost:10010/ui/v1/apicatalog/
    ``` 

You successfully onboarded your Java application with the API ML if your service is running and you can access the API documentation. 

## (Optional) Validating the discovery of your API service by the Discovery Service
If your service is not visible in the API Catalog, you can check if your service is discovered by the Discovery Service.

**Follow these steps:**

1. Go to `http://localhost:10011`. 
2. Enter *eureka* as a username and *password* as a password.
3. Check if your application appears in the Discovery Service UI.

If your service appears in the Discovery Service UI but is not visible in the API Catalog, check to ensure 
that your configuration settings are correct. 
