# zwe init

[zwe](.././zwe.md) > [init](./zwe-init.md)

	zwe init [sub-command [sub-command]...] [parameter [parameter]...]

## Sub-commands

* [apfauth](./zwe-init-apfauth.md)
* [certificate](./zwe-init-certificate.md)
* [generate](./zwe-init-generate.md)
* [mvs](./zwe-init-mvs.md)
* [security](./zwe-init-security.md)
* [stc](./zwe-init-stc.md)
* [vsam](./zwe-init-vsam.md)

## Description

Init Zowe instance based on zowe.yaml configuration.

You can find an `example-zowe.yaml` in Zowe runtime directory folder.

This command can initialize Zowe using either pure JCL or shell scripts and utilities.
If you want to use pure JCL, set `zowe.setup.jcl.enable` to `true` or run commands with the `--jcl` parameter.

This command will run these sub-commands in sequence:

- (Pure JCL only) `zwe init generate`
- `zwe init mvs`
- `zwe init vsam`
- `zwe init apfauth`
- `zwe init security`
- `zwe init certificate`
- `zwe init stc`

If you pass `--dry-run` with this command, each subcommand will print out the
JCL that it would submit or actions it would take in shell without modifying the system. This can be used to
review what Zowe would do before doing it.

If you pass `--skip-security-setup` with this command, `zwe init apfauth` and
`zwe init security` steps will be skipped.

If you pass `--update-config` with this command, these configurations could
be written back to your Zowe YAML configuration file:

- `zowe.runtimeDirectory` based on where your `zwe` command is located, and if it
  is not defined,
- `zowe.certificate` based on your `zowe.setup.certificate` configuration,
- `java.home` based on your current JAVA_HOME or automatic detection,
- `node.home` based on your current NODE_HOME or automatic detection.

If you are using the pure JCL option, the following are the JCL submitted by each command as needed:

- `zwe init mvs`
    - ZWEIMVS2, ZWEIMVS, ZWEIMVS1
    - (If `--allow-overwrite` specified and old datasets exist) ZWERMVS, ZWERMVS1
    - (If `zowe.setup.dataset.authLoadLib` is not named prefix + ZWELOAD) ZWEIMVS2
    - (If above is true, and the dataset exists, and `--allow-overwrite` is set) ZWERMVS2
- `zwe init vsam`
    - ZWECSVSM
    - (If `--allow-overwrite` specified and old datasets exist) ZWECSRVS
- `zwe init apfauth`
    - ZWEIAPF2
- `zwe init security`
    - (If RACF) ZWEIRAC
    - (If TSS) ZWEITSS
    - (If ACF2) ZWEIACF
- `zwe init certificate`
    - (If creating keyring and certificate for RACF) ZWEIKRR1
    - (If creating keyring and connecting certificate for RACF) ZWEIKRR2
    - (If creating keyring and importing certificate for RACF) ZWEIKRR3
    - (If creating keyring and certificate for TSS) ZWEIKRR1
    - (If creating keyring and connecting certificate for TSS) ZWEIKRT2
    - (If creating keyring and importing certificate for TSS) ZWEIKRT3
    - (If creating keyring and certificate for ACF2) ZWEIKRA1
    - (If creating keyring and connecting certificate for ACF2) ZWEIKRA2
    - (If creating keyring and importing certificate for ACF2) ZWEIKRA3
- `zwe init stc`
    - ZWEISTC
    - (If `--allow-overwrite` specified and old members exist) ZWERSTC


These Zowe YAML configurations showing with sample values are used:

If you want to use JCL, include this in the Zowe YAML snippet:

```yaml
zowe:
  setup:
    jcl:
      enable: true
      header: ""   # optional jobcard information to include
```

**IMPORTANT**, if you modify any of the values below, it's suggested to re-run
relevant `zwe init` command to make them taking effect.

```yaml
zowe:
  setup:
    dataset:
      prefix: IBMUSER.ZWE
      parmlib: IBMUSER.ZWE.CUST.PARMLIB
      jcllib: IBMUSER.ZWE.CUST.JCLLIB
      authLoadlib: IBMUSER.ZWE.CUST.ZWESALL
      authPluginLib: IBMUSER.ZWE.CUST.ZWESAPL
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
        - zos.example.com
        - internal-lpar1.zos.example.com
        - internal-lpar2.zos.example.com
        - internal-lpar3.zos.example.com
      importCertificateAuthorities:
        - 
    vsam:
      mode: NONRLS
      volume: VOL123
      storageClass:
  externalDomains:
   - zos.example.com
  verifyCertificates: STRICT
zOSMF:
  host: zosmf.example.com
  port: 443
components:
  caching-service:
    storage:
      mode: VSAM
      vsam:
        name: IBMUSER.ZWE.CUST.CACHE2
```

- `zowe.setup.dataset.prefix` shows where the `SZWEAUTH` data set is installed.
- `zowe.setup.dataset.parmlib` is the user custom parameter library. Zowe server
  command may generate sample PARMLIB members and stores here.
- `zowe.setup.dataset.jcllib` is the custom JCL library. Zowe server command may
  generate sample JCLs and put into this data set.
- `zowe.setup.dataset.authLoadlib` is the user custom APF LOADLIB. This field is
  optional. If this is defined, members of `SZWEAUTH` will be copied over to
  this data set and it will be APF authorized. If it's not defined, `SZWEAUTH`
  from `zowe.setup.dataset.prefix` data set will be APF authorized.
- `zowe.setup.dataset.authPluginLib` is the user custom APF PLUGINLIB.
  You can install Zowe ZIS plugins into this load library.
  This loadlib requires APF authorize.

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

