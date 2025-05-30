# Addressing storage requirements 

:::info Roles required: storage administrator, system programmer
:::

Ensure that you have sufficient storage depending on the installation method. Review the storage requirements according to your installation method as presented in this article. 

## Installing Zowe Server Runtime

Before installing Zowe, review the reference for [Zowe's server datasets](../appendix/server-datasets.md)

### Installing with SMP/E

Additionally, when installing Zowe with SMP/E, review the [DASD storage requirements](../user-guide/install-zowe-smpe-overview.md#dasd-storage-requirements).

## Memory requirements for API Mediation Layer

Zowe API ML components as other Java application uses a various type of memories. Before you start limiting memory
it is necessary to consider resource assumption. It depends also on you case and network traffic.

The main type of memory is heap memory. The head memory is defined by initial size of memory and the maximum. Each
service uses as defaul minimum 32MB and the maximum 512MB. When a service requires more memory it allocates more
by increase of same size as initial memory. When the system has limited resources it is a good practice to se minimal
same as the maximum. The memory is then allocated during the startup that ensure the memory cannot be exceeded by 
different type of memory.

Here you can see the expected heap memory requirements.

Component name | Memory usage
---|---
Gateway service | 256MB
ZAAS | 256MB
Discovery service | 256MB
API Catalog | 512MB
Caching service | 512MB

All service uses also different type of memories, especially native, threads, buffers, and JIT (just in time compilation).
In general there is an expectation that the total memory assumption should be more for 50% than heap size. Anyway as was 
mentioned above it strictly depends on your use case (what data are transferred, how many users, what services are 
onboarded, etc.). Therefor it is reasonable to verify your environment. It means run the API ML without limit, warn up 
the system, and validate usage during the typical load. We also suggest to add some buffer to the maximum value.

The buffers memory is as default limited to the same size as heap memory. It means it could allocate the same amount of
memory in the case of big network traffic. It could be configured by argument `-XX:MaxDirectMemorySize=<value><k|K|m|M|g|G>`.
There is possible to limit this memory for all service with the same configuration. It could be done by defining system
environment `JAVA_OPTS`.

As default threads responsible for processing incoming request are prepared just particular on start up. As default there
are 20 threads and other are created on demand (as default up to 200). When the system has limited address space we 
suggest to use thread pool with initiated all threads on the beginning. This behaviour could be done by configuring 
properties `server.tomcat.threads.min-spare` (initial amount of threads) and `server.tomcat.threads.max` (the maximum
amount of threads) to the same value.

Example how to define memory by suggestions above:

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
