# Installing Zowe runtime from a convenience build

You install the Zowe&trade; convenience build by obtaining a PAX file for a build and using this to create the Zowe runtime environment.

After you [obtain the PAX file](#obtaining-and-preparing-the-convenience-build), you can take the following steps to complete the installation.

- [Step 1: Locate the install directory](#step-1-locate-the-install-directory)
- [Step 2: Choose a runtime USS folder](#step-2-choose-a-runtime-uss-folder)
- [Step 3: Choose a dataset HLQ for the SAMPLIB and LOADLIB](#step-3-choose-a-dataset-hlq-for-the-samplib-and-loadlib)
- [Step 4 (Method 1): Install the Zowe runtime using shell script](#step-4-method-1-install-the-zowe-runtime-using-shell-script)
- [Step 4 (Method 2): Install the Zowe runtime using z/OSMF Workflow](#step-4-method-2-install-the-zowe-runtime-using-zosmf-workflow)

## Obtaining and preparing the convenience build

The Zowe installation file for Zowe z/OS components is distributed as a PAX file that contains the runtimes and the scripts to install and launch the z/OS runtime.

For each release, there is a PAX file that is named `zowe-V.v.p.pax`, where

- `V` indicates the Major Version
- `v` indicates the Minor Version
- `p` indicates the Patch Version

The numbers are incremented each time a release is created, so the higher the numbers, the later the release.  For more information about the Zowe release number, see [Understanding the Zowe release](../troubleshoot/troubleshoot-zowe-release.md).

To download the PAX file, open your web browser and click the **Zowe z/OS Convenience build** button on the [Zowe Download](https://www.zowe.org/download.html) website to save it to a folder on your desktop.

After you have the `zowe-V.v.p.PAX` file, follow these steps.

1. **(Optional)** Verify the integrity of the PAX file to ensure that the file you download is officially distributed by the Zowe project.  This step is only needed if you are unsure of the provenance of the PAX file and want to ensure that it is an original Zowe release driver.

   Follow the instructions in the **Verify Hash and Signature of Zowe Binary** section on the post-download page `https://d1xozlojgf8voe.cloudfront.net/post_download.html?version=V.v.p` after you download the official build. For example, the post-download page for Version 1.4.0 is [https://d1xozlojgf8voe.cloudfront.net/post_download.html?version=1.4.0](https://d1xozlojgf8voe.cloudfront.net/post_download.html?version=1.4.0).

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
     put <zowe-V.v.p>.pax
     ```

    Where _zowe-V.v.p_ is a variable that indicates the name of the PAX file you downloaded.

    **Note:** When your terminal is connected to z/OS through FTP or SFTP, you can prepend commands with `l` to have them issued against your desktop.  To list the contents of a directory on your desktop, type `lls` where `ls` lists contents of a directory on z/OS.

3. When the PAX file is transferred, expand the PAX file by issuing the following command in an SSH session:

   ```
   pax -ppx -rf <zowe-V.v.p>.pax
   ```

   Where _zowe-V.v.p_ is a variable that indicates the name of the PAX file you downloaded.


   This will expand to a file structure.

   ```
      /bin
      /files
      /install
      /scripts
      ...
   ```

    **Note**: The PAX file will expand into the current directory. A good practice is to keep the installation directory apart from the directory that contains the PAX file.  To do this, you can create a directory such as `/zowe/paxes` that contains the PAX files, and another such as `/zowe/builds`.  Use SFTP to transfer the Zowe PAX file into the `/zowe/paxes` directory, use the `cd` command to switch into `/zowe/builds` and issue the command `pax -ppx -rf ../paxes/<zowe-V.v.p>.pax`.  The `/install` folder will be created inside the `zowe/builds` directory from where the installation can be launched.

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
ZWEKRING | JCL member to configure a z/OS keyring containing the Zowe certificate
ZWENOKYR | JCL member to undo the configuration steps performed in ZWEKRING
ZWESVSTC | JCL to start Zowe
ZWEXMSTC | JCL to start the Zowe cross memory server
ZWESIP00 | Parmlib member for the cross memory server
ZWESASTC | Started task JCL for the cross memory Auxiliary server
ZWESIPRG | Console commands to APF authorize the cross memory server load library
ZWESISCH | PPT entries required by Cross memory server and its Auxiliary address spaces to run in Key(4)

The `SZWEAUTH` data set is a load library containing the following members.

Member name | Purpose
---|---
ZWESIS01 | Load module for the cross memory server
ZWESAUX  | Load module for the cross memory server's auxiliary address space

#### Step 3a: Choose a log directory (optional)

By default, during installation and configuration, various logs will be created in `/global/zowe/logs` if it is writable, or `~/zowe/logs`. If neither of these directories exists, or is writable by the user who installs Zowe, or you want to override and provide your own directory that contains logs, you can specify this with the `-l` parameter.

Next, you can install the Zowe runtime via different methods.

### Step 4 (Method 1): Install the Zowe runtime using shell script

You install the Zowe runtime by executing the `zowe-install.sh` script passing in the arguments for the USS runtime directory and the prefix for the SAMPLIB and loadlib PDS members.

 ```
    zowe-install.sh -i <RUNTIME_DIR> -h <DATASET_PREFIX> [-l <LOG_DIR>]
 ```

In this documentation, the steps of creating the runtime directory and configuring the runtime directory are described separately. The configuration step is the same for a Zowe runtime whether it is installed from a convenience build or from an SMP/E distribution.

### Step 4 (Method 2): Install the Zowe runtime using z/OSMF Workflow

A z/OSMF workflow provides the ability to encapsulate a task as a set of dependent steps. These can be divided across different areas of an organization and can form the basis for the automated auditable processes.

z/OSMF workflows consist of a workflow definition that users then operate and manage as workflow tasks. z/OSMF Workflow tasks can help to guide the activities of system programmers, security administrators, and others who are responsible for managing the configuration of the system.  For more information on z/OSMF workflows, see [z/OS 2.2 workflows](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.2.0/com.ibm.zosmfworkflows.help.doc/izuWFhpAboutWorkflows.html), [z/OS 2.3 workflows](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zosmfworkflows.help.doc/izuWFhpAboutWorkflows.html), and [z/OS 2.4 workflows](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.4.0/com.ibm.zosmfworkflows.help.doc/izuWFhpAboutWorkflows.html).

Zowe provides a z/OSMF workflow definition that can be used to create a runtime environment from the Zowe convenience build. Register and execute the z/OSMF workflow to create a runtime environment with the z/OSMF web interface.

Perform the following steps to register and execute the Zowe runtime installation workflow in the z/OSMF web interface:

 1.	Log in to the z/OSMF web interface.
 2.	Select **Workflows** from the navigation tree.
 3.	Select **Create Workflow** from the **Actions** menu.
 4.	Enter the complete path to the workflow definition file in the **Workflow Definition field**.
    -  The path to the workflow definition file is `<extracted_pax_folder>/files/workflows/ZWEWRF04.xml file.`
 5. **(Optional)** Enter the path to the customized variable input file that you prepared in advance.
    - The path to the variable input file is located is `<extracted_pax_folder>/files/workflows/ZWEWRF04.properties file.`
    - Create a copy of the variable input file. Modify the file as necessary according to the built-in comments. Set the field to the path where the new file is located. When you execute the workflow, the values from the variable input file override the workflow variables default values.
7.	Select the system where you want to execute the workflow.
8.	Select **Next**.
9.	Specify the unique workflow name.
10.Select or enter an Owner Use ID and select **Assign all steps to owner user ID**.

11. Select **Finish**.

    The workflow is registered in z/OSMF and ready to execute.

11. Select the workflow that you registered from the workflow list.
12. Execute the steps in order. The following steps are displayed that are ready to execute manually:
    - **Define Variables**
       - Define the values for variables for the convenience build runtime installation.
    - **Allocate ZFS data set**
       - Execute the step to allocate the zFS data set for the Zowe USS.
    - **Zowe make dir**
       - Execute the step create a directory for the Zowe USS file system.
    - **Mount ZFS**
       - Execute the step to mount the zFS data set to the created directory
    - **Set Mountpoint Owner**
       - Execute the step to sets the user who executes the step as the owner of the mountpoint.
      - **Run install script**
        Execute the step executes the Zowe convenience build install script.
14.	Perform the following steps to execute each step individually:
    1.	Double-click the title of the step.
    2.	Select the **Perform** tab.
    3.	Review the step contents and update the input values as required.
    4.	Select **Next**.
    5.	Repeat the previous two steps to complete all items until the option Finish is available.
    6.	Select **Finish**.

For general information about how to execute z/OSMF workflow steps, watch the [z/OSMF Workflows Tutorial](https://www.youtube.com/watch?v=KLKi7bhKBlE&feature=youtu.be).

After you execute each step, the step is marked as Complete. The workflow is executed.

## Next steps

For a z/OS system where you install Zowe 1.8 or later for the first time, follow the instructions in [Stage 3: Configure the Zowe runtime](install-zos.md#stage-3-configure-the-zowe-runtime) that describes how to [configure the z/OS environment](configure-zos-system.md) and [create a keystore directory](configure-certificates.md).

If you have previously installed Zowe 1.8 or later, then you already have an instance directory that needs to be updated. If you have not installed Zowe 1.8 or later before, you will need to create an instance directory to be able to launch Zowe. For instructions, see [Creating and configuring the Zowe instance directory](configure-instance-directory.md).

Zowe has two started tasks that need to be installed and configured ready to be started.  These are the Zowe server, see [Installing the Zowe started task (ZWESVSTC)](configure-zowe-server.md) and the Zowe cross memory server, see [Installing and configuring the Zowe cross memory server (ZWESISTC)](configure-xmem-server.md).




