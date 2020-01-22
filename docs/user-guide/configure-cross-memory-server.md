# Configuring the Zowe cross memory server

The cross memory server artefacts are installed in the `SZWESAMP` PDS SAMPLIB and the load modules are installed in the `SZWEAUTH` PDS load library.  The location of these is dependent on the value of the `zowe-install.sh -h` argument for a convenience build installation, or <<JRW ADD SMP/E value>>.

The cross memory server is used by the Zowe desktop to run APF authorized code.  If you do not use the Zowe desktop, you do not need to install, configure and launch the cross memory server.

To install and configure the cross memory server, you must create or edit APF authorized load libraries, program properties table (PPT) entries, and a parmlib. This requires familiarty with z/OS.  

The angel process server runs under the started task ZWESISTC. 

The `ZWESISTC` started task runs the load module `ZWESIS01`, serves the Zowe desktop that is running under the `ZWESVSTC` started task, and provides it with secure services that require elevated privileges, such as supervisor state, system key, or APF-authorization. 

Under some situations the cross memory server will start, control, and stop an auxiliary address space. This run as a `ZWESASTC` started task that runs the load module `ZWESAUX`.  Under normal Zowe operation you will not see any auxiliary address spaces started, however vendor products running on top of Zowe may exploit its service so it should be configured to be launchable.  

## Installing the Zowe cross memory server

To install the cross memory server, take the following steps either manually or use the supplied convenience script `zowe-install-xmem-server.sh`.  

### Cross memory PROCLIB and load libary

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
  
The user ID `ZWESIUSR` that is assigned to the cross memory server started tasks must have a valid OMVS segment and read access to the data sets where the load library and PROCLIB are held. The cross memory server loads the modules to LPA for its PC-cp services.

### Add PPT entries to the system PARMLIB:

    The cross memory server and its auxiliary address spaces must run in key 4 and be non-swappable. For the server to start in this environment, add the following PPT entries for the server and address spaces to the SCHEDxx member of the system PARMLIB.

    ```
    PPT PGMNAME(ZWESIS01) KEY(4) NOSWAP
    ```
    ```
    PPT PGMNAME(ZWESAUX) KEY(4) NOSWAP
    ```
    The PDS member `SZWESAMP(ZWESISCH)` contains the PPT lines for reference
    
    Then issue the following command to make the SCHEDxx changes effective:

    ```
    /SET SCH=xx
    ```

### Add the load libraries to the APF authorization list:

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

### Configure SAF:

    The cross memory server performs a sequence of SAF checks to protect its services from unauthorized callers. To do this, it uses the FACILITY class and a `ZWES.IS` entry. Valid callers must have READ access to the `ZWES.IS` profile. Those callers include the STC user `ZWESVUSR` under which the ZWESVSTC started task runs. It is recommended that you also grant READ access to the STC user under which the ZWESASTC started task runs which is `ZWESIUSR`.

    The commands required to configure SAF for the cross memory server are included in a JCL member `ZWESECUR` that is delivered with Zowe,  see [Configuring z/OS system](configure-zos-system.md#configure-cross-memory-server-for-saf)
 
### Configure an IVSF cryptographic services environment
    
    To generate symmetric keys, the user `ZWESVUSR` who runs `ZWESVSTC` requires  READ access to CSFRNGL in the CSFSERV class.

    For commands required to configure ICSF cryptographic services environment for symmetric key generation, see [Configuring z/OS system](configure-zos-system.md#configure-an-ICSF-cryptographic-services-environment).

### Configure security environment switching:

    When responding to API requests, the Zowe desktop node API server running under USS must be able to change the security environment of its process to associate itself with the security context of the logged in user. This is called impersonation.

    For commands requireid to configure impersonation, see [Configuring z/OS system](configure-zos-system.md#configure-security-environment-switching).

