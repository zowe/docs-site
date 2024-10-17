# Using Infinispan as a storage solution through the Caching service

:::info Required roles: system administrator, security administrator
:::

You can configure Infinispan as a storage solution through the Caching service, as well as configure Infinispan for high availability to replicate data to provide data durability and availability.

- [Using Infinispan as a storage solution through the Caching service](#using-infinispan-as-a-storage-solution-through-the-caching-service)
  - [Understanding Infinispan](#understanding-infinispan)
    - [Infinispan replica instances](#infinispan-replica-instances)
  - [Infinispan configuration](#infinispan-configuration)

## Understanding Infinispan

Infinispan is a storage solution that stores data structures in key-value pairs. The API Caching service uses hash sets, where each
service storing data via the Caching service has its own hash, and each data entry is a key-value entry within that service's Infinispan hash set.

For more information on Infinispan, see the [official Infinispan documentation](https://infinispan.org/documentation/).

### Infinispan replica instances

Infinispan can be used with both a standalone instance and high availability mode. When using multiple Caching Service instances, 
it is necessary to specify all of the cluster nodes (members). Each Infinispan node is bound to a specific Caching Service instance and runs on a different port and host, which can be configured. For more information about configuring multiple Infinispan modes, see the [Infinispan configuration](#infinispan-configuration). 

For more information on Infinispan replication and how to configure a replica instance, see the [Infinispan Cross-site Replication](https://infinispan.org/docs/stable/titles/xsite/xsite.html) documentation.

## Infinispan configuration

Configure Infinispan as a storage solution through the Caching service by setting the following configuration parameters in the `zowe.yaml`.
 
* **`zowe.components.caching-service.storage.infinispan.initialHosts`**

  This property specifies the list of cluster nodes (members). In case of multiple instances, the value for each Caching Service instance can be 
  either a list of all the members, separated by a comma, or just the replica. The format is `${haInstance.hostname}[${zowe.components.caching-service.storage.infinispan.jgroups.port}]`.

* **`zowe.components.caching-service.storage.infinispan.persistence.dataLocation`**

  The path where the service keeps its data files for the Infinispan Soft-Index Cache Store. 
  The default value is `data`. If you run the Caching Service in HA and the instances use the same filesystem, you have to specify a different value of the data property for each instance. For more information, see the [Soft-Index File Store](https://infinispan.org/blog/2014/10/31/soft-index-file-store).


* **`zowe.components.caching-service.storage.infinispan.persistence.indexLocation`**

  The path where the service keeps its index data for the Infinispan Soft-Index Cache Store. 
  The default value is `index`. If you run the Caching Service in HA and the instances use the same filesystem, you have to specify a different value of the index property for each instance. For more information, see the [Soft-Index File Store](https://infinispan.org/blog/2014/10/31/soft-index-file-store).


* **`zowe.components.caching-service.storage.infinispan.jgroups.port`**

  (OPTIONAL)The default value is `7098`. The port number used by Infinispan to synchronise data among cahing-service instances.

* **`zowe.components.caching-service.storage.infinispan.jgroups.host`**

  (OPTIONAL)The default value is taken from zowe hostname. The hostname used by Infinispan to synchronise data among cahing-service instances. 


* **`zowe.components.caching-service.storage.infinispan.keyExchange.port`**

  (OPTIONAL)The default value is `7118`. The port number used by Infinispan to exchange encryption key among cahing-service instances.


  **Example of Caching service HA configuration using Infinispan:**

  ```yaml
  haInstances:
    lpar1:
      components:
        caching-service:
          storage:
            mode: infinispan
            infinispan: 
              initialHosts: lpar2[7098]
              persistence:
                dataLocation: /global/zowe/workspace/caching-service/data01
                indexLocation: /global/zowe/workspace/caching-service/index01
    lpar2:
      components:
        caching-service:
          storage:
            mode: infinispan
            infinispan: 
              initialHosts: lpar1[7098]
              persistence:
                dataLocation: /global/zowe/workspace/caching-service/data02
                indexLocation: /global/zowe/workspace/caching-service/index02
  ```