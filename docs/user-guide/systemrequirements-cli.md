# Zowe CLI software requirements

Before installing Zowe CLI, ensure that your environment meets the prerequisites that are described here.

:::info**Required role:** systems administrator
:::

## Client-side requirements

Zowe CLI is supported on Windows, Linux, and Mac operating systems. Meet the following requirements before you install the CLI:

### Node.js

The JavaScript runtime environment Node.js must be installed to run JavaScript applications (such as Zowe CLI) outside of a web browser.

To install Node.js:

  1. Go to [Node.js LTS](https://nodejs.org/en/) to select and install a runtime version with active support.

  For a list of supported LTS versions, see [Nodejs Releases](https://nodejs.org/en/about/previous-releases).

  2. Restart the command prompt after installing Node.js, if required.

  3. Verify that Node.js is installed:

  ```
  node --version
  ```
  Node.js is installed on your PC when a message returns with the correct Node.js version.
  
  If you issue the `node --version` command and get an error message, confirm that your PATH environment variable includes the path to the Node.js installation location.

### npm

Node Package Manager (npm) is included with most Node.js installations and is used to install and manage Node.js packages on your personal computer. (Zowe CLI supports whatever npm version is packaged with Node.js.)

Your installed version of npm must be compatible with your version of Node.js.

To determine the installed version of npm:

1. Issue the following command in the command prompt:
  
  ```
  npm --version
  ```

  A message returns with the installed version of npm.
  
2. Verify that your installed version of npm is compatible with your version of Node.js by referring to the [Node.js release matrix](https://nodejs.org/en/about/previous-releases#looking-for-latest-release-of-a-version-branch).

    If your npm version is not compatible, install a new version of Node.js.

### Secure credential storage

On Linux systems, you must install the packages `gnome-keyring` and `libsecret` (or `libsecret-1-0` on Debian and Ubuntu).

For information on performing this configuration, see [Configuring secure credential storage on headless Linux operating systems](../user-guide/cli-configure-scs-on-headless-linux-os.md).

### Plug-in client requirements

If you plan to install plug-ins, review the [Software requirements for CLI plug-ins](./cli-swreqplugins.md).

:::info important
Ensure that you meet the client-side requirements for the **IBM Db2** plug-in *before* it is installed.
:::

## Host-side requirements

### IBM z/OSMF

IBM z/OSMF must be configured and running.

You do not need to install the full Zowe solution to install and use Zowe CLI. Minimally, an instance of IBM z/OSMF must be running on the mainframe before you can issue Zowe CLI commands successfully. z/OSMF enables the core capabilities, such as retrieving data sets, executing TSO commands, submitting jobs, and more. If Zowe API Mediation Layer (API ML) is configured and running, Zowe CLI users can choose to connect to API ML rather than to every separate service.

### Plug-in services

Services for plug-ins must be configured and running.

Plug-ins communicate with various mainframe services. The services must be configured and running on the mainframe before issuing plug-in commands. For example, the IMS plug-in requires an instance of IBM IMS on the mainframe with IMS Connect (REST services) running. For more information, see [Software requirements for CLI plug-ins](./cli-swreqplugins.md)

### Zowe CLI on z/OS is not supported

Zowe CLI can be installed on an IBM z/OS environment and run under Unix System Services (USS). However, the IBM Db2 plug-in and the Zowe Secrets SDK cannot run on z/OS due to native code requirements. This means that any z/OS credentials display as plain text on a team configuration file. As such, Zowe CLI is *not supported* on z/OS and is currently experimental.

## Free disk space

Zowe CLI requires approximately **100 MB** of free disk space. The actual quantity of free disk space consumed might vary depending on your operating system, the plug-ins that you install, and the user profiles that are saved to disk.

##

# Software requirements for Zowe CLI plug-ins

Before you use Zowe&trade; CLI plug-ins, complete the following steps:

**Important!** You can perform the required configurations for the plug-ins that you want to use ***before*** or ***after*** you install the plug-ins. However, if you do not perform the required configurations, the plug-ins will not function as designed.

| Plug-in | Required Configurations |
| --- | --- |
| [IBM CICS Plug-in for Zowe CLI](cli-cicsplugin.md) | <ul><li>Ensure that [IBM CICS Transaction Server v5.2 or later](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.2.0/com.ibm.cics.ts.home.doc/welcomePage/welcomePage.html) is installed and running in your mainframe environment</li><li>[IBM CICS Management Client Interface (CMCI)](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.2.0/com.ibm.cics.ts.clientapi.doc/topics/clientapi_overview.html) is configured and running in your CICS region.</li></ul> |
| [IBM Db2 Database Plug-in for Zowe CLI](cli-db2plugin.md) | <ul> <li>[Download and prepare the ODBC driver](../user-guide/cli-db2plugin.md#downloading-the-odbc-driver) (required for only package installations) and address the licensing requirements. _Perform this task before you install the plug-in_.</li><li>**(MacOS)** Download and Install [Xcode](https://developer.apple.com/xcode/resources/).</li> </ul>|  [z/OS FTP Plug-in for Zowe CLI](cli-ftpplugin.md) | <ul> <li>Ensure that z/OS FTP service is enabled and configured with `JESINTERFACELEVEL` = 2.</li> <li>FTP over SSL is recommended.</li>   </ul> |
| [IBM z/OS FTP Plug-in for Zowe CLI](cli-ftpplugin.md) | <ul> <li>Ensure that z/OS FTP service is enabled and configured with `JESINTERFACELEVEL` = 2.</li> <li>FTP over SSL is recommended.</li> </ul> |
| [IBM IMS Plug-in for Zowe CLI](cli-imsplugin.md) | <ul><li>Ensure that [IBM® IMS™ v14.1.0](https://www.ibm.com/support/knowledgecenter/en/SSEPH2_14.1.0/com.ibm.ims14.doc/ims_product_landing_v14.html) or later is installed and running in your mainframe environment.</li><li> Configure [IBM® IMS™ Connect](https://www.ibm.com/support/knowledgecenter/en/SSEPH2_13.1.0/com.ibm.ims13.doc.ccg/ims_ct_intro.html).</li> <li>Configure [IBM IMS Operations APIs](https://github.com/zowe/ims-operations-api) to enable communication between the CLI and the IMS instance. </li></ul> |
| [IBM MQ Plug-in for Zowe CLI](cli-mqplugin.md) | <ul><li>Ensure that [IBM® MQ™ v9.1.0](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_9.1.0/com.ibm.mq.pro.doc/q121910_.htm) or later is installed and running in your mainframe environment. Please read this blog for more information: [Exposing the MQ REST API via the Zowe API Mediation Layer](https://developer.ibm.com/messaging/2019/05/17/exposing-the-mq-rest-api-via-the-zowe-api-mediation-layer/) </li></ul>|
| [Visual Studio Code Extension for Zowe](../user-guide/ze-install.md) | <ul><li>Node.js V8.0 or later</li><li>Access to z/OSMF; at least one profile is configured</li><li>Configure TSO/E address space services, z/OS data set, file REST interface, and z/OS jobs REST interface. For more information, see [z/OS Requirements](../user-guide/systemrequirements-zosmf.md).</li></ul>|


**Important!** You can perform the required configurations for the plug-ins that you want to use ***before*** or ***after*** you install the plug-ins. However, if you do not perform the required configurations, the plug-ins will not function as designed.
