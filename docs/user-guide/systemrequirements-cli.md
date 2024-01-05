# Zowe CLI System requirements

Before installing Zowe CLI, ensure that your environment meets the prerequisites that are described here.

## Client-side requirements

Zowe CLI is supported on Windows, Linux, and Mac operating systems. Meet the following requirements before you install the CLI:

### Node.js

The JavaScript runtime environment Node.js must be installed to run JavaScript applications (such as Zowe CLI) outside of a web browser.

To install Node.js:

  1. Go to [Node.js LTS](https://nodejs.org/en/) to select and install a runtime version with active support.

  For a list of supported LTS versions, see [Nodejs Releases](https://https://nodejs.org/en/about/previous-releases).

  2. Restart the command prompt after installing Node.js, if required.

  3. Verify that Node.js is installed:

  ```
  node --version
  ```
  Node.js is installed on your PC when a message returns with the correct Node.js version.
  
  If you issue the `node --version` command and get an error message, confirm that your PATH environment variable includes the path to the Node.js installation location.

:::info important
If you are installing Zowe CLI with Node.js 16 on a Windows operating system, see [Installing Zowe CLI with Node.js 16 on Windows](../user-guide/cli-install-cli-nodejs-windows.md).
:::

### npm

Node Package Manager (npm) is included with most Node.js installations and is used to install and manage Node.js packages on your personal computer.

Your installed version of npm must be compatible with your version of Node.js.

To determine the installed version of npm:

1. Issue the following command in the command prompt:
  
  ```
  npm --version
  ```

  A message returns with the installed version of npm.
  
2. Verify that your installed version of npm is compatible with your version of Node.js by referring to the [Node.js release matrix](https://nodejs.org/en/about/previous-releases#looking-for-latest-release-of-a-version-branch).

    If your npm version is not compatible, install a new version of Node.js.

:::info important
 If you are running npm version 8.11.0 or 8.12.0 and you are installing Zowe CLI on a computer that cannot access the Internet or has restricted Internet access, your Zowe CLI installation appears to complete successfully.
 
 However, when you issue Zowe commands that access the Secure Credential Store, the commands return error messages. To circumvent this problem, install npm 8.12.1 or later on your computer. If you cannot upgrade to 8.12.1 or later, see [Zowe Commands Fail with Secure Credential Errors](../troubleshoot/cli/known-cli.md#zowe-commands-fail-with-secure-credential-errors).
:::

### Secure Credential Store

On Linux systems, you must install the packages `gnome-keyring` and `libsecret` (or `libsecret-1-0` on Debian and Ubuntu).

For information about how to configure Secure Credential Store on headless Linux and z/Linux, see [Configure Secure Credential Store on headless Linux operating systems](../user-guide/cli-configure-scs-on-headless-linux-os.md).

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

Zowe CLI can be installed on an IBM z/OS environment and run under Unix System Services (USS). However, the IBM Db2 plug-in cannot run on z/OS due to native code requirements. As such, Zowe CLI is *not supported* on z/OS and is currently experimental.

## Free disk space

Zowe CLI requires approximately **100 MB** of free disk space. The actual quantity of free disk space consumed might vary depending on your operating system, the plug-ins that you install, and the user profiles that are saved to disk.
