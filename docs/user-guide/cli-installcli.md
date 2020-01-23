# Installing Zowe CLI

Install Zowe&trade; CLI on your computer. You can learn about new CLI features in the [Release notes](../getting-started/summaryofchanges.md) or read about overall CLI functionality in the [Zowe overview](../getting-started/overview.md).

**Tip:** If you are familiar with command-line tools and want to get started using Zowe CLI quickly, see [Zowe CLI quick start](../getting-started/cli-getting-started.md)

## Methods to install Zowe CLI

Use one of the following methods to install Zowe CLI.

- [Installing Zowe CLI from a local package](#installing-zowe-cli-from-a-local-package)
- [Installing Zowe CLI from an online registry](#installing-zowe-cli-from-an-online-registry)

If you encounter problems when you attempt to install Zowe CLI, see [Troubleshooting Zowe CLI](../troubleshoot/cli/troubleshoot-cli.md).

### Installing Zowe CLI from a local package

If you do not have internet access at your site, use the following method to install Zowe CLI from a local package.

**Follow these steps:**

1. Ensure that the following prerequisite software is installed on your computer:

    -  [**Node.js V8.0 or later**](https://nodejs.org/en/download/)

        **Tip:** You might need to restart the command prompt after installing Node.js. Issue the command `node --version` to verify that Node.js is installed.

    - **Node Package Manager V5.0 or later**

        npm is included with the Node.js installation. Issue the command `npm --version` to verify that npm is installed.

2. Obtain the installation files. From the Zowe [Download](https://zowe.org/#download) website, click **Zowe Command Line Interface** to download the Zowe CLI installation package named `zowe-cli-package-*v*.*r*.*m*.zip` to your computer.

    **Note:**
    -  *v* indicates the version
    -  *r* indicates the release number
    -  *m* indicates the modification number

3. Open a command line window such as Windows Command Prompt. Browse to the directory where you downloaded the Zowe CLI installation package (.zip file). Issue the following command to unzip the files:

    ```
    unzip zowe-cli-package-v.r.m.zip
    ```
    **Example:**
    ```
    unzip zowe-cli-package-1.0.1.zip
    ```

    By default, the unzip command extracts the contents of the zip file to the directory where you downloaded the .zip file. You can extract the contents of the zip file to your preferred location.

    **Optional:** Double-click the Zowe CLI installation package to extract its contents into the directory where you downloaded the package. (Windows and Mac computers contain built-in software that lets you extract .zip files into a preferred location.)

4. Issue the following command against the extracted directory to install Zowe CLI on your computer:

    ```
    npm install -g zowe-cli.tgz
    ```

    **Note:** On Linux, you might need to prepend `sudo` to your `npm` commands so that you can issue the install and uninstall commands. For more information, see [Troubleshooting Zowe CLI](../troubleshoot/cli/troubleshoot-cli.md).

    Zowe CLI is installed on your computer. See [Installing Plug-ins](cli-installplugins.md) for information about the commands for installing plug-ins from the package.

5. (Optional) Create a `zosmf` profile so that you can issue commands that communicate with z/OSMF. For information about how to create a profile, see [Creating Zowe CLI profiles](cli-configuringcli.md#creating-zowe-cli-profiles).

   **Tip:** Profiles are a Zowe CLI feature that let you store configuration information for use on multiple commands. You can create a profile that contains your username, password, and connection details for a particular mainframe system, then reuse that profile to avoid typing it again on every command.

After you install and configure Zowe CLI, you can issue the `zowe --help` command to view a list of available commands. For information about how to connect the CLI to the mainframe (using command-line options, user profiles, or environment variables), see [Defining CLI connection details](cli-configuringcli.md#defining-zowe-cli-connection-details). You can also [test your connection to z/OSMF](cli-configuringcli.md#testing-zowe-cli-connection-to-z-osmf) with or without a profile.

### Installing Zowe CLI from an online registry

If your computer is connected to the Internet, you can use the following method to install Zowe CLI from an npm registry.

**Follow these steps:**

1.  Ensure that the following required software is installed on your computer:

    - [**Node.js V8.0 or later**](https://nodejs.org/en/download/)

        **Tip:** You might need to restart the command prompt after installing Node.js. Issue the command `node --version` to verify that Node.js is installed.

    - **Node Package Manager V5.0 or later**

        npm is included with the Node.js installation. Issue the command `npm --version` to verify that npm is installed.

2.  Issue the following command to set the registry to the Zowe CLI scoped package. In addition to setting the scoped registry, your default registry must be set to an npm registry that includes all of the dependencies for Zowe CLI, such as the global npm registry:

<!-- in zowe-v1-lts the registry will become Public NPM and the scope becomes @zowe for core and plugins -->

    ```
    npm config set @brightside:registry https://api.bintray.com/npm/ca/brightside
    ```

3.  Issue the following command to install Zowe CLI from the registry:

    ```
    npm install -g @brightside/core@lts-incremental
    ```

4. (Optional) To install all available plug-ins to Zowe CLI, issue the following command:

<!-- Note that SCS plug-in will be added to @zowe v1lts and not lts-incremental. -->

    ```
    zowe plugins install @brightside/cics@lts-incremental @brightside/db2@lts-incremental @zowe/secure-credential-store-for-zowe-cli@zowe-v1-lts
    ```

    **Note:** The IBM Db2 plug-in requires additional configuration. For more information about how to install multiple plug-ins, update to a specific version of a plug-in, and install from specific registries, see [Installing plug-ins](cli-installplugins.md).

After you install and configure Zowe CLI, you can issue the `zowe --help` command to view a list of available commands. For information about how to connect the CLI to the mainframe (using command-line options, user profiles, or environment variables), see [Defining CLI connection details](cli-configuringcli.md#defining-zowe-cli-connection-details). You can also [test your connection to z/OSMF](cli-configuringcli.md#testing-zowe-cli-connection-to-z-osmf) with or without a profile.



