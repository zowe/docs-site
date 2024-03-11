# IBM® z/OS FTP Plug-in for Zowe CLI

The IBM® z/OS FTP Plug-in for Zowe&trade; CLI lets you extend Zowe CLI to access z/OS data sets, USS files, and submit JCL. The plug-in uses the z/OS FTP service to achieve the interaction with z/OS.

## Use cases

As a z/OS user, you can use the plug-in to perform the following tasks:

  - List, view, rename, and download z/OS data sets or USS files.
  - Upload local files or `stdin` to z/OS data sets or USS files.
  - List, view, and download job status or job spool files.
  - Delete a z/OS data set, USS file, or job.

## Commands

:::note

When transferring files, data sets, or data set members, use only ASCII characters. If a file contains non-ASCII characters (such as glyphs or mathematical symbols), a translation error can happen when the file is downloaded from, or uploaded to, the mainframe. This error can result in data loss.

:::

For detailed documentation on commands, actions, and options available in this plug-in, see the Web Help. It is available for download in the following formats:

- <a href="/stable/web_help/index.html" target="_blank">Browse the online Web Help</a>
- <a href="/stable/zowe_web_help.zip" target="_blank">Download the ZIP file</a>
- <a href="/stable/CLIReference_Zowe.pdf" target="_blank">Download the PDF document</a>

## Software requirements

Before you install the plug-in, meet the [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing

Use one of the following methods to install or update the plug-in:

- [Installing plug-ins from an online registry](cli-installplugins.md#installing-plug-ins-from-an-online-registry)

- [Installing plug-ins from a local package](cli-installplugins.md#installing-plug-ins-from-a-local-package)

## Creating a user profile

After you install the plug-in, create an FTP profile. An FTP profile is recommended to issue commands via FTP. FTP profiles contain your host, port, user name, and password to connect to z/OS using FTP. You can create multiple profiles and switch between them as needed.

**Follow these steps:**
1.  Install the z/OS FTP Plug-in for Zowe CLI
2.  Create an FTP profile:

    ```
    zowe config init
    ```
3.  If using a non-standard port, set the port number to your FTP connection:

    ```
    zowe config set profiles.zftp.properties.port <port number>
    ```
4. If using a insecure connection, set the secureFtp value to false:

    ```
    zowe config set profiles.zftp.properties.secureFtp false
    ```


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

After installing the plug-in successfully, you can issue commands to test basic Zowe CLI functionality.

For example, you can use one of the following methods to download a data set:

- Download a data set using a default profile:
  ```
  zowe zftp download data-set USERHLQ.DATASET.NAME
  ```
- Download a data set without using a default profile:
  ```
  zowe zftp download data-set USERHLQ.DATASET.NAME --host <hostname> --port 21 --user <User_ID> --password <password> --secure-ftp false
  ```