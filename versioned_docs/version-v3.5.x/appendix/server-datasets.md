# Server data sets reference

Zowe includes a number of files that are stored in the various data sets. See the following tables for the storage requirements and purposes.

## Runtime data sets

The following data sets comprise the runtime, read-only data set content that can be used by multiple Zowe instances of the same version. These are either delivered by an [SMP/E install](../user-guide/install-zowe-smpe.md), or by running `zwe install` when using [the z/OS convenience build of the Zowe servers](../user-guide/install-zowe-zos-convenience-build.md).

Library DDNAME | Member Type | Target Volume | Type | Org | RECFM | LRECL | No. of 3390 Trks | No. of DIR Blks
---|---|---|---|---|---|---|---|---
SZWESAMP | Samples | ANY | U | PDSE | FB | 80 | 30 | 30
SZWEAUTH | Zowe APF Load Modules | ANY | U | PDSE | U | 0 | 150 | N/A
SZWEEXEC | CLIST copy utilities | ANY | U | PDSE | FB | 80 | 15 | 30
SZWELOAD | Executable utilities library | ANY | U | PDSE | U | 0 | 105 | N/A

The `SZWESAMP` data set contains the following members.

Member name | Type | Purpose
---|---|---
ZWECSRVS | JCL | Removes the VSAM data set for the Caching Service
ZWECSVSM | JCL | Creates the VSAM data set for the Caching Service
ZWEGENER | JCL | Generates JCL templates to configure Zowe
ZWEIACF | JCL | Defines security permits for ACF2
ZWEIACFZ | JCL | Creates the ACF2 Zowe resource class
ZWEIAPF | JCL | Set APF for the required data sets
ZWEIAPF2| JCL | Set APF for the required data sets
ZWEIKRA1 | JCL | Defines ACF2 key ring and certificates
ZWEIKRA2 | JCL | Defines ACF2 key ring and certificates
ZWEIKRA3 | JCL | Defines ACF2 key ring and certificates
ZWEIKRR1 | JCL | Defines RACF key ring and certificates
ZWEIKRR2 | JCL | Defines RACF key ring and certificates
ZWEIKRR3 | JCL | Defines RACF key ring and certificates
ZWEIKRT1 | JCL | Defines TSS key ring and certificates
ZWEIKRT2 | JCL | Defines TSS key ring and certificates
ZWEIKRT3 | JCL | Defines TSS key ring and certificates
ZWEIMVS | JCL | Creates PARMLIB data set
ZWEIMVS1 | JCL | Creates plug-in data set (expected to be APF)
ZWEIMVS2 | JCL | Creates the load library (expected to be APF)
ZWEINSTL | JCL | Creates and copies basic installation data sets and members
ZWEIRAC  | JCL | Defines security permits for RACF
ZWEIRACZ | JCL | Creates the RACF Zowe resource class
ZWEISTC | JCL | Adds `PROCLIB` members
ZWEITSS | JCL | Defines security permits for TSS
ZWEITSSZ | JCL | Creates the TSS Zowe resource class
ZWEKRING | JCL | Defines key ring and certificates
ZWENOKRA | JCL | Removes key ring and certificates for ACF2
ZWENOKRR | JCL | Removes key ring and certificates for RACF
ZWENOKRT | JCL | Removes key ring and certificates for TSS
ZWENOKYR | JCL | Removes key ring and certificates
ZWENOSEC | JCL | Defines security permits
ZWERMVS | JCL | Removes PARMLIB data set
ZWERMVS1 | JCL | Removes plug-in data set
ZWERMVS2 | JCL | Removes load library
ZWERSTC | JCL | Removes `PROCLIB` members
ZWESASTC | JCL | Starts the Zowe Auxiliary server used by Cross memory server
ZWESECKG | JCL | Sample program which generates a secret key for the PKCS#11 token
ZWESECUR | JCL | Defines security permits for Zowe
ZWESIPRG | Commands | Console commands to APF authorize the cross memory server load library
ZWESIP00 | PARMLIB | Member for the cross memory server
ZWESISCH | PPT | Defines entries required by Cross memory server and its Auxiliary address spaces to run in Key(4) 
ZWESISTC | JCL | Starts the Zowe Cross memory server
ZWESLSTC | JCL | Starts the Zowe

