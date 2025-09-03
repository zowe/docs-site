
# Initializing Zowe custom data sets

Review this article to learn about how to intialize Zowe custom MVS data sets by using the `zwe init mvs` command. 

:::info Required role: system programmer
:::

## Introduction

During the installation of Zowe, runtime datasets are created. The contents of these data sets represent the original files that were provided as part of the Zowe installation and are not meant to be modified. [The list of these datasets can be reviewed in the dataset appendix](../appendix/server-datasets.md).

For modification and execution, it is necessary to create custom data sets by using the `zwe init mvs` command. For detailed information about this command, see the [`zwe init mvs` command reference](../appendix/zwe_server_command_reference/zwe/init/zwe-init-mvs.md).

The `zowe.yaml` section that contains the parameters for the data set names is:

```
zowe:
  setup:
    dataset:
      prefix: IBMUSER.ZWE
      parmlib: IBMUSER.ZWE.CUST.PARMLIB
      jcllib: IBMUSER.ZWE.CUST.JCLLIB
      authLoadlib: IBMUSER.ZWEV3.SZWEAUTHntication-mechanisms.md#default
      authPluginLib: IBMUSER.ZWE.CUST.ZWESAPL
```

Refer to the appendix for the [list of datasets](../appendix/server-datasets.md#custom-data-sets) that will be created in this step.

## Procedure to initialize Zowe custom data sets

To initialize Zowe custom data sets, run the following command: 

```
zwe init mvs -c /path/to/zowe.yaml
```

Here is an example of running `zwe init mvs`.  

```
#>zwe init mvs -c ./zowe.yaml
-------------------------------------------------------------------------------
>> Initialize Zowe custom data sets

Create data sets if they are not exist
Creating IBMUSER.ZWEV3.CUST.PARMLIB
Creating IBMUSER.ZWEV3.CUST.JCLLIB
Creating IBMUSER.ZWEV3.SZWEAUTH
Creating IBMUSER.ZWEV3.CUST.ZWESAPL

Copy IBMUSER.ZWEV3.SZWESAMP(ZWESIP00) to USER.ZWEV3.CUST.PARMLIB(ZWESIP00)
Copy components/zss/LOADLIB/ZWESIS01 to USER.ZWEV3.SZWEAUTH(ZWESIS01)
Copy components/zss/LOADLIB/ZWESAUX to USER.ZWEV3.SZWEAUTH(ZWESAUX)
Copy components/launcher/bin/zowe_launcher to USER.ZWEV3.SZWEAUTH(ZWELNCH)

>> Zowe custom data sets are initialized successfully.
#>
```

## Results

If this step is successful, there will be three custom data sets matching the values in `zowe.setup.dataset.parmlib`, `zowe.setup.dataset.jcllib` and `zowe.setup.dataset.authPluginLib` in the `zowe.yaml` file. The member `ZWESIP00` will exist in the `CUST.PARMLIB` and the `JCLLIB` and `ZWESAPL` will be empty.

In addition to the three custom data sets, the PDS `SZWEAUTH` is created. This member may already exist. In this case, you will receive the error message `Error ZWEL0158E: IBMUSER.ZWEV3.SZWEAUTH already exists`. You can ignore this message, or you can use the `--allow-overwritten` option on the command. For example, `zwe init mvs -c zowe.yaml --allow-overwritten`.

