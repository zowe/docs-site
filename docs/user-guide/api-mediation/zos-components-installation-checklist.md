# Installation and Configuration Checklist for Zowe z/OS Components

Review the steps in this checklist to streamline your installation of Zowe z/OS Components

## Prepare and Install
| Task | Description | Role | Time Estimate | Status | 
|----|-----------|----|-------------|------|
| Planning the Installation  | Address the following System requirements: |  |  |
| | * z/OS  |
| | * Node.js  |  |   |
|  | * Java  | |                       |       
|                            | * z/OSMF <br />(recommneded for full functionality)           |                 |                       |
| Installing z/OS Components | Option 1: Install Zowe runtime from a convenience build  <br />(for development purposes / not production)    |                 |                       |
|                            | Option 2: Install Zowe with SMP/E <br />(for production purposes)                      |                 |                       |
|                            | Option 3: Install Zowe with a portable software instance <br />(for production purposes)                      |                 |                       |

## Configuring Zowe z/OS Components

| Task | Description | Role | Time Estimate | Status | 
|----|-----------|----|-------------|------|
|Configure base | **Option 1: Use zwe command group** <br />&nbsp;&nbsp; 1. Initialize the z/OS system     <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. Initialize Zowe custom data sets <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. Initialize Zowe security configurations <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. Configure the z/OS system for Zowe <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d. Grant users permission to access z/OSMF <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e. APF authorize load libraries <br />&nbsp;&nbsp;&nbsp;&nbsp;2. CreateVSAM caching service data sets<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(optional for dev. required for HA)<br />&nbsp;&nbsp;&nbsp;&nbsp;3. Install Zowe man started tasks<br />&nbsp;&nbsp;&nbsp;&nbsp;4. Install and configure the Zowe cross memory server (ZWESISTC) <br />**Option 2: Use z/OSMF workflows** <br /> &nbsp;&nbsp;&nbsp;&nbsp;1. Configure Zowe with z/OSMF workflows
| Configure certificates | **Option 1: Use zwe command group** <br />&nbsp;&nbsp;&nbsp;&nbsp;1. Configure PKCS12 certificates <br />&nbsp;&nbsp;&nbsp;&nbsp;2. Configure JCERACFKS certificates in a key ring <br />**Option 2: Use workflows** <br />&nbsp;&nbsp;&nbsp;&nbsp;1. Set up Zowe certificates using workflows
| Configure HA (optional)  


