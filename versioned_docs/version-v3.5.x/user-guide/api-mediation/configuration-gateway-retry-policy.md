# Customizing Gateway retry policy

Use the following procedure to change the Gateway retry policy.

:::info Role: system programmer
:::

All requests are disabled as the default configuration for retry with one exception: the server retries `GET` requests that finish with status code `503`.

1. Open the `zowe.yaml` configuration file.
2. Configure the following properties:

  * **components.gateway.ribbon.retryableStatusCodes**  
This property provides a list of status codes, for which the server should retry the request.
    
  **Example:** `components.gateway.ribbon.retryableStatusCodes: "503, 404"` 
    
  * **components.gateway.ribbon.OkToRetryOnAllOperations**  
Specifies whether to retry all operations for this service. The default value is `false`. In this case, only `GET` requests are retried if they return a response code that is listed in `ribbon.retryableStatusCodes`. Setting this parameter to `true` enables retry requests for all methods which return a response code listed in `ribbon.retryableStatusCodes`. 
     
:::note
Enabling retry can impact server resources due to request body buffering.
:::

* **components.gateway.ribbon.MaxAutoRetries**  
Specifies the number of times a failed request is retried on the same server. This number is multiplied with `ribbon.MaxAutoRetriesNextServer`. The default value is `0`.
    
* **components.gateway.ribbon.MaxAutoRetriesNextServer**  
Specifies the number of additional servers that attempt to make the request. This number excludes the first server. The default value is `5`. 

3. Restart Zowe.