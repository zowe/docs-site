# Configuring z/OSMF

For client-side components to communicate with the mainframe, z/OSMF requires configuration to make this happen.

:::info Required role: systems programmer
:::

Complete the following IBM z/OSMF configuration tasks for the implementation of [Zowe CLI](../user-guide/user-roadmap-zowe-cli.md), [Zowe Explorer for Visual Studio Code](../getting-started/user-roadmap-zowe-explorer.md), or the [Zowe Explorer plug-in for IntelliJ IDEA](../user-guide/intellij-configure.md).

:::note

If you are connecting to the mainframe with methods other than a z/OSMF profile, you do not need to configure z/OSMF. Other connection options might include using FTP, or your custom API.

:::

## Obtaining z/OSMF installation and configuration materials

Before you start the configuration process, review [Overview of z/OSMF](https://www.ibm.com/docs/en/zos/2.5.0?topic=zosmf-overview) in the IBM Documentation.

## Installing and configuring z/OSMF

Zowe client-side components were designed and tested to integrate with z/OSMF running on IBM version 2.5 z/OS mainframe systems. To use Zowe client-side components, ensure that your z/OS system meets the requirements that are described in the following table:

| Requirement        | Description |
| ----------- | ----------- |
| AXR (System Rexx) | The AXR (System Rexx) component lets z/OS perform Incident Log tasks. It also lets REXX execs execute outside of conventional TSO and batch environments. <br/>For more information, see [Communicating with System REXX](https://www.ibm.com/docs/en/zos/2.5.0?topic=command-communicating-system-rexx) on the IBM Documentation. |
| CEA (Communications Enabled Applications)  Server | CEA server is a co-requisite for the CIM server. The CEA server lets z/OSMF deliver z/OS events to C-language clients. <br/>z/OSMF requires the CEA server to perform the following types of tasks: <ul><li>Problem determination</li><li>Sysplex</li><li>z/OS classic interfaces</li> <li>z/OS Operator Console</li></ul> **Notes:** <ul><li>Start the CEA server before you start z/OSMF (the IZU* started tasks).</li><li> Set up CEA server in Full Function Mode and assign the TRUSTED attribute to the CEA started task.</li></ul> For more information, see [Customizing for CEA](https://www.ibm.com/docs/en/zos/2.5.0?topic=test-customizing-cea) on the IBM Documentation. |
| CIM (Common Information Model) Server | z/OSMF requires the CIM server to perform the following types of tasks: <ul><li>Capacity provisioning </li><li> Problem determination </li><li> Workload management </li></ul> **Note:** Start the CIM server before you start z/OSMF (the IZU* started tasks). <br/> For more information, see [Configuring the CIM server for your system](https://www.ibm.com/docs/en/zos/2.5.0?topic=configurations-configuring-cim-server-your-system)  on the IBM Documentation. <br/> For more information on how to perform asynchronous operations, review the [required authorizations for z/OSMF](https://www.ibm.com/docs/en/zos/2.5.0?topic=services-zos-jobs-rest-interface#izuhpinfo_api_restjobs__RequiredAuthorizationsForRestServices__title__1) on the IBM Documntation.|
| Console Command | The `CONSOLE` and `CONSPROF` commands must exist in the authorized command table. |
| Java version | IBM® 64-bit SDK for z/OS®, Java™ Technology Edition V8 SR4 FP10 (5655-DGH) or higher is required. However, we experienced problems accessing z/OSMF 2.2 using Java version 8. If you use z/OSMF 2.3, Java version 8.0_64 is required. <br/><br/>For more information, see [Software prerequisites for z/OSMF](https://www.ibm.com/docs/en/zos/2.5.0?topic=zosmf-software-prerequisites) on the IBM Documentation. |
| Maximum region size | To prevent exceeds maximum region size errors, ensure that you have a TSO maximum region size of at least 65536 KB for the z/OS system. |
| User IDs | User IDs require a TSO segment (access) and an OMVS segment. During workflow processing and REST API requests, z/OSMF may start one or more TSO address spaces under the following job names: <ul><li>*userid*</li><li>*substr(userid, 1, 6)//CN* (Console)</li></ul> Example: ```(userid = USRMY01, USRMY0CN )```   

## Selecting and configuring your z/OSMF plug-ins

| Plug-in        | Functionality | Task |
| ----------- | ----------- | ----------- |
| (Optional) Cloud Portal | The Cloud Portal plug-in lets you make software services available to marketplace consumers and it adds the Marketplace and Marketplace Administration tasks to the z/OSMF navigation tree. | For information about how to enable the plug-in, see [Cloud provisioning marketplace](https://www.ibm.com/docs/en/zos/2.5.0?topic=services-cloud-provisioning-marketplace) on the IBM Documentation. |
| Configuration Assistant | The Configuration Assistant plug-in lets z/OSMF configure TCP/IP policy-based networking functions.<br/>For more information about the functionality that the plug-in provides, see [Network Configuration Assistant](https://www.ibm.com/docs/en/zos/2.5.0?topic=configuration-network-assistant-task-summary) and [Security Configuration Assistant](https://www.ibm.com/docs/en/zos/2.5.0?topic=configuration-security-assistant-task) on the IBM Documentation. | For information about how to enable the plug-in, see Updating z/OS for the [Configuration Assistant plug-in](https://www.ibm.com/docs/en/zos/2.2.0?topic=ins-updating-zos-configuration-assistant-plug-in) on the IBM Documentation. |
| ISPF | The ISPF plug-in lets z/OSMF access traditional ISPF applications.<br/>For information about the functionality that the plug-in provides, see [ISPF task overview](https://www.ibm.com/docs/en/zos/2.5.0?topic=interfaces-ispf) on the IBM Documentation. | For information about how to enable the plug-in, see [Updating z/OS for the ISPF service](https://www.ibm.com/docs/en/zos/2.5.0?topic=service-updating-zos-ispf) on the IBM Documentation. |
| Workload Management | The Workload Management plug-in lets z/OSMF operate and manage workload management service definitions and policies.<br/>For information about the functionality that the plug-in provides, see [Workload Management task overview](https://www.ibm.com/docs/en/zos/2.5.0?topic=performance-workload-management-task) on the IBM Documentation. | For information about how to enable the plug-in, see Updating z/OS for the [Updating z/OS for the Workload Management service](hhttps://www.ibm.com/docs/en/zos/2.5.0?topic=service-updating-zos-workload-management) on the IBM Documentation. |
