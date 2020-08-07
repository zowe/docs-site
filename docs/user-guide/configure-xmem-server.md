# Installing and configuring the Zowe cross memory server (ZWESISTC)

The Zowe cross memory server provides privileged cross-memory services to the Zowe Desktop and runs as an
APF-authorized program. The same cross memory server can be used by multiple Zowe desktops. If you wish to start Zowe without the desktop (for example bring up just the AII Mediation Layer), you do not need to install and configure a cross memory server and can skip this step. The cross memory server is needed to be able to log onto the Zowe desktop and operate its apps such as the File Editor.  

To install and configure the cross memory server, you must define APF-authorized load libraries, program properties table (PPT) entries, and a parmlib. This requires familiarity with z/OS.

## PDS Sample Library and PDSE load library

The cross memory server runtime artifacts, the JCL for the started tasks, the parmlib, and members containing sample configuration commands are found in the `SZWESAMP` PDS sample library.  

The load modules for the cross memory server and an auxiliary server it uses are found in the `SZWEAUTH` PDSE.  

The location of `SZWESAMP` and `SZWEAUTH` for a convenience build depends on the value of the `zowe-install.sh -h` argument, see [Install Zowe z/OS convenience build](install-zowe-zos-convenience-build.md#step-3-choose-a-dataset-hlq-for-the-samplib-and-loadlib). 

For an SMP/E installation `SZWESAMP` and `SZWEAUTH` are the SMP/E target libraries whose location depends on the value of the `#thlq` placeholder in sample member `AZWE001.F1(ZWE3ALOC)`.

The cross memory server is a long running server process, by default, that runs under the started task name `ZWESISTC` with the user ID `ZWESIUSR` and group of `ZWEADMIN`.   

The `ZWESISTC` started task serves the Zowe desktop that is running under the `ZWESVSTC` started task, and provides it with secure services that require elevated privileges, such as supervisor state, system key, or APF-authorization.  

The user ID `ZWESIUSR` that is assigned to the cross memory server started tasks must have a valid OMVS segment and read access to the load library `SZWEAUTH` and PARMLIB data sets. The cross memory server loads some functions to LPA for its PC-cp services.

To install the cross memory server enable the PROCLIB, PARMLIB and load module:

For customers wishing to perform scripted cross memory server installation and configuration see [Scripted Installation and Configuration of Zowe z/OS components](scripted-configure-server.md).  The steps to this manually are described below.  

## Load Module

The cross memory server load module `ZWESIS00` is installed by Zowe into a PDSE `SZWEAUTH`.  For the cross memory server to be started the local module needs to be APF-authorized and the program needs to run in key(4) as non-swappable.  

### APF Authorize

APF authorize the PDSE `SZWESAUTH`.  This will allow the SMP/E APPLY and RESTORE jobs used for applying maintenance to be operating on the runtime PDSE itself when PTF maintenance is applied.  

Do not add the `SZWEAUTH` data set to the system LNKLIST or LPALST concatenations.  

To check whether a load library is APF-authorized, you can issue the following TSO command:

```
D PROG,APF,DSNAME=hlq.SISLOAD
```
where the value of DSNAME is the name of the `SZWEAUTH` data set as created during Zowe install that contains the `ZWESIS01` load module.

Issue one of the following operator commands to dynamically add the load library to the APF list (until next IPL), where the value of DSNAME is the name of the `SZWEAUTH` data set, as created during Zowe install.  

- If the load library is not SMS-managed issue the following operator command, where volser is the name of the volume that holds the data set:

  ```
  SETPROG APF,ADD,DSNAME=ZWES.SISLOAD,VOLUME=volser
  ```
- If the load librar is SMS-managed, issue the following operator command:

  ```
  SETPROG APF,ADD,DSNAME=hlq.SZWEAUTH,SMS
  ```

Add one of the following lines to your active `PROGxx` PARMLIB member, for example `SYS1.PARMLIB(PROG00)` to ensure the APF authorization is added automatically after next IPL. The value of `DSNAME` is the name of the `SZWEAUTH` data set, as created during Zowe install:  

- if the load library is not SMS-managed, add the following line, where volser is the name of the volume that holds the data set:
  ```
  APF ADD DSNAME=hlq.SZWEAUTH VOLUME=volser
  ```
- If the load library is SMS-managed, add the following line:
  ```
  APF ADD DSNAME=hlq.SZWEAUTH SMS
  ```

The PDS member `SZWESAMP(ZWESIMPRG)` contains the SETPROG statement and PROGxx update for reference.

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

The `ZWESISTC` started task must find a valid `ZWESIPxx` PARMLIB member in order to be launched successfully. The `SZWESAMP` PDS created at install time contains the member `ZWESIP00` with default configuration values. You can copy this member to another data set, for example your system PARMLIB data set, or else leave it in `SZWESAMP`.  

If you chose to leave `ZWESIPxx` in the installation PDS `SZWESAMP` used at install time this has advantages for SMP/E maintenance because the APPLY and RESTORE jobs will be working directly against the runtime library.    

Wherever you place the `ZWESIP00` member ensure the data set is listed in the `PARMLIB DD` statement of the started task `ZWESISTC`.  

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
The ZWESISTC task starts and stops the ZWESASTC task as needed. Do not start the ZWESASTC task manually.

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