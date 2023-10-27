# Installing Zowe main started tasks

Once you have completed security configuration, you can install the Zowe main started tasks. 

:::info**Required role:** system programmer
:::

The JCL members for each of Zowe's started tasks need to be present on the JES proclib concatenation path. The command `zwe init stc` copies these members from the install source location `.SZWESAMP` to the targted PDS specified in the `zowe.setup.dataset.proclib` value `USER.PROCLIB`. The three proclib member names are specified in `zowe.yaml` arguments.  

```
zowe
  setup
    security
      stcs
        zowe: ZWESLSTC
        zis: ZWESISTC
        aux: ZWESASTC
```

The `zwe init stc` command uses the `CUST.JCL` LIB data sets as a staging area to contain intermediatory JCL which are transformed version of the originals that are shiped in `.SZWESAMP` with paths, PDS locations, and other runtime data updated.  If you wish to just generate the `CUST.JCLLIB` members without having them copied to  `USER.PROCLIB`, specify `--security-dry-run`.  If the JCL members are already in the target PROCLIB, specify `--allow-overwritten`.   

**Example:**

```
#>zwe init stc -c ./zowe.yaml
-------------------------------------------------------------------------------
>> Install Zowe main started task

Modify ZWESLSTC
Modify ZWESISTC
Modify ZWESASTC

Copy IBMUSER.ZWEV2.CUST.JCLLIB(ZWESLSTC) to USER.PROCLIB(ZWESLSTC)
Copy IBMUSER.ZWEV2.CUST.JCLLIB(ZWESISTC) to USER.PROCLIB(ZWESISTC)
Copy IBMUSER.ZWEV2.CUST.JCLLIB(ZWESASTC) to USER.PROCLIB(ZWESASTC)

>> Zowe main started tasks are installed successfully.
#>
```