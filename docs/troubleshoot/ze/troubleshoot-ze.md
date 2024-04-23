# Troubleshooting Zowe Explorer

As a Zowe Explorer user, you may encounter problems when using Visual Studio Code extension functions. Review Zowe Explorer known issues and troubleshooting solutions here.

## Before reaching out for support

1. Is there already a GitHub issue (open or closed) that covers the problem? Check [Zowe Explorer Issues](https://github.com/zowe/vscode-extension-for-zowe/issues).
2. Review the current list of [Known issues](known-ze.md) in documentation. Also, try searching using the Zowe Docs search bar (keyboard shortcut `ctrl` + `k`).
3. Collect the following information to help diagnose the issue:
    - The Zowe Explorer and Visual Studio Code versions installed
        - See [Checking your Zowe version release number](../troubleshoot-check-your-zowe-version/#zowe-explorer-for-visual-studio-code) for information.
    - Node.js and NPM versions installed
    - Whether you have Zowe CLI and the Secure Credential Store (SCS) Zowe CLI plug-in installed

      :::note
      Zowe CLI V2 does not require the SCS plug-in to manage security.  Security is now managed by Zowe CLI core functionality.
      :::

    - Your operating system
    - Zowe Logs, which usually can be found in `C:\Users\userID\.vscode\extensions\zowe.vscode-extension-for-zowe-X.Y.Z\logs`
    
      :::note
      In some cases, this path can differ. On operating systems such Linux or Mac, the default path is `~/.vscode/extensions/zowe.vscode-extension-for-zowe-X.Y.Z/logs`. In a non-standard installation of Visual Studio Code, extensions could be stored under a different directory.
      :::

Use [the Slack channel](https://app.slack.com/client/T1BAJVCTY/CUVE37Z5F) to reach the Zowe Explorer community for assistance.

## Resolving invalid profiles

A problem with a configuration file can make Zowe Explorer unable to read your configurations.

Zowe Explorer displays an error message advising it cannot read the configuration file when either:

- A Zowe v1 profile is invalid.
- A Zowe v2 configuration file fails to load.

Possible problems in the file could include a syntax error, or an invalid keyword or symbol.

To fix the configuration file causing the error:

1. Click the **Show Config** button in the message window.

    ![Show Config button](../../images/ze/ZE-show-config-button.gif)

    This opens the file in an **Editor** tab.

2. Modify the file as needed and save the changes.
3. Reload Visual Studio Code to confirm that Zowe Explorer can read the updated file.

## Missing write access to VS Code `extensions` folder

In some environments, the path for VS Code extensions (typically `~/.vscode/extensions`) can be read-only. This can happen when an environment has developers sharing a common read-only extensions folder that is managed by an admin with write access.

In these cases, Zowe Explorer fails to activate because it cannot write to the `logs` and `temp` folders in the extension path. When Zowe Explorer launches, an `EACCES: permission denied` error displays. See the following examples.

`logs` folder write access error:

![Logs folder write access error](../../images/troubleshoot/ZE/write-access-error-logs-folder.png)

`temp` folder write access error:

![Logs folder write access error](../../images/troubleshoot/ZE/write-access-error-temp-folder.png)

To avoid this, change the `logs` and `temp` folder locations:

1. In VS Code, select the **File menu**, select **Preferences**, and click on **Settings**.

2. In either the **User** or **Workspace** tab, click on the **Extensions** option to open the menu.

3. Select **Zowe Explorer**.

4. Enter the new path in the **Logs Folder** or **Temporary Downloads Folder** fields. For examples:

    `logs` folder setting:

    ![Logs folder write access error](../../images/troubleshoot/ZE/new-logs-folder-path.png)

    - Log files include information about Zowe Explorer and connections it makes to the mainframe. These files can be used for troubleshooting and to analyze errors.

    <br/>`temp` folder setting:

    ![Temp folder write access error](../../images/troubleshoot/ZE/new-temp-folder-path.png)

    - Temporary files are local copies of data sets or USS files downloaded from the mainframe to edit in VS Code. These files last until VS Code closes and all changes have been uploaded to the mainframe.

    <br/>After a new path is entered, Zowe Explorer writes logs and temporary files using the corresponding path.
