# Installing Zowe via SMP/E instructions

Review this article and the procedures to install and activate the functions of Zowe server-side components using SMP/E.

:::info Required roles: system programmer
:::

:::note Notes:
* To install Zowe into its own SMP/E environment, consult the SMP/E manuals for instructions on creating and initializing the SMPCSI and SMP/E control data sets.
* You can use the sample jobs that are provided to perform part or all of the installation tasks. The SMP/E jobs assume that all DDDEF entries that are required for SMP/E execution have been defined in appropriate zones.
* You can use the SMP/E dialogs instead of the sample jobs to accomplish the SMP/E installation steps.
:::
:::tip
You can now perform Zowe installation via the Zowe Server Install Wizard. Using the wizard streamlines the installation process and is an alternative to performing manual Zowe server-side component installation. For more information about the wizard, see [Installing Zowe via Zowe Server Install Wizard](./install-zowe-server-install-wizard.md).
:::

### SMP/E considerations for installing Zowe

Use the SMP/E **RECEIVE**, **APPLY**, and **ACCEPT** commands to install this release of Zowe.

### SMP/E options subentry values

The recommended values for certain SMP/E CSI subentries are shown in the following table. Using values lower than the recommended values can result in failures in the installation. `DSSPACE` is a subentry in the GLOBAL options entry. `PEMAX` is a subentry of the GENERAL entry in the GLOBAL options entry. See the SMP/E manuals for instructions on updating the global zone.

Subentry | Value | Comment
---|---|---
DSSPACE | (1200,1200,1400)  | Space allocation
PEMAX | SMP/E Default | IBM recommends using the SMP/E default for PEMAX.

### Overview of the installation steps

