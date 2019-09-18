# VSCode Extension for Zowe

The Visual Studio Code (VSCode) Extension for Zowe&trade; lets you interact with data sets that are stored on IBM z/OS mainframe. Install the extension directly to [VSCode](https://code.visualstudio.com/) to enable the extension within the GUI. You can explore data sets, view their contents, make changes, and upload the changes to the mainframe. For some users, it can be more convenient to interact with data sets through a GUI rather than using command-line interfaces or 3270 emulators. The extension is powered by Zowe CLI.

**Note:** The primary documentation, for this plug-in is available on the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Zowe.vscode-extension-for-zowe). This topic is intended to be an overview of the extension.

  - [Software requirements](#software-requirements)
  - [Installing](#installing)
  - [Use Cases](#use-cases)

## Software requirements

Before you use the VSCode extension, meet the following software requirements on your computer:

  - Install [VSCode](https://code.visualstudio.com/).

  - [Install Zowe CLI](cli-installcli.md).
  
  - Create at least one Zowe CLI 'zosmf' profile so that the extension can communicate with the mainframe. See [Creating Zowe CLI Profiles](cli-configuringcli.md#creating-zowe-cli-profiles).

## Installing

1. Address [the software requirements](#software-requirements).
2. Open VSCode. Navigate to the **Extensions** tab on the left side of the UI.
3. Click the green **Install** button to install the plug-in.
4. Restart VSCode. The plug-in is now installed and available for use.

**Tip:** For information about how to install the extension from a VSIX file and run system tests on the extension, see the Developer README file in the Zowe VSCode extension GitHub repository.

You can also watch the following video to learn how to install and use the Zowe VSCode Extension. If you read this doc in PDF format, you can click [here](https://youtu.be/la1_Ss27fn8) to watch the video.

<iframe class="embed-responsive-item" id="youtubeplayer" title="Zowe VSCode Extension" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/la1_Ss27fn8" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen> </iframe>

## Use-Cases

As an developer, you can use VSCode Extension for Zowe to perform the following tasks. 

- View and filter mainframe data sets.
- Create download, edit, upload, and delete PDS and PDS members.
- Use "safe save" to safely resolve conflicts when a data set is changed during local editing. 
- Switch between Zowe CLI profiles to quickly target different mainframe systems. 

**Note:** For detailed step-by-step instructions for using the plug-in and more information about each feature, see [Zowe on the Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Zowe.vscode-extension-for-zowe).
