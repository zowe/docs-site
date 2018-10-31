# Zowe CLI plug-in for IBM Db2 Database
The Zowe CLI plug-in for IBM® Db2® Database lets you interact with Db2 for z/OS to perform tasks with modern development tools to automate typical workloads more efficiently. The plug-in also enables you to interact with Db2 to advance continuous integration to validate product quality and stability.

Zowe CLI Plug-in for IBM Db2 Database lets you execute SQL statements against a Db2 region, export a Db2 table, and call a stored procedure.The plug-in also exposes its API so that the plug-in can be used directly in other products.

  - [Use Cases](#use-cases)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Obtaining a DB2 License](#license)
  - [Setting up profiles](#setting-up-profiles)
  - [Commands](#commands)
  
## Use cases

Use cases for Zowe CLI Db2 plug-in include:
  - Execute SQL and interact with databases.
  - Execute a file with SQL statements.
  - Export tables to a local file on your PC in SQL format.
  - Call a stored procedure and pass parameters.

## Prerequisites

Before you install the plug-in, meet the following prerequisites:

  - [Install Zowe CLI](cli-installcli.md) on your PC.

## Installing

There are **two methods** that you can use to install the Zowe CLI Plug-in for IBM Db2 Database - install from Bintray or install from the Zowe package.

### Installing from Bintray

If you installed Zowe CLI from **Bintray**, complete the following steps:

1. Open a command line window and issue the following command:

    ```
    zowe plugins install @brightside/db2 
    ```

2. After the command execution completes, issue the following command to validate that the installation completed successfully.

    ```
    zowe plugins validate db2
    ```

    Successful validation of the IBM Db2 plug-in returns the response: `Successfully validated`.

3. [Address the license requirements](#license) to begin using the plug-in.

### Installing from package

Follow these procedures if you downloaded the Zowe installation package:

#### Downloading the ODBC driver

Download the ODBC driver before you install the Db2 plug-in.

**Follow these steps:**

1. [Download the ODBC CLI Driver](https://github.com/ibmdb/node-ibm_db#-download-clidriver-based-on-your-platform--architecture-from-the-below-ibm-hosted-url). Use the table within the download URL to select the correct CLI Driver for your platform and architecture.

2. Create a new directory named `odbc_cli` in a well-known directory on your PC. You will need to enter the full path to this directory right before the Db2 plugin installation.

3. Place the ODBC driver in the `odbc_cli` folder. **Do not extract the ODBC driver**.  

You downloaded and installed the ODBC driver successfully. Proceed to install the plug-in to Zowe CLI. 

#### Installing the Plug-in

Now that the Db2 ODBC CLI driver is installed, set the IBM_DB_INSTALLER_URL environment variable and install the Db2 plug-in to Zowe CLI.

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
    zowe plugins install zowe-db2-<VERSION_NUMBER>.tgz
    ```

    - **<VERSION_NUMBER>**

        The version of Zowe CLI Plug-in for Db2that you want to install from the package. The following is an example of a full package name for the plug-in: `zowe-db2-1.0.0-next.201810041114.tgz`

   **Important!** On Windows, you must run as an Administrator to install the product and plug-ins.

4. (Optional) After the command execution completes, issue the following command to validate that the installation completed successfully.

    ```
    zowe plugins validate db2
    ```

    Successful validation of the IBM Db2 plug-in returns the response: `Successfully validated`.

5. [Address the license requirements](#license) to begin using the plug-in.

## License

The following steps are required for both the registry and offline package installation methods: 

1. Locate your client copy of the Db2 license. For the DB2 plugin to successfully connect to a z/OS instance, you must install have a properly licensed and configured DB2 instance. 
    
    **Note:** The license must be of version 11.1 if the Db2 server is not `db2connectactivated`. You can buy a db2connect license from     IBM. The connectivity can be enabled either on server using db2connectactivate utility or on client using client side license file.
    To know more about DB2 license and purchasing cost, please contact IBM Customer Support.

2. Copy your Db2 license file and place it in the following directory. 
    
   ```
   <brightside_home>\plugins\installed\node_modules\@brightside\db2\node_modules\ibm_db\installer\clidriver\license
   ```
   Note: by default, <brightside_home> is set to ~/.brightside on UN\*X systems, and C:\Users\<Your_User>\.brightside on Windows systems. 
   
   After the license is copied, you can use the Db2 plugin functionality.

## Setting up profiles
Before you start using the IBM Db2 plug-in, create a profile.

Issue the command `-DISPLAY DDF` in the SPUFI or ask your DBA for the following information:

  - The Db2 server host name
  - The Db2 server port number
  - The database name (you can also use the location)
  - The user name
  - The password
  - If your Db2 systems use a secure connection, you can also
    provide an SSL/TSL certificate file.

To create a db2 profile in Zowe CLI, issue a command in the command shell in the following format:

```
zowe profiles create db2 <profile name> -H <host> -P <port> -d <database> -u <user> -p <password>  
```

The profile is created successfully with the following
output:

```
Profile created successfully! Path:
/home/user/.brightside/profiles/db2/<profile name>.yaml
type: db2
name: <profile name>
hostname: <host>
port: <port>
username: securely_stored
password: securely_stored
database: <database>
Review the created profile and edit if necessary using the profile update command.
```

## Commands  

The following commands can be issued with the Zowe CLI Plug-in for IBM Db2:

**Tip:** At any point, you can issue the help command `-h` to see a list of available commands.

### Calling a stored procedure

Issue the following command to call a stored procedure that returns a result set:

```
$ zowe db2 call sp "DEMOUSER.EMPBYNO('000120')"
```

Issue the following command to call a stored procedure and pass parameters:

```
$ zowe db2 call sp "DEMOUSER.SUM(40, 2, ?)" --parameters 0
```

Issue the following command to call a stored procedure and pass a placeholder buffer:

```
$ zowe db2 call sp "DEMOUSER.TIME1(?)" --parameters "....placeholder..
```

### Executing an SQL statement 

Issue the following command to count rows in the EMP table:

```
$ zowe db2 execute sql -q "SELECT COUNT(*) AS TOTAL FROM DSN81210.EMP;"
```

Issue the following command to get a department name by ID:

```
$ zowe db2 execute sql -q "SELECT DEPTNAME FROM DSN81210.DEPT WHERE DEPTNO='D01'
```

### Exporting a table in SQL format

Issue the following command to export the `PROJ` table and save the generated SQL
statements:

```
$ zowe db2 export table DSN81210.PROJ
```

Issue the following command to export the `PROJ` table and save the output to a file:

```
$ zowe db2 export table DSN81210.PROJ --outfile projects-backup.sql 
```

You can also pipe the output to gzip for on-the-fly compression.
