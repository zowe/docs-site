# System requirements

Before installing Zowe, ensure that your environment meets the prerequisites.

## z/OS host requirements (for all components)

- z/OS Version 2.2 or later.
- IBM z/OS Management Facility (z/OSMF) Version 2.2 or Version 2.3.

  z/OSMF is a prerequisite for the Zowe microservices. z/OSMF must be installed and running before you use Zowe. For how to configure z/OSMF to run Zowe, see [Configuring z/OSMF](systemrequirements-zosmf.md). 

- Node.js Version 6.14.4.1 or later on the z/OS host where you install the Zowe Application Server. 

   To install Node.js on z/OS, follow the instructions in [Installing IBM SDK for Node.js - z-OS](install-nodejs-zos.md).

- IBM SDK for Java Technology Edition V8 or later

## Disk and browser requirements (for Zowe Desktop)

- 833 MB of HFS file space.

- Supported browsers:
    -   Google Chrome V54 or later
    -   Mozilla Firefox V44 or later
    -   Safari V11 or later
    -   Microsoft Edge (Windows 10)

## System requirements for Zowe CLI

Before you install Zowe CLI, make sure your system meets the following requirements:

### Prerequisite software

The following prerequisites for Windows, Mac, and Linux are required if you are installing Zowe CLI from a local package. If you are installing Zowe CLI from Bintray registry, you only require Node.js and npm.

**Note:** As a best practice, we recommend that you update Node.js regularly to the latest Long Term Support (LTS) version.

Ensure that the following prerequisite software is installed on your computer:

- [**Node.js V8.0 or later**](https://nodejs.org/en/download/)

    **Tip:** You might need to restart the command prompt after installing Node.js. Issue the command `node --version` to verify that Node.js is installed.

- **Node Package Manager V5.0 or later**

    npm is included with the Node.js installation. Issue the command `npm --version` to verify that npm is installed.

### Supported platforms

Zowe CLI is supported on any platform where Node.js 8.0 or 10 is available, including Windows, Linux, and Mac operating systems. For information about known issues and workarounds, see [Troubleshooting Zowe CLI](../troubleshoot/troubleshoot-cli.md).

Zowe CLI is designed and tested to integrate with z/OSMF running on IBM z/OS Version 2.2 or later. Before you can use Zowe CLI to interact with the mainframe, system programmers must install and configure IBM z/OSMF in your environment.

**Important!**

- Oracle Linux 6 is not supported.

### Free disk space

Zowe CLI requires approximately **100 MB** of free disk space. The actual quantity of free disk space consumed might vary depending on the operating system where you install Zowe CLI.
