# Configuring and launching the Zowe started task

Follow these steps to launch Zowe as a started task.

## Step 1: Copy the PROCLIB member ZWESVSTC

When the Zowe runtime is launched, it is run under a z/OS started task (STC) with the PROCLIB member named `ZWESVSTC`. A sample PROCLIB is created during installation into the PDS SZWESAMP. To launch Zowe as a started task, you must copy the member `ZWESVSTC` to a PDS that is in the proclib concatenation path. 

If your site has your own technique for PROCLIB creation, you may follow this and copy the `ZWESVSTC` as-is.  If you want to create a pipeline or automate the PROCLIB copying, you can use a convenience script `zowe-install-proc.sh` that is provided in the `<ROOT_DIR>/scripts/utils` folder. 

The script `zowe-install-proc.sh` has two arguments:

- **First Parameter**=Source PDS Prefix

   Dataset prefix of the source PDS where `.SZWESAMP(ZWESVSTC)` was installed into.  

   For an installation from a convenience build, this will be the value of the `-h` argument when `zowe-install.sh` was executed.

   For an SMP/E installation, this will be the value of `$datasetPrefixIn` in the member `AZWE001.F1(ZWE3ALOC)`.

- **Second Parameter**=Target PROCLIB PDS

## Configuring ZWESVSTC to run under the correct user ID

The `ZWESVSTC` must be configured as a started task (STC) under the ZWESVUSR user ID with the administrator user ID of ZWEADMIN.  The commands to create the user ID and group is supplied in the PDS member `ZWESECUR`, see [Configuring a z/OS system for Zowe](configure-zos-system.md).  To associate the `ZWESVSTC` started task with the user ID and group see [Configuring a z/OS system for Zowe](configure-zos-system.md).  This step will be done once per z/OS environment by a system programmer who has sufficient security priviledges. 


## Step 2: Launch the Zowe started task

You can launch the Zowe started task in two ways.  

### Starting Zowe from a USS shell

From a USS shell, issue the command `<zowe-instance-dir>/zowe-start.sh` to launch the started task `ZWESVSTC`.  This will read the configuration values from the `zowe-instance.env` file in the zowe instance directory.  

### Starting Zowe with a `/S` TSO command

If you issue the SDSF command `/S ZWESVSETC`, it will fail because the script needs to know the instance directory containing the configuration details.  

If you have a default instance directory you wish you always start Zowe with, you can tailor the JCL member `ZWESVSTC` at this line

```
//ZWESVSTC   PROC INSTANCE='{{instance_directory}}'
```

to replace the `instance_directory` with the location of the Zowe instanceDir that contains the configurable Zowe instance directory. 

If the JCL value `instance-directory` is not specified in the JCL, in order to start the Zowe server from SDSF, you will need to add the `INSTANCE` parameter on the START command when you start Zowe in SDSF:

```
/S ZWESVSTC,INSTANCE='$ZOWE_INSTANCE_DIR',JOBNAME='ZWEXSV'
```

The `JOBNAME='ZWEXSV'` is optional and the started task will operate correctly without it, however having it specified ensures that the address spaces will be prefixed with `ZWEXSV` which makes them easier to find in SDSF or locate in RMF records.  

### Stopping the ZWESVSTC PROC

To stop the Zowe server, the ZWESVSTC PROC needs to be ended. Run the `zowe-stop.sh` script at the Unix Systems Services command prompt that is in the zowe instance directory used to start the Zowe started task:

```
cd $ZOWE_INSTANCE_DIR/bin
./zowe-stop.sh
```

When you stop the ZWESVSTC, you might get the following error message:

```
IEE842I ZWESVSTC DUPLICATE NAME FOUND- REENTER COMMAND WITH 'A='
```

This error results when there is more than one started task named ZWESVSTC. To resolve the issue, stop the required ZWESVSTC instance by issuing the following commands:

```
/C ${ZOWE_PREFIX}${ZOWE_INSTANCE}SV,A=asid
```
You can obtain the _asid_ from the value of `A=asid` when you issue the following commands:

```
/D A,${ZOWE_PREFIX}${ZOWE_INSTANCE}SV
```