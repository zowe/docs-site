# Developing for Zowe SDKs

The Zowe SDKs are open source. You can contribute to add features, enhancements, and bug fixes to the source code.

The functionality is currently limited to the interfaces provided by IBM z/OSMF. As a plug-in developer, you can enhance the SDK by creating a packages that exposes programmatic APIs for your service.

For detailed contribution guidelines, see the following documents:
- [Node.js SDK guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/SDKGuidelines.md)
- **Coming soon! Python SDK guidelines**

===================

# Criteria for Extenders

## Naming

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | X |  |  | Must name your package(s) in the following format: `<service>-for-zowe-<language>-sdk` |

## Documentation

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | X |  |  | Provide a Changelog for every release |
|  | X |  |  | Clearly articulate support for Zowe V2 configuration files |
|  | X |  |  | Clearly articulate build and publish the package(s) |
|  | X |  |  | Disclose all 3rd party dependencies using a Software Bill of Materials (SBOM) |
|  | X |  |  | Provide API Documentation in the common location (readthedocs in zowe-docs) |


## Versioning

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
| | X | | | Must follow [Semantic Versioning](semver.org) guidelines |
|  | X |  |  | Must follow a pre-release labeling system where developers can make breaking changes |


## Security

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
| | X | | | Must be design with security in mind (secure by default) |
| | X | | | Must implement secure protocols (HTTPS or SFTP) |


## Maintenance

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  |  | X |  | Sample SDK |
|  | X |  |  | Load Zowe v2 configuration |
|  |  | X |  | Audit third party dependencies for vulnerabilities with tools corresponding to the programming language |
| | X |  | | Ability to install, build, and package from source |


## Functionality

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | X |  |  | Must use the core SDK provided by the corresponding programming language |


## Interoperability

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | X |  |  | Must provide utilities for https requests (REST Client) |
|  | X |  |  | Must provide utilities for profile configruation (nesting included) |
|  |  | X |  | Should provide utilities for authentication (e.g. APIML) |


## Installation and LTS Requirements

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | X |  |  | Package is compatible with the zowe-vN-lts version of the Core SDK for the corresponding programming language (where "N" = the latest "active" LTS release number) |
| | | X | | The absence of a label or tag should retrieve the same version as the most recent lts tag (Note: for V2 it will be `@zowe-v2-lts`) |
|  | X |   |  | Ability to install from source |
|  | X |  |   | Avoid breaking changes for LTS versions |
|  |  | X |   | Use prereleases when introducing breaking changes |

---
---
---

# Criteria for New Programming Languages

## Build automation

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | X |  |  | Audit |
|  | X |  |  | Linter |
|  |  | X |  | Formatter |
|  | X |  |  | Build |
|  | X |  |  | Test coverage |
|  | X |  |  | Deployment |
|  | X |  |  | Sonar scans |
|  |  | X |  | Changelog (example [file](https://github.com/zowe/zowe-cli/blob/master/packages/cli/CHANGELOG.md) and [workflow](https://github.com/zowe/zowe-cli/blob/master/.github/workflows/changelog.yml))|
|  |  | X |  | Issue triage |
|  |  | X |  | CodeQL |
|  | X |  |  | Contribution guidelines |

## Documentation

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | X |  |  | Provide a Changelog for every release |
|  | X |  |  | Clearly articulate support for Zowe V2 configuration files |
|  | X |  |  | Clearly articulate build and publish the package(s) |
|  | X |  |  | Disclose all 3rd party dependencies using a Software Bill of Materials (SBOM) |
|  | X |  |  | Provide a common location for extenders to publish their API docs (readthedocs in zowe-docs) |
|  | X |  |  | Provide API Documentation in the common location (readthedocs in zowe-docs) |



## Testing

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | X |  |  | Automated unit tests for the SDK |
|  | X |  |  | Written system tests for the SDK |
|  | X |  |  | 80% statement coverage for the SDK |
|  |  | X |  | Automated system tests for the SDK |


## Functionality

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | X |  |  | Must provide a core SDK which provides a REST client |
|  | X |  |  | Must provide a core SDK which supports Zowe V2 configuration files |
|  | X |  |  | Must provide basic z/OSMF functionality |
|  |  | X |  | Should provide a sample SDK for extenders to use as a template  |


## Z/OSMF Functionality

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | X |  |  | Must provide APIs to interact with Datasets (CRUD) |
|  | X |  |  | Must provide APIs to interact with USS Files (CRUD) |
|  | X |  |  | Must provide APIs to interact with z/OS Jobs (CRUD) |
|  |  | X |  | Should provide APIs to issue USS (SSH) commands |
|  |  | X |  | Should provide APIs to issue TSO commands |
|  |  | X |  | Should provide APIs to issue MVS (Console) commands |
|  |  | X |  | Should provide APIs to gather z/OS Logs |

## Maintenance

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  |  | X |  | Audit third party dependencies for vulnerabilities with tools corresponding to the programming language |
|  | X |  |  | Must list/identify all licenses used by the SDK |
|  | X |  |  | Must not include GNU Licenses on third party dependencies |
|  | X |  |  | Minimum 2 active maintainers with publishing rights |
|  |  | X |  | Provide a reproducible SHA checksum (at least 256 bit) for each release |
|  | X |  |  | GitHub issues should be timely acknowledged  |
