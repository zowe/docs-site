# Configuring the Zowe cross memory server

The cross memory server artefacts are installed in the `SZWESAMP` PDS SAMPLIB and the load modules are installed in the `SZWEAUTH` PDS load library.  The location of these is dependent on the value of the `zowe-install.sh -h` argument for a convenience build installation, or <<JRW ADD SMP/E value>>.

The cross memory server is used by the Zowe desktop to run APF authorized code.  If you do not use the Zowe desktop, you do not need to install, configure and launch the cross memory server.

To install and configure the cross memory server, you must create or edit APF authorized load libraries, program properties table (PPT) entries, and a parmlib. This requires familiarty with z/OS.  

The angel process server runs under the started task ZWESISTC. 

The `ZWESISTC` started task runs the load module `ZWESIS01`, serves the Zowe desktop that is running under the `ZWESVSTC` started task, and provides it with secure services that require elevated privileges, such as supervisor state, system key, or APF-authorization. 

Under some situations the cross memory server will start, control, and stop an auxiliary address space. This run as a `ZWESASTC` started task that runs the load module `ZWESAUX`.  Under normal Zowe operation you will not see any auxiliary address spaces started, however vendor products running on top of Zowe may exploit its service so it should be configured to be launchable.  

## Installing the Zowe cross memory server

To install the cross memory server, take the following steps either manually or use the supplied convenience script `zowe-install-xmem-server.sh`.  

1. Copy the load modules and add JCL to a PROCLIB:

    a. **Load modules** The cross memory server has two load modules, `ZWESIS01` and `ZWESAUX`, provided in the PDS `SZWEAUTH` created during the installation of Zowe.  To copy the files to a user-defined data set, you can issue the following commands:
    ```
    cp -X ZWESIS01 "//'<zwes_loadlib>(ZWESIS01)'"
    ```
    ```
    cp -X ZWESAUX "//'<zwes_loadlib>(ZWESAUX)'"
    ```
    Where `<zwes_loadlib>` is the name of the data set, for example ZWES.SISLOAD. The `<zwes_loadlib>` data set must be a PDSE due to language requirements.

    b. **Prob libraries** The cross memory server PROCLIB JCL is `ZWESISTC` and the auxiliary address space PROCLIB JCL is `ZWESASTC`.  
    
    You must specify the `<zwes_loadlib>` data set where `ZWESIS01` and `ZWESAUX` were copied to, in the STEPLIB DD statement of the two PROCLIB JCLs, so that the appropriate version of the software is loaded correctly. 
    
    Do not add the `<zwes_loadlib>` data set to the system LNKLST or LPALST concatenations.

2. Add a `ZWESIP00` PARMLIB member for the `ZWESISTC` started task:

    When started, the ZWESISTC started task must find a valid ZWESIPxx PARMLIB member. The `SZWESAMP` PDS contains the member `ZWESIP00` containing default configuration values. You can copy this member to your system PARMLIB data set, or allocate the default PDS data set ZWES.SISAMP that is specified in the ZWESISTC started task JCL.
    
A convenience script `<ROOT_DIR>/scripts/utils/zowe-install-xmem.sh` is shipped with Zowe to help with copying the cross memory and auxiliary address space PROCLIB members, the PARMLIB member, and the load libraries. 

The script `zowe-install-xmem.sh` takes four arguments:


**First Parameter**=Source PDS Prefix

Dataset prefix of the source PDS where .SZWESAMPE(ZWESVSTC) was installed into.  

For an installation from a convenience build this will be the value of `install:datasetPrefix` in `zowe-install.yaml` file. 

For an SMP/E installation thils will be the value of 
`$datasetPrefixIn` in the member AZWE001.F1(ZWE3ALOC)

**Second Parameter**=Target DSN Load Library 

This is the data set name of the PDSE where members `ZWESIS01` and `ZWESAUX` will be copieid into.  This must be an APF authorized PDS.  

**Third Parameter**=Target DSN for PARMLIB

This is the data set name of where the PARMLIB `ZWESIP00` will be placed.

**Fourth Parameter**=Target DSN for PROCLIB

