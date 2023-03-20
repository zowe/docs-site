# Zowe YAML configuration file reference

Zowe v2 uses a YAML configuration file during installation, configuration and runtime. This file is usually referred to as `zowe.yaml`. YAML is a human-friendly data serialization language for all programming languages. To learn more about YAML specifications, see [https://yaml.org/](https://yaml.org/).

**Note:** In the following sections, we refer to configuration keys by using concatenation of key names and dots. For example, if you want to update the configuration key `zowe.certificate.keystore.type` with value `PKCS12`, you should set value for this entry in the `zowe.yaml`:

```yaml
zowe:
  certificate:
    keystore:
      type: PKCS12
```

**Table of Contents**

- [High-level overview of YAML configuration file](#high-level-overview-of-yaml-configuration-file)
- [Extract sharable configuration out of zowe.yaml](#extract-sharable-configuration-out-of-zoweyaml)
- [Configuration override](#configuration-override)
- [YAML configurations - certificate](#yaml-configurations---certificate)
- [YAML configurations - zowe](#yaml-configurations---zowe)
- [YAML configurations - java](#yaml-configurations---java)
- [YAML configurations - node](#yaml-configurations---node)
- [YAML configurations - zOSMF](#yaml-configurations---zosmf)
- [YAML configurations - components](#yaml-configurations---components)
    - [Configure component gateway](#configure-component-gateway)
    - [Configure component discovery](#configure-component-discovery)
    - [Configure component api-catalog](#configure-component-api-catalog)
    - [Configure component caching-service](#configure-component-caching-service)
    - [Configure component app-server](#configure-component-app-server)
    - [Configure component zss](#configure-component-zss)
    - [Configure component jobs-api](#configure-component-jobs-api)
    - [Configure component files-api](#configure-component-files-api)
    - [Configure component explorer-jes](#configure-component-explorer-jes)
    - [Configure component explorer-mvs](#configure-component-explorer-mvs)
    - [Configure component explorer-uss](#configure-component-explorer-uss)
    - [Configure external extension](#configure-external-extension)
- [YAML configurations - haInstances](#yaml-configurations---hainstances)
- [Auto-generated environment variables](#auto-generated-environment-variables)

### High-level overview of YAML configuration file

The YAML configuration file has few high-level sections:

- **`zowe`**  
 Defines global configurations specific to Zowe, including default values.
- **`java`**  
 Defines Java configurations used by Zowe components.
- **`node`**  
 Defines node.js configurations used by Zowe components.
- **`zOSMF`**  
 Tells Zowe your z/OSMF configurations.
- **`components`**  
 Defines detailed configurations for each Zowe component or extension. Each component or extension may have a key entry under this section. For example, `components.gateway` is configuration for API Mediation Layer Gateway service.
- **`haInstances`**  
 Defines customized configurations for each High Availability (HA) instance. You should predefine all Zowe HA instances you want to start within your Sysplex.

### Extract sharable configuration out of zowe.yaml

The Zowe YAML configuration file supports a special `@include` annotation that can be used in any level of the configuration. This enables you to organize your YAML configuration files and extract sharable configurations to a separate YAML file.

For example, you can define a sharable certificate configuration file `<keystore-dir>/zowe-certificates.yaml` like this:

```yaml
keystore:
  type: PKCS12
  file: /global/zowe/keystore/localhost/localhost.keystore.p12
  password: password
  alias: localhost
truststore:
  type: PKCS12
  file: /global/zowe/keystore/localhost/localhost.truststore.p12
  password: password
pem:
  key: /global/zowe/keystore/localhost/localhost.key
  certificate: /global/zowe/keystore/localhost/localhost.cer
  certificateAuthorities: /global/zowe/keystore/local_ca/local_ca.cer
```

Then in your `zowe.yaml`, you can import this certification file like this:

```yaml
zowe:
  certificate:
    @include: "<keystore-dir>/zowe-certificates.yaml"
```

### Configuration override

Inside `zowe.yaml`, you can define default values and they may be overridden in more granular level configurations. This can happen in several ways:

- The component can override the default certificate configuration. For the specific entry of certification configuration, if it's not overridden, it falls back to default configurations.  

**Example:**

  ```yaml
  zowe:
    certificate:
      keystore:
        type: PKCS12
        file: /global/zowe/keystore/localhost/localhost.keystore.p12
        password: password
        alias: localhost
      truststore:
        type: PKCS12
        file: /global/zowe/keystore/localhost/localhost.truststore.p12
        password: password
      pem:
        key: /global/zowe/keystore/localhost/localhost.key
        certificate: /global/zowe/keystore/localhost/localhost.cer
        certificateAuthorities: /global/zowe/keystore/local_ca/local_ca.cer
  components:
    app-server:
      certificate:
        keystore:
          alias: app-server
        pem:
          key: /global/zowe/keystore/localhost/app-server.key
          certificate: /global/zowe/keystore/localhost/app-server.cer
  ```
  
  App Server will use the certificate alias `app-server` instead of `localhost` from the same keystore defined in `zowe.certificate.keystore.file`. And it will use the exact same truststore defined in `zowe.certificate.truststore.file`.

- Zowe high availability (HA) instance component configuration `haInstances.<ha-instance>.components.<component>` can override global level component configurations `components.<component>`. Any configuration you can find in `components.<component>` level can be overridden in `haInstances.<ha-instance>.components.<component>` level. For example, in this configuration:

  ```yaml
  components:
    app-server:
      enabled: true
      port: 8544
  haInstances:
    lpar2a:
      components:
        app-server:
          enabled: false
    lpar2b:
      components:
        app-server:
          port: 28544
  ```
  
  App Server on `lpar2a` HA instance will not be started. On `lpar2b` HA instance, it will be started but on port 28544.

### YAML configurations - certificate

In Zowe YAML configuration, certificate definition shares the same format and this format can be used in several configuration entries. For example, `zowe.certificate`, `components.<component>.certificate`, and `haInstances.<ha-instance>.components.<component>.certificate`. The certificate definition may include the following entries:

- **`keystore.type`**  
 Defines the type of the keystore. If you are using keystore, this value usually should be `PKCS12`. If you are using keyring, this value should be `JCERACFKS`.
- **`keystore.file`**  
 Defines the path of the keystore file. If you are using keyring, this should look like `safkeyring:////<keyring-owner>/<keyring-name>`. For example, `safkeyring:////ZWESVUSR/ZoweKeyring`.
- **`keystore.password`**  
 Defines the password of the keystore.
- **`keystore.alias`**  
 Represents the alias name of the certificate stored in keystore. If you are using keyring, this is the certificate label connected to the keyring.
- **`truststore.type`**  
 Defines the type of the truststore file. If you are using keystore, this value usually should be `PKCS12`. If you are using keyring, this value should be `JCERACFKS`.
- **`truststore.file`**  
 Defines the path to the truststore file. If you are using keyring, this should look like `safkeyring:////<keyring-owner>/<keyring-name>`, usually will be the same value of `keystore.file`.
- **`truststore.password`**  
 Defines the password of the truststore.
- **`pem.key`**  
 Defines the private key file in PEM format. This can be used by applications that do not support either PKCS12 keystore format or z/OS keyring.
- **`pem.certificate`**  
 Defines the public key file in PEM format. This can be used by applications that do not support either PKCS12 keystore format or z/OS keyring.
- **`pem.certificateAuthorities`**  
 Defines certificate authorities in PEM format. This can be used by applications that do not support either PKCS12 keystore format or z/OS keyring.

### YAML configurations - zowe

The high-level configuration `zowe` supports these definitions:

#### Directories

- **`zowe.runtimeDirectory`**  
 Tells Zowe the runtime directory where it's installed.
- **`zowe.logDirectory`**  
 Some Zowe components write logs to file system. This tells Zowe which directory should be used to store log files.
- **`zowe.workspaceDirectory`**
 Tells Zowe components where they can write temporary runtime files.
- **`zowe.extensionDirectory`**  
 Tells Zowe where you put the runtime of all your extensions.

 #### Zowe Job

- **`zowe.job.name`**  
 Defines the Zowe job name for the ZWESLSTC started task.
- **`zowe.job.prefix`**  
 Defines the Zowe address space prefix for Zowe components.

#### Domain and port to access Zowe

- **`zowe.externalDomains`**  
 Defines a list of external domains that will be used by the Zowe instance. This configuration is an array of domain name strings.
 In Sysplex deployment, this is the DVIPA domain name defined in Sysplex Distributor. For example,
   
   ```yaml
   zowe:
    externalDomains:
    - external.my-company.com
    - additional-dvipa-domain.my-company.com
   ```
 In Kubernetes deployment, this is the domain name you will use to access your Zowe running in Kubernetes cluster.
- **`zowe.externalPort`**  
 Defines the port that will be exposed to external Zowe users. By default, this value is set based on Zowe APIML Gateway port.
 In Sysplex deployment, this is the DVIPA port defined in Sysplex Distributor. See [Configure Sysplex Distributor](../user-guide/configure-sysplex.md#configuring-sysplex-distributor) for more information.
 In Kubernetes deployment, this is the gateway Service port will be exposed to external.

#### Extra environment variables

- **`zowe.environments`**  
 Defines extra environment variables to customize the Zowe runtime. This configuration is a list of key / value pairs.
 **Example:**

   ```yaml
   zowe:
    environments:
      MY_NEW_ENV: value-of-my-env
   ```
 Please be aware that variables defined here are global to all Zowe components, on all HA instances.

#### Certificate

- **`zowe.certificate`**  
 Defines the northbound certificate facing Zowe users.
- **`zowe.verifyCertificates`**
  Defines how Zowe should validate the certificates used by components or external service(s) like z/OSMF. It can be a value of:
  * `STRICT`: This is the default value. Zowe will validate if the certificate is trusted in our trust store and if the certificate Command Name and Subject Alternative Name (SAN)is validated. This is recommended for the best security.
  * `NONSTRICT`: Zowe will validate if the certificate is trusted in our trust store. In this mode, Zowe does not validate certificate Common Name and Subject Alternative Name (SAN). This option does not have the best security but allows you to try out Zowe when you don't have permission to fix certificate used by external services like z/OSMF.
  * `DISABLED`: This will disable certificate validation completely. This is **NOT** recommended for security purpose.

#### Launcher and launch scripts

Launcher is the program behind `ZWESLSTC` started task.

- **`zowe.launcher`**  
 The launcher section defines defaults about how the Zowe launcher should act upon components.
- **`zowe.launcher.restartIntervals`**  
 An array of positive integers that defines how many times a component should be tried to be restarted if it fails, and how much time to wait in seconds for that restart to succeed before retrying.
- **`zowe.launcher.minUptime`**  
 The minimum amount of time a zowe component should be running in order to be declared as started successfully.
- **`zowe.launcher.shareAs`**  
 Whether or not the launcher should start components in the same address space as it. See documentation for [_BPX_SHAREAS](https://www.ibm.com/docs/en/zos/2.4.0?topic=shell-setting-bpx-shareas-bpx-spawn-script) for details.
- **`zowe.launchScript.logLevel`**
 You can set it to `debug` or `trace` to enable different level of debug messages from Zowe launch scripts. This may help to troubleshoot issues during Zowe start.

#### Setup

Zowe YAML configuration uses `zowe.setup` section to instruct how Zowe should be installed and configured. This section is optional for Zowe runtime but only be used for `zwe install` and `zwe init` commands.

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
        - zos.my-company.com
        - internal-lpar1.zos.my-company.com
        - internal-lpar2.zos.my-company.com
        - internal-lpar3.zos.my-company.com
      importCertificateAuthorities:
        - 
    vsam:
      mode: NONRLS
      volume: VOL123
      storageClass:
```

- `zowe.setup.dataset.prefix` shows where the `SZWEAUTH` data set is installed.
- `zowe.setup.dataset.parmlib` is the user custom parameter library. Zowe server command may generate sample PARMLIB members and stores here.
- `zowe.setup.dataset.jcllib` is the custom JCL library. Zowe server command may generate sample JCLs and put into this data set.
- `zowe.setup.dataset.authLoadlib` is the user custom APF LOADLIB. This field is optional. If this is defined, members of `SZWEAUTH` will be copied over to this data set and it will be APF authorized. If it's not defined, `SZWEAUTH` from `zowe.setup.dataset.prefix` will be APF authorized.
- `zowe.setup.dataset.authPluginLib` is the user custom APF PLUGINLIB. You can install Zowe ZIS plug-ins into this load library. This loadlib requires APF authorize.

- `zowe.setup.security.product` is security product. Can be `RACF`, `ACF2`, or `TSS`. This configuration is optional. Default value is `RACF`.
- `zowe.setup.security.groups.admin` is the group for Zowe administrators. This configuration is optional. Default value is `ZWEADMIN`.
- `zowe.setup.security.groups.stc` is the group for Zowe started tasks. This configuration is optional. Default value is `ZWEADMIN`.
- `zowe.setup.security.groups.sysProg` is system programmer user ID/group. This configuration is optional. Default value is `ZWEADMIN`.
- `zowe.setup.security.users.zowe` is the userid for Zowe started task. This configuration is optional. Default value is `ZWESVUSR`.
- `zowe.setup.security.users.zis` is userid for ZIS started task. This configuration is optional. Default value is `ZWESIUSR`.
- `zowe.setup.security.stcs.zowe` is Zowe started task name. This configuration is optional. Default value is `ZWESLSTC`.
- `zowe.setup.security.stcs.zis` is ZIS started task name. This configuration is optional. Default value is `ZWESISTC`.
- `zowe.setup.security.stcs.aux` is ZIS AUX started task name. This configuration is optional. Default value is `ZWESASTC`.

- `zowe.setup.certificate.type` is the type of certificate. Valid values are `PKCS1` (USS keystore) or `JCERACFKS` (z/OS keyring).
- `zowe.setup.certificate.dname` is the distinguished name of the certificate. You can define `caCommonName`, `commonName`, `orgUnit`, `org`, `locality`, `state`, and / or `country`. These configurations are optional.
- `zowe.setup.certificate.validity` is the validity days of the certificate. This is optional.
- `zowe.setup.certificate.san` is the `Subject Alternative Name`(s) of the certificate if they are different from `zowe.externalDomains`. Note that for `JCERACFKS` type, with limitation of RACDCERT command, this should contain exact one hostname (domain) and one IP address.
- `zowe.setup.certificate.importCertificateAuthorities` is the list of certificate authorities will be imported to Zowe `PKCS12` keystore or `JCERACFKS` keyring. Please note, for JCERACFKS type, only maximum 2 CAs is supported. If you are using `PKCS12` certificate, this should be USS files in PEM format. If you are using `JCERACFKS` certificate, this should be certificate labels on the z/OS system.

**For `PKCS12` certificate users,**

- `zowe.setup.certificate.pkcs12.directory` is the directory where you plan to store the PKCS12 keystore and truststore. This is required if `zowe.setup.certificate.type` is `PKCS12`.
- `zowe.setup.certificate.pkcs12.lock` is a boolean configuration to tell if we should lock the PKCS12 keystore directory only for Zowe runtime user and group. Default value is true.
- You can also define `name`, `password`, `caAlias` and `caPassword` under `zowe.setup.certificate.pkcs12` to customized keystore and truststore. These configurations are optional, but it is recommended to update them from default values.
- Define `zowe.setup.certificate.pkcs12.import.keystore` if you already acquired certificate from other CA, stored them in PKCS12 format, and want to import into Zowe PKCS12 keystore.
- `zowe.setup.certificate.pkcs12.import.password` is the password for keystore defined in `zowe.setup.certificate.pkcs12.import.keystore`.
- `zowe.setup.certificate.pkcs12.import.alias` is the original certificate alias defined in `zowe.setup.certificate.pkcs12.import.keystore`. After imported, the certificate will be saved as alias specified in `zowe.setup.certificate.pkcs12.name`.

**For `JCERACFKS` certificate (z/OS keyring) users,**

- `zowe.setup.certificate.keyring.owner` is the keyring owner. It's optional and default value is `zowe.setup.security.users.zowe`. If it's also not defined, the default value is `ZWESVUSR`.
- `zowe.setup.certificate.keyring.name` is the keyring name will be created on z/OS. This is required if `zowe.setup.certificate.type` is `JCERACFKS`.
- If you want to let Zowe to generate new certificate,
  * You can also customize `label` and `caLabel` under `zowe.setup.certificate.keyring` if you want to generate new certificate. Default value of `label` is `localhost` and default value of `caLabel` is `localca`.
- If you want to import certificate stored in MVS data set into Zowe keyring,
  * `zowe.setup.certificate.keyring.connect.dsName` is required in this case. It tells Zowe the data set where the certificate stored.
  * `zowe.setup.certificate.keyring.connect.password` is the password when importing the certificate.
  * The certificate will be imported with label defined in `zowe.setup.certificate.keyring.label`.
- If you want to connect existing certificate into Zowe keyring,
  * `zowe.setup.certificate.keyring.connect.user` is required and tells Zowe the owner of existing certificate. This field can have value of `SITE`.
  * `zowe.setup.certificate.keyring.connect.label` is also required and tells Zowe the label of existing certificate.
- If `zowe.verifyCertificates` is not `DISABLED`, and z/OSMF host (`zOSMF.host`) is provided, Zowe will try to trust z/OSMF certificate.
  * If you are using `RACF` security manager, Zowe will try to automatically detect the z/OSMF CA based on certificate owner specified by
    `zowe.setup.certificate.keyring.zOSMF.user`. Default value of this field is `IZUSVR`. If the automatic detection failed, you will need to define `zowe.setup.certificate.keyring.zOSMF.ca` indicates what is the label of z/OSMF root certificate authority.
  * If you are using `ACF2` or `TSS` (Top Secret) security manager, `zowe.setup.certificate.keyring.zOSMF.ca` is required to indicates what is the label of z/OSMF root certificate authority.

- `zowe.setup.vsam.mode` indicates whether the VSAM will utilize Record Level Sharing (RLS) services or not. Valid value is `RLS` or `NONRLS`.
- `zowe.setup.vsam.volume` indicates the name of volume. This field is required if VSAM mode is `NONRLS`.
- `zowe.setup.vsam.storageClass` indicates the name of RLS storage class. This field is required if VSAM mode is `RLS`.

### YAML configurations - java

The high-level configuration `java` supports these definitions:

- **`home`**  
 Defines the path to the Java runtime directory.

### YAML configurations - node

The high-level configuration `node` supports these definitions:

- **`home`**  
 Defines the path to the Node.js runtime directory.

### YAML configurations - zOSMF

The high-level configuration `zOSMF` supports these definitions:

- **`zOSMF.host`**  
 Defines the hostname of your z/OSMF instance.
- **`zOSMF.port`**  
 Defines the port of your z/OSMF instance.
- **`zOSMF.applId`**  
 Defines the application ID of your z/OSMF instance.

### YAML configurations - components

All Zowe components and extensions can have a dedicated section under the `components` high-level configuration.

In this section, `<component>` represents any Zowe components or extensions. For all components and extensions, these are the common definitions.

- **`components.<component>.enabled`**  
 Defines if you want to start this component in this Zowe instance. This allows you to control each component instead of a group.
- **`components.<component>.certificate`**  
 You can customize a component to use different certificate from default values. This section follows same format defined in [YAML configurations - certificate](#yaml-configurations-certificate). If this is not customized, the component will use certificates defined in `zowe.certificate`.
- **`components.<component>.launcher`**  
 Any component can have a launcher section which overrides the overall Zowe Launcher default defined in `zowe.launcher`.

#### Configure component gateway

These configurations can be used under the `components.gateway` section:

- **`port`**  
 Defines the port which the gateway should be started on. This must be a valid port number.
- **`debug`**  
 Defines whether to enable debug mode for the Gateway.
- **`apiml.service.allowEncodedSlashes`**  
 When this parameter is set to `true`, the Gateway allows encoded characters to be part of URL requests redirected through the Gateway. 
- **`apiml.service.corsEnabled`**  
 When this parameter is set to `true`, CORS are enabled in the API Gateway for Gateway routes `gateway/api/v1/**`.
- **`apiml.service.preferIpAddress`**  
 Set this parameter to `true`  to advertise a service IP address instead of its hostname. **Note:** This configuration is deprecated. Zowe start script will ignore this value and always set it to `false`.
- **`apiml.gateway.timeoutMillis`**  
 Specifies the timeout for connection to the services in milliseconds.
- **`apiml.security.x509.enabled`**  
 Set this parameter to `true` to enable the client certificate authentication functionality through ZSS.
- **`apiml.security.x509.externalMapperUrl`**  
 Defines the URL where Gateway can query the mapping of client certificates.
- **`apiml.security.auth.provider`**  
 Defines the authentication provider used by the API Gateway.
- **`apiml.security.authorization.endpoint.url`**  
 Defines the URL to the authorization endpoint. This endpoint tells Gateway if a user has a particular permission on SAF profile. For example, permission to the `APIML.SERVICES` profile of `ZOWE` class.
- **`apiml.security.ssl.verifySslCertificatesOfServices`**  
 Defines whether APIML should verify certificates of services in strict mode. Setting to `true` will enable the `strict` mode where APIML will validate if the certificate is trusted in turststore, and also if the certificate Common Name or Subject Alternate Name (SAN) matches the service hostname.
- **`apiml.security.ssl.nonStrictVerifySslCertificatesOfServices`**  
 Defines whether APIML should verify certificates of services in non-strict mode. Setting the value to `true` will enable the `non-strict` mode where APIML will validate if the certificate is trusted in turststore, but ignore the certificate Common Name or Subject Alternate Name (SAN) check. Zowe will ignore this configuration when strict mode is enabled with `apiml.security.ssl.verifySslCertificatesOfServices`.
- **`apiml.server.maxConnectionsPerRoute`**  
 Specifies the maximum connections for each service.
- **`apiml.server.maxTotalConnections`**  
 Specifies the total connections for all services registered under API Mediation Layer.

#### Configure component discovery

These configurations can be used under the `components.discovery` section:

- **`port`**  
 Defines the port which discovery should be started on. This may be defined as a valid port number or as an offset from the Gateway component's port. To define an offset enter `"+{offset}"` or `"-{offset}"` as a string. The offset must start with `+` or `-`.
- **`debug`**  
 Defines whether to enable debug mode for the Discovery Service.
- **`apiml.service.preferIpAddress`**  
 Set this parameter to `true`  to advertise a service IP address instead of its hostname. **Note:** This configuration is deprecated. The Zowe start script will ignore this value and always set it to `false`.
- **`apiml.security.ssl.verifySslCertificatesOfServices`**  
 Defines whether APIML should verify certificates of services in strict mode. Setting to `true` will enable the `strict` mode where APIML will validate both if the certificate is trusted in turststore, and also if the certificate Common Name or Subject Alternate Name (SAN) matches the service hostname.
- **`apiml.security.ssl.nonStrictVerifySslCertificatesOfServices`**  
 Defines whether APIML should verify certificates of services in non-strict mode. Setting to `true` will enable the `non-strict` mode where APIML will validate if the certificate is trusted in turststore, but ignore the certificate Common Name or Subject Alternate Name (SAN) check. Zowe will ignore this configuration if strict mode is enabled with `apiml.security.ssl.verifySslCertificatesOfServices`.
- **`alternativeStaticApiDefinitionsDirectories`**  
 Specifies the alternative directories of static definitions.
- **`apiml.server.maxTotalConnections`**  
 Specifies the total connections for all services registered under API Mediation Layer.
- **`apiml.discovery.serviceIdPrefixReplacer`**  
 Modifies the service ID of a service instance before it registers to API Mediation Layer.
 Using this parameter ensures compatibility of services that use a non-conformant organization prefix with v2, based on Zowe v2 conformance.


#### Configure component api-catalog

These configurations can be used under the `components.api-catalog` section:

- **`port`**  
 Defines the port which API Catalog should be started on.
- **`debug`**  
 Defines if we want to enable debug mode for the API Catalog. This is equivalent to the `APIML_DEBUG_MODE_ENABLED` variable but with better granular level.
- **`environment.preferIpAddress`**  
 Set this parameter to `true`  to advertise a service IP address instead of its hostname.  
  **Note:** This configuration is deprecated. Zowe start script will ignore this value and always set it to `false`.

#### Configure component caching-service

These configurations can be used under the `components.caching-service` section:

- **`port`**  
 Defines the port which Caching Service should be started on. This may be defined as a valid port number or as an offset from the Gateway component's port. To define an offset enter `"+{offset}"` or `"-{offset}"` as a string. The offset must start with `+` or `-`.
- **`debug`**  
 Defines if we want to enable debug mode for the Caching Service.
- **`storage.mode`**  
 Sets the storage type used to persist data in the Caching Service.
- **`storage.size`**  
 Specifies amount of records before eviction strategies start evicting.
- **`storage.evictionStrategy`**  
 Specifies eviction strategy to be used when the storage size is achieved.
- **`storage.vsam.name`**  
 Specifies the data set name of the caching service VSAM data set.
- **`storage.redis.masterNodeUri`**  
 Specifies the URI used to connect to the Redis master instance in the form `username:password@host:port`.
- **`storage.redis.timeout`**  
 Specifies the timeout second to Redis. Defaults to 60 seconds.
- `storage.redis.sentinel.masterInstance`: Specifies the Redis master instance ID used by the Redis Sentinel instances.
- **`storage.redis.sentinel.nodes`**  
 Specifies the array of URIs used to connect to a Redis Sentinel instances in the form `username:password@host:port`.
- **`storage.redis.ssl.enabled`**  
 Specifies the boolean flag indicating if Redis is being used with SSL/TLS support. Defaults to `true`.
- **`storage.redis.ssl.keystore`**  
 Specifies the keystore file used to store the private key.
- **`storage.redis.ssl.keystorePassword`**  
 Specifies the password used to unlock the keystore.
- **`storage.redis.ssl.truststore`**  
 Specifies the truststore file used to keep other parties public keys and certificates.
- **`storage.redis.ssl.truststorePassword`**  
 Specifies the password used to unlock the truststore.
- **`environment.preferIpAddress`**  
 Set this parameter to `true`  to advertise a service IP address instead of its hostname. **Note:** this configuration is deprecated. Zowe start script will ignore this value and always set it to `false`.
- **`apiml.security.ssl.verifySslCertificatesOfServices`**  
 Specifies whether APIML should verify certificates of services in strict mode. Set to `true` will enable `strict` mode that APIML will validate both if the certificate is trusted in turststore, and also if the certificate Common Name or Subject Alternate Name (SAN) match the service hostname.
- **`apiml.security.ssl.nonStrictVerifySslCertificatesOfServices`**  
 Defines whether APIML should verify certificates of services in non-strict mode. Setting to `true` will enable `non-strict` mode where APIML will validate if the certificate is trusted in turststore, but ignore the certificate Common Name or Subject Alternate Name (SAN) check. Zowe will ignore this configuration if strict mode is enabled with `apiml.security.ssl.verifySslCertificatesOfServices`.

#### Configure component app-server

These configurations can be used under the `components.app-server` section:

- **`port`**  
 Defines the port which App Server should be started on. This may be defined as a valid port number or as an offset from the Gateway component's port. To define an offset enter `"+{offset}"` or `"-{offset}"` as a string. The offset must start with `+` or `-`.

#### Configure component zss

These configurations can be used under the `components.zss` section:

- **`port`**  
 Defines the port which ZSS should be started on. This may be defined as a valid port number or as an offset from the Gateway component's port. To define an offset enter `"+{offset}"` or `"-{offset}"` as a string. The offset must start with `+` or `-`.

#### Configure component jobs-api

These configurations can be used under the `components.jobs-api` section:

- **`port`**  
 Defines the port which Jobs API should be started on. This may be defined as a valid port number or as an offset from the Gateway component's port. To define an offset enter `"+{offset}"` or `"-{offset}"` as a string. The offset must start with `+` or `-`.

 - **`debug`**  
 Defines whether to enable debug logging for the Jobs API.

#### Configure component files-api

These configurations can be used under the `components.files-api` section:

- **`port`**  
 Defines the port which Files API should be started on. This may be defined as a valid port number or as an offset from the Gateway component's port. To define an offset enter `"+{offset}"` or `"-{offset}"` as a string. The offset must start with `+` or `-`.

 - **`debug`**  
 Defines whether to enable debug logging for the Files API.

#### Configure external extension

You can define a `components.<extension-id>` section and use common component configuration entries.

For example, enable `my-extension`:

```yaml
components:
  # for extensions, you can add your definition like this
  my-extension:
    enabled: true
```

### YAML configurations - haInstances

All Zowe high availability instances should have a dedicated section under the `haInstances` high-level configuration.

In this section, `<ha-instance>` represents any Zowe high availability instance ID.

For all high availability instances, these are the common definitions.

- **`haInstances.<ha-instance>.hostname`**  
 Defines the host name where you want to start this instance. This could be the host name of one LPAR in your Sysplex.
- **`haInstances.<ha-instance>.sysname`**  
 Defines the system name of the LPAR where the instance is running. Zowe will use `ROUTE` command to send JES2 start or stop command to this HA instance.
- **`haInstances.<ha-instance>.components.<component>`**  
 Optional settings you can override component configurations for this high availability instance. See [Configuration override](#configuration-override) for more details.

### Auto-generated environment variables

Each line of Zowe YAML configuration will have a matching environment variable during runtime. This is converted based on pre-defined pattern:

- All configurations under `zowe`, `components`, `haInstances` will be converted to a variable with name:
  * prefixed with `ZWE_`,
  * any non-alphabetic-numeric characters will be converted to underscore `_`,
  * and no double underscores like `__`.
- Calculated configurations of `haInstance`, which is portion of `haInstances.<current-ha-instance>` will be converted same way.
- Calculated configurations of `configs`, which is portion of `haInstances.<current-ha-instance>.components.<current-component>` will be converted same way.
- All other configuration entries will be converted to a variable with name:
  * all upper cases,
  * any non-alphabetic-numeric characters will be converted to underscore `_`,
  * and no double underscores like `__`.

For examples:

- `ZWE_zowe_runtimeDirectory`, parent directory of where `zwe` server command is located.
- `ZWE_zowe_workspaceDirectory` is the path of user customized workspace directory.
- `ZWE_zowe_setup_dataset_prefix` is the high-level qualifier where Zowe MVS data sets are installed.
- `ZWE_zowe_setup_dataset_parmlib` is the data set configured to store customized version of parameter library members.
- `ZWE_zowe_setup_dataset_authPluginLib` is the data set configured to store APF authorized ZIS plug-ins load library.
- `ZWE_zowe_setup_security_users_zowe` is the name of Zowe runtime user.
- `ZWE_configs_port` is your component port number you can use in your start script. It points to the value of `haInstances.<current-ha-instance>.components.<your-component>.port`, or fall back to `components.<my-component>.port`, or fall back to `configs.port` defined in your component manifest.
