# Installing and starting the Zowe high availability started task (ZWESLSTC)

Zowe has a number of runtimes on z/OS: the z/OS Service microservice server, the Zowe Application Server, and the Zowe API Mediation Layer microservices. In a high availability environment, a single PROCLIB member `ZWESLSTC` is used to start multiple instances of a same component. This member is installed by Zowe into the SAMPLIB data set `SZWESAMP` during the installation either a convenience build or SMP/E.

This topic describes how to configure the z/OS runtime in order to launch Zowe for high availability instances. You can do these manually (as described in this topic) or use script to install and configure the Zowe launcher server. see [Installing and Configuring Zowe z/OS components using scripts](scripted-configure-server.md#zowe-z-os-components).

## Step 1: Copy the PROCLIB member ZWESLSTC

Zowe high available instances are run under a z/OS started task with the PROCLIB member named `ZWESLSTC`. A sample PROCLIB member is created during installation into the PDS `SZWESAMP(ZWESLSTC)`. To launch high available instances as a started task, you must copy this member to a PDS that is in the PROCLIB concatenation path. 

## Step 2: Configure ZWESLSTC to run under the correct user ID

The `ZWESLSTC` should be configured as a started task under the `ZWESVUSR `user ID with the administrator user ID of `ZWEADMIN`. If you do not have these IDs already created, the commands to create the user ID and group are supplied in the PDS member `ZWESECUR`. See [Configuring the z/OS system for Zowe](configure-zos-system.md). To associate the `ZWESLSTC` started task with the user ID and group, see [Configuring a z/OS system for Zowe](configure-zos-system.md). This step will be done once per z/OS environment by a system programmer who has sufficient security privileges. 

## Step 3: Launch the ZWESLSTC started task

You can launch the Zowe started task with the z/OS START command. To see whether the started task has successfully launched see [Troubleshooting installation and startup of Zowe z/OS components](../troubleshoot/troubleshoot-zos.md)

You can use SDSF to issue command `S ZWESLSTC` to start multiple high available instances. 

If you issue the SDSF command `S ZWESLSTC`, the JCL will need to know which high available instance is going to be launched. To do this add the `HAINST` parameter on the START command when you start Zowe in SDSF:

```
S ZWESLSTC,HAINST=<ha-instance-id>
```

The `ha-instance-id` argument is the high available instance ID that is defined in `haInstances` optional section of `zowe.yaml` configuration file. To learn more about `zowe.yaml`, see [Reviewing the zowe.yaml file](configure-instance-directory.md) section.

This command enables you to start multiple instances of a same component which eliminate single points of failure to ensure continuous Zowe components operations.

If you intend to have more than one Zowe high available instance running concurrently, You can use the optional parameter `JOBNAME` with the START command to distinguish the Zowe high available instances from each other.

```
S ZWESLSTC,HAINST=<ha-instance-id>,JOBNAME=<instance-job-name>
```

In PROCLIB member `ZWESLSTC`, you need to perform the following steps before starting ZWESLSTC:

1. Set parameter `INSTANCE_DIR` to the location (fully qualified path) of the Zowe instance directory that contains the `zowe.yaml` configuration file.
2. Update the STEPLIB DD statement with the location of the load library that contains the load module `ZWELNCH`.

Zowe Launcher also enables you to restart a specific component of a high available instance by using z/OS MODIFY command:

```
F ZWESLSTC,APPL=START(<ha-component-name>)
```

The `ha-component-name` argument is the high available instance component that is defined in `components` section of `zowe.yaml` configuration file. To learn more about `zowe.yaml`, see [Reviewing the zowe.yaml file](configure-instance-directory.md) section.

If you specified the JOBNAME= parameter on the START command, the `instance-job-name` can be used with MODIFY command to restart a specific component:

```
F <instance-job-name>,APPL=START(<ha-component-name>)
```