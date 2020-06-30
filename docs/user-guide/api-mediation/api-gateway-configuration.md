# API Gateway configuration parameters

## Zowe runtime configuration parameters

As an application developer who wants to run Zowe, set the following parameters during the Zowe runtime configuration by modifying the `<Zowe install directory>/components/api-mediation/bin/start.sh` file:

* **[apiml.service.allowEncodedSlashes](#apimlserviceallowencodedslashes)**
* **[apiml.service.corsEnabled](#apimlservicecorsenabled)**

### apiml.service.allowEncodedSlashes

By default, the API Mediation Layer rejects encoded slashes in the URL path of the request. Not allowing encoded slashes is the recommended configuration. If you are onboarding applications which expose endpoints that expect encoded slashes, you must configure the API Mediation Layer to allow this pattern.
    
**Follow these steps:**
    
1. Open the file `<Zowe install directory>/components/api-mediation/bin/start.sh`.
2. Find the line that contains the `-Dapiml.service.allowEncodedSlashes=false` parameter and set the value to `true`.
3. Restart Zowe&trade. 
    
Requests with encoded slashes will now be passed to onboarded services. 
       
### apiml.service.corsEnabled

By default, CORS are disabled in the API Gateway for the Gateway routes `api/v1/gateway/**`. Allowing CORS for Gateway is necessary to enable CORS at the service level. Use the following procedure to enable CORS.
    
**Follow these steps:**
     
1. Open the file `<Zowe install directory>/components/api-mediation/bin/start.sh`.
2. Find the line that contains the `-Dapiml.service.corsEnabled=false` parameter and set the value to `true`.
3. Restart Zowe&trade.
  
Requests through the Gateway will now contain CORS header. 

## Retry policy

In default configuration, retry for all request is disabled, with one exception. The server will retry `GET` requests that finish with status code `503`. You can modify this behavior with these parameters:
* **ribbon.retryableStatusCodes**

    Provide a list of status codes, for which the server should retry the request.
    
    **Example:** `-Dribbon.retryableStatusCodes="503, 404"` 
    
* **ribbon.OkToRetryOnAllOperations**

     Specifies whether all operations can be retried for this service. The default value is `false`. In this case, only GET requests will be retried if they return any response code that is listed in `ribbon.retryableStatusCodes`. Setting this parameter to `true` enables retry requests for all methods which return response code listed in `ribbon.retryableStatusCodes`. Enabling retry can impact on server resources as the result of buffering of the request body.

* **ribbon.MaxAutoRetries**
    
    The number of times a failed request is retried on the same server. This number is multiplied with `ribbon.MaxAutoRetriesNextServer`. Default value is `0`.
    
* **ribbon.MaxAutoRetriesNextServer**
    
    The number of servers to try excluding the first one. Default value is `5`. 
