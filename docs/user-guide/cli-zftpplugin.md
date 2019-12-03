# z/OS FTP Plug-in for Zowe CLI

The z/OS FTP Plug-in for Zowe&trade; CLI lets you extend Zowe CLI to access z/OS datasets, USS files, and submit JCL. The plug-in uses the z/OS FTP service to achieve the interaction with z/OS.

  - [Use Cases](#use-cases)
  - [Commands](#commands)
  - [Software requirements](#software-requirements)
  - [Installing](#installing)
  - [Creating a user profile](#creating-a-user-profile)

## Use cases

As a z/OS user, you can use the plug-in to perform the following tasks:

  - List, view, rename, or download z/OS dataset or USS file.
  - Upload local file or stdin to z/OS dataset or USS file.
  - List, view or download job status, job spool files.
  - Delete z/OS dataset, USS file, or job.

## Commands

For detailed documentation on commands, actions, and options available in this plug-in, see our Web Help. It is available for download in three formats: a PDF document, an interactive online version, and a ZIP file containing the HTML for the online version.

- <a href="../web_help/index.html" target="_blank">Browse Online</a>
- <a href="../zowe_web_help.zip">Download (ZIP)</a>
- <a href="../CLIReference_Zowe.pdf">Download (PDF)</a>

## Software requirements

Before you install the plug-in, meet the software requirements in [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing

Use one of the following methods to install or update the plug-in:

- [Installing plug-ins from an online registry](cli-installplugins.md#installing-plug-ins-from-an-online-registry)

- [Installing plug-ins from a local package](cli-installplugins.md#installing-plug-ins-from-a-local-package)

## Create a User Profile
You can create a `zftp` user profile to avoid typing your connection details on every command. A `zftp` profile contains the host, port, username, and password for the z/OS you will connect. You can create multiple profiles and switch between them as needed.

**Follow these steps:**
1.  Create a zftp profile:
    ```
    zowe profiles create zftp <profile name> -H <host> -u <user> -p <password> -P <port>
    zowe profiles create zftp <profile name> -H <host> -u <user> -p <password> -P <port> --secure-ftp true
    ```
    The result of the command displays as a success or failure message. You can use your profile when you issue commands in the zftp command group.

**Note:** The option `--secure-ftp true` is strongly recommended, if FTPS (FTP over SSL) is enabled in z/OS FTP service. , It's not SFTP (FTP over SSH).

**Note:** For more information about the syntax, actions, and options, for a profiles create command, open Zowe CLI and issue the following command:

```
zowe profiles create zftp -h
```

