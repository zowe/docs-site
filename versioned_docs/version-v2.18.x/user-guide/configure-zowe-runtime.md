# Initializing Zowe z/OS runtime

Begin configuration of your installation of Zowe z/OS components by initializing Zowe z/OS runtime.

:::info Required roles: system programmer
:::

Use one of the following options to initialize Zowe z/OS runtime:

* Initialize Zowe maunually using zwe init command group
* Configure Zowe with z/OSMF workflows

## Initialize Zowe manually using zwe init command group

After your installation of Zowe runtime, you can run the `zwe init` command to perform the following configurations:

* Initialize Zowe with copies of data sets provided with Zowe
* Create user IDs and security manager settings (Security Admin)
* Provide APF authorize load libraries (Security Admin)
* Configure Zowe to use TLS certificates (Security Admin)
* Configure VSAM files to run the Zowe caching service used for high availability (HA)
* Configure the system to launch the Zowe started task

For more information about this z/OS runtime initialization method, see [Configuring Zowe with zwe init](./initialize-zos-system.md)

## Configure Zowe with z/OSMF workflows

Another option to initialize Zowe z/OS runtime is to configure Zowe with z/OSMF workflows. This method also performs the initization using the `zwe init` command group. You can use z/OSMF workflows to perform the following configurations:

* Configure the Zowe instance directory
* Enable the API ML gateway
* Enable the metrics service
* Enable the API catalog
* Enable automatic discovery
* Enable a caching service
* Enable an application server
* Enable the ZSS component
* Enable the jobs API
* Enable the files API
* Enable JES Explorer
* Enable MVS Explorer
* Enable USS Explorer

You can execute the Zowe configuration workflow either from a PSWI during deployment, or later from a created software instance in z/OSMF. Alternatively, you can execute the configuration z/OSMF workflow during the workflow registration process.

For more information about this z/OS runtime initialization method, see [Configuring Zowe with z/OSMF Workflows](./configure-zowe-zosmf-workflow).

For details about API ML optimized initialization, see [Configuring API ML with z/OSMF Workflows](./configure-apiml-zosmf-workflow-2-18).