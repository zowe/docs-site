# API Mediation Layer - REST service on-boarding configuration

## Introduction
This article describes the ZOWE API ML REST services on-boarding configuration parameters.
The parameters description provided in this document is valid for all API ML on-boarding methods whether using API ML on-boarding enabler or using plain REST calls to API ML discovery service.
Currently supported configuration formats are YAML for on-boarding enablers and XML for direct REST call to API ML discovery service.

Depending on the selected on-boarding method and its respective configuration format, the configuration structure will be different.
For example if the configuration method requires YAML file, then a parameter will be addressed as:
   
    top-category:
        embeded-category-1:
            .....
                parameter-name: parameter-value
    
    
   , while in case of `XML` configuration, the same parameter definition will have the following form:

    <top-category>
        <embeded-category-1>
            <parameter-name> 
                parameter-value
            </parameter-name>
        </embeded-category-1>
    </top-category>


Also parameters path and/or names can be different. For example:

    The parameter `serviceIpAddress` in YAML based configuration is named <instance><ipAddr>...</ipAddr></instance>    

However, the meaning and the constrains for the individual parameters will not change.      


**Tip:**  For more information about API ML:
  
    - Discovery service - visit this link: TODO: Link to Discovery service, process etc.
    - On-boarding of API services - [Onboarding Overview](api-mediation-onboard-overview.md)
    - On-boarding enablers - ....
    
  
 We do not recommend that you prepare corresponding configuration data and call the dedicated Eureka registration endpoint directly, because 
 doing so is unnecessarily complex and time-consuming. We recommend you to on-board your service using the API ML enabler libraries.
  
 While the plain Java enabler library can be used in REST API projects based on SpringFramework or Spring Boot framework, it is not recommended to use this enabler in projects, which depend on SpringCloud Netflix components. 
 Although Eureka's final configuration of a discoverable service is same regardless of the used method, configuration settings for the API ML enablers and SpringCloud Eureka Client are different. 
 Using the two in combination makes the result state of the discovery registry unpredictable.

## Configuring your REST service for on-boarding on API ML discovery service

In the following code snippets we identify the parameters by their YAML notation using '.' convention. Additionally we provide in following brackets the corresponding XML path.

**Note:** The configuration can be externalized <font color="red">TODO: Link to the existing documentation about externalizing properties - local and on MF</font>

The configuration parameters fall into one of the following categories:

- [Service identification](rest-service-identification) 
- [Administrative endpoints](administrative-endpoints)
- [API info](api-info) (API Documentation)
- [API routing information](api-routing-information)
- [API Catalog information](api-catalog-information)
- [API Security](api-security)
- [Eureka discovery service](eureka-discovery-service) 

### REST service identification

* **serviceId** (XML Path: /instance/metadata/apiInfo/serviceId)
    
    specifies the service instance identifier that is registered in the API ML installation.
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
* **title** (XML Path: /instance/metadata/apiml.service.title)
    
  specifies the human readable name of the API service instance (for example, "Endevor Prod" or "Sysview LPAR1"). This value is displayed in the API Catalog when a specific API service instance is selected. This parameter is externalized and set by the customer system administrator.

  **Tip:** We recommend that you provide a specific default value of the `title`.
        Use a title that describes the service instance so that the end user knows the specific purpose of the service instance.
    
* **description** (XML Path: /instance/metadata/apiml.service.description)
    
    specifies a short description of the API service.
    
    **Example:** 
    
    "CA Endevor SCM - Production Instance" or "CA SYSVIEW running on LPAR1". 
    
     This value is displayed in the API Catalog when a specific API service instance is selected. This parameter is externalized and set by the customer system administrator.  
    
  **Tip:** Describe the service so that the end user knows the function of the service.

### Administrative endpoints 

   The following snippet presents the format of the administrative endpoint properties:
   
   ```
baseUrl: http://localhost:10021/sampleservice
homePageRelativeUrl:
statusPageRelativeUrl: /application/info
healthCheckRelativeUrl: /application/health
```
where:
 
* **baseUrl** ( In case of XML configuration baseUrl is decomposed into the following basic URL parts: hostname, ipAddress and port.
        XML Paths: 
        - hostname - /instance/hostname
        - ipAddr - /instance/ipAddr
        - port - /instance/port
       )
    
    specifies the URL pointing to your service. 

    **Examples:** 
    * `http://host:port/servicename` for HTTP service
    * `https://host:port/servicename` for HTTPS service
        
    `baseUrl` will be then used as a prefix for the following service end points:
    * **homePageRelativeUrl**
    * **statusPageRelativeUrl**
    * **healthCheckRelativeUrl** 
        
