# Configuring a z/OS system for Zowe

Configure the z/OS security manager to prepare for launching the Zowe started tasks.

A SAMPLIB JCL member `ZWESECUR` is provided to assist with the configuration. You can submit the `ZWESECUR` JCL member as-is or customize it depending on site preferences.  The JCL allows you to vary which security manager you are using by setting the PRODUCT variable to be one of RACF, ACF2, or TSS.  

```
//         SET PRODUCT=RACF          * RACF, ACF2, or TSS
```
If `ZWESECUR` encounters an error or a step that has already been performed it will continue to the end, so it can be run repeatedly in a scenario such as a pipeline automating the configuration of a z/OS environment for Zowe installation.  

It is expected that system programmers at a site will want to review, edit where necessary, and either execute `ZWESECUR` as a single job or else execute individual TSO commmands one by one to complete the security configuration of a z/OS system in preparation for installing and running Zowe.

If Zowe has already been launched on a z/OS system from a previous release of Version 1.8 or later, then you are applying a newer Zowe build. You can skip this security configuration step unless told otherwise in the release documentation.

## User IDs and groups for the Zowe started tasks

Zowe requires a user ID `ZWESVUSR` to execute its main z/OS runtime started task `ZWESVSTC`.  
Zowe requires a user ID `ZWESIUSR` to execute the cross memory server started task `ZWESISTC`.
Zowe requires a group `ZWEADMIN` which both `ZWESVUSR` and `ZWESIUSR` should belong to.

During the install of Zowe unix file ownership and groups are modified.  For this to occur successfully the user performing the install must either be part of the `ZWEADMIN` group, or have sufficient authority to issue `chgrp` commands to assign `ZWEADMIN` as the group of folders it creates, or sufficient authority to issue `chown` commands to assign `ZWESVUSR` as the owner of folders it creates.

## Configure ZWESVSTC to run under ZWESVUSR user ID

When the Zowe started task `ZWESVSTC` is started it must be associated with the user ID `ZWESVUSR` and group `ZWEADMIN`.  A different user ID and group can be used if required to conform with existing naming stadards.


- If you use RACF, issue the following commands:

  ```
  RDEFINE STARTED ZWESVSTC.* UACC(NONE) STDATA(USER(IZUSVR) GROUP(IZUADMIN) PRIVILEGED(NO) TRUSTED(NO) TRACE(YES))  
  SETROPTS REFRESH RACLIST(STARTED)
  ```

- If you use CA ACF2, issue the following commands:

  ```
  SET CONTROL(GSO)
  INSERT STC.ZWESVSTC LOGONID(IZUSVR) GROUP(IZUADMIN) STCID(ZWESVSTC)
  F ACF2,REFRESH(STC)
  ```

- If you use CA Top Secret, issue the following commands:

  ```
  TSS ADDTO(STC) PROCNAME(ZWESVSTC) ACID(IZUSVR)
  ```

## Granting users permission to access Zowe

TSO user IDs using Zowe must have permission to access the z/OSMF services that are used by Zowe.  They should be added to the the IZUUSER or IZUADMIN group

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

## Configure Cross Memory server for SAF

Zowe has a cross memory server that runs as an APF authorized program with key 4 storage.  Client processes accessing the cross memory server's services must have READ access to a security profile `ZWES.IS`.  This authorization step is used to guard against access by non priviledged clients.  

To activate the FACILITY class, define a `ZWES.IS` profile, and grant READ access to the user IDs `ZWESVUSR` and `ZWESIUSR`.  These are the user IDs that the Zowe started task `ZWESVSTC` and the auxililary address space task `ZWESASTC` run under. 
    
The following commands can be issued to do this, which are also included in the `ZWESECUR` JCL member
    
Issue the following commands. (The commands assume that you will run the ZWESVSTC STC under the ZWESVUSR user):

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
        PERMIT ZWES.IS CLASS(FACILITY) ID(<zwesvstc_user>) ACCESS(READ)
        ```
        where `<zwesvstc_user>` is the user ID `ZWESVUSR` under which the ZWESVSTC started task runs.
        ```
        PERMIT ZWES.IS CLASS(FACILITY) ID(<zwesastc_user>) ACCESS(READ)
        ```
        where `<zwesastc_user>` is the user ID `ZWESIUSR` under which the ZWESASTC started task runs.
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


## Configure an ICSF cryptographic services environment

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
    
**Notes**
- Determine whether you want SAF authorization checks against `CSFSERV` and set `CSF.CSFSERV.AUTH.CSFRNG.DISABLE` accordingly.
- Refer to the [z/OS 2.3.0 z/OS Cryptographic Services ICSF System Programmer's Guide: Installation, initialization, and customization](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.csfb200/iandi.htm).
- CCA and/or PKCS #11 coprocessor for random number generation.
- Enable `FACILITY IRR.PROGRAM.SIGNATURE.VERIFICATION` and `RDEFINE CSFINPV2` if required.


## Configure security environment switching:
    
Typically, the user `ZWESVUSR` that the `ZWESVSTC` started task runs under needs to be able to change the security environment of its process to allow API requests to be issued on behalf of the logged on TSO user ID, rather than its user ID.  This capability provides the functionality that allows users to log onto the Zowe desktop and use apps such as the File Editor to list data sets or USS files that the logged on user is authorized to view and edit, rather than the user ID running the Zowe server.  This technique is known as impersonation.  

To enable impersonation, you must grant the user ID `ZWESVUSR` associated with the `ZWESVSTC` started task UPDATE access to the `BPX.SERVER` and `BPX.DAEMON` FACILITY classes.

You can issue the following commands first to check if you already have the BPX facilities defined as part of another server configuration, such as the FTPD daemon. Review the output to confirm that the two BPX facilities exist and the user `ZWESVUSR` who runs the `ZWESVSTC` started task has UPDATE access to both facilities.

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

If the user `ZWESVUSR` who runs the ZWESVSTC started task does not have UPDATE access to both facilities, follow the instructions below.

- If you use RACF, complete the following steps:
      
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
1. Having activated and RACLIST the FACILITY class, the user ID `ZWESVUSR` who runs the ZWESVSTC started task must be given update access to the BPX.SERVER and BPX.DAEMON profiles in the FACILITY class.
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
1. Issue the following commands to check whether permission has been successfully granted:
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
1. Issue the following commands and review the output to check whether permission has been successfully granted:
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
1. Issue the following commands and review the output to check whether permission has been successfully granted:
    ```
    SET RESOURCE(FAC)
    ```
    ```
    LIST BPX
    ```