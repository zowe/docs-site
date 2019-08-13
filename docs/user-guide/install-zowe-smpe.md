# Installing Zowe SMP/E Alpha

## Installation Requirements and Considerations

The following sections identify the system requirements for installing and actibating Zowe.  The following terminology is used:

  * *Driving System:* the system on which SMP/E is executed to install the program.

  * *Target system:* the system on which the program is configured and run

 Use separate driving and target systems in the following situations:

  * When you install a new level of a product that is already installed, the new level of the product will replace the old one. By installing the new level onto a separate target system, you can test the new level and keep the old one in production at the same time.

  * When you install a product that shares libraries or load modules with other products, the installation can disript the other products. By installing the product onto a separate target system, you can assess these impacts without disrupting your production system.

## Driving System Requirements

<< To be Completed >>

## Installation Requirements and Considerations

<< To be Completed >>

## Installation Instructions

This chapter describes the installation method and the step-by-step procedures to install and activate the functions of Zowe.

Please note the following points:

  * If you want to install Zowe into its own SMP/E environment, consult the SMP/E manuals for instrcutions on creating and initializing the SMPCSI and SMP/E control data sets.

  * You can use the sample jobs that are provided to perform part or all of the installation tasks. The SMP/E jobs assume that all DDDEF entries that are required for SMP/E execution have been defined in appropriate zones.

  * You can use the SMP/E dialogs instead of the sample jobs to accomplish the SMP/E installation steps.

### SMP/E considerations for installing Zowe

Use the SMP/E RECEIVE, APPLY, and ACCEPT commands to install this release of Zowe.

### SMP/E Options Subentry Values

The recommended values for certain SMP/E CSI subentries are shown in the following table. Using values lower
than the recommended values can result in failures in the installation. DSSPACE is a subentry in the
GLOBAL options entry. PEMAX is a subentry of the GENERAL entry in the GLOBAL options entry. See
the SMP/E manuals for instructions on updating the global zone.

**Table: SMP/E Options Subentry Values**  <!--Needs input-->
Subentry | Value | Comment
-- | --| --| 
DSSPACE | (1200,1200,1400)  | Space allocation
PEMAX | SMP/E Default | IBM recommends using the SMP/E default for PEMAX.

### Overview of the installation steps

