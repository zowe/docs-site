# API Mediation Layer - REST service onboarding configuration

## Introduction
This article describes the ZOWE API ML REST services onboarding configuration parameters.
The parameter descriptions provided in this document are valid for all API ML onboarding methods that use either the API ML onboarding enabler or plain REST calls to the API ML Discovery Service. Configuration formats that are currently supported are _YAML_ for onboarding enablers and _XML_ for making direct REST calls to the API ML discovery service.

the configuration structure as well as the configuration format are different depending on the selected onboarding method. For example, if the configuration method uses a YAML file, a parameter will be addressed with the following format:
  
    top-category:
        embeded-category-1:
            .....
                parameter-name: parameter-value
    
    
 If `XML` configuration is used, the same parameter definition has the following format:

    <top-category>
        <embeded-category-1>
            <parameter-name> 
                parameter-value
            </parameter-name>
        </embeded-category-1>
    </top-category>


Additionally, the path of the parameters as well as the parameter names may be different.

**Example:**

The parameter `serviceIpAddress` used in _YAML_ based configuration is referenced as `<instance><ipAddr>...</ipAddr></instance>` in _XML_ configuration. 

The meaning and constraints for the individual parameters, however, do not change.      

In _YAML_ based configuration the parameters are grouped into logical groups, for example `apiInfo` or `routes`. The default group is not named and contains service identification and administrative information.
_XML_ based configuration parameters which belong to different _YAML_ logical groups are placed together to form a `<metadata>` element.
The `metadata` is built automatically when _YAML_ configuration is used.
The `metadata` is stored in the API ML service registry and is subsequently provided to the registry clients. 
For example the API ML Gateway uses the information provided in the `routes` group to route requests to the service instances. 
Similarly, the API ML Catalog uses the parameters from the `catalog` group to display the service description and documentation links. 

**Tip:**  For more information about API ML see:
  
  - On-boarding of API services - [Onboarding Overview](api-mediation-onboard-overview.md)
  - On-boarding enablers - <font color="red"> add link </font>
    
  
 We do not recommend that you prepare corresponding configuration data and call the dedicated Eureka registration endpoint directly, because 
 doing so is unnecessarily complex and time-consuming. We recommend that you onboard your service using the API ML enabler libraries.
  
 While the plain Java enabler library can be used in REST API projects based on SpringFramework or Spring Boot framework, it is not recommended to use this enabler in projects, which depend on SpringCloud Netflix components. 
 Although Eureka's final configuration of a discoverable service is the same regardless of the method that is used, configuration settings for the API ML enablers and SpringCloud Eureka Client are different. Using the two configuration settings in combination makes the result state of the discovery registry unpredictable.

## Configuring your REST service for on-boarding on API ML discovery service

In the following code snippets we identify the parameters by their _YAML_ notation using '.' convention. Additionally, the corresponding _XML_ path is provided in parentheses.

The configuration parameters belong to one of the following groups:

- [Service identification](rest-service-identification) 
- [Administrative endpoints](administrative-endpoints)
- [API info](api-info)
- [API routing information](api-routing-information)
- [API catalog information](api-catalog-information)
- [API security](api-security)
- [Eureka discovery service](eureka-discovery-service) 

### REST service identification

