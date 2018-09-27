# z/OSMF Lite requirements
## Introduction
IBM® z/OS® Management Facility (z/OSMF) provides extensive system management
functions in a task-oriented, web browser-based user interface with integrated
user assistance, so that you can more easily manage the day-to-day operations
and administration of your mainframe z/OS systems.

By following the steps in this guide, you can quickly enable z/OSMF on your z/OS
system. This simplified approach to set-up, known as “z/OSMF Lite”, requires
only a minimal amount of z/OS customization, but provides the key functions that
are required by many exploiters, such as the open mainframe project (Zowe). Later, you can easily expand z/OSMF Lite into a full function z/OSMF configuration by adding more optional services and plug-ins.

A z/OSMF Lite configuration is applicable to any future expansions you make to
z/OSMF, such as adding more optional services and plug-ins.

It takes 2-3 hours to set up z/OSMF Lite. Some steps might require the
assistance of your security administrator, unless you are that person at your installation.

For detailed information about various aspects of z/OSMF configuration such as
enabling the optional plug-ins and services, see the IBM publication [_z/OSMF Configuration Guide_](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/toc.htm).

## Assumptions

This document is intended for a first time z/OSMF setup. If z/OSMF is already configured
on your system, you do not need to create a z/OSMF Lite configuration.

This document is designed for use with a single z/OS system, not a z/OS sysplex. If you plan to run z/OSMF in a sysplex, see [_z/OSMF Configuration Guide_](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/toc.htm) for multi-system considerations.

It is assumed that a basic level of security for z/OSMF is sufficient on the z/OS system. IBM provides a program, IZUSECEZ, to help you set up basic security for a z/OSMF Lite configuration.


