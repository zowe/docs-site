# Installing Zowe CLI and Zowe CLI plug-ins

Follow these guidelines to install Zowe&trade; CLI on your computer.

:::info Required role: systems administrator
:::

If you want to get started using Zowe CLI quickly, see [Zowe CLI quick start](../getting-started/cli-getting-started.md). You can learn about new CLI features in the [release notes](../whats-new/release-notes/release-notes-overview.md).

:::note notes

- As you install Zowe CLI, you might encounter **error messages** that relate to `cpu-features` and `ssh`. You can safely ignore error messages of this type; the installation completes successfully. This behavior can occur when you install CLI from npm and also from a local package.

- **Linux users** might need to prepend `sudo` to `npm` commands. For more information, see [Known Zowe CLI issues](../troubleshoot/cli/known-cli.md#sudo-syntax-required-to-complete-some-installations).

:::

## Installing Zowe CLI and Zowe CLI plug-ins from a local package

To install Zowe CLI from a local package:

1. Meet the [Zowe CLI software requirements](../user-guide/systemrequirements-cli.md).

2. Navigate to [Download Zowe](https://www.zowe.org/download.html). In the **Client-side component installer** section, click the **Zowe \<X.Y.Z\> CLI Core** button (where \<X.Y.Z\> specifies the release number).

3. Read the End User License Agreement for Zowe and click **I agree** to download the core package.

    `zowe-cli-package-next-YYYYMMDD.zip` is downloaded to your computer (where YYYYMMDD indicates the year, month, and day of the build).

4. If installing Zowe CLI plug-ins, meet the [software requirements](../user-guide/cli-swreqplugins.md) to install Zowe CLI plug-ins.

5. If installing Zowe CLI plug-ins, navigate to [Download Zowe](https://www.zowe.org/download.html) and click the **Zowe \<X.Y.Z\> CLI Plugins** button (where \<X.Y.Z\> specifies the release number).

6. If installing Zowe CLI plug-ins, read the End User License Agreement for Zowe and click **I agree** to download the plug-ins package.

    `zowe-cli-plugins-next-YYYYMMDD.zip` is downloaded to your computer.

7. Unzip the contents of `zowe-cli-package-<X.Y.Z>.zip` (and `zowe-cli-plugins-<X.Y.Z>.zip`, if downloaded) to a working directory.

8. To install Zowe CLI core, open a command-line window and issue the following commands to the working directory that was used the previous step:

   ```
   npm install -g zowe-cli.tgz
   ```

   :::note
   
   If an `EACCESS` error displays, see [Resolving EACCESS permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) in npm Docs.

   :::

9. To install all available Zowe CLI plug-ins, issue the following command to the working directory that was used in Step 7:

   ```
   zowe plugins install cics-for-zowe-cli.tgz db2-for-zowe-cli.tgz zos-ftp-for-zowe-cli.tgz mq-for-zowe-cli.tgz
   ```

   Zowe CLI and the optional plug-ins are installed on your computer.

## Installing Zowe CLI and Zowe CLI plug-ins from an npm online registry

To install Zowe CLI from an npm registry:

1. To install Zowe CLI core, open a command-line window and issue the following command:

   ```
   npm install -g @zowe/cli@zowe-v3-lts
   ```

   Zowe CLI is installed.

2. If installing Zowe CLI plug-ins, meet the [software requirements](../user-guide/cli-swreqplugins.md) to install Zowe CLI plug-ins.

3. If installing all available Zowe CLI plug-ins, issue the following command:
   
   ```
   zowe plugins install @zowe/cics-for-zowe-cli@zowe-v3-lts @zowe/db2-for-zowe-cli@zowe-v3-lts @zowe/mq-for-zowe-cli@zowe-v3-lts @zowe/zos-ftp-for-zowe-cli@zowe-v3-lts
   ```

   Zowe CLI and the optional plug-ins are installed on your computer.

## Other installation options

There are some users who might prefer to install Zowe CLI on the mainframe, or on an operating system where secure credential storage is not required or cannot be installed from its package.

For those users, mainframe installation offers the ability to install Zowe CLI in one place yet still be accessible to multiple mainframe developers. This can help with training purposes, or for scripts that run on both a local computer and the mainframe. These users often request instructions on mainframe installation, and they are provided here.

Note, however, that Zowe CLI was not designed for mainframe installation and unexpected behavior can occur.

:::caution
   
Installing Zowe CLI on the mainframe is not supported by Zowe conformant support providers. By choosing this installation method, you need to perform your own independent troubleshooting if any problems arise.  
   
:::

### Installing Zowe CLI on z/Linux

Installation steps for Zowe CLI depend on whether your z/Linux environment requires the secure credential storage.

#### Installing with secure credential storage

   1. Follow the steps in [Configuring secure credential storage on headless Linux operating systems](./cli-configure-scs-on-headless-linux-os.md).
   2. Follow the steps in [Installing Zowe CLI and Zowe CLI plug-ins from an npm online registry](#installing-zowe-cli-and-zowe-cli-plug-ins-from-an-npm-online-registry) or [Installing Zowe CLI and Zowe CLI plug-ins from a local package](#installing-zowe-cli-and-zowe-cli-plug-ins-from-a-local-package).

#### Installing without secure credential storage

   1. Follow the steps in [Installing Zowe CLI and Zowe CLI plug-ins from an npm online registry](#installing-zowe-cli-and-zowe-cli-plug-ins-from-an-npm-online-registry) or [Installing Zowe CLI and Zowe CLI plug-ins from a local package](#installing-zowe-cli-and-zowe-cli-plug-ins-from-a-local-package).
   2. Follow the steps in [Configuring Zowe CLI where secure credential storage is not available](./cli-configure-cli-on-os-where-scs-unavailable.md).

### Installing Zowe CLI on a USS system, or an OS without secure credential storage

Follow the steps in [Configuring Zowe CLI where secure credential storage is not available](../user-guide/cli-configure-cli-on-os-where-scs-unavailable.md).

## Next steps

After installing Zowe CLI, set environment variables, configure Zowe profiles, and, optionally, enable daemon mode.
