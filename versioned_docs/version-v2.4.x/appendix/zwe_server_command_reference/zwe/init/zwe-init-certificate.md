# zwe init certificate

[zwe](./.././zwe) > [init](././zwe-init) > [certificate](./zwe-init-certificate)

	zwe init certificate [parameter [parameter]...]

## Description

This command will generate certificate used by Zowe services.

If you specify `--update-config` with this command, these configurations could
be written back to your Zowe YAML configuration file:

- `zowe.certificate` based on your `zowe.setup.certificate` configuration.

These Zowe YAML configurations showing with sample values are used:

```
zowe:
  setup:
    dataset:
      prefix: IBMUSER.ZWE
      jcllib: IBMUSER.ZWE.CUST.JCLLIB
    security:
      product: RACF
      groups:
        admin: ZWEADMIN
      users:
        zowe: ZWESVUSR
    certificate:
      type: PKCS12
      dname:
        caCommonName:
        commonName:
        orgUnit:
        org:
        locality:
        state:
        country:
      validity: 3650
      pkcs12:
        directory: /global/zowe/keystore
        lock: true
        name: localhost
        password: password
        caAlias: local_ca
        caPassword: local_ca_password
        import:
          keystore:
          password:
          alias:
      keyring:
        owner:
        name: ZoweKeyring
        label: localhost
        caLabel: localca
        import:
          dsName:
          password:
        connect:
          user:
          label:
        zOSMF:
          ca:
          user: IZUSVR
      san:
        - zos.my-company.com
        - internal-lpar1.zos.my-company.com
        - internal-lpar2.zos.my-company.com
        - internal-lpar3.zos.my-company.com
      importCertificateAuthorities:
        - 
  externalDomains:
   - zos.my-company.com
  verifyCertificates: STRICT
zOSMF:
  host: zosmf.my-company.com
  port: 443
```

- `zowe.setup.certificate.type` is the type of certificate. Valid values are
  "PKCS12" (USS keystore) or "JCERACFKS" (z/OS keyring).
- `zowe.setup.certificate.dname` is the distinguished name of the certificate.
  You can define `caCommonName`, `commonName`, `orgUnit`, `org`, `locality`,
  `state`, and / or `country`. These configurations are optional.
- `zowe.setup.certificate.validity` is the validity days of the certificate.
  This is optional.
