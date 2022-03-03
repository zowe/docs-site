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

Configure VSAM as a storage solution through the Caching service by modifying the following configuration parameters in the service `application.yml`.

* **`caching.storage.vsam.name`**

  The ZFile filename. The ZFile is a wrapper around a z/OS file based on the supplied name and options. This method calls the fopen() and fldata() C-library routines. The ZFile filename should follow the specific naming convention `//'DATASET.NAME'`.                                                  

* **`caching.storage.vsam.keyLength`**

  The VsamKey length. The default value is 32 bytes.

* **`caching.storage.vsam.recordLength`**

  The record length. The default value is 512 bytes.

* **`caching.storage.vsam.encoding`**

  The character encoding. The default value is IBM-1047.

### VSAM performance

Due to the Java access to the VSAM, there are performance limitation to this approach. VSAM solution has been tested in a few scenarios.

Test process:
1) Load 1000 records into cache concurrently (5 threads)
2) Update all records for 120 seconds with increasing thread count, up to `<x>` amount of threads
3) Read all records for 120 seconds with increasing thread count, up to `<x>` amount of threads
4) Read and update all records for 120 seconds with increasing thread count, up to `<x>` amount of threads
5) Delete all loaded records from cache concurrently (5 threads)

Tests are run with 3 scenarios:
- Low load: 5 threads 
- Medium load: 15 threads
- High load: 50 threads

Test subjects:
- Single Caching Service with VSAM storage
- Two Caching Services with shared VSAM storage

Results:
- The most important operation is READ.
- Two Caching Services achieve better READ performance than a single Caching Service.
- Based on data, the READ performance seems acceptable, ranging from 300 ms to 1000 ms.
- With two Caching Services and high load, the READ performance is significantly better.
- Response times of other operations are also acceptable, yet error rates increase with higher concurrency.
- Two Caching Services produce higher load on shared resource (VSAM) and have higher error rate.
- It seems to us that for user-based workloads, the VSAM implementation will suffice. For light automation workloads it might be acceptable as well. For heavy workloads it might not be enough.
- VSAM does not scale very well beyond 1000 RPM on a node.


