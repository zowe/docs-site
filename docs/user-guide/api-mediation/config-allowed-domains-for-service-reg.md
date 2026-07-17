# Configuring allowed domains for service registration

Use the property `zowe.network.allowedDomains`in your `zowe.yaml` file to secure Zowe API Mediation Layer (API ML) by restricting which domains are permitted to register services with the API ML Discovery Service.

:::info Required Role: System administrator
:::

:::caution Breaking Change   
Beginning with Zowe v 3.6 and subsequent Zowe releases, after upgrade, any service whose URLs resolve to a domain not in the allowlist will fail to register with the Discovery Service and will be invisible to API Gateway routing.
By default, the Discovery Service only trusts:

* `zowe.externalDomains` (in both single instance and HA setups)
* `haInstances.<id>.hostname` (for HA setups)
* The target hostname defined for z/OSMF under the `zOSMF` configuration block.
* The following built-in default community and vendor domains:  
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

### 1. Default Configuration 
No explicit configuration is needed if you only want to allow the local infrastructure. 

| Setup Environment | Automatically Permitted Domains / Hostnames (Defaults) |
| :--- | :--- |
| **Global Defaults (All Environments)** | • `zOSMF` target hostname<br />• `www.ibm.com`<br />• `zowe.github.io`<br />• `www.zowe.org`<br />• `techdocs.broadcom.com` |
| **HA and Non-HA Setups** | • Hostnames configured under `zowe.externalDomains` |
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

## Troubleshooting and `allowedDomains` Override

If your service utilizes an unauthorized domain in its metadata fields (such as a documentation endpoint or a base connection URL), the registration will be blocked, and a `ZWEAM601W` warning message will be issued in the logs. This validation applies to:
* **Base Connection URLs:** Such as `instanceBaseUrls`. 
* **Service Metadata Keys:** Such as `apiml.*.swaggerUrl`, `apiml.*.graphqlUrl`, `apiml.*.documentationUrl`, `apiml.*.externalUrl`, and `apiml.corsAllowedOrigins`.
* **Standard Eureka Endpoints:** Including Home Page, Health Check, Status Page, and Secure Health Check URLs.


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


  :::tip `allowedDomains` Override
  If you need to temporarily bypass this blocking behavior while correcting your `zowe.yaml` parameters, override the `allowedDomains` configuration.

  Set the following environment variable in your `zowe.environments`:
  ```yaml
  zowe:
    environments:
      ZWE_ONLY_WARN_ON_URL_NOT_ALLOWED: true
  ```
  :::
