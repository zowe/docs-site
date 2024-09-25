# Customizing Metadata (optional)

Additional metadata can be added to the instance information that is registered in the Discovery Service in the `customMetadata` section. This information is propagated from the Discovery Service to the onboarded services (clients). In general, additional metadata do not change the behavior of the client. Some specific metadata can configure the functionality of the API Mediation Layer. Such metadata are generally prefixed with the `apiml.` qualifier. We recommend you define your own qualifier, and group all metadata you wish to publish under this qualifier. If you use the Spring enabler, ensure that you include the prefix `apiml.service` before the parameter name.

* **customMetadata.apiml.enableUrlEncodedCharacters**  
When this parameter is set to `true`, the Gateway allows encoded characters to be part of URL requests redirected through the Gateway. The default setting of `true` is the recommended setting. Change this setting to `false` only if you do not want certain encoded characters in your application's requests.
          
  :::info Important
  When the expected encoded character is an encoded slash or backslash (`%2F`, `%5C`), make sure the Gateway is also configured to allow encoded slashes. For  more information, see [Zowe runtime](../../user-guide/install-zos.md#zowe-runtime) in Zowe server-side installation overview.
  :::

  :::note
  If you use the Spring enabler, use the following parameter name:  
  `apiml.service.customMetadata.apiml.enableUrlEncodedCharacters` 
  :::

* **customMetadata.apiml.connectTimeout**   
The value in milliseconds that specifies a period in which API ML should establish a single, non-managed connection with this service. If omitted, the default value specified in the API ML Gateway service configuration is used.
    
  :::note
  If you use the Spring enabler, use the following parameter name:
  `apiml.service.customMetadata.apiml.connectTimeout` 
  :::

* **customMetadata.apiml.readTimeout**  
The value in milliseconds that specifies the time of inactivity between two packets in response from this service to API ML. If omitted, the default value specified in the API MLGateway service configuration is used.

  :::note
  If you use the Spring enabler, use the following parameter name:  
  `apiml.service.customMetadata.apiml.readTimeout`
  :::

* **customMetadata.apiml.connectionManagerTimeout**  
HttpClient employs a special entity to manage access to HTTP connections called by the HTTP connection manager. The purpose of an HTTP connection manager is to serve as a factory for new HTTP connections, to manage the life cycle of persistent connections, and to synchronize access to persistent connections. Internally, it works with managed connections which serve as proxies for real connections. `connectionManagerTimeout` specifies a period in which managed connections with API ML should be established. The value is in milliseconds. If omitted, the default value specified in the API ML Gateway service configuration is used.

  :::note
  If you use the Spring enabler, use the following parameter name:  
  `apiml.service.customMetadata.apiml.connectionManagerTimeout`
  :::
* **customMetadata.apiml.okToRetryOnAllOperations**  
Specifies whether all operations can be retried for this service. The default value is `false`. The `false` value allows retries for only `GET` requests if a response code of `503` is returned. Setting this value to `true` enables retry requests for all methods, which return a `503` response code. Enabling retry can impact server resources resulting from buffering of the request body.
    
  :::note
  If you use the Spring enabler, use the following parameter name:  
  `apiml.service.customMetadata.apiml.okToRetryOnAllOperations`
  :::

* **customMetadata.apiml.corsEnabled**  
When this parameter is set to `true`, CORS handling by the Gateway is enabled on the service level for all service routes. 

  For more information, refer to enabling CORS with Custom Metadata on the Gateway: [Customizing Cross-Origin Resource Sharing (CORS)](../../user-guide/api-mediation/configuration-cors.md).
Additional information can be found in this article about [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).
    
  :::note
  If you use the Spring enabler, use the following parameter name:
  `apiml.service.customMetadata.apiml.corsEnabled`
  :::

* **customMetadata.apiml.gatewayAuthEndpoint**  
Specifies the Gateway authentication endpoint used by the ZAAS Client configuration. The default value is `/api/v1/gateway/auth`. For more information about ZAAS Client, see [ZAAS Client](zaas-client.md).

  :::note
  If you use the Spring enabler, use the following parameter name:
  `apiml.service.customMetadata.apiml.gatewayAuthEndpoint`
  :::

* **customMetadata.apiml.gatewayPort**  
Specifies the Gateway port used by the ZAAS Client configuration. The default value is `10010`. For more information about ZAAS Client, see [ZAAS Client](zaas-client.md).

  :::note
  If you use the Spring enabler, use the following parameter name:
  `apiml.service.customMetadata.apiml.gatewayPort`
  :::

* **customMetadata.apiml.corsAllowedOrigins**  
Optionally, service can specify which origins will be accepted by Gateway during the CORS handling. When this parameter is not set, the accepted origins are `*` by default. You can provide a coma separated list of values to explicitly limit the accepted origins.
    
  :::note
  If you use the Spring enabler, use the following parameter name:
  `apiml.service.customMetadata.apiml.corsAllowedOrigins`
  :::

  For more information, refer to enabling CORS with Custom Metadata on the Gateway: [Customizing Cross-Origin Resource Sharing (CORS)](../../user-guide/api-mediation/configuration-cors.md).
  
 * **customMetadata.apiml.lb.type**  
 This parameter is part of the load balancing configuration for the Deterministic Routing capability. Through this parameter, the service can specify which load balancing schema the service requires. If this parameter is not specified, the service is routed using the basic round robin schema. This parameter can be set to the following values:
   
  * **`headerRequest`**  
  This value applies the Header Request load balancing schema. Clients can call the API Gateway and provide a special header with the value of the requested instanceId. The Gateway understands this as a request from the client for routing to a specific instance. Clients have several possibilities for understanding the topology of service instances, such as via the `/eureka/apps` endpoint on the Discovery service, or the `/gateway/services` endpoint on the Gateway.  In either case, the information is provided. The client can then request a specific instance by using the special header described below.

    The header name is `X-InstanceId`, and the sample value is `discoverable-client:discoverableclient:10012`. This is identical to `instanceId` property in the registration of the Discovery service.
    
    In combination with enabling [Routed instance header](../../user-guide/api-mediation/configuration-access-specific-instance-of-service.md), the client can achieve sticky session functionality. (The term, 'sticky session' refers to the feature of many load balancing solutions to route the requests for a particular session to the same physical machine that serviced the first request for that session). The benefit of this approach is that there is no session on the Gateway, and the client ultimately decides whether or not to go to a specific instance. This method uses the following sequence:
    
    1. The client calls API Gateway and gets routed to a service.
    2. The client reads the `X-InstanceId` header value from the response to understand the service was routed to.
    3. For all subsequent requests, the client provides the `X-InstanceId` header with previously read value to get routed to the same instance of the service.

    
  * **`authentication`**  
  This value applies the Authentication load balancing schema. This is a sticky session functionality based on the ID of the user. The user ID is understood from the Zowe SSO token on the client's request. Requests without the token are routed in a round robin fashion. The user is first routed in a round robin fashion, and then the routed instance Id is cached. The instance information is used for subsequent requests to route the client to the cached target service instance. This session's default expiration time is 8 hours. After the session expires, the process initiates again.

    In default configuration, this cache is stored on each Gateway instance. You can choose to distribute this cache between the Gateway's instances. To do so, follow the steps described in [Distributing the load balancer cache](../../user-guide/api-mediation/configuration-distributed-load-balancer-cache.md).

* **customMetadata.apiml.lb.cacheRecordExpirationTimeInHours**  
When the property `customMetadata.apiml.lb.type` is set to `authentication`, the user can also define the expiration time for the selected instance information that is cached. This property aims to prevent any discrepancy which might occur if the required target server is no longer available. The default value is 8 hours.   

* **customMetadata.apiml.response.compress**  
When this parameter is set to `true`, API ML compresses content for all responses from this services using GZIP. API ML also adds the `Content-Encoding` header with value `gzip` to responses.

* **customMetadata.apiml.response.compressRoutes**  
When the `customMetadata.apiml.response.compress` parameter is set to `true`, this parameter allows services to further limit the compressed routes. The parameter accepts [ant style](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/util/AntPathMatcher.html) routes deliminated by `,` . The expectation is to provide the absolute paths. 
    
  If relative paths are provided, the starting `/` is added. If the beginning of the pattern does not need to be specifically defined, use `**/{pathYouAreInterestedIn}`

  **Examples:** 

  * `/service/**`  
  Compresses all paths starting with /service/

  * `/service/api/v1/compress,/service/api/v1/custom-compress`  
  Compresses the specific two routes

  * `/\*\*/compress/\*\*`  
  Compresses all paths that contain `compress` as a specific path

* **customMetadata.apiml.response.headers**  
(Optional) A service can specify headers that are added to the response by the Gateway. When this parameter is not set or is empty, no headers are added. Header names and header values are separated by `:`. Multiple headers can be added, delimited by `,`. If a header with the same name already exists in the response, the Gateway overwrites the value of the header. 

  **Examples:**

  * `Strict-Transport-Security:max-age=1234; includeSubDomains`  
  Sets a header with name `Strict-Transport-Security` and value `max-age=1234; includeSubDomains`.
    
  * `Strict-Transport-Security:max-age=1234; includeSubDomains, X-Frame-Options:SAMEORIGIN`  
  Sets two headers:

    1) Header with name `Strict-Transport-Security` and value `max-age=1234; includeSubDomains`.
    2) Header with name `X-Frame-Options` and value `SAMEORIGIN.

* **customMetadata.apiml.headersToIgnore**  
(Optional) A service can specify headers that are removed from the request to the southbound service by the Gateway. When this parameter is not set or is empty, no headers are removed. Multiple headers can be removed, delimited by `,`.
