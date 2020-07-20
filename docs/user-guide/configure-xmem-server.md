# Installing and configuring the Zowe cross memory server (ZWESISTC)

The Zowe cross memory server provides privileged cross-memory services to the Zowe Desktop and runs as an
APF-authorized program. The same cross memory server can be used by multiple Zowe desktops. If you wish to start Zowe without the desktop (for example bring up just the AII Mediation Layer), you do not need to install and configure a cross memory server and can skip this step. The cross memory server is needed to be able to log onto the Zowe desktop and operate its apps such as the File Editor.  

To install and configure the cross memory server, you must create or edit APF-authorized load libraries, program properties table (PPT) entries, and a parmlib. This requires familiarity with z/OS.

The cross memory server runtime artifacts, the JCL for the started tasks, the parmlib, and members containing sample configuration commands are found in the `SZWESAMP` PDS SAMPLIB that was created during the installation.  The load modules for the cross memory server and an auxiliary server it uses are found in the `SZWEAUTH` PDSE.  The location of these for a convenience build depends on the value of the `zowe-install.sh -h` argument, see [Install Zowe z/OS convenience build](install-zowe-zos-convenience-build.md#step-3-choose-a-dataset-hlq-for-the-samplib-and-loadlib). For an SMP/E installation, the location is the value of 
`$datasetPrefixIn` in the member `AZWE001.F1(ZWE3ALOC)`.

The cross memory server is a long running angel process server that runs under the started task `ZWESISTC` with the user ID `ZWESIUSR` and group of `ZWEADMIN`.   

The `ZWESISTC` started task runs the load module `ZWESIS01`, serves the Zowe desktop that is running under the `ZWESVSTC` started task, and provides it with secure services that require elevated privileges, such as supervisor state, system key, or APF-authorization.  The user ID `ZWESIUSR` that is assigned to the cross memory server started tasks must have a valid OMVS segment and read access to the data sets where the load library and PROCLIB are held. The cross memory server loads the modules to LPA for its PC-cp services.

To install the cross memory server enable the PROCLIB, PARMLIB and load module:

## Load Module

The cross memory server load module `ZWESIS00` is installed by Zowe into a PDSE `SZWESAMP`.  To be executed the PDSE needs to be APF authorized and the program needs to run in key(4) as non-swappable.  

### APF Authorize

You can either choose to copy the `ZWESI00` member into an existing APF authorized load library on your z//OS environment, or add the `SZWESAMP` PDSE used by the installer to the APF authorization list.  

If you installing Zowe using SMP/E it is recommended that you APF authorize the PDSE `SZWESAMP` used by the installer itself.  This will allow the SMP/E APPLY and RESTORE jobs used for applying maintenance to be operating on the runtime PDS itself without an additional copy step being required.  

To check whether a load library is APF-authorized, you can issue the following TSO command:

```
D PROG,APF,DSNAME=ZWES.SISLOAD
```
where the value of DSNAME is the name of the data set that contains the `ZWESIS01` load modules.

To dynamically add a load library to the APF list if the load library is not SMS-managed, issue the following TSO command:

```
SETPROG APF,ADD,DSNAME=ZWES.SISLOAD,VOLUME=volser
```
If the load library is SMS-managed, issue the following TSO command:
```
SETPROG APF,ADD,DSNAME=ZWES.SISLOAD,SMS
```
where the value of DSNAME is the name of the data set that contains the ZWESIS01 load modules.

If you want to authorize the loadlib permanently, then add the following statement to `SYS1.PARMLIB(PROGxx)` or equivalent

The PDS member `SZWESAMP(ZWESIMPRG)` created by the Zowe installation process contains the SETPROG statement for reference.

### Key 4 non-swappable

The cross memory server load module `ZWESIS01` must run in key 4 and be non-swappable. For the server to start in this environment, add the following PPT entries for the server and address spaces to the SCHEDxx member of the system PARMLIB.

```
PPT PGMNAME(ZWESIS01) KEY(4) NOSWAP
```

The PDS member `SZWESAMP(ZWESISCH)` contains the PPT lines for reference.
    
Then, issue the following command to make the SCHEDxx changes effective:

```
/SET SCH=xx
```

## PARMLIB

The `ZWESISTC` started task must find a valid ZWESIPxx PARMLIB member in order to be launched successfull. The `SZWESAMP` PDS created at install time contains the member `ZWESIP00` with default configuration values. You can copy this member to your system PARMLIB data set, or else leave it in the `SZWESAMP`. If you do leave it in the `SZWESAMP` used at install time this has advantages for SMP/E maintenance as the APPLY and RESTORE jobs will be working directly against the runtime library.    

## PROCLIB 

For the cross memory server to be started the JCL PROCLIB `ZWESISTC` member needs to be moved from the installation PDS SAMPLIB `SZWESAMP` into a PDS that is on the JES concatenation path.  

The  `ZWESISTC` member in the JES concatenation path needs to be updated with the location of the load library containing the load module `ZWESI00`.  This is done by editing the STEPLIB DD statement of `ZWESISTC`.  The PARMLIB DD statement needs to be edited to point to the location of the PDS containing the `ZWESIP00` member.  

Fpr example, the sample JCL below shows `ZWESVSTC` where the APF Authorized PDSE containing `ZWESI00` is `ZWESVUSR.SISLOAD` and the PDS PARMLIB containing `ZWESIP00` is `ZWESVISR.SISSAMP`.  

```jcl
//ZWESIS01 EXEC PGM=ZWESIS01,REGION=&RGN,
//         PARM='NAME=&NAME,MEM=&MEM'
//STEPLIB  DD   DSNAME=ZWESVUSR.SISLOAD,DISP=SHR
//PARMLIB  DD   DSNAME=ZWESVUSR.SISSAMP,DISP=SHR
//SYSPRINT DD   SYSOUT=*
```

## SAF configuration

The z/OS system needs to be configured in order to correctly run the cross memory server.  The steps to perform this are included in the JCL member `ZWESECUR` that is used to configure a a z/OS environment for Zowe, and documented in the section [Configure the cross memory server for SAF](configure-zos-system.md#configure-the-cross-memory-server-for-saf).

## Summary of cross memory server installation

You can start the cross memory server using the command `/S ZWESISTC` once the following steps have been completed

- JCL member `ZWESVSTC` is copied from `SZWESAMP` installation PDS to a PDS on the JES concatention path 
- The PDSE Load Library `SZWEAUTH`is APF authorized, or Load Module `ZWESI00` is copied to an existing APF Auth LoadLib
- The JCL member `ZWESVSTC` DD statements are updated to point to the location of `ZWESI00` and `ZWESIP00` 
- The Load Module `ZWESI00` must run in key 4 and be non-swappable by adding a PPT entry to the SCHEDxx member of the system PARMLIB `PPT PGMNAME(ZWESI00) KEY(4) NOSWAP`


## Starting and stopping the cross memory server on z/OS

The cross memory server is run as a started task from the JCL in the PROCLIB member `ZWESISTC`. It supports reusable address spaces and can be started through SDSF with the operator start command with the REUSASID=YES keyword:
```
/S ZWESISTC,REUSASID=YES
```

To end the Zowe cross memory server process, issue the operator stop command through SDSF:

```
/P ZWESISTC
```
**Note:** 

The starting and stopping of the `ZWESVSTC` for the main Zowe servers is independent of the `ZWESISTC` cross memory server that is an angel process. If you are running more than one `ZWESVSTC` instance on the same LPAR, then these will be sharing the same `ZWESISTC` cross memory server. Stopping `ZWESISTC` will affect the behavior of all Zowe servers on the same LPAR that use the same cross-memory server name, for example ZWESIS_STD. The Zowe Cross Memory Server is designed to be a long-lived address space. There is no requirement to recycle regularly. When the cross-memory server is started with a new version of the ZWESIS01 load module, it abandons its current load module instance in LPA and loads the updated version.

To diagnose problems that may occur with the Zowe `ZWESVSTC` being able to attach to the `ZWESISTC` cross memory server, a log file `zssServer-yyyy-mm-dd-hh-mm.log` is created in the instance directory `/logs` folder each time a Zowe `ZWESVSTC` instance is started.  More details on diagnosing errors can be found in [Zowe Application Framework issues](../troubleshoot/app-framework/app-troubleshoot.md#cannot-log-in-to-the-zowe-desktop).


## Zowe Auxiliary service

Under some situations in support of a Zowe extension, the cross memory server will start, control, and stop an auxiliary address space. This run as a `ZWESASTC` started task that runs the load module `ZWESAUX`.  Under normal Zowe operation, you will not see any auxiliary address spaces started. However, if you have installed a vendor product running on top of Zowe, this may use the auxiliary service so it should be configured to be launchable.  A vendor product documentation will specify whether it needs the Zowe auxiliary service to be configured so be certain it is needed before attempting the configuration steps.

If you are just using core Zowe functionality you **do not** need to configure the auxiliary service.  Even with the Zowe auxiliary service configured there is no situation under which you should manually start the `ZWESASTC` started task.

### Installing the Auxiliary service

The steps to install the auxiliary service to allow it to run are similar to the steps to installing and configuring the cross memory server described above, but with a different JCL PROBLIC member and a different load module.  There is no PARMLIB for the auxiliary service.

- JCL member `ZWESASTC` is copied from `SZWESAMP` installation PDS to a PDS on the JES concatention path 
- The PDSE Load Library `SZWEAUTH`is APF authorized, or Load Module `ZWESAUX` is copied to an existing APF Auth LoadLib
- The Load Module `ZWESAUX` must run in key 4 and be non-swappable by adding a PPT entry to the SCHEDxx member of the system PARMLIB `PPT PGMNAME(ZWESAUX) KEY(4) NOSWAP`

The cross memory `ZWESISTC` task starts and stops the `ZWESASTC` task as needed. **Do not start the `ZWESASTC` task manually.**