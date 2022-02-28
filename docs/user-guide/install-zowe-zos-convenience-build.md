# Installing Zowe runtime from a convenience build

You install the Zowe&trade; convenience build by obtaining a PAX file for a build and using this to create the Zowe runtime environment.

After you [obtain the PAX file](#obtaining-and-preparing-the-convenience-build), you can take the following steps to complete the installation.

- [Transfer the convenience build to USS and expand its contents](#transfer-the-convenience-build-to-uss-and-expand-its-contents)
- [Update $PATH to include `zwe` command](#update-$PATH-to-include-zwe-command)

## Obtaining and preparing the convenience build

The Zowe installation file for Zowe z/OS components is distributed as a PAX file that contains the runtimes and the scripts to install and launch the z/OS runtime.

For each release, there is a PAX file that is named `zowe-V.v.p.pax`, where

- `V` indicates the Major Version
- `v` indicates the Minor Version
- `p` indicates the Patch Version

The numbers are incremented each time a release is created, so the higher the numbers, the later the release.  For more information about the Zowe release number, see [Understanding the Zowe release](../troubleshoot/troubleshoot-zowe-release.md).

To download the PAX file, open your web browser on the [Zowe Download](https://www.zowe.org/download.html) website, navigate to **Download z/OS Convenience vNext**, and select the button to download a `vNext` convenience build.  

After you have the `zowe-2.0.0*.pax` file, follow these steps.

<!--
1. **(Optional)** Verify the integrity of the PAX file to ensure that the file you download is officially distributed by the Zowe project.  This step is only needed if you are unsure of the provenance of the PAX file and want to ensure that it is an original Zowe release driver.

   Follow the instructions in the **Verify Hash and Signature of Zowe Binary** section on the post-download page `https://d1xozlojgf8voe.cloudfront.net/post_download.html?version=V.v.p` after you download the official build. For example, the post-download page for Version 1.4.0 is [https://d1xozlojgf8voe.cloudfront.net/post_download.html?version=1.4.0](https://d1xozlojgf8voe.cloudfront.net/post_download.html?version=1.4.0).
-->

### Transfer the convenience build to USS and expand its contents

1. Transfer the PAX file to z/OS.

    **Follow these steps:**

    a. Open a terminal in Mac OS/Linux, or command prompt in Windows OS, and navigate to the directory where you downloaded the Zowe PAX file.

    b. Connect to z/OS using SFTP. Issue the following command:

     ```
     sftp <userID@ip.of.zos.box>
     ```

     If SFTP is not available or if you prefer to use FTP, you can issue the following command instead:

     ```
     ftp <userID@ip.of.zos.box>
     bin
     ```

   c. Navigate to the target directory that you want to transfer the Zowe PAX file into on z/OS.

    **Note:** After you connect to z/OS and enter your password, you enter the UNIX file system. The following commands are useful:

    - To see what directory you are in, type `pwd`.
    - To switch directory, type `cd`.
    - To list the contents of a directory, type `ls`.
    - To create a directory, type `mkdir`.

    d. When you are in the directory you want to transfer the Zowe PAX file into, issue the following command:

     ```
     put <zowe-V.v.p>.pax
     ```

    Where _zowe-V.v.p_ is a variable that indicates the name of the PAX file you downloaded.

    **Note:** When your terminal is connected to z/OS through FTP or SFTP, you can prepend commands with `l` to have them issued against your desktop.  To list the contents of a directory on your desktop, type `lls` where `ls` lists contents of a directory on z/OS.

    After the pax file has sucessfully transferred exit your `sftp` or `ftp` session.

2. When the PAX file is transferred open a USS shell. This can either be an ssh terminal, OMVS, iShell, or any other z/OS unix system services command environment. 

   Expand the PAX file by issuing the following command in a USS shell. 

   ```
   pax -ppx -rf <zowe-V.v.p>.pax
   ```

   Where _zowe-V.v.p_ is a variable that indicates the name of the PAX file you downloaded.  When extracting the Zowe convenience build please note you should always include the `-ppx` argument that preserves extended attributes.  


   This will expand to a file structure.

   ```
      /bin
      /components
      /files
      ...
   ```
   This is the Zowe runtime directory, and in referenced as `<RUNTIME_DIR>` throughout the remainder of the documentation.  

   **Note** Zowe version 1 had a script `zowe-install.sh` that created a separate Zowe runtime directory from the expanded contents of the Zowe .pax file.  Zowe v2 no longer has this step.  **The contents of the expanded Zowe .pax file are the Zowe runtime directory.**

### Update $PATH to include `zwe` command

To install and configure Zowe the command `zwe` is provided, which is in the `<RUNTIME_DIR>/bin` folder.  It is recommended that you add this to your `PATH` which will allow you to execute the `zwe` command without needing to fully qualify its location and for the remainder of the documentation when `zwe` command is referenced it is assumed that it has been added to your `PATH`.

To update your path run the command:

```
export PATH=${PATH}:<RUNTIME_DIR>/bin
```
This will update the `PATH` for the current shell.  To make this update persistent you can add the line to your `~/.profile` file, or if you are using a bash shell the `~/.bashProfile` file.  To make the path be updated system wide you can update the `/etc/.profile` file.  

Zowe uses a configuration file `zowe.yaml` to store configuration data that is read by the `zwe` command. Copy the template file `<RUNTIME_DIR>\example-zowe.yaml` file to a new location, such as `/var/lpp/zowe/zowe.yaml` or your home directory `~/.zowe.yaml`.  This will now become your configuration file that contains data used by the `zwe` command at a number of parts of the lifecycle of configuring and starting Zowe.  You will need to modify the `zowe.yaml` file based on your environment. 

The `zwe` command has built in help that can be retrieved with the `-h` suffix.  For example `zwe -h` displays all of the supported commands.  These are broken down into a number of sub-commands.  

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

To execute the `zwe` command the `-c` argument is used to pass the location of a `zowe.yaml` file containing configuration information.  

### Install the MVS data sets

Zowe includes a number of files that are stored in data sets. The command `zwe initialize` is used to create three data sets. The storage requirements are included here.

Library DDNAME | Member Type | Target Volume | Type | Org | RECFM | LRECL | No. of 3390 Trks | No. of DIR Blks
---|---|---|---|---|---|---|---|---|--
SZWESAMP | Samples | ANY | U | PDSE | FB | 80 | 15 | 5
SZWEAUTH | Zowe APF Load Modules | ANY | U | PDSE | U | 0 | 15 | N/A
SZWEEXEC | CLIST copy utilities | ANY | U | PDSE | FB | 80 | 15 | 5

The high level qualifer (or HLQ) for these is specified in the `zowe.yaml` section below: 

```
zowe:
  setup:
    # MVS data set related configurations
    mvs:
      hlq: IBMUSER.ZWEV2
```

You should update `zowe.setup.mvs.hlq` value to match your system.  In a USS shell execute the command `zwe init -c zowe.yaml` which creates the three data sets and copy across their content.  If the data sets already exist specify `--allow-overwritten`.  The command `zwe install -h` can be used to see the full list of parameters. 

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

The next step of the installation is done using the `zwe init` command.  This step is common for installing and configuring Zowe from either a convenience build `.pax` file or from an `SMP/E` distribution, so is described in the chapter **Configuring the z/OS System for Zowe** 

**Move to shared section below as appliable to SMP/E also**

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
