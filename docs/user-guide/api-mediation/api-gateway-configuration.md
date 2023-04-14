# Advanced Gateway features configuration

As a system programmer who wants to configure advanced Gateway features of the API Mediation Layer, you can customize Gateway parameters by modifying the `zowe.yaml` file.

**Note:** Restart Zowe to apply changes to the parameter.

Follow the procedures in the following sections to customize Gateway parameters according to your preferences:

  * [Runtime configuration](#runtime-configuration)
  * [SAF as an Authentication provider](#saf-as-an-authentication-provider)
  * [Enable JWT token refresh endpoint](#enable-jwt-token-refresh-endpoint)
  * [Enabling PassTicket support](#enabling-passticket-support)
  * [Gateway retry policy](#gateway-retry-policy)
  * [Gateway client certificate authentication](#gateway-client-certificate-authentication)
  * [Gateway timeouts](#gateway-timeouts)
  * [CORS handling](#cors-handling)
  * [Encoded slashes](#encoded-slashes)
  * [Add a custom HTTP Auth header to store Zowe JWT token](#add-a-custom-http-auth-header-to-store-zowe-jwt-token)
  * [Add custom HTTP Auth headers to store user ID and PassTicket](#add-custom-http-auth-headers-to-store-user-id-and-passticket)
  * [Connection limits](#connection-limits)
  * [Routed instance header](#routed-instance-header)
  * [Distributed load balancer cache](#distributed-load-balancer-cache)
  * [Personal Access Token](#personal-access-token)
  * [API Mediation Layer as a standalone component](#api-mediation-layer-as-a-standalone-component)
  * [SAF resource checking](#saf-resource-checking)
  * [AT-TLS](#at-tls)
  * [Unique cookiename for multiple zowe instances](#unique-cookie-name-for-multiple-zowe-instances)

## Runtime configuration

This section describes runtime configuration properties.

**Follow these steps:**

1. Open the file `zowe.yaml`.
2. Configure the following properties:

   * **apiml.service.hostname**

     This property is used to set the API Gateway hostname. The value can be set by defining the `ZWE_haInstance_hostname` property in the `zowe.yaml` file.

   * **apiml.service.port**

     This property is used to set the API Gateway port. The value can be set by defining the `ZWE_configs_port` property in the `zowe.yaml` file.

   * **apiml.service.discoveryServiceUrls**

     This property specifies the Discovery Service URL used by the service to register to Eureka. The value can be set by defining the `ZWE_DISCOVERY_SERVICES_LIST` property in the `zowe.yaml` file.
    
   * **components.gateway.apiml.security.ssl.verifySslCertificatesOfServices**

     This parameter makes it possible to prevent server certificate validation.

     **Important!** Ensure that this parameter is set to `true` in production environments.
     Setting this parameter to `false` in production environments significantly degrades the overall security of the system.

   * **components.gateway.apiml.security.auth.zosmf.ServiceId**

     This parameter specifies the z/OSMF service id used as authentication provider. The service id is defined in the static definition of z/OSMF. The default value is `zosmf`.

   * **ZWE_configs_debug**

     This property can be used to unconditionally add active debug profiles. For more information, see the [Spring documentation](https://docs.spring.io/spring-boot/docs/1.2.0.M1/reference/html/boot-features-profiles.html#boot-features-adding-active-profiles).
   
   * **ZWE_configs_sslDebug**

     This property can be used to enable the SSL debugging. This property can also assist with determining what exactly is happening at the SSL layer.
     This property uses the `-Djavax.net.debug` Java parameter when starting the Gateway component. By setting `ZWE_configs_sslDebug` to `ssl`, all the SSL debugging
     is turned on. The `ZWE_configs_sslDebug` parameter also accepts other values that enables a different level of tracing. For more information, see the [IBM documentation](https://www.ibm.com/docs/en/sdk-java-technology/8?topic=troubleshooting-debugging-utilities).
     
     **Note:** This property can also be enabled for other API ML components.

   * **ZWE_configs_server_maxTotalConnections and ZWE_configs_server_maxConnectionsPerRoute**

     These two properties are used to set the number of concurrent connections. Further connection requests that put the number of connections over either of these limits are queued until an existing connection completes. The API Gateway is built on top of Apache HTTP components that require these two connection limits for concurrent requests.

3. Restart Zowe&trade.

## SAF as an Authentication provider

By default, the API Gateway uses z/OSMF as an authentication provider. It is possible to switch to SAF as the authentication
provider instead of z/OSMF. The intended usage of SAF as an authentication provider is for systems without z/OSMF.
If SAF is used and the z/OSMF is available on the system, the created tokens are not accepted by z/OSMF. Use
the following procedure to switch to SAF. 

**Follow these steps:**
     
1. Open the `zowe.yaml` configuration file.
2. Find or add the property `components.gateway.apiml.security.auth.provider` and set the value to `saf`.
3. Restart Zowe&trade.

Authentication requests now utilize SAF as the authentication provider. API ML can run without z/OSMF present on the system. 

## Enable JWT token refresh endpoint

Enable the `/gateway/api/v1/auth/refresh` endpoint to exchange a valid JWT token for a new token with a new expiration date. Call the endpoint with a valid JWT token and trusted client certificate. In case of z/OSMF authentication provider, enable API Mediation Layer for passticket generation and configure z/OSMF APPLID. [Configure Passtickets](../../extend/extend-apiml/api-mediation-passtickets.md)

**Follow these steps:**

1. Open the file `zowe.yaml`.
3. Configure the following properties:

    * **components.gateway.apiml.security.allowtokenrefresh: true**

      Add this property to enable the refresh endpoint.

    * **components.gateway.apiml.security.zosmf.applid**

      If you use z/OSMF as an authentication provider, provide a valid `APPLID`. The API ML generates a passticket for the specified `APPLID` and subsequently uses this passticket to authenticate to z/OSMF. The default value in the installation of z/OSMF is `IZUDFLT`.

3. Restart Zowe.

## Enabling PassTicket support

The following steps outline the procedure for enabling PassTicket Support:

1. Follow the [API service documentation](../../extend/extend-apiml/authentication-for-apiml-services.md#authentication-with-passtickets) that explains how to activate support for PassTickets.
    - The PassTickets for the API service must have the replay protection switched off. The PassTickets are exchanged between Zowe API Gateway and the API Service in a secure mainframe environment.
2. Record the value of the APPLID of the API service.
3. Enable the Zowe started task user ID to generate PassTickets for the API service. For more information, see [PassTicket Security Configuration](../../extend/extend-apiml/api-mediation-passtickets.md). 
4. Enable PassTicket support in the API Gateway for your API service.

**Note:**
PassTickets must be enabled for every user who requires access to the API service.

## Gateway retry policy

Use the following procedure to change the Gateway retry policy.

All requests are disabled as the default configuration for retry with one exception: the server retries `GET` requests that finish with status code `503`.

**Follow these steps:**

1. Open the `zowe.yaml` configuration file.
2. Configure the following properties:

* **components.gateway.ribbon.retryableStatusCodes**

    Provides a list of status codes, for which the server should retry the request.
    
    **Example:** `components.gateway.ribbon.retryableStatusCodes: "503, 404"` 
    
* **components.gateway.ribbon.OkToRetryOnAllOperations**

    Specifies whether to retry all operations for this service. The default value is `false`. In this case, only `GET` requests are retried if they return a response code that is listed in `ribbon.retryableStatusCodes`. Setting this parameter to `true` enables retry requests for all methods which return a response code listed in `ribbon.retryableStatusCodes`. 
     
  **Note:** Enabling retry can impact server resources due to request body buffering.

* **components.gateway.ribbon.MaxAutoRetries**
    
    Specifies the number of times a failed request is retried on the same server. This number is multiplied with `ribbon.MaxAutoRetriesNextServer`. The default value is `0`.
    
* **components.gateway.ribbon.MaxAutoRetriesNextServer**
    
    Specifies the number of additional servers that attempt to make the request. This number excludes the first server. The default value is `5`. 

3. Restart `Zowe&trade`.

## Gateway client certificate authentication

Use the following procedure to enable the feature to use a client certificate as the method of authentication for the API Mediation Layer Gateway.

**Follow these steps:**

1. Open the `zowe.yaml` configuration file.
2. Configure the following properties:

   * **components.gateway.apiml.security.x509.enabled**

     This property is the global feature toggle. Set the value to `true` to enable client certificate functionality.

   * **components.gateway.apiml.security.zosmf.applid**

     When z/OSMF is used as an authentication provider, provide a valid `APPLID` to allow for client certificate authentication. The API ML generates a passticket for the specified `APPLID` and subsequently uses this passticket to authenticate to z/OSMF. The default value in the installation of z/OSMF is `IZUDFLT`.
  
    **Note:** The following steps are only required if the ZSS hostname or default Zowe user name are altered:

3. Change the following property if user mapping is provided by an external API:

   * **components.gateway.apiml.security.x509.externalMapperUrl**

   **Note:** Skip this step if user mapping is not provided by an external API.

   The API Mediation Gateway uses an external API to map a certificate to the owner in SAF. This property informs the Gateway about the location of this API. ZSS is the default API provider in Zowe. You can provide your own API to perform the mapping. In this case, it is necessary to customize this value.

   The following URL is the default value for Zowe and ZSS:

     ```
     https://${ZWE_haInstance_hostname}:${GATEWAY_PORT}/zss/api/v1/certificate/x509/map
     ```

4. Add the following property if the Zowe runtime userId is altered from the default `ZWESVUSR`:

   * **components.gateway.apiml.security.x509.externalMapperUser**

   **Note:** Skip this step if the Zowe runtime userId is not altered from the default `ZWESVUSR`.

   To authenticate to the mapping API, a JWT is sent with the request. The token represents the user that is configured with this property. The user authorization is required to use the `IRR.RUSERMAP` resource within the `FACILITY` class. The default value is `ZWESVUSR`. Permissions are set up during installation with the `ZWESECUR` JCL or workflow.

   If you customized the `ZWESECUR` JCL or workflow (the customization of zowe runtime user: `// SET ZOWEUSER=ZWESVUSR * userid for Zowe started task`) and changed the default USERID, create the `components.gateway.apiml.security.x509.externalMapperUser` property and set the value by adding a new line as in the following example:

   **Example:**

   ```
   components.gateway.apiml.security.x509.externalMapperUser: yournewuserid  
   ```

5. Restart `Zowe&trade`.

## Gateway timeouts

Use the following procedure to change the global timeout value for the API Mediation Layer instance.

**Follow these steps:**

1. Open the file `zowe.yaml`.
2. Configure the following properties:

   * **components.gateway.apiml.gateway.timeoutmillis**

     This property defines the global value for http/ws client timeout.
  

   **Note:** Ribbon configures the client that connects to the routed services.

  * **components.gateway.ribbon.connectTimeout**
    
  Specifies the value in milliseconds which corresponds to the period in which API ML should establish a single, non-managed connection with the service. If omitted, the default value specified in the API ML Gateway service configuration is used.

  * **components.gateway.ribbon.readTimeout**
    
    Specifies the time in milliseconds of inactivity between two packets in response from this service to API ML. If omitted, the default value specified in the API ML Gateway service configuration is used.

  * **components.gateway.ribbon.connectionManagerTimeout**
    
    The HttpClient employs a special entity to manage access to HTTP connections called by the HTTP connection manager. The purpose of an HTTP connection manager is to serve as a factory for new HTTP connections, to manage the life cycle of persistent connections, and to synchronize access to persistent connections. Internally, the connections that are managed serve as proxies for real connections. `ConnectionManagerTimeout` specifies a period during which managed connections with API ML should be established. The value is in milliseconds. If omitted, the default value specified in the API ML Gateway service configuration is used.

3. Restart `Zowe&trade`.

## CORS handling

You can enable the Gateway to terminate CORS requests for itself and also for routed services. By default, Cross-Origin Resource Sharing (CORS) handling is disabled for Gateway routes `gateway/api/v1/**` and for individual services. After enabling the feature as stated in the prodecure below, API Gateway endpoints start handling CORS requests and individual services can control whether they want the Gateway to handle CORS for them through the [Custom Metadata](../../extend/extend-apiml/custom-metadata.md) parameters.

When the Gateway handles CORS on behalf of the service, it sanitizes defined headers from the communication (upstream and downstream). `Access-Control-Request-Method,Access-Control-Request-Headers,Access-Control-Allow-Origin,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Access-Control-Allow-Credentials,Origin` The resulting request to the service is not a CORS request and the service does not need to do anything extra. The list can be overridden by specifying different comma-separated list in the property `components.gateway.apiml.service.ignoredHeadersWhenCorsEnabled` in `zowe.yaml`

Additionally, the Gateway handles the preflight requests on behalf of the service when CORS is enabled in [Custom Metadata](../../extend/extend-apiml/custom-metadata.md), replying with CORS headers:
- `Access-Control-Allow-Methods: GET,HEAD,POST,DELETE,PUT,OPTIONS`
- `Access-Control-Allow-Headers: origin, x-requested-with`
- `Access-Control-Allow-Credentials: true`
- `Access-Control-Allow-Origin: *` 

Alternatively, list the origins as configured by the service, associated with the value **customMetadata.apiml.corsAllowedOrigins** in [Custom Metadata](../../extend/extend-apiml/custom-metadata.md).

If CORS is enabled for Gateway routes but not in [Custom Metadata](../../extend/extend-apiml/custom-metadata.md), the Gateway does not set any of the previously listed CORS headers. As such, the Gateway rejects any CORS requests with an origin header for the Gateway routes.

Use the following procedure to enable CORS handling.

**Follow these steps:**
     
1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.service.corsEnabled` and set the value to `true`.
3. Restart `Zowe&trade`.
  
Requests through the Gateway now contain a CORS header. 

## Encoded slashes

By default, the API Mediation Layer accepts encoded slashes in the URL path of the request. If you are onboarding applications which expose endpoints that expect encoded slashes, it is necessary to keep the default configuration. We recommend that you change the property to `false` if you do not expect the applications to use the encoded slashes. 
    
Use the following procedure to reject encoded slashes.

**Follow these steps:**
    
1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.service.allowEncodedSlashes` and set the value to `false`.
3. Restart `Zowe&trade`. 
    
Requests with encoded slashes are now rejected by the API Mediation Layer.

## Add a custom HTTP Auth header to store Zowe JWT token

If a southbound service needs to consume the Zowe JWT token from a HTTP request header to participate in the Zowe SSO, you can define a custom HTTP header name as part of the Gateway configuration.
The southbound service must use the `zoweJwt` scheme in order to leverage this functionality. Once the HTTP header name is defined, each request to the southbound service contains the JWT token in the custom header.

Use the following procedure to add the custom HTTP header.

**Follow these steps:**

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.security.auth.jwt.customAuthHeader` and set the value which represents the header's name.
3. Restart `Zowe&trade`.

Requests through the Gateway towards the southbound service now contain the custom HTTP header with the JWT token.

## Add custom HTTP Auth headers to store user ID and PassTicket

If a southbound service needs to consume the passticket and the user ID from custom headers to participate in the Zowe SSO, you can define the custom HTTP headers names as part of the Gateway configuration.
The southbound service must use the `httpBasicPassTicket` scheme in order to leverage this functionality. Once the HTTP headers names are defined, each request to the southbound service contains the passticket and the user ID in the custom headers.

Use the following procedure to add the custom HTTP headers.

**Follow these steps:**

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.security.auth.passticket.customAuthHeader` and set the value which represents the header's name.
3. Find or add the property `components.gateway.apiml.security.auth.passticket.customUserHeader` and set the value which represents the header's name.
4. Restart `Zowe&trade`.

Requests through the Gateway towards the southbound service now contain the custom HTTP headers with the passticket and the user ID.

## Connection limits

By default, the API Gateway accepts up to 100 concurrent connections per route, and 1000 total concurrent connections. Any further concurrent requests are queued until the completion of an existing request. The API Gateway is built on top of Apache HTTP components that require these two connection limits for concurrent requests. 

Use the following procedure to change the number of concurrent connections.

**Follow these steps:**

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.server.maxConnectionsPerRoute` and set the value to an appropriate positive integer.
3. Find or add the property `components.gateway.server.maxTotalConnections` and set the value to an appropriate positive integer.

## Routed instance header

The API Gateway can output a special header that contains the value of the instance ID of the API service that the request has been routed to. This is useful for understanding which service instance is being called.

The header name is `X-InstanceId`, and the sample value is `discoverable-client:discoverableclient:10012`. This is identical to `instanceId` property in the registration of the Discovery service.

Use the following procedure to output a special header that contains the value of the instance ID of the API service.

**Follow these steps:**

1. Open the file `zowe.yaml`.
2. Find or add the property with value `components.gateway.apiml.routing.instanceIdHeader:true`.
3. Restart Zowe.

## Distributed load balancer cache

You can choose to distribute the load balancer cache between instances of the API Gateway. To distribute the load balancer cache, it is necessary that the caching service is running. Gateway service instances are reuqired to have the same DN (Distinguished name) on the server certificate.

Use the following procedure to distribute the load balancer cache between instances of the API Gateway.

**Follow these steps:**

1. Open the file `zowe.yaml`.
2. Find or add the property with value `components.gateway.apiml.loadBalancer.distribute: true`.
3. Restart Zowe.

## Replace or remove the Catalog with another service

By default, the API Mediation Layer contains API Catalog as a service showing available services. As the API Mediation Layer can be successfully run without this component it is possible to replace or remove the service from the Gateway home page and health checks. The following section describes the behavior of the Gateway home page and health checks. 

The default option displays the API Catalog.

A value can also be applied to `components.gateway.apiml.catalog.serviceId`.

**Examples:**

- **`none`**

  Nothing is displayed on the Gateway home page and the Catalog is removed from `/application/health`

- **`alternative-catalog`** 

  An alternative to the API Catalog is displayed

- **`metrics-dashboard`**
 
  A possible dashboard that could appear in place of the API Catalog 

**Notes:**

- If the application contains the `homePageUrl` and `statusPageRelativeUrl`, then the full set of information is displayed.
- If the application contains the `homePageUrl` the link is displayed without the `UP` information.
- If the application contains the `statusPageRelativeUrl` then `UP` or `DOWN` is displayed based on the `statusPage` without the link.

Use the following procedure to change or replace the Catalog service.

**Follow these steps:**

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.catalog.serviceId`. Set the value with the following options:

    - Set the value to `none` to remove the Catalog service.
    - Set the value to the ID of the service that is onboarded to the API Mediation Layer. 

## Personal Access Token

By default the API Mediation Layer does not provide the ability to use personal access tokens. For more information about about
this functionality, see [Personal Access Tokens](api-mediation-personal-access-token.md).

Use the following procedure to enable personal access tokens.

**Follow these steps:**

1. Open the file `zowe.yaml`.
2. Find or add the property with the value `components.gateway.apiml.security.personalAccessToken.enabled: true`.
3. Restart Zowe.

## SAF Resource Checking

The API ML can check for the authorization of the user on certain endpoints. Access to a SAF resource is checked with ESM.

Verification of the SAF resource is provided by the following three providers:

- **`endpoint`**

  This is the highest priority provider, such as a REST endpoint call (ZSS or similar one). This option is disabled by default. In Zowe, ZSS has the API to check for SAF   resource authorization.
  
- **`native`**

  The Native JZOS classes from Java are used to determine SAF resource access. This is the default provider.
  
- **`dummy`**

  This is the lowest priority provider. This is the dummy implementation and is defined in a file.

**Note:** Verification of the SAF resource uses the first available provider based on the specified priority. The default configuration resolves to the native provider. 

You can select a specific provider by specifying the `components.gateway.apiml.security.authorization.provider` key in the `zowe.yaml` file. Use the parameter value to
strictly define a provider. If verification is disabled, select the `endpoint` option. 

**Follow these steps:**

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.security.authorization.provider` and set desired value.
3. Restart `Zowe&trade`.

**Examples:**
```
components.gateway.apiml.security.authorization.endpoint.url: endpoint
```
**Note:** To configure the `endpoint` provider, add the following additional property:
`components.gateway.apiml.security.authorization.endpoint.enabled: true`
```
components.gateway.apiml.security.authorization.provider: native
```
```
components.gateway.apiml.security.authorization.provider: dummy
```

To use the endpoint provider, customize the URL corresponding to the SAF resource authorization. By default, the ZSS API is configured and used. 

**Follow these steps:**

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.security.authorization.endpoint.url` and set desired value.
   The default value for ZSS API is `https://${ZWE_haInstance_hostname}:${GATEWAY_PORT}/zss/api/v1/saf-auth`
3. Restart `Zowe&trade`.

For more information about the SAF resource checking providers, see [SAF Resource Checking Providers](api-mediation-saf-resource-checking.md).

## AT-TLS

The communication server on z/OS provides a functionality to encrypt HTTP communication for on-platform running jobs. This functionality is refered to as Application Transparent Transport Layer Security (AT-TLS). Starting with Zowe version 1.24, it is possible to leverage AT-TLS within the API Mediation Layer. Each API ML component can run with AT-TLS rules applied. Some components, such as the Discovery service, can be made AT-TLS aware by enabling the AT-TLS profile, whereby TLS information can be utilized. Such information could be a client certificate. To enable the AT-TLS profile and disable the TLS application in API ML, update `zowe.yaml` with following values under the respective component in the `components` section:
```
components.*.spring.profiles.active=attls
components.*.server.ssl.enabled=false
components.*.server.internal.ssl.enabled=false
```
While API ML can not handle TLS on its own, the Mediation Layer needs information about the server certificate that is defined in the AT-TLS rule. Update the `zowe.yaml` file for each respective APIML component in the `components` sections with the path to the SAF Key ring from the AT-TLS rule and specify the alias that is used for Inbound communication:
```
components.*.certificate.keystore.file=<SAF-key-ring-from-AT-TLS-rule>
components.*.certificate.keystore.type=JCERACFKS
components.*.certificate.keystore.password=<keyring-password>
components.*.certificate.keystore.alias=<certificate-alias-from-AT-TLS-rule>
```
**Note:** This procedure does not configure AT-TLS on z/OS, but rather enables API ML to work with AT-TLS in place.

## Unique cookie name for multiple zowe instances

By default, in the API Gateway, the cookie name is `apimlAuthenticationToken`.
To prevent overwriting of the default cookie name in the case of multiple Zowe instances, a unique cookie name can be configured for each instance.  

Follow this procedure to configure a unique cookie name for the instances:

1. Open the `zowe.yaml` configuration file.
2. Find or add the property  `components.gateway.security.auth.uniqueCookie`, and set it to `true`. A unique cookie name is generated as `apimlAuthenticationToken.cookieIdentifier`.

    **Example:**  
    If this parameter is set to `true`, and the cookieIdentifier is `1`, the name of the cookie transforms to `apimlAuthenticationToken.1`.  
    If this property is not set to `true`, the cookie name remains `apimlAuthenticationToken` by default.
3. Restart `zowe`.
