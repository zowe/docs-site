# Configuring allowed domains for service registration

Use the property `zowe.network.allowedDomains`in your `zowe.yaml` file to secure Zowe API Mediation Layer (API ML) by restricting which domains are permitted to register services with the API ML Discovery Service.

:::info Required Role: System administrator
:::

:::caution Breaking Change   
After upgrade, any service whose URLs resolve to a domain not in the allowlist will fail to register with the Discovery Service and will be invisible to API Gateway routing.
By default, the Discovery Service only trusts:

* `zowe.externalDomains` (in a non-HA setup)
* `zowe.haInstances.<id>.hostname` (in an HA setup)
* The following built-in default domains:  
    * `www.ibm.com`
    * `zowe.github.io`
    * `www.zowe.org`
    * `techdocs.broadcom.com`

Existing extenders using domains outside of these defaults must explicitly configure `zowe.network.allowedDomains` after upgrading to prevent registration failures.
:::

:::note
To override the `allowedDomains` configuration, set `ZWE_ONLY_WARN_ON_URL_NOT_ALLOWED=true` in the `zowe.environments` attribute in your `zowe.yaml` file. 
:::

## Allowed domains security overview

By default, the API ML Discovery Service accepts metadata from any service attempting to onboard. Without domain validation, a compromised or untrusted service could register malicious URLs (such as `homePageUrl` or `healthCheckUrl`) pointing to external, unverified infrastructure. 

Implementing an explicit domain allowlist ensures the following security measures:
* Only trusted infrastructure within your enterprise domain can integrate with API ML.
* Malicious or misconfigured services are blocked at the boundary before they can expose users to SSRF (Server-Side Request Forgery) or phishing vulnerabilities via the API ML Gateway dashboard.

## Default allowed domain behavior

If the `zowe.network.allowedDomains` property is left unconfigured, the API ML defaults to a strict, highly secure configuration:

* **Default Value:** `${apiml.service.hostname}`
* **Impact:** In addition to the local hostname where the Discovery Service is running, the following domains are automatically trusted by default:
    * **Network & Cluster Hostnames:**
      * The primary domains or hostnames configured under `zowe.externalDomains` (in a non-HA setup).
      * All instance hostnames listed under `zowe.haInstances.<id>.hostname` (in a HA setup).
      * The target hostname defined for z/OSMF under the `zOSMF` configuration block.
    * **Built-in Community & Vendor Documentation Domains:**
      * `www.ibm.com`
      * `zowe.github.io`
      * `www.zowe.org`
      * `techdocs.broadcom.com`

Any service attempting to register metadata or establish CORS connections utilizing an external domain outside of this aggregated list will be rejected immediately unless `zowe.network.allowedDomains` is expanded to include this domain.


## Configuration Examples (`zowe.yaml`)

### 1. Minimal Configuration (Default Behavior)
No explicit configuration is needed if you only want to allow the local infrastructure. 

| Setup Environment | Automatically Permitted Domains/Hostnames |
| :--- | :--- |
| Non-HA Setup | `zowe.externalDomains` |
| HA Setup | `zowe.haInstances.<id>.hostname` |


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

When a service attempts to register, a `MetadataFilterService` scans and validates every URL field provided in the service's registration profile. If even one URL contains a domain that does not not match the allowlist, the registration is blocked.

## Service Metadata Validation

The following example shows how the domain validation check looks at both the base connection URLs and individual API metadata fields:

**Example:**
```yaml
services:
  serviceId: my-service
  instanceBaseUrls:
    - https://my-service.mycompany.com:8443/   # ← Domain checked against allowlist
  apiInfo:
    swaggerUrl: https://my-service.mycompany.com:8443/v3/api-docs  # ← Checked against allowlist
```
<!-- **Earmarked as this validation procedure should probably be removed**

### Validation steps

1. Start Zowe with `zowe.network.allowedDomains` set to only the local hostname.

2. Attempt to register a service with `instanceBaseUrl`s pointing to an unlisted domain.

3. Verify registration is blocked and `ZWEAM601W` appears in the Discovery Service log.

4. Add the domain to `allowedDomains`, restart, verify registration succeeds.

5. Verify wildcard `*.example.com` matches `sub.example.com` but not `other.org`.
-->
## Troubleshooting and Emergency Override

If an extender's service utilizes an unauthorized domain in the service's metadata profile, the onboarding process is prevented. From the perspective of the registering client, the service will silently fail to register and will remain invisible to the API Gateway. However, the API ML Discovery Service will actively catch this validation failure and issue an explicit warning in the logs.

**Error Log Example (Blocked Registration)**

When registration is blocked due to an unlisted domain, an entry similar to the following appears in the Zowe server log:

```text
ZWEAM601W 'apiml.service.externalUrl' https://evil.example.com/api is not allowed for instance 'my-service:my-service:8080'
```

**Resolution:**
1. **Identify the Blocked Domain.**  
   Check the log entry to find the offending URL and domain.

2. **Update the Allowlist.**  
   Coordinate with your System Administrator to add the missing domain or wildcard pattern to the `zowe.network.allowedDomains` array in `zowe.yaml`.


  :::tip Emergency Development Override
  If you are working in a non-production or development environment and need to temporarily bypass this blocking behavior while correcting your `zowe.yaml` parameters, you can use an environment variable override.

  Set the following environment variable in your Zowe launch environment:
  ```text
  ZWE_ONLY_WARN_ON_URL_NOT_ALLOWED=true
  ```
  :::