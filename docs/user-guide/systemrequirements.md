# System requirements <!-- omit in toc -->

Before installing Zowe&trade;, ensure that your environment meets the prerequisites.

- [z/OS system requirements (host)](#zos-system-requirements-host)
- [Zowe Application Framework requirements (host)](#zowe-application-framework-requirements-host)
  - [Important note for users upgrading to v1.14](#important-note-for-users-upgrading-to-v114)
  - [Multi-Factor Authentication for Zowe Desktop](#multi-factor-authentication-for-zowe-desktop)
  - [Using web tokens for SSO on ZLUX and ZSS](#using-web-tokens-for-sso-on-zlux-and-zss)
- [Zowe CLI requirements](#zowe-cli-requirements)
  - [Client-side](#client-side)
  - [Host-side](#host-side)
  - [Free disk space](#free-disk-space)

Zowe CLI operates independently of the Zowe z/OS component and is installed on a client PC that runs Windows, Linux, or Mac operating systems.  It can access z/OS endpoints such as z/OSMF, or can access FTP, CICS, DB2, and other z/OS services through plug-ins.  The z/OS environment that Zowe CLI communicates with does not require that the Zowe z/OS component is installed.

The Zowe z/OS component is installed on a z/OS environment and provides a number of services that are accessed through a web browser such as an API catalog and a web desktop.  The client PC that accesses the Zowe z/OS component does not need to have the Zowe CLI installed.

For more information on the relationship between the Zowe z/OS components and Zowe CLI, see [Zowe overview](../getting-started/overview.md).

The z/OS environment that Zowe CLI communicates with has some advantages that are provided by the API Mediation Layer of Zowe, such as single-sign-on and the CLI only needing to trust a single certificate for all of its endpoints.

## z/OS system requirements (host)

- z/OS version in active support, such as Version 2.3 and Version 2.4

   **Note:** z/OS V2.2 reaches end of support on 30 September 2020. For more information, see the z/OS v2.2 lifecycle details [https://www.ibm.com/support/lifecycle/details?q45=Z497063S01245B61](https://www.ibm.com/support/lifecycle/details?q45=Z497063S01245B61). Zowe Version 1.15 and earlier can continue to work with z/OS V2.2 but you are advised to upgrade your z/OS to more recent versions.

- IBM z/OS Management Facility (z/OSMF) Version 2.2, Version 2.3 or Version 2.4.

  z/OSMF is an optional prerequisite for Zowe.  It is recommended that z/OSMF is present to fully exploit Zowe's capabilities.

  When utilizing z/OSMF with Zowe ensure the [z/OSMF JWT Support is available via APAR and associated PTFs](https://www.ibm.com/support/pages/apar/PH12143).

- z/OS OpenSSH V2.2.0 or later

  Conditional requisite for ssh connection.

  ::: tip
   - For non-production use of Zowe (such as development, proof-of-concept, demo),  you can customize the configuration of z/OSMF to create what is known as "z/OS MF Lite" that simplifies the setup of z/OSMF. As z/OS MF Lite only supports selected REST services (JES, DataSet/File, TSO and Workflow), you will observe considerable improvements in startup time as well as a reduction in the efforts involved in setting up z/OSMF. For information about how to set up z/OSMF Lite, see [Configuring z/OSMF Lite (non-production environment)](systemrequirements-zosmf-lite.md).
  - For production use of Zowe, see [Configuring z/OSMF](systemrequirements-zosmf.md).
  :::

## Zowe Application Framework requirements (host)

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

### Important note for users upgrading to v1.14

If you are upgrading to Zowe v1.14 from a previous release,
and the value of `ZOWE_EXPLORER_HOST` does not match the host and domain that you put into your browser to access Zowe, you must update your configuration due to updated referrer-based security.

To configure your system for the version 1.14 update, perform **one** of the following tasks:
- Define `ZWE_EXTERNAL_HOSTS` as a comma-separated list of hosts from which you would access Zowe from your browser.
  - `ZWE_EXTERNAL_HOSTS=host1,host2,...`

- Define `ZWE_REFERRER_HOSTS` as a comma-separated list for the value to be applied specifically for referrer purposes.
  - `ZWE_REFERRER_HOSTS=host1,host2,...`

See [Reviewing the instance env file](../user-guide/configure-instance-directory.md#reviewing-the-instanceenv-file) for additional information on the use of `instance.env` files.

See [Configuring a Zowe instance via instance.env file](../user-guide/configure-instance-directory.md#configuring-a-Zowe-instance-via-instanceenv-file) for additional information on configuring `instance.env` files.

### Multi-Factor Authentication for Zowe Desktop

To enable multi-factor authentication, you must install [IBM Z Multi-Factor Authentication](https://www.ibm.com/us-en/marketplace/ibm-multifactor-authentication-for-zos). For information on using MFA in Zowe, see [Multi-Factor Authentication](mvd-configuration.md#multi-factor-authentication-configuration).

### Using web tokens for SSO on ZLUX and ZSS

In order to use web tokens for SSO on ZLUX and ZSS, users must first create a PKCS#11 token. See [Creating a PKCS#11 Token](configure-certificates.md#creating-a-pkcs11-token) for more information.

## Zowe CLI requirements

### Client-side

Zowe CLI is supported on Windows, Linux, and Mac operating systems. Meet the following requirements before you install the CLI:

- **Node.js:** Install a currently supported Node.js LTS version. For an up-to-date list of supported LTS versions, see [Nodejs.org](https://nodejs.org/en/about/releases/).

    ::: tip
    You might need to restart the command prompt after installing Node.js. Issue the command `node --version` to verify that Node.js is installed.
    :::

- **npm:** Install a version of Node Package Manager (npm) that is compatible with your version of Node.js.

    ::: tip
    Npm is included with most Node.js installations. Issue the command `npm --version` to check your current version. You can reference the [Node.js release matrix](https://nodejs.org/en/download/releases/) to verify that the versions are compatible.
    :::

- **Plug-in client requirements:** If you plan to install plug-ins, review the [Software requirements for CLI plug-ins](./cli-swreqplugins.md). You *must* meet the client requirements for the Secure Credential Store and IBM Db2 plug-ins prior to installing them.

### Host-side

Zowe CLI requires the following mainframe configuration:

- **IBM z/OSMF configured and running:** You do not need to install the full Zowe solution to install and use Zowe CLI. Minimally, an instance of IBM z/OSMF must be running on the mainframe before you can issue Zowe CLI commands successfully. z/OSMF enables the core capabilities such as retrieving data sets, executing TSO commands, submitting jobs, and more. If Zowe API Mediation Layer (API ML) is configured and running, CLI users can choose to connect to API ML rather than to every separate service.

- **Plug-in services configured and running:** Plug-ins communicate with various mainframe services, which must be configured and running on the mainframe prior to issuing plug-in commands. For example, the IMS plug-in requires an instance of IBM IMS on the mainframe with IMS Connect (REST services) running. For more information, see [Software requirements for CLI plug-ins](./cli-swreqplugins.md)

- **Zowe CLI on z/OS is not supported:** Zowe CLI can be installed on an IBM z/OS environment and run under Unix System Services (USS). However, the IBM Db2 and Secure Credentials Store plug-ins will *not* run on z/OS due to native code requirements. As such, Zowe CLI is *not supported on z/OS* and is currently experimental.

### Free disk space

Zowe CLI requires approximately **100 MB** of free disk space. The actual quantity of free disk space consumed might vary depending on your operating system, the plug-ins that you install, and user profiles saved to disk.