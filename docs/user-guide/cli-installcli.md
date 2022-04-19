# Installing Zowe CLI

Install Zowe&trade; CLI on your computer.

If you are familiar with command-line tools and want to get started using Zowe CLI quickly, see [Zowe CLI quick start](../getting-started/cli-getting-started.md). You can learn about new CLI features in the [Release notes](../getting-started/summaryofchanges.md).

After you install Zowe CLI using your preferred installation method, see [Using CLI](../user-guide/cli-using-usingcli.md) to learn about how to connect Zowe CLI to the mainframe, create Zowe CLI profiles and team profiles, integrate Zowe CLI with API ML, enable daemon mode, and much, much more!
## Installation guidelines
  
To install CLI on **Windows**, **Mac**, and **Linux** operating systems, follow the steps in [Install Zowe CLI from npm](#install-zowe-cli-from-npm) or [Install Zowe CLI from a download](#install-zowe-cli-from-a-download).

***However***, to install Zowe CLI on **z/Linux**, **z/OS UNIX System Services (USS)**, or on an operating system where the **Secure Credential Store** is ***not required*** or ***cannot be installed***, use the following installation guidelines:

-  To install Zowe CLI on a z/Linux operating system and you **require** the Secure Credential Store:
   1. Follow the steps in [Configure Secure Credential Store on z/Linux operating systems](cli-configure-scs-on-zlinux-os).
   2. Follow the steps in [Install Zowe CLI from npm](#install-zowe-cli-from-npm) or [Install Zowe CLI from a download](#install-zowe-cli-from-a-download).
-  To install Zowe CLI on a z/Linux operating system and you **do not require** the Secure Credential Store:
   1. Follow the steps in [Install Zowe CLI from npm](#install-zowe-cli-from-npm) or [Install Zowe CLI from a download](#install-zowe-cli-from-a-download).
   2. Follow the steps in [Configure Zowe CLI on operating systems where the Secure Credential Store is not available](cli-configure-cli-on-os-where-scs-unavailable).
-  To install Zowe CLI on a USS system or on an operating system where you **cannot install** the Secure Credential Store:
   1. Follow the steps in [Install Zowe CLI from npm](#install-zowe-cli-from-npm) or [Install Zowe CLI from a download](#install-zowe-cli-from-a-download).
   2. Follow the steps in [Configure Zowe CLI on operating systems where the Secure Credential Store is not available](cli-configure-cli-on-os-where-scs-unavailable).

### Installation notes

- As you are installing Zowe CLI, you might encounter error messages that relate to `cpu-features` and `ssh`. You can safely ignore error messages of this type. The installation will complete successfully. This behavior can occur when you installing CLI from npm and from a download. 
## Prerequisites

- Meet the [software requirements](../user-guide/systemrequirements-cli.md) for Zowe CLI.
- Meet the [software requirements](../user-guide/cli-swreqplugins.md) for each plug-in.

### Prerequisite notes

- If you are installing Zowe CLI on a computer that is running Node.js 16 on Windows operating system, see [Installing Zowe CLI with Node.js 16 on Windows](../user-guide/cli-install-cli-nodejs-windows.md).

- If you are running NPM version 7 (`npm@7`) or NPM version 8 (`npm@8`) on a Windows operating system, ensure that your computer is connected to the Internet. Issue the following command before you install Zowe CLI:

   ```
   npm install -g prebuild-install
   ```

- Linux users may need to prepend `sudo` to `npm` commands. For more information, see [Troubleshooting Zowe CLI](../troubleshoot/cli/troubleshoot-cli.md).


## Install Zowe CLI from npm

Use the following procedure to install Zowe CLI from an npm registry:

1. To install or update the core CLI, open a command-line window:

   ```
   npm install -g @zowe/cli@zowe-v2-lts
   ```

   Zowe CLI is installed.

2. (Optional) Check [npmjs.com](https://www.npmjs.com/) for any Zowe plug-ins that have an `@next` version available. If an `@next` version is available, you can install it:

    ```
    zowe plugins install @zowe/<plugin-name>@next
    ```

    If no `@next` version is available,  install the `@latest` version of the plug-in:

    ```
    zowe plugins install @zowe/<plugin-name>
    ```

    Optional plug-ins are installed.

3. Migrate your Zowe CLI profiles from your current installation to your @next installation. Issue the following command:

   ```
   zowe config convert-profiles
   ```

   **Note:** Profile data is backed up in case you want to revert the profiles to your previous Zowe CLI installation.

4. (Optional) If you no longer require the profiles for your previous Zowe CLI installation, you can delete them.

   **Important:** We do not recommend deleting the profiles for your previous Zowe CLI installation until you have tested your @next installation and are satisfied with its performance.

   Issue the following command:

   ```
   zowe config convert-profiles --delete
   ```

## Install Zowe CLI from a download

Use the following procedure to install Zowe CLI from a download package:

1. Navigate to [Zowe Downloads](https://www.zowe.org/download.html) and click the **Zowe vNext CLI Core** button.

2. Read the End User License Agreement for Zowe and click **I agree** to download the core package.

    `zowe-cli-package-next-2021MMDD.zip` is downloaded to your computer (where MMDD indicates the month and day of the build).

3. **(Optional)** Navigate to [Zowe Downloads](https://www.zowe.org/download.html) and click the **Zowe vNext CLI Plugins** button to download the plugins.

4. **(Optional)** Read the End User License Agreement for Zowe plugins and click **I agree** to download the plugins package.

    `zowe-cli-plugins-next-2021MMDD.zip` is downloaded to your computer (where MMDD indicates the month and day of the build).

5. Unzip the contents of `zowe-cli-package-next-2021MMDD.zip` (and optionally `zowe-cli-plugins-2021MMDD.zip`) to a working directory.

6. Open a command-line window and issue the following commands to the working directory:

   ```
   npm install -g zowe-cli.tgz
   ```

   **Note:** If an `EACCESS` error is returned, refer to [Resolving EACCESS permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) in the npm documentation.

   **(Optional)**

   ```
   zowe plugins install zowe plugins install cics-for-zowe-cli.tgz db2-for-zowe-cli.tgz zos-ftp-for-zowe-cli.tgz  ims-for-zowe-cli.tgz mq-for-zowe-cli.tgz
   ```

7. Migrate your Zowe CLI profiles from your current installation to your @next installation. Issue the following command:

   ```
   zowe config convert-profiles
   ```

   **Note:** Profile data is backed up in case you want to revert the profiles to your previous Zowe CLI installation.

8. (Optional) If you no longer require the profiles for your previous Zowe CLI installation, you can delete them.

   **Important:** We do not recommend deleting the profiles for your previous Zowe CLI installation until you have tested your @next installation and are satisfied with its performance.

   Issue the following command:

   ```
   zowe config convert-profiles --delete
   ```

Zowe CLI is installed on your computer. Issue the `zowe --help` command to view a list of available commands. For information about how to connect the CLI to the mainframe, create profiles and team profiles, integrate with API ML, enable daemon mode, and more, see [Using CLI](../user-guide/cli-using-usingcli.md).