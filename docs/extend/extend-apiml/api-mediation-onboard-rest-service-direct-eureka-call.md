# Onboard a service with the Zowe API Meditation Layer

Use this guide to onboard a REST service into the Zowe API Mediation Layer. This article outlines a step-by-step process to make a API service available in the API Mediation Layer.

## Publishing Services on the API Mediation Layer

The API Mediation Layer allows services in the mainframe to be visible in the API Catalog. Through the Catalog, users can see if the services are currently available and accepting requests.  

 The API ML Discovery Service uses [Netflix/Eureka](https://github.com/Netflix/eureka) as a REST services registry. Eureka is a REST (Representational State Transfer) based service that is primarily used to locate services.

Eureka has [endpoints](https://github.com/Netflix/eureka/wiki/Eureka-REST-operations) to register your service to the API ML Discovery Service. Use Eureka endpoints to register your service and send a periodic heartbeat to the Discovery Service.

The process of onboarding depends on the method that is used to develop the API service.
      
Required parameters should be defined and sent at registration time. For acting as a eureka client, there are eureka-client libraries that depend on the language that is used. 

**Examples:**

- [python-eureka-client](https://pypi.org/project/py-eureka-client/)

- [eureka-js-client](https://www.npmjs.com/package/eureka-js-client)

 - [Rest API developed based on Java](https://www.zowe.org/docs-site/latest/extend/extend-apiml/api-mediation-onboard-overview.html#sample-rest-api-service)

### Service registration

Eureka requires that the parameters in the following `POST` call are defined in the registration configuration. 

```
https://{eureka_hostname}:{eureka_port}/eureka/apps/{serviceId}
```

The following code block shows the format of the parameters in your `POST` call, which are sent to the Eureka registry at the time of registration.:

```xml
<?xml version="1.0" ?>
<instance>
  <app>{serviceId}</app>
  <ipAddr>{ipAddress}</ipAddr>
  <port enabled="false">{port}</port>
  <securePort enabled="true">{port}</securePort>
  <hostName>{hostname}</hostName>
  <vipAddress>{serviceId}</vipAddress>
  <secureVipAddress>{serviceId}</secureVipAddress>
  <instanceId>{instanceId}</instanceId>
  <dataCenterInfo>
    <name>MyOwn</name>
  </dataCenterInfo>
  <metadata>
        ...
   </metadata>
</instance>
```

where:

 * **/instance/app** 
    
    Uniquely identifies instances of a microservice in the API ML.

    The service developer specifies a default value during the design of the service. 
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

 * **ipAddr** is the ip address of this specific service instance
 
 * **hostname** is the hostname of the instance
 
 * **port** is the port of the instance when you use http, set `enabled` to `true`
 
 * **securePort** is the port of the instance when you use https, set `enabled` to `true`
 
 * **vipAddress** is the service id when you use http
 
 * **secureVipAddress** is the service id when you use https
 
 * **instanceId** is a unique id for the instance. Define a unique value for the instanceId in the following format: 
 
    ```{hostname}:{serviceId}:{port}```
 * **metadata** is the set of parameters described in the following section [the metadata of service](**INSERT LINK HERE**)

## API Meditation Layer Service on-boarding Metadata

At registration time, provide metadata in the following format and include the following parameters:

```
<instance>
  <metadata>
      <apiml.catalog.tile.id>samples</apiml.catalog.tile.id>
      <apiml.catalog.tile.title>Sample API Mediation Layer Applications</apiml.catalog.tile.title>
      <apiml.catalog.tile.description>Applications which demonstrate how to make a service integrated to the API Mediation Layer ecosystem</apiml.catalog.tile.description>
      <apiml.catalog.tile.version>1.0.1</apiml.catalog.tile.version>
      <apiml.service.title>Sample Service ©</apiml.service.title>
      <apiml.service.description>Sample API service showing how to onboard the service</apiml.service.description>
      <apiml.routes.api__v1.gatewayUrl>api/v1</apiml.routes.api__v1.gatewayUrl>
      <apiml.routes.api__v1.serviceUrl>/sampleclient/api/v1</apiml.routes.api__v1.serviceUrl>
      <apiml.routes.ui__v1.serviceUrl>/sampleclient</apiml.routes.ui__v1.serviceUrl>
      <apiml.routes.ui__v1.gatewayUrl>ui/v1</apiml.routes.ui__v1.gatewayUrl>
      <apiml.routes.ws__v1.gatewayUrl>ws/v1</apiml.routes.ws__v1.gatewayUrl>
      <apiml.routes.ws__v1.serviceUrl>/sampleclient/ws</apiml.routes.ws__v1.serviceUrl>
      <apiml.apiInfo.0.apiId>org.zowe.sampleclient</apiml.apiInfo.0.apiId>
      <apiml.apiInfo.0.swaggerUrl>https://hostname/sampleclient/api-doc</apiml.apiInfo.0.swaggerUrl>
      <apiml.apiInfo.0.gatewayUrl>api/v1</apiml.apiInfo.0.gatewayUrl>
      <apiml.apiInfo.0.documentationUrl>https://www.zowe.org</apiml.apiInfo.0.documentationUrl>
   </metadata>
</instance>
```
The following list describes the parameters contained in the metadata:

### Catalog parameters - **/instance/metadata/apiml.catalog.tile.**

The API ML Catalog UI displays information about discoverable REST services registered with the API ML Discovery Service. 
Information displayed in the catalog is defined by the metadata provided by your service during registration. 
The catalog can group correlated services in the same tile, if these services are configured with the same `catalog.tile.id` metadata parameter. 

The following parameters are used to populate the API Catalog.
 
* **/instance/metadata/apiml.catalog.tile.id**
    
    Specifies the unique identifier for the product family of API services. 
    This is a value used by the API ML to group multiple API services together into tiles. 
    Each unique identifier represents a single API Catalog UI dashboard tile. 

    **Tip:**  Specify a value that does not interfere with API services from other products.
    
* **/instance/metadata/apiml.catalog.tile.title**
    
    Specifies the title of the API services product family. This value is displayed in the API Catalog UI dashboard as the tile title.
    
* **/instance/metadata/apiml.catalog.tile.description** 
    
    Specifies the detailed description of the API services product family. 
    This value is displayed in the API Catalog UI dashboard as the tile description.
    
* **/instance/metadata/apiml.catalog.tile.version**
    
    Specifies the semantic version of this API Catalog tile. 

    **Note:** Ensure that you increase the number of the version when you introduce new changes to the product family details of the API services 
    including the title and description.


### Service parameters - /instance/metadata/apiml.service...*
Define service information for API Catalog

   * **apiml.service.title**

  Specifies the human readable name of the API service instance (for example, "Endevor Prod" or "Sysview LPAR1"). 
    This value is displayed in the API Catalog when a specific API service instance is selected. 
    This parameter can be externalized and set by the customer system administrator.
  
  **Tip:** We recommend that service developer provides a default value of the `title`.
        Use a title that describes the service instance so that the end user knows the specific purpose of the service instance.
        
   * **apiml.service.description**

  Specifies a short description of the API service.
    
  **Examples:** 
    
  "CA Endevor SCM - Production Instance" or "CA SYSVIEW running on LPAR1". 
    
   This value is displayed in the API Catalog when a specific API service instance is selected. 
   This parameter can be externalized and set by the customer system administrator.  
    
  **Tip:** Describe the service so that the end user understands the function of the service.
    
### Routing parameters - **/instance/metadata/apiml.routes...**
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
    
    specifies the container element for the routes.

* **/instance/metadata/apiml.routes.${route-prefix}.gatewayUrl**
        
    The gatewayUrl parameter specifies the portion of the gateway URL which is replaced by the serviceUrl path part

* **/instance/metadata/apiml.routes.${route-prefix}.serviceUrl**
        
    The serviceUrl parameter provides a portion of the service instance URL path which replaces the gatewayUrl part (see `gatewayUrl`).

**Note:** The routes configuration used for a direct REST call to register a service must also contain a prefix before the gatewayUrl and serviceUrl.
This prefix is used to differentiate the routes. It is automatically calculated by the API ML enabler. This prefix must by provided manually when XML configuration is used.

For detailed information about API ML routing, please follow this link: [API Gateway Routing](https://github.com/zowe/api-layer/wiki/API-Gateway-Routing)


### API Info Parameters - apiml.apiInfo.*
REST services can provide multiple APIs. Add API info parameters for each API that your service wants to expose on the API ML. These parameters provide information for API (Swagger) documentation.

The following parameters provide the information properties of a single API:

where:
* **/instance/metadata/apiml.apiInfo.${api-index}.apiId**

    specifies the API identifier that is registered in the API ML installation.
        The API ID uniquely identifies the API in the API ML. 
        Multiple services can provide the same API. The API ID can be used
        to locate the same APIs that are provided by different services.
        The creator of the API defines this ID.
        The API ID needs to be a string of up to 64 characters
        that uses lowercase alphanumeric characters and a dot: `.` .
       
     We recommend that you use your organization as the prefix.

* **/instance/metadata/apiml.apiInfo.${api-index}.version**

    specifies the api `version`. This parameter is used to correctly retrieve the API documentation according to requested version of the API.
    
* **/instance/metadata/apiml.apiInfo.${api-index}.gatewayUrl**

    specifies the base path at the API Gateway where the API is available. 
    Ensure that this value is the same path as the `gatewayUrl` value in the `routes` sections for the routes, which belong to this API.

* **/instance/metadata/apiml.apiInfo.${api-index}.swaggerUrl**

    (Optional) specifies the HTTP or HTTPS address where the Swagger JSON document is available. 
        
* **/instance/metadata/apiInfo/apiml.apiInfo.${api-index}.documentationUrl**

    (Optional) specifies the link to the external documentation, if necessary. 
    A link to the external documentation can be included along with the Swagger documentation. 
    


## Sending a heartbeat to API Meditation Layer Discovery Service

After registration, a service must send a heartbeat periodically to the Discovery Service to indicate that the service is available. When the Discovery Service does not receive a heartbeat, the service instance is deleted from the Discovery Service.

**Note:** We recommend that the interval for the heartbeat is no more than 30 seconds.

Use the HTTP `PUT` method in the following format to tell the Discovery Service that your service is available:

```https://{eureka_hostname}:{eureka_port}/eureka/apps/{serviceId}/{instanceId}```


## Validate that your service is successfully on-boarded to API Meditation Layer

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

## External Resources

 - https://blog.asarkar.org/technical/netflix-eureka/
 - https://medium.com/@fahimfarookme/the-mystery-of-eureka-health-monitoring-5305e3beb6e9
 - https://github.com/Netflix/eureka/wiki/Eureka-REST-operations
