
# API ML V3.6 upgrade and security enhancements

Zowe v3.6.0 introduces several updates to API ML to strengthen security defaults, improve network validation, and tighten component authentication. These enhancements prioritize a secure-by-default posture which include breaking changes that may require updates to your `zowe.yaml` configuration to avoid disruptions during the upgrade process.

Configuration changes in Zowe v3.6.0 are in three key areas:

* **Modified existing properties**  
Configuration properties that existed in Zowe v3.5.0, but whose default value, source, or underlying behavior has changed.

* **Restrictive new properties**  
New properties introduced with strict default settings. An installation that functioned correctly in Zowe v3.5.0 may require explicit configuration of these new properties to retain previous behavior.

* **Stricter endpoint and network validations**  
Endpoints that now enforce stricter HTTP header requirements, payload formats, or SAF authorizations, which cannot be reverted via configuration.

* **Removed properties and endpoints**  
Properties and REST endpoints that no longer exist. Removed properties are ignored, and requests to removed endpoints are rejected.

## Discovery Service enforces domain allowlist for service registration

In Zowe versions up to v3.5.0, the Discovery Service accepted any service registration without validating the hostnames or URLs the service advertised. The Discovery Service now strictly validates all URLs provided by registering services against an allowlist of domains, including:  
* hostname
* IP address
* home page URL
* health-check URL
* secure health-check URL
* status page URL
* `apiml.*.swaggerUrl`
* `documentationUrl`
* `graphqlUrl`
* `externalUrl`
* `corsAllowedOrigins` 

The API Catalog applies the same validation before it retrieves an API document from a registered service.

**Operational Impact:**  
By default, if a service attempts to register using a domain or IP address that is not on the allowlist, the registration is rejected entirely and message `ZWEAM601` is logged. See the following additional restrictions:

* **The `http` scheme is rejected** unless AT-TLS is enabled for the client. Message `ZWEAM603` is logged.
* **Loopback and local addresses are no longer allowed automatically.** Add them to the allowlist explicitly if your services register on them.

**Required action:**  
The allowlist can be customized via the `zowe.network.allowedDomains` property. Items of this array should be enclosed in double quotes (`"`) to allow wildcards. If no wildcard is used, strict matching is assumed.
The following set of Zowe/IBM documentation domains is always allowed to permit core service registrations:  
* `www.ibm.com`
* `zowe.github.io`
* `www.zowe.org`
* `techdocs.broadcom.com`
   
The allowlist will already contain your system's hostnames. No action is needed for Zowe's own services.  
Update `zowe.network.allowedDomains` with other domains and/or IP addresses the instance connects to. 

The following entry formats are supported:

| Entry | Matches |
|-|-|
| `"myhost.example.com:7554"` | The host `myhost.example.com` on port `7554` only |
| `"myhost.example.com:*"` | The host `myhost.example.com` on any port |
| `"*.example.com:*"` | Any sub-domain of `example.com` on any port. A leading `*.` is the only supported wildcard form, and it does not match `example.com` itself |
| `"10.0.0.5:*"` | That IP address on any port |
| `"10.0.0.0/24"` | Any IPv4 address in the range. An IP mask cannot carry a port, so the IP mask is only matched for `documentationUrl` and `corsAllowedOrigins`, or when port validation is disabled |

**Example:**

```yaml
zowe:
  network:
    allowedDomains:
      - "*.zowe.org:*"
      - "ibm.com:*"
      - "10.0.0.5:*"
```

:::tip Temporary Mitigation:  
If registrations begin to fail after the upgrade, you can temporarily downgrade these rejections to warnings while you identify and configure the missing domains:

```yaml
components:
  discovery:
    apiml:
      security:
        domains:
          onlyWarn: true
```

These properties are also available on `components.api-catalog` , and can alternatively be set as the environment variables `ZWE_ONLY_WARN_ON_URL_NOT_ALLOWED=true` and `ZWE_DISABLE_PORT_VALIDATION=true`. Configure all components that perform the validation, otherwise registrations continue to fail in the component that still enforces the domain allowlist validation for service registrations.
:::

:::note
To allow the API Catalog to retrieve API documents from any URL, without validating the URL against the allowlist, set `components.api-catalog.apiml.security.domains.allowAnyApiDocUrl: true`. This affects only API document retrieval and does not relax registration validation.
:::

## Strict URL validation replaces `allowEncodedSlashes`

The Gateway's `apiml.service.allowEncodedSlashes` property has been removed and replaced by `apiml.security.enableStrictUrlValidation`. 

