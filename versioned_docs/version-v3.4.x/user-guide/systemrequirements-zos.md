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
  * Currently, access to z/OS V3.2 is not available on environments accessible to the Zowe community. As such, community members cannot run the automated test suite on z/OS V3.2. If you require further validation about z/OS V3.2 usage, please consult your Conformant Support Provider.
  :::

- zFS volume has at least 1200 MB of free space for Zowe server components, the corresponding keystore, instance configuration files and logs, and third-party plug-ins.

- (Optional, recommended) System Display and Search Facility (SDSF)

  SDSF is used for a few management tasks of Zowe, though there are alternative ways to accomplish the same tasks.

  | Task | Command utilizing SDSF | Alternatives |
  |-----------|-------------------------------|-------------|
  | [Security setup](configuring-security.md) | `zwe init security` | Submit `ZWESECUR` or `ZWENOSEC` manually or use `zwe init security --jcl` |
  | [Certificate setup](configure-certificates.md) | `zwe init certificate` | z/OSMF workflow "ZWEKRING", or the JCL samples "ZWEKRING" and those that begin with "ZWEIKR" can be used to create keyrings. |
  | [Authorize library](../appendix/zwe_server_command_reference/zwe/init/zwe-init-apfauth.md) | `zwe init apfauth` | Products that can issue the MVS `SETPROG APF` command or update `SYS1.PARMLIB(PROGxx)`. See examples in [`SZWESAMP(ZWESIPRG)`](https://github.com/zowe/zowe-install-packaging/blob/v3.x/staging/files/SZWESAMP/ZWESIPRG). |
  | [VSAM setup](initialize-vsam-dataset.md) | `zwe init vsam` | Submit `ZWECSRVS` or `ZWECSVSM` manually or use `zwe init vsam --jcl` |
  | [Starting Zowe](start-zowe-zos.md) | `zwe start` | Products that can issue the MVS `START` command upon Zowe's STC such as Sysview or EJES can be used instead. |
  | [Stopping Zowe](start-zowe-zos.md) | `zwe stop` | Products that can issue the MVS `STOP` command upon Zowe's STC such as Sysview or EJES can be used instead. |
  
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





