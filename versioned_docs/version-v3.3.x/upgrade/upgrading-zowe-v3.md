# Upgrading from Zowe Vx to Zowe V3

:::tip Upgrading to the latest Zowe version
This article describes upgrading to Zowe v3.3. To upgrade to the latest Zowe version (v3.6), see [Upgrading from Zowe Vx to Zowe V3.6](https://docs.zowe.org/stable/upgrade/upgrading-zowe-v3/).
:::

Follow the procedure outlined in this article to upgrade from Zowe v2 to Zowe v3, or Zowe v1 to Zowe v3. While the upgrade process is similar to a Zowe v2 minor release upgrade, there are several new and updated configuration parameters to consider. The workspace directory should be re-created only if you are using the app-server component.
Follow the steps described in this article to ensure a smooth upgrade.


## Preparing Your Current Zowe Instance

To ensure a smooth transition to Zowe v3.3, you must first resolve any configuration changes required by your current version. If you are running an earlier v2 version of Zowe, you must follow all of the procedures that correspond to your current version, plus each of the later Zowe versions up to and including v2.18.x. Apply the necessary configurations before proceeding with the v3.3 upgrade.

:::note
All v2.x installations must first upgrade to v2.18.x before upgrading to v3.3.
:::

<details>
<summary><strong>Upgrading from Zowe v2.17.x</strong></summary>
<br />

If you are on v2.17.x, do a standard upgrade to v2.18.x. For more information, see [Upgrading Zowe](./upgrading-zowe.md). 

</details>

<details>
<summary><strong>Upgrading from Zowe v2.16.x</strong></summary>
<br />

To upgrade from Zowe v2.16.x, first upgrade to v2.18.x, and perform the following tasks before moving to v3.x:

1. **Update TLS configurations.**  
Ensure the following `zowe.network` section is added to your `zowe.yaml` file:
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
1. **Update PROCLIB entries.**  
Enhancements and default parameters have changed throughout Zowe v2. This can be performed with the unix command `zwe init stc`, by running the job `ZWEISTC`, or by copying the `SZWESAMP` members `ZWESLSTC`, `ZWESISTC`, and `ZWESASTC` into your desired PROCLIB.
1. **Verify keyring slashes.**  
If you use keyrings, verify that Zowe YAML references to `safkeyring`. Use two forward slashes (`safkeyring://`). Do not use four forward slashes (`safkeyring:////`).

</details>

<details>
<summary><strong>Upgrading from Zowe v2.11.x through v2.15.x</strong></summary>
<br />

To upgrade from any version between v2.11.x and v2.15.x, first upgrade to v2.18.x, and perform the following tasks before moving to v3.x:

1. **Remove PEM references.**  
Ensure that Zowe configurations using keyrings do not have the section `zowe.certificate.pem`. This section is no longer needed and can cause a start-up error in newer versions of Zowe.
1. **Update TLS configurations.**  
Ensure the following `zowe.network` section is added to your `zowe.yaml` file:
    ```yaml
      network:
        server:
          tls:
            attls: false
            minTls: "TLSv1.2"
            maxTls: "TLSv1.3"
        client:
          tls:
            attls: false
    ```
2. **Update PROCLIB entries.**  
Update your PROCLIB entries for Zowe using `zwe init stc`, the `ZWEISTC` job, or by copying the `SZWESAMP` members into your PROCLIB.
1. **Verify keyring slashes.**  
If using keyrings, ensure Zowe YAML references use exactly two forward slashes (`safkeyring://`).

</details>

<details>
<summary><strong>Upgrading from Zowe v2.10.x</strong></summary>
<br />

To upgrade from v2.10.x, first upgrade to v2.18.x, and perform the following tasks before moving to v3.x:

1. **(Optional) Enable sysMessages duplication.**  
You can now use the new array `zowe.sysMessages` to select messages that, when found by the launcher, are duplicated into the system's log.
2. **Remove PEM references.**  
Ensure that Zowe configurations using keyrings do not have the section `zowe.certificate.pem`. 
3. **Update TLS configurations.**  
Add the following `zowe.network` section to your `zowe.yaml` file:
    ```yaml
      network:
        server:
          tls:
            attls: false
            minTls: "TLSv1.2"
            maxTls: "TLSv1.3"
        client:
          tls:
            attls: false
    ```
4. **Update PROCLIB entries.**  
Update your PROCLIB entries for Zowe using `zwe init stc`, the `ZWEISTC` job, or by copying the `SZWESAMP` members into your PROCLIB.
5. **Verify keyring slashes.**  
If using keyrings, ensure Zowe YAML references use exactly two forward slashes (`safkeyring://`).

</details>

<details>
<summary><strong>Upgrading from Zowe v2.4.x through v2.9.x</strong></summary>
<br />

To upgrade from any version between v2.4.x and v2.9.x, first upgrade to v2.18.x, and perform the following tasks before moving to v3.x:

1. **Clean up application framework plug-ins.**  
Delete the `<zowe.workspaceDirectory>/app-server/plugins` directory so that it can be regenerated on the next run of Zowe. Old plug-ins left here will complicate logs with harmless errors.
2. **(Optional) Enable sysMessages duplication.**  
You can use the new array `zowe.sysMessages` to select messages that, when found by the launcher, are duplicated into the system's log.
3. **Remove PEM references.**  
Ensure that Zowe configurations using keyrings do not have the section `zowe.certificate.pem`. 
4. **Update TLS configurations**  
Add the following `zowe.network` section to your `zowe.yaml` file:
    ```yaml
      network:
        server:
          tls:
            attls: false
            minTls: "TLSv1.2"
            maxTls: "TLSv1.3"
        client:
          tls:
            attls: false
    ```
5. **Update PROCLIB entries.**  
Update your PROCLIB entries for Zowe using `zwe init stc`, the `ZWEISTC` job, or by copying the `SZWESAMP` members into your PROCLIB.
6. **Verify keyring slashes.**  
If using keyrings, ensure Zowe YAML references use exactly two forward slashes (`safkeyring://`).

</details>

<details>
<summary><strong>Upgrading from Zowe v2.3.x or earlier</strong></summary>
<br />

If your current version is v2.3.x or earlier, a clean install of Zowe v3.3 is highly recommended to avoid potential issues during the upgrade process, rather than attempting to manually patch the configuration forward.

Please proceed with a fresh installation of Zowe v3.3.

</details>

<details>
<summary><strong>Upgrading from Zowe v1.x</strong></summary>
<br />

If you are using v1, you must perform a clean install of Zowe v3.3 rather than performing an upgrading, as there is not a clear upgrade path from v1 to v2 or v3. Any extensions or products built upon Zowe v1 are unlikely to work in v2 or v3 without upgrading them. 

If you are using v1.27 or a later version of Zowe v1, you can retain your keyring or keystore. During v3.3 installation, once your Zowe YAML configuration file is created, you can define the section `zowe.certificate` to re-use your certificates:

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
Version V2R5 or V3R1 is required. JWT support for z/OSMF is highly recommended. For more information, see [Enabling JSON Web Token support](https://www.ibm.com/docs/en/zos/3.1.0?topic=configurations-enabling-json-web-token-support) in the IBM documentation. If you do not have JWT support in z/OSMF, make sure to set `components.gateway.apiml.security.auth.zosmf.jwtAutoconfiguration` to `ltpa`.
- **Java**  
Java 17 is required. Java 21 is also supported. The Zowe YAML parameter `java.home` value should be a **Java 17** (or **Java 21**) home location. If an administrator uses `zwe init` to set up Zowe, ensure the `java` for that user is v17 (or v21) by including it in the `PATH` environment variable.
- **Node.js**  
Ensure that the Zowe YAML parameter `node.home` value is a **Node.js 18, 20, 22 or 24** home location. Node 16 and earlier versions are not supported. For details, see [Addressing Node.js requirements](../user-guide/install-nodejs-zos.md).


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

If you use keyrings, verify that Zowe YAML references to `safkeyring`. Use two forward slashes (`safkeyring://`). Do not use four forward slashes (`safkeyring:////`).

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
