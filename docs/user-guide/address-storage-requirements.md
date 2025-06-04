# Addressing storage requirements 

:::info Roles required: storage administrator, system programmer
:::

Ensure that you have sufficient storage depending on the installation method. Review the storage requirements according 
to your installation method as presented in this article. 

## Installing Zowe Server Runtime

Before installing Zowe, review the reference for [Zowe's server datasets](../appendix/server-datasets.md)

### Installing with SMP/E

Additionally, when installing Zowe with SMP/E, review the [DASD storage requirements](../user-guide/install-zowe-smpe-overview.md#dasd-storage-requirements).

## Memory requirements for API Mediation Layer

Before placing limits on available system memory to Zowe API ML, it is necessary to consider resource consumption. 
The memory consumption depends on specific use cases and network traffic.

The main type of memory used by Java applications, including Zowe API ML components, is heap memory. Heap memory is defined by the initial and maximum memory requirements in MB. 
Each Zowe API ML service uses a default minimum of 32 MB and a maximum of 512 MB. When a service requires more memory, the service allocates additional memory in increments of the same size as the initial memory. When the system has limited resources, it is a good practice to set a fixed minimum and maximum. The memory is then allocated during startup, preventing the memory from exceeding the limit.

The following table shows the expected heap memory requirements for core Zowe API ML services:

Component name | Memory usage
---|---
Gateway Service | 512MB
ZAAS | 128MB
Discovery Service | 128MB
API Catalog | 128MB
Caching Service | 256MB

### JVM Memory

Different memory types are used by JVM services: native, threads, direct memory buffers, and JIT (just-in-time compilation). 

Direct memory buffers are limited to the same size as heap memory. By default, in the case of large network traffic, the JVM can allocate up to the same memory allocation as applied to heap memory.

Similarly, threads responsible for processing incoming requests are prepared during JVM start-up. By default, 20 threads are available to process incoming requests. Additional threads can be created on demand (up to 200 threads by default). When the system has limited address space, it is recommended to use fixed-size thread pools, initializing all threads at the beginning.

As a general rule, total memory consumption should be 150% of the heap size. 

### Customizing memory limits in Zowe API Mediation Layer

Setting memory limits strictly depends on the use case, such as the kind and size of data that is typically transferred, how many users can be active simultaneously, and how many and what kind of services are onboarded. 

If limits need to be set, it is recommended to verify your environment with the following procedure:
1. Run the API ML without a memory limit.
2. Start the services you wish to start and wait approximately an hour or until you have the expected level of traffic to the service.
3. Assess the memory usage during a typical workload.

#### Setting a direct memory buffer limit

To set a direct memory buffer limit, set the following property:
  `zowe.environments.JAVA_OPTS`: `-XX:MaxDirectMemorySize=<value><k|K|m|M|g|G>`

* **`<value><k|K|m|M|g|G>`**  
Specifies the limit size and unit.  
**Example:** `64M` is a 64 Megabyte limit.

#### Establishing a fixed thread pool

To establish a fixed thread pool, set the following properties to the same value:
* **`zowe.environments.SERVER_TOMCAT_THREADS_MIN_SPARE`**  
The initial number of threads  
**Default:** 20 threads to process incoming requests. 
* **`zowe.environments.SERVER_TOMCAT_THREADS_MAX`**  
The maximum number of threads  
**Default:** Up to 200 threads

**Note:** Updating these environment values impacts all Java-based services running as part of the Zowe Server.

The following example shows the configuration of all applicable parameters:

**Example:**

```yaml

zowe:
  environments:
    SERVER_TOMCAT_THREADS_MIN_SPARE: 100
    SERVER_TOMCAT_THREADS_MAX: 100
    JAVA_OPTS: "-XX:MaxDirectMemorySize=64M"

components:
  gateway:
    enabled: true
    heap:
      init: 256
      max: 256
  discovery:
    enabled: true
    heap:
      init: 256
      max: 256
  api-catalog:
    heap:
      init: 512
      max: 512
  caching-service:
    heap:
      init: 512
      max: 512
  zaas:
    heap:
      init: 256
      max: 256
```

:::tip
It is recommended to set `REGION=0M` in the STC. This is the default setting. Setting a `MEMLIMIT` is not recommended as doing so prevents issues caused by insufficient memory. 

For more details about specifying the region size, see the following links:  
* [Specifying Region Size](https://www.ibm.com/docs/en/zos/3.1.0?topic=limit-specifying-region-size) in the IBM documenation
* [Address space region size](../user-guide/configure-uss.md#address-space-region-size) in Zowe Docs
* [Resources](../user-guide/install-zowe-pswi-deployment.md#resources) in the article _Installing Product Software Using z/OSMF Deployments_ in Zowe Docs

When setting a memory limit, consider all running Zowe services, the typical workload, and a buffer to the memory requirement.
:::
