# Onboard Spring Boot REST API services using Zowe API Mediation Layer

Zowe API Mediation Layer provides a single point of access for mainframe service REST APIs. For a high-level overview of this component, see [API Mediation Layer](../user-guide/introduction.md#api-mediation-layer).

**Note:** Spring is a Java-based framework that lets you build web and enterprise applications. For more information, see the [Spring website](https://spring.io/).

As an API developer, use this guide to onboard your REST API service into the Zowe API Mediation Layer. This article outlines a step-by-step process to make your API service available in the API Mediation Layer.

- [Onboard Spring Boot REST API services using Zowe API Mediation Layer](#onboard-spring-boot-rest-api-services-using-zowe-api-mediation-layer)
  - [Prepare an existing Spring Boot REST API for onboarding](#prepare-an-existing-spring-boot-rest-api-for-onboarding)
  - [Add Zowe API enablers to your service](#add-zowe-api-enablers-to-your-service)
  - [Add API Layer onboarding configuration](#add-api-layer-onboarding-configuration)
  - [Externalize API Layer configuration parameters](#externalize-api-layer-configuration-parameters)
  - [Test your service](#test-your-service)
    - [Validate that your API instance is still working](#validate-that-your-api-instance-is-still-working)
    - [Validate that your API instance is discoverable](#validate-that-your-api-instance-is-discoverable)

## Prepare an existing Spring Boot REST API for onboarding

The Spring Boot API onboarding process follows these general steps. Further detail about how to perform these steps is described later in this article.

**Follow these steps:**

1. Add enabler annotations to your service code and update the build scripts:

   - **@EnableApiDiscovery**

     This annotation exposes your Swagger (OpenAPI) documentation in the Zowe ecosystem to enable/make your micro service discoverable in the Zowe ecosystem.

     **Note:** The @EnableApiDiscovery annotation uses the Spring Fox library. If your service uses this library already, some fine tuning may be necessary.

   - **@ComponentScan({"com.ca.mfaas.enable", "com.ca.mfaas.product})**

     This annotation makes an API documentation endpoint visible within the Spring context.

2. Update your service configuration file to include MFaaS API Layer specific settings.
3. Externalize the API Layer site-specific configuration settings.
4. Test your changes.

## Add Zowe API enablers to your service

The first step to onboard a REST API with the Zowe ecosystem is to add enabler annotations to your service code. Enablers prepare your service for discovery and swagger documentation retrieval.

**Follow these steps:**

1. Add the following annotations to the main class of your Spring Boot, or add these annotations to an extra Spring configuration class:

   - `@ComponentScan({"com.ca.mfaas.enable", "com.ca.mfaas.product"})`
   - `@EnableApiDiscovery`

   **Example:**

   ```
    package com.ca.mfaas.DiscoverableClientSampleApplication;
    ..
    import com.ca.mfaas.enable.EnableApiDiscovery;
    import org.springframework.context.annotation.ComponentScan;
    ..
    @EnableApiDiscovery
    @ComponentScan({"com.ca.mfaas.enable", "com.ca.mfaas.product"})
    ...
    public class DiscoverableClientSampleApplication {...
   ```

2. Request access to the API Mediation Layer Sprint Boot JARs on the OMP [Slack #zowe-api channel](https://openmainframeproject.slack.com/messages). Download the JARs. 

3. Add a JAR package to the list of dependencies in Gradle or Maven build systems. Zowe API Mediation Layer supports Spring Boot versions 1.5.9 and 2.0.2.

   - If you use Spring Boot release 1.5.x in a Gradle build system, add the following code to the build.gradle file into the `dependencies` block:

     ```
     compile group: 'com.ca.mfaas.sdk', name: 'mfaas-integration-enabler-spring-v1-springboot-1.5.9.RELEASE', version: '0.2.0-SNAPSHOT'
     ```

   - If you use Spring Boot release 1.5.x in a Maven build system, add the following code to the `pom.xml` file:

     ```
     <dependency>
           <groupId>com.ca.mfaas.sdk</groupId>
           <artifactId>mfaas-integration-enabler-spring-v1-springboot-1.5.9.RELEASE</artifactId>
           <version>0.2.0-SNAPSHOT</version>
     </dependency>
     ```

   - If you use the Spring Boot release 2.0.x in a Gradle build system, add the following code to the `build.gradle` file into the `dependencies` block:

     ```
     compile group: 'com.ca.mfaas.sdk', name: 'mfaas-integration-enabler-spring-v2-springboot-2.0.2.RELEASE', version: '0.2.0-SNAPSHOT'
     ```

   - If you use the Spring Boot release 2.0.x in a Maven build system, add the following code to the `pom.xml` file:
     ```
     <dependency>
            <groupId>com.ca.mfaas.sdk</groupId>
            <artifactId>mfaas-integration-enabler-spring-v2-springboot-2.0.2.RELEASE</artifactId>
            <version>0.2.0-SNAPSHOT</version>
     </dependency>
     ```
     You are now ready to build your service to include the code pieces that make it discoverable in the API Mediation Layer and to add Swagger documentation.

## Add API Layer onboarding configuration

As an API service developer, you set multiple configuration settings in your application.yml that correspond to the API Layer. These settings enable an API to be discoverable and included in the API catalog. Some of the settings in the application.yml are internal and are set by the API service developer. Some settings are externalized and set by the customer system administrator. Those external settings are service parameters and are in the format: ${environment.\*}.

**Important!** Spring Boot configuration can be externalized in multiple different ways. For more information, see: [Externalized configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html). This Zowe onboarding documentation applies to API services that use an application.yml file for configuration. If your service uses a different configuration option, transform the provided configuration sample to the format that your API service uses.

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

                     api-doc:
                         gateway-url: "api/v1/api-doc"
                         service-url: ${mfaas.server.contextPath}/api-doc
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

2. Change the MFaaS parameters to correspond with your API service specifications. Most of these internal parameters contain "your service" text.

   **Note:** `${mfaas.*}` variables are used throughout the `application.yml` sample to reduce the number of required changes.

   **Tip:** When existing parameters set by the system administrator are already present in your configuration file (for example, `hostname, address, contextPath,` and `port`), we recommend that you replace them with the corresponding MFaaS properties.

   a. **Discovery Parameters**

   - **mfaas.discovery.serviceId**

     Specifies the service instance identifier to register in the API Layer installation. The service ID is used in the URL for routing to the API service through the gateway. The service ID uniquely identifies instances of a micro service in the API mediation layer. The system administrator at the customer site defines this parameter.

     **Important!** Ensure that the service ID is set properly with the following considerations:

     - When two API services use the same service ID, the API gateway considers the services to be clones. An incoming API request can be routed to either of them.
     - The same service ID should be set for only multiple API service instances for API scalability.
     - The service ID value must contain only lowercase alphanumeric characters.
     - The service ID cannot contain more than 40 characters.
     - The service ID is linked to security resources. Changes to the service ID require an update of security resources.

     **Examples:**

     - If the customer system administrator sets the service ID to `sysviewlpr1`, the API URL in the API Gateway appears as the following URL:
       ```
       https://gateway:port/api/v1/sysviewlpr1/endpoint1/...
       ```
     - If customer system administrator sets the service ID to vantageprod1, the API URL in the API Gateway appears as the following URL:
       ```
       http://gateway:port/api/v1/vantageprod1/endpoint1/...
       ```

   - **mfaas.discovery.locations**

     Specifies the public URL of the Discovery Service (eureka). The system administrator at the customer site defines this parameter.

     **Example:**

     ```
     http://eureka:password@141.202.65.33:10311/eureka/
     ```

   - **mfaas.discovery.enabled**

     Specifies whether the API service instance is to be discovered in the API Layer. The system administrator at the customer site defines this parameter. Set this parameter to true if the API Layer is installed and configured. Otherwise, you can set this parameter to `false` to exclude an API service instances from the API Layer.

   - **mfaas.discovery.fetchRegistry**

     Specifies whether the API service is to receive regular update notifications from the discovery service. Under most circumstances, you can accept the default value of `false` for the parameter.

   - **mfaas.discovery.region**

     Specifies the geographical region. This parameter is required by the Eureka client. Under most circumstances you can accept the value `default` for the parameter.

   b. **Service and Server Parameters**

   - **mfaas.service.hostname**

     Specifies the hostname of the system where the API service instance runs. This parameter is externalized and is set by the customer system administrator. The administrator ensures the hostname can be resolved by DSN to the IP address that is accessible by applications running on their z/OS systems.

   - **mfaas.service.ipAddress**

     Specifies the local IP address of the system where the API service instance runs. This IP address may or may not be a public IP address. This parameter is externalized and set by the customer system administrator.

   - **mfaas.server.scheme**

     Specifies whether the API service is using the HTTPS protocol. This value can be set to https or http depending on whether your service is using SSL.

   - **mfaas.server.port**

     Specifies the port that is used by the API service instance. This parameter is externalized and set by the customer system administrator.

   - **mfaas.server.contextPath**

     Specifies the prefix that is used within your API service URL path.

     **Examples:**

     - If your API service does not use an extra prefix in the URL (for example, `http://host:port/endpoint1/`), set this value to /.
     - If your API service uses an extra URL prefix set the parameter to that prefix value.
       For the URL: `http://host:port/filemaster/endpoint1/`, set this parameter to `/filemaster`.
     - In both examples, the API service URL appears as the following URL when routed through the gateway:
       ```
       http://gateway:port/serviceId/endpoint1/
       ```

   c. **API Catalog Parameters**

   These parameters are used to populate API Catalog. The API Catalog contains information about every registered API service. The catalog also groups related APIs. Each API group has its own name and description. Catalog groups are constructed in real-time based on information that is provided by the API services. Each group is displayed as a "tile" in the API Catalog UI dashboard.

   
  For more information about the API Catalog, see [Using the API Catalog](../user-guide/api-mediation-api-catalog.md).

   - **mfaas.catalog-ui-tile.id**

     Specifies the unique identifier for the API services product family. This is the grouping value used by the API Layer to group multiple API services together into "tiles". Each unique identifier represents a single API Catalog UI dashboard tile. Specify a value that does not interfere with API services from other products.

   - **mfaas.catalog-ui-tile.title**

     Specifies the title of the API services product family. This value is displayed in the API catalog UI dashboard as the tile title:

     ![Expanded Catalog Tile](../images/api-mediation/Expanded-Catalog-Tile.png)

   - **mfaas.catalog-ui-tile.description**

     Specifies the detailed description of the API services product family. This value is displayed in the API catalog UI dashboard as the tile description

   - **mfaas.catalog-ui-tile.version**

     Specifies the semantic version of this API Catalog tile. Increase the version when you introduce new changes to the API services product family details (title and description).

   - **mfaas.discovery.info.serviceTitle**

     Specifies the human readable name of the API service instance (for example, "Endevor Prod" or "Sysview LPAR1"). This value is displayed in the API catalog when a specific API service instance is selected. This parameter is externalized and set by the customer system administrator.

     ![Service Status](../images/api-mediation/Service-Status.png)

     **Tip:** We recommend that you provide a good default value or give good naming examples to the customers.

   - **mfaas.discovery.info.description**

     Specifies a short description of the API service.

     **Example:** "CA Endevor SCM - Production Instance" or "CA SYSVIEW running on LPAR1".
     This value is displayed in the API Catalog when a specific API service instance is selected. This parameter is externalized and set by the customer system administrator.

     **Tip:** We recommend that you provide a good default value or give good naming examples to the customers. Describe the service so that the end user knows the function of the service.

   - **mfaas.discovery.info.swaggerLocation**

     Specifies the location of a static swagger document. The JSON document contained in this file is displayed instead of the automatically generated API documentation. The JSON file must contain a valid OpenAPI 2.x Specification document. This value is optional and commented out by default.

     **Note:** Specifying a `swaggerLocation` value disables the automated JSON API documentation generation with the SpringFox library. By disabling auto-generation, you need to keep the contents of the manual swagger definition consistent with your endpoints. We recommend to use auto-generation to prevent incorrect endpoint definitions in the static swagger documentation.

   d. **Metadata Parameters**

   The routing rules can be modified with parameters in the metadata configuration code block.

   **Note:** If your REST API does not conform to MFaaS REST API Building codes, configure routing to transform your actual endpoints (serviceUrl) to gatewayUrl format. For more information see: [REST API Building Codes](https://docops.ca.com/display/IWM/Guidelines+for+Building+a+New+API)

   - **eureka.instance.metadata-map.routed-services.`<prefix>`**

     Specifies a name for routing rules group. This parameter is only for logical grouping of further parameters. You can specify an arbitrary value but it is a good development practice to mention the group purpose in the name.

     **Examples:**

     ```
     api-doc
     api_v1
     api_v2
     ```

   - **eureka.instance.metadata-map.routed-services.`<prefix>`.gatewayUrl**

     Both gateway-url and service-url parameters specify how the API service endpoints are mapped to the API gateway endpoints. The gateway-url parameter sets the target endpoint on the gateway.

   - **metadata-map.routed-services.`<prefix>`.serviceUrl**

     Both gateway-url and service-url parameters specify how the API service endpoints are mapped to the API gateway endpoints. The service-url parameter points to the target endpoint on the gateway.

     **Important!** Ensure that each of the values for gatewayUrl parameter are unique in the configuration. Duplicate gatewayUrl values may cause requests to be routed to the wrong service URL.

     **Note:** The endpoint `/api-doc` returns the API service Swagger JSON. This endpoint is introduced by the `@EnableMfaasInfo` annotation and is utilized by the API catalog.

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

   The following parameters describe the function of the specific version of an API. This information is included in the swagger JSON and displayed in the API catalog:

   ![API information detail](../images/api-mediation/Service-detail.png)

- **v1**

  Specifies the major version of your service API: `v1, v2,` etc.

- **title**

  Specifies the title of your service API.

- **description**

  Specifies the high-level function description of your service API.

- **version**

  Specifies the actual version of the API in semantic format.

- **basePackage**

  Specifies the package where the API is located. This option only exposes endpoints that are defined in a specified java package. The parameters `basePackage` and `apiPattern` are mutually exclusive. Specify only one of them and remove or comment out the second one.

- **apiPattern**

  This option exposes any endpoints that match a specified regular expression. The parameters `basePackage` and `apiPattern` are mutually exclusive. Specify just one of them and remove or comment out the second one.

  **Tip:** You have three options to make your endpoints discoverable and exposed: `basePackage`, `apiPattern`, or none (if you do not specify a parameter). If `basePackage` or `apiPattern` are not defined, all endpoints in the Spring Boot app are exposed.

## Externalize API Layer configuration parameters

The following list summarizes the API Layer parameters that are set by the customer system administrator:

- `mfaas.discovery.enabled: ${environment.discoveryEnabled:true}`
- `mfaas.discovery.locations: ${environment.discoveryLocations}`
- `mfaas.discovery.serviceID: ${environment.serviceId}`
- `mfaas.discovery.info.serviceTitle: ${environment.serviceTitle}`
- `mfaas.discovery.info.description: ${environment.serviceDescription}`
- `mfaas.service.hostname: ${environment.hostname}`
- `mfaas.service.ipAddress: ${environment.ipAddress}`
- `mfaas.server.port: ${environment.port}`

**Tip:** Spring Boot applications are configured in the `application.yml` and `bootstrap.yml` files that are located in the USS file system. However, system administrators prefer to provide configuration through the mainframe sequential data set (or PDS member). To override Java values, use Spring Boot with an external YML file, environment variables, and Java System properties. For MFaaS applications, we recommend that you use Java System properties.

Java System properties are defined using `-D` options for Java. Java System properties can override any configuration. Those properties that are likely to change are defined as `${environment.variableName}:`

```
IJO="$IJO -Denvironment.discoveryEnabled=.."
IJO="$IJO -Denvironment.discoveryLocations=.."

IJO="$IJO -Denvironment.serviceId=.."
IJO="$IJO -Denvironment.serviceTitle=.."
IJO="$IJO -Denvironment.serviceDescription=.."
IJO="$IJO -Denvironment.hostname=.."
IJO="$IJO -Denvironment.ipAddress=.."
IJO="$IJO -Denvironment.port=.."
```

The `discoveryLocations` (public URL of the discovery service) value is found in the API Meditation Layer configuration, in the `*.PARMLIB(MASxPRM)` member and assigned to the MFS_EUREKA variable.

**Example:**

```
MFS_EUREKA="http://eureka:password@141.202.65.33:10011/eureka/")
```

## Test your service

To test that your API instance is working and is discoverable, use the following validation tests:

### Validate that your API instance is still working

**Follow these steps:**

1.  Disable discovery by setting `discoveryEnabled=false` in your API service instance configuration.
2.  Run your tests to check that they are working as before.

### Validate that your API instance is discoverable

**Follow these steps:**

1. Point your configuration of API instance to use the following discovery service:
   ```
   http://eureka:password@localhost:10011/eureka
   ```
2. Start up the API service instance.
3. Check that your API service instance and each of its endpoints are displayed in the API catalog

   ```
   https://localhost:10010/ui/v1/caapicatalog/
   ```

4. Check that you can access your API service endpoints through the gateway.

   **Example:**

   ```
   https://localhost:10010/api/v1/
   ```

5. Check that you can still access your API service endpoints directly outside of the gateway.