- `zowe.setup.certificate.san` is the `Subject Alternative Name`(s) of the
  certificate if they are different from `zowe.externalDomains`. Please note,
  for `JCERACFKS`` type, with limitation of RACDCERT command, this should
  contain exact one hostname (domain) and one IP address.
- `zowe.setup.certificate.importCertificateAuthorities` is the list of
  certificate authorities will be imported to Zowe PKCS12 keystore or JCERACFKS
  keyring. Please note, for JCERACFKS type, only maximum 2 CAs is supported.
  If you are using `PKCS12` certificate, this should be USS files in PEM format.
  If you are using `JCERACFKS` certificate, this should be certificate labels
  on the z/OS system.
- `zOSMF.host` and `zOSMF.port` is the z/OSMF service information. This is
  required if you are using z/OSMF as authentication service.
- `zowe.verifyCertificates` indicates how Zowe should validate the certificate
  of services registered under Zowe APIML. Valid values are "STRICT",
  "NONSTRICT" or "DISABLED". If this is "STRICT", this command will try to
  validate the z/OSMF service certificate if z/OSMF is defined.

**For `PKCS12` certificate users,**

- `zowe.setup.certificate.pkcs12.directory` is the directory where you plan to
  store the PKCS12 keystore and truststore. This is required if
  `zowe.setup.certificate.type` is `PKCS12`.
- `zowe.setup.certificate.pkcs12.lock` is a boolean configuration to tell if we
  should lock the PKCS12 keystore directory only for Zowe runtime user and group.
  Default value is true.
- `zowe.setup.security.groups.admin` and `zowe.setup.security.users.zowe` will
  be the default owner of keystore directory.
- You can also define `name`, `password`, `caAlias` and `caPassword` under
  `zowe.setup.certificate.pkcs12` to customized keystore and truststore. These
  configurations are optional, but it is recommended to update them from
  default values.
- Define `zowe.setup.certificate.pkcs12.import.keystore` if you already acquired
  certificate from other CA, stored them in PKCS12 format, and want to import
  into Zowe PKCS12 keystore.
- `zowe.setup.certificate.pkcs12.import.password` is the password for keystore
  defined in `zowe.setup.certificate.pkcs12.import.keystore`.
- `zowe.setup.certificate.pkcs12.import.alias` is the original certificate alias
  defined in `zowe.setup.certificate.pkcs12.import.keystore`. After imported,
  the certificate will be saved as alias specified in
  `zowe.setup.certificate.pkcs12.name`.

**For `JCERACFKS` certificate (z/OS keyring) users,**

- `zowe.setup.certificate.keyring.owner` is the keyring owner. It's optional and
  default value is `zowe.setup.security.users.zowe`. If it's also not defined,
  the default value is `ZWESVUSR`.
- `zowe.setup.certificate.keyring.name` is the keyring name will be created
  on z/OS. This is required if `zowe.setup.certificate.type` is `JCERACFKS`.
- If you want to let Zowe to generate new certificate,
  * You can also customize `label` and `caLabel` under
    `zowe.setup.certificate.keyring` if you want to generate new certificate.
    Default value of `label` is `localhost` and default value of `caLabel` is
    `localca`.
- If you want to import certificate stored in MVS data set into Zowe keyring,
  * `zowe.setup.certificate.keyring.connect.dsName` is required in this case. It
    tells Zowe the data set where the certificate stored.
  * `zowe.setup.certificate.keyring.connect.password` is the password when
    importing the certificate.
  * The certificate will be imported with label defined in
    `zowe.setup.certificate.keyring.label`.
- If you want to connect existing certificate into Zowe keyring,
  * `zowe.setup.certificate.keyring.connect.user` is required and tells Zowe
    the owner of existing certificate. This field can have value of `SITE`.
  * `zowe.setup.certificate.keyring.connect.label` is also required and tells
    Zowe the label of existing certificate.
- If `zowe.verifyCertificates` is not `DISABLED`, and z/OSMF host (`zOSMF.host`)
  is provided, Zowe will try to trust z/OSMF certificate.
  * If you are using `RACF` security manager, Zowe will try to automatically
    detect the z/OSMF CA based on certificate owner specified by
    `zowe.setup.certificate.keyring.zOSMF.user`. Default value of this field is
    `IZUSVR`. If the automatic detection failed, you will need to define
    `zowe.setup.certificate.keyring.zOSMF.ca` indicates what is the label of
    z/OSMF root certificate authority.
  * If you are using `ACF2` or `TSS` (Top Secret) security manager,
    `zowe.setup.certificate.keyring.zOSMF.ca` is required to indicates what is
    the label of z/OSMF root certificate authority.


## Examples

```
zwe init certificate -v -c /path/to/zowe.yaml

```

## Parameters

Full name|Alias|Type|Required|Help message
|---|---|---|---|---
--allow-overwrite,--allow-overwritten||boolean|no||Allow overwritten existing MVS data set.
--update-config||boolean|no||Whether to update YAML configuration file with initialization result.
--ignore-security-failures||boolean|no||Whether to ignore security setup job failures.
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
--configmgr||boolean|no||(Experimental, WIP)Enable use of configmgr capabilities.


## Errors

Error code|Exit code|Error message
|---|---|---
ZWEL0157E|157|%s (%s) is not defined in Zowe YAML configuration file.
ZWEL0164E|164|Value of %s (%s) defined in Zowe YAML configuration file is invalid. Valid values are %s.
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
