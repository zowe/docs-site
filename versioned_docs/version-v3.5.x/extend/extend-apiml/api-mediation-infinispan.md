# Using Infinispan as a storage solution through the Caching service

:::info Required roles: system administrator, security administrator
:::

You can configure Infinispan as a storage solution through the Caching Service, as well as configure Infinispan for high availability (HA) to replicate data to provide data durability and availability.

- [Using Infinispan as a storage solution through the Caching service](#using-infinispan-as-a-storage-solution-through-the-caching-service)
  - [Understanding Infinispan](#understanding-infinispan)
    - [Infinispan replica instances](#infinispan-replica-instances)
  - [Infinispan configuration](#infinispan-configuration)

## Understanding Infinispan

Infinispan is a storage solution that stores data structures in key-value pairs. The API Caching Service uses hash sets, where each
service storing data via the Caching Service has its own hash, and each data entry is a key-value entry within that service's Infinispan hash set.

For more information on Infinispan, see the [official Infinispan documentation](https://infinispan.org/documentation/).

### Infinispan replica instances

Infinispan can be used with both a standalone instance and high availability mode. When using multiple Caching Service instances, 
it is necessary to specify all of the cluster nodes (members). Each Infinispan node is bound to a specific Caching Service instance and runs on a different port and host, which can be configured. For more information about configuring multiple Infinispan modes, see the [Infinispan configuration](#infinispan-configuration). 

For more information on Infinispan replication and how to configure a replica instance, see the [Infinispan Cross-site Replication](https://infinispan.org/docs/stable/titles/xsite/xsite.html) documentation.

## Infinispan configuration

Configure Infinispan as a storage solution through the Caching Service by setting the following configuration parameters in the `zowe.yaml`.
 
* **`components.caching-service.storage.infinispan.initialHosts`**

  This property specifies the list of cluster nodes (members). Ensure that all the members listed are separated by a comma.
  The format is `${haInstance.hostname}[${components.caching-service.storage.infinispan.jgroups.port}]`.

  **Example:**

  ```yaml
    components:
      caching-service:
        storage:
          mode: infinispan
          infinispan:
            initialHosts: lpar1[7600],lpar2[7600],lpar3[7600]
  ```

* **`components.caching-service.storage.infinispan.jgroups.port`**

  (Optional) The default value is `7600`. The port number used by Infinispan to synchronise data among Caching Service instances.

  :::note
  We recommend you define this value to avoid potential problems or errors in future Zowe upgrades.
  :::

* **`components.caching-service.storage.infinispan.jgroups.host`**

  (Optional) The default value is taken from zowe hostname. The hostname used by Infinispan to synchronise data among Caching Service instances. 

  :::note
  We recommend you define this value to avoid potential problems or errors in future Zowe upgrades.
  :::

* **`components.caching-service.storage.infinispan.jgroup.keyExchange.port`**

  (Optional) The default value is `7601`. The port number used by Infinispan to exchange encryption key among Caching Service instances.


* **`components.caching-service.storage.infinispan.jgroups.port`**
  
  (Optional) The default value is `7600`. The port number is used by Infinispan to synchronise data among Caching Service instances.

  :::note
  We recommend you define this value to avoid potential problems or errors in future Zowe upgrades, for example
  from version 2.x through v3.1 to v3.2 and newer versions.
  :::

* **`components.caching-service.storage.infinispan.jgroups.host`**

  (Optional) The default value is taken from zowe hostname. The hostname used by Infinispan to synchronise data among Caching Service instances. 


* **`components.caching-service.storage.infinispan.jgroups.keyExchange.port`**

  (Optional) The default value is taken from zowe hostname. The hostname used by Infinispan to synchronise data among Caching Service instances.

* **components.caching-service.storage.infinispan.jgroups.keyExchange.port**

  (Optional) The default value is `7601`. The port number is used by Infinispan to exchange encryption key among Caching Service instances.

  :::note
  We recommend you define this value to avoid potential problems or errors in future Zowe upgrades, for example
  from version 2.x through v3.1 to v3.2 and newer versions.
  :::

  **Example of Caching Service HA configuration using Infinispan:**

  ```yaml
  components:
    caching-service:
      storage:
        mode: infinispan
        infinispan: 
          initialHosts: lpar1[7600],lpar2[7600]
          jgroups:
            port: 7600
            keyExchange:
              port: 7601
 ```
