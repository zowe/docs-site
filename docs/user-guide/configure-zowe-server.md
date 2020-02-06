# Installing the Zowe started task (ZWESVSTC)

Zowe has a number of runtimes on z/OS: the z/OS Service microservice server, the Zowe Application Server, and the Zowe API Mediation Layer microservices. A single PROCLIB `ZWESVSTC` is used to start all of these microservices.  This member is installed by Zowe into the data set SAMPLIB `SZWESAMP` during the installation or either a convenience build or SMP/E.  This topic describes how to configure the z/OS runtime in order to launch the Zowe started task.

## Step 1: Copy the PROCLIB member ZWESVSTC

When the Zowe runtime is launched, it is run under a z/OS started task (STC) with the PROCLIB member named `ZWESVSTC`. A sample PROCLIB is created during installation into the PDS SZWESAMP. To launch Zowe as a started task, you must copy the member `ZWESVSTC` to a PDS that is in the proclib concatenation path. 

If your site has your own technique for PROCLIB creation, you may follow this and copy the `ZWESVSTC` as-is.  If you want to create a pipeline or automate the PROCLIB copying, you can use a convenience script `zowe-install-proc.sh` that is provided in the `<ROOT_DIR>/scripts/utils` folder. 

The script `zowe-install-proc.sh` has two arguments:

- **First Parameter**=Source PDS Prefix

   Dataset prefix of the source PDS where `.SZWESAMP(ZWESVSTC)` was installed into.  

   For an installation from a convenience build, this will be the value of the `-h` argument when `zowe-install.sh` was executed.

   For an SMP/E installation, this will be the value of `$datasetPrefixIn` in the member `AZWE001.F1(ZWE3ALOC)`.

- **Second Parameter**=Target PROCLIB PDS
   
   Target PROCLIB PDS where ZWESVSTC will be placed. If parameter is omitted, the script scans the JES PROCLIB concatenation path and uses the first dataset where the user has write access
   
   **Example**

   Executing the command `zowe-install-proc.sh MYUSERID.ZWE USER.PROCLIB` copies the PDS member `MYUSERID.ZWE.SZWESAMP(ZWESVSTC)` to `USER.PROCLIB(ZSWESAMP)`

## Step 2: Configure ZWESVSTC to run under the correct user ID

The `ZWESVSTC` must be configured as a started task (STC) under the ZWESVUSR user ID with the administrator user ID of ZWEADMIN.  The commands to create the user ID and group is supplied in the PDS member `ZWESECUR`, see [Configuring the z/OS system for Zowe](configure-zos-system.md).  To associate the `ZWESVSTC` started task with the user ID and group see [Configuring a z/OS system for Zowe](configure-zos-system.md).  This step will be done once per z/OS environment by a system programmer who has sufficient security priviledges. 

## Step 3: Launch the ZWESVSTC started task

You can launch the Zowe started task in two ways.  

### Option 1: Starting Zowe from a USS shell

To launch the `ZWESVSTC` started task, run the `zowe-start.sh` script from a USS shell.  This reads the configuration values from the `zowe-instance.env` file in the Zowe instance directory.

```
cd <ZOWE_INSTANCE_DIR>/bin
./zowe-start.sh
```
where,

_<ZOWE_INSTANCE_DIR>_ is the directory where you set the instance directory to. This script starts `ZWESVSTC` for you so you do not have to log on to TSO and use SDSF.

### Option 2: Starting Zowe with a `/S` TSO command

You can use SDSF to start Zowe. 

If you issue the SDSF command `/S ZWESVSTC`, it will fail because the script needs to know the instance directory containing the configuration details.  

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

## Stopping the ZWESVSTC PROC

To stop the Zowe server, the ZWESVSTC PROC needs to be ended. Run the `zowe-stop.sh` script at the Unix Systems Services command prompt that is in the zowe instance directory used to start the Zowe started task:

```
cd $ZOWE_INSTANCE_DIR/bin
./zowe-stop.sh
```
where _<ZOWE_INSTANCE_DIR>_ is the directory where you set the instance directory to.

When you stop ZWESVSTC, you might get the following error message:

```
IEE842I ZWESVSTC DUPLICATE NAME FOUND- REENTER COMMAND WITH 'A='
```

This error results when there is more than one started task named ZWESVSTC. To resolve the issue, stop the required ZWESVSTC instance by issuing the following commands:

```
/C ${ZOWE_PREFIX}${ZOWE_INSTANCE}SV,A=asid
```
Where _ZOWE_PREFIX_ and _ZOWE_INSTANCE_ are specified in your configuration (and default to ZWE and 1) and you can obtain the _asid_ from the value of `A=asid` when you issue the following commands:

```
/D A,${ZOWE_PREFIX}${ZOWE_INSTANCE}SV
```