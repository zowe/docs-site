# Advanced Gateway features configuration

As a system programmer who wants to configure advanced Gateway features of the API Mediation Layer, you can customize Gateway parameters by modifying either of the following files:

- `<Zowe runtime directory>/components/gateway/bin/start-gateway.sh` 
- `<Zowe runtime directory>/components/gateway/manifest.yaml`
- `zowe.yaml`

The parameters begin with the `-D` prefix, similar to all the other parameters in the file.

**Note:** Restart Zowe to apply changes to the parameter.

Follow the procedures in the following sections to customize Gateway parameters according to your preferences:

  * [Prefer IP Address for API Layer services](#prefer-ip-address-for-api-layer-services)
  * [SAF as an Authentication provider](#saf-as-an-authentication-provider)
  * [Enable JWT token refresh endpoint](#enable-jwt-token-refresh-endpoint)
  * [Change password with SAF provider](#change-password-with-saf-provider)
  * [Gateway retry policy](#gateway-retry-policy)
  * [Gateway client certificate authentication](#gateway-client-certificate-authentication)
  * [Gateway timeouts](#gateway-timeouts)
  * [CORS handling](#cors-handling)
  * [Encoded slashes](#encoded-slashes)
  * [Connection limits](#connection-limits)
  * [Routed instance header](#routed-instance-header)
  * [Distributed load balancer cache](#distributed-load-balancer-cache)
  * [Replace or remove catalog with another service](#replace-or-remove-catalog-with-another-service)
  * [API Mediation Layer as a standalone component](#api-mediation-layer-as-a-standalone-component)
  * [SAF resource checking](#saf-resource-checking)

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

### Change password with SAF provider

Update the user password using the SAF Authentication provider. To use this functionality, add the parameter `newPassword` on the login endpoint `/gateway/api/v1/auth/login`. The Gateway service returns a valid JWT with the response code `204` as a result of successful password change. The user is then authenticated and can consume APIs through the Gateway. If it is not possible to change the password for any reason, the response code is `401`.

This feature is also available in the API Catalog.

This feature is also available in the API Catalog.

Use a `POST` REST call against the URL `/gateway/api/v1/auth/login`:

 ```
 {
 "username" : "<username>",
 "password" : "<password>",
 "newPassword" : "<newPassword>"
}
```

**Note:**
It is a common practice to set the limit for changing the password in the ESM. This value is set by the parameter `MINCHANGE` for `PASSWORD`. The password can be changed once. Subsequently, it is necessary to wait the specified time period before changing the password again.

**Example:**

`MINCHANGE=120`

where:

* **`120`**

  Specifies the number of days before the password can be reset

### Change password with z/OSMF provider

Update the user password using the z/OSMF Authentication provider. To use this functionality, add the parameter `newPassword` on the login endpoint `/gateway/api/v1/auth/login`. The Gateway service returns a valid JWT with the response code `204` as a result of successful password change. The user is then authenticated and can consume APIs through the Gateway. If it is not possible to change the password for any reason, the response code is `401`.

This feature is also available in the API Catalog.

Use a `POST` REST call against the URL `/gateway/api/v1/auth/login`:

 ```
 {
 "username" : "<username>",
 "password" : "<password>",
 "newPassword" : "<newPassword>"
}
```

**Note:**
In order to use the password change functionality via z/OSMF, it is necessary to install the PTF for APAR PH34912.

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
2. Find or add the property `components.gateway.apiml.gateway.timeoutmillis`, and set the value to the desired value.
3. Restart `Zowe&trade`. 

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

## Connection limits

By default, the API Gateway accepts up to 100 concurrent connections per route, and 1000 total concurrent connections. Any further concurrent requests are queued until the completion of an existing request. The API Gateway is built on top of Apache HTTP components that require these two connection limits for concurrent requests. For more information, see [Apache documentation](http://hc.apache.org/httpcomponents-client-ga/tutorial/html/connmgmt.html#d5e393).

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

## API Mediation Layer as a standalone component

You can start the API Mediation Layer independently of other Zowe components. 
By default, the Gateway, Zowe System Services, and Virtual Desktop start when
 Zowe runs. To limit consumed resources when the Virtual Desktop or Zowe System
 Services are not required, it is possible to specify which components start in the
 context of Zowe. No change is required during the installation process to
 support this setup.

Once Zowe is installed, use the following procedure to limit which components start.

**Follow these steps:**

1. Open the file `zowe.yaml`.
2. Find or add the property `components.*.enabled` and set this property to `false` for all components that should not be started.
3. Restart `Zowe&trade`.   

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

### Checking providers

#### REST endpoint call

The REST provider calls the external API to retrieve information about access rights. To enable the feature outside of the mainframe, such as when running in Docker, you can use a REST endpoint call using the `GET` method:

- Method: `GET`
- URL: `{base path}/{userId}/{class}/{entity}/{level}`
- Response:
```json5
    {
        "authorized": "{true|false}",
        "error": "{true|false}",
        "message": "{message}"
    }
```
**Note:** For more information about this REST endpoint call, see [ZSS implementation](https://github.com/zowe/zss/blob/master/c/authService.c).

#### Native

The Native provider is the easiest approach to use the SAF resource checking feature on the mainframe.

Enable this provider when classes `com.ibm.os390.security.PlatformAccessControl` and `com.ibm.os390.security.PlatformReturned`
are available on the classpath. This approach uses the following method described in the IBM documentation: [method](https://www.ibm.com/support/knowledgecenter/SSYKE2_8.0.0/com.ibm.java.zsecurity.api.80.doc/com.ibm.os390.security/com/ibm/os390/security/PlatformAccessControl.html?view=kc#checkPermission-java.lang.String-java.lang.String-java.lang.String-int-).

**Note:** Ensure that the version of Java on your system has the same version of classes and method signatures.

#### Dummy implementation

The Dummy provider is for testing purpose outside of the mainframe.

Create the file `saf.yml` and locate it in the folder, where is application running or create file `mock-saf.yml` in the
test module (root folder). The highest priority is to read the file outside of the JAR. A file (inner or outside) has to exist.

The following YAML presents the structure of the file:

```yaml
  safAccess:
    {CLASS}:
      {RESOURCE}:
        - {UserID}
```

**Notes**:
- Classes and resources are mapped into a map, user IDs into a list.
- The load method does not support formatting with dots, such as shown in the following example:
  **Example:** {CLASS}.{RESOURCE}
  Ensure that each element is separated.
- The field `safAccess` is not required to define an empty file without a definition.
- Classes and resources cannot be defined without the user ID list.
- When a user has multiple definitions of the same class and resource, only the most privileged access level loads.
