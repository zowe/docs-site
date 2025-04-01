# IBM® Db2® Database Plug-in for Zowe CLI

The IBM® Db2® Database Plug-in for Zowe&trade; CLI lets you interact with Db2 for z/OS to perform tasks through Zowe CLI and integrate with modern development tools. The plug-in also lets you interact with Db2 to advance continuous integration and to validate product quality and stability.

Zowe CLI Plug-in for IBM Db2 Database lets you execute SQL statements against a Db2 region, export a Db2 table, and call a stored procedure. The plug-in also exposes its API so that the plug-in can be used directly in other products.

## Use cases

As an application developer, you can use Zowe CLI Plug-in for IBM Db2 Database to perform the following tasks:

  - Execute SQL and interact with databases.
  - Execute a file with SQL statements.
  - Export tables to a local file on your computer in SQL format.
  - Call a stored procedure and pass parameters.

## Using commands

For detailed documentation on commands, actions, and options available in this plug-in, see our web help.

There are several methods to view Zowe CLI web help:

- <a href="/stable/web_help/index.html" target="_blank">Use a web browser</a>
- <a href="/stable/zowe_web_help.zip" target="_blank">Extract from a ZIP file</a>
- <a href="/stable/CLIReference_Zowe.pdf" target="_blank">Download a PDF file</a>

## Software requirements

