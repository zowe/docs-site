# Using VSAM as a storage solution through the Caching service

As an API developer, you can configure VSAM as a storage solution through the Caching service. The procedure in this article
describes how to configure your storage solution for VSAM. Configuring VSAM ensures that you do not lose data if you need to restart. Configuring VSAM also makes it possible to leverage multiple caching services concurrently, whereby clients can retreive data through VSAM.

- [Understanding VSAM](#understanding-vsam)
- [VSAM configuration](#vsam-configuration)
## Understanding VSAM

`Virtual Storage Access Method (VSAM)` is both a data set type, and a method for accessing various user data types.
Using VSAM as an access method makes it possible to maintain disk records in a unique format that is not understandable by other access methods.
VSAM is used primarily for applications, and is not used for source programs, JCL, or executable modules. ISPF cannot be used to display or edit VSAM files. VSAM can be used to organize records into four types of data sets: key-sequenced, entry-sequenced, linear, or relative record. The
API Caching service supports VSAM as a storage method to cache APIs, and uses the `Key Sequence Data Set (KSDS)` dataset. Each record has one or more key fields, and a record can be retrieved (or inserted) by the key value, thereby providing random access to data. Records are of variable length. IMS™ uses KDSDs.

For more information about VSAM, see the [IBM documentation](https://www.ibm.com/support/knowledgecenter/zosbasics/com.ibm.zos.zconcepts/zconcepts_169.htm).

### VSAM configuration

Configure VSAM as a storage solution through the Caching service by modifying or adding the following configuration parameters in `instance.env`.

* **`CACHING_STORAGE_VSAM_NAME`**

  The ZFile filename. The ZFile is a wrapper around a z/OS file based on the supplied name and options. This method calls the fopen() and fldata() C-library routines. The ZFile filename should follow the specific naming convention `//'DATASET.NAME'`.                                                  

* **`CACHING_STORAGE_VSAM_KEYLENGTH`**

  The VsamKey length. The default value is 128 bytes.

* **`CACHING_STORAGE_VSAM_RECORDLENGTH`**

  The record length. The default value is 4096 bytes.

* **`CACHING_STORAGE_VSAM_ENCODING`**

  The character encoding. The default value is IBM-1047.



