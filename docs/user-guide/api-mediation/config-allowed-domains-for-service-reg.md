# Configuring allowed domains for service registration

Use the property `zowe.network.allowedDomains`in your `zowe.yaml` file to secure Zowe API Mediation Layer (API ML) by restricting which domains are permitted to register services with the API ML Discovery Service.

:::info Required Role: System administrator
:::

:::caution Breaking Change   
After upgrade, any service whose URLs resolve to a domain not in the allowlist will fail to register with the Discovery Service and will be invisible to API Gateway routing.
By default, the Discovery Service only trusts:

* `zowe.externalDomains` (in a non-HA setup)
* `zowe.haInstances.<id>.hostname` (in an HA setup)
* The target hostname defined for z/OSMF under the `zOSMF` configuration block.
* The following built-in default domains:  
    * `www.ibm.com`
    * `zowe.github.io`
    * `www.zowe.org`
    * `techdocs.broadcom.com`

Existing extenders using domains outside of these defaults must explicitly configure `zowe.network.allowedDomains` after upgrading to prevent registration failures.
:::

## Allowed domains security overview

By default, the API ML Discovery Service accepts metadata from any service attempting to onboard. Without domain validation, a compromised or untrusted service could register malicious URLs (such as `homePageUrl` or `healthCheckUrl`) pointing to external, unverified infrastructure. 

Implementing an explicit domain allowlist ensures the following security measures:
* Only trusted infrastructure within your enterprise domain can integrate with API ML.
* Malicious or misconfigured services are blocked at the boundary before they can expose users to SSRF (Server-Side Request Forgery).

## Configuration Examples (`zowe.yaml`)

### 1. Minimal Configuration (Default Behavior)
No explicit configuration is needed if you only want to allow the local infrastructure. 

| Setup Environment | Automatically Permitted Domains / Hostnames (Defaults) |
| :--- | :--- |
| **Global Defaults (All Environments)** | • `zOSMF` target hostname<br>• `www.ibm.com`<br>• `zowe.github.io`<br>• `www.zowe.org`<br>• `techdocs.broadcom.com` |
| **Non-HA Setup Only** | • Hostnames configured under `zowe.externalDomains` |
| **HA Setup Only** | • Individual instance hostnames listed under `zowe.haInstances.<id>.hostname` |


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

<!-- **Earmarked as this validation procedure should probably be removed**

### Validation steps

1. Start Zowe with `zowe.network.allowedDomains` set to only the local hostname.

2. Attempt to register a service with `instanceBaseUrl`s pointing to an unlisted domain.

3. Verify registration is blocked and `ZWEAM601W` appears in the Discovery Service log.

4. Add the domain to `allowedDomains`, restart, verify registration succeeds.

5. Verify wildcard `*.example.com` matches `sub.example.com` but not `other.org`.
-->
## Troubleshooting and `allowedDomains` Override

If an extender's service utilizes an unauthorized domain in its registration profile, the registration will be blocked, and a ZWEAM601W warning message will be issued in the logs. This validation applies to:  
* **Base Connection URLs:** Such as `instanceBaseUrls`.  
* **Service Metadata Keys:** Such as `swaggerUrl`, `graphqlUrl`, `documentationUrl`, `externalUrl`, and `corsAllowedOrigins`.
* **Standard Eureka Endpoints:** Including Home Page, Health Check, and Status Page URLs.


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


  :::tip `allowedDomains` Development Override
  If you need to temporarily bypass this blocking behavior while correcting your `zowe.yaml` parameters, override the `allowedDomains` configuration.

  Set the following environment variable in your `zowe.environments`:
  ```text
  ZWE_ONLY_WARN_ON_URL_NOT_ALLOWED=true
  ```
  :::