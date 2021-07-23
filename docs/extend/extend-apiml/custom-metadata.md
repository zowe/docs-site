# Custom Metadata

(Optional) Additional metadata can be added to the instance information that is registered in the Discovery Service in the `customMetadata` section. This information is propagated from the Discovery Service to the onboarded services (clients). In general, additional metadata do not change the behavior of the client. Some specific metadata can configure the functionality of the API Mediation Layer. Such metadata are generally prefixed with the `apiml.` qualifier. We recommend you define your own qualifier, and group all metadata you wish to publish under this qualifier. If you use the Spring enabler, ensure that you include the prefix `apiml.service` before the parameter name.

* **customMetadata.apiml.enableUrlEncodedCharacters**
      
    When this parameter is set to `true`, the Gateway allows encoded characters to be part of URL requests redirected through the Gateway. The default setting of `false` is the recommended setting. Change this setting to `true` only if you expect certain encoded characters in your application's requests.
          
    **Important!**  When the expected encoded character is an encoded slash or backslash (`%2F`, `%5C`), make sure the Gateway is also configured to allow encoded slashes. For  more information, see [Installing the Zowe runtime on z/OS](../../user-guide/install-zos.md).
    
    **Note:** If you use the Spring enabler, use the following parameter name:
    
    `apiml.service.customMetadata.apiml.enableUrlEncodedCharacters` 

* **customMetadata.apiml.connectTimeout**
    
    The value in milliseconds that specifies a period, in which API ML should establish a single, non-managed connection with this service. If omitted, the default value specified in the API ML Gateway service configuration is used.
    
    **Note:** If you use the Spring enabler, use the following parameter name:
    
    `apiml.service.customMetadata.apiml.connectTimeout` 

* **customMetadata.apiml.readTimeout**
    
    The value in milliseconds that specifies the  time of inactivity between two packets in response from this service to API ML. If omitted, the default value specified in the API MLGateway service configuration is used.

    **Note:** If you use the Spring enabler, use the following parameter name:
    
    `apiml.service.customMetadata.apiml.readTimeout`

* **customMetadata.apiml.connectionManagerTimeout**
    
    HttpClient employs a special entity to manage access to HTTP connections called by the HTTP connection manager. The purpose of an HTTP connection manager is to serve as a factory for new HTTP connections, to manage the life cycle of persistent connections, and to synchronize access to persistent connections. Internally, it works with managed connections which serve as proxies for real connections. `connectionManagerTimeout` specifies a period, in which managed connections with API ML should be established. The value is in milliseconds. If omitted, the default value specified in the API ML Gateway service configuration is used.

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
   
    This parameter is part of the load balancing configuration for the Deterministic Routing capability. Through this parameter, the service can specify which load balancing schema it requires. If you don't specify this parameter, the service will be routed using basic round robin schema. This parameter can be set to the following values:
   
    * **`headerRequest`**
    
    This applies the Header Request load balancing schema. Clients can call API Gateway and provide special header with the value of reuqested instanceId. The gateway will understand this as a Client's request to be routed to such instance. Clients have several possibilities how they can understand the topology of service instances: To name a few: the `/eureka/apps` endpoint on Discovery service or the `/gateway/services` endpoint on Gateway, that both provide this information. Client can then request a specific instance through using the special header described below.

    The header name is `X-InstanceId` and sample value is `discoverable-client:discoverableclient:10012`. This is identical to `instanceId` property in Discovery service's registration.
    
    In combination with enabling [Routed instance header](../../user-guide/api-mediation/api-gateway-configuration.md#routed-instance-header), the client can achieve sticky session functionality. The benefit of this approach is that there is no session on Gateway and the client is in full control over whether he wants to go to a specific instance or not. 
    
    1) The client calls API Gateway and gets routed to a service
    2) The client reads the `X-InstanceId` header value from the response to understand the service was routed to
    3) On all subsequent requests, client provides the `X-InstanceId` header with previously read value to get routed to the same instance of service
    
    * **`authentication`**

   This applies the Authentication load balancing schema. This is sticky session functionality based on user's ID. The user's ID is understood from Zowe SSO token on client's request. Requests without the token will be routed in round robin fashion. The user is first routed in round robin fashion and then the routed instance Id is cached. The instance information is used for subsequent requests to route the client to the cached target service instance. This session's default expiration time is 8 hours. After the session expires, the process initiates again.

    In default configuration, this cache is stored on each gateway instance. You can choose to distribute this cache between gateway's instances. To do so, please follow [Distributed load balancer cache](../../user-guide/api-mediation/api-gateway-configuration.md#distributed-load-balancer-cache)
           
 * **customMetadata.apiml.lb.cacheRecordExpirationTimeInHours**  
    
    When the property `customMetadata.apiml.lb.type` is set to `authentication`, the user can also define the expiration time for the selected instance information that is cached. This property aims to prevent any discrepancy which might possibly occur if the required target server is not available anymore. The default value is 8 hours.  

