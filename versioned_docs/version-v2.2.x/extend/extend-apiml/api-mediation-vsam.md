# Using VSAM as a storage solution through the Caching service

As an API developer, you can configure VSAM as a storage solution through the Caching service. The procedure in this article
describes how to configure your storage solution for VSAM. Configuring VSAM ensures that you do not lose data if you need to restart. Configuring VSAM also makes it possible to leverage multiple caching services concurrently, whereby clients can retreive data through VSAM.

- [Understanding VSAM](#understanding-vsam)
- [VSAM configuration](#vsam-configuration)
- [VSAM performance](#vsam-performance)
## Understanding VSAM

`Virtual Storage Access Method (VSAM)` is both a data set type, and a method for accessing various user data types.
Using VSAM as an access method makes it possible to maintain disk records in a unique format that is not understandable by other access methods.
VSAM is used primarily for applications, and is not used for source programs, JCL, or executable modules. ISPF cannot be used to display or edit VSAM files. VSAM can be used to organize records into four types of data sets: key-sequenced, entry-sequenced, linear, or relative record. The
API Caching service supports VSAM as a storage method to cache APIs, and uses the `Key Sequence Data Set (KSDS)` dataset. Each record has one or more key fields, and a record can be retrieved (or inserted) by the key value, thereby providing random access to data. Records are of variable length. IMS™ uses KDSDs.

For more information about VSAM, see the [IBM documentation](https://www.ibm.com/support/knowledgecenter/zosbasics/com.ibm.zos.zconcepts/zconcepts_169.htm).

### VSAM configuration

Configure VSAM as a storage solution through the Caching service by modifying the following configuration parameters in `zowe.components.caching-service` in `zowe.yaml`.

* **`storage.vsam.name`**

  The ZFile filename. The ZFile is a wrapper around a z/OS file based on the supplied name and options. This method calls the fopen() and fldata() C-library routines. The ZFile filename should follow the specific naming convention `//'DATASET.NAME'`.                                                  

* **`storage.vsam.keyLength`**

  The VsamKey length. The default value is 128 bytes.

* **`storage.vsam.recordLength`**

  The record length. The default value is 4096 bytes.

* **`storage.vsam.encoding`**

  The character encoding. The default value is IBM-1047.

### VSAM performance

Accessing VSAM via java results in a performance limitation. The VSAM solution has been tested in a few scenarios.

The following sequence describes the test process: 
1. Load 1000 records into the cache concurrently (5 threads).
2. Update all records for 120 seconds with increasing the thread count, up to `<x>` amount of threads.
3. Read all records for 120 seconds with increasing the thread count, up to `<x>` amount of threads.
4. Read and update all records for 120 seconds with increasing the thread count, up to `<x>` amount of threads.
5. Delete all loaded records from the cache concurrently (5 threads).

Tests were run with 3 scenarios:
- Low load: 5 threads 
- Medium load: 15 threads
- High load: 50 threads

Test subjects:
- Single Caching Service with VSAM storage
- Two Caching Services with shared VSAM storage

Results:
- The most important operation is `READ`.
- Two Caching Services achieve better `READ` performance than a single Caching Service.
- Based on data from the testing results, the `READ` performance appears to be acceptable, ranging from 300 ms to 1000 ms.
- With two Caching Services and a high load, `READ` performance significantly increased.
- Response times of other operations are also acceptable, yet error rates increase with higher concurrency.
- Two Caching Services produce higher load on shared resource (VSAM) and have higher error rate.
- VSAM implemetation appears to be sufficient for user-based workloads. For light automation workloads VSAM implementation appears to be acceptable as well. For heavy workloads this implementatin may not be sufficient. 
- VSAM does not scale well beyond 1000 RPM on a node.


