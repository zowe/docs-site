# Installing Zowe CLI

## Active Development version

These instructions apply to the Active Development (@latest) branch of the CLI, which accepts breaking changes. If you want a version with stable features and bug fixes, refer to the [Stable Zowe CLI installation instructions](https://docs.zowe.org/stable/user-guide/cli-installcli.html).

Learn more about new CLI features in the [Release notes](../getting-started/summaryofchanges.md). If you are familiar with command-line tools and want to get started using Zowe CLI quickly, see [Zowe CLI quick start](../getting-started/cli-getting-started.md)

<!--
TODO Add this to master version of this article:
These instructions apply to the Stable (@lts-incremental) branch of the CLI, which has stable features and bug fixes. If you want a version with the latest features as they are developed, refer to the [Active Development Zowe CLI installation instructions]().  -->

## Methods to install Zowe CLI <!-- omit in toc -->

Use one of the following methods to install Zowe CLI.

- [Local Package](#installing-zowe-cli-from-a-local-package)
- [Online Registry](#installing-zowe-cli-from-an-online-registry)

If you encounter problems when you attempt to install Zowe CLI, see [Troubleshooting Zowe CLI](../troubleshoot/cli/troubleshoot-cli.md).

### Installing Zowe CLI from a local package

If you have restricted internet access at your site, use the following method to install Zowe CLI (forward development version) from a local package.

**Follow these steps:**

1. Ensure that the following required software is installed on your computer:

    -  [**Node.js V8.0 or later**](https://nodejs.org/en/download/)

        **Tip:** You might need to restart the command prompt after installing Node.js. Issue the command `node --version` to verify that Node.js is installed.

    - **Node Package Manager V5.0 or later**

        npm is included with the Node.js installation. Issue the command `npm --version` to verify that npm is installed.

2. Obtain the installation files. From the Zowe [Download](https://zowe.org/#download) website, click **Zowe CLI (Active Development)** under **Downloads > Pre-Release Builds** to download the Zowe CLI installation package named `zowe-cli-package-*v*.*r*.*m*.zip`.

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

   npm install -g zowe-cli.tgz

     **Note:** On Linux, you might need to prepend `sudo` to your `npm` commands. For more information, see [Troubleshooting Zowe CLI](../troubleshoot/cli/troubleshoot-cli.md).

5. Issue the following commands to install each available plug-in:

    ```
    zowe plugins install zowe-cics.tgz
    ```

    ```
    zowe plugins install zowe-db2.tgz
    ```

    ```
    zowe plugins install zowe-ims.tgz
    ```

    ```
    zowe plugins install zowe-mq.tgz
    ```

    ```
    zowe plugins install secure-credential-store-for-zowe-cli.tgz
    ```

    **Note:** The IBM Db2 plug-in requires [additional configuration](cli-db2plugin.md#installing). For more information about available plug-ins, how to install multiple plug-ins, or update to a specific version of a plug-in see [Extending Zowe CLI](cli-extending.md).

Zowe CLI is installed on your computer. You can issue the `zowe --help` command to view a list of available commands. For information about how to connect the CLI to the mainframe (using command-line options, user profiles, or environment variables), see [Defining CLI connection details](cli-configuringcli.md#defining-zowe-cli-connection-details). You can also [test your connection to z/OSMF](cli-configuringcli.md#testing-zowe-cli-connection-to-z-osmf) with or without a profile.

### Installing Zowe CLI from an online registry

If your computer is connected to the Internet, you can use the following method to install Zowe CLI from an npm registry.

**Follow these steps:**

1. Ensure that the following required software is installed on your computer:

    - [**Node.js V8.0 or later**](https://nodejs.org/en/download/)

        **Tip:** You might need to restart the command prompt after installing Node.js. Issue the command `node --version` to verify that Node.js is installed.

    - **Node Package Manager V5.0 or later**

        npm is included with the Node.js installation. Issue the command `npm --version` to verify that npm is installed.

2. Issue the following command to set the registry to the Zowe CLI scoped package. In addition to setting the scoped registry, your default registry must be set to an npm registry that includes all of the dependencies for Zowe CLI, such as the global npm registry:

    ```
    npm config set @zowe:registry
    ```

3. Issue the following command to install Zowe CLI from the registry:

    ```
    npm install -g @zowe/cli
    ```

4. (Optional) To install all available plug-ins to Zowe CLI, issue the following command:

    ```
    zowe plugins install @zowe/cics @zowe/db2 @zowe/ims @zowe/mq @zowe/secure-credential-store-for-zowe-cli

    ```

    **Note:** The IBM Db2 plug-in requires [additional configuration](cli-db2plugin.md#installing). For more information about available plug-ins, how to install multiple plug-ins, or update to a specific version of a plug-in see [Extending Zowe CLI](cli-extending.md).

Zowe CLI is installed on your computer. You can issue the `zowe --help` command to view a list of available commands.

**More information:**
- [Defining CLI connection details](cli-configuringcli.md#defining-zowe-cli-connection-details).
- [Test your connection to z/OSMF](cli-configuringcli.md#testing-zowe-cli-connection-to-z-osmf) with or without a profiles.




