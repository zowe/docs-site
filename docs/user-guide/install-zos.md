# Installing Zowe on z/OS 

To install Zowe on z/OS, you install the Zowe runtime that consists of three components: Zowe Application Framework, explorer server, and Zowe API Mediation Layer. Follow the instructions in this topic to obtain the installation file for z/OS runtime components and run the installation scripts. 

1. [Obtaining and preparing the installation file](#obtaining-and-preparing-the-installation-file)
2. [Prerequisites](#prerequisites)
3. [Installing the Zowe runtime on z/OS](#installing-the-zowe-runtime-on-zos)
    - [How the install script `zowe-install.sh` works](#how-the-install-script-zowe-installsh-works)   
4. [Starting and stopping the Zowe runtime on z/OS](#starting-and-stopping-the-zowe-runtime-on-zos)        
    - [Starting the ZOWESVR PROC](#starting-the-zowesvr-proc)
    - [Stopping the ZOWESVR PROC](#stopping-the-zowesvr-proc)    
5. [Verifying installation](#verifying-installation)        
6. [Looking for troubleshooting help?](#looking-for-troubleshooting-help)

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

      When you see "matched", it means the PAX file that you download is the same one that is officially distributed by the Zowe project. You can delete the temporary "zowe-v.r.m.pax.sha512.my" file.

      You can also use other commands such as `sha512`, `sha512sum`, or `openssl dgst -sha512` to generate `SHA512` hash code. These hash code results are in a different format from what Zowe provides but the values are the same.

    **Step 2. Verify with signature file.**

      In addition to the SHA512 hash, the hash is also verifiable. This is done by digitally signing the hash text file with a KEY from one of the Zowe developers.

      **Follow these steps:**

      1. Download the signature file `zowe-v.r.m.pax.asc` from [Zowe website](https://projectgiza.org/Downloads/post_download.html), and download the public key `KEYS` from https://github.com/zowe/release-management/.
      2. Import the public key with command `gpg --import KEYS`.
      3. If you have never used gpg before, generate keys with command `gpg --gen-key`.
      4. Sign the downloaded public key with command `gpg --sign-key DC8633F77D1253C3`.
      5. Verify the file with command `gpg --verify zowe-v.r.m.pax.asc zowe-v.r.m.pax`.
      6. Optional: You can remove the imported key with command: `gpg --delete-key DC8633F77D1253C3`.

     When you see output similar to the followin one, it means the PAX file that you download is the same one that is officially distributed by the Zowe project.

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
     put <pax-file-name>.pax
     ```

    Where _pax-file-name_ is a variable that indicates the full name of the PAX file you downloaded.

    **Note:** When your terminal is connected to z/OS through FTP or SFTP, you can prepend commands with `l` to have them issued against your desktop.  To list the contents of a directory on your desktop, type `lls` where `ls` will list contents of a directory on z/OS.  

3. When the PAX file is transferred, expand the PAX file by issuing the following command in an ssh session:

    ```
    pax -ppx -rf <pax-file-name>.pax
    ```  

    Where _pax-file-name_ is a variable that indicates the name of the PAX file you downloaded.


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

    You can run a script to check the install condition of the required prerequisites. To do this, issue the following command with the current directory being the `/install` directory.

    ```
    zowe-check-prereqs.sh
    ```

    The script writes messages to your terminal window. The results are marked `OK`, `Info`, `Warning` or `Error`. Correct any reported errors and rerun the command to ensure that no errors exist before you run the `zowe-install.sh` script to install the Zowe runtime. The `zowe-check-prereqs.sh` script does not change any settings. You can run it as often as required before you install the Zowe runtime.

- The user ID that is used to perform the installation must have authority to set the ``'-a'`` extattr flag. This requires a minimum of read access to the BPX.FILEATTR.APF resource profile in the RACF CLASS if you use RACF. It is not essential for this access to be enabled before you run the `zowe-install.sh` script that installs Zowe runtime on z/OS. However, this access must be enabled before you run the `zowe-runtime-authorize.sh` script.

- The user ID that is used to perform the installation must have authority to read the z/OSMF keyring. For how to check the name of the keyring and grant read access to the keyring, see the [Trust z/OSMF certificate]((../extend/extend-apiml/api-mediation-security.md#zowe-runtime-on-z-os) topic.

## Installing the Zowe runtime on z/OS

To install Zowe API Mediation Layer, Zowe Application Framework, and explorer server, you install the Zowe runtime on z/OS.

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

    - The zlux-server has three ports: the HTTP and HTTPS ports that are used by the Zowe Application Server, and the port that is used by the ZSS Server.

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

    explorer-server:
      jobsPort=7080
      mvsPort=7443

    # http and https ports for the node server
    zlux-server:
      httpPort=8543
      httpsPort=8544
      zssPort=8542
    ```

    **Notes:**
    -  If all of the default port values are acceptable, the ports do not need to be changed. To allocate ports, ensure that the ports are not in use for the Zowe runtime servers.
    - Comments are not supported in the yaml file, apart from lines starting with '#' in column one.

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
      
      **Note:** Unlike the ports needed by the Zowe runtime for its Zowe Application Framework and explorer server which must be unused, the terminal ports are expected to be in use.

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
      - The dataset name must be an existing z/OS dataset in the PROCLIB concatenation. The user installing Zowe must have update access to this dataset.  
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

5. (Optional) Use existing certificate signed by an external CA for HTTPS ports in API Mediation Layer and zLUX.

     If you skip this step, then certificates generated by the local API Mediation CA are used. These certificates are generated automatically during the installation. The server certificate needs to be imported to your browser - see [Import the local CA certificate to your browser](../extend/extend-apiml/api-mediation-security.md#import-the-local-ca-certificate-to-your-browser).

     You can use an existing server certificate that is signed by an external CA such as a CA managed by the IT department of your company. The benefit of such certificate is that it will be trusted by browsers in your company.
     You can even use a public certificate authority such as Symantec, Comodo, or GoDaddy. Such certificate are trusted by all browsers and most REST API clients. This is, however, a manual process of requesting a certificate. As such, we recommend to start with the local API Mediation Layer CA for an initial evaluation.
   
     You can use an existing certificate with the following procedure.

     **Follow these steps:**
   
     a. Update the value of `externalCertificate` in the `api-mediation` section of the YAML file. The value needs to point to a keystore in PKCS12 format that contains the certificate with its private key. The file needs to be transferred as a binary to the z/OS system. Currently only the PKCS12 keystore with the password set to `password` are supported.

     b. Update the value of `externalCertificateAlias` to the alias of the server certificate in the keystore.

     c. Update the value of `externalCertificateAuthorities` to the path of the public certificate of the certificate authority that has the signed the certificate. You can add additional certificate authorities separated by spaces. This can be used for certificate authorities that have signed the certificates of the services that you want to access via the API Mediation Layer.

     d. (Optional) If you have trouble getting the certificates and you want only to evaluate Zowe, you can switch off the certificate validation by setting `verifyCertificatesOfServices=false`. The HTTPS will still be used but the API Mediation Layer will not validate any certificate. 
   
     **Important** Switching off certificate evaluation is a non-secure setup.

     **Example:**

     ```yaml
      api-mediation:
         externalCertificate=/path/to/keystore.p12
         externalCertificateAlias=servercert
         externalCertificateAuthorities=/path/to/cacert.cer
         verifyCertificatesOfServices=true
   ```

6. Execute the `zowe-install.sh` script.

    With the current directory being the `/install` directory, execute the script `zowe-install.sh` by issuing the following command:

    ```
    zowe-install.sh  
    ```

    **Note:** You might receive the following error that the file cannot be executed:

    ```
    zowe-install.sh: cannot execute
    ```
    The error occurs when the install script does not have execute permission. To add execute permission, issue the following command:

    ```
    chmod u+x zowe-install.sh
    ```
   
   When the script runs, it echos its progress to the shell and attempts to determine and validate the location of the prerequisites including z/OSMF, Java, and Node. When the script cannot determine the location of these prerequisites, you will be prompted for their location.

    <<JRW TO DO - Write about the log file and the commands behing echoed>>
    
    You may also receive the following message:

    ```
    apiml_cm.sh --action trust-zosmf has failed.
    WARNING: z/OSMF is not trusted by the API Mediation Layer. Follow instructions in Zowe documentation about manual steps to trust z/OSMF
    ```

    This error does not interfere with installation progress and can be remediated after the install completes. See [Trust z/OSMF Certificate](../extend/extend-apiml/api-mediation-security.md#trust-zosmf-certificate) for more details.


    
7. Configure Zowe as a started task.

     The ZOWESVR must be configured as a started task (STC) under the IZUSVR user ID.

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

8. Add the users to the required groups, IZUADMIN for administrators, and IZUUSER for standard users.

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

     - `ZOWE_ZOSMF_PATH`: The path where z/OSMF is installed.  Defaults to `/usr/lpp/zosmf/lib/defaults/servers/zosmfServer`
     - `ZOWE_JAVA_HOME`:  The path where 64 bit Java 8 or later is installed.  Defaults to `/usr/lpp/java/J8.0_64`
     - `ZOWE_EXPLORER_HOST`: The IP address of where the explorer servers are launched from.  Defaults to running `hostname -c`

    The first time the script is run if it has to locate any of the environment variables, the script will add lines to the current user's home directory `.profile` file to set the variables.  This ensures that the next time the same user runs the install script, the previous values will be used.

    <<TODO - JRW>>
     **Note**: If you wish to set the environment variables for all users, add the lines to assign the variables and their values to the file `/etc/.profile`.

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
      //ZOWESVR   PROC SRVRPATH='/zowe/install/path/explorer-server'
      ```

    to replace the `/zowe/install/path` with the location of the Zowe runtime directory that contains the explorer server.  Otherwise you must specify that path on the START command when you start Zowe in SDSF:

      ```
      /S ZOWESVR,SRVRPATH='$ZOWE_ROOT_DIR/explorer-server'
      ```

## Starting and stopping the Zowe runtime on z/OS

Zowe has a number of runtime on z/OS: the z/OS Service microservice server, the Zowe Application Server, and the Zowe API Mediation Layer microservices. When you run the ZOWESVR PROC, all of these components start. The Zowe Application Server startup script also starts the zSS server, so starting the ZOWESVR PROC starts all the required servers. Stopping ZOWESVR PROC stops all of the servers that run as independent Unix processes.

### Starting the ZOWESVR PROC

To start the ZOWESVR PROC, run the `zowe-start.sh` script at the Unix Systems Services command prompt:

```
cd $ZOWE_ROOT_DIR/scripts
./zowe-start.sh
```
where:

_$ZOWE_ROOT_DIR_ is the directory where you installed the Zowe runtime. This script starts the ZOWESVR PROC for you so you do not have to log on to TSO and use SDSF.

**Note:** The default startup allows self-signed and expired certificates from the Zowe Application Framework proxy data services such as the explorer server.

If you prefer to use SDSF to start Zowe, start ZOWESVR by issuing the following operator command in SDSF:

```
/S ZOWESVR
```

By default, Zowe uses the runtime version that you most recently installed. To start a different runtime, specify its server path on the START command:

```
/S ZOWESVR,SRVRPATH='$ZOWE_ROOT_DIR/explorer-server'
```

To test whether the explorer server is active, open the URL: `https://<hostname>:7443/explorer-mvs`.

The port number `7443` is the default port. You can overwrite this port in the `zowe-install.yaml` file before the `zowe-install.sh` script is run. See Step 2 in [Installing Zowe runtime on z/OS](# #installing-the-zowe-runtime-on-z-os).

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

Either method will stop the explorer server, the Zowe Application Server, and the zSS server.

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
  
  For example, if the Zowe Application Server runs on host _myhost_ and the port number that is assigned to _node.http.port_ is 12345, you specify `https://myhost:12345/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.htm`.

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

