# SMF records

API Mediation Layer can issue SMF type 83, 230, or 231 security-related audit records. You can use SMF records to assist with auditing events when a Personal Access Token is created.

To enable this functionality on your Zowe instance, see the [configuration procedure](#configure-the-main-zowe-server-to-issue-smf-records).

It is possible to customize some predefined values in the SMF record. For more information, see the [full list of configurable parameters](#smf-record-configurable-parameters). 

**Note:** Record type 83 is a RACF processing record. This record type can be replaced by other SMF types depending on the ESM:
* ACF2 - SMF type 230
* TSS - SMF type 231

## Configure the main Zowe server to issue SMF records

This security configuration is necessary for API ML to be able to issue SMF records. A user running the API Gateway must have _read_ access to the RACF general resource `IRR.RAUDITX` in the `FACILITY` class.
To set up this security configuration, submit the `ZWESECUR` JCL member. For users upgrading from version 1.18 and lower, use the configuration steps that correspond to the ESM.

To check whether you already have the auditing profile defined, issue the following command and review the output to confirm that the profile exists and that the user `ZWESVUSR` who runs the `ZWESLSTC` started task has `READ` access to this profile.

- If you use RACF, issue the following command:
    ```
    RLIST FACILITY IRR.RAUDITX AUTHUSER
    ```
- If you use Top Secret, issue the following command:
    ```
    TSS WHOHAS IBMFAC(IRR.RAUDITX)
    ```
- If you use ACF2, issue the following commands:
    ```
    SET RESOURCE(FAC)
    ```
    ```
    LIST LIKE(IRR-)
    ```

If the user `ZWESVUSR` who runs the `ZWESLSTC` started task does not have `READ` access to this profile, follow the procedure that corresponds to your ESM:

- If you use RACF, update permission in the `FACILITY` class.

   **Follow these steps:**

   1. Add user `ZWESVUSR` permission to `READ`.
      ```
      PERMIT IRR.RAUDITX CLASS(FACILITY) ACCESS(READ) ID(ZWESVUSR)
      ```
   2. Activate changes.
      ```
      SETROPTS RACLIST(FACILITY) REFRESH
      ```

- If you use Top Secret, add user `ZWESVUSR` permission to `READ`. Issue the following command:
   ```
   TSS PER(ZWESVUSR) IBMFAC(IRR.RAUDITX) ACCESS(READ)
   ```

- If you use ACF2, add user `ZWESVUSR` permission to `READ`. Issue the following commands:
   ```
   SET RESOURCE(FAC)
   ```
   ```
   RECKEY IRR ADD(RAUDITX ROLE(&STCGRP.) SERVICE(READ) ALLOW)
   ```
   ```
   F ACF2,REBUILD(FAC)
   ```
   
## SMF record configurable parameters

The following list of parameters can be used to modify the default SMF record values. Default values for these parameters can be overwritten in `zowe.yaml`. For more information, see [how to configure rauditx parameters](#configure-rauditx-parameters).

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

