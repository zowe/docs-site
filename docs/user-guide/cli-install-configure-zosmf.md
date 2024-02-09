# Configuring z/OSMF

Complete the following IBM z/OSMF configuration tasks for your Zowe CLI implementation.

:::info**Required role:** systems programmer
:::

## Obtainaing z/OSMF installation and configuration materials

Before you start the configuration process, review [Overview of z/OSMF](https://www.ibm.com/docs/en/zos/2.2.0?topic=introduction-overview-zosmf) in the IBM Documentation. Use the [First-Time Installation Checklist](https://www.ibm.com/docs/en/zos/2.2.0?topic=introduction-project-plans-configuring-zosmf) from IBM to plan your installation and complete all the required steps.

## Installing and Configuring z/OSMF

Zowe CLI was designed and tested to integrate with z/OSMF running on IBM version 2.2 z/OS mainframe systems. To use Zowe CLI, ensure that your z/OS system meets the requirements that are described in the following table:

| Requirement        | Description |
| ----------- | ----------- |
| AXR (System Rexx) | The AXR (System Rexx) component lets z/OS perform Incident Log tasks. It also lets REXX execs execute outside of conventional TSO and batch environments. <br/>For more information, see [Communicating with System REXX](https://www.ibm.com/docs/en/zos/2.2.0?topic=command-communicating-system-rexx) on the IBM Knowledge Center. |
| CEA (Communications Enabled Applications)  Server | CEA server is a co-requisite for the CIM server. The CEA server lets z/OSMF deliver z/OS events to C-language clients. <br/>z/OSMF requires the CEA server to perform the following types of tasks: <ul><li>Problem determination</li><li>Sysplex</li><li>z/OS classic interfaces</li> <li>z/OS Operator Console</li></ul> **Notes:** <ul><li>Start the CEA server before you start the start z/OSMF (the IZU* started tasks).</li><li> Set up CEA server in Full Function Mode and assign the TRUSTED attribute to the CEA started task.</li></ul> For more information, see [Customizing for CEA](https://www.ibm.com/docs/en/zos/2.2.0?topic=test-customizing-cea) on the IBM Knowledge Center. |
| CIM (Common Information Model) Server | z/OSMF requires the CIM server to perform the following types of tasks: <ul><li>Capacity provisioning </li><li> Problem determination </li><li> Workload management </li></ul> **Note:** Start the CIM server before you start z/OSMF (the IZU* started tasks). <br/> For more information, see [Reviewing your CIM](https://www.ibm.com/docs/en/zos/2.2.0?topic=ins-reviewing-your-cim-server-setupm) server setup on the IBM Knowledge Center. |
| Console Command | The `CONSOLE` and `CONSPROF` commands must exist in the authorized command table. |
| Java version | IBM 64-bit SDK for z/OS, Java Technology Edition V7.1 or higher is required. However, we experienced problems accessing z/OSMF 2.2 using Java version 8. If you use z/OSMF 2.3, Java version 8.0_64 is required. <br/>```SYS1.PARMLIB member  IZUPRMxx.... JAVA_HOME('/sys/java64bt/v7r1m0/usr/lpp/java/J7.1_64'/etc/profile ............................................... export JAVA_HOME=/sys/java31bt/v7r1m0/usr/lpp/java/J7.1 ```<br/>For more information, see [Software prerequisites for z/OSMF](https://www.ibm.com/docs/en/zos/2.2.0?topic=zosmf-software-prerequisites) on the IBM Knowledge Center. |
| Maximum region size | To prevent exceeds maximum region size errors, ensure that you have a TSO maximum region size of at least 65536 KB for the z/OS system. |
| User IDs | User IDs require a TSO segment (access) and an OMVS segment. During workflow processing and REST API requests, z/OSMF may start one or more TSO address spaces under the following job names: <ul><li>*userid*</li><li>*substr(userid, 1, 6)//CN* (Console)</li></ul> Example: ```(userid = USRMY01, USRMY0CN )```

## Selecting and configuring your z/OSMF plug-ins

| Plug-in        | Functionality | Task |
| ----------- | ----------- | ----------- |
| (Optional) Cloud Portal | The Cloud Portal plug-in lets you make software services available to marketplace consumers and it adds the Marketplace and Marketplace Administration tasks to the z/OSMF navigation tree. | For information about how to enable the plug-in, see [Updating z/OS for the Cloud Portal plug-in](https://www.ibm.com/docs/en/zos/2.2.0?topic=provisioning-updating-zos-cloud-portal-plug-in) on the IBM Knowledge Center. |
| Configuration Assistant | The Configuration Assistant plug-in lets z/OSMF configure TCP/IP policy-based networking functions.<br/>For more information about the functionality that the plug-in provides, see [Configuration Assistant task overview](https://www.ibm.com/docs/en/zos/2.2.0?topic=tasks-configuration-assistant-task-overview) on the IBM Knowledge Center. | For information about how to enable the plug-in, see Updating z/OS for the [Configuration Assistant plug-in](https://www.ibm.com/docs/en/zos/2.2.0?topic=ins-updating-zos-configuration-assistant-plug-in) on the IBM Knowledge Center. |
| ISPF | The ISPF plug-in lets z/OSMF access traditional ISPF applications.<br/>For information about the functionality that the plug-in provides, see [ISPF task overview](https://www.ibm.com/docs/en/zos/2.2.0?topic=tasks-ispf-task-overview) on the IBM Knowledge Center. | For information about how to enable the plug-in, see [Updating z/OS for the ISPF plug-in](https://www.ibm.com/docs/en/zos/2.2.0?topic=ins-updating-zos-ispf-plug-in) on the IBM Knowledge Center. |
| Workload Management | The Workload Management plug-in lets z/OSMF operate and manage workload management service definitions and policies.<br/>For information about the functionality that the plug-in provides, see [Workload Management task overview](https://www.ibm.com/docs/en/zos/2.2.0?topic=tasks-workload-management-task-overview) on the IBM Knowledge Center. | For information about how to enable the plug-in, see Updating z/OS for the [Workload Management plug-in](https://www.ibm.com/docs/en/zos/2.2.0?topic=ins-updating-zos-workload-management-plug-in) on the IBM Knowledge Center. |
