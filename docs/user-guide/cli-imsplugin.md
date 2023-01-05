# IBM® IMS™ Plug-in for Zowe CLI

The IBM IMS Plug-in for Zowe CLI lets you extend Zowe CLI such that it can interact with IMS resources (regions, programs and transactions). You can use the plug-in to start, stop, and query regions and start, stop, query, and update programs and transactions.

**Note:** For more information about IMS, see [IBM Information Management System (IMS)](https://www.ibm.com/it-infrastructure/z/ims) on the IBM  Knowledge Center.

## Use cases

As an application developer or DevOps administrator, you can use IBM IMS Plug-in for Zowe CLI to perform the following tasks:

- Refresh IMS transactions, programs, and dependent IMS regions.
- Deploy application code into IMS production or test systems.
- Write scripts to automate IMS actions that you traditionally perform using ISPF editors, TSO, and SPOC.

## Commands

For detailed documentation on commands, actions, and options available in this plug-in, see our Web Help. It is available for download in three formats: a PDF document, an interactive online version, and a ZIP file containing the HTML for the online version.

- <a href="/stable/web_help/index.html" target="_blank">Browse Online</a>
- <a href="/stable/zowe_web_help.zip" target="_blank">Download (ZIP)</a>
- <a href="/stable/CLIReference_Zowe.pdf" target="_blank">Download (PDF)</a>

## Software requirements

Before you install the plug-in, meet the software requirements in [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing

Use one of the following methods to install or update the plug-in:

- [Installing plug-ins from an online registry](cli-installplugins.md#installing-plug-ins-from-an-online-registry)

- [Installing plug-ins from a local package](cli-installplugins.md#installing-plug-ins-from-a-local-package)

## Creating user profiles

You create an IMS profile to avoid entering your connection details each time that you issue a command. You can create multiple profiles and switch between them as needed. Use one of the following methods to create a profile:

- **Create plug-in profiles using a configuration file:** Specify your profile and connection details in the `zowe.config.json` configuration file.

- **Create plug-in profiles using a command:** Issue the `zowe profiles create` command to create the profile.

We recommend that you create profiles using the configuration file. We do not recommend using profile commands because we are removing them in a future major release.

### Creating plug-in profiles using a configuration file

When you issue various `zowe config` commands, such as `init`, `auto-init`, and `convert-profiles`, they create a `zowe.config.json` configuration file. When you install the z/OS IMS plug-in, the commands create an entry for an `ims profile` in your `zowe.config.json` file.

Alternatively, you can create an ims profile manually by adding a section that contains the configuration details to your `zowe.config.json` configuration file.

1. Browse to the following directory: `C:\Users\<username>\.zowe`

2. Open the `zowe.config.json` configuration file using a text editor or IDE, such as Visual Studio Code or IntelliJ.

    **NOTE:** If the file does not exist, issue the following command to create the configuration file: `zowe config init -–gc`

3. Add code to the "profiles" section as shown in the following example:
    ```
    "Your_ims_profile": {
        "type": "ims",
        "properties": {
            "host": "Your_host_name",
            "port": Your_port_number,
            "imsConnectHost": “Your_ims_connect_host_name”,
            “imsConnectPort”: Your_ims_connect_port_number
        },
        "secure": [
            "user",
            "password"
        ]
    }
4. Save the file

You can now use your profile when you issue commands in the ims command group.

### Creating plug-in profiles using a command

The following steps describe how to create a profile using the `zowe profiles create` command.

1. Open a terminal window and issue the following command:
    ```
    zowe profiles create ims <profile_name> --host <host> --port <port> --user <user> --password <password> --ims-connect-port <ims_port> --ims-connect-host <ims_host>
    ```
- **`profile_name`:**

    Specifies a name for your profile.
- **`host`:**


    Specifies the host name for the instance.
- **`user`:**


    Specifies your user name to log in to the instance.
- **`password`:**


    Specifies your password to log in to the instance.
- **`port`:**


    Specifies the port number to connect to the instance.
- **`ims_host`:**


    Specifies the host name to connect to the IMS Connect instance.
- **`ims_port`:**


    Specifies the port number to connect to the IMS Connect instance.

    **Example:**
    ```
    zowe profiles create ims-profile imsplex1 --host ims.zowe.org –-port 1443 --user zowe --password zowepass --ims-connect-host imsconnect.zowe.org --ims-connect-port 1444
    ```

2. Press Enter. The result of the command displays as a success or failure message.

You can now use your profile when you issue commands in the ims command group.