# Installing and configuring the Zowe cross memory server (ZWESISTC)

The Zowe cross memory server provides privileged cross-memory services to the Zowe Desktop and runs as an
APF-authorized program. The same cross memory server can be used by multiple Zowe desktops. You must install, configure, and launch the cross memory server if you want to use the Zowe desktop. Otherwise, you can skip this step.

To install and configure the cross memory server, you must create or edit APF-authorized load libraries, program properties table (PPT) entries, and a parmlib. This requires familiarity with z/OS.

 The cross memory server runtime artifacts, the JCL for the started tasks, the parmlib, and members containing sample configuration commands are installed in the `SZWESAMP` PDS SAMPLIB.  The load modules for the cross memory server and an auxiliary server it uses are installed in the `SZWEAUTH` PDS load library.  The location of these for a convenience build depends on the value of the `zowe-install.sh -h` argument, see [Install Zowe z/OS convenience build](install-zowe-zos-convenience-build.md#step-3-choose-a-dataset-hlq-for-the-samplib-and-loadlib). For an SMP/E installation, the location is the value of 
`$datasetPrefixIn` in the member `AZWE001.F1(ZWE3ALOC)`.

The cross memory server is a long running angel process server that runs under the started task `ZWESISTC` with the user ID `ZWESIUSR` and group of `ZWEADMIN`.   

The `ZWESISTC` started task runs the load module `ZWESIS01`, serves the Zowe desktop that is running under the `ZWESVSTC` started task, and provides it with secure services that require elevated privileges, such as supervisor state, system key, or APF-authorization. 

Under some situations in support of a Zowe extension, the cross memory server will start, control, and stop an auxiliary address space. This run as a `ZWESASTC` started task that runs the load module `ZWESAUX`.  Under normal Zowe operation, you will not see any auxiliary address spaces started. However, if you have installed a vendor product running on top of Zowe, this may use the auxiliary service so it should be configured to be launchable.  

To install the cross memory server, take the following steps either [manually](#copy-cross-memory-data-set-members-manually) by using `cp` commands or use the supplied [convenience script](#copy-cross-memory-data-set-members-automatically) `zowe-install-xmem.sh` for an automated installation process.

## Step 1: Copy the cross memory PROCLIB and load library

### Copy cross memory data set members manually

1. Copy the load modules and add JCL to a PROCLIB:

   For the cross memory server to be started, its load modules need to be moved to an APF-authorized PDSE, and its JCL PROCLIB members moved to a PDS in the JES concatenation path.  

    a. **Load modules** The cross memory server has two load modules, `ZWESIS01` and `ZWESAUX`, provided in the PDS `SZWEAUTH` created during the installation of Zowe.  To manually copy the files to a user-defined data set, you can issue the following commands:
    ```
    cp -X ZWESIS01 "//'<zwes_loadlib>(ZWESIS01)'"
    ```
    ```
    cp -X ZWESAUX "//'<zwes_loadlib>(ZWESAUX)'"
    ```
    Where `<zwes_loadlib>` is the name of the data set, for example ZWES.SISLOAD. The `<zwes_loadlib>` data set must be a PDSE due to language requirements.

    b. **Prob libraries** The cross memory server PROCLIB JCL is `ZWESISTC` and the auxiliary address space PROCLIB JCL is `ZWESASTC`.  
    
    You must specify the `<zwes_loadlib>` data set where `ZWESIS01` and `ZWESAUX` were copied to, in the STEPLIB DD statement of the two PROCLIB JCL members `ZWESISTC` and `ZWESASTC` respectively so that the appropriate version of the software is loaded correctly. 
    
    Do not add the `<zwes_loadlib>` data set to the system LNKLST or LPALST concatenations.

2. Add a `ZWESIP00` PARMLIB member for the `ZWESISTC` started task:

    When started, the ZWESISTC started task must find a valid ZWESIPxx PARMLIB member. The `SZWESAMP` PDS contains the member `ZWESIP00` containing default configuration values. You can copy this member to your system PARMLIB data set, or allocate the default PDS data set ZWES.SISAMP that is specified in the ZWESISTC started task JCL.

### Copy cross memory data set members automatically

Instead of the manual steps [described above](#copy-cross-memory-data-set-members-manually), a convenience script `<ROOT_DIR>/scripts/utils/zowe-install-xmem.sh` is shipped with Zowe to help with copying the cross memory and auxiliary address space PROCLIB members, the PARMLIB member, and the load libraries. 

The script `zowe-install-xmem.sh -d <dataSetPrefix> -b <loadlib> -a <parmlib> [-r <proclib>]` has the following parameters:

- **`-d <dataSetPrefix>`** - Source PDS Prefix

   Data set prefix of the source PDS where .SZWESAMP(ZWESVSTC) was installed into.  

   For an installation from a convenience build, this will be the value of `zowe-install.sh -h` when the build was installed. See [Install Zowe z/OS convenience build](install-zowe-zos-convenience-build.md#step-3-choose-a-dataset-hlq-for-the-samplib-and-loadlib)

   For an SMP/E installation, this will be the value of `$datasetPrefixIn` in the member `AZWE001.F1(ZWE3ALOC)`.

-  **`-b <loadlib>`** - Target DSN Load Library 

   This is the data set name of the PDSE where members `ZWESIS01` and `ZWESAUX` will be copied into.  This must be an APF-authorized PDS.  

- **`-a <parmlib>`** - Target DSN for PARMLIB

   This is the data set name of where the PARMLIB `ZWESIP00` will be placed.

- **`-r <proclib>`** - Target DSN for PROCLIB (optional)

   Target PROCLIB PDS where ZWESVSTC will be placed.  If parameter is omitted the script scans the JES PROCLIB concatenation path and uses the first data set where the user has write access

**Example:**

Executing the command `zowe-install-xmem.sh -d MYUSERID.ZWE -b SYS1.IBM.ZIS.SZISLOAD -a SYS1.IBM.PARMLIB -r USER.PROCLIB` copies:

 - the load modules `MYUSERID.ZWE.SZWEAUTH(ZWESIS01)` and `MYUSERID.ZWE.SZWEAUTH(ZWESAUX)` to the load library `SYS.IBM.ZIS.SZISLOAD`
- the PARMLIB member `MYUSERID.ZWE.SZWESAMP(ZWESIP00)` to `SYS1.IBM.PARMLIB(ZWESIP00)`
 - the PROCLIB member `MYUSERID.ZWE.SZWESAMP(ZWESISTC)` to `USER.PROCLIB(ZWESISTC` and `MYUSERID.ZWE.SZWESAMP(ZWESASTC)` to `USER.PROCLIB(ZWESASTC)`
  
The user ID `ZWESIUSR` that is assigned to the cross memory server started tasks must have a valid OMVS segment and read access to the data sets where the load library and PROCLIB are held. The cross memory server loads the modules to LPA for its PC-cp services.

## Step 2: Add PPT entries to the system PARMLIB

The cross memory server and its auxiliary address spaces must run in key 4 and be non-swappable. For the server to start in this environment, add the following PPT entries for the server and address spaces to the SCHEDxx member of the system PARMLIB.

```
PPT PGMNAME(ZWESIS01) KEY(4) NOSWAP
```
```
PPT PGMNAME(ZWESAUX) KEY(4) NOSWAP
```
The PDS member `SZWESAMP(ZWESISCH)` contains the PPT lines for reference.
    
Then, issue the following command to make the SCHEDxx changes effective:

```
/SET SCH=xx
```

## Step 3: Add the load libraries to the APF authorization list

Because the cross memory server provides privileges services, its load libraries require APF-authorization. To check whether a load library is APF-authorized, you can issue the following TSO command:

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

If you want to authorize the loadlib permanently, then add the following statement to `SYS1.PARMLIB(PROGxx)` or equivalent

The PDS member `SZWESAMP(ZWESIMPRG)` contains the SETPROG statement for reference.

## Step 4: Configure SAF

The cross memory server performs a sequence of SAF checks to protect its services from unauthorized callers. To do this, it uses the FACILITY class and a `ZWES.IS` entry. Valid callers must have READ access to the `ZWES.IS` profile. Those callers include the STC user `ZWESVUSR` under which the ZWESVSTC started task runs. It is recommended that you also grant READ access to the STC user under which the ZWESASTC started task runs which is `ZWESIUSR`.

The commands required to configure SAF for the cross memory server are included in a JCL member `ZWESECUR` that is delivered with Zowe, see [Configuring z/OS system](configure-zos-system.md#configure-cross-memory-server-for-saf)

## Step 5: Configure security environment switching

When responding to API requests, the Zowe desktop node API server running under USS must be able to change the security environment of its process to associate itself with the security context of the logged in user. This is called impersonation.  

For commands required to configure impersonation, see [Configuring the z/OS system for Zowe](configure-zos-system.md#configure-security-environment-switching).

## Starting and stopping the cross memory server on z/OS

The cross memory server is run as a started task from the JCL in the PROCLIB member `ZWESISTC`. It supports reusable address spaces and can be started through SDSF with the operator start command with the REUSASID=YES keyword:
```
/S ZWESISTC,REUSASID=YES
```
The ZWESISTC task starts and stops the ZWESSTC task as needed. Do not start the ZWESASTC task manually.

To end the Zowe cross memory server process, issue the operator stop command through SDSF:

```
/P ZWESISTC
```

**Note:** 

The starting and stopping of the `ZWESVSTC` for the main Zowe servers is independent of the `ZWESISTC` cross memory server that is an angel process. If you are running more than one `ZWESVSTC` instance on the same LPAR, then these will be sharing the same `ZWESISTC` cross memory server. Stopping `ZWESISTC` will affect the behavior of all Zowe servers on the same LPAR that use the same cross-memory server name, for example ZWESIS_STD. The Zowe Cross Memory Server is designed to be a long-lived address space. There is no requirement to recycle regularly. When the cross-memory server is started with a new version of the ZWESIS01 load module, it abandons its current load module instance in LPA and loads the updated version.

To diagnose problems that may occur with the Zowe `ZWESVSTC` being able to attach to the `ZWESISTC` cross memory server, a log file `zssServer-yyyy-mm-dd-hh-mm.log` is created in the instance directory `/logs` folder each time a Zowe `ZWESVSTC` instance is started.  More details on diagnosing errors can be found in [Zowe Application Framework issues](../troubleshoot/app-framework/app-known-issues.md#cannot-log-in-to-the-zowe-desktop)
