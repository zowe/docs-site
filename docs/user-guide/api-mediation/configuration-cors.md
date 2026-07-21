# Customizing Cross-Origin Resource Sharing (CORS) 

:::info Required Role: system programmer
:::

You can enable the Gateway to terminate CORS requests for itself and also for routed services. By default, Cross-Origin Resource Sharing (CORS) handling is disabled for Gateway routes `gateway/api/v1/**` and for individual services. Once enabled, API Gateway endpoints handle CORS requests according to your global configuration, and individual services can delegate CORS handling to the Gateway using per-service [Custom Metadata](../../extend/extend-apiml/onboard-spring-boot-enabler.md#custom-metadata) CORS parameters. 

When CORS handling is disabled for a service, the Gateway does not follow or apply any CORS directives defined by that service. Instead, request handling relies entirely on the Gateway's global defaults, which are configured via settings in zowe.yaml.

## Gateway-Managed CORS Handling
When CORS handling is enabled for a service, the Gateway manages the CORS handshake on behalf of that service. As part of this process, the Gateway strips specific CORS handshake headers from the request before forwarding the incoming HTTP request upstream. This prevents these headers from interfering with the backend service or causing duplicate CORS processing.

When CORS handling is disabled, the Gateway passes all incoming headers—including CORS headers—directly through to the backend service without modification, leaving CORS processing entirely up to the downstream service or global defaults.

### Header Removal

When CORS handling is enabled, the Gateway removes the following two headers from the request before forwarding the request upstream:

* `Access-Control-Request-Method`
* `Access-Control-Request-Headers`

Because these headers are removed, the resulting request delivered to the backend service is no longer treated as a CORS request, meaning no additional CORS configuration is required on the service side itself.

:::tip
When CORS handling is enabled, you can override this default list of stripped headers by specifying a custom comma-separated list via the `components.gateway.apiml.service.ignoredHeadersWhenCorsEnabled` property in `zowe.yaml`.
:::

## Preflight Request Management

When CORS handling is enabled, the Gateway automatically answers preflight (`OPTIONS`) requests on behalf of the service, replying with the following default CORS headers:

- `Access-Control-Allow-Methods: GET,HEAD,POST,PATCH,DELETE,PUT,OPTIONS`
   This setting can be overridden globally using `components.gateway.apiml.service.corsDefaultAllowedMethods` in `zowe.yaml`. 
- `Access-Control-Allow-Headers: origin, x-requested-with`  
   This setting can be overridden globally using `components.gateway.apiml.service.corsDefaultAllowedHeaders` in `zowe.yaml`.
- `Access-Control-Allow-Credentials: true`

When CORS handling is disabled, the Gateway does not intercept preflight requests and forwards all `OPTIONS` requests directly to the backend service for handling.

## Global CORS Configuration Parameters
To customize how the Gateway handles origins and headers globally, configure the following properties in your zowe.yaml file:

* **corsDefaultAllowedOrigins**  
Specifies the allowed origins for CORS requests across the Gateway. This parameter does not default to a wildcard (`*`). Instead, to ensure full security, this parameter defaults strictly to the Gateway's own host and port. This parameter can be customized by adding alternative origins or explicitly setting `corsDefaultAllowedOrigins` to `*` if open access is required. Individual services can also override this value using the `customMetadata.apiml.corsAllowedOrigins` parameter.  
**Default:** `https://${hostname}:${port}`

* **corsDefaultAllowedHeaders**  
Defines which HTTP headers are accepted during a CORS request. By default, all headers are permitted, but this can be restricted to a specific comma-separated list of headers to match your enterprise security requirements.  
**Default:** `*`

## Per-Service Custom Metadata CORS Parameters
Service administrators can fine-tune CORS behavior on a per-service basis. During service registration, you can pass specific CORS configuration parameters via Custom Metadata. For more information, see [Customizing Metadata (optional)](../../extend/extend-apiml/custom-metadata.md). 

These parameters allow you to override global Gateway defaults for individual services:
* **apiml.corsAllowedOrigins**  
Specifies the allowed origins for the service.
* **apiml.corsAllowedHeaders**  
Restricts accepted HTTP headers for the service.
* **apiml.corsAllowCredentials**  
Configures credential sharing capabilities.
* **apiml.corsAllowedMethods**  
Sets the allowed HTTP methods for the service.

## Enabling CORS Handling

Use the following procedure to globally enable and configure CORS handling within the API Gateway.
     
1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.service.corsEnabled` and set the value to `true`.
3. (Optional) Add the global configuration properties to customize default origins, headers, or methods if the default values do not align with your environment:  
    ```yaml
    components:
      gateway:
        apiml:
          service:
            corsEnabled: true
            corsDefaultAllowedOrigins: "https://mytrusteddomain.com:7553"
            corsDefaultAllowedHeaders: "Authorization,Content-Type"
    ```

4. Restart the Zowe instance to apply the new configuration.
  
Requests routed through the API Gateway will successfully process and append the appropriate CORS headers based on your global and per-service metadata definitions. 