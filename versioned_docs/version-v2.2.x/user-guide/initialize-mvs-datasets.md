
# Initializing Zowe custom data sets

Learn how to intialize Zowe custom MVS data sets by using the `zwe init mvs` command. 

## Introduction

During the installation of Zowe, three data sets `SZWEAUTH`, `SZWESAMP` and `SZWEEXEC` are created and populated with members copied across from the Zowe installation files. The contents of these data sets represent the original files that were provided as part of the Zowe installation and are not meant to be modified because they will be replaced during subsequent upgrades of Zowe version 2. 

For modification and execution, you must create custom data sets by using the `zwe init mvs` command. For detailed information about this command, see the [`zwe init mvs` command reference](../appendix/zwe_server_command_reference/zwe/init/zwe-init-mvs).

The `zowe.yaml` section that contains the parameters for the data set names is:

```
zowe:
  setup:
    dataset:
      prefix: IBMUSER.ZWE
      parmlib: IBMUSER.ZWE.CUST.PARMLIB
      jcllib: IBMUSER.ZWE.CUST.JCLLIB
      authLoadlib: IBMUSER.ZWE.CUST.ZWESALL
      authPluginLib: IBMUSER.ZWE.CUST.ZWESAPL
```

The storage requirements for the three data sets are included here.

Library DDNAME | Member Type | zowe.yaml | Target Volume | Type | Org | RECFM | LRECL | No. of 3390 Trks | No. of DIR Blks
---|---|---|---|---|---|---|---|---|--
CUST.PARMLIB | PARM Library Members | zowe.setup.dataset.parmlib | ANY | U | PDSE | FB | 80 | 15 | 5
CUST.JCLLIB | JCL Members | zowe.setup.dataset.jcllib | ANY | U | PDSE | FB | 80 | 15 | 5
CUST.ZWESAPL | CLIST copy utilities | zowe.setup.dataset.authPluginLib | ANY | U | PDSE | U | 0 | 15 | N/A

## Procedure

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
Creating IBMUSER.ZWEV2.CUST.PARMLIB
Creating IBMUSER.ZWEV2.CUST.JCLLIB
Creating IBMUSER.ZWEV2.SZWEAUTH
Creating IBMUSER.ZWEV2.CUST.ZWESAPL

Copy IBMUSER.ZWEV2.SZWESAMP(ZWESIP00) to WINCHJ.ZWEV2.CUST.PARMLIB(ZWESIP00)
Copy components/zss/LOADLIB/ZWESIS01 to WINCHJ.ZWEV2.SZWEAUTH(ZWESIS01)
Copy components/zss/LOADLIB/ZWESAUX to WINCHJ.ZWEV2.SZWEAUTH(ZWESAUX)
Copy components/launcher/bin/zowe_launcher to WINCHJ.ZWEV2.SZWEAUTH(ZWELNCH)

>> Zowe custom data sets are initialized successfully.
#>
```

## Results

If this step is successful, there will be three custom data sets matching the values in `zowe.setup.dataset.parmlib`, `zowe.setup.dataset.jcllib` and `zowe.setup.dataset.authPluginLib` in the `zowe.yaml` file. The member `ZWESIP00` will exist in the `CUST.PARMLIB` and the `JCLLIB` and `ZWESAPL` will be empty.

In addition to the three custom data sets, the PDS `SZWEAUTH` is created. This may already exist. In this case, you will receive the error message `Error ZWEL0158E: IBMUSER.ZWEV2.SZWEAUTH already exists`. You can ignore this message, or you can use the `--allow-overwritten` option on the command. For example, `zwe init mvs -c zowe.yaml --allow-overwritten`.

