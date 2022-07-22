# Installing Zowe runtime from a convenience build

You install the Zowe&trade; convenience build by obtaining a PAX file and using this to create the Zowe runtime environment.

## Introduction

The Zowe installation file for Zowe z/OS components is distributed as a PAX file that contains the runtimes and the scripts to install and launch the z/OS runtime. You must obtain the PAX file and transfer it to z/OS first. Then, to install, configure and start Zowe, you use the `zwe` command. This command defines help messages, logging options, and more. For details about how to use this command, see the [ZWE Server Command Reference](../appendix/zwe_server_command_reference/zwe/zwe.md).  

The configuration data that is read by the `zwe` command are stored in a YAML configuration file named `zowe.yaml`. You modify the `zowe.yaml` file based on your environment. 

Complete the following steps to install the Zowe runtime. 

## Step 1: Obtain the convenience build

To download the PAX file, open your web browser on the [Zowe Download](https://www.zowe.org/download.html) website, navigate to **Zowe V2 Preview** -> **Convenience build** section, and select the button to download the v2 convenience build.

## Step 2: Transfer the convenience build to USS and expand it

After you download the PAX file, you can transfer it to z/OS and expand its contents.

1. Open a terminal in Mac OS/Linux, or command prompt in Windows OS, and navigate to the directory where you downloaded the Zowe PAX file.

1. Connect to z/OS using SFTP. Issue the following command:

    ```
    sftp <userID@ip.of.zos.box>
    ```

    If SFTP is not available or if you prefer to use FTP, you can issue the following command instead:

    ```
    ftp <userID@ip.of.zos.box>
    bin
    ```

1. Navigate to the target directory that you want to transfer the Zowe PAX file into on z/OS.

    **Note:** After you connect to z/OS and enter your password, you enter the UNIX file system. The following commands are useful:

    - To see what directory you are in, type `pwd`.
    - To switch directory, type `cd`.
    - To list the contents of a directory, type `ls`.
    - To create a directory, type `mkdir`.

1. When you are in the directory you want to transfer the Zowe PAX file into, issue the following command:

    ```
    put <zowe-V.v.p>.pax
    ```

    Where _zowe-V.v.p_ is a variable that indicates the name of the PAX file you downloaded.

    **Note:** When your terminal is connected to z/OS through FTP or SFTP, you can prepend commands with `l` to have them issued against your desktop.  To list the contents of a directory on your desktop, type `lls` where `ls` lists contents of a directory on z/OS.

    After the PAX file has sucessfully transferred, exit your `sftp` or `ftp` session.

1. Open a USS shell to expand the PAX file. This can either be an ssh terminal, OMVS, iShell, or any other z/OS unix system services command environment. 

1. Expand the PAX file by issuing the following command in the USS shell. 

   ```
   pax -ppx -rf <zowe-V.v.p>.pax
   ```

   Where _zowe-V.v.p_ is a variable that indicates the name of the PAX file you downloaded.  When extracting the Zowe convenience build, you must always include the `-ppx` argument that preserves extended attributes.  

  This will expand to a file structure similar to the following one.

   ```
      /bin
      /components
      /files
      ...
   ```
   
   This is the Zowe runtime directory and is referred to as `<RUNTIME_DIR>` throughout this documentation.  

   **Note:** Zowe version 1 had a script `zowe-install.sh` that created a separate Zowe runtime directory from the expanded contents of the Zowe PAX file. Zowe v2 no longer has this step. **In Zowe v2, the contents of the expanded Zowe PAX file are the Zowe runtime directory.**

## Step 3: (Optional) Add the `zwe` command to your PATH

The `zwe` command is provided in the `<RUNTIME_DIR>/bin` directory. You can optionally add this Zowe bin directory to your `PATH` environment variable so you can execute the `zwe` command without having to fully qualify its location. To update your `PATH`, run the following command:

```
export PATH=${PATH}:<RUNTIME_DIR>/bin
```

`<RUNTIME_DIR>` should be replaced with your real Zowe runtime directory path. This will update the `PATH` for the current shell. To make this update persistent, you can add the line to your `~/.profile` file, or the `~/.bashProfile` file if you are using a bash shell. To make this update system wide, you can update the `/etc/.profile` file. Once the PATH is updated, you can execute the `zwe` command from any USS directory. For the remainder of the documentation when `zwe` command is referenced, it is assumed that it has been added to your `PATH`. 

The `zwe` command has built in help that can be retrieved with the `-h` suffix. For example, type `zwe -h` to display all of the supported commands. These are broken down into a number of sub-commands.  

```
zwe -h
 ...
Available sub-command(s):
  - certificate
  - components
  - init
  - install
  - internal
  - sample
  - start
  - stop
  - version
```

## Step 4: Copy the zowe.yaml configuration file to preferred location

Copy the template file `<RUNTIME_DIR>/example-zowe.yaml` file to a new location, such as `/var/lpp/zowe/zowe.yaml` or your home directory `~/.zowe.yaml`. This will become your configuration file that contains data used by the `zwe` command at a number of parts of the lifecycle of configuring and starting Zowe. You will need to modify the `zowe.yaml` file based on your environment. 

When you execute the `zwe` command, the `-c` argument is used to pass the location of a `zowe.yaml` file.  

:::tip
To avoid passing `--config` or `-c` to every `zwe` commands, you can define `ZWE_CLI_PARAMETER_CONFIG` environment variable points to location of zowe.yaml.

For example, after defining

```
export ZWE_CLI_PARAMETER_CONFIG=/path/to/my/zowe.yaml
```

, you can simply type `zwe install` instead of full command `zwe install -c /path/to/my/zowe.yaml`.
:::

## Step 5: Install the MVS data sets

After you extract the Zowe convenience build, you can run the [`zwe install` command](../appendix/zwe_server_command_reference/zwe/zwe-install.md) to install MVS data sets.

### About the MVS data sets

Zowe includes a number of files that are stored in the following three data sets. See the following table for the storage requirements.

Library DDNAME | Member Type | Target Volume | Type | Org | RECFM | LRECL | No. of 3390 Trks | No. of DIR Blks
---|---|---|---|---|---|---|---|---
SZWESAMP | Samples | ANY | U | PDSE | FB | 80 | 15 | 5
SZWEAUTH | Zowe APF Load Modules | ANY | U | PDSE | U | 0 | 15 | N/A
SZWEEXEC | CLIST copy utilities | ANY | U | PDSE | FB | 80 | 15 | 5

The `SZWESAMP` data set contains the following members.

Member name | Purpose
---|---
ZWESECUR | JCL member to configure z/OS user IDs and permissions required to run Zowe
ZWENOSEC | JCL member to undo the configuration steps performed in ZWESECUR and revert z/OS environment changes.
ZWEKRING | JCL member to configure a z/OS keyring containing the Zowe certificate
ZWENOKYR | JCL member to undo the configuration steps performed in ZWEKRING
ZWESLSTC | JCL to start Zowe
ZWEXMSTC | JCL to start the Zowe cross memory server
ZWESIP00 | Parmlib member for the cross memory server
ZWESASTC | Started task JCL for the cross memory Auxiliary server
ZWESIPRG | Console commands to APF authorize the cross memory server load library
ZWESISCH | PPT entries required by Cross memory server and its Auxiliary address spaces to run in Key(4)
ZWECSVSM | JCL Member to create the VSAM data set for the caching service 

The `SZWEAUTH` data set is a load library containing the following members.

Member name | Purpose
---|---
ZWELNCH | The Zowe launcher that controls the startup, restart and shutdown of Zowe's address spaces
ZWESIS01 | Load module for the cross memory server
ZWESAUX  | Load module for the cross memory server's auxiliary address space

The `SZWEEXEC` data set contains few utilities used by Zowe.

### Procedure

The high level qualifer (or HLQ) for these data sets is specified in the `zowe.yaml` section below. Ensure that you update the `zowe.setup.dataset.prefix` value to match your system.  

```
zowe:
  setup:
    # MVS data set related configurations
    dataset:
      prefix: IBMUSER.ZWEV2
```

To create and install the MVS data sets, use the command `zwe install`.
1. In a USS shell, execute the command `zwe install -c /path/to/zowe.yaml`. This creates the three data sets and copy across their content.
2. If the data sets already exist, specify `--allow-overwritten`.  
3. To see the full list of parameters, execute the command `zwe install -h`. 

A sample run of the command is shown below using default values.  

```
#>zwe install -c ./zowe.yaml
===============================================================================
>> INSTALL ZOWE MVS DATA SETS

Create MVS data sets if they are not exist
Creating Zowe sample library - IBMUSER.ZWEV2.SZWESAMP
Creating Zowe authorized load library - IBMUSER.ZWEV2.SZWEAUTH
Creating Zowe executable utilities library - IBMUSER.ZWEV2.SZWEEXEC

Copy files/SZWESAMP/ZWESIPRG to IBMUSER.ZWEV2.SZWESAMP
...
Copy components/launcher/samplib/ZWESLSTC to IBMUSER.ZWEV2.SZWESAMP
Copy components/launcher/bin/zowe_launcher to IBMUSER.ZWEV2.SZWEAUTH
...
Copy components/zss/SAMPLIB/ZWESISCH to IBMUSER.ZWEV2.SZWESAMP(ZWESISCH)
...
Copy components/zss/LOADLIB/ZWESAUX to IBMUSER.ZWEV2.SZWEAUTH

-------------------------------------------------------------------------------
>> Zowe MVS data sets are installed successfully.
#>
```

## Next steps

You successfully installed Zowe from the convenience build! However, before you start Zowe, you must complete several required configurations. Next, go to [Initialize the z/OS system and permissions](initialize-zos-system.md) to initialize your z/OS system for Zowe first. 
