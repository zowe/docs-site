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

Zowe API ML components as other Java application uses a various type of memories. Before you start limiting memory
it is necessary to consider resource assumption. It depends also on your case and network traffic.

The main type of memory is heap memory. The heap memory is defined by the initial size of the memory and the maximum. 
Each service uses a default minimum of 32 MB and a maximum of 512 MB. When a service requires more memory it allocates 
more by increasing the same size as the initial memory. When the system has limited resources it is a good practice to 
set the minimum same as the maximum. The memory is then allocated during the startup which ensures the memory cannot 
be exceeded by different kinds of memory.

Here you can see the expected heap memory requirements.

Component name | Memory usage
---|---
Gateway service | 256MB
ZAAS | 256MB
Discovery service | 256MB
API Catalog | 512MB
Caching service | 512MB

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

Example of how to define memory by the suggestions above:

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

Our suggestion is not to limit memory using MEMLIMIT and REGION argument in the STC. It would avoid any issue with 
not having enough memory. If you want to set a limit please consider all running Zowe services, and summarize their 
memory requirements with some buffer.
