# Customizing metadata (optional)

Additional metadata can be added to the instance information that is registered in the Discovery Service in the `customMetadata` section. This information is propagated from the Discovery Service to the onboarded services (clients). In general, additional metadata do not change the behavior of the client. Some specific metadata can configure the functionality of API Mediation Layer (API ML). Such metadata are generally prefixed with the `apiml.` qualifier. We recommend you define your own qualifier, and group all metadata you wish to publish under this qualifier. If you use the Spring enabler, ensure that you include the prefix `apiml.service` before the parameter name.

* **customMetadata.apiml.enableUrlEncodedCharacters**  
When this parameter is set to `true`, the API Gateway allows encoded characters to be part of URL requests redirected through the API Gateway. The default setting of `true` is the recommended setting. Change this setting to `false` only if you do not want certain encoded characters in your application's requests.
          
  :::info Important
  When the expected encoded character is an encoded slash or backslash (`%2F`, `%5C`), make sure the API Gateway is also configured to allow encoded slashes. For  more information, see [Zowe runtime](../../user-guide/install-zos.md#zowe-runtime) in Zowe server-side installation overview.
  :::

  :::note
  If you use the Spring enabler, use the following parameter name:  
  `apiml.service.customMetadata.apiml.enableUrlEncodedCharacters` 
  :::

* **customMetadata.apiml.connectTimeout**   
The value in milliseconds that specifies a period in which API ML should establish a single, non-managed connection with this service. The period is separate from the response timeout. If omitted, the default value specified in the API ML Gateway service configuration is used.   
  :::note
  If you use the Spring enabler, use the following parameter name:
  `apiml.service.customMetadata.apiml.connectTimeout` 
  :::

* **customMetadata.apiml.responseTimeout**  
The value in milliseconds that specifies the maximum time to wait for the response from this service. If omitted, the default value specified in the API ML Gateway service configuration is used.  
  :::note
  If you use the Spring enabler, use the following parameter name:  
  `apiml.service.customMetadata.apiml.responseTimeout`
  :::

* **customMetadata.apiml.corsEnabled**  
When this parameter is set to `true`, CORS handling by the API Gateway is enabled on the service level for all service routes. 

  For more information, refer to enabling CORS with Custom Metadata on the API Gateway: [Customizing Cross-Origin Resource Sharing (CORS)](../../user-guide/api-mediation/configuration-cors.md).
Additional information can be found in this article about [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).    
  :::note
  If you use the Spring enabler, use the following parameter name:
  `apiml.service.customMetadata.apiml.corsEnabled`
  :::

* **customMetadata.apiml.gatewayAuthEndpoint**  
Specifies the API Gateway authentication endpoint used by the ZAAS Client configuration. The default value is `/api/v1/gateway/auth`. For more information about ZAAS Client, see [ZAAS Client](zaas-client.md).  
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
(Optional) A service can specify which origins are to be accepted by the API Gateway during CORS handling.  
**Default:** If not set, this parameter value falls back to the API Gateway’s `corsDefaultAllowedOrigins` (`https://${hostname}:${port}`). You can optionally provide a comma-separated list of values, which is additive and does not replace the API Gateway's default origins.     
  :::note
  If you use the Spring enabler, use the following parameter name:
  `apiml.service.customMetadata.apiml.corsAllowedOrigins`
  :::

  For more information, refer to enabling CORS with Custom Metadata on the API Gateway: [Customizing Cross-Origin Resource Sharing (CORS)](../../user-guide/api-mediation/configuration-cors.md).

* **customMetadata.apiml.corsAllowedHeaders**  
(Optional) Specify a comma-separated list of HTTP headers that are allowed during a CORS request to this service.    
  :::note
  If you use the Spring enabler, use the following parameter name:
  `apiml.service.customMetadata.apiml.corsAllowedHeaders`
  :::

* **customMetadata.apiml.corsAllowCredentials**  
(Optional) Configure whether the browser should include credentials (such as cookies, authorization headers, or TLS client certificates) in CORS requests. The API Gateway-level default and the per-service default are set to `true`.  
  :::note
  If you use the Spring enabler, use the following parameter name:
  `apiml.service.customMetadata.apiml.corsAllowCredentials`
  :::

* **customMetadata.apiml.corsAllowedMethods** 
(Optional) Specify a comma-separated list of HTTP methods (for example, `GET`, `POST`, `PUT`, `DELETE`) that are allowed when accessing the service via CORS.  
  :::note
  If you use the Spring enabler, use the following parameter name:
  `apiml.service.customMetadata.apiml.corsAllowedMethods`
  :::
  
* **customMetadata.apiml.lb.type**  
 This parameter is part of the load balancing configuration for the Deterministic Routing capability. Through this parameter, the service can specify which load balancing schema the service requires. If this parameter is not specified, the service is routed using the basic round robin schema. Sticky session routing is managed by the API ML cache. This parameter can be set to the following values:
   
  * **`headerRequest`**  
  This value applies the Header Request load balancing schema. Clients can call the API Gateway and provide a special header with the value of the requested instanceId. The API Gateway understands this as a request from the client for routing to a specific instance. Clients have several possibilities for understanding the topology of service instances, such as via the `/eureka/apps` endpoint on the Discovery service, or the `/gateway/services` endpoint on the API Gateway. In either case, the information is provided. The client can then request a specific instance by using Direct instance targeting with `X-InstanceId` described below.

  * **`authentication`**   
    This value applies the Authentication load balancing schema. This is a sticky session functionality based on the ID of the user. The user ID is understood from the Zowe SSO token on the client's request. Requests without the token are routed in a round-robin fashion. The user is first routed in a round robin fashion, and then the routed instance Id is cached. The instance information is used for subsequent requests to route the client to the cached target service instance. This session's default expiration time is a global value defined in the API Gateway. After the session expires, the process initiates again.

   **Direct instance targeting with `X-InstanceId`**

    When a client knows the exact Eureka `instanceId` of a service instance, the client can bypass the default load balancing (such as round-robin) and route a request directly to that specific instance.

    The direct instance targeting feature works completely independently of the sticky session flow and is highly useful to perform the following functions:
   - **Debugging:** Directing traffic to a specific instance to isolate issues.
  - **Operational testing:** Verifying a particular instance's behavior.
  - **Stateful interactions:** When a client maintains its own session affinity without relying on API Gateway-side sticky sessions.

   To target a specific instance, provide the instance ID in the request header:
    - **Header name:** `X-InstanceId`
    - **Value format:** `hostname:serviceId:port` (This is identical to the instanceId property in the registration of the Discovery service).
    
    **Examples:**

    **Direct GET request with `X-InstanceId`:**

    ```http
    GET /discoverable-client/api/v1/endpoint HTTP/1.1
    X-InstanceId: myhost:discoverable-client:10012
    ```

    **cURL equivalent:**

    ```bash
    curl -H "X-InstanceId: myhost:discoverable-client:10012" \
        https://gateway-host:port/discoverable-client/api/v1/endpoint
    ```

    **Error behavior:**  
    If the requested instance is not found or is unregistered, the API Gateway rejects the request and returns a 404 error response:

    ```json
    {
      "status": 404,
      "error": "Not Found",
      "message": "Service instance not found for the provided instance ID"
    }
    ``` 
   
   :::note
   The response `X-InstanceId` is only present when the client sent `X-InstanceId` in the request, and it echoes that value. It is not a general routed-instance report. For more information, see [Retrieving a specific service within your environment](../../user-guide/api-mediation/configuration-access-specific-instance-of-service.md).
   :::  

* **customMetadata.apiml.gateway.applyRateLimiterFilter**  
  When this parameter is set to `true`, the rate limiter is applied to the request for this service. When enabling this filter, you can also define the following properties:
  * `customMetadata.apiml.gateway.rateLimiterCapacity`  
  Defines the total number of requests that can be allowed at one time per user
  * `customMetadata.apiml.gateway.rateLimiterTokens`  
  Defines the number of requests that are added to the service’s allowance at regular intervals
  * `customMetadata.apiml.gateway.rateLimiterRefillDuration`  
  Sets the time interval (in minutes) at which new requests (or tokens) are added.

  When no values are provided, global values defined in the API Gateway are applied. For more information about the default configuration, see [Customizing gateway rate limiter filter](../../user-guide/api-mediation/customizing-gateway-rate-limiter.md).


## Removed parameters

When migrating from API ML v2, in v3 the following parameters have been removed and are no longer supported:  
- `customMetadata.apiml.readTimeout`
- `customMetadata.apiml.connectionManagerTimeout`
- `customMetadata.apiml.okToRetryOnAllOperations`
- `customMetadata.ribbon.*`
- `customMetadata.apiml.headersToIgnore`
- `customMetadata.apiml.lb.cacheRecordExpirationTimeInHours`
- `customMetadata.apiml.response.compress`
- `customMetadata.apiml.response.compressRoutes`
- `customMetadata.apiml.response.headers`

:::note
In API ML v3, `customMetadata.apiml.okToRetryOnAllOperations` is **no longer supported**. The API Gateway uses a fixed retry policy. It retries `GET` requests that end with status `503` up to 5 times. The v2 parameter `apiml.okToRetryOnAllOperations` is no longer read, so a service cannot change which operations are retried. For more information, see [Customizing Gateway Retry Policy](../../user-guide/api-mediation/configuration-gateway-retry-policy.md)
:::
