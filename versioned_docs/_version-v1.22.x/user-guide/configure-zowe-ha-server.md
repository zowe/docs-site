# Installing and starting the Zowe high availability started task (ZWESLSTC)

Zowe has a number of runtimes on z/OS: the z/OS Service microservice server, the Zowe Application Server, and the Zowe API Mediation Layer microservices. In a high availability environment, a single PROCLIB member `ZWESLSTC` is used to start multiple instances of a same component. This member is installed by Zowe into the SAMPLIB data set `SZWESAMP` during the installation from either a convenience build or an SMP/E build.

This topic describes how to configure the z/OS runtime in order to launch Zowe for high availability instances. You can do these manually (as described in this topic) or use script to install and configure the Zowe launcher server. See [Installing and Configuring Zowe z/OS components using scripts](scripted-configure-server.md#zowe-z-os-components).

## Step 1: Copy the PROCLIB member ZWESLSTC

Zowe high availability instances are run under a z/OS started task with the PROCLIB member named `ZWESLSTC`. A sample PROCLIB member is created during installation into the PDS `SZWESAMP(ZWESLSTC)`. To launch high availability instances as a started task, you must copy this member to a PDS that is in the PROCLIB concatenation path. 

## Step 2: Configure ZWESLSTC to run under the correct user ID

`ZWESLSTC` should be configured as a started task under the `ZWESVUSR `user ID with the administrator user ID of `ZWEADMIN`. If you do not have these IDs already created, you can find the commands to create the user ID and group in the PDS member `ZWESECUR`. See [Configuring the z/OS system for Zowe](configure-zos-system.md). To associate the `ZWESLSTC` started task with the user ID and group, see [Configuring a z/OS system for Zowe](configure-zos-system.md). This step is done once per z/OS environment by a system programmer who has sufficient security privileges. 

## Step 3: Launch the ZWESLSTC started task

You launch the ZWESLSTC started task with the z/OS START command. 

### Before you begin 

Before starting ZWESLSTC, you need to perform the following steps in PROCLIB member `ZWESLSTC`:

1. Set the parameter `INSTANCE_DIR` to the location (fully qualified path) of the Zowe instance directory that contains the `zowe.yaml` configuration file.
2. Update the STEPLIB DD statement with the location of the load library that contains the load module `ZWELNCH`.

### Procedure

You can start Zowe high availability instances by issuing the command `S ZWESLSTC` in SDSF. When you issue `S ZWESLSTC`, you must specify which high availability instance you want to launch by adding the `HAINST` parameter on the START command: 

```
S ZWESLSTC,HAINST=<ha-instance-id>
```

where, the `ha-instance-id` argument is the high availability instance ID that is defined in the `haInstances` section of the `zowe.yaml` configuration file. To learn more about `zowe.yaml`, see the [Updating the zowe.yaml configuration file](configure-instance-directory.md) section.

This command enables you to start multiple instances of a same component, which eliminates single point of failure to ensure continuous operation of Zowe components.

- If you want to have more than one Zowe high availability instance running concurrently, use the optional parameter `JOBNAME` with the START command to distinguish the Zowe high availability instances from each other.

   ```
   S ZWESLSTC,HAINST=<ha-instance-id>,JOBNAME=<instance-job-name>
   ```

- Zowe Launcher also enables you to restart a specific component of a high availability instance by using z/OS MODIFY command:

   ```
   F ZWESLSTC,APPL=START(<ha-component-name>)
   ```
   
   where, the `ha-component-name` argument is the high availability instance component that is defined in the `components` section of `zowe.yaml` configuration file. To learn more about `zowe.yaml`, see the [Updating the zowe.yaml configuration file](configure-instance-directory.md) section.

- If you specified the `JOBNAME=` parameter on the START command, the `instance-job-name` can be used with MODIFY command to restart a specific component:

   ```
   F <instance-job-name>,APPL=START(<ha-component-name>)
   ```

### Next steps

To check whether the ZWESLSTC started task has successfully launched, see [Troubleshooting installation and startup of Zowe z/OS components](../troubleshoot/troubleshoot-zos.md) for instructions. 
