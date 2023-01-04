# Onboarding a service with the Zowe API Meditation Layer without an onboarding enabler

This article is part of a series of guides to onboard a REST service with the Zowe API Mediation Layer (API ML). Onboarding with API ML makes services accessible through the API Gateway and visible in the API Catalog.  Once a service is successfully onboarded, users can see if the service is currently available and accepting requests.

This guide describes how a REST service can be onboarded with the Zowe API ML independent of the language used to write the service. As such, this guide does not describe how to onboard a service with a specific enabler. Similarly, various Eureka client implementations are not used in this onboarding method.

**Tip:** If possible, we recommend that you onboard your service using the API ML enabler libraries. The approach described in this article should only be used if other methods to onboard your service are not suitable.

For more information about how to onboard a REST service, see the following links:

- [API ML onboarding overview](onboard-overview.md)
- [python-eureka-client](https://pypi.org/project/py-eureka-client/)
- [eureka-js-client](https://www.npmjs.com/package/eureka-js-client)
- [Rest API developed based on Java](onboard-overview.md#sample-rest-api-service)

This article outlines a process to make an API service available in the API Mediation Layer by making a direct call to the Eureka Discovery Service.

* [Introduction](#introduction)
* [Registering with the Discovery Service](#registering-with-the-discovery-service)
    * [API Mediation Layer Service onboarding metadata](#api-mediation-layer-service-onboarding-metadata)
        * [Catalog parameters](#catalog-parameters)
        * [Service parameters](#service-parameters)
        * [Routing parameters](#routing-parameters)
        * [API Info Parameters](#api-info-parameters)
* [Sending a heartbeat to API Mediation Layer Discovery Service](#sending-a-heartbeat-to-api-mediation-layer-discovery-service)
* [Validating successful onboarding with the API Mediation Layer](#validating-successful-onboarding-with-the-api-mediation-layer)
* [External Resources](#external-resources)

## Introduction

The API ML Discovery Service uses [Netflix/Eureka](https://github.com/Netflix/eureka) as a REST services registry. Eureka is a REST-based service that is primarily used to locate services.

Eureka [endpoints](https://github.com/Netflix/eureka/wiki/Eureka-REST-operations) are used to register a service with the API ML Discovery Service. Endpoints are also used to send a periodic heartbeat to the Discovery Service to indicate that the onboarded service is available.

**Note:** Required parameters should be defined and sent at registration time.

## Registering with the Discovery Service

Begin the onboarding process by registering your service with the API ML Discovery Service.

Use the `POST` Http call to the Eureka server together with the registration configuration in the following format:

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

    uniquely identifies one or more instances of a microservice in the API ML.

    The API ML Gateway uses the `serviceId` for routing to the API service instances.
    As such, the `serviceId` is part of the service URL path in the API ML Gateway address space.

    **Important!**  Ensure that the service ID is set properly with the following considerations:

    * The service ID value contains only lowercase alphanumeric characters.
    * The service ID does not contain more than 40 characters.
    * The same service ID is only set for multiple API service instances to support API scalability. When two API services use the same service ID, the API Gateway considers the services as clones of each other. An incoming API request can be routed to either instance through load balancing.

    **Example:**
    * If the `serviceId` is `sampleservice`, the service URL in the API ML Gateway address space appears as:

       ```
       https://gateway-host:gateway-port/api/v1/sampleservice/...
       ```

 * **ipAddr**

    specifies the IP address of this specific service instance.

 * **port**

    specifies the port of the instance when you use Http. For Http, set `enabled` to `true`.

* **securePort**

    specifies the port of the instance for when you use Https. For Https, set `enabled` to `true`.

 * **hostname**

    specifies the hostname of the instance.

 * **vipAddress**

    specifies the `serviceId` when you use Http.

     **Important!** Ensure that the value of `vipAddress` is the same as the value of `app`. 
     Furthermore, be sure not to omit `vipAddress`, even if you provided `secureVipAddress`. Due to 
     a current limitation in Spring Cloud Netflix, routes are created only for instances in which `vipAddress` is defined.

 * **secureVipAddress**

    specifies the `serviceId` when you use Https.

    **Important!** Ensure that the value of `secureVipAddress` is the same as the value of `app`.

 * **instanceId**

    specifies a unique id for the instance. Define a unique value for the `instanceId` in the following format:

    ```{hostname}:{serviceId}:{port}```
 * **metadata**

    specifies the set of parameters described in the following section addressing API ML service metadata.

### API Mediation Layer Service onboarding metadata

At registration time, provide metadata in the following format. Metadata parameters contained in this code block are described in the following section.

```xml
<instance>
  <metadata>
      <apiml.catalog.tile.id>samples</apiml.catalog.tile.id>
      <apiml.catalog.tile.title>Sample API Mediation Layer Applications</apiml.catalog.tile.title>
      <apiml.catalog.tile.description>Applications which demonstrate how to make a service integrated to the API Mediation Layer ecosystem</apiml.catalog.tile.description>
      <apiml.catalog.tile.version>1.0.1</apiml.catalog.tile.version>
      <apiml.service.title>Sample Service</apiml.service.title>
      <apiml.service.description>Sample API service showing how to onboard the service</apiml.service.description>
      <apiml.enableUrlEncodedCharacters>false</apiml.enableUrlEncodedCharacters>
      <apiml.routes.api__v1.gatewayUrl>api/v1</apiml.routes.api__v1.gatewayUrl>
      <apiml.routes.api__v1.serviceUrl>/sampleclient/api/v1</apiml.routes.api__v1.serviceUrl>
      <apiml.routes.ui__v1.serviceUrl>/sampleclient</apiml.routes.ui__v1.serviceUrl>
      <apiml.routes.ui__v1.gatewayUrl>ui/v1</apiml.routes.ui__v1.gatewayUrl>
      <apiml.routes.ws__v1.gatewayUrl>ws/v1</apiml.routes.ws__v1.gatewayUrl>
      <apiml.routes.ws__v1.serviceUrl>/sampleclient/ws</apiml.routes.ws__v1.serviceUrl>
      <apiml.authentication.scheme>httpBasicPassTicket</apiml.authentication.scheme>
      <apiml.authentication.applid>ZOWEAPPL</apiml.authentication.applid>
      <apiml.apiInfo.0.apiId>zowe.apiml.sampleclient</apiml.apiInfo.0.apiId>
      <apiml.apiInfo.0.swaggerUrl>https://hostname/sampleclient/api-doc</apiml.apiInfo.0.swaggerUrl>
      <apiml.apiInfo.0.gatewayUrl>api/v1</apiml.apiInfo.0.gatewayUrl>
      <apiml.apiInfo.0.documentationUrl>https://www.zowe.org</apiml.apiInfo.0.documentationUrl>
   </metadata>
</instance>
```

Metadata parameters are broken down into the following categories:

* [Catalog parameters](#catalog-parameters)
* [Service parameters](#service-parameters)
* [Routing parameters](#routing-parameters)
* [Authentication parameters](#authentication-parameters)
* [API Info parameters](#api-info-parameters)

#### Catalog parameters
Catalog parameters are grouped under the prefix: `apiml.catalog.tile`.

The API ML Catalog displays information about services registered with the API ML Discovery Service.
Information displayed in the Catalog is defined in the metadata provided by your service during registration.
The Catalog groups correlated services in the same tile when these services are configured with the same `catalog.tile.id` metadata parameter.

The following parameters are used to populate the API Catalog:

* **apiml.catalog.tile.id**

    This parameter specifies the specific identifier for the product family of API services.
    This is a value used by the API ML to group multiple API services into a single tile.
    Each identifier represents a single API dashboard tile in the Catalog.

    **Important!** Specify a value that does not interfere with API services from other products. We recommend that you use your company and product name as part of the ID.

* **apiml.catalog.tile.title**

    This parameter specifies the title of the API services product family. This value is displayed in the API Catalog dashboard as the tile title.

* **apiml.catalog.tile.description**

    This parameter is the detailed description of the API services product family.
    This value is displayed in the API Catalog UI dashboard as the tile description.

* **apiml.catalog.tile.version**

    This parameter specifies the semantic version of this API Catalog tile.

    **Note:** Ensure that you increase the version number when you introduce changes to the API service product family details.

#### Service parameters
Service parameters are grouped under the prefix: `apiml.service`

The following parameters define service information for the API Catalog:

* **apiml.service.title**

    This parameter specifies the human-readable name of the API service instance.

    This value is displayed in the API Catalog when a specific API service instance is selected.

* **apiml.service.description**

    This parameter specifies a short description of the API service.

    This value is displayed in the API Catalog when a specific API service instance is selected.

* **apiml.enableUrlEncodedCharacters**

    When this parameter is set to `true`, the Gateway allows encoded characters to be part of URL requests redirected through the Gateway. The default setting of `false` is the recommended setting. Change this setting to `true` only if you expect certain encoded characters in your application's requests.

    **Important!**  When the expected encoded character is an encoded slash or backslash (`%2F`, `%5C`), make sure the Gateway is also configured to allow encoded slashes. For more info see [Installing the Zowe runtime on z/OS](../../user-guide/install-zos).

* **apiml.connectTimeout**
    
    The value in milliseconds that specifies a period in which API ML should establish a single, non-managed connection with this service. If omitted, the default value specified in the API ML Gateway service configuration is used.

* **apiml.readTimeout**
    
    The value in milliseconds that specifies maximum time of inactivity between two packets in response from this service to API ML. If omitted, the default value specified in the API ML Gateway service configuration is used.
    
* **apiml.connectionManagerTimeout**
    
    HttpClient employs a special entity to manage access to HTTP connections called by HTTP connection manager. The purpose of an HTTP connection manager is to serve as a factory for new HTTP connections, to manage the life cycle of persistent connections, and to synchronize access to persistent connections. Internally, an HTTP connection manager works with managed connections, which serve as proxies for real connections. `ConnectionManagerTimeout` specifies a period in which managed connections with API ML should be established. The value is in milliseconds. If omitted, the default value specified in the API ML Gateway service configuration is used.

* **apiml.okToRetryOnAllOperations**
    
    Specifies whether all operations can be retried for this service. The default value is `false`. The `false` value allows retries for only GET requests if a response code of `503` is returned. Setting this value to `true` enables retry requests for all methods, which return a `503` response code. Enabling retry can impact server resources resulting from buffering of the request body.

* **apiml.service.corsEnabled**
    
    When this parameter is set to `true`, CORS is enabled on the service level for all service routes. 
    The same parameter can also be set on the service level, by providing the parameter as `customMetadata` as shown in the [Custom Metadata](custom-metadata).

* **apiml.response.compress**

    When this parameter is set to `true`, API ML compresses content for all responses from these services using GZIP. API ML also adds the `Content-Encoding` header with the value `gzip` to responses.

* **customMetadata.apiml.response.compressRoutes**

    When the `customMetadata.apiml.response.compress` parameter is set to `true`, this parameter allows the services to further limit the compressed routes. The parameter accepts [ant style](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/util/AntPathMatcher.html) routes deliminated by `,` . The expectation is to provide the absolute paths. If relative paths are provided, the starting `/` is added. If the beginning of the pattern does not require specification, use `**/{pathYouAreInterestedIn}`

    **Examples** 

    * `/service/**`
    
      Compresses all paths starting with `/service/`

    * `/service/api/v1/compress,/service/api/v1/custom-compress`
    
      Compresses the specific two routes

    * `/\*\*/compress/\*\*`
    
      Compresses all paths that contain `compress` as a specific path

      
#### Routing parameters
Routing parameters are grouped under the prefix: `apiml.routes`

The API routing group provides necessary routing information used by the API ML Gateway when routing incoming requests to the corresponding service.
A single route can be used to make direct REST calls to multiple resources or API endpoints. The route definition provides rules used by the API ML Gateway to rewrite the URL
in the Gateway address space.

Routing information consists of two parameters per route:

 * `gatewayUrl`
 * `serviceUrl`

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
This prefix is used to differentiate the routes. This prefix must be provided manually when _XML_ configuration is used.

For more information about API ML routing, see [API Gateway Routing](https://github.com/zowe/api-layer/wiki/API-Gateway-Routing).

#### Authentication parameters
Authentication parameters are grouped under the prefix: `apiml.authentication`. When unspecified, the default values are used.

This parameter enables a service to accept the Zowe JWT token. The API Gateway translates the token to an authentication method supported by a service.

The following parameters define the service authentication method:

* **apiml.authentication.scheme**

    This parameter specifies a service authentication scheme.
    The following schemes are supported by the API Gateway:

    * **bypass**

        This value specifies that the token is passed unchanged to the service.

        **Note:** This is the default scheme when no authentication parameters are specified.

    * **zoweJwt**

        This value specifies that a service accepts the Zowe JWT token. No additional processing is done by the API Gateway.

    * **httpBasicPassTicket**

        This value specifies that a service accepts PassTickets in the Authorization header of the HTTP requests using the basic authentication scheme.
        It is necessary to provide a service APPLID in the `apiml.authentication.applid` parameter.

        **Tip:** For more information, see [Enabling PassTicket creation for API Services that Accept PassTickets](api-mediation-passtickets).

    * **zosmf**

        This value specifies that a service accepts z/OSMF LTPA (Lightweight Third-Party Authentication).
        This scheme should only be used for a z/OSMF service used by the API Gateway Authentication Service, and other z/OSMF services that are using the same LTPA key.

        **Tip:** For more information about z/OSMF Single Sign-on, see [Establishing a single sign-on environment](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.4.0/com.ibm.zosmfcore.multisysplex.help.doc/izuG00hpManageSecurityCredentials.html).

    * **safIdt**

        This value specifies that the application recognizes the SAF IDT scheme and fills the `X-SAF-Token` header with the token produced by the Saf IDT provider implementation. For more information, see [SAF IDT provider](./implement-new-saf-provider).

    * **x509**

        This value specifies that a service accepts client certificates forwarded in the HTTP header. The Gateway service extracts information from a valid client certificate. For validation, the certificate needs to be trusted by API Mediation Layer, and needs to contain a Client Authentication (1.3.6.1.5.5.7.3.2) entry in Extended Key Usage. To use this scheme, it is also necessary to specify which headers to include. Specify these parameters in `headers`.

    * **zosmf**
        
        This value specifies that a service accepts z/OSMF LTPA (Lightweight Third-Party Authentication).
        This scheme should only be used for a z/OSMF service used by the API Gateway Authentication Service, and other z/OSMF services that are using the same LTPA key.
        
        **Tip:** For more information about z/OSMF Single Sign-on, see [Establishing a single sign-on environment](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.4.0/com.ibm.zosmfcore.multisysplex.help.doc/izuG00hpManageSecurityCredentials.html).

* **authentication.headers**
    
    When the `x509` scheme is specified, use the `headers` parameter to select which values to send to a service. Use one of the following values:
    
    * `X-Certificate-Public`
    
        The public part of the client certificate base64 encoded 

    * `X-Certificate-DistinguishedName`
    
        The distinguished name the from client certificate

    * `X-Certificate-CommonName` 
    
        The common name from the client certificate
    
* **apiml.authentication.applid**

    This parameter specifies a service APPLID.
    This parameter is valid only for the `httpBasicPassTicket` authentication scheme.

#### API Info parameters
API Info parameters are grouped under the prefix: `apiml.apiInfo`.

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

    This parameter specifies the API version. This parameter is used to correctly retrieve the API documentation according to the requested version of the API.

* **apiml.apiInfo.{api-index}.gatewayUrl**

    This parameter specifies the base path at the API Gateway where the API is available.
    Ensure that this value is the same path as the `gatewayUrl` value in the `routes` sections for the routes, which belong to this API.

* **apiml.apiInfo.{api-index}.swaggerUrl**

    (Optional) This parameter specifies the Http or Https address where the Swagger JSON document is available.

* **apiml.apiInfo.{api-index}.documentationUrl**

    (Optional) This parameter specifies the link to the external documentation. A link to the external documentation can be included along with the Swagger documentation.

* **apiml.apiInfo.{api-index}.defaultApi**

    (Optional) This parameter specifies if the API is the default one shown in the API Catalog. If no API has this parameter set to `true`, or multiple APIs have it set to `true`,
    then the default API becomes the API with the highest major version seen in `apiml.apiInfo.{api-index}.version`.

**Note:** The `{api-index}` is used to differentiate the service APIs. This index must be provided manually when _XML_ configuration is used.
In the following example, `0` represents the `api-index`.

```
<apiml.apiInfo.0.apiId>zowe.apiml.sampleclient</apiml.apiInfo.0.apiId>
<apiml.apiInfo.0.swaggerUrl>https://hostname/sampleclient/api-doc</apiml.apiInfo.0.swaggerUrl>
<apiml.apiInfo.0.gatewayUrl>api/v1</apiml.apiInfo.0.gatewayUrl>
<apiml.apiInfo.0.documentationUrl>https://www.zowe.org</apiml.apiInfo.0.documentationUrl>
```

## Sending a heartbeat to API Mediation Layer Discovery Service

After registration, a service must send a heartbeat periodically to the Discovery Service to indicate that the service is available. When the Discovery Service does not receive a heartbeat, the service instance is deleted from the Discovery Service.

If the server does not receive a renewal in 90 seconds, it removes the instance from its registry.

**Note:** We recommend that the interval for the heartbeat is no more than 30 seconds.

 Use the Http `PUT` method in the following format to tell the Discovery Service that your service is available:

```https://{eureka_hostname}:{eureka_port}/eureka/apps/{serviceId}/{instanceId}```

## Validating successful onboarding with the API Mediation Layer
Ensure that you successfully onboarded a service with the API Mediation Layer. 

**Follow these steps:**
  1. [Validate successful onboarding](./onboard-overview.md#verify-successful-onboarding-to-the-api-ml)
 
  2. Check that you can access your API service endpoints through the Gateway.

  3. (Optional) Check that you can access your API service endpoints directly outside of the Gateway.

## External Resources

 - https://blog.asarkar.org/technical/netflix-eureka/
 - https://medium.com/@fahimfarookme/the-mystery-of-eureka-health-monitoring-5305e3beb6e9
 - https://github.com/Netflix/eureka/wiki/Eureka-REST-operations
