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

Zowe API ML components, like any other Java applications, uses various types of memory. Before starting to limit the system memory available to the Zowe API ML, it is necessary to consider resource consumption. 
The memory consumption depends on the use cases and network traffic.

The main type of memory used by Java applications is heap memory. The heap memory is defined by an initial size and a maximum. 
Each Zowe API ML service uses a default minimum of 32 MB and a maximum of 512 MB. When a service requires more memory, it allocates more memory in increments of the same size as the initial memory. When the system has limited resources, it is a good practice to set a fixed minimum and maximum, the memory is then allocated during startup, preventing the memory from exceeding the limit.

The following table shows the expected heap memory requirements for the core Zowe API ML services:

Component name | Memory usage
---|---
Gateway Service | 512MB
ZAAS | 128MB
Discovery Service | 128MB
API Catalog | 128MB
Caching Service | 256MB

Different types of memories are used by a service, especially native, threads, buffers, and JIT (just-in-time 
compilation). In general, there is an expectation that the total memory assumption should be 150% of the heap size. 
Anyway as was mentioned above it strictly depends on your use case (what data are transferred, how many users, what 
services are onboarded, etc.). Therefore it is reasonable to verify your environment. It means running the API ML 
without limit, warming up the system, and validating usage during the typical load. We also suggest adding some buffer 
to the maximum value.

The memory buffers are as default limited to the same size as heap memory. In the case of big network traffic, the JVM 
could allocate up to the same amount of heap memory. Anyway, the memory limit could be configured by argument 
`-XX:MaxDirectMemorySize=<value><k|K|m|M|g|G>`. Limit this memory could be set on the same value for all services. It 
could be done by defining the system environment `JAVA_OPTS`.

As default threads responsible for processing incoming requests are prepared particularly on start-up. As default, there
are 20 threads and others are created on demand (as default up to 200). When the system has limited address space (see 
usage of memlimit in the STC) we suggest using a threads pool with initiated all threads at the beginning. This behavior 
could be done by configuring properties `server.tomcat.threads.min-spare` (initial amount of threads) and 
`server.tomcat.threads.max` (the maximum amount of threads) to the same value.

The following example shows all the above-mentioned parameters:

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

It is recommended to set `REGION=0M` in the STC. (default) and not set a `MEMLIMIT`. This will prevent issues caused by insufficient memmory. 

When setting a memory limit, consider all running Zowe services, the typical workload and a buffer to the memory requirement.
