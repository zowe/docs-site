# APF authorize load libraries

Learn how to perform APF authorization of Zowe load libraries that require access to make privileged calls.

Zowe contains load modules that require access to make privileged z/OS security manager calls.  These are held in two load libraries which must be APF authorized. The command `zwe init apfauth` will read the PDS names for the load libraries from `zowe.yaml` and perform the APF authority commands.  

- `zowe.setup.dataset.authLoadLib` specifies the user custom load library, containing the `ZWELNCH`, `ZWESIS01` and `ZWESAUX` load modules.  These are the Zowe launcher, the ZIS cross memory server and the auxiliary server.  
- `zowe.setup.dataset.authPluginLib` which references the load library for ZIS plugins.  

Here is an example of running `zwe init apfauth`: 

```
#>zwe init apfauth -c ./zowe.yaml
-------------------------------------------------------------------------------
>> APF authorize load libraries

APF authorize IBMUSER.ZWEV2.SZWEAUTH
APF authorize IBMUSER.ZWEV2.CUST.ZWESAPL

>> Zowe load libraries are APF authorized successfully.
#>
```

Specify `--security-dry-run` to have the command echo the commands that need to be run without them being executed.  

```
  SETPROG APF,ADD,DSNAME=IBMUSER.ZWEV2.SZWEAUTH,SMS
  SETPROG APF,ADD,DSNAME=IBMUISER.ZWEV2.CUST.ZWESAPL,SMS
```