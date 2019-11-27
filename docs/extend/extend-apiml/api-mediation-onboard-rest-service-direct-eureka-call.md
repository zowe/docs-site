# Onboarding a service with the Zowe API Meditation Layer without an onboarding enabler 

This article is one in a series of guides to onboard a REST service with the Zowe API Mediation Layer. Onboarding with API ML makes services accessable through the API Gateway and visible in the API Catalog.  Once a service is successfully onboarded, users can see if the service is currently available and accepting requests.

This guide describes how a REST service can be onboarded with the Zowe API ML independent of the language used to write the service. As such, this guide does not describe how to onboard a service with a specific enabler. Similarly, various Eureka client implementations are not used in this onboarding method. 

**Tip:** If possible, we recommend that you onboard your service using the API ML enabler libraries. The approach described in this article should only be used if other methods to onboard your service are not suitable.

For more information about how to onboard a REST service, see the following links:

- [overview]
- [python-eureka-client](https://pypi.org/project/py-eureka-client/)
- [eureka-js-client](https://www.npmjs.com/package/eureka-js-client)
- [Rest API developed based on Java](https://www.zowe.org/docs-site/latest/extend/extend-apiml/api-mediation-onboard-overview.html#sample-rest-api-service)

This article outlines a process to make an API service available in the API Mediation Layer by making a direct call to the Eureka Discovery Service. 

* [Registering a service with the API Mediation Layer](#registering_a_service_with_the_api_mediation_layer)
    * [Service registration](#service_registration)
    * [API Meditation Layer Service onboarding metadata](#api_meditation_layer_service_onboarding_metadata)
    * [Catalog parameters](#catalog_parameters)
    * [Service parameters](#service_parameters)
    * [Routing parameters](#routing_parameters)
    * [API Info Parameters](#api_info_parameters)
* [Sending a heartbeat to API Meditation Layer Discovery Service](#sending_a_heartbeat_to_api_meditation_layer_discovery_service)
* [Validating successful onboarding with the API Meditation Layer](#validating_successful_onboarding_with_the_api_meditation_layer)
* [External Resources](#external_resources)

## Registering a service with the API Mediation Layer

The API ML Discovery Service uses [Netflix/Eureka](https://github.com/Netflix/eureka) as a REST services registry. Eureka is a REST based service that is primarily used to locate services.

Eureka [endpoints](https://github.com/Netflix/eureka/wiki/Eureka-REST-operations) are used to register a service with the API ML Discovery Service. Endpoints are also used to send a periodic heartbeat to the Discovery Service to indicate that the onboarded service is available. 

Required parameters should be defined and sent at registration time. 

### Service registration

Begin the onboarding process by registering your service with the Eureka Discovery Service.

Use the `POST` http call to Eureka together with the registration configuration in the following format:

```
https://{eureka_hostname}:{eureka_port}/eureka/apps/{serviceId}
```

The following code block shows the format of the parameters in your `POST` call, which are sent to the Eureka registry at the time of registration.

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

 * **app** 
    
    Uniquely identifies one or more instances of a microservice in the API ML. 
    
    The API ML Gateway uses the `serviceId` for routing to the API service instances.
    As such, the `serviceId` is part of the service URL path in the API ML Gateway address space.
        
    **Important!**  Ensure that the service ID is set properly with the following considerations:
    
    * The service ID value must only contain lowercase alphanumeric characters.
    * The service ID cannot contain more than 40 characters.
    * The same service ID should only be set for multiple API service instances to support API scalability. When two API services use the same service ID, the API Gateway considers the services as clones of each other. An incoming API request can be routed to either of them through load balancing.
        
    **Example:**
    * If the `serviceId` is `sampleservice`, the service URL in the API ML Gateway address space appears as: 
            
       ```
       https://gateway-host:gateway-port/api/v1/sampleservice/...
       ```

 * **ipAddr** 
 
    Specifies the ip address of this specific service instance.
 
 * **port** 

    Specifies the port of the instance when you use http. If you use http, set `enabled` to `true`.
 
* **securePort**

    Specifies the port of the instance. When you use https, set `enabled` to `true`.
 
 * **hostname** 
 
    Specifies the hostname of the instance.

 * **vipAddress** 
 
    Specifies the service id when you use http.

     **Important!** Ensure that the value of `vipAddress` is the same as the value of `app`
 
 * **secureVipAddress** 
 
    Specifies the service id when you use https.

    **Important!** Ensure that the value of `secureVipAddress` is the same as the value of `app`.
 
 * **instanceId** 
 
    Specifies a unique id for the instance. Define a unique value for the instanceId in the following format: 
 
    ```{hostname}:{serviceId}:{port}```
 * **metadata** 

    Specifies the set of parameters described in the following section addressing API ML service metadata.

### API Mediation Layer Service onboarding metadata

At registration time, provide metadata in the following format. Metadata parameters contained in this codeblock are described in the following section.

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

Metadata parameters are broken down into the following categories: 

* [Catalog parameters](#catalog_parameters)
* [Service parameters](#service_parameters)
* [Routing parameters](#routing_parameters)
* [API Info parameters](#api_info_parameters)

### Catalog parameters - `apiml.catalog.tile`

The API ML Catalog displays information about  services registered with the API ML Discovery Service. 
Information displayed in the Catalog is defined in the metadata provided by your service during registration. 
The Catalog groups correlated services in the same tile when these services are configured with the same `catalog.tile.id` metadata parameter. 

The following parameters are used to populate the API Catalog:
 
* **apiml.catalog.tile.id**
    
    Specifies the specific identifier for the product family of API services. 
    This is a value used by the API ML to group multiple API services together into a single tile. 
    Each identifier represents a single API dashboard tile in the Catalog. 

    **Important!** Specify a value that does not interfere with API services from other products.
    
* **apiml.catalog.tile.title**
    
    Specifies the title of the API services product family. This value is displayed in the API Catalog UI dashboard as the tile title.
    
* **apiml.catalog.tile.description** 
    
    Specifies the detailed description of the API services product family. 
    This value is displayed in the API Catalog UI dashboard as the tile description.
    
* **apiml.catalog.tile.version**
    
    Specifies the semantic version of this API Catalog tile. 

    **Note:** Ensure that you increase the version number when you introduce changes to the API service product family details. We also recommend that you increase the version number when changes are made to the title and description.


### Service parameters - `apiml.service`
The following parameters define service information for the API Catalog:

* **apiml.service.title**

    Specifies the human readable name of the API service instance. 
   
    This value is displayed in the API Catalog when a specific API service instance is selected. 
        
* **apiml.service.description**

    Specifies a short description of the API service.
    
    **Example:** 
    
    `Sample service - Production Instance`
    
    This value is displayed in the API Catalog when a specific API service instance is selected.   
    
### Routing parameters - `apiml.routes`
The API routing group provides necessary routing information used by the API ML Gateway when routing incoming requests to the corresponding service.
A single route can be used to make direct REST calls to multiple resources or API endpoints. The route definition provides rules used by the API ML Gateway to rewrite the URL 
in the Gateway address space. 

Routing information consists of two parameters per route: 

* The gatewayUrl
* The serviceUrl

These two parameters together specify a rule of how the API service endpoints are mapped to the API Gateway endpoints.  

The following snippet is an example of the API routing information properties.

**Example:**
  
```
<apiml.routes.api__v1.gatewayUrl>api/v1</apiml.routes.api__v1.gatewayUrl>
<apiml.routes.api__v1.serviceUrl>/sampleclient/api/v1</apiml.routes.api__v1.serviceUrl>
```
   where:

* **apiml.routes.{route-prefix}.gatewayUrl**
        
    The `gatewayUrl` parameter specifies the portion of the gateway URL which is replaced by the `serviceUrl` path.

* **apiml.routes.{route-prefix}.serviceUrl**
        
    The `serviceUrl` parameter provides a portion of the service instance URL path which replaces the `gatewayUrl` part.

**Note:** The routes configuration used for a direct REST call to register a service must also contain a prefix before the `gatewayUrl` and `serviceUrl`.
This prefix is used to differentiate the routes.  This prefix must by provided manually when _XML_ configuration is used.

For more information about API ML routing, see [API Gateway Routing](https://github.com/zowe/api-layer/wiki/API-Gateway-Routing).


### API Info parameters - `apiml.apiInfo.`
REST services can provide multiple APIs. Add API info parameters for each API that your service wants to expose on the API ML. These parameters provide information for API (Swagger) documentation that is displayed in the API Catalog.

The following parameters provide the information properties of a single API:

* **apiml.apiInfo.{api-index}.apiId**

    The API ID uniquely identifies the API in the API ML. 
    Multiple services can provide the same API. The API ID can be used
    to locate the same APIs that are provided by different services.
    The creator of the API defines this ID.
    The API ID needs to be a string of up to 64 characters
    that uses lowercase alphanumeric characters and a dot: `.`.
       
    **Tip:** We recommend that you use your organization as the prefix.

* **apiml.apiInfo.{api-index}.version**

    Specifies the api `version`. This parameter is used to correctly retrieve the API documentation according to requested version of the API.
    
* **apiml.apiInfo.{api-index}.gatewayUrl**

    Specifies the base path at the API Gateway where the API is available. 
    Ensure that this value is the same path as the `gatewayUrl` value in the `routes` sections for the routes, which belong to this API.

* **apiml.apiInfo.{api-index}.swaggerUrl**

    (Optional) Specifies the HTTP or HTTPS address where the Swagger JSON document is available. 
        
* **apiInfo/apiml.apiInfo.{api-index}.documentationUrl**

    (Optional) Specifies the link to the external documentation. A link to the external documentation can be included along with the Swagger documentation. 

## Sending a heartbeat to API Meditation Layer Discovery Service

After registration, it is necessary for a service to send a heartbeat periodically to the Discovery Service to indicate that the service is available. When the Discovery Service does not receive a heartbeat, the service instance is deleted from the Discovery Service.

If the server does not receive a renewal in 90 seconds, it removes the instance from its registry. 

**Note:** We recommend that the interval for the heartbeat is no more than 30 seconds.

In your http client such as HTTPie, Postman,or cURL use the HTTP `PUT` method in the following format to tell the Discovery Service that your service is available:

```https://{eureka_hostname}:{eureka_port}/eureka/apps/{serviceId}/{instanceId}```

## Validating successful onboarding with the API Meditation Layer
Ensure that you successfully onboarded a service with the API Mediation Layer.

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
