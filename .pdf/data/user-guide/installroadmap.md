# Installation roadmap

Installing Zowe involves several steps that you must complete in the appropriate sequence. Review the following installation roadmap that presents the task-flow for preparing your environment and installing and configuring Zowe before you begin the installation process.

Tasks | Description
--- | ---
1. Prepare your environment to meet the installation requirements. | See [System requirements](systemrequirements.md).
2. Obtain the Zowe installation files. | See [Obtaining the installation files](gettingstarted.md).
3. Allocate enough space for the installation. |  The installation process requires approximately 1 GB of available space. Once installed on z/OS, API Mediation Layer requires approximately 150MB of space, the Zowe Application Framework requires approximately 50 MB of space before configuration, and explorer server requires approximately 200 MB. Zowe CLI requires approximately 200 MB of space on your computer.
4. Install components of Zowe. | To install Zowe runtime (Zowe Application Framework, explorer server, and API Mediation Layer) on z/OS, see [Installing the Zowe runtime on z/OS](install-zos.md). To install Zowe CLI on a computer, see [Installing Zowe CLI](cli-installcli.md).
5. Verify that Zowe is installed correctly. | To verify that the Zowe Application Framework, explorer server, and API Mediation Layer are installed correctly, see [Verifying installation](install-zos.md#verifying-installation). To verify that Zowe CLI is installed correctly, see [Testing connection to z/OSMF](cli-installcli.md#testing-zowe-cli-connection-to-zosmf).
6. Optional: Troubleshoot problems that occurred during installation. | See [Troubleshooting the installation](../troubleshoot/troubleshootinstall.md).

To uninstall Zowe, see [Uninstalling Zowe](uninstall.md).
