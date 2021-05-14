# Installing Zowe CLI

Install Zowe&trade; CLI on your computer.

**Tip:** If you are familiar with command-line tools and want to get started using Zowe CLI quickly, see [Zowe CLI quick start](../getting-started/cli-getting-started.md). You can learn about new CLI features in the [Release notes](../getting-started/summaryofchanges.md).

## Methods to install Zowe CLI

Use one of the following methods to install Zowe CLI.

- [Installing Zowe CLI from a local package](#installing-zowe-cli-from-a-local-package)
- [Installing Zowe CLI from an online registry](#installing-zowe-cli-from-an-online-registry)

**Note:** If you do not have access to the public npm registry at your site, you might want to install the CLI via a proxy server. See [Installing Zowe CLI Via Proxy](install-cli-via-proxy.md) for more information.

If you encounter problems when you attempt to install Zowe CLI, see [Troubleshooting Zowe CLI](../troubleshoot/cli/troubleshoot-cli.md).

### Installing Zowe CLI from a local package

If you do not have internet access at your site, use the following method to install Zowe CLI from a local package.

**Follow these steps:**

1. Address the following software requirements for the core CLI:

- **Node.js:** Install a currently supported Node.js LTS version. For an up-to-date list of supported LTS versions, see [Nodejs.org](https://nodejs.org/en/about/releases/).

    ::: tip
    You might need to restart the command prompt after installing Node.js. Issue the command `node --version` to verify that Node.js is installed.
    :::

- **npm:** Install a version of Node Package Manager (npm) that is compatible with your version of Node.js.

    ::: tip
    Npm is included with most Node.js installations. Issue the command `npm --version` to check your current version. You can reference the [Node.js release matrix](https://nodejs.org/en/download/releases/) to verify that the versions are compatible.
    :::

2. **(Linux only)** Address the following software requirements for Secure Credential Storage:

   - **(Graphical Linux)** Install `gnome-keyring` and `libsecret` on your computer.

   - **(Headless Linux)** Follow the procedure documented in the [SCS plug-in Readme](https://github.com/zowe/zowe-cli-scs-plugin/blob/master/README.md#software-requirements).

3. Navigate to [Zowe.org Downloads](https://www.zowe.org/download.html) and click the **CLI Core** button to download the core package. The "core" includes Zowe CLI and Secure Credential Store, which enhances security by encrypting your username and password.

    A file named `zowe-cli-package-v.r.m.zip` is downloaded to your computer

4. **(Optional)** Click the **CLI Plugins** button to download the optional plugins.

   A file named `zowe-cli-plugins-v.r.m.zip` is downloaded to your computer.

5. Unzip the contents of `zowe-cli-package-v.r.m.zip` (and optionally `zowe-cli-plugins-v.r.m.zip`) to a preferred location on your computer.

6. Open a command-line window. Issue the following commands in sequence against the extracted directory to install core Zowe CLI on your computer:

    ```
    npm install -g zowe-cli.tgz
    ```

    ```
    zowe plugins install secure-credential-store-for-zowe-cli.tgz
    ```

    **Notes:**
    - If the command returns an `EACCESS` error, refer to [Resolving EACCESS permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) in the npm documentation.
    - On Linux, you might need to prepend `sudo` to your `npm` commands. For more information, see [Troubleshooting Zowe CLI](../troubleshoot/cli/troubleshoot-cli.md).

7. **(Optional)** Address the [Software requirements for CLI plug-ins](cli-swreqplugins.md). You can install most plug-ins without meeting the requirements, but they will not function until you configure the back-end APIs. The IBM Db2 plug-in requires [additional configuration to install](cli-db2plugin.md#installing).

8. **(Optional)** Issue the following command to install each available plug-in:

    ```
    zowe plugins install cics-for-zowe-cli.tgz db2-for-zowe-cli.tgz zos-ftp-for-zowe-cli.tgz  ims-for-zowe-cli.tgz mq-for-zowe-cli.tgz
    ```

    **Important:** Ensure that you meet the [Software requirements for CLI plug-ins](cli-swreqplugins.md). You can install most plug-ins without meeting the requirements, but they will not function until you configure the back-end APIs. The IBM Db2 plug-in requires [additional configuration to install](cli-db2plugin.md#installing).

Zowe CLI is installed on your computer. Issue the `zowe --help` command to view a list of available commands. For information about how to connect the CLI to the mainframe, create profiles, integrate with API ML, and more, see [Using CLI](cli-usingcli.md).

### Installing Zowe CLI from an online registry

If your computer is connected to the Internet, you can use the following method to install Zowe CLI from an npm registry.

**Follow these steps:**

1. Address the following software requirements for the core CLI:

- **Node.js:** Install a currently supported Node.js LTS version. For an up-to-date list of supported LTS versions, see [Nodejs.org](https://nodejs.org/en/about/releases/).

    ::: tip
    You might need to restart the command prompt after installing Node.js. Issue the command `node --version` to verify that Node.js is installed.
    :::

- **npm:** Install a version of Node Package Manager (npm) that is compatible with your version of Node.js.

    ::: tip
    Npm is included with most Node.js installations. Issue the command `npm --version` to check your current version. You can reference the [Node.js release matrix](https://nodejs.org/en/download/releases/) to verify that the versions are compatible.
    :::

2. **(Linux only)** Address the following software requirements for Secure Credential Storage:

   - **(Graphical Linux)** Install `gnome-keyring` and `libsecret` on your computer.

   - **(Headless Linux)** Follow the procedure documented in the [SCS plug-in Readme](https://github.com/zowe/zowe-cli-scs-plugin/blob/master/README.md#software-requirements).

3. Issue the following commands in sequence to install the core from the public npm registry. The "core" includes Zowe CLI and Secure Credential Store, which enhances security by encrypting your username and password.

    ```
    npm install -g @zowe/cli@zowe-v1-lts
    ```

    ```
    zowe plugins install @zowe/secure-credential-store-for-zowe-cli@zowe-v1-lts
    ```

    **Notes:**
    - If the command returns an `EACCESS` error, refer to [Resolving EACCESS permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) in the npm documentation.
    - On Linux, you might need to prepend `sudo` to your `npm` commands. For more information, see [Troubleshooting Zowe CLI](../troubleshoot/cli/troubleshoot-cli.md).

4. **(Optional)** Address the [Software requirements for CLI plug-ins](cli-swreqplugins.md). You can install most plug-ins without meeting the requirements, but they will not function until you configure the back-end APIs. The IBM Db2 plug-in requires [additional configuration to install](cli-db2plugin.md#installing).

5. **(Optional)** To install all available plug-ins to Zowe CLI, issue the following command:

    ```
    zowe plugins install @zowe/cics-for-zowe-cli@zowe-v1-lts @zowe/db2-for-zowe-cli@zowe-v1-lts @zowe/ims-for-zowe-cli@zowe-v1-lts @zowe/mq-for-zowe-cli@zowe-v1-lts @zowe/zos-ftp-for-zowe-cli@zowe-v1-lts
    ```

Zowe CLI is installed on your computer. Issue the `zowe --help` command to view a list of available commands. For information about how to connect the CLI to the mainframe, create profiles, integrate with API ML, and more, see [Using CLI](cli-usingcli.md).



