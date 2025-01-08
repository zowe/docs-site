# IBM® z/OS FTP Plug-in for Zowe CLI

The IBM® z/OS FTP Plug-in for Zowe&trade; CLI lets you extend Zowe CLI to access z/OS data sets, USS files, and submit JCL. The plug-in uses the z/OS FTP service to achieve the interaction with z/OS.

## Use cases

As a z/OS user, you can use the plug-in to perform the following tasks:

  - List, view, rename, and download z/OS data sets or USS files.
  - Upload local files or `stdin` to z/OS data sets or USS files.
  - List, view, and download job status or job spool files.
  - Delete a z/OS data set, USS file, or job.

## Using commands

:::caution important

When transferring files, data sets, or data set members, use only ASCII characters. If a file contains non-ASCII characters (such as glyphs or mathematical symbols), a translation error can happen when the file is downloaded from, or uploaded to, the mainframe. This error can result in data loss.

:::

For detailed documentation on commands, actions, and options available in this plug-in, see our web help.

There are several methods to view Zowe CLI web help:

- <a href="/stable/web_help/index.html" target="_blank">Use a web browser</a>
- <a href="/stable/zowe_web_help.zip" target="_blank">Extract from a ZIP file</a>
- <a href="/stable/CLIReference_Zowe.pdf" target="_blank">Download a PDF file</a>

## Software requirements

Before you install the plug-in, meet the [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing

Use one of the following methods to install or update the plug-in:

- [Installing plug-ins from an online registry](cli-installplugins.md#installing-plug-ins-from-an-online-registry)
- [Installing plug-ins from a local package](cli-installplugins.md#installing-plug-ins-from-a-local-package)

## Creating a user profile

After you install the plug-in, create an FTP profile. An FTP profile is recommended to issue commands via FTP. FTP profiles contain your host, port, user name, and password to connect to z/OS using FTP. You can create multiple profiles and switch between them as needed.

### Creating plug-in profiles using a configuration file

If you have the IBM® z/OS FTP plug-in installed and issue the `zowe config init`, `zowe config auto-init`, or `zowe config convert-profiles` command, the command creates an entry for a FTP profile in your `zowe.config.json file`.

Alternatively, you can create an FTP profile manually by adding a section that contains the configuration details to your `zowe.config.json` configuration file.

#### Creating an FTP profile with a command

1.  Install the z/OS FTP Plug-in for Zowe CLI.
2.  Create an FTP profile:

    ```
    zowe config init
    ```
3.  If using a non-standard port, set the port number to your FTP connection:

    ```
    zowe config set profiles.zftp.properties.port <port number>
    ```

    - `<port number>`

      Specifies the port number for the instance.
4. If using an insecure connection, set the `secureFtp` value to `false`:

    ```
    zowe config set profiles.zftp.properties.secureFtp false
    ```
    You can now use your profile when you issue commands in the zftp command group.

#### Creating an FTP profile manually

1.  Install the z/OS FTP Plug-in for Zowe CLI.

2. Browse to the directory `C:\Users\<username>\.zowe`.

3. Open the `zowe.config.json` configuration file using a text editor or IDE, such as Visual Studio Code or IntelliJ IDEA.

    :::note
    
    If the file does not exist, issue the following command to create the configuration file:
    ```
    zowe config init --gc
    ```
    
    :::

4. Add code to the "profiles" section as shown in the following example: **[is this code correct? should this code include a `secureFtp` value?]**

    ```
    "Your_ftp_profile": {
      "type": "ftp",
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

5. Save the file.

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

    - `<hostname>`
      
      Specifies the host name for the instance.

    - `<User_ID>`
      
      Specifies your user name to log in to the instance.

    - `<password>`
      
      Specifies your password to log in to the instance.
