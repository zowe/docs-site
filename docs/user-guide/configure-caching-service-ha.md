# Configuring the Caching Service for high availability

## Why the Caching Service is needed for HA

In a high availability (HA) setup, multiple Zowe API Mediation Gateway instances run concurrently, either on the same LPAR or across different LPARs connected through sysplex distributor. These Gateway instances are stateless, meaning they do not retain session information locally. The client authentication state (such as JWT, Personal Access Tokens, and other session data) must be shared across all Gateway instances so that authentication performed on one Gateway is recognized by another after a failover.

The Caching Service provides this shared state layer. It centralizes session data so that any Gateway instance can verify and serve authenticated requests, regardless of which Gateway initially handled the login. Without the Caching Service, each Gateway instance would have its own isolated state, causing authentication failures when traffic is routed to a different Gateway instance.

The following table summarizes the differences between a standalone (single-instance) setup and a high availability (HA) setup:

| Scenario | Authentication | Failover behavior | Load balancing |
|---|---|---|---|
| **Standalone (single instance)** | Local state only — the single Gateway stores session data internally. The Caching Service is optional and not needed for authentication persistence. | No failover — if the Gateway becomes unavailable, all in-flight sessions are lost. | Not applicable — only one Gateway instance handles all traffic. |
| **High availability (HA)** | Centralized state — multiple Gateway instances share authentication state through the Caching Service. A session established on one Gateway works on all others. | Seamless failover — if one Gateway instance becomes unavailable, another instance can still serve authenticated requests using the shared state in the Caching Service. | Traffic is distributed across multiple Gateway instances via a sysplex distributor or a similar load balancer, improving throughput and resource utilization. |

Use Zowe in a high availability (HA) configuration where multiple instances of the Zowe launcher are started. These instances can be either on the same LPAR, or different LPARs connected through a sysplex distributor. If you are only running a single Zowe instance on a single LPAR, you do not need to create a Caching Service.   

In an HA setup, the different Zowe API Mediation Gateway servers share the same northbound port (by default `7554`). Client traffic to this port is distributed between separate Gateways that, in turn, dispatch their work to different services. When any of the services individually become unavailable, the work can be routed to available services, thereby completing the initial northbound request.  

## Caching Service storage methods

Zowe uses the Caching Service to centralize the state data persistent in high availability (HA) mode. Three storage methods are supported if you are running the Caching Service on z/OS:

* **Infinispan**
* **inMemory**
* **VSAM** 

:::note
If you are running the Caching Service off platform, such as a Linux or Windows container image, it is also possible to specify `redis` as your storage method.  
:::

For more information about how the Caching Service can be used, see [Using the Caching Service](../user-guide/api-mediation/api-mediation-caching-service.md).

:::caution Important  
To enable Personal Access Token support when using the Caching Service, **Infinispan is the required storage solution**. _Infinispan_ is part of Zowe installation. No additional software or installation is required when using this storage solution. _Infinispan_ is the recommended storage method to use in production.
:::

