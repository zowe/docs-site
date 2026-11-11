# Important updates in Zowe V3

Zowe 3.0 brings a range of major changes in Zowe functionality, including *breaking changes*, or modifications that require updates to avoid disruptions in your applications.

Review this article for details about changes to various Zowe components that are introduced in Zowe V3, and any required actions you need to take.

## API Mediation Layer (API ML)

### Breaking changes

| Change in  Zowe V3                                                                                                            | Required action                                                                                                                                                                                                                                                                                                                                                                                                        |
|-------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Authentication endpoints will not support the route `/api/v1/gateway`, and instead will support only `/gateway/api/v1`        | If you use the endpoints directly, change the URLs to start with `/gateway/api/v1`. If you use ZAAS client to integrate with API Mediation Layer, no action is required as the change is handled in the ZAAS client code.                                                                                                                                                                                              |
| Spring Enabler will be updated to Spring Boot 3 and Spring 6. Spring Boot 2 and Spring 5 versions will no longer be supported | Upgrade extending services based on the Spring Enabler to Spring Boot 3 and Spring 6.                                                                                                                                                                                                                                                                                                                                  |
| Datasets API will be archived                                                                                                 | This service was disabled by default in Version 2. If you enable the service via `components.data-sets.enabled: true` and use the APIs documented in [Data sets Swagger](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/zowe/docs-site/docs-staging/api_definitions/datasets.json), it is necessary to move to the usage of the similar z/OSMF endpoints.                                          |
| Jobs API will be archived                                                                                                     | The service was disabled by default in Version 2. If you enable the service via `components.jobs.enabled: true` and use the APIs documented in [Jobs Swagger](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/zowe/docs-site/docs-staging/api_definitions/jobs.json), it is necessary to move to the usage of the similar z/OSMF endpoints.                                                         |
| Metrics service will be archived                                                                                              | The Metrics service was in Technical Preview. Currently, there is no replacement. In V3, the Open Telemetry standard will be implemented, which will serve as a replacement.                                                                                                                                                                                                                                                    |
| IMS API will be archived                                                                                                      | The IMS API service was not fully supported. If you were using the API, please reach out to the IBM team for follow-up steps.                                                                                                                                                                                                                                                                                                  |
| Java 17 will be required for the API Mediation Layer to run                                                                   | For V3, it is necessary to update z/OS to version 2.5 or later as this brings support of Java 17. It is necessary to install Java 17 and provide the path to Java 17 to Zowe Java configuration.                                                                                                                                                                                                                       |
| z/OSMF in version V2R5 with APAR PH12143 applied (JWT setup)                                                                  | If you are running a version of z/OS before 3.1, validate that the PH12143 APAR was applied to the z/OSMF installation used by Zowe. The value `auto` is no longer supported. For v3R1, validate that the JWT support is enabled. If you do not want to enable JWT support, make sure that you set the value of `components.gateway.apiml.security.auth.zosmf.jwtAutoconfiguration` to `ltpa`. The `ltpa` option cannot be used with hardware accelerated ICSF Keyrings. See [example-zowe.yaml](https://github.com/zowe/zowe-install-packaging/blob/v3.x/staging/example-zowe.yaml) for new component values. |
| Configuration of keyrings will require transformation from `safkeyring:////` to `safkeyring://`                               | If your Zowe configuration contains `safkeyring:////`, change this part to `safkeyring://`.                                                                                                                                                                                                                                                                                                                            |
| Support access to z/OSMF only through `/ibmzosmf` route. V3 will not support access through the `/zosmf` route                | If you use z/OSMF via `{apimlUrl}/zosmf/{zosmfEndpoint}` it is necessary to move to `{apimlUrl}/ibmzosmf/{zosmfEndpoint}.`                                                                                                                                                                                                                                                                                                    |
### Important API ML updates

The current API Gateway contains the Authentication and Authorization Service. This service will be separated as a standalone service. The Authentication and Authorization Service is the only API ML service that directly requires z/OS.


## Application Framework

### Breaking changes

* Updated Angular to Version 18 from Version 12. Apps built upon Angular, excluding iframe apps, will need to be updated to be compatible with the V3 Desktop.


## CLI

### Breaking changes

| Change in Zowe V3 | Required action|
|-|-|
|Introducing a new format for error messages to improve clarity|Adjust Zowe CLI scripts that parse error messages to handle the new error format|
|Removing V1 profile support|Implement a team configuration or use Zowe CLI's built-in V1 profile conversion command: `zowe config convert`|
|Removing deprecated items - [CLI](https://github.com/zowe/zowe-cli/issues/1694) and [Imperative](https://github.com/zowe/zowe-cli/issues/1873)|Zowe CLI extenders or users of the Zowe Client Node.js SDK will need to review the breaking changes and adjust their code to account for removed/changed classes, functions, and constants|

### Pre-release availability

* V3 pre-release versions are available via [npm](https://www.npmjs.com/package/@zowe/cli?activeTab=readme) under the 'next' tag

## Application Framework

### Breaking changes

* Updating Angular to Version 16 from Version 12
* Removing the core-js dependency
* Updating Webpack to version 5
* Updating Typescript to 4.9

## Explorer for Intellij IDEA

### Important updates

* Explorer for IntelliJ IDEA will be part of the Zowe Core
* Working with USS Files
* Working with Data Sets
* Working with JES Working Sets
* Interactive TSO Console

## Explorer for Visual Studio Code

### Breaking changes

| Change in Zowe V3 | Required action|
|-|-|
|Removing V1 profile support|Implement a team configuration or use Zowe Explorer's built-in V1 profile conversion functionality|
|Removing deprecated items - [Explorer for VSCode](https://github.com/zowe/zowe-explorer-vscode/issues/2238)|Zowe Explorer extenders or users of the Zowe Explorer APIs will need to review the breaking changes and adjust their code to account for removed/changed classes, functions, and constants|
|Storing extension settings in local storage|Settings and history previously stored in the .vscode settings folder will no longer be available. Users will have to adjust their Zowe Explorer settings after updating to V3|

### Important updates

* Storing persistent settings in local storage
* Comparing files in MVS view, the USS view, and across the two views

### Pre-release availability

* V3 pre-release versions are available via [GitHub releases](https://github.com/zowe/zowe-explorer-vscode/releases) or via the [Open VSX Registry](https://open-vsx.org/extension/Zowe/vscode-extension-for-zowe).

## Installation and Packaging

### Breaking changes

* Dropping the original V2 configuration management, `zowe.useConfigmgr=false`. (The Configuration Manager remains as the only supported method for configuring Zowe)

### Important updates

* Removing the dependency on Node.js for configuration
* Introducing _ZEN_, a wizard to simplify configuration via the UI

## ZSS

### Breaking changes

* Run by default in 64 bit mode, `components.zss.agent.64bit=true`. 31-bit plugins cannot run in 64-bit ZSS, so you need to compile your plugins for the version of ZSS to be used. Note that only one version of ZSS can run at a time.