Before you install the plug-in, meet the software requirements in [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing

Use one of the following methods to install the the Zowe CLI Plug-in for IBM Db2 Database:

- [Install from an online registry](#installing-from-an-online-registry)
- [Install from a local package](#installing-from-a-local-package)

### Installing from an online registry

If you installed Zowe CLI from **online registry**:

1. Open a command line window and issue the following command:

    ```
    zowe plugins install @zowe/db2-for-zowe-cli@zowe-v3-lts
    ```

3. [Address the license requirements](#addressing-the-license-requirement) to begin using the plug-in.

### Installing from a local package

Follow these procedures if you downloaded the Zowe installation package:

#### Downloading the ODBC driver

Download the ODBC driver before you install the Db2 plug-in:

1. [Download the ODBC CLI Driver](https://github.com/ibmdb/node-ibm_db#-download-clidriver-based-on-your-platform--architecture-from-the-below-ibm-hosted-url). Use the table within the download URL to select the correct CLI Driver for your platform and architecture.

3. Create a new directory named `odbc_cli`  on your computer. Remember the path to the new directory. You need to provide the full path to this directory immediately before you install the Db2 plug-in.

4. Place the ODBC driver in the `odbc_cli` folder. **Do not extract the ODBC driver**.

    You downloaded and prepared to use the ODBC driver successfully. Proceed to install the plug-in to Zowe CLI.

#### Installing Xcode on MacOS

To install the Db2 CLI plug-in on MacOS, you need the command line tools, which can be obtained by installing Xcode from the [App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12). 

:::note

 On some versions of MacOS, you may receive the error `xcrun: error: invalid active developer path` as shown below:

```
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
```

If this occurs, a manual refresh of the command line tools is required by running the following commands:

```
sudo rm -rf /Library/Developer/CommandLineTools
sudo xcode-select --install
```
:::

#### Installing the plug-in

With the Db2 ODBC CLI driver downloaded, set the `IBM_DB_INSTALLER_URL` environment variable and install the Db2 plug-in to Zowe CLI:

1. Open a command line window and change the directory to the location where you extracted the `zowe-cli-plugins-<X.Y.Z>.zip` file. If you do not have the `zowe-cli-bundle.zip` file, see [Installing Zowe CLI and Zowe CLI plug-ins from a local package](../user-guide/cli-installcli.md#installing-zowe-cli-and-zowe-cli-plug-ins-from-a-local-package) for information about how to obtain and extract it.

2. From a command line window, set the `IBM_DB_INSTALLER_URL` environment variable:

    - Windows operating systems:

      ```
      set IBM_DB_INSTALLER_URL=<path_to_your_odbc_folder>/odbc_cli
      ```
    - Linux and Mac operating systems:

      ```
      export IBM_DB_INSTALLER_URL=<path_to_your_odbc_folder>/odbc_cli
      ```

        For example, if you downloaded the Windows x64 driver (`ntx64_odbc_cli.zip`) to `C:\odbc_cli`:

            ```
            set IBM_DB_INSTALLER_URL=C:\odbc_cli
            ```

3. To install the IBM Db2 Database Plug-in:

    ```
    zowe plugins install db2-for-zowe-cli.tgz
    ```

4. See [Addressing the license requirement](#addressing-the-license-requirement) to begin using the plug-in.

    You have installed the IBM Db2 Database Plug-in successfully.

## Addressing the license requirement

To successfully connect the Db2 CLI plug-in to a database on z/OS, a license needs to be present either on the client where the Zowe CLI is executed from, or on z/OS. If you do not have a license configured when you execute Db2 CLI commands, you receive the following error `SQL1598N`:

```
Db2 ODBC Driver Error: [node-ibm_db] SQL_ERROR
Error Details:
Error:    [IBM][CLI Driver] SQL1598N An attempt to connect to the database server failed because of a licensing problem.
```

### Server-side license

You can execute the utility `db2connectactivate` on z/OS to enable a Db2 database to accept client requests. For more information, see [db2connectactivate - Server license activation utility](https://www.ibm.com/support/knowledgecenter/SSEPGG_11.5.0/com.ibm.db2.luw.licensing.doc/doc/r0057377.html). This avoids having to apply the Db2 Connect license on each database client that connects directly to the server. It is also the preferred approach to enabling users of the Zowe Db2 CLI because it avoids individual client license distribution and configuration.

### Client-side license

If the utility `db2connectactivate` has not been executed against the Db2 database that your profile is connecting to, then it is possible to obtain the license file `db2consv_zs.lic` from a copy of Db2 Connect and use this for client configuration. This will need to be done separately for each client PC.  

1. Locate your client copy of the Db2 license file `db2consv_zs.lic`. 

    :::note
    
    The license must be of version 11.5 if the Db2 server is not `db2connectactivated`. You can buy a db2connect license from IBM. The connectivity can be enabled either on server using db2connectactivate utility or on client using client side license file.
    For more information about Db2 license and purchasing cost, please contact IBM Customer Support.

    :::

2. Copy your Db2 license file `db2consv_za.lic` and place it in the following directory.
      ```
      <zowe_home>/plugins/installed/lib/node_modules/@zowe/db2-for-zowe-cli/node_modules/ibm_db/installer/clidriver/license
      ```
    :::tip

    By default, `<zowe_home>` is set to `~/.zowe` on \UNIX and Mac systems, and `C:\Users\<Your_User>\.zowe` on    Windows systems.
        
    :::

    After the license is copied, you can use the Db2 plug-in functionality.

## Creating a user profile

After you install the plug-in, create a Db2 profile to avoid entering your connection details each time that you issue a command. You can create multiple profiles and switch between them as needed.

Add your plug-in profile and connection details to the `zowe.config.json` configuration file. In the profile, enter the IP address and port number of the Db2 database, as well as the eight-character database schema name.

:::tip
You can get your connection information by either:

- Issuing the `-DISPLAY DDF` command
- Searching for the message ID `DSNL004I` in the JES spool for the Db2 MSTR address space

    Example of how to read the `DSNL004I` message with example values:



    ```
    DSNL004I  #DI2E DDF START COMPLETE  025        
            LOCATION  DSNV123E                  
            LU        GBIBMIYA.IYCYZDBE         
            GENERICLU -NONE                     
            DOMAIN    domain.host.acme.com  
            TCPPORT   40100                     
            SECPORT   30100
    ```
        - `DOMAIN`<br/>
            Specifies the value for the CLI host. 
        - `TCPPORT`<br/>
            Specifies the port number.
        - `SECPORT`<br/>
            If a TLS certificate is being used, specifies the secure port.
        - `LOCATION`<br/>
            Specifies the property to use in the `database` value.
:::

### Creating plug-in profiles using a configuration file

You can issue commands to create a Db2 profile, or you can manually edit your configuration file to add a profile.

#### Creating a Db2 profile with a command

When you issue various `zowe config` commands, such as `init`, `auto-init`, and `convert-profiles`, they create a `zowe.config.json` configuration file. When you install the Db2 plug-in and then issue a command, the command creates an entry for a `db2 profile` in your `zowe.config.json` file.

To create a Db2 profile with a command:

1. Install the IBM Db2 Database Plug-in for Zowe CLI.

2. Create a Db2 profile:

    ```
    zowe config init
    ```

3. Set the port number to the port configured for a Db2 connection on your mainframe.

    ```
    zowe config set profiles.db2.properties.port <port number>
    ```

    - `<port number>`<br/>
      Specifies the port number for the instance.

4. If an SSL file is available, set the `sslFile` value to SSL file path:

    ```
    zowe config set profiles.db2.properties.sslFile <SSL file path>
    ```

    You can now use your profile when you issue commands in the Db2 command group.

#### Creating a Db2 profile manually

To create a Db2 profile manually by adding a section that contains the configuration details in your `zowe.config.json` configuration file:

1. Install the Db2 Plug-in for Zowe CLI.

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
    "Your_db2_profile": {
    "type": "db2",
    "properties": {
        "host": "Your_host_name",
        "port": Your_port_number,
        "database": “Your_database”
    },
    "secure": [
        "user",
        "password"
    ]
    }
    ```

5. Save the file.

    You can now use your profile when you issue commands in the Db2 command group.
