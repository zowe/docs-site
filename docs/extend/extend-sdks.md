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
|  | X |  |  | Must clearly articulate how they support Zowe V<sub>2</sub> configuration files |
|  | X |  |  | Must clearly articulate how they build and publish the package(s) |
|  | X |  |  | Must disclose all 3rd party dependencies using a Software Bill of Materials (SBOM) |

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
|  | X |  |  | Must provide basic z/OSMF fucntionality |
|  |  | X |  | Should provide a sample SDK for extenders to use as a template  |

## Interoperability

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
| Core SDK (profiles and REST API) | X |  |  |  |

## Installation

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  | X |  |  | Package is compatible with the zowe-vN-lts version of the Core SDK for the corresponding programming language (where "N" = the latest "active" LTS release number) |
| | | X | | The absence of a label or tag should retrieve the same version as the most recent lts tag (Note: for V2 it will be `@zowe-v2-lts`) | 


## Maintenance

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
|  |  | X |  | Sample SDK |
| Load Zowe v2 configuration | X |  |  |  |
| Validate 3rd party dependencies | ? |  |  | Audit with npm and other tools |

## Versioning

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
| | x | | | Must follow [Semantic Versioning](semver.org) guidelines |
|  | x |  |  | Must follow a pre-release labeling system where developers can make breaking changes |

=============
Notes from 12/5 meeting:


sections:
versioning
build automation
documentation
maintenance
interoperability
functionality
extensibility (sub section?)


THIS IS A CHECKLIST:
Create SDKs for new languages
    
- Best Practice: Have a sample SDK (maintenance or functionality)
- Required: Have a core SDK (profiles and REST API) (functionality and interoperability)
- Required: Have z/OSMF functionality (functionality) 
- Required: Load Zowe v2 configuration (multiple sections: doc, maintenance, functionality)
- Document packaging and publishing process (documentation)
    - Anyone should be able to package from source
    - Publishing process should have bus factor >1 (maintenance)
- Validate 3rd party dependencies (maintenance, documentation)
    - Audit with npm and other tools (maintenance)
    - Disclose to consumers with SBOM (documentation)

Extend existing SDKs for new products (like CICS and Endevor)
Documentation standards
- API documentation should go here for Python: https://zowe-client-python-sdk.readthedocs.io/en/latest/
- NodeJS SDK: https://docs.zowe.org/stable/typedoc/index.html
- Example on how to collaborate
    - https://github.com/zowe/zowe-cli-web-help-generator
    - https://docs.zowe.org/stable/web_help/index.html
