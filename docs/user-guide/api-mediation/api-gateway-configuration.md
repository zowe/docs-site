# Advanced Gateway features configuration

As a system programmer who wants to configure advanced Gateway features of the API Mediation Layer, set the following parameters by modifying the `<Zowe install directory>/components/api-mediation/bin/start.sh` file. The parameters begin with the `-D` prefix, similar to all the other parameters in the file. Zowe needs to be restarted for these changes to take effect.

  * [SAF as an Authentication provider](#saf-as-an-authentication-provider)
  * [Gateway retry policy](#gateway-retry-policy)
  * [Gateway client certificate authentication](#gateway-client-certificate-authentication)
  * [Gateway timeouts](#gateway-timeouts)
  * [Cors handling](#cors-handling)
  * [Encoded slashes](#encoded-slashes)

## SAF as an Authentication provider

* **apiml.security.auth.provider**

    By default, the API Gateway uses z/OSMF as an authentication provider. It is possible to switch to SAF as the authentication
    provider instead of z/OSMF. The intended usage of SAF as an authentication provider is for systems without z/OSMF.
    If SAF is used and the z/OSMF is available on the system, the created tokens are not accepted by z/OSMF. Use
    the following procedure to switch to SAF. 

    **Follow these steps:**
         
    1. Open the file `<Zowe install directory>/components/api-mediation/bin/start.sh`.
    2. Find the line that contains the `-Dapiml.security.auth.zosmfServiceId=zosmf` parameter and replace it with `-Dapiml.security.auth.provider=saf`.
    3. Restart Zowe&trade.
    
    Authentication requests now utilize SAF as the authentication provider. API ML can run without z/OSMF present on the system. 

## Gateway retry policy

In default configuration, retry for all requests is disabled, with one exception: the server retries `GET` requests that finish with status code `503`. 
To change this default configuration, include the following parameters:

* **ribbon.retryableStatusCodes**

    Provides a list of status codes, for which the server should retry the request.
    
    **Example:** `-Dribbon.retryableStatusCodes="503, 404"` 
    
* **ribbon.OkToRetryOnAllOperations**

     Specifies whether all operations can be retried for this service. The default value is `false`. In this case, only `GET` requests are retried if they return a response code that is listed in `ribbon.retryableStatusCodes`. Setting this parameter to `true` enables retry requests for all methods which return a response code listed in `ribbon.retryableStatusCodes`. 
     
**Note:** Enabling retry can impact server resources due to request body buffering.

* **ribbon.MaxAutoRetries**
    
    Specifies the number of times a failed request is retried on the same server. This number is multiplied with `ribbon.MaxAutoRetriesNextServer`. The default value is `0`.
    
* **ribbon.MaxAutoRetriesNextServer**
    
    Specfies the number of additional servers that attempt to make the request. This number excleds the first server. The default value is `5`. 
    
## Gateway client certificate authentication

Use the following procedure to enable the feature of using a client certificate as a method of authentication for the API Mediation Layer Gateway.

**Follow these steps:**

1. Open the file `<Zowe install directory>/components/api-mediation/bin/start.sh`.
2. Configure the following properties:

* **apiml.security.x509.enabled**

    This is the global feature toggle. Configure the property to `-Dapiml.security.x509.enabled=true`.

* **apiml.security.x509.externalMapperUrl**

    The API Mediation Gateway uses an external API to map a certificate to the owner in SAF. This property informs the Gateway about the location of this API. ZSS is provides this API in Zowe. Provide the ZSS URL in the following format:
    ```
    -Dapiml.security.x509.externalMapperUrl=http://localhost:<ZSS-PORT>/certificate/x509/map
    ```
    The default port is `8542`. The hostname is `localhost` as the ZSS server is accessible only locally.

* **apiml.security.x509.externalMapperUser**

    To authenticate to the mapping API, a JWT token is sent with the request. The token is represents the user that is configured with this property. The user is then authorized to use the `IRR.RUSERMAP` resource within the `FACILITY` class. The default value is `ZWESVUSR`, and the permissions are set up during installation with the `ZWESECUR` jcl or workflow. If you decide to customize the ZWESECUR jcl or workflow (`// SET ZOWEUSER=ZWESVUSR * userid for Zowe started task`), change the `apiml.security.x509.externalMapperUser` to a new value.

* **apiml.security.zosmf.applid**

    When z/OSMF is used as an authentication provider, provide avalid APPLID to allow client certificate authentication. The API ML authenticates to z/OSMF through the generation of a passticket and susequently uses this passticket to authenticate to the
z/OSMF. The value in the default installation of the z/OSMF is `IZUDFLT`. To change the value to another value, use the following procedure.

Restart Zowe&trade.

## Gateway timeouts

* **apiml.gateway.timeoutMillis**

    This property is used to define the global value for http/ws client timeout. For finer control, you can override the properties below.
    
**Note:** Ribbon configures the client that connects to the routed services.

* **ribbon.connectTimeout**
    
   Specifies the value in milliseconds which corresponds to the period in which API ML should establish a single, non-managed connection with the service. If omitted, the default value specified in the API ML Gateway service configuration is used.

* **ribbon.readTimeout**
    
    Specifies the time in milliseconds of inactivity between two packets in response from this service to API ML. If omitted, the default value specified in the API ML Gateway service configuration is used.

* **ribbon.connectionManagerTimeout**
    
    The HttpClient employs a special entity to manage access to HTTP connections called by the HTTP connection manager. The purpose of an HTTP connection manager is to serve as a factory for new HTTP connections, to manage the life cycle of persistent connections, and to synchronize access to persistent connections. Internally, the connections that are managed serve as proxies for real connections. `ConnectionManagerTimeout` specifies a period during which managed connections with API ML should be established. The value is in milliseconds. If omitted, the default value specified in the API ML Gateway service configuration is used.
    
## Cors handling

* **apiml.service.corsEnabled**

    By default, CORS are disabled in the API Gateway for the Gateway routes `api/v1/gateway/**`. Allowing CORS for the Gateway is necessary to enable CORS at the service level. Use the following procedure to enable CORS.
        
    **Follow these steps:**
         
    1. Open the file `<Zowe install directory>/components/api-mediation/bin/start.sh`.
    2. Find the line that contains the `-Dapiml.service.corsEnabled=false` parameter and set the value to `true`.
    3. Restart Zowe&trade.
      
    Requests through the Gateway now contain a CORS header. 

## Encoded slashes

* **apiml.service.allowEncodedSlashes**

    By default, the API Mediation Layer accepts encoded slashes in the URL path of the request. If you are onboarding applications which expose endpoints that expect encoded slashes you must keep the default configuration. We recommend that you change the property to `false` if you do not expect the applications to use the encoded slashes. 
    
    Use the following procedure to reject encoded slashes.
    
    **Follow these steps:**
        
    1. Open the file `<Zowe install directory>/components/api-mediation/bin/start.sh`.
    2. Find the line that contains the `-Dapiml.service.allowEncodedSlashes=true` parameter and set the value to `false`.
    3. Restart Zowe&trade. 
        
    Requests with encoded slashes are now rejected by the API Mediation Layer.


