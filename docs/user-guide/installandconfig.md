# Installing Zowe

You install the Zowe runtime on z/OS and install Zowe CLI on your computer. The installations on z/OS and on a computer are independent processes.

When you install Zowe on z/OS, there are two parts. The first part is to install the Zowe Application Framework, the API Mediation Layer, and a number of micro services that provide capability to both. The second part is to install the Zowe Cross Memory Server. This is an authorized server application that provides privileged services to Zowe in a secure manner. 

The Zowe CLI is not installed on z/OS and runs on a personal computer.  

![Zowe installation overview](../images/common/zowe-install-location.png)

## Installation roadmap

Installing Zowe involves several steps that you must complete in the appropriate sequence. Review the following installation roadmap that presents the task-flow for preparing your environment and installing and configuring Zowe before you begin the installation process.

| Tasks | Description
| --- | ---
| 1. Prepare your environment to meet the installation requirements. | See [System requirements](systemrequirements.md).
| 2. Allocate enough space for the installation. |  The installation process requires approximately 1 GB of available space. Once installed on z/OS, API Mediation Layer requires approximately 150MB of space, and the Zowe Application Framework requires approximately 50 MB of space before configuration. Zowe CLI requires approximately 200 MB of space on your computer.
| 3. Install components of Zowe. | To install Zowe runtime on z/OS, see [Installing the Zowe runtime on z/OS](install-zos.md). To install Zowe CLI on a computer, see [Installing Zowe CLI](cli-installcli.md).
| 4. Verify that Zowe is installed correctly. | To verify that the Zowe runtime is installed correctly, see [Verifying installation](install-zos.md#verifying-installation). To verify that Zowe CLI is installed correctly, see [Testing connection to z/OSMF](cli-installcli.md#testing-zowe-cli-connection-to-zosmf).
| 5. Optional: Troubleshoot problems that occurred during installation. | See [Troubleshooting the installation](../troubleshoot/troubleshootinstall.md).

To uninstall Zowe, see [Uninstalling Zowe](uninstall.md).