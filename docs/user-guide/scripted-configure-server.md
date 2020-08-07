# Scripted Installation and Configuration of Zowe z/OS components

A Zowe installation creates two PDS sample libraries, `SZWEAUTH` and `SZWESAMPE`.  Before starting the two Zowe started tasks `ZWESVSTC` (for the main Zowe z/OS components), and `ZWESISTC` (for the cross memory server), additional configuration steps are needed.  These are described in the chapter [Installing and starting the Zowe started task (ZWESVSTC)](configure-zowe-server.md) and [Installing and configuring the Zowe cross memory server (ZWESISTC)](configure-xmem-server.md).   

Zowe provides Unix shell scripts to assist with installation and configuration for scenarios where you wish to automate this process, for example if you have a devops pipeline or other repeatable scenario where you are installing and starting a Zowe runtime. These are the same scripts used by the Zowe community themselves for the automated Zowe continuous integration continuous delivery (CICD) pipeline which create Zowe releases.

### Zowe z/OS Components

The script `<ROOT_DIR>/scripts/utils/zowe-install-proc.sh -d <dataSetPrefix> [-r <proclib> -l <log_directory]` has the following parameters:

- **`-d <dataSetPrefix>`** - Source PDS Prefix

   Dataset prefix of the source PDS where `.SZWESAMP(ZWESVSTC)` was installed into.  

   For an installation from a convenience build, this will be the value of the `-h` argument when `zowe-install.sh` was executed.

   For an SMP/E installation, this will be the value of `$datasetPrefixIn` in the member `AZWE001.F1(ZWE3ALOC)`.

- **`-r <proclib>`** - Target PROCLIB PDS (optional)
   
   Target PROCLIB PDS where ZWESVSTC will be placed. If parameter is omitted, the script scans the JES PROCLIB concatenation path and uses the first data set where the user has write access

- **`-l <log_directory>`** - Log directory (optional)

   Overrides the default log output directory of `/global/zowe/logs`, if it is writable, or `~/zowe/logs`.
   
    **Example**

   Executing the command `zowe-install-proc.sh -d MYUSERID.ZWE -r USER.PROCLIB` copies the PDS member `MYUSERID.ZWE.SZWESAMP(ZWESVSTC)` to `USER.PROCLIB(ZWESVSTC)`


### Cross Memory and Auxiliary Server 

The script `<ROOT_DIR>/scripts/utils/zowe-install-xmem.sh -d <dataSetPrefix> [-a <parmlib>] [-r <proclib] [-l <log_directory]` has the following parameters.

- **`-d <dataSetPrefix>`** - Source PDS prefix.
  
  This is the Data set prefix of the source PDS where `.SZWESAMP` was installed into.   

- **`-a <parmlib>`** - Target DSN for PARMLIB (optiona)

  This is the Data set name where the PARMLIB member `ZWESIP00` will be placed. If the parameter is omitted then source data set `SZWESAMP` will be used by the started task PROCLIB `ZWESISTC`.  If `-a` is set then the `EXEC DD PARMLIB=` statement in the JCL PROCLIB `ZWESISTC` will be updated.  

- **`-r <proclib>`** - Target PROCLIB PDS where `ZWESASTC` and `ZWESISTC` will be placed. 

  If the parameter is omitted, then the script scans the JSE PROCLIB concatenation and uses the first data set where the user running the script has write access.  

- **`-l <log_directory>`** - Log directory (optional)

  Overrides the default log output directory of `/global/zowe/logs`, if it is writeable.  If it is not writeable `~/zowe/logs` is used.  

  Example:

  Executing the command `zowe-install-xmem.sh -d MYUSERID.ZWE -a SYS1.PARMLIB -r USER.PROCLIB` copies:

  - the PARMLIB member `MYUSERID.ZWE.SZWESAMP(ZWESIP00)` to `SYS1.PARMLIB(ZWESIP00)`
  - the PROCLIB member `MYUSERID.ZWE.SZWESAMP(ZWESISTC)` to `USER.PROCLIB(ZWESISTC)` and `MYUSERID.ZWESAMP(ZWESASTC)` to `USER.PROCLIB(ZWESASTC)`

The script `zowe-install-xmem.sh` moves and modifies files, but does not perform the steps needed to APF Authorize the PDSE containing the load module `ZWESIS00` and does not enable it to run in key(4) non-swappable.  The steps required to do this are described in [Configure Cross Memory Server APF Authorize](configure-xmem-server.md#apf-authorize) and [Configure Cross Memory Server Key 4 non-swappable](configure-xmem-server.md#key-4-non-swappable).

