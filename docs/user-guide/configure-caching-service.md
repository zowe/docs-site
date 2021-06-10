# Configuring Caching Service

Caching Service is used to centralize state data persistent in high available mode. Currently Caching Service supports `inMemory`, `VSAM` and `redis` storage method.

- **inMemory**: is designed to quick start the service. In `instance.env`, if you leave `ZWE_CACHING_SERVICE_PERSISTENT` configuration empty, this `inMemory` mode will be used. With this storage method, caching service will not persist any data. Also if you have multiple instances of Caching Service, the data will not be shared across them. With these limitations, this storage method is only designed for single instance scenario and development/test purpose. It shouldn't be used for production or high available scenario.
- **VSAM**: You can set `ZWE_CACHING_SERVICE_PERSISTENT` to `VSAM` in `instance.env` to configure Caching Service with this storage method. To use this storage method, please follow section to [Prepare VSAM Storage](#prepare-vsam-storage) and configure `ZWE_CACHING_SERVICE_VSAM_DATASET` with the VSAM data set you created in `instance.env`. _Note: we see performance issues related VSAM data set, so we would recommend this storage method to light workload usage. If you predict to have heavy workload on Zowe components, `redis` storage method is recommended._
- **redis**: You can set `ZWE_CACHING_SERVICE_PERSISTENT` to `redis` in `instance.env` to configure Caching Service with this storage method. Please check [Redis configuration](..//extend/extend-apiml/api-mediation-redis.md#redis-configuration) for more information.

To learn more about Caching Service, please check [Using the Caching Service](../extend/extend-apiml/api-mediation-caching-service.md).

## Prepare VSAM Storage

Users can use `ZWECSVSM` JCL to create a VSAM data set and configure required security setup. The `ZWECSVSM` JCL is provided as part of the PDS sample library `SZWESAMP` that is delivered with Zowe. 

Before you submit the JCL, you must [customize it](#customizing-the-zwecsvsm-jcl) and review it with a system programmer who is familiar with z/OS VSAM data set and storage.

### Customizing the `ZWECSVSM` JCL

To customize the `ZWECSVSM` JCL, edit the JCL variables at the beginning and in the middle of the JCL. Review the information in this section when you customize the JCL.

#### `#dsname` variable

This is the data set name `ZWECSVSM` JCL will create. Please replace all occurrences of `#dsname` with your desired data set name. This data set name is the value for `ZWE_CACHING_SERVICE_VSAM_DATASET` configuration in `instance.env`.

#### `MODE` variable

The `MODE` variable specifies whether you would like to use [Record Level Sharing (RLS)](https://www.ibm.com/support/pages/vsam-record-level-sharing-rls-overview) for your VSAM data set. Using `RLS` is recommended for Sysplex deployment.

```
//         SET MODE=NONRLS                       RLS or NONRLS                  
```

#### `#storclas` variable

If you set to use `RLS` mode, a storage class is required. Replace `#storclas` with you desired storage class name.

#### `#volume` variable

If you set to use `NONRLS` mode, a storage volume is required. Replace `#volume` with you desired storage volume name.
