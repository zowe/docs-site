# zwe certificate pkcs12 create cert

[zwe](./../../.././zwe) > [certificate](./../.././zwe-certificate) > [pkcs12](./.././zwe-certificate-pkcs12) > [create](././zwe-certificate-pkcs12-create) > [cert](./zwe-certificate-pkcs12-create-cert)

	zwe certificate pkcs12 create cert [parameter [parameter]...]

## Description

Create a new  PKCS12 format certificate.


### Inherited from parent command

WARNING: This command is for experimental purposes and could be changed in the future releases.

## Examples

```
zwe certificate pkcs12 create cert -d /path/to/my/keystore/dir -a cert-alias -p cert-keystore-password -k keystore-name --ca-alias ca-alias --ca-password ca-keystore-password

```

## Parameters

Full name|Alias|Type|Required|Help message
|---|---|---|---|---
--allow-overwrite,--allow-overwritten||boolean|no||Allow overwritten existing MVS data set.
--keystore|-k|string|yes||PKCS12 keystore name.
--alias|-a|string|yes||Certificate alias name.
--password|-p|string|yes||Password of the certificate keystore.
--common-name|-cn|string|no||Common name of certificate.
--domains|-d|string|no||Domain list of certificate Subject Alternative Name (SAN).
--ca-alias||string|yes||Alias name of the certificate authority which is used to sign CSR.
--ca-password||string|yes||Password of the certificate authority keystore which is used to sign CSR.
--org-unit||string|no||Organization unit of certificate.
--org||string|no||Organization of certificate.
--locality||string|no||Locality of certificate.
--state||string|no||State of certificate.
--country||string|no||Country of certificate.
--validity||string|no||Validity days of certificate.
--key-usage||string|no||Key usage of certificate.
--extended-key-usage||string|no||Extended key usage of certificate.
### Inherited from parent command

Full name|Alias|Type|Required|Help message
|---|---|---|---|---
--keystore-dir|-d|string|yes||Keystore directory.
--help|-h|boolean|no||Display this help.
--debug,--verbose|-v|boolean|no||Enable verbose mode.
--trace|-vv|boolean|no||Enable trace level debug mode.
--silent|-s|boolean|no||Do not display messages to standard output.
--log-dir,--log|-l|string|no||Write logs to this directory.
--config|-c|string|no||Path to Zowe configuration zowe.yaml file.
--configmgr||boolean|no||(Experimental, WIP)Enable use of configmgr capabilities.


## Errors

Error code|Exit code|Error message
|---|---|---
ZWEL0300W||%s already exists. This %s will be overwritten during configuration.
ZWEL0158E|158|%s already exists.
ZWEL0169E|169|Failed to create certificate "%s".
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