* **serviceId** (XML Path: /instance/metadata/apiInfo/serviceId)
    
    The `serviceId` uniquely identifies instances of a microservice in the API ML.
    The service developer specifies a default serviceId during the design of the service. 
    If needed, the system administrator at the customer site can change the parameter and provide a new value in the externalized service configuration.
    (See externalizing API ML REST service configuration [api-mediation - onboarding enabler external configuration](#api-mediation-onboard-enabler-external-configuration.md)). 
    
        
    **Important!**  Ensure that the service ID is set properly with the following considerations:
    
    * The API ML Gateway uses the serviceId for routing to the API service instances.
      As such, the serviceId must be a part of the service URL path in the API ML gateway address space. 
    * When two API services use the same service ID, the API Gateway considers the services as clones of each other. 
      An incoming API request can be routed to either of them through load balancing.
    * The same service ID should only be set for multiple API service instances for API scalability.
    * The service ID value must only contain lowercase alphanumeric characters.
    * The service ID cannot contain more than 40 characters.
    * The service ID is linked to security resources. Changes to the service ID require an update of security resources.
        
    **Examples:**
    * If the serviceId is `sysviewlpr1`, the service URL in the API ML Gateway address space appears as: 
            
       ```
       https://gateway-host:gateway-port/api/v1/sysviewlpr1/...
       ```

    * If a customer system administrator sets the service ID to `vantageprod1`, the service URL in the API ML Gateway address space appears as:
       ```
       http://gateway:port/api/v1/vantageprod1/endpoint1/...
       ```
* **title** (XML Path: /instance/metadata/apiml.service.title)
    
  This parameter specifies the human readable name of the API service instance (for example, "Endevor Prod" or "Sysview LPAR1"). 
  This value is displayed in the API Catalog when a specific API service instance is selected. 
  This parameter can be externalized and set by the customer system administrator.

  **Tip:** We recommend that service developer provides a default value of the `title`.
        Use a title that describes the service instance so that the end user knows the specific purpose of the service instance.
    
* **description** (XML Path: /instance/metadata/apiml.service.description)
    
    This parameter specifies a short description of the API service.
    
    **Examples:** 
    
    "CA Endevor SCM - Production Instance" or "CA SYSVIEW running on LPAR1". 
    
     This value is displayed in the API Catalog when a specific API service instance is selected. 
     This parameter can be externalized and set by the customer system administrator.  
    
  **Tip:** Describe the service so that the end user understands the function of the service.

### Administrative endpoints 

   The following snippet presents the format of the administrative endpoint properties:
   
   ```
baseUrl: http://localhost:10021/sampleservice

homePageRelativeUrl:
statusPageRelativeUrl: /application/info
healthCheckRelativeUrl: /application/health
```
where:
 
* **baseUrl** 

    specifies the base URL pointing to your service.

    In XML configuration, the baseUrl is decomposed into the following basic URL parts: hostname, ipAddress and port using the corresponding XML paths:
    - **hostname**: /instance/hostname
    - **ipAddr**: /instance/ipAddr
    - **port**: /instance/port
       
    **Examples:** 
    * `http://host:port/servicename` for HTTP service
    * `https://host:port/servicename` for HTTPS service
        
    `baseUrl` will be then used as a prefix in combination with the following end points relative addresses to construct their absolute URL:
    * **homePageRelativeUrl**
    * **statusPageRelativeUrl**
    * **healthCheckRelativeUrl** 
        
* **homePageRelativeUrl** (XML Path: /instance/metadata/homePageUrl) 
    
    specifies the relative path to the home page of your service. The path should start with `/`.
    If your service has no home page, leave this parameter blank.
    
    **Examples:**
    * `homePageRelativeUrl: ` This service has no home page
    * `homePageRelativeUrl: /` This service has a home page with URL `${baseUrl}/`
    
    
* **statusPageRelativeUrl** (XML Path: /instance/statusPageUrl)
    
    specifies the relative path to the status page of your service.
    
    Start this path with `/`.
    
    **Example:**

    `statusPageRelativeUrl: /application/info`
    
     This results in the URL:  
    `${baseUrl}/application/info` 

* **healthCheckRelativeUrl** (XML Path: /instance/healthCheckUrl)
    
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
    version; v1 
    gatewayUrl: api/v1
    swaggerUrl: http://localhost:10021/sampleservice/api-doc
    documentationUrl: http://your.service.documentation.url
```
<font color="red">In the preceding code block should ';' be replaced with ':' after 'version'? </font>

where:
* **apiInfo.apiId** (XML Path: /instance/metadata/apiml.apiInfo.${api-index}.apiId)

    specifies the API identifier that is registered in the API ML installation.
        The API ID uniquely identifies the API in the API ML. 
        Multiple services can provide the same API. The API ID can be used
        to locate the same APIs that are provided by different services.
        The creator of the API defines this ID.
        The API ID needs to be a string of up to 64 characters
        that uses lowercase alphanumeric characters and a dot: `.` .
       
     We recommend that you use your organization as the prefix.

 <font color="red"> FINDING: apiId is never set in metadata by the PJ enabler
    Note: Currently this parameter is not stored in the `metadata` by the API ML enablers.
    The MetadataParser is transferring it to an ApiInfo object, but it is never used though.
    My guess is that we use explicitly serviceId as a apiInfo.apiId, hence we allow only one API per service.
    
TODO: Discuss this with PP and others.` </font>


* **apiInfo.version** (XML Path: /instance/metadata/apiml.apiInfo.${api-index}.version)

    specifies the api `version`. This parameter is used to correctly retrieve the API documentation according to requested version of the API.
    
* **apiInfo.gatewayUrl** (XML Path: /instance/metadata/apiml.apiInfo.${api-index}.gatewayUrl)

    specifies the base path at the API Gateway where the API is available. 
    Ensure that this value is the same path as the `gatewayUrl` value in the `routes` sections for the routes, which belong to this API.

* **apiInfo.swaggerUrl** (XML Path: /instance/metadata/apiml.apiInfo.${api-index}.swaggerUrl)

    (Optional) specifies the HTTP or HTTPS address where the Swagger JSON document is available. 
        
* **apiInfo.documentationUrl**  (XML Path: /instance/metadata/apiInfo/documentationUrl)

    (Optional) specifies the link to the external documentation, if necessary. 
    A link to the external documentation can be included along with the Swagger documentation. 
    

### API routing information

The API routing group provides necessary routing information used by the API ML Gateway when routing incoming requests to the corresponding REST API service.
A single route can be used to direct REST calls to multiple resources or API endpoints. The route definition provides rules used by the API ML Gateway to rewrite the URL 
in the gateway address space. This <font color=red> what </font> is used by an API client to a REST service instance deployment URL.
Currently the routing information consists of two parameters per route: The gatewayUrl and serviceUrl parameters. These two parameters together specify a rule of how the API service endpoints are mapped to the API gateway endpoints.  

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

* **routes** (XML Path: /instance/metadata/apiml.routes...)
    
    specifies the container element for the routes.

* **routes.gatewayUrl** (XML Path: /instance/metadata/apiml.routes.${route-prefix}.gatewayUrl)
        
    The gatewayUrl parameter specifies the portion of the gateway URL which is replaced by the serviceUrl path part

* **routes.serviceUrl** (XML Path: /instance/metadata/apiml.routes.${route-prefix}.serviceUrl)
        
    The serviceUrl parameter provides a portion of the service instance URL path which replaces the gatewayUrl part (see `gatewayUrl`).

**Note:** The routes configuration used for a direct REST call to register a service must also contain a prefix before the gatewayUrl and serviceUrl.
This prefix is used to differentiate the routes. It is automatically calculated by the API ML enabler. This prefix must by provided manually when XML configuration is used.

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

User REST services onboarded on API ML act as both a client and a server. When communicating to API ML Discovery service, they are in a client role. On contrary, when the API ML Gateway is routing requests to a service, the service acts as a server.
These two roles have different requirements. 
While ZOWE API ML discovery service communicates with its clients in secure https mode and because of that requires a TLS (aka SSL) configuration setup, when in a service is in server role,
it is up to the system administrator to decide if the service willcommunicate with its clients securely or not.

Client services need to configure several TLS/SSL parameters in order to be able to communicate with API ML discovery service.
When an enabler is used to on-board the service, the configuration is provided in `ssl` section/group in the same YAML file used to configure the Eureka paramaters and the service metadata. 
When an API ML enabler is not used (XML configuration), 
one must execute the registration call from a third party REST Client tool such as PostMan, SOAP UI, Insomnia CURL, etc
In this case, the security configuration must be provided directly to the REST client tool used to execute the call.

For more information about API ML security. please follow this link: [API ML security](#api-mediation-security.md)

The tls/ssl configuration consists of the following parameters:

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

**Note:** You need to define both the key store and the trust store even if your server is not using an HTTPS port.

### Eureka discovery service

Eureka discovery service parameters group contains a single parameter used to address Eureka discovery service location.
An example is presented in the following snippet: 

```
discoveryServiceUrls:
- https://localhost:10011/eureka
- http://......
```
 where:      

* **discoveryServiceUrls** (XML Path: N/A)
    
    specifies the public URL of the Discovery Service. The system administrator at the customer site defines this parameter.
    It is possible to provide multiple values in order to utilize fail over and/or load balancing mechanisms.  
    
     **Example:**

    `http://eureka:password@141.202.65.33:10311/eureka/`

