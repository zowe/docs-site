---
keywords: [security permissions, system permissions, monacat]
---
# Address z/OS requirements

Before installing Zowe&trade; z/OS components, ensure that your z/OS environment meets the prerequisites. The prerequisites you need to install depend on what Zowe z/OS components you want to use and how you want to install and configure Zowe on z/OS. Assess your installation scenario and install the prerequisites that meet your needs. 

All Zowe server components can be installed on a z/OS environment, while some can alternatively be installed on Linux or zLinux via Docker. The components provide a number of services that are accessed through a web browser such as an API catalog and a web desktop.  

- [System requirements](#system-requirements)
  - [z/OS system requirements](#zos-system-requirements)
    - [z/OS](#zos)
    - [Node.js](#nodejs)
    - [Java](#java)
    - [z/OSMF (Optional)](#zosmf-optional)
  - [Zowe Containers requirements](#zowe-containers-requirements)
  - [Zowe Desktop requirements (client PC)](#zowe-desktop-requirements-client-pc)
  - [Browser limitations in API Catalog](#browser-limitations-in-api-catalog)
  - [Feature requirements](#feature-requirements)
    - [Multi-Factor Authentication (MFA)](#multi-factor-authentication-mfa)
    - [Single Sign-On (SSO)](#single-sign-on-sso)
  - [Memory requirements](#memory-requirements)
## z/OS system requirements

Be sure your z/OS system meets the following prerequisites:

### z/OS

- z/OS version is in active support, such as Version 2.3 and Version 2.4

   **Note:** z/OS V2.2 reached end of support on 30 September 2020. For more information, see the z/OS v2.2 lifecycle details [https://www.ibm.com/support/lifecycle/details?q45=Z497063S01245B61](https://www.ibm.com/support/lifecycle/details?q45=Z497063S01245B61). 

- zFS volume has at least 833 mb of free space for Zowe server components, their keystore, instance configuration files and logs, and third-party plug-ins.

- (Optional, recommended) z/OS OpenSSH V2.2.0 or later
  
  Some features of Zowe require SSH, such as the Desktop's SSH terminal. Install and manage Zowe via SSH, as an alternative to OMVS over TN3270. 

- (Optional, recommended) Parallel Sysplex.
  
  To deploy Zowe for high availability, a Parallel Sysplex environment is recommended. For more information, see [Configuring Sysplex for high availability](configure-sysplex.md).

### Node.js

- Node.js v14.x (except v14.17.2), or v16.x

  Node is not included with z/OS so must be installed separately.  To install Node.js on z/OS, follow the instructions in [Installing Node.js on z/OS](install-nodejs-zos.md).
  
  **Note:** If you are a software vendor building extensions for Zowe, when using Node.js v14.x or later, it is highly recommended that plug-ins used are tagged. For more information, see [Tagging on z/OS](../extend/extend-desktop/mvd-buildingplugins.md#tagging-plugin-files-on-z-os).

### Java 

- IBM SDK for Java Technology Edition V8

### z/OSMF (Optional) 

- (Optional, recommended) IBM z/OS Management Facility (z/OSMF) Version 2.2, Version 2.3 or Version 2.4.

  z/OSMF is included with z/OS so does not need to be separately installed.  If z/OSMF is present, Zowe will detect this when it is configured and use z/OSMF for the following purposes:

  - Authenticating TSO users and generating a single sign-on JSON Web Token (JWT). Ensure that the [z/OSMF JWT Support is available via APAR and associated PTFs](https://www.ibm.com/support/pages/apar/PH12143).  If z/OSMF is not available, then Zowe is still able to provide SSO by generating its own JWT and making direct SAF calls.  

  - REST API services for Files (Data Sets and USS), JES, and z/OSMF workflows.  These are used by some Zowe applications such as the Zowe Explorers in the Zowe Desktop. If z/OSMF REST APIs are not present, other Zowe desktop application, such as the File Editor that provides access to USS directories and files as well as MVS data sets and members, will work through the Zowe Z Secure Services (ZSS) component to access z/OS resources.   

  **Tips:**

  - For non-production use of Zowe (such as development, proof-of-concept, demo), you can customize the configuration of z/OSMF to create what is known as "z/OS MF Lite" that simplifies the setup of z/OSMF. As z/OS MF Lite only supports selected REST services (JES, DataSet/File, TSO and Workflow), you will observe considerable improvements in startup time as well as a reduction in the efforts involved in setting up z/OSMF. For information about how to set up z/OSMF Lite, see [Configuring z/OSMF Lite (non-production environment)](systemrequirements-zosmf-lite.md).
  - For production use of Zowe, see [Configuring z/OSMF](systemrequirements-zosmf.md).

## Zowe Containers requirements

Zowe (server) containers are available for download as an alternative to running Zowe servers on z/OS through the Zowe convenience and SMP/E builds Check [Zowe Containers Prerequisites](./k8s-prereqs.md) page for more details.

## Feature requirements

Zowe has several optional features that have additional prerequisites as follows.

### Multi-Factor Authentication (MFA)

Multi-factor authentication is supported for several components, such as the Desktop and API Mediation Layer.
Multi-factor authentication is provided by third-party products which Zowe is compatible with. The following are known to work:

- [CA Advanced Authentication Mainframe](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-advanced-authentication-mainframe/2-0.html)
- [IBM Z Multi-Factor Authentication](https://www.ibm.com/products/ibm-multifactor-authentication-for-zos).

**Note:** To support the multi-factor authentication, it is necessary to apply z/OSMF APAR  [PH39582](https://www.ibm.com/support/pages/apar/PH39582). 

For information on using MFA in Zowe, see [Multi-Factor Authentication](mvd-configuration.md#multi-factor-authentication-configuration).

**Note:** MFA must work with Single sign-on (SSO). Make sure that [SSO](#single-sign-on-sso) is configured before you use MFA in Zowe.

### Single Sign-On (SSO)

Zowe has an SSO scheme with the goal that each time you use multiple Zowe components you should only be prompted to login once. 

Requirements:

- IBM z/OS Management Facility (z/OSMF)

### API Mediation Layer OIDC Authentication

Zowe requires ACF2 APAR LU01316 to be applied when using the ACF2 security manager.
