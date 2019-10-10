# Installing Zowe runtime from a convenience build

You install the Zowe&trade; convenience build by running shell script within a Unix System Services (USS) shell.

1. [Obtaining and preparing the convenience build](#obtaining-and-preparing-the-convenience-build)
2. [Installing the Zowe runtime](#installing-the-zowe-runtime)
	- [Step 1: Locate the install directory](#step-1-locate-the-install-directory)
	- [Step 2: Review the `zowe-install.yaml` file](#step-2-review-the-zowe-installyaml-file)
	- [Step 3: Execute the `zowe-install.sh` script](#step-3-execute-the-zowe-installsh-script)

## Obtaining and preparing the convenience build

The Zowe installation file for Zowe z/OS components are distributed as a PAX file that contains the runtimes and the scripts to install and launch the z/OS runtime. For each release, there is a PAX file named `zowe-v.r.m.pax`, where

- `v` indicates the version
- `r` indicates the release number
- `m` indicates the modification number

The numbers are incremented each time a release is created so the higher the numbers, the later the release.

To download the PAX file, open your web browser and click the **Zowe z/OS Components** button on the [Zowe Download](https://zowe.org/#download) website to save it to a folder on your desktop. After you obtain the PAX file, follow the procedures below to verify the PAX file and prepare it to install the Zowe runtime.

**Follow these steps:**

1. Verify the integrity of the PAX file to ensure that the file you download is officially distributed by the Zowe project.

    **Notes:**

    - The commands in the following steps are tested on both Mac OS X V10.13.6 and Ubuntu V16.04 and V17.10.
    - Ensure that you have GPG installed. Click [here](https://www.gnupg.org/) to download and install GPG.
    - The `v.r.m` in the commands of this step is a variable. You must replace it with the actual PAX file version, for example, `0.9.0`.

    **Step 1:  Verify the hash code.**

      Download the hash code file `zowe-v.r.m.pax.sha512` from the [Zowe website](https://projectgiza.org/Downloads/post_download.html). Then, run the following commands to check:

      ```
      (gpg --print-md SHA512 zowe-v.r.m.pax > zowe-v.r.m.pax.sha512.my) && diff zowe-v.r.m.pax.sha512.my zowe-v.r.m.pax.sha512 && echo matched || echo "not match"
      ```

      When you see "matched", it means the PAX file that you download is the same one that is officially distributed by the Zowe project. You can delete the temporary `zowe-v.r.m.pax.sha512.my` file.

      You can also use other commands such as `sha512`, `sha512sum`, or `openssl dgst -sha512` to generate `SHA512` hash code. These hash code results are in a different format from what Zowe provides but the values are the same.

    **Step 2. Verify with signature file.**

      In addition to the SHA512 hash, the hash is also verifiable. This is done by digitally signing the hash text file with a KEY from one of the Zowe developers.

      **Follow these steps:**

      1. Download the signature file `zowe-v.r.m.pax.asc` from [https://zowe.org/Downloads/post_download.html](https://projectgiza.org/Downloads/post_download.html), and download the public key `KEYS` from https://github.com/zowe/release-management/.
      2. Import the public key with the `gpg --import KEYS` command.
      3. If you have never used gpg before, generate keys with the `gpg --gen-key` command.
      4. Sign the downloaded public key with the `gpg --sign-key DC8633F77D1253C3` command.
      5. Verify the file with the `gpg --verify zowe-v.r.m.pax.asc zowe-v.r.m.pax` command.
      6. Optional: You can remove the imported key with the `gpg --delete-key DC8633F77D1253C3` command.

     When you see output similar to the following one, it means the PAX file that you download is the same one that is officially distributed by the Zowe project.

     ```
     gpg: Signature made Tue 14 Aug 2018 08:29:46 AM EDT
     gpg: using RSA key DC8633F77D1253C3
     gpg: Good signature from "Matt Hogstrom (CODE SIGNING KEY) " [full]
     ```

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
      /files
      /install
      /scripts
      ...
   ```

    **Note**: The PAX file will expand into the current directory. A good practice is to keep the installation directory apart from the directory that contains the PAX file.  To do this, you can create a directory such as `/zowe/paxes` that contains the PAX files, and another such as `/zowe/builds`.  Use SFTP to transfer the Zowe PAX file into the `/zowe/paxes` directory, use the `cd` command to switch into `/zowe/builds` and issue the command `pax -ppx -rf ../paxes/<zowe-v.r.m>.pax`.  The `/install` folder will be created inside the `zowe/builds` directory from where the installation can be launched.


## Installing the Zowe runtime

To install Zowe API Mediation Layer, Zowe Application Framework, and z/OS Services, you install the Zowe runtime on z/OS.

**Follow these steps:**

- [Step 1: Locate the install directory](#step-1:-locate-the-install-directory)
- [Step 2: Review the `zowe-install.yaml` file](#step-2:-review-the-`zowe-install.yaml`-file)
- [Step 3: Execute the `zowe-install.sh` script](#step-3:-install-and-configure-the-zowe-runtime)

### Step 1: Locate the install directory

Navigate to the directory where the installation archive is extracted. Locate the `/install` directory.

```
  /install
    /zowe-install.sh
    /zowe-install.yaml
```

### Step 2: Review the `zowe-install.yaml` file

Review the `zowe-install.yaml` file which contains the `install:rootDir` and `install:datasetPrefix` properties that are used by the installation.

`install:rootDir` is the directory that Zowe installs to create a Zowe runtime. The default directory is `~/zowe/v.r.m` where *v* is the Zowe version number, *r* is the release number and *m* is the modification number, for example, 1.0.0 or 1.2.11. The user's home directory is the default value. This ensures that the user who performs the installation has permission to create the directories that are required for the installation. If the Zowe runtime will be maintained by multiple users, it is recommended to use another directory based on your site's conventions.  The directory will be created during the install so it should be empty before the install script `zowe-install.sh` is executed.

`install:datasetPrefix` is a PDS prefix used to create two data sets: `SZWESAMP` which is a fixed block 80 samplib used to store JCL, and `SZWEAUTH` which is a load library.  The default value in `zowe-install.yaml` is `datasetPrefix={userid}.ZWE` where `{userid}` is subsituted by the install script with the current TSO user ID For example, if user `JANEDOE` runs the install script from their TSO OMVS or SSH session, the partitioned data sets `JANEDOC.ZWE.SZWEAUTH` and `JANEDOE.ZWE.SZWESAMP` will be created.  The value of `datasetPrefix` can be changed to match your site's conventions. For example `datasetPrefix=OPENSOURCE.ZOWE` will result in the partitioned data sets `OPENSOURCE.ZOWE.SZWESAMP` and `OPENSOURCE.ZOWE.SZWEAUTH` being created.

You can run the installation process multiple times with different values in the `zowe-install.yaml` file to create separate installations of the Zowe runtime. 

### Step 3: Install and configure the Zowe runtime

You install and configure the Zowe runtime by executing the `zowe-install.sh` script. The `zowe-install.sh` mode performs three steps.

1. Install Zowe runtime directories and files into the `root_dir` directory.  
2. Install MVS artefacts into a PDS load library `SZWEAUTH` and a PDS sample library `SZWESAMP` as specified in the `datasetPrefix` value.  
3. Configure the runtime directory so that an instance of the ZOWESVR STC can be launched which will start the Zowe address spaces. 

It's recommended that you install the Zowe runtime first by running the `zowe-install.sh -I` option that just performs the first installation step to create the runtime directory. Then, configure the runtime directory separately following instructions in [Configuring the Zowe runtime directory](configure-zowe-runtime.md#configuring-the-zowe-runtime-directory). Alternatively, you can both install and configure the Zowe runtime by running a single command `zowe-install.sh` without the `-I` parameter. In this case, ensure that you review [Configuring the Zowe runtime directory](configure-zowe-runtime.md#configuring-the-zowe-runtime-directory) before you run the command `zowe-install.sh`.

In this documentation, the steps of creating the runtime directory and configuring the runtime directory are described separately. The configuration step is the same for a Zowe runtime whether it is installed from a convenience build or from an SMP/E distribution.

**Follow these steps to install Zowe artefacts**

1. Install Zowe creating the USS runtime directory, and the PDS SAMPLIB and LOADLIB

    With the current directory being the `/install` directory, execute the script `zowe-install.sh` by issuing the following command:

    ```
    zowe-install.sh -I
    ```

    **Note:** If you leave off the `-I` parameter, the `zowe-install.sh` script will create and also configure the Zowe runtime directory using the `rootDir:` value. If you choose to do this, make sure that you have reviewed [Configuring the Zowe runtime directory](configure-zowe-runtime.md#configuring-the-zowe-runtime-directory). If you run `zowe-install.sh` without the `-I` parameter the file `zowe-install.yaml` containing parameter values used to drive the configuration will be in the same `/install` directory as location of `zowe-install.sh`.  If you use the `-I` option and configure post install which is the recommended approach the `zowe-install.yaml` file will be in the `scripts/config` directory of the `rootDir:`.

    During execution of `zowe-install.sh` You might receive the following error that the file cannot be executed:

    ```
    zowe-install.sh: cannot execute
    ```

    The error occurs when the install script does not have execute permission. To add execute permission, issue the following command:

    ```
    chmod u+x zowe-install.sh
    ```

    Each time the install script runs, it creates a log file that contains more information. This file is stored in the `/log` directory and is created with a date and time stamp name, for example `/log/2019-02-05-18-08-35.log`. This file is copied across into the runtime folder into which Zowe is installed, and contains useful information to help diagnose problems that may occur during an install.  

2. (Optional) Check prerequisites.

    Before you continue with the configuration of the Zowe runtime, you can check the install condition of the required prerequisites for Zowe. To do this, issue the following command with the current directory being the `/install` directory.

    ```
    zowe-check-prereqs.sh
    ```

    The script writes messages to your terminal window. The results are marked `OK`, `Info`, `Warning` or `Error`. Correct any reported errors and rerun the command to ensure that no errors exist before you run the `zowe-install.sh` script to install the Zowe runtime. The `zowe-check-prereqs.sh` script does not change any settings. You can run it as often as required before you configure the Zowe runtime directory.

3. Configure the Zowe runtime directory.

   For the convenience build, the location of the Zowe runtime directory will be the value of the `install:rootDir` parameter from the `zowe-install.yaml`. Follow the instructions in [Configuring the Zowe runtime directory](configure-zowe-runtime.md) to complete this step.
