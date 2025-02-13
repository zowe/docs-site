# Configuring Overview

Review this article for an overview of the procedures that must be performed to configure Zowe z/OS components and the z/OS system. More details about the individual procedures are provided in the articles in this section. 

:::info Required roles: system programmer, security administrator
:::

Configuring Zowe z/OS components consists of the following four main steps:

1. Configure Zowe runtime
2. Configure the z/OS system for Zowe
3. Assign security permissions
4. Configure the Zowe cross memory server (ZIS)

:::note
Successful completion of steps 2, 3, and 4 may require elevated security permissions. We recommend you consult with your security administrator to assist with performing these steps. 
:::

## Configuring Zowe runtime

To cofigure Zowe runtime, choose from the following options:

* **Option 1: Configure Zowe manually using the `zwe init` command group**  
To run the `zwe init` command, it is necessary to create a Zowe configuration file. For more information about this file, see the [Runtime directory](./installandconfig.md#runtime-directory) which details all of the started tasks in the article _Preparing for installation_.

    Once your configuration file is prepared, see [Configuring Zowe with zwe init](./initialize-zos-system.md), for more information about using the `zwe init` command group.

* **Option 2: Configure Zowe with z/OSMF workflows**  
You can execute the Zowe configuration workflow either from a PSWI during deployment, or later from a created software instance in z/OSMF. Alternatively, you can execute the configuration workflow z/OSMF during the workflow registration process.

    For more information about configuring all Zowe server-side components, see [Configuring Zowe with z/OSMF Workflows](./configure-zowe-zosmf-workflow.md). 

    To simplify configuration for Zowe API Mediation Layer, see 
[Configuring API ML with z/OSMF Workflows](./configure-apiml-zosmf-workflow-2-18.md).

## Configuring the z/OS system for Zowe

Configuration of the z/OS system is dependent on the specific Zowe features and functionalities you would like to employ with your Zowe installation. 

:::tip
Note that configuring the z/OS system requires elevated permissions. We recommend you consult with your security administrator to perform the reqired steps to configure the z/OS system.
:::

For more information, see [Configuring the z/OS system for Zowe](./configure-zos-system.md).

## Assigning security permissions

Specific user IDs with sufficient permissions are required to run or access Zowe. Your organization's security administrator is responsible to assign user IDs during Zowe z/OS component configuration.

In addition, each TSO user ID that logs on to Zowe services that require z/OSMF must have permissions to access these z/OSMF services. This user ID should be added to either `IZUUSER` or `IZUADMIN` (default).

:::tip
Granting users permissions requires elevated permissions. We recommend you consult with your security administrator to grant these user permissions.
:::

For more information about granting the user permissions, see [Assigning security permissions to users](./assign-security-permissions-to-users.md).

## Configuring the Zowe cross memory server (ZWESISTC)

The Zowe cross memory server (ZIS), provides privileged cross-memory services to the Zowe Desktop and runs as an APF-authorized program. The same cross memory server can be used by multiple Zowe desktops. The cross memory server is needed to be able to log on to the Zowe desktop and operate its apps such as the Code Editor. 

For more information, see [Configuring the Zowe cross memory server (ZIS)](./configure-xmem-server.md).



