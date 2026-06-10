# Configuring allowed domains for service registration

Use the property `zowe.network.allowedDomains` to secure Zowe API Mediation Layer (API ML) by restricting which domains are permitted to register services with the API ML Discovery Service.

:::info Required Role: System administrator
:::

:::important Breaking Change 
After upgrade, any service whose URLs resolve to a domain not in the `allowlist` will fail to register with the Discovery Service and will be invisible to API Gateway routing. The default (only `zowe.externalDomains` in non-HA setup or `zowe.haInstances.<id>.hostname` in HA setup) means that existing extenders may need to explicitly configure `zowe.network.allowedDomains` after upgrading.
:::

## Allowed domains security overview

By default, the API ML Discovery Service accepts metadata from any service attempting to onboard. Without domain validation, a compromised or untrusted service could register malicious URLs (such as `homePageUrl` or `healthCheckUrl`) pointing to external, unverified infrastructure. 

Implementing an explicit domain `allowlist` ensures the following security measures:
* Only trusted infrastructure within your enterprise domain can participate in the API ML ecosystem.
* Malicious or misconfigured services are blocked at the boundary before they can expose users to SSRF (Server-Side Request Forgery) or phishing vulnerabilities via the API ML Gateway dashboard.

## Default allowed domain behavior

If the `zowe.network.allowedDomains` property is left unconfigured, the API ML defaults to a strict, highly secure posture:

* **Default Value:** `${apiml.service.hostname}`
* **Impact:** Only the local hostname where the API ML Discovery Service itself is running is permitted. Any service attempting to register from a different host or domain will be rejected immediately unless the allowlist is expanded.


## Configuration Examples (`zowe.yaml`)

### 1. Minimal Configuration (Default Behavior)
No explicit configuration is needed if you only want to allow the local infrastructure. The system automatically permits either `zowe.externalDomains` (in a non-HA setup) or `zowe.haInstances.<id>.hostname` (in an HA setup).

:::note
No configuration needed — only `zowe.externalDomains` in non-HA setup or `zowe.haInstances.<id>.hostname` in HA setup is allowed.
:::

### 2. Explicit Configuration with Wildcards and Internal Hosts

To permit external, distributed, or third-party services to onboard, you must explicitly define your allowed domains. The list supports leading wildcards (for example, `*.mycompany.com`) to match all subdomains, as well as literal internal hostnames.

```yaml
zowe:
  network:
    allowedDomains: 
      - "*.mycompany.com"
      - "internal-service"
      - "monitoring.local"
```

:::note Note on Wildcards:

`*.mycompany.com` will match `service1.mycompany.com` and `api.internal.mycompany.com`, but it will not match the exact base domain `mycompany.com`. If needed, list the base domain explicitly.
:::

## Evaluated Metadata and URLs

When a service attempts to register, a `MetadataFilterService` scans and validates every URL field provided in the service's registration footprint. If even one URL contains a domain not matching the allowlist, the registration is blocked.

## Service Metadata Validation

The following example shows how the domain validation check looks at both the base connection URLs and individual API metadata fields:

**Example:**
```yaml
services:
  serviceId: my-service
  instanceBaseUrls:
    - [https://my-service.mycompany.com:8443/](https://my-service.mycompany.com:8443/)   # ← Domain checked against allowlist
  apiInfo:
    swaggerUrl: [https://my-service.mycompany.com:8443/v3/api-docs](https://my-service.mycompany.com:8443/v3/api-docs)  # ← Checked against allowlist
```

### Validation steps

1. Start Zowe with `zowe.network.allowedDomains` set to only the local hostname.

2. Attempt to register a service with `instanceBaseUrl`s pointing to an unlisted domain.

3. Verify registration is blocked and `ZWEAM601` appears in the Discovery Service log.

4. Add the domain to allowedDomains, restart, verify registration succeeds.

5. Verify wildcard `*.example.com` matches `sub.example.com` but not `other.org`.

### All Checked Metadata Fields and Patterns
The validator explicitly scans the following properties within the service registration metadata:

* **homePageUrl**  
The landing page URL for the service.

* **healthCheckUrl**  
The standard endpoint used to monitor service availability.

* **statusPageUrl**  
The page displaying detailed status metrics.

* **secureHealthCheckUrl**  
The HTTPS-secured health check endpoint.

* **apiml.corsAllowedOrigins**  
A comma-separated list. The validator splits this string and verifies *every single entry* against the allowlist.

* **Custom keys ending in swaggerUrl**  
OpenAPI/Swagger documentation endpoints.

* **Custom keys ending in graphqlUrl**  
GraphQL playground or schema endpoints.

* **Custom keys ending in documentationUrl**  
Links to internal or external service documentation.

* **Custom keys ending in externalUrl**  
Any other designated external reference links.

## Troubleshooting & Emergency Override

If an extender's service fails to register, the service is silently blocked from the perspective of the registering client, but the event will be captured in the Discovery Service logs.

**Error Log Example (Blocked Registration)**

When registration is blocked due to an unlisted domain, an entry similar to the following appears in the Discovery Service log:

```text
ZWEAM601W 'apiml.service.externalUrl' [https://evil.example.com/api](https://evil.example.com/api) is not allowed for instance 'my-service:my-service:8080'
```

**Resolution:**
1. **Identify the Blocked Domain.**  
   Check the log entry (like the one above) to find the offending URL and domain.

2. **Update the Allowlist.**  
   Coordinate with your System Administrator to add the missing domain or wildcard pattern to the `zowe.network.allowedDomains` array in `zowe.yaml`.

  :::tip 
  If you are working in a non-production or development environment and need to temporarily downgrade this blocking behavior to a warning while you correct your `zowe.yaml` parameters, see the emergency override instructions in the [API Mediation Layer Troubleshooting Guide](../troubleshoot/troubleshoot-apiml.md#zweam601w).
  :::