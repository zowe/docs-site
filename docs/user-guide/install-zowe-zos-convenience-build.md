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

   **Note**Zowe version 1 had a script `zowe-install.sh` that created a separate Zowe runtime directory from the expanded contents of the Zowe .pax file.  Zowe v2 no longer has this step.  **The contents of the expanded Zowe .pax file are the Zowe runtime directory.**

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

<TODO> End section here

<TODO> Copy these to another section as they are applicable to both convenience build and SMP/E

## Move to shared section below

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

<TODO>
Document
ZWEEXEC
PARMLIB
JCLLIB
CUSTAUTH
<TODO>

.

### Initialize the z/OS data sets



<!--
#### Step 3a: Choose a log directory (optional)

By default, during installation and configuration, various logs will be created in `/global/zowe/logs` if it is writable, or `~/zowe/logs`. If neither of these directories exists, or is writable by the user who installs Zowe, or you want to override and provide your own directory that contains logs, you can specify this with the `-l` parameter.

Next, you can install the Zowe runtime via different methods.

### Step 4 (Method 1): Install the Zowe runtime using shell script

You install the Zowe runtime by executing the `zowe-install.sh` script passing in the arguments for the USS runtime directory and the prefix for the SAMPLIB and loadlib PDS members.

 ```
    zowe-install.sh -i <RUNTIME_DIR> -h <DATASET_PREFIX> [-l <LOG_DIR>]
 ```

In this documentation, the steps of creating the runtime directory and configuring the runtime directory are described separately. The configuration step is the same for a Zowe runtime whether it is installed from a convenience build or from an SMP/E distribution.

<iframe class="embed-responsive-item" id="youtubeplayer" title="Zowe overview demo" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/fYdVjk1VA4c" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"> </iframe>
-->


<!--
### Step 4 (Method 2): Install the Zowe runtime using z/OSMF Workflow
<TODO>

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
-->

<!--
The command `zwe init` is used to initialize the z/OS environment.  `zwe init -h` will display the sub-commands for system initializtion.  

```
zwe init -h
  ...
Available sub-command(s):
  - apfauth
  - certificate
  - mvs
  - security
  - stc
  - vsam
```

To execute the `zwe` command the `-c` argument is used to pass the location of a `zowe.yaml` file containing configuration information.  For example the command 

```
`zwe init mvs -c ~/zowe.yaml` 
```

will perform the initialization of the MVS datasets.  

Running `zwe init -c ~/.zowe.yaml` will perform all of the sub commands which covers `apfauth`, `certificate`, `mvs`, `security`, `stc`, and `vsam`.

Some of the sub commands for initialization only need to be performed the first time Zowe is installed into a z/OS environment (such as `zwe init security` or `zwe init certificate`) while others should be performed each time Zowe is updated (such as `zwe init mvs`).  

System programmers have the choice of using `zwe init` under USS to manage their Zowe installation, or else using JCL and TSO commands directly.  

### Initialize the MVS data sets

During installation, a number of data sets are created. The command `zwe init mvs` will read values from the `zowe.yaml` file under the section `zowe.setup.mvs` that specify the data set names.  You should update these to match your system.  

```
zowe:
  setup:
    # MVS data set related configurations
    mvs:
      hlq: IBMUSER.ZWEV2
      proclib: USER.PROCLIB
      parmlib: IBMUSER.ZWEV2.CUST.PARMLIB
      jcllib: IBMUSER.ZWEV2.CUST.JCLLIB
      authLoadlib: 
      authPluginLib: IBMUSER.ZWEV2.CUST.ZWESAPL
```

For the following example I have changed `IBMUSER` to `WINCHJ`.  




The storage requirements are included here.

Library DDNAME | Member Type | YAML argument | Target Volume | Type | Org | RECFM | LRECL | No. of 3390 Trks | No. of DIR Blks
---|---|---|---|---|---|---|---|---|--
SZWESAMP | Samples | zowe.setup.mvs.hlq | ANY | U | PDSE | FB | 80 | 15 | 5
SZWEAUTH | Zowe APF Load Modules| zowe.setup.mvs.hlq	| ANY | U | PDSE | U | 0 | 15 | N/A
SZWEEXEC | CLIST copy utilities| zowe.setup.mvs.hlq  | ANY | U | PDSE | FB | 80 | 15 | 5
JCLLIB | Custome JCL Library| zowe.setup.mvs.jcllib |ANY | U | PDSE | FB | 80 | 15 | 5
PARMLIB | PARMLIB members | zowe.setup.mvs.parmlib | ANY | U | PDSE | FB | 80 | 15 | 5
CUSTAUTH | Customer APF Load Modules | zowe.setup.mvs.authLoadlib | ANY | U | PDSE | U | 0 | 15 | N/A

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

<TODO>
Document
ZWEEXEC
PARMLIB
JCLLIB
CUSTAUTH
<TODO>

.


-->