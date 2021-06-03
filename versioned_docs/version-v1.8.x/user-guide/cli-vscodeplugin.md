# Zowe Explorer Extension for VSCode

The Zowe Explorer extension for Visual Studio Code (VSCode) lets you interact with data sets, USS files and jobs that are stored on z/OS mainframe. Install the extension directly to [VSCode](https://code.visualstudio.com/) to enable the extension within the GUI. For some users, working with data sets and USS files from VSC can be more convenient than using 3270 emulators, and complements your Zowe CLI experience.

**Note:** The primary documentation for the Zowe Explorer is available on the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Zowe.vscode-extension-for-zowe). This article is a high-level overview of the extension.

- [Use Cases](#use-cases)
- [Software requirements](#software-requirements)
- [Installing](#installing)

## Use-Cases

As a developer, you can use Zowe Explorer to perform the following tasks.

- View, rename, copy and filter mainframe data sets, USS files and jobs.
- Create download, edit, upload, and delete PDS and PDS members.
- Create Zowe CLI compatible `zosmf` profiles.
- Switch between Zowe CLI `zosmf` profiles to quickly target different mainframe systems.
- Submit jobs.

## Software requirements

Before you use the extension, meet the following software requirements on your computer:

- Get access to z/OSMF.
- Install [Node.js](https://nodejs.org/en/download/) v8.0 or later.
- Install [VSCode](https://code.visualstudio.com/).
- Create one Zowe CLI `zosmf` profile so that the extension can communicate with the mainframe.

  **Note:** You might use an existing Zowe CLI `zosmf` profile that was created with the Zowe CLI v.2.0.0 or later.

## Installing

1. Address [the software requirements](#software-requirements).
2. Open VSCode. Navigate to the **Extensions** tab on the left side of the UI.
3. Click the green **Install** button to install the extension.
4. Restart VSCode.

The extension is now installed and available for use.

**Tip:** For information about how to install the extension from a `VSIX` file and run system tests on the extension, see the Developer [README](https://github.com/zowe/vscode-extension-for-zowe/blob/master/docs/README.md) file in the Zowe VSCode extension GitHub repository.

You can also watch the following video to learn how to get started with Zowe Explorer.

<iframe class="embed-responsive-item" id="youtubeplayer" title="Getting Started with Zowe" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/G_WCsFZIWt4" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen> </iframe>