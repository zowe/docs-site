# System requirements

Before installing Zowe, ensure that your environment meets the prerequisites.

- [Common system requirements](#common-system-requirements)
- [Zowe Application Framework requirements](#zowe-application-framework-requirements)
- [Zowe CLI requirements](#zowe-cli-requirements)

## Common system requirements

- z/OS Version 2.2 or later.
- IBM z/OS Management Facility (z/OSMF) Version 2.2 or Version 2.3.

  z/OSMF is a prerequisite for the Zowe microservices, Zowe Desktop applications, and Zowe CLI. z/OSMF must be installed and running before you use Zowe. For how to configure z/OSMF to run Zowe, see [Configuring z/OSMF](systemrequirements-zosmf.md). 

## Zowe Application Framework requirements

- Node.js Version 6.14.4.1 or later *on the z/OS host* where you install the Zowe Application Server

   To install Node.js on z/OS, follow the instructions in [Installing Node.js on z/OS](install-nodejs-zos.md).

- IBM SDK for Java Technology Edition V8 or later

- 833 MB of HFS file space

- Supported browsers:
    -   Google Chrome V54 or later
    -   Mozilla Firefox V44 or later
    -   Safari V11 or later
    -   Microsoft Edge (Windows 10)

## Zowe CLI requirements

Zowe CLI is supported on platforms where Node.js 8.0 or 10 is available, including Windows, Linux, and Mac operating systems.

- [**Node.js V8.0 or later**](https://nodejs.org/en/download/) on your computer

    **Tip:** You might need to restart the command prompt after installing Node.js. Issue the command `node --version` to verify that Node.js is installed. As a best practice, we recommend that you update Node.js regularly to the latest Long Term Support (LTS) version.

- **Node Package Manager V5.0 or later** on your computer.

    npm is included with the Node.js installation. Issue the command `npm --version` to verify that npm is installed.

### Free disk space

Zowe CLI requires approximately **100 MB** of free disk space. The actual quantity of free disk space consumed might vary depending on the operating system where you install Zowe CLI.

