# SMF records

API Mediation Layer can issue SMF type 83 sybtype 2 security-related audit records. This requires the generation of a Personal Access Token.

To enable this functionality on your Zowe instance, follow the corresponding configuration procedure:

[Configure main Zowe server to issue SMF records](#configure-main-zowe-server-to-issue-smf-records)
   * [Using RACF](#using-racf)
   * [Using ACF2](#using-acf2)
   * [Using TSS](#using-tss)

Some of the predefined values in the SMF record are possible to change. For more information, see the [full list of configurable parameters](#smf-record-configurable-parameters). 

**Note:** Record type 83 is a RACF processing record. This record type can be wrapped into other SMF types depending on the ESM:
* ACF2 - SMF type 230
* TSS - SMF type 231

## Configure main Zowe server to issue SMF records

This security configuration is necessary for API ML to be able to issue SMF records. A user running the API Gateway must have _read_ access to the RACF general resource `IRR.RAUDITX` in the `FACILITY` class.
To set up this security configuration, submit the `ZWESECUR` JCL member. For users upgrading from version 1.18 and lower, use the configuration steps that correspond to the ESM.

### Using RACF

If you use RACF, verify and update permission in the `FACILITY` class.

**Follow these steps:**

1. Verify that user `ZWESVUSR` has _read_ access.

    ```
    RLIST FACILITY IRR.RAUDITX AUTHUSER
    ```

2. Add user `ZWESVUSR` permission to `READ`.
    ```
    PERMIT IRR.RAUDITX CLASS(FACILITY) ACCESS(READ) ID(ZWESVUSR)
    ```
3. Activate changes.
    ```
    SETROPTS RACLIST(FACILITY) REFRESH
    ```

### Using ACF2

If you use ACF2, verify and update permission in the `FACILITY` class.

**Follow these steps:**

1. Verify user `ZWESVUSR` has _read_ access.
    ```      
    SET RESOURCE(FAC) 
    LIST LIKE(IRR-)
    ```    
2. Add user `ZWESVUSR` permission to `READ`.
    ```
    RECKEY IRR.RAUDITX ADD(SERVICE(READ) ROLE(&STCGRP.) ALLOW)
    ```

### Using TSS

If you use TSS, verify and update permission in the `FACILITY` class.

**Follow these steps:**

1. verify user `ZWESVUSR` has _read_ access.
    ```      
    TSS WHOHAS IBMFAC(IRR.RAUDITX)
    ```    
2. Add user `ZWESVUSR` permission to `READ`.
    ```
    TSS PER(ZWESVUSR) IBMFAC(IRR.RAUDITX) ACCESS(READ)
    ```
   
## SMF record configurable parameters

The following list of parameters is required to set up SMF records. Default values for these parameters can be overwritten in `zowe.yaml`. For more information, see [how to configure rauditx parameters](#configure-rauditx-parameters).

| Parameter                 | Description                                                                                                                                                                                   | Type    | Default value |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|:-------------:|
| rauditx.fmid              | FMID of the product or component issuing the SMF record                                                                                                                                       | string  |    AZWE001    |
| rauditx.component         | Name of the product or component issuing the SMF record                                                                                                                                       | string  |     ZOWE      |
| rauditx.subtype           | SMF type 83 record subtype assigned to the component. For more information, see [description of subtypes](https://www.ibm.com/docs/en/zos/2.5.0?topic=records-record-type-83-security-events) | integer |       2       |
| rauditx.event             | Event code. For more information, see [description of event codes](https://www.ibm.com/docs/en/zos/2.5.0?topic=descriptions-event-codes-event-code-qualifiers)                                | integer |       2       |
| rauditx.qualifier.success | Event Code Qualifier for success. The value can be between 0 and 255                                                                                                                          | integer |       0       |
| rauditx.qualifier.failed  | Event Code Qualifier for failure. The value can be between 0 and 255                                                                                                                          | integer |       1       |

### Configure rauditx parameters

Use the following procedure to change the `rauditx.fmid` parameter. This procedure can be applied to any SMF record configurable parameters.

**Follow these steps:**

1. Open the `zowe.yaml` configuration file.
2. Find or add the property `zowe.environments.RAUDITX_FMID` and set your desired value.
3. Restart Zowe.

