# Installation and Configuration Checklist for Zowe z/OS Components for Production Purposes

Perform the steps in this checklist to streamline your installation of Zowe z/OS Components.

**Note:** _For mvp* purposes_ refers to the minimum viable product.

## Preparing and Installing
| Task | Description | Results | Time Estimate |  
|----|-----------|----|-------------|
| [Plan the Installation](/docs/user-guide/installandconfig.md) | **Address the following [System requirements](/docs/user-guide/systemrequirements.md):** <br /> * [z/OS](/docs/user-guide/systemrequirements-zos.md)   <br />* [Node.js](/docs/user-guide/systemrequirements-zos.md)  <br /> * [Java](/docs/user-guide/systemrequirements-zos.md)  <br /> * [z/OSMF](/docs/user-guide/systemrequirements-zos.md) <br />&nbsp;&nbsp;(recommended for full functionality)<br />* [z/OSMF HA](/docs/user-guide/zowe-ha-overview.md)<br />&nbsp;&nbsp;(required for production)           | Add results  |  1 day                     | 
| [Install z/OS Components](/docs/user-guide/install-zos.md) | **Option 1: [Install Zowe runtime from a convenience build](/docs/user-guide/install-zowe-zos-convenience-build.md)**  <br />(for testing/mvp* purposes / not production)  <br /> **Option 2: [Install Zowe with SMP/E](/docs/user-guide/install-zowe-smpe.md)** <br />(for production or testing/mvp* purposes)<br /> **Option 3: [Install Zowe with a portable software instance](/docs/user-guide/install-zowe-pswi.md)** <br />(for production or testing/mvp* purposes)                      | Executables and binaries are unpaxed on mainframe                |   1 hour                     |

## Configuring Zowe z/OS Components

| Task | Description | Results | Time Estimate |  
|----|-----------|----|-------------|
|**Configure base** <br /><p></p>Use one of the following options:<p></p> <br /> [**Option 1:** Configure Zowe with z/OSMF workflows](/docs/user-guide/configure-zowe-zosmf-workflow.md)<br />or<br /><p></p>**Option 2:** Use zwe command group and manual configuration<br /> <br /> | **Option 1: Configure Zowe with z/OSMF workflows**<br />z/OSMF automates the base configuration process by internally using the zwe command group. This option makes it possible to  [Use Infinispan as a storage solution through the Caching service](/docs/extend/extend-apiml/api-mediation-infinispan.md), which is the recommended option.<br /><p></p> **Option 2: Use the zwe command group** <br />&nbsp;&nbsp; 1. [Initialize the z/OS system](/docs/user-guide/initialize-zos-system.md)     <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. [Initialize Zowe custom data sets](/docs/user-guide/initialize-mvs-datasets.md) <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. [Initialize Zowe security configurations](/docs/user-guide/initialize-security-configuration.md) <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. [APF authorize load libraries](/docs/user-guide/apf-authorize-load-library.md) <br />&nbsp;&nbsp;&nbsp;2.  [Configure the z/OS system for Zowe](/docs/user-guide/configure-zos-system.md) <br />&nbsp;&nbsp;&nbsp;3. [Grant users permission to access z/OSMF](/docs/user-guide/grant-user-permission-zosmf.md) <br />&nbsp;&nbsp;&nbsp;4. [Create VSAM caching service data sets](/docs/user-guide/initialize-vsam-dataset.md)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(optional for dev. required for HA)<br />&nbsp;&nbsp;&nbsp;5. [Install Zowe main started tasks](/docs/user-guide/install-stc-members.md)<br />&nbsp;&nbsp;&nbsp;6. [Install and configure the Zowe cross memory server (ZWESISTC)](/docs/user-guide/configure-xmem-server.md)  |* All datasets are created and populated. See [Initialize MVS Datasets Results](/docs/user-guide/initialize-mvs-datasets.md/#results)<br />* Started tasks are copied to system libraries<br />* APF authorization is granted to load libraries<br />* Zowe user is created and is asigned all required permissions<br />* Storage for the Caching service is configured <br />* Your z/OS and security product are configured| 2 hours| 
| **Configure certificates** <br /><p></p>Use one of the following options:<br /><p></p> **Option 1:** Use zwe command group <br />&nbsp;&nbsp;&nbsp;&nbsp;  <br />**Option 2:** Use workflows <br />&nbsp;&nbsp;&nbsp;&nbsp; | For Option 1: Use zwe command group <br /><p></p>* [Configure PKCS12 certificates](/docs/user-guide/configure-certificates-keystore.md) <br />or<br />* [Configure JCERACFKS certificates in a key ring](/docs/user-guide/configure-certificates-keyring.md) <br /><p></p>For Option 2: Use workflows <br /><p></p>* [Set up Zowe certificates using workflows](/docs/user-guide/certificates-setup.md)| You have a keystore or keyring with your certificate (We recommend using a keyring for production) |2 hours  |In-progress, <br />Complete 
| [**Configure HA (optional)**](/docs/user-guide/zowe-ha-overview.md)<br /><p></p>Use one of the following options:<br /><p></p>**Option 1:** [Enable High Availability when Zowe Runs in a Sysplex](/docs/user-guide/zowe-ha-overview.md/#enable-high-availability-when-zowe-runs-in-sysplex)<br /><p></p>**Option 2:** [Enable High Availability when Zowe Runs in Kubernetes](/docs/user-guide/zowe-ha-overview.md/#enable-high-availability-when-zowe-runs-in-kubernetes)| For Option 1: See, [Configuring Sysplex for high availability](/docs/user-guide/configure-sysplex.md)<br />Also see [YAML configurations - hainstance](/docs/appendix/zowe-yaml-configuration.md/#yaml-configurations---hainstances)<br /> <br /><p></p>For Option 2: See the topic [HorizontalPodAutoscaler](/docs/user-guide/k8s-config.md/#horizontalpodautoscaler) to let Kubernetes scale the component based on workload <br />or<br />[PodDisruptionBudget](/docs/user-guide/k8s-config.md/#poddisruptionbudget) to let Kubernetes automatically handle disruptions such as upgrades | Add results |2 hours  |

## Starting and Stopping Zowe  

| Task | Description | Results | Time Estimate |  
|----|-----------|----|-------------|
|[Start and stop the cross memory server `SWESISTC` on z/OS](/docs/user-guide/start-zowe-zos.md#starting-and-stopping-the-cross-memory-server-zwesistc-on-zos) | The `ZWESISTC` task starts and stops the `ZWESASTC` task as needed | Add results | 5 minutes|
|Start and stop the Zowe main server `ZWESLSTC` on z/OS<br />**Option 1:** Use the `zwe` server command<br />  <br />**Option 2:** Manually start or stop the Zowe main server `zweslstc` on z/OS |For Option 1: [Use zwe to start and stop the main Zowe server](/docs/user-guide/start-zowe-zos.md#starting-and-stopping-zowe-main-server-zweslstc-on-zos-with-zwe-server-command)<br /><p></p>For Option 2: [Manually start and stop the Zowe main server `ZWESLSTC`](/docs/user-guide/start-zowe-zos.md#starting-and-stopping-zowe-main-server-zweslstc-on-zos-manually) | Add results | 20 minutes |

## Verify Zowe installation on z/OS

| Task | Description | Results | Time Estimate | 
|----|-----------|----|-------------|
| [Verify Zowe Application Framework installation](/docs/user-guide/verify-zowe-runtime-install.md#verifying-zowe-application-framework-installation) | Open the Zowe Desktop from a supported browser | Add results | 20 minutes| 
| [Verify API Mediation installation](/docs/user-guide/verify-zowe-runtime-install.md#verifying-api-mediation-installation) |Use a REST API client to review the value of the status variable of the API Catalog service routed through the API Gateway | Add results | 15 minutes |
|[Verify z/OS Services installation](/docs/user-guide/verify-zowe-runtime-install.md#verifying-zos-services-installation) |Zowe z/OS services usually are registered with Zowe APIML Discovery| Add results | 15 minutes |





