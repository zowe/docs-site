# Configuring the Caching Service for HA

Zowe uses the Caching Service to centralize the state data persistent in high availability (HA) mode. The Caching Service supports three storage methods: `inMemory`, `VSAM` and `redis`.

- **inMemory** 
   
   This storage method is designed for quick start of the service and should be used only for single instance scenario and development or test purpose. Do not use it in production or high availability scenario.
  
   To use this method, leave the `ZWE_CACHING_SERVICE_PERSISTENT` configuration blank in the `instance.env` configuration file. When this method is enabled, the Caching Service will not persist any data. Also, if you have multiple instances of Caching Service, the data will not be shared across these instances.

- **VSAM**
   
   **Note:** Performance issues related to the VSAM data set have been observed, so it is recommended that you use this storage method for light workload. If heavy workload is expected on Zowe components, it is recommended that you use the `redis` storage method instead.

   Follow these steps oo use this method: 
   1. Set the value of `ZWE_CACHING_SERVICE_PERSISTENT` to `VSAM` in the `instance.env` configuration file.
   2. Create a VSAM data set. See [Creating a VSAM data set](#creating-a-vsam-data-set) for instructions. 
   3. In `instance.env`, configure `ZWE_CACHING_SERVICE_VSAM_DATASET` with the VSAM data set you created.  

- **redis**

   To enable this method, set the value of `ZWE_CACHING_SERVICE_PERSISTENT` to `redis` in the `instance.env` configuration file. See [Redis configuration](../extend/extend-apiml/api-mediation-redis.md#redis-configuration) for more information. To learn more about Caching Service, see [Using the Caching Service](../extend/extend-apiml/api-mediation-caching-service.md).

If you are using `zowe.yaml` configuration other than `instance.env`, please check [Configure component caching-service](configure-instance-directory.md#configure-component-caching-service) for configuration details.

## Creating a VSAM data set

You can use the `ZWECSVSM` JCL to create a VSAM data set and define required security configurations. The `ZWECSVSM` JCL is provided as part of the PDS sample library `SZWESAMP` that is delivered with Zowe. 

Before you submit the `ZWECSVSM` JCL, you must customize it and review it with a system programmer who is familiar with z/OS VSAM data set and storage. 

The following variables are available in the JCL:

- **`#dsname`** 

   This variable specifies the data set name that the `ZWECSVSM` JCL will create. Replace all occurrences of `#dsname` with the data set name that you want to specify. This data set name is the value for `ZWE_CACHING_SERVICE_VSAM_DATASET` in `instance.env`.

- **`MODE`** 

   This variable specifies whether you would like to use [Record Level Sharing (RLS)](https://www.ibm.com/support/pages/vsam-record-level-sharing-rls-overview) for your VSAM data set. `RLS` is recommended for Sysplex deployment.

   ```
   //         SET MODE=NONRLS                       RLS or NONRLS                  
   ```

- **`#storclas`** 

   If you use the `RLS` mode, a storage class is required. Replace `#storclas` with your desired storage class name.

- **`#volume`** 

   If you set to use the `NONRLS` mode, a storage volume is required. Replace `#volume` with you desired storage volume.

**Note:** The `ZWECSVSM` JCL defines the key length and record length of the VSAM instance. If the key length and record length of this JCL is changed,
`CACHING_STORAGE_VSAM_KEYLENGTH` and `CACHING_STORAGE_VSAM_RECORDLENGTH` must be set in `instance.env` to the new values.

**Follow these steps:** 

1. Customize the `ZWECSVSM` JCL. Edit the variables at the beginning and in the middle of the JCL.

2. Submit the `ZWECSVSM` JCL to create a VSAM data set.
