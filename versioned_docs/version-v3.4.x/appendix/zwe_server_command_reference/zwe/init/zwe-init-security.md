# zwe init security

[zwe](./.././zwe.md) > [init](././zwe-init.md) > [security](./zwe-init-security.md)

	zwe init security [parameter [parameter]...]

## Description

This command will run JCL based on the security product:
  - (If RACF) ZWEIRAC
  - (If TSS) ZWEITSS
  - (If ACF2) ZWEIACF

NOTE: You require proper permission to run security configuration.

These Zowe YAML configurations showing with sample values are used:

```yaml
zowe:
  setup:
    jcl:
      header: "123456"
    dataset:
      prefix: IBMUSER.ZWE
      jcllib: IBMUSER.ZWE.CUST.JCLLIB
    security:
      product: RACF
      groups:
        admin: ZWEADMIN
        stc: ZWEADMIN
        sysProg: ZWEADMIN
      users:
        zowe: ZWESVUSR
        zis: ZWESIUSR
      stcs:
        zowe: ZWESLSTC
        zis: ZWESISTC
        aux: ZWESASTC
```

- `zowe.setup.jcl.header` is optional additional JCL fields used for submitting JCLs.
- `zowe.setup.dataset.prefix` shows where the `SZWESAMP` data set is installed,
- `zowe.setup.dataset.jcllib` is the custom JCL library. Zowe will create customized
  ZWESECUR JCL here before applying it.
- `zowe.setup.security.product` is security product. Can be `RACF`, `ACF2`, or 
  `TSS`. This configuration is optional. Default value is `RACF`.
- `zowe.setup.security.groups.admin` is the group for Zowe administrators.
  This configuration is optional. Default value is `ZWEADMIN`.
- `zowe.setup.security.groups.stc` is the group for Zowe started tasks.
  This configuration is optional. Default value is `ZWEADMIN`.
- `zowe.setup.security.groups.sysProg` is system programmer user ID/group.
  This configuration is optional. Default value is `ZWEADMIN`.
- `zowe.setup.security.users.zowe` is the userid for Zowe started task.
  This configuration is optional. Default value is `ZWESVUSR`.
- `zowe.setup.security.users.zis` is userid for ZIS started task.
  This configuration is optional. Default value is `ZWESIUSR`.
- `zowe.setup.security.stcs.zowe` is Zowe started task name.
  This configuration is optional. Default value is `ZWESLSTC`.
- `zowe.setup.security.stcs.zis` is ZIS started task name.
  This configuration is optional. Default value is `ZWESISTC`.
- `zowe.setup.security.stcs.aux` is ZIS auxiliary started task name.
  This configuration is optional. Default value is `ZWESASTC`.


## Examples

```
zwe init security -v -c /path/to/zowe.yaml
zwe init security -v -c /path/to/zowe.yaml --generate

```

## Parameters

Full name|Alias|Type|Required|Help message
|---|---|---|---|---
--security-dry-run,--dry-run||boolean|no|Generates and prints JCL but does not execute.
--ignore-security-failures||boolean|no|Whether to ignore security setup job failures.
--generate||boolean|no|Whether to force rebuild of JCL prior to submission. Use this when you've changed zowe.yaml and are re-submitting this command.
--update-config||boolean|no|Whether to update YAML configuration for zowe.setup.security.product to match detected External Security Manager.


### Inherited from parent command

Full name|Alias|Type|Required|Help message
|---|---|---|---|---
--allow-overwrite,--allow-overwritten||boolean|no|Allow overwritten existing MVS data set.
--skip-security-setup||boolean|no|Whether to skip security related setup.
--security-dry-run,--dry-run||boolean|no|Generates JCL or displays actions to be taken on the system without modifying the system.
--ignore-security-failures||boolean|no|Whether to ignore security setup job failures.
--update-config||boolean|no|Whether to update YAML configuration file with initialization result.
--jcl||boolean|no|Generates and submits JCL to drive the init command, rather than using USS utilities.
--help|-h|boolean|no|Display this help.
--debug,--verbose|-v|boolean|no|Enable verbose mode.
--trace|-vv|boolean|no|Enable trace level debug mode.
--silent|-s|boolean|no|Do not display messages to standard output.
--log-dir,--log|-l|string|no|Write logs to this directory.
--config|-c|string|no|Path to Zowe configuration zowe.yaml file.
--configmgr||boolean|no|Deprecated. This behavior is always enabled.


## Errors

Error code|Exit code|Error message
|---|---|---
ZWEL0159E|159|Failed to modify %s.
ZWEL0161E|161|Failed to run JCL %s.
ZWEL0162E|162|Failed to find job %s result.
ZWEL0163E|163|Job %s ends with code %s.
ZWEL0163W||Job %s ends with code %s.
ZWEL0319E|319|zowe.setup.dataset.jcllib does not exist, cannot run. Run 'zwe init', 'zwe init generate', or submit JCL zowe.setup.dataset.prefix.SZWESAMP(ZWEGENER) before running this command.
ZWEL0326E|326|An error occurred while processing Zowe YAML config %s:


### Inherited from parent command

Error code|Exit code|Error message
|---|---|---
||100|If the user pass `--help` or `-h` parameter, the zwe command always exits with `100` code.
ZWEL0064E|64|failed to run command os.pipe - Cannot start component %s
ZWEL0101E|101|ZWE_zowe_runtimeDirectory is not defined.
ZWEL0102E|102|Invalid parameter %s. %s
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
ZWEL0115E|115|This command was submitted with FILE() or PARMLIB() syntax, which is only supported when JCL is also enabled.
ZWEL0116E|116|Could not delete existing dataset: %s
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
ZWEL0144E|144|Cannot generate JCL with a header line greater than 80 characters. Line in error: %s. Please adjust this line in 'zowe.setup.jcl.header'.
ZWEL0151E|151|Failed to create temporary file %s. Please check permission or volume free space.
ZWEL0157E|157|%s (%s) is not defined in Zowe YAML configuration file.
ZWEL0158W||Failed to find job %s result.
ZWEL0159E|159|Failed to modify %s.
ZWEL0160W||Failed to run JCL %s.
ZWEL0160E|160|Failed to write to %s. Please check if target data set is opened by others.
ZWEL0161E|161|Failed to run JCL %s.
ZWEL0162E|162|Failed to find job %s result.
ZWEL0163E|163|Job %s ends with code %s.
ZWEL0164W||Job %s(%s) ends with code %s (%s).
ZWEL0172E||Component %s has %s defined but the file is missing.
ZWEL0173E|173|Please enter an IP address in either the subject alternative name (zowe.setup.certificate.san) or external domain (zowe.externalDomains) in the Zowe YAML configuration file.
ZWEL0200E||Failed to copy USS file %s to MVS data set %s.
ZWEL0201E||File %s does not exist.
ZWEL0202E||Unable to find samplib key for %s.
ZWEL0203E||Env value in key-value pair %s has not been defined.
ZWEL0300W||%s already exists. This %s will be overwritten.
ZWEL0301W||%s already exists and will not be overwritten. For upgrades, you must use --allow-overwrite.
ZWEL0316E|316|Invalid PARMLIB format %s.
ZWEL0322E|322|%s is not a valid directory.
ZWEL0326E|326|An error occurred while processing Zowe YAML config %s:
