# System requirements

Before installing Zowe&trade;, ensure that your environment meets the prerequisites.

- [z/OS system requirements](#zos-system-requirements-host)
  - [Zowe Application Framework requirements](#zowe-application-framework-requirements-host)
  - [Multi-Factor Authentication for Zowe Desktop](#multi-factor-authentication-for-zowe-desktop)
    - [Using web tokens for SSO on for ZLUX and ZSS](#using-web-tokens-for-sso-on-for-zlux-and-zss)
    - [Creating a PKCS#11 Token](#creating-a-pkcs11-token)
    - [Accessing token](#accessing-token)
    - [Enabling SSO](#enabling-sso)
- [Zowe CLI requirements](#zowe-cli-requirements)
    - [Client-side requirements](#client-side-requirements)
    - [Host-side requirements](#host-side-requirements)
    - [Free disk space](#free-disk-space)

Zowe CLI operates independently of the Zowe z/OS component and is installed on a client PC that runs Windows, Linux, or Mac operating systems.  It can access z/OS endpoints such as z/OSMF, or can access FTP, CICS, DB2, and other z/OS services through plug-ins.  The z/OS environment that Zowe CLI communicates with does not require that the Zowe z/OS component is installed.

The Zowe z/OS component is installed on a z/OS environment and provides a number of services that are accessed through a web browser such as an API catalog and a web desktop.  The client PC that accesses the Zowe z/OS component does not need to have the Zowe CLI installed.  

For more information on the relationship between the Zowe z/OS components and Zowe CLI, see [Zowe overview](../getting-started/overview.md).  

The z/OS environment that Zowe CLI communicates with has some advantages that are provided by the API Mediation Layer of Zowe, such as single-sign-on and the CLI only needing to trust a single certificate for all of its endpoints.

## z/OS system requirements (host)

- z/OS Version 2.2 or later.
- IBM z/OS Management Facility (z/OSMF) Version 2.2, Version 2.3 or Version 2.4.

  z/OSMF is an optional prerequisite for Zowe.  It is recommended that z/OSMF is present to fully exploit Zowe's capabilities.
  
- z/OS OpenSSH V2.2.0 or higher
  
  Conditional requisite for ssh connection.

  :::tip
   - For non-production use of Zowe (such as development, proof-of-concept, demo),  you can customize the configuration of z/OSMF to create what is known as "z/OS MF Lite" that simplifies the setup of z/OSMF. As z/OS MF Lite only supports selected REST services (JES, DataSet/File, TSO and Workflow), you will observe considerable improvements in startup time as well as a reduction in the efforts involved in setting up z/OSMF. For information about how to set up z/OSMF Lite, see [Configuring z/OSMF Lite (non-production environment)](systemrequirements-zosmf-lite.md)
  - For production use of Zowe, see [Configuring z/OSMF](systemrequirements-zosmf.md).
  :::

### Zowe Application Framework requirements (host)

The Zowe Application Framework server provides the Zowe Desktop that contains an extensible GUI with a number of applications allowing access to z/OS functions, such as the File Editor, TN3270 emulator, JES Explorer, and more. For more information, see [Zowe Architecture](../getting-started/zowe-architecture.md#zlux).

- Node.js
  - **Note: Starting in September 2020, Node.js v6 will no longer be supported. Users are advised to update to more recent versions of Node.js** 
  - On z/OS: Node.js v6.x starting with v6.14.4, v8.x (except v8.16.1), and v12.x. Note when using v12.x, it is highly recommended that plug-ins used are tagged. For more information, see [Tagging on z/OS](../extend/extend-desktop/mvd-buildingplugins.md#tagging-plugin-files-on-z-os)
  - Off z/OS: The Application Framework supports Node.js v6.14 through v12.x.
  
   To install Node.js on z/OS, follow the instructions in [Installing Node.js on z/OS](install-nodejs-zos.md).

- IBM SDK for Java Technology Edition V8 or later
- 833 MB of zFS file space

- (client) Supported browsers:
    -   Google Chrome V66 or later
    -   Mozilla Firefox V60 or later
    -   Safari V12.0 or later
    -   Microsoft Edge 17 (Windows 10)

   Each release of the Zowe Application Framework is tested to work on the current releases of Chrome, Firefox, Safari, and Edge, as well as the oldest release within a 1-year time span, unless the current release is also older than 1 year. For Firefox, the oldest supported release will also be from the Extended Support Release (ESR) version of Firefox, to ensure compatibility in those enterprise environments. This scheme for browser support is to ensure that Zowe works on the vast majority of browsers that people are currently using, while still allowing for use of new features and security that browsers constantly add.

If you do not see your product listed here, please contact the Zowe community so that it can be validated and included.

### Multi-Factor Authentication for Zowe Desktop

To enable multi-factor authentication, you must install [IBM Z Multi-Factor Authentication](https://www.ibm.com/us-en/marketplace/ibm-multifactor-authentication-for-zos). For information on using MFA in Zowe, see [Multi-Factor Authentication](mvd-configuration.md#multi-factor-authentication-configuration).

### Using web tokens for SSO on ZLUX and ZSS

In order to use web tokens for SSO on ZLUX and ZSS, users must first create a PKCS#11 token. See [Creating a PKCS#11 Token](configure-certificates.md#creating-a-pkcs11-token) for more information.   

## Zowe CLI requirements (client)

### Client-side requirements

Zowe CLI is supported on platforms where Node.js 8.0 or higher is available, including Windows, Linux, and Mac operating systems. 

- Install [Node.js V8.0 or higher LTS versions](https://nodejs.org/en/download/)

    **Tip:** You might need to restart the command prompt after installing Node.js. Issue the command `node --version` to verify that Node.js is installed.

- Install a version of **Node Package Manager (npm)** that is compatible with your version of Node.js. For a list of compatible versions, see [Node.js Previous Releases](https://nodejs.org/en/download/releases/).

    **Tip:** npm is included with the Node.js installation. Issue the command `npm --version` to verify the version of npm that is installed.

- **(Optional)** If you plan to install plug-ins, review the [Software requirements for CLI plug-ins](./cli-swreqplugins.md).

- **z/OS:** Zowe CLI can be installed on a z/OS environment and run under Unix System Services (USS).  However, the IBM DB2 and the Secure Credentials Store plug-ins will *not* run on z/OS due to native code requirements.  As such Zowe CLI on z/OS is not supported and is currently experimental. 

### Host-side requirements

- When Zowe CLI runs on a client PC, it is not required that Zowe z/OS component is installed on the environment that Zowe CLI connects to.  Zowe CLI uses profiles to talk to URL endpoints, which encapsulate the connection details for the server that Zowe CLI commands communicate with. The Zowe Core CLI can communicate to z/OSMF to perform tasks such as retrieving data sets, executing TSO commands, submitting jobs, working with USS and more. For more information, see [Using Zowe CLI](../user-guide/cli-usingcli.md#displaying-zowe-cli-help).  

- Extension plug-ins for Zowe CLI can talk to the specific endpoints they have been defined, for example the IBM CICS plug-in talks to CICS regions, the IMS DB2 plug-in talks to DB2 databases.  

### Free disk space

Zowe CLI requires approximately **100 MB** of free disk space. The actual quantity of free disk space consumed might vary depending on the operating system where you install Zowe CLI.

