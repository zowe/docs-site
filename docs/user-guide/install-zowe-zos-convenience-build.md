# Installing Zowe runtime from a convenience build

You install the Zowe&trade; convenience build by running shell script within a Unix System Services (USS) shell.

1. [Obtaining and preparing the convenience build](#obtaining-and-preparing-the-convenience-build)
2. [Installing the Zowe runtime](#installing-the-zowe-runtime)
	- [Step 1: Locate the install directory](#step-1-locate-the-install-directory)
    - [Step 2: Locate a dataset HLQ to install a SAMPLIB and LOADLIB PDS]()
	- [Step 3: Execute the `zowe-install.sh` script](#step-3-execute-the-zowe-installsh-script)

## Obtaining and preparing the convenience build

The Zowe installation file for Zowe z/OS components are distributed as a PAX file that contains the runtimes and the scripts to install and launch the z/OS runtime. For each release, there is a PAX file named `zowe-v.r.m.pax`, where

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

    c. Navigate to the target directory that you wish to transfer the Zowe PAX file into on z/OS.

    **Note:** After you connect to z/OS and enter your password, you enter into the Unix file system. The following commands are useful:

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

The first install step is to create a USS folder containing the Zowe runtime artefacts.  This is known as the `<RUNTIME_DIR`.

**Follow these steps:**

- [Step 1: Locate the install directory](#step-1:-locate-the-install-directory)
- [Step 3: Execute the `zowe-install.sh` script](#step-3:-install-the-zowe-runtime)

### Step 1: Locate the install directory

Navigate to the directory where the installation archive is extracted. Locate the `/install` directory.

```
  /install
    /zowe-install.sh
```

### Step 2: Choose a runtime USS folder

For Zowe to execute it must be installed into a runtime directory or `<RUNTIME_DIR>`.  This directory will be created during the install process and the user performing the installed must have write permission for the install to succeed.  If you are installing an upgrade of Zowe the runtime directory used should be the existing `<RUNTIME_DIR>` of where the previous Zowe was installed.  Upgrading Zowe is only supported for version 1.8 or higher.  

For an enterprise install of Zowe a `<RUNTIME_DIR>` could be `/usr/lpp/zowe/v1`.  For a user testing Zowe for themselves it could be `~/zowe/v1`.  

### Step 3: Choose a dataset HLQ for the SAMPLIB and LOADLIB

During the install two PDS members are created.  These are not used at runtime and there is a further step needed to promote these to the z/OS execution environment but they contain required JCL and load modules.  The installer needs to know the `<DATA_SET_PREFIX>` into which to create the two PDS members.  

The `SZWESAMP` data set is fixed block 90 samplib containing the following members

Member name | Purpose  
---|---
ZWESECUR | JCL to configure z/OS user IDs and permissions required to run Zowe
ZWESVSTC | JCL to start Zowe 
ZWEXMSTC | JCL to start the Zowe cross memory server
ZWESIP00 | Parmlib member for the cross memory server
ZWEXASTC | Started task JCL for the cross memory Auxillary server
ZWEXMPRG | Console commands to APF authorize the cross memory server load library
ZWEXMSCH | PPT entries required by Cross memory server and its Auxillary address spaces to run in Key(4)

The `SZWEAUTH` data set is a load library containing the following members

Member name | Purpose
---|---
ZWESIS01 | Load module for the Cross memory server
ZWESAUX  | Load module for the Cross memory server's auxillary address space

If a `<DATA_SET_PREFIX>` of `OPENSRC.ZWE` is specified to the installer the PDS members `OPENSRC.ZWE.SZWESAMP` and `OPENSEC.ZWE.SZWEAUTH` will be created.  

### Step 3: Install the Zowe runtime

You install the Zowe runtime by executing the `zowe-install.sh` script passing in the arguments for the USS runtime directory and the prefix for the SAMPLIB and loadlib PDS members.

 ```
    zowe-install.sh -i <RUNTIME_DIR> -h <DATASET_PREFIX>
 ```



In this documentation, the steps of creating the runtime directory and configuring the runtime directory are described separately. The configuration step is the same for a Zowe runtime whether it is installed from a convenience build or from an SMP/E distribution.

**Follow these steps to install Zowe artifacts**

1. Create the USS runtime directory, and the PDS SAMPLIB and LOADLIB.

    With the current directory being the `/install` directory, execute the script `zowe-install.sh` by issuing the following command:

    ```
    zowe-install.sh -I
    ```
   Each time the install script runs, it creates a log file that contains more information. This file is stored in the `/log` directory and is created with a date and time stamp name, for example `/log/2019-02-05-18-08-35.log`. This file is copied across into the runtime folder into which Zowe is installed, and contains useful information to help diagnose problems that may occur during an install.  
   
Follow the instructions in [Configuring the Zowe runtime directory](configure-zowe-runtime.md) to configure the USS runtime directory and to enable the JCL member ZWESVSTC to run as a started task.




