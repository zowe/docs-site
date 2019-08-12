# IBM® MQ Plug-in for Zowe CLI

***UNDER CONSTRUCTION***

IBM MQ Plug-in for Zowe CLI lets you issue MQSC commands to a queue manager. MQSC commands let you to perform administration tasks. For example, you can define, alter, or delete a local queue object.

**Note:** For more information about MQSC commands and the corresponding syntax, see [MQSC commands](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_9.1.0/com.ibm.mq.ref.adm.doc/q085130_.htm) on the IBM Knowledge Center.

[[toc]]

## Use cases

You can use the plug-in to perform the following tasks:

  - 1
  - 2

## Commands 

For detailed documentation on commands, actions, and options available in this plug-in, see our Web Help. It is available for download in three formats: a PDF document, an interactive online version, and a ZIP file containing the HTML for the online version.

- <a href="../web_help/index.html" target="_blank">Browse Online</a>
- <a href="../zowe_web_help.zip">Download (ZIP)</a>
- <a href="../CLIReference_Zowe.pdf">Download (PDF)</a>

## Software requirements

Before you install the plug-in, meet the software requirements in [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing

Use one of the following methods to install the plug-in:

- [Installing from an online registry](#installing-from-an-online-registry)

- [Installing from a local package](#installing-from-a-local-package)

**Note:** For more information about how to install multiple plug-ins, update to a specific version of a plug-ins, and install from specific registries, see [Install Plug-ins](cli-installplugins.md).

### Installing from an online registry

To install Zowe CLI from an online registry, complete the following steps:

1. Set your npm registry if you did not already do so when you installed Zowe CLI. Issue the following command:

    ```
    npm config set @zowe:registry
    ```

2. Open a command line window and issue the following command:

    ``` 
    zowe plugins install @zowe/mq-for-zowe-cli
    ```

The plug-in is installed to Zowe CLI. 

### Installing from a local package

If you downloaded the Zowe PAX file and extracted the `zowe-cli-bundle.zip` package, complete the following steps to install the plug-in:

1. Open a command line window and change the local directory where you extracted the `zowe-cli-bundle.zip` file. If you do not have the `zowe-cli-bundle.zip` file, see the topic [Install Zowe CLI from local package](cli-installcli.md#installing-zowe-cli-from-a-local-package) for information about how to obtain and extract it.

2. Issue the following command to install the plug-in:

    ```
    zowe plugins install mq-for-zowe-cli.tgz
    ```

The plug-in is installed to Zowe CLI. 

## Create a User Profile
You can create an `mq` user profile to avoid typing your connection details on every command. An `mq` profile contains the host, port, username, and password for the MQ Rest API server of your choice. You can create multiple profiles and switch between them as needed.

**Follow these steps:**

1.  Create an `mq` profile: 

    ```
    zowe profiles create mq-profile <profileName> --host <hostname> --port <portnumber> --user <username> --password <password> --rejectUnauthorized false
    ```
    
    The result of the command displays as a success or failure message. You can use your profile when you issue commands in the mq command group.

**Tip:** For more information about the syntax, actions, and options, for a profiles create command, open Zowe CLI and issue the following command:

```
zowe profiles create mq-profile -h
```
