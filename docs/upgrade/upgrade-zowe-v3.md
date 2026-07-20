# Upgrading from Zowe Vx to Zowe V3

Follow the procedure outlined in this article to upgrade from Zowe v2 to Zowe v3, or from Zowe v1 to Zowe v3. While the major version upgrading process is similar to a Zowe v2 minor release upgrade, there are several new and updated configuration parameters to consider. 

:::note
The workspace directory should be re-created only if you are using the app-server component.
:::

Follow the steps described in this article to ensure a smooth upgrade to Zowe v3.


## Prerequisite to upgrade to Zowe v3

* **Upgrade to the latest version of Zowe v2 (v2.18)**  
If you are currently running on an earlier v2 version of Zowe, before upgrading to Zowe v3.x, first upgrade to Zowe v2.18.x. The following upgrade procedure to Zowe v3 applies to Zowe v2.18.
Please follow the instructions from the version of Zowe you have and newer in order to prepare to upgrade from Zowe v2 to v3.0.0.

### Upgrading from Zowe v2.16.0 or Lower

<details>
<summary>Click here for configuration details.</summary>  

To upgrade from Zowe **v2.16.0** or a lower version, perform the following tasks. 

1) Ensure the following `zowe.network` section is added to your configuration:

```yaml
  network:
    server:
      tls:
        attls: false
        # TLS settings only apply when attls=false
        # Else you must use AT-TLS configuration for TLS customization.
        minTls: "TLSv1.2"
        maxTls: "TLSv1.3"
    client:
      tls:
        attls: false
```

2) Update your PROCLIB entries for Zowe, as enhancements and default parameters have changed throughout Zowe v2.
This can be performed with the unix command `zwe init stc`, by running the job ZWEISTC, or by copying the SZWESAMP members ZWESLSTC, ZWESISTC, and ZWESASTC into your desired PROCLIB.
3) If you use keyrings, verify that Zowe YAML references to `safkeyring`. Use two forward slashes (`safkeyring://`). Do not use four forward slashes (`safkeyring:////`).

</details>

### Upgrading from Zowe v2.15.0 or Lower

<details>
<summary>Click here for configuration details.</summary>  

To upgrade from Zowe **v2.15.0** or a lower version, perform the following tasks. 

If you are upgrading from Zowe **v2.15.0** or a lower version, ensure that Zowe configurations using keyrings do not have the section `zowe.certificate.pem`.
This section is no longer needed and can cause startup error in newer versions of Zowe.

</details>

### Upgrading from Zowe v2.10.0 or Lower

<details>
<summary>Click here for configuration details.</summary>  

To upgrade from Zowe **v2.10.0** or a lower version, perform the following tasks. 

If you are upgrading from Zowe **v2.10.0** or a lower version, consider taking advantage of the new **sysMessages** feature.

The `zowe.sysMessages` is a new array that allows you to select messages that, when found by the launcher, will be duplicated into the system's log.

</details>

### Upgrading from Zowe v2.9.0 or Lower

<details>
<summary>Click here for configuration details.</summary>

To upgrade from Zowe **v2.9.0** or a lower version, perform the following tasks. 

If you are upgrading from Zowe **v2.9.0** or a lower version, it is recommended to delete the `<zowe.workspaceDirectory>/app-server/plugins` directory so that it can be regenerated on the next run of Zowe.
In this version and prior there were old and no longer used Application Framework plugins and references to them will complicate logs with harmless errors.

</details>

### Upgrading from Zowe v2.3.0 or Lower

<details>
<summary>Click here for configuration details.</summary>

To upgrade from Zowe **v2.3.0** or a lower version, perform the following tasks. 

If you are running Zowe **v2.3.0** or a lower version, a **clean install** of Zowe v3 is highly recommended to avoid potential issues during the upgrade process.

</details>

### Upgrading from Zowe v1

<details>
<summary>Click here for configuration details.</summary>

To upgrade from Zowe **v1** perform the following tasks. 

If you are using v1, you must perform a clean install of Zowe rather than upgrading it as there is not a clear upgrade path from v1 to v2 or v3.
Any extensions or products built upon Zowe v1 are unlikely to work in v2 or v3 without upgrading them. Refer to any product documentation on actions to take. For more information, see [Upgrading from Zowe V1 to Zowe V2](../upgrade/upgrade-zowe-v2.md).

If you are using v1.27 or a later version of Zowe v1, you can retain your keyring or keystore with Zowe v2 and v3. 
During v2 or v3 installation, once your Zowe YAML configuration file is created, you can define the section `zowe.certificate` to re-use your certificates.

```yaml
zowe:
  certificate:
    keystore:
      type: "<your v1 KEYSTORE_TYPE value>"
      file: "<your v1 KEYSTORE value>"
      alias: "<your v1 KEY_ALIAS value>"
      password: "<your v1 KEYSTORE_PASSWORD value>"
    truststore:
      type: "<your v1 KEYSTORE_TYPE value>"
      file: "<your v1 TRUSTSTORE value>"
      password: "<your v1 KEYSTORE_PASSWORD value>"
    pem: # DELETE THIS PEM SECTION AND THE LINES BELOW IF USING KEYRINGS (type=JCERACFKS)
      key: "<your v1 KEYSTORE_KEY value>"
      certificate: "<your v1 KEYSTORE_CERTIFICATE value>"
      certificateAuthorities: "<your v1 KEYSTORE_CERTIFICATE_AUTHORITY value>"
```

</details>

## V3 Prerequisite Changes

