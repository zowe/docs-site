# System requirements

Before installing Zowe&trade;, ensure that your environment meets the prerequisites.

- [Common sytem requirements](#common-system-requirements)
- [Zowe Application Framework requirements](#zowe-application-framework-requirements)
- [Zowe CLI requirements](#zowe-cli-requirements)
- [Multi-Factor Authentication for Zowe Desktop](#multi-factor-authentication-for-zowe-desktop)

## Common z/OS system requirements (host)

- z/OS Version 2.2 or later.
- IBM z/OS Management Facility (z/OSMF) Version 2.2, Version 2.3 or Version 2.4.

  z/OSMF is an optional prerequisite for Zowe.  It is recomended that z/OSMF is present to fully exploit Zowe's capabilities.

  ::: tip
   - For non-production use of Zowe (such as development, proof-of-concept, demo),  you can customize the configuration of z/OSMF to create what is known as "z/OS MF Lite" that simplifies the setup of z/OSMF. As z/OS MF Lite only supports selected REST services (JES, DataSet/File, TSO and Workflow), you will observe considerable improvements in start up time as well as a reduction in the efforts involved in setting up z/OSMF. For information about how to set up z/OSMF Lite, see [Configuring z/OSMF Lite (non-production environment)](systemrequirements-zosmf-lite.md)
  - For production use of Zowe, see [Configuring z/OSMF](systemrequirements-zosmf.md).
  :::

### Zowe Application Framework requirements (host)

- Node.js
  - On z/OS: Node.js v6.x starting with v6.14.4, v8.x (except v8.16.1), and v12.x. Note when using v12.x, it is highly recommended that plugins used are tagged. For more information, see [Tagging on z/OS](../extend/extend-desktop/mvd-buildingplugins.md#tagging-plugin-files-on-z-os)
  - Off z/OS: The Application Framework supports Node.js v6.14 through v12.x.
  
   To install Node.js on z/OS, follow the instructions in [Installing Node.js on z/OS](install-nodejs-zos.md).

- IBM SDK for Java Technology Edition V8 or later
- 833 MB of zFS file space

- (client) Supported browsers:
    -   Google Chrome V66 or later
    -   Mozilla Firefox V60 or later
    -   Safari V12.0 or later
    -   Microsoft Edge 17 (Windows 10)

   Each release of the Zowe Application Framework is tested to work on the current releases of Chrome, Firefox, Safari, and Edge, as well as the oldest release within a 1 year time span, unless the current release is also older than 1 year. For Firefox, the oldest supported release will also be from the Extended Support Release (ESR) version of Firefox, to ensure compatibility in those enterprise environments. This scheme for browser support is to ensure that Zowe works on the vast majority of browsers that people are currently using, while still allowing for use of new features and security that browsers constantly add.

If you do not see your product listed here, please contact the Zowe community so that it can be validated and included.

### Multi-Factor Authentication for Zowe Desktop

To enable multi-factor authentication, you must install [IBM Z Multi-Factor Authentication](https://www.ibm.com/us-en/marketplace/ibm-multifactor-authentication-for-zos). For information on using MFA in Zowe, see [Multi-Factor Authentication](mvd-configuration.md#multi-factor-authentication-configuration).

## Zowe CLI requirements (client)

Zowe CLI is supported on platforms where Node.js 8.0 or 10 is available, including Windows, Linux, and Mac operating systems. Zowe CLI was also tested and confirmed to run on Unix System Services (USS) on z/OS.

- Install [Node.js V8.0 or higher LTS versions](https://nodejs.org/en/download/)

    **Tip:** You might need to restart the command prompt after installing Node.js. Issue the command `node --version` to verify that Node.js is installed.

- Install a version of **Node Package Manager (npm)** that is compatible with your version of Node.js. For a list of compatible versions, see [Node.js Previous Releases](https://nodejs.org/en/download/releases/).

    **Tip:** npm is included with the Node.js installation. Issue the command `npm --version` to verify the version of npm that is installed.

- **(Optional)** If you plan to install plug-ins, review the [Software requirements for CLI plug-ins](./cli-swreqplugins.md).

### Free disk space

Zowe CLI requires approximately **100 MB** of free disk space. The actual quantity of free disk space consumed might vary depending on the operating system where you install Zowe CLI.

