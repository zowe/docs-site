# Installing Zowe CLI

Install Zowe&trade; CLI on your computer.

**Tip:** If you are familiar with command-line tools and want to get started using Zowe CLI quickly, see [Zowe CLI quick start](../getting-started/cli-getting-started.md). You can learn about new CLI features in the [Release notes](../getting-started/summaryofchanges.md).

## Methods to install Zowe CLI

Use one of the following methods to install Zowe CLI.

- [Installing Zowe CLI from a local package](#installing-zowe-cli-from-a-local-package)
- [Installing Zowe CLI from an online registry](#installing-zowe-cli-from-an-online-registry)

If you encounter problems when you attempt to install Zowe CLI, see [Troubleshooting Zowe CLI](../troubleshoot/cli/troubleshoot-cli.md).

### Installing Zowe CLI from a local package

If you do not have internet access at your site, use the following method to install Zowe CLI from a local package.

**Follow these steps:**

1. Address the following software requirements:

    - Install [Node.js V8.0 or higher LTS versions](https://nodejs.org/en/download/)

        **Tip:** You might need to restart the command prompt after installing Node.js. Issue the command `node --version` to verify that Node.js is installed.

    - Verify that you have **Node Package Manager (npm)** that is compatible with your version of Node.js. For a list of compatible versions, see [Node.js Previous Releases](https://nodejs.org/en/download/releases/).

        **Tip:** npm is included with the Node.js installation. Issue the command `npm --version` to verify the version of npm that is installed.

    - **(Optional)** If you plan to install plug-ins, review the [Software requirements for CLI plug-ins](swreqplugin.md).

2. To obtain the installation files, navigate to [Zowe.org Downloads](https://zowe.org/#download) and click the **Zowe CLI** button.

   A file named `zowe-cli-package-v.r.m.zip` is downloaded to your computer.

    *where:*

    -  *v* indicates the version
    -  *r* indicates the release number
    -  *m* indicates the modification number

3. Unzip the contents of the `zowe-cli-package-v.r.m.zip` file to your preferred location on your computer.

4. Open a command-line window. Issue the following command against the extracted directory to install Zowe CLI on your computer:

    ```
    npm install -g zowe-cli.tgz
    ```

    **Note:** On Linux, you might need to prepend `sudo` to your `npm` commands so that you can issue the install and uninstall commands. For more information, see [Troubleshooting Zowe CLI](../troubleshoot/cli/troubleshoot-cli.md).

5. **(Optional)** Issue the following commands to install each available plug-in:

    ```
    zowe plugins install cics-for-zowe-cli.tgz
    ```

    ```
    zowe plugins install db2-for-zowe-cli.tgz
    ```

    ```
    zowe plugins install zos-ftp-for-zowe-cli.tgz
    ```

    ```
    zowe plugins install ims-for-zowe-cli.tgz
    ```

    ```
    zowe plugins install mq-for-zowe-cli.tgz
    ```

    ```
    zowe plugins install secure-credential-store-for-zowe-cli.tgz
    ```

    **Note:** The IBM Db2 plug-in requires [additional configuration](cli-db2plugin.md#installing).

Zowe CLI is installed on your computer. Issue the `zowe --help` command to view a list of available commands. For information about how to connect the CLI to the mainframe (using command-line options, user profiles, or environment variables), see [Defining CLI connection details](cli-configuringcli.md#defining-zowe-cli-connection-details). You can also [test your connection to z/OSMF](cli-configuringcli.md#testing-zowe-cli-connection-to-z-osmf) with or without a profile.

### Installing Zowe CLI from an online registry

If your computer is connected to the Internet, you can use the following method to install Zowe CLI from an npm registry.

**Follow these steps:**

1. Address the following software requirements:

    - Install [Node.js V8.0 or higher LTS versions](https://nodejs.org/en/download/)

        **Tip:** You might need to restart the command prompt after installing Node.js. Issue the command `node --version` to verify that Node.js is installed.

    - Install a version of **Node Package Manager (npm)** that is compatible with your version of Node.js. For a list of compatible versions, see [Node.js Previous Releases](https://nodejs.org/en/download/releases/).

        **Tip:** npm is included with the Node.js installation. Issue the command `npm --version` to verify the version of npm that is installed.

    - **(Optional)** If you plan to install plug-ins, review the [Software requirements for CLI plug-ins](swreqplugin.md).

2. To obtain the installation files, navigate to [Zowe.org Downloads](https://zowe.org/#download) and click the **Zowe CLI** button.

3.  Issue the following command to install Zowe CLI from the public npm registry:

    ```
    npm install -g @zowe/cli@zowe-v1-lts
    ```

4. (Optional) To install all available plug-ins to Zowe CLI, issue the following command:

    ```
    zowe plugins install @zowe/cics-for-zowe-cli@zowe-v1-lts @zowe/db2-for-zowe-cli@zowe-v1-lts @zowe/ims-for-zowe-cli@zowe-v1-lts @zowe/mq-for-zowe-cli@zowe-v1-lts @zowe/zos-ftp-for-zowe-cli@zowe-v1-lts @zowe/secure-credential-store-for-zowe-cli@zowe-v1-lts
    ```

    **Note:** The IBM Db2 plug-in requires additional configuration.

After you install and configure Zowe CLI, issue the `zowe --help` command to view a list of available commands. For information about how to connect the CLI to the mainframe (using command-line options, user profiles, or environment variables), see [Defining CLI connection details](cli-configuringcli.md#defining-zowe-cli-connection-details). You can also [test your connection to z/OSMF](cli-configuringcli.md#testing-zowe-cli-connection-to-z-osmf) with or without a profile.



