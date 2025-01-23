# Zowe YAML server configuration file reference

Zowe v3 uses a YAML configuration file for server installation, configuration, and runtime. This file is usually referred to as the Zowe configuration YAML file or the `zowe.yaml` file. YAML is a human-friendly data serialization language for all programming languages. To learn more about YAML specifications, see [https://yaml.org/](https://yaml.org/). For a free, offline YAML validator to help validate your syntax, download the [Red Hat's VS Code YAML extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml).

Content within the YAML file is documented by and validated against schema files which are shipped within Zowe and extended by Zowe extensions.
For details on the schema technology and where to find the schema files within our source code, see [Using the Configuration Manager](../user-guide/configmgr-using.md#json-schema-validation).

:::note

In the following sections, we refer to configuration keys by using the concatenation of key names and dots. For example, if you want to update the configuration key `zowe.certificate.keystore.type` with the value `PKCS12`, you should set the value for this entry in the `zowe.yaml`:

```yaml
zowe:
  certificate:
    keystore:
      type: PKCS12
```

:::

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
 Defines detailed configurations for each Zowe component or extension. Each component or extension may have a key entry under this section. For example, `components.gateway` is configuration for the API Mediation Layer Gateway service.
- **`haInstances`**  
 Defines customized configurations for each High Availability (HA) instance. You should predefine all Zowe HA instances you want to start within your Sysplex.

### Extract sharable configuration out of zowe.yaml

The Zowe YAML configuration file supports splitting into several files or PARMLIB members. This can help simplify grouping configuration changes by type or owner.
More details can be found [in the configmgr documentation.](../user-guide/configmgr-using.md#splitting-configuration-into-multiple-storage-types)

### Creating portable references

The Zowe YAML configuration file has template logic for relating one value to another, a system environment variable or symbol, or even to add conditional behavior.
It can help to make your configuration portable between systems that need slightly different behavior while retaining the same configuration file.
More details can be found [in the configmgr documentation.](../user-guide/configmgr-using.md#configuration-templates)

### Configuration override - defaults.yaml

Values for global configuration and components are defined in the [`defaults.yaml`](https://github.com/zowe/zowe-install-packaging/blame/v3.x/master/files/defaults.yaml) file. This file is always merged with current config(s) when `configmgr` is used.

For example, if you decide to remove the `zowe.job` section by commenting or deleting, the `zowe.job` section reappears  after the merging with the defaults. 

**Example of initial user config:**

  ```yaml
  zowe:
    job:
    # Zowe JES job name
      name: ZW3SV1
    # Prefix of component address space
      prefix: ZW31
  ```
**Example of modified user config - `zowe.job` commented out:**

  ```yaml
  zowe:
    # job:
    # Zowe JES job name
    # name: ZW3SV1
    # Prefix of component address space
    # prefix: ZW31
  ```

**Example of merged result:**

  ```yaml
  zowe:
    job:
      name: ZWE1SV
      prefix: ZWE1
  ```
:::note
To disable a component which is defined enabled in [`defaults.yaml`](https://github.com/zowe/zowe-install-packaging/blame/v3.x/master/files/defaults.yaml), ensure that you have a definition of that component in your config, and change `enabled: true` to `enabled: false`. Deleting or commenting out such a component does not disable it.
:::

### Configuration override - inside zowe.yaml

In the `zowe.yaml`, you can define default values which can be overridden in more granular level configurations. This can happen in several ways:

- The component can override the default certificate configuration. For the specific entry of certification configuration, if it is not overridden, the configuration falls back to default configurations.  
<!-- Is the following example and example of the user modified configuration? -->
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
  In this example, the App Server will use the certificate alias `app-server` instead of `localhost` from the same keystore defined in `zowe.certificate.keystore.file`. Note that the service will use the exact same truststore defined in `zowe.certificate.truststore.file`.

- Zowe high availability (HA) instance component configuration `haInstances.<ha-instance>.components.<component>` can override global level component configurations `components.<component>`. Any configuration you can find in `components.<component>` level can be overridden in `haInstances.<ha-instance>.components.<component>` level. 

**Example:**

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
  
  In this example configuration, the App Server on `lpar2a` HA instance will not be started. On `lpar2b` HA instance, it will be started but on port 28544.

### YAML configurations - certificate

In Zowe YAML configuration, the certificate definition shares the same format which can be used in several configuration entries. For example, `zowe.certificate`, `components.<component>.certificate`, and `haInstances.<ha-instance>.components.<component>.certificate`. The certificate definition may include the following entries:

- **`keystore.type`**  
 Defines the type of the keystore. If you are using keystore, this value usually should be `PKCS12`. If you are using keyring, this value should be `JCERACFKS`.
- **`keystore.file`**  
 Defines the path of the keystore file. If you are using keyring, this should look like `safkeyring://<keyring-owner>/<keyring-name>`. For example, `safkeyring://ZWESVUSR/ZoweKeyring`.
- **`keystore.password`**  
 Defines the password of the keystore.
- **`keystore.alias`**  
 Represents the alias name of the certificate stored in keystore. If you are using keyring, this is the certificate label connected to the keyring.
- **`truststore.type`**  
 Defines the type of the truststore file. If you are using keystore, this value usually should be `PKCS12`. If you are using keyring, this value should be `JCERACFKS`.
- **`truststore.file`**  
 Defines the path to the truststore file. If you are using keyring, this should look like `safkeyring://<keyring-owner>/<keyring-name>`, usually will be the same value of `keystore.file`.
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

 An example use case is to override system-wide environment variables for the Zowe runtime, such as the directory to use for temporary files.

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

- **`zowe.setup.dataset.prefix`**  
Specifies where the `SZWEAUTH` data set is installed.
- **`zowe.setup.dataset.parmlib`**  
Specifies the user custom parameter library. Zowe server command may generate sample PARMLIB members and stores here.
- **`zowe.setup.dataset.jcllib`**  
Specifies the custom JCL library. Zowe server command may generate sample JCLs and put into this data set.
- **`zowe.setup.dataset.authLoadlib`**  
Specifies the user custom APF LOADLIB. This field is optional. If this is defined, members of `SZWEAUTH` will be copied over to this data set and it will be APF authorized. If it is not defined, `SZWEAUTH` from `zowe.setup.dataset.prefix` will be APF authorized.
- **`zowe.setup.dataset.authPluginLib`**  
Specifies the user custom APF PLUGINLIB. You can install Zowe ZIS plug-ins into this load library. This loadlib requires APF authorize.
- **`zowe.setup.security.product`**  
Speficies the security product. Can be `RACF`, `ACF2`, or `TSS`. This configuration is optional. The default value is `RACF`.
- **`zowe.setup.security.groups.admin`**  
Specifies the group for Zowe administrators. This configuration is optional. The default value is `ZWEADMIN`.
- **`zowe.setup.security.groups.stc`**  
Specifies the group for Zowe started tasks. This configuration is optional. The default value is `ZWEADMIN`.
- **`zowe.setup.security.groups.sysProg`**  
Speficies the system programmer user ID/group. This configuration is optional. The default value is `ZWEADMIN`.
- **`zowe.setup.security.users.zowe`**  
Specifies the userid for Zowe started task. This configuration is optional. The default value is `ZWESVUSR`.
- **`zowe.setup.security.users.zis`**  
Specifies the userid for ZIS started task. This configuration is optional. The default value is `ZWESIUSR`.
- **`zowe.setup.security.stcs.zowe`** is Zowe started task name. This configuration is optional. The default value is `ZWESLSTC`.
- **`zowe.setup.security.stcs.zis`** is ZIS started task name. This configuration is optional. The default value is `ZWESISTC`.
- **`zowe.setup.security.stcs.aux`** is ZIS AUX started task name. This configuration is optional. The default value is `ZWESASTC`.
- **`zowe.setup.certificate.type`**  
Specifies the type of certificate. Valid values are `PKCS1` (USS keystore) or `JCERACFKS` (z/OS keyring).
- **`zowe.setup.certificate.dname`**  
Specifies the distinguished name of the certificate. You can define `caCommonName`, `commonName`, `orgUnit`, `org`, `locality`, `state`, and / or `country`. These configurations are optional.
- **`zowe.setup.certificate.validity`**  
Specifies the validity days of the certificate. This is optional.
- **`zowe.setup.certificate.san`**  
Specifies the `Subject Alternative Name`(s) of the certificate if they are different from `zowe.externalDomains`. Note that for `JCERACFKS` type, with limitation of RACDCERT command, this should contain exact one hostname (domain) and one IP address.
- **`zowe.setup.certificate.importCertificateAuthorities`**  
Specifies the list of certificate authorities will be imported to Zowe `PKCS12` keystore or `JCERACFKS` keyring. Please note, for JCERACFKS type, only maximum 2 CAs is supported. If you are using `PKCS12` certificate, this should be USS files in PEM format. If you are using `JCERACFKS` certificate, this should be certificate labels on the z/OS system.

**For `PKCS12` certificate users**

- **`zowe.setup.certificate.pkcs12.directory`**  
Specifies the directory where you plan to store the PKCS12 keystore and truststore. This is required if `zowe.setup.certificate.type` is `PKCS12`.
- **`zowe.setup.certificate.pkcs12.lock`**  
Specifies a boolean configuration to tell if we should lock the PKCS12 keystore directory only for Zowe runtime user and group. The default value is true.
- **`name`**, **`password`**, **`caAlias`** and **`caPassword`**  
Under `zowe.setup.certificate.pkcs12`, these parameters   
customize the keystore and truststore. These configurations are optional, but it is recommended to update them from default values.
- **`zowe.setup.certificate.pkcs12.import.keystore`**  
 Specifiy this parameter if you already acquired certificates from another CA, stored them in PKCS12 format, and want to import into Zowe PKCS12 keystore.
- **`zowe.setup.certificate.pkcs12.import.password`**  
Specifies the password for keystore defined in `zowe.setup.certificate.pkcs12.import.keystore`.
- **`zowe.setup.certificate.pkcs12.import.alias`**  
Specifies the original certificate alias defined in `zowe.setup.certificate.pkcs12.import.keystore`. After imported, the certificate will be saved as alias specified in `zowe.setup.certificate.pkcs12.name`.

**For `JCERACFKS` certificate (z/OS keyring) users**

- **`zowe.setup.certificate.keyring.owner`**  
Specifies the keyring owner. It's optional and default value is `zowe.setup.security.users.zowe`. If it's also not defined, the default value is `ZWESVUSR`.
- **`zowe.setup.certificate.keyring.name`**  
Specifies the keyring name will be created on z/OS. This is required if `zowe.setup.certificate.type` is `JCERACFKS`.
- `label` and `caLabel`  
Specify these parameters under `zowe.setup.certificate.keyring` if you want to let Zowe generate a new certificate.  
The default value of `label` is `localhost` and default value of `caLabel` is `localca`.
- If you want to import a certificate stored in MVS data set into Zowe keyring:
  * `zowe.setup.certificate.keyring.connect.dsName` is required in this case. It tells Zowe the data set where the certificate stored.
  * `zowe.setup.certificate.keyring.connect.password` is the password when importing the certificate.
  * The certificate will be imported with the label defined in `zowe.setup.certificate.keyring.label`.
- If you want to connect an existing certificate into a Zowe keyring:
  * `zowe.setup.certificate.keyring.connect.user` is required and tells Zowe the owner of existing certificate. This field can have value of `SITE`.
  * `zowe.setup.certificate.keyring.connect.label` is also required and tells Zowe the label of existing certificate.
- If `zowe.verifyCertificates` is not `DISABLED`, and z/OSMF host (`zOSMF.host`) is provided, Zowe will try to trust the z/OSMF certificate.
  * If you are using `RACF` security manager, Zowe will try to automatically detect the z/OSMF CA based on certificate owner specified by
    `zowe.setup.certificate.keyring.zOSMF.user`. Default value of this field is `IZUSVR`. If the automatic detection failed, you will need to define `zowe.setup.certificate.keyring.zOSMF.ca` indicates what is the label of the z/OSMF root certificate authority.
  * If you are using `ACF2` or `TSS` (Top Secret) security manager, `zowe.setup.certificate.keyring.zOSMF.ca` is required to indicates what is the label of the z/OSMF root certificate authority.

- **`zowe.setup.vsam.mode`**  
Indicates whether the VSAM will utilize Record Level Sharing (RLS) services or not. Valid values are `RLS` or `NONRLS`.
- **`zowe.setup.vsam.volume`**  
Indicates the name of volume. This field is required if VSAM mode is `NONRLS`.
- **`zowe.setup.vsam.storageClass`**  
Indicates the name of RLS storage class. This field is required if VSAM mode is `RLS`.

### YAML configurations - java

The high-level configuration `java` supports these definitions:

- **`home`**  
 Defines the path to the Java runtime directory.

### YAML configurations - node

The high-level configuration `node` supports these definitions:

- **`home`**  
 Defines the path to the Node.js runtime directory.

:::tip
Ensure the value of `node.home` in the `zowe.yaml` is visible to the Zowe STC users, and contains `bin/node`.
**Example:**
```
node:
  home: "/usrlppSysplex/nodejs/node-v18.18.2"
```
The above value is valid only when the path `/usrlppSysplex/nodejs/node-v18.18.2/bin/node` exists. If you observe output of `node:...FSUM7351 not found`, check to ensure that the value contains `bin/node`.
:::

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
 You can customize a component to use different certificate from default values. This section follows same format defined in [YAML configurations - certificate](#yaml-configurations---certificate). If this is not customized, the component will use certificates defined in `zowe.certificate`.
- **`components.<component>.launcher`**  
 Any component can have a launcher section which overrides the overall Zowe Launcher default defined in `zowe.launcher`.

#### Configure component gateway

These configurations can be used under the `components.gateway` section:

- **`port`**  
 Defines the port which the gateway should be started on. This must be a valid port number.
- **`debug`**  
 Defines whether to enable debug mode for the Gateway.
- **`apiml.connectionTimeout`**
  Specifies the value in milliseconds which corresponds to the period in which API ML should establish a single, non-managed connection with the service. If omitted, the default value specified in the API ML Gateway service configuration is used.
- **`apiml.connection.idleConnectionTimeoutSeconds`**
  Specifies how long will the connection to southbound remains open without communication. The default value is 5 seconds. Unit is second.
- **`apiml.health.protected`**
  This property defines whether the health check endpoint is accessible with or without authentication.  
- **`apiml.gateway.timeoutMillis`**  
 Specifies the timeout for connection to the services in milliseconds.
- **`apiml.security.x509.enabled`**  
 Set this parameter to `true` to enable the client certificate authentication functionality through ZSS.
- **`apiml.security.x509.externalMapperUrl`**  
 Defines the URL where Gateway can query the mapping of client certificates.
- **`apiml.security.auth.jwt.customAuthHeader`**  
 Returns valid JWT header also in another header 
- **`apiml.security.auth.passticket.customAuthHeader`**
 Provides passtickets for the southbound service in the custom header 
- **`apiml.security.auth.passticket.customUserHeader`**
 Provides User Info when Passticket is provided in the custom header
- **`apiml.security.auth.provider`**  
 Defines the authentication provider used by the API Gateway.
- **`apiml.security.authorization.endpoint.url`**  
  Defines the URL to the authorization endpoint. This endpoint tells Gateway if a user has a particular permission on SAF profile. For example, permission to the `APIML.SERVICES` profile of `ZOWE` class.
- **`apiml.security.personalAccessToken.enabled`**  
  Enable Personal Access Tokens  
- **`apiml.security.useInternalMapper`**  
  This property is the global feature toggle. Set the value to true to enable Internal Mapper
- **`apiml.security.oidc.enabled`**  
  Specifies the global feature toggle. Set the value to `true` to enable OIDC authentication functionality.

- **`apiml.security.oidc.registry`**  
  Specifies the SAF registry used to group the identities recognized as having an OIDC identity mapping. The registry name is the string used during the creation of the mapping between the distributed and mainframe user identities. For more information, see the [ESM configuration](../extend/extend-apiml/api-mediation-oidc-authentication.md#esm-configuration-prerequisites).

- **`apiml.security.oidc.jwks.uri`**  
  Specifies the URI obtained from the authorization server's metadata where the Gateway will query for the JWK used to sign and verify the access tokens.

- **`apiml.security.oidc.jwks.refreshInternalHours`**  
  Specifies the frequency in hours to refresh the JWK keys from the OIDC provider. Defaults to one hour.

- **`apiml.security.oidc.identityMapperUser`**  
  (Optional) If the userId is different from the default Zowe runtime userId (`ZWESVUSR`), specify the `identityMapperUser` userId to configure API ML access to the external user identity mapper.

:::note

User authorization is required to use the `IRR.RUSERMAP` resource within the `FACILITY` class. The default value is `ZWESVUSR`. Permissions are set up during installation with the `ZWESECUR` JCL or workflow. To authenticate to the mapping API, a JWT is sent with the request. The token represents the user that is configured with this property.

:::

- **`apiml.security.oidc.identityMapperUrl`**  
  Defines the URL where the Gateway can query the mapping of the distributed user ID to the mainframe user ID. 
  This property informs the Gateway about the location of this API. ZSS is the default API provider in Zowe, but if you are using Zowe release 2.14 or a later version, we recommend you use the [API ML internal mapper](../user-guide/api-mediation/configuration-client-certificates.md#configure-internal-api-ml-mapper). You can provide your own API to perform the mapping. In this case, it is necessary to customize this value.

  The following URL is the default value for Zowe and ZSS:

    ```
    https://${ZWE_haInstance_hostname}:${GATEWAY_PORT}/zss/api/v1/certificate/dn
    ```
- **`apiml.security.ssl.verifySslCertificatesOfServices`**  
 Defines whether APIML should verify certificates of services in strict mode. Setting to `true` will enable the `strict` mode where APIML will validate if the certificate is trusted in truststore, and also if the certificate Common Name or Subject Alternate Name (SAN) matches the service hostname.
- **`apiml.security.ssl.nonStrictVerifySslCertificatesOfServices`**  
 Defines whether APIML should verify certificates of services in non-strict mode. Setting the value to `true` will enable the `non-strict` mode where APIML will validate if the certificate is trusted in truststore, but ignore the certificate Common Name or Subject Alternate Name (SAN) check. Zowe will ignore this configuration when strict mode is enabled with `apiml.security.ssl.verifySslCertificatesOfServices`.
- **`apiml.service.allowEncodedSlashes`**  
 When this parameter is set to `true`, the Gateway allows encoded characters to be part of URL requests redirected through the Gateway. 
- **`apiml.service.corsEnabled`**  
 When this parameter is set to `true`, CORS are enabled in the API Gateway for Gateway routes `gateway/api/v1/**`.
- **`server.maxConnectionsPerRoute`**  
  Specifies the maximum connections for each service.
- **`server.maxTotalConnections`**  
  Specifies the total connections for all services registered under API Mediation Layer.
- **`server.ssl.enabled`**  
  Specifies if TLS is used
- **`server.webSocket.maxIdleTimeout`**  
  This timeout handles how long the Websocket connection remains open if there is no communication happening over the open connection. The default is one hour (3600000 milliseconds).
- **`server.webSocket.connectTimeout`**  
  This timeout limits how long the API Gateway waits until it drops connection if it cannot reach the target server. The default is 45 seconds (45000 milliseconds). 
- **`server.webSocket.asyncWriteTimeout`**  
  This timeout handles how long it takes before the server fails with unsuccessful response when trying to write a message to the Websocket connection. The default is 60 seconds (60000 milliseconds).
- **`server.webSocket.requestBufferSize`**  
  This property handles the max request size allowed in WebSocket handshake requests. The default is 8K.


#### Configure component discovery

These configurations can be used under the `components.discovery` section:

- **`port`**  
 Defines the port which discovery should be started on. This may be defined as a valid port number or as an offset from the Gateway component's port. To define an offset enter `"+{offset}"` or `"-{offset}"` as a string. The offset must start with `+` or `-`.
- **`debug`**  
 Defines whether to enable debug mode for the Discovery Service.

- **`apiml.health.protected`**  
  This property defines whether the health check endpoint is accessible with or without authentication.
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
- **`server.ssl.enabled`**  
 Specifies if TLS is used

#### Configure component api-catalog

These configurations can be used under the `components.api-catalog` section:

- **`port`**  
 Defines the port which API Catalog should be started on.
- **`debug`**  
 Defines if we want to enable debug mode for the API Catalog. This is equivalent to the `APIML_DEBUG_MODE_ENABLED` variable but with better granular level.
- **`apiml.health.protected`**  
  This property defines whether the health check endpoint is accessible with or without authentication.
- **`apiml.security.authorization.provider`**  
  Provider used for SAF resource check
- **`apiml.security.authorization.endpoint.url`**  
  Base path of endpoint's URL (`{base path}/{userId}/{class}/{entity}/{level}`) 
- **`apiml.catalog.customStyle.logo`**  
  Specifies the location of the logo that will replace the default Zowe logo in the API Catalog header. The supported image formats are: `svg`, `png` and `jpg/jpeg`.
- **`apiml.catalog.customStyle.fontFamily`**  
  Specifies the font family to use across the API Catalog.
- **`apiml.catalog.customStyle.backgroundColor`**  
  Specifies the HTML color of the main background across the API Catalog
- **`apiml.catalog.customStyle.titlesColor`**  
  Specifies the title color.
- **`apiml.catalog.customStyle.headerColor`**  
  Specifies the HTML color of the header element in the API Catalog home page
- **`apiml.catalog.customStyle.textColor`**  
  Specifies the HTML color of the main text across the API Catalog
- **`apiml.catalog.customStyle.docLink`**  
  Specifies a custom link to be displayed in the header. Use this property to refer to applicable documentation. The format is `<link_name>|<link_url>`  

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
- **`storage.infinispan.initialHosts`**

  This property specifies the list of cluster nodes (members). In case of multiple instances, the value for each Caching Service instance can be either a list of all the members, separated by a comma, or just the replica. The format is `${haInstance.hostname}[${zowe.components.caching-service.storage.infinispan.jgroups.port}]`. 

- **`storage.infinispan.persistence.dataLocation`**

  The path where the Soft-Index store keeps its data files for the Infinispan Soft-Index Cache Store.
  The default value is `data`. If you run the Caching Service in Highly Available mode and the instances use the same filesystem, you have to specify a different value of the `CACHING_STORAGE_INFINISPAN_PERSISTENCE_DATALOCATION` property for each instance. For more information, see the [Soft-Index File Store](https://infinispan.org/blog/2014/10/31/soft-index-file-store).

- **`storage.infinispan.jgroups.port`**

  The port number used by Infinispan to synchronise data among caching-service instances.
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
 Optional settings you can override component configurations for this high availability instance. See [Configuration override - defaults.yaml](#configuration-override---defaultsyaml) for more details.

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

**Examples:**

- `ZWE_zowe_runtimeDirectory` is parent directory where `zwe` server command is located.
- `ZWE_zowe_workspaceDirectory` is the path of the user customized workspace directory.
- `ZWE_zowe_setup_dataset_prefix` is the high-level qualifier where Zowe MVS data sets are installed.
- `ZWE_zowe_setup_dataset_parmlib` is the data set configured to store customized version of parameter library members.
- `ZWE_zowe_setup_dataset_authPluginLib` is the data set configured to store APF authorized ZIS plug-ins load library.
- `ZWE_zowe_setup_security_users_zowe` is the name of Zowe runtime user.
- `ZWE_configs_port` is your component port number you can use in your start script. It points to the value of `haInstances.<current-ha-instance>.components.<your-component>.port`, or fall back to `components.<my-component>.port`, or fall back to `configs.port` defined in your component manifest.

### Troubleshooting your YAML with the Red Hat VS Code extension

After you download the Red Hat VSCode extension for YAML, YAML validation for your files is turned on by default. Syntax mistakes are highlighted in red. To parse sensitive information, we would highly recommend leaving the data gathering option disabled. To customize your settings, click on the "Extensions" category in VS Code left-hand side workspace, scroll down to YAML Language Support by Red Hat, and click on the gear icon and select "Extension Settings".
