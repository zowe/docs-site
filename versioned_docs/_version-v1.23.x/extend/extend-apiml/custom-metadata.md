# Custom Metadata

(Optional) Additional metadata can be added to the instance information that is registered in the Discovery Service in the `customMetadata` section. This information is propagated from the Discovery Service to the onboarded services (clients). In general, additional metadata do not change the behavior of the client. Some specific metadata can configure the functionality of the API Mediation Layer. Such metadata are generally prefixed with the `apiml.` qualifier. We recommend you define your own qualifier, and group all metadata you wish to publish under this qualifier. If you use the Spring enabler, ensure that you include the prefix `apiml.service` before the parameter name.

* **customMetadata.apiml.enableUrlEncodedCharacters**
      
    When this parameter is set to `true`, the Gateway allows encoded characters to be part of URL requests redirected through the Gateway. The default setting of `false` is the recommended setting. Change this setting to `true` only if you expect certain encoded characters in your application's requests.
          
    **Important!**  When the expected encoded character is an encoded slash or backslash (`%2F`, `%5C`), make sure the Gateway is also configured to allow encoded slashes. For  more information, see [Installing the Zowe runtime on z/OS](../../user-guide/install-zos.md).
    
    **Note:** If you use the Spring enabler, use the following parameter name:
    
    `apiml.service.customMetadata.apiml.enableUrlEncodedCharacters` 

* **customMetadata.apiml.connectTimeout**
    
    The value in milliseconds that specifies a period in which API ML should establish a single, non-managed connection with this service. If omitted, the default value specified in the API ML Gateway service configuration is used.
    
    **Note:** If you use the Spring enabler, use the following parameter name:
    
    `apiml.service.customMetadata.apiml.connectTimeout` 

* **customMetadata.apiml.readTimeout**
    
    The value in milliseconds that specifies the time of inactivity between two packets in response from this service to API ML. If omitted, the default value specified in the API MLGateway service configuration is used.

    **Note:** If you use the Spring enabler, use the following parameter name:
    
    `apiml.service.customMetadata.apiml.readTimeout`

* **customMetadata.apiml.connectionManagerTimeout**
    
    HttpClient employs a special entity to manage access to HTTP connections called by the HTTP connection manager. The purpose of an HTTP connection manager is to serve as a factory for new HTTP connections, to manage the life cycle of persistent connections, and to synchronize access to persistent connections. Internally, it works with managed connections which serve as proxies for real connections. `connectionManagerTimeout` specifies a period in which managed connections with API ML should be established. The value is in milliseconds. If omitted, the default value specified in the API ML Gateway service configuration is used.

    **Note:** If you use the Spring enabler, use the following parameter name:
    
    `apiml.service.customMetadata.apiml.connectionManagerTimeout`

* **customMetadata.apiml.okToRetryOnAllOperations**
    
    Specifies whether all operations can be retried for this service. The default value is `false`. The `false` value allows retries for only `GET` requests if a response code of `503` is returned. Setting this value to `true` enables retry requests for all methods, which return a `503` response code. Enabling retry can impact server resources resulting from buffering of the request body.
    
    **Note:** If you use the Spring enabler, use the following parameter name:
    
    `apiml.service.customMetadata.apiml.okToRetryOnAllOperations`
              
* **customMetadata.apiml.corsEnabled**
    
    When this parameter is set to `true`, CORS is enabled on the service level for all the service routes. 
    For more information, see this article about [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).
    
    **Note:** If you use the Spring enabler, use the following parameter name:
    
    `apiml.service.customMetadata.apiml.corsEnabled`   
    
 * **customMetadata.apiml.lb.type**
   
    This parameter is part of the load balancing configuration for the Deterministic Routing capability. Through this parameter, the service can specify which load balancing schema the service requires. If this parameter is not specified, the service is routed using the basic round robin schema. This parameter can be set to the following values:
   
    * **`headerRequest`**
    
    This value applies the Header Request load balancing schema. Clients can call the API Gateway and provide a special header with the value of the requested instanceId. The Gateway understands this as a request from the client for routing to a specific instance. Clients have several possibilities for understanding the topology of service instances, such as via the `/eureka/apps` endpoint on the Discovery service, or the `/gateway/services` endpoint on the Gateway.  In either case, the information is provided. The client can then request a specific instance by using the special header described below.

    The header name is `X-InstanceId`, and the sample value is `discoverable-client:discoverableclient:10012`. This is identical to `instanceId` property in the registration of the Discovery service.
    
    In combination with enabling [Routed instance header](../../user-guide/api-mediation/api-gateway-configuration.md#routed-instance-header), the client can achieve sticky session functionality. (The term, 'sticky session' refers to the feature of many load balancing solutions to route the requests for a particular session to the same physical machine that serviced the first request for that session). The benefit of this approach is that there is no session on the Gateway, and the client ultimately decides whether or not to go to a specific instance. This method uses the following sequence:
    
    1) The client calls API Gateway and gets routed to a service.
    2) The client reads the `X-InstanceId` header value from the response to understand the service was routed to.
    3) For all subsequent requests, the client provides the `X-InstanceId` header with previously read value to get routed to the same instance of the service.
    
    * **`authentication`**

   This value applies the Authentication load balancing schema. This is a sticky session functionality based on the ID of the user. The user ID is understood from the Zowe SSO token on the client's request. Requests without the token are routed in a round robin fashion. The user is first routed in a round robin fashion, and then the routed instance Id is cached. The instance information is used for subsequent requests to route the client to the cached target service instance. This session's default expiration time is 8 hours. After the session expires, the process initiates again.

    In default configuration, this cache is stored on each Gateway instance. You can choose to distribute this cache between the Gateway's instances. To do so, follow the steps described in [Distributed load balancer cache](../../user-guide/api-mediation/api-gateway-configuration.md#distributed-load-balancer-cache).
           
 * **customMetadata.apiml.lb.cacheRecordExpirationTimeInHours**  
    
    When the property `customMetadata.apiml.lb.type` is set to `authentication`, the user can also define the expiration time for the selected instance information that is cached. This property aims to prevent any discrepancy which might occur if the required target server is no longer available. The default value is 8 hours.   

