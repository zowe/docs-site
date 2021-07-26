# Configuring the z/OS system for Zowe

Configure the z/OS security manager to prepare for launching the Zowe started tasks.  

If Zowe has already been launched on a z/OS system from a previous release of Version 1.8 or later, then you are applying a newer Zowe build. You can skip this security configuration step unless told otherwise in the release documentation.

A SAMPLIB JCL member `ZWESECUR` is provided to assist with the security configuration. You can submit the `ZWESECUR` JCL member as-is or customize it depending on site preferences.  The JCL allows you to vary which security manager you use by setting the _PRODUCT_ variable to be one of `RACF`, `ACF2`, or `TSS`.  

```
//         SET PRODUCT=RACF          * RACF, ACF2, or TSS
```
If `ZWESECUR` encounters an error or a step that has already been performed, it will continue to the end, so it can be run repeatedly in a scenario such as a pipeline automating the configuration of a z/OS environment for Zowe installation.  

It is expected that the security administrator at a site will want to review, edit where necessary, and either execute `ZWESECUR` as a single job or else execute individual TSO commands one by one to complete the security configuration of a z/OS system in preparation for installing and running Zowe.

If you want to undo all of the z/OS security configuration steps performed by the JCL member `ZWESECUR`, Zowe provides a reverse member `ZWENOSEC` that contains the inverse steps that `ZWESECUR` performs.  This is useful in the following situations: 
- You are configuring z/OS systems as part of a build pipeline that you want to undo and redo configuration and installation of Zowe using automation.
- You have configured a z/OS system for Zowe that you no longer want to use and you prefer to delete the Zowe user IDs and undo the security configuration settings rather than leave them enabled.  

If you run `ZWENOSEC` on a z/OS system, then you will no longer be able to run Zowe until you rerun `ZWESECUR` to reinitialize the z/OS security configuration.

