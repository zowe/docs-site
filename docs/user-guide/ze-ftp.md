# Using Zowe Explorer FTP Extension

Zowe Explorer FTP extension adds the FTP protocol to the [Zowe Explorer](https://github.com/zowe/vscode-extension-for-zowe) VS Code extension, allowing you to use [z/OS FTP Plug-in for Zowe CLI](https://github.com/zowe/zowe-cli-ftp-plugin) profiles to connect and interact with z/OS USS.

This VS Code extension also serves as a [source code example](https://github.com/zowe/vscode-extension-for-zowe/tree/main/packages/zowe-explorer-ftp-extension) demonstrating how to use the [Zowe Explorer Extensibility API](https://github.com/zowe/vscode-extension-for-zowe/tree/main/packages/zowe-explorer-api) to create VS Code extensions that extend the Zowe Explorer VS Code extensions with new capabilities.

## Prerequisites

Ensure that you obtain remote access to z/OS FTP service before you can use the extension.

1. Connect to z/OS with the FTP client.
1. Run the following command in the FTP client:

   ```bash
   rstat
   ```

1. Ensure that the `JESINTERFACELevel` option is set to `2`.

## Installing

Install the FTP Extension using the following steps:

1. Install the VS Code extension from the [Microsoft](https://marketplace.visualstudio.com/items?itemName=Zowe.zowe-explorer-ftp-extension) or [Open VSX](https://open-vsx.org/extension/Zowe/zowe-explorer-ftp-extension) marketplace.
2. If you do not have Zowe Explorer installed, it will automatically install it for you as it is a required dependency.
3. After the install, when Zowe Explorer now activates it will show a VS Code info message "Zowe Explorer was modified for FTP support." to confirm that the FTP extension is available within Zowe Explorer.

## Using the FTP Extension

To use the FTP Extension with Zowe Explorer:

1. Open the Zowe Explorer activity bar in VS Code to see its three explorer views (Data Sets, USS, and Jobs).
2. In the USS view, click the `+` icon and you will see your existing Zowe CLI FTP profiles listed in the drop-down to select.
3. Select your Zowe FTP profile and it will appear in the USS view.
4. In the USS view, click the Search icon next to your newly-added profile, and specify a USS path to list it.
5. Try opening and saving files.

If you do not have an existing Zowe FTP profile, you can create one graphically with Zowe Explorer:

1. In the USS Explorer view, click the `+` icon and select `Create a New Connection to z/OS`.
2. Provide a name for your profile.
3. You will be prompted for the type of connection you want to create. The drop-down dialog will show you the types of all the extensions available, such as `zosmf` and `zftp`.
4. Select `zftp` and continue providing values for the prompts shown. As you will see, the questions prompted are now specific for FTP-type connections and match the parameters available in the FTP plugin for Zowe CLI.

## Using the Zowe CLI FTP plugin

When using this extension, we also recommend that you are familiar with the [z/OS FTP Plug-in for Zowe CLI](https://github.com/zowe/zowe-cli-ftp-plugin) that this extension is based on. Not all capabilities that this plug-in provides have yet been implemented for Zowe Explorer so it would greatly augment your user experience.

The following steps are not required, as the Zowe Explorer FTP extension includes the capability of creating such a profile in the Zowe Explorer UI as described above. However, to enable FTP for Zowe CLI and reuse the profile created for Zowe CLI also in Zowe Explorer, install the plugin and create the profile via command line:

1. Go to the [z/OS FTP Plug-in for Zowe CLI](https://github.com/zowe/zowe-cli-ftp-plugin) GitHub repository and review the installation instructions for installing it into Zowe CLI. In short, after [meeting the prerequisites](https://github.com/zowe/zowe-cli-ftp-plugin#software-requirements), the command is:

   ```bash
   zowe plugins install @zowe/zos-ftp-for-zowe-cli@latest
   ```

2. Create Zowe FTP profile:

   ```bash
   zowe profiles create zftp <profile name> -H <host> -u <user> -p <password> -P <port>
   ```

Now you can run `zowe zos-ftp` commands as documented in the plug-in documentation. This profile can then be selected in Zowe Explorer's Add Profile dialogs after this Zowe Explorer FTP VS Code extension is installed.

## List of Supported Data Set Functionalities

See the list of the supported functionalities for different types of data sets:

**Migrated Dataset:**

- Show Data Set Attribute
- Add to Favorites

**Sequential Dataset:**

- Show Data Set Attribute
- Pull from Mainframe
- Edit Data Set
- Rename Data Set
- Delete Data Set

**Partitioned Dataset:**

- Show Data Set Attribute
- Create New Member
- Edit Member
- Upload Member
- Rename Data Set
- Delete Data Set

**Partitioned Dataset Member:**

- Pull from Mainframe
- Edit Member
- Rename Member
- Delete Member

## List of Supported USS Functionalities

- List uss files and directories
- view file in text/binary mode
- Edit file
- Save file
- Create a new directory/new file
- Upload file
- Rename file/directory
- Delete file/directory
- Pull from mainframe
- Add to Favorites

## List of Supported Jobs Functionalities

- List Jobs with prefix and owner
- List job by jobid
- List spool files
- View spool files content
- Download spool files
- Submit job from dataset/member
- Delete job
- Add to favorites

## Providing feedback or help contributing

Zowe Explorer's FTP extension is now part of the [Zowe Explorer monorepo on Github](https://github.com/zowe/vscode-extension-for-zowe). You can find the sources in the `/packages/zowe-explorer-ftp-extension` sub-folder.

To file issues, use the [Zowe Explorer issue list](https://github.com/zowe/vscode-extension-for-zowe/issues).

For [instructions on how to build](https://github.com/zowe/vscode-extension-for-zowe/tree/main/packages/zowe-explorer-ftp-extension/docs/README.md) the extension, see the `docs` sub-folder.