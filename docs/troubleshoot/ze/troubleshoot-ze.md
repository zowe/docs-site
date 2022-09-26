# Troubleshooting Zowe Explorer

As a Zowe Explorer user, you may encounter problems with how the VS Code extension functions. This article presents known Zowe Explorer issues and their solutions.

## Before reaching out for support

1. Is there already a GitHub issue (open or closed) that covers the problem? Check [Zowe Explorer Issues](https://github.com/zowe/vscode-extension-for-zowe/issues).
2. Review the current list of [Known issues](known-ze.md) in documentation. Also, try searching using the Zowe Docs search bar.
3. Collect the following information to help diagnose the issue:
    - Zowe Explorer and VS Code version installed.
    - Node.js and NPM versions installed.
    - Whether you have Zowe CLI and the Secure Credential Store (SCS) Zowe CLI plug-in installed.

      **Note:** Zowe CLI V2 does not require the SCS plug-in to manage security.  Security is now managed by Zowe CLI core functionality.  

    - Your operating system.
    - Zowe Logs, which usually, can be found in `C:\Users\userID\.zowe\zowe\logs`.

Use [the Slack channel](https://app.slack.com/client/T1BAJVCTY/CUVE37Z5F) to reach the Zowe Explorer community for assistance.

## Remaining on a specific version of Zowe Explorer

Depending on their circumstances, developers may want to keep using a specific version of Zowe Explorer. To ensure that a particular version remains installed on VS Code, use one of the procedures below.

### When Zowe Explorer is not installed

If Zowe Explorer is not installed, you can install the current release of the extension and then revert to a previous version.

#### **Installing a previous version of Zowe Explorer**

1. Select the **Extensions** tab on the **Activities Bar** to display the **Search Extensions in Marketplace** field.
2. In the **Side Bar**, search for `Zowe Explorer`. Click the **Install** button on the Zowe Explorer result item. This opens a Zowe Explorer tab in the **Editor** area.
3. Click the **Down** arrow next to the **Uninstall** button. Select **Install Another Version…** to open a dropdown menu that lists previous versions of Zowe Explorer.
4. To install a specific version of Zowe Explorer, search for and click the version of Zowe Explorer you want.

### When Zowe Explorer is installed

#### **Preventing automatic version updates**

By default, VS Code automatically updates extensions as new versions are released. To prevent automatic updates, refer to the following steps:

1. On the VS Code menu bar, click on File > Preferences > Settings to display the Settings editor.
2. Select the **User** or **Workspace** tab, depending on which settings need to be updated.
3. In the Settings navigation menu, click on Features > Extensions.
4. In the **Auto Update** dropdown menu, select **None**. This prevents VS Code from automatically updating your extensions.

#### **Installing a specific previous version**

1. Select the **Extensions** tab on the **Activities Bar** to display a list of installed extensions.
2. In the **Side Bar**, click the **Gear** icon next to Zowe Explorer to open a dropdown menu that lists several options.
3. Select **Install Another Version…** to open a dropdown menu that lists previous versions of Zowe Explorer.
4. To install a specific version of Zowe Explorer, search for and click the version of Zowe Explorer you want.
