# Summary of changes in Zowe 3.6.0

This article lists changes introduced in the API Mediation Layer (API ML) for Zowe 3.6.

Two kinds of changes are covered:

* Properties that **already existed** at `Zowe_3.5.0` and whose default, source, or meaning changed.
* **Brand-new** properties whose default is restrictive enough that an installation which worked at `Zowe_3.5.0` may need to explicitly set them after upgrading to stay fully functional.

## 1. Discovery Service now enforces an allowlist of domains for service registration

<!-- | | |
|---|---|
| **Components affected** | `discovery`, `apiml` (all services that register with Eureka) |
| **Type** | New, always-on enforcement |
| **Related PRs** | [#4656](https://github.com/zowe/api-layer/pull/4656) and follow-ups [#4691](https://github.com/zowe/api-layer/pull/4691), [#4692](https://github.com/zowe/api-layer/pull/4692), [#4730](https://github.com/zowe/api-layer/pull/4730), [#4833](https://github.com/zowe/api-layer/pull/4833), [#4835](https://github.com/zowe/api-layer/pull/4835), [#4837](https://github.com/zowe/api-layer/pull/4837) | -->

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

At `Zowe_3.5.0`, the credentials used to authenticate against the Discovery Service's `/eureka` endpoint were fixed to the literal values `eureka` / `password` in the `apiml` and `discovery` components and were not configurable; the other API ML services sent no credentials at all. These are now sourced from `apiml.discovery.userid` / `apiml.discovery.password` on every API ML service. Their default depends on `zowe.verifyCertificates`:

* If `zowe.verifyCertificates: DISABLED`, they still default to `eureka` / `password` when not explicitly set — this is also the credential pair automatically reused for the Caching Service authentication described in change 5, so deployments using `DISABLED` need no action for either change.
* If `zowe.verifyCertificates` is `STRICT` (the default) or `NONSTRICT`, there is no default — the credentials are empty unless configured.

**Required action:** If `zowe.verifyCertificates` is `STRICT` or `NONSTRICT` and your Discovery Service enforces Eureka basic authentication, set matching credentials on the Discovery Service and every service that registers with it:

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
  # repeat for caching-service, api-catalog, zaas (or apiml.apiml.discovery.* for the convenience bundle)
```

No action is required if `zowe.verifyCertificates: DISABLED`.

### 5. Caching Service requires authentication when certificate validation is disabled

At `Zowe_3.5.0`, when `apiml.service.ssl.verifySslCertificatesOfServices` was `false` (that is, `zowe.verifyCertificates: DISABLED`), the Caching Service's REST API allowed **any unauthenticated caller** (`permitAll()`). It now requires HTTP Basic authentication via `apiml.service.http.userId` / `apiml.service.http.password` in that mode; requests without valid matching credentials are rejected. When certificate validation is `STRICT` or `NONSTRICT`, the Caching Service still uses mutual-TLS/X.509 authentication and is unaffected.

**Required action:** For deployments using Zowe's own `*-package` components, `apiml.service.http.userId`/`password` automatically fall back to the same `apiml.discovery.userid`/`password` described in change 4, so **no action is needed** if you rely on the defaults in `DISABLED` mode. Action is only needed if:

* You have a custom client calling the Caching Service's REST API directly (not through Gateway/ZAAS) — it must now send matching Basic Auth credentials.
* You explicitly override `apiml.discovery.userid`/`password` or `apiml.service.http.userId`/`password` differently between the Caching Service and its callers, in which case they must be set to the same values everywhere:

```yaml
components:
  caching-service:
    apiml:
      service:
        http:
          userId: eureka
          password: password
```

### 6. Infinispan initial hosts are now auto-constructed for HA

The Caching Service's `storage.infinispan.initialHosts` property previously defaulted to the hardcoded value `localhost[7600]`. In a high-availability (HA) deployment with more than one instance, this default never pointed at the other instances in the sysplex, which contributed to Infinispan clustering failures in HA on Java 21+.

The default has been changed to an empty value. When `storage.infinispan.initialHosts` is not explicitly set, the Caching Service now automatically builds the initial hosts list from the `haInstances` entries defined in `zowe.yaml`, falling back to the local `apiml.service.hostname` only if no HA instances are configured.

**Required action:**

* If you never explicitly set `storage.infinispan.initialHosts`, no action is required — your deployment now gets the corrected, auto-constructed value instead of the previous, largely non-functional `localhost[7600]` default.
* If you manually set `storage.infinispan.initialHosts` as a workaround for HA clustering issues, you can likely remove it and let it be auto-constructed:

```yaml
components:
  caching-service:
    storage:
      infinispan:
        initialHosts: # remove, or leave unset, to auto-construct from haInstances
```

Explicit values are still honored and take precedence over the auto-constructed list.
