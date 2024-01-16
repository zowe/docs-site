# Zowe Community statement on Support

Zowe is an Open Source project that is driven by the community. As such, any effort provided by the community is on the basis of providing the best effort.
If you need a support with SLA's, please consult our list of [Conformant Support Providers](https://openmainframeproject.org/our-projects/zowe-conformant-support-provider-program/).

## Validating pre-requisities

The Zowe community has access only to a limited set of hardware. This hardware limitation also limits our capacity to run automated test suites. The [Zowe Version 2 Support](#zowe-version-2-support) outlines what exactly we do.

## Out of support prerequisites

For pre-requisites that ultimately end their support, Zowe does not guarantee the provision of any associated support. For example, Zowe cannot provide support support for z/OS 2.2 as this release is already out of support. 
Therefore, changes that break support for such versions are not considered to be breaking changes. 

## Zowe Version 2 Support

Zowe requires certain technologies and is tested on a subset of all possible combination technologies. The table below visualizes what we are doing or know about. It captures support tested by three different groups - Users, Conformant Support Providers, Community. The tests have differing qualities - Automated, Manual, Ad-hoc

Levels

- Automated - The tests are run at least weekly in automated fashion, the preference is on every PR or nightly.
- Manual - There is a suite of tests that is being run manually for a specific minor version
- Ad-Hoc - Somebody runs Zowe against this configuration but no formal testing was done

**How is the table updated?**

The table on this page reflects the state concerning the testing efforts by various parties for the minor release to which this documentation belongs. The Automated status is kept across the minor releases, the Manual and Ad-Hoc is removed on version boundaries. If you want to add knowledge, please let us know. {There will probably be a simple form to post type of user}. The empty space means that there is no known information. 

### Technological pre-requisites

#### Zowe Server Side

##### API Mediation Layer

| Name of the technology  | Users     | Support Providers | Community |
|-------------------------|-----------|-------------------|-----------|
| **zOS**                 |           |                   |           |
| 2.4                     |           |                   |           |
| 2.5                     |           | Automated         | Automated |
| 3.1                     |           |                   |           |
| **zOSMF**               |           |                   |           |
| V2R4                    |           |                   |           |
| V2R5                    |           | Automated         | Automated |
| V3R1                    |           |                   |           |
| **Java**                |           |                   |           |
| 8                       |           | Automated         | Automated |
| 11                      |           |                   |           |
| 17                      |           |                   |           |

##### App Framework

| Name of the technology  | Users     | Support Providers | Community |
|-------------------------|-----------|-------------------|-----------|
| **zOS**                 |           |                   |           |
| 2.4                     |           |                   |           |
| 2.5                     |           | Automated         | Automated |
| 3.1                     |           |                   |           |
| **Node**                |           |                   |           |
| 18                      |           |                   | Automated |
| 20                      |           |                   | Automated |

#### Zowe Client Side

##### Zowe CLI

| Name of the technology  | Users     | Support Providers | Community |
|-------------------------|-----------|-------------------|-----------|
| **Node**                |           |                   |           |
| 18                      |           |                   | Automated |
| 20                      |           |                   | Automated |








##### API Mediation Layer

| Name of the technology  | Testing Level | Testing Providers |
|-------------------------|---------------|-------------------|
| **zOS**                 |               |                   |
| 2.5                     | Automated     | Community         |
| **Java**                |               |                   |
| 8                       | Ad-Hoc        | Users             |
| 11                      | Manual        | Support Providers |

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
