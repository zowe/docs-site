# Installing Zowe CLI

Install Zowe&trade; CLI on your computer.

If your role is that of a systems administrator or you are familiar with command-line tools and want to get started using Zowe CLI quickly, see [Zowe CLI quick start](../getting-started/cli-getting-started.md). You can learn about new CLI features in the [Release notes](../getting-started/release-notes/v2_1_0.md).

After you install Zowe CLI and Zowe CLI plug-ins using your preferred installation method, see [Using CLI](../user-guide/cli-using-usingcli.md) to learn about how to connect Zowe CLI to the mainframe, create Zowe CLI profiles and team profiles, integrate Zowe CLI with API ML, enable daemon mode, and much, much more!
## Installation guidelines
  
To install CLI on **Windows**, **Mac**, and **Linux** operating systems, follow the steps in [Install Zowe CLI from npm](#install-zowe-cli-from-npm) or [Install Zowe CLI from a local package](#install-zowe-cli-from-a-local-package).

***However***, to install Zowe CLI on **z/Linux**, **z/OS UNIX System Services (USS)**, or on an operating system where the **Secure Credential Store** is ***not required*** or ***cannot be installed***, use the following installation guidelines:

-  To install Zowe CLI on a z/Linux operating system and you **require** the Secure Credential Store:
   1. Follow the steps in [Configure Secure Credential Store on headless Linux operating systems](cli-configure-scs-on-headless-linux-os).
   2. Follow the steps in [Install Zowe CLI from npm](#install-zowe-cli-from-npm) or [Install Zowe CLI from a download](#install-zowe-cli-from-a-download).
-  To install Zowe CLI on a z/Linux operating system and you **do not require** the Secure Credential Store:
   1. Follow the steps in [Install Zowe CLI from npm](#install-zowe-cli-from-npm) or [Install Zowe CLI from a download](#install-zowe-cli-from-a-download).
   2. Follow the steps in [Configure Zowe CLI on operating systems where the Secure Credential Store is not available](cli-configure-cli-on-os-where-scs-unavailable).
-  To install Zowe CLI on a USS system or on an operating system where you **cannot install** the Secure Credential Store:
   1. Follow the steps in [Install Zowe CLI from npm](#install-zowe-cli-from-npm) or [Install Zowe CLI from a download](#install-zowe-cli-from-a-download).
   2. Follow the steps in [Configure Zowe CLI on operating systems where the Secure Credential Store is not available](cli-configure-cli-on-os-where-scs-unavailable).

### Installation notes

- As you are installing Zowe CLI, you might encounter error messages that relate to `cpu-features` and `ssh`. You can safely ignore error messages of this type; the installation completes successfully. This behavior can occur when you install CLI from npm and from a local package.

## Prerequisites

- Meet the [software requirements](../user-guide/systemrequirements-cli.md) for Zowe CLI.
- Meet the [software requirements](../user-guide/cli-swreqplugins.md) for each plug-in.

### Prerequisite notes

- If you are installing Zowe CLI on a computer that is running Node.js 16 on a Windows operating system, see [Installing Zowe CLI with Node.js 16 on Windows](../user-guide/cli-install-cli-nodejs-windows.md).

- If you are running NPM version 7 (`npm@7`) or NPM version 8 (`npm@8`) on a Windows operating system, ensure that your computer is connected to the Internet.

   Issue the following command ***before*** you install Zowe CLI:

   ```
   npm install -g prebuild-install
   ```

- Linux users ***might*** need to prepend `sudo` to `npm` commands. For more information, see [Troubleshooting Zowe CLI](../troubleshoot/cli/troubleshoot-cli.md).


## Install Zowe CLI from npm

Use the following procedure to install Zowe CLI from an npm registry:

1. To install or update the core CLI, open a command-line window:

   ```
   npm install -g @zowe/cli@zowe-v2-lts
   ```

   Zowe CLI is installed.

2. (Optional) Address the [Software requirements for CLI plug-ins](../user-guide/cli-swreqplugins.md). You can install most plug-ins without meeting the requirements. However, the plug-ins will not function until you configure the back-end APIs. The IBM Db2 plug-in requires additional configuration to install.

3. (Optional) To install all available plug-ins to Zowe CLI, issue the following command:
   
   ```
   zowe plugins install @zowe/cics-for-zowe-cli@zowe-v2-lts @zowe/db2-for-zowe-cli@zowe-v2-lts @zowe/ims-for-zowe-cli@zowe-v2-lts @zowe/mq-for-zowe-cli@zowe-v2-lts @zowe/zos-ftp-for-zowe-cli@zowe-v2-lts
   ```

Zowe CLI is installed on your computer. Issue the `zowe --help` command to view a list of available commands. For information about how to connect the CLI to the mainframe, create profiles, integrate with API ML, and more, see [Using Zowe CLI](../user-guide/cli-using-usingcli.md).

## Install Zowe CLI from a local package

Use the following procedure to install Zowe CLI from a local package:

1. Meet the [prerequisites](#prerequisites) for installing Zowe CLI.

2. Navigate to [Download Zowe](https://www.zowe.org/download.html) and click the **Zowe vNext CLI Core** button.

3. Read the End User License Agreement for Zowe and click **I agree** to download the core package.

    `zowe-cli-package-next-2022MMDD.zip` is downloaded to your computer (where MMDD indicates the month and day of the build).

4. **(Optional)** Meet the [prerequisites](#prerequisites) for installing Zowe CLI plug-ins.
5. **(Optional)** Navigate to [Download Zowe](https://www.zowe.org/download.html) and click the **Zowe vNext CLI Plugins** button to download the plugins.

6. **(Optional)** Read the End User License Agreement for Zowe plug-ins and click **I agree** to download the plugins package.

    `zowe-cli-plugins-next-2022MMDD.zip` is downloaded to your computer (where MMDD indicates the month and day of the build).

7. Unzip the contents of `zowe-cli-package-next-2021MMDD.zip` (and optionally `zowe-cli-plugins-2021MMDD.zip`) to a working directory.

8. To install Zowe CLI Core, open a command-line window and issue the following commands to the working directory that you used in Step 7:

   ```
   npm install -g zowe-cli.tgz
   ```

   **Note:** If an `EACCESS` error displays, see [Resolving EACCESS permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) in the npm documentation.

9. **(Optional)** To install Zowe CLI plug-ins, issue the following command to the working directory that you used in Step 7: 

   ```
   zowe plugins install cics-for-zowe-cli.tgz db2-for-zowe-cli.tgz zos-ftp-for-zowe-cli.tgz ims-for-zowe-cli.tgz mq-for-zowe-cli.tgz
   ```

Zowe CLI and the optional plug-ins are installed on your computer. Issue the `zowe --help` command to view a list of available commands. For information about how to connect the CLI to the mainframe, create profiles and team profiles, integrate with API ML, enable daemon mode, and more, see [Using CLI](../user-guide/cli-using-usingcli.md).