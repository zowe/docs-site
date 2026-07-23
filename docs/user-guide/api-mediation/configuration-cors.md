# Customizing Cross-Origin Resource Sharing (CORS) 

:::info Required Role: system programmer
:::

You can enable the Gateway to terminate CORS requests for itself and also for routed services. By default, Cross-Origin Resource Sharing (CORS) handling is disabled for Gateway routes `gateway/api/v1/**` and for individual services. Once enabled, API Gateway endpoints handle CORS requests according to your global configuration, and individual services can delegate CORS handling to the Gateway using per-service [Custom Metadata](../../extend/extend-apiml/onboard-spring-boot-enabler.md#custom-metadata) CORS parameters. 

## How the Gateway Resolves CORS

CORS is resolved entirely by the Gateway. Backend services do not see CORS requests. As such, no additional CORS configuration is required on the service side itself.

### Preflight Requests (OPTIONS)

Before sending an actual request, browsers typically send a preflight (`OPTIONS`) request. The Gateway automatically intercepts and answers these preflight requests on behalf of the downstream services. These preflight requests are never sent to the service. Instead, the Gateway independently resolves these requests and sets all appropriate CORS response headers (such as `Access-Control-Allow-*`) based on the Gateway configuration.

### HTTP Requests and Header Removal

When the HTTP request arrives, the Gateway strips the CORS-specific request headers before forwarding the request upstream to the service. The stripped headers include:

* `Origin`
* `Access-Control-Request-Method`
* `Access-Control-Request-Headers`

Because these request headers are removed, the downstream service always receives a standard, non-CORS request. It is not expected that the downstream service will set any CORS response headers.

:::tip
You can override the default list of stripped headers by specifying a custom comma-separated list via the `components.gateway.apiml.service.ignoredHeadersWhenCorsEnabled` property in `zowe.yaml`.
:::

### Effect of the CORS Enabled/Disabled State

Enabling or disabling CORS handling purely determines how the Gateway constructs the CORS response headers for the preflight request:

* **CORS Enabled**  
When CORS handling is enabled, the Gateway may respond with service-specific CORS response headers, provided that the service supplies the correct metadata values to override the defaults. If the service does not provide these overrides, the Gateway falls back to the global defaults.

* **CORS Disabled**  
When CORS handling is disabled, the Gateway strictly uses the global defaults and ignores any service-provided overrides.

### Global Defaults
Unless overridden globally in `zowe.yaml` or by service-specific metadata (when enabled), the Gateway replies with the following default CORS response headers:  

  * **`Access-Control-Allow-Methods: GET,HEAD,POST,PATCH,DELETE,PUT,OPTIONS`**  
    Can be overridden globally using `components.gateway.apiml.service.corsDefaultAllowedMethods` in `zowe.yaml`.
  * **`Access-Control-Allow-Headers: origin, x-requested-with`**  
    Can be overridden globally using `components.gateway.apiml.service.corsDefaultAllowedHeaders` in `zowe.yaml`.
  * **`Access-Control-Allow-Credentials: true`**
  * **`Access-Control-Allow-Origin: https://${hostname}:${port}`**    

### Global CORS Configuration Parameters  

To customize how the Gateway handles origins and headers globally, configure the following properties in your `zowe.yaml` file:

* **apiml.service.corsDefaultAllowedOrigins**  
Specifies the allowed origins for CORS requests across the Gateway. This parameter does not default to a wildcard (`*`). Instead, to ensure full security, this parameter defaults strictly to the Gateway's own host and port. This parameter can be customized by adding alternative origins or explicitly setting `corsDefaultAllowedOrigins` to `*` if open access is required. Individual services can also override this value using the `customMetadata.apiml.corsAllowedOrigins` parameter.  
**Default:** `https://${hostname}:${port}`

* **apiml.service.corsDefaultAllowedHeaders**  
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