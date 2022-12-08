# SMF records

API Mediation Layer can issue an SMF type 83 sybtype 2 security related audit records only when Personal Access Token is generated.

To enable this functionality on your Zowe instance follow this configuration guide:

[Configure main Zowe server to issue SMF records](#configure-main-zowe-server-to-issue-smf-records)
   * [Using RACF](#using-racf)
   * [Using ACF2](#using-acf2)
   * [Using TSS](#using-tss)

Some of predefined values in SMF record is possible to change. See, the [full list of configurable parameters](#smf-record-configurable-parameters). 

**Note:** Record type 83 is a RACF processing record, and it can be wrapped into different SMF type depends on ESM:
* ACF2 - SMF type 230
* TSS - SMF type 231

## Configure main Zowe server to issue SMF records

This security configuration is necessary for API ML to be able to issue SMF records. A user running API Gateway must have read access to the RACF general resource `IRR.RAUDITX` in the `FACILITY` class.
To set up this security configuration, submit the `ZWESECUR` JCL member. For users upgrading from version 1.18 and lower use the following configuration steps.

### Using RACF

If you use RACF, verify and update permission in the `FACILITY` class.

**Follow these steps:**

1. Verify user `ZWESVUSR` has read access.

    ```
    RLIST FACILITY IRR.RAUDITX AUTHUSER
    ```

2. Add user `ZWESVUSR` permission to read.
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

1. Verify user `ZWESVUSR` has read access.
    ```      
    SET RESOURCE(FAC) 
    LIST LIKE(IRR-)
    ```    
2. Add user `ZWESVUSR` permission to read.
    ```
    RECKEY IRR.RAUDITX ADD(SERVICE(READ) ROLE(&STCGRP.) ALLOW)
    ```

### Using TSS

If you use TSS, verify and update permission in `FACILITY` class.

**Follow these steps:**

1. verify user `ZWESVUSR` has read access.
    ```      
    TSS WHOHAS IBMFAC(IRR.RAUDITX)
    ```    
2. Add user `ZWESVUSR` permission to read.
    ```
    TSS PER(ZWESVUSR) IBMFAC(IRR.RAUDITX) ACCESS(READ)
    ```
   
## SMF record configurable parameters

The following list of parameters is required to set up SMF records, and the default values of these parameters can be overwritten in `zowe.yaml`. See [how to configure rauditx parameters](#configure-rauditx-parameters).

| Parameter                 | Description                                                                                                                                                                                   | Type    | Default value |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|:-------------:|
| rauditx.fmid              | FMID of the product or component issuing the SMF record                                                                                                                                       | string  |    AZWE001    |
| rauditx.component         | Name of the product or component issuing the SMF record                                                                                                                                       | string  |     ZOWE      |
| rauditx.subtype           | SMF type 83 record subtype assigned to the component. For more information, see [description of subtypes](https://www.ibm.com/docs/en/zos/2.5.0?topic=records-record-type-83-security-events) | integer |       2       |
| rauditx.event             | Event code. For more information, see [description of event codes](https://www.ibm.com/docs/en/zos/2.5.0?topic=descriptions-event-codes-event-code-qualifiers)                                | integer |       2       |
| rauditx.qualifier.success | Event Code Qualifier for success. The value can be between 0 and 255                                                                                                                          | integer |       0       |
| rauditx.qualifier.failed  | Event Code Qualifier for failure. The value can be between 0 and 255                                                                                                                          | integer |       1       |

### Configure rauditx parameters

Example of changing `rauditx.fmid` parameter. Following procedure can be applied for any of SMF record configurable parameters.

**Follow these steps:**

1. Open the `zowe.yaml` configuration file.
2. Find or add the property `zowe.environments.RAUDITX_FMID` and set your desired value.
3. Restart Zowe.