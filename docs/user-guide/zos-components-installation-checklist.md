# Zowe z/OS components installation checklist

Use this checklist to guide you through the installation and configuration of Zowe server-side components for z/OS. 


## Preparing for installation
| Task | Results | Time Estimate |  
|----|-----------------------|---|
| [Review the Zowe server-side installation overview](../user-guide/install-zos.md) | Understand the basic installation stages and the roles and responsibilities to perform the installation |    25 minutes   |                        
| [Prepare for installation](./installandconfig)| Understand the key-concepts in server-side installation |  25 minutes                    | 
| Address pre-installation requirements | The following pre-installation requirements are addressed: <br /> &nbsp;&nbsp;&nbsp;&nbsp;* [z/OS](./systemrequirements-zos)   <br />&nbsp;&nbsp;&nbsp;&nbsp;* [security](./address-security-requirements) <br />&nbsp;&nbsp;&nbsp;&nbsp;* [USS](./configure-uss) <br />&nbsp;&nbsp;&nbsp;&nbsp;* [storage](./address-storage-requirements) <br />&nbsp;&nbsp;&nbsp;&nbsp;* [network](./address-network-requirements) <br />&nbsp;&nbsp;&nbsp;&nbsp;* [Node.js](./install-nodejs-zos.md)  <br /> &nbsp;&nbsp;&nbsp;&nbsp;* [Java](../user-guide/systemrequirements-zos.md#java)  <br /> &nbsp;&nbsp;&nbsp;&nbsp;* [z/OSMF](../user-guide/systemrequirements-zos.md#zosmf-optional) <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(recommended for full functionality)<br />&nbsp;&nbsp;&nbsp;&nbsp;* [z/OSMF HA](../user-guide/zowe-ha-overview.md)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(required for production)            |  1 day                     | 

## Installing the Zowe z/OS runtime

Choose from the following installation options to install Zowe server-side components for z/OS.

| Task | Results | Time Estimate |  
|--------------------|----|------|
|  **Option 1: [Install Zowe with SMP/E](./install-zowe-smpe)** <br /><br /> **Option 2: [Install Zowe with z/OSMF from a portable software instance](./install-zowe-pswi)** <br /><br /> **Option 3: [Install Zowe SMP/E build with z/OSMF workflow](./install-zowe-smpe-zosmf-workflow)** <br /><br /> **Option 4: [Install Zowe via a convenience build (PAX file)](../user-guide/install-zowe-zos-convenience-build.md)**                     | Executables and binaries are unpaxed on the mainframe                |   1 hour                     |

## Configuring Zowe z/OS Components 

Choose the following options to initialize  Zowe z/OS runtime:

| Task | Results | Time Estimate |  
|-----------------------|----|------|
|  **Option 1: [Configure Zowe with zwe init](../user-guide/initialize-zos-system.md)**  <br /><br /> **Option 2: [Configure Zowe with z/OSMF workflows](../user-guide/configure-zowe-zosmf-workflow.md)**  | * All datasets are created and populated. <br /> * Started tasks are copied to system libraries  <br /><br />**Important:** Security administrator permissions are required for some zwe init sub-commands to pass.<br /> <br /> See [Initialize MVS Datasets Results](../user-guide/initialize-mvs-datasets.md#results). | 1 hour

## Configuring security

Configure Zowe and your z/OS system to run Zowe with z/OS.

| Task | Results | Time Estimate |  
|--------------------|----|------|
|[Review Configuring security](./configuring-security.md) | Learn about which tasks need to be performed by the security administrator. | 10 minutes|
[Initialize Zowe security configurations](./initialize-security-configuration) |  The JCL member to configure the z/OS system is created.   | 10 minutes | 
[Perform APF authorization of load libraries](./apf-authorize-load-library.md) | APF authorization is granted to load libraries.  | 10 minutes  | 
[Address z/OS requirements for Zowe](./configure-zos-system.md) | Your z/OS and security product are configured.  | 2 hours  |
[Assign security permissions to users](./assign-security-permissions-to-users.md) | Zowe user is created and is asigned all required permissions.  | 30 minutes |


## Configuring certificates

Zowe is able to use PKCS12 certificates or certificates held in a z/OS Keyring.

| Task | Results | Time Estimate |  
|--------------------|----|------|
| Read the article [Zowe certificate configuration overview](../user-guide/configure-certificates.md). Then use one of the following options:<br /><br /> **Option 1: Review [certificate configuration scenarios](../user-guide/certificate-configuration-scenarios.md)** to determine which scenario best applies to your use case and follow the procedure in this section that suits your use case. <br /> <br /> **Option 2: [Set up Zowe certificates using workflows](../user-guide/certificates-setup.md)** | Your certificates are configured and stored securely|2 hours  

## Configuring the Zowe cross memory server (ZIS)

The Zowe cross memory server (ZIS) provides privileged cross-memory services to the Zowe Desktop and runs as an APF-authorized program.

:::note
To start Zowe without the desktop (for example bring up just the API Mediation Layer), you do not need to install and configure a cross memory server and can skip this step.
:::

| Task | Results | Time Estimate |  
|--------------------|----|------|
| [Configure the Zowe cross memory server (ZIS)](./configure-xmem-server.md) | * JCL member `ZWESLSTC` is copied from `SZWESAMP` installation PDS to a PDS on the JES concatenation path. <br /> * The PDSE Load Library `SZWEAUTH` is APF-authorized, or Load module ZWESI00 is copied to an existing APF Auth LoadLib.<br /> * The JCL member `ZWESLSTC DD` statements are updated to point to the location of `ZWESI00` and `ZWESIP00`. | 30 minutes 

## Configuring High Availability (optional)
| Task | Results | Time Estimate |  
|--------------------|----|------|
|Zowe has a high availability feature built-in, but your system should be properly configured to enable it. <br />1. [Configure Sysplex for high availability](../user-guide/configure-sysplex.md) <br />2. [Configure z/OSMF for high availability in Sysplex](../user-guide/systemrequirements-zosmf-ha.md) <br />3. [Configure the Caching Service storage](../user-guide/configure-caching-service-ha.md)<br />4. [Define the `haInstances` section in your zowe.yaml](../appendix/zowe-yaml-configuration.md)<br />| Zowe z/OS components are able to run in HA mode |2 hours  |

## Starting and Stopping Zowe  

| Start/Stop Step | Task | Results | Time Estimate |  
|----|-----------|----|-------------|
|[Start and stop the cross memory server `ZWESISTC` on z/OS](../user-guide/start-zowe-zos.md#starting-and-stopping-the-cross-memory-server-zwesistc-on-zos) | The `ZWESISTC` task starts and stops the `ZWESASTC` task as needed | The cross memory server is run as a started task from the JCL in the PROCLIB member `ZWESISTC` | 5 minutes|
|Start and stop the Zowe main server `ZWESLSTC` on z/OS |**Option 1: [Use zwe to start and stop the main Zowe server](../user-guide/start-zowe-zos.md#starting-and-stopping-zowe-main-server-zweslstc-on-zos-with-zwe-server-command)**<br /><p></p>**Option 2: [Manually start and stop the Zowe main server `ZWESLSTC`](../user-guide/start-zowe-zos.md#starting-and-stopping-zowe-main-server-zweslstc-on-zos-manually)** | You started or stopped Zowe main server `ZWESLSTC` on z/OS with `zwe` or manually | 20 minutes |

## Verifying Zowe installation on z/OS

| Verification Step | Task | Results | Time Estimate | 
|----|-----------|----|-------------|
| [Verify Zowe Application Framework installation](../user-guide/verify-zowe-runtime-install.md#verifying-zowe-application-framework-installation) | Open the Zowe Desktop from a supported browser | You should be able to open the Zowe Desktop from a supported browser. | 20 minutes| 
| [Verify API Mediation installation](../user-guide/verify-zowe-runtime-install.md#verifying-api-mediation-installation) |Use a REST API client to review the value of the status variable of the API Catalog service routed through the API Gateway | See the example presented in Verify API Mediation installation | 15 minutes |
|[Verify z/OS Services installation](../user-guide/verify-zowe-runtime-install.md#verifying-zos-services-installation) |Zowe z/OS services usually are registered with Zowe APIML Discovery| You should see JSON format data of all jobs running on the system | 15 minutes |