* **homePageRelativeUrl** (XML Path: /instance/metadata/homePageUrl) 
    
    specifies the relative path to the home page of your service. The path should start with `/`.
    If your service has no home page, leave this parameter blank.
    
    **Examples:**
    * `homePageRelativeUrl: ` The service has no home page
    * `homePageRelativeUrl: /` The service has home page with URL `${baseUrl}/`
    
    
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

    `healthCheckRelativeUrl: /application/health`. 
    
     This results in the URL:  
    `${baseUrl}/application/health` 

### API info

Add API info parameters to your service.

The following snippet presents the API information properties:

```
apiInfo:
    - apiId: org.zowe.sampleservice
    gatewayUrl: api/v1
    swaggerUrl: http://localhost:10021/sampleservice/api-doc
    documentationUrl: http://your.service.documentation.url
```

where:
TODO: Check why it is missing from localhost AP ML installation - registered services
* **apiInfo.apiId** (XML Path: /instance/metadata/apiInfo/apiId)

    specifies the API identifier that is registered in the API ML installation.
        The API ID uniquely identifies the API in the API ML. Multiple services can provide the same API. The API ID can be used
        to locate the same APIs that are provided by different services.
        The creator of the API defines this ID.
        The API ID needs to be a string of up to 64 characters
        that uses lowercase alphanumeric characters and a dot: `.`.
        We recommend that you use your organization as the prefix.

* **apiInfo.gatewayUrl** (XML Path: /instance/metadata/apiInfo/gatewayUrl)

    specifies the base path at the API Gateway where the API is available. Ensure that this value is the same path as the _gatewayUrl_ value in the _routes_ sections.

* **apiInfo.swaggerUrl** (XML Path: /instance/metadata/apiInfo/swaggerUrl)

    (Optional) specifies the HTTP or HTTPS address where the Swagger JSON document is available. 
        
        TODO: Check if this is used
* **apiInfo.documentationUrl**  (XML Path: /instance/metadata/apiInfo/documentationUrl)

    (Optional) specifies the link to the external documentation, if necessary. The link to the external documentation can be included along with the Swagger documentation. 
    

### API routing information

Add API routing information to your service.

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

* **routes** (XML Path: /instance/metadata/apiml/rotes)
    
    specifies the container element for the routing rules from the gateway to your service.

* **routedServices.gatewayUrl** (XML Path: /instance/metadata/apiml/rotes/gatewayUrl)
        
    Both gateway-url and service-url parameters specify how the API service endpoints are mapped to the API
            gateway endpoints. The gateway-url parameter sets the target endpoint on the gateway.

* **routedServices.serviceUrl** (XML Path: /instance/metadata/apiml/rotes/serviceUrl)
        
    Both gateway-url and service-url parameters specify how the API service endpoints are mapped to the API
    gateway endpoints. The service-url parameter points to the target endpoint on the gateway.

**Note** The routes configuration used for a direct REST call to register a service, must contain a prefix before the gatewayUrl and serviceUrl.
This prefix is used to differentiate the routes. It is automatically calculated by the API ML enabler, but must by provided manually when XML configuration is used.

### API Catalog information

Add API Catalog information to your service.

The API ML Catalog UI displays information about discoverable REST services registered with the API ML Discovery Service. Information discplayed in the catalog is defined by the metadata provided by your service during registration. 
The catalog can group corelated services in the same tile, if these services are configured with the same `catalog.tile.id` metadata parameter. 

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
    
    specifies the unique identifier for the product family of API services. This is a value used by the API ML to group multiple API services together into tiles. 
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
ZOWE API ML installation of Eureka discovery service requires to configure secure TLS/SSL communication. The configuration is provided in the YAML file under `ssl` section. 
When an API ML enabler is not used (XML configuration), one must execute the registration call from a third party REST Client tool such as PostMan, SOAP UI, Insomnia CURL, etc
In this case, the security configuration must be provided to the REST client tool used to execute the call.

The tls/ssl configuration consists of the following parameters:

* **protocol**
    TLSv1.2
    
* **keyAlias**

* **keyPassword**

* **keyStore**

* **keyStorePassword**

* **keyStoreType**

* **trustStore**

* **trustStorePassword: password**

* **trustStoreType: PKCS12**


**Note:** TODO: You need to define both the key store and the trust store even if your server is not using an HTTPS port.

### Eureka discovery service

Add Eureka discovery parameters to your service.

Eureka discovery service parameters are presented in the following snippet: 

```
discoveryServiceUrls:
- https://localhost:10011/eureka
- http://......
```
 where:      

* **discoveryServiceUrls** (XML Path: N/A)
    
    specifies the public URL of the Discovery Service. The system administrator at the customer site defines this parameter. 
    
     **Example:**

    `http://eureka:password@141.202.65.33:10311/eureka/`

