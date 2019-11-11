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

Eureka requires that the parameters in the following `POST` call are defined in the registration configuration. These parameters are sent to the Eureka registry at the time of registration. 

```
https://{eureka_hostname}:{eureka_port}/eureka/apps/{serviceId}
```

The following code block shows the format of the parameters in your `POST` call:

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

 * **app** is the service id
 * **ipAddr** is the ip address of this specific service instance
 * **hostname** is the hostname of the instance
 * **port** is the port of the instance when you use http, set `enabled` to `true`
 * **securePort** is the port of the instance when you use https, set `enabled` to `true`
 * **vipAddress** is the service id when you use http
 * **secureVipAddress** is the service id when you use https
 * **instanceId** is a unique id for the instance. Define a unique value for the instanceId in the following format: 
 
    ```{hostname}:{serviceId}:{port}```
 * **metadata** is the set of parameters described in the following section [the metadata of service](**INSERT LINK HERE**)

## API Meditation Layer Service Onboarding Metadata

At registration time, provide metadata in the following format and include the following parameters:

```xml
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
```
The following list describes the parameters contained in the metadata:

### Catalog parameters - apiml.catalog.tile.*

These parameters are used to populate the API Catalog. The API Catalog contains information about every registered API service. The Catalog also groups related APIs. Each API group has its name and description. Catalog groups are constructed in real-time based on information that is provided by the API services. Each group is displayed as a tile in the API Catalog UI dashboard.

   * **apiml.catalog.tile.id**

       Specifies the unique identifier for the API services product family. This is the grouping value used by the API ML to group multiple API services into "tiles". Each unique identifier represents a single API Catalog UI dashboard tile. Specify a value that does not interfere with API services from other products.

   * **apiml.catalog.tile.title**

       Specifies the title of the API services product family. This value is displayed in the API Catalog UI dashboard as the tile title

   * **apiml.catalog.tile.description**

       Specifies the detailed description of the API services product family. This value is displayed in the API Catalog UI dashboard as the tile description

   * **apiml.catalog.tile.version**

       Specifies the semantic version of this API Catalog tile. Increase the version when you introduce new changes to the API services product family details (title and description). 

### Service parameters - apiml.service.*
Define service information for API Catalog

   * **apiml.service.title**

       Specifies the human-readable name of the API service instance. This value is displayed in the API Catalog when a specific API service instance is selected. 

       **Example:** "My Service Production" or "My Service LPAR1"

       **Tip:** We recommend that you provide a good default value or give good naming examples to the customers.

   * **apiml.service.description**

       Specifies a short description of the API service.

       **Example:** "My Service - Production Instance" or "My Service running on LPAR 1".
         This value is displayed in the API Catalog when a specific API service instance is selected. 

       **Tip:** We recommend that you provide a good default value or give good naming examples to the customers. Describe the service so that the end-user knows the function of the service.
    
### Routing parameters - apiml.routes
Define routing information for APIML Gateway.
<!--Add more info for routing-->

   * **apiml.routes._${prefix}_.gatewayUrl**

       Both gatewayUrl and serviceUrl parameters specify how the API service endpoints are mapped to the API gateway endpoints. The gatewayUrl parameter sets the target endpoint on the gateway.
       
   * **apiml.routes._${prefix}_.serviceUrl**

       Both gatewayUrl and serviceUrl parameters specify how the API service endpoints are mapped to the API gateway endpoints. The serviceUrl parameter points to the target endpoint on the gateway.


### API Info Parameters - apiml.apiInfo.*
Define api parameters for API (Swagger) documentation

   * **apiml.apiInfo._${prefix}_.apiId**
      
       Specifies the API identifier that is registered in the API Mediation Layer installation. The API ID uniquely identifies the API in the API Mediation Layer. The same API can be provided by multiple services. The API ID can be used to locate the same APIs that are provided by different services. The creator of the API defines this ID. The API ID needs to be a string of up to 64 characters that use lowercase alphanumeric characters and a dot: `.`. We recommend that you use your organization as the prefix.
       
   * **apiml.apiInfo._${prefix}_.gatewayUrl**
      
       The base path at the API gateway where the API is available. Ensure that it is the same path as the _gatewayUrl_ value in the _routes_ sections.

        **Important!** Ensure that each of the values for gatewayUrl parameter is unique in the configuration. Duplicate gatewayUrl values may cause requests to be routed to the wrong service URL.
          
   * **apiml.apiInfo._${prefix}_.documentationUrl**
      
       (Optional) Link to external documentation, if needed. The link to the external documentation can be included along with the Swagger documentation.
       
   * **apiml.apiInfo._${prefix}_.swaggerUrl**
      
       (Optional) Specifies the HTTP or HTTPS address where the Swagger JSON document is available.             

### Sending a heartbeat to API Meditation Layer Discovery Service

After registration, a service must send a heartbeat periodically to the Discovery Service to indicate that the service is available. When the Discovery Service does not receive a heartbeat, the service instance is deleted from the Discovery Service.

**Note:** We recommend that the interval for the heartbeat is no more than 30 seconds.

Use the HTTP `PUT` method in the following format to tell the Discovery Service that your service is available:

```https://{eureka_hostname}:{eureka_port}/eureka/apps/{serviceId}/{instanceId}```


### Validate that your service is successfully on-boarded to API Meditation Layer

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

### External Resources

 - https://blog.asarkar.org/technical/netflix-eureka/
 - https://medium.com/@fahimfarookme/the-mystery-of-eureka-health-monitoring-5305e3beb6e9
 - https://github.com/Netflix/eureka/wiki/Eureka-REST-operations
