# Installation Checklist for Zowe z/OS Components for Testing and Minimum Viable Product (MVP)

Follow the steps in this checklist to guide you through the installation of Zowe z/OS Components for testing purposes or for the minimum viable product. Use this installation procedure to get familiar with Zowe installation time, performance and system requirements, or to develop a plug-in for a Zowe component. This procedure does not require configuration of high availability.


## Preparing and Installing
| Preparation/Installation Step | Task | Results | Time Estimate |  
|----|-----------|----|-------------|
| Plan the Installation <br />and address system requirements| 1. [Plan the Installation](../user-guide/installandconfig.md) <br />2. Address [USS considerations for Zowe](../user-guide/configure-uss.md) <br />3. Address [System requirements](../user-guide/systemrequirements.md): <br /> &nbsp;&nbsp;&nbsp;&nbsp;* [z/OS](../user-guide/systemrequirements-zos.md/#zos)   <br />&nbsp;&nbsp;&nbsp;&nbsp;* [Node.js](../user-guide/systemrequirements-zos.md/#nodejs)  <br /> &nbsp;&nbsp;&nbsp;&nbsp;* [Java](../user-guide/systemrequirements-zos.md/#java)  <br /> &nbsp;&nbsp;&nbsp;&nbsp;* [z/OSMF](../user-guide/systemrequirements-zos.md/#zosmf-optional) <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(recommended for full functionality)<br />&nbsp;&nbsp;&nbsp;&nbsp;* [z/OSMF HA](../user-guide/zowe-ha-overview.md)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(required for production)           | All prerequisites satisfied to install Zowe z/OS components  |  1 day                     | 

## Configuring Zowe z/OS Components

| Configuration Step | Task | Results | Time Estimate |  
|----|-----------|----|-------------|
|Configure base | 1. Initialize Zowe<br />&nbsp;&nbsp;&nbsp;&nbsp;Use one of the following options:<br />&nbsp;&nbsp;&nbsp;&nbsp;**Option 1: [Initialize Zowe](../user-guide/initialize-zos-system.md) manually** <br />&nbsp;&nbsp;&nbsp;&nbsp;**using zwe command group** <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. [Prepare zowe.yaml configuration file](../appendix/zowe-yaml-configuration.md)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if the file does not already exist<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. [Initialize Zowe custom data sets](../user-guide/initialize-mvs-datasets.md) <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(`zwe init mvs`)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. [APF authorize load libraries](../user-guide/apf-authorize-load-library.md)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(`zwe init apfauth`)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d. [Initialize Zowe security configurations](../user-guide/initialize-security-configuration.md)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(`zwe init security`)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e. [Install Zowe main started tasks](../user-guide/install-stc-members.md)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(`zwe init stc`)<br />&nbsp;&nbsp;&nbsp;&nbsp;**Option 2: [Configure Zowe with z/OSMF <br />&nbsp;&nbsp;&nbsp; workflows](../user-guide/configure-zowe-zosmf-workflow.md)** <br /><br />2. [Configure the z/OS system for Zowe](../user-guide/configure-zos-system.md)<br />3. [Grant users permission to access z/OSMF](../user-guide/grant-user-permission-zosmf.md) <br />4. [Install and configure the Zowe cross memory server (ZWESISTC)](../user-guide/configure-xmem-server.md) |* All datasets are created and populated. See [Initialize MVS Datasets Results](../user-guide/initialize-mvs-datasets.md/#results)<br />* Started tasks are copied to system libraries<br />* APF authorization is granted to load libraries<br />* Zowe user is created and is asigned all required permissions<br />* Your z/OS and security product are configured| 4 hours| 
| [Configure the Caching Service storage](../user-guide/configure-caching-service-ha.md) | Use one of the following storage methods:<br />* **Use inMemory**<br />(This method is designed only to perform a quick start of a service for test purposes. This method is the simplest to implement and recommended for testing.)<br />* **Use Infinispan** <br />* **Use VSAM**<br />(Infinispan and VSAM are the recommended storage methods for production and required to use Zowe in High Availability mode.) <br /> | Storage for the Caching service is configured  |1 hour |
| Configure certificates | Zowe is able to use PKCS12 certificates or certificates held in a z/OS Keyring.<br /><br />Use one of the following options:<br /> **Option 1: Use zwe command group** <br />* [Configure PKCS12 certificates](../user-guide/configure-certificates-keystore.md)<br />(This method allows you to create a self-signed PKCS12 certificate, and is the simplest configuration for mvp) <br />&nbsp;&nbsp;&nbsp;or<br />* [Configure JCERACFKS certificates in a key ring](../user-guide/configure-certificates-keyring.md) <br />**Option 2: [Set up Zowe certificates using workflows](../user-guide/certificates-setup.md)** | Your certificates are configured and stored securely|2 hours  |In-progress, <br />Complete 

## Starting and Stopping Zowe  

| Start/Stop Step | Task | Results | Time Estimate |  
|----|-----------|----|-------------|
|[Start and stop the cross memory server `ZWESISTC` on z/OS](../user-guide/start-zowe-zos.md#starting-and-stopping-the-cross-memory-server-zwesistc-on-zos) | The `ZWESISTC` task starts and stops the `ZWESASTC` task as needed | The cross memory server is run as a started task from the JCL in the PROCLIB member `ZWESISTC` | 5 minutes|
|Start and stop the Zowe main server `ZWESLSTC` on z/OS |**Option 1: [Use zwe to start and stop the main Zowe server](../user-guide/start-zowe-zos.md#starting-and-stopping-zowe-main-server-zweslstc-on-zos-with-zwe-server-command)**<br /><p></p>**Option 2: [Manually start and stop the Zowe main server `ZWESLSTC`](../user-guide/start-zowe-zos.md#starting-and-stopping-zowe-main-server-zweslstc-on-zos-manually)** | You started or stopped Zowe main server `ZWESLSTC` on z/OS with `zwe` or manually | 20 minutes |

## Verify Zowe installation on z/OS

| Verification Step | Task | Results | Time Estimate | 
|----|-----------|----|-------------|
| [Verify Zowe Application Framework installation](../user-guide/verify-zowe-runtime-install.md#verifying-zowe-application-framework-installation) | Open the Zowe Desktop from a supported browser | You should be able to open the Zowe Desktop from a supported browser. | 20 minutes| 
| [Verify API Mediation installation](../user-guide/verify-zowe-runtime-install.md#verifying-api-mediation-installation) |Use a REST API client to review the value of the status variable of the API Catalog service routed through the API Gateway | See the example presented in Verify API Mediation installation | 15 minutes |
|[Verify z/OS Services installation](../user-guide/verify-zowe-runtime-install.md#verifying-zos-services-installation) |Zowe z/OS services usually are registered with Zowe APIML Discovery| You should see JSON format data of all jobs running on the system | 15 minutes |





