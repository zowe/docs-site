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
    
Requests with encoded slashes are now passed to onboarded services. 
       
### apiml.service.corsEnabled

By default, CORS are disabled in the API Gateway for the Gateway routes `api/v1/gateway/**`. Allowing CORS for Gateway is necessary to enable CORS at the service level. Use the following procedure to enable CORS.
    
**Follow these steps:**
     
1. Open the file `<Zowe install directory>/components/api-mediation/bin/start.sh`.
2. Find the line that contains the `-Dapiml.service.corsEnabled=false` parameter and set the value to `true`.
3. Restart Zowe&trade.
  
Requests through the Gateway now contain a CORS header. 

### apiml.security.auth.provider

By default, the API Gateway uses z/OSMF as an authentication provider. It is possible to switch to SAF as the authentication
provider instead of z/OSMF. The intended usage of SAF as an authentication provider is for systems without z/OSMF.
If SAF is used and the z/OSMF is available on the system, the created tokens are not accepted by z/OSMF. Use
the following procedure to switch to SAF. 

**Follow these steps:**
     
1. Open the file `<Zowe install directory>/components/api-mediation/bin/start.sh`.
2. Find the line that contains the `-Dapiml.security.auth.zosmfServiceId=zosmf` parameter and replace it with `-Dapiml.security.auth.provider=saf`.
3. Restart Zowe&trade.

Authentication requests now utilize SAF as the authentication provider. API ML can run without zOSMF present on the system. 

## Retry policy

In default configuration, retry for all requests is disabled, with one exception: the server retries `GET` requests that finish with status code `503`. 
To change this default configuration, include the following parameters:

* **ribbon.retryableStatusCodes**

    Provide a list of status codes, for which the server should retry the request.
    
    **Example:** `-Dribbon.retryableStatusCodes="503, 404"` 
    
* **ribbon.OkToRetryOnAllOperations**

     Specifies whether all operations can be retried for this service. The default value is `false`. In this case, only GET requests are retried if they return a response code that is listed in `ribbon.retryableStatusCodes`. Setting this parameter to `true` enables retry requests for all methods which return response code listed in `ribbon.retryableStatusCodes`. 
     
**Note:** Enabling retry can impact server resources due to request body buffering.

* **ribbon.MaxAutoRetries**
    
    The number of times a failed request is retried on the same server. This number is multiplied with `ribbon.MaxAutoRetriesNextServer`. The default value is `0`.
    
* **ribbon.MaxAutoRetriesNextServer**
    
    The number of additional servers that attempt to make the request. This number excleds the first server. The default value is `5`. 
