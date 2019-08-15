# Installing Zowe SMP/E Alpha

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Installing Zowe SMP/E Alpha](#installing-zowe-smpe-alpha)
	- [Installation Requirements and Considerations](#installation-requirements-and-considerations)
	- [Driving System Requirements](#driving-system-requirements)
	- [Installation Instructions](#installation-instructions)
		- [SMP/E considerations for installing Zowe](#smpe-considerations-for-installing-zowe)
		- [SMP/E Options Subentry Values](#smpe-options-subentry-values)
		- [SMP/E CALLLIBS Processing](#smpe-calllibs-processing)
		- [Overview of the installation steps](#overview-of-the-installation-steps)
		- [Download the Zowe SMP/E package](#download-the-zowe-smpe-package)
		- [Allocate file system to hold the download package](#allocate-file-system-to-hold-the-download-package)
		- [Upload the download package to the host](#upload-the-download-package-to-the-host)
		- [Extract and expand the compressed SMPMCS and RELFILEs](#extract-and-expand-the-compressed-smpmcs-and-relfiles)
		- [Sample Jobs](#sample-jobs)
		- [Create SMP/E environment (optional)](#create-smpe-environment-optional)
		- [Perform SMP/E RECEIVE](#perform-smpe-receive)
		- [Allocate SMP/E Target and Distributions Libraries](#allocate-smpe-target-and-distributions-libraries)
		- [Allocate, create and mount ZSF Files (Optional)](#allocate-create-and-mount-zsf-files-optional)
		- [Allocate z/OS UNIX Paths](#allocate-zos-unix-paths)
		- [Create DDDEF Entries](#create-dddef-entries)
		- [Perform SMP/E APPLY](#perform-smpe-apply)

<!-- /TOC -->

## Installation Requirements and Considerations

The following sections identify the system requirements for installing and actibating Zowe.  The following terminology is used:

  * *Driving System:* the system on which SMP/E is executed to install the program.

  * *Target system:* the system on which the program is configured and run.

Use separate driving and target systems in the following situations:

  * When you install a new level of a product that is already installed, the new level of the product will replace the old one. By installing the new level onto a separate target system, you can test the new level and keep the old one in production at the same time.

  * When you install a product that shares libraries or load modules with other products, the installation can disrupt the other products. By installing the product onto a separate target system, you can assess these impacts without disrupting your production system.

## Driving System Requirements

This section describes the environment of the driving system required to install Zowe.

<< To be Completed >>

## Installation Instructions

This section describes the installation method and the step-by-step procedures to install and activate the functions of Zowe.

Please note the following points:

  * If you want to install Zowe into its own SMP/E environment, consult the SMP/E manuals for instrcutions on creating and initializing the SMPCSI and SMP/E control data sets.

  * You can use the sample jobs that are provided to perform part or all of the installation tasks. The SMP/E jobs assume that all DDDEF entries that are required for SMP/E execution have been defined in appropriate zones.

  * You can use the SMP/E dialogs instead of the sample jobs to accomplish the SMP/E installation steps.

### SMP/E considerations for installing Zowe

Use the SMP/E RECEIVE, APPLY, and ACCEPT commands to install this release of Zowe.

### SMP/E Options Subentry Values

The recommended values for certain SMP/E CSI subentries are shown in the following table. Using values lower than the recommended values can result in failures in the installation. DSSPACE is a subentry in the GLOBAL options entry. PEMAX is a subentry of the GENERAL entry in the GLOBAL options entry. See the SMP/E manuals for instructions on updating the global zone.

**Table: SMP/E Options Subentry Values**  

Subentry | Value | Comment
-- | --| --|
DSSPACE | (1200,1200,1400)  | Space allocation
PEMAX | SMP/E Default | IBM recommends using the SMP/E default for PEMAX.

<< TODO - Where does this section belong ? >>
### SMP/E CALLLIBS Processing

Zowe uses the CALLLIBS function that is provided in SMP/E to resolve external references during installation. When Zowe is installed, ensure that DDDEFs exist for the following libraries: <!--Needs a list of libraries-->

- CSSLIB
- DSNLOAD
- MACLIB

**Note:** CALLLIBS uses the previous DDDEFs only to resolve the link-edit for Zowe. These data sets are not updated during the installation of Zowe.

### Overview of the installation steps

Overview of steps required to download and install Zowe Open Source Project (Base).

  1. [Download the Zowe SMP/E package](#download-the-zowe-smpe-package)
  2. [Allocate file system to hold web download package](#allocate-file-system-to-hold-the-download-package)
  3. [Upload the download package to the host](#upload-the-download-package-to-the-host)
  4. [Extract and expand the compress SMPMCS and RELFILEs](#extract-and-expand-the-compressed-smpmcs-and-relfiles)
  5. [Sample Jobs](#sample-jobs)
  6. [Create SMP/E environment (optional)](#Create-smp/e-environment-(optional))
  7. [Perform SMP/E Receive](#perform-smp/e-receive)
  8. [Allocate SMP/E target and distribution libraries](#allocate-smp/e-target-and-distribution-libraries)
  9. [Allocate and mount z/OS UNIX file system (optional)](allocate,-create-and-mount-ZSF-Files-(Optional))
  10. [Allocate z/OS UNIX paths](#allocate-z/os-unix-paths)
  11. [Create DDDEF entries](#create-dddef-entries)
  12. Perform SMP/E APPLY
  13. Perform SMP/E ACCEPT
  14. Run REPORT CROSSZONE

### Download the Zowe SMP/E package

  To download the Zowe SMP/E package, open your web browser and click the **DOWNLOAD Zowe SMP/E Alpha** button on the [Zowe Download](https://zowe.org/download/) website to save the files to a folder on your desktop.

  You will receive 2 files on your desktop.

  - **AZWE001.pax.Z (binary)**

     The SMP/E input data sets to install Zowe are provided as compressed files in AZWE001.pax.Z. This pax archive file holds the SMP/E MCS and RELFILEs.

  - **AZWE001.readme.txt (EBCDIC)**

     The README file AZWE001.readme.txt is a single JCL file containing jobs with all the job steps you need to perform the installation, with comprehensive comments on how to tailor them. This is a sample job that executes the z/OS UNIX System Services pax command to extract package archives. This job also executes the GIMUNZIP program to expand the package archives so that the data sets can be processed by SMP/E.

     Review this file on your desktop and follow the instructions that apply to your system.

     The README file contains an optional job FILESYS to set up a new ZSS file system. The rest of the README is a single job EXTRACT.

### Allocate file system to hold the download package

You can either create a new z/OS UNIX file system (zFS) or create a new directory in an existing file system to place AZWE001.pax.Z. The directory that will contain the download package must reside on the z/OS system where the function will be installed.

To create a new file system, and directory, for the download package, you can use the following sample JCL (FILESYS).

Copy and paste the sample JCL into a separate data set, uncomment the job, and modify the job to update required parameters before submitting it.

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
         TRK(#size) -
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
__Expected Return Codes and Messages:__ You will receive a return code of 0 if this job runs correctly.

### Upload the download package to the host

Upload the AZWE001.readme.txt file in text format and the AZWE001.pax.Z file in binary format from your workstation to the z/OS UNIX file system. The instructions in this section are also in the AZWE001.readme.txt file that you downloaded.

There are many ways to transfer the files or make them available to the z/OS system where the package will be installed. In the following sample dialog, we use FTP from a Microsoft Windows command line to do the transfer. This assumes that the z/OS host is configured as an FTP host/server and that the workstation is an FTP client.  Commands or other information entered by the user are in bold, and the following values are assumed.

User enters: | JValues |
--| --|
mvsaddr | TCP/IP address or hostname of the z/OS system
tsouid | Your TSO user ID
tsopw | Your TSO password
d: | Location of the downloaded files
@zfs_path@ | z/OS UNIX path where to store the files. This matches the @zfs_path@ variable you specified in the previous step.

**Important!**  
The AZWE001.pax.Z file must be uploaded to the z/OS driving system in binary format, or the subsequent UNPAX step will fail.

Sample FTP upload scenario:

_C:/>__ftp mvsaddr___  
_Connected to mvsaddr._  
_200-FTPD1 IBM FTP CS %version% at mvsaddr, %time% on %date%._
_220 Connection will close if idle for more than 5 minutes._  
_User (mvsaddr:(none)): __tsouid___  
_331 Send password please_  
_Password: __tsopw___  
_230 tsouid is loadded on.  Working directory is "tsouid."._  
_ftp> __cd @zfs_path@___  
_250 HFS directory @zfs_path@ is the current working directory_  
_ftp> __ascii___  
_200 Representation type is Ascii NonPrint_  
_ftp> __put c:/AZWE001.readme.txt___  
_200 Port request OK._  
_150 Storing data set @zfs_path@/AZWE001.readme.txt_  
_250 Transfer completed successfully._  
_ftp: 0344 bytes sent in 0.01 sec. (1366.67 Kbs)_  
_ftp __binary___  
_200 Representation type is Image_  
_ftp> __put c:\AZWE001.pax.Z___  
_200 Port request OK._  
_145 Storing data set @zfs_path@/AZWE001.pax.Z_  
_250 Transfer completed successfully._  
_ftp: 524192256 bytes sent in 1.26 sec. (1040.52 Kbs)_  
_ftp: __quit___  
_221 Quit command received.  Goodbye._  

**If you are unable to connect with ftp and only able to use sftp**,
the commands above are the same except that you will use _sftp_ at the command prompt instead of _ftp_. Also, because _sftp_ only supports binary file transfer, the ___ascii___ and ___binary___ commands should be omitted. After you transfer the AZWE001.readme.txt file, it will be in an ASCII codepage so you need to convert it to EBCDIC before it can be used. To convert AZWE001.readme.txt to EBCDIC, log in to the distribution system using ssh and run an ICONV command.

_C:>/__ssh tsouid@mvsaddr___   
_tsouid@mvsaddr's password: __tsopw___  
_/u/tsouid:>_  
_cd:@zfs_path@_  
_@zfs_path:>_  
_@zfs_path:>iconv -f ISO8859-1 -t IBM-1047 AZWE001.readme.txt > AZWE001.readme.EBCDIC_  
_@zfs_path:>rm AZWE001.readme.txt_  
_@zfs_path:>mv AZWE001.readme.EBCDIC AZWE001.readme.txt_  
_@zfs_path:>exit_  
_C:>/_  

### Extract and expand the compressed SMPMCS and RELFILEs

The AZWE001.readme.txt file uploaded in the previous step holds a sample JCL to expand the compressed SMPMCS and RELFILEs from the uploaded AZWE001.pax.Z file into data sets for use by the SMP/E RECEIVE job. The JCL is repeated here for your convenience.

  * @zfs_path@ matches the variable that you specified in the previous step.
  * If the 'oshell' command gets a RC=256 and message "pax: checksum error on tape (got ee2e, expected 0), then the archive file was not uploaded to the host in binary format.
  * GIMUNZIP allocates data sets to match the definintions of the original data sets. You may encounter errors if your SMS ACS routines alter the attributes used by GIMUNZIP. If this occurs, specify a non-SMS managed volume for the GINUMZIP allocation of the data sets. For example:  
   _storclas-"storage_class" volume="data_set_volume"_  
   _newname-"..."/>_  

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
    pax -rvf AZWE001.pax.Z
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
<ARCHDEF archid="AZWE001.SMPMCS"
newname="@PREFIX@.ZOWE.AZWE001.SMPMCS"/>
<ARCHDEF archid="AZWE001.F1"
newname="@PREFIX@.ZOWE.AZWE001.F1"/>
<ARCHDEF archid="AZWE001.F2"
newname="@PREFIX@.ZOWE.AZWE001.F2"/>
<ARCHDEF archid="AZWE001.F4"
newname="@PREFIX@.ZOWE.AZWE001.F4"/>
</GIMUNZIP>
//*
```
### Sample Jobs

The following sample installation jobs are provided as part of the project to help you install Zowe:

Job Name | Job Type | Description | RELFILE
--| --| --| --|
ZWE1SMPE | SMP/E | Sample job to create an SMP/E environment (optional) | ZOWE.AZWE001.F1
ZWE2RCVE | RECEIVE | Sample SMP/E RECEIVE job  | ZOWE.AZWE001.F1
ZWE3ALOC | ALLOCATE | Sample job to allocate, create mountpoint, and mount zFS data sets
ZWE5MK | MKDIR | Sample job to invoke the supplied ZWEMKDIR EXEC to allocate file system paths | ZOWE.AZWE001.F1
ZWE6DDEF | DDDEF | Sample job to define SMP/E DDDEFs | ZOWE.AZWE001.F1
ZWE7APLY | APPLY | Sample SMP/E ACCEPT job | ZOWE.AZWE001.F1

**Note:** When Zowe is downloaded from the web, the RELFILE data set name will be prefixed by your chosen high level qualifier.

You can access the sample installation jobs by performing an SMP/E RECEIVE (refer to [Perform SMP/E Receive](#perform-smp/e-receive)), then copy the jobs from the RELFILES to a work data set for editing and submission.

You can also copy the sample installation jobs from the product files by submitting the following job.  Before you submit the job, add a job care and change the lowercase parameters to uppercase values to meet the requirements of your site.

```
//STEP1    EXEC PGM=IEBCOPY
//SYSPRINT DD SYSOUT=*
//IN       DD DSN=ZOWE.AZWE001.F1,
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
__Note:__ When Zowe is downloaded from the web, the RELFILE data set name will be prefixed by your chosen high level qualifier, as documented in the [Extract and expand the compressed SMPMCS and RELFILEs](#extract-and-expand-the-compressed-smpmcs-and-relfiles) section.

See the following information to update the statements in the previous sample:

- IN:   
   * __filevol__ is the volume serial of the DASD device where the downloaded files reside.

- OUT:  
  * __jcl-library-name__ is the name of the output data set where the sample jobs are stored.  
  * __dasdvol__ is the volume serial of the DASD device where the output data set resides. Uncomment the statement is a volume serial must be provided.  

### Create SMP/E environment (optional)

If you are using an existing CSI, do not run the sample job ZWE1SMPE.

If you choose to create a new SMP/E environment for this install, a sample job is provided of you may choose to use your own JCL. If you choose to use the sample job propvided, edit and submit ZWE1SMPE. Consult the instructions in the sample job for more information

__Expected Return Codes and Messages:__ You will receive a return code of 0 if this job runs correctly.

### Perform SMP/E RECEIVE

Edit and submit sample job ZWE2RCVE to perform the SMP/E RECEIVE for Zowe. Consult the instructions in the sample job for more information.

__Expected Return Codes and Messages:__ You will receive a return code of 0 if this job runs correctly.

### Allocate SMP/E Target and Distributions Libraries

Edit and submit sample job ZWE3ALOC to allocate the SMP/E target and distribution libraries for Zowe. Consult the instructions in the sample job for more information.

__Expected Return Codes and Messages:__ You will receive a return code of 0 if this job runs correctly.

### Allocate, create and mount ZSF Files (Optional)

This job allocates, creates a mountpoint, and mounts zFS data sets.

If you plan to install Zowe into a new z/OS UNIX file system, you can edit and submit the optional ZWE4ZFS job to perform the following tasks.

  * Create the z/OS UNIX file system
  * Create a mountpoint
  * Mount the z/OS UNIX file system on the mountpoint

Consult the instructions in the sample job for more information.

The recommended z/OS UNIX file system type is zFS. The recommended mountpoint is _usr/lpp/zowe._

Before running the sample job to create the z/OS UNIX file system, you must ensure that OMVS is active on the driving system. zFS must be active on the driving system if you are installing Zowe into a file system that is zFS.

If you create a new file system for this product, consider updating the BPXPRMxx PARMLIB member to mount the new file system at IPL time. This action can be helpful if an IPL occurs before the installation is completed.

```
MOUNT FILESYSTEM('#dsn')
 MOUNTPOINT('/usr/lpp/zowe')
 MODE(RDWR)        /* can be MODE(READ) */
 TYPE(ZFS) PARM('AGGRGROW') /* zFS, with extents */
```
See the following information to update the statements in the previous sample:

  * __#dsn__ is the name of the data set holding the z/OS UNIX file system.
  * ___usr/lpp/zowe___ is the name of the mountpoint where the z/OS UNIX file system will be mounted.

__Expected Return Codes and Messages:__ You will receive a return code of 0 if this job runs correctly.

### Allocate z/OS UNIX Paths

The target system HFS or zFS data set must be mounted on the driving system when running the sample ZWE5MKD job since the job will create paths in the HFS or zFS.

Before running the sample job to create the paths in the file system, you must ensure that OMVS is active on the driving system and that the target system's HFS or zFS file system is mounted to the driving system. zFS must be active on the driving system if you are installing Zowe into a file system that is zFS.

If you plan to install Zowe into a new HFS or zFS file system, you must create the mountpoint and mount the new file system to the driving system for Zowe.

<!Should this be /usr/lpp/zowe/v1?>

The recommended mountpoint is _usr/lpp/zowe._

Edit and submit sample job ZWE5MKD to allocate the HFS or zFS paths or zFS paths for Zowe. Consult the instructions in the sample job for more information.

If you create a new file system for this product, consider updating the BPXPRMxx PARMLIB member to mount the new file system at IP time. This action can be helpful if an IP occurs before the installation is completed.

__Expected Return Codes and Messages:__ You will receive a return code of 0 if this job runs correctly.

### Create DDDEF Entries

Edit and submit sample job ZWE6DDEF to create DDDEF entries for the SMP/E target and distribution libraries for Zowe. Consult the instructions in the sample job for more information.

__Expected Return Codes and Messages:__ You will receive a return code of 0 if this job runs correctly.

### Perform SMP/E APPLY

1. Ensure that you have the latest HOLDDATA; then edit and submit sample job ZWE7APLY to perform an SMP/E APPLY CHECK for Zowe. Consult the instructions in the sample job for more information.

   The latest HOLDDATA is available through several different portals, including http://service.software.ibm.com/holddata/390holddata.html. The latest HOLDDATA may identify HIPER and FIXCAT APARs for the FMIDs you will be installing. An APPLY CHECK will help you determine if any HIPER or FIXCAT APARs are applicable to the FMIDs you are installing. If there are any applicable HIPER of FIXCAT APARs, the APPLY CHECK will also identify fixing PTFs that will resolve the APARs, if a fixing PTF is available.

   You should install the FMIDs regardless of the statues of unresolved HIPER or FIXCAT APARs. However, do not deploy the software until the unresolved HIPER and FIXCAT APARs have been analyzed to determine their applicability. That is, before deploying the software either ensure fixing PTFs are applied to resolve all HIPER or FIXCAT APARs, or ensure the problems reported by all HIPER or FIXCAT APARs are not applicable to your environment.

   To receive the full benefit of the SMP/E Causer SYSMOD Summary Report, do _not_ bypass the PRE, ID, REQ, and IFREQ on the APPLY CHECK. The SMP/E root cause analysis identifies the cause only of _errors_ and not of _warnings_ (SMP/E treats bypassed PRE, ID, REQ, and IFREQ conditions as warnings, instead of errors).

   Here are sample APPLY commands:

   1. To ensure that all recommended and critical service is installed with the FMIDs, receive the latest HOLDDATA and use the APPLY CHECK command as follows