When you run the `ZWESECUR` JCL, it does not perform the following initialization steps. Therefore, you must complete these steps manually for a z/OS environment.  
- [Grant users permission to access z/OSMF](#grant-users-permission-to-access-z-osmf)
- [Configure an ICSF cryptographic services environment](#configure-an-icsf-cryptographic-services-environment)
- [Configure multi-user address space (for TSS only)](#configure-multi-user-address-space-for-tss-only) 

The `ZWESECUR` JCL performs the following initialization steps so you do not need to perform them manually if you have successfully run the JCL.  These steps are included for reference if you prefer to manually configure the z/OS environment or want to learn more about user IDs, groups, and associated security permissions that are required to operate Zowe.  
- [User IDs and groups for the Zowe started tasks](#user-ids-and-groups-for-the-zowe-started-tasks)
- [Configure ZWESVSTC to run under ZWESVUSR user ID](#configure-zwesvstc-to-run-under-zwesvusr-user-ID)
- [Configure the cross memory server for SAF](#configure-the-cross-memory-server-for-saf)


## Grant users permission to access z/OSMF

TSO user IDs using Zowe must have permission to access the z/OSMF services that are used by Zowe. They should be added to the group with appropriate z/OSMF privileges, `IZUUSER` or `IZUADMIN` by default.  This step is not included in `ZWESECUR` because it must be done for every TSO user ID who wants to access Zowe's z/OS services.  The list of those user IDs is not known by `ZWESECUR` and will typically be the operators, administrators, developers, or anyone else in the z/OS environment who is logging in to Zowe.

**Note:** You can skip this section if you use Zowe without z/OSMF.  Zowe can operate without z/OSMF but services that use z/OSMF REST APIs will not be available, specifically the USS, MVS, and JES Explorers and the Zowe Command Line Interface files, jobs, workflows, tso, and console groups.

For every TSO user ID that is going to log on to Zowe and use services that require z/OSMF,

- If you use RACF, issue the following command:

  ```
  CONNECT (userid) GROUP(IZUUSER)
  ```

- If you use CA ACF2, issue the following commands:

  ```
  ACFNRULE TYPE(TGR) KEY(IZUUSER) ADD(UID(<uid string of user>) ALLOW)
  F ACF2,REBUILD(TGR)
  ```

- If you use CA Top Secret, issue the following commands:

  ```
  TSS ADD(userid)  PROFILE(IZUUSER)
  TSS ADD(userid)  GROUP(IZUUSRGP) 
  ```

## Configure an ICSF cryptographic services environment

The zssServer uses cookies that require random number generation for security. To learn more about the zssServer, see the [Zowe architecture](../getting-started/zowe-architecture.md#zssserver). Integrated Cryptographic Service Facility (ICSF) is a secure way to generate random numbers. 

If you have not configured your z/OS environment for ICSF, see [Cryptographic Services ICSF: System Programmer's Guide](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.csfb200/abstract.htm) for more information.  To see whether ICSF has been started, check whether the started task `ICSF` or `CSF` is active.

The Zowe z/OS environment configuration JCL member `ZWESECUR` does not perform any steps related to ICSF that is required for zssServer that the Zowe desktop uses. Therefore, if you want to use Zowe desktop, you must perform the steps that are described in this section manually.

To generate symmetric keys, the `ZWESVUSR` user who runs `ZWESVSTC` requires READ access to `CSFRNGL` in the `CSFSERV` class.

Define or check the following configurations depending on whether ICSF is already installed:

- The ICSF or CSF job that runs on your z/OS system.
- The configuration of ICSF options in `SYS1.PARMLIB(CSFPRM00)`, `SYS1.SAMPLIB`, `SYS1.PROCLIB`.
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

**Notes:**

- Determine whether you want SAF authorization checks against `CSFSERV` and set `CSF.CSFSERV.AUTH.CSFRNG.DISABLE` accordingly.
- Refer to the [z/OS 2.3.0 z/OS Cryptographic Services ICSF System Programmer's Guide: Installation, initialization, and customization](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.csfb200/iandi.htm).
- CCA and/or PKCS #11 coprocessor for random number generation.
- Enable `FACILITY IRR.PROGRAM.SIGNATURE.VERIFICATION` and `RDEFINE CSFINPV2` if required.

## Configure security environment switching
    
Typically, the user `ZWESVUSR` that the `ZWESVSTC` started task runs under needs to be able to change the security environment of its process to allow API requests to be issued on behalf of the logged on TSO user ID, rather than the server's user ID.  This capability provides the functionality that allows users to log on to the Zowe desktop and use apps such as the File Editor to list data sets or USS files that the logged on user is authorized to view and edit, rather than the user ID running the Zowe server. This technique is known as **impersonation**.  

To enable impersonation, you must grant the user ID `ZWESVUSR` associated with the `ZWESVSTC` started task UPDATE access to the `BPX.SERVER` and `BPX.DAEMON` profiles in the `FACILITY` class.

You can issue the following commands first to check whether you already have the impersonation profiles defined as part of another server configuration, such as the FTPD daemon. Review the output to confirm that the two impersonation profiles exist and the user `ZWESVUSR` who runs the `ZWESVSTC` started task has UPDATE access to both profiles.

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

If the user `ZWESVUSR` who runs the ZWESVSTC started task does not have UPDATE access to both profiles follow the instructions below.

- If you use RACF, complete the following steps:
      
   1. Activate and RACLIST the FACILITY class. This may have already been done on the z/OS environment if another z/OS server has been previously configured to take advantage of the ability to change its security environment, such as the FTPD daemon that is included with z/OS Communications Server TCP/IP services.  
      ```
      SETROPTS GENERIC(FACILITY)
      SETROPTS CLASSACT(FACILITY) RACLIST(FACILITY)                
      ```
   2. Define the impersonation profiles. This may have already been done on behalf of another server such as the FTPD daemon.  
      ```
      RDEFINE FACILITY BPX.SERVER UACC(NONE)
      ```
      ```
      RDEFINE FACILITY BPX.DAEMON UACC(NONE)                 
      ```             
   3. Having activated and RACLIST the FACILITY class, the user ID `ZWESVUSR` who runs the ZWESVSTC started task must be given update access to the BPX.SERVER and BPX.DAEMON profiles in the FACILITY class.
      ```
      PERMIT BPX.SERVER CLASS(FACILITY) ID(<zwesvstc_user>) ACCESS(UPDATE)
      ```
      ```
      PERMIT BPX.DAEMON CLASS(FACILITY) ID(<zwesvstc_user>) ACCESS(UPDATE)
      ```
      where <zwesvstc_user> is `ZWESVUSR` unless a different user ID is being used for the z/OS environment. 

      /* Activate these changes */

      ```
      SETROPTS RACLIST(FACILITY) REFRESH      
      ```
   4. Issue the following commands to check whether permission has been successfully granted:
      ```
      RLIST FACILITY BPX.SERVER AUTHUSER
      ```
      ```
      RLIST FACILITY BPX.DAEMON AUTHUSER
      ```
- If you use CA Top Secret, complete the following steps:  
      
   1. Define the BPX Resource and access for <zwesvstc_user>.
      ```
      TSS ADD(`owner-acid`) IBMFAC(BPX.)
      ```
      ```
      TSS PERMIT(<zwesvstc_user>) IBMFAC(BPX.SERVER) ACCESS(UPDATE)
      ```
      ```
      TSS PERMIT(<zwesvstc_user>) IBMFAC(BPX.DAEMON) ACCESS(UPDATE)
      ```
      where <zwesvstc_user> is `ZWESVUSR` unless a different user ID is being used for the z/OS environment.  
   2. Issue the following commands and review the output to check whether permission has been successfully granted:
      ```
      TSS WHOHAS IBMFAC(BPX.SERVER)
      ```
      ```
      TSS WHOHAS IBMFAC(BPX.DAEMON)
      ```
- If you use CA ACF2, complete the following steps:
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
      where <zwesvstc_user> is `ZWESVUSR` unless a different user ID is being used for the z/OS environment.  
      ```
      F ACF2,REBUILD(FAC)
      ```
   2. Issue the following commands and review the output to check whether permission has been successfully granted:
      ```
      SET RESOURCE(FAC)
      ```
      ```
      LIST BPX
      ```

## Configure address space job naming

The user ID `ZWESVUSR` that is associated with the Zowe started task `ZWESVSTC` must have `READ` permission for the `BPX.JOBNAME` profile in the `FACILITY` class. This is to allow setting of the names for the different z/OS UNIX address spaces for the Zowe runtime components. See [Address space names](configure-instance-directory.md#address-space-names).

To display who is authorized to the profile, issue the following command:
```
RLIST FACILITY BPX.JOBNAME AUTHUSER
```

Additionally, you need to activate facility class, permit `BPX.JOBNAME`, and refresh facility class:
```
SETROPTS CLASSACT(FACILITY) RACLIST(FACILITY)
PERMIT BPX.JOBNAME CLASS(FACILITY) ID(ZWESVUSR) ACCESS(READ)
SETROPTS RACLIST(FACILITY) REFRESH
```

For more information, see [Setting up the UNIX-related FACILITY and SURROGAT class profiles](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.bpxb200/fclass.htm) in the "z/OS UNIX System Services" documentation.

## Configure multi-user address space (for TSS only)

The `ZWESVSTC` started task is multi-user address space, and therefore a TSS FACILITY needs to be defined and assigned to the started task. Then, all acids signing on to the started task will need to be authorized to the FACILITY.

The following example shows how to create a new TSS FACILITY.

**Example:**

In the TSSPARMS, add the following lines to create the new FACILITY:
```
FACILITY(USER11=NAME=ZOWE)
FACILITY(ZOWE=MODE=FAIL)
FACILITY(ZOWE=RES) 
```
For more information about how to administer Facility Matrix Table, see [How to Perform Facility Matrix Table Administration](https://techdocs.broadcom.com/content/broadcom/techdocs/us/en/ca-mainframe-software/security/ca-top-secret-for-z-os/16-0/using/protecting-facilities/how-to-perform-facility-matrix-table-administration.html).

To assign the FACILITY to the started task, issue the following command:                                                  
```
TSS ADD(ZWESVUSR) MASTFAC(ZOWE)
```

To authorize a user to sign on to the FACILITY, issues the following command:
```
TSS ADD(user_acid) FAC(ZOWE)
```

## User IDs and groups for the Zowe started tasks

Zowe requires a user ID `ZWESVUSR` to execute its main z/OS runtime started task `ZWESVSTC`. This user ID must have a valid OMVS segment.

Zowe requires a user ID `ZWESIUSR` to execute the cross memory server started task `ZWESISTC`. This user ID must have a valid OMVS segment.

Zowe requires a group `ZWEADMIN` that both `ZWESVUSR` and `ZWESIUSR` should belong to. This group must have a valid OMVS segment.

If you have run `ZWESECUR`, you do not need to perform the steps described in this section, because the TSO commands to create the user IDs and groups are executed during the JCL sections of `ZWESECUR`.  

```
/* group for started tasks                          */
...
/* userid for ZOWE main server                      */
...
/* userid for XMEM cross memory server              */
...
```

If you have not run `ZWESECUR` and are manually creating the user ID and groups in your z/OS environment, the commands are described below for reference.  

- To create the `ZWEADMIN` group, issue the following command:
  ```
  ADDGROUP ZWEADMIN OMVS(AUTOGID) -
  DATA('STARTED TASK GROUP WITH OMVS SEGEMENT')
  ```

- To create the `ZWESVUSR` user ID for the main Zowe started task, issue the following command:
  ```
    ADDUSER  ZWESVUSR -
    NOPASSWORD -
    DFLTGRP(ZWEADMIN) -
    OMVS(HOME(/tmp) PROGRAM(/bin/sh) AUTOUID) -
    NAME('ZOWE SERVER') -
    DATA('ZOWE MAIN SERVER')
  ```

- To create the `ZWESIUSR` group for the Zowe cross memory server started task, issue the following command:
  ```
    ADDUSER ZWESIUSR -
    NOPASSWORD -
    DFLTGRP(ZWEADMIN) -
    OMVS(HOME(/tmp) PROGRAM(/bin/sh) AUTOUID) -
    NAME('ZOWE XMEM SERVER') -
    DATA('ZOWE XMEM CROSS MEMORY SERVER')
  ```

## Configure ZWESVSTC to run under ZWESVUSR user ID

When the Zowe started task `ZWESVSTC` is started, it must be associated with the user ID `ZWESVUSR` and group `ZWEADMIN`.  A different user ID and group can be used if required to conform with existing naming standards.

If you have run `ZWESECUR`, you do not need to perform the steps described in this section, because they are executed during the JCL section of `ZWESECUR`.  
```
/* started task for ZOWE main server                   */
...
```

If you have not run `ZWESECUR` and are configuring your z/OS environment manually, the following steps describe how to configure the started task `ZWESVSTC` to run under the correct user ID and group.  

- If you use RACF, issue the following commands:
  ```
  RDEFINE STARTED ZWESVSTC.* UACC(NONE) STDATA(USER(ZWESVUSR) GROUP(ZWEADMIN) PRIVILEGED(NO) TRUSTED(NO) TRACE(YES))  
  SETROPTS REFRESH RACLIST(STARTED)
  ```

- If you use CA ACF2, issue the following commands:

  ```
  SET CONTROL(GSO)
  INSERT STC.ZWESVSTC LOGONID(ZWESVUSR) GROUP(ZWEADMIN) STCID(ZWESVSTC)
  F ACF2,REFRESH(STC)
  ```

- If you use CA Top Secret, issue the following commands:

  ```
  TSS ADDTO(STC) PROCNAME(ZWESVSTC) ACID(ZWESVUSR)
  ```

## Configure the cross memory server for SAF

Zowe has a cross memory server that runs as an APF-authorized program with key 4 storage.  Client processes accessing the cross memory server's services must have READ access to a security profile `ZWES.IS` in the `FACILITY` class.  This authorization step is used to guard against access by non-priviledged clients.  

If you have run `ZWESECUR` you do not need to perform the steps described in this section, as they are executed during the JCL section of `ZWESECUR`.  
```
/* permit Zowe main server to use XMEM cross memory server       */
...
```

If you have not run `ZWESECUR` and are configuring your z/OS environment manually, the following steps describe how to configure the cross memory server for SAF.

Activate the FACILITY class, define a `ZWES.IS` profile, and grant READ access to the user ID `ZWESVUSR`.  This is the user ID that the Zowe started task `ZWESVSTC` runs under. 
    
To do this, issue the following commands that are also included in the `ZWESECUR` JCL member. The commands assume that you run the `ZWESVSTC` under the `ZWESVUSR` user.

- If you use RACF, issue the following commands:

    - To see the current class settings, use:
        ```
        SETROPTS LIST
        ```  
    - To define and activate the FACILITY class, use:
        ```
        SETROPTS GENERIC(FACILITY)
        SETROPTS CLASSACT(FACILITY)
        ```
    - To RACLIST the FACILITY class, use:
        ```
        SETROPTS RACLIST(FACILITY)
        ```
    - To define the `ZWES.IS` profile in the FACILITY class and grant Zowe's started task userid READ access, issue the following commands:
        ```
        RDEFINE FACILITY ZWES.IS UACC(NONE)
        ```
        ```
        PERMIT ZWES.IS CLASS(FACILITY) ID(<zwesvstc_user>) ACCESS(READ)
        ```
        where `<zwesvstc_user>` is the user ID `ZWESVUSR` under which the ZWESVSTC started task runs.
        ```
        SETROPTS RACLIST(FACILITY) REFRESH
        ```
    - To check whether the permission has been successfully granted, issue the following command:
        ```
        RLIST FACILITY ZWES.IS AUTHUSER
        ```
        This shows the user IDs who have access to the `ZWES.IS` class, which should include Zowe's started task user ID with READ access.

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

- If you use CA Top Secret, issue the following commands, where `owner-acid` can be IZUSVR or a different ACID:

    ```
    TSS ADD(`owner-acid`) IBMFAC(ZWES.)
    ```
    ```
    TSS PERMIT(ZWESVUSR) IBMFAC(ZWES.IS) ACCESS(READ)
    ```
**Notes:**

- The cross memory server treats "no decision" style SAF return codes as failures. If there is no covering profile for the `ZWES.IS` resource in the FACILITY class, the request will be denied.
- Cross memory server clients other than Zowe might have additional SAF security requirements. For more information, see the documentation for the specific client.

## Configure main Zowe server use identity mapping
This security configuration is necessary for API ML to be able to map client certificate to zOS identity. User running API Gateway must have read access to RACF general resource called IRR.RUSERMAP in the FACILITY class. 
This security setup is done by submitting `ZWESECUR` JCL member. For users upgrading from version 1.16 and lower, follow the configuration steps below.

If you use RAFC, follow these steps to verify and update permission in FACILITY class.
1. verify user `ZWESVUSR` has read access

    ```
    RLIST FACILITY IRR.RUSERMAP AUTHUSER
    ```

2. add user `ZWESVUSR` permission to read
    ```
    PERMIT IRR.RUSERMAP CLASS(FACILITY) ACCESS(READ) ID(ZWESVUSR)
    ```
3. activate changes
    ```
    SETROPTS RACLIST(FACILITY) REFRESH
    ```
If you use ACF2, follow these steps to verify and update permission in FACILITY class.
1. verify user `ZWESVUSR` has read access
    ```      
    SET RESOURCE(FAC) 
    LIST LIKE(IRR-)
    ```    
2. add user `ZWESVUSR` permission to read
    ```
    RECKEY IRR.RUSERMAP ADD(SERVICE(READ) ROLE(&STCGRP.) ALLOW)
    ```
If you use TSS, follow these steps to verify and update permission in FACILITY class.
1. verify user `ZWESVUSR` has read access
    ```      
    TSS WHOHAS IBMFAC(IRR.RUSERMAP)
    ```    
2. add user `ZWESVUSR` permission to read
    ```
    TSS PER(ZWESVUSR) IBMFAC(IRR.RUSERMAP) ACCESS(READ)
    ```
