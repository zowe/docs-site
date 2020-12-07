# System requirements <!-- omit in toc -->

Before installing Zowe&trade;, ensure that your environment meets the prerequisites.

- [z/OS system requirements (host)](#zos-system-requirements-host)
  - [Zowe API Mediation Layer on z/OS requirements](#zowe-api-mediation-layer-on-zos-requirements-host)
  - [Zowe Web Explorers and APIs on z/OS requirements](#zowe-web-explorers-and-apis-on-zos-requirements-host)
  - [Zowe Application Framework on z/OS requirements](#zowe-application-framework-requirements-host)
    - [Important note for users upgrading to v1.14](#important-note-for-users-upgrading-to-v114)
- [Docker requirements](#docker-requirements-host)
- [Zowe Desktop requirements](#zowe-desktop-requirements-client)
- [Zowe CLI requirements](#zowe-cli-requirements-client)
  - [Client-side](#client-side-requirements)
  - [Host-side](#host-side-requirements)
  - [Free disk space](#free-disk-space)
- [Feature requirements]
  - [Multi-Factor Authentication (MFA)](#multi-factor-authentication-mfa)
  - [Single Sign-On (SSO)](#single-sign-on-sso)

**Please note: Not all of the prerequisites below are needed. The prerequisites needed depends on what components you want to use.**

Zowe CLI operates independently of the Zowe z/OS component and is installed on a client PC that runs Windows, Linux, or Mac operating systems.  It can access z/OS endpoints such as z/OSMF, or can access FTP, CICS, DB2, and other z/OS services through plug-ins.  Unless required by plug-ins, the Zowe CLI does not require the Zowe server components to be installed.

All Zowe server components can be installed on a z/OS environment, while some can alternatively be installed on Linux or zLinux via Docker. The components provide a number of services that are accessed through a web browser such as an API catalog and a web desktop.  The client PC that accesses the Zowe server components does not need to have the Zowe CLI installed.

Even though the Zowe server components do not require the CLI and vice-versa, there is an advantage to having the server components if using the CLI. When installed, the API Mediation Layer of Zowe can provide benefits to the CLI such as single-sign-on and only needing to trust a single certificate when using multiple Zowe-related endpoints.

For more information on the relationship between the Zowe server components and Zowe CLI, see [Zowe overview](../getting-started/overview.md).  


## z/OS system requirements (host)

- z/OS version in active support, such as Version 2.3 and Version 2.4

   **Note:** z/OS V2.2 reaches end of support on 30 September 2020. For more information, see the z/OS v2.2 lifecycle details [https://www.ibm.com/support/lifecycle/details?q45=Z497063S01245B61](https://www.ibm.com/support/lifecycle/details?q45=Z497063S01245B61). Zowe Version 1.15 and earlier can continue to work with z/OS V2.2 but you are advised to upgrade your z/OS to more recent versions.

- zFS volume with at least 833mb of free space for Zowe server components, their keystore, instance configuration files and logs, and third party plugins.
  **Requirement for:** Zowe Server Components (API Mediation Layer, Application Framework, ZSS)

- (Optional, recommended) IBM z/OS Management Facility (z/OSMF) Version 2.2, Version 2.3 or Version 2.4.
  While z/OSMF is optional for Zowe, many components utilize it and therefore it is recommended that z/OSMF is present to fully exploit Zowe's capabilities.

  When utilizing z/OSMF with Zowe ensure the [z/OSMF JWT Support is available via APAR and associated PTFs](https://www.ibm.com/support/pages/apar/PH12143).
  
- (Optional, recommended) z/OS OpenSSH V2.2.0 or higher.
  Some features of Zowe require SSH, such as the Desktop's SSH terminal.
  Some users may also find it convenient to install & manage Zowe via SSH, as an alternative to OMVS over TN3270.

  ::: tip
   - For non-production use of Zowe (such as development, proof-of-concept, demo),  you can customize the configuration of z/OSMF to create what is known as "z/OS MF Lite" that simplifies the setup of z/OSMF. As z/OS MF Lite only supports selected REST services (JES, DataSet/File, TSO and Workflow), you will observe considerable improvements in startup time as well as a reduction in the efforts involved in setting up z/OSMF. For information about how to set up z/OSMF Lite, see [Configuring z/OSMF Lite (non-production environment)](systemrequirements-zosmf-lite.md).
  - For production use of Zowe, see [Configuring z/OSMF](systemrequirements-zosmf.md).
  :::


### Zowe API Mediation Layer on z/OS requirements (host)

- IBM SDK for Java Technology Edition V8 or later

### Zowe Web Explorers and APIs on z/OS requirements (host)

- Node.js v8.x (except v8.16.1), and v12.x.
  **Note:** when using v12.x, it is highly recommended that plug-ins used are tagged. For more information, see [Tagging on z/OS](../extend/extend-desktop/mvd-buildingplugins.md#tagging-plugin-files-on-z-os)
  To install Node.js on z/OS, follow the instructions in [Installing Node.js on z/OS](install-nodejs-zos.md).

- IBM SDK for Java Technology Edition V8 or later

### Zowe Application Framework on z/OS requirements (host)

The Zowe Application Framework server provides the Zowe Desktop that contains an extensible GUI with a number of applications allowing access to z/OS functions, such as the File Editor, TN3270 emulator, JES Explorer, and more. For more information, see [Zowe Architecture](../getting-started/zowe-architecture.md#zlux).

- Node.js v8.x (except v8.16.1), and v12.x.
  **Note:** when using v12.x, it is highly recommended that plug-ins used are tagged. For more information, see [Tagging on z/OS](../extend/extend-desktop/mvd-buildingplugins.md#tagging-plugin-files-on-z-os)
  To install Node.js on z/OS, follow the instructions in [Installing Node.js on z/OS](install-nodejs-zos.md).

- IBM SDK for Java Technology Edition V8 or later


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

## Docker requirements (host)

Docker is a technology for delivering a set of software and all its prerequisites and run them in an isolated manner to reduce installation steps and to eliminate troubleshooting environmental differences.
Docker can run on many operating systems, but currently the Zowe Docker image is for x86 Linux (Intel, AMD) and zLinux ("s390x"). Support for platforms such as zCX, Windows, and more will be added over time.

To get Docker for Linux, you should check your Linux software repository. Whether using Ubuntu, Red Hat, SuSE, and many other types of Linux, you can install Docker the same way you install other software on Linux through the package manager.

Once you have Docker, the Zowe Docker image has the following requirements

- 4 GB free RAM, 8 GB recommended
- 4 GB free disk space
- Network access to the z/OS host. The Linux host must be able to communicate with the z/OS host.

When using Docker, z/OS is still required and if using the Application Framework or ZSS, installing ZSS on the z/OS host is still required. See these requirements:
- [z/OS system requirements](zos-system-requirements-host)

**Note:** The subsections of z/OS requirements such as for API Mediation Layer, Web Explorers, and Application Framework are not required because they are included in the Docker install.

## Zowe Desktop requirements (client)

The Zowe Desktop is powered by the Application Framework which has server prereqs depending on where it is installed
- [Application Framework on z/OS prerequisites](#zowe-application-framework-requirements-host)
- [Application Framework on Docker prerequisites](#docker-requirements-host)

The Zowe Desktop runs inside of a browser. No browser extensions or plugins are required.
The Zowe Desktop supports Google Chrome, Mozilla Firefox, Apple Safari and Microsoft Edge releases that are at most 1 year old, except when the newest release is older.
For Firefox, both the regular and Extended Support Release (ESR) versions are supported under this rule.

Currently, the following browsers are supported:
    -   Google Chrome V77 or later
    -   Mozilla Firefox V68 or later
    -   Safari V12.1 or later
    -   Microsoft Edge 18

If you do not see your browser listed here, please contact the Zowe community so that it can be validated and included.

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

## Feature requirements

Zowe has several optional features that have additional prerequisites as follows.

### Multi-Factor Authentication (MFA)

Multi-factor authentication is supported for several components, such as the Desktop and API Mediation Layer.
Multi-factor authentication is provided by third party products which Zowe is compatible with. The following are known to work:
- [IBM Z Multi-Factor Authentication](https://www.ibm.com/us-en/marketplace/ibm-multifactor-authentication-for-zos).

For information on using MFA in Zowe, see [Multi-Factor Authentication](mvd-configuration.md#multi-factor-authentication-configuration).

### Single Sign-On (SSO)

Zowe has an SSO scheme with the goal that each time you use use multiple Zowe components you should only be prompted to login once.

Requirements: 
- IBM z/OS Management Facility (z/OSMF)
- (Optional, recommended) PKCS#11 token setup is required when using ZSS, the Desktop, and Application Framework with SSO. See [Creating a PKCS#11 Token](configure-certificates.md#creating-a-pkcs11-token) for more information.
