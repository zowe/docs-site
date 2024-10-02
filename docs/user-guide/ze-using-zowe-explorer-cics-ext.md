# Using Zowe Explorer CICS Extension

The CICS Extension for Zowe Explorer adds additional functionality to the popular Visual Studio Code extension, [Zowe Explorer](https://github.com/zowe/zowe-explorer-vscode). This extension allows you to interact with CICS regions and programs, and run commands against them.

## System requirements

### Client side requirements

- [Visual Studio Code](https://code.visualstudio.com/download)

- [Zowe Explorer V2](../user-guide/ze-install#installing-zowe-explorer)

### Server side requirements

The following services must be installed, configured, and running on the mainframe:

- CMCI APIs

- z/OSMF (optional but recommended)

## Features

- **Load profiles** directly from a locally installed Zowe instance.
- Create new Zowe CICS profiles and connect to them.
- **Update** session details, and **delete** profiles by using the user-friendly interface.
- **Work with multiple regions** that contain programs, local transactions, and local files within a plex in a comprehensible tree-like format.
- Perform actions such as **Enable**, **Disable**, **New Copy**, and **Phase In** directly from the UI.
- Perform additional actions on local files including **Open** and **Close** directly from the UI.
- View and search attributes of resources and regions by right-clicking and using the dynamic filtering feature.
- **Apply multiple filters** to regions, programs, local transactions, and local files.
- View and interact with all resources under a plex.
