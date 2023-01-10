# Developing for Zowe SDKs

The Zowe SDKs are open source. You can contribute to add features, enhancements, and bug fixes to the source code.

The functionality is currently limited to the interfaces provided by IBM z/OSMF. As a plug-in developer, you can enhance the SDK by creating a packages that exposes programmatic APIs for your service.

For detailed contribution guidelines, see the following documents:
- [Node.js SDK guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/SDKGuidelines.md)
- **Coming soon! Python SDK guidelines**

===================

## LTS Requirements

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | x | x | x | x |

## Naming

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | X |  |  | Must name your package(s) in the following format: `<service>-for-zowe-sdk` |


## Build automation

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
| x | x | x | x | x |

## Documentation

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | X |  |  | Clearly articulate support for Zowe V2 configuration files |
|  | X |  |  | Clearly articulate build and publish the package(s) |
|  | X |  |  | Must disclose all 3rd party dependencies using a Software Bill of Materials (SBOM) |
|  | X |  |  | Provide API Documentation in the common location (readthedocs in zowe-docs) |

## Extensibility

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
| x | x | x | x | x |

## Functionality (Extenders)

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | X |  |  | Must use the core SDK provided by the corresponding programming language |

## Functionality (New Language)

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

## Interoperability

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | X |  |  | Must provide utilities for https requests (REST Client) |
|  | X |  |  | Must provide utilities for profile configruation (nesting included) |
|  |  | X |  | Should provide utilities for authentication (e.g. APIML) |


## Installation

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | X |  |  | Package is compatible with the zowe-vN-lts version of the Core SDK for the corresponding programming language (where "N" = the latest "active" LTS release number) |
| | | X | | The absence of a label or tag should retrieve the same version as the most recent lts tag (Note: for V2 it will be `@zowe-v2-lts`) |
| | X |  | | Ability to install from source |


## Testing (New Language)

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | X |  |  | Automated unit tests for the SDK |
|  | X |  |  | Written system tests for the SDK |
|  | X |  |  | 80% statement coverage for the SDK |
|  |  | X |  | Automated system tests for the SDK |

## Maintenance (Extenders)

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  |  | X |  | Sample SDK |
|  | X |  |  | Load Zowe v2 configuration |
|  |  | X |  | Audit third party dependencies for vulnerabilities with tools corresponding to the programming language |
| | X |  | | Ability to build and package from source |


## Maintenance (New Language)

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  |  | X |  | Audit third party dependencies for vulnerabilities with tools corresponding to the programming language |
|  | X |  |  | Must list/identify all licenses used by the SDK |
|  | X |  |  | Must not include GNU Licenses on third party dependencies |
|  | X |  |  | Minimum 2 active maintainers with publishing rights |
|  |  | X |  | Provide a reproducible SHA checksum (at least 256 bit) for each release |


## Versioning

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
| | x | | | Must follow [Semantic Versioning](semver.org) guidelines |
|  | x |  |  | Must follow a pre-release labeling system where developers can make breaking changes |


## Security

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
| | x | | | Must be design with security in mind (secure by default) |
| | x | | | Must implement secure protocols (HTTPS or SFTP) |


=============
Notes from 12/5 meeting:

THIS IS A CHECKLIST:
Create SDKs for new languages


Documentation standards
- API documentation should go here for Python: https://zowe-client-python-sdk.readthedocs.io/en/latest/
- NodeJS SDK: https://docs.zowe.org/stable/typedoc/index.html
- Example on how to collaborate
    - https://github.com/zowe/zowe-cli-web-help-generator
    - https://docs.zowe.org/stable/web_help/index.html
