# Installing Zowe CLI

As a systems programmer or application developer, you install Zowe CLI on your PC.

## Methods to install Zowe CLI

You can use either of the following methods to install Zowe CLI.
- Install Zowe CLI from local package
- Installing Zowe CLI from Bintray registry

### Installing Zowe CLI from local package

Install Zowe CLI on PCs that are running a Windows, Linux, or macOS operating system.

**Follow these steps:**

1. [Address the prerequisites](planinstall.md).

2. [Obtain the Zowe installation files](gettingstarted.md), which includes the zowe-cli-bundle.zip file. Use FTP to distribute the zowe-cli-bundle.zip file to client workstations.

3.  Open a command line window. For example, Windows Command Prompt. Browse to the directory where you downloaded the Zowe CLI installation bundle (.zip file). Issue the following command to unzip the files:

    ```
    unzip zowe-cli-bundle.zip
    ```

    The command expands four TGZ packages into your working directory - Zowe CLI, one plug-in, and the odbc_cli folder.

4. Issue the following command to install Zowe CLI on your PC:

    ```
    npm install -g zowe-cli-1.1.0-next.201808072010.tgz 
    ```

    **Note:** On Linux systems, you might need to prepend `sudo` to your `npm` commands so that you can issue the install and uninstall commands. For more information, see [Troubleshooting installing Zowe CLI](troubleshootinstall.md#troubleshooting-installing-zowe-cli).

    Zowe CLI is installed on your PC. See [Installing Plug-ins](cli-installplugins.md) for information about the commands for installing plug-ins from the package.

5.  Create a `zosmf` profile so that you can issue commands that communicate with z/OSMF.

    **Note:** For information about how to create a profile, see [Creating a Zowe CLI profile](cli-installcli.md#creating-a-zowe-cli-profile).

    **Tip:** Zowe CLI profiles contain information that is required for the product to interact with remote systems. For example, host name, port, and user ID. Profiles let you target unique systems, regions, or instances for a command. Most Zowe CLI [command groups](cli-usingcli.md#zowe-cli-command-groups) require a Zowe CLI `zosmf` profile.

After you install and configure Zowe CLI, you can issue the `zowe --help` command to view a list of available commands. For more information, see [Display Help](cli-usingcli.md#displaying-zowe-cli-help).


### Installing Zowe CLI from Bintray registry
If your PC is connected to the Internet, you can use the following method to install Zowe CLI from an npm registry.

**Follow these steps:**

1.  Issue the following command to set the registry to the Zowe CLI scoped package on Bintray. In addition to setting the scoped registry, your non-scoped registry must be set to an npm registry that includes all of the dependencies for Zowe CLI, such as the global npm registry:

    ```
    npm config set @brightside:registry https://api.bintray.com/npm/ca/brightside
    ```

2.  Issue the following command to install Zowe CLI from the registry:

    ```
    npm install -g @brightside/core@next
    ```

    Zowe CLI is installed on your PC. For information about plug-ins for Zowe CLI, see [Extending Zowe CLI](cli-extending.md).

1.  Create a `zosmf` profile so that you can issue commands that communicate with z/OSMF. For information about how to create a profile, see [Creating a Zowe CLI profile](cli-installcli.md#creating-a-zowe-cli-profile).

    **Tip:** Zowe CLI profiles contain information that is required for the product to interact with remote systems. For example, host name, port, and user ID. Profiles let you target unique systems, regions, or instances for a command. Most Zowe CLI [command groups](cli-usingcli.md#zowe-cli-command-groups) require a Zowe CLI `zosmf` profile.

After you install and configure Zowe CLI, you can issue the `zowe --help` command to view a list of available commands. For more information, see [How to display Zowe CLI help](cli-usingcli.md#displaying-zowe-cli-help).


**Note:** You might encounter problems when you attempt to install
Zowe CLI depending on your operating system and
environment. For more information and workarounds, see [Troubleshooting installing Zowe CLI](troubleshootinstall.md#troubleshooting-installing-zowe-cli).

## Creating a Zowe CLI profile
Profiles are a Zowe CLI functionality that let you store configuration information for use on multiple commands. You can create a profile that contains your username, password, and connection details for a particular mainframe system, then reuse that profile to avoid typing it again on every command. You can switch between profiles to quickly target different mainframe
subsystems.

**Important\!** A `zosmf` profile is required to issue most Zowe CLI commands. The first profile that you create becomes your default profile. When you issue any command that requires
a `zosmf` profile, the command executes using your default profile
unless you specify a specific profile name on that command.

**Follow these steps:**

1.  To create a `zosmf` profile, issue the following command.  
  Refer to the available options in the help text to define your profile:   
    ```
    zowe profiles create zosmf-profile --help
    ```

**Note:** After you create a profile, verify that it can communicate with z/OSMF. For more information, see [Testing Zowe CLI connection to z/OSMF](#Testing Zowe CLI connection to z/OSMF).


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
