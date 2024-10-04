# IBM® CICS® Plug-in for Zowe CLI

The IBM® CICS® Plug-in for Zowe&trade; CLI lets you extend Zowe CLI to interact with CICS programs and transactions. The plug-in uses the IBM CICS® Management Client Interface (CMCI) API to achieve the interaction with CICS. For more information, see [CICS management client interface](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.3.0/com.ibm.cics.ts.clientapi.doc/topics/clientapi_overview.html) on the IBM Knowledge Center.

## Use cases

As an application developer, you can use the plug-in to perform the following tasks:

  - Deploy code changes to CICS applications that were developed with COBOL.
  - Deploy changes to CICS regions for testing or delivery. See the [define command](#commands) for an example of how you can define programs to CICS to assist with testing and delivery.
  - Automate CICS interaction steps in your CI/CD pipeline with Jenkins Automation Server or TravisCI.
  - Deploy build artifacts to CICS regions.
  - Alter, copy, define, delete, discard, and install CICS resources and resource definitions.

## Commands

For detailed documentation on commands, actions, and options available in this plug-in, see our web help.

There are several methods to view Zowe CLI web help:

- <a href="/stable/web_help/index.html" target="_blank">Use a web browser</a>
- <a href="/stable/zowe_web_help.zip" target="_blank">Extract from a ZIP file</a>
- <a href="/stable/CLIReference_Zowe.pdf" target="_blank">Download a PDF file</a>

## Software requirements

Before you install the plug-in, meet the software requirements in [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing

Use one of the following methods to install or update the plug-in:

- [Installing plug-ins from an online registry](cli-installplugins.md#installing-plug-ins-from-an-online-registry)

- [Installing plug-ins from a local package](cli-installplugins.md#installing-plug-ins-from-a-local-package)

## Creating a user profile

After you install the plug-in, create a CICS profile to avoid entering your connection details each time that you issue a command. You can create multiple profiles and switch between them as needed.

Specify your plug-in profile and connection details in the `zowe.config.json` configuration file.

### Creating plug-in profiles using a configuration file

If you have the CICS plug-in installed and issue the `zowe config init`, `zowe config auto-init`, or `zowe config convert-profiles` command, the command creates an entry for a CICS profile in your `zowe.config.json file`.

Alternatively, you can create a CICS profile manually by adding a section that contains the configuration details to your `zowe.config.json` configuration file.

#### Creating a CICS profile with a command

1.  Install the CICS Plug-in for Zowe CLI.
2.  Create a CICS profile:

    ```
    zowe config init
    ```
3.  Set the port number to the port configured for a CICS connection on your mainframe.

    ```
    zowe config set profiles.cics.properties.port <port number>
    ```

    - `<port number>`

      Specifies the port number for the instance.

    You can now use your profile when you issue commands in the cics command group.

#### Creating a CICS profile manually

1.  Install the CICS Plug-in for Zowe CLI.

2. Browse to the directory `C:\Users\<username>\.zowe`.

3. Open the `zowe.config.json` configuration file using a text editor or IDE, such as Visual Studio Code or IntelliJ IDEA.

    :::note
    
    If the file does not exist, issue the following command to create the configuration file:
    ```
    zowe config init --gc
    ```
    
    :::

4. Add code to the "profiles" section as shown in the following example:

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

5. Save the file.

    You can now use your profile when you issue commands in the zftp command group.
