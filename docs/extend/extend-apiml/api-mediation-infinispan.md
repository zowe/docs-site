# Using Infinispan as a storage solution through the Caching service

As an API developer, you can configure Infinispan as a storage solution through the Caching service. This article describes how to configure your storage solution for Infinispan.
You can configure Infinispan for high availability as well as to replicate data to provide data durability and availability.

- [Understanding Infinispan](#understanding-infinispan)
- [Infinispan configuration](#infinispan-configuration)

## Understanding Infinispan

Infinispan is a storage solution that stores data structures in key-value pairs. The API Caching service uses hash sets, where each
service storing data via the Caching service has its own hash, and each data entry is a key-value entry within that service's Infinispan hash set.

For more information on Infinispan, see the [official Infinispan documentation](https://infinispan.org/documentation/).

### Infinispan replica instances

Infinispan can be used with both on standalone instance and High Availability mode. In case of multiple Caching Service instances, 
you will have to specify all the cluster nodes (members). Each Infinispan node is bound to specific Caching Service instance and runs on a different port and host, which can be configured. See the [nfinispan configuration](#infinispan-configuration) to know how to configure multiple Infinispan nodes.

For more information on Infinispan replication and how to configure a replica instance, see the [official Infinispan Cross-site Replication documentation](https://infinispan.org/docs/stable/titles/xsite/xsite.html).

## Infinispan configuration

Configure Infinispan as a storage solution through the Caching service by setting the following environment variables. Environment variables can be set by adding them to `instance.env`.
 
* **`CACHING_STORAGE_INFINISPAN_INITIALHOSTS`**

  This property specifies the list of cluster nodes (members). In case of multiple instances, the value for each Caching Service instance can be 
  either a list of all the members, separated by a comma, or just the replica. The format is `${JGROUPS_BIND_ADDRESS}[${JGROUPS_BIND_PORT}]`.

  **Example:**
  `CACHING_STORAGE_INFINISPAN_INITIALHOST=caching-service[7600]`


* **`CACHING_STORAGE_INFINISPAN_PERSISTENCE_DATALOCATION`**

  The path where the Soft-Index store will keep its data files for the Infinispan Soft-Index Cache Store. 
  The default value is `data`. If you run the Caching Service in HA and the instances use the same filesystem,
  you have to specify a different value of the `CACHING_STORAGE_INFINISPAN_PERSISTENCE_DATALOCATION` property for each
  instance. For more information, see [Soft-Index File Store](https://infinispan.org/blog/2014/10/31/soft-index-file-store).


* **`JGROUPS_BIND_PORT`**

  The Jgroups port used by Infinispan.


* **`JGROUPS_BIND_ADDRESS`**

  The Jgroups address used by Infinispan.

  
