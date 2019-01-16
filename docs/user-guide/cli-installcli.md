# Installing Zowe CLI

As a systems programmer or application developer, you install Zowe CLI on your computer.

## Methods to install Zowe CLI

You can use either of the following methods to install Zowe CLI.

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

5. (Optional) Create a `zosmf` profile so that you can issue commands that communicate with z/OSMF without specifying the connection details on every command. For information about how to create a profile, see [Creating a Zowe CLI profile](#creating-a-zowe-cli-profile).

    **Tip:** Profiles are note required. You can issue commands directly on the command line, or choose to create a profile to issue commands more efficiently. 

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

    **Note:** You can use different npm tags to install a previous stable release of Zowe CLI, or install a newer alpha or beta release. The Zowe community only supports the `@latest` release at any given time. For a list of available npm tags, see [Understanding CLI versioning](#understanding-cli-versioning).

4. (Optional) To install all available plug-ins to Zowe CLI, issue the following command:

    ```
    bright plugins install @brightside/cics@latest @brightside/db2@latest
    ```

    **Note:** For more information about how to install multiple plug-ins, update to a specific version of a plug-in, and install from specific registries, see [Installing plug-ins](cli-installplugins.md).

5. (Optional) Create a `zosmf` profile so that you can issue commands that communicate with z/OSMF without specifying the connection details on every command. For information about how to create a profile, see [Creating a Zowe CLI profile](#creating-a-zowe-cli-profile).

    **Tip:** Profiles are note required. You can issue commands directly on the command line, or choose to create a profile to issue commands more efficiently. 

After you install and configure Zowe CLI, you can issue the `zowe --help` command to view a list of available commands. For more information, see [How to display Zowe CLI help](cli-usingcli.html#displaying-zowe-cli-help).

## Creating a Zowe CLI profile

Profiles are a Zowe CLI functionality that let you store configuration information for use on multiple commands. You can create a profile that contains your username, password, and connection details for a particular mainframe system, then reuse that profile to avoid typing it again on every command. You can switch between profiles to quickly target different mainframe subsystems.

**Follow these steps:**

1.  To create a `zosmf` profile, issue the following command. Refer to the available options in the help text to define your profile:

    ```
    zowe profiles create zosmf-profile --help
    ```

**Note:** After you create a profile, verify that it can communicate with z/OSMF. For more information, see [Testing Zowe CLI connection to z/OSMF](#testing-zowe-cli-connection-to-zosmf).

### Creating a profile to access an API Mediation Layer

You can create profiles that access an either an exposed API or API Mediation Layer (API ML) in the following ways:

* When you create a profile, specify the host and port of the API that you want to access. When you only provide the host and port configuration, Zowe CLI connects to the exposed endpoints of a specific API.

* When you create a profile, specify the host, port, and the base path of the API Mediation Layer instance that you want to access. Using the base path to an API Mediation Layer, Zowe CLI routes your requests to an appropriate instance of the API based on the system load and the available instances of the API.

**Example:**

The following example illustrates the command to create a profile that connects to z/OSMF through API Mediation Layer with the base path `my/api/layer`:

```
bright profiles create zosmf myprofile -H <myhost> -P <myport> -u <myuser> --pw <mypass> --base-path <my/api/layer>
```

For more information, see [Accessing an API Mediation Layer](cli-usingcli.html#accessing-an-api-mediation-layer).

## Testing Zowe CLI connection to z/OSMF
After you configure a Zowe CLI `zosmf` profile to connect to z/OSMF on your mainframe systems, you can issue a command at any time to receive diagnostic information from the server and confirm that your profile can communicate with z/OSMF.

**Tip:** In this documentation we provide command syntax to help you create a basic profile. We recommend that you append `--help` to the end of commands in the product to see the complete set of commands and options available to you. For example, issue `zowe profiles --help` to learn more about how to list profiles, switch your default profile, or create different profile types.

After you create a profile, run a test to verify that Zowe CLI can communicate properly with z/OSMF. You can test your default profile and any other Zowe CLI profile that you created.

**Default profile**

  - Verify that you can use your default profile to communicate with z/OSMF by issuing the following command:

    ```
    zowe zosmf check status
    ```

**Specific profile**

  - Verify that you can use a specific profile to communicate with
    z/OSMF by issuing the following command: 

    ```
    zowe zosmf check status --zosmf-profile <profile_name>
    ```

The commands return a success or failure message and display information about your z/OSMF server. For example, the z/OSMF version number and a list of installed plug-ins. Report any failure to your systems administrator and use the information for diagnostic purposes.

## Understanding CLI versioning

Each release of Zowe CLI is associated with tag in a Node Package Manager (npm) registry. If you install using the online registry method. You use tags in your command syntax to install or update the product to a specific version. For example, you use the @latest tag to install the community version of the product.

**Important!** The Zowe community offers support to users who stay on the `@latest` version of the Zowe CLI. The community cannot gaurantee support for alpha, beta, or older versions of the CLI.

The following list describes each npm tag and its intended usage: 

- `@lts-stable` 
    
    Points to an older, stable version of the product. This version is only updated for bug fixes.

- `@lts-incremental`
    
    Points to a incremental version of the product. This version is only updated to introduce backward-compatible enhancements and bug fixes.

- `@latest` 
    
    Points to the latest version of the product that is intended for the community.

- `@beta`

    Points to a pre-release snapshot that contains a set of features and bug fixes, and is available for validation. It will remain unchanged for a longer period of time compared to the @daily tag (approximately 2 weeks) to allow time for users to validate the features and/or fixes. 

    **Important!** You consume this beta release at your own risk.

- `@daily` 

    Points to the most recent pre-release snapshot (alpha version) of the product. This version is available for validation until the next snapshot is taken after a feature completion or bug fix. 

    **Important!** You consume this alpha release at your own risk.

- `@next` (DEPRECATED)

    This tag is deprecated.