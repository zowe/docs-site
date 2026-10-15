# Important updates in Zowe V3

Zowe 3.0 brings a range of major changes in Zowe functionality, including *breaking changes*, or modifications that require updates to avoid disruptions in your applications.

Review this article for details about changes to various Zowe components introduced in Zowe V3, and any required actions you need to take.

## API Mediation Layer (API ML)

### Breaking changes

| Change in  Zowe V3                                                                                                            | Required action                                                                                                                                                                                                                                                                                                                                                                                                        |
|-------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Authentication endpoints do not support the route `/api/v1/gateway`, and instead support only `/gateway/api/v1`        | If you use the endpoints directly, change the URLs to start with `/gateway/api/v1`. If you use ZAAS client to integrate with API Mediation Layer, no action is required as the change is handled in the ZAAS client code.                                                                                                                                                                                              |
| API Gateway operational endpoints are now protected by default. The property `components.gateway.apiml.health.protected` now defaults to `true`.<br /><br />This setting governs access to the following endpoints:<br />• `/application/health`<br />• `/application/info`<br />• `/application/version`<br />• `/gateway/version`<br />• `/gateway/api/v1/version`<br /><br />Unauthenticated requests will return HTTP `401`. | **(Option 1) Update clients to authenticate (Recommended):**<br />Update monitoring systems, availability probes, readiness checks, automated scripts, and diagnostic tools to provide valid credentials (Basic authentication or Bearer JWT).<br /><br />**(Option 2) Revert to open access:**<br />Alternatively, explicitly set `components.gateway.apiml.health.protected: false` in `zowe.yaml` if unauthenticated access is required.<br /> *Security Warning:*<br /> Setting this property to `false` exposes the Gateway health, information, and version endpoints without authentication. Use the default `true` setting in production unless unauthenticated monitoring is required and access is restricted through another trusted control. |
| Spring Enabler has been updated to Spring Boot 3 and Spring 6. Spring Boot 2 and Spring 5 versions are no longer be supported. | Upgrade extending services based on the Spring Enabler to Spring Boot 3 and Spring 6.                                                                                                                                                                                                                                                                                                                                  |
| Datasets API is archived                                                                                                 | This service was disabled by default in Version 2. If you enable the service via `components.data-sets.enabled: true` and use the APIs documented in [Data sets Swagger](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/zowe/docs-site/docs-staging/api_definitions/datasets.json), it is necessary to move to the usage of the similar z/OSMF endpoints.                                          |
| Jobs API is archived                                                                                                     | The service was disabled by default in Version 2. If you enable the service via `components.jobs.enabled: true` and use the APIs documented in [Jobs Swagger](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/zowe/docs-site/docs-staging/api_definitions/jobs.json), it is necessary to move to the usage of the similar z/OSMF endpoints.                                                         |
| Metrics service is archived                                                                                              | The Metrics service was in Technical Preview. Currently, there is no replacement. In V3, the Open Telemetry standard whas been implemented, which serves as a replacement.                                                                                                                                                                                                                                                    |
| IMS API is archived                                                                                                      | The IMS API service was not fully supported. If you were using the API, please reach out to the IBM team for follow-up steps.                                                                                                                                                                                                                                                                                                  |
| Java 17 is required for the API Mediation Layer to run                                                                   | For V3, it is necessary to update z/OS to version 2.5 or later as this brings support of Java 17. It is necessary to install Java 17 and provide the path to Java 17 to Zowe Java configuration.                                                                                                                                                                                                                       |
| z/OSMF in version V2R5 with APAR PH12143 applied (JWT setup)                                                                  | If you are running a version of z/OS before 3.1, validate that the PH12143 APAR was applied to the z/OSMF installation used by Zowe. The value `auto` is no longer supported. For v3R1, validate that the JWT support is enabled. If you do not want to enable JWT support, make sure that you set the value of `components.gateway.apiml.security.auth.zosmf.jwtAutoconfiguration` to `ltpa`. The `ltpa` option cannot be used with hardware accelerated ICSF Keyrings. See [example-zowe.yaml](https://github.com/zowe/zowe-install-packaging/blob/v3.x/staging/example-zowe.yaml) for new component values. |
| Configuration of keyrings will require transformation from `safkeyring:////` to `safkeyring://`                               | If your Zowe configuration contains `safkeyring:////`, change this part to `safkeyring://`.                                                                                                                                                                                                                                                                                                                            |
| Support access to z/OSMF only through `/ibmzosmf` route. V3 will not support access through the `/zosmf` route                | If you use z/OSMF via `{apimlUrl}/zosmf/{zosmfEndpoint}` it is necessary to move to `{apimlUrl}/ibmzosmf/{zosmfEndpoint}.`                                                                                                                                                                                                                                                                                                |

### Important API ML updates in Zowe v3

Prior to Zowe v3, the API Gateway directly contained the code for the Authentication and Authorization Service (ZAAS). In Zowe v3, ZAAS was architecturally decoupled into a standalone component with its own configuration, as it is the only API ML service that natively requires direct interaction with z/OS security services (such as z/OSMF and SAF).

While ZAAS is now a standalone service, how ZAAS runs depends on your deployment configuration. In multi-service deployment, ZAAS runs as an independent microservice (a separate JVM process) on a port dedicated to ZAAS. Starting with Zowe v3.4, the default and recommended single-service deployment mode bundles the standalone ZAAS component into a single JVM process alongside the Gateway, Discovery Service, and API Catalog at runtime. 

## Security updates in Zowe v3.6.0

Zowe v3.6.0 introduces several updates to API ML to strengthen security defaults, improve network validation, and tighten component authentication. These enhancements prioritize a secure-by-default posture which include breaking changes that may require updates to your `zowe.yaml` configuration to avoid disruptions during the upgrade process.

Configuration changes in Zowe v3.6.0 are in two key areas:

* **Modified existing properties**  
Configuration properties that existed in Zowe v3.5.0, but whose default value, source, or underlying behavior has changed.

* **Restrictive new properties**  
New properties introduced with strict default settings. An installation that functioned correctly in Zowe v3.5.0 may require explicit configuration of these new properties to retain previous behavior.

### Discovery Service enforces domain allowlist for service registration

In Zowe versions up to v3.5.0, the Discovery Service accepted any service registration without validating the hostnames or URLs the service advertised. The Discovery Service now strictly validates all URLs provided by registering services against an allowlist of domains, including:  
* hostname
* IP address
* home page URL
* health-check URL
* status page URL
* `apiml.*.swaggerUrl`
* `documentationUrl`
* `graphqlUrl`
* `externalUrl`
* `corsAllowedOrigins` 

**Operational Impact:**  
By default, if a service attempts to register using a domain or IP address that is not on the allowlist, the registration is rejected entirely.

**Required action:**  
The allowlist can be customized via the `zowe.network.allowedDomains` property. Items of this array should be enclosed in double quotes (`"`) to allow wildcards. If no wildcard is used, strict matching is assumed.
The following set of Zowe/IBM documentation domains is always allowed to permit core service registrations:  
* `www.ibm.com`
* `zowe.github.io`
* `www.zowe.org`
* `techdocs.broadcom.com`
   
The allowlist will already contain your system's hostnames. No action is needed for Zowe's own services.  
Update `zowe.network.allowedDomains` with other domains and/or IP addresses the instance connects to. 

**Example:**

```yaml
zowe:
  network:
    allowedDomains:
      - "*.zowe.org"
      - "ibm.com"
      - "10.0.0.5"
```

:::tip Temporary Mitigation:  
If registrations begin to fail after the upgrade, you can temporarily downgrade these rejections to warnings by setting the environment variable `ZWE_ONLY_WARN_ON_URL_NOT_ALLOWED=true`. This setting allows services to register while you identify and configure the missing domains.
:::

### Strict URL validation replaces `allowEncodedSlashes`

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

### CORS: default allowed origin for routed services narrowed

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

### Eureka Discovery Service credentials are now configurable

:::note
This change only applies to configurations where `verifyCertificates` is set to `DISABLED` (not recommended).
:::

**Operational Impact:**  
When certificate validation is disabled, the credentials used to authenticate against the Discovery Service's `/eureka/**` endpoints are no longer hardcoded to the literal values `eureka` / `password`
These values are now sourced from `apiml.discovery.userid` and `apiml.discovery.password` on every API ML service.

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

### Caching Service requires authentication when certificate validation is disabled

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


## Application Framework

### Breaking changes

* Updated Angular to Version 18 from Version 12. Apps built upon Angular, excluding iframe apps, need to be updated to be compatible with the V3 Desktop.


## CLI

### Breaking changes

| Change in Zowe V3 | Required action|
|-|-|
|Introduced a new format for error messages to improve clarity|Adjust Zowe CLI scripts that parse error messages to handle the new error format|
|Removed V1 profile support|Implement a team configuration or use Zowe CLI's built-in V1 profile conversion command: `zowe config convert`|
|Removed deprecated items - [CLI](https://github.com/zowe/zowe-cli/issues/1694) and [Imperative](https://github.com/zowe/zowe-cli/issues/1873)|Zowe CLI extenders or users of the Zowe Client Node.js SDK need to review the breaking changes and adjust their code to account for removed/changed classes, functions, and constants|

### Pre-release availability

* V3 pre-release versions are available via [npm](https://www.npmjs.com/package/@zowe/cli?activeTab=readme) under the 'next' tag

## Application Framework

### Breaking changes

* Updated Angular to Version 16 from Version 12
* Removed the core-js dependency
* Updated Webpack to version 5
* Updated Typescript to 4.9

## Explorer for Intellij IDEA

### Important updates

* Explorer for IntelliJ IDEA is now part of the Zowe Core
* Works with USS Files
* Works with Data Sets
* Works with JES Working Sets
* Interactive TSO Console

## Explorer for Visual Studio Code

### Breaking changes

| Change in Zowe V3 | Required action|
|-|-|
|Removed V1 profile support|Implement a team configuration or use Zowe Explorer's built-in V1 profile conversion functionality|
|Removed deprecated items - [Explorer for VSCode](https://github.com/zowe/zowe-explorer-vscode/issues/2238)|Zowe Explorer extenders or users of the Zowe Explorer APIs need to review the breaking changes and adjust their code to account for removed/changed classes, functions, and constants|
|Stored extension settings in local storage|Settings and history previously stored in the .vscode settings folder are no longer available. Users have to adjust their Zowe Explorer settings after updating to V3|

### Important updates

* Stored persistent settings in local storage
* Compared files in MVS view, the USS view, and across the two views

### Pre-release availability

* V3 pre-release versions are available via [GitHub releases](https://github.com/zowe/zowe-explorer-vscode/releases) or via the [Open VSX Registry](https://open-vsx.org/extension/Zowe/vscode-extension-for-zowe).

## Installation and Packaging

### Breaking changes

* Dropped the original V2 configuration management, `zowe.useConfigmgr=false`. (The Configuration Manager remains as the only supported method for configuring Zowe)

### Important updates

* Removed the dependency on Node.js for configuration
* Introduced the Zowe Server Install Wizard, a wizard to simplify configuration via the UI

## ZSS

### Breaking changes

* Run by default in 64 bit mode, `components.zss.agent.64bit=true`. 31-bit plugins cannot run in 64-bit ZSS, so you need to compile your plugins for the version of ZSS to be used. Note that only one version of ZSS can run at a time.
