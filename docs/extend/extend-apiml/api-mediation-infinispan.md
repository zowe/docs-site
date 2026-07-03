# Using Infinispan as a storage solution through the Caching service

:::info Required roles: system administrator, security administrator
:::

You can configure Infinispan as a storage solution through the Caching Service, as well as configure Infinispan for high availability (HA) to replicate data to provide data durability and availability.

## Understanding Infinispan

Infinispan is a storage solution that stores data structures in key-value pairs. The API Caching Service uses hash sets, wherein each service storing data via the Caching Service has its own hash, and each data entry is a key-value entry within that service's Infinispan hash set.

For more information on Infinispan, see the [official Infinispan documentation](https://infinispan.org/documentation/).

### Infinispan replica instances

Infinispan can be used with both a standalone instance and high availability mode. When using multiple Caching Service instances, 
it is necessary to specify all of the cluster nodes (members). Each Infinispan node is bound to a specific Caching Service instance and runs on a different port and host, which can be configured. For more information about configuring multiple Infinispan modes, see the [Infinispan configuration](#infinispan-configuration). 

For more information on Infinispan replication and how to configure a replica instance, see the [Infinispan Cross-site Replication](https://infinispan.org/docs/stable/titles/xsite/xsite.html) documentation.

## Infinispan configuration

Configure Infinispan as a storage solution through the Caching Service by setting the following configuration parameters in the `zowe.yaml`.
 
* **components.caching-service.storage.infinispan.initialHosts**  
Specifies the list of cluster nodes (members). Ensure that all the members listed are separated by a comma.
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
* **components.caching-service.storage.infinispan.jgroups.port**  
  (Optional) The port number is used by Infinispan to synchronise data among Caching Service instances.  
  **Default:** `7600`

  :::note
  We recommend you define this value to avoid potential problems or errors in future Zowe upgrades, for example
  from version 2.x through v3.1 to v3.2 and newer versions.
  :::

* **components.caching-service.storage.infinispan.jgroups.host**  
(Optional) The hostname used by Infinispan to synchronise data among Caching Service instances.  
**Default:** value is taken from Zowe hostname

  :::note
  We recommend you define this value to avoid potential problems or errors in future Zowe upgrades.
  :::

* **components.caching-service.storage.infinispan.jgroups.keyExchange.port**  
(Optional) The port number used by Infinispan to exchange the encryption key among Caching Service instances.  
**Default:** `7601`

  :::note
  We recommend you define this value to avoid potential problems or errors in future Zowe upgrades, for example
  from version 2.x through v3.1 to v3.2 and newer versions.
  :::

* **components.caching-service.storage.infinispan.useVirtualThreads**  
(Optional) Enables the Infinispan virtual threads feature (requires JDK 21 or later).  
**Default:** `false`

  :::warning Important Note for z/OS Deployments
Infinispan 16 enables virtual thread pools by default on JDK 21+. on z/OS, However, virtual threads cause thread pinning that stalls JGroups cluster communication, effectively freezing the Caching Service when running in High Availability (HA) mode. We recommend the enablement of this feature only on non-z/OS platforms.

Starting in Zowe v3.6, the Caching Service startup scripts automatically force-disable virtual threads on z/OS with Java 21+ to safeguard cluster stability. It is highly recommended to leave this property set to `false` on z/OS to prevent stalling due to thread pinning. 
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

  **Example of explicitly disabling virtual threads via API ML configuration:**

  ```yaml
  components:  
    apiml:   
      storage:
        mode: infinispan
        infinispan:
          useVirtualThreads: false   # default; explicitly disable virtual threads
  ```

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
          useVirtualThreads: false
  ```