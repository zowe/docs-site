# IBM® CICS® Plug-in for Zowe CLI

The IBM® CICS® Plug-in for Zowe&trade; CLI lets you extend Zowe CLI to interact with CICS programs and transactions. The plug-in uses the IBM CICS® Management Client Interface (CMCI) API to achieve the interaction with CICS. For more information, see [CICS management client interface](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.3.0/com.ibm.cics.ts.clientapi.doc/topics/clientapi_overview.html) on the IBM Knowledge Center.

  - [Use Cases](#use-cases)
  - [Commands](#commands)
  - [Software requirements](#software-requirements)
  - [Installing](#installing)
  - [Creating a user profile](#creating-a-user-profile)


## Use cases

As an application developer, you can use the plug-in to perform the following tasks:

  - Deploy code changes to CICS applications that were developed with COBOL.
  - Deploy changes to CICS regions for testing or delivery. See the [define command](#commands) for an example of how you can define programs to CICS to assist with testing and delivery.
  - Automate CICS interaction steps in your CI/CD pipeline with Jenkins Automation Server or TravisCI.
  - Deploy build artifacts to CICS regions.
  - Alter, copy, define, delete, discard, and install CICS resources and resource definitions.

## Commands

For detailed documentation on commands, actions, and options available in this plug-in, see our Web Help. It is available for download in three formats: a PDF document, an interactive online version, and a ZIP file containing the HTML for the online version.

- <a href="/v2.3.x/web_help/index.html" target="_blank">Browse Online</a>
- <a href="/v2.3.x/zowe_web_help.zip" target="_blank">Download (ZIP)</a>
- <a href="/v2.3.x/CLIReference_Zowe.pdf" target="_blank">Download (PDF)</a>

## Software requirements

Before you install the plug-in, meet the software requirements in [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing

Use one of the following methods to install or update the plug-in:

- [Installing plug-ins from an online registry](cli-installplugins.md#installing-plug-ins-from-an-online-registry)

- [Installing plug-ins from a local package](cli-installplugins.md#installing-plug-ins-from-a-local-package)

## Creating a user profile

You create a cics profile to avoid entering your connection details each time that you issue a command. You can create multiple profiles and switch between them as needed. Use one of the following methods to create a profile:
- **Create plug-in profiles using a configuration file:** Specify your profile and connection details in the `zowe.config.json` configuration file.
- **Create plug-in profiles using a command:** Issue the `zowe profiles create` command to create the profile.
We recommend that you create profiles using the configuration file. We do not recommend using profile commands because we are removing them from a future major release.

### Creating plug-in profiles using a configuration file

When you issue various `zowe config` commands, such as `init`, `auto-init`, and `convert-profiles`, they create a `zowe.config.json` configuration file. When you install the CICS plug-in, the commands create an entry for a cics profile in your `zowe.config.json` file.

Alternatively, you can create a CICS profile manually by adding a section that contains the configuration details to your `zowe.config.json` configuration file.

1. Browse to the following directory `C:\Users\<username>\.zowe`

2. Open the `zowe.config.json` configuration file using a text editor or IDE, such as Visual Studio Code or IntelliJ.

    **NOTE:** If the file does not exist, issue the following command to create the configuration file:
    ```
    zowe config init -–gc
    ```

3. Add code to the "profiles" section as shown in the following example: :

    ```
    "Your_cics_profile": {
      "type": "cics",
      "properties": {
          "host": "Your_host_name",
          "port": Your_port_number,
          "regionName": “Your_CICS_region”
      },
      "secure": [
        "user",
        "password"
      ]
    }
    ```


4. Save the file.

You can now use your profile when you issue commands in the cics command group.

### Creating plug-in profiles using a command

The following steps describe how to create a profile using the `zowe profiles create` command.

1. Open a terminal window and issue the following command:

    ```
    zowe profiles create cics <profile_name> –-host <host> --port <port> --user <user> --password <password> -–region-name <region>
    ```

- **`profile_name`:**

  Specifies a name for your profile.
- **`host`:**

  Specifies the host name for the instance.
- **`user`**:

  Specifies your user name to log in to the instance.
- **`password`**:

  Specifies your password to log in to the instance.
- **`port`**:

  Specifies the port number to connect to the instance.
- **`region`**:

  Specifies the region to use on the instance.

  **Example:**
  ```
  zowe profiles create cics-profile REGION1 --host mylpar.zowe.org --port 1443 --user zowe --password zowepass --region-name CICCMCI
  ```

2. Press Enter. The result of the command displays as a success or failure message.

You can now use your profile when you issue commands in the cics command group.

The plug-in uses HTTPS by default. Use the optional flag `--protocol http` to override the default with HTTP.