**Operational Impact:**  
In Zowe versions up to 3.5, `allowEncodedSlashes` defaulted to `true`. This default setting allowed encoded characters (such as `%2F`) to pass through routed request URLs unvalidated. The new property inverts this validation behavior: when `enableStrictUrlValidation` is `true` (the new default), the Gateway strictly validates request URLs and rejects encoded slashes, backslashes, and semicolons in routed traffic. Gateway-internal endpoints are always validated strictly regardless of this setting.

**Required Actions:**  
1. Remove the deprecated `apiml.service.allowEncodedSlashes` property from your `zowe.yaml` (This property will be ignored).
2. Opt-out (if needed). If you route traffic to APIs that require encoded slashes or semicolons in the URL path, you must explicitly disable strict validation for the Gateway:

```yaml
components:
  gateway:
    apiml:
      security:
        enableStrictUrlValidation: false
```

Without this change, routed requests containing encoded slashes, backslashes, or semicolons, which were previously allowed by default, are now rejected by default.

## Cross-site requests are rejected by Fetch Metadata validation

**Operational Impact:**  
The Gateway now inspects the `Sec-Fetch-Site`, `Sec-Fetch-Mode`, and `Sec-Fetch-Dest` request headers that browsers send, to protect against cross-site request forgery. A request whose `Sec-Fetch-Site` is `same-site` or `cross-site` is rejected with HTTP `403` unless the origin is validated by the CORS layer, or the request is a safe top-level navigation (a `GET` or `HEAD` the user navigated to). Requests without the `Sec-Fetch-Site` header, such as those from non-browser and legacy clients, and requests with `same-origin` or `none`, are unaffected.

This validation applies to the whole Gateway edge, including WebSocket handshakes. A cross-site WebSocket handshake is rejected by default.

**Required action:**  
No action is required for API clients or for browser-based clients served from the Gateway's own origin. If you host a browser application on a different origin that calls the Gateway, either enable and configure CORS so that the origin is validated (see *CORS: default allowed origin for routed services narrowed*), or disable the check:

```yaml
components:
  gateway:
    apiml:
      security:
        secFetch:
          enabled: false
```

## Login requests with a body must use `Content-Type: application/json`

**Operational Impact:**  
To prevent the authentication endpoints from being targeted by simple cross-site form posts, a request that carries a body is now rejected with HTTP `415 Unsupported Media Type` unless it declares `Content-Type: application/json`. Requests without a body, such as client-certificate login, Basic authentication login, and logout, are unaffected.

**Required action:**  
Update any script, automation, or custom client that posts credentials as form data (`application/x-www-form-urlencoded`) or without a `Content-Type` header to send a JSON body with the `Content-Type: application/json` header. There is no property to restore the previous behavior.

## CORS: default allowed origin for routed services narrowed

**Operational Impact:**    
When CORS handling is enabled globally (`apiml.service.corsEnabled: true`), southbound services can explicitly ask the Gateway to manage CORS on their behalf by setting their own `apiml.corsEnabled` metadata to `true`. For services that enable this Gateway-managed CORS but fail to define a specific list of allowed origins (`apiml.corsAllowedOrigins`), the API Gateway no longer defaults to allowing any origin (`Access-Control-Allow-Origin: *`). Instead, the API Gateway falls back to a new property: `apiml.service.corsDefaultAllowedOrigins`. The default value is now the API Gateway's base URL (`https://<apiml.service.hostname>:<apiml.service.port>`).

A companion property, `apiml.service.corsDefaultAllowedHeaders`, was also added but the effective default (`*`) matches previous behavior, so no action is required.

