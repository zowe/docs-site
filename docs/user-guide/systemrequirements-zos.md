---
keywords: [security permissions, system permissions, monacat]
---
# Addressing z/OS requirements

Before installing Zowe&trade; z/OS components, ensure that your z/OS environment meets the prerequisites. The prerequisites you need to install depend on what Zowe z/OS components you want to use and how you want to install and configure Zowe on z/OS. Assess your installation scenario and install the prerequisites that meet your needs. 

:::info**Required roles:** system programmer, security administrator
:::

All Zowe server components can be installed on a z/OS environment, while some can alternatively be installed on Linux or zLinux via Docker. The components provide a number of services that are accessed through a web browser such as an API catalog and a web desktop.  

- [System requirements](#system-requirements)
  - [Supported Technologies for Version 2](#supported-technologies-for-version-2)
  - [z/OS system requirements](#zos-system-requirements)
    - [z/OS](#zos)
    - [Node.js](#nodejs)
    - [Java](#java)
    - [z/OSMF (Optional)](#zosmf-optional)
  - [User ID requirements](#user-id-requirements)
    - [ZWESVUSR](#zwesvusr)
    - [ZWESIUSR](#zwesiusr)
    - [ZWEADMIN](#zweadmin)
    - [zowe_user](#zowe_user)
  - [Network requirements](#network-requirements)
  - [Zowe Containers requirements](#zowe-containers-requirements)
  - [Zowe Desktop requirements (client PC)](#zowe-desktop-requirements-client-pc)
  - [Browser limitations in API Catalog](#browser-limitations-in-api-catalog)
  - [Feature requirements](#feature-requirements)
    - [Multi-Factor Authentication (MFA)](#multi-factor-authentication-mfa)
    - [Single Sign-On (SSO)](#single-sign-on-sso)
  - [Memory requirements](#memory-requirements)


## Supported Technologies for Version 2

Zowe can claim support only for versions and technologies that Zowe can actually test on the Open Infrastructure. There is linked question on whether and how can Vendors claim anything. 

### Technological pre-requisites

| Name of the technology  | Zowe | API Mediation Layer | CLI | Intellij Plugin | Node.js Client SDK | Zowe Application Framework | Zowe Explorer | Zowe System Services (ZSS) |
|----------------------|------|---------------------|-----|-----------------|--------------------|----------------------------|---------------|----------------------------|
| **zOS** | | | | | | | | |
| 2.3 | | | | | | | | |
| 2.4 | | | | | | | | |
| 2.5 | | | | | | | | |
| 3.1 | | | | | | | | |
| **Java** | | | | | | | | |
| 8 | | Supported | | | | | | |
| 11 | | [Supported](https://github.com/zowe/api-layer/issues/2955) | | | | | | |
| 17 | | [In Progress](https://github.com/zowe/api-layer/issues/3113) | | | | | | |
| **Node.js** | | | | | | | | |
| 16 | | | | | | | | |
| 18 | | | | | | | | |
| 20 | | | | | | | | |
| **Python** | | | | | | | | |
| 3.10 | | N/A | | | | | | |
| 3.11 | | N/A | | | | | | |
| **zOSMF** | | | | | | | | |
| V2R3 | | | | | | | | |
| V2R4 | | | | | | | | |
| V2R5 | | | | | | | | |

### Technological Features

| Name of the technology  | Zowe | API Mediation Layer | CLI | Intellij Plugin | Node.js Client SDK | Zowe Application Framework | Zowe Explorer | Zowe System Services (ZSS) |
|----------------------|------|---------------------|-----|-----------------|--------------------|----------------------------|---------------|----------------------------|
| **TLS** | | | | | | | | |
| 1.2 | | | | | | | | |
| 1.3 | | | | | | | | |
| **AT-TLS** | | | | | | | | |
| Unversioned | | | | | | | | |
| **IP** | | | | | | | | |
| V4 | | | | | | | | |
| V6 | | | | | | | | |
| **MFA** | | | | | | | | |
| CA AAM | | | | | | | | |
| IBM MFA | | | | | | | | |
| Another provider | | | | | | | | |


## z/OS system requirements

Be sure your z/OS system meets the following prerequisites:

### z/OS

- z/OS version is in active support, such as Version 2.4, 2.5, and 3.1

  :::note**Notes:**
  * Zowe Version 2.11 or higher is required when using z/OS Version 3.1.
  * z/OS V2.3 reached end of support on 30 September, 2022. For more information, see the [z/OS v2.3 lifecycle details](https://www.ibm.com/support/pages/zos23x-withdrawal-notification).
  :::

- zFS volume has at least 1200 mb of free space for Zowe server components, the corresponding keystore, instance configuration files and logs, and third-party plug-ins.

- (Optional, recommended) z/OS OpenSSH
  
  Some features of Zowe require SSH, such as the SSH terminal of the Desktop. Install and manage Zowe via SSH, as an alternative to OMVS over TN3270. 

- (Optional) Parallel Sysplex.
  
  To deploy Zowe for high availability, a Parallel Sysplex environment is recommended. For more information, see [Configuring Sysplex for high availability](configure-sysplex.md).

### Node.js

- Node.js v16.x or v18.x

  Node is not included with z/OS so must be installed separately.  To install Node.js on z/OS, follow the instructions in [Addressing Node.js requirements](install-nodejs-zos.md).
  
  :::tip
  If you are a software vendor building extensions for Zowe, we recommend you tag your plug-ins. For more information, see [Tagging on z/OS](../extend/extend-desktop/mvd-buildingplugins.md#tagging-plugin-files-on-z-os).
  :::

### Java 

- IBM SDK for Java Technology Edition V8

### z/OSMF (Optional) 

- (Optional, recommended) IBM z/OS Management Facility (z/OSMF) Version 2.4, Version 2.5, or Version 3.1.

  z/OSMF is included with z/OS so does not need to be separately installed. If z/OSMF is present, Zowe  detects z/OSMF during configuration and uses z/OSMF for the following purposes:

  - Authenticating TSO users and generating a single sign-on JSON Web Token (JWT). Ensure that the [z/OSMF JWT Support is available via APAR and associated PTFs](https://www.ibm.com/support/pages/apar/PH12143). If z/OSMF is not available, Zowe is still able to provide SSO by generating its own JWT and making direct SAF calls.  

  - REST API services for Files (Data Sets and USS), JES, and z/OSMF workflows.  These are used by some Zowe applications such as the Zowe Explorers in the Zowe Desktop. If z/OSMF REST APIs are not present, other Zowe desktop application, such as the File Editor that provides access to USS directories and files as well as MVS data sets and members, will work through the Zowe Z Secure Services (ZSS) component to access z/OS resources.   

  :::info**Recommendations**
  - For production use of Zowe, we recommend configuring z/OSMF to leverage Zowe functionalities that require z/OSMF. For more information, see [Configuring z/OSMF](systemrequirements-zosmf.md).
  - For non-production use of Zowe (such as development, proof-of-concept, demo), you can customize the configuration of z/OSMF to create **_z/OS MF Lite_** to simplify your setup of z/OSMF. z/OS MF Lite only supports selected REST services (JES, DataSet/File, TSO and Workflow), resulting in considerable improvements in startup time as well as a reduction in steps to set up z/OSMF. For information about how to set up z/OSMF Lite, see [Configuring z/OSMF Lite (non-production environment)](systemrequirements-zosmf-lite.md).
  :::
