# Configuring the Caching Service for HA

Zowe uses the Caching Service to centralize the state data persistent in high availability (HA) mode. If you are runnning the caching service on z/OS there are two storage methods: `inMemory` or `VSAM`.  If you are running the caching service off platform, such as a linux or windows container image, it is also possible to specify `redis`.  

For users 

- **inMemory** 
   
   This storage method is designed for quick start of the service and should be used only for single instance scenario and development or test purpose. Do not use it in production or high availability scenario.
  
   To use this method, set the `zowe.components.caching-service.storage.mode` value to `inMemory` in the `zowe.yanl` configuration file. When this method is enabled, the Caching Service will not persist any data.  

   ```
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
   2. Create a VSAM data set. See [Creating a VSAM data set](#creating-a-vsam-data-set) for instructions.  There are two ways to create the data set, either using the JCL member `SZWESAMP(ZWECVSEM)` where the data set name is defined in the `#dsname` variable.  
   3. In `zowe.yaml`, configure `zowe.components.caching-sevice.storage.vsam.name` with the VSAM data set name.  If in step 2 you used `zwe init vsam` to create the VSAM data set then the values will already be set.  

   ```
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

   To enable this method, set the value of `zowe.components.caching-service.storage.mode` to `redis` in the `zowe.yaml` configuration file. See [Redis configuration](../extend/extend-apiml/api-mediation-redis.md#redis-configuration) for more information. To learn more about Caching Service, see [Using the Caching Service](../extend/extend-apiml/api-mediation-caching-service.md).



