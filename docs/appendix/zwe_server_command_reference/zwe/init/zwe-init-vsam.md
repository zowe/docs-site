# zwe init vsam

[zwe](./.././zwe) > [init](././zwe-init) > [vsam](./zwe-init-vsam)

	zwe init vsam [parameter [parameter]...]

## Description

This command will run ZWECSVSM jcl to create VSAM data set for Zowe APIML
Caching Service.

These Zowe YAML configurations showing with sample values are used:

```
zowe:
  setup:
    dataset:
      prefix: IBMUSER.ZWE
      jcllib: IBMUSER.ZWE.CUST.JCLLIB
    vsam:
      mode: NONRLS
      volume: VOL123
      storageClass:
components:
  caching-service:
    storage:
      mode: VSAM
      vsam:
        name: IBMUSER.ZWE.CUST.CACHE2
```

- `zowe.setup.dataset.prefix` shows where the `SZWESAMP` data set is installed,
- `zowe.setup.dataset.jcllib` is the custom JCL library. Zowe will create customized
  ZWESECUR JCL here before applying it.
- `zowe.setup.vsam.mode` indicates whether the VSAM will utilize Record Level
  Sharing (RLS) services or not. Valid value is `RLS` or `NONRLS`.
- `zowe.setup.vsam.volume` indicates the name of volume.
  This field is required if VSAM mode is `NONRLS`.
- `zowe.setup.vsam.storageClass` indicates the name of RLS storage class.
  This field is required if VSAM mode is `RLS`.
- `components.caching-service.storage.mode` indicates what storage Zowe Caching
  Service will use. Only if this value is `VSAM`, this command will try to
  create VSAM data set.
- `components.caching-service.storage.vsam.name` defines the VSAM data set name.


## Examples

```
zwe init vsam -v -c /path/to/zowe.yaml

```

## Parameters

Full name|Alias|Type|Required|Help message
|---|---|---|---|---
--allow-overwrite,--allow-overwritten||boolean|no||Allow overwritten existing MVS data set.
### Inherited from parent command

Full name|Alias|Type|Required|Help message
|---|---|---|---|---
--allow-overwrite,--allow-overwritten||boolean|no||Allow overwritten existing MVS data set.
--skip-security-setup||boolean|no||Whether should skip security related setup.
--security-dry-run||boolean|no||Whether to dry run security related setup.
--ignore-security-failures||boolean|no||Whether to ignore security setup job failures.
--update-config||boolean|no||Whether to update YAML configuration file with initialization result.
--help|-h|boolean|no||Display this help.
--debug,--verbose|-v|boolean|no||Enable verbose mode.
--trace|-vv|boolean|no||Enable trace level debug mode.
--silent|-s|boolean|no||Do not display messages to standard output.
--log-dir,--log|-l|string|no||Write logs to this directory.
--config|-c|string|no||Path to Zowe configuration zowe.yaml file.


## Errors

Error code|Exit code|Error message
|---|---|---
ZWEL0157E|157|%s (%s) is not defined in Zowe YAML configuration file.
ZWEL0300W||%s already exists. This data set member will be overwritten during configuration.
ZWEL0301W||%s already exists and will not be overwritten. For upgrades, you must use --allow-overwrite.
ZWEL0158E|158|%s already exists.
ZWEL0159E|159|Failed to modify %s.
ZWEL0160E|160|Failed to write to %s. Please check if target data set is opened by others.
ZWEL0161E|161|Failed to run JCL %s.
ZWEL0162E|162|Failed to find job %s result.
ZWEL0163E|163|Job %s ends with code %s.
ZWEL0301W|0|Zowe Caching Service is not configured to use VSAM. Command skipped.
### Inherited from parent command

Error code|Exit code|Error message
|---|---|---
||100|If the user pass `--help` or `-h` parameter, the zwe command always exits with `100` code.
ZWEL0101E|101|ZWE_zowe_runtimeDirectory is not defined.
ZWEL0102E|102|Invalid parameter %s.
ZWEL0103E|103|Invalid type of parameter %s.
ZWEL0104E|104|Invalid command %s.
ZWEL0105E|105|The Zowe YAML config file is associated to Zowe runtime "%s", which is not same as where zwe command is located.
ZWEL0106E|106|%s parameter is required.
ZWEL0107E|107|No handler defined for command %s.
ZWEL0108E|108|Zowe YAML config file is required.
ZWEL0109E|109|The Zowe YAML config file specified does not exist.
ZWEL0110E|110|Doesn't have write permission on %s directory.
ZWEL0111E|111|Command aborts with error.
ZWEL0112E|112|Zowe runtime environment must be prepared first with "zwe internal start prepare" command.
ZWEL0114E|114|Reached max retries on allocating random number.
ZWEL0120E|120|This command must run on a z/OS system.
ZWEL0121E|121|Cannot find node. Please define NODE_HOME environment variable.
ZWEL0122E|122|Cannot find java. Please define JAVA_HOME environment variable.
ZWEL0123E|123|This function is only available in Zowe Containerization deployment.
ZWEL0131E|131|Cannot find key %s defined in file %s.
ZWEL0132E|132|No manifest file found in component %s.
ZWEL0133E|133|Data set %s already exists.
ZWEL0134E|134|Failed to find SMS status of data set %s.
ZWEL0135E|135|Failed to find volume of data set %s.
ZWEL0136E|136|Failed to APF authorize data set %s.
ZWEL0137E|137|z/OSMF root certificate authority is not provided (or cannot be detected) with trusting z/OSMF option enabled.
ZWEL0138E|138|Failed to update key %s of file %s.
ZWEL0139E|139|Failed to create directory %s.
ZWEL0140E|140|Failed to translate Zowe configuration (%s).
ZWEL0142E|142|Failed to refresh APIML static registrations.
ZWEL0172E||Component %s has %s defined but the file is missing.
