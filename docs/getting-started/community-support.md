# Zowe Community statement on Support

Zowe is an Open Source project that's being driven by the community. As such any effort provided by the community in on best-effort basis.
If you need a support with SLA's please consult our list of [Conformant Support Providers](https://openmainframeproject.org/our-projects/zowe-conformant-support-provider-program/)

## Validating pre-requisities

The Zowe community has access only to limited set of hardware. This limits our capacity to run automated test suites. The [Supported Technologies for Version 2](#supported-technologies-for-version-2-by-zowe) outlines what exactly we do.

## Out of support prerequisites

For the pre-requisites that end their support Zowe doesn't guarantee any support for running. E.g. Zowe doesn't have to support z/OS 2.2 as it's already out of support. 
As such changes that break support for such version aren't considered as breaking change. 

## Supported Technologies for Version 2 by Zowe

The following table represents list of the pre-requisites and it's versions that we as the Open Community regularly test via automated test suite in public. The support providers
test also other configuration and features, that we can't test on the Open Hardware as of now. To verify whether your version is supported, reach out to any of the providers. 

### Technological pre-requisites

The following table covers information about the level of testing received by different projects for different prerequisites and technological features. 

- There are three levels of testing - Ad-Hoc, Manual, Automated
- There are three different types of stakeholders that does this type of testing - Community, Users, Support Providers

#### Zowe Server Side

##### API Mediation Layer

| Name of the technology  | Testing Level | Testing Providers |
|-------------------------|---------------|-------------------|
| **zOS**                 |               |                   |
| 2.5                     | Automated     | Community         |
| **Java** |              |               |                   |
| 8 | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| 11 | In Progress | Yes | N/A | N/A | N/A | N/A | N/A | In Progress |
| 17 | In Progress | In Progress | N/A | N/A | N/A | N/A | N/A | In Progress |
| 21 | N/A | No | N/A | Yes | N/A | N/A | N/A | No |
| **Node.js** | | | | | | | | |
| 16 | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| 18 | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| **zOSMF** | | | | | | | | |
| V2R5 | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |

### Technological Features

| Name of the technology  | Zowe | API Mediation Layer | CLI | Intellij Plugin | Node.js Client SDK | Zowe Application Framework | Zowe Explorer | Zowe System Services (ZSS) |
|----------------------|------|---------------------|-----|-----------------|--------------------|----------------------------|---------------|----------------------------|
| **TLS** | | | | | | | | |
| 1.2 | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| **IP** | | | | | | | | |
| V4 | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |

#### Zowe Client Side

| Name of the technology  | Zowe | API Mediation Layer | CLI | Intellij Plugin | Node.js Client SDK | Zowe Application Framework | Zowe Explorer | Zowe System Services (ZSS) |
|----------------------|------|---------------------|-----|-----------------|--------------------|----------------------------|---------------|----------------------------|
| **zOS** | | | | | | | | |
| 2.5 | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| **Java** | | | | | | | | |
| 8 | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| 11 | In Progress | Yes | N/A | N/A | N/A | N/A | N/A | In Progress |
| 17 | In Progress | In Progress | N/A | N/A | N/A | N/A | N/A | In Progress |
| 21 | N/A | No | N/A | Yes | N/A | N/A | N/A | No |
| **Node.js** | | | | | | | | |
| 16 | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| 18 | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| **zOSMF** | | | | | | | | |
| V2R5 | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |

### Technological Features

| Name of the technology  | Zowe | API Mediation Layer | CLI | Intellij Plugin | Node.js Client SDK | Zowe Application Framework | Zowe Explorer | Zowe System Services (ZSS) |
|----------------------|------|---------------------|-----|-----------------|--------------------|----------------------------|---------------|----------------------------|
| **TLS** | | | | | | | | |
| 1.2 | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| **IP** | | | | | | | | |
| V4 | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
