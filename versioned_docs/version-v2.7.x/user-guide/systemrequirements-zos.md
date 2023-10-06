# System requirements 

Before installing Zowe&trade; z/OS components, ensure that your z/OS environment meets the prerequisites. The prerequisites you need to install depend on what Zowe z/OS components you want to use and how you want to install and configure Zowe on z/OS. Therefore, assess your installation scenario and install the prerequisites that meet your needs. 

All Zowe server components can be installed on a z/OS environment, while some can alternatively be installed on Linux or zLinux via Docker. The components provide a number of services that are accessed through a web browser such as an API catalog and a web desktop.  

- [System requirements](#system-requirements)
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
  - [Feature requirements](#feature-requirements)
    - [Multi-Factor Authentication (MFA)](#multi-factor-authentication-mfa)
    - [Single Sign-On (SSO)](#single-sign-on-sso)
  - [Memory requirements](#memory-requirements)
## z/OS system requirements

Be sure your z/OS system meets the following prerequisites:

### z/OS

- z/OS version is in active support, such as Version 2.4 and 2.5.

   **Note:** Zowe Version 2.11 or higher is required when using z/OS Version 3.1

   **Note:** z/OS V2.3 reached end of support on 30 September 2022. For more information, see the z/OS v2.3 lifecycle details [https://www.ibm.com/support/pages/zos23x-withdrawal-notification](https://www.ibm.com/support/pages/zos23x-withdrawal-notification)

- zFS volume has at least 1200 mb of free space for Zowe server components, their keystore, instance configuration files and logs, and third-party plug-ins.

- (Optional, recommended) z/OS OpenSSH
  
  Some features of Zowe require SSH, such as the Desktop's SSH terminal. Or, you want to install and manage Zowe via SSH, as an alternative to OMVS over TN3270. 

- (Optional, recommended) Parallel Sysplex.
  
  To deploy Zowe for high availability, a Parallel Sysplex environment is recommended. Please check [Configuring Sysplex for high availability](configure-sysplex.md) for more information.

### Node.js

- Node.js v16.x or v18.x

  Node is not included with z/OS so must be installed separately.  To install Node.js on z/OS, follow the instructions in [Installing Node.js on z/OS](install-nodejs-zos.md).
  
  **Note:** If you are a software vendor building extensions for Zowe, when using Node.js v14.x or later, it is highly recommended that plug-ins used are tagged. For more information, see [Tagging on z/OS](../extend/extend-desktop/mvd-buildingplugins.md#tagging-plugin-files-on-z-os).

### Java 

- IBM SDK for Java Technology Edition V8

### z/OSMF (Optional) 

- (Optional, recommended) IBM z/OS Management Facility (z/OSMF) Version 2.4, Version 2.5 or Version 3.1.

  z/OSMF is included with z/OS so does not need to be separately installed.  If z/OSMF is present, Zowe will detect this when it is configured and use z/OSMF for the following purposes:

  - Authenticating TSO users and generating a single sign-on JSON Web Token (JWT). Ensure that the [z/OSMF JWT Support is available via APAR and associated PTFs](https://www.ibm.com/support/pages/apar/PH12143).  If z/OSMF is not available, then Zowe is still able to provide SSO by generating its own JWT and making direct SAF calls.  

  - REST API services for Files (Data Sets and USS), JES, and z/OSMF workflows.  These are used by some Zowe applications such as the Zowe Explorers in the Zowe Desktop. If z/OSMF REST APIs are not present, other Zowe desktop application, such as the File Editor that provides access to USS directories and files as well as MVS data sets and members, will work through the Zowe Z Secure Services (ZSS) component to access z/OS resources.   

  **Tips:**

  - For non-production use of Zowe (such as development, proof-of-concept, demo), you can customize the configuration of z/OSMF to create what is known as "z/OS MF Lite" that simplifies the setup of z/OSMF. As z/OS MF Lite only supports selected REST services (JES, DataSet/File, TSO and Workflow), you will observe considerable improvements in startup time as well as a reduction in the efforts involved in setting up z/OSMF. For information about how to set up z/OSMF Lite, see [Configuring z/OSMF Lite (non-production environment)](systemrequirements-zosmf-lite.md).
  - For production use of Zowe, see [Configuring z/OSMF](systemrequirements-zosmf.md).
  

## User ID requirements

Specific user IDs with sufficient permissions are required to run or access Zowe. 

### ZWESVUSR

This is a started task ID for `ZWESLSTC`.  

The task starts a USS environment using `BPXBATSL` that executes the core Zowe Desktop (ZLUX) node.js server, the Java API Mediation Layer, and the Z Secure Services C component.  To work with USS, the user ID `ZWESVUSR` must have a valid OMVS segment.  



| Class  | ID     | Access |  Reason |
|--------|--------|--------|---------|
| CSFSERV | `Multiple` | READ | To generate symmetric keys using ICSF that is used by [Zowe Desktop cookies](./configure-zos-system.md#configure-an-icsf-cryptographic-services-environment). The list of IDs to enable will include `CSF1TRD` , `CSF1TRC` , `CSF1SKE` , `CSF1SKD`. The full list of IDs is described in the z/OS Cryptographic Services user guide for your z/OS release level: [2.2](https://www.ibm.com/docs/en/zos/2.2.0?topic=ssl-racf-csfserv-resource-requirements), [2.3](https://www.ibm.com/docs/en/zos/2.3.0?topic=ssl-racf-csfserv-resource-requirements), [2.4](https://www.ibm.com/docs/en/zos/2.4.0?topic=ssl-racf-csfserv-resource-requirements) and [2.5](https://www.ibm.com/docs/en/zos/2.5.0?topic=ssl-racf-csfserv-resource-requirements). |
| FACILITY | `ZWES.IS` | READ | To allow Zowe ZWESVSTC processes to access the Zowe ZIS cross memory server |
| FACILITY | `BPX.SERVER` + `BPX.DAEMON` | UPDATE | To allow the Zowe Desktop ZLUX server to run code on behalf of the API requester's TSO user ID. For more information, see [Security Environment Switching](./configure-zos-system.md#configure-security-environment-switching). |
| FACILITY | `IRR.RUSERMAP` | READ | To allow Zowe to [map an X.509 client certificate to a z/OS identity](./configure-zos-system.md#configure-main-zowe-server-to-use-identity-mapping) | 
| FACILITY | `BPX.JOBNAME` | READ | To allow z/OS address spaces for unix processes to be renamed for [ease of identification](./configure-zos-system.md#configure-address-space-job-naming) |
| FACILITY | `IRR.RADMIN.LISTUSER` | READ | To allow Zowe to obtain information about OMVS segment of the user profile using `LISTUSER` TSO command |
| FACILITY | `IRR.RAUDITX` | READ | **Optional** To allow API Mediation Layer to issue SMF 83 records about activity of Personal Access Tokens. [See here for more info](./api-mediation/api-mediation-smf) |
| APPL     | 'OMVSAPPL' | READ | **Optional** To allow Zowe Desktop vendor extensions the ability to use single-sign on.  |


### ZWESIUSR

This is a started task ID used to run the PROCLIB `ZWESISTC` that launches the [cross memory server](./configure-xmem-server.md) (also known as ZIS).  It must have a valid OMVS segment.

### ZWEADMIN

This is a group that `ZWESVUSR` and `ZWESIUSR` should belong to.  It must have a valid OMVS segment.  

### zowe_user

If z/OSMF is used for authentication and serving REST APIs for Zowe CLI and Zowe Explorer users, the TSO user ID for end users must belong to one or both of the groups `IZUUSER` or `IZUADMIN`.

## Network requirements

The following ports are required for Zowe. These are default values. You can change the values by updating variable values in the `zowe.yaml` file. 

| Port number | zowe.yaml variable name | Purpose |
|------|------|------|
| 7552 | zowe.components.api-catalog.port | Used to view API swagger / openAPI specifications for registered API services in the API Catalog. 
| 7553 | zowe.components.api-catalog.port | Discovery server port which dynamic API services can issue APIs to register or unregister themselves.
| 7554 | zowe.components.gateway.port | The northbound edge of the API Gateway used to accept client requests before routing them to registered API services.  This port must be exposed outside the z/OS network so clients (web browsers, VS Code, processes running the Zowe CLI) can reach the gateway.
| 7555 | zowe.components.caching-service.port | Port of the caching service that is used to share state between different Zowe instances in a high availability topology.
| 7556 | zowe.components.app-server.port | The Zowe Desktop (also known as ZLUX) port used to log in through web browsers.
| 7557 | zowe.components.zss.port | Z Secure Services (ZSS) provides REST API services to ZLUX, used by the File Editor application and other ZLUX applications in the Zowe Desktop.
| 7558 | zowe.components.jobs-api.port | Port of the service that provides REST APIs to z/OS jobs used by the JES Explorer.
| 7559 | zowe.components.files-api.port | Port of the service that provides REST APIs to MVS and USS file systems.
|  | zowe.components.explorer-jes | Port of the JES Explorer GUI for viewing and working with jobs in the Zowe Desktop.
|  | zowe.components.explorer-mvs | Port of the MVS Explorer GUI for working with data sets in the Zowe Desktop.
|  | zowe.components.explorer-uss | Port of the USS Explorer GUI for working with USS in the Zowe Desktop.



## Zowe Containers requirements

Zowe (server) containers are available for download as an alternative to running Zowe servers on z/OS through the Zowe convenience and SMP/E builds Check [Zowe Containers Prerequisites](./k8s-prereqs.md) page for more details.

## Zowe Desktop requirements (client PC)

The Zowe Desktop is powered by the Application Framework which has server prereqs depending on where it is installed

- [Zowe Application Framework on z/OS requirements](#zowe-application-framework-on-zos-requirements)
- [Application Framework on Docker prerequisites](#docker-requirements-host)

The Zowe Desktop runs inside of a browser. No browser extensions or plugins are required.
The Zowe Desktop supports Google Chrome, Mozilla Firefox, Apple Safari and Microsoft Edge releases that are at most 1 year old, except when the newest release is older.
For Firefox, both the regular and Extended Support Release (ESR) versions are supported under this rule.

If you do not see your browser listed here, please contact the Zowe community so that it can be validated and included.

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

## Memory requirements

Zowe's components have following memory requirements:

Component name | Category | Average memory usage
---|---|---
Gateway service | API Mediation Layer | 512MB
Discovery service | API Mediation Layer |  512MB
API Catalog | API Mediation Layer |  512MB
Metrics service | API Mediation Layer |  512MB
Caching service | API Mediation Layer |  512MB
ZSS | Application Framework | 32MB
App Server | Application Framework | 350MB

Each of the above components can be enabled or disabled to optimize your resource consumption according to your use cases.
Zowe can use more memory if there are extensions installed.
