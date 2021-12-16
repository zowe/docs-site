# CICS Extension Installation

## Requirements

- Visual Studio Code - if you have not installed VS Code, visit the [download site](https://code.visualstudio.com/download) and install VS Code on your PC.
- Zowe Explorer (optional) - the Zowe Explorer will be added as part of the install if it isn't already present in VS Code.

## Installation

### From VSIX File

1. Visit the [download site](https://github.com/zowe/vscode-extension-for-cics). Select the **Latest** button which directs to a page that includes the latest version of `.vsix` file. Download it to your PC that has VS Code already installed.

<p align="center">
<img src="../images/ze-cics/cics-latest-vsix.png" alt="Installing Zowe CICS Explorer" width="700px"/>
</p>
2. Open the Extensions icon in the side bar, navigate to the ... menu, press **Install from VSIX ...** and select the downloaded `cics-extension-for-zowe-0.0.1.vsix` file.

<p align="center">
<img src="../images/ze-cics/zowe-cics-explorer-install.gif" alt="Installing Zowe CICS Explorer" width="700px"/>
</p>
3. After installation

The successfull install message should be shown in the bottom right

<p align="center">
<img src="../images/ze-cics/info-message-install-completed.png" alt="Zowe CICS Explorer install completed" width="550px"/>
</p>

The Zowe Explorer pane will still show tree views for `Data Sets`, `Unit System Services (USS)` and `Jobs`, but in addition a new view `CICS` will be included.

<p align="center">
<img src="../images/ze-cics/cics-tree-in-zowe-pane.png" alt="CICS tree in Zowe pane" width="300px"/>
</p>
