# Breaking Changes and Important Updates in Zowe v3

The upcoming release of Zowe v3 will bring a range of major changes in Zowe functionality. Review this article for details about changes to various Zowe components to be introduced in Zowe v3.

## API Mediation Layer (API ML)

### Breaking Changes to API ML

* Authentication endpoints will not support the route `/api/v1/gateway`, and instead will support only `/gateway/api/v1`
* Spring Enabler will be updated to Spring Boot 3 and Spring 6. Spring Boot 2 and Spring 5 versions will no longer be supported.
* Datasets API will be archived
* Jobs API will be archived
* Metrics service will be archived
* IMS API will be archived
* Java 17 will be required for the API Mediation Layer to run
* z/OSMF in version V2R5 with APAR PH12143 applied
* Configuration of keyrings will require transformation from `safkeyring:////` to `safkeyring://`

### Important updates

The current API Gateway contains Authentication and Authorization Services. This service will be separated as a standalone service. This is the only API Mediation Layer service that needs z/OS directly
 
## Application Framework

### Breaking changes

* Updating Angular to Version 16 from Version 12
* Removing the core-js dependency
* Updating Webpack to version 5
* Updating Typescript to 4.9

## CLI

### Breaking changes

* Introducing a new format for error messages to improve clarity
* Removing V1 profile support
* Removing deprecated items - [CLI](https://github.com/zowe/zowe-cli/issues/1694) and [Imperative](https://github.com/zowe/zowe-cli/issues/1873)

### Pre-release availability

* V3 pre-release versions are available via [npm](https://www.npmjs.com/package/@zowe/cli?activeTab=readme) under the 'next' tag

## Explorer for IntelliJ IDEA

### Important updates

* Explorer for IntelliJ IDEA will be part of the Zowe Core
* Working with USS Files
* Working with Data Sets
* Working with JES Working Sets
* Interactive TSO Console

## Explorer for Visual Studio Code

### Breaking changes

* Removing V1 profile support
* Removing deprecated items - [Explorer for VSCode](https://github.com/zowe/zowe-explorer-vscode/issues/2238)
* Changing profile creation menus
* Storing extension settings in local storage

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