Target PROCLIB PDS where ZWESVSTC will be placed.  If parameter is omitted the script scans the JES PROCLIB concatenation path and uses the first dataset where the user has write access

***Example*** Executing the command `zowe-install-xmem.sh MYUSERID.ZWE SYS1.IBM.ZIS.SZISLOAD SYS1.IBM.PARMLIB USER.PROCLIB` with four parameters specified copies:

    - the load modules `MYUSERID.ZWE.SZWEAUTH(ZWESIS01)` and `MYUSERID.ZWE.SZWEAUTH(ZWESAUX)` to the load ibrary `SYS.IBM.ZIS.SZISLOAD`
    - the PARMLIB member `MYUSERID.ZWE.SZWESAMP(ZWESIP00)` to `SYS1.IBM.PARMLIB(ZWESIP00)`
    - the PROCLIB member `MYUSERID.ZWE.SZWESAMP(ZWESISTC)` to `USER.PROCLIB(ZWESISTC` and `MYUSERID.ZWE.SZWESAMP(ZWESASTC)` to `USER.PROCLIB(ZWESASTC)`

<<JRW TO FINISH>>
  
    The user IDs that are assigned to the started tasks must have a valid OMVS segment and read access to the product data sets. The cross memory server loads the modules to LPA for its PC-cp services.

1. Add PPT entries to the system PARMLIB:

    a. The cross memory server and its auxiliary address spaces must run in key 4 and be non-swappable. For the server to start in this environment, add the following PPT entries for the server and address spaces to the SCHEDxx member of the system PARMLIB.

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

    Because the cross memory server provides priviledges services, its load libraries require APF-authorization. To check whether a load library is APF-authorized, you can issue the following TSO command:

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



1. Configure SAF:

    The cross memory server performs a sequence of SAF checks to protect its services from unauthorized callers. To do this, it uses the FACILITY class and a `ZWES.IS` entry. Valid callers must have READ access to the `ZWES.IS` profile. Those callers include the STC user under which the ZWESVSTC started task runs. It is recommended that you also grant READ access to the STC user under which the ZWESASTC started task runs.
    
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
    - The cross memory server treats "no decision" style SAF return codes as failures. If there is no covering profile for the `ZWES.IS` resource in the FACILITY class, the user will be denied.
    - cross memory server clients other than ZSS might have additional SAF security requirements. For more information, see the documentation for the specific client.

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

### Installing the cross memory server using the script

Users with sufficient z/OS authority can install the cross memory server using a script. The script, `xmem-server/zowe-install-apf-server.sh`, reads configuration parameters from the  `xmem-server/zowe-install-apf-server.yaml` file. The script creates the USS directory `xmem-server/zss` in the Zowe runtime directory by expanding the file `xmem-server/zss.pax`. The script creates the APF authorized load library, copies the load modules, creates the PROCLIB, defines the `ZWES.IS` FACILITY class, and grants READ access to the STC user under which the ZWESVSTC started task runs. 

The script does not perform the following tasks:

- Grant READ access to the STC user under which the ZWESASTC started task runs, which is recommended. You must grant access by following the step "Configure SAF" in the [Manually installing the Zowe cross memory server](#manually-installing-the-zowe-cross-memory-server) documentation above.
- Create the required PPT entries. You must create these by following the step "Add PPT entries to the system PARMLIB" in the [Manually installing the Zowe cross memory server](#manually-installing-the-zowe-cross-memory-server) documentation above.
- Configure anything for ICSF cryptographic services. If you have this environment, follow the step "Configure an ICSF cryptographic services environment" in [Manually installing the Zowe cross memory server](#manually-installing-the-zowe-cross-memory-server) documentation above.

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
- _zssCrossMemoryServerName_ is the name of the ZSS cross memory server. The default name is `ZWESIS_STD`. If you want to run only one version of Zowe, you can use the default name. If you want to run different versions of Zowe in parallel, you must specify a unique name for each Zowe instance. If you want to test a new version of Zowe in parallel to an older version, you must change the default name to a unique one when you install the new version.

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
