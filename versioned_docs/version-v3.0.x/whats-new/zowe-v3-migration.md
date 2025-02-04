# Migrating from Zowe Vx to Zowe V3

Follow the procedure outlined in this article to migrate from Zowe v2 to Zowe v3, or Zowe v1 to Zowe v3. While the migration process is similar to a Zowe v2 minor release upgrade, there are several new and updated configuration parameters to consider. The workspace directory should be re-created only if you are using the app-server component.
Follow the steps described in this article to ensure a smooth migration.


## Upgrading to the latest version of Zowe v2 (v2.18)

Before upgrading to Zowe v3.0.0, first upgrade to Zowe v2.18, as the rest of the migration instructions are based upon Zowe v2.18.
Please follow the instructions from the version of Zowe you have and newer in order to prepare to upgrade from Zowe v2 to v3.0.0.

### Migrating from Zowe v2.16.0 or Lower

<details>
<summary>Click here for configuration details.</summary>  

To migrate from Zowe **v2.16.0** or a lower version, perform the following tasks. 

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

</details>

### Migrating from Zowe v2.15.0 or Lower

<details>
<summary>Click here for configuration details.</summary>  

To migrate from Zowe **v2.15.0** or a lower version, perform the following tasks. 

If you are migrating from Zowe **v2.15.0** or a lower version, ensure that Zowe configurations using keyrings do not have the section `zowe.certificate.pem`.
This section is no longer needed and can cause startup error in newer versions of Zowe.

</details>

### Migrating from Zowe v2.10.0 or Lower

<details>
<summary>Click here for configuration details.</summary>  

To migrate from Zowe **v2.10.0** or a lower version, perform the following tasks. 

If you are migrating from Zowe **v2.10.0** or a lower version, consider taking advantage of the new **sysMessages** feature.

The `zowe.sysMessages` is a new array that allows you to select messages that, when found by the launcher, will be duplicated into the system's log.

</details>

### Migrating from Zowe v2.9.0 or Lower

<details>
<summary>Click here for configuration details.</summary>

To migrate from Zowe **v2.9.0** or a lower version, perform the following tasks. 

If you are migrating from Zowe **v2.9.0** or a lower version, it is recommended to delete the `<zowe.workspaceDirectory>/app-server/plugins` directory so that it can be regenerated on the next run of Zowe.
In this version and prior there were old and no longer used Application Framework plugins and references to them will complicate logs with harmless errors.

</details>

### Migrating from Zowe v2.3.0 or Lower

<details>
<summary>Click here for configuration details.</summary>

To migrate from Zowe **v2.3.0** or a lower version, perform the following tasks. 

If you are running Zowe **v2.3.0** or a lower version, a **clean install** of Zowe v3 is highly recommended to avoid potential issues during the migration process.

</details>

### Migrating from Zowe v1

<details>
<summary>Click here for configuration details.</summary>

To migrate from Zowe **v1** perform the following tasks. 

If you are using v1, you must perform a clean install of Zowe rather than upgrading it as there is not a clear upgrade path from v1 to v2 or v3.
Any extensions or products built upon Zowe v1 are unlikely to work in v2 or v3 without upgrading them. Refer to any product documentation on actions to take. [More details](../extend/migrate-extensions.md)

If you are using v1.27 or newer, you can retain your keyring or keystore with Zowe v2 and v3. 
During v2 or v3 installation, once your Zowe YAML configuration file is created, you can define a section `zowe.certificate` as follows to re-use your certificates.

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

Before starting the migration, ensure the following system requirements are met:

- **z/OSMF**  
Version V2R5 with APAR PH12143 or V3R1 is required. JWT support for z/OSMF must be enabled. For more information, see [Enabling JSON Web Token support](https://www.ibm.com/docs/en/zos/3.1.0?topic=configurations-enabling-json-web-token-support) in the IBM documentation.
- **Java**  
Java 17 is required. The Zowe YAML parameter `java.home` value should be a **Java 17** home location. If an administrator uses `zwe init` to set up Zowe, ensure the `java` for that user is v17 by including it in the `PATH` environment variable.
- **Node.js**  
Ensure that the Zowe YAML parameter `node.home` value is **Node.js 18 or 20** home location. Node 16 and earlier versions are no longer supported.


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
  Previously part of the `components.gateway` component, zaas in Zowe v3 is a separate component responsible for authentication.  
  If you do not explicitly configure this section, zaas will still be enabled by default and will use **port 7558**.

```yaml
components:
  zaas:
    enabled: true
    port: 7558
    debug: false
```

### Updated Configuration Parameters
---

#### Keyrings

If you are using keyrings, verify that Zowe YAML references to `safkeyring` use 2 slashes, not 4, such as `safkeyring://` instead of `safkeyring:////`.

#### Gateway z/OSMF service configuration

The service ID for gateway zosmf has changed to **ibmzosmf**. <br/>
Set `jwtAutoconfiguration` to **jwt** (default) or **ltpa**. Note that **auto** is no longer supported.<br/>
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
A new parameter for the key exchange port has been added to the default configuraion.

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