**Required action:**  
If `apiml.service.corsEnabled: true` and your browser-based clients call routed services from an external origin (other than the Gateway's own hostname and port), you must explicitly allow the origin in your `zowe.yaml` file:

```yaml
components:
  gateway:
    apiml:
      service:
        corsDefaultAllowedOrigins: https://my-external-client.example.com
```

## Discovery Service credentials are now configurable

:::note
This change only applies to configurations where `verifyCertificates` is set to `DISABLED` (not recommended).
:::

**Operational Impact:**  
When certificate validation is disabled, the credentials used to authenticate against the Discovery Service's `/eureka/**` endpoints are no longer hardcoded to the literal values `eureka` / `password`
These values are now sourced from `apiml.discovery.userid` and `apiml.discovery.password` on every API ML service.

:::note
The username and password are string literals, this is not a SAF-bound use
:::

* If `zowe.verifyCertificates` is `DISABLED`, the credentials still default to `eureka` / `password` when not explicitly set.
* If `zowe.verifyCertificates` is `STRICT` (the default) or `NONSTRICT`, a valid client certificate issued by a Zowe-trusted CA is used.

**Required action:**  
If `zowe.verifyCertificates` is `DISABLED` (not recommended), set matching credentials on the Discovery Service and every service that registers with the Discovery Service in your `zowe.yaml`:

**Example:**

```yaml
components:
  discovery:
    apiml:
      discovery:
        userid: eureka
        password: password
  gateway:
    apiml:
      discovery:
        userid: eureka
        password: password
  # repeat for caching-service, api-catalog, zaas
```

## Caching Service requires authentication when certificate validation is disabled

:::note
This change only applies to configurations where `verifyCertificates` is set to `DISABLED` (not recommended).
:::

**Operational Impact:**  
The Caching Service's REST API no longer permits unauthenticated callers (`permitAll()`) when Zowe-level certificate validation is disabled. In this mode, the service now requires HTTP Basic authentication via the `apiml.service.http.userId` and `apiml.service.http.password` properties. Requests without valid matching credentials are rejected. 

When certificate validation configuration is `STRICT` or `NONSTRICT`, the Caching Service still uses X.509 authentication and is unaffected.

**Required action:**  
Action is only required if you have a custom client that calls the Caching Service's REST API directly (bypassing the API Gateway or ZAAS). The client must now send matching HTTP Basic Authentication credentials. Ensure these credentials are configured in your `zowe.yaml` file:

```yaml
components:
  caching-service:
    apiml:
      service:
        http:
          userId: eureka
          password: password
```

:::note
When these properties are not set, they default to the `apiml.discovery.userid` and `apiml.discovery.password` values described in the previous section, so the API ML services themselves continue to reach the Caching Service without further configuration.
:::

## Modifiable actuator endpoints require SAF authorization

**Operational Impact:**  
This change extends the protection of operational endpoints described in [Breaking changes](#breaking-changes). In addition to requiring authentication, the actuator endpoints that change the running configuration, `/application/loggers` and `/application/gateway`, are now read-only by default and require the authenticated user to have `CONTROL` access to the `APIML.DEBUG` profile in the `ZOWE` class. Endpoints that only read state continue to require authentication alone.

Also note that, prior to Zowe v3.6.0, `/application/info` and `/application/version` remained unauthenticated even when `apiml.health.protected` was `true`. These two endpoints, and `/gateway/version` and `/gateway/api/v1/version`, are now covered by that setting.

**Required action:**  
Define the `APIML.DEBUG` profile and permit the users who need to change log levels at run time:

```
RDEFINE ZOWE APIML.DEBUG UACC(NONE)
PERMIT APIML.DEBUG CLASS(ZOWE) ID(<userid>) ACCESS(CONTROL)
SETROPTS RACLIST(ZOWE) REFRESH
```

To make the endpoints writable, the component must additionally run with debug logging enabled (`components.gateway.debug: true`).

## Removed endpoints and security headers

**Operational Impact:**  
* The onboarding conformance and validation endpoints, `/gateway/[api/v1/]conformance/**` and `/gateway/[api/v1/]validate`, have been removed.
* HTTP Strict Transport Security (HSTS) is now always sent, `X-Frame-Options` is set to `SAMEORIGIN`, and the API Catalog UI is served with a Content Security Policy that does not permit `unsafe-eval`. None of these are configurable.

**Required action:**  
Remove calls to the conformance and validation endpoints from onboarding automation and CI pipelines. If you embed the API Catalog UI in a page served from another origin, that embedding no longer works.

## Personal Access Token revocation store

:::note
This change only applies when Personal Access Tokens are enabled (`components.gateway.apiml.security.personalAccessToken.enabled: true`).
:::

**Operational Impact:**  
Personal Access Token revocation is now backed by a per-item store in the Caching Service, which introduces a set of new properties with a dependency between two components. The Caching Service property `components.caching-service.storage.maxQueryKeys` (default `66`) must remain greater than or equal to the ZAAS property `apiml.security.personalAccessToken.revocationLookupBatchKeys` (default `66`), otherwise lookups for tokens with many scopes are rejected and those tokens are denied.

Revoke-for-user and revoke-for-scope requests whose `timestamp` is more than `revokeRuleSkewAllowanceMillis` (default `60000`) in the future are now rejected with HTTP `400`. Previous releases accepted any value.

**Required action:**  
The defaults are consistent, so no action is required unless you change either property. If you do, change both together. In a multi-node deployment, pin `apiml.security.personalAccessToken.cutoverDate` to the time at which the upgrade of the whole fleet completed, so that every node classifies existing tokens identically:

```yaml
components:
  zaas:
    apiml:
      security:
        personalAccessToken:
          cutoverDate: "2026-10-05T12:00:00Z"
```

A value that is too early silently stops enforcing revocations that were made before the upgrade. A value without a time zone, earlier than `2026-09-01`, or more than a day in the future is rejected with message `ZWEAZ607`.
