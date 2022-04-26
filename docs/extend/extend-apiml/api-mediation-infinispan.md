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

Infinispan can be used with one standalone instance. For data durability, however, a Cross-Site Replication configuration is recommended.
Cross-site replication guarantees service continuity in the event of outages or disasters and presents client applications with a single point of access to data in globally distributed caches.

For more information on Infinispan replication and how to configure a replica instance, see the [official Infinispan Cross-site Replication documentation](https://infinispan.org/docs/stable/titles/xsite/xsite.html).

### Infinispan SSL/TLS

Infinispan supports SSL/TLS. For information on enabled SSL/TLS with Infinispan, see the [official Infinispan Security documentation](https://infinispan.org/docs/stable/titles/security/security.html#secure-cluster-transport).

### Infinispan and JGroups

Infinispan uses [JGroups](http://www.jgroups.org/) as its underlying clustering layer. In order to configure the finer details of clustering (discovery, flow control, cross-site, etc) you have to provide a separate XML file with the desired configuration and reference this XML file from your Infinispan XML file as follows:

For simple configurations this procedure is usually fine. However, configuring complex setups, such as cross-site replication, means juggling multiple files (one for the local stack, one for the cross-site stack, and one for the relay configuration).

## Infinispan configuration

Configure Infinispan as a storage solution through the Caching service by setting the following environment variables. Environment variables can be set by adding them to `instance.env`.
 
* **`CACHING_STORAGE_INFINISPAN_INITIALHOSTS`**

  Infinispan/Jgroups TCPPING property that specifies the list of cluster nodes (members). In case of multiple instances, the value for each Caching Service instance can be 
  either a list of all the members, separated by a comma, or just the replica. The format is `${JGROUPS_BIND_ADDRESS}[${JGROUPS_BIND_PORT}]`.

* **`CACHING_STORAGE_INFINISPAN_PERSISTENCE_DATALOCATION`**

  The path where the Soft-Index store will keep its data files for the Infinispan Soft-Index Cache Store. 
  In case of a standalone instance, the value can be set to `data`. For more information, see [Soft-Index File Store](https://infinispan.org/blog/2014/10/31/soft-index-file-store).

* **`JGROUPS_BIND_PORT`**

  The Jgroups port used by Infinispan.

* **`JGROUPS_BIND_ADDRESS`**

  The Jgroups address used by Infinispan.

  
