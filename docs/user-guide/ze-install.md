# Visual Studio Code (VS Code) Extension for Zowe

<img src="https://codecov.io/gh/zowe/vscode-extension-for-zowe/branch/master/graph/badge.svg" alt="codecov" scope="external"/>
<img src="https://img.shields.io/badge/chat-on%20Slack-blue" alt="slack" scope="external"/>

The Zowe Explorer extension for Visual Studio Code (VS Code) modernizes the way developers and system administrators interact with z/OS mainframes, and lets you interact with data sets, USS files and jobs. Install the extension directly to [VSCode](https://code.visualstudio.com/) to enable the extension within the GUI. Working with data sets and USS files from VSCode can be more convenient than using 3270 emulators, and complements your Zowe CLI experience. The extension provides the following benefits:

* Enables you to create, modify, rename, copy, and upload data sets directly to a z/OS mainframe.
* Enables you to create, modify, rename, and upload USS files directly to a z/OS mainframe.
* Provides a more streamlined way to access data sets, USS files and jobs.
* Lets you create, edit, and delete Zowe CLI `zosmf` compatible profiles.
* Lets you use the Secure Credential Store plug-in to store your credentials securely in the settings.

**Note:** Zowe Explorer is a subcomponent of [Zowe](https://zowe.org/home/). The extension demonstrates the potential for plug-ins powered by Zowe.

## Software Requirements

Ensure that you meet the following prerequisites before you use the extension:

* Get access to z/OSMF.
* Install [Node.js](https://nodejs.org/en/download/) v8.0 or later.
* Install [VSCode](https://code.visualstudio.com/).
* Configure TSO/E address space services, z/OS data set, file REST interface, and z/OS jobs REST interface. For more information, see [z/OS Requirements](https://docs.zowe.org/stable/user-guide/systemrequirements-zosmf#z-os-requirements).
* Create one Zowe CLI `zosmf` profile so that the extension can communicate with the mainframe.

### Profile notes:

   - You can use your existing Zowe CLI `zosmf` profiles that are created with the Zowe CLI v.2.0.0 or later.

   - Zowe CLI `zosmf` profiles that are created in Zowe Explorer can be interchangeably used in the Zowe CLI.

   - *Optionally*, you can continue using Zowe CLI V1 profiles with Zowe Explorer. For more information, see ***instert link here***.

## Installing

Use the following steps to install Zowe Explorer:

1. Address [the software requirements](#software-requirements).
2. Open VSCode, and navigate to the **Extensions** tab on the left-hand side of the UI.
3. Type **Zowe Explorer** in the search field.
  
   Zowe Explorer appears in the list of extensions in the left-hand panel.

4. Click the green **Install** button to install the extension.
5. Restart VSCode.

The extension is now installed and available for use.

* **Note:** For information about how to install the extension from a `VSIX` file and run system tests on the extension, see the [Developer README](https://github.com/zowe/vscode-extension-for-zowe/blob/master/docs/README.md).

You can also watch the following videos to learn how to get started with Zowe Explorer, and work with data sets.

<iframe class="embed-responsive-item" id="youtubeplayer" title="Getting Started with Zowe" type="text/html" width="100%" height="365" src="https://www.youtube.com/embed/G_WCsFZIWt4" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"> </iframe>

<iframe class="embed-responsive-item" id="youtubeplayer2" title="How to Work with Data Sets" type="text/html" width="100%" height="365" src="https://www.youtube.com/embed/X4oSHrI4oN4" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"> </iframe>

## Configuration

Configure Zowe Explorer in the settings file of the extension. To access the extension settings, navigate to **Manage (the gear icon)**  > **Settings**, then select **Extensions** > **Zowe Explorer Settings**. For example, you can modify the following settings:

* **Data set creation settings:** You can change the default creation settings for various data set types.

**Follow these steps:**

1. Click the **Edit in settings.json** button under the Data Set, USS or JOBS settings that you want to edit.
2. Edit the settings as needed.
3. Save the settings.

<img src={require("../images/ze/ZE-Configuration.gif").default} alt="Configure Zowe settings"/>

* **Set the Temporary Folder Location:** You can change the default folder location where temporary files are stored. 

    **Follow these steps:**

   1. Click the **Edit in settings.json** button under the Data Set, USS or JOBS settings that you want to edit.
   2. Modify the following definition:

    ```json
    "Zowe-Temp-Folder-Location": {
        "folderPath": "/path/to/directory"
      }
    ```

  where **/path/to/directory** is the folder location that you specify.
  
  3. Save the settings.

## Relevant Information

In this section you can find useful links and other relevant to Zowe Explorer information that can improve your experience with the extension.

* For information about how to develop for Eclipse Theia, see [Theia README](https://github.com/zowe/vscode-extension-for-zowe/blob/master/docs/README-Theia.md).
* For information about how to create a VSCode extension for Zowe Explorer, see [VSCode extensions for Zowe Explorer](https://github.com/zowe/vscode-extension-for-zowe/blob/master/docs/README-Extending.md).
* Visit the **#zowe-explorer** channel on [Slack](https://openmainframeproject.slack.com/) for questions and general guidance.
