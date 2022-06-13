# System requirements

Before installing Zowe CLI, ensure that your environment meets the prerequisites that are described in this article.
## Client-side requirements

Zowe CLI is supported on Windows, Linux, and Mac operating systems. Meet the following requirements before you install the CLI:

- **Node.js:** Install a currently supported version of [Node.js LTS](https://nodejs.org/en/). For a complete list of supported LTS versions, see [Nodejs Releases](https://nodejs.org/en/about/releases/).

  **Note:** You might need to restart the command prompt after installing Node.js. Issue the following command to verify that Node.js is installed.

  ```
  node --version
  ```

  **Important!** If you are installing Zowe CLI with Node.js 16 on a Windows operating system, see [Installing Zowe CLI with Node.js 16 on Windows](../user-guide/cli-install-cli-nodejs-windows.md).

- **npm:** Install a version of Node Package Manager (npm) that is compatible with your version of Node.js.
  
  **Note:** npm is included with *most* Node.js installations. Issue the following command to determine your currently installed version of npm.
  
  ```
  npm --version
  ```
  
  See [Node.js release matrix](https://nodejs.org/en/download/releases/) to verify that the versions are compatible.

- **Secure Credential Store:** On Linux systems, you must install the packages `gnome-keyring` and `libsecret` (or `libsecret-1-0` on Debian and Ubuntu).

  **Note:** For information about how to configure Secure Credential Store on headless Linux and z/Linux, see [Configure Secure Credential Store on headless Linux operating systems](../user-guide/cli-configure-scs-on-headless-linux-os.md). 

- **Plug-in client requirements:** If you plan to install plug-ins, review the [Software requirements for CLI plug-ins](./cli-swreqplugins.md).

  **Important!** Ensure that you meet the client-side requirements for the **IBM Db2** plug-in *before* you install it.

## Host-side requirements

Zowe CLI requires the following mainframe configuration:

- **IBM z/OSMF configured and running:** You do not need to install the full Zowe solution to install and use Zowe CLI. Minimally, an instance of IBM z/OSMF must be running on the mainframe before you can issue Zowe CLI commands successfully. z/OSMF enables the core capabilities, such as retrieving data sets, executing TSO commands, submitting jobs, and more. If Zowe API Mediation Layer (API ML) is configured and running, Zowe CLI users can choose to connect to API ML rather than to every separate service.

- **Plug-in services configured and running:** Plug-ins communicate with various mainframe services. The services must be configured and running on the mainframe before issuing plug-in commands. For example, the IMS plug-in requires an instance of IBM IMS on the mainframe with IMS Connect (REST services) running. For more information, see [Software requirements for CLI plug-ins](./cli-swreqplugins.md)

- **Zowe CLI on z/OS is not supported:** Zowe CLI can be installed on an IBM z/OS environment and run under Unix System Services (USS). However, the IBM Db2 plug-in cannot run on z/OS due to native code requirements. As such, Zowe CLI is _not supported on z/OS_ and is currently experimental.

## Free disk space

Zowe CLI requires approximately **100 MB** of free disk space. The actual quantity of free disk space consumed might vary depending on your operating system, the plug-ins that you install, and the user profiles that are saved to disk.
