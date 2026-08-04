# Summary of changes in Zowe 3.6.0

This article lists changes introduced in the API Mediation Layer (API ML) for Zowe 3.6.

Two kinds of changes are covered:

* Properties that **already existed** at `Zowe_3.5.0` and whose default, source, or meaning changed.
* **Brand-new** properties whose default is restrictive enough that an installation which worked at `Zowe_3.5.0` may need to explicitly set them after upgrading to stay fully functional.

## 1. Discovery Service now enforces an allowlist of domains for service registration

In Zowe versions up to 3.5 the Discovery Service accepted any service registration without validating the hostnames or URLs the service advertised. Discovery Service now validates, for **every** registering instance, its hostname, IP address, home page URL, health-check URL, status page URL, and any `apiml.*.swaggerUrl` / `documentationUrl` / `graphqlUrl` / `externalUrl` / `corsAllowedOrigins` metadata against an allowlist of domains. This check is unconditional — it runs for every registration, regardless of any other setting — and by default **rejects the entire registration** if any of those URLs point to a domain that isn't allowed.

The allowlist can be customized via `zowe.network.allowedDomains` property. Items of this array should be enclosed in double quotes (`"`) to allow wildcards. If no wildcard is used, strict matching is assumed.
A small set of Zowe/IBM documentation domains (`www.ibm.com`, `zowe.github.io`, `www.zowe.org`, `techdocs.broadcom.com`) is always allowed to permit core service registrations.

**Required action:**

* The allowlist will already contain your system's hostnames and no action is needed for Zowe's own services.
* Update `zowe.network.allowedDomains` with other domains and/or IP addresses the instance connects to. For example:

```yaml
zowe:
  network:
    allowedDomains:
      - "*.zowe.org"
      - "ibm.com"
      - "10.0.0.5"
```

* As a temporary mitigation while you adjust the allowlist, the Discovery Service honors the environment variable `ZWE_ONLY_WARN_ON_URL_NOT_ALLOWED=true`, which downgrades rejections to warnings instead of failing registration.

### 2. Strict URL validation replaces `allowEncodedSlashes`

The Gateway's `apiml.service.allowEncodedSlashes` property has been removed and replaced by `apiml.security.enableStrictUrlValidation`. In Zowe versions up to 3.5, `allowEncodedSlashes` defaulted to `true`, allowing encoded characters (such as `%2F`) to pass through routed request URLs unvalidated. The new property inverts this: when `enableStrictUrlValidation` is `true` (the new default), the Gateway strictly validates request URLs and rejects encoded slashes, backslashes, and semicolons in routed traffic. Gateway-internal endpoints are always validated strictly regardless of this setting.

**Required action:** Remove any existing `apiml.service.allowEncodedSlashes` setting — it has no effect anymore. If routed requests need to carry encoded slashes or similar encoded characters in the URL path, explicitly disable strict validation:

```yaml
components:
  gateway:
    apiml:
      security:
        enableStrictUrlValidation: false
```

Without this change, routed requests containing encoded slashes, backslashes, or semicolons — previously allowed by default — are now rejected by default.

### 3. CORS: default allowed origin for routed services narrowed

This only matters if you have `apiml.service.corsEnabled: true` (CORS handling in the Gateway is `false`/disabled by default).

When CORS handling is enabled, for a southbound service that opts in via its own `apiml.corsEnabled` metadata but does not declare its own `apiml.corsAllowedOrigins`, the Gateway used to allow **any** origin (`Access-Control-Allow-Origin: *`). It now falls back to a configurable default, `apiml.service.corsDefaultAllowedOrigins`, whose effective default is the Gateway's own base URL (`https://<apiml.service.hostname>:<apiml.service.port>`) rather than "any origin." A companion property, `apiml.service.corsDefaultAllowedHeaders`, was also added but its effective default (`*`) matches previous behavior, so it does not require action.

**Required action:** If `apiml.service.corsEnabled: true` and your browser-based clients call routed services from an origin other than the Gateway's own hostname/port, set:

```yaml
components:
  gateway:
    apiml:
      service:
        corsDefaultAllowedOrigins: https://my-external-client.example.com
```

### 4. Eureka discovery service credentials are now configurable

**Note:** This change only applies to not-recommended setups with `verifyCertificates: DISABLED`

The credentials used to authenticate against the Discovery Service's `/eureka/**` endpoints when certificate validation is disabled were fixed to the literal values `eureka` / `password`.
These are now sourced from `apiml.discovery.userid` / `apiml.discovery.password` on every API ML service.

* If `zowe.verifyCertificates: DISABLED`, they still default to `eureka` / `password` when not explicitly set.
* If `zowe.verifyCertificates` is `STRICT` (the default) or `NONSTRICT`, a valid client certificate issued by a Zowe-trusted CA is used.

**Required action:** If `zowe.verifyCertificates` is `DISABLED` (not recommended), set matching credentials on the Discovery Service and every service that registers with it:

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

### 5. Caching Service requires authentication when certificate validation is disabled

**Note:** This change only applies to not-recommended setups with `verifyCertificates: DISABLED`

The Caching Service's REST API allowed **any unauthenticated caller** (`permitAll()`) when certificate validation was disabled at Zowe level.
It now requires HTTP Basic authentication via `apiml.service.http.userId` / `apiml.service.http.password` in that mode; requests without valid matching credentials are rejected. 
When certificate validation is `STRICT` or `NONSTRICT`, the Caching Service still uses X.509 authentication and is unaffected.

**Required action:** Action is only needed if:

* You have a custom client calling the Caching Service's REST API directly (not through Gateway/ZAAS) — it must now send matching Basic Auth credentials.

```yaml
components:
  caching-service:
    apiml:
      service:
        http:
          userId: eureka
          password: password
```
