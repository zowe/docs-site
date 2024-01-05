# Zowe Community statement on Support

Zowe is an Open Source project that is driven by the community. As such, any effort provided by the community is on the basis of providing the best effort.
If you need a support with SLA's, please consult our list of [Conformant Support Providers](https://openmainframeproject.org/our-projects/zowe-conformant-support-provider-program/).

## Validating pre-requisities

The Zowe community has access only to a limited set of hardware. This hardware limitation also limits our capacity to run automated test suites. The [Supported Technologies for Version 2](#supported-technologies-for-version-2-by-zowe) outlines what exactly we do.

## Out of support prerequisites

For pre-requisites that ultimately end their support, Zowe does not guarantee the provision of any associated support. For example, Zowe cannot provide support support for z/OS 2.2 as this release is already out of support. 
Therefore, changes that break support for such version are not considered to be breaking changes. 

## Supported Technologies for Version 2 by Zowe

The following table represents a list of prerequisites and those versions that we, as the Open Community, regularly test via the automated test suite in public. Support providers also
test other configuration and features that currently the Zowe community cannot test on the Open Hardware. To verify whether your version is supported, contact any of the providers. 

### Technological pre-requisites

The following table covers information about the level of testing received by different projects for different prerequisites and technological features. 

- There are three levels of testing - Ad-Hoc, Manual, and Automated
- There are three different types of stakeholders that perform this type of testing - Community, Users, and Support Providers

#### Zowe Server Side

##### API Mediation Layer

| Name of the technology  | Testing Level | Testing Providers |
|-------------------------|---------------|-------------------|
| **zOS**                 |               |                   |
| 2.5                     | Automated     | Community         |
| **Java**                |               |                   |
| 8                       | Ad-Hoc        | Users             |
| 11                      | Manual        | Support Providers |


##### API Mediation Layer

| Name of the technology  | Users     | Support Providers | Community |
|-------------------------|-----------|-------------------|-----------|
| **zOS**                 |           |                   |           |
| 2.5                     | Automated | Automated         | Automated |
| **Java**                |           |                   |           |
| 8                       |           | Automated         | Manual    |
| 11                      | Ad-Hoc    |                   |           |

#### Zowe server side

- There are three levels of testing $${\color{red}Ad-hoc}$$ $${\color{yellow}Manual}$$ $${\color{green}Automated}$$

| Name of the technology  | API Mediation Layer | Zowe Application Framework | Zowe System Services (ZSS) |
|-------------------------|---------------------|----------------------------|----------------------------|
| **zOS**                 |                     |                            |                            |
| 2.5                     | $${\color{yellow}Community}$$ $${\color{green}Vendors}$$ | $${\color{red}Users}$$ | $${\color{yellow}Community}$$ $${\color{green}Vendors}$$ | 




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
