# zwe components upgrade

[zwe](./.././zwe) > [components](././zwe-components) > [upgrade](./zwe-components-upgrade)

	zwe components upgrade [parameter [parameter]...]

## Description

Upgrade a Zowe component from a Zowe package registry when given a component name or "all" to upgrade all components.
The upgrade will only be performed if a Zowe package registry is configured.


## Examples

```
zwe components install -c /path/to/zowe.yaml -o /path/to/component/package

zwe components install extract -c /path/to/zowe.yaml -o /path/to/component/package

```

## Parameters

Full name|Alias|Type|Required|Help message
|---|---|---|---|---
--component-file,--component|-o|string|yes|Either a path or component name. The path must be to a component package or directory. If a name is specified instead, install checks the zowe package registry.
--registry|-r|string|no|Specifies the registry to search within instead of the default. The registry must be compatible with the manager used.
--handler||string|no|Specifies the registry handler name used with the package registry, instead of the default. The handler must be compatible with the registry used.
--dry-run|-d|boolean|no|Whether or not to perform the upgrade versus just checking if an upgrade is available

### Inherited from parent command

Full name|Alias|Type|Required|Help message
|---|---|---|---|---
--help|-h|boolean|no|Display this help.
--debug,--verbose|-v|boolean|no|Enable verbose mode.
--trace|-vv|boolean|no|Enable trace level debug mode.
--silent|-s|boolean|no|Do not display messages to standard output.
--log-dir,--log|-l|string|no|Write logs to this directory.
--config|-c|string|no|Path to Zowe configuration zowe.yaml file.
--configmgr||boolean|no|Enable use of configmgr capabilities.


## Errors

Error code|Exit code|Error message
|---|---|---
ZWEL0156E|156|Component name is not initialized after extract step.
ZWEL0180E|180|Zowe extension directory (zowe.extensionDirectory) is not defined in Zowe YAML configuration file.
ZWEL0304E|304|Handler install failure, cannot continue.
ZWEL0305E|305|Could not find one of the components' directories.


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
ZWEL0200E||Failed to copy USS file %s to MVS data set %s.
ZWEL0201E||File %s does not exist.
ZWEL0202E||Unable to find samplib key for %s.
ZWEL0203E||Env value in key-value pair %s has not been defined.
ZWEL0316E||Command requires zowe.useConfigmgr=true to use.