Before starting the upgrade, ensure the following system requirements are met:

- **z/OSMF**  
Version V2R5 or V3R1 is required. JWT support for z/OSMF is highly recommended. For more information, see [Enabling JSON Web Token support](https://www.ibm.com/docs/en/zos/3.1.0?topic=configurations-enabling-json-web-token-support) in the IBM documentation. If you do not have JWT support in z/OSMF, make sure to set `components.gateway.apiml.security.auth.zosmf.jwtAutoconfiguration` to `ltpa`.
- **Java**  
Java 17 is required. The Zowe YAML parameter `java.home` value should be a **Java 17** home location. If an administrator uses `zwe init` to set up Zowe, ensure the `java` for that user is v17 by including it in the `PATH` environment variable.
- **Node.js**  
Ensure that the Zowe YAML parameter `node.home` value is **Node.js 18 or 20** home location. Node 16 and earlier versions are not supported.


## System and Security Changes

- Existing SAF settings for Zowe do not need to be changed for v3. Install steps such as `zwe init security`, the job or workflow ZWESECUR, and the jobs ZWEIRAC, ZWEITSS, and ZWEIACF are not required to be re-run.

- Existing keyrings and keystores do not need to be changed for v3. Install steps such as `zwe init certificate`, the job or workflow ZWEKRING, or jobs starting with ZWEIKR* are not required to be re-run.

- The following network changes are needed for added or removed servers:

| Component name | Change | Default Port | Default Jobname | Details |
|----------------|--------|--------------|-----------------|---------|
| zaas | Added | 7558 | ZWE1AZ | This component is responsible for authentication and is now required when using the API Mediation Layer |
| metrics-service | Removed | 7551 | ZWE1MS | This service has been deprecated and removed. Currently, no replacement is available. The Open Telemetry standard will be implemented later, which will serve as a replacement |
| jobs-api | Removed | 7558 | ZWE1EJ | This component was deprecated in Zowe v2 and is now removed. Ensure that you switch to using equivalent z/OSMF endpoints |
| files-api | Removed | 7559 | ZWE1EF | This component was deprecated in Zowe v2 and is now removed. Ensure that you switch to using equivalent z/OSMF endpoints |
| cloud-gateway | Removed | 7563 | ZWE1CG | The cloud-gateway has been removed as a standalone component and merged into the gateway |


## Configuration changes

Review the following changes to configuration and updated configuration parameters.

### New Configuration

**components.zaas**  
  Previously part of the `components.gateway` component, `zaas` in Zowe v3 is a separate component responsible for authentication.  
  If you do not explicitly configure this section, zaas will still be enabled by default and will use **port 7558**.

```yaml
components:
  zaas:
    enabled: true
    port: 7558
    debug: false
```

### Updated Configuration Parameters

#### Keyrings

If you use keyrings, verify that Zowe YAML references to `safkeyring`. Use two forward slashes (`safkeyring://`). Do not use four forward slashes (`safkeyring:////`).

Zowe v2 accepts an empty value for `zowe.certificate.keystore.password` and `zowe.certificate.truststore.password` when using keyring-based certificates. Zowe v3 requires both of these parameters to be set to the literal value `password`.

**Example:**

```yaml
zowe:
  certificate:
    keystore:
      type: JCERACFKS
      file: safkeyring://ZWESVUSR/ZoweKeyring
      password: password
      alias: localhost
    truststore:
      type: JCERACFKS
      file: safkeyring://ZWESVUSR/ZoweKeyring
      password: password
```

#### Gateway z/OSMF service configuration

The service ID for `gateway.apiml.security.auth.zosmf` has changed to **ibmzosmf**. <br />
Set `jwtAutoconfiguration` to `jwt` (default) or `ltpa`. Note that `auto` is no longer supported.<br />
If you are using zosmf as your auth service, ensure that you update this z/OSMF service configuration. 

```yaml
components:
  gateway:
    apiml:
      security:
        auth:
          zosmf:
            jwtAutoconfiguration: jwt
            serviceId: ibmzosmf
```

#### Caching Service

The Caching service now defaults to **Infinispan** mode instead of **VSAM**.
While **VSAM** is still supported, this storage method is being deprecated and is not recommended.
A new parameter for the key exchange port has been added to the default configuration.

```yaml
components:
  caching-service:
    storage:
      mode: infinispan
      infinispan:
        jgroups:
          port: 7600
          keyExchange:
            port: 7601
```

:::note
If you enable single-service deployment mode, **Infinispan is the required storage option** for the Caching Service. Other storage modes are not supported in single-service deployment mode.
:::

#### Single-service deployment mode

Starting from Zowe v3.4.0, we recommend using the single-service deployment of API Mediation Layer. API ML single-service deployment mode runs the Gateway, Discovery Service, API Catalog, and Caching Service in a single JVM process, which improves performance and simplifies configuration. For more information about enabling this mode and requirements for single-service deployment, see [Enabling single-service deployment of API Mediation Layer](../user-guide/api-mediation/api-mediation-modulith.md).

#### ZSS Server

The ZSS server now runs in **64-bit** mode by default.

```yaml
components:
  zss:
    agent:
      64bit: true
```

### Deprecated Settings

The following configuration parameters have been deprecated in Zowe v3. Ensure that these parameters are removed from your configuration.

**zowe.useConfigmgr**  
The parameter `zowe.useConfigmgr=false` is no longer supported.

**components.gateway.server.internal**  
The internal gateway server has been removed due to limited usage.

```yaml
components:
  gateway:
    server:
      internal:
```
