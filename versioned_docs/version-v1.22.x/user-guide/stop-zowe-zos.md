# Stopping the Zowe server started task

Learn how to stop the Zowe server started tasks ZWESVSTC and ZWESLSTC. 

## Stopping the ZWESVSTC started task

To stop the Zowe server, the ZWESVSTC started task needs to be ended. Run the `zowe-stop.sh` script at the Unix Systems Services command prompt that is in the zowe instance directory used to start the Zowe started task:

```
cd $ZOWE_INSTANCE_DIR/bin
./zowe-stop.sh
```
where `ZOWE_INSTANCE_DIR` is the directory where you set the instance directory to.

When you stop ZWESVSTC, you might get the following error message:

```
IEE842I ZWESVSTC DUPLICATE NAME FOUND- REENTER COMMAND WITH 'A='
```

This error occurs when there is more than one started task named ZWESVSTC. To resolve the issue, stop the required ZWESVSTC instance by issuing the following commands:

```
C ${ZOWE_PREFIX}${ZOWE_INSTANCE}SV,A=asid
```

Where `ZOWE_PREFIX` and `ZOWE_INSTANCE` are specified in your configuration (and default to ZWE and 1) and you can obtain the `asid` from the value of `A=asid` when you issue the following commands:

```
D A,${ZOWE_PREFIX}${ZOWE_INSTANCE}SV
```

## Stopping the ZWESLSTC started task

z/OS STOP command is used to terminate the Zowe launcher server (ZWESLSTC) which started the Zowe high availability instance. You can use SDSF to end ZWESLSTC with the following command:

```
P ZWESLSTC
```

The `instance-job-name` specified in the `JOBNAME=` parameter of the Zowe launcher START command can be used to terminate the relevant high availability instance. See [Installing and starting the Zowe high availability started task (ZWESLSTC)](configure-zowe-ha-server.md) for more information.

```
P <instance-job-name>
```

Zowe Launcher also enables you to stop a specific component of a running high availability instance by using the z/OS MODIFY command:

```
F ZWESLSTC,APPL=STOP(<ha-component-name>)
```

The `ha-component-name` argument is the high availability instance component that is defined in the `components` section of the `zowe.yaml` configuration file. To learn more about `zowe.yaml`, see the [Updating the zowe.yaml configuration file](configure-instance-directory.md) section.

The `instance-job-name` specified in the `JOBNAME=` parameter of the Zowe launcher START command can be used to terminate a specific component of a running high availability instance:

```
F <instance-job-name>,APPL=STOP(<ha-component-name>)
```