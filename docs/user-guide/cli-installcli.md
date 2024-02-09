# Installing Zowe CLI

Follow these guidelines to install Zowe&trade; CLI on your computer.

:::info**Required role:** systems administrator
:::

If you want to get started using Zowe CLI quickly, see [Zowe CLI quick start](../getting-started/cli-getting-started.md). You can learn about new CLI features in the [release notes](../whats-new/release-notes/release-notes-overview.md).

:::note notes

- As you install Zowe CLI, you might encounter **error messages** that relate to `cpu-features` and `ssh`. You can safely ignore error messages of this type; the installation completes successfully. This behavior can occur when you install CLI from npm and from a local package.

- **Linux users** might need to prepend `sudo` to `npm` commands. For more information, see [Troubleshooting Zowe CLI](../troubleshoot/cli/troubleshoot-cli.md).

:::

## Installing Zowe CLI from a local package

To install Zowe CLI from a local package:

1. Meet the [Zowe CLI software requirements](../user-guide/systemrequirements-cli.md).

2. Navigate to [Download Zowe](https://www.zowe.org/download.html). In the **Client-side component installer** section, click the **Zowe \<X.Y.Z\> CLI Core** button.

3. Read the End User License Agreement for Zowe and click **I agree** to download the core package.

    `zowe-cli-package-next-2022MMDD.zip` is downloaded to your computer (where MMDD indicates the month and day of the build).

4. **(Optional)** Meet the [software requirements](../user-guide/swreqplugins.md) for installing Zowe CLI plug-ins.

5. **(Optional)** Navigate to [Download Zowe](https://www.zowe.org/download.html) and click the **Zowe \<X.Y.Z\> CLI Plugins** button to download the plug-ins.

6. **(Optional)** Read the End User License Agreement for Zowe plug-ins and click **I agree** to download the plug-ins package.

    `zowe-cli-plugins-next-2022MMDD.zip` is downloaded to your computer (where MMDD indicates the month and day of the build).

7. Unzip the contents of `zowe-cli-package-<X.Y.Z>.zip` (and `zowe-cli-plugins-<X.Y.Z>.zip`, if downloaded) to a working directory.

8. To install Zowe CLI Core, open a command-line window and issue the following commands to the working directory that you used in Step 7:

   ```
   npm install -g zowe-cli.tgz
   ```

   :::note
   
   If an `EACCESS` error displays, see [Resolving EACCESS permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) in npm Docs.

   :::

9. **(Optional)** To install all available Zowe CLI plug-ins, issue the following command to the working directory that you used in Step 7: 

   ```
   zowe plugins install cics-for-zowe-cli.tgz db2-for-zowe-cli.tgz zos-ftp-for-zowe-cli.tgz mq-for-zowe-cli.tgz
   ```

   Zowe CLI and the optional plug-ins are installed on your computer.
   
10. **(Optional)** Issue the `zowe --help` command to view a list of available commands.

## Installing Zowe CLI from npm

To install Zowe CLI from an npm registry:

1. To install or update the core CLI, open a command-line window:

   ```
   npm install -g @zowe/cli@zowe-v3-lts
   ```

   Zowe CLI is installed.

2. **(Optional)** Meet the [software requirements](../user-guide/swreqplugins.md) for installing Zowe CLI plug-ins.

3. **(Optional)** To install all available Zowe CLI plug-ins, issue the following command:
   
   ```
   zowe plugins install @zowe/cics-for-zowe-cli@zowe-v2-lts @zowe/db2-for-zowe-cli@zowe-v2-lts @zowe/mq-for-zowe-cli@zowe-v2-lts @zowe/zos-ftp-for-zowe-cli@zowe-v2-lts
   ```

   Zowe CLI and the optional plug-ins are installed on your computer.
   
4. **(Optional)** Issue the `zowe --help` command to view a list of available commands.

## Other installation options

There are some users who might prefer to install Zowe CLI on the mainframe, or on an operating system where secure credential storage is not required or cannot be installed from its package.

For those users, mainframe installation offers the ability to install Zowe CLI in one place yet still be accessible to multiple mainframe developers. This can help with training purposes, or for scripts that run on both a local computer and the mainframe. These users often request instructions on mainframe installation, and it is provided here.

Note, however, that Zowe CLI was not designed for mainframe installation and unexpected behavior can occur.

:::caution
   
Installing Zowe CLI on the mainframe is not supported by Zowe conformant support providers. By choosing this installation method, you will need to perform your own independent troubleshooting if any problems arise.  
   
:::

To install Zowe CLI on z/Linux, z/OS UNIX System Services (USS), or on an operating system where the secure credential storage is not required or cannot be installed, use the following installation guidelines.

### Installing Zowe CLI on z/Linux

Installation steps for Zowe CLI depend on whether your z/Linux environment requires the secure credential storage or not.

#### Installing with secure credential storage

   1. Follow the steps in [Configuring secure credential storage on headless Linux operating systems](./cli-configure-scs-on-headless-linux-os.md).
   2. Follow the steps in [Install Zowe CLI from npm](#install-zowe-cli-from-npm) or [Install Zowe CLI from a local package](#install-zowe-cli-from-a-local-package).

#### Installing without secure credential storage

   1. Follow the steps in [Install Zowe CLI from npm](#install-zowe-cli-from-npm) or [Install Zowe CLI from a local package](#install-zowe-cli-from-a-local-package).
   2. Follow the steps in [Configuring Zowe CLI where secure credential storage is not available](./cli-configure-cli-on-os-where-scs-unavailable.md).

### Installing Zowe on a USS system, or O/S without secure credential storage

Follow the steps in [Installing without secure credential storage](#installing-without-secure-credential-storage) for z/Linux.

## Next steps

After installing Zowe CLI, set environment variables, configure Zowe profiles, and, optionally, enable daemon mode.
