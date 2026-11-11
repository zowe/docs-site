# Installing and updating Zowe Explorer

<a href="https://app.codecov.io/gh/zowe/zowe-explorer-vscode"><img src="https://codecov.io/gh/zowe/vscode-extension-for-zowe/branch/main/graph/badge.svg" alt="codecov" scope="external"/></a>
<a href="https://app.slack.com/client/T1BAJVCTY/CUVE37Z5F"><img src="https://img.shields.io/badge/chat-on%20Slack-blue" alt="slack" scope="external"/></a>

:::info Required roles: systems administrator
:::

Install Zowe Explorer directly to [Visual Studio Code](https://code.visualstudio.com/) to enable the extension within the GUI. 

Working with data sets and USS files from VS Code can be more convenient than using 3270 emulators, and complements your Zowe CLI experience. The extension provides the following benefits:

- Enables you to create, modify, rename, copy, and upload data sets directly to a z/OS mainframe.
- Enables you to create, modify, rename, and upload USS files directly to a z/OS mainframe.
- Provides a more streamlined way to access data sets, USS files, and jobs.
- Lets you create, edit, and delete Zowe CLI `zosmf` compatible profiles.

:::note

Zowe Explorer is a subcomponent of [Zowe](https://zowe.org/home/). The extension demonstrates the potential for plug-ins powered by Zowe.

:::

## Installing Zowe Explorer

### Installing from VS Code Extensions

To install Zowe Explorer:

1. Address [the system requirements](../getting-started/ZE-system-reqs.md).
2. Open VS Code, and navigate to the **Extensions** tab on the **Activity Bar**.
3. Type `Zowe Explorer` in the **Search** field.

   `Zowe Explorer` appears in the list of extensions in the **Side Bar**.
4. Click the green **Install** button to install the extension.
5. Restart VS Code.

The extension is now installed and available for use.

### Installing from a `VSIX` file

For information about how to install the extension from a `VSIX` file and run system tests on the extension, see the [Developer README](https://github.com/zowe/vscode-extension-for-zowe#build-locally).

## Changing the installed version of Zowe Explorer

Depending on their circumstances, developers might want to run a specific version of Zowe Explorer.

:::important

Releases older than Zowe Explorer v2.10 do not support secure credentials in Visual Studio Code v1.83+ due to the removal of the keytar library from VS Code.

:::

To install a particular version on VS Code:

1. Refer to [Installing Zowe Explorer](#installing-zowe-explorer) to install Zowe Explorer for Visual Studio Code if not already installed.
2. In VS Code, select the **Extensions** tab on the **Activities Bar** to display a list of installed extensions.
3. In the **Side Bar**, click the **Manage** icon next to Zowe Explorer to open a dropdown menu that lists available options.
4. Select **Install Another Version…** to open a dropdown menu that lists previous versions of Zowe Explorer.
5. Click the version of Zowe Explorer you want to install.

#### Preventing automatic updates to retain a specific version

By default, VS Code automatically updates extensions as new versions are released. Refer to the following steps to prevent automatic updates:

1. On the VS Code menu bar, click **File**, **Preferences**, and click **Settings** to display the Settings editor.
2. Select the **User** or **Workspace** tab, depending on which settings you want to update.
3. In the Settings navigation menu, click **Features** and click **Extensions**.
4. In the **Auto Update** dropdown menu, select **None**. This prevents VS Code from updating your extensions automatically.

      VS Code is configured to stop updating your extensions, and Zowe Explorer extensions, automatically.

## Installing Zowe Explorer extensions

### Installing from VS Code Extensions

1. Navigate to **Extensions** tab of your VS Code application.
2. In the **Search** field, enter the name of the Zowe Explorer extension.

    The name of the extension appears in the list that displays in the **Side Bar**.

3. Click **Install** at the top of the page.

   The selected extension is installed in VS Code.


### Installing Zowe Explorer Extension for FTP from a `VSIX` file

1. Go to the [Zowe Explorer Extension for FTP download](https://open-vsx.org/extension/Zowe/zowe-explorer-ftp-extension) site.

2. Select the `DOWNLOAD` button to download the latest version of the `.vsix` file.

3. Open the Extensions icon in the **Side Bar**, navigate to the **...** menu, select **Install from VSIX ...** and select the downloaded `Zowe.zowe-explorer-ftp-extension-3.x.x-next.<DATE>` file.

      A message displays to confirm the installation was successful.

4. Close and reopen VS Code to check that the notification message "Zowe Explorer was modified for FTP support" displays.

   Once installed, the notification displays every time you open VS Code to confirm that the FTP extension is available.

## Updating Zowe Explorer and Zowe Explorer extensions

By default, VS Code automatically updates extensions as new versions are released. To stop automatic updates, see [Preventing automatic updates to retain a specific version](#preventing-automatic-updates-to-retain-a-specific-version).
