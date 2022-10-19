# Installing and uninstalling

You can install or update the extension from Visual Studio Code Extensions or from a VSIX file.

## Installing from Visual Studio Code Extensions

1. Navigate to **Extensions** tab of your VS Code application.

2. Search for `Zowe Explorer for IBM CICS` and click it.

3. Click **Install** at the top of the page.

   If Zowe Explorer is not installed, this automatically installs it for you as part of the installation.

## Installing from a VSIX file

Before you install Zowe Explorer CICS Extension from a VSIX file, ensure that Zowe Explorer is installed. Zowe Explorer is a required dependency. For more information, see [Installing Zowe Explorer](https://docs.zowe.org/stable/user-guide/ze-install#installing).

If  Zowe Explorer is installed, you can install Zowe Explorer CICS Extension from a VSIX file.

1. Visit the [download site](https://github.com/zowe/vscode-extension-for-cics). Select the **Latest** button, which directs to a page that includes the latest version of `.vsix` file. Download it to your PC.

   ![Download Zowe CICS Explorer](../images/ze-cics/cics-latest-vsix.png)

2. Open the Extensions icon in the side bar, navigate to the **...** menu, press **Install from VSIX ...** and select the downloaded `Zowe.cics-extension-for-zowe-2.x.x.vsix` file.

   ![Installing Zowe CICS Explorer](../images/ze-cics/zowe-cics-explorer-install.gif)

The following message indicates that the extension is installed successfully.

![Zowe CICS Explorer install completed](../images/ze-cics/info-message-install-completed.png)

The Zowe Explorer pane shows tree views for **Data Sets**, **Unit System Services (USS)** and **Jobs**, and a new view for **CICS**.

![CICS tree in Zowe pane](../images/ze-cics/cics-tree-in-zowe-pane.png)

## Uninstalling

To uninstall the Zowe Explorer CICS extension from the VS Code Extensions tab:

1. Navigate to the **Extensions** tab of the VS Code application.

2. Find `Zowe Explorer for IBM CICS` and click it.

3. A panel opens. Click **Uninstall** at the top of the page.

4. A reload may be required. If a button appears for reload, click it and the extension is no longer installed.