- `zowe.setup.certificate.type` is the type of certificate. Valid values are
  "PKCS12" (USS keystore) or "JCEKS", "JCECCAKS", "JCERACFKS", "JCECCARACFKS",
  and "JCEHYBRIDRACFKS (z/OS keyring).
- `zowe.setup.certificate.dname` is the distinguished name of the certificate.
  You can define `caCommonName`, `commonName`, `orgUnit`, `org`, `locality`,
  `state`, and / or `country`. These configurations are optional.
- `zowe.setup.certificate.validity` is the validity days of the certificate.
  This is optional.
- `zowe.setup.certificate.san` is the `Subject Alternative Name`(s) of the
  certificate if they are different from `zowe.externalDomains`. Please note,
  for `JCEKS`, `JCECCAKS`, `JCERACFKS`, `JCECCARACFKS`, and `JCEHYBRIDRACFKS`
  type, with limitation of RACDCERT command, this should contain exact one
  hostname (domain) and one IP address.
- `zowe.setup.certificate.importCertificateAuthorities` is the list of
  certificate authorities will be imported to Zowe PKCS12 keystore or
  keyring. Please note, for keyring type, only maximum 2 CAs are supported.
  If you are using `PKCS12` certificate, this should be USS files in PEM format.
  If you are using `JCEKS`, `JCECCAKS`, `JCERACFKS`, `JCECCARACFKS`, or
  `JCEHYBRIDRACFKS` certificate, this should be certificate labels
  on the z/OS system.

**For `PKCS12` certificate users,**

- `zowe.setup.certificate.pkcs12.directory` is the directory where you plan to
  store the PKCS12 keystore and truststore. This is required if
  `zowe.setup.certificate.type` is `PKCS12`.
- `zowe.setup.certificate.pkcs12.lock` is a boolean configuration to tell if we
  should lock the PKCS12 keystore directory only for Zowe runtime user and group.
  Default value is true.
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

**For keyring certificate users,**

- `zowe.setup.certificate.keyring.owner` is the keyring owner. It's optional and
  default value is `zowe.setup.security.users.zowe`. If it's also not defined,
  the default value is `ZWESVUSR`.
- `zowe.setup.certificate.keyring.name` is the keyring name will be created
  on z/OS. This is required if `zowe.setup.certificate.type` is one of `JCEKS`,
  `JCECCAKS`, `JCERACFKS`, `JCECCARACFKS`, or `JCEHYBRIDRACFKS`.
- If you want to let Zowe to generate new certificate,
  * You can also customize `label` and `caLabel` under
    `zowe.setup.certificate.keyring` if you want to generate new certificate.
    Default value of `label` is `localhost` and default value of `caLabel` is
    `localca`.
- If you want to import certificate stored in MVS data set into Zowe keyring,
  * `zowe.setup.certificate.keyring.connect.dsName` is required in this case. It
    tells Zowe the data set where the certificate is stored.
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
  * If you are using `RACF` or `TSS` security manager, Zowe will try to 
    automatically detect the z/OSMF CA based on certificate owner specified by
    `zowe.setup.certificate.keyring.zOSMF.user`. Default value of this field is
    `IZUSVR`. If the automatic detection failed, you will need to define
    `zowe.setup.certificate.keyring.zOSMF.ca` indicates what is the label of
    z/OSMF root certificate authority.
  * If you are using `ACF2` security manager,
    `zowe.setup.certificate.keyring.zOSMF.ca` is required to indicate what is
    the label of z/OSMF root certificate authority.

- `zowe.setup.vsam.mode` indicates whether the VSAM will utilize Record Level
  Sharing (RLS) services or not. Valid value is `RLS` or `NONRLS`.
- `zowe.setup.vsam.volume` indicates the name of volume.
  This field is required if VSAM mode is `NONRLS`.
- `zowe.setup.vsam.storageClass` indicates the name of RLS storage class.
  This field is required if VSAM mode is `RLS`.

- `zowe.verifyCertificates` indicates how Zowe should validate the certificate
  of services registered under Zowe APIML. Valid values are "STRICT",
  "NONSTRICT" or "DISABLED". If this is "STRICT", this command will try to
  validate the z/OSMF service certificate if z/OSMF is defined.

- `zOSMF.host` and `zOSMF.port` is the z/OSMF service information. This is
  required if you are using z/OSMF as authentication service.

- `components.caching-service.storage.mode` indicates what storage Zowe Caching
  Service will be used. Only if this value is `VSAM`, this command will try to
  create VSAM data set.
- `components.caching-service.storage.vsam.name` defines the VSAM data set name.


## Examples

```
zwe init --allow-overwrite -c /path/to/zowe.yaml

zwe init apfauth -v -c /path/to/zowe.yaml

zwe init certificate -v -c /path/to/zowe.yaml

zwe init --config "PARMLIB(ZOWE.PARMS(MAIN)):PARMLIB(ZOWE.PARMS(DEBUGMOD))" --jcl

```

## Parameters

Full name|Alias|Type|Required|Help message
|---|---|---|---|---
--allow-overwrite,--allow-overwritten||boolean|no|Allow overwritten existing MVS data set.
--skip-security-setup||boolean|no|Whether to skip security related setup.
--security-dry-run,--dry-run||boolean|no|Generates JCL or displays actions to be taken on the system without modifying the system.
--ignore-security-failures||boolean|no|Whether to ignore security setup job failures.
--update-config||boolean|no|Whether to update YAML configuration file with initialization result.
--jcl||boolean|no|Generates and submits JCL to drive the init command, rather than using USS utilities.


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
