# Developing for Zowe SDKs

The Zowe SDKs are open source. You can contribute to add features, enhancements, and bug fixes to the source code.

The functionality is currently limited to the interfaces provided by IBM z/OSMF. As a plug-in developer, you can enhance the SDK by creating a packages that exposes programmatic APIs for your service.

For detailed contribution guidelines, see the following documents:
- [Node.js SDK guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/SDKGuidelines.md)
- **Coming soon! Python SDK guidelines**

===================

## Build automation

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
| x | x | x | x | x |

## Documentation

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
| Load Zowe v2 configuration | X |  |  |  |
| Document packaging and publishing process | ? |  |  |  |
| Validate 3rd party dependencies | ? |  |  | Disclose to consumers with SBOM |

## Extensibility 

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
| x | x | x | x | x |

## Functionality

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
| Sample SDK |  | X |  |  |
| Core SDK (profiles and REST API) | X |  |  |  |
| Load Zowe v2 configuration | X |  |  |  |
| z/OSMF functionality | X |  |  |  |

## Interoperability

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
| Core SDK (profiles and REST API) | X |  |  |  |

## Maintenance

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
| Sample SDK |  | X |  |  |
| Load Zowe v2 configuration | X |  |  |  |
| Validate 3rd party dependencies | ? |  |  | Audit with npm and other tools |

## Versioning

| Item | Required | Best Practice | Conformant | Criteria |
|-----|-----|-----|-----|-----|
| x | x | x | x | x |

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
