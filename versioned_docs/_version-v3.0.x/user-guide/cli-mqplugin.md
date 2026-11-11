# IBM® MQ Plug-in for Zowe CLI

The IBM MQ Plug-in for Zowe CLI lets you issue MQSC commands to a queue manager. MQSC commands let you perform administration tasks. For example, you can define, alter, or delete a local queue object.

:::note

For more information about MQSC commands and the corresponding syntax, see [MQSC commands](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_9.1.0/com.ibm.mq.ref.adm.doc/q085130_.htm) on the IBM Knowledge Center.

:::

## Use cases

You can use the plug-in to execute MQSC Commands. With MQSC commands you can manage queue manager objects (including the queue manager itself), queues, process definitions, channels, client connection channels, listeners, services, namelists, clusters, and authentication information objects.

## Using IBM MQ plug-in commands

For detailed documentation on commands, actions, and options available in this plug-in, see our web help.

There are several methods to view Zowe CLI web help:

- <a href="/v3.0.x/web_help/index.html" target="_blank">Use a web browser</a>
- <a href="/v3.0.x/zowe_web_help.zip" target="_blank">Extract from a ZIP file</a>
- <a href="/v3.0.x/CLIReference_Zowe.pdf" target="_blank">Download a PDF file</a>

## Software requirements

Before you install the plug-in, meet the software requirements in [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing

Use one of the following methods to install or update the plug-in:

- [Installing plug-ins from an online registry](cli-installplugins.md#installing-plug-ins-from-an-online-registry)
- [Installing plug-ins from a local package](cli-installplugins.md#installing-plug-ins-from-a-local-package)

## Creating a user profile

After you install the plug-in, create an MQ profile. An MQ profile is recommended to issue commands to the MQ resource. MQ profiles contain your host, port, user name, and password for the IBM MQ REST API server of your choice. You can create multiple profiles and switch between them as needed.

Specify your plug-in profile and connection details in the `zowe.config.json` configuration file.

### Creating plug-in profiles using a configuration file

If you have the MQ plug-in installed and issue the `zowe config init`, `zowe config auto-init`, or `zowe config convert-profiles` command, the command creates an entry for a MQ profile in your `zowe.config.json file`.

Alternatively, you can create an MQ profile manually by adding a section that contains the configuration details to your `zowe.config.json` configuration file.

#### Creating an MQ profile with a command

1.  Install the IBM MQ Database Plug-in for Zowe CLI.
2.  Create an MQ profile:

    ```
    zowe config init
    ```
3.  Set the port number to the port configured for an MQ connection on your mainframe.

    ```
    zowe config set profiles.mq.properties.port <port number>
    ```

    - `<port number>`

      Specifies the port number for the instance.

    You can now use your profile when you issue commands in the MQ command group.

#### Creating an MQ profile manually

1.  Install the IBM MQ Database Plug-in for Zowe CLI.

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
    "Your_mq_profile": {
    "type": "mq",
    "properties": {
        "host": "Your_host_name",
        "port": Your_port_number,
    },
    "secure": [
        "user",
        "password"
    ]
    }
    ```

5. Save the file.

    You can now use your profile when you issue commands in the MQ command group.
