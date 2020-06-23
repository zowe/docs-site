# Zowe runtime configuration parameters

These parameters can be set during the Zowe runtime configuration by modifying the `<Zowe install directory>/components/api-mediation/bin/start.sh` file.

* **apiml.service.allowEncodedSlashes**

    By default, the API Mediation Layer rejects encoded slashes in the URL path of the request. Not allowing encoded slashes is the recommended configuration. If you are onboarding applications which expose endpoints expecting encoded slashes, you need to configure the API Mediation Layer to allow this pattern by performing the following steps:
    1. Open the file `<Zowe install directory>/components/api-mediation/bin/start.sh`.
    2. Find the line that contains the `-Dapiml.service.allowEncodedSlashes=false` parameter and set the value to `true`:
    3. Restart Zowe&trade;. Requests with encoded slashes will now be passed to onboarded services. 
       
       
* **apiml.service.corsEnabled**

    By default, CORS are disabled in the API Gateway for the Gateway routes `api/v1/gateway/**`. Allowing CORS for Gateway is mandatory in case you need to enable CORS at the service level. In order to enable CORS, perform the following steps:
    1. Open the file `<Zowe install directory>/components/api-mediation/bin/start.sh`.
    2. Find the line that contains the `-Dapiml.service.corsEnabled=false` parameter and set the value to `true`:
    3. Restart Zowe&trade;. Requests through Gateway will now contain CORS header. 

    
