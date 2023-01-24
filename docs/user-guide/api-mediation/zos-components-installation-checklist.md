# Installation and Configuration Checklist for Zowe z/OS Components

Perform the steps in this checklist to streamline your installation of Zowe z/OS Components.

## Preparing and Installing
| Task | Description | Role | Time Estimate | Status | 
|----|-----------|----|-------------|------|
| Plan the Installation  | **Address the following System requirements:** |  |  |
| |  * z/OS  |
| | * Node.js  |  |   |
|  | * Java  | |                       |       
|                            | * z/OSMF <br />(recommneded for full functionality)           |                 |                       |
| Install z/OS Components | **Option 1: Install Zowe runtime from a convenience build**  <br />(for development purposes / not production)    |                 |                       |
|                            | **Option 2: Install Zowe with SMP/E** <br />(for production purposes)                      |                 |                       |
|                            | **Option 3: Install Zowe with a portable software instance** <br />(for production purposes)                      |                 |                       |

## Configuring Zowe z/OS Components

| Task | Description | Role | Time Estimate | Status | 
|----|-----------|----|-------------|------|
|Configure base | **Option 1: Use zwe command group** <br />&nbsp;&nbsp; 1. Initialize the z/OS system     <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. Initialize Zowe custom data sets <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. Initialize Zowe security configurations <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. Configure the z/OS system for Zowe <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d. Grant users permission to access z/OSMF <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e. APF authorize load libraries <br />&nbsp;&nbsp;&nbsp;&nbsp;2. Create VSAM caching service data sets<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(optional for dev. required for HA)<br />&nbsp;&nbsp;&nbsp;&nbsp;3. Install Zowe main started tasks<br />&nbsp;&nbsp;&nbsp;&nbsp;4. Install and configure the Zowe cross memory server (ZWESISTC) <br />**Option 2: Use z/OSMF workflows** <br /> &nbsp;&nbsp;&nbsp;&nbsp;1. Configure Zowe with z/OSMF workflows
| Configure certificates | **Option 1: Use zwe command group** <br />&nbsp;&nbsp;&nbsp;&nbsp;1. Configure PKCS12 certificates <br />&nbsp;&nbsp;&nbsp;&nbsp;2. Configure JCERACFKS certificates in a key ring <br />**Option 2: Use workflows** <br />&nbsp;&nbsp;&nbsp;&nbsp;1. Set up Zowe certificates using workflows
| Configure HA (optional) | **Option 1: Use a Hot Backup**<br />(multiple instances are configured and ready, but a single instance handles the traffic)<br />**Option 2: Load Balancing** <br />(multiple instances are running, and all instances handle the traffic)| | |

## Starting and Stopping Zowe  

| Task | Description | Role | Time Estimate | Status | 
|----|-----------|----|-------------|------|
|Start and stop the cross memory server `SWESISTC` on z/OS | The ZWESISTC task starts and stops the ZWESASTC task as needed
|Start and stop the Zowe main server `ZWESLSTC` on z/OS | **Option 1: Use the `zwe` server command**<br /> Use zwe to start and stop the main Zowe server <br />**Option 2: Manually start and stop the Zowe main server `ZWESLSTC`** | | |

## Verify Zowe installation on z/OS

| Task | Description | Role | Time Estimate | Status | 
|----|-----------|----|-------------|------|
| Verify Zowe Application Framework installation | Open the Zowe Desktop from a supported browser | |
| Verify API Mediation installation |Use a REST API client to review the value of the status variable of the API Catalog service routed through the API Gateway | |
|Verify z/OS Services installation |Zowe z/OS services usually are registered with Zowe APIML Discovery| |