Follow these high-level steps to download and install Zowe Open Source Project (Base).

  1. [Download and unzip the Zowe SMP/E package](#download-and-unzip-the-zowe-smpe-package).
  2. [Allocate the file system to hold the download package](#allocate-the-file-system-to-hold-the-download-package).
  3. [Upload the download package to the host](#upload-the-download-package-to-the-host)
  4. [Extract and expand the compress SMPMCS and RELFILEs](#extract-and-expand-the-compressed-smpmcs-and-relfiles)
  5. [Customize sample installation jobs](#customize-sample-installation-jobs)
  6. [Create SMP/E environment (optional)](#create-smpe-environment-optional)
  7. [Perform SMP/E RECEIVE](#perform-smpe-receive)
  8. [Allocate SMP/E target and distribution libraries](#allocate-smpe-target-and-distributions-libraries)
  9. [Allocate, create and mount ZSF files (Optional)](#allocate-create-and-mount-zsf-files-optional)
  10. [Allocate z/OS UNIX paths](#allocate-zos-unix-paths)
  11. [Create DDDEF Entries](#create-dddef-entries)
  12. [Perform SMP/E APPLY](#perform-smpe-apply)
  13. [Perform SMP/E ACCEPT](#perform-smpe-accept)
  14. [Run REPORT CROSSZONE](#run-report-crosszone)
  15. [Cleaning up obsolete data sets, paths, and DDDEFs](#cleaning-up-obsolete-data-sets-paths-and-dddefs)

### Download and unzip the Zowe SMP/E package

To download the Zowe SMP/E package, open your web browser and go to the [Zowe Download](https://www.zowe.org/download.html) website. Click the **Zowe SMP/E FMID AZWE002** button to save the file to a folder on your desktop.

You will receive one ZIP package on your desktop. Extract the following files from the package. You may need to use the `unzip` command at a terminal rather than an unzip utility. For example, run `unzip zowe-smpe-package-2.1.0.zip` in your terminal. 

  - **AZWE002.pax.Z (binary)**

     The SMP/E input data sets to install Zowe are provided as compressed files in AZWE002.pax.Z. This pax archive file holds the SMP/E MCS and RELFILEs.

  - **AZWE002.readme.txt (text)**

     The README file AZWE002.readme.txt is a single JCL file containing a job with the job steps you need to begin the installation, including comprehensive comments on how to tailor them. There is a sample job step that executes the z/OS UNIX System Services pax command to extract package archives. This job also executes the GIMUNZIP program to expand the package archives so that the data sets can be processed by SMP/E.

  - **AZWE002.hml (text)**

     The Program Directory for the Zowe Open Source Project.  

### Allocate the file system to hold the download package

You can either create a new z/OS UNIX file system (zFS) or create a new directory in an existing file system to place AZWE002.pax.Z. The directory that will contain the download package must reside on the z/OS system where the function will be installed.

To create a new file system, and directory, for the download package, you can use the following sample JCL (FILESYS).

Copy and paste the sample JCL into a separate data set, uncomment the job, and modify the job to update required parameters before submitting the job.

```
//FILESYS  JOB <job parameters>
//*
//***************************************************************
//* This job must be updated to reflect your environment.
//* This sample:
//*   . Allocates a new z/OS UNIX file system
//*   . Creates a mount point directory
//*   . Mounts the file system
//*
//* - Provide valid job card information
//* - Change:
//*   @zfs_path@
//*   ----+----1----+----2----+----3----+----4----+----5
//*              - To the absolute z/OS UNIX path for the download
//*                package (starting with /)
//*              - Maximum length is 50 characters
//*              - Do not include a trailing /
//*   @zfs_dsn@
//*              - To your file system data set name
//*            
//* Your userid MUST be defined as a SUPERUSER to successfully
//* run this job
//*
//***************************************************************
//*
//CREATE   EXEC PGM=IDCAMS,REGION=0M,COND=(0,LT)
//SYSPRINT DD SYSOUT=*
//SYSIN    DD *
  DEFINE CLUSTER ( -
         NAME(@zfs_dsn@) -
          TRK(28485 2848) -
       /*VOLUME(volser)*/ -
         LINEAR -
         SHAREOPTIONS(3) -
         )
//*
//         SET ZFSDSN='@zfs_dsn@'
//FORMAT   EXEC PGM=IOEAGFMT,REGION=0M,COND=(0,LT),
//            PARM='-aggregate &ZFSDSN -compat'
//*STEPLIB  DD DISP=SHR,DSN=IOE.SIOELMOD        before z/OS 1.13
//*STEPLIB  DD DISP=SHR,DSN=SYS1.SIEALNKE       from z/OS 1.13
//SYSPRINT DD SYSOUT=*
//*
//MOUNT    EXEC PGM=IKJEFT01,REGION=0M,COND=(0,LT)
//SYSEXEC  DD DISP=SHR,DSN=SYS1.SBPXEXEC
//SYSTSPRT DD SYSOUT=*
//SYSTSIN  DD *
  PROFILE MSGID WTPMSG
  oshell umask 0022; +
    mkdir -p @zfs_path@
  MOUNT +
    FILESYSTEM('@zfs_dsn@') +
    MOUNTPOINT('@zfs_path@') +
    MODE(RDWR) TYPE(ZFS) PARM('AGGRGROW')
//*
```
:::tip Expected results
You will receive a return code of `0` if this job runs correctly.
:::

### Upload the download package to the host

Upload the `AZWE002.readme.txt` file in text format and the `AZWE002.pax.Z` file in binary format from your workstation to the z/OS UNIX file system. The instructions in this section are also in the `AZWE002.readme.txt` file that you downloaded.

:::info Important
Ensure you download the pax file in a different file system than where you put Zowe runtime. 
:::

There are many ways to transfer the files or make these files available to the z/OS system where the package will be installed. The following sample dialog uses FTP from a Microsoft Windows command line to perform the transfer. This method is applicable when  the z/OS host is configured as an FTP host/server and  the workstation is an FTP client. Commands or other customizations entered by the user are in bold, and the following values are assumed.

:::note
If you are not sure which protocol or port to use to transfer the files, or for other access requirements, consult with your network administrator. 
:::

User enters: | Values 
---|---
mvsaddr | TCP/IP address or hostname of the z/OS system
tsouid | Your TSO user ID
tsopw | Your TSO password
d: | Location of the downloaded files
@zfs_path@ | z/OS UNIX path where to store the files. This matches the @zfs_path@ variable you specified in the previous step.

:::danger Important 
The `AZWE002.pax.Z` file must be uploaded to the z/OS driving system in binary format. Not using binary format causes the subsequent UNPAX step to fail.
:::

:::note
This file tranfer can take a long time to run, depending on the capacity of your system, and on what other jobs are running.
:::

Sample FTP upload scenario:

```
C:/>ftp mvsaddr  
Connected to mvsaddr. 
200-FTPD1 IBM FTP CS %version% at mvsaddr, %time% on %date%.
220 Connection will close if idle for more than 5 minutes.  
User (mvsaddr:(none)): tsouid  
331 Send password please  
Password: tsopw  
230 tsouid is loaded on.  Working directory is "tsouid.".  
ftp> cd @zfs_path@ 
250 HFS directory @zfs_path@ is the current working directory  
ftp> ascii  
200 Representation type is Ascii NonPrint  
ftp> put c:/AZWE002.readme.txt  
200 Port request OK.  
150 Storing data set @zfs_path@/AZWE002.readme.txt  
250 Transfer completed successfully.  
ftp: 0344 bytes sent in 0.01 sec. (1366.67 Kbs)  
ftp binary  
200 Representation type is Image  
ftp> put c:\AZWE002.pax.Z  
200 Port request OK.  
145 Storing data set @zfs_path@/AZWE002.pax.Z  
250 Transfer completed successfully.  
ftp: 524192256 bytes sent in 1.26 sec. (1040.52 Kbs)  
ftp: quit  
221 Quit command received.  Goodbye.  
```

:::tip
If you are unable to connect with ftp and only able to use sftp, use _sftp_ at the command prompt instead of _ftp_

As _sftp_ only supports binary file transfer, the ___ascii___ and ___binary___ commands should be omitted. After you transfer the `AZWE002.readme.txt` file, this file will be in an ASCII codepage so you need to convert the file to `EBCDIC` before it can be used. To convert `AZWE002.readme.txt` to `EBCDIC`, log in to the distribution system using ssh and run the **ICONV** command.

```
_C:>/__ssh tsouid@mvsaddr___   
_tsouid@mvsaddr's password: __tsopw___  
_/u/tsouid:>_  
_cd:@zfs_path@_  
_@zfs_path:>_  
_@zfs_path:>iconv -f ISO8859-1 -t IBM-1047 AZWE002.readme.txt > AZWE002.readme.EBCDIC_  
_@zfs_path:>rm AZWE002.readme.txt_  
_@zfs_path:>mv AZWE002.readme.EBCDIC AZWE002.readme.txt_  
_@zfs_path:>exit_  
_C:>/_  
```
:::

### Extract and expand the compressed SMPMCS and RELFILEs

The `AZWE002.readme.txt` file uploaded in the previous step holds a sample JCL to expand the compressed SMPMCS and RELFILEs from the uploaded `AZWE002.pax.Z` file into data sets for use by the SMP/E RECEIVE job. The JCL is repeated here for your convenience.

* _@zfs_path@_ matches the variable that you specified in the previous step.
* If the `oshell` command gets a RC=256 and message "pax: checksum error on tape (got ee2e, expected 0)", then the archive file was not uploaded to the host in binary format.
* GIMUNZIP allocates data sets to match the definitions of the original data sets. You might encounter errors if your SMS ACS routines alter the attributes used by GIMUNZIP. If this occurs, specify a non-SMS managed volume for the GINUMZIP allocation of the data sets. For example:
  ```
  storclas-"storage_class" volume="data_set_volume"  
  newname-"..."/>
	```
* Normally, your Automatic Class Selection (ACS) routines decide which volumes to use.  Depending on your ACS configuration, and whether your system has constraints on disk space, units, or volumes, some supplied SMP/E jobs might fail due to volume allocation errors. See [GIMUNZIP](#gimunzip) for more details.

  ```
  //EXTRACT  JOB <job parameters>
  //*   - Change:                                                                 
  //*       @PREFIX@                                                              
  //*       ----+----1----+----2----+                                             
  //*                  - To your desired data set name prefix                     
  //*                  - Maximum length is 25 characters                          
  //*                  - This value is used for the names of the                  
  //*                    data sets extracted from the download-package            
  //*       @zfs_path@                                                            
  //*       ----+----1----+----2----+----3----+----4----+----5                    
  //*                  - To the absolute z/OS UNIX path for the download          
  //*                    package (starting with /)                                
  //*                  - Maximum length is 50 characters                          
  //*                  - Do not include a trailing /                              
  //*                                                            
  //UNPAX    EXEC PGM=IKJEFT01,REGION=0M,COND=(0,LT)
  //SYSEXEC  DD DISP=SHR,DSN=SYS1.SBPXEXEC
  //SYSTSPRT DD SYSOUT=*
  //SYSTSIN  DD *
    oshell cd @zfs_path@/ ; +
      pax -rvf AZWE002.pax.Z
  //*
  //GIMUNZIP EXEC PGM=GIMUNZIP,REGION=0M,COND=(0,LT)
  //*STEPLIB  DD DISP=SHR,DSN=SYS1.MIGLIB
  //SYSUT3   DD UNIT=SYSALLDA,SPACE=(CYL,(50,10))
  //SYSUT4   DD UNIT=SYSALLDA,SPACE=(CYL,(25,5))
  //SMPOUT   DD SYSOUT=*
  //SYSPRINT DD SYSOUT=*
  //SMPDIR   DD PATHDISP=KEEP,
  // PATH='@zfs_path@/'
  //SYSIN    DD *
  <GIMUNZIP>
  <ARCHDEF archid="AZWE002.SMPMCS"
  newname="@PREFIX@.ZOWE.AZWE002.SMPMCS"/>
  <ARCHDEF archid="AZWE002.F1"
  newname="@PREFIX@.ZOWE.AZWE002.F1"/>
  <ARCHDEF archid="AZWE002.F2"
  newname="@PREFIX@.ZOWE.AZWE002.F2"/>
  <ARCHDEF archid="AZWE002.F3"
  newname="@PREFIX@.ZOWE.AZWE002.F3"/>
  <ARCHDEF archid="AZWE002.F4"
  newname="@PREFIX@.ZOWE.AZWE002.F4"/>
  </GIMUNZIP>
  //*
  ```

#### GIMUNZIP

The GIMUNZIP job may issue allocation error messages for SYSUT1 similar to these:  

```
IEF244I ZWE0GUNZ GIMUNZIP - UNABLE TO ALLOCATE 1 UNIT(S)  577      
        AT LEAST 1 OFFLINE UNIT(S) NEEDED.                         
IEF877E ZWE0GUNZ NEEDS 1 UNIT(S)  578                              
FOR GIMUNZIP SYSUT1                                        
FOR VOLUME SCRTCH-   1                                     
OFFLINE                                                    
0AA4-0AA6 0AD0-0AD4                                        
:       
*07 IEF238D ZWE0GUNZ - REPLY DEVICE NAME OR 'CANCEL'.           
 CNZ2605I At 10.10.22 the system will automatically  581        
 reply: CANCEL                                                  
 to the following WTOR:                                         
 0007 IEF238D ZWE0GUNZ - REPLY DEVICE NAME OR 'CANCEL'.         
 R 0007,CANCEL                                                  
 IKJ56883I FILE SYSUT1 NOT ALLOCATED, REQUEST CANCELED          
 -                                         --TIMINGS (MINS.)--  
 -JOBNAME  STEPNAME PROCSTEP    RC   EXCP    TCB    SRB  CLOCK  
 -ZWE0GUNZ                      12   2311 ******    .00    2.4  
 -ZWE0GUNZ ENDED.  NAME-                     TOTAL TCB CPU TIME=
 $HASP395 ZWE0GUNZ ENDED - RC=0012                                                                                 
```

The job will end with RC=12. If this happens, add a TEMPDS control statement to the existing SYSIN as shown below:

```
//SYSIN    DD *                     
<GIMUNZIP>                          
<TEMPDS volume="&VOLSER"> </TEMPDS>  
<ARCHDEF archid="&FMID..SMPMCS"
newname="@PREFIX@.ZOWE.&FMID..SMPMCS"/>
<ARCHDEF archid="&FMID..F1"
newname="@PREFIX@.ZOWE.&FMID..F1"/>
<ARCHDEF archid="&FMID..F2"
newname="@PREFIX@.ZOWE.&FMID..F2"/>
<ARCHDEF archid="&FMID..F4"
newname="@PREFIX@.ZOWE.&FMID..F4"/>
</GIMUNZIP>                         
//*                                 
``` 

* **&VOLSER**  
Specifies the DISK volume with sufficient free space to hold temporary copies of the RELFILES. As a guide, this may require 1,000 cylinders, or approximately 650 MB.

### Customize sample installation jobs

The following sample installation jobs are provided in `hlq.ZOWE.AZWE002.F1`, or equivalent, as part of the project to help you install Zowe:

<!--Observer notes 1: If you do not create a new filesystem for the runtime USS components of API ML separate to the install USS subdirectory (an optional step), you need to create the subdirectories in PuTTY for the runtime directory.
Suggestions: ZWE4ZFS is optional and it should be indicated in the doc and if you don't run it, you need to run the following Unix commands in USS cd [installdir] mkdir -p usr/lpp/zowe in order to create the required directory. -->

Job Name | Job Type | Description | RELFILE
---|---|---|---
ZWE1SMPE | SMP/E | (Optional) Sample job to create an SMP/E environment | ZOWE.AZWE002.F1
ZWE2RCVE | RECEIVE | Sample SMP/E RECEIVE job  | ZOWE.AZWE002.F1
ZWE3ALOC | ALLOCATE | Sample job to allocate target and distribution libraries | ZOWE.AZWE002.F1
ZWE4ZFS | ALLOMZFS | (Optional) Sample job to allocate, create mountpoint, and mount zFS data sets | ZOWE.AZWE002.F1
ZWE5MKD | MKDIR | Sample job to invoke the supplied ZWEMKDIR EXEC to allocate file system paths | ZOWE.AZWE002.F1
ZWE6DDEF | DDDEF | Sample job to  define SMP/E DDDEFs | ZOWE.AZWE002.F1
ZWE7APLY | APPLY | Sample SMP/E APPLY job | ZOWE.AZWE002.F1
ZWE8ACPT | ACCEPT | Sample SMP/E ACCEPT job | ZOWE.AZWE002.F1

:::note
When Zowe is downloaded from the web, the RELFILE data set name is prefixed by your chosen high-level qualifier, as documented in the [Extract and expand the compressed SMPMCS and RELFILEs](#extract-and-expand-the-compressed-smpmcs-and-relfiles) section.
:::

Follow these steps to access the sample installation jobs.

1. Performing an SMP/E RECEIVE. See [Perform SMP/E RECEIVE](#perform-smpe-receive).
2. Copy the jobs from the RELFILES to a working data set for editing and submission.

Alteratively, you can copy the sample installation jobs from the product files by submitting the job in the following example. 

Before you submit the job, add a job statement and change the lowercase parameters to uppercase values to meet the requirements of your site.

**Example:**
```
//STEP1    EXEC PGM=IEBCOPY
//SYSPRINT DD SYSOUT=*
//IN       DD DSN=ZOWE.AZWE002.F1,
//            DISP=SHR,
//*           VOL=SER=filevol,
//            UNIT=SYSALLDA
//OUT      DD DSNAME=jcl-library-name,
//            DISP=(NEW,CATLG,DELETE),
//            SPACE=(TRK,(5,5,5)),
//*           VOL=SER=dasdvol,
//            UNIT=SYSALLDA
//SYSUT3   DD UNIT=SYSALLDA,SPACE=(CYL,(1,1))
//SYSIN    DD *
    COPY INDD=IN,OUTDD=OUT
/*
```

Customize the statements is this job statement with the following values:

- IN:   
   * **__filevol__**  
   Specifies the volume serial of the DASD device where the downloaded files reside.

- OUT:  
  * **__jcl-library-name__**  
  Specifies the name of the output data set where the sample jobs are stored.  
  * **__dasdvol__**  
  Specifies the volume serial of the DASD device where the output data set resides. Uncomment the statement is a volume serial must be provided.  

The following supplied jobs might fail due to disk space allocation errors for [GIMUNZIP](#gimunzip). Review the following sections for example error and actions that you can take to resolve the error.
- [ZWE2RCVE](#zwe2rcve)
- [ZWE1SMPE and ZWE4ZFS](#zwe1smpe-and-zwe4zfs)
- [ZWEMKDIR, ZWE1SMPE, ZWE2RCVE, ZWE3ALOC, ZWE4ZFS and ZWE5MKD](#zwemkdir-zwe1smpe-zwe2rcve-zwe3aloc-zwe4zfs-and-zwe5mkd)

#### ZWE2RCVE

```
IEC032I E37-04,IGC0005E,ZWE2RCVE,RECEIVE,SMPTLIB,0AC0,USER10,  
ZOWE.SMPE.AZWE002.F4                                            
```
Add space and directory allocations to this `SMPCNTL` statement in the preceding ZWE1SMPE job:

```
ADD DDDEF(SMPTLIB)  UNIT(SYSALLDA) .  
```

**Result:**

```
ADD DDDEF(SMPTLIB) CYL SPACE(2,1) DIR(10)  UNIT(SYSALLDA) .  
```

#### ZWE1SMPE and ZWE4ZFS

**Example error:**

```
IDC3506I REQUIRED VOLUMES AND/OR DEVICETYPES HAVE BEEN OMITTED        
IDC3003I FUNCTION TERMINATED. CONDITION CODE IS 12                    

IDC0002I IDCAMS PROCESSING COMPLETE. MAXIMUM CONDITION CODE WAS 12    
```
**Action**  
Uncomment the `VOLUMES(...)` control statements and refer to the comments at the start of the JCL job for related necessary changes.

#### ZWEMKDIR, ZWE1SMPE, ZWE2RCVE, ZWE3ALOC, ZWE4ZFS and ZWE5MKD

**Example error:**
```
IEF257I ZWE3ALOC ALLOCD ALLOCD AZWEZFS - SPACE REQUESTED NOT AVAILABLE     
IEF272I ZWE3ALOC ALLOCD ALLOCD - STEP WAS NOT EXECUTED.                    
```

**Action**  
Uncomment the `VOL=SER=&...` control statements and refer to the comments at the start of the JCL job for related necessary changes.
  

### Create SMP/E environment (Optional)

A sample job ZWE1SMPE is provided or you may choose to use your own JCL. If you are using an existing CSI, do not run the sample job ZWE1SMPE. If you choose to use the sample job provided, edit and submit ZWE1SMPE. Consult the instructions in the sample job for more information.

:::note
To use the default of letting your Automatic Class Selection (ACS) routines decide which volume to use, comment out the following line in the sample job `ZWE1SMPE`.

```// SET CSIVOL=#csivol```
:::

:::tip Expected results
You will receive a return code of `0` if this job runs correctly.
:::

### Perform SMP/E RECEIVE

Edit and submit sample job ZWE2RCVE to perform the SMP/E RECEIVE for Zowe. Consult the instructions in the sample job for more information.

:::tip Expected results
You will receive a return code of 0 if this job runs correctly.
:::

### Allocate SMP/E target and distributions libraries

Edit and submit sample job ZWE3ALOC to allocate the SMP/E target and distribution libraries for Zowe. Consult the instructions in the sample job for more information.

:::tip Expected results
You will receive a return code of `0` if this job runs correctly.
:::

### Allocate, create and mount ZSF files (Optional)

This job allocates, creates a mountpoint, and mounts zFS data sets.

If you plan to install Zowe into a new z/OS UNIX file system, you can edit and submit the optional ZWE4ZFS job to perform the following tasks. Consult the instructions in the sample job for more information.

  * Create the z/OS UNIX file system
  * Create a mountpoint
  * Mount the z/OS UNIX file system on the mountpoint

The recommended z/OS UNIX file system type is zFS. The recommended mountpoint is `_/usr/lpp/zowe`._

Before running the sample job to create the z/OS UNIX file system, ensure that OMVS is active on the driving system. zFS must be active on the driving system if you are installing Zowe into a file system that is zFS.

If you create a new file system for this product, consider updating the BPXPRMxx PARMLIB member to mount the new file system at IPL time. This action can be helpful if an IPL occurs before the installation is completed.

```
MOUNT FILESYSTEM('#dsn')
 MOUNTPOINT('/usr/lpp/zowe')
 MODE(RDWR)        /* can be MODE(READ) */
 TYPE(ZFS) PARM('AGGRGROW') /* zFS, with extents */
```

Customize the statements is this job statement with the following values:

  * **__#dsn__**  
  Specifies the name of the data set holding the z/OS UNIX file system.
  * **___/usr/lpp/zowe___**  
  Specifies the name of the mountpoint where the z/OS UNIX file system will be mounted.

:::tip Expected results
You will receive a return code of `0 `if this job runs correctly.
:::

### Allocate z/OS UNIX paths

The target system HFS or zFS data set must be mounted on the driving system when running the sample ZWE5MKD job since the job will create paths in the HFS or zFS.

Before running the sample job to create the paths in the file system, ensure that OMVS is active on the driving system and that the target system's HFS, or zFS file system is mounted on the driving system. zFS must be active on the driving system if you are installing Zowe into a file system that is zFS.

If you plan to install Zowe into a new HFS or zFS file system, you must create the mountpoint and mount the new file system on the driving system for Zowe.

The recommended mountpoint is `/usr/lpp/zowe.`

Edit and submit sample job ZWE5MKD to allocate the HFS or zFS paths for Zowe. Consult the instructions in the sample job for more information.

If you create a new file system for this product, consider updating the BPXPRMxx PARMLIB member to mount the new file system at IPL time. This action can be helpful if an IPL occurs before the installation is completed.

:::tip Expected results
You will receive a return code of 0 if this job runs correctly.
:::

### Create DDDEF entries

Edit and submit sample job ZWE6DDEF to create DDDEF entries for the SMP/E target and distribution libraries for Zowe. Consult the instructions in the sample job for more information.

:::tip Expected results
You will receive a return code of `0` if this job runs correctly.
:::

### Perform SMP/E APPLY

In this step, you run the sample job ZWE7APLY to apply Zowe. This step can take a long time to run, depending on the capacity of your system, and on what other jobs are running.

**Follow these steps**

1. Ensure that you have the latest HOLDDATA; then edit and submit sample job ZWE7APLY to perform an SMP/E APPLY CHECK for Zowe. Consult the instructions in the sample job for more information.

  The latest HOLDDATA is available through several different portals, and may identify HIPER and FIXCAT APARs for the FMIDs you will be installing. Use the **APPLY CHECK** command to assist you to determine whether any HIPER or FIXCAT APARs are applicable to the FMIDs you are installing.
   
  If there are any applicable HIPER of FIXCAT APARs, the **APPLY CHECK** also identifies fixing PTFs that will resolve the APARs, if a fixing PTF is available.

  You should install the FMIDs regardless of the status of unresolved HIPER or FIXCAT APARs. However, do not deploy the software until the unresolved HIPER and FIXCAT APARs have been analyzed to determine their applicability. Before deploying the software either ensure fixing PTFs are applied to resolve all HIPER or FIXCAT APARs, or ensure the problems reported by all HIPER or FIXCAT APARs are not applicable to your environment.

  :::tip
  To receive the full benefit of the SMP/E Causer SYSMOD Summary Report, do _not_ bypass the PRE, ID, REQ, and IFREQ on the APPLY CHECK. The SMP/E root cause analysis identifies the cause only of _errors_ and not of _warnings_ (SMP/E treats bypassed PRE, ID, REQ, and IFREQ conditions as warnings, instead of errors).
  :::

  #### Sample APPLY commands 
  
  Review the following sample **APPLY** commands:

  * **APPLY CHECK**  
  To ensure that all recommended and critical services are installed with the FMIDs, receive the latest HOLDDATA and use the **APPLY CHECK**. 

  **Example:**
  ```
  APPLY S(fmid,fmid,...) CHECK   
  FORFMID(fmid,fmid,...)
  SOURCEID(RSU*)
  FIXCAT(IBM.PRODUCTINSTALL-REQUIREDSERVICE)
  GROUPEXTEND .
  ```
:::note
* Some HIPER APARs might not have fixing PTFs available yet. You should analyze the symptom flags for the unresolved HIPER APARs to determine if the reported problem is applicable to your environment and if you should bypass the specific ERROR HOLDs in order to continue the installation of the FMIDs.
* This method requires more initial research, but can provide resolution for all HPERs that have fixing PTFs available and not in a PE chain. Unresolved PEs or HIPERs might still exist and require the use of BYPASS.
:::

* **APPLY CHECK with operand**  
To install the FMIDs without regard for unresolved HIPER APARs, add the `BYPASS(HOLDCLASS(HIPER))` operand to the **APPLY CHECK** command. Using this command and operand enables you to install FMIDs, even though one or more unresolved HIPER APARs exist. After the FMIDs are installed, use the SMP/E **REPORT ERRSYSMODS** command to identify unresolved HIPER APARs and any fixing PTFs.

```
APPLY S(fmid,fmid,...) CHECK
FORFMID(fmid,fmid,...)
SOURCEID(RSU*)
FIXCAT(IBM.PRODUCTINSTALL-REQUIREDSERVICE)
GROUPEXTEND
BYPASS(HOLDCLASS(HIPER)) .
..any other parameters documented in the program directory
```
:::note Notes:  
* This method is quicker, but requires subsequent review of the Exception SYSMOD report produced by the REPORT ERRSYSMODS command to investigate any unresolved HIPERs. If you have received the latest HOLDDATA, you can also choose to use the REPORT MISSINGFIX command and specify Fix Category IBM.PRODUCTINSTALL-REQUIREDSERVICE to investigate missing recommended service.
* If you bypass HOLDs during the installation of the FMIDs because fixing PTFs are not yet available, you can be notified when the fixing PTFs are available by using the APAR Status Tracking (AST) function of the ServiceLink or the APAR Tracking function of Resource Link.
:::
2. After you take actions that are indicated by the **APPLY CHECK**, remove the `CHECK` operand and run the job again to perform the APPLY.

:::note
The GROUPEXTENDED operand indicates the SMP/E applies all requisite SYSMODs. The requisite SYSMODS might be applicable to other functions.
:::

:::tip 
* Expected results from **APPLY CHECK**
You will receive a return code of `0` if this job runs correctly.
* Expected results from **APPLY** 
You will receive a return code of `0` if the job runs correctly.
:::

### Perform SMP/E ACCEPT

Edit and submit sample job ZWE8ACPT to perform an SMP/E ACCEPT CHECK for Zowe. Consult the instructions in the sample job for more information.

To receive the full benefit of the SMP/E Causer SYSMOD Summary Report, do not bypass the PRE, ID, REQ, and IFREQ on the ACCEPT CHECK. The SMP/E root cause analysis identifies the cause of errors but not warnings (SMP/E treats bypassed PRE, ID, REQ, and IFREQ conditions as warnings rather than errors).

Before you use SMP/E to load new distribution libraries, it is recommended that you set the ACCJCLIN indicator in the distribution zone. In this way, you can save the entries that are produced from JCLIN in the distribution zone whenever a SYSMOD that contains inline JCLIN is accepted. For more information about the ACCJCLIN indicator, see the description of inline JCLIN in the SMP/E Commands book for details.

After you take actions that are indicated by **ACCEPT CHECK**, remove the `CHECK` operand and run the job again to perform the **ACCEPT**.

:::note
The GROUPEXTEND operand indicates that SMP/E accepts all requisite SYSMODs. The requisite SYSMODS might be applicable to other functions.
:::
:::tip Expected results from ACCEPT CHECK
You will receive a return code of `0` if this job runs correctly.
:::

If PTFs that contain replacement modules are accepted, SMP/E ACCEPT processing will link-edit or bind the modules into the distribution libraries. During this processing, the Linkage Editor or Binder might issue messages that indicate unresolved external references, which will result in a return code of 4 during the ACCEPT phase. You can ignore these messages, because the distribution libraries are not executable and the unresolved external references do not affect the executable system libraries.

:::tip Expected results from ACCEPT 
You will receive a return code of `0` if this job runs correctly.
:::

### Run REPORT CROSSZONE

The SMP/E REPORT CROSSZONE command identifies requisites for products that are installed in separate zones. This command also creates **APPLY** and **ACCEPT** commands in the `SMPPUNCH` data set. You can use the **APPLY** and **ACCEPT** commands to install those cross-zone requisites that the SMP/E REPORT CROSSZONE command identifies.

After you install Zowe, it is recommended that you run **REPORT CROSSZONE** against the new or updated target and distribution zones. **REPORT CROSSZONE** requires a global zone with ZONEINDEX entries that describe all the target and distribution libraries to be reported on.

For more information about **REPORT CROSSZONE**, see the SMP/E manuals.

### Cleaning up obsolete data sets, paths, and DDDEFs

The web download data sets listed in [DASD storage requirements](install-zowe-smpe-overview.md#dasd-storage-requirements) are temporary data sets. You can delete these data sets after you complete the SMP/E installation.

## Activating Zowe

### File system execution

If you mount the file system in which you have installed Zowe in read-only mode during execution, then you do not have to take further actions to activate Zowe.

## Zowe customization

You can find the necessary information about customizing and using Zowe on the Zowe doc site.

- For more information about how to customize Zowe, see [Configuring Overview](https://docs.zowe.org/stable/user-guide/configuring-overview/).
- For more information about how to use Zowe, see [Using Zowe](https://docs.zowe.org/stable/user-guide/zowe-getting-started-tutorial/).



