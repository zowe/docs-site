# Installing Zowe on z/OS 

To install Zowe on z/OS,  there are two parts. The first part is the Zowe runtime that consists of three components: Zowe Application Framework, z/OS Explorer Services, and Zowe API Mediation Layer. The second part is the Zowe Cross Memory Server. This is an authorized server application that provides privileged services to Zowe in a secure manner. 

Follow the instructions in this topic to obtain the installation file for z/OS runtime components and run the installation scripts. 

1. [Obtaining and preparing the installation file](#obtaining-and-preparing-the-installation-file)
2. [Prerequisites](#prerequisites)
3. [Installing the Zowe runtime on z/OS](#installing-the-zowe-runtime-on-zos)
    - [How the install script `zowe-install.sh` works](#how-the-install-script-zowe-installsh-works)   
4. [Starting and stopping the Zowe runtime on z/OS](#starting-and-stopping-the-zowe-runtime-on-zos)        
    - [Starting the ZOWESVR PROC](#starting-the-zowesvr-proc)
    - [Stopping the ZOWESVR PROC](#stopping-the-zowesvr-proc)  
5. [Installing the Zowe Cross Memory Server on z/OS](#installing-the-zowe-cross-memory-server-on-zos)
    - [Manually installing the Zowe Cross Memory Server](#manually-installing-the-zowe-cross-memory-server)
    - [Scripted install of the Zowe Cross Memory Server](#scripted-install-of-the-zowe-cross-memory-server)
6. [Starting and stopping the Zowe Cross Memory Server on z/OS](#starting-and-stopping-the-zowe-cross-memory-server-on-zos)
7. [Verifying installation](#verifying-installation)        
8. [Looking for troubleshooting help?](#looking-for-troubleshooting-help)

## Obtaining and preparing the installation file

The Zowe installation file for Zowe z/OS components are distributed as a PAX file that contains the runtimes and the scripts to install and launch the z/OS runtime. For each release, there is a PAX file named `zowe-v.r.m.pax`, where

- `v` indicates the version
- `r` indicates the release number
- `m` indicates the modification number

The numbers are incremented each time a release is created so the higher the numbers, the later the release. 

To download the PAX file, open your web browser and click the *DOWNLOAD Zowe z/OS Components* button on the [Zowe Download](https://zowe.org/download/) website to save it to a folder on your desktop. After you obtain the PAX file, follow the procedures below to verify the PAX file and prepare it to install the Zowe runtime.

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

      1. Download the signature file `zowe-v.r.m.pax.asc` from [https://projectgiza.org/Downloads/post_download.html](https://projectgiza.org/Downloads/post_download.html), and download the public key `KEYS` from https://github.com/zowe/release-management/.
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

## Prerequisites

- Before you start the installation on z/OS, ensure that your environment meets the necessary prerequisites that are described in  [System requirements](systemrequirements.md).

<!--- - The user ID that is used to perform the installation must have authority to set the ``'-a'`` extattr flag. This requires a minimum of read access to the BPX.FILEATTR.APF resource profile in the RACF CLASS if you use RACF. It is not essential for this access to be enabled before you run the `zowe-install.sh` script that installs Zowe runtime on z/OS. However, this access must be enabled before you run the `zowe-runtime-authorize.sh` script. --->

- The user ID that is used to perform the installation must have authority to read the z/OSMF keyring. For how to check the name of the keyring and grant read access to the keyring, see the [Trust z/OSMF certificate](../extend/extend-apiml/api-mediation-security.md#zowe-runtime-on-z-os) topic.

## Installing the Zowe runtime on z/OS

To install Zowe API Mediation Layer, Zowe Application Framework, and z/OS Services, you install the Zowe runtime on z/OS.

 **Follow these steps:**

1. Navigate to the directory where the installation archive is extracted. Locate the `/install` directory.

    ```
         /install
            /zowe-install.sh
            /zowe-install.yaml
    ```

2. Review the `zowe-install.yaml` file which contains the following properties:

    - `install:rootDir` is the directory that Zowe installs to create a Zowe runtime. The default directory is `~/zowe/v.r.m` where *v* is the Zowe version number, *r* is the release number and *m* is the modification number,for example, 1.0.0 or 1.2.11 . The user's home directory is the default value. This ensures that the user who performs the installation has permission to create the directories that are required for the installation. If the Zowe runtime will be maintained by multiple users, it is recommended to use another directory, such as `/var/zowe/v.r.m`.

        You can run the installation process multiple times with different values in the `zowe-install.yaml` file to create separate installations of the Zowe runtime. Ensure that the directory where Zowe will be installed is empty. The install script exits if the directory is not empty and creates the directory if it does not exist.

    - Zowe API Mediation Layer has three HTTPS ports, one for each micro-service.

    - z/OS Services has HTTPS ports for the jobs and the data sets microservices.

    - z/OS desktop apps has three ports for each of its explorer apps

    - The zlux-server has two ports: the HTTPS port used by the Zowe Application Server, and an HTTP port that is used by the ZSS Server.

    **Example:**

    ```yaml
    install:
     rootDir=/var/zowe/1.0.0

    api-mediation:
      catalogPort=7552
      discoveryPort=7553
      gatewayPort=7554
      externalCertificate=
      externalCertificateAlias=
      externalCertificateAuthorities=
      verifyCertificatesOfServices=true
      enableSso=false
      zosmfKeyring=IZUKeyring.IZUDFTL
      zosmfUser=IZUSVR

    zos-services:
      jobsAPIPort=8545
      mvsAPIPort=8547

    zowe-desktop-apps:
      jobsExplorerPort=8546
      mvsExplorerPort=8548
      ussExplorerPort=8550
    ```

    **Notes:**
    -  If all of the default port values are acceptable, the ports do not need to be changed. To allocate ports, ensure that the ports are not in use for the Zowe runtime servers.
    - Comments are not supported in the YAML file, apart from lines starting with '#' in column one.

3. Determine which ports are not available.

    a. Display a list of ports that are in use with the following command:

      ```
      TSO NETSTAT
      ```

    b. Display a list of reserved ports with the following command:

      ```
      TSO NETSTAT PORTLIST
      ```

      The `zowe-install.yaml` also contains the telnet and SSH port with defaults of 23 and 22.  If your z/OS LPAR is using different ports, edit the values. This allows the TN3270 terminal desktop application to connect as well as the VT terminal desktop application. 
      
      **Note:** Unlike the ports needed by the Zowe runtime for its Zowe Application Framework and z/OS Services which must be unused, the terminal ports are expected to be in use.

      ```
      # Ports for the TN3270 and the VT terminal to connect to
      terminals:
          sshPort=22
          telnetPort=23
      ```
      
4. Select the ZOWESVR PROCLIB member.

    The `zowe-install.yaml` file contains the dataset name and member name of the ZOWESVR JCL to be used to run Zowe.  

    **Example:**

    ```
    # started task JCL member for Zowe job
    zowe-server-proclib:
    # dsName=SYS1.PROCLIB   
      dsName=auto
      memberName=ZOWESVR
    ```
    **Follow these steps:**

    a. Specify the dataset name of the PROCLIB member you want to use with the `dsName` tag.  For example,

     ```
     dsName=user.proclib
     ```
     
     The following guidelines apply.

      - Do not enclose the dataset name in quotes.
      - The dataset name is not case-sensitive, but the `dsName` tag is case-sensitive and must be written exactly as shown.
      - The dataset name must be an existing z/OS dataset in the PROCLIB concatenation. The user who installs Zowe must have update access to this dataset.  
      - If you omit the `dsName` tag or specify `dsName=auto`, the install script scans the available PROCLIB datasets and places the JCL member in the first dataset where the installing user has write access.  For further details, see [How the install script zowe-install.sh works](#how-the-install-script-zowe-installsh-works).

    b.  Specify the member name of the PROCLIB member you want to use with the `memberName` tag.  For example, 

     ```
     memberName=ZOWEABC
     ```
     
     The following guidelines apply.

     - Do not enclose the member name in quotes.  
     - The member name is not case-sensitive, but the `memberName` tag is case-sensitive and must be written exactly as shown. 
     - The member name must be a valid PDS member name in z/OS.  If the member already exists, it will be overwritten.  
     - If you omit the `memberName` tag or specify `memberName=`, the install script uses ZOWESVR.

5. (Optional) Use existing certificate signed by an external CA for HTTPS ports in API Mediation Layer and Zowe Application Framework.

     If you skip this step, then certificates generated by the local API Mediation CA are used. These certificates are generated automatically during the installation. The server certificate needs to be imported to your browser. See [Import the local CA certificate to your browser](../extend/extend-apiml/api-mediation-security.md#import-the-local-ca-certificate-to-your-browser).

     You can use an existing server certificate that is signed by an external CA such as a CA managed by the IT department of your company. The benefit of such certificate is that it will be trusted by browsers in your company.
     You can even use a public certificate authority such as Symantec, Comodo, or GoDaddy. Such certificate are trusted by all browsers and most REST API clients. This is, however, a manual process of requesting a certificate. As such, we recommend to start with the local API Mediation Layer CA for an initial evaluation.
   
     You can use an existing certificate with the following procedure.

     **Follow these steps:**
   
     a. Update the value of `externalCertificate` in the `api-mediation` section of the YAML file. The value needs to point to a keystore in PKCS12 format that contains the certificate with its private key. The file needs to be transferred as a binary to the z/OS system. Currently only the PKCS12 keystore with the password set to `password` are supported.

     b. Update the value of `externalCertificateAlias` to the alias of the server certificate in the keystore.

     c. Update the value of `externalCertificateAuthorities` to the path of the public certificate of the certificate authority that has the signed the certificate. You can add additional certificate authorities separated by spaces. This can be used for certificate authorities that have signed the certificates of the services that you want to access via the API Mediation Layer.

     d. (Optional) If you have trouble getting the certificates and you want only to evaluate Zowe, you can switch off the certificate validation by setting `verifyCertificatesOfServices=false`. The HTTPS will still be used but the API Mediation Layer will not validate any certificate. 
   
     **Important!** Switching off certificate evaluation is a non-secure setup.

     **Example:**

     ```yaml
      api-mediation:
         externalCertificate=/path/to/keystore.p12
         externalCertificateAlias=servercert
         externalCertificateAuthorities=/path/to/cacert.cer
         verifyCertificatesOfServices=true
   ```
   
6. (Optional) Check the install condition of the required prerequisites. To do this, issue the following command with the current directory being the `/install` directory.

    ```
    zowe-check-prereqs.sh
    ```

    The script writes messages to your terminal window. The results are marked `OK`, `Info`, `Warning` or `Error`. Correct any reported errors and rerun the command to ensure that no errors exist before you run the `zowe-install.sh` script to install the Zowe runtime. The `zowe-check-prereqs.sh` script does not change any settings. You can run it as often as required before you run the install script.
    

7. Execute the `zowe-install.sh` script.

    With the current directory being the `/install` directory, execute the script `zowe-install.sh` by issuing the following command:

    ```
    zowe-install.sh  
    ```

    You might receive the following error that the file cannot be executed:

    ```
    zowe-install.sh: cannot execute
    ```
    The error occurs when the install script does not have execute permission. To add execute permission, issue the following command:

    ```
    chmod u+x zowe-install.sh
    ```
   
   When the script runs, it echos its progress to the shell and attempts to determine and validate the location of the prerequisites including z/OSMF, Java, and Node. When the script cannot determine the location of these prerequisites, you will be prompted for their location.

    Each time the install script runs it create a log file that contains more information.  This file is stored in the `/log` directory and is created with a date and time stamp name, for example `/log/2019-02-05-18-08-35.log`.   This file is copied across into the runtime folder into which Zowe is installed, and contains useful information to help diagnose problems that may occur during an install.  
    
    You may also receive the following message:

    ```
    apiml_cm.sh --action trust-zosmf has failed.
    WARNING: z/OSMF is not trusted by the API Mediation Layer. Follow instructions in Zowe documentation about manual steps to trust z/OSMF
    ```

    This error does not interfere with installation progress and can be remediated after the install completes. See [Trust z/OSMF Certificate](../extend/extend-apiml/api-mediation-security.md#trust-zosmf-certificate) for more details.


    
8. Configure Zowe as a started task.

    The ZOWESVR must be configured as a started task (STC) under the IZUSVR user ID.  You can do this after the `zowe-install.sh` script has completed by running the script `zowe-config-stc.sh`.  To run this script, use the `cd` command to switch to the Zowe runtime directory that you specified in the `install:rootDir` in the `zowe-install.yaml` file, and execute the script from the `/install` directory that is created by the `pax` command.  For example:
     ```
     cd /var/zowe/1.0.0
     /zowe/builds/install/zowe-config-stc.sh
     ```
    Alternatively, you can issue the commands manually:
    
    **Note:** You must replace `ZOWESVR` in the commands below with the name of your server that you specified as `memberName=ZOWESVR` in the `zowe-install.yaml` file.

    - If you use RACF, issue the following commands:

      ```
      RDEFINE STARTED ZOWESVR.* UACC(NONE) STDATA(USER(IZUSVR) GROUP(IZUADMIN) PRIVILEGED(NO) TRUSTED(NO) TRACE(YES))  
      SETROPTS REFRESH RACLIST(STARTED)
      ```

    - If you use CA ACF2, issue the following commands:

      ```
      SET CONTROL(GSO)
      INSERT STC.ZOWESVR LOGONID(IZUSVR) GROUP(IZUADMIN) STCID(ZOWESVR)
      F ACF2,REFRESH(STC)
      ```

    - If you use CA Top Secret, issue the following commands:

      ```
      TSS ADDTO(STC) PROCNAME(ZOWESVR) ACID(IZUSVR)
      ```

9. Add the users to the required groups, IZUADMIN for administrators, and IZUUSER for standard users.

    - If you use RACF, issue the following command:

      ```
      CONNECT (userid) GROUP(IZUADMIN)
      ```

    - If you use CA ACF2, issue the following commands:

      ```
      ACFNRULE TYPE(TGR) KEY(IZUADMIN) ADD(UID(<uid string of user>) ALLOW)
      F ACF2,REBUILD(TGR)
      ```

    - If you use CA Top Secret, issue the following commands:

      ```
      TSS ADD(userid)  PROFILE(IZUADMIN)
      TSS ADD(userid)  GROUP(IZUADMGP)
      ```

### How the install script `zowe-install.sh` works

When the `zowe-install.sh` script runs, it performs a number of steps broken down into the following sections. Review the sections to help you undertand messsages and issues  that might occur when you run the script and actions you can take to resolve the issues.

1.  Environment variables

    To prepare the environment for the Zowe runtime, a number of ZFS folders need to be located for prerequisites on the platform that Zowe needs to operate. These can be set as environment variables before the script is run.  If the environment variables are not set, the install script will attempt to locate default values.

     - `ZOWE_ZOSMF_PATH`: The path where z/OSMF is installed.  Defaults to `/usr/lpp/zosmf/lib/defaults/servers/zosmfServer`.
     - `ZOWE_JAVA_HOME`:  The path where 64 bit Java 8 or later is installed.  Defaults to `/usr/lpp/java/J8.0_64`.
     - `ZOWE_EXPLORER_HOST`: The hostname of where the explorer servers are launched from.  Defaults to running `hostname -c`.

    When you run the install script for the first time, the script attempts to locate environment variables. The install script creates a files named `.zowe_profile` that resides in the current user's home directory and adds lines that specify the values of the environment variables to the file. The next time you run the install script, it uses the same values in this file.

    Each time you run the install script, it retrieves environment variable settings in the following ways. 
	  - When the `.zowe-profile` file exists in the home diretory, the install script uses the values in this file to set the environment variables. 
	  - When the `.zowe-profile` file does not exist, the install script checks if the `.profile` file exists in the home directory. If it does exist, the install script uses the values in this file to set the environment variables.

    You can create, edit, or delete the `.zowe_profile` file (as needed) before each install to set the variables to the values that you want. We recommend that you *do not* add commands to the `.zowe_profile` file, with the exception of the `export` command and shell variable assignments.

     **Note**: If you wish to set the environment variables for all users, add the lines to assign the variables and their values to the file `/etc/profile`.

    If the environment variables for `ZOWE_ZOSMF_PATH`, `ZOWE_JAVA_HOME` are not set and the install script cannot determine a default location, the install script will prompt for their location. The install script will not continue unless valid locations are provided.  

2. Expanding the PAX files

    The install script will create the Zowe runtime directory structure using the  `install:rootDir ` value in the  `zowe-install.yaml` file.  The runtime components of the Zowe server are then unpaxed into the directory that contains a number of directories and files that make up the Zowe runtime.

    If the expand of the PAX files is successful, the install script will report that it ran its install step to completion.

3. Changing Unix permissions

    After the install script lays down the contents of the Zowe runtime into the `rootDir`, the next step is to set the file and directory permissions correctly to allow the Zowe runtime servers to start and operate successfully.

    The install process will execute the file `scripts/zowe-runtime-authorize.sh` in the Zowe runtime directory.  If the script is successful, the result is reported.  If for any reason the script fails to run because of insufficient authority by the user running the install, the install process reports the errors.  A user with sufficient authority should then run the `zowe-runtime-authorize.sh`.  If you attempt to start the Zowe runtime servers without the `zowe-runtime-authorize.sh` having successfully completed, the results are unpredictable and Zowe runtime startup or runtime errors will occur.  

4. Creating the PROCLIB member to run the Zowe runtime

    **Note:**  The name of the PROCLIB member might vary depending on the standards in place at each z/OS site, however for this documentation, the PROCLIB member is called `ZOWESVR`.

    At the end of the installation, a Unix file `ZOWESVR.jcl` is created under the directory where the runtime is installed into, `$INSTALL_DIR/files/templates`. The contents of this file need to be tailored and placed in a JCL member of the PROCLIB concatenation for the Zowe runtime to be executed as a started task. The install script does this automatically.  If the user specifies `dsName=auto`, or omits the `dsName` tag, or sets it to null by coding `dsName=`,  the install script proceeds as follows and stops after the first successful write to the destination PROCLIB. 

     1. Try JES2 PROCLIB concatenation.
     2. Try  master JES2 JCL.
     3. Try `SYS1.PROCLIB`.

    If this succeeds, you will see a message like the following one:

     ```
     PROC ZOWESVR placed in USER.PROCLIB
     ```

    Otherwise you will see messages beginning with the following information:  

     ```
     Failed to put ZOWESVR.JCL in a PROCLIB dataset.
     ```

    In this case, you need to copy the PROC manually. Issue the TSO `oget` command to copy the `ZOWESVR.jcl` file to the preferred PROCLIB:  

     ```
     oget '$INSTALL_DIR/files/templates/ZOWESVR.jcl' 'MY.USER.PROCLIB(ZOWESVR)'
     ```

    You can place the PROC in any PROCLIB data set in the PROCLIB concatenation, but some data sets such as `SYS1.PROCLIB` might be restricted, depending on the permission of the user.  

    You can tailor the JCL at this line

      ```
      //ZOWESVR   PROC SRVRPATH='/zowe/install/path'
      ```

    to replace the `/zowe/install/path` with the location of the Zowe runtime directory that contains the z/OS Services. The install process inserts the expanded `install:rootDir` value from the `zowe-install.yaml` file into the SRVRPATH for you by default. Otherwise you must specify that path on the START command when you start Zowe in SDSF:

      ```
      /S ZOWESVR,SRVRPATH='$ZOWE_ROOT_DIR'
      ```

## Starting and stopping the Zowe runtime on z/OS

Zowe has a number of runtimes on z/OS: the z/OS Service microservice server, the Zowe Application Server, and the Zowe API Mediation Layer microservices. When you run the ZOWESVR PROC, all of these components start. The Zowe Application Server startup script also starts the zSS server, so starting the ZOWESVR PROC starts all the required servers. Stopping ZOWESVR PROC stops all of the servers that run as independent Unix processes.

### Starting the ZOWESVR PROC

To start the ZOWESVR PROC, run the `zowe-start.sh` script at the Unix Systems Services command prompt:

```
cd $ZOWE_ROOT_DIR/scripts
./zowe-start.sh
```
where:

_$ZOWE_ROOT_DIR_ is the directory where you installed the Zowe runtime. This script starts the ZOWESVR PROC for you so you do not have to log on to TSO and use SDSF.

**Note:** The default startup allows self-signed and expired certificates from the Zowe Application Framework proxy data services.

If you prefer to use SDSF to start Zowe, start ZOWESVR by issuing the following operator command in SDSF:

```
/S ZOWESVR
```

By default, Zowe uses the runtime version that you most recently installed. To start a different runtime, specify its server path on the START command:

```
/S ZOWESVR,SRVRPATH='$ZOWE_ROOT_DIR'
```

To test whether the API Mediation Layer is active, open the URL: `https://<hostname>:7554`. 

The port number 7554 is the default API Gateway port. You can overwrite this port in the `zowe-install.yaml` file before the `zowe-install.sh` script is run. See Step 2 in [Installing the Zowe runtime on z/OS](#installing-the-zowe-runtime-on-zos).

### Stopping the ZOWESVR PROC

To stop the ZOWESVR PROC, run the `zowe-stop.sh` script at the Unix Systems Services command prompt:

```
cd $ZOWE_ROOT_DIR/scripts
./zowe-stop.sh
```

If you prefer to use SDSF to stop Zowe, stop ZOWESVR by issuing the following operator command in SDSF:

```
/C ZOWESVR
```

Either method will stop the z/OS Service microservice server, the Zowe Application Server, and the zSS server.

When you stop the ZOWESVR, you might get the following error message:

```
IEE842I ZOWESVR DUPLICATE NAME FOUND- REENTER COMMAND WITH 'A='
```

This error results when there is more than one started task named ZOWESVR. To resolve the issue, stop the required ZOWESVR instance by issuing the following commands:

```
/C ZOWESVR,A=asid
```

You can obtain the _asid_ from the value of `A=asid` when you issue the following commands:

```
/D A,ZOWESVR
```

## Installing the Zowe Cross Memory Server on z/OS

The Zowe Cross Memory Service is a started task angel that runs an authorized server application providing privileged cross-memory services to Zowe.  

The server runs as a started task and requires an APF authorized load library, a program properties table (PPT) entry, and a parmlib. You can create these by using one of the following methods. The two methods achieve the same end result. 
- Manually 
- Use the script  `/install/zowe-install-apf-server.sh` that reads configuration parameters from the file `/install/zowe-install-apf-server.yaml` 

You can choose which method to use depending on your familiarity with z/OS configuration steps that are required for the manual path, together with the authority and privileges of your user ID if you choose to run the automated path.

Once the cross memory server is installed and started, there will be started task ZWESIS01 that runs the load library ZWESIS01.  The ZWESIS01 started task serves the ZOWESVR started task and provides secure services that require running in an APF-authorized state.

### Manually installing the Zowe Cross Memory Server

A number of files are included in the USS directory `zowe_install_dir/files/zss`.  If this directory is not present, you must create it by expanding the file `zowe_install_dir/files/zss.pax`.  To do this, first create the folder `zss` beneath `files` using the command `mkdir zss` and navigate into the `zss` folder using the command `cd zss`. Then, expand the `zss.pax` file using the command `pax -ppx -rf ../zss.pax`. 

The manual installation consists of the following steps.

1. ZWESIS01 load module and proclib

    Zowe Cross Memory Server consists of a single load module with the name ZWESIS01.  The load module is supplied in the `files\zss\LOADLIB\ZWESIS01` file.  This must be copied to a user-defined data set `zwes_loadlib`, for example, ZWES.SISLOAD.

    You can copy the ZWESIS01 file to your `zwes_loadlib` data set by using the command `cp ZWESIS01 "//'zwes_loadlib(ZWESIS01)'"`.  The `zwes_loadlib` must be a PDSE due to language requirements.  

    Do not add the `zwes_loadlib` data set to the system LNKLST or LPALST concatenations. You must execute it by using a started task that uses a STEPLIB DD statement so that the appropriate version of the software is loaded correctly.  A sample JCL for the PROCLIB is provided in `files/zss/SAMPLIB/ZWESIS01`.  Copy this to your system PROCLIB, such as SYS1.PROCLIB, or any other PROCLIB in the JES2 Concatenation PROCLIB Path.  

    **Note:**  The user that is assigned to the started task must have an OMVS segment.  The cross memory server loads the module to LPA for its PC-cp services.

2. PPT Entry

    The Zowe cross memory server must run in key 4 and be non-swappable.  For the server to start in this environment, you must add a corresponding PPT entry to the SCHEDxx member of the system PARMLIB. For example, add the following PPT entry to the SCHEDxx member:

    ```
    PPT PGMNAME(ZWESIS01) KEY(4) NOSWAP
    ```
    After you edit the PARMLIB, issue the following command to make the SCHEDxx changes effective:

    ```
    /SET SCH=xx
    ```

3. APF-authorization

    Due to the nature of the services the Zowe cross memory server provides, its load library requires APF-authorization. It is possible to check whether a load library is APF-authorized by using the following TSO command:

    ```
    D PROG,APF,DSNAME=ZWES.SISLOAD
    ```
    where the value of DSNAME is the name of the data set that contains the ZWESIS01 load module.

    To dynamically add the load library to the APF list, run one of the following TSO commands:

    ```
    SETPROG APF,ADD,DSNAME=ZWES.SISLOAD,VOLUME=volser
    (If the load library resides on Non SMS-Managed Volume)
    Or
    SETPROG APF,ADD,DSNAME=ZWES.SISLOAD,SMS
    (If the load library is SMS-Managed library) 
    ```
    where the value of DSNAME is the name of the data set that contains the ZWESIS01 load module.

4. PARMLIB member

    The Zowe cross memory server started task requires a valid ZWESISPxx PARMLIB member to be found at startup. The file `zowe_install_dir/files/zss/SAMPLIB/ZWESIP00` contains the default configuration values.  You can copy this member to your system PARMLIB data set, or allocate the default PDS data set ZWES.SISAMP that is specified in the ZWESIS01 started task JCL.

5. Security requirements for the cross memory server

    The Zowe cross memory server performs a sequence of SAF checks to protect its services from unauthorized callers.  This is done by using the FACILITY class and an entry for `ZWES.IS`. Valid callers must have `READ` access to the `ZWES.IS` class. The following examples assume that you will be running the ZOWESVR STC under the IZUSVR user.

    - If you use RACF, issue the following commands:
    
        - To see the current class settings, issue:
        ```
        SETROPTS LIST
        ```  
        - To activate the FACILITY class, issue:
        ```
        SETROPTS CLASSACT(FACILITY)
        ``` 
        - To RACLIST the FACILITY class, issue:
        ```
        SETROPTS RACLIST(FACILITY)
        ```
        - To define the `ZWES.IS` profile in the FACILITY class and grant IZUSVR READ access, issue the following commands:
        ```
        RDEFINE FACILITY ZWES.IS UACC(NONE)
        PERMIT ZWES.IS CLASS(FACILITY) ID(IZUSVR) ACCESS(READ)
        SETROPTS RACLIST(FACILITY) REFRESH
        ```
        - To check whether the permission has been successfully granted, issue the following command:
        ```
        RLIST FACILITY ZWES.IS AUTHUSER
        ```
        This shows the user IDs who have access to the ZWES.IS class, which should include IZUSVR with READ access.

    - If you use CA ACF2, issue the following commands:

      ```
      SET RESOURCE(FAC)
      RECKEY ZWES ADD(IS ROLE(IZUSVR) SERVICE(READ) ALLOW)
      F ACF2,REBUILD(FAC)
      ```

    - If you use CA Top Secret, issue the following commands, where `owner-acid` may be IZUSVR or a different ACID:

      ```
      TSS ADD(`owner-acid`) IBMFAC(ZWES.)
      TSS PERMIT(IZUSVR) IBMFAC(ZWES.IS) ACCESS(READ)
      ```

6. ICSF cryptographic services 

    The user IZUSVR who runs ZOWESVR will need READ access to CSFRNGL in the CSFSERV class.

    When using ICSF services, you need to define or check the following configurations depending on whether ICSF is already installed.
    - The ICSF or CSF job that runs on your z/OS system.
    - Configuration of ICSF options in SYS1.PARMLIB(CSFPRM00), SYS1.SAMPLIB, SYS1.PROCLIB.
    - Create CKDS, PKDS, TKDS VSAM data sets.
    - Define and activate the CSFSERV class:
    
        - If you use RACF, issue the following commands:
        ```
        RDEFINE CSFSERV profile-name UACC(NONE)
        PERMIT profile-name CLASS(CSFSERV) ID(tcpip-stackname) ACCESS(READ)
        PERMIT profile-name CLASS(CSFSERV) ID(userid-list)   ... [for userids IKED, NSSD, and Policy Agent]
        SETROPTS CLASSACT(CSFSERV)
        SETROPTS RACLIST(CSFSERV) REFRESH
        ```
        - If you use CA ACF2, issue the following commands. Note that `profile-prefix` and `profile-suffix` are user defined.
        ```
        SET CONTROL(GSO)
        INSERT CLASMAP.CSFSERV RESOURCE(CSFSERV) RSRCTYPE(CSF)  
        F ACF2,REFRESH(CLASMAP)
        SET RESOURCE(CSF)
        RECKEY profile-prefix ADD(profile-suffix uid(UID string for tcpip-stackname) SERVICE(READ) ALLOW)   
        RECKEY profile-prefix ADD(profile-suffix uid(UID string for IZUSVR) SERVICE(READ) ALLOW)   ... [repeat for userids IKED, NSSD, and Policy Agent]
        F ACF2,REBUILD(CSF)
        ```
        - If you use CA Top Secret, issue the following commands. Note that `profile-prefix` and `profile-suffix` are user defined.
        ```
        TSS ADDTO(owner-acid) RESCLASS(CSFSERV)                                                      
        TSS ADD(owner-acid) CSFSERV(profile-prefix.)
        TSS PERMIT(tcpip-stackname) CSFSERV(profile-prefix.profile-suffix) ACCESS(READ)
        TSS PERMIT(user-acid) CSFSERV(profile-prefix.profile-suffix) ACCESS(READ)                  ... [repeat for user-acids IKED, NSSD, and Policy Agent]
        ```
    - The user under which zssServer runs will need READ access to CSFRNGL in the CSFSERV class.
    - Determine whether you want SAF authorization checks against CSFSERV and set `CSF.CSFSERV.AUTH.CSFRNG.DISABLE` accordingly.
    - Refer to the [z/OS 2.3.0 z/OS Cryptographic Services ICSF System Programmer's Guide: Installation, initialization, and customization](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.csfb200/iandi.htm).
    - CCA and/or PKCS #11 coprocessor for random number generation.
    - Enable FACILITY IRR.PROGRAM.SIGNATURE.VERIFICATION and RDEFINE CSFINPV2 if required.

### Scripted install of the Zowe Cross Memory Server 

For users who have sufficient authority under their user ID to the z/OS instance they are installing the Zowe cross memory server into, there is a convenience script provided in `/zowe_install_dir/install/zowe-install-apf-server.sh`.

- The script will create the APF authorized load library, copy the load module, create the PROCLIB, define the `ZWES.IS` FACILITY class and give READ access to the ZOWESVR user ID.  
- The script will not create the PPT entry which must be done manually.  This is done using the steps described in step "5. Security requirements for the cross memory server" in [Manually installing the Zowe Cross Memory Server](#manually-installing-the-zowe-cross-memory-server). 
- The script will not create anything for the ICSF cryptographic services.  These are described in step "6. ICSF cryptographic services" in [Manually installing the Zowe Cross Memory Server](#manually-installing-the-zowe-cross-memory-server).

Because the parameters that are used to control the script are contained in the file `/zowe_install_dir/install/zowe-install-apf-server.yaml`, you must edit this file before running the `zowe-install-apf-server.sh` script with appropriate values.

```
# Datasets that APF server will be installed into
install:
  # PROCLIB dataset name (required, no default values)
  proclib=
  # PARMLIB dataset name (${USER}.PARMLIB by default)
  parmlib=
  # LOADLIB dataset name (${USER}.LOADLIB by default)
  loadlib=
```

where, 
- _install:proclib_ is the data set name that the ZWESIS01 JCL member that is used to start the ZWESIS01 started task will be copied into, for example, USER.PROCLIB.
- _install:parmlib_ is the data set name that the ZWESIP00 PARMLIB member will be copied into and used by the ZWESIS01 PROCLIB.  Choose a value such as IZUSVR.PARMLIB.
- _install:loadlib_ is the data set name where the ZWESIS01 load module will be copied into.  This data set will be created as a PDSE and be APF authorized by the script.  Choose a value such as USER.LOADLIB.

```
# APF server users
users:
  # User to run Zowe server (required, no default values)
  zoweUser=
  # APF server STC user (ZWESISTC by default)
  stcUser=
  # APF server STC user UID (required if STC user doesn't exist)
  stcUserUid=
  # STC user group (required if either STC user or profile doesn't exist)
  stcGroup=
```

where, 

- _users:zoweUser_ is the TSO user ID that the ZOWESVR started task runs under.  For the majority of installs, this will be IZUSVR, so enter IZUSVR as the value, and the script will give this user access to the `READ ZWES.IS FACILITY` class that allows Zowe to use the cross memory server.
- _users:sctUser_ is the user ID that the ZWESIS01 started task will be run under.  Enter the same value as the user ID that is running ZOWESVR, so choose IZUSVR.
- _users:stcUserUid_.  This is the Unix user ID of the TSO user ID used to run the ZWESIS01 started task. If the user ID is IZUSVR to see the Unix user ID enter the command `id IZUSVR` which will return the sctUserUid in the uid result.  In the example below IZUSVR has a uid of 210, so `users:stcUserUid=210` should be entered.  

    ```
   /:>id IZUSVR
   uid=210(IZUSVR) gid=202(IZUADMIN) groups=205(IZUSECAD)
    ```

- _users:stcGroup_ is the user group that the ZWESIS01 started task will be run under.  Enter the same values as the user group that is running ZOWESVR, so choose IZUADMIN.

After you edit the `zowe-install-apf-server.yaml` file with values, add a PPT entry before you run `zowe-install-apf-server.sh`. 

## Starting and stopping the Zowe Cross Memory Server on z/OS

The Zowe Cross Memory server is run as a started task from the JCL in the PROCLIB member ZWESIS01. To start this, issue the operator start command through SDSF:

```
/S ZWESIS01
```
To end the Zowe APF Angel process, issue the operator stop command through SDSF:

```
/P ZWESIS01
```

**Note:** The starting and stopping of the ZOWESVR for the main Zowe servers is independent of the ZWESIS01 angel process.  If you are running more than one ZOWESVR instance on the same LPAR, then these will be sharing the same ZWESIS01 cross memory server.  Stopping ZWESIS01 will affect the behavior of all Zowe servers on the same LPAR.  The Zowe Cross Memory Server is designed to be a long-lived address space. There is no requirement to recycle on a regular basis. When the cross-memory server is started with a new version of the ZWESIS01 load module, it will abandon its current load module instance in LPA and will load the updated version.

## Verifying installation

Once Zowe is running and the startup sequence is complete, you can check the configuration files and jobs for Zowe on your z/OS system to ensure that the installation process is successful. To do this, follow these steps.

1. Navigate to the runtime `$ZOWE_ROOT_DIR/scripts` directory, where *$ZOWE_ROOT_DIR* is the location of the Zowe runtime directory that contains the explorer server.  

2. Run the `zowe-verify.sh` script by issuing the following command:

    ```
    zowe-verify.sh
    ```

The script writes its messages to your terminal window.  The results are marked `OK`, `Info`, `Warning` or `Error`.  Correct any reported errors and restart the Zowe server.  The `zowe-verify.sh` script does not change any settings, so you can run it as often as required.

**Next steps**

Follow the instructions in the following sections to verify that the components are installed correctly and are functional.

- [Verifying Zowe Application Framework installation](#verifying-zowe-application-framework-installation)       
- [Verifying z/OS Services installation](#verifying-z-os-services-installationn) 
- [Verifying API Mediation installation](#verifying-api-mediation-installation) 

### Verifying Zowe Application Framework installation

If the Zowe Application Framework is installed correctly, you can open the Zowe Desktop from a supported browser.

From a supported browser, open the Zowe Desktop at `https://myhost:httpsPort/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`

where:

- _myHost_ is the host on which you installed the Zowe Application Server.
- _httpPort_ is the port number that is assigned to _node.http.port_ in `zluxserver.json`.
- _httpsPort_ is the port number that is assigned to _node.https.port_ in `zluxserver.json`.
  
  For example, if the Zowe Application Server runs on host _myhost_ and the port number that is assigned to _node.https.port_ is 12345, you specify `https://myhost:12345/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.htm`.

### Verifying z/OS Services installation

After the ZOWESVR procedure is started, you can verify the installation of z/OS Services from an internet browser by entering the following case-sensitive URL:

```
https://hostName:<_gatewayPort_>/api/v1/jobs?prefix=*
```

where, _gatewayPort_ is the port number that is assigned to `api:mediation:gatewayPort` in `zowe-install.yaml`.

### Verifying API Mediation installation

Use your preferred REST API client to review the value of the status variable of the API Catalog service that is routed through the API Gateway using the following URL:

```
https://hostName:basePort/api/v1/apicatalog/application/state
```

The `hostName` is set during install, and `basePort` is set as the `gatewayHttpsPort` parameter.

**Example:**

The following example illustrates how to use the **curl** utility to invoke API Mediation Layer endpoint and the **grep** utility to parse out the response status variable value

```
$ curl -v -k --silent https://hostName:basePort/api/v1/apicatalog/application/state 2>&1 | grep -Po '(?<=\"status\"\:\")[^\"]+'
UP
```

The response `UP` confirms that API Mediation Layer is installed and is running properly.

## Looking for troubleshooting help?

If you encounter unexpected behavior when installing or verifying Zowe runtime, see the [Troubleshooting](../troubleshoot/troubleshootinstall.md) section for troubleshooting tips.

