## VSAM 
The term `Virtual Storage Access Method (VSAM)` applies to both a data set type and the access method used to manage various user data types.

As an access method, VSAM provides much more complex functions than other disk access methods. VSAM keeps disk records in a unique format that is not understandable by other access methods.

VSAM is used primarily for applications. It is not used for source programs, JCL, or executable modules. VSAM files cannot be routinely displayed or edited with ISPF.

You can use VSAM to organize records into four types of data sets: key-sequenced, entry-sequenced, linear, or relative record. The primary difference among these types of data sets is the way their records are stored and accessed.

API Caching service supports VSAM as a storage method to cache the APIs and is using the `Key Sequence Data Set (KSDS)` dataset. This type is the most common use for VSAM.
Each record has one or more key fields and a record can be retrieved (or inserted) by key value. 
This provides random access to data. Records are of variable length. IMS™ uses KDSDs.

More information about VSAM can be found in the [IBM documentation](https://www.ibm.com/support/knowledgecenter/zosbasics/com.ibm.zos.zconcepts/zconcepts_169.htm).

### VSAM configuration

* `caching.storage.vsam.name`: the ZFile filename. The ZFile is a wrapper around a z/OS file based on the supplied name and options. This method calls the fopen() and fldata() C-library routines. The ZFile filename should follow the specific naming convention `//'DATASET.NAME'`.                                                  
* `caching.storage.vsam.keyLength`: The VsamKey length. The default value is 32 bytes.
* `caching.storage.vsam.recordLength`: The record length. The default value is 512 bytes.
* `caching.storage.vsam.encoding`: The character encoding. The default value is IBM-1047.



