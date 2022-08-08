# Installing and configuring the Zowe cross memory server (ZWESISTC)

The Zowe cross memory server, also known as ZIS, provides privileged cross-memory services to the Zowe Desktop and runs as an
APF-authorized program. The same cross memory server can be used by multiple Zowe desktops. The cross memory server is needed to be able to log on to the Zowe desktop and operate its apps such as the Code Editor.  If you wish to start Zowe without the desktop (for example bring up just the API Mediation Layer), you do not need to install and configure a cross memory server and can skip this step. 

To install and configure the cross memory server, you must define APF-authorized load libraries, program properties table (PPT) entries, and a parmlib. This requires familiarity with z/OS.

- [PDS sample library and PDSE load library](#pds-sample-library-and-pdse-load-library)
- [Load module](#load-module)
    - [APF authorize](#apf-authorize)
    - [Key 4 non-swappable](#key-4-non-swappable)
- [PARMLIB](#parmlib)
- [PROCLIB](#proclib)
- [SAF configuration](#saf-configuration)
- [Summary of cross memory server installation](#summary-of-cross-memory-server-installation)
- [Starting and stopping the cross memory server on z/OS](#starting-and-stopping-the-cross-memory-server-on-zos)
- [Zowe auxiliary service](#zowe-auxiliary-service)
    - [When to configure the auxiliary service](#when-to-configure-the-auxiliary-service)
    - [Installing the auxiliary service](#installing-the-auxiliary-service)

## PDS sample library and PDSE load library

The cross memory server runtime artifacts, the JCL for the started tasks, the parmlib, and members containing sample configuration commands are found in the `SZWESAMP` PDS sample library.  

The load modules for the cross memory server and an auxiliary server it uses are found in the `SZWEAUTH` PDSE.  

  - **Convenience Build** The location of `SZWESAMP` and `SZWEAUTH` for a convenience build depends on the value of the `zowe.setup.dataset.prefix` parameters in the `zowe.yaml` file used to configure the `zwe install` command, see [Install the MVS data sets](./install-zowe-zos-convenience-build.md#step-5-install-the-mvs-data-sets).

  - **SMP/E** For an SMP/E installation, `SZWESAMP` and `SZWEAUTH` are the SMP/E target libraries whose location depends on the value of the `#thlq` placeholder in the sample member `AZWE001.F1(ZWE3ALOC)`.

The cross memory server is a long running server process that, by default, runs under the started task name `ZWESISTC` with the user ID `ZWESIUSR` and group of `ZWEADMIN`.   

The `ZWESISTC` started task serves the Zowe desktop that is running under the `ZWESLSTC` started task, and provides it with secure services that require elevated privileges, such as supervisor state, system key, or APF-authorization.  

The user ID `ZWESIUSR` that is assigned to the cross memory server started tasks must have a valid OMVS segment and read access to the load library `SZWEAUTH` and PARMLIB data sets. The cross memory server loads some functions to LPA for its PC-cp services.

To install the cross memory server, enable the PROCLIB, PARMLIB, and load module. This topic describes the steps to do this manually. 

## Load module

The cross memory server load module `ZWESIS00` is installed by Zowe into a PDSE `SZWEAUTH`.  For the cross memory server to be started, the load module needs to be APF-authorized and the program needs to run in key(4) as non-swappable.  

### APF authorize

APF authorize the PDSE `SZWESAUTH`.  This allows the SMP/E APPLY and RESTORE jobs used for applying maintenance to be operating on the runtime PDSE itself when PTF maintenance is applied.  

Do not add the `SZWEAUTH` data set to the system LNKLIST or LPALST concatenations.  

To check whether a load library is APF-authorized, you can issue the following command:

```
D PROG,APF,DSNAME=hlq.SZWEAUTH
```
where the value of DSNAME is the name of the `SZWEAUTH` data set as created during Zowe installation that contains the `ZWESIS01` load module.

Issue one of the following operator commands to dynamically add the load library to the APF list (until next IPL), where the value of DSNAME is the name of the `SZWEAUTH` data set, as created during Zowe installation.  

- If the load library is not SMS-managed, issue the following operator command, where `volser` is the name of the volume that holds the data set:

  ```
  SETPROG APF,ADD,DSNAME=hlq.SZWEAUTH,VOLUME=volser
  ```
- If the load library is SMS-managed, issue the following operator command:

  ```
  SETPROG APF,ADD,DSNAME=hlq.SZWEAUTH,SMS
  ```

#### Configuring using `zwe init apfauth` 

If you are using the `zwe init` command to configure your z/OS system, the step `zwe init apfauth` can be used to generate the `SETPROG` commands and execute them directly.  This takes the input parameters `zowe.setup.mvs.authLoadLib` for the `SZWEAUTH` PDS location, and `zowe.setup.mvs.authPluginLib` for the location of the PDS that is used to contain plugins for the cross memory server.  For more information on `zwe init apfauth` see, [APF Authorize Load Libraries](apf-authorize-load-library.md).

#### Making APF auth be part of the IPL

Add one of the following lines to your active `PROGxx` PARMLIB member, for example `SYS1.PARMLIB(PROG00)`, to ensure that the APF authorization is added automatically after next IPL. The value of `DSNAME` is the name of the `SZWEAUTH` data set, as created during Zowe installation:  

- If the load library is not SMS-managed, add the following line, where `volser` is the name of the volume that holds the data set:
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

The `ZWESISTC` started task must find a valid `ZWESIPxx` PARMLIB member in order to be launched successfully. The `SZWESAMP` PDS created at installation time contains the member `ZWESIP00` with default configuration values. You can copy this member to another data set, for example your system PARMLIB data set, or else leave it in `SZWESAMP`.  

If you choose to leave `ZWESIPxx` in the installation PDS `SZWESAMP` used at installation time, this has advantages for SMP/E maintenance because the APPLY and RESTORE jobs will be working directly against the runtime library.    

Wherever you place the `ZWESIP00` member, ensure that the data set is listed in the `PARMLIB DD` statement of the started task `ZWESISTC`.  

## PROCLIB 

For the cross memory server to be started, you must move the JCL PROCLIB `ZWESISTC` member from the installation PDS SAMPLIB `SZWESAMP` into a PDS that is on the JES concatenation path.  

You need to update the `ZWESISTC` member in the JES concatenation path with the location of the load library that contains the load module `ZWESIS01` by editing the STEPLIB DD statement of `ZWESISTC`.  Edit the PARMLIB DD statement to point to the location of the PDS that contains the `ZWESIP00` member.  

For example, the sample JCL below shows `ZWESISTC` where the APF-authorized PDSE containing `ZWESIS01` is `IBMUSER.ZWEV2.SZWEAUTH(ZWESIS01)` and the PDS PARMLIB containing `ZWESIP00` is `IBMUSER.ZWEV2.SZWESAMP(ZWESIP00)`.  

```cobol
//ZWESIS01 EXEC PGM=ZWESIS01,REGION=&RGN,
//         PARM='NAME=&NAME,MEM=&MEM'
//STEPLIB  DD   DSNAME=IBMUSER.ZWEV2.SZWEAUTH,DISP=SHR
//PARMLIB  DD   DSNAME=IBMUSER.ZWEV2.SZWESAMP,DISP=SHR
//SYSPRINT DD   SYSOUT=*
```

## SAF configuration

Because the ZIS server makes z/OS security calls it restrits which clients are able to use it services, by requiring them to have `READ` access to a security profile `ZWES.IS` in the `FACILITY` class.  

The Zowe launcher started task `ZWESLSTC` needs to be able to access the ZIS server, which requires that the user ID `ZWESVUSR` has access to `ZWES.IS`.  The steps to do this are desribed in [Configure the cross memory server for SAF](configure-zos-system.md#configure-the-cross-memory-server-for-saf).  

## Summary of cross memory server installation

You can start the cross memory server using the command `/S ZWESISTC` once the following steps have been completed.

- JCL member `ZWESVSTC` is copied from `SZWESAMP` installation PDS to a PDS on the JES concatenation path.
- The PDSE Load Library `SZWEAUTH`is APF-authorized, or Load module `ZWESI00` is copied to an existing APF Auth LoadLib.
- The JCL member `ZWESVSTC` DD statements are updated to point to the location of `ZWESI00` and `ZWESIP00`. 
- The load module `ZWESI00` must run in key 4 and be non-swappable by adding a PPT entry to the SCHEDxx member of the system PARMLIB `PPT PGMNAME(ZWESI00) KEY(4) NOSWAP`.

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

The starting and stopping of the `ZWESVSTC` started task for the main Zowe servers is independent of the `ZWESISTC` cross memory server, which is an angel process. If you are running more than one `ZWESVSTC` instance on the same LPAR, then these will be sharing the same `ZWESISTC` cross memory server. Stopping `ZWESISTC` will affect the behavior of all Zowe servers on the same LPAR that use the same cross-memory server name, for example ZWESIS_STD. The Zowe Cross Memory Server is designed to be a long-lived address space. There is no requirement to recycle regularly. When the cross-memory server is started with a new version of its load module, it abandons its current load module instance in LPA and loads the updated version.

To diagnose problems that may occur with the Zowe `ZWESVSTC` not being able to attach to the `ZWESISTC` cross memory server, a log file `zssServer-yyyy-mm-dd-hh-mm.log` is created in the log directory each time ZIS is started.  More details on diagnosing errors can be found in [Zowe Application Framework issues](../troubleshoot/app-framework/app-troubleshoot.md#cannot-log-in-to-the-zowe-desktop).


## Zowe auxiliary service

Under some situations in support of a Zowe extension, the cross memory server will start, control, and stop an auxiliary address space. This run as a `ZWESASTC` started task that runs the load module `ZWESAUX`. 

### When to configure the auxiliary service

Under normal Zowe operation, you will not see any auxiliary address spaces started. However, if you have installed a vendor product running on top of Zowe, this may use the auxiliary service so it should be configured to be launchable.  A vendor product documentation will specify whether it needs the Zowe auxiliary service to be configured so ensure that it is needed before attempting the configuration steps.

If you are just using core Zowe functionality, you **do not** need to configure the auxiliary service.  Even with the Zowe auxiliary service configured, there is no situation under which you should manually start the `ZWESASTC` started task.

### Installing the auxiliary service

To install the auxiliary service to allow it to run, you take similar steps to install and configure the cross memory server as described above, but with a different JCL PROBLIC member and a different load module. There is no PARMLIB for the auxiliary service.

- JCL member `ZWESASTC` is copied from `SZWESAMP` installation PDS to a PDS on the JES concatenation path. 
- The PDSE load library `SZWEAUTH`is APF-authorized, or load module `ZWESAUX` is copied to an existing APF Auth LoadLib.
- The load module `ZWESAUX` must run in key 4 and be non-swappable by adding a PPT entry to the SCHEDxx member of the system PARMLIB `PPT PGMNAME(ZWESAUX) KEY(4) NOSWAP`.

**Important!**

The cross memory `ZWESISTC` task starts and stops the `ZWESASTC` task as needed. **Do not start the `ZWESASTC` task manually.**
