# IBM® z/OS FTP Plug-in for Zowe CLI

The IBM® z/OS FTP Plug-in for Zowe&trade; CLI lets you extend Zowe CLI to access z/OS datasets, USS files, and submit JCL. The plug-in uses the z/OS FTP service to achieve the interaction with z/OS.

## Use cases

As a z/OS user, you can use the plug-in to perform the following tasks:

  - List, view, rename, and download z/OS datasets or USS files.
  - Upload local files or `stdin` to z/OS datasets or USS files.
  - List, view, and download job status or job spool files.
  - Delete a z/OS dataset, USS file, or job.

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

## Creating a user profile

You create a zftp profile to avoid entering your connection details each time that you issue a command. You can create multiple profiles and switch between them as needed. Use one of the following methods to create a profile:

- **Create plug-in profiles using a configuration file:** Specify your profile and connection details in the `zowe.config.json` configuration file.

- **Create plug-in profiles using a command:** Issue the `zowe profiles create` command to create the profile.

We recommend that you create profiles using the configuration file. We do not recommend using profile commands because we are removing them in a future major release.

### Creating plug-in profiles using a configuration file

When you issue various `zowe config` commands, such as `init`, `auto-init`, and `convert-profiles`, they create a `zowe.config.json` configuration file. When you install the z/OS FTP plug-in, the commands create an entry for a `zftp profile` in your `zowe.config.json` file.

Alternatively, you can create a zftp profile manually by adding a section that contains the configuration details to your `zowe.config.json` configuration file.

1. Browse to the following directory: `C:\Users\<username>\.zowe`

2. Open the `zowe.config.json` configuration file using a text editor or IDE, such as Visual Studio Code or IntelliJ.

  NOTE: If the file does not exist, issue the following command to create the configuration file: `zowe config init -–gc`

3. Add code to the "profiles" section as shown in the following example: 
  
    ```
    "Your_zftp_profile": {
       "type": "zftp",
        "properties": {
            "host": "Your_host_name",
            "port": Your_port_number,
            "secureFtp": true
        },
        "secure": [
            "user",
            "password"
        ]
    }
    ```
    **Note:** The value of the “`secureftp`" option is defined as true by default. We recommend that you specify this value when FTPS (FTP over SSL) is enabled in the z/OS FTP service. FTPS is not equivalent to SFTP (FTP over SSH). SFTP is not currently supported.

4. Save the file

You can now use your profile when you issue commands in the zftp command group.

### Creating plug-in profiles using a command

The following steps describe how to create a profile using the `zowe profiles create` command.

1. Open a terminal window and issue the following command:
    ```
    zowe profiles create zftp  <profile_name> --host <host> --port <port> --user <user> --password <password>
    ```

    **`profile_name`:** 
  
    Specifies a name for your profile.
  
    **`host`:** 
  
    Specifies the host name for the instance.
  
    **`user`:** 
  
    Specifies your user name to log in to the instance.
  
    **`password`:** 
  
    Specifies your password to log in to the instance.
  
    **`port`:** 
  
    Specifies the port number to connect to the instance.

    **Example:** 
    ```
    zowe profiles create zftp-profile LPAR1 --host ftp.zowe.org --port 21 --user zowe --password zowepass --secure-ftp
    ```

2. Press Enter. The result of the command displays as a success or failure message.

    **Note:** The command contains an option named `--secure-ftp` that is defined as true by default. We recommend that you specify this value when FTPS (FTP over SSL) is enabled in the z/OS FTP service. FTPS is not equivalent to SFTP (FTP over SSH).

You can now use your profile when you issue commands in the zftp command group.

### Issuing test commands

After installing the plugin successfully, you can issue commands to test basic Zowe CLI functionality.

For example, you can use one of the following methods to download a data set:

- Download a data set using a default profile:
  ```
  zowe zftp download data-set USERHLQ.DATASET.NAME
  ```
- Download a data set without using a default profile:
  ```
  zowe zftp download data-set USERHLQ.DATASET.NAME --host <hostname> --port 21 --user <User_ID> --password <password> --secure-ftp false 
  ```