### Infinispan

  :::note
  _Infinispan_ is the recommended solution for on-prem z/OS production deployments.
  :::

  _Infinispan_ is designed to be run mainly on z/OS as this storage method offers high performance. To enable this method, set the value of `components.caching-service.storage.mode` to `infinispan` in the `zowe.yaml` configuration file.

  _Infinispan_ environment variables are not currently following the v2 naming convention, so these variables must be defined in the `zowe.environments` section. For more information about these properties and their values, see [Infinispan configuration](../extend/extend-apiml/api-mediation-infinispan.md#infinispan-configuration).

  ``` yaml
  components:
    caching-service:
      storage:
        mode: infinispan
        infinispan: 
          initialHosts: localhost[7600]
          jgroups:
            port: 7600
            keyExchange:
              port:7601
  ```


### inMemory

   _inMemory_ is the storage method designed for quick start of a service and should be used only in a single instance scenario, during development, or test purpose. Do not use _inMemory_ in production or high availability scenario.
  
   To use this method, set the `components.caching-service.storage.mode` value to `inMemory` in the `zowe.yaml` configuration file. When this method is enabled, the Caching Service does not persist any data.  

   ``` yaml
    components:
      caching-service:
        enabled: true
        port: 7555
          storage:
            evictionStrategy: reject
            mode: inMemory
            size: 10000
   ```
   
   In single-service mode (when the Caching Service is deployed as an embedded component alongside the Gateway rather than as a standalone service), the configured port **7555** is ignored. Instead, the Gateway communicates with the Caching Service using an internal single-service port.


### VSAM (Deprecated)

  :::note
  _VSAM_ support in the Caching Service will be removed in a future release.
  :::

  The _VSAM_ storage method allows you to use the VSAM dataset as storage for the Caching service. You can use `zwe init vsam` command to generate a proper dataset.

  The command `zwe init vsam` uses the template JCL in `SZWESAMP(ZWECSVSM)`.  One option is to edit and submit the JCL job that defines and allocates the VSAM dataset yourself. Alternatively, you can apply `zwe init vsam` which copies the source template member from `zowe.setup.mvs.hlq.SZWESAMP(ZWECVCSM)` and creates a target JCL member in `zowe.setup.mvs.jcllib(ZWECVSCM)` with values extracted from the `zowe.yaml` file.  
  
  ```yaml
  zowe:
    setup:
      mvs:
        hlq: IBMUSER.ZWE
        jcllib: IBMUSER.ZWE.CUST.JCLLIB
      vsam:
        mode: NONRLS
        volume: VOL123
        storageClass:
  components:
    caching-service:
      storage:
        mode: VSAM
        vsam:
          name: IBMUSER.ZWE.CUST.CACHE
  ```

  - **components.caching-service.storage.vsam.name**  
  Specifies the data set name that the `ZWECSVSM` JCL creates, and is used to replace all occurrences of `#dsname` in the `ZWECSVSM` data set.

    :::note
    The `ZWECSVSM` JCL defines the key length and record length of the VSAM instance. If the key length and record length of this JCL is changed,
    `zowe.environments.CACHING_STORAGE_VSAM_KEYLENGTH` and `zowe.environments.CACHING_STORAGE_VSAM_RECORDLENGTH` must be set to the new values.
    :::

  - **components.caching-service.storage.mode**  
  Specifies the access mode for the VSAM data set — either [`Record Level Sharing (RLS)`](https://www.ibm.com/support/pages/vsam-record-level-sharing-rls-overview)
 or `NONRLS`. Use `RLS` for Sysplex environments where concurrent access is required; otherwise, NONRLS is also supported.

  - **zowe.setup.vsam.storageClass**  
  If you use the `RLS` mode, a storage class is required.

  - **zowe.setup.vsam.volume**  
  If you set to use the `NONRLS` mode, a storage volume is required.

  To preview the member before submitting it, use the value `--security-dry-run`.  Otherwise, the command automatically submits the JCL and waits for completion.

  ```plaintext
  >zwe init vsam -c ./zowe.yaml
  -------------------------------------------------------------------------------
  >> Create VSAM storage for Zowe Caching Service
  Modify ZWECSVSM
  - IBMUSER.ZWE.CUST.JCLLIB(ZWECSVSM) is prepared
  Submit USER.ZWEV2.CUST.JCLLIB(ZWECSVSM)
  - Job ZWECSVSM(JOB05407) ends with code 0 (COMPLETED).
  >> Zowe Caching Service VSAM storage is created successfully.
  >
  ```

### Redis

 _Redis_ is not available if you are running the API Mediation Layer on z/OS under Unix System Services.  _Redis_ is intended for when API ML is running off platform, such as in a Linux or Windows container as part of a hybrid cloud deployment.

To enable this method, set the value of `components.caching-service.storage.mode` to `redis` in the `zowe.yaml` configuration file.  
   
A range of values which control the redis nodes, sentinel and ssl properties also need to be set in the `zowe.yaml` file.  For more information on these properties and their values, see [Redis configuration](../extend/extend-apiml/api-mediation-redis.md#redis-configuration).  

```yaml
    components:
      caching-service:
        enabled: true
        port: 7555
        storage:
          size: 10000
          evictionStrategy: reject
          mode: redis
          redis:
            masterNodeUri: 
            timeout: 60
          sentinel:
            masterInstance
            nodes
          ssl:
            enabled: true
            keystore:
            keystorePassword:
            trustStore:
            trustStorePassword:
 ```
:::note
In single-service mode (when the Caching Service is deployed as an embedded component alongside the Gateway rather than as a standalone service), the configured port **7555** is ignored. Instead, the Gateway communicates with the Caching Service using an internal single-service port.
:::
   