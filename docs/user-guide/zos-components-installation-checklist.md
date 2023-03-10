# Installation and Configuration Checklist for Zowe z/OS Components for Production Purposes

Perform the steps in this checklist to streamline your installation of Zowe z/OS Components.

**Note:** _For mvp* purposes_ refers to the minimum viable product.

## Preparing and Installing
| Preparation/Installation Step | Task | Results | Time Estimate |  
|----|-----------|----|-------------|
| Plan the Installation | 1. [Plan the Installation](/docs/user-guide/installandconfig.md) <br />2. Address [USS considerations for Zowe](/docs/user-guide/configure-uss.md) <br />3. Address [System requirements](/docs/user-guide/systemrequirements.md): <br /> &nbsp;&nbsp;&nbsp;&nbsp;* [z/OS](/docs/user-guide/systemrequirements-zos.md/#zos)   <br />&nbsp;&nbsp;&nbsp;&nbsp;* [Node.js](/docs/user-guide/systemrequirements-zos.md/#nodejs)  <br /> &nbsp;&nbsp;&nbsp;&nbsp;* [Java](/docs/user-guide/systemrequirements-zos.md/#java)  <br /> &nbsp;&nbsp;&nbsp;&nbsp;* [z/OSMF](/docs/user-guide/systemrequirements-zos.md/#zosmf-optional) <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(recommended for full functionality)<br />&nbsp;&nbsp;&nbsp;&nbsp;* [z/OSMF HA](/docs/user-guide/zowe-ha-overview.md)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(required for production)           | All prerequisites satisfied to install Zowe z/OS components  |  1 day                     | 
| [Install z/OS Components](/docs/user-guide/install-zos.md) | Use one of the following installation options:<br />**Option 1: [Install Zowe runtime from a convenience build](/docs/user-guide/install-zowe-zos-convenience-build.md)**  <br />  **Option 2: [Install Zowe with SMP/E](/docs/user-guide/install-zowe-smpe.md)** <br /> **Option 3: [Install Zowe with a portable software instance](/docs/user-guide/install-zowe-pswi.md)** <br />                      | Executables and binaries are unpaxed on mainframe                |   1 hour                     |

## Configuring Zowe z/OS Components

| Configuration Step | Task | Results | Time Estimate |  
|----|-----------|----|-------------|
|Configure base | 1. Initialize Zowe<br />&nbsp;&nbsp;&nbsp;&nbsp;Use one of the following options:<br />&nbsp;&nbsp;&nbsp;&nbsp;**Option 1: [Initialize Zowe](/docs/user-guide/initialize-zos-system.md) manually** <br />&nbsp;&nbsp;&nbsp;&nbsp;**using zwe command group** <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. [Prepare zowe.yaml configuration file](/docs/appendix/zowe-yaml-configuration.md)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if the file does not already exist<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. [Initialize Zowe custom data sets](/docs/user-guide/initialize-mvs-datasets.md) <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(`zwe init mvs`)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. [APF authorize load libraries](/docs/user-guide/apf-authorize-load-library.md)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(`zwe init apfauth`)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d. [Initialize Zowe security configurations](/docs/user-guide/initialize-security-configuration.md)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(`zwe init security`)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e. [Install Zowe main started tasks](/docs/user-guide/install-stc-members.md)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(`zwe init stc`)<br />&nbsp;&nbsp;&nbsp;&nbsp;**Option 2: [Configure Zowe with z/OSMF <br />&nbsp;&nbsp;&nbsp; workflows](/docs/user-guide/configure-zowe-zosmf-workflow.md)** <br /><br />2. [Configure the z/OS system for Zowe](/docs/user-guide/configure-zos-system.md)<br />3. [Grant users permission to access z/OSMF](/docs/user-guide/grant-user-permission-zosmf.md) <br />4. [Install and configure the Zowe cross memory server (ZWESISTC)](/docs/user-guide/configure-xmem-server.md) |* All datasets are created and populated. See [Initialize MVS Datasets Results](/docs/user-guide/initialize-mvs-datasets.md/#results)<br />* Started tasks are copied to system libraries<br />* APF authorization is granted to load libraries<br />* Zowe user is created and is asigned all required permissions<br />* Your z/OS and security product are configured| 4 hours| 
| [Configure the Caching Service storage](/docs/user-guide/configure-caching-service-ha.md) | Use one of the following storage methods:<br />* **Use Infinispan** <br />* **Use VSAM**<br />(Infinispan and VSAM are the recommended storage methods and required to use Zowe in High Availability mode.) <br />* **Use inMemory**<br />(This method is designed only to perform a quick start of a service for test purposes.) | Storage for the Caching service is configured  |1 hour |
| Configure certificates | Zowe is able to use PKCS12 certificates or certificates held in a z/OS Keyring.<br /><br />Use one of the following options:<br /> **Option 1: Use zwe command group** <br />* [Configure PKCS12 certificates](/docs/user-guide/configure-certificates-keystore.md) <br />&nbsp;&nbsp;&nbsp;or<br />* [Configure JCERACFKS certificates in a key ring](/docs/user-guide/configure-certificates-keyring.md) <br />**Option 2: [Set up Zowe certificates using workflows](/docs/user-guide/certificates-setup.md)** | Your certificates are configured and stored securely|2 hours  |In-progress, <br />Complete 
| [Configure High Availability](/docs/user-guide/zowe-ha-overview.md) (optional) |Zowe has a high availability feature built-in, but your system should be properly configured to enable it. <br />1. [Configure Sysplex for high availability](/docs/user-guide/configure-sysplex.md) <br />2. [Configure z/OSMF for high availability in Sysplex](/docs/user-guide/systemrequirements-zosmf-ha.md) <br />3. [Define the `haInstances` section in your zowe.yaml](/docs/appendix/zowe-yaml-configuration.md)<br />| Zowe z/OS components are able to run in HA mode |2 hours  |

## Starting and Stopping Zowe  

| Start/Stop Step | Task | Results | Time Estimate |  
|----|-----------|----|-------------|
|[Start and stop the cross memory server `ZWESISTC` on z/OS](/docs/user-guide/start-zowe-zos.md#starting-and-stopping-the-cross-memory-server-zwesistc-on-zos) | The `ZWESISTC` task starts and stops the `ZWESASTC` task as needed | The cross memory server is run as a started task from the JCL in the PROCLIB member `ZWESISTC` | 5 minutes|
|Start and stop the Zowe main server `ZWESLSTC` on z/OS |**Option 1: [Use zwe to start and stop the main Zowe server](/docs/user-guide/start-zowe-zos.md#starting-and-stopping-zowe-main-server-zweslstc-on-zos-with-zwe-server-command)**<br /><p></p>**Option 2: [Manually start and stop the Zowe main server `ZWESLSTC`](/docs/user-guide/start-zowe-zos.md#starting-and-stopping-zowe-main-server-zweslstc-on-zos-manually)** | You started or stopped Zowe main server `ZWESLSTC` on z/OS with `zwe` or manually | 20 minutes |

## Verify Zowe installation on z/OS

| Verification Step | Task | Results | Time Estimate | 
|----|-----------|----|-------------|
| [Verify Zowe Application Framework installation](/docs/user-guide/verify-zowe-runtime-install.md#verifying-zowe-application-framework-installation) | Open the Zowe Desktop from a supported browser | You should be able to open the Zowe Desktop from a supported browser. | 20 minutes| 
| [Verify API Mediation installation](/docs/user-guide/verify-zowe-runtime-install.md#verifying-api-mediation-installation) |Use a REST API client to review the value of the status variable of the API Catalog service routed through the API Gateway | See the example presented in Verify API Mediation installation | 15 minutes |
|[Verify z/OS Services installation](/docs/user-guide/verify-zowe-runtime-install.md#verifying-zos-services-installation) |Zowe z/OS services usually are registered with Zowe APIML Discovery| You should see JSON format data of all jobs running on the system | 15 minutes |





