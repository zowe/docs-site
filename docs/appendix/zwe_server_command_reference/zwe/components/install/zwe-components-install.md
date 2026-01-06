# zwe components install

[zwe](../.././zwe.md) > [components](.././zwe-components.md) > [install](./zwe-components-install.md)

	zwe components install [sub-command [sub-command]...] [parameter [parameter]...]

## Sub-commands

* [extract](./zwe-components-install-extract.md)
* [process-hook](./zwe-components-install-process-hook.md)

## Description

Install a Zowe component, given a component archive, component directory, or component name.
When a component name is given instead of a path, the installation will be performed against a Zowe package registry if one is configured.
Archives can be in the .tar, .zip, or pax format where a component is at the root of the archive.

Components are the packaging standard of Zowe.
Zowe has core Components, but extensions are also delivered as Components.
You can read more about them here:
https://docs.zowe.org/stable/extend/packaging-zos-extensions/

**IMPORTANT NOTES**, by default, this command will enable the component globally
                     by modifying your YAML configuration. You can pass
                     `--skip-enable` to disable this behavior.


## Examples

```
zwe components install -c /path/to/zowe.yaml -o /path/to/component/package

zwe components install extract -c /path/to/zowe.yaml -o /path/to/component/package

```

## Parameters only for this command

Full name|Alias|Type|Required|Help message
|---|---|---|---|---
--component-file,--component|-o|string|yes|Either a path or component name. The path must be to a component package or directory. If a name is specified instead, install checks the zowe package registry.
--auto-encoding|-e|string|no|If we want to automatically tagging the module files.
--skip-enable||boolean|no|Install component without enabling it for use.
--registry|-r|string|no|Specifies the registry to searh within instead of the default. The registry must be compatible with the manager used.
--handler||string|no|Specifies the registry handler name used with the package registry, instead of the default. The handler must be compatible with the registry used.


## Parameters



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
ZWEL0156E|156|Component name is not initialized after extract step.
ZWEL0304E|304|Handler install failure, cannot continue.
ZWEL0305E|305|Could not find one of the components' directories.
ZWEL0314E|314|Cannot install with component=all. This option only exists for upgrade.
ZWEL0315E|315|Handler (-handler or zowe.extensionRegistry.defaultHandler) required but not specified.

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