Overview of steps required to install Zowe Open Source Project (Base).

  1. [Allocate file system to hold web download package](#allocate-file-system-to-hold-the-download-package)
  2. [Download the Zowe SMP/E package](#download-the-zowe-smp/e-package)
  3. [Upload the download package to the host](#upload-the-download-package-to-the-host)
  4. [Extract and expand the compress SMPMCS and RELFILEs](#extract-and-expand-the-compressed-smpmcs-and-relfiles)
  5. Create SMP/E enviornment (optional)
  6. Perform SMP/E Receive
  7. Allocate SMP/E target and distribution libraries
  8. Allocate and mount z/OS UNIX file system (optional)
  9. Allocate z/OS UNIX paths
  10. Create DDDEF entries
  11. Perform SMP/E APPLY
  12. Perform SMP/E ACCEPT
  13. Run REPORT CROSSZONE

<< TODO - Where does this section belong ? >>
### SMP/E CALLLIBS Processing

Zowe uses the CALLLIBS function that is provided in SMP/E to resolve external references during installation. When Zowe is installed, ensure that DDDEFs exist for the following libraries: <!--Needs a list of libraries-->

- CSSLIB
- DSNLOAD
- MACLIB

**Note:** CALLLIBS uses the previous DDDEFs only to resolve the link-edit for Zowe. These data sets are not updated during the installation of Zowe.
<< TODO - Where does this section belong ? >>
### Sample Jobs ?? 

The following sample installation jobs are provided as part of the project to help you install Zowe: <!--Needs a list of sample jobs-->

Job Name | Job Type | Description | RELFILE
--| --| --| --|
INGALLOC | ALLOCATE | Sample job to allocate target and distribution libraries | IBM.JWRE41F.F3
KAHALLOC | ALLOCATE | Sample job to allocate target and distribution libraries for Monitoring Agent and TEP support  | IBM.HKAH35T.F2

**Note:** When Zowe is downloaded from the web, the RELFILE data set name will be prefixed by your chosen high level qualifier. <!--Needs verification-->

### Download the Zowe SMP/E package

To download the Zowe SMP/E package, open your web browser and click the **DOWNLOAD Zowe SMP/E Alpha** button on the [Zowe Download](https://zowe.org/download/) website to save the files to a folder on your desktop. 

You will receive 2 files on your desktop. 

- **AZWE001.pax.Z (binary)**
  
   The SMP/E input data sets to install Zowe are provided as compressed files in AZWE001.pax.Z. This pax archive file holds the SMP/E MCS and RELFILEs.

- **AZWE001.readme.txt (EBCDIC)**

   The README file AZWE001.readme.txt is a single JCL file containing jobs with all the job steps you need to perform the installation, with comprehensive comments on how to tailor them. This is a sample job that executes the z/OS UNIX System Services pax command to extract package archives. This job also executes the GIMUNZIP program to expand the package archives so that the data sets can be processed by SMP/E.
   
   Review this file on your desktop and follow the instructions that apply to your system.

   The README file contains an optional job FILESYS to set up a new ZSS file system.

   The rest of the README is a single job EXTRACT.

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
__Expected Return Codes and Messages:__ You will receive a return code of 0 if this job runs correctly

### Upload the download package to the host 

These instructions are also in the AZWE001.readme.txt file that you downloaded.

Upload the AZWE001.readme.txt file in text format and the AZWE001.pax.Z file in binary format from your workstation to the z/OS UNIX file system. 

There are many ways to transfer the files or make them available to the z/OS system where the package will be installed. In the following sample dialog, we use FTP from a Microsoft Windows command line to do the transfer. This assumes that the z/OS host is configured as an FTP host/server and that the workstation is an FTP client.  Commands or other information entered by the user are in bold. and the following values are assumed

User enters: | JValues | 
--| --| 
mvsaddr | TCP/IP address or hostname of the z/OS system
tsouid | Your TSO user ID
tsopw | Your TSO password
d: | Location of the downloaded files
@zfs_path@ | z/OS UNIX path where to store the files. This matches the @zfs_path@ variable you specified in the previous step.

**IMPORTANT:**
The #pax file must be uploaded to the z/OS driving system in binary format, or the subsequent UNPAX step will fail.

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

**If you are unable to connect with ftp and only able to use sftp**

The commands above are the same except that you will use _sftp_ at the command prompt instead of _ftp_.  Because _sftp_ only suports binary file transfer the ___ascii___ and ___binary___ commands should be ommitted. After you transfer the AZWE001.readme.txt file it will be in an ASCII codepage so you will need to convert it to EBCDIC before it can be used.

To transfer AZWE001.readme.txt to EBCDIC log onto the distribution system using ssh and run an ICONV command

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

  * @zfs_path@ matches the variable you spein the previous step.
   * If the 'oshell' command gets a RC=256 and message "pax: checksum error on tape (got ee2e, expected 0) then the archive file was not uploaded to the host in binary format.
   * GIMUNZIP allocates data sets to match the definintions of the original data sets. You may encounter errors if your SMS ACS routines alter the attributes used by GIMUNZIP. If this occurs, specify a non-SMS managed volume for the GINUMZIP allocation of the data sets. For example:  
   _storclas-"storage_class" volume="data_set_volume"_  
   _newname-"..."/>_  
   
```
//EXTRACT  JOB <job parameters>
//*   - Change:
//*       @PREFIX@
//*       ----+----1----+----2
//*                  - To your desired data set name prefix
//*                  - Maximum length is 20 characters
//*                  - This value is used for the names of the
//*                    data sets extracted from the download-package
//*       @zfs_path@
//*       ----+----1----+----2----+----3----+----4----+----5
//*                  - To the absolute z/OS UNIX path for the download
//*                    package (starting with /)
//*                  - Maximum length is 50 characters
//*                  - Do not include a trailing /
//*
//* Note: If the 'oshell' command has a RC=256 and message
//* "pax: checksum error on tape (got ee2e, expected 0)", then the
//* AZWE002.pax.Z
//* archive file was not uploaded to the host in binary format.
//UNPAX    EXEC PGM=IKJEFT01,REGION=0M,COND=(0,LT)
//SYSEXEC  DD DISP=SHR,DSN=SYS1.SBPXEXEC
//SYSTSPRT DD SYSOUT=*
//SYSTSIN  DD *
  oshell cd @zfs_path@/ ; +
    pax -rvf AZWE002.pax.Z
//*
//* Note: GIMUNZIP allocates data sets to match the definitions of
//* the original data sets. You may encounter errors if your SMS ACS
//* routines alter the attributes used by GIMUNZIP.
//* If this occurs, specify a non-SMS managed volume for the
//* GIMUNZIP allocation of the data sets. For example:
//* <ARCHDEF archid="..."
//*          storclas="storage_class" volume="data_set_volume"
//*          newname="..."/>
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
<ARCHDEF archid="AZWE002.F4"
newname="@PREFIX@.ZOWE.AZWE002.F4"/>
</GIMUNZIP>
//*
```
