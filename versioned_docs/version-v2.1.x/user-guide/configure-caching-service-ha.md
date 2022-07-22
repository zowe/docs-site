# Configuring the Caching Service for HA

Zowe uses the Caching Service to centralize the state data persistent in high availability (HA) mode. If you are runnning the caching service on z/OS there are three storage methods: `inMemory`, `infinispan` or `VSAM`.  If you are running the caching service off platform, such as a linux or windows container image, it is also possible to specify `redis` or `infinispan`.  

To learn more about Caching Service, see [Using the Caching Service](../extend/extend-apiml/api-mediation-caching-service.md).  

For users 

- **inMemory** 
   
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

- **VSAM**
   
   To use this method, 
   1. Set the value of `zowe.components.caching-service.storage.mode` value to `VSAM` in the `zowe.yaml` configuration file.
   2. Create a VSAM data set. See [Initialize VSAM data set](../user-guide/initialize-vsam-dataset.md) for instructions.  There are two ways to create the data set, either using the JCL member `SZWESAMP(ZWECVSEM)` where the data set name is defined in the `#dsname` variable.  
   3. In `zowe.yaml`, configure `zowe.components.caching-sevice.storage.vsam.name` with the VSAM data set name.  If in step 2 you used `zwe init vsam` to create the VSAM data set then the values will already be set.  

   
   ```
   zowe
     components:
       caching-service:
       enabled: true
         port: 7555
           storage:
             size: 10000
             evictionStrategy: reject
             mode: VSAM
             vsam:
               name: IBMUSER.ZWE.CUST.APICACHE
   ```

- **redis**

   Redis is not available if you are running the API Mediation Layer on z/OS under unix system services.  Its usage is for when the APIML is running off platform, such as in a linux or windows container as part of a hybrid cloud deployment.

   To enable this method, set the value of `zowe.components.caching-service.storage.mode` to `redis` in the `zowe.yaml` configuration file.  There are a number of values to control the redis nodes, sentinel and ssl properties that will need to be set in the `zowe.yaml` file.  For more information on these properties and their values see [Redis configuration](../extend/extend-apiml/api-mediation-redis.md#redis-configuration).  
   
   
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

- **infinispan**

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