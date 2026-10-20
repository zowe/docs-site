# Upgrading from Zowe Vx to Zowe V3.6

Follow the procedure outlined in this article to upgrade from Zowe v2 to Zowe v3.6, or from Zowe v1 to Zowe v3.6.

:::info Required roles: system administrator, system programmer
:::

While the major version upgrading process is similar to a Zowe v2 minor release upgrade, there are several new and updated configuration parameters to consider. 

Follow the steps described in this article to ensure a smooth upgrade to Zowe v3.6. The procedure is written for installations running Zowe v2.18.6 or a later v2.18.x release, and has three phases:

1. [**Preparing your current Zowe instance**](#preparing-your-current-zowe-instance).
2. [**Upgrade the runtime**](#upgrade-the-runtime) to Zowe v3.6.
3. [**Verify the upgrade**](#verify-the-upgrade) with the post-upgrade checklist.

:::note
The workspace directory should be re-created only if you are using the app-server component.
:::

## Prerequisites for Zowe v3.6

Before starting the upgrade, ensure the following base system requirements are met:

*   **z/OSMF**  
    Version V2R5 or V3R1 is required. JWT support for z/OSMF is highly recommended. For more information, see [Enabling JSON Web Token support](https://www.ibm.com/docs/en/zos/3.1.0?topic=configurations-enabling-json-web-token-support) in the IBM documentation. If you do not have JWT support in z/OSMF, make sure to set `components.gateway.apiml.security.auth.zosmf.jwtAutoconfiguration` to `ltpa`.
*   **Java**  
    Java 17 or higher (21 supported, 17–21 enforced) is required. The Zowe YAML parameter `java.home` value should be a **Java 17** or **Java 21** home location. If an administrator uses `zwe init` to set up Zowe, ensure the `java` for that user is v17 or higher by including it in the `PATH` environment variable.
*   **Node.js**  
    Ensure that the Zowe YAML parameter `node.home` value is a **Node.js 18 - 24** home location. Node 16 and earlier versions are not supported.

---

## Preparing Your Current Zowe Instance

To ensure a smooth transition to Zowe v3.6, you must first resolve any configuration changes required by your current version. **Expand the section below that matches your current Zowe version** and apply the necessary configurations before proceeding with the v3.6 upgrade. 

:::note
Before upgrading to Zowe v3.6, All v2.x installations must first upgrade to v2.18.x before upgrading to v3.6.
:::

<details>
<summary><strong>Upgrading from Zowe v2.18.6</strong></summary>
<br />
<!-- This whole dropdown section is new -->
To upgrade from Zowe v2.18.x, perform the following procedure before you install Zowe v3.6.

:::note  
v2.18.6 does not contain registration metadata validation filters. In v3.6, upgrades contain both actuator authentication and metadata validation.
:::

1. **Set the authentication provider.**  
Set `components.gateway.apiml.security.auth.provider` explicitly to `zosmf` or `saf` in `zowe.yaml`, so that the behavior does not depend on version-dependent defaults. The provider default is not changed when you upgrade: `zosmf` is preserved for upgraded configurations, while `saf` is the default in `example-zowe.yaml` for new installations.

    ```yaml
    components:
      gateway:
        apiml:
          security:
            auth:
              provider: zosmf # or saf
    ```

2. **Verify runtime levels.**  
Confirm that the Java and Node.js versions meet the [prerequisites](#prerequisites-for-zowe-v36). If the installation runs older or newer levels, update `java.home` and `node.home` in `zowe.yaml`.

3. **Verify z/OSMF JWT support.**  
Confirm that z/OSMF JWT support is available, as described in the [prerequisites](#prerequisites-for-zowe-v36). If z/OSMF JWT support is not available, choose one of the following actions:
  - Apply or enable JWT support. For more information, see [Enabling JSON Web Token support](https://www.ibm.com/docs/en/zos/3.1.0?topic=configurations-enabling-json-web-token-support) in the IBM documentation.
  - Set `jwtAutoconfiguration` to `ltpa` (not usable with hardware-accelerated ICSF keyrings).

    ```yaml
      components:
        gateway:
          apiml:
            security:
              auth:
                zosmf:
                  jwtAutoconfiguration: ltpa   # jwt (default) | ltpa
      zowe:
        launchScript:
          startupChecks:
            zosmfjwt: warn                     # exit (default) | warn | disabled
    ``` 

  - Downgrade the `zosmfjwt` startup check to `warn` or `disabled`.

  :::note
  If z/OSMF is not used for login, no JWT setup is needed.
  :::

4. **Identify consumers of unauthenticated operational endpoints.**  
Identify any monitoring probes, readiness checks, and automation that call the following endpoints without credentials:
    * `/application/info`
    * `/application/version`
    * `/application/health`
    * `/gateway/version`
    * `/gateway/api/v1/version`

    Update the endpoints to send credentials (Basic authentication or a Bearer JWT). Alternatively, if you choose to accept the exposure, set `components.gateway.apiml.health.protected` to `false`.
<!-- TODO: perhaps add a link here for guidance -->

5. **Add registration metadata hosts to the allow-list.**  
Zowe v3.6 validates the hosts in service registration metadata against `zowe.network.allowedDomains`. The defaults cover `externalDomains` and high availability (HA) hostnames only. Add services that register URL metadata (such as `instanceBaseUrls`, API documentation or Swagger URLs, or `corsAllowedOrigins`) from other hosts to `zowe.network.allowedDomains` before you upgrade.
<!-- TODO: perhaps add a link here for guidance -->

6. **Apply the v2 to v3 breaking changes.**  
Review the [System and Security Changes](#system-and-security-changes) and [Configuration changes](#configuration-changes) sections of this article. The following breaking changes affect the upgrade:
    * The authentication route `/api/v1/gateway` is now `/gateway/api/v1`.
    * `zaas` is a separate component that uses port 7558.
    * `jobs-api`, `files-api`, `metrics-service`, and `cloud-gateway` are removed. `metrics-service` is replaced by the OpenTelemetry implementation. <!-- TODO: perhaps add a link here for guidance -->
    * Keyring URIs use exactly two slashes (`safkeyring://`).
    * Keyring `keystore` and `truststore` passwords use the literal value `password`.
    * `zowe.useConfigmgr=false` and the gateway internal server are no longer supported.

    For the complete list, see [Breaking changes in Zowe v3](../whats-new/breaking-changes-v3.md).
<!-- TODO: confirm the exact article title of breaking-changes-v3.md -->

</details>

<details>
<summary><strong>Upgrading from Zowe v2.17.x</strong></summary>
<br />

If you are on v2.17.x, first upgrade to v2.18.x. 
<!-- how does a user do this -->
Your configuration is already up-to-date with the necessary v2 prerequisites. You may proceed directly to the **System and Architecture Changes** and **V3 Configuration Changes** sections below to complete your upgrade to v3. <!-- This text may need to change for v 3.6 -->

</details>

<details>
<summary><strong>Upgrading from Zowe v2.16.x</strong></summary>
<br />

To upgrade from Zowe v2.16.x, first upgrade to v2.18.x, and perform the following tasks before moving to v3:

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
2. **Update PROCLIB entries.**  
Enhancements and default parameters have changed throughout Zowe v2. This can be performed with the unix command `zwe init stc`, by running the job `ZWEISTC`, or by copying the `SZWESAMP` members `ZWESLSTC`, `ZWESISTC`, and `ZWESASTC` into your desired PROCLIB.
3. **Verify keyring slashes.**  
If you use keyrings, verify that Zowe YAML references to `safkeyring`. Use two forward slashes (`safkeyring://`). Do not use four forward slashes (`safkeyring:////`).

</details>

<details>
<summary><strong>Upgrading from Zowe v2.11.x through v2.15.x</strong></summary>
<br />

To upgrade from any version between v2.11.x and v2.15.x, first upgrade to v2.18.x, and perform the following tasks before moving to v3:

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

To upgrade from v2.10.x, first upgrade to v2.18.x, and perform the following tasks before moving to v3:

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

To upgrade from any version between v2.4.x and v2.9.x, first upgrade to v2.18.x, and perform the following tasks before moving to v3:

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

If your current version is v2.3.x or earlier, a clean install of Zowe v3 is highly recommended to avoid potential issues during the upgrade process, rather than attempting to manually patch the configuration forward.

Please proceed with a fresh installation of Zowe v3.

</details>

<details>
<summary><strong>Upgrading from Zowe v1.x</strong></summary>
<br />

If you are using v1, you must perform a clean install of Zowe v3 rather than performing an upgrading, as there is not a clear upgrade path from v1 to v2 or v3. Any extensions or products built upon Zowe v1 are unlikely to work in v2 or v3 without upgrading them. 

If you are using v1.27 or a later version of Zowe v1, you can retain your keyring or keystore. During v3 installation, once your Zowe YAML configuration file is created, you can define the section `zowe.certificate` to re-use your certificates:

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

## Upgrade the runtime

After you prepare your current Zowe instance, upgrade the Zowe runtime to v3.6.
<!-- Standard upgrade flow ?? this should be reworded -->
1. **Run the standard upgrade flow**

   a. Install the Zowe v3.6 build. <!-- Need to link somewhere to Installing -->  
   b. Run the `zwe init` steps that apply to your installation, such as `zwe init mvs`, `zwe init apfauth`, `zwe init stc`, and `zwe init security`.  
   c. Refresh the PROCLIB members. <!-- Need to link somewhere how to do this -->

    Existing SAF permissions and keyrings or keystores do not need to be set up again. Unless an SMP/E HOLD statement states otherwise, your certificates and security rules carry over to the new version as well.

2. **Expect automatic startup checks on the first start**

    Zowe v3.6 runs the following checks automatically each time it starts. For more information, see [z/OS pre-flight checks](../user-guide/zos-preflight.md).

    | Startup check | Default behavior | Override property |
    |---------------|------------------|-------------------|
    | Certificate | `exit` | `zowe.launchScript.startupChecks.certificate` |
    | User superuser check | `exit` | `zowe.launchScript.startupChecks.user` |
    | Components | `warn` | <!-- TODO: confirm property --> |
    | Java and Node.js dependency checks | Enforce Java 17–21 and Node.js 18–24 | <!-- TODO: confirm property --> |
    | z/OSMF JWT (`zosmfjwt`) | `exit` | `zowe.launchScript.startupChecks.zosmfjwt` |

    A failing check defaulting to `exit` prevents Zowe from starting. Resolve the failing check<!-- maybe we need more guidance here? --> or set the matching `zowe.launchScript.startupChecks.*` property to `warn` or `disabled`:

    ```yaml
    zowe:
    launchScript:
      startupChecks:
        zosmfjwt: exit       # exit (default) | warn | disabled
        user: exit           # superuser (UID 0) check for ZWESVUSR
        certificate: exit    # keystore/truststore validation (zwe validate certificate)
        components: warn     # YAML component existence check
        # javaMin/javaMax and nodeMin/nodeMax govern the dependency checks
    ```

     :::note
      Setting a check to `warn` or `disabled` hides a real misconfiguration. Use these values as a temporary measure, and resolve the underlying finding.
      :::

3. **(Optional) Clear Infinispan persistence data**

    If the Caching Service uses Infinispan storage, persistence data written by the earlier Infinispan version can prevent the service from starting after the upgrade. If this occurs, see the following procedure:

      a. Stop Zowe.  
      b. Remove the Infinispan persistence directory. Delete the contents or the folder located at:
   `<zowe.workspaceDirectory>/caching-service`.  
      c. Restart Zowe.

    :::warning
    Removing the persistence directory clears all stored Caching Service data, including revoked Personal Access Tokens (PATs) and revoked Zowe JWTs.
    :::

    :::note
    On Java 21 and later, virtual threads are automatically disabled on z/OS. To control this behavior explicitly, use the `storage.infinispan.useVirtualThreads` property of the Caching Service.
    :::

## Verify the upgrade

After Zowe v3.6 starts, use the following checklist to confirm that the upgrade is successful.

- The following commands pass at the intended levels:
  
    - `zwe validate dependencies`
    - `zwe validate certificate`
    - `zwe validate zosmf jwt`
  
- Confirm that unauthenticated requests to `/application/info` returns HTTP 401. The same request with credentials returns HTTP 200.
- Confirm that onboarded services successfully. Any rejected registration metadata should be explained by the allow-list, and is not an error.
- Confirm z/OSMF is reachable through the API Gateway by the `/ibmzosmf` route, not `/zosmf`.
- (HA installations only) Confirm that on startup, Zowe creates `.zowe-<haInstance>-merged.yaml` in the workspace `.env` directory, and that `ZWE_HA_INSTANCE_CONFIG` points to that file.
<!-- TODO: perhaps add a link here for guidance -->
<!-- All these System and Configuration changes come after Verifying the Upgrad ?? Should probably be a separate topic -->
## System and Security Changes

* **SAF Settings**  
Existing SAF settings for Zowe do not need to be changed for v3. Install steps such as zwe init security, the job or workflow `ZWESECUR`, and the jobs `ZWEIRAC`, `ZWEITSS`, and `ZWEIACF` are not required to be re-run.

* **Keyrings and Keystores**  
Existing keyrings and keystores do not need to be changed for v3. Install steps such as `zwe init certificate`, the job or workflow `ZWEKRING`, or jobs starting with `ZWEIKR*` are not required to be re-run.

The following network changes are needed for added or removed servers:

| Component name | Change | Default Port | Default Jobname | Details |
|----------------|--------|--------------|-----------------|---------|
| zaas | Added | 7558 | ZWE1AZ | This component is responsible for authentication and is now required when using the API Mediation Layer |
| metrics-service | Removed | 7551 | ZWE1MS | This service has been deprecated and removed. Currently, no replacement is available. The Open Telemetry standard will be implemented later, which will serve as a replacement |
| jobs-api | Removed | 7558 | ZWE1EJ | This component was deprecated in Zowe v2 and is now removed. Ensure that you switch to using equivalent z/OSMF endpoints |
| files-api | Removed | 7559 | ZWE1EF | This component was deprecated in Zowe v2 and is now removed. Ensure that you switch to using equivalent z/OSMF endpoints |
| cloud-gateway | Removed | 7563 | ZWE1CG | The cloud-gateway has been removed as a standalone component and merged into the gateway |

## V3 Configuration changes
<!-- Need to update t v 3.6 changes -->

Review the following changes to configuration and updated configuration parameters.

### New Configuration

* **components.zaas**  
Previously part of the `components.gateway` component, `zaas` in Zowe v3 is a separate component responsible for authentication. If you do not explicitly configure this section, `zaas` will still be enabled by default and will use **port 7558**.

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

### Deprecated Settings in Zowe v3

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

