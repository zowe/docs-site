# Configuring the Caching Service for high availability

Zowe can work in a high availability (HA) configuration where multiple instances of the Zowe launcher are started, either on the same LPAR, or different LPARs connected through sysplex distributor. If you are only running a single Zowe instance on a single LPAR you do not need to create a caching service so you may skip this step.  

In an HA setup the different Zowe API Mediation Gateway servers share the same northbound port (by default `7554`), and client traffic to this port is distributed between separate gateways that in turn dispatch their work to different services.  When any of the services individually become unavailable the work can be routed to available services, which means that the initial northbound request will be fulfilled.  

Zowe uses the Caching Service to centralize the state data persistent in high availability (HA) mode. If you are runnning the caching service on z/OS there are three storage methods: `inMemory`, `infinispan` or `VSAM`.  If you are running the caching service off platform, such as a Linux or Windows container image, it is also possible to specify `redis` or `infinispan`.  

To learn more about Caching Service, see [Using the Caching Service](../extend/extend-apiml/api-mediation-caching-service.md).  

:::note
The Infinispan storage method is recommended for production usage.
:::

## inMemory
   
   This storage method is designed for quick start of the service and should be used only for single instance scenario and development or test purpose. Do not use it in production or high availability scenario.
  
   To use this method, set the `zowe.components.caching-service.storage.mode` value to `inMemory` in the `zowe.yaml` configuration file. When this method is enabled, the Caching Service will not persist any data.  

   ```
   zowe
     components:
       caching-service:
         enabled: true
         port: 7555
           storage:
             evictionStrategy: reject
             mode: imMemory
             size: 10000
   ```

## infinispan

  Infinispan is designed to be run mainly on z/OS since it offers good performance. To enable this method, set the value of `zowe.components.caching-service.storage.mode` to `infinispan` in the `zowe.yaml` configuration file.
  Infinispan environment variables are not currently following the v2 naming convention, so they must be defined into `zowe.environments` section.  For more information on these properties and their values see [Infinispan configuration](../extend/extend-apiml/api-mediation-infinispan.md#infinispan-configuration).


    ```
    zowe
      environments:
            JGROUPS_BIND_PORT:
            JGROUPS_BIND_ADDRESS:
            CACHING_STORAGE_INFINISPAN_INITIALHOSTS:
            CACHING_STORAGE_INFINISPAN_PERSISTENCE_DATALOCATION:
    ```

## VSAM
  
  This storage method allows you tu use VSAM dataset as a storage for Caching service. You can use `zwe init vsam` command to generate proper dataset.


  The command `zwe init vsam` uses the template JCL in `SZWESAMP(ZWECSVSM)`.  You can edit and submit this yourself, or else if use `zwe init vsam` which will copy the source template member from `zowe.setup.mvs.hlq.SZWESAMP(ZWECVCSM)` and create a target JCL member in `zowe.setup.mvs.jcllib(ZWECVSCM)` with values extracted from the `zowe.yaml` file.  
  
  ```
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

  - `zowe.components.caching-service.storage.vsam.name`  
  This specifies the data set name that the `ZWECSVSM` JCL will create. This is used to replace all occurrences of `#dsname` in the `ZWECSVSM` data set.

    :::note
    The `ZWECSVSM` JCL defines the key length and record length of the VSAM instance. If the key length and record length of this JCL is changed,
    `zowe.environments.CACHING_STORAGE_VSAM_KEYLENGTH` and `zowe.environments.CACHING_STORAGE_VSAM_RECORDLENGTH` must be set to the new values.
    :::

  - `zowe.components.caching-service.storage.mode`  
  This specifies whether you would like to use [Record Level Sharing (RLS)](https://www.ibm.com/support/pages/vsam-record-level-sharing-rls-overview) for your VSAM data set. `RLS` is recommended for Sysplex deployment.  `NONRLS` is also an allowed value.  


  - `zowe.setup.vsam.storageClass`   
  If you use the `RLS` mode, a storage class is required. 

  - `zowe.setup.vsam.volume`  
  If you set to use the `NONRLS` mode, a storage volume is required.


  To preview the member before submitting it, use the value `--security-dry-run`.  Otherwise, the command automatically submits the JCL and waits for its completion.

  ```
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

## redis

   Redis is not available if you are running the API Mediation Layer on z/OS under Unix System Services. Usage of redis is intended for when API ML is running off platform, such as in a Linux or Windows container as part of a hybrid cloud deployment.

   To enable this method, set the value of `zowe.components.caching-service.storage.mode` to `redis` in the `zowe.yaml` configuration file.  There are a number of values to control the redis nodes, sentinel and ssl properties that need to be set in the `zowe.yaml` file.  For more information on these properties and their values see [Redis configuration](../extend/extend-apiml/api-mediation-redis.md#redis-configuration).  
   
   
   ```
   zowe:
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
               trustStorePassword
   ```
