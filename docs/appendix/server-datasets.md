# Server Datasets Reference

Zowe includes a number of files that are stored in the various data sets. See the following tables for the storage requirements and purposes.

## Runtime Datasets

The following datasets comprise the runtime, read-only dataset content that can be used by multiple Zowe instances of the same version. These are either delivered by an [SMP/E install](../user-guide/install-zowe-smpe.md), or by running `zwe install` when using [the z/OS convenience build of the Zowe servers](../user-guide/install-zowe-zos-convenience-build.md).

Library DDNAME | Member Type | Target Volume | Type | Org | RECFM | LRECL | No. of 3390 Trks | No. of DIR Blks
---|---|---|---|---|---|---|---|---
SZWESAMP | Samples | ANY | U | PDSE | FB | 80 | 15 | 5
SZWEAUTH | Zowe APF Load Modules | ANY | U | PDSE | U | 0 | 15 | N/A
SZWEEXEC | CLIST copy utilities | ANY | U | PDSE | FB | 80 | 15 | 5
SZWELOAD | Executable utilities library | ANY | U | PDSE | U | 0 | 15 | N/A

The `SZWESAMP` data set contains the following members.

Member name | Type | Purpose
---|---|---
ZWECSRVS | JCL | Removes the VSAM data set for the Caching Service
ZWECSVSM | JCL | Creates the VSAM data set for the Caching Service
ZWEGENER | JCL | Generates JCL templates to configure Zowe
ZWEIACF | JCL | Defines security permits for ACF2
ZWEIACFZ | JCL | Creates the ACF2 Zowe resource class
ZWEIAPF | JCL | Set APF for the required datasets
ZWEIAPF2| JCL | Set APF for the required datasets
ZWEIKRA1 | JCL | Defines ACF2 key ring and certificates
ZWEIKRA2 | JCL | Defines ACF2 key ring and certificates
ZWEIKRA3 | JCL | Defines ACF2 key ring and certificates
ZWEIKRR1 | JCL | Defines RACF key ring and certificates
ZWEIKRR2 | JCL | Defines RACF key ring and certificates
ZWEIKRR3 | JCL | Defines RACF key ring and certificates
ZWEIKRT1 | JCL | Defines TSS key ring and certificates
ZWEIKRT2 | JCL | Defines TSS key ring and certificates
ZWEIKRT3 | JCL | Defines TSS key ring and certificates
ZWEIMVS | JCL | Creates datasets used by a Zowe instance
ZWEIMVS2 | JCL | Creates the load library (expected to be APF)
ZWEINSTL | JCL | Creates and copies basic installation datasets and members
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
ZWERMVS | JCL | Removes datasets used by a Zowe instance
ZWERMVS2 | JCL | Removes the APF load library
ZWERSTC | JCL | Removes `PROCLIB` members
ZWESASTC | JCL | Starts the Zowe Auxiliary server used by Cross memory server
ZWESECKG | JCL | Sample program which generates a secret key for the PKCS#11 token
ZWESECUR | JCL | Defines security permits for Zowe
ZWESIPRG | Commands | Console commands to APF authorize the cross memory server load library
ZWESIP00 | PARMLIB | Member for the cross memory server
ZWESISCH | PPT | Defines entries required by Cross memory server and its Auxiliary address spaces to run in Key(4) 
ZWESISTC | JCL | Starts the Zowe Cross memory server
ZWESLSTC | JCL | Starts the Zowe

The `SZWEAUTH` data set is a load library containing the following members.

Member name | Purpose
---|---
ZWELNCH | The Zowe launcher that controls the startup, restart and shutdown of Zowe's address spaces
ZWESIS01 | Load module for the cross memory server
ZWESAUX  | Load module for the cross memory server's auxiliary address space
ZWESISDL | ZIS Dynamic Plug-in

The `SZWEEXEC` data set contains few utilities used by Zowe.

The `SZWELOAD` data set contains config manager for REXX.

## Custom Datasets

The following datasets are designed to be used by a single Zowe instance. These are created during post-install setup, and include temporary content as well as datasets used for extensions of Zowe.

Library DDNAME | Member Type | zowe.yaml | Target Volume | Type | Org | RECFM | LRECL | No. of 3390 Trks | No. of DIR Blks
---|---|---|---|---|---|---|---|---|--
CUST.PARMLIB | PARM Library Members | zowe.setup.dataset.parmlib | ANY | U | PDSE | FB | 80 | 15 | 5
CUST.JCLLIB | JCL Members | zowe.setup.dataset.jcllib | ANY | U | PDSE | FB | 80 | 15 | 5
CUST.ZWESAPL | CLIST copy utilities | zowe.setup.dataset.authPluginLib | ANY | U | PDSE | U | 0 | 15 | N/A
