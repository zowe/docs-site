# System requirements 

Before installing Zowe&trade; z/OS components, ensure that your z/OS environment meets the prerequisites. The prerequisites you need to install depend on what Zowe components you want to use and how you want to install and configure Zowe. Therefore, assess your installation scenario and install the prerequisites that meet your needs. 

All Zowe server components can be installed on a z/OS environment, while some can alternatively be installed on Linux or zLinux via Docker. The components provide a number of services that are accessed through a web browser such as an API catalog and a web desktop.  

- [z/OS system requirements](#zos-system-requirements)
    - [Zowe API Mediation Layer on z/OS requirements](#zowe-api-mediation-layer-on-zos-requirements)
    - [Zowe Web Explorers and APIs on z/OS requirements](#zowe-web-explorers-and-apis-on-zos-requirements)
    - [Zowe Application Framework on z/OS requirements](#zowe-application-framework-on-zos-requirements)
- [User ID requirements](#user-id-requirements)
    - [ZWESVUSR](#zwesvusr)
    - [ZWESIUSR](#zwesiusr)
    - [ZWEADMIN](#zweadmin)
    - [zowe_user](#zowe_user)
- [Network requirements](#network-requirements)
- [Zowe Desktop requirements client PC](#zowe-desktop-requirements-client-pc)
- [Feature requirements](#feature-requirements)
    - [Multi-Factor Authentication MFA](#multi-factor-authentication-mfa)
    - [Single Sign-On SSO](#single-sign-on-sso)
- [Zowe Docker requirements](#zowe-docker-requirements)

## z/OS system requirements

The following prerequisites are 

- z/OS version in active support, such as Version 2.3 and Version 2.4

   **Note:** z/OS V2.2 reached end of support on 30 September 2020. For more information, see the z/OS v2.2 lifecycle details [https://www.ibm.com/support/lifecycle/details?q45=Z497063S01245B61](https://www.ibm.com/support/lifecycle/details?q45=Z497063S01245B61). 

- zFS volume with at least 833 mb of free space for Zowe server components, their keystore, instance configuration files and logs, and third-party plug-ins.

   **Requirement for:** Zowe Server Components (API Mediation Layer, Application Framework, ZSS)

- (Optional, recommended) IBM z/OS Management Facility (z/OSMF) Version 2.2, Version 2.3 or Version 2.4.

  When a Zowe instance directory is created, it looks for the presence of z/OSMF. If z/OSMF is present, it is used for authentication and generating a single sign-on JSON Web Token (JWT).  If z/OSMF is not present, Zowe will still work and it generates its own JWT and make SAF calls directly.  
  
  When using z/OSMF with Zowe, ensure that the [z/OSMF JWT Support is available via APAR and associated PTFs](https://www.ibm.com/support/pages/apar/PH12143).

  **Tips:**

   - For non-production use of Zowe (such as development, proof-of-concept, demo), you can customize the configuration of z/OSMF to create what is known as "z/OS MF Lite" that simplifies the setup of z/OSMF. As z/OS MF Lite only supports selected REST services (JES, DataSet/File, TSO and Workflow), you will observe considerable improvements in startup time as well as a reduction in the efforts involved in setting up z/OSMF. For information about how to set up z/OSMF Lite, see [Configuring z/OSMF Lite (non-production environment)](systemrequirements-zosmf-lite.md).
   - For production use of Zowe, see [Configuring z/OSMF](systemrequirements-zosmf.md).
  
- (Optional, recommended) z/OS OpenSSH V2.2.0 or higher.
  
  Some features of Zowe require SSH, such as the Desktop's SSH terminal.
  Some users may also find it convenient to install and manage Zowe via SSH, as an alternative to OMVS over TN3270. 

### Zowe API Mediation Layer on z/OS requirements

- IBM SDK for Java Technology Edition V8 or later

### Zowe Web Explorers and APIs on z/OS requirements

- Node.js v8.x (except v8.16.1), v12.x, or v14
  
  **Note:** When using Node.js v12.x or later, it is highly recommended that plug-ins used are tagged. For more information, see [Tagging on z/OS](../extend/extend-desktop/mvd-buildingplugins.md#tagging-plugin-files-on-z-os).
  
  To install Node.js on z/OS, follow the instructions in [Installing Node.js on z/OS](install-nodejs-zos.md).

- IBM SDK for Java Technology Edition V8 or later

### Zowe Application Framework on z/OS requirements

The Zowe Application Framework server provides the Zowe Desktop that contains an extensible GUI with a number of applications allowing access to z/OS functions, such as the File Editor, TN3270 emulator, JES Explorer, and more. For more information, see [Zowe Architecture](../getting-started/zowe-architecture.md#zlux).

- Node.js v8.x (except v8.16.1), v12.x, or v14
  
  **Note:** When using Node.js v12.x or later, it is highly recommended that plug-ins used are tagged. For more information, see [Tagging on z/OS](../extend/extend-desktop/mvd-buildingplugins.md#tagging-plugin-files-on-z-os). 
  
  To install Node.js on z/OS, follow the instructions in [Installing Node.js on z/OS](install-nodejs-zos.md).

- IBM SDK for Java Technology Edition V8 or later

## User ID requirements

Specific user IDs with sufficient permissions are required to run or access Zowe. 

### ZWESVUSR

This is a started task ID used to run the PROCLIB `ZWESVSTC`.  

The task starts a USS environment using `BPXBATSL` that executes the core Zowe Desktop (ZLUX) node.js server, the Java API Mediation Layer, and the Z Secure Services C component.  To work with USS, the user ID `ZWESVUSR` must have a valid OMVS segment.  

| Class  | ID     | Access |  Reason |
|--------|--------|--------|---------|
| CSFSERV | `CSFRNGL` | READ | To generate symmetric keys using ICSF that is used by [Zowe Desktop cookies](./configure-zos-system.md#configure-an-icsf-cryptographic-services-environment) |
| FACILITY | `ZWES.IS` | READ | To allow Zowe ZWESVSTC processes to access the Zowe ZIS cross memory server |
| FACILITY | `BPX.SERVER` + `BPX.DEAMON` | UPDATE | To allow the Zowe Desktop ZLUX server to run code on behalf of the API requester's TSO user ID. For more information, see [Security Environment Switching](./configure-zos-system.md#configure-security-environment-switching). |
| FACILITY | `IRR.RUSERMAP` | READ | To allow Zowe to [map an X.509 client certificate to a z/OS identity](./configure-zos-system.md#configure-main-zowe-server-to-use-identity-mapping) | 
| FACILITY | `BPX.JOBNAME` | READ | To allow z/OS address spaces for unix processes to be renamed for [ease of identification](./configure-zos-system.md#configure-address-space-job-naming) |

### ZWESIUSR

This is a started task ID used to run the PROCLIB `ZWESISTC` that launches the [cross memory server](./configure-xmem-server.md) (also known as ZIS).  It must have a valid OMVS segment.

### ZWEADMIN

This is a group that `ZWESVUSR` and `ZWESIUSR` should belong to.  It must have a valid OMVS segment.  

### zowe_user

If z/OSMF is used for authentication and serving REST APIs for Zowe CLI and Zowe Explorer users, the TSO user ID for end users must belong to one or both of the groups `IZUUSER` or `IZUADMIN`.

## Network requirements

The following ports are required for Zowe. These are default values. You can change the values by updating variable values in the `instance.env` file. For more information, see [Configuring the Zowe instance directory](configure-instance-directory.md#reviewing-the-instance-env-file).

| Port number | Variable name | Purpose |
|------|------|------|
| 7552 | _CATALOG_PORT_ | Used to view API swagger / openAPI specifications for registered API services in the API Catalog. 
| 7553 | _DISCOVERY_PORT_ | Discovery server port which dynamic API services can issue APIs to register or unregister themselves.
| 7554 | _GATEWAY_PORT_ | The northbound edge of the API Gateway used to accept client requests before routing them to registered API services.  This port must be exposed outside the z/OS network so clients (web browsers, VS Code, processes running the Zowe CLI) can reach the gateway.
| 7555 | _ZWE_CACHING_SERVICE_PORT_ | Port of the caching service that is used to share state between different Zowe instances in a high availability topology.
| 8545 | _JOBS_API_PORT_ | Port of the service that provides REST APIs to z/OS jobs used by the JES Explorer.
| 8546 | _JES_EXPLORER_UI_PORT_ | Port of the JES Explorer GUI for viewing and working with jobs in the Zowe Desktop.
| 8547 | _FILES_API_PORT_ | Port of the service that provides REST APIs to MVS and USS file systems.
| 8548 | _MVS_EXPLORER_UI_PORT_ | Port of the MVS Explorer GUI for working with data sets in the Zowe Desktop.
| 8550 | _USS_EXPLORER_UI_PORT_ | Port of the USS Explorer GUI for working with USS in the Zowe Desktop.
| 8544 | _ZOWE_ZLUX_SERVER_HTTPS_PORT_ | The Zowe Desktop (also known as ZLUX) port used to log in through web browsers.
| 8542 | _ZOWE_ZSS_SERVER_PORT_ | Z Secure Services (ZSS) provides REST API services to ZLUX, used by the File Editor application and other ZLUX applications in the Zowe Desktop.

## Zowe Desktop requirements (client PC)

The Zowe Desktop is powered by the Application Framework which has server prereqs depending on where it is installed
- [Zowe Application Framework on z/OS requirements](#zowe-application-framework-on-zos-requirements)
- [Application Framework on Docker prerequisites](#docker-requirements-host)

The Zowe Desktop runs inside of a browser. No browser extensions or plugins are required.
The Zowe Desktop supports Google Chrome, Mozilla Firefox, Apple Safari and Microsoft Edge releases that are at most 1 year old, except when the newest release is older.
For Firefox, both the regular and Extended Support Release (ESR) versions are supported under this rule.

Currently, the following browsers are supported:
- Google Chrome V79 or later
- Mozilla Firefox V68 or later
- Safari V13 or later
- Microsoft Edge 79

If you do not see your browser listed here, please contact the Zowe community so that it can be validated and included.

## Feature requirements

Zowe has several optional features that have additional prerequisites as follows.

### Multi-Factor Authentication (MFA)

Multi-factor authentication is supported for several components, such as the Desktop and API Mediation Layer.
Multi-factor authentication is provided by third-party products which Zowe is compatible with. The following are known to work:
- [IBM Z Multi-Factor Authentication](https://www.ibm.com/us-en/marketplace/ibm-multifactor-authentication-for-zos).

For information on using MFA in Zowe, see [Multi-Factor Authentication](mvd-configuration.md#multi-factor-authentication-configuration).

### Single Sign-On (SSO)

Zowe has an SSO scheme with the goal that each time you use use multiple Zowe components you should only be prompted to login once.

Requirements: 
- IBM z/OS Management Facility (z/OSMF)
- (Optional, recommended) PKCS#11 token setup is required when using ZSS, the Desktop, and Application Framework with SSO. See [Creating a PKCS#11 Token](configure-certificates.md#creating-a-pkcs11-token) for more information.

## Zowe Docker requirements

<Badge text="Technical Preview"/> The Zowe Docker build is a technical preview.

Docker is a technology for delivering a set of software and all its prerequisites and run them in an isolated manner to reduce installation steps and to eliminate troubleshooting environmental differences.
Docker can run on many operating systems, but currently the Zowe Docker image is for x86 Linux (Intel, AMD) and zLinux ("s390x"). Support for platforms such as zCX, Windows, and more will be added over time.

To get Docker for Linux, you should check your Linux software repository. Whether using Ubuntu, Red Hat, SuSE, and many other types of Linux, you can install Docker the same way you install other software on Linux through the package manager.

Once you have Docker, the Zowe Docker image has the following requirements

- 4 GB free RAM, 8 GB recommended
- 4 GB free disk space
- Network access to the z/OS host. The Linux host must be able to communicate with the z/OS host.

When using Docker the USS components of Zowe will run off z/OS in the Linux container, however a z/OS installation of Zowe is still required for the ZSS and cross memory server.  

**Note:** The subsections of z/OS requirements such as for API Mediation Layer, Web Explorers, and Application Framework are not required because they are included in the Docker install.

