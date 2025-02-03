---
keywords: [security permissions, system permissions]
---
# Addressing z/OS requirements

Before installing Zowe&trade; z/OS components, ensure that your z/OS environment meets the prerequisites. The prerequisites you need to install depend on what Zowe z/OS components you want to use and how you want to install and configure Zowe on z/OS. Assess your installation scenario and install the prerequisites that meet your needs. 

:::info Required roles: system programmer, security administrator
:::

All Zowe server components can be installed on a z/OS environment, while some can alternatively be installed on Linux or zLinux via Docker. The components provide a number of services that are accessed through a web browser such as an API catalog and a web desktop.  

## z/OS system requirements

Be sure your z/OS system meets the following prerequisites:

### z/OS

- z/OS version is in active support, such as Version 2.5, and 3.1

  :::note Notes:
  * z/OS V2.4 reached end of support on 30 September, 2024. 
  * z/OS V2.3 reached end of support on 30 September, 2022. For more information, see the [z/OS v2.3 lifecycle details](https://www.ibm.com/support/pages/zos23x-withdrawal-notification).
  :::

- zFS volume has at least 1200 MB of free space for Zowe server components, the corresponding keystore, instance configuration files and logs, and third-party plug-ins.

- (Optional, recommended) System Display and Search Facility (SDSF)

  SDSF is used for a few management tasks of Zowe, though there are alternative ways to accomplish the same tasks.

  | Task | Command utilizing SDSF | Alternatives |
  |-----------|-------------------------------|-------------|
  | [Certificate setup](configure-certificates.md) | `zwe init certificate` | z/OSMF workflow "ZWEKRING", or the JCL samples "ZWEKRING" and those that begin with "ZWEIKR" can be used to create keyrings. |
  | [Starting Zowe](start-zowe-zos.md) | `zwe start` | Products that can issue the MVS START command upon Zowe's STC such as Sysview or EJES can be used instead. |
  | [Stopping Zowe](start-zowe-zos.md) | `zwe stop` | Products that can issue the MVS STOP command upon Zowe's STC such as Sysview or EJES can be used instead. |
  
  Not having SDSF installed may result in the following error message:

  `IRX0043I Error running /Zowe/bin/utils/opercmd.rex, line 130: Routine not found`
 
For more information about SDSF, see the _Abstract for z/OS SDSF Operation and Customization_ in the IBM documentation.

- (Optional, recommended) z/OS OpenSSH
  
  Some features of Zowe require SSH, such as the SSH terminal of the Desktop. Install and manage Zowe via SSH, as an alternative to OMVS over TN3270. 

- (Optional) Parallel Sysplex.
  
  To deploy Zowe for high availability, a Parallel Sysplex environment is recommended. For more information, see [Configuring Sysplex for high availability](configure-sysplex.md).

### Mainframe Resources Consumption 

During Zowe startup, there is high resource consumption in order for Zowe to be operational as soon as possible. Subsequent resource consumption depends on the processing load of Zowe services. When Zowe is idle, resource consumption is relatively lower.

#### Resource consumption during Zowe startup 

* **CPU consumption**  
Zowe consumes approximately 300 CPU seconds on the z15 T01 processor during startup. Approximately 50 percent of CPU consumption is zIIP eligible.

* **I/O**  
Zowe performs approximately 5,000,000 I/O operations during startup.

#### Resource consumption when Zowe is idling  

* **CPU consumption**  
Zowe consumes approximately 90 CPU seconds on the z15 T01 processor during 1 hour of operation when no external load is processed. Approximately 60 percent of CPU consumption is zIIP eligible.

* **I/O**  
Zowe performs approximately 17,000 I/O operations during 1 hour of operation when no external load is processed.

:::note 
Zowe consumption reference data were measured with the default Zowe configuration. The following components were enabled:
* Gateway
* Discovery Service
* API Catalog
* Caching Service
* ZSS
* Zowe Desktop 
:::

### Node.js

- Node.js v18.x, v20.x, or v22.x is required during installation. After installation, it is only required when running the app-server component.

  Node is not included with z/OS so must be installed separately.  To install Node.js on z/OS, follow the instructions in [Addressing Node.js requirements](install-nodejs-zos.md).
  
  :::tip
  If you are a software vendor building extensions for Zowe, we recommend you tag your plug-ins. For more information, see [Tagging on z/OS](../extend/extend-desktop/mvd-buildingplugins.md#tagging-plugin-files-on-zos).
  :::

### Java 

- IBM® Semeru Runtime Certified Edition for z/OS® version 17

### z/OSMF (Optional) 

- (Optional, recommended) IBM z/OS Management Facility (z/OSMF) Version 2.5, or Version 3.1.

  z/OSMF is included with z/OS so does not need to be separately installed. If z/OSMF is present, Zowe  detects z/OSMF during configuration and uses z/OSMF for the following purposes:

  - Authenticating TSO users and generating a single sign-on JSON Web Token (JWT). Ensure that the [z/OSMF JWT Support is available via APAR and associated PTFs](https://www.ibm.com/support/pages/apar/PH12143) and that JWT generation is enabled. For more information see [Enabing JSON Web Token support](https://www.ibm.com/docs/en/zos/3.1.0?topic=configurations-enabling-json-web-token-support) in the IBM documentation.

  - REST API services for Files (Data Sets and USS), JES, and z/OSMF workflows.  These are used by some Zowe applications such as the Zowe Explorers in the Zowe Desktop. If z/OSMF REST APIs are not present, other Zowe desktop application, such as the File Editor that provides access to USS directories and files as well as MVS data sets and members, will work through the Zowe Z Secure Services (ZSS) component to access z/OS resources.   

  :::info Recommendations
  - For production use of Zowe, we recommend configuring z/OSMF to leverage Zowe functionalities that require z/OSMF. For more information, see [Configuring z/OSMF](systemrequirements-zosmf.md).
  - For non-production use of Zowe (such as development, proof-of-concept, demo), you can customize the configuration of z/OSMF to create **_z/OS MF Lite_** to simplify your setup of z/OSMF. z/OS MF Lite only supports selected REST services (JES, DataSet/File, TSO and Workflow), resulting in considerable improvements in startup time as well as a reduction in steps to set up z/OSMF. For information about how to set up z/OSMF Lite, see [Configuring z/OSMF Lite (non-production environment)](systemrequirements-zosmf-lite.md).
  :::

:::note
For specific z/OS security configuration options that apply to the specific Zowe server-side components in your configuration, see [Security customization of your z/OS system](./configure-zos-system.md).
:::
