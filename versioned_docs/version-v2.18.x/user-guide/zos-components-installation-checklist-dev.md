# Installation Checklist for Zowe z/OS Components for Testing and Minimum Viable Product (MVP)

Follow the steps in this checklist to guide you through the installation of Zowe z/OS Components for testing purposes or for the minimum viable product. Use this installation procedure to get familiar with Zowe installation time, performance and system requirements, or to develop a plug-in for a Zowe component. This procedure does not require configuration of high availability.


## Planning and preparing for the installation
| Task | Results | Time Estimate |  
|----|-----------------------|---|
| [Review the Zowe installation roadmap](../user-guide/install-zos.md) | Understand the basic installation stages |    25 minutes   |                        
| [Plan the Installation](../user-guide/installandconfig.md)| Plan the installation and address USS considerations for Zowe |  25 minutes                    | 
| [Address System requirements](../user-guide/installandconfig.md)| System requirements are addressed: <br /> &nbsp;&nbsp;&nbsp;&nbsp;* [z/OS](../user-guide/systemrequirements-zos.md#zos)   <br />&nbsp;&nbsp;&nbsp;&nbsp;* [Node.js](../user-guide/systemrequirements-zos.md#nodejs)  <br /> &nbsp;&nbsp;&nbsp;&nbsp;* [Java](../user-guide/systemrequirements-zos.md#java)  <br /> &nbsp;&nbsp;&nbsp;&nbsp;* [z/OSMF](../user-guide/systemrequirements-zos.md#zosmf-optional) <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(recommended for full functionality)<br />&nbsp;&nbsp;&nbsp;&nbsp;* [z/OSMF HA](../user-guide/zowe-ha-overview.md)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(required for production)            |  1 day                       |

## Installing the Zowe z/OS runtime

Use one of the following installation options to install Zowe z/OS components.

| Task | Results | Time Estimate |  
|--------------------|----|------|
| **Option 1: [Install Zowe runtime from a convenience build](../user-guide/install-zowe-zos-convenience-build.md)**  <br />  **Option 2: [Install Zowe with SMP/E](../user-guide/install-zowe-smpe.md)** <br /> **Option 3: [Install Zowe with a portable software instance](../user-guide/install-zowe-pswi.md)** <br />                      | Executables and binaries are unpaxed on mainframe                |   1 hour  

## Configuring Zowe z/OS Components

| Task | Results | Time Estimate |  
|-----------------------|----|------|
| 1. Use one of the following options to initialize Zowe z/OS runtime.<br />**Option 1: [Initialize Zowe manually using zwe init command group](../user-guide/initialize-zos-system.md)  <br />** **Option 2: [Configure Zowe with z/OSMF workflows](../user-guide/configure-zowe-zosmf-workflow.md)** <br /> **Option 3: [Configuring API ML with z/OSMF Workflows](../user-guide/configure-apiml-zosmf-workflow-2-18.md)** <br /> <br /> 2. [Configure the z/OS system for Zowe](../user-guide/configure-zos-system.md)<br />3. [Grant users permission to access z/OSMF](../user-guide/assign-security-permissions-to-users/#granting-users-permission-to-access-zosmf) <br />4. [Install and configure the Zowe cross memory server (ZWESISTC)](../user-guide/configure-xmem-server.md) | * All datasets are created and populated. See [Initialize MVS Datasets Results](../user-guide/initialize-mvs-datasets.md#results)<br /> * Started tasks are copied to system libraries<br /> * APF authorization is granted to load libraries<br /> * Zowe user is created and is asigned all required permissions<br /> * Your z/OS and security product are configured| 4 hours| 

## Configuring certificates

| Task | Results | Time Estimate |  
|--------------------|----|------|
| Zowe is able to use PKCS12 certificates or certificates held in a z/OS Keyring.<br /><br />Read the article [Zowe certificate configuration overview](../user-guide/configure-certificates.md). Then use one of the following options:<br /><br /> **Option 1:** Review [Zowe certificates configuration questionnaire](../user-guide/certificates-configuration-questionnaire.md) and [certificate configuration scenarios](../user-guide/certificate-configuration-scenarios.md) to determine which scenario best applies to your use case. <br /> Once you have imported or generated a certificate, see [Use certificates](../user-guide/use-certificates.md).  <br />**Option 2:** [Set up Zowe certificates using workflows](../user-guide/certificates-setup.md) | Your certificates are configured and stored securely|2 hours  


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





