# Customizing z/OS system security 

As a security administrator, configure your z/OS system according to the specific features and functionalities you choose to include in your Zowe installation. Review the following article for specific configuration steps that apply to these features and fuctionalities.

:::info Required role: security administrator
:::


:::note
Before performing configuration steps specific to your use case, ensure that you meet the z/OS system requirements presented in the section _Preparing for installation_. For detailed information, see [Addressing z/OS requirements](./systemrequirements-zos.md). 
:::

<!-- The following section is duplicated in the article Addressing z/OS requirements. The preceding note points to these prerequisites


## z/OS prerequisites

Be sure your z/OS system meets the following prerequisites:

- z/OS version is in active support, such as Version 2.3, Version 2.4, Version 2.5 and Version 3.1

    :::note
    z/OS V2.2 reached end of support on 30 September, 2020. For more information, see the z/OS v2.2 lifecycle details [https://www.ibm.com/support/lifecycle/details?q45=Z497063S01245B61](https://www.ibm.com/support/lifecycle/details?q45=Z497063S01245B61). 
    :::

- zFS volume has at least 833 mb of free space for Zowe server components, their keystore, instance configuration files and logs, and third-party plug-ins.

- (Optional, recommended) z/OS OpenSSH V2.2.0 or later
  
  Some features of Zowe require SSH, such as the Desktop's SSH terminal. Install and manage Zowe via SSH, as an alternative to OMVS over TN3270. 

- (Optional, recommended) Parallel Sysplex.
  
  To deploy Zowe for high availability, a Parallel Sysplex environment is recommended. For more information, see [Configuring Sysplex for high availability](configure-sysplex.md).

-->
 
 Review the following table to determine which configuration steps are required based on your Zowe use case.

| Purpose | Applicable Zowe Component(s) | Configuration step |
| --- | --- | --- |
| Set the names for the different z/OS UNIX address spaces for the Zowe runtime components. <br/>**Important:** This configuration step is required. | All components | [Configure address space job naming](#configure-address-space-job-naming) |
| To use Zowe desktop. This step generates random numbers for zssServer that the Zowe desktop uses. | Application Framework | [Configure an ICSF cryptographic services environment](#configure-an-icsf-cryptographic-services-environment) |
| To allow users to log on to the Zowe desktop through impersonation. | Application Framework | [Configure security environment switching](#configure-security-environment-switching) |
| Required for TSS only. A TSS FACILITY needs to be defined and assigned to the `ZWESLSTC` started task. | All components | [Configure multi-user address space for TSS only](#configure-multi-user-address-space-for-tss-only) |
| Required to manually create the user ID and groups in your z/OS environment. Tasks are performed as part of [Zowe runtime configuration](./configure-zowe-runtime.md) | All components | [Configure user IDs and groups for the Zowe started tasks](#configure-user-ids-and-groups-for-the-zowe-started-tasks) |
| Required to configure the started task ZWESLSTC to run under the correct user ID and group. Tasks are performed as part of [Zowe runtime configuration](./configure-zowe-runtime.md).| All components | [Configure ZWESLSTC to run Zowe high availability instances under ZWESVUSR user ID](#configure-zweslstc-to-run-zowe-high-availability-instances-under-zwesvusr-user-id). |
| Required to configure the cross memory server for SAF to guard against access by non-privileged clients. Tasks are performed as part of [Zowe runtime configuration](./configure-zowe-runtime.md).| Application Framework | [Configure the cross memory server for SAF](#configure-the-cross-memory-server-for-saf) |
| Required for API Mediation Layer to map a client certificate to a z/OS identity. | API ML | [Configure main Zowe server to use client certificate identity mapping](#configure-main-zowe-server-to-use-client-certificate-identity-mapping) |
| Required for API ML to map the association between a z/OS user ID and a distributed user identity. | API ML | [Configure main Zowe server to use distributed identity mapping](#configure-main-zowe-server-to-use-distributed-identity-mapping) |
| To configure SAF Identity tokens on z/OS so that they can be used by Zowe components like zss or API Mediation Layer. | Application Framework<br />API ML | [Configure signed SAF Identity tokens IDT](#configure-signed-saf-identity-tokens-idt) |
| Required for API Mediation Layer to issue SMF records. | API ML | [Configure the main Zowe server to issue SMF records](api-mediation/api-mediation-smf.md#configure-the-main-zowe-server-to-issue-smf-records) |
| To use multi-factor authentication (MFA) | All components | [Multi-Factor Authentication (MFA)](#multi-factor-authentication-mfa) |
| To use Single Sign-On (SSO) | All components | [Single Sign-On (SSO)](#single-sign-on-sso) |
| To use OIDC Authentication with API Mediation Layer | API ML | [API Mediation Layer OIDC Authentication](#api-mediation-layer-oidc-authentication) |

### Configure address space job naming

The user ID `ZWESVUSR` that is associated with the Zowe started task must have READ permission for the `BPX.JOBNAME` profile in the `FACILITY` class. This is to allow setting of the names for the different z/OS UNIX address spaces for the Zowe runtime components.

:::note
This procedure may require security administrator authorization. Consult with your security administrator.
:::

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

### Configure an ICSF cryptographic services environment

The zssServer uses cookies that require random number generation for security. To learn more about the zssServer, see the [Zowe architecture](../getting-started/zowe-architecture.md#zss). Integrated Cryptographic Service Facility (ICSF) is a secure way to generate random numbers. 

If you have not configured your z/OS environment for ICSF, see [Cryptographic Services ICSF: System Programmer's Guide](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.csfb200/abstract.htm) for more information.  To see whether ICSF has been started, check whether the started task `ICSF` or `CSF` is active.

If you run Zowe high availability on a Sysplex, ICSF needs to be configured in a Sysplex environment to share KDS data sets across systems in a Sysplex. For detailed information, see [Running in a Sysplex Environment](https://www.ibm.com/docs/en/zos/2.3.0?topic=guide-running-in-sysplex-environment)

The Zowe z/OS environment configuration JCL member `ZWESECUR` does not perform any steps related to ICSF that is required for zssServer that the Zowe desktop uses. Therefore, if you want to use Zowe desktop, you must perform the steps that are described in this section manually.

To generate symmetric keys, the `ZWESVUSR` user who runs Zowe server started task requires READ access to `CSFRNGL` in the `CSFSERV` class.

Define or check the following configurations depending on whether ICSF is already installed:

- The ICSF or CSF job that runs on your z/OS system.
- The configuration of ICSF options in `SYS1.PARMLIB(CSFPRM00)`, `SYS1.SAMPLIB`, `SYS1.PROCLIB`.
- Create CKDS, PKDS, TKDS VSAM data sets.
- Define and activate the CSFSERV class:

<details>
<summary>Click here for command details for RACF.</summary>

If you use RACF, issue the following commands:
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

</details>

<details>
<summary>Click here for command details for ACF2.</summary>

If you use ACF2, issue the following commands (note that `profile-prefix` and `profile-suffix` are user-defined):
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

</details>

<details>
<summary>Click here for command details for Top Secret</summary>

If you use Top Secret, issue the following command (note that `profile-prefix` and `profile-suffix` are user defined):
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

</details>

:::note Notes
- Determine whether you want SAF authorization checks against `CSFSERV` and set `CSF.CSFSERV.AUTH.CSFRNG.DISABLE` accordingly.
- Refer to the [z/OS 2.3.0 z/OS Cryptographic Services ICSF System Programmer's Guide: Installation, initialization, and customization](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.csfb200/iandi.htm).
- CCA and/or PKCS #11 coprocessor for random number generation.
- Enable `FACILITY IRR.PROGRAM.SIGNATURE.VERIFICATION` and `RDEFINE CSFINPV2` if required.
:::

### Configure security environment switching
    
Typically, the user `ZWESVUSR` that the Zowe server started task runs under needs to be able to change the security environment of its process to allow API requests to be issued on behalf of the logged on TSO user ID, rather than the server's user ID.  This capability provides the functionality that allows users to log on to the Zowe desktop and use apps such as the File Editor to list data sets or USS files that the logged on user is authorized to view and edit, rather than the user ID running the Zowe server. This technique is known as **impersonation**.  

To enable impersonation, you must grant the user ID `ZWESVUSR` associated with the Zowe server started task UPDATE access to the `BPX.SERVER` and `BPX.DAEMON` profiles in the `FACILITY` class.

You can issue the following commands first to check whether you already have the impersonation profiles defined as part of another server configuration, such as the FTPD daemon. Review the output to confirm that the two impersonation profiles exist and the user `ZWESVUSR` who runs the Zowe server started task has UPDATE access to both profiles.

<details>
<summary>Click here for command details for RACF.</summary>

If you use RACF, issue the following commands:
```
RLIST FACILITY BPX.SERVER AUTHUSER
```
```
RLIST FACILITY BPX.DAEMON AUTHUSER
```

</details>

<details>
<summary>Click here for command details for Top Secret.</summary>

If you use Top Secret, issue the following commands:
```
TSS WHOHAS IBMFAC(BPX.SERVER)
```
```
TSS WHOHAS IBMFAC(BPX.DAEMON)
```

</details>

<details>
<summary>Click here for command details for ACF2.</summary>

If you use ACF2, issue the following commands:
```
SET RESOURCE(FAC)
```
```
LIST BPX
```

</details>

If the user `ZWESVUSR` who runs the Zowe server started task does not have UPDATE access to both profiles follow the instructions below.

<details>
<summary>Click here for procedure details for RACF.</summary>

If you use RACF, complete the following steps:
      
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
3. Having activated and RACLIST the FACILITY class, the user ID `ZWESVUSR` who runs the Zowe server started task must be given update access to the BPX.SERVER and BPX.DAEMON profiles in the FACILITY class.
```
PERMIT BPX.SERVER CLASS(FACILITY) ID(<zowe_stc_user>) ACCESS(UPDATE)
```
```
PERMIT BPX.DAEMON CLASS(FACILITY) ID(<zowe_stc_user>) ACCESS(UPDATE)
```
where:

* `<zowe_stc_user>` is `ZWESVUSR` unless a different user ID is being used for the z/OS environment.

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

</details>

<details>
<summary>Click here for procedure details for Top Secret.</summary>

If you use Top Secret, complete the following steps:  
      
1. Define the BPX Resource and access for `<zowe_stc_user>`.
```
TSS ADD(`owner-acid`) IBMFAC(BPX.)
```
```
TSS PERMIT(<zowe_stc_user>) IBMFAC(BPX.SERVER) ACCESS(UPDATE)
```
```
TSS PERMIT(<zowe_stc_user>) IBMFAC(BPX.DAEMON) ACCESS(UPDATE)
```
where `<zowe_stc_user>` is `ZWESVUSR` unless a different user ID is being used for the z/OS environment.

2. Issue the following commands and review the output to check whether permission has been successfully granted:
```
TSS WHOHAS IBMFAC(BPX.SERVER)
```
```
TSS WHOHAS IBMFAC(BPX.DAEMON)
```

</details>

<details>
<summary>Click here for procedure details for ACF2.</summary>

If you use ACF2, complete the following steps:

1. Define the BPX Resource and access for `<zowe_stc_user>`.
```
SET RESOURCE(FAC)
```
```
RECKEY BPX ADD(SERVER ROLE(<zowe_stc_user>) SERVICE(UPDATE) ALLOW)
```
```
RECKEY BPX ADD(DAEMON ROLE(<zowe_stc_user>) SERVICE(UPDATE) ALLOW)
```
where `<zowe_stc_user>` is `ZWESVUSR` unless a different user ID is being used for the z/OS environment.
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

</details>


You must also grant READ access to the OMVSAPPL profile in the APPL class to the Zowe STC user as well as **all other Zowe users** using various Zowe features. Skip the following steps when the OMVSAPPL profile is not defined in your environment.

<details>
<summary>Click here for procedure details for RACF.</summary>

If you use RACF, complete the following steps:

1. Check if you already have the required access defined as part of the environment configuration. Skip the following steps if access is already granted.
```
RLIST APPL OMVSAPPL AUTHUSER
```

2. Issue the following commands and review the output to check if permission has been successfully granted:
```
PERMIT OMVSAPPL CLASS(APPL) ID(<zowe_user>) ACCESS(READ)
SETROPTS RACLIST(APPL) REFRESH
```

</details>

<details>
<summary>Click here for procedure details for Top Secret.</summary>

If you use Top Secret, complete the following steps:

1. Check if you already have the required access as part of the environment configuration. Skip the following steps if access is already granted.
```
TSS WHOHAS APPL(OMVSAPPL)
```

2. Issue the following commands and review the output to check if permission has been successfully granted:
```
TSS PERMIT(<zowe_user>) APPL(OMVSAPPL)
```

</details>

<details>
<summary>Click here for procedure details for ACF2.</summary>

If you use ACF2, complete the following steps:

1. Check if you already have the required access defined as part of the environment configuration. Skip the following steps if access is already granted.
```
SET RESOURCE(APL)
LIST OMVSAAPL
```

2. Issue the following commands and review the output to check if permission has been successfully granted:
```
SET RESOURCE(APL)
RECKEY OMVSAPPL ADD(SERVICE(READ) ROLE(<zowe_user>) ALLOW)
F ACF2,REBUILD(APL)
```

</details>

### Configure address space job naming

The user ID `ZWESVUSR` that is associated with the Zowe started task must have READ permission for the `BPX.JOBNAME` profile in the `FACILITY` class. This is to allow setting of the names for the different z/OS UNIX address spaces for the Zowe runtime components.

:::note
This procedure may require security administrator authorization. Consult with your security administrator.
:::

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

### Configure multi-user address space (for TSS only)

The Zowe server started task `ZWESLSTC` is multi-user address space, and therefore a TSS FACILITY needs to be defined and assigned to the started task. Then, all acids signing on to the started task will need to be authorized to the FACILITY.

The following example shows how to create a new TSS FACILITY.

**Example:**

In the TSSPARMS, add the following lines to create the new FACILITY:
```
FACILITY(USER11=NAME=ZOWE)
FACILITY(ZOWE=MODE=FAIL)
FACILITY(ZOWE=RES) 
```

For more information about how to administer Facility Matrix Table, see [How to Perform Facility Matrix Table Administration](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-top-secret-for-z-os/16-0/administrating/protecting-facilities/how-to-perform-facility-matrix-table-administration.html).

To assign the FACILITY to the started task, issue the following command:                                                  
```
TSS ADD(ZWESVUSR) MASTFAC(ZOWE)
```

To authorize a user to sign on to the FACILITY, issues the following command:
```
TSS ADD(user_acid) FAC(ZOWE)
```

### Configure user IDs and groups for the Zowe started tasks

Zowe requires a user ID `ZWESVUSR` to execute its main z/OS runtime started task. This user ID must have a valid OMVS segment.

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

- To create the `ZWEADMIN` group, issue the following command according to your ESM:

    <details>
    <summary>Click here for command details for RACF.</summary>

    **RACF:**
    ```
    ADDGROUP ZWEADMIN OMVS(AUTOGID) -
    DATA('STARTED TASK GROUP WITH OMVS SEGEMENT')
    ```
    </details>

    <details>
    <summary>Click here for command details for Top Secret.</summary>

    **TSS:**
     ```
     TSS CREATE(<ZWEADMIN>) TYPE(GROUP) +
       NAME('ZOWE ADMINISTRATORS') +
       DEPT(<ADMIN_DEPARTMENT>)
     TSS ADD(<ZWEADMIN>) GID(<ADMIN_GROUP_ID>)
     ```

    </details>  

    <details>
    <summary>Click here for command details for ACF2.</summary>

    **ACF2:**
     ```
     SET PROFILE(GROUP) DIV(OMVS)
     INSERT <ZWEADMIN> AUTOGID
     F ACF2,REBUILD(GRP),CLASS(P)
     ```

    </details>

 * To create the `ZWESVUSR` user ID for the main Zowe started task, issue the following command according to your ESM:

    <details>

    <summary>Click here for command details for RACF.</summary>

    **RACF:**  
    ```
    ADDUSER  <ZWESVUSR> -
    NOPASSWORD -
    DFLTGRP(<ZWEADMIN>) -
    OMVS(HOME(/tmp) PROGRAM(/bin/sh) AUTOUID) -
    NAME('ZOWE SERVER') -
    DATA('ZOWE MAIN SERVER')
    ```
    </details>  

    <details>
    <summary>Click here for command details for Top Secret.</summary>

    **TSS:**
    ```
    TSS CREATE(<ZWESVUSR>) TYPE(USER) PROTECTED +
    NAME('ZOWE MAIN SERVER') +
    DEPT(<STC_USER_DEPARTMENT>)
    TSS ADD(<ZWESVUSR>) GROUP(<ZWEADMIN>) +
    DFLTGRP(<ZWEADMIN>) +
    HOME(/tmp) OMVSPGM(/bin/sh) UID(<ZOWE_USER_UID>)
    ```

    </details> 

    <details>
    <summary>Click here for command details for ACF2.</summary>

    **ACF2:**
    ```
    SET LID
    INSERT <ZWESVUSR> STC GROUP(<ZWEADMIN>)
    SET PROFILE(USER) DIV(OMVS)
    INSERT <ZWESVUSR> AUTOUID HOME(/tmp) OMVSPGM(/bin/sh)
    F ACF2,REBUILD(USR),CLASS(P),DIVISION(OMVS)
    ```
    </details>

- To create the `ZWESIUSR` group for the Zowe cross memory server started task, issue the following command according to your ESM:

    <details>
    <summary>Click here for command details for RACF.</summary>

    **RACF:**  
    ```
    ADDUSER <ZWESIUSR> -
    NOPASSWORD -
    DFLTGRP(<ZWEADMIN>) -
    OMVS(HOME(/tmp) PROGRAM(/bin/sh) AUTOUID) -
    NAME('ZOWE XMEM SERVER') -
    DATA('ZOWE XMEM CROSS MEMORY SERVER')
    ```

    </details> 

    <details>
    <summary>Click here for command details for Top Secret.</summary>

    **TSS:**
    ```
    TSS CREATE(<ZWESIUSR>) TYPE(USER) PROTECTED +
    NAME('ZOWE ZIS CROSS MEMORY SERVER') +
    DEPT(<STC_USER_DEPARTMENT>)
    TSS ADD(<ZWESIUSR>) GROUP(<ZWEADMIN>) +
    DFLTGRP(<ZWEADMIN>) +
    HOME(/tmp) OMVSPGM(/bin/sh) UID(&ZISUID.)
    ```
    </details>

    <details>
    <summary>Click here for command details for ACF2.</summary>

    **ACF2:**
    ```
    SET LID
    INSERT <ZWESIUSR> STC GROUP(<ZWEADMIN>)
    SET PROFILE(USER) DIV(OMVS)
    INSERT <ZWESIUSR> AUTOUID HOME(/tmp) OMVSPGM(/bin/sh)
    F ACF2,REBUILD(USR),CLASS(P),DIVISION(OMVS)
    ``` 

    </details>  

### Configure ZWESLSTC to run Zowe high availability instances under ZWESVUSR user ID

You need Zowe started task `ZWESLSTC` for Zowe high availability. When the Zowe started task `ZWESLSTC` is started, it must be associated with the user ID `ZWESVUSR` and group `ZWEADMIN`.  A different user ID and group can be used if required to conform with existing naming standards.

If you have run `ZWESECUR`, you do not need to perform the steps described in this section, because they are executed during the JCL section of `ZWESECUR`.  
```
/* started task for ZOWE Launcher in high availability               */
...
```

If you have not run `ZWESECUR` and are configuring your z/OS environment manually, the following steps describe how to configure the started task `ZWESLSTC` to run under the correct user ID and group. Issue the following commands according to your ESM:

<details>
<summary>Click here for command details for RACF.</summary>

If you use RACF, issue the following commands:
```
RDEFINE STARTED ZWESLSTC.* UACC(NONE) STDATA(USER(ZWESVUSR) GROUP(ZWEADMIN) PRIVILEGED(NO) TRUSTED(NO) TRACE(YES))  
SETROPTS REFRESH RACLIST(STARTED)
```
</details>

<details>
<summary>Click here for command details for ACF2.</summary>

If you use ACF2, issue the following commands:

```
SET CONTROL(GSO)
INSERT STC.ZWESLSTC LOGONID(ZWESVUSR) GROUP(ZWEADMIN) STCID(ZWESLSTC)
F ACF2,REFRESH(STC)
```

</details>

<details>
<summary>Click here for command details for Top Secret.</summary>

If you use Top Secret, issue the following commands:

```
TSS ADDTO(STC) PROCNAME(ZWESLSTC) ACID(ZWESVUSR)
```

</details>

### Configure the cross memory server for SAF

Zowe has a cross memory server that runs as an APF-authorized program with key 4 storage.  Client processes accessing the cross memory server's services must have READ access to a security profile `ZWES.IS` in the `FACILITY` class.  This authorization step is used to guard against access by non-priviledged clients.  

If you have run `ZWESECUR` you do not need to perform the steps described in this section.

```
/* permit Zowe main server to use XMEM cross memory server       */
...
```

If you have not run `ZWESECUR` and are configuring your z/OS environment manually, the following steps describe how to configure the cross memory server for SAF.

Activate the FACILITY class, define a `ZWES.IS` profile, and grant READ access to the user ID `ZWESVUSR`. This is the user ID that the main Zowe started task runs under. 
    
To perform these steps, issue the following commands that are also included in the `ZWESECUR` JCL member. The commands assume that you run the Zowe server under the `ZWESVUSR` user.

<details>
<summary>Click here for command details for RACF.</summary>

If you use RACF, issue the following commands:

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
        PERMIT ZWES.IS CLASS(FACILITY) ID(<zowe_stc_user>) ACCESS(READ)
        ```
        where `<zowe_stc_user>` is the user ID `ZWESVUSR` under which the Zowe server started task runs.
        ```
        SETROPTS RACLIST(FACILITY) REFRESH
        ```
    - To check whether the permission has been successfully granted, issue the following command:
        ```
        RLIST FACILITY ZWES.IS AUTHUSER
        ```
        This shows the user IDs who have access to the `ZWES.IS` class, which should include Zowe's started task user ID with READ access.

</details>

<details>
<summary>Click here for command details for ACF2.</summary>

If you use ACF2, issue the following commands:

    ```
    SET RESOURCE(FAC)
    ```
    ```
    RECKEY ZWES ADD(IS ROLE(IZUSVR) SERVICE(READ) ALLOW)
    ```
    ```
    F ACF2,REBUILD(FAC)
    ```

</details>

<details>
<summary>Click here for command details for Top Secret.</summary>

If you use Top Secret, issue the following commands, where `owner-acid` can be IZUSVR or a different ACID:

    ```
    TSS ADD(`owner-acid`) IBMFAC(ZWES.)
    ```
    ```
    TSS PERMIT(ZWESVUSR) IBMFAC(ZWES.IS) ACCESS(READ)
    ```
</details>

:::note Notes
- The cross memory server treats "no decision" style SAF return codes as failures. If there is no covering profile for the `ZWES.IS` resource in the FACILITY class, the request will be denied.
- Cross memory server clients other than Zowe might have additional SAF security requirements. For more information, see the documentation for the specific client.
:::

### Configure main Zowe server to use client certificate identity mapping

This security configuration is necessary for API ML to be able to map client certificate to a z/OS identity. A user running API Gateway must have READ access to the SAF resource `IRR.RUSERMAP` in the `FACILITY` class. 
To set up this security configuration, submit the `ZWESECUR` JCL member. For users upgrading from version 1.18 and lower use the following configuration steps according to your ESM:

<details>
<summary>Click here for procedure details for RACF.</summary>

If you use RACF, verify and update permission in the `FACILITY` class.

**Follow these steps:**

1. Verify user `ZWESVUSR` has READ access.
    ```
    RLIST FACILITY IRR.RUSERMAP AUTHUSER
    ```

2. Add user `ZWESVUSR` permission to READ.
    ```
    PERMIT IRR.RUSERMAP CLASS(FACILITY) ACCESS(READ) ID(ZWESVUSR)
    ```
   
3. Activate changes.
    ```
    SETROPTS RACLIST(FACILITY) REFRESH
    ```

</details>

<details>
<summary>Click here for procedure details for ACF2.</summary>

If you use ACF2, verify and update permission in the `FACILITY` class.

**Follow these steps:**

1. Verify user `ZWESVUSR` has READ access.
    ```      
    SET RESOURCE(FAC) 
    LIST LIKE(IRR-)
    ```
       
2. Add user `ZWESVUSR` permission to READ.
    ```
    RECKEY IRR.RUSERMAP ADD(SERVICE(READ) ROLE(&STCGRP.) ALLOW)
    ```
   
3. Activate changes.
    ```
    F ACF2,REBUILD(FAC)
    ```      

</details>

<details>
<summary>Click here for procedure details for Top Secret.</summary>

If you use TSS, verify and update permission in `FACILITY` class.

**Follow these steps:**

1. Verify user `ZWESVUSR` has READ access.
    ```      
    TSS WHOHAS IBMFAC(IRR.RUSERMAP)
    ```    
2. Add user `ZWESVUSR` permission to READ.
    ```
    TSS PER(ZWESVUSR) IBMFAC(IRR.RUSERMAP) ACCESS(READ)
    ```

</details>

### Configure main Zowe server to use distributed identity mapping

This security configuration is necessary for API ML to map the association between a z/OS user ID and a distributed user identity. A user running the API Gateway must have READ access to the SAF resource `IRR.IDIDMAP.QUERY` in the `FACILITY` class.
To set up this security configuration, submit the `ZWESECUR` JCL member. For users upgrading from version 1.28 and lower, use the following configuration steps according to your ESM:

<details>
<summary>Click here for procedure details for RACF.</summary>

If you use RACF, verify and update permission in the `FACILITY` class.

**Follow these steps:**

1. Verify that user `ZWESVUSR` has READ access.
    ```
    RLIST FACILITY IRR.IDIDMAP.QUERY AUTHUSER
    ```
2. Activate the `IDIDMAP` class:
    ```
    SETROPTS CLASSACT(IDIDMAP) RACLIST(IDIDMAP)
    ```
3. Define the `IRR.IDIDMAP.QUERY` profile in the FACILITY class.
    ```
    RDEFINE FACILITY IRR.IDIDMAP.QUERY
    ```
4. Add user `ZWESVUSR` permission to with READ access.
    ```
    PERMIT IRR.IDIDMAP.QUERY CLASS(FACILITY) ACCESS(READ) ID(ZWESVUSR)
    ```

5. Activate changes.
    ```
    SETROPTS RACLIST(FACILITY) REFRESH
    ```

</details>

<details>
<summary>Click here for procedure details for ACF2.</summary>

If you use ACF2, verify and update permission in the `FACILITY` class.

**Follow these steps:**

1. Verify that user `ZWESVUSR` has READ access.
    ```      
    SET RESOURCE(FAC) 
    LIST LIKE(IRR-)
    ```    

2. Add user `ZWESVUSR` permission with READ access.
    ```
    RECKEY IRR.IDIDMAP.QUERY ADD(SERVICE(READ) ROLE(&STCGRP.) ALLOW)
    ```

3. Activate changes.
    ```
    F ACF2,REBUILD(FAC)
    ```   
</details>

<details>
<summary>Click here for procedure details for Top Secret.</summary>

If you use TSS, verify and update permission in `FACILITY` class.

**Follow these steps:**

1. Verify that user `ZWESVUSR` has READ access.
    ```      
    TSS WHOHAS IBMFAC(IRR.IDIDMAP.QUERY)
    ```    

2. Add user `ZWESVUSR` permission with READ access.
    ```
    TSS PER(ZWESVUSR) IBMFAC(IRR.IDIDMAP.QUERY) ACCESS(READ)
    ```

</details>

### Configure signed SAF Identity tokens (IDT)

This section provides a brief description of how to configure SAF Identity tokens on z/OS so that they can be used by Zowe components like zss or API ML. See [Implement a new SAF IDT provider](../extend/extend-apiml/implement-new-saf-provider.md).

**Follow these steps:**

1. Create a PKCS#11 token. 
2. Generate a secret key for the PKCS#11 token (you can use the sample program ZWESECKG in the SZWESAMP dataset).
3. Define a SAF resource profile under the IDTDATA SAF resource class.

Details with examples can be found in documentation of external security products:

* **RACF**  
See **_Signed and Unsigned Identity Tokens_** and **_IDT Configuration_** subsections in _z/OS Security Server RACROUTE Macro Reference_ in the article [Activating and using the IDTA parameter in RACROUTE REQUEST=VERIFY](https://www.ibm.com/docs/en/zos/2.4.0?topic=reference-activating-using-idta-parameter-in-racroute-requestverify).

* **ACF2**  
See **_IDTDATA Profile Records_** subsection in _Administrating_ chapter, in the article [IDTDATA Profile Records](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-acf2-for-z-os/16-0/administrating/administer-records/profile-records/idtdata-profile-records.html).

* **Top Secret**  
See **_Maintain Identity Token (IDT) Records_** subsection in _Administrating_ chapter, in the article [Maintain Identity Token (IDT) Records](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-top-secret-for-z-os/16-0/administrating/maintaining-special-security-records/maintain-identity-token-(idt)-records.html).

A part of the Signed SAF Identity token configuration is a nontrivial step that has to generate a secret key for the PKCS#11 token. The secret key is generated in ICSF by calling the PKCS#11 Generate Secret Key (CSFPGSK) or Token Record Create (CSFPTRC) callable services. An example of the CSFPGSK callable service can be found in the SZWESAMP dataset as the ZWESECKG job.

### Configure the main Zowe server to issue SMF records

This security configuration is necessary for API ML to be able to issue SMF records. A user running the API Gateway must have READ access to the RACF general resource `IRR.RAUDITX` in the `FACILITY` class.
To set up this security configuration, submit the `ZWESECUR` JCL member. For users upgrading from version 1.18 and lower, use the configuration steps that correspond to the ESM.

* To check whether you already have the auditing profile defined, issue the following command and review the output to confirm that the profile exists and that the user `ZWESVUSR` who runs the `ZWESLSTC` started task has READ access to this profile.

    <details>
    <summary>Click here for command details for RACF.</summary>

    If you use RACF, issue the following command:
    ```
    RLIST FACILITY IRR.RAUDITX AUTHUSER
    ```
    </details>

    <details>
    <summary>Click here for command details for ACF2.</summary>

    If you use ACF2, issue the following commands:
    ```
    SET RESOURCE(FAC)
    ```
    ```
    LIST LIKE(IRR-)
    ```

    </details>

    <details>
    <summary>Click here for command details for Top Secret.</summary>

    If you use Top Secret, issue the following command:
    ```
    TSS WHOHAS IBMFAC(IRR.RAUDITX)
    ```

    </details>

* If the user `ZWESVUSR` who runs the `ZWESLSTC` started task does not have READ access to this profile, follow the procedure that corresponds to your ESM:

    <details>
    <summary>Click here for procedure details for RACF.</summary>

    If you use RACF, update permission in the `FACILITY` class.

    **Follow these steps:**

    1. Add user `ZWESVUSR` permission to `READ`.
    ```
    PERMIT IRR.RAUDITX CLASS(FACILITY) ACCESS(READ) ID(ZWESVUSR)
    ```
    2. Activate changes.
    ```
    SETROPTS RACLIST(FACILITY) REFRESH
    ```

    </details>

    <details>
    <summary>Click here for command details for ACF2.</summary>

    If you use ACF2, add user `ZWESVUSR` permission to `READ`. Issue the following commands:
    ```
    SET RESOURCE(FAC)
    ```
    ```
    RECKEY IRR ADD(RAUDITX ROLE(&STCGRP.) SERVICE(READ) ALLOW)
    ```
    ```
    F ACF2,REBUILD(FAC)
    ```

    </details> 

    <details>
    <summary>Click here for command details for Top Secret.</summary>

    If you use Top Secret, add user `ZWESVUSR` permission to READ. Issue the following command:
    ```
    TSS PER(ZWESVUSR) IBMFAC(IRR.RAUDITX) ACCESS(READ)
    ```

    </details>

  

For more information about SMF records, see [SMF records](../user-guide/api-mediation/api-mediation-smf.md) in the Using Zowe API Mediation Layer documentation.

### Multi-Factor Authentication (MFA)

Multi-factor authentication is supported for several components, such as the Desktop and API Mediation Layer.
Multi-factor authentication is provided by third-party products which Zowe is compatible with. The following are known to work:

- [CA Advanced Authentication Mainframe](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-advanced-authentication-mainframe/2-0.html)
- [IBM Z Multi-Factor Authentication](https://www.ibm.com/products/ibm-multifactor-authentication-for-zos).

:::note Notes
* To support the multi-factor authentication, it is necessary to apply z/OSMF APAR  [PH39582](https://www.ibm.com/support/pages/apar/PH39582). 

* MFA must work with Single-Sign-On (SSO). Make sure that [SSO](#single-sign-on-sso) is configured before you use MFA in Zowe.
:::

### Single Sign-On (SSO)

Zowe has an SSO scheme with the goal that each time you use multiple Zowe components you should only be prompted to login once. 

**Requirements:**

- IBM z/OS Management Facility (z/OSMF)

### API Mediation Layer OIDC Authentication

Zowe requires ACF2 APAR LU01316 to be applied when using the ACF2 security manager.