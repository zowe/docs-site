# Configuring Overview

Review this article for for an overview of the procedures that must be performed to configure Zowe z/OS components and the z/OS system. More details about the individual procedures are provided in the articles in this section. 

**Roles required: system programmer, security administrator**

Configuring Zowe z/OS components consists of the following four main steps:

1. Initialize Zowe z/OS runtime
2. Configure the z/OS system for Zowe
3. Grant users permission to access z/OSMF
4. Install and configure the Zowe cross memory server (ZWESISTC)

**Note:** Successful completion of steps 2 and 3 require elevated security permissions. We recommend you consult with your security administrator to assist with performing these steps. 

## Initialize Zowe z/OS runtime

To initialize Zowe z/OS runtime, choose from the following options:

* Option 1: Intialize Zowe manually using the `zwe init` command group
* Option 2: Configure Zowe with z/OSMF workflows

**Option 1**: To run the `zwe init` command, it is necessary to create a Zowe configuration file. For more information about this file, see [Zowe configuration file](./installandconfig/#zowe-configuration-file). 

For more information about using the `zwe init` command group, see [Initializing the z/OS system with `zwe init`](./initialize-zos-system.md).

**Option 2**: You can execute the Zowe configuration workflow either from a PSWI during deployment, or later from a created software instance in z/OSMF. Alternatively, you can execute the configuration workflow z/OSMF during the workflow registration process.

For more information, see [Configure Zowe with z/OSMF Workflows](./configure-zowe-zosmf-workflow.md).

## Configure the z/OS system for Zowe

Configuration of the z/OS system is dependent on the specific Zowe features and functionalities you would like to employ with your Zowe installation. 

**Tip:** Note that configuring the z/OS system requires elevated permissions. We recommend you consult with your security administrator to perform the reqired steps to configure the z/OS system.

For more information, see [Configuring the z/OS system for Zowe](./configure-zos-system.md).

## Grant users permission to access z/OSMF

Each TSO user ID that logs on to Zowe services that require z/OSMF must have permissions to access these z/OSMF services. This user ID should be added to either `IZUUSER` or `IZUADMIN` (default). 

**Tip:** Granting users permissions to access z/OSMF requires elevated permissions. We recommend you consult with your security administrator to grant these user permissions.

For more information about granting the user permissions, see [Granting users permissions to access z/OSMF](./grant-user-permission-zosmf.md).

## Install and configure the Zowe cross memory server (ZWESISTC)

The Zowe cross memory server (ZIS), provides privileged cross-memory services to the Zowe Desktop and runs as an APF-authorized program. The same cross memory server can be used by multiple Zowe desktops. The cross memory server is needed to be able to log on to the Zowe desktop and operate its apps such as the Code Editor. 

For more information, see [Installing and configuring the Zowe cross memory server (ZWESISTC)](./configure-xmem-server.md).



