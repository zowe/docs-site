# Configuring the Zowe runtime

After you install Zowe&trade; through either the convenience build by running the `zowe-install.sh` command or through the SMP/E build by running the RECEIVE and APPLY jobs, you will have a Zowe runtime directory or <ROOT_DIR> in USS as well as a PDS SAMPLIB and a PDS load library in MVS.

<<OLD table of contents>>

1. [Prerequisites](#prerequisites)
1. [Configuring the Zowe runtime directory](#configuring-the-zowe-runtime-directory)
   1. [Environment variables](#environment-variables)
   1. [Configuration variables](#configuration-variables)
      - [Address space name](#address-space-name)
      - [Port allocations](#port-allocations)
      - [PROCLIB member name](#proclib-member-name)
      - [Certificates](#certificates)
      - [Unix File Permissions](#unix-file-permissions)
1. [Configuring the ZWESVSTC started task](#configuring-the-zwesvstc-started-task)
    1. [Creating the ZWESVSTC PROCLIB member to launch the Zowe runtime](#creating-the-zowesvr-proclib-member-to-launch-the-zowe-runtime)
    1. [Configuring ZWESVSTC to run under the correct user ID](#configuring-zowesvr-to-run-under-the-correct-user-id)
    1. [Granting users permission to access Zowe](#granting-users-permission-to-access-zowe)
1. [The Zowe Cross Memory Server](#the-zowe-cross-memory-server)
	  - [Manually installing the Zowe Cross Memory Server](#manually-installing-the-zowe-cross-memory-server)
	  - [Installing the Cross Memory Server using the script](#installing-the-cross-memory-server-using-the-script)
1. [Starting and stopping the Zowe runtime on z/OS](#starting-and-stopping-the-zowe-runtime-on-zos)
    - [Starting the ZWESVSTC PROC](#starting-the-zowesvr-proc)
    - [Stopping the ZWESVSTC PROC](#stopping-the-zowesvr-proc)
1. [Starting and stopping the Zowe Cross Memory Server on z/OS](#starting-and-stopping-the-zowe-cross-memory-server-on-zos)


Before lauching Zowe there are two additional USS folders that need to be created.  

## Zowe instance directory

The Zowe instance directory contains contains configuration data required to launch a Zowe runtime and is where log files are stored.   

More than one instance directory can be used for the same Zowe runtime, allowing different configurations to have different port ranges, to have different version pre-requisites (node, Java) and to bring up different subsystems.

More information on Zowe instance directories is in [Zowe instance directory](configure-instance-directory.md)

## Zowe keystore directory

The Zowe keystore directory contains the key used by the Zowe desktop and the Zowe API mediation layer to secure its TLS communication with clients (such as web browsers or REST AI clients). The keystore directory also has a trust store where public keys of any servers that Zowe communicates to (such as z/OSMF) are held.

A keystore directory needs to be created for a Zowe instance to be launched successfully, and a keystore directory can be shared between Zowe instances and between Zowe runtimes.  

More information on Zowe keystore directories is in [Configuring Zowe certificate store](configure-certificates.md).


## Configuring the ZWESVSTC started task

Zowe has a number of runtimes on z/OS: the z/OS Service microservice server, the Zowe Application Server, and the Zowe API Mediation Layer microservices. A single PROCLIB `ZWESVSTC` is used to start all of these microservices.  This member is installed by Zowe into the data set SAMPLIB `SZWESAMP` during the installation or either a convenience build or SMP/E.  The steps to configure the z/OS runtime in order to launch the started task are described in [Configuring the Zowe started task](#configuring-zowe-server.md).


## The Zowe Cross Memory Server

The Zowe Cross Memory Server provides privileged cross-memory services to Zowe. The Zowe Desktop requires that the server be installed, configured, and started. The Zowe API Mediation Layer does not.

### Overview

The Cross Memory Server has two components: an angel process server and its auxiliary address spaces. Each runs as a started task. The Cross Memory Server uses the angel process server address space and starts, controls, and delegates work to the auxiliary (AUX) address spaces.

An example use case would be a system service that requires supervisor state but cannot run in cross-memory mode. The service can run in an AUX address space and be invoked by the Cross Memory Server, which acts as a proxy for unauthorized users of the service. 

To install and configure the Cross Memory Server, you must create or edit APF authorized load libraries, program properties table (PPT) entries, and a parmlib. You can configure the Cross Memory Server one of the following ways:
- Manually
- Using a script

Before you choose a method, read the documentation below. Manual installation requires familiarity with z/OS. Running the script requires the ID of the user to have required authorities and priviledges.

The angel process server runs under the started task ZWESTSTC. The auxiliary address spaces run under the started task ZWESASTC. The ZWESITC started task starts and stops the ZWESASTC task as needed. You do not start or stop the ZWESASTC manually.

The ZWESISTC started task runs the load module ZWESIS01, serves the ZWESVSTC started task, and provides secure services that require elevated privileges, such as supervisor state, system key, or APF-authorization. The ZWESASTC started task runs the load module ZWESAUX.

### Manually installing the Zowe Cross Memory Server
<!-- TODO. Entire sub-section -->

A number of files used by the manual installation are included in the USS directory `xmem-server/zss`. Before you start the installation, check and ensure that the `xmem-server/zss` directory is in the Zowe runtime directory. If it does not exist, follow these steps to create it and extract the `xmem-server/zss.pax` file, which places the files into it:

1. Navigate to the `xmem-server` directory.
2. To create the `zss` directory, enter the command: `mkdir zss`
3. To navigate to the `zss` directory, enter the command: `cd zss`
4. To extract the `zss.pax` file and place required files into the `xmem-server/zss` directory, enter the command: `pax -ppx -rf ../zss.pax`

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

    b. You must specify the `<zwes_loadlib>` data set in the STEPLIB DD statement of the two PROCLIB JCL members which are used for the cross-memory server's started tasks, so that the appropriate version of the software is loaded correctly. Sample JCL for these PROCLIB members is provided in the ZWESISTC and ZWESASTC files in the `xmem-server/zss/SAMPLIB` directory. Copy these to your system PROCLIB, such as SYS1.PROCLIB, or your preferred PROCLIB in the JES2 Concatenation.
   
    Do not add the `<zwes_loadlib>` data set to the system LNKLST or LPALST concatenations.
    
    The user IDs that are assigned to the started tasks must have a valid OMVS segment and read access to the product data sets. The Cross Memory Server loads the modules to LPA for its PC-cp services.

1. Add PPT entries to the system PARMLIB:

    a. The Cross Memory Server and its auxiliary address spaces must run in key 4 and be non-swappable. For the server to start in this environment, add the following PPT entries for the server and address spaces to the SCHEDxx member of the system PARMLIB.

    ```
    PPT PGMNAME(ZWESIS01) KEY(4) NOSWAP
    ```
    ```
    PPT PGMNAME(ZWESAUX) KEY(4) NOSWAP
    ```
    The PDS member `SZWESAMP(ZWESISCH)` contains the PPT lines for reference
    
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

    If you wish to authorize the loadlib permanently then add the following statement to `SYS1.PARMLIB(PROGxx)` or equivalent

    The PDS member `SZWESAMP(ZWESIMPRG)` contains the SETPROG statement for reference.

1. Add a PARMLIB member:

    When started, the ZWESISTC started task must find a valid ZWESIPxx PARMLIB member. The `xmem-server/files/zss/SAMPLIB/ZWESIP00` file contains the default configuration values. You can copy this member to your system PARMLIB data set, or allocate the default PDS data set ZWES.SISAMP that is specified in the ZWESISTC started task JCL.

1. Configure SAF:

    The Cross Memory Server performs a sequence of SAF checks to protect its services from unauthorized callers. To do this, it uses the FACILITY class and a `ZWES.IS` entry. Valid callers must have READ access to the `ZWES.IS` profile. Those callers include the STC user under which the ZWESVSTC started task runs. It is recommended that you also grant READ access to the STC user under which the ZWESASTC started task runs.
    
    To activate the FACILITY class, define a `ZWES.IS` profile, and grant READ access to the ZWESVSTC and ZWESASTC users, issue the following commands. (The commands assume that you will run the ZWESVSTC STC under the IZUSVR user):

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
        PERMIT ZWES.IS CLASS(FACILITY) ID(<zwesastc_user>) ACCESS(READ)
        ```
        where `<zwesastc_user>` is the user under which the ZWESASTC started task runs.
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

    To generate symmetric keys, the IZUSVR user who runs ZWESVSTC requires READ access to CSFRNGL in the CSFSERV class.

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

    When responding to API requests, the node zssServer running under USS must be able to change the security environment of its process to associate itself with the security context of the logged in user. This is called impersonation.
    
    Typically, the zssServer runs under the ZWESVSTC started task. So to enable impersonation, you must grant the user ID associated with the ZWESVSTC started task UPDATE access to the BPX.SERVER and BPX.DAEMON FACILITY classes.

    You can issue the following commands first to check if you already have the BPX facilities defined as part of another server configuration, such as the FTPD daemon. Review the output to confirm that the two BPX facilities exist and the user who runs the ZWESVSTC started task has UPDATE access to both facilities.

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

   If the user who runs the ZWESVSTC started task does not have UPDATE access to both facilities, follow the instructions below.

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
      1. Having activated and RACLIST the FACILITY class, the user ID who runs the ZWESVSTC started task must be given update access to the BPX.SERVER and BPX.DAEMON profiles in the FACILITY class.
         ```
         PERMIT BPX.SERVER CLASS(FACILITY) ID(<zwesvstc_user>) ACCESS(UPDATE)
         ```
         ```
         PERMIT BPX.DAEMON CLASS(FACILITY) ID(<zwesvstc_user>) ACCESS(UPDATE)
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

      1. Define the BPX Resource and access for <zss_server_user>.
           ```
           TSS ADD(`owner-acid`) IBMFAC(BPX.)
           ```
           ```
           TSS PERMIT(<zwesvstc_user>) IBMFAC(BPX.SERVER) ACCESS(UPDATE)
           ```
           ```
           TSS PERMIT(<zwesvstc_user>) IBMFAC(BPX.DAEMON) ACCESS(UPDATE)
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

      1. Define the BPX Resource and access for <zwesvstc_user>.
           ```
           SET RESOURCE(FAC)
           ```
           ```
           RECKEY BPX ADD(SERVER ROLE(<zwesvstc_user>) SERVICE(UPDATE) ALLOW)
           ```
           ```
           RECKEY BPX ADD(DAEMON ROLE(<zwesvstc_user>) SERVICE(UPDATE) ALLOW)
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

Users with sufficient z/OS authority can install the Cross Memory Server using a script. The script, `xmem-server/zowe-install-apf-server.sh`, reads configuration parameters from the  `xmem-server/zowe-install-apf-server.yaml` file. The script creates the USS directory `xmem-server/zss` in the Zowe runtime directory by expanding the file `xmem-server/zss.pax`. The script creates the APF authorized load library, copies the load modules, creates the PROCLIB, defines the `ZWES.IS` FACILITY class, and grants READ access to the STC user under which the ZWESVSTC started task runs. 

The script does not perform the following tasks:

- Grant READ access to the STC user under which the ZWESASTC started task runs, which is recommended. You must grant access by following the step "Configure SAF" in the [Manually installing the Zowe Cross Memory Server](#manually-installing-the-zowe-cross-memory-server) documentation above.
- Create the required PPT entries. You must create these by following the step "Add PPT entries to the system PARMLIB" in the [Manually installing the Zowe Cross Memory Server](#manually-installing-the-zowe-cross-memory-server) documentation above.
- Configure anything for ICSF cryptographic services. If you have this environment, follow the step "Configure an ICSF cryptographic services environment" in [Manually installing the Zowe Cross Memory Server](#manually-installing-the-zowe-cross-memory-server) documentation above.

#### Installing using the script

1. Specify the following data set parameters in the `xmem-server/zowe-install-apf-server.yaml` file:

```
 # Datasets that APF server will be installed into
 install:
   # PROCLIB dataset name (required, no default values)
   proclib=
   # PARMLIB dataset name (${USER}.PARMLIB by default)
   parmlib=
   # LOADLIB dataset name (${USER}.LOADLIB by default)
   loadlib=
   # ZSS server name (default name is ZWESIS_STD),
   # make sure that this equals to zssCrossMemoryServerName in zlux-server in zowe-install.yaml
   zssCrossMemoryServerName=ZWESIS_STD
```

where,

- _install:proclib_ is the data set name that the ZWESISTC and ZWESASTC JCL members that are used to start the ZWESISTC and ZWESASTC started tasks will be copied into, for example, USER.PROCLIB.
- _install:parmlib_ is the data set name that the ZWESIP00 PARMLIB member will be copied into and used by the ZWESISTC PROCLIB. Choose a value such as IZUSVR.PARMLIB.
- _install:loadlib_ is the data set name that the ZWESIS01 and ZWESAUX load modules will be copied into. This data set will be created as a PDSE and be APF authorized by the script.  Choose a value such as USER.LOADLIB.
- _zssCrossMemoryServerName_ is the name of the ZSS Cross Memory Server. The default name is `ZWESIS_STD`. If you want to run only one version of Zowe, you can use the default name. If you want to run different versions of Zowe in parallel, you must specify a unique name for each Zowe instance. If you want to test a new version of Zowe in parallel to an older version, you must change the default name to a unique one when you install the new version.

2. Specify the following user parameters in the `xmem-server/zowe-install-apf-server.yaml` file:

```
 # APF server users
 users:
  # User to run Zowe server (required, no default values)
  zoweUser=
  # TSS Facility Owner (Required for TSS. 'auto' supplies the running user)
  tssFacilityOwner=auto
  # APF server STC user (ZWESISTC by default)
  stcUser=
  # APF server STC user UID (required if STC user doesn't exist)
  stcUserUid=
  # STC user group (required if either STC user or profile doesn't exist)
  stcGroup=
```

where:

- _users:zoweUser_ is the TSO user ID that the ZWESVSTC started task runs under.  For the majority of installs, this will be IZUSVR, so enter IZUSVR as the value, and the script will give this user access to the `READ ZWES.IS FACILITY` class that allows Zowe to use the cross memory server.
- _tssFacilityOwner_ - If you specify `auto` (which must be lower case), the result of running the command `id -u -n` will be used as the value. Otherwise, the given value will be used.
- _users:stcUser_ is the user ID that the ZWESISTC and ZWESASTC started tasks will be run under.  Enter the same value as the user ID that is running ZWESVSTC, so choose IZUSVR.
- _users:stcUserUid_.  This is the Unix user ID of the TSO user ID used to run the ZWESISTC and ZWESASTC started tasks. If the user ID is IZUSVR to see the Unix user ID enter the command `id IZUSVR` which will return the stcUserUid in the uid result.  In the example below IZUSVR has a uid of 210, so `users:stcUserUid=210` should be entered.  

    ```
   /:>id IZUSVR
   uid=210(IZUSVR) gid=202(IZUADMIN) groups=205(IZUSECAD)
    ```

- _users:stcGroup_ is the user group that the ZWESISTC and ZWESASTC started tasks will be run under. Enter the same values as the user group that is running ZWESVSTC, so choose IZUADMIN.

3. Add required PPT entries, grant the ZWESAUX user READ access, and if necessary configure an ICSF cryptographic services environment. 

4. Run the `zowe-install-apf-server.sh` script.

## Starting and stopping the Zowe runtime on z/OS

Zowe has a number of runtimes on z/OS: the z/OS Service microservice server, the Zowe Application Server, and the Zowe API Mediation Layer microservices. When you run the ZWESVSTC PROC, all of these components start. Stopping ZWESVSTC PROC stops all of the components that run as independent Unix processes.

### Starting the ZWESVSTC PROC

To start the ZWESVSTC PROC, run the `zowe-start.sh` script at the Unix Systems Services command prompt:

```
cd $ZOWE_INSTANCE_DIR/bin
./zowe-start.sh
```
where:

_$ZOWE_INSTANCE_DIR_ is the directory where you set the instance directory to. This script starts the ZWESVSTC PROC for you so you do not have to log on to TSO and use SDSF.

If you prefer to use SDSF to start Zowe, start ZWESVSTC by issuing the following operator command in SDSF:

```
/S ZWESVSTC,INSTANCE='$ZOWE_INSTANCE_DIR'
```

To test whether the API Mediation Layer is active, open the URL: `https://<hostname>:7554`.

To test whether the Zowe desktop is active, open the URL: `https://<hostname>:8554`.

The port number 7554 is the default API Gateway port and the port number 8554 is the default Zowe desktop port. You can overwrite theses port in the `zowe-install.yaml` file before the `zowe-configure.sh` script is run. See the section [Port Allocations](#port-allocations).

### Stopping the ZWESVSTC PROC

To stop the ZWESVSTC PROC, run the `zowe-stop.sh` script at the Unix Systems Services command prompt:

```
cd $ZOWE_INSTANCE_DIR/bin
./zowe-stop.sh
```

If you prefer to use SDSF to stop Zowe, stop ZWESVSTC by issuing the following operator command in SDSF:

    ```
    /C ${ZOWE_PREFIX}${ZOWE_INSTANCE}SV
    ```
    Where ZOWE_PREFIX and ZOWE_INSTANCE are specified in your configuration (and default to ZWE and 1)

Either method will stop the z/OS Service microservice server, the Zowe Application Server, and the zSS server.

When you stop the ZWESVSTC, you might get the following error message:

```
IEE842I ZWESVSTC DUPLICATE NAME FOUND- REENTER COMMAND WITH 'A='
```

This error results when there is more than one started task named ZWESVSTC. To resolve the issue, stop the required ZWESVSTC instance by issuing the following commands:

```
/C ${ZOWE_PREFIX}${ZOWE_INSTANCE}SV,A=asid
```
Where ZOWE_PREFIX and ZOWE_INSTANCE are specified in your configuration (and default to ZWE and 1) and you can obtain the _asid_ from the value of `A=asid` when you issue the following commands:

```
/D A,${ZOWE_PREFIX}${ZOWE_INSTANCE}SV
```

## Starting and stopping the Zowe Cross Memory Server on z/OS

The Cross Memory server is run as a started task from the JCL in the PROCLIB member ZWESISTC. It supports reusable address spaces and can be started through SDSF with the operator start command with the REUSASID=YES keyword:
```
/S ZWESISTC,REUSASID=YES
```
The ZWESISTC task starts and stops the ZWESSTC task as needed. Do not start the ZWESASTC task manually.

To end the Zowe APF Angel process, issue the operator stop command through SDSF:

```
/P ZWESISTC
```

**Note:** The starting and stopping of the ZWESVSTC for the main Zowe servers is independent of the ZWESISTC angel process. If you are running more than one ZWESVSTC instance on the same LPAR, then these will be sharing the same ZWESISTC cross memory server. Stopping ZWESISTC will affect the behavior of all Zowe servers on the same LPAR which use the same cross-memory server name, for example ZWESIS_STD. The Zowe Cross Memory Server is designed to be a long-lived address space. There is no requirement to recycle on a regular basis. When the cross-memory server is started with a new version of the ZWESIS01 load module, it will abandon its current load module instance in LPA and will load the updated version.
