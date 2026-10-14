# zwe init generate

[zwe](./.././zwe.md) > [init](././zwe-init.md) > [generate](./zwe-init-generate.md)

	zwe init generate [parameter [parameter]...]

## Description

Generate ready to execute JCL samples from zowe.yaml configuration values.

This command executes the job ZWEGENER which copies the JCL templates from Zowe's SZWESAMP dataset, except those not valid for your system ESM, and creates resolved, ready to execute JCL content within the dataset defined by the zowe.yaml property `zowe.setup.dataset.jcllib` (such as `zowe.setup.dataset.prefix` + "CUST.JCLLIB")

For the JOB statement customization, update the zowe.yaml property `zowe.setup.jcl.header`. See examples at the end of this help.

These JCL files can be run by any means desired afterward.
The actions of `zwe init` will run them automatically if desired.
Each `zwe init` action has a `--dry-run` command which will print the value of the particular JCL file used, but not submit it.

This command supports `--security-dry-run` or `--dry-run` when called directly, but not when called on behalf of another `init` operation, as this command is used to create the JCL for all the other init commands and their `--dry-run` options.
For example, if you run `zwe init generate --dry-run`, a dry run of the operation occurs. But if you run `zwe init mvs --dry-run`, `init mvs` requires the JCL to exist, so JCL generation will occur but the `init mvs` JCL will not be submitted afterward.

The following JCL will be created into the jcllib, using the content of the same name from within the SZWESAMP dataset:

Instance dataset creation:
- ZWEIMVS: Creates Zowe instance Parmlib dataset
- ZWERMVS: Removes this dataset
- ZWEIMVS1: Creates Zowe instance ZIS Plugins dataset
- ZWERMVS1: Removes this dataset
- ZWEIMVS2: Creates the `zowe.setup.dataset.authLoadLib` dataset if you have customized its name. This is not recommended, it is best to leave it as default.
- ZWERMVS2: Removes the above customized dataset.

VSAM for caching service creation:
- ZWECSVSM: Creates a VSAM for the caching service
- ZWECSRVS: Removes the VSAM

ZIS APF Authorization:
- ZWEIAPF: An example of how one would APF authorize the ZIS content of Zowe.
- ZWEIAPF2: An example of how one would APF authorize the ZIS content of Zowe.
You may wish to do this step another way.
You can read https://docs.zowe.org/stable/user-guide/apf-authorize-load-library to learn more.

SAF permission setup:
- ZWEIRAC: Sets up SAF permissions for RACF
- ZWEITSS: Sets up SAF permissions for TSS
- ZWEIACF: Sets up SAF permissions for ACF2

SAF permission removal:
- ZWENOSEC: Removes SAF permissions. Has RACF, TSS, ACF2 sections.


Keyring creation:
- ZWEIKRR1: Creates a keyring and certificate for RACF
- ZWEIKRR2: Creates a keyring and connects a certificate for RACF
- ZWEIKRR3: Creates a keyring and imports a certificate for RACF
- ZWEIKRT1: Creates a keyring and certificate for TSS
- ZWEIKRT2: Creates a keyring and connects a certificate for TSS
- ZWEIKRT3: Creates a keyring and imports a certificate for TSS
- ZWEIKRA1: Creates a keyring and certificate for ACF2
- ZWEIKRA2: Creates a keyring and connects a certificate for ACF2
- ZWEIKRA3: Creates a keyring and imports a certificate for ACF2

Keyring removal:
- ZWENOKRR: Removes Zowe's keyring for RACF
- ZWENOKRT: Removes Zowe's keyring for TSS
- ZWENORRA: Removes Zowe's keyring for ACF2

STC job setup:
- ZWEISTC: Copies the STC JCL of Zowe into your proclib
- ZWERSTC: Removes the Zowe STC JCL from the proclib


If you want to use a premade keyring with Zowe, do not run these. These are for Zowe assisting in keyring creation.

The above datasets can be run to set up a Zowe instance.
You can also use `zwe init` or `zwe init` subcommands to have them run automatically.

JCL JOB statement customization:
- Each JOB statement is defined as `//ZWEnnnnn JOB {zowe.setup.jcl.header}`, where `nnnnn` identifies the job
- Default setting is empty string causing no additional JOB fields will be used - if your site or External Security Manager does not require additional fields, you can skip this
- Otherwise you can use `zwe init generate` to set additional JOB fields
- Note: JCL syntax is not checked by `zwe init generate` command, however empty lines are filtered out

One line, for example accounting information only:
```yaml
zowe:
  setup:
    jcl:
      header: '123456'
```

Multiple lines in block literal style, '|-' is preferred as it removes accidental newlines:
```yaml
zowe:
  setup:
    jcl:
      header: |-
        123456,
        //     'Zowe User',"
        //      NOTIFY=&SYSUID"
```


## Examples

```
zwe init generate --config /path/to/zowe.yaml

zwe init generate -c 'PARMLIB(ZOWE.PARMLIB(ZWEYAML))' --dry-run

```

## Parameters

Full name|Alias|Type|Required|Help message
|---|---|---|---|---
--dry-run||boolean|no|Generates and prints JCL but does not execute.


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
ZWEL0143E|143|Cannot find data set member %s. You may need to re-run zwe install.


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