The `SZWESAMP` data set contains additional members for SMP/E installation.
Member name | Type | Purpose
---|---|---
ZWE1SMPE | JCL | Allocates and primes a CSI, allocates data sets required by SMP/E and defines DDDEFs required by SMP/E
ZWE2RCVE | JCL | SMP/E RECEIVE
ZWE3ALOC | JCL | Allocates target and distribution libraries
ZWE4ZFS | JCL | Creates a z/OS UNIX file system, creates a z/OS UNIX mount point and mounts the file system
ZWE5MKD | JCL | Creates directories
ZWE6DDEF | JCL | Creates DDDEF entries
ZWE7APLY | JCL | SMP/E APPLY
ZWE8ACPT | JCL | SMP/E ACCEPT
ZWEMKDIR | REXX | Creates a mountpoint, optionally mounts a file system (read/write), and optionally creates subdirectories
ZWES0LST | JCL | Lists all SYSMODs for a given zone
ZWES1REJ | JCL | Removes a SYSMOD (PTF, APAR, USERMOD) from SMPPTS
ZWES2RCV | JCL | RECEIVE a service SYSMOD (PTF, APAR, USERMOD)
ZWES3APL | JCL | APPLY a service SYSMOD (PTF, APAR, USERMOD)
ZWES4ACP | JCL | ACCEPT a service SYSMOD (PTF, APAR, USERMOD)
ZWES5RST | JCL | RESTORE a service SYSMOD (PTF, APAR, USERMOD)

The `SZWEAUTH` data set is a load library containing the following members.

Member name | Purpose
---|---
ZWELNCH | The Zowe launcher that controls the startup, restart and shutdown of Zowe's address spaces
ZWESIS01 | Load module for the cross memory server
ZWESAUX  | Load module for the cross memory server's auxiliary address space
ZWESISDL | ZIS Dynamic Plug-in

The `SZWEEXEC` data set contains few utilities used by Zowe.

The `SZWELOAD` data set contains config manager for REXX.

## Custom data sets

The following data sets are designed to be used by a single Zowe instance. These are created during post-install setup, and include temporary content as well as data sets used for extensions of Zowe.

Library DDNAME | Member Type | zowe.yaml | Target Volume | Type | Org | RECFM | LRECL | No. of 3390 Trks | No. of DIR Blks
---|---|---|---|---|---|---|---|---|--
CUST.PARMLIB | PARM Library Members | `zowe.setup.dataset.parmlib` | ANY | U | PDSE | FB | 80 | 15 | 5
CUST.JCLLIB | JCL Members | `zowe.setup.dataset.jcllib` | ANY | U | PDSE | FB | 80 | 60 | 5
CUST.ZWESALL | APF load modules | `zowe.setup.dataset.authLoadlib` | ANY | U | PDSE | U | 0 | 30 | N/A
CUST.ZWESAPL | APF plug-ins load modules | `zowe.setup.dataset.authPluginLib` | ANY | U | PDSE | U | 0 | 30 | N/A

## Unix Runtime Directory

The unix directory listed in the Zowe YAML as `zowe.runtimeDirectory` is the read-only directory which holds most of Zowe's code. Its subdirectories and files are subject to change without notice, except the following files:

Name | Purpose
---|---
example-zowe.yaml | Example Zowe YAML for first-time installation
manifest.json | States the Zowe version and the versions of the components within that Zowe release
bin/zwe | The zwe command line utility

## Unix Instance Directories

The following directories are designed to be used by a single Zowe instance. These are created and populated when Zowe is running.

Name | YAML Property | Purpose
---|---|---
Log Directory | `zowe.logDirectory` | Contains log files for some components and extensions.
Workspace Directory | `zowe.workspaceDirectory` | Contains persistent configuration content for components and extensions.
Extension Directory | `zowe.extensionDirectory` | May contain extensions installed into Zowe.
