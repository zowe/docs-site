# Performing APF authorization of load libraries

Review this article to learn how to perform APF authorization of Zowe load libraries to make privileged calls. Note that this procedure requires elevated permissions.

:::info Required role: security administrator
:::

Zowe contains load modules that require access to make privileged z/OS security manager calls. These load modules are held in two load libraries which must be APF authorized. The command `zwe init apfauth` reads the PDS names for the load libraries from `zowe.yaml` and performs the APF authority commands.  

- **zowe.setup.dataset.authLoadLib**  
 Specifies the user custom load library, containing the `ZWELNCH`, `ZWESIS01` and `ZWESAUX` load modules.  These are the Zowe launcher, the ZIS cross memory server and the auxiliary server.  
- **zowe.setup.dataset.authPluginLib**  
 References the load library for ZIS plugins.  

The following command presents an example of running `zwe init apfauth`: 

**Example:**
```
#>zwe init apfauth -c ./zowe.yaml
-------------------------------------------------------------------------------
>> APF authorize load libraries

APF authorize IBMUSER.ZWEV2.SZWEAUTH
APF authorize IBMUSER.ZWEV2.CUST.ZWESAPL

>> Zowe load libraries are APF authorized successfully.
#>
```
:::note
If you do not have permissions to update your security configurations, append the flag `--security-dry-run` to have the command echo the commands that need to be run without executing the command. We recommend you inform your security administrator to review your job content.
:::

```
  SETPROG APF,ADD,DSNAME=IBMUSER.ZWEV2.SZWEAUTH,SMS
  SETPROG APF,ADD,DSNAME=IBMUSER.ZWEV2.CUST.ZWESAPL,SMS
```

### Making APF auth be part of the IPL

Add one of the following to your active `PROGxx` PARMLIB member, for example `SYS1.PARMLIB(PROG00)`, to ensure that the APF authorization is added automatically after next IPL. The value of `DSNAME` is the name of the `SZWEAUTH` and `CUST.ZWESAPL` data sets, as created during Zowe installation:

- If the load library is not SMS-managed, add the following lines, where `${volume}` is the name of the volume that holds the data set:
  ```
  APF ADD DSNAME(IBMUSER.ZWEV2.SZWEAUTH) VOLUME(${volume})
  APF ADD DSNAME(IBMUSER.ZWEV2.CUST.ZWESAPL) VOLUME(${volume})
  ```
- If the load library is SMS-managed, add the following line:
  ```
  APF ADD DSNAME(IBMUSER.ZWEV2.SZWEAUTH) SMS
  APF ADD DSNAME(IBMUSER.ZWEV2.CUST.ZWESAPL) SMS
  ```

The PDS member `SZWESAMP(ZWESIPRG)` contains the SETPROG statement and PROGxx update for reference.