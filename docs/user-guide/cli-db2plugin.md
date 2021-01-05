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

#### Installing Xcode on MacOS

To install the Db2 CLI plug-in on MacOS, you need the command line tools, which can be obtained by installing Xcode from the [App Store](https://medium.com/r/?url=https%3A%2F%2Fapps.apple.com%2Fus%2Fapp%2Fxcode%2Fid497799835%3Fmt%3D12). 

**Note:** On some versions of MacOS, you may receive the error `xcrun: error: invalid active developer path` as shown below:

```
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
```

If this occurs, a manual refresh of the command line tools is required by running the following commands:

```
sudo rm -rf /Library/Developer/CommandLineTools
sudo xcode-select --install
```

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

3. [Address the license requirements](#addressing-the-license-requirement) to begin using the plug-in.

## Addressing the license requirement

To successfully connect the Db2 CLI plug-in to a database on z/OS, a license needs to be present either on the client where the Zowe CLI is executed from, or else on z/OS. If you don't have a license configured when you execute Db2 CLI commands, you will receive an error `SQL1598N`, for example:

```
DB2 ODBC Driver Error: [node-ibm_db] SQL_ERROR
Error Details:
Error:    [IBM][CLI Driver] SQL1598N  An attempt to connect to the   database server failed because of a licensing problem.
```

### Server-side license

You can execute the utility `db2connectactivate` on z/OS to enable a Db2 database to accept client requests. For more information, see [db2connectactivate - Server license activation utility](https://www.ibm.com/support/knowledgecenter/SSEPGG_11.5.0/com.ibm.db2.luw.licensing.doc/doc/r0057377.html). This avoids having to apply the Db2 Connect license on each database client that connects directly to the server. It is also the preferred approach to enabling users of the Zowe Db2 CLI because it avoids individual client license distribution and configuration.

### Client-side license

If the utility `db2connectactivate` has not been executed against the Db2 database that your profile is connecting to, then it is possible to obtain the license file `db2consv_zs.lic` from a copy of DB2 Connect and use this for client configuration. This will need to be done separately for each client PC.  

1. Locate your client copy of the Db2 license file `db2consv_zs.lic`. 

    **Note:** The license must be of version 11.5 if the Db2 server is not `db2connectactivated`. You can buy a db2connect license from IBM. The connectivity can be enabled either on server using db2connectactivate utility or on client using client side license file.
    To know more about DB2 license and purchasing cost, please contact IBM Customer Support.

2. Copy your Db2 license file `db2consv_za.lic` and place it in the following directory.
      ```
      <zowe_home>/plugins/installed/lib/node_modules/@zowe/db2-for-zowe-cli/node_modules/ibm_db/installer/clidriver/license
      ```
    **Tip:** By default, <zowe_home> is set to `~/.zowe` on \*UNIX Aand Mac systems, and `C:\Users\<Your_User>\.zowe` on Windows systems.

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

### SQL0805N: Database BIND

To be able to run remote SQL commands against a Db2 database, you must invoke a `BIND` command against it. If the `BIND` command is not run, you will see an error that contains `SQL0805N` similar to the log below:

```
Command Error:
DB2 ODBC Driver Error: [node-ibm_db] Error in ODBCConnection::QuerySync while executing query.Error Details:
Error:    [IBM][CLI Driver][DB2] SQL0805N  Package "DSNV112E.NULLID.SYSSH200.5359534C564C3031" was not found.
```
If you receive this error, a user with `DBADM` authority must run the `BIND` command. This will typically be done by a Db2 System Programmer.  More information can be found in the [Db2 product documentation](https://medium.com/r/?url=https%3A%2F%2Fwww.ibm.com%2Fsupport%2Fproducthub%2Fdb2%2Fdocs%2Fcontent%2FSSEPGG_11.5.0%2Fcom.ibm.db2.luw.admin.cmd.doc%2Fdoc%2Fr0001935.html) and [The Bind process](https://medium.com/r/?url=https%3A%2F%2Fwww.ibm.com%2Fsupport%2Fknowledgecenter%2FSSEPEK_10.0.0%2Fapsg%2Fsrc%2Ftpc%2Fdb2z_bindprocess.html).