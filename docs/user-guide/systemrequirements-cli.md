# System requirements

Before installing Zowe&trade; CLI, ensure that your environment meets the prerequisites.

- [Client-side](#client-side)
- [Host-side](#host-side)
- [Free disk space](#free-disk-space)

## Client-side

Zowe CLI is supported on Windows, Linux, and Mac operating systems. Meet the following requirements before you install the CLI:

- **Node.js:** Install a currently supported Node.js LTS version. For an up-to-date list of supported LTS versions, see [Nodejs.org](https://nodejs.org/en/about/releases/).

  **Tip:**  You might need to restart the command prompt after installing Node.js. Issue the command `node --version` to verify that Node.js is installed.

  **Note:** If you are installing Zowe CLI with Node.js 16 on a Windows operating system, see [Installing Zowe CLI with Node.js 16 on Windows](cli-install-cli-nodejs-windows).

- **npm:** Install a version of Node Package Manager (npm) that is compatible with your version of Node.js.

  **Tip:** Npm is included with most Node.js installations. Issue the command `npm --version` to check your current version. You can reference the [Node.js release matrix](https://nodejs.org/en/download/releases/) to verify that the versions are compatible.

- **(Optional) ssh2 Package:** Zowe CLI has a dependency on the ssh2 package. This package allows for more secure cryptographic ciphers to be used first on supporting hardware. See [Installing the ssh2 Package for Zowe CLI](cli-installing-ssh2-package.md).


- **Plug-in client requirements:** If you plan to install plug-ins, review the [Software requirements for CLI plug-ins](./cli-swreqplugins.md). You _must_ meet the client requirements for the Secure Credential Store and IBM Db2 plug-ins prior to installing them.

## Host-side

Zowe CLI requires the following mainframe configuration:

- **IBM z/OSMF configured and running:** You do not need to install the full Zowe solution to install and use Zowe CLI. Minimally, an instance of IBM z/OSMF must be running on the mainframe before you can issue Zowe CLI commands successfully. z/OSMF enables the core capabilities such as retrieving data sets, executing TSO commands, submitting jobs, and more. If Zowe API Mediation Layer (API ML) is configured and running, CLI users can choose to connect to API ML rather than to every separate service.

- **Plug-in services configured and running:** Plug-ins communicate with various mainframe services, which must be configured and running on the mainframe prior to issuing plug-in commands. For example, the IMS plug-in requires an instance of IBM IMS on the mainframe with IMS Connect (REST services) running. For more information, see [Software requirements for CLI plug-ins](./cli-swreqplugins.md)

- **Zowe CLI on z/OS is not supported:** Zowe CLI can be installed on an IBM z/OS environment and run under Unix System Services (USS). However, the IBM Db2 and Secure Credentials Store plug-ins will _not_ run on z/OS due to native code requirements. As such, Zowe CLI is _not supported on z/OS_ and is currently experimental.

## Free disk space

Zowe CLI requires approximately **100 MB** of free disk space. The actual quantity of free disk space consumed might vary depending on your operating system, the plug-ins that you install, and user profiles saved to disk.
