# zwe support

[zwe](.././zwe.md) > [support](./zwe-support.md)

	zwe support [sub-command [sub-command]...] [parameter [parameter]...]

## Sub-commands

* [verify-fingerprints](./zwe-support-verify-fingerprints.md)

## Description

Collect and package Zowe runtime information for support purpose.

This command will collect these information:

- Environment
  * z/OS version
  * Java version
    * Java keytool TLS information
  * Node.js version
  * zOSMF status
  * External Security Manager
  * CEE Runtime Options
  * Filesystem flags
  * ZSS Program Controlled extended attribute
- Zowe configurations
  * Zowe manifest.json
  * Zowe configuration file
  * Zowe installation logs
  * Zowe PKCS#12 keystore if used
  * Zowe temporary configuration files under "`zowe.workspaceDirectory`/.env"
  * Zowe APIML static registration files under "`zowe.workspaceDirectory`/api-mediation/api-defs"
- Zowe runtime
  * Active running Zowe processes
- Zowe fingerprints and validation result


## Examples

```
zwe support -c /path/to/zowe.yaml

zwe support -c /path/to/zowe.yaml --target-dir /path/to/save/support/results

zwe support --config 'FILE(/path/to/zowe.yaml):PARMLIB(ZOWE.PARMLIB(ZWEYAML))'

```

## Parameters

Full name|Alias|Type|Required|Help message
|---|---|---|---|---
--target-dir||string|no|Target directory where the support package will be created. If it is not specified, system temporary directory will be used.


### Inherited from parent command

Full name|Alias|Type|Required|Help message
|---|---|---|---|---
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
ZWEL0150E|150|Failed to find file %s. Zowe runtimeDirectory is invalid.
ZWEL0151E|151|Failed to create temporary file %s. Please check permission or volume free space.
ZWEL0322E|322|%s is not a valid directory.


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