System defaults are used for the z/OSMF environmental settings. Wherever possible, it is recommended that you use the default values. If necessary, however, you can override the defaults by supplying an IZUPRMxx member, as described in [Appendix A. Creating an IZUPRMxx parmlib member](appendix.md#appendix-a-creating-an-izuprmxx-parmlib-member).  

It is recommended that you use the following procedures as
provided by IBM:

-   Started procedures IZUSVR1 and IZUANG1

-   Logon procedure IZUFPROC

Information about installing these procedures is provided in [Copying the IBM procedures into JES PROCLIB](#copying-the-ibm-procedures-into-jes-proclib).

## Software Requirements

Setting up z/OSMF Lite requires that you have access to a z/OS V2R2 system or later. Also, your z/OS system must meet the minimum software requirements, as described in this section.

### Minimum Java level

Java™ must be installed and operational on your z/OS system, at the required minimum level. See the table that follows for the minimum level and default location. If you installed Java in another location, you must specify the JAVA_HOME statement in your IZUPRMxx parmlib member, as described in [Appendix A. Creating an IZUPRMxx parmlib member](appendix.md#appendix-a-creating-an-izuprmxx-parmlib-member).   

**z/OS Version** | **Minimum level of Java™**  | **Recommended level of Java**  | **Default location**  
---|---|---|---
z/OS V2R2 | IBM® 64-bit SDK for z/OS®, Java Technology Edition V7.1 (SR3), with the PTFs for APAR PI71018 and APAR PI71019 applied **OR** IBM® 64-bit SDK for z/OS®, Java Technology Edition V8, with the PTF for APAR PI72601 applied.                                 | IBM® 64-bit SDK for z/OS®, Java™ Technology Edition, V8 SR6 (5655-DGH) | `/usr/lpp/java/J7.1_64`
z/OS V2R3        | IBM® 64-bit SDK for z/OS®, Java™ Technology Edition, V8 SR4 FP10 (5655-DGH) | IBM® 64-bit SDK for z/OS®, Java™ Technology Edition, V8 SR6 (5655-DGH) | `/usr/lpp/java/J8.0_64`



### WebSphere® Liberty profile (z/OSMF V2R3 and later)


z/OSMF V2R3 uses the Liberty Profile that is supplied with z/OS, rather than its own copy of Liberty. The WebSphere Liberty profile must be mounted on your z/OS system. The default mount point is: `/usr/lpp/liberty_zos`. To determine whether WebSphere® Liberty profile is mounted, check for the existence of the mount point directory on your z/OS system.

If WebSphere® Liberty profile is mounted at a non-default location, you need to specify the location in the IZUSVR1 started procedure on the keyword **WLPDIR=**. For details, see [Appendix B. Modifying IZUSVR1 settings](appendix.md#appendix-b-modifying-izusvr1-settings).

Note: Whenever you apply PTFs for z/OSMF, you might be prompted to install outstanding WebSphere Liberty service. It is recommended that you do so to maintain z/OSMF functionality.

### System settings

Ensure that the z/OS host system meets the following requirements:

-   Port 443 is available for use.

-   The system host name is unique and maps to the system on which z/OSMF Lite will be configured.

Otherwise, you might encounter errors later in the process. If you encounter errors, see [Troubleshooting problems](#troubleshooting-problems) for the corrective actions to take.

### Web browser

For the best results with z/OSMF, use one of the following web browsers on your workstation:

-   Microsoft Internet Explorer Version 11 or later

-   Microsoft Edge (Windows 10)

-   Mozilla Firefox ESR Version 52 or later.

To check your web browser’s level, click **About** in the web browser.

## Creating a z/OSMF nucleus on your system

The following system changes are described in this chapter:

- Reviewing and running security job IZUSECEZ
-	Running job IZUMKFS to create the z/OSMF user file system
-	Copying the IBM procedures into JES PROCLIB
-	Starting the z/OSMF server
-	Accessing the z/OSMF Welcome page
-	Mounting z/OSMF user file system at IPL time.


### Running job IZUSECEZ to create security

The security job IZUSECEZ contains a minimal set of RACF® commands for creating security profiles for the z/OSMF nucleus. The profiles are used to protect the resources that are used by the z/OSMF server, and to grant users access to the z/OSMF core functions. IZUSECEZ is a simplified version of the sample job IZUSEC, which is intended for a more complete installation of z/OSMF.

If your installation uses an external security manager other than RACF, you need to provide equivalent commands for your environment. For help with non-IBM security products, see the following web page (TBD - Add reference to the web page with contact info for CA equivalent commands).

#### Before you begin

In most cases, you can run the IZUSECEZ security job without modification. To verify that the job is okay to run as is, ask your security administrator to review the job and modify it as necessary for your security environment. If security is not a concern for the host system, you can run the job without modification.

#### Procedure

1.	Locate IZUSECEZ in the SYS1.SAMPLIB data set on your z/OS system.
2.	Review and edit the job, if necessary.
3.	Submit IZUSECEZ as a batch job on your z/OS system.  


#### Results

The IZUSECEZ job should complete with return code 0000.

To verify, check the results of the job execution in the job log. For example, you can use SDSF to examine the job log:  

1.  In the SDSF primary option menu, select Option ST.

2.  On the SDSF Status Display, enter letter S next to the job that you
    submitted.

3.  Check the return code of the job. The job succeeds if ‘0000’ is returned.

TBD: Add screen capture of a job log for a completed IZUSECEZ job.

#### Common errors

Review the following messages and the corresponding resolutions as needed:

**Symptom** | **Cause**  | **Resolution**  
---|---|---
Message IKJ56702I INVALID data is issued | The job is submitted more than once.| You can ignore this message.
Job fails with an authorization error (message ??????). | Your user ID lacks superuser authority.             | See “Select a user ID for performing the steps”.
Job fails with an authorization error (message ??????). | Your installation uses the RACF PROTECT-ALL option. | See “Troubleshooting”.         
Another problem…                                        |                                                     |                                                 
Another problem…                                        |                                                     |                                                 


### Running job IZUMKFS to create the z/OSMF user file system

The job IZUMKFS initializes the z/OSMF user file system, which contains
configuration settings and persistence information for z/OSMF.

The job mounts the file system. On a z/OS V2R3 system with the PTF for APAR
PI92211 installed, the job uses mount point `/global/zosmf`. Otherwise, for an
earlier system, the job mounts the file system at mount point `/var/zosmf`.

#### Before you begin

To perform this step, you need a user ID with “superuser” authority on the z/OS
host system. For more information about how to define a user with superuser
authority, see the publication [_z/OS UNIX System Services_](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.bpx/bpx.htm).

#### Procedure

1.  In the system library `SYS1.SAMPLIB`, locate the job IZUMKFS.

2.  Make a copy of the job.

3.  Examine the contents of the job.

4.  Modify the contents so that the job will run on your system. You must
    specify a volume serial (VOLSER) to be used for allocating a data set for
    the z/OSMF data directory.

5.  From the TSO/E command line, run the IZUMKFS job.

TBD: Add screen capture of submitting the IZUSECEZ job from the TSO/E command
line.

#### Results

On completion, the z/OSMF file system is allocated, formatted, and mounted, and
the necessary directories are created.

TBD: How do we know this worked?

#### Common errors

Review the following messages and the corresponding resolutions as needed

**Symptom**   | **Cause**    | **Resolution**       
---|---|---
Job fails with FSM error (message ??????). | Your user ID lacks superuser authority. | For more information about how to define a user with superuser authority, see the publication [_z/OS UNIX System Services_](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.bpx/bpx.htm).
Job fails with an authorization error (message ??????). | Job statement errors…                   | See [Troubleshooting problems](#troubleshooting-problems)      
Another problem…    | User ID missing USS segment|
Another problem…                      |                                                                                                    Another problem…                                        |                                         |                                                                                                              

### Copying the IBM procedures into JES PROCLIB

Copy the z/OSMF started procedures and logon procedure from SYS1.PROCLIB into
your JES concatenation.

#### Before you begin

Locate the IBM procedures. IBM supplies procedures for z/OSMF in your z/OS
order, as follows:

-   ServerPac and CustomPac orders: IBM supplies the z/OSMF procedures in the
    SMP/E managed proclib data set. In ServerPac and SystemPac, the data set is
    named SYS1.IBM.PROCLIB, by default.

-   CBPDO orders: For a CBPDO order, the SMP/E-managed proclib data set is named
    SYS1.PROCLIB.

-   Application Development CD.

#### Procedure

Use ISPF option 3.4 to copy the procedures from SYS1.PROCLIB into your JES
concatenation.

-   IZUSVR1

-   IZUANG1

-   IZUFPROC

#### Results

The procedures now reside in your JES PROCLIB.

#### Common errors

Review the following messages and the corresponding resolutions as needed

**Symptom**   | **Cause** | **Resolution**
---|---|---
A problem…       |           |                         
Another problem… |           |                         
Another problem… |           |                       
Another problem… |           |                        
Another problem… |           |                      


### Starting the z/OSMF server

z/OSMF processing is managed through the z/OSMF server, which runs as the
started tasks IZUANG1 and IZUSVR1. z/OSMF is started with the START command.

####  Before you begin

Ensure that you have access to the operations console and can enter the START
command.

####  Procedure

In the operations console, enter the START commands sequentially:

```
S IZUANG1

S IZUSVR1
```

Note: The z/OSMF angel (IZUANG1) must be started before the z/OSMF server
(IZUSVR1).

You must enter these commands manually at subsequent IPLs. If necessary, you can
stop z/OSMF processing by entering the STOP command for each of the started
tasks IZUANG1 and IZUSVR1.

Note: z/OSMF offers an autostart function, which you can configure to have the z/OSMF server started automatically. For more information about the autostart capability, see the publication z/OSMF Configuration Guide.

####  Results

When the z/OSMF server is initialized, you can see the following messages
displayed in the operations console:

```
SY1 \$HASP100 IZUANG1 ON STCINRDR

\- SY1 \$HASP373 IZUANG1 STARTED

SY1 CWWKB0069I: INITIALIZATION IS COMPLETE FOR THE IZUANG1 ANGEL PROCESS.

...

SY1 \$HASP100 IZUSVR1 ON STCINRDR

\- SY1 \$HASP373 IZUSVR1 STARTED

...

\- SY1 IZUG400I: The z/OSMF Web application services are initialized.

SY1 +CWWKF0011I: The server zosmfServer is ready to run a smarter planet.
```

####  Common errors

Review the following messages and the corresponding resolutions as needed:

**Symptom**      | **Cause**        | **Resolution**
---|---|---
A START command fails with message ??????. | The angel started before the server.|     
Another problem…  | Port 443 is not available for use.   |             
Start command fails    | The server user ID IZUSVR  is not authorized.           |                    
Another problem…                           |                                      |                         

### Accessing the z/OSMF Welcome page

At the end of the z/OSMF configuration process, you can verify the results of your work by opening a web browser to the Welcome page.

####  Before you begin

To find the URL of the Welcome page, look for message IZUG349I in the z/OSMF server job log.

TBD : Insert a screen shot of the job log showing the 369I message with the URL.

#### Procedure

1.  Open a web browser to the z/OSMF Welcome page. The URL for the Welcome page
    has the following format: https://hostname:port/zosmf/

    Where:
    -   *hostname* is the hostname or IP address of the system in which z/OSMF is
    installed.

    -   *port* is the secure port for the z/OSMF configuration. If you specified a
    secure port for SSL encrypted traffic during the configuration process
    through parmlib statement HTTP_SSL_PORT, port is required to log in.
    Otherwise, it is assumed that you are using the default port 443.

2.  In the z/OS USER ID field on the Welcome page, enter the z/OS user ID that
    you use to configure z/OSMF.

3.  In the z/OS PASSWORD field, enter the password or pass phrase that is
    associated with the z/OS user ID.

4.	Select the style of UI for z/OSMF. To use the desktop interface, select this option. Otherwise, leave this option unselected to use the tree view UI.

5.  Click **Log In**.

####  Results

If the user ID and password or pass phrase are valid, you are authenticated to z/OSMF. The Welcome page of IBM z/OS Management Facility tab opens in the main area. At the top right of the screen, Welcome *<your_user_ID>* is displayed. In the UI, only the options you are allowed to use are displayed.

TBD< Insert a screen shot of the z/OSMS Welcome page after login. >

You have successfully configured the z/OSMF nucleus.


####  Common errors

The following errors might occur during this step:

**Symptom**    |**Cause**   |**Resolution**  
---|---|---
z/OSMF welcome page does not load in your web browser. | The SSL handshake was not successful. This problem can be related to the browser certificate. | See “Certificate error in the Mozilla Firefox browser” in Troubleshooting.
Error message is displayed in the browser session: Secure Connection Failed. | User not connected to IZUADMIN group  | ??                                
Error message is displayed in the browser session: Secure Connection Failed. | Server is not connected to angel       | ??          

### Mounting the z/OSMF user file system at IPL time

Previously, in [Running job IZUMKFS to create the z/OSMF user file system](#running-job-izumkfs-to-create-the-z\/osmf-user-file-system), you ran job IZUMKFS to create and mount the z/OSMF user file system. Now you should ensure that the z/OSMF user file system is mounted automatically for subsequent IPLs. To do so, you make an update to the BPXPRMxx parmlib member on your z/OS system, as described in this topic.

####  Before you begin

By default, the z/OSMF file system uses the name IZU.SIZUUSRD, and is mounted in read/write mode. It is recommended that this file system is mounted automatically at IPL time.

If you do not know which BPXPRMxx member is active, follow these steps to find out:

1.	In the operations console, enter the following command to see which parmlib members are included in the parmlib concatenation on your system:

  `D PARMLIB`

2.	Make a note of the BPXPRMxx member suffixes that you see.

3.	To determine which BPXPRMxx member takes precedence, enter the following command:

  `D OMVS`

  The output of this command should be similar to the following:

  ```
  BPXO042I 04.01.03 DISPLAY OMVS 391

  OMVS 000F ACTIVE OMVS=(ST,3T)
  ```

In this example, the member BPXPRMST takes precedence. If BPXPRMST is not present in the concatenation, member BPXPRM3T is used.  

####  Procedure

Add a MOUNT command for the z/OSMF user file system to your currently active
BPXPRMxx parmlib member. For example:

On a z/OS V2R3 system with the PTF for APAR PI92211:
```
MOUNT FILESYSTEM(’IZU.SIZUUSRD’) TYPE(ZFS) MODE(RDWR)

MOUNTPOINT(’/global/zosmf’) PARM(’AGGRGROW’) UNMOUNT
```
On a z/OS V2R2 or V2R3 system without PTF for APAR PI92211:
```
MOUNT FILESYSTEM(’IZU.SIZUUSRD’) TYPE(ZFS) MODE(RDWR)

MOUNTPOINT(’/var/zosmf’) PARM(’AGGRGROW’) UNMOUNT
```

####  Results

The BPXPRMxx member is updated. At the next system IPL, the following message is issued to indicate that the z/OSMF file system is mounted automatically.

TBD< Insert a screen capture of the message that is issued when the z/OSMF file system is mounted automatically.>


####  Common errors

The following errors might occur during this step:

**Symptom**   | **Cause** | **Resolution**
---|---|---
A problem…       |           |                
Another problem… |           |       


## Adding the required REST services

You must enable a set of z/OSMF REST services for the Zowe framework.

The following system changes are described in this topic:
-	Enabling the z/OSMF JOB REST services
-	Enabling the TSO REST services
-	Enabling the z/OSMF data set and file REST services
-	Enabling the z/OSMF Workflow REST services and Workflows task UI


### Enabling the z/OSMF JOB REST services

The Zowe framework requires that you enable the z/OSMF JOB REST services, as described in this topic.

#### Procedure
TBD:<Is there an IZU job that we need to run for the z/OSMF Job REST services?>

#### Results
The z/OSMF JOB REST services are enabled. To verify, open a web browser to our z/OS system (hostname and port) and add the following REST call to the URL:

`GET /zosmf/restjobs/jobs`

The result is a list of the jobs that are owned by your user ID. For more information about the z/OSMF JOB REST services, see [_z/OSMF Programming Guide_](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua700/IZUHPINFO_API_RESTJOBS.htm).


#### Common errors

Review the following messages and the corresponding resolutions as needed:

**Symptom** | **Cause** | **Resolution**
---|---|---
A problem…       |           |                
Another problem… |           |                 
Another problem… |           |                
Another problem… |           |                
Another problem… |           |                

### Enabling the TSO REST services
The Zowe framework requires that you enable the TSO REST services, as described in this topic.

#### Before you begin

Ensure that the common event adapter component (CEA) of z/OS is running in full function mode.

1.	To check if the CEA address space is active, enter the following command:

  `D A,CEA`

2.	If not, start CEA in full function mode. For detailed instructions, see [_System prerequisites for the CEA TSO/E address space services_](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.ieac100/prerequisites.htm).

3.	To verify that CEA is running in full function mode, enter the following command:

 `F CEA,D`

The output should look like the following:

```
CEA0004I COMMON EVENT ADAPTER 399  
STATUS: **ACTIVE-FULL** CLIENTS: 0 INTERNAL: 0  
EVENTS BY TYPE: \#WTO: 0 \#ENF: 0 \#PGM: 0  
TSOASMGR: ALLOWED: 50 IN USE: 0 HIGHCNT: 0
```

#### Procedure

1.	In the system library `SYS1.SAMPLIB`, locate the job IZUTSSEC.
2.	Make a copy of the job.
3.	Examine the contents of the job.
4.	Modify the contents so that the job will run on your system.
5.	From the TSO/E command line, run the IZUTSSEC job.

TBD: Insert the command here

#### Results
The IZUTSSEC job should complete with return code 0000.

#### Common errors


Review the following messages and the corresponding resolutions as needed:

**Symptom**      | **Cause**                               | **Resolution**
---|---|---
A problem…       |                                         |                          
Another problem… |                                         |                          
Another problem… |                                         |                          
Another problem… |                                         |                         
Another problem… |                                         |     


###  Enabling the z/OSMF data set and file REST services

The Zowe framework requires that you enable the z/OSMF data set and file REST services, as described in this topic.

#### Before you begin

1.  Ensure that the message queue size is set to a large enough value. It is recommended that you specify an IPCMSGQBYTES value of at least 20971520 (20M) in BPXPRMxx. To set this value dynamically, you can enter the following operator command:

    `SETOMVS IPCMSGQBYTES=20971520`

2.  Ensure that the TSO REST services are enabled.

3.  Ensure that your user ID has a TSO segment defined. To do so, enter the following command from TSO/E command prompt:

    `LU userid TSO`

 Where *userid* is your z/OS user ID.

The output from this command must include the section called **TSO
information**, as shown in the following example:

```
TSO LU ZOSMFAD TSO NORACF

4:57:17 AM: USER=ZOSMFAD

TSO INFORMATION

---------------

ACCTNUM= 123412345

PROC= OMVSPROC

SIZE= 02096128

MAXSIZE= 00000000

USERDATA= 0000

 ***
```

#### Procedure

1.	In the system library SYS1.SAMPLIB, locate the job IZUFPSEC.
2.	Make a copy of the job.
3.	Examine the contents of the job.
4.	Modify the contents so that the job will run on your system.
5.	From the TSO/E command line, run the IZUFPSEC job.

TBD: Insert the command here


#### Results

The IZUFPSEC job should complete with return code 0000.

To verify that this setup is complete, try issuing a REST service. See the example in [_List data sets_](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua700/IZUHPINFO_API_GetListDataSets.htm) in the z/OSMF programming guide.  

#### Common errors

Review the following messages and the corresponding resolutions as needed:

**Symptom**      | **Cause**                               | **Resolution**
---|---|---
A problem…       | Message queue size for CEA is too small |                          
Another problem… |                                         |                          
Another problem… |                                         |                          
Another problem… |                                         |                         
Another problem… |                                         |                        

### Enabling the z/OSMF Workflow REST services and Workflows task UI
The Zowe framework requires that you enable the z/OSMF Workflow REST services and Workflows task UI, as described in this topic.

#### Before you begin

TBD: Identify the prerequisite steps here?

#### Procedure

1.	In the system library `SYS1.SAMPLIB`, locate the job IZUWFSEC.
2.	Make a copy of the job.
3.	Examine the contents of the job.
4.	Modify the contents so that the job will run on your system.
5.	From the TSO/E command line, run the IZUWFSEC job.

TBD: Insert the command here
Screen shot here

#### Results

The IZUWFSEC job should complete with return code 0000.

To verify, logon to z/OSMF (or refresh it) and verify that the Workflows task appears in the z/OSMF UI.

#### Common errors

Review the following messages and the corresponding resolutions as needed:

 **Symptom**      | **Cause** | **Resolution**
---|---|---
A problem…       |           |                 
Another problem… |           |                 
Another problem… |           |                
Another problem… |           |                
Another problem… |           |                

At this point, you have completed the setup of z/OSMF Lite.

## Successful
At this point, you have completed the setup of z/OSMF Lite.

Optionally, you can add more users to z/OSMF, as described in [Appendix C. Adding more users to z/OSMF](appendix.md#appendix-c-adding-more-users-to-zosmf).


## Troubleshooting problems

This section provides tips and techniques for troubleshooting problems you might encounter when creating a z/OSMF Lite configuration. For other types of problems that might occur, see [_z/OSMF Configuration Guide_](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/toc.htm).

### Common problems and scenarios

This document assumes that the following is true of the z/OS host system:

-   Port 443 is available for use. To check this, issue NETSTAT with option ? to determine if the port is being used.

-   The system host name is unique and maps to the system on which z/OSMF Lite is being installed. To retrieve this value, enter the command HOST at the operations console. If your system uses another method of assigning the system name, such as a multi-home stack, dynamic VIPA, or System Director, see [_z/OSMF Configuration Guide_](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/toc.htm).

-   The global mount point exists. On a z/OS 2.3 system, the system includes this directory by default. On a z/OS 2.2 system, you must create the global directory at the following location: `/global/zosmf/`

If you find that a different value is used on your z/OS system, you can edit the IZUPRMxx parmlib member to specify the correct setting. For details, see [Appendix A. Creating an IZUPRMxx parmlib member](appendix.md#appendix-a-creating-an-izuprmxx-parmlib-member).

### Tools and techniques for troubleshooting

For information about working with z/OSMF log files, see [_z/OSMF Configuration Guide_](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/toc.htm).

Common messages
TBD: Insert the message IDs of all error messages that are encountered during FVT testing of this document.   
For descriptions of all the z/OSMF messages, see [_z/OSMF messages_](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zosmfmessages.help.doc/izuG00hpMessages.html) in IBM Knowledge Center.
