# Starting and stopping Zowe

Zowe consists 3 main started tasks:

- `ZWESLSTC` as Zowe main started task,
- `ZWESISTC` as Zowe cross memory server
- and `ZWESASTC` as Zowe cross memory auxiliary server.

## Starting and stopping the cross memory server `ZWESISTC` on z/OS

The cross memory server is run as a started task from the JCL in the PROCLIB member `ZWESISTC`. It supports reusable address spaces and can be started through SDSF with the operator start command with the `REUSASID=YES` keyword:

```
/S ZWESISTC,REUSASID=YES
```
The ZWESISTC task starts and stops the ZWESASTC task as needed. Do not start the ZWESASTC task manually.

To end the Zowe cross memory server process, issue the operator stop command through SDSF:

```
/P ZWESISTC
```
**Note:** 

The starting and stopping of the `ZWESLSTC` started task for the main Zowe servers is independent of the `ZWESISTC` cross memory server, which is an angel process. If you are running more than one `ZWESLSTC` instance on the same LPAR, then these will be sharing the same `ZWESISTC` cross memory server. Stopping `ZWESISTC` will affect the behavior of all Zowe servers on the same LPAR that use the same cross-memory server name, for example `ZWESIS_STD`. The Zowe Cross Memory Server is designed to be a long-lived address space. There is no requirement to recycle regularly. When the cross-memory server is started with a new version of its load module, it abandons its current load module instance in LPA and loads the updated version.

## Starting and stopping the cross memory auxiliary server `ZWESASTC` on z/OS

This is handled automatically by Zowe cross memory server. You don't need to manually start or stop this started task.

## Starting and stopping Zowe main server `ZWESLSTC` on z/OS with `zwe` server command

Zowe ships [`zwe start`](../appendix/zwe_server_command_reference/zwe/zwe-start.md) and [`zwe stop`](../appendix/zwe_server_command_reference/zwe/zwe-stop.md) commands to help you start and stop Zowe main server.

To start Zowe, run `zwe start --config /path/to/my/zowe.yaml` command. It will issue `S` command to Zowe `ZWESLSTC`.

Here is an example:

```
#>zwe start --config /path/to/my/zowe.yaml
===============================================================================
>> STARTING ZOWE

-------------------------------------------------------------------------------
>> Job ZWE1SV is started successfully.

#>
```

Job name `ZWE1SV` can be customized with `zowe.job.name` in your Zowe configuration file.

You can use `zwe start` command to start a Zowe high availability instance defined on other LPAR within the Sysplex. For example, `zwe start --config /path/to/my/zowe.yaml --ha-instance hainst2`. This requires these information be defined in Zowe configuration file:

```
haInstances:
  hainst2:
    hostname: lpar2-domain.com
    sysname: LPAR2
```

`zwe start` command will use `ROUTE` command to send `S ZWESLSTC` command to `LPAR2` system.

To stop Zowe, run `zwe stop --config /path/to/my/zowe.yaml` command. It will issue `P` command to Zowe job.

Here is an example:

```
#>zwe stop --config /path/to/my/zowe.yaml
===============================================================================
>> STOPPING ZOWE

-------------------------------------------------------------------------------
>> Job ZWE1SV is stopped successfully.

#>
```

## Starting and stopping Zowe main server `ZWESLSTC` on z/OS manually

To start Zowe main server, you can issue `S ZWESLSTC` command. Same as normal JES `S` command, you can customize `JOBNAME`. For example, `S ZWESLSTC,JOBNAME=ZWE1SV`.

If you have Zowe high availability instance defined and want to start a specific HA instance, for example `myinst1`, you can pass with `HAINST` parameter. Here is an example: `S ZWESLSTC,HAINST=myinst1,JOBNAME=ZWE1SV1`. Zowe high availability instance name is case insensitive. `HAINST=myinst1` and `HAINST=MYINST1` are same.

If you are starting Zowe high availability instance for another LPAR in the Sysplex, you can use `ROUTE` command to route the `S` command to the target system. For example, I'm working on SYSNAME `LPAR1` and want to start HA instance `myinst2` on `LPAR2`, you can issue `RO LPAR2,S ZWESLSTC,HAINST=myinst2,JOBNAME=ZWE1SV2`.

To stop Zowe main server, you can issue `P <jobname>` command.

:::caution

With Zowe version 1, you can issue `C` command to stop Zowe main server. This is not supported in version 2 anymore. A `P` command is required to make sure Zowe components can be shuted down properly.

:::

## Stopping and starting a Zowe component without restarting Zowe main server

You can restart a Zowe component with JES modify command without restarting the whole Zowe main server. You need to know these information before issuing the modify command:

- Your Zowe main server job name. By default, it is configured as `ZWE1SV`. You can find your customized value by checking `zowe.job.name` defined in Zowe configuration file.
- The component name you want to stop or start. You can find a full list of installed components by listing `<RUNTIME>/components` directory and Zowe extension directory.

To stop a running Zowe component, issue `F <zowe-job>,APPL=STOP(<component-name>)` command. For example, if you want to stop `app-server`, issue `F ZWE1SV,APPL=STOP(app-server)`.

To start a stopped Zowe component, issue `F <zowe-job>,APPL=START(<component-name>)` command. For example, if you want to start `app-server`, issue `F ZWE1SV,APPL=START(app-server)`.

**Note**, please be aware that not all components can be restarted with this method. Some components may rely on another and you may need to restart affected components as well.
