# Installing Zowe CLI

As a systems programmer or application developer, you install Zowe CLI on your computer and create Zowe CLI profiles.

## Methods to install Zowe CLI

Use one of the following methods to install Zowe CLI.

- [Install Zowe CLI from local package](#installing-zowe-cli-from-local-package)
- [Install Zowe CLI from online registry](#installing-zowe-cli-from-online-registry)

If you encounter problems when you attempt to install Zowe CLI, see [Troubleshooting installing Zowe CLI](../troubleshoot/troubleshootinstall.html#troubleshooting-installing-zowe-cli).

### Installing Zowe CLI from local package

If you do not have internet access at your site, use the following method to install Zowe CLI from a local package.

**Follow these steps:**

1. Ensure that the following prerequisite software is installed on your computer:

    -  [**Node.js V8.0 or later**](https://nodejs.org/en/download/)

        **Tip:** You might need to restart the command prompt after installing Node.js. Issue the command `node --version` to verify that Node.js is installed.

    - **Node Package Manager V5.0 or later**

        npm is included with the Node.js installation. Issue the command `npm --version` to verify that npm is installed.

2. Obtain the installation files. From the Zowe [Download](https://zowe.org/download/) website, click **Download Zowe Command Line Interface** to download the Zowe CLI installation bundle (`zowe-cli-bundle.zip`) to your computer.

3. Open a command line window. For example, Windows Command Prompt. Browse to the directory where you downloaded the Zowe CLI installation bundle (.zip file). Issue the following command to unzip the files:

    ```
    unzip zowe-cli-bundle.zip
    ```

    By default, the unzip command extracts the contents of the zip file to the directory where you downloaded the .zip file. You can extract the contents of the zip file to your preferred location.

4. Issue the following command to install Zowe CLI on your computer:

    **Note:** You might need to issue a change directory command and navigate to the location where you extracted the contents of the zip file before you issue the `npm install` command.

    ```
    npm install -g zowe-cli.tgz 
    ```

    **Note:** On Linux, you might need to prepend `sudo` to your `npm` commands so that you can issue the install and uninstall commands. For more information, see [Troubleshooting installing Zowe CLI](../troubleshoot/troubleshootinstall.html#troubleshooting-installing-zowe-cli).

    Zowe CLI is installed on your computer. See [Installing Plug-ins](cli-installplugins.md) for information about the commands for installing plug-ins from the package.

5. (Optional) Create a `zosmf` profile so that you can issue commands that communicate with z/OSMF. For information about how to create a profile, see [Creating Zowe CLI profiles](cli-usingcli.md#creating-zowe-cli-profiles).

   **Tip:** Profiles are a Zowe CLI feature that let you store configuration information for use on multiple commands. You can create a profile that contains your username, password, and connection details for a particular mainframe system, then reuse that profile to avoid typing it again on every command.

After you install and configure Zowe CLI, you can issue the `zowe --help` command to view a list of available commands. For more information, see [Display Help](cli-usingcli.html#displaying-zowe-cli-help).

### Installing Zowe CLI from online registry

If your computer is connected to the Internet, you can use the following method to install Zowe CLI from an npm registry.

**Follow these steps:**

1.  Ensure that the following prerequisite software is installed on your computer:

    - [**Node.js V8.0 or later**](https://nodejs.org/en/download/)

        **Tip:** You might need to restart the command prompt after installing Node.js. Issue the command `node --version` to verify that Node.js is installed.

    - **Node Package Manager V5.0 or later**

        npm is included with the Node.js installation. Issue the command `npm --version` to verify that npm is installed.

2.  Issue the following command to set the registry to the Zowe CLI scoped package on Bintray. In addition to setting the scoped registry, your non-scoped registry must be set to an npm registry that includes all of the dependencies for Zowe CLI, such as the global npm registry:

    ```
    npm config set @brightside:registry https://api.bintray.com/npm/ca/brightside
    ```

3.  Issue the following command to install Zowe CLI from the registry:

    ```
    npm install -g @brightside/core@latest
    ```

4. (Optional) To install all available plug-ins to Zowe CLI, issue the following command:

    ```
    zowe plugins install @brightside/cics@latest
    ```

    **Note:** For more information about how to install multiple plug-ins, update to a specific version of a plug-in, and install from specific registries, see [Installing plug-ins](cli-installplugins.md).

5.  (Optional) Create a `zosmf` profile so that you can issue commands that communicate with z/OSMF. For information about how to create a profile, see [Creating Zowe CLI profiles](cli-usingcli.md#creating-zowe-cli-profiles).

   **Tip:** Profiles are a Zowe CLI feature that let you store configuration information for use on multiple commands. You can create a profile that contains your username, password, and connection details for a particular mainframe system, then reuse that profile to avoid typing it again on every command.

After you install and configure Zowe CLI, you can issue the `zowe --help` command to view a list of available commands. For more information, see [How to display Zowe CLI help](cli-usingcli.html#displaying-zowe-cli-help).

## Testing Zowe CLI connection to z/OSMF
You can issue a command at any time to receive diagnostic information from the server and confirm that Zowe CLI can communicate with z/OSMF or other mainframe APIs. 

**Tip:** We recommend that you append `--help` to the end of commands in the product to see the complete set of commands and options available to you. For example, issue `zowe profiles --help` to learn more about how to list profiles, switch your default profile, or create different profile types.

**Without a Profile**

Verify that your CLI can communicate with z/OSMF by issuing the following command:

```
bright zosmf check status --host <host> --port <port> --user <username> --pass <password> 
```

**Default profile**

Verify that you can use your default profile to communicate with z/OSMF by issuing the following command:

```
zowe zosmf check status
```

**Specific profile**

Verify that you can use a specific profile to communicate with z/OSMF by issuing the following command: 

```
zowe zosmf check status --zosmf-profile <profile_name>
```

The commands return a success or failure message and display information about your z/OSMF server. For example, the z/OSMF version number and a list of installed plug-ins. Report any failure to your systems administrator and use the information for diagnostic purposes.
