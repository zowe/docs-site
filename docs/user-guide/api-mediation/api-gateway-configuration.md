# Advanced Gateway features configuration

As a system programmer who wants to configure advanced Gateway features of the API Mediation Layer, you can customize Gateway parameters by modifying either of the following files:

- `<Zowe install directory>/components/gateway/bin/start-gateway.sh` 
- `<Zowe instance directory>/instance.env`

The parameters begin with the `-D` prefix, similar to all the other parameters in the file.

**Note:** Restart Zowe to apply changes to the parameter.

Follow the procedures in the following sections to customize Gateway parameters according to your preferences:

  * [Prefer IP Address for API Layer services](#prefer-ip-address-for-api-layer-services)
  * [SAF as an Authentication provider](#saf-as-an-authentication-provider)
  * [Gateway retry policy](#gateway-retry-policy)
  * [Gateway client certificate authentication](#gateway-client-certificate-authentication)
  * [Gateway timeouts](#gateway-timeouts)
  * [Cors handling](#cors-handling)
  * [Encoded slashes](#encoded-slashes)
  * [Connection limits](#connection-limits)
  * [API Mediation Layer as a standalone component](#api-mediation-layer-as-a-standalone-component)

## Prefer IP Address for API Layer services

API Mediation Layer services use the hostname when communicating with each other. This behavior can be changed so that the IP address is used instead.

**Follow these steps:**
     
1. Open the `<Zowe instance directory>/instance.env` configuration file.
2. Find the property `APIML_PREFER_IP_ADDRESS` and set the value to `true`.
3. Restart Zowe&trade.

**Note:** Changing the value of this property might introduce problems with certificates. Ensure that the IP Address is present on the certificate SAN name.

## SAF as an Authentication provider

By default, the API Gateway uses z/OSMF as an authentication provider. It is possible to switch to SAF as the authentication
provider instead of z/OSMF. The intended usage of SAF as an authentication provider is for systems without z/OSMF.
If SAF is used and the z/OSMF is available on the system, the created tokens are not accepted by z/OSMF. Use
the following procedure to switch to SAF. 

**Follow these steps:**
     
1. Open the `<Zowe instance directory>/instance.env` configuration file.
2. Find the property `APIML_SECURITY_AUTH_PROVIDER` and set the value to `saf`.
3. Restart Zowe&trade.

Authentication requests now utilize SAF as the authentication provider. API ML can run without z/OSMF present on the system. 

## Gateway retry policy

To change the Gateway retry policy, edit properties in the `<Zowe install directory>/components/gateway/bin/start.sh` file:

All requests are disabled as the default configuration for retry with one exception: the server retries `GET` requests that finish with status code `503`. 
To change this default configuration, include the following parameters:

* **ribbon.retryableStatusCodes**

    Provides a list of status codes, for which the server should retry the request.
    
    **Example:** `-Dribbon.retryableStatusCodes="503, 404"` 
    
* **ribbon.OkToRetryOnAllOperations**

     Specifies whether to retry all operations for this service. The default value is `false`. In this case, only `GET` requests are retried if they return a response code that is listed in `ribbon.retryableStatusCodes`. Setting this parameter to `true` enables retry requests for all methods which return a response code listed in `ribbon.retryableStatusCodes`. 
     
  **Note:** Enabling retry can impact server resources due to request body buffering.

* **ribbon.MaxAutoRetries**
    
    Specifies the number of times a failed request is retried on the same server. This number is multiplied with `ribbon.MaxAutoRetriesNextServer`. The default value is `0`.
    
* **ribbon.MaxAutoRetriesNextServer**
    
    Specifies the number of additional servers that attempt to make the request. This number excludes the first server. The default value is `5`. 
    
## Gateway client certificate authentication

**Note:**

Beginning with release 1.19 LTS, it is possible to authenticate using client certificates. The feature is functional and tested, but automated testing on various security systems is not complete. As such, the feature is provided as a beta release for early preview. If you would like to offer feedback using client certificate authentication, please create an issue against the api-layer repository. Client Certificate authentication will move out of Beta once test automation is fully implemented across different security systems.


Use the following procedure to enable the feature of using a client certificate as a method of authentication for the API Mediation Layer Gateway.

**Follow these steps:**

1. Open the `<Zowe instance directory>/instance.env` configuration file.
2. Configure the following properties:

   * **APIML_SECURITY_X509_ENABLED**

     This property is the global feature toggle. Set the value to `true` to enable client certificate functionality.

   * **APIML_SECURITY_ZOSMF_APPLID**

     When z/OSMF is used as an authentication provider, provide a valid `APPLID` to allow for client certificate authentication. The API ML generates a passticket for the specified `APPLID` and subsequently uses this passticket to authenticate to z/OSMF. The default value in the installation of z/OSMF is `IZUDFLT`.
  
**Note:** The following steps are only required if the ZSS hostname or default Zowe user name are altered:

3. Open the file `<Zowe install directory>/components/gateway/bin/start.sh`.
4. Configure the following properties:

   * **apiml.security.x509.externalMapperUrl**

     The API Mediation Gateway uses an external API to map a certificate to the owner in SAF. This property informs the Gateway about the location of this API. ZSS is the API provider in Zowe. Provide the ZSS URL in the following format:
     ```
     -Dapiml.security.x509.externalMapperUrl=http://localhost:<ZSS-PORT>/certificate/x509/map
     ```
     The default port is `8542`. The hostname is `localhost` as the ZSS server is accessible only locally.

   * **apiml.security.x509.externalMapperUser**

     To authenticate to the mapping API, a JWT token is sent with the request. The token represents the user that is configured with this property. The user authorization is required to use the `IRR.RUSERMAP` resource within the `FACILITY` class. The default value is `ZWESVUSR`. Permissions are set up during installation with the `ZWESECUR` JCL or workflow. 
     
     To customize the `ZWESECUR` JCL or workflow (`// SET ZOWEUSER=ZWESVUSR * userid for Zowe started task`), change the `apiml.security.x509.externalMapperUser` to a new value.

Restart Zowe&trade.

## Gateway timeouts

Use the following procedure to change the global timeout value for the API Mediation Layer instance.

**Follow these steps:**

1. Open the file `<Zowe instance directory>/instance.env`.
2. Find the property `APIML_GATEWAY_TIMEOUT_MILLIS`, and set the value to the desired value.
3. Restart Zowe&trade. 

If you require finer control, you can edit the `<Zowe install directory>/components/gateway/bin/start.sh`, and modify the following properties:

* **apiml.gateway.timeoutMillis**

  This property defines the global value for http/ws client timeout.
  
Add the following properties to the file for the API Gateway:

  **Note:** Ribbon configures the client that connects to the routed services.

* **ribbon.connectTimeout**
    
  Specifies the value in milliseconds which corresponds to the period in which API ML should establish a single, non-managed connection with the service. If omitted, the default value specified in the API ML Gateway service configuration is used.

* **ribbon.readTimeout**
    
  Specifies the time in milliseconds of inactivity between two packets in response from this service to API ML. If omitted, the default value specified in the API ML Gateway service configuration is used.

* **ribbon.connectionManagerTimeout**
    
  The HttpClient employs a special entity to manage access to HTTP connections called by the HTTP connection manager. The purpose of an HTTP connection manager is to serve as a factory for new HTTP connections, to manage the life cycle of persistent connections, and to synchronize access to persistent connections. Internally, the connections that are managed serve as proxies for real connections. `ConnectionManagerTimeout` specifies a period during which managed connections with API ML should be established. The value is in milliseconds. If omitted, the default value specified in the API ML Gateway service configuration is used.
    
## CORS handling

By default, Cross-Origin Resource Sharing (CORS) is disabled in the API Gateway for the Gateway routes `api/v1/gateway/**`. To enable CORS at the service level, it is necessary to enable CORS in the Gateway. Use the following procedure to enable CORS.
        
**Follow these steps:**
     
1. Open the file `<Zowe instance directory>/instance.env`.
2. Find the property `APIML_CORS_ENABLED` and set the value to `true`.
3. Restart Zowe&trade.
  
Requests through the Gateway now contain a CORS header. 

## Encoded slashes

By default, the API Mediation Layer accepts encoded slashes in the URL path of the request. If you are onboarding applications which expose endpoints that expect encoded slashes, it is necessary to keep the default configuration. We recommend that you change the property to `false` if you do not expect the applications to use the encoded slashes. 
    
Use the following procedure to reject encoded slashes.

**Follow these steps:**
    
1. Open the file `<Zowe instance directory>/instance.env`.
2. Find the property `APIML_ALLOW_ENCODED_SLASHES` and set the value to `false`.
3. Restart Zowe&trade. 
    
Requests with encoded slashes are now rejected by the API Mediation Layer.

## Connection limits

By default, the API Gateway accepts up to 100 conncurrent connections per route, and 1000 total concurrent connections. Any further concurrent requests are queued until the completion of an existing request. The API Gateway is built on top of Apache HTTP components that require these two connection limits for concurrent requests. For more information, see [Apache documentation](http://hc.apache.org/httpcomponents-client-ga/tutorial/html/connmgmt.html#d5e393).

Use the following procedure to change the number of concurrent connections.

**Follow these steps:**

1. Open the file `<Zowe instance directory>/instance.env`.
2. Find the property `APIML_MAX_CONNECTIONS_PER_ROUTE` and set the value to an appropriate positive integer.
3. Find the property `APIML_MAX_TOTAL_CONNECTIONS` and set the value to an appropriate positive integer.

# API Mediation Layer as a standalone component

As a Zowe user, follow the procedure in this article to start the API Mediation Layer independently of other Zowe components. 
By default, the Gateway, Zowe System Services, and Virtual Desktop start when
 Zowe runs. To limit consumed resources when the Virtual Desktop or Zowe System
 Services are not required, it is possible to specify which components start in the
 context of Zowe. No change is required during the installation process to
 support this setup.

Once Zowe is installed, use the following procedure to limit which components start.

**Follow these steps:**

1. Open the file `<Zowe instance directory>/instance.env`.
2. Find the property `ZWE_LAUNCH_COMPONENTS` and set `discovery,gateway,api-catalog`
3. Restart Zowe&trade.   

To learn more about the related section of the environment file, see [Creating and configuring the Zowe instance directory](../configure-instance-directory.md#component-groups). We recommend you open this page in a new tab.
