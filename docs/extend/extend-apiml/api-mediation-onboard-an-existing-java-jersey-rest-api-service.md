
# Java Jersey REST APIs

As an API developer, use this guide to onboard your Java Jersey REST API service into the Zowe API Mediation Layer. This article outlines a step-by-step process to make your API service available in the API Mediation Layer.

The following procedure is an overview of steps to onboard a Java Jersey REST API application with the API Mediation Layer. 

**Follow these steps:**

1. [Get enablers from the Artifactory](#get-enablers-from-the-artifactory)

2. [Add API ML Onboarding Configuration](add-api-ml-onboarding-configuration)

3. [Externalize Parameters](#externalize-parameters)

4. [Download Apache Tomcat and enable SSL](#download-apache-tomcat-and-enable-ssl)

5. [Run your Service](#run-your-service)

## Get enablers from the Artifactory

The first step to onboard a Java Jersey REST API into the Zowe ecosystem is to get enabler annotations from the Artifactory. Enablers prepare your service for discovery and for the retrieval of Swagger documentation.

You can use either Gradle or Maven build automation systems. 

### Gradle guide
Use the following procedure if you use Gradle as your build automation system.

**Tip:** To migrate from Maven to Gradle, go to your project directory and run `gradle init`. This converts the Maven build to a Gradle build by generating a _setting.gradle_ file and a _build.gradle_ file.
         
**Follow these steps:**

1.  Create a _gradle.properties_ file in the root of your project.
 
2.  In the _gradle.properties_ file, set the following URL of the repository and customize the values of your credentials to access the repository.

    ```
    # Repository URL for getting the enabler-jersey artifact (`integration-enabler-java`)
    artifactoryMavenRepo=https://gizaartifactory.jfrog.io/gizaartifactory/libs-release
   
    # Artifactory credentials for builds:
    mavenUser=apilayer-build
    mavenPassword=lHj7sjJmAxL5k7obuf80Of+tCLQYZPMVpDob5oJG1NI=
    ```

    This file specifies the URL for the repository of the Artifactory. The enabler-jersey artifact is downloaded from this repository.

3. Add the following Gradle code block to the *build.gradle* file:

    ```groovy
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
   
4. In the same _build.gradle_ file, add the following code to the dependencies code block to add the enabler-jersey artifact as a dependency of your project:

    ```groovy
      compile(group: 'com.ca.mfaas.sdk', name:   'mfaas-integration-enabler-java', version: '1.1.0')
    ```
    
5. In your project directory, run the `gradle build` command to build your project.
    
### Maven guide

Use the following procedure if you use Maven as your build automation system.

**Tip:** To migrate from Gradle to Maven, go to your project directory and run `gradle install`. This command automatically generates a *pom-default.xml* inside the _build/poms_ subfolder where all of the dependencies are contained. 

**Follow these steps:**
     
1. Add the following _xml_ tags within the newly created *pom.xml* file:

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

    This file specifies the URL for the repository of the Artifactory where you download the enabler-jersey artifact.

2. In the same file, copy the following _xml_ tags to add the enabler-jersey artifact as a dependency of your project:
   ```xml
    <dependency>
        <groupId>com.ca.mfaas.sdk</groupId>
        <artifactId>mfaas-integration-enabler-java</artifactId>
        <version>1.1.0</version>
    </dependency>
   ```
3. Create a _settings.xml_ file and copy the following _xml_ code block which defines the credentials for the Artifactory:
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
4. Copy the _settings.xml_ file inside `${user.home}/.m2/` directory.
    
5. In the directory of your project, run the `mvn package` command to build the project.

## Add API ML Onboarding Configuration
<!-- TODO -->
As an API service developer, you set multiple configuration settings in your application.yml that correspond to the API ML. These settings enable an API to be discoverable and included in the API catalog. Some of the settings in the application.yml are internal and are set by the API service developer. Some settings are externalized and set by the customer system administrator. Those external settings are service parameters and are in the format: ${environment.*}.

**Important!** Spring Boot configuration can be externalized in multiple ways. For more information see: [Externalized configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html). This Zowe onboarding documentation applies to API services that use an application.yml file for configuration. If your service uses a different configuration option, transform the provided configuration sample to the format that your API service uses.

**Tip:** For information about how to set your configuration when running a Spring Boot application under an external servlet container (TomCat), see the following short stackoverflow article: [External configuration for spring-boot application](https://stackoverflow.com/questions/29106579/external-configuration-for-spring-boot-application).

**Follow these steps:**

1. Add the following #MFAAS configuration section in your `application.yml`:

    ```
      ##############################################################################################
      # MFAAS configuration section
      ##############################################################################################
      mfaas:
          discovery:
              serviceId: ${environment.serviceId}
              locations: ${environment.discoveryLocations}
              enabled: ${environment.discoveryEnabled:true}
              endpoints:
                  statusPage: ${mfaas.server.scheme}://${mfaas.service.hostname}:${mfaas.server.port}${mfaas.server.contextPath}/application/info
                  healthPage: ${mfaas.server.scheme}://${mfaas.service.hostname}:${mfaas.server.port}${mfaas.server.contextPath}/application/health
                  homePage: ${mfaas.server.scheme}://${mfaas.service.hostname}:${mfaas.server.port}${mfaas.server.contextPath}/
              info:
                  serviceTitle:  ${environment.serviceTitle}
                  description:  ${environment.serviceDescription}
                  # swaggerLocation: resource_location_of_your_static_swagger_doc.json
              fetchRegistry: false
              region: default
          service:
              hostname: ${environment.hostname}
              ipAddress: ${environment.ipAddress}
          catalog-ui-tile:
              id: yourProductFamilyId
              title: Your API service product family title in the API catalog dashboard tile
              description: Your API service product family description in the API catalog dashboard tile
              version:  1.0.0
          server:
              scheme: http
              port: ${environment.port}
              contextPath: /yourServiceUrlPrefix

      eureka:
          instance:
              appname: ${mfaas.discovery.serviceId}
              hostname: ${mfaas.service.hostname}
              statusPageUrlPath: ${mfaas.discovery.endpoints.statusPage}
              healthCheckUrl: ${mfaas.discovery.endpoints.healthPage}
              homePageUrl: ${mfaas.discovery.endpoints.homePage}
              metadata-map:
                  routed-services:
                      api_v1:
                          gateway-url: "api/v1"
                          service-url: ${mfaas.server.contextPath}
                  apiml:
                      apiInfo:
                          - apiId: ${mfaas.discovery.serviceId}
                            gatewayUrl: api/v1
                            swaggerUrl: ${mfaas.server.scheme}://${mfaas.service.hostname}:${mfaas.server.port}${mfaas.server.contextPath}/api-doc
                            documentationUrl: https://www.zowe.org
                  mfaas:
                      api-info:
                          apiVersionProperties:
                              v1:
                                  title: Your API title for swagger JSON which is displayed in API Catalog / service / API Information
                                  description: Your API description for swagger JSON
                                  version: 1.0.0
                                  basePackage: your.service.base.package.for.swagger.annotated.controllers
                                  # apiPattern: /v1/.*  # alternative to basePackage for exposing endpoints which match the regex pattern to swagger JSON
                      discovery:
                          catalogUiTile:
                              id: ${mfaas.catalog-ui-tile.id}
                              title:  ${mfaas.catalog-ui-tile.title}
                              description: ${mfaas.catalog-ui-tile.description}
                              version: ${mfaas.catalog-ui-tile.version}
                          enableApiDoc: ${mfaas.discovery.info.enableApiDoc:true}
                          service:
                              title: ${mfaas.discovery.info.serviceTitle}
                              description: ${mfaas.discovery.info.description}
          client:
              enabled: ${mfaas.discovery.enabled}
              healthcheck:
                  enabled: true
              serviceUrl:
                  defaultZone: ${mfaas.discovery.locations}
              fetchRegistry:  ${mfaas.discovery.fetchRegistry}
              region: ${mfaas.discovery.region}

      ##############################################################################################
      # Application configuration section
      ##############################################################################################
      server:
          # address: ${mfaas.service.ipAddress}
          port: ${mfaas.server.port}
          servlet:
              contextPath: ${mfaas.server.contextPath}

      spring:
          application:
              name: ${mfaas.discovery.serviceId}      
    ```
    In order to run your application locally, you need to define variables used under the `environment` group. 
    
    ```yaml
    ##############################################################################################
   # Local configuration section
    ##############################################################################################
 
    environment:
        serviceId: Your service id
        serviceTitle: Your service title
        serviceDescription: Your service description
        discoveryEnabled: true
        hostname: localhost
        port: Your service port
        discoveryLocations: https://localhost:10011/eureka/
        ipAddress: 127.0.0.1
    ```
    
    **Important:** Add this configuration also to the `application.yml` used for testing. Failure to add this configuration to the `application.yml` will cause your tests to fail.
    
2. Change the MFaaS parameters to correspond with your API service specifications. Most of these internal parameters contain "your service" text.

    **Note:**  `${mfaas.*}` variables are used throughout the `application.yml` sample to reduce the number of required changes.

    **Tip:** When existing parameters set by the system administrator are already present in your configuration file (for example, `hostname, address, contextPath,` and `port`), we recommend that you replace them with the corresponding MFaaS properties.

    a. **Discovery Parameters**

    * **mfaas.discovery.serviceId**

         Specifies the service instance identifier to register in the API ML installation. The service ID is used in the URL for routing to the API service through the gateway. The service ID uniquely identifies instances of a microservice in the API ML. The system administrator at the customer site defines this parameter.  

        **Important!**  Ensure that the service ID is set properly with the following considerations:

         * When two API services use the same service ID, the API Gateway considers the services to be clones. An incoming API request can be routed to either of them.
         * The same service ID should be set for only multiple API service instances for API scalability.
         * The service ID value must contain only lowercase alphanumeric characters.
         * The service ID cannot contain more than 40 characters.
         * The service ID is linked to security resources. Changes to the service ID require an update of security resources.
         * The service ID must match the `spring.application.name` parameter.

         **Examples:**

         * If the customer system administrator sets the service ID to `sysviewlpr1`, the API URL in the API Gateway appears as the following URL:
            ```
            https://gateway:port/api/v1/sysviewlpr1/endpoint1/...
            ```
         * If the customer system administrator sets the service ID to vantageprod1, the API URL in the API Gateway appears as the following URL:             
            ```
            http://gateway:port/api/v1/vantageprod1/endpoint1/...
            ```

    * **mfaas.discovery.locations**

        Specifies the public URL of the Discovery Service. The system administrator at the customer site defines this parameter.

        **Example:**
         ```
         http://eureka:password@141.202.65.33:10311/eureka/
         ```
    * **mfaas.discovery.enabled**

        Specifies whether the API service instance is to be discovered in the API ML. The system administrator at the customer site defines this parameter. Set this parameter to `true` if the API ML is installed and configured. Otherwise, you can set this parameter to `false` to exclude an API service instances from the API ML.    
    * **mfaas.discovery.fetchRegistry**

        Specifies whether the API service is to receive regular update notifications from the discovery service. Under most circumstances, you can accept the default value of `false` for the parameter.

    * **mfaas.discovery.region**

        Specifies the geographical region. This parameter is required by the Discovery client. Under most circumstances you can accept the value `default` for the parameter.          

    b. **Service and Server Parameters**
    * **mfaas.service.hostname**

        Specifies the hostname of the system where the API service instance runs. This parameter is externalized and is set by the customer system administrator. The administrator ensures the hostname can be resolved by DSN to the IP address that is accessible by applications running on their z/OS systems.   
    * **mfaas.service.ipAddress**

        Specifies the local IP address of the system where the API service instance runs. This IP address may or may not be a public IP address. This parameter is externalized and set by the customer system administrator.
    * **mfaas.server.scheme**

       Specifies whether the API service is using the HTTPS protocol. This value can be set to `https` or `http` depending on whether your service is using SSL.
    * **mfaas.server.port**

       Specifies the port that is used by the API service instance. This parameter is externalized and set by the customer system administrator.
    * **mfaas.server.contextPath**

       Specifies the prefix that is used within your API service URL path.

       **Examples:**
       * If your API service does not use an extra prefix in the URL (for example, `http://host:port/endpoint1/`), set this value to `/`.
       * If your API service uses an extra URL prefix set the parameter to that prefix value.
         For the URL: `http://host:port/filemaster/endpoint1/`, set this parameter to `/filemaster`.  
       * In both examples, the API service URL appears as the following URL when routed through the Gateway:
            ```
            http://gateway:port/serviceId/endpoint1/
            ```

    c. **API Catalog Parameters**

      These parameters are used to populate the API Catalog. The API Catalog contains information about every registered API service. The Catalog also groups related APIs. Each API group has its own name and description. Catalog groups are constructed in real-time based on information that is provided by the API services. Each group is displayed as a tile in the API Catalog UI dashboard.
      * **mfaas.catalog-ui-tile.id**

        Specifies the unique identifier for the API services product family. This is the grouping value used by the API ML to group multiple API services together into "tiles". Each unique identifier represents a single API Catalog UI dashboard tile. Specify a value that does not interfere with API services from other products.

      * **mfaas.catalog-ui-tile.title**

        Specifies the title of the API services product family. This value is displayed in the API Catalog UI dashboard as the tile title

      * **mfaas.catalog-ui-tile.description**

        Specifies the detailed description of the API services product family. This value is displayed in the API Catalog UI dashboard as the tile description

      * **mfaas.catalog-ui-tile.version**

        Specifies the semantic version of this API Catalog tile. Increase the version when you introduce new changes to the API services product family details (title and description).

      * **mfaas.discovery.info.serviceTitle**

        Specifies the human readable name of the API service instance (for example, "Endevor Prod" or "Sysview LPAR1"). This value is displayed in the API Catalog when a specific API service instance is selected. This parameter is externalized and set by the customer system administrator.

         ![Service Status](../../images/api-mediation/Service-Status.png)

         **Tip:** We recommend that you provide a good default value or give good naming examples to the customers.
      * **mfaas.discovery.info.description**

          Specifies a short description of the API service.

          **Example:** "CA Endevor SCM - Production Instance" or "CA SYSVIEW running on LPAR1".
          This value is displayed in the API Catalog when a specific API service instance is selected. This parameter is externalized and set by the customer system administrator.  

        **Tip:** We recommend that you provide a good default value or give good naming examples to the customers. Describe the service so that the end user knows the function of the service.
      * **mfaas.discovery.info.swaggerLocation**

        Specifies the location of a static swagger document. The JSON document contained in this file is displayed instead of the automatically generated API documentation. The JSON file must contain a valid OpenAPI 2.x Specification document. This value is optional and commented out by default.

        **Note:** Specifying a `swaggerLocation` value disables the automated JSON API documentation generation with the SpringFox library. By disabling auto-generation, you need to keep the contents of the manual swagger definition consistent with your endpoints. We recommend to use auto-generation to prevent incorrect endpoint definitions in the static swagger documentation.  

    d. **Metadata Parameters**

      The routing rules can be modified with parameters in the metadata configuration code block.  

      **Note:** If your REST API does not conform to Zowe API Mediation layer REST API Building codes, configure routing to transform your actual endpoints (serviceUrl) to gatewayUrl format. For more information see: [REST API Building Codes](https://docops.ca.com/display/IWM/Guidelines+for+Building+a+New+API)
      * `eureka.instance.metadata-map.routed-services.<prefix>`

        Specifies a name for routing rules group. This parameter is only for logical grouping of further parameters. You can specify an arbitrary value but it is a good development practice to mention the group purpose in the name.

        **Examples:**
        ```
        api_v1
        api_v2
        ```
      * `eureka.instance.metadata-map.routed-services.<prefix>.gatewayUrl`

           Both gateway-url and service-url parameters specify how the API service endpoints are mapped to the API gateway endpoints. The gateway-url parameter sets the target endpoint on the gateway.
      * `metadata-map.routed-services.<prefix>.serviceUrl`

          Both gateway-url and service-url parameters specify how the API service endpoints are mapped to the API gateway endpoints. The service-url parameter points to the target endpoint on the gateway.
      * `eureka.instance.metadata-map.apiml.apiInfo.apiId`
      
          Specifies the API identifier that is registered in the API Mediation Layer installation. The API ID uniquely identifies the API in the API Mediation Layer.
          The same API can be provided by multiple services. The API ID can be used to locate the same APIs that are provided by different services. The creator of the API defines this ID.
          The API ID needs to be a string of up to 64 characters that uses lowercase alphanumeric characters and a dot: `.`. We recommend that you use your organization as the prefix.
      * `eureka.instance.metadata-map.apiml.apiInfo.gatewayUrl`
      
          The base path at the API gateway where the API is available. Ensure that it is the same path as the _gatewayUrl_ value in the _routes_ sections.
          
      * `eureka.instance.metadata-map.apiml.apiInfo.documentationUrl`
      
          (Optional) Link to external documentation, if needed. The link to the external documentation can be included along with the Swagger documentation.
      * `eureka.instance.metadata-map.apiml.apiInfo.swaggerUrl`
      
          (Optional) Specifies the HTTP or HTTPS address where the Swagger JSON document is available.             
        **Important!** Ensure that each of the values for gatewayUrl parameter are unique in the configuration. Duplicate gatewayUrl values may cause requests to be routed to the wrong service URL.

        **Note:** The endpoint `/api-doc` returns the API service Swagger JSON. This endpoint is introduced by the `@EnableMfaasInfo` annotation and is utilized by the API Catalog.

    e. **Swagger Api-Doc Parameters**

      Configures API Version Header Information, specifically the [InfoObject](https://swagger.io/specification/#infoObject) section, and adjusts Swagger documentation that your API service returns. Use the following format:

      ```
    api-info:
       apiVersionProperties:
          v1:
              title: Your API title for swagger JSON which is displayed in API Catalog / service / API Information
              description: Your API description for swagger JSON
              version: 1.0.0
              basePackage: your.service.base.package.for.swagger.annotated.controllers
              # apiPattern: /v1/.*  # alternative to basePackage for exposing endpoints which match the regex pattern to swagger JSON
      ```   

    The following parameters describe the function of the specific version of an API. This information is included in the swagger JSON and displayed in the API Catalog:

    ![API information detail](../../images/api-mediation/Service-detail.png)


   * **v1**

     Specifies the major version of your service API: `v1, v2,` etc.
   * **title**

        Specifies the title of your service API.
   * **description**             

        Specifies the high-level function description of your service API.
   * **version**

        Specifies the actual version of the API in semantic format.
   * **basePackage**

        Specifies the package where the API is located. This option only exposes endpoints that are defined in a specified java package. The parameters `basePackage` and `apiPattern` are mutually exclusive. Specify only one of them and remove or comment out the second one.
   * **apiPattern**

        This option exposes any endpoints that match a specified regular expression. The parameters `basePackage` and `apiPattern` are mutually exclusive. Specify just one of them and remove or comment out the second one.

        **Tip:** You have three options to make your endpoints discoverable and exposed: `basePackage`, `apiPattern`, or none (if you do not specify a parameter). If `basePackage` or `apiPattern` are not defined, all endpoints in the Spring Boot app are exposed.

## Setup keystore with the service certificate

To register with the API Mediation Layer, a service is required to have a certificate that is trusted by API Mediation Layer.

**Follow these steps:**

1. Follow instructions at [Generating certificate for a new service on localhost](https://github.com/zowe/api-layer/tree/master/keystore#generating-certificate-for-a-new-service-on-localhost)

    When a service is running on localhost, the command can have the following format:
       
    ```
    <api-layer-repository>/scripts/apiml_cm.sh --action new-service --service-alias localhost --service-ext SAN=dns:localhost.localdomain,dns:localhost --service-keystore keystore/localhost.keystore.p12 --service-truststore keystore/localhost.truststore.p12 --service-dname "CN=Sample REST API Service, OU=Mainframe, O=Zowe, L=Prague, S=Prague, C=Czechia" --service-password password --service-validity 365 --local-ca-filename <api-layer-repository>/keystore/local_ca/localca    
    ```
        
    Alternatively, for the purpose of local development, copy or use the `<api-layer-repository>/keystore/localhost.truststore.p12` in your service without generating a new certificate.

2. Update the configuration of your service `application.yml` to contain the HTTPS configuration by adding the following code:
       
    ```
    server:
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

**Note:** You need to define both keystore and truststore even if your server is not using HTTPS port.



## Externalize parameters

In order to externalize parameters, you have to create a `ServletContextListener`. To  create your own 
`ServletContextListener`, register a `ServletContextListener` and enable it to read all 
the properties defined inside the .*yml* file.

**Follow these steps:**

1. Define parameters that you want to externalize in a _.yml_ file. 
Ensure that this file is placed in the _WEB-INF_ folder located in the module of your service. Check the `ApiMediationServiceConfig.java` class inside `com.ca.mfaas.eurekaservice.client.config` package in the `integration-enabler-java` to see the mapped parameters and make sure that the `yml` file follows the correct structure. The following example shows the structure of the 'yml' file:
  
    **Example:**
    
      ```yaml
         serviceId: 
         eureka:
             hostname: 
             ipAddress: 
             port: 
         title: 
         description: 
         defaultZone: 
         baseUrl: 
         homePageRelativeUrl:
         statusPageRelativeUrl: 
         healthCheckRelativeUrl: 
         discoveryServiceUrls:
             
         ssl:
             verifySslCertificatesOfServices: true
             protocol: TLSv1.2
             keyAlias: localhost
             keyPassword: password
             keyStore: ../keystore/localhost/localhost.keystore.p12
             keyStorePassword: password
             keyStoreType: PKCS12
             trustStore: ../keystore/localhost/localhost.truststore.p12
             trustStorePassword: password
             trustStoreType: PKCS12
         routes:
             - gatewayUrl: 
               serviceUrl: 
             - gatewayUrl: 
               serviceUrl: 
             - gatewayUrl: 
               serviceUrl: 
             - gatewayUrl: 
               serviceUrl: 
         apiInfo:
             - apiId:
               gatewayUrl:
               swaggerUrl:
               documentationUrl:
         catalogUiTile:
             id: 
             title: 
             description: 
             version: 

      ```

2. Before the web application is started (Tomcat), create a `ServletContextListener` to run 
the defined code. 

    **Example:**
     ```java
                package com.ca.hwsjersey.listener;
                
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

3. Register the listener. Use one of the following two options:

    * Add the ```@WebListener``` annotation to the servlet.
    * Reference the listener by adding the following code block to the 
    deployment descriptor _web.xml_.

      **Example:** 
      
      ``` xml
      <listener>
        <listener-class>your.class.package.path</listener-class>
      </listener>
      ```

## Download Apache Tomcat and enable SSL

To run Helloworld Jersey, requires the installation of Apache Tomcat. As the service uses HTTPS, configure Tomcat to use the SSL/TLS protocol.

**Follow these steps:**

1.  Download Apache Tomcat 8.0.39 and install it. 

2.  Build Helloworld Jersey through IntelliJ or by running `gradlew helloworld-jersey:build` in the terminal. 

3.  Enable HTTPS for Apache Tomcat with the following steps: 

    a) Go to the `apache-tomcat-8.0.39-windows-x64\conf` directory.

    **Note:** The full path depends on where you decided to install Tomcat.
    
    b) Open the `server.xml` file with a text editor as Administrator and add the following xml block:
        ```xml
               <Connector port="8080" protocol="org.apache.coyote.http11.Http11NioProtocol"
                              maxThreads="150" SSLEnabled="true" scheme="https" secure="true"
                              clientAuth="false" sslProtocol="TLS"
                              keystoreFile="{your-project-directory}\api-layer\keystore\localhost\localhost.keystore.p12"
                              keystorePass="password"
                                                    />
        ```
        Ensure to comment the HTTP connector which uses the same port.
    c) Navigate to the `WEB-INF/` located in `helloworld-jersey` module and add the following xml block to the `web.xml` file. This should be added right below the `<servlet-mapping>` tag:
    
       ```xml
        <security-constraint>
                <web-resource-collection>
                    <web-resource-name>Protected resource</web-resource-name>
                    <url-pattern>/*</url-pattern>
                    <http-method>GET</http-method>
                    <http-method>POST</http-method>
                </web-resource-collection>
                <user-data-constraint>
                    <transport-guarantee>CONFIDENTIAL</transport-guarantee>
                </user-data-constraint>
            </security-constraint>
       ```

## Run your service

After you externalize the parameters to make them readable through Tomcat and enable SSL, you are ready to run your service in the APIM Ecosystem.

**Note:** The following procedure uses `localhost` testing.

**Follow these steps:**

1. Run the following services to onboard your application:

    **Tip:** For more information about how to run the API Mediation Layer locally, see [Running the API Mediation Layer on Local Machine.](https://github.com/zowe/api-layer/blob/master/docs/local-configuration.md)
    * Gateway Service  
    * Discovery Service
    * API Catalog Service

2. Run `gradlew tomcatRun` with these additional parameters: `-Djavax.net.ssl.trustStore="<your-project-directory>\api-layer\keystore\localhost\localhost.truststore.p12" -Djavax.net.ssl.trustStorePassword="password"`. 
   If you need some more information about SSL configuration status while deploying, use this parameter `-Djavax.net.debug=SSL`.
   
   **Tip:** Wait for the services to be ready. This process may take a few minutes.
   
3.  Navigate to the following URL:
        
    ```
    https://localhost:10011
    ```
    
    Enter _eureka_ as a username and _password_ as a password and check if the service is registered to the discovery service. 
        
    Go to the following URL to reach the API Catalog through the Gateway (port 10010) and check if the API documentation of the service is retrieved:
    
    ```
    https://localhost:10010/ui/v1/apicatalog/#/dashboard
    ```
    
  You successfully onboarded your Java Jersey application if see your service 
    running and can access the API documentation. 
