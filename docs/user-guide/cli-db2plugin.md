# IBM® Db2® Database Plug-in for Zowe CLI

The IBM® Db2® Database Plug-in for Zowe&trade; CLI lets you interact with Db2 for z/OS to perform tasks through Zowe CLI and integrate with modern development tools. The plug-in also lets you interact with Db2 to advance continuous integration and to validate product quality and stability.

Zowe CLI Plug-in for IBM Db2 Database lets you execute SQL statements against a Db2 region, export a Db2 table, and call a stored procedure. The plug-in also exposes its API so that the plug-in can be used directly in other products.

[[toc]]

## Use cases

As an application developer, you can use Zowe CLI Plug-in for IBM DB2 Database to perform the following tasks:

  - Execute SQL and interact with databases.
  - Execute a file with SQL statements.
  - Export tables to a local file on your computer in SQL format.
  - Call a stored procedure and pass parameters.

## Commands

For detailed documentation on commands, actions, and options available in this plug-in, see our Web Help. It is available for download in three formats: a PDF document, an interactive online version, and a ZIP file containing the HTML for the online version.

- <a href="../web_help/index.html" target="_blank">Browse Online</a>
- <a href="../zowe_web_help.zip">Download (ZIP)</a>
- <a href="../CLIReference_Zowe.pdf">Download (PDF)</a>

## Software requirements

Before you install the plug-in, meet the software requirements in [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing

Use one of the following methods to install the the Zowe CLI Plug-in for IBM Db2 Database:

- [Install from an online registry](#installing-from-an-online-registry)
- [Install from a local package](#installing-from-a-local-package)

### Installing from an online registry

If you installed Zowe CLI from **online registry**, complete the following steps:

1. Open a commandline window and issue the following command:

    ```
    zowe plugins install @zowe/db2-for-zowe-cli@zowe-v1-lts
    ```

2. [Address the license requirements](#addressing-the-license-requirement) to begin using the plug-in.

### Installing from a local package

Follow these procedures if you downloaded the Zowe installation package:

#### Downloading the ODBC driver

Download the ODBC driver before you install the Db2 plug-in.

**Follow these steps:**

1. [Download the ODBC CLI Driver](https://github.com/ibmdb/node-ibm_db#-download-clidriver-based-on-your-platform--architecture-from-the-below-ibm-hosted-url). Use the table within the download URL to select the correct CLI Driver for your platform and architecture.

2. Create a new directory named `odbc_cli`  on your computer. Remember the path to the new directory. You will need to provide the full path to this directory immediately before you install the Db2 plug-in.

3. Place the ODBC driver in the `odbc_cli` folder. **Do not extract the ODBC driver**.

You downloaded and prepared to use the ODBC driver successfully. Proceed to install the plug-in to Zowe CLI.

#### Installing the plug-in

Now that the Db2 ODBC CLI driver is downloaded, set the `IBM_DB_INSTALLER_URL` environment variable and install the Db2 plug-in to Zowe CLI.

**Follow these steps:**

1. Open a command line window and change the directory to the location where you extracted the `zowe-cli-bundle.zip` file. If you do not have the `zowe-cli-bundle.zip` file, see the topic **Install Zowe CLI from local package** in [Installing Zowe CLI](cli-installcli.md) for information about how to obtain and extract it.

2. From a command line window, set the `IBM_DB_INSTALLER_URL` environment variable by issuing the following command:

    - Windows operating systems:

      ```
      set IBM_DB_INSTALLER_URL=<path_to_your_odbc_folder>/odbc_cli
      ```
    - Linux and Mac operating systems:

      ```
      export IBM_DB_INSTALLER_URL=<path_to_your_odbc_folder>/odbc_cli
      ```

    For example, if you downloaded the Windows x64 driver (ntx64_odbc_cli.zip) to C:\odbc_cli, you would issue the following command:
    ```
     set IBM_DB_INSTALLER_URL=C:\odbc_cli
    ```

2. Issue the following command to install the plug-in:

    ```
    zowe plugins install zowe-db2.tgz
    ```

5. [Address the license requirements](#addressing-the-license-requirement) to begin using the plug-in.

## Addressing the license requirement

The following steps are required for both the registry and offline package installation methods:

1. Locate your client copy of the Db2 license. You must have a properly licensed and configured Db2 instance for the Db2 plugin to successfully connect to Db2 on z/OS.

    **Note:** The license must be of version 11.1 if the Db2 server is not `db2connectactivated`. You can buy a db2connect license from IBM. The connectivity can be enabled either on server using db2connectactivate utility or on client using client side license file.
    To know more about DB2 license and purchasing cost, please contact IBM Customer Support.

2. Copy your Db2 license file and place it in the following directory.
    - **Windows:**
        ```
        <zowe_home>\plugins\installed\node_modules\@zowe\db2\node_modules\ibm_db\installer\clidriver\license
        ```
    - **Linux:**
        ```
        <zowe_home>/plugins/installed/lib/node_modules/@zowe/db2/node_modules/ibm_db/installer/clidriver/license
        ```
    **Tip:** By default, <zowe_home> is set to `~/.zowe` on \*NIX systems, and `C:\Users\<Your_User>\.zowe` on Windows systems.

    After the license is copied, you can use the Db2 plugin functionality.

## Creating a user profile

Before you start using the IBM Db2 plug-in, create a profile.

Issue the command `-DISPLAY DDF` in the SPUFI or ask your DBA for the following information:

  - The Db2 server host name
  - The Db2 server port number
  - The database name (you can also use the location)
  - The user name
  - The password
  - If your Db2 systems use a secure connection, you can also
    provide an SSL/TSL certificate file.

To create a db2 profile in Zowe CLI, issue the following command with your connection details for the Db2 instance:

```
zowe profiles create db2 <profileName> -H <host> -P <port> -d <database> -u <user> --pw <password>
```

**Note** For more information, issue the command `zowe profiles create db2-profile --help`