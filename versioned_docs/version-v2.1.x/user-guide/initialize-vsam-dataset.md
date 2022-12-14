# Creating VSAM caching service datasets

Zowe can work in a high availability (HA) configuration where multiple instances of the Zowe launcher are started, either on the same LPAR or different LPARs connected through sysplex distributor.  If you are only running a single Zowe instance on a single LPAR you do not need to create a caching service so you may skip this step.  

In an HA setup the different Zowe API Mediation Gateway servers share the same northbound port (by default `7554`), and client traffic to this port is distributed between separate gateways that in turn dispatch their work to different services.  When any of the services individually become unavailable the work can be routed to available services, which means that the initial northbound request will be fulfilled.  

There are different storage methods that can be used as as the caching service for Zowe.  One of these is `VSAM` and this chapter describes how to create the data sets if you are using `VSAM` as your caching service.  If you are using another caching service such as `redis` or `infinispan` then you do not need to create any VSAM files and you can skip the step described in this chapter.  For more information on the different caching services see [Configuring the Caching Service for HA](../user-guide/configure-caching-service-ha.md).

## Using `zwe init vsam` command

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

- `zowe.components.caching-service.storage.vsam.name` variable

   This is the data set name that the `ZWECSVSM` JCL will create. This is used to replace all occurrences of `#dsname` in the `ZWECSVSM` data set.

   Note: The `ZWECSVSM` JCL defines the key length and record length of the VSAM instance. If the key length and record length of this JCL is changed,
   `zowe.environments.CACHING_STORAGE_VSAM_KEYLENGTH` and `zowe.environments.CACHING_STORAGE_VSAM_RECORDLENGTH` must be set to the new values.

- `zowe.components.caching-service.storage.mode` variable

   This specifies whether you would like to use [Record Level Sharing (RLS)](https://www.ibm.com/support/pages/vsam-record-level-sharing-rls-overview) for your VSAM data set. `RLS` is recommended for Sysplex deployment.  `NONRLS` is also an allowed value.  


- `zowe.setup.vsam.storageClass` variable

   If you use the `RLS` mode, a storage class is required. 

- `zowe.setup.vsam.volume` variable

   If you set to use the `NONRLS` mode, a storage volume is required.


If you want to preview the member before submitting it use the value `--security-dry-run`, otherwise the command will submit the JCL and wait for its completion.

```
>zwe init vsam -c ./zowe.yaml
-------------------------------------------------------------------------------
>> Create VSAM storage for Zowe Caching Service
Modify ZWECSVSM
- IBMUSER.ZWE.CUST.JCLLIB(ZWECSVSM) is prepared
Submit WINCHJ.ZWEV2.CUST.JCLLIB(ZWECSVSM)
- Job ZWECSVSM(JOB05407) ends with code 0 (COMPLETED).
>> Zowe Caching Service VSAM storage is created successfully.
>
```
