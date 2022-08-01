# Install the Zowe CLI @next version

<Badge text="Technical Preview"/> The Zowe CLI @next release is a technical preview. Technical previews are for testing only and are not ready for production. Your feedback is valued and appreciated.

You can install the Zowe CLI `@next` version from the online npm registry or download it from the Zowe Downloads site.

## Installation guidelines
  
To install the CLI @next version on **Windows**, **Mac**, and **Linux** operating systems, follow the steps in [Install Zowe CLI from npm](#install-zowe-cli-from-npm) or [Install Zowe CLI from a download](#install-zowe-cli-from-a-download).

However, to install Zowe CLI @next on **z/Linux**, **z/OS UNIX System Services (USS)**, or on an operating system where the *Secure Credential Store* is *not required* or *cannot be installed*, use the following installation guidelines:

*  To install Zowe CLI @next on a z/Linux operating system and you **require** the Secure Credential Store:
   1. Follow the steps in [Configure Secure Credential Store on z/Linux operating systems](cli-configure-scs-on-zlinux-os).
   2. Follow the steps in [Install Zowe CLI from npm](#install-zowe-cli-from-npm) or [Install Zowe CLI from a download](#install-zowe-cli-from-a-download).
*  To install Zowe CLI @next on a z/Linux operating system and you **do not require** the Secure Credential Store:
   1. Follow the steps in [Install Zowe CLI from npm](#install-zowe-cli-from-npm) or [Install Zowe CLI from a download](#install-zowe-cli-from-a-download).
   2. Follow the steps in [Configure Zowe CLI on operating systems where the Secure Credential Store is not available](cli-configure-cli-on-os-where-scs-unavailable).
*  To install Zowe CLI @next on a USS system or on an operating system where you cannot install the Secure Credential Store:
   1. Follow the steps in [Install Zowe CLI from npm](#install-zowe-cli-from-npm) or [Install Zowe CLI from a download](#install-zowe-cli-from-a-download).
   2. Follow the steps in [Configure Zowe CLI on operating systems where the Secure Credential Store is not available](cli-configure-cli-on-os-where-scs-unavailable).

## Prerequisites

* Meet the [software requirements](https://docs.zowe.org/stable/user-guide/systemrequirements.html#zowe-cli-requirements) for Zowe CLI.
* Meet the [software requirements](https://docs.zowe.org/stable/user-guide/cli-swreqplugins.html#software-requirements-for-zowe-cli-plug-ins) for each plug-in.

**Prerequisite notes:**

* If you are installing Zowe CLI @next on a computer that is running Node.js 16 on Windows operating system, see [Installing Zowe CLI with Node.js 16 on Windows](cli-install-cli-nodejs-windows).

* If you are running NPM version 7 (`npm@7`) or NPM version 8 (`npm@8`) on a Windows operating system, ensure that your computer is connected to the Internet. Issue the following command before you install Zowe CLI @next:

   ```
   npm install -g prebuild-install
   ```

* Linux users may need to prepend `sudo` to `npm` commands. For more information, see [Troubleshooting Zowe CLI](../troubleshoot/cli/troubleshoot-cli.md).

## Install Zowe CLI from npm

Use the following procedure to install Zowe CLI from an npm registry:

1. To install or update the core CLI, open a command-line window:

   ```
   npm install -g @zowe/cli@next
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

You can now try out the [technical preview features](cli-development-roadmap-next.md).

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

You can now try out the [technical preview features](cli-development-roadmap-next.md).
