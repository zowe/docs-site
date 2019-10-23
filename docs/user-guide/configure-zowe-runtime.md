# Configuring the Zowe runtime

After you install Zowe&trade; through either the convenience build by running the `zowe-install.sh -I` command or through the SMP/E build by running the RECEIVE and APPLY jobs, you will have a Zowe runtime directory. You must configure the Zowe runtime before it can be started.

1. [Prerequisites](#prerequisites)
1. [Configuring the Zowe runtime directory](#configuring-the-zowe-runtime-directory)
   1. [Environment variables](#environment-variables)
   1. [Configuration variables](#configuration-variables)
      - [Address space name](#address-space-name)
      - [Port allocations](#port-allocations)
      - [PROCLIB member name](#proclib-member-name)
      - [Certificates](#certificates)
      - [Unix File Permissions](#unix-file-permissions)
1. [Configuring the ZOWESVR started task](#configuring-the-zowesvr-started-task)
    1. [Creating the ZOWESVR PROCLIB member to launch the Zowe runtime](#creating-the-zowesvr-proclib-member-to-launch-the-zowe-runtime)
    1. [Configuring ZOWESVR to run under the correct user ID](#configuring-zowesvr-to-run-under-the-correct-user-id)
    1. [Granting users permission to access Zowe](#granting-users-permission-to-access-zowe)
1. [The Zowe Cross Memory Server](#the-zowe-cross-memory-server)
    1. [Creating the xmem-server/zss directory](#creating-the-xmem-server/zss-directory)
	  1. [Manually installing the Zowe Cross Memory Server](#manually-installing-the-zowe-cross-memory-server)
	  1. [Scripted install of the Zowe Cross Memory Server](#scripted-install-of-the-zowe-cross-memory-server)
1. [Starting and stopping the Zowe runtime on z/OS](#starting-and-stopping-the-zowe-runtime-on-zos)
    1. [Starting the ZOWESVR PROC](#starting-the-zowesvr-proc)
    1. [Stopping the ZOWESVR PROC](#stopping-the-zowesvr-proc)
1. [Starting and stopping the Zowe Cross Memory Server on z/OS](#starting-and-stopping-the-zowe-cross-memory-server-on-zos)

## Prerequisites

<!--- - The user ID that is used to perform the installation must have authority to set the ``'-a'`` extattr flag. This requires a minimum of read access to the BPX.FILEATTR.APF resource profile in the RACF CLASS if you use RACF. It is not essential for this access to be enabled before you run the `zowe-install.sh` script that installs Zowe runtime on z/OS. However, this access must be enabled before you run the `zowe-runtime-authorize.sh` script. --->

- The user ID that is used to perform the configuration part of the installation must have authority to read the z/OSMF keyring. For how to check the name of the keyring and grant read access to the keyring, see the [Trust z/OSMF certificate](../extend/extend-apiml/api-mediation-security.md#zowe-runtime-on-z-os) topic.

- The user ID that is used to perform the configuration part of the installation must have READ permission for the BPX.JOBNAME FACILITY class. To display who is authorized to the FACILITY class, issue the following command:
  ```
  RLIST FACILITY BPX.JOBNAME AUTHUSER
  ```

  Additionally, you need to activate facility class, permit `BPX.JOBNAME`, and refresh facility class:
  ```
  SETROPTS CLASSACT(FACILITY) RACLIST(FACILITY)
  PERMIT BPX.JOBNAME CLASS(FACILITY) ID(&useridToAuthorizeHere) ACCESS(READ)
  SETROPTS RACLIST(FACILITY) REFRESH
  ```

  For more information, see [Setting up the UNIX-related FACILITY and SURROGAT class profiles](
 https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.bpxb200/fclass.htm).


## Configuring the Zowe runtime directory

You configure the Zowe runtime directory by running the script `scripts/configure/zowe-configure.sh`.

Before you run the script `scripts/configure/zowe-configure.sh`, check the values of [environment variables](#environment-variables) and [configuration variables](#configuration-variables) in the `scripts/configure/zowe-install.yaml` file, as these are used to configure Zowe during execution of the script `zowe-configure.sh`.

For the convenience build, the location of the Zowe runtime directory will be the value of the `install:rootDir` parameter from the file `scripts/configure/zowe-install.yaml`.  

### Environment variables

To configure the Zowe runtime, a number of ZFS folders need to be located for prerequisites on the platform that Zowe needs to operate. These can be set as environment variables before the script is run.  If the environment variables are not set, the configuration script will attempt to locate default values.

- `ZOWE_JAVA_HOME`:  The path where 64 bit Java 8 or later is installed.  Defaults to `/usr/lpp/java/J8.0_64`.
- `ZOWE_EXPLORER_HOST`: The hostname of where the explorer servers are launched from.  Defaults to running `hostname -c`.

When you run the configuration script for the first time, the script attempts to locate environment variables. The configuration script creates a files named `.zowe_profile` that resides in the current user's home directory and adds lines that specify the values of the environment variables to the file. The next time you run the install script, it uses the same values in this file to avoid having to define them each time a runtime is configured.    

Each time you run the configuration script, it retrieves environment variable settings in the following ways.
- When the `.zowe-profile` file exists in the home directory, the install script uses the values in this file to set the environment variables.
- When the `.zowe-profile` file does not exist, the configuration script checks if the `.profile` file exists in the home directory. If it does exist, the install script uses the values in this file to set the environment variables. The install script does not update or execute the `.profile` file.

You can create, edit, or delete the `.zowe_profile` file (as needed) before each install to set the variables to the values that you want. We recommend that you *do not* add commands to the `.zowe_profile` file, with the exception of the `export` command and shell variable assignments.

**Notes:**
- If you wish to set the environment variables for all users, add the lines to assign the variables and their values to the file `/etc/profile`.
- If the environment variables for `ZOWE_ZOSMF_PATH`, `ZOWE_JAVA_HOME` are not set and the install script cannot determine a default location, the install script will prompt for their location. The install script will not continue unless valid locations are provided.  
- Ensure that the value of the `ZOWE_EXPLORER_HOST` variable is accessible from a machine external to the z/OS environment thus users can log in to Zowe from their desktops. When there is no environment variable set and there is no `.zowe_profile` file with the variable set, the install script will default to the value of `hostname -c`. In this case, ensure that the value of `hostname -c` is externally accessible from clients who want to use Zowe as well as internally accessible from z/OS itself. If not accessible, then set an environment variable with `ZOWE_EXPLORER_HOST` set to the correct host name, or create and update the `.zowe_profile` file in the current user's home directory.  
- Ensure that the value of the `ZOWE_IPADDRESS` variable is set correctly for your system.  This should be the IP address of your z/OS system which is externally accessible from clients who want to use Zowe.  This is particularly important for zD&T and cloud systems, where `ping` or `dig` on z/OS would return a different IP address from the one that external clients would use to access z/OS.   

### Configuration variables

The file `scripts/configure/zowe-install.yaml` contains `key:value` pairs that configure the Zowe runtime.  

#### Address space name

`install:prefix` defines a prefix for Zowe address space STC name associated with USS processes. With this, the individual address spaces can be distinguished from each other in RMF records or SDSF views.  

STC names have certain components and use the following format:

```pfxnSS```

where:

- `pfx` - Prefix that contains up to four characters, for example, `ZOWE`.

- `n` - Instance number

- `SS` - A subcomponent. `SS` can be one of the following values:
   - **AG** - API ML Gateway
   - **AD** - API ML Discovery Service
   - **AC** - API ML Catalog
   - **EJ** - Explorer API Jobs
   - **ED** - Explorer API Data Sets
   - **UD** - Explorer UI Data Sets
   - **UJ** - Explorer UI Jobs
   - **UU** - Explorer UI USS
   - **DT** - Zowe Desktop Application Server

The STC name of the main started task is `pfxnSV`. To view all the STCs for your instance of ZOWE in SDSF, you can use the PREFIX `pfxn*`.

**Example:**

  ```yaml
  install:
  prefix=ZOWE
  ```

  in the `zowe-install.yaml` file defines a prefix of ZOWE for the STC, so the first instance of Zowe API ML Gateway identifier will be as follows:

  ```
  ZOWE1AG
  ```
#### Port allocations

The port values are defined in the `scripts/configure/zowe-install.yaml` file.  

- Zowe API Mediation Layer has three HTTPS ports, one for each micro-service; API Gateway, API Discovery and API Catalog.  
- z/OS Services has HTTPS ports for each of its micro-services; jobs and the data sets.
- z/OS desktop apps has three ports for each of its explorer apps; USS Explorer, MVS Explorer, JES Explorer
- The Zowe App Server has two ports: the HTTPS port used by the Zowe Application Server, and an HTTP port that is used by the ZSS Server.

**Example:**

  ```
    api-mediation:
      catalogPort=7552
      discoveryPort=7553
      gatewayPort=7554
      externalCertificate=
      externalCertificateAlias=
      externalCertificateAuthorities=
      verifyCertificatesOfServices=true
      enableSso=false
      zosmfKeyring=IZUKeyring.IZUDFLT

    zos-services:
      jobsAPIPort=8545
      mvsAPIPort=8547

    zowe-desktop-apps:
      jobsExplorerPort=8546
      mvsExplorerPort=8548
      ussExplorerPort=8550

    zlux-server:
     httpsPort=8544
     zssPort=8542
  ```

**Notes:** If all of the default port values are acceptable, the ports do not need to be changed. To allocate ports, ensure that the ports are not in use for the Zowe runtime servers.

To determine which ports are not available, follow these steps:

1. Display a list of ports that are in use with the following command:

   ```
   TSO NETSTAT
   ```

2. Display a list of reserved ports with the following command:

   ```
   TSO NETSTAT PORTLIST
   ```

The `zowe-install.yaml` file also contains the telnet and SSH port with defaults of 23 and 22.  If your z/OS LPAR is using different ports, edit the values. This allows the TN3270 terminal desktop application to connect as well as the VT terminal desktop application.

**Note:** Unlike the ports needed by the Zowe runtime for its Zowe Application Framework and z/OS Services which must be unused, the terminal ports are expected to be in use.

```
  # Ports for the TN3270 and the VT terminal to connect to
  terminals:
      sshPort=22
      telnetPort=23
```

#### PROCLIB member name

When the Zowe runtime is launched, it is run under a z/OS started task (STC). The PROCLIB can be automatically created if desired, for example if the install is being run as part of a pipeline. Alternatively，you can disable auto-creation by commenting out the `zowe-server-proclib:` block.

The `scripts/configure/zowe-install.yaml` file contains the dataset name and member name of the ZOWESVR JCL to be used to run Zowe.  

**Example:**

```
  # started task JCL member for Zowe job
  zowe-server-proclib:
  # dsName=SYS1.PROCLIB   
    dsName=auto
    memberName=ZOWESVR
```

**Follow these steps:**

1. Specify the dataset name of the PROCLIB member you want to use with the `dsName` tag.  For example,

   ```
    dsName=user.proclib
   ```

   The following guidelines apply.

   - Do not enclose the dataset name in quotes.
   - The dataset name is not case-sensitive, but the `dsName` tag is case-sensitive and must be written exactly as shown.
   - The dataset name must be an existing z/OS dataset in the PROCLIB concatenation. The user who installs Zowe must have update access to this dataset.  
   - If you omit the `dsName` tag or specify `dsName=auto`, the install script scans the available PROCLIB datasets and places the JCL member in the first dataset where the installing user has write access.  

2. Specify the member name of the PROCLIB member you want to use with the `memberName` tag.  For example,

   ```
    memberName=ZOWEABC
   ```

   The following guidelines apply.

   - Do not enclose the member name in quotes.  
   - The member name is not case-sensitive, but the `memberName` tag is case-sensitive and must be written exactly as shown.
   - The member name must be a valid PDS member name in z/OS.  If the member already exists, it will be overwritten.  
   - If you omit the `memberName` tag or specify `memberName=`, the install script uses ZOWESVR.

#### Certificates

You can use existing certificate signed by an external certificate authority (CA) for HTTPS ports in API Mediation Layer and Zowe Application Framework, or else you can let the Zowe configuration script generate a certificated self-signed by the local API Mediation CA.  

If you let the Zowe configuration generate a self-signed certificate, then it needs to be imported into your browser to avoid challenges about untrusted network traffic. See [Import the local CA certificate to your browser](../extend/extend-apiml/api-mediation-security.md#import-the-local-ca-certificate-to-your-browser).

You can use an existing server certificate that is signed by an external CA such as a CA managed by the IT department of your company. The benefit of such certificate is that it will be trusted by browsers in your company.

You can even use a public certificate authority such as Symantec, Comodo, or GoDaddy. Such certificate are trusted by all browsers and most REST API clients. This is, however, a manual process of requesting a certificate. As such, we recommend to start with the local API Mediation Layer CA for an initial evaluation.

You can use an existing certificate with the following procedure.

**Follow these steps:**

1. Update the value of `externalCertificate` in the `api-mediation` section of the `scripts/configure/zowe-install.yaml` file. The value needs to point to a keystore in PKCS12 format that contains the certificate with its private key. The file needs to be transferred as a binary to the z/OS system. Currently only the PKCS12 keystore with the password set to `password` are supported.

2. Update the value of `externalCertificateAlias` to the alias of the server certificate in the keystore.

3. Update the value of `externalCertificateAuthorities` to the path of the public certificate of the certificate authority that has the signed the certificate. You can add additional certificate authorities separated by spaces. This can be used for certificate authorities that have signed the certificates of the services that you want to access via the API Mediation Layer.

4. (Optional) If you have trouble getting the certificates and you want only to evaluate Zowe, you can switch off the certificate validation by setting `verifyCertificatesOfServices=false`. The HTTPS will still be used but the API Mediation Layer will not validate any certificate.

**Important!** Switching off certificate evaluation is a non-secure setup.

**Example:**

```yaml
  api-mediation:
      externalCertificate=/path/to/keystore.p12
      externalCertificateAlias=servercert
      externalCertificateAuthorities=/path/to/cacert.cer
      verifyCertificatesOfServices=true
```

You may also receive the following message:

```
apiml_cm.sh --action trust-zosmf has failed.
WARNING: z/OSMF is not trusted by the API Mediation Layer. Follow instructions in Zowe documentation about manual steps to trust z/OSMF
```

This error does not interfere with installation progress and can be remediated after the install completes. See [Trust z/OSMF Certificate](../extend/extend-apiml/api-mediation-security.md#trust-a-z-osmf-certificate) for more details.

#### Unix File Permissions

The next configuration step is to set the file and directory permissions correctly to allow the Zowe runtime servers to start and operate successfully.

The configuration script will execute the file `scripts/zowe-runtime-authorize.sh` in the Zowe runtime directory.
- If the script is successful, the result is reported.  
- If for any reason the script fails to run because of insufficient authority by the user running the install, the install process reports the errors.  A user with sufficient authority should then run the `zowe-runtime-authorize.sh`.  
- If you attempt to start the Zowe runtime servers without the `zowe-runtime-authorize.sh` having successfully completed, the results are unpredictable and Zowe runtime startup or runtime errors will occur.  

## Configuring the ZOWESVR started task

Zowe has a number of runtimes on z/OS: the z/OS Service microservice server, the Zowe Application Server, and the Zowe API Mediation Layer microservices. A single PROCLIB is used to start all of these microservices.  The configuration step of the Zowe runtime will create the PROCLIB member and by default attempt to add it to the first available PROCLIB in the JES2 concatenation path.  

### Creating the ZOWESVR PROCLIB member to launch the Zowe runtime

**Note:**  The name of the PROCLIB member might vary depending on the standards in place at each z/OS site, however for this documentation, the PROCLIB member is called `ZOWESVR`.

At the end of the configuration, a Unix file `ZOWESVR.jcl` is created under the `scripts` runtime directory. The contents of this file need to placed in a JCL member of the PROCLIB concatenation for the Zowe runtime in order for it to be executed as a started task. By default the configuration script does this automatically.  If the user specifies `dsName=auto`, or omits the `dsName` tag, or sets it to null by coding `dsName=`,  the install script proceeds as follows and stops after the first successful write to the destination PROCLIB.

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
oget '$INSTALL_DIR/files/templates/ZOWESVR.jcl' 'MY.USER.PROCLI(ZOWESVR)'
```

You can place the PROC in any PROCLIB data set in the PROCLIB concatenation, but some data sets such as `SYS1.PROCLIB` might be restricted, depending on the permission of the user.  

You can tailor the JCL at this line

```
//ZOWESVR   PROC SRVRPATH='{{root_dir}}'
```

to replace the `root_dir` with the location of the Zowe runtime directory that contains the z/OS Services. The install process inserts the expanded `install:rootDir` value from the `scripts/configure/zowe-install.yaml` file into the SRVRPATH for you by default. Otherwise you must specify that path on the START command when you start Zowe in SDSF:

```
/S ZOWESVR,SRVRPATH='$ZOWE_ROOT_DIR'
```

### Configuring ZOWESVR to run under the correct user ID

The ZOWESVR must be configured as a started task (STC) under the IZUSVR user ID.  This only needs to be done once per z/OS system and would be typically done the first time you configure a Zowe runtime.  If the Zowe runtime is uninstalled or a new Zowe is installed and configured, you do not need to re-run the step to associate the ZOWESVR STC with the Zowe user ID of IZUSVR.  

To configure ZOWESVR to run as a STC under the user ID of IZUSVR, there is a convenience script `/scripts/zowe-config-stc.sh` that is provided in the runtime folder.  

Alternatively, if you do not wish to run this script, the steps below describe how to manually perform the steps to configure ZOWESVR to run under the IZUSVR user ID.  

**Note:** You must replace `ZOWESVR` in the commands below with the name of your PROCLIB member that you specified as `memberName=ZOWESVR` in the `scripts/configure/zowe-install.yaml` file.

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

### Granting users permission to access Zowe

TSO user IDs using Zowe must have permission to access the z/OSMF services that are used by Zowe.  They should be added to the the IZUUSER group for standard users or IZUADMIN for administrators,

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

## The Zowe Cross Memory Server

The Zowe Cross Memory Server is a started task angel that runs an authorized server application and its auxiliary address spaces, providing privileged cross-memory services to Zowe. To operate, the Zowe Desktop requires that the service be installed, configured, and started. The Zowe API Mediation Layer does not require the service.

The server and address spaces run as started tasks. To configure the service, you must create or edit APF authorized load libraries, program properties table (PPT) entries, and a parmlib. You can configure the service one two ways:
- Manually
- Using the script `xmem-server/zowe-install-apf-server.sh`, which reads configuration parameters from the file `xmem-server/zowe-install-apf-server.yaml`

Before you choose a method, read the documentation below. The manual configuration requires familiarity with z/OS. Running the script requires the ID of the user to have certain authorities and priviledges.

Once the cross memory server is installed and started, the started task ZWESIS01 runs the load library ZWESIS01 and ZWESAUX runs the load library ZWESAUX. The ZWESIS01 started task serves the ZOWESVR started task and provides secure services that require running in an APF-authorized state.

### Creating the xmem-server/zss directory

A number of files used by both manual and scripted installation are included in the USS directory `xmem-server/zss`.  If this directory is not in the Zowe runtime directory, you must create it by expanding the file `xmem-server/zss.pax`.  To do this, first create the folder `zss` beneath `xmem-server` using the command `mkdir zss` and navigate into the `zss` folder using the command `cd zss`. Then, expand the `zss.pax` file using the command `pax -ppx -rf ../zss.pax`.

### Manually installing the Zowe Cross Memory Server
<!-- TODO. Entire sub-section -->

To manually install the Cross Memory Server, take the following steps:

1. Copy the load modules and add JCL to a PROCLIB:

    a. The Cross Memory Server has two load modules, ZWESIS01 and ZWESAUX, provided in `ZWESIS01` and `ZWESAUX` files in the `xmem-server\zss\LOADLIB` directory. To copy the files to a user-defined data set, you can issue the following commands:
    ```
    cp -X ZWESIS01 "//'<zwes_loadlib>(ZWESIS01)'"
    ```
    ```
    cp -X ZWESAUX "//'<zwes_loadlib>(ZWESAUX)'"
    ```
    Where `<zwes_loadlib>` is the name of the data set, for example ZWES.SISLOAD. The `<zwes_loadlib>` data set must be a PDSE due to language requirements.

    b. You must execute the `<zwes_loadlib>` data set by using started tasks that use a STEPLIB DD statement so that the appropriate version of the software is loaded correctly. Sample JCL for the PROCLIB is provided in ZWESIS01 and ZWESAUX files in the `xmem-server/zss/SAMPLIB` directory. Copy these to your system PROCLIB, such as SYS1.PROCLIB, or any other PROCLIB in the JES2 Concatenation PROCLIB Path.
   
    Do not add the `<zwes_loadlib>` data set to the system LNKLST or LPALST concatenations.
    
    The user IDs that are assigned to the started tasks must have a valid OMVS segment and read access to the product data sets. The Cross Memory Server loads the modules to LPA for its PC-cp services.

1. Add PPT entries to the system PARMLIB:

    a. The Cross Memory Server and its auxiliary address spaces must run in key 4 and be non-swappable. For the server to start in this environment, you must add PPT entries for the server and address spaces to the SCHEDxx member of the system PARMLIB. To add PPT entries, you can issue the following commands:

    ```
    PPT PGMNAME(ZWESIS01) KEY(4) NOSWAP
    ```
    ```
    PPT PGMNAME(ZWESAUX) KEY(4) NOSWAP
    ```
    b. Then issue the following command to make the SCHEDxx changes effective:

    ```
    /SET SCH=xx
    ```

1. Add the load libraries to the APF authorization list:

    Because the Cross Memory Server provides priviledges services, its load libraries require APF-authorization. To check whether a load library is APF-authorized, you can issue the following TSO command:

    ```
    D PROG,APF,DSNAME=ZWES.SISLOAD
    ```
    where the value of DSNAME is the name of the data set that contains the ZWESIS01 and ZWESAUX load modules.

    To dynamically add a load library to the APF list if the load library is not SMS-managed, issue the following TSO command:

    ```
    SETPROG APF,ADD,DSNAME=ZWES.SISLOAD,VOLUME=volser
    ```
    If the load library is SMS-managed, issue the following TSO command:
    ```
    SETPROG APF,ADD,DSNAME=ZWES.SISLOAD,SMS
    ```
    where the value of DSNAME is the name of the data set that contains the ZWESIS01 and ZWESAUX load modules.

1. Add a PARMLIB member:

    When started, the ZWESIS01 started task must find a valid ZWESISPxx PARMLIB member. The `xmem-server/files/zss/SAMPLIB/ZWESIP00` file contains the default configuration values. You can copy this member to your system PARMLIB data set, or allocate the default PDS data set ZWES.SISAMP that is specified in the ZWESIS01 started task JCL.

1. Configure SAF:

    The Cross Memory Server performs a sequence of SAF checks to protect its services from unauthorized callers. To do this, it uses the FACILITY class and an entry for `ZWES.IS`. Valid callers must have `READ` access to the `ZWES.IS` class. To activate the FACILITY class, define a ZWES.IS profile, and grant the IZUSVR user READ access (these commands assume that you will be running the ZOWESVR STC under the IZUSVR user), use the following commands:

    - If you use RACF, issue the following commands:

        - To see the current class settings, use:
        ```
        SETROPTS LIST
        ```  
        - To activate the FACILITY class, use:
        ```
        SETROPTS CLASSACT(FACILITY)
        ```
        - To RACLIST the FACILITY class, use:
        ```
        SETROPTS RACLIST(FACILITY)
        ```
        - To define the `ZWES.IS` profile in the FACILITY class and grant IZUSVR READ access, issue the following commands:
        ```
        RDEFINE FACILITY ZWES.IS UACC(NONE)
        ```
        ```
        PERMIT ZWES.IS CLASS(FACILITY) ID(IZUSVR) ACCESS(READ)
        ```
        ```
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
      ```
      ```
      RECKEY ZWES ADD(IS ROLE(IZUSVR) SERVICE(READ) ALLOW)
      ```
      ```
      F ACF2,REBUILD(FAC)
      ```

    - If you use CA Top Secret, issue the following commands, where `owner-acid` may be IZUSVR or a different ACID:

      ```
      TSS ADD(`owner-acid`) IBMFAC(ZWES.)
      ```
      ```
      TSS PERMIT(IZUSVR) IBMFAC(ZWES.IS) ACCESS(READ)
      ```
    **Notes**
    - The Cross Memory Server treats "no decision" style SAF return codes as failures. If there is no covering profile for the `ZWES.IS` resource in the FACILITY class, the user will be denied.
    - Cross Memory Server clients other than ZSS might have additional SAF security requirements. For more information, see the documentation for the specific client.

1. Configure an ICSF cryptographic services environment:

    To generate symmetric keys, the IZUSVR user who runs ZOWESVR requires READ access to CSFRNGL in the CSFSERV class.

    Define or check the following configurations depending on whether ICSF is already installed:
    - The ICSF or CSF job that runs on your z/OS system.
    - The configuration of ICSF options in SYS1.PARMLIB(CSFPRM00), SYS1.SAMPLIB, SYS1.PROCLIB.
    - Create CKDS, PKDS, TKDS VSAM data sets.
    - Define and activate the CSFSERV class:

        - If you use RACF, issue the following commands:
        ```
        RDEFINE CSFSERV profile-name UACC(NONE)
        ```
        ```
        PERMIT profile-name CLASS(CSFSERV) ID(tcpip-stackname) ACCESS(READ)
        ```
        ```
        PERMIT profile-name CLASS(CSFSERV) ID(userid-list)   ... [for 
        userids IKED, NSSD, and Policy Agent]
        ```
        ```
        SETROPTS CLASSACT(CSFSERV)
        ```
        ```
        SETROPTS RACLIST(CSFSERV) REFRESH
        ```
        - If you use CA ACF2, issue the following commands (note that `profile-prefix` and `profile-suffix` are user-defined):
        ```
        SET CONTROL(GSO)
        ```
        ```
        INSERT CLASMAP.CSFSERV RESOURCE(CSFSERV) RSRCTYPE(CSF)  
        ```
        ```
        F ACF2,REFRESH(CLASMAP)
        ```
        ```
        SET RESOURCE(CSF)
        ```
        ```
        RECKEY profile-prefix ADD(profile-suffix uid(UID string for tcpip-stackname) SERVICE(READ) ALLOW)   
        ```
        ```
        RECKEY profile-prefix ADD(profile-suffix uid(UID string for IZUSVR) SERVICE(READ) ALLOW)
        ```
        (repeat for userids IKED, NSSD, and Policy Agent)
        
        ```
        F ACF2,REBUILD(CSF)
        ```
        - If you use CA Top Secret, issue the following command (note that `profile-prefix` and `profile-suffix` are user defined):
        ```
        TSS ADDTO(owner-acid) RESCLASS(CSFSERV)                              
        ```
        ```                  
        TSS ADD(owner-acid) CSFSERV(profile-prefix.)
        ```
        ```
        TSS PERMIT(tcpip-stackname) CSFSERV(profile-prefix.profile-suffix) ACCESS(READ)
        ```
        ```
        TSS PERMIT(user-acid) CSFSERV(profile-prefix.profile-suffix) ACCESS(READ)
        ```
        (repeat for user-acids IKED, NSSD, and Policy Agent)
    
    **Notes**
    - The user under which zssServer runs will need READ access to CSFRNGL in the CSFSERV class.
    - Determine whether you want SAF authorization checks against CSFSERV and set `CSF.CSFSERV.AUTH.CSFRNG.DISABLE` accordingly.
    - Refer to the [z/OS 2.3.0 z/OS Cryptographic Services ICSF System Programmer's Guide: Installation, initialization, and customization](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.csfb200/iandi.htm).
    - CCA and/or PKCS #11 coprocessor for random number generation.
    - Enable FACILITY IRR.PROGRAM.SIGNATURE.VERIFICATION and RDEFINE CSFINPV2 if required.

1. Configure security environment switching:

    The node zssServer running under USS needs the ability to change the security environment of its process in order to associate itself with the security context of the logged in user when responding to API requests, also known as impersonation.  To switch the security environment, the user ID asscoaited with the ZOWESVR started task IZUSVR must have UPDATE access to the BPX.SERVER and BPX.DAEMON FACILITY classes.

    You can issue the following commands first to check if you already have the BPX facilities defined as part of another server configuration, such as the FTPD daemon. Review the output to  confirm that the two BPX facilities exist and the user who runs the ZWESIS01 and ZWESAUX started tasks (IZUSVR by default) has UPDATE access to both facilities.

    - If you use RACF, issue the following commands:
      ```
      RLIST FACILITY BPX.SERVER AUTHUSER
      ```
      ```
      RLIST FACILITY BPX.DAEMON AUTHUSER
      ```
    - If you use CA Top Secret, issue the following commands:
      ```
      TSS WHOHAS IBMFAC(BPX.SERVER)
      ```
      ```
      TSS WHOHAS IBMFAC(BPX.DAEMON)
      ```
    - If you use CA ACF2, issue the following commands:
      ```
      SET RESOURCE(FAC)
      ```
      ```
      LIST BPX
      ```

   If the user who runs the ZWESIS01 and ZWESAUX started tasks does not have UPDATE access to both facilities, follow the instructions below.

   - If you use RACF, complete the following steps:
      <details>
      <summary>Click to Expand</summary>

      1. Activate and RACLIST the FACILITY class. This may have already been done on the z/OS environment if another z/OS server has been previously configured to take advantage of the ability to change its security environment, such as the FTPD daemon that is included with z/OS Communications Server TCP/IP services.  
         ```
         SETROPTS CLASSACT(FACILITY)
         ```
         ```             
         SETROPTS RACLIST(FACILITY)                
         ```
      1. Define the BPX facilities. This may have already been done on behalf of another server such as the FTPD daemon.  
         ```
         RDEFINE FACILITY BPX.SERVER UACC(NONE)
         ```
         ```
         RDEFINE FACILITY BPX.DAEMON UACC(NONE)                 
         ```             
      1. Having activated and RACLIST the FACILITY class, the user ID who runs the ZWESIS01 started task (by default IZUSVR) must be given update access to the BPX.SERVER and BPX.DAEMON profiles in the FACILITY class.
         ```
         PERMIT BPX.SERVER CLASS(FACILITY) ID(IZUSVR) ACCESS(UPDATE)
         ```
         ```
         PERMIT BPX.DAEMON CLASS(FACILITY) ID(IZUSVR) ACCESS(UPDATE)
         /* Activate these changes */
         ```
         ```
         SETROPTS RACLIST(FACILITY) REFRESH      
         ```
      1. Issue the following commands to check whether permission has been successfully granted:
         ```
         RLIST FACILITY BPX.SERVER AUTHUSER
         ```
         ```
         RLIST FACILITY BPX.DAEMON AUTHUSER
         ```
      </details>

    - If you use CA Top Secret, complete the following steps:  
      <details>
      <summary>Click to Expand</summary>

      1. Define the BPX Resource and access for IZUSVR.
           ```
           TSS ADD(`owner-acid`) IBMFAC(BPX.)
           ```
           ```
           TSS PERMIT(IZUSVR) IBMFAC(BPX.SERVER) ACCESS(UPDATE)
           ```
           ```
           TSS PERMIT(IZUSVR) IBMFAC(BPX.DAEMON) ACCESS(UPDATE)
           ```
      1. Issue the following commands and review the output to check whether permission has been successfully granted:
           ```
           TSS WHOHAS IBMFAC(BPX.SERVER)
           ```
           ```
           TSS WHOHAS IBMFAC(BPX.DAEMON)
           ```
      </details>

    - If you use CA ACF2, complete the following steps:
      <details>
      <summary>Click to Expand</summary>

      1. Define the BPX Resource and access for IZUSVR.
           ```
           SET RESOURCE(FAC)
           ```
           ```
           RECKEY BPX ADD(SERVER ROLE(IZUSVR) SERVICE(UPDATE) ALLOW)
           ```
           ```
           RECKEY BPX ADD(DAEMON ROLE(IZUSVR) SERVICE(UPDATE) ALLOW)
           ```
           ```
           F ACF2,REBUILD(FAC)
           ```
      1. Issue the following commands and review the output to check whether permission has been successfully granted:
           ```
           SET RESOURCE(FAC)
           ```
           ```
           LIST BPX
           ```
      </details>

### Installing the Cross Memory Server using the script

For users who have sufficient authority under their user ID on the z/OS instance where they are installing the Cross Memory Server, a convenience script is provided in `xmem-server/zowe-install-apf-server.sh`. If this script does not exist, review the section [Creating the xmem-server/zss directory](#Creating-the-xmem-server/zss-directory).

- The script creates the APF authorized load library, copies the load modules, creates the PROCLIB, defines the `ZWES.IS` FACILITY class, and grants READ access to the ZOWESVR user ID.  
- The script does not create the PPT entry, which you must do manually using the steps described in the step "Add PPT entries to the system PARMLIB" in the [Manually installing the Zowe Cross Memory Server](#manually-installing-the-zowe-cross-memory-server) documentation above.
- The script will not create anything for the ICSF cryptographic services.  These are described in step "Configure an ICSF cryptographic services environment" in [Manually installing the Zowe Cross Memory Server](#manually-installing-the-zowe-cross-memory-server).

Because the parameters that are used to control the script are contained in the file `xmem-server/zowe-install-apf-server.yaml`, you must edit this file before running the `zowe-install-apf-server.sh` script with appropriate values.

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
- _install:proclib_ is the data set name that the ZWESIS01 and ZWESAUX JCL members that are used to start the ZWESIS01 and ZWESAUX started tasks will be copied into, for example, USER.PROCLIB.
- _install:parmlib_ is the data set name that the ZWESIP00 PARMLIB member will be copied into and used by the ZWESIS01 PROCLIB. Choose a value such as IZUSVR.PARMLIB.
- _install:loadlib_ is the data set name that the ZWESIS01 and ZWESAUX load modules will be copied into. This data set will be created as a PDSE and be APF authorized by the script.  Choose a value such as USER.LOADLIB.

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
- _users:stcUser_ is the user ID that the ZWESIS01 and ZWESAUX started tasks will be run under.  Enter the same value as the user ID that is running ZOWESVR, so choose IZUSVR.
- _users:stcUserUid_.  This is the Unix user ID of the TSO user ID used to run the ZWESIS01 and ZWESAUX started tasks. If the user ID is IZUSVR to see the Unix user ID enter the command `id IZUSVR` which will return the stcUserUid in the uid result.  In the example below IZUSVR has a uid of 210, so `users:stcUserUid=210` should be entered.  

    ```
   /:>id IZUSVR
   uid=210(IZUSVR) gid=202(IZUADMIN) groups=205(IZUSECAD)
    ```

- _users:stcGroup_ is the user group that the ZWESIS01 and ZWESAUX started tasks will be run under. Enter the same values as the user group that is running ZOWESVR, so choose IZUADMIN.

After you edit the `zowe-install-apf-server.yaml` file with values, add a PPT entry before you run `zowe-install-apf-server.sh`.

## Starting and stopping the Zowe runtime on z/OS

Zowe has a number of runtimes on z/OS: the z/OS Service microservice server, the Zowe Application Server, and the Zowe API Mediation Layer microservices. When you run the ZOWESVR PROC, all of these components start. Stopping ZOWESVR PROC stops all of the components that run as independent Unix processes.

### Starting the ZOWESVR PROC

To start the ZOWESVR PROC, run the `zowe-start.sh` script at the Unix Systems Services command prompt:

```
cd $ZOWE_ROOT_DIR/scripts
./zowe-start.sh
```
where:

_$ZOWE_ROOT_DIR_ is the directory where you installed the Zowe runtime. This script starts the ZOWESVR PROC for you so you do not have to log on to TSO and use SDSF.

If you prefer to use SDSF to start Zowe, start ZOWESVR by issuing the following operator command in SDSF:

```
/S ZOWESVR
```

By default, Zowe uses the runtime version that you most recently installed. To start a different runtime, specify its server path on the START command:

```
/S ZOWESVR,SRVRPATH='$ZOWE_ROOT_DIR'
```

To test whether the API Mediation Layer is active, open the URL: `https://<hostname>:7554`.

To test whether the Zowe desktop is active, open the URL: `https://<hostname>:8554`.

The port number 7554 is the default API Gateway port and the port number 8554 is the default Zowe desktop port. You can overwrite theses port in the `zowe-install.yaml` file before the `zowe-configure.sh` script is run. See the section [Port Allocations](#port-allocations).

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

## Starting and stopping the Zowe Cross Memory Server on z/OS

The Cross Memory server is as a started tasks from the JCL in the PROCLIB members ZWESIS01. It supports reusable address spaces and can be started through SDSF with the operator start command with the REUSASID=YES keyword:
```
/S ZWESIS01,REUSASID=YES
```

To end the Zowe APF Angel process, issue the operator stop command through SDSF:

```
/P ZWESIS01
```

**Note:** The starting and stopping of the ZOWESVR for the main Zowe servers is independent of the ZWESIS01 angel process. If you are running more than one ZOWESVR instance on the same LPAR, then these will be sharing the same ZWESIS01 cross memory server. Stopping ZWESIS01 will affect the behavior of all Zowe servers on the same LPAR. The Zowe Cross Memory Server is designed to be a long-lived address space. There is no requirement to recycle on a regular basis. When the cross-memory server is started with a new version of the ZWESIS01 load module, it will abandon its current load module instance in LPA and will load the updated version.
