# Installing and starting the Zowe started task (ZWESVSTC)

Zowe has a number of runtimes on z/OS: the z/OS Service microservice server, the Zowe Application Server, and the Zowe API Mediation Layer microservices. A single PROCLIB `ZWESVSTC` is used to start all of these microservices.  This member is installed by Zowe into the data set SAMPLIB `SZWESAMP` during the installation or either a convenience build or SMP/E.  

This topic describes how to configure the z/OS runtime in order to launch Zowe. You can do these manually (as described in this topic) or use scripts to install and configure the cross memory server (see [Installing and Configuring Zowe z/OS components using scripts](scripted-configure-server.md#zowe-z-os-components).

## Step 1: Copy the PROCLIB member ZWESVSTC

When the Zowe runtime is launched, it is run under a z/OS started task with the PROCLIB member named `ZWESVSTC`. A sample PROCLIB is created during installation into the PDS `SZWESAMP(ZWESVSTC)`. To launch Zowe as a started task, you must copy this member to a PDS that is in the proclib concatenation path. 

## Step 2: Configure ZWESVSTC to run under the correct user ID

The `ZWESVSTC` should be configured as a started task under the `ZWESVUSR `user ID with the administrator user ID of `ZWEADMIN`.  If you do not have these IDs already created, the commands to create the user ID and group are supplied in the PDS member `ZWESECUR`. See [Configuring the z/OS system for Zowe](configure-zos-system.md).  To associate the `ZWESVSTC` started task with the user ID and group, see [Configuring a z/OS system for Zowe](configure-zos-system.md).  This step will be done once per z/OS environment by a system programmer who has sufficient security privileges. 

## Step 3: Launch the ZWESVSTC started task

You can launch the Zowe started task in two ways.  

### Option 1: Starting Zowe from a USS shell

To launch the `ZWESVSTC` started task, run the `zowe-start.sh` script from a USS shell.  This reads the configuration values from the `instance.env` file in the Zowe instance directory.

```
cd <ZOWE_INSTANCE_DIR>/bin
./zowe-start.sh
```
where,

_<ZOWE_INSTANCE_DIR>_ is the directory where you set the instance directory to. This script starts `ZWESVSTC` for you so you do not have to log on to TSO and use SDSF.

### Option 2: Starting Zowe with a `/S` TSO command

You can use SDSF to start Zowe. 

If you issue the SDSF command `/S ZWESVSTC`, it will fail because the script needs to know the instance directory containing the configuration details.  

If you have a default instance directory you want you always start Zowe with, you can tailor the JCL member `ZWESVSTC` at this line

```
//ZWESVSTC   PROC INSTANCE='{{instance_directory}}'
```

to replace the `instance_directory` with the location of the Zowe instance directory that contains the configurable Zowe instance directory. 

If the JCL value `instance-directory` is not specified in the JCL, in order to start the Zowe server from SDSF, you will need to add the `INSTANCE` parameter on the START command when you start Zowe in SDSF:

```
/S ZWESVSTC,INSTANCE='$ZOWE_INSTANCE_DIR',JOBNAME='ZWEXSV'
```

The `JOBNAME='ZWEXSV'` is optional and the started task will operate correctly without it, however having it specified ensures that the address spaces will be prefixed with `ZWEXSV` which makes them easier to find in SDSF or locate in RMF records.