# Starting and stopping Zowe

The following article describes how to start and stop Zowe.

Zowe consists of three main started tasks:

- **ZWESISTC**  
Zowe cross memory server

- **ZWESASTC**  
Zowe cross memory auxiliary server

- **ZWESLSTC**  
Zowe main started task


## Starting and stopping the cross memory server `ZWESISTC` on z/OS

The cross memory server is run as a started task from the JCL in the PROCLIB member `ZWESISTC`, and supports reusable address spaces. This task can be started through with the operator start command with the `REUSASID=YES` keyword:

```
S ZWESISTC,REUSASID=YES
```
:::note
If using SDSF to start the cross memory server, enter `/` before `S`.
:::

The `ZWESISTC` task starts and stops the `ZWESASTC` task as needed. Do not start the `ZWESASTC` task manually.

:::note
Starting and stopping of the `ZWESLSTC` started task for the main Zowe servers is independent of the `ZWESISTC` cross memory server, which is an angel process. If you are running more than one `ZWESLSTC` instance on the same LPAR, the instances share the same `ZWESISTC` cross memory server. Stopping `ZWESISTC` affects the behavior of all Zowe servers on the same LPAR that use the same cross-memory server name, for example `ZWESIS_STD`. The Zowe cross memory server is designed to be a long-lived address space. There is no requirement to recycle regularly. When the cross memory server is started with a new version of its load module, the cross memory server abandons its current load module instance in LPA and loads the updated version.
:::

To end the Zowe cross memory server process, issue the operator stop command:

```
P ZWESISTC
```

:::note
If using SDSF to stop the cross memory server, enter `/` before `P`.
:::


## Starting and stopping the cross memory auxiliary server `ZWESASTC` on z/OS

Starting and stopping the cross memory auxiliary server `ZWESASTC` on z/OS is handled automatically by Zowe cross memory server. It is not necessary to manually start or stop this started task.

## Starting and stopping Zowe main server `ZWESLSTC` on z/OS with `zwe` server command

Zowe ships [`zwe start`](../appendix/zwe_server_command_reference/zwe/zwe-start.md) and [`zwe stop`](../appendix/zwe_server_command_reference/zwe/zwe-stop.md) commands to help you start and stop the Zowe main server.

To start Zowe, run the following command:

```
zwe start --config /path/to/my/zowe.yaml
```

 This command issues the `S` command to Zowe `ZWESLSTC`.

**Example:**

```
#>zwe start --config /path/to/my/zowe.yaml
===============================================================================
>> STARTING ZOWE

-------------------------------------------------------------------------------
>> Job ZWE1SV is started successfully.

#>
```

Job name `ZWE1SV` can be customized with `zowe.job.name` in your Zowe configuration file.

You can use `zwe start` command to start a Zowe high availability instance defined on other LPAR within the Sysplex.

**Example:**

```
zwe start --config /path/to/my/zowe.yaml --ha-instance hainst2
```
 
 The following information must be defined in the Zowe configuration file:

```
haInstances:
  hainst2:
    hostname: lpar2-domain.com
    sysname: LPAR2
```

The `zwe start` command uses the `ROUTE` command to send the `S ZWESLSTC` command to the `LPAR2` system.

To stop Zowe, run the following command:

```
zwe stop --config /path/to/my/zowe.yaml
```
 
 This command issues the `P` command to the Zowe job.

**Example:**

```
#>zwe stop --config /path/to/my/zowe.yaml
===============================================================================
>> STOPPING ZOWE

-------------------------------------------------------------------------------
>> Job ZWE1SV is stopped successfully.

#>
```

## Starting and stopping Zowe main server `ZWESLSTC` on z/OS manually

To start Zowe main server, you can issue the `S ZWESLSTC` command. Similar to the the MVS system command, you can customize the `JOBNAME`.

**Example:**

```
S ZWESLSTC,JOBNAME=ZWE1SV
```

If you have a Zowe high availability instance defined and want to start a specific HA instance, for example `myinst1`, you can pass with the `HAINST` parameter.

**Example:**

```
S ZWESLSTC,HAINST=myinst1,JOBNAME=ZWE1SV1
```

:::note
The Zowe high availability instance name is case insensitive. 
`HAINST=myinst1` and `HAINST=MYINST1` are equivalent.
:::

If you are starting a Zowe high availability instance for another LPAR in the Sysplex, you can use the `ROUTE` command to route the `S` command to the target system. 

**Example:**
 To start an HA instance `myinst2` on `LPAR2` when working on SYSNAME `LPAR1`, issue the following command:
 
```
RO LPAR2,S ZWESLSTC,HAINST=myinst2,JOBNAME=ZWE1SV2
```

To stop the Zowe main server, issue the `P <jobname>` command.

:::cautionImportant
With Zowe version 1, you can issue `C` command to stop Zowe main server. This command is no longer supported in version 2. The `P` command is now required to ensure that the Zowe components shut down properly.
:::

## Stopping and starting a Zowe component without restarting Zowe main server

You can restart a Zowe component with the MVS system command  without restarting the whole Zowe main server. Before issuing the modify command consider the following points:

- By default, your Zowe main server job name is configured as `ZWE1SV`. You can find your customized value by checking the `zowe.job.name` defined in the Zowe configuration file.
- Determine the component name you want to stop or start. You can find a full list of installed components by listing the `<RUNTIME>/components` directory and the Zowe extension directory.  

To stop a running Zowe component, issue the following command:

```
F <zowe-job>,APPL=STOP(<component-name>)
```

**Example:**

To stop `app-server`, issue the following command:

```
F ZWE1SV,APPL=STOP(app-server)
```

To start a stopped Zowe component, issue the following command:

```
F <zowe-job>,APPL=START(<component-name>)
```

**Example:**

To start `app-server`, issue the following command:

```
F ZWE1SV,APPL=START(app-server)
```

:::note
Not all components can be restarted with this method. Some components may rely on other components. It may be necessary to restart affected components.
:::
