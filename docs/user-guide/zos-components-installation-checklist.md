# Installation and Configuration Checklist for Zowe z/OS Components

Perform the steps in this checklist to streamline your installation of Zowe z/OS Components.

## Preparing and Installing
| Task | Description | Role | Time Estimate | Status | 
|----|-----------|----|-------------|------|
| [Plan the Installation](/docs/user-guide/installandconfig.md) | **Address the following [System requirements](/docs/user-guide/systemrequirements.md):** <br /> * [z/OS](/docs/user-guide/systemrequirements-zos.md)   <br />* [Node.js](/docs/user-guide/systemrequirements-zos.md)  <br /> * [Java](/docs/user-guide/systemrequirements-zos.md)  <br /> * [z/OSMF](/docs/user-guide/systemrequirements-zos.md) <br />&nbsp;&nbsp;(recommended for full functionality)<br />* [z/OSMF HA](/docs/user-guide/zowe-ha-overview.md)<br />&nbsp;&nbsp;(required for production)           | contributing programmer, <br />system administrator<br />                |  upto 1 week                      | In-progress, <br />Complete 
| [Install z/OS Components](/docs/user-guide/install-zos.md) | **Option 1: [Install Zowe runtime from a convenience build](/docs/user-guide/install-zowe-zos-convenience-build.md)**  <br />(for development purposes / not production)  <br /> **Option 2: [Install Zowe with SMP/E](/docs/user-guide/install-zowe-smpe.md)** <br />(for production purposes)<br /> **Option 3: [Install Zowe with a portable software instance](/docs/user-guide/install-zowe-pswi.md)** <br />(for production purposes)                      | contributing programmer, <br />system administrator<br />                |   2 hour                     |In-progress, <br />Complete

## Configuring Zowe z/OS Components

| Task | Description | Role | Time Estimate | Status | 
|----|-----------|----|-------------|------|
|Configure base | **Option 1: Use zwe command group** <br />&nbsp;&nbsp; 1. [Initialize the z/OS system](/docs/user-guide/configure-zos-system.md)     <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. [Initialize Zowe custom data sets](/docs/user-guide/initialize-mvs-datasets.md) <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. [Initialize Zowe security configurations](/docs/user-guide/initialize-security-configuration.md) <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. [Configure the z/OS system for Zowe](/docs/user-guide/configure-zos-system.md) <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d. [Grant users permission to access z/OSMF](/docs/user-guide/grant-user-permission-zosmf.md) <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e. [APF authorize load libraries](/docs/user-guide/apf-authorize-load-library.md) <br />&nbsp;&nbsp;&nbsp;&nbsp;2. [Create VSAM caching service data sets](/docs/user-guide/initialize-vsam-dataset.md)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(optional for dev. required for HA)<br />&nbsp;&nbsp;&nbsp;&nbsp;3. [Install Zowe main started tasks](/docs/user-guide/install-stc-members.md)<br />&nbsp;&nbsp;&nbsp;&nbsp;4. [Install and configure the Zowe cross memory server (ZWESISTC)](/docs/user-guide/configure-xmem-server.md) <br />**Option 2: Use z/OSMF workflows** <br /> &nbsp;&nbsp;&nbsp;&nbsp;1. [Configure Zowe with z/OSMF workflows](/docs/user-guide/configure-zowe-zosmf-workflow.md) |contributing programmer, <br />system administrator<br />| 3 hours|In-progress, <br />Complete 
| Configure certificates | **Option 1: Use zwe command group** <br />&nbsp;&nbsp;&nbsp;&nbsp;1. [Configure PKCS12 certificates](/docs/user-guide/configure-certificates-keystore.md) <br />&nbsp;&nbsp;&nbsp;&nbsp;2. [Configure JCERACFKS certificates in a key ring](/docs/user-guide/configure-certificates-keyring.md) <br />**Option 2: Use workflows** <br />&nbsp;&nbsp;&nbsp;&nbsp;1. [Set up Zowe certificates using workflows](/docs/user-guide/certificates-setup.md) |contributing programmer, <br />system administrator<br />|1 hour  |In-progress, <br />Complete 
| Configure HA (optional) | **Option 1: Use a Hot Backup**<br />(multiple instances are configured and ready, but a single instance handles the traffic)<br />**Option 2: Load Balancing** <br />(multiple instances are running, and all instances handle the traffic)|contributing programmer, <br />system administrator<br /> |1 hour  |In-progress, <br />Complete

## Starting and Stopping Zowe  

| Task | Description | Role | Time Estimate | Status | 
|----|-----------|----|-------------|------|
|[Start and stop the cross memory server `SWESISTC` on z/OS](/docs/user-guide/start-zowe-zos.md#starting-and-stopping-the-cross-memory-server-zwesistc-on-zos) | The `ZWESISTC` task starts and stops the `ZWESASTC` task as needed |contributing programmer, <br />system administrator<br />| 20 minutes|In-progress, <br />Complete
|Start and stop the Zowe main server `ZWESLSTC` on z/OS | **Option 1: Use the `zwe` server command**<br /> [Use zwe to start and stop the main Zowe server](/docs/user-guide/start-zowe-zos.md#starting-and-stopping-zowe-main-server-zweslstc-on-zos-with-zwe-server-command) <br />**Option 2: [Manually start and stop the Zowe main server `ZWESLSTC`](/docs/user-guide/start-zowe-zos.md#starting-and-stopping-zowe-main-server-zweslstc-on-zos-manually)** |contributing programmer, <br />system administrator<br /> | 10 minutes |In-progress, <br />Complete

## Verify Zowe installation on z/OS

| Task | Description | Role | Time Estimate | Status | 
|----|-----------|----|-------------|------|
| [Verify Zowe Application Framework installation](/docs/user-guide/verify-zowe-runtime-install.md#verifying-zowe-application-framework-installation) | Open the Zowe Desktop from a supported browser | contributing programmer, <br />system administrator<br />| 20 minutes|In-progress, <br />Complete 
| [Verify API Mediation installation](/docs/user-guide/verify-zowe-runtime-install.md#verifying-api-mediation-installation) |Use a REST API client to review the value of the status variable of the API Catalog service routed through the API Gateway | contributing programmer, <br />system administrator<br />| 15 minutes |In-progress, <br />Complete
|[Verify z/OS Services installation](/docs/user-guide/verify-zowe-runtime-install.md#verifying-zos-services-installation) |Zowe z/OS services usually are registered with Zowe APIML Discovery| contributing programmer, <br />system administrator<br />| 15 minutes |In-progress, <br />Complete





