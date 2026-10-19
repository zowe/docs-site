# Important updates in Zowe V3

Zowe v3 brings a range of major changes in Zowe functionality, including *breaking changes*, or modifications that require updates to avoid disruptions in your applications.

Review this article for details about changes to various Zowe components introduced in Zowe V3, and any required actions you need to take.

## API Mediation Layer (API ML)

### Breaking changes

| Change in  Zowe V3                                                                                                            | Required action                                                                                                                                                                                                                                                                                                                                                                                                        |
|-------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Authentication endpoints do not support the route `/api/v1/gateway`, and instead support only `/gateway/api/v1`        | If you use the endpoints directly, change the URLs to start with `/gateway/api/v1`. If you use ZAAS client to integrate with API Mediation Layer, no action is required as the change is handled in the ZAAS client code.                                                                                                                                                                                              |
| API Gateway operational endpoints are now protected by default. The property `components.gateway.apiml.health.protected` now defaults to `true`.<br /><br />This setting governs access to the following endpoints:<br />• `/application/health`<br />• `/application/info`<br />• `/application/version`<br />• `/gateway/version`<br />• `/gateway/api/v1/version`<br /><br />Unauthenticated requests will return HTTP `401`. | **(Option 1) Update clients to authenticate (Recommended):**<br />Update monitoring systems, availability probes, readiness checks, automated scripts, and diagnostic tools to provide valid credentials (Basic authentication or Bearer JWT).<br /><br />**(Option 2) Revert to open access:**<br />Alternatively, explicitly set `components.gateway.apiml.health.protected: false` in `zowe.yaml` if unauthenticated access is required.<br /> *Security Warning:*<br /> Setting this property to `false` exposes the Gateway health, information, and version endpoints without authentication. Use the default `true` setting in production unless unauthenticated monitoring is required and access is restricted through another trusted control. |
| Spring Enabler has been updated to Spring Boot 3 and Spring 6. Spring Boot 2 and Spring 5 versions are no longer be supported. | Upgrade extending services based on the Spring Enabler to Spring Boot 3 and Spring 6.                                                                                                                                                                                                                                                                                                                                  |
| Datasets API is archived                                                                                                 | This service was disabled by default in Version 2. If you enable the service via `components.data-sets.enabled: true` and use the APIs documented in [Data sets Swagger](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/zowe/docs-site/docs-staging/api_definitions/datasets.json), update your integration to use the equivalent z/OSMF endpoints.                                          |
| Jobs API is archived                                                                                                     | The service was disabled by default in Version 2. If you enable the service via `components.jobs.enabled: true` and use the APIs documented in [Jobs Swagger](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/zowe/docs-site/docs-staging/api_definitions/jobs.json), update your integration to use the equivalent z/OSMF endpoints.                                                        |
| Metrics Service is archived                                                                                              | The Metrics service was in Technical Preview and has been removed. In V3, the Metrics Service is replaced by the OpenTelemetry standard.                                                                                                                                  |
| IMS API is archived                                                                                                      | The IMS API service was not fully supported. If you were using the API, please reach out to the IBM team for follow-up steps.                                                                                                                                                                                                                                                                                                  |
| Java 17 is required for the API Mediation Layer to run                                                                   | For V3, it is necessary to update z/OS to version 2.5 or later as this brings support of Java 17. Ensure that you installed Java 17 and provide the path to the Zowe Java configuration.                                                                                                                                                                                                                       |
| z/OSMF in version V2R5 with APAR PH12143 applied (JWT setup)                                                                  | If you are running a version of z/OS before 3.1, validate that the PH12143 APAR was applied to the z/OSMF installation used by Zowe. The value `auto` is no longer supported. For v3R1, validate that the JWT support is enabled. If you do not want to enable JWT support, make sure that you set the value of `components.gateway.apiml.security.auth.zosmf.jwtAutoconfiguration` to `ltpa`. The `ltpa` option cannot be used with hardware accelerated ICSF Keyrings. See [example-zowe.yaml](https://github.com/zowe/zowe-install-packaging/blob/v3.x/staging/example-zowe.yaml) for new component values. |
| Configuration of keyrings will require transformation from `safkeyring:////` to `safkeyring://`                               | If your Zowe configuration contains `safkeyring:////`, change this part to `safkeyring://`.                                                                                                                                                                                                                                                                                                                            |
| Support access to z/OSMF only through `/ibmzosmf` route. V3 will not support access through the `/zosmf` route                | If you use z/OSMF via `{apimlUrl}/zosmf/{zosmfEndpoint}`, ensure that you move to `{apimlUrl}/ibmzosmf/{zosmfEndpoint}.`                                                                                                                                                                                                                                                                                                |

### Important API ML updates in Zowe v3

Prior to Zowe v3, the API Gateway directly contained the code for the Authentication and Authorization Service (ZAAS). In Zowe v3, ZAAS was architecturally decoupled into a standalone component with its own configuration, as ZAAS is the only API ML service that natively requires direct interaction with z/OS security services (such as z/OSMF and SAF).

While ZAAS is now a standalone service, how ZAAS runs depends on your deployment configuration. In multi-service deployment, ZAAS runs as an independent microservice (a separate JVM process) on a port dedicated to ZAAS. Starting with Zowe v3.4, the default and recommended single-service deployment mode bundles the standalone ZAAS component into a single JVM process alongside the Gateway, Discovery Service, and API Catalog at runtime. 

### API ML security updates in Zowe v3.6.0

Zowe v3.6.0 introduces several updates to the API Mediation Layer to strengthen security defaults, improve network validation, and tighten component authentication. These enhancements prioritize a secure-by-default posture and include breaking changes that may require updates to your zowe.yaml configuration.

:::caution Important
For detailed configuration instructions and mitigation steps introduced to API ML in Zowe v3.6, see [API ML V3.6 upgrade and security enhancements](./api-ml-v3.6-upgrade-and-security-enhancements).
:::

Zowe v 3.6 introduces the following key security enhancements and breaking changes:

* **Strict URL Validation**  
The Gateway now rejects encoded slashes, backslashes, and semicolons in routed traffic by default, replacing the deprecated allowEncodedSlashes property.  
For details, see [Strict URL validation replaces `allowEncodedSlashes`](./api-ml-v3.6-upgrade-and-security-enhancements.md#strict-url-validation-replaces-allowencodedslashes).

* **Domain Allowlist Enforcement**  
The Discovery Service and API Catalog now strictly validate service registration and API document URLs against a configurable allowlist (`zowe.network.allowedDomains`)`.  
For details, see [Discovery Service enforces allowlist for service registration](./api-ml-v3.6-upgrade-and-security-enhancements.md#discovery-service-enforces-domain-allowlist-for-service-registration).

* **Cross-Site Request Protection**  
The Gateway validates Sec-Fetch-* browser headers, rejecting cross-site requests (including WebSocket handshakes) unless validated by the CORS layer.  
For details, see [Cross-site requests are rejected by Fetch Metadata validation](./api-ml-v3.6-upgrade-and-security-enhancements.md#cross-site-requests-are-rejected-by-fetch-metadata-validation).

* **JSON Content-Type Requirement**  
Login requests containing a body are now rejected unless they explicitly include the Content-Type: application/json header.  
For details, see [Login requests with a body must use `Content-Type: application/json`](./api-ml-v3.6-upgrade-and-security-enhancements.md#login-requests-with-a-body-must-use-content-type-applicationjson).

* **Narrowed CORS Default Origins**  
For routed services using Gateway-managed CORS without explicitly defined origins, the default allowed origin is now restricted to the API Gateway's base URL.  
For details, see [CORS: default allowed origin for routed services narrowed](./api-ml-v3.6-upgrade-and-security-enhancements.md#cors-default-allowed-origin-for-routed-services-narrowed).

* **Disabled Certificate Validation Stricter Defaults**  
When certificate validation is disabled, Discovery Service credentials are now configurable rather than hardcoded, and the Caching Service now explicitly requires HTTP Basic authentication.  
For details, see the following topics:  
  * [Discovery Service credentials are now configurable](./api-ml-v3.6-upgrade-and-security-enhancements.md#discovery-service-credentials-are-now-configurable).
  * [Caching Service requires authentication when certificate validation is disabled](./api-ml-v3.6-upgrade-and-security-enhancements.md#caching-service-requires-authentication-when-certificate-validation-is-disabled).

* **Actuator Endpoint Authorization**  
Modifiable actuator endpoints (such as /application/loggers) now require the authenticated user to have **CONTROL** access to the `APIML.DEBUG SAF` profile.  
For details, see [Modifiable actuator endpoints require SAF authorization](./api-ml-v3.6-upgrade-and-security-enhancements.md#modifiable-actuator-endpoints-require-saf-authorization).

* **Endpoint and Header Removals**  
The onboarding conformance and validation endpoints have been removed. HSTS and strict X-Frame-Options headers are now enforced unconfigurably.  
For details, see [Removed endpoints and security headers](./api-ml-v3.6-upgrade-and-security-enhancements.md#removed-endpoints-and-security-headers).

* **Token Revocation Store**  
Personal Access Token revocation is now backed by the Caching Service, requiring property alignment between the ZAAS and Caching Service configurations.  
For details, see [Personal Access Token revocation store](./api-ml-v3.6-upgrade-and-security-enhancements.md#personal-access-token-revocation-store).


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
