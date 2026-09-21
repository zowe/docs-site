# zwe install

[zwe](././zwe.md) > [install](./zwe-install.md)

	zwe install [parameter [parameter]...]

## Description

After you extract Zowe convenience build, you can run this command to install
MVS data sets.

If you are using SMPE build, you can skip this command since MVS data sets are
already prepared during SMPE install.

## Installation via Shell

These Zowe YAML configurations showing with sample values are used:

```yaml
zowe:
  setup:
    dataset:
      prefix: IBMUSER.ZWE
```

The dataset allocations and copying of members are done in shell script. Only the `prefix` is required:
* Use `zowe.setup.dataset.prefix` in your Zowe YAML
* Or use `--dataset-prefix` parameter
* Note: if `--jcl` is used or if `zowe.setup.jcl.enable` is `true`, `--dataset-prefix` is not supported.
* Note: if both parameters are used, `--dataset-prefix` overrides the value defined in your Zowe YAML

This is the default behavior.

## Installation via JCL

These Zowe YAML configurations showing with sample values are used:

```yaml
zowe:
  setup:
    jcl:
      enable: true
      header: '123456'
    dataset:
      prefix: IBMUSER.ZWE
```

Is done by submitting `ZWEINSTL` job. To use JCL, following updates are required:
* In the yaml configuration:
  * `zowe.setup.jcl.enable=true`
  * `zowe.setup.jcl.header`
  * This customization replaces the template `{zowe.setup.jcl.header}` in `ZWEINSTL` job:
  ```
  //ZWEINSTL JOB {zowe.setup.jcl.header}`
  ```
* Or by additional command line parameter `--jcl`

* Default setting is empty string causing no additional JOB fields will be used - if your site or External Security Manager does not require additional fields, you can skip this
* Otherwise use `zowe.setup.jcl.header` to fill with required fields
* Notes:
  * Configmgr must be enabled (`zowe.useConfigmgr=true`)
  * JCL syntax is not checked by `zwe install` command, however empty lines are filtered out

One line, for example accounting information only:
```yaml
zowe:
  setup:
    jcl:
      header: '123456'
```

Multiple lines in Literal style (the pipe characters starts the block of the JCL statements):
```yaml
zowe:
  setup:
    jcl:
      header: |
        123456,
        //     'Zowe User',"
        //      NOTIFY=&SYSUID"
```

Expected outputs:

- `zowe.setup.dataset.prefix` shows where the datasets will be installed:
  * `SZWEAUTH` contains few Zowe load modules (++PROGRAM).
  * `SZWESAMP` contains several sample configurations.
  * `SZWEEXEC` contains few utilities used by Zowe.
  * `SZWELOAD` contains config manager for REXX.


## Examples

```
zwe install -v -c /path/to/zowe.yaml
zwe install --config "FILE(/path/to/zowe.yaml):PARMLIB(ZOWE.PARM(YAML))" --jcl

```

## Parameters

Full name|Alias|Type|Required|Help message
|---|---|---|---|---
--allow-overwrite,--allow-overwritten||boolean|no|Allow overwritten existing MVS data set.
--jcl||boolean|no|Generates and submits JCL to drive the install, rather than using USS utilities.
--dry-run||boolean|no|Generates and prints JCL but does not execute.
--dataset-prefix,--ds-prefix||string|no|Install Zowe to this dataset prefix. This parameter will not work with '--jcl'.


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
ZWEL0301W||%s already exists and will not be overwritten. For upgrades, you must use --allow-overwrite.
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
