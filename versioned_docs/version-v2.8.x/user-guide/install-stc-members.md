# Installing Zowe main started tasks

The JCL members for each of Zowe's started tasks need to be present on the JES proclib concatenation path.  The command `zwe init stc` will copy these from the install source location `.SZWESAMP` to the targted PDS specified in the `zowe.setup.dataset.proclib` value `USER.PROCLIB`.  The three proclib member names are specified in `zowe.yaml` arguments.  

```
zowe
  setup
    security
      stcs
        zowe: ZWESLSTC
        xmem: ZWESISTC
        aux: ZWESASTC
```

The `zwe init stc` command uses the `CUST.JCL` LIB data sets as a staging area to contain intermediatory JCL which are transformed version of the originals that are shiped in `.SZWESAMP` with paths, PDS locations, and other runtime data updated.  If you wish to just generate the `CUST.JCLLIB` members without having them copied to  `USER.PROCLIB`, specify `--security-dry-run`.  If the JCL members are already in the target PROCLIB, specify `--allow-overwritten`.   

Here is an example:

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