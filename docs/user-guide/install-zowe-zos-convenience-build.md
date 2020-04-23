# Installing Zowe runtime from a convenience build

You install the Zowe&trade; convenience build by running shell script within a UNIX System Services (USS) shell.

## Obtaining and preparing the convenience build

The Zowe installation file for Zowe z/OS components is distributed as a PAX file that contains the runtimes and the scripts to install and launch the z/OS runtime. For each release, there is a PAX file named `zowe-v.r.m.pax`, where

- `v` indicates the version
- `r` indicates the release number
- `m` indicates the modification number

The numbers are incremented each time a release is created so the higher the numbers, the later the release.

To download the PAX file, open your web browser and click the **Zowe z/OS Components** button on the [Zowe Download](https://zowe.org/#download) website to save it to a folder on your desktop. After you download the PAX file, follow the instructions to verify the PAX file and prepare it to install the Zowe runtime.

**Follow these steps:**

1. Verify the integrity of the PAX file to ensure that the file you download is officially distributed by the Zowe project. 
   
   Follow the instructions in the **Verify Hash and Signature of Zowe Binary** section on the post-download page `https://d1xozlojgf8voe.cloudfront.net/post_download.html?version=v.r.m` after you download the official build. For example, the post-download page for Version 1.4.0 is [https://d1xozlojgf8voe.cloudfront.net/post_download.html?version=1.4.0](https://d1xozlojgf8voe.cloudfront.net/post_download.html?version=1.4.0).

2. Transfer the PAX file to z/OS.

    **Follow these steps:**

    a. Open a terminal in Mac OS/Linux, or command prompt in Windows OS, and navigate to the directory where you downloaded the Zowe PAX file.

    b. Connect to z/OS using SFTP. Issue the following command:

     ```
     sftp <userID@ip.of.zos.box>
     ```

     If SFTP is not available or if you prefer to use FTP, you can issue the following command instead:

     ```
     ftp <userID@ip.of.zos.box>
     ```

     **Note:** When you use FTP, switch to binary file transfer mode by issuing the following command:

     ```
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
     put <zowe-v.r.m>.pax
     ```

    Where _zowe-v.r.m_ is a variable that indicates the name of the PAX file you downloaded.

    **Note:** When your terminal is connected to z/OS through FTP or SFTP, you can prepend commands with `l` to have them issued against your desktop.  To list the contents of a directory on your desktop, type `lls` where `ls` lists contents of a directory on z/OS.  

3. When the PAX file is transferred, expand the PAX file by issuing the following command in an SSH session:

   ```
   pax -ppx -rf <zowe-v.r.m>.pax
   ```  

   Where _zowe-v.r.m_ is a variable that indicates the name of the PAX file you downloaded.


   This will expand to a file structure.

   ```
      /bin
      /files
      /install
      /scripts
      ...
   ```

    **Note**: The PAX file will expand into the current directory. A good practice is to keep the installation directory apart from the directory that contains the PAX file.  To do this, you can create a directory such as `/zowe/paxes` that contains the PAX files, and another such as `/zowe/builds`.  Use SFTP to transfer the Zowe PAX file into the `/zowe/paxes` directory, use the `cd` command to switch into `/zowe/builds` and issue the command `pax -ppx -rf ../paxes/<zowe-v.r.m>.pax`.  The `/install` folder will be created inside the `zowe/builds` directory from where the installation can be launched.

## Installing the Zowe runtime

The first installation step is to create a USS folder that contains the Zowe runtime artifacts.  This is known as the `<RUNTIME_DIR>`.

### Step 1: Locate the install directory

Navigate to the directory where the installation archive is extracted. Locate the `/install` directory.

```
  /install
    /zowe-install.sh
```

### Step 2: Choose a runtime USS folder

For Zowe to execute, it must be installed into a runtime directory or `<RUNTIME_DIR>`.  This directory will be created during the installation process and the user who performs the installation must have write permission for the installation to succeed.  

If you are installing an upgrade of Zowe, the runtime directory used should be the existing `<RUNTIME_DIR>` of where the previous Zowe was installed.  Upgrading Zowe is only supported for Version 1.8 or later.  

For an enterprise installation of Zowe, a `<RUNTIME_DIR>` could be `/usr/lpp/zowe/v1`.  For users who test Zowe for themselves, it could be `~/zowe/v1`.  

### Step 3: Choose a dataset HLQ for the SAMPLIB and LOADLIB

During installation, two PDS data sets are created: the `SZWESAMP` data set and the `SZWEAUTH` data set.  These are not used at runtime and there is a further step needed to promote these to the z/OS execution environment but they contain required JCL and load modules. 

You must know the `<DATA_SET_PREFIX>` into which to create the `SZWESAMP` and the `SZWEAUTH` PDS data sets.  If a `<DATA_SET_PREFIX>` of `OPENSRC.ZWE` is specified, the PDS data sets `OPENSRC.ZWE.SZWESAMP` and `OPENSRC.ZWE.SZWEAUTH` will be created during installation.  The storage requirements are included here.

Library DDNAME | Member Type | Target Volume | Type | Org | RECFM | LRECL | No. of 3390 Trks | No. of DIR Blks
---|---|---|---|---|---|---|---|---
SZWEAUTH | APF Load Modules	| ANY | U | PDSE | U | 0 | 15 | N/A
SZWESAMP | Samples | ANY | U | PDSE | FB | 80 | 15 | 5

The `SZWESAMP` data set contains the following members.

Member name | Purpose  
---|---
ZWESECUR | JCL member to configure z/OS user IDs and permissions required to run Zowe
ZWENOSEC | JCL member to undo the configuration steps performed in ZWESECUR and revert z/OS environment changes.  
ZWESVSTC | JCL to start Zowe 
ZWEXMSTC | JCL to start the Zowe cross memory server
ZWESIP00 | Parmlib member for the cross memory server
ZWESASTC | Started task JCL for the cross memory Auxillary server
ZWESIPRG | Console commands to APF authorize the cross memory server load library
ZWESISCH | PPT entries required by Cross memory server and its Auxiliary address spaces to run in Key(4)

The `SZWEAUTH` data set is a load library containing the following members.

Member name | Purpose
---|---
ZWESIS01 | Load module for the cross memory server
ZWESAUX  | Load module for the cross memory server's auxiliary address space

#### Step 3a: Choose a log directory (optional) 

By default during install and configure various logs will be created in `/global/zowe/logs`, if it is writable, or `~/zowe/logs`. If neither of these directories exists, or is writable by the installing user, or you wish to override and provide your own directory as the place that logs go you can specify this with the `-l` parameter.

### Step 4: Install the Zowe runtime

You install the Zowe runtime by executing the `zowe-install.sh` script passing in the arguments for the USS runtime directory and the prefix for the SAMPLIB and loadlib PDS members.

 ```
    zowe-install.sh -i <RUNTIME_DIR> -h <DATASET_PREFIX> [-l <LOG_DIR>]
 ```

In this documentation, the steps of creating the runtime directory and configuring the runtime directory are described separately. The configuration step is the same for a Zowe runtime whether it is installed from a convenience build or from an SMP/E distribution.

## Next steps

For a z/OS system where you install Zowe 1.8 or later for the first time, follow the instructions in [Stage 3: Configure the Zowe runtime](install-zos.md#stage-3-configure-the-zowe-runtime) that describes how to [configure the z/OS environment](configure-zos-system.md) and [create a keystore directory](configure-certificates.md).  

If you have previously installed Zowe 1.8 or later, then you already have an instance directory that needs to be updated. If you have not installed Zowe 1.8 or later before, you will need to create an instance directory to be able to launch Zowe. For instructions, see [Creating and configuring the Zowe instance directory](configure-instance-directory.md).

Zowe has two started tasks that need to be installed and configured ready to be started.  These are the Zowe server, see [Installing the Zowe started task (ZWESVSTC)](configure-zowe-server.md) and the Zowe cross memory server, see [Installing and configuring the Zowe cross memory server (ZWESISTC)](configure-xmem-server.md).




