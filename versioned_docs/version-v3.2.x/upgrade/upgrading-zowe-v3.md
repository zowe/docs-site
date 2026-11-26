# Upgrading from Zowe Vx to Zowe V3.6

Review the procedure outlined in this article to upgrade to the latest version of Zowe server-side (currently to v3.6) from any earlier v3.x version, as well as from Zowe v2. If you are using Zowe v1, the article describes a clean installation of Zowe v3.6 instead of an upgrade.

:::info Required roles: system administrator, system programmer
:::


:::warning Breaking changes in Zowe v3.6  
Zowe v3.6 includes breaking changes made to address security risks. Review these changes before you upgrade. For details about all breaking changes including security upgrades introduced in Zowe v3.6, see [Breaking Changes in Zowe V2 and Zowe V3](https://docs.zowe.org/stable/appendix/security-breaking-changes/).
:::

Follow the steps described in this article to ensure a smooth upgrade to Zowe v3.6. The procedure applies to upgrades from previous supported Zowe versions and has three phases:

1. [**Preparing your current Zowe instance**](#preparing-your-current-zowe-instance).
2. [**Upgrading the runtime**](#upgrading-the-runtime) to Zowe v3.6.
3. [**Verify the upgrade**](#verifying-the-upgrade) with the post-upgrade checklist.

:::note
The workspace directory should be re-created only if you are using the app-server component. 
:::

## Prerequisites for Zowe v3.6

Before starting the upgrade, ensure the following base system requirements are met:

*   **z/OSMF**  
    Version V2R5 or V3R1 is required. JWT support for z/OSMF is highly recommended. For more information, see [Enabling JSON Web Token support](https://www.ibm.com/docs/en/zos/3.1.0?topic=configurations-enabling-json-web-token-support) in the IBM documentation. If you do not have JWT support in z/OSMF, make sure to set `components.gateway.apiml.security.auth.zosmf.jwtAutoconfiguration` to `ltpa`.
*   **Java**  
    Java 17 or Java 21 is required. At startup, Zowe does not start if the Java version is lower than 17. The Zowe YAML parameter `java.home` value must be a **Java 17** or **Java 21** home location. If an administrator uses `zwe init` to set up Zowe, ensure the `java` for that user is v17 or v21 by including it in the `PATH` environment variable.
*   **Node.js**  
    Node.js 18, 20, 22, or 24 is required. The Zowe YAML parameter `node.home` value must be a **Node.js 18**, **Node.js 20**, **Node.js 22**, or **Node.js 24** home location. Node.js 16 and earlier versions are not supported.

## Preparing Your Current Zowe Instance

To ensure a smooth transition to Zowe v3.6, you must first resolve any configuration changes required by your current version. If you are running an earlier v2 version of Zowe, open the section for your version below. Each section lists all of the tasks required from that version up to v2.18.x, so you do not need to complete the sections for later v2 versions. After you complete these tasks and upgrade to v2.18.x, continue with [Upgrading from Zowe v2.18.x to v3.6](#upgrading-from-zowe-v218x-to-v36). Apply the necessary configurations before proceeding with the v3.6 upgrade. 

:::note
All v2.x installations must first upgrade to v2.18.x before upgrading to the latest Zowe v3  version (currently v3.6). For v2.x versions, upgrade instructions up to v2.18 are provided within the following collapsable sections.
:::

<details>
<summary><strong>Upgrading from Zowe v3.x to v3.6</strong></summary>
<br />

:::warning Zowe v3.6 introduces breaking changes  
While upgrading within Zowe v3 is a minor-version upgrade, Zowe v3.6 includes security patches that change existing behavior. It is necessary to review and address these changes before you start Zowe v3.6, or your services, monitoring, and automation might fail. The changes include:

* **Strict URL validation** is enabled by default. Requests with encoded characters in the URL path are rejected.
* **Actuator endpoints** (`/application/info` and `/application/version`) now require authentication. Unauthenticated requests return HTTP 401.
* **Service registration** is validated against `zowe.network.allowedDomains`. Services registering from other hosts can be rejected.
:::

To upgrade from Zowe v3.5 or an earlier v3.x version, complete the following required tasks before you install Zowe v3.6. Make configuration changes in a copy of your `zowe.yaml` file, because v3.5 and earlier versions might ignore or reject properties that v3.6 introduces. You can complete all of the tasks while your current Zowe instance is still running. After the required tasks, review the optional properties that v3.6 introduces.

1. **Verify runtime levels.**  
Confirm that the Java version (17 or 21) and the Node.js version (18, 20, 22, or 24) meet the [prerequisites](#prerequisites-for-zowe-v36). Update `java.home` and `node.home` in `zowe.yaml` if needed.

1. **Decide how to handle strict URL validation.**  
In Zowe v3.6, the API Gateway rejects requests whose URL path contains `%2F`, `%2F%2F`, `%5C`, `%25`, `%2E`, or `;`. Check whether any onboarded service or client depends on these characters. For routing options, see [Strict URL validation replaces allowEncodedSlashes](https://docs.zowe.org/stable/whats-new/api-ml-v3.6-upgrade-and-security-enhancements/#strict-url-validation-replaces-allowencodedslashes) in the article _API ML V3.6 upgrade and security enhancements_.

   Zowe v3.6 removes the property `components.gateway.apiml.service.allowEncodedSlashes`. If your services require encoded characters, add the new property `components.gateway.apiml.security.enableStrictUrlValidation` to your copy of `zowe.yaml` and set it to `false`. This restores the earlier behavior.

   ```yaml
   components:
     gateway:
       apiml:
         security:
           enableStrictUrlValidation: false
   ```

   The Gateway-internal endpoints (`/gateway`, `/application`, `/images`, and `/v3/api-docs`) always enforce strict validation, regardless of this setting.

1. **Add the hosts from which services register to `zowe.network.allowedDomains`.**  
In Zowe v3.6, the Discovery Service validates service registration against `zowe.network.allowedDomains`. Add any domain, IP address, or CIDR range outside your `zowe.externalDomains` and `haInstances` hostnames from which services register. Otherwise, registrations from those hosts can be rejected or produce warnings. For more information, see [Configuring allowed domains and IP addresses for service registration](https://docs.zowe.org/stable/user-guide/api-mediation/config-allowed-domains-for-service-reg/) and the [Zowe YAML configuration file reference](../appendix/zowe-yaml-configuration.md).

1. **Update monitoring probes for actuator endpoint authentication.**
Update any monitoring probe or automation script that calls the API Gateway `/application/info` or `/application/version` endpoint without credentials, because these requests now return HTTP 401. Authenticated requests work on both v3.5 and v3.6, so you can update your probes before you upgrade. The following curl command is an example of an authenticated request:

   `curl -k -u <user>:<pass> https://<gateway>:7554/application/info`

   For the full endpoint list, credential options, and the `components.gateway.apiml.health.protected` setting, see [Configuring health check, information, and version endpoint protection](../user-guide/api-mediation/configuration-health-endpoint-protection.md).

   :::warning
   Setting `components.gateway.apiml.health.protected: false` exposes health, information, and version metadata without authentication. Use an authenticated client whenever possible. If unauthenticated access is required, restrict access through another trusted control, such as network-level controls.
   :::

1. **If you use the recommended single-service deployment, set the Caching Service storage mode to Infinispan.**  
If your `zowe.yaml` explicitly sets `components.caching-service.storage.mode` to a value other than `infinispan`, such as `VSAM`, and you run or plan to run API ML in single-service deployment mode (recommended from Zowe v3.4.0), change the mode to `infinispan`. Infinispan is the default storage mode. Other storage modes are not supported in single-service deployment mode. Infinispan also requires additional ports. For more information, see the following articles:

   * [Enabling single-service deployment of API Mediation Layer](https://docs.zowe.org/stable/user-guide/api-mediation/api-mediation-modulith/)
   * [Caching Service Infinispan ports](../user-guide/address-network-requirements.md#caching-service-infinispan-ports)

**Optional properties and new defaults in Zowe v3.6**

The following properties are optional, and one default has changed. Your existing configuration continues to work without setting them.

| Property | Description |
| :--- | :--- |
| `zowe.launchScript.startupChecks.zosmfjwt` | Applies when Zowe uses z/OSMF JWT authentication. The default is `warn`: if the check fails, Zowe logs a warning and continues to start. Set `exit` to stop startup if the check fails, or `disabled` to skip the check. You can run the same check manually with `zwe validate zosmf jwt`. See [zwe validate zosmf jwt](https://docs.zowe.org/stable/appendix/zwe_server_command_reference/zwe/validate/zwe-validate-zosmf-jwt/). |
| `components.apiml.logging.level` (and the per-component variant `components.<component>.logging.level`) | Set the API ML log level to `quiet`, `info`, or `debug`. Legacy `debug` parameters still take precedence. See [Configuring API ML logging](../user-guide/api-mediation/configuration-logging.md). |
| `storage.infinispan.useVirtualThreads` | Enables Infinispan virtual threads, which require Java 21 or later. The default is `false`. On z/OS, leave this property set to `false`, because virtual threads can stall Caching Service clustering in HA mode. See the [Zowe YAML configuration file reference](../appendix/zowe-yaml-configuration.md). |

To see every configuration change between v3.5.0 and v3.6.0, review the [release comparison](https://github.com/zowe/zowe-install-packaging/compare/v3.5.0...v3.6.0) in the `zowe-install-packaging` repository. On the **Files changed** tab, review the changes to `example-zowe.yaml` and `files/defaults.yaml`.

Proceed to the [**Upgrading the runtime**](#upgrading-the-runtime) section to complete your upgrade to v3.6.

</details>

<details>
<summary id="upgrading-from-zowe-v218x-to-v36"><strong>Upgrading from Zowe v2.18.x to v3.6</strong></summary>
<br />
To upgrade from Zowe v2.18.x, perform the following procedure before you install Zowe v3.6.

:::note  
v2.18.6 does not contain registration metadata validation filters. v3.6 meets the actuator endpoint authentication requirements and contains registration metadata validation filters.
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

1. **Verify runtime levels.**  
Confirm that the Java version (17 or 21) and the Node.js version (18, 20, 22, or 24) meet the [prerequisites](#prerequisites-for-zowe-v36). Update `java.home` and `node.home` in `zowe.yaml` if the versions have changed from those in your 2.18.x installation. 

1. **Verify z/OSMF JWT support.**  
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
      ``` 

    :::note
    If z/OSMF is not used for login, no JWT setup is needed.
    :::

1. **Identify consumers of unauthenticated operational endpoints.**  
Identify any monitoring probes, readiness checks, and automation that call the following endpoints without credentials:
    * `/application/info`
    * `/application/version`
    * `/application/health`
    * `/gateway/version`
    * `/gateway/api/v1/version`

    Update the identified clients to send credentials (Basic authentication or a Bearer JWT). Alternatively, if you choose to accept the exposure, set `components.gateway.apiml.health.protected` to `false`.

1. **Add registration metadata hosts to the allowlist.**  
Zowe v3.6 validates the hosts in service registration metadata against `zowe.network.allowedDomains`. The defaults cover `externalDomains` and high availability (HA) hostnames only. Add services that register URL metadata (such as `instanceBaseUrls`, API documentation or Swagger URLs, or `corsAllowedOrigins`) from other hosts to `zowe.network.allowedDomains` before you upgrade.

  :::note
  For users who install using SMP/E, be aware that there is a HOLD(ACTION) setting regarding `zowe.network.allowedDomains` in the v3.6 PTF.
  :::

6. **Apply the v2 to v3 breaking changes.**  
Review the [System and Security Changes](#system-and-security-changes-from-zowe-v2-and-v1) and [Configuration changes](#configuration-changes-from-zowe-v2-and-v1) sections of this article. The following breaking changes affect the upgrade:
    * The authentication route `/api/v1/gateway` is now `/gateway/api/v1`.
    * `zaas` is a separate component that uses port 7558 unless `apiml.enabled=true`.
    * `jobs-api`, `files-api`, `metrics-service`, and `cloud-gateway` are removed. `metrics-service` is replaced by the [OpenTelemetry implementation](https://docs.zowe.org/stable/user-guide/api-mediation/observability/configuring-apiml-observability/). 
    * Keyring URIs use exactly two slashes (`safkeyring://`).
    * Keyring `keystore` and `truststore` passwords use the literal value `password`.
    * `zowe.useConfigmgr=false` and the gateway internal server are no longer supported.

    For the complete list of changes, see [Important API ML updates in Zowe v3](https://docs.zowe.org/stable/whats-new/breaking-changes-v3/#important-api-ml-updates-in-zowe-v3).

:::note Caching Service storage and single-service deployment
In Zowe v3, the Caching Service defaults to Infinispan storage instead of VSAM. VSAM is still supported, but it is deprecated and not recommended. If you plan to enable single-service deployment of API ML (recommended from Zowe v3.4.0), you must use Infinispan, because single-service deployment does not support other storage modes. For details, see [Enabling single-service deployment of API Mediation Layer](https://docs.zowe.org/stable/user-guide/api-mediation/api-mediation-modulith/) and [Upgrading to single-service API ML deployment](https://docs.zowe.org/stable/upgrade/upgrade-to-single-service-apiml-deployment/).
:::


You can now proceed to the [**Upgrading the runtime**](#upgrading-the-runtime) and [**Configuration changes**](#configuration-changes-from-zowe-v2-and-v1) sections to complete your upgrade to v3.6.

</details>

<details>
<summary><strong>Upgrading from Zowe v2.17.x</strong></summary>
<br />

There are no version-specific configuration tasks for upgrading from Zowe v2.17.x to v2.18.x. Perform a standard upgrade to v2.18.x, as described in [Upgrading Zowe](../upgrade/upgrading-zowe.md), and then proceed to [upgrading to Zowe v3.6](#upgrading-from-zowe-v218x-to-v36).

</details>

<details>
<summary><strong>Upgrading from Zowe v2.16.x</strong></summary>
<br />

To upgrade from Zowe v2.16.x to v2.18.x, perform the following tasks:

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
Enhancements and default parameters have changed throughout Zowe v2. This can be performed with the UNIX command `zwe init stc`, by running the job `ZWEISTC`, or by copying the `SZWESAMP` members `ZWESLSTC`, `ZWESISTC`, and `ZWESASTC` into your desired PROCLIB.
1. **Verify keyring slashes.**  
If you use keyrings, verify that Zowe YAML references to `safkeyring`. Use two forward slashes (`safkeyring://`). Do not use four forward slashes (`safkeyring:////`).

You can now proceed to [upgrading to Zowe v3.6](#upgrading-from-zowe-v218x-to-v36).

</details>

<details>
<summary><strong>Upgrading from Zowe v2.11.x through v2.15.x</strong></summary>
<br />

To upgrade from any version between v2.11.x and v2.15.x to v2.18.x, perform the following tasks:

1. **Remove PEM references.**  
Ensure that Zowe configurations using keyrings do not have the section `zowe.certificate.pem`. This section is no longer needed and can cause a start-up error in newer versions of Zowe.
2. **Update TLS configurations.**  
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
3. **Update PROCLIB entries.**  
Update your PROCLIB entries for Zowe using `zwe init stc`, the `ZWEISTC` job, or by copying the `SZWESAMP` members into your PROCLIB.
4. **Verify keyring slashes.**  
If using keyrings, ensure Zowe YAML references use exactly two forward slashes (`safkeyring://`).

You can now proceed to [upgrading to Zowe v3.6](#upgrading-from-zowe-v218x-to-v36).

</details>

<details>
<summary><strong>Upgrading from Zowe v2.10.x</strong></summary>
<br />

To upgrade from Zowe v2.10.x to v2.18.x, perform the following tasks:

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

You can now proceed to [upgrading to Zowe v3.6](#upgrading-from-zowe-v218x-to-v36).

</details>

<details>
<summary><strong>Upgrading from Zowe v2.4.x through v2.9.x</strong></summary>
<br />

To upgrade from any version between v2.4.x and v2.9.x to v2.18.x, perform the following tasks:

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

You can now proceed to [upgrading to Zowe v3.6](#upgrading-from-zowe-v218x-to-v36).

</details>

<details>
<summary><strong>Upgrading from Zowe v2.3.x or earlier</strong></summary>
<br />

If your current version is v2.3.x or earlier, a clean install of Zowe v3.6 is highly recommended to avoid potential issues during the upgrade process, rather than attempting to manually patch the configuration forward.

Please proceed with a fresh installation of Zowe v3.6.

</details>

<details>
<summary><strong>Upgrading from Zowe v1.x</strong></summary>
<br />

If you are using v1, you must perform a clean install of Zowe v3.6 rather than performing an upgrading, as there is not a clear upgrade path from v1 to v2 or v3. Any extensions or products built upon Zowe v1 are unlikely to work in v2 or v3 without upgrading them. 

If you are using v1.27 or a later version of Zowe v1, you can retain your keyring or keystore. During v3.6 installation, once your Zowe YAML configuration file is created, you can define the section `zowe.certificate` to re-use your certificates:

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

## Upgrading the runtime

After you prepare your current Zowe instance, upgrade the Zowe runtime to v3.6. Complete the following steps in order.

:::note
Stop your running Zowe instance before you replace the runtime files, data sets, or PROCLIB members. For more information about stopping Zowe, see [Starting and Stopping Zowe](../user-guide/start-zowe-zos.md).
:::

1. **Install the Zowe v3.6 build.**  
   For information about the available installation methods, see [Installing Overview](../user-guide/installing.md). The installation places the `SZWESAMP` and `SZWEAUTH` data sets under the data set prefix that `zowe.setup.dataset.prefix` defines in your `zowe.yaml`. The next step creates or updates your custom data sets.

   :::info
   <details>
   <summary>Click here for an example of how to install with SMP/E. </summary>

   If you install with SMP/E, the sample JCL jobs create the runtime directory for you. You do not run `pax` or `zwe install`. Instead, you edit the sample jobs and submit them in order.

   1. Edit and submit the sample jobs that Zowe supplies in the `ZOWE.AZWE003.F1` data set, in the following order: 
      * `ZWE2RCVE` (RECEIVE)
      * `ZWE3ALOC` (allocate target libraries)
      * `ZWE4ZFS` (optional, create the file system)
      * `ZWE5MKD` (create the directories)
      * `ZWE6DDEF` (DDDEFs)
      * `ZWE7APLY` (APPLY)
      * `ZWE8ACPT` (ACCEPT)  
   2. In `ZWE4ZFS` and `ZWE5MKD`, replace the `-PathPrefix-` string with the high-level directory where you want Zowe installed. The value must be an absolute path that begins and ends with a slash (`/`), and it is case sensitive. In `ZWE4ZFS`, also replace `${fsdsn}` with the data set name of the zFS file system.  
   **Example:**  
   If you set `-PathPrefix-` to `/service/`, the jobs create the runtime directory `/service/usr/lpp/zowe`.
   3. Submit `ZWE4ZFS` from a user ID with UID 0 or with access to the `BPX.SUPERUSER` profile. The job allocates and formats the zFS file system, creates the mount point `/service/usr/lpp/zowe`, and mounts the file system there. Each job must end with return code 0.
   4. Set `zowe.runtimeDirectory` in your `zowe.yaml` file to the new directory, for example `/service/usr/lpp/zowe`.

   If you do not run `ZWE4ZFS`, the `ZWE5MKD` job still creates the directory, but in the file system that already contains the path prefix.

   **Note:** The mount that `ZWE4ZFS` creates does not survive an IPL. To mount the file system automatically, add a `MOUNT` statement to the `BPXPRMxx` member of `PARMLIB`. The `ZWE4ZFS` job lists the statement to use.

   For more information, see [Installing the z/OS build via SMP/E](../user-guide/install-zowe-smpe.md).

   </details>

   :::

   :::info
   <details>
   <summary>Click here for an example of how to install from the convenience build (PAX file). </summary>

   If you install from the convenience build (PAX file).  

   1. Download the Zowe v3.6 PAX file and upload it to USS in binary mode.  
   2. Back up your existing runtime directory, and then expand the PAX file into the same runtime directory with `pax -ppx -rf <zowe-V.v.p>.pax`. The backup preserves the previous runtime so that you can restore it if you need to downgrade.  
   3. Run `zwe install` with the `zowe.yaml` file that you prepared in the previous section and the `--allow-overwrite` option.  
   **Example:**  
   `<runtime-directory>/bin/zwe install -c /path/to/zowe.yaml --allow-overwrite`.  
   Without `--allow-overwrite`, existing data sets are not updated, and the command issues message `ZWEL0301W`.

   For more information, see [Installing the z/OS build via Convenience Build (PAX file)](../user-guide/install-zowe-zos-convenience-build.md). 

   </details>

   :::

2. **Initialize your Zowe instance with `zwe init`.**  
   You do not need to repeat your initial Zowe setup. In a USS shell, run only the `zwe init` substeps that apply to your upgrade. Point these commands at your `zowe.yaml` file with the `-c` option.  

   **Example:**  

   ```
   <runtime-directory>/bin/zwe init mvs -c /path/to/zowe.yaml --allow-overwrite
   ```

   * `zwe init mvs` copies the new Zowe load modules and sample members from the `SZWEAUTH` and `SZWESAMP` data sets into your custom data sets, such as the authorized load library and the PARMLIB. Zowe runs from your custom data sets, so without this step, Zowe continues to run the previous load modules. When the custom data sets already exist under your data set prefix, such as in an in-place upgrade, you must specify `--allow-overwrite`. Without the `--allow-overwrite` option, the `zwe init mvs` command does not update the existing data sets and issues message `ZWEL0301W`. When you create the custom data sets under a new data set prefix, the `--allow-overwrite` option is not required.

     :::warning
     The `--allow-overwrite` option replaces existing members in your custom data sets, including the `ZWESIP00` member in your PARMLIB. Before you run `zwe init mvs`, back up any members that you customized.
     :::

   * `zwe init apfauth` APF authorizes the Zowe load libraries. Run this command only if you changed the data set prefix or the names of the Zowe load libraries. Data sets that are already APF authorized remain authorized after the upgrade. Running `zwe init apfauth` requires elevated authority. If you do not have the required authority, ask your system programmer to run the command.

     ```
     <runtime-directory>/bin/zwe init apfauth -c /path/to/zowe.yaml
     ```

   You can skip `zwe init security` and `zwe init certificate`. Existing SAF permissions and keyrings or keystores carry over to the new version, unless an SMP/E HOLD statement states otherwise.  

   If you do re-run `zwe init certificate` with a keystore, note that in Zowe v3.6 it generates a random password when `zowe.setup.certificate.pkcs12.password` or `zowe.setup.certificate.pkcs12.caPassword` is left at the default value. Keyring scenarios are unaffected. Update any automation that relies on the literal default password. See [zwe init certificate](../appendix/zwe_server_command_reference/zwe/init/zwe-init-certificate.md).  

   * For the full list of steps that an upgrade requires, see [Installation and configuration tasks](./upgrading-zowe.md#installation-and-configuration-tasks).  
   * For more information about the `zwe init` options, see [Configuring Zowe with zwe init](../user-guide/initialize-zos-system.md) and [zwe init mvs](../appendix/zwe_server_command_reference/zwe/init/zwe-init-mvs.md).

   :::warning
   Back up any customized members in your custom data sets, such as `<prefix>.CUST.PARMLIB` and `<prefix>.CUST.JCLLIB`, before you run `zwe init mvs --allow-overwrite`. The command can overwrite existing members, as message `ZWEL0300W` states.
   :::

   :::note
   The `zowe.yaml` file is the required configuration file for the installation and initialization of Zowe. Review the `zowe.yaml` structure in the [Zowe YAML server configuration file reference](../appendix/zowe-yaml-configuration.md) and customize it according to your requirements.
   :::

   The following example shows the output that `zwe init mvs --allow-overwrite` displays in your USS shell during an upgrade, when the custom data sets from your previous installation already exist. In the example, `<prefix>` is the value of `zowe.setup.dataset.prefix` in your `zowe.yaml`, for example `MY.ZOWE.V3`. The `ZWEL0300W` warnings are expected during an upgrade: they state that the existing data sets are overwritten with the contents of the new build. The final line confirms that initialization succeeded.

   **Example:**

   ```
   >> Initialize Zowe custom data sets

   Create data sets if they do not exist
   Warning ZWEL0300W: <prefix>.CUST.PARMLIB already exists. This dataset will be overwritten.
   Warning ZWEL0300W: <prefix>.CUST.JCLLIB already exists. This dataset will be overwritten.
   Warning ZWEL0300W: <prefix>.SZWEAUTH already exists. This dataset will be overwritten.
   Warning ZWEL0300W: <prefix>.CUST.ZWESAPL already exists. This dataset will be overwritten.

   Copy <prefix>.SZWESAMP(ZWESIP00) to <prefix>.CUST.PARMLIB(ZWESIP00)
   Copy components/zss/LOADLIB/ZWESIS01 to <prefix>.SZWEAUTH(ZWESIS01)
   Copy components/zss/LOADLIB/ZWESAUX to <prefix>.SZWEAUTH(ZWESAUX)
   Copy components/zss/LOADLIB/ZWESISDL to <prefix>.SZWEAUTH(ZWESISDL)
   Copy components/launcher/bin/zowe_launcher to <prefix>.SZWEAUTH(ZWELNCH)

   >> Zowe custom data sets are initialized successfully.
   ```

   Review the output of each `zwe init` substep to confirm that your data sets are properly initialized and that no `ZWEL0301W` message appears.

3. **Refresh the PROCLIB members if required.**  
   The members `ZWESLSTC`, `ZWESISTC`, and `ZWESASTC` in your PROCLIB are generated from your `zowe.yaml` settings and the Zowe JCL templates. Refresh these members if the new build changes the started task JCL, or if you changed a setting that the members contain, such as the data set prefix, `authLoadlib`, `authPluginLib`, the ZIS member suffix, or the cross-memory server name. Otherwise, your existing members continue to work.

   To refresh the members, run `zwe init stc` or submit the `ZWEISTC` job. Because the members already exist, you must specify `--allow-overwrite`. Without appending this option, the command writes nothing to your PROCLIB and issues message `ZWEL0301W` for each existing member. The option replaces the members, so first back up any members that you customized.

   For command details, see [zwe init stc](../appendix/zwe_server_command_reference/zwe/init/zwe-init-stc.md) in the reference section.


4. **Review the automatic startup checks.**  
   Zowe v3.6 runs the following checks automatically each time it starts.  
   For more information, see [z/OS pre-flight checks](https://docs.zowe.org/stable/user-guide/zos-preflight/).

   :::tip
   If failure occurs during startup validation, we recommend that you set `zowe.launchScript.logLevel` to `debug` (or `trace` for more detail) to write additional startup diagnostics to the Zowe log. 
   :::

   | Startup check | Default behavior | Override property |
   |---------------|------------------|-------------------|
   | Certificate | `warn`. Checks that the certificates are valid for use by Zowe. | `zowe.launchScript.startupChecks.certificate` |
   | Superuser (UID 0) check | `exit`. Zowe does not start if it runs as the USS superuser (UID 0), because running as UID 0 is strongly discouraged. | `zowe.launchScript.startupChecks.user` |
   | Components | `warn`. Checks that every component listed under `components` has a manifest file. | `zowe.launchScript.startupChecks.components` |
   | Ports | `exit`. Checks that each enabled component can bind to its port and that no other program occupies the port. | `zowe.launchScript.startupChecks.ports` |
   | z/OSMF | `exit`. Checks that z/OSMF is running and meets the Zowe requirements. | `zowe.launchScript.startupChecks.zosmf` |
   | z/OSMF JWT | `warn`. Applies when Zowe uses z/OSMF JWT authentication. Checks that z/OSMF JWT support is usable. | `zowe.launchScript.startupChecks.zosmfjwt` |
   | AT-TLS ports | `warn`. Checks the AT-TLS port configuration. | `zowe.launchScript.startupChecks.attls` |
   | Java minimum version | `exit`. Zowe does not start if the Java version is lower than 17. | `zowe.launchScript.startupChecks.javaMin` |
   | Java maximum version | `warn`. Zowe logs a warning if the Java version is higher than 21. | `zowe.launchScript.startupChecks.javaMax` |
   | Node.js minimum version | `exit`. Zowe does not start if the Node.js version is lower than 18. | `zowe.launchScript.startupChecks.nodeMin` |
   | Node.js maximum version | `warn`. Zowe logs a warning if the Node.js version is higher than 24. | `zowe.launchScript.startupChecks.nodeMax` |

   A failing check that is set to `exit` prevents Zowe from starting. A failing check that is set to `warn` logs a warning, and Zowe continues to start. A check that is set to `disabled` does not run.

   To change the behavior of all startup checks at once, set `zowe.launchScript.startupChecks.default` to `exit`, `warn`, or `disabled`. This value overrides the defaults in the table for every check that you do not set individually. A value that you set for a specific check always takes precedence.

   If the Java or Node.js version changed from your previous installation, set `java.home` or `node.home` in `zowe.yaml` to a supported installation. At each startup, Zowe logs the effective action of every startup check and where the action comes from.

5. **Start your Zowe instance.**  
   Start Zowe using your usual method. For more information about starting Zowe, see [Starting and Stopping Zowe](../user-guide/start-zowe-zos.md).Check the startup log for messages at the `ERROR` level. To view the log, open the job output in SDSF, or in the **Jobs** view of Zowe Explorer.

   After you validate the upgrade, as described in [Verifying the upgrade](#verifying-the-upgrade), you can stop Zowe the same way that you started it. For example, stop the `ZWESLSTC` started task, or run `<runtime-directory>/bin/zwe stop -c /path/to/zowe.yaml`.

6. **Resolve any startup failures.**  
   Review the startup log for `ERROR` messages, identify the check or component that failed, correct the cause (often a property in your `zowe.yaml`), and start Zowe again.

   :::tip
   If your security requirements allow it, you can set the matching `zowe.launchScript.startupChecks.*` property to `warn` or `disabled`. Each property accepts the values `exit`, `warn`, or `disabled`. The following example lists the properties with their default values:

   **Example:**
   ```yaml
   zowe:
     launchScript:
       startupChecks:
         user: exit           # superuser (UID 0) check for ZWESVUSR
         ports: exit          # port availability check
         zosmf: exit          # z/OSMF availability check
         certificate: warn    # certificate validation check
         components: warn     # component manifest check
         attls: warn          # AT-TLS port check
         javaMin: exit        # minimum Java version check
         javaMax: warn        # maximum Java version check
         nodeMin: exit        # minimum Node.js version check
         nodeMax: warn        # maximum Node.js version check
   ```

   Setting a check to `warn` or `disabled` hides a real misconfiguration. Use these values as a temporary measure, and resolve the underlying finding.
   :::

   <details>
   <summary> Click for an example of a failed start. </summary>

   The following example shows a failed start. The startup checks pass, and then the validation of the API ML component fails. This example shows a component validation error, separate from the startup checks in the previous step. Zowe does not start until you correct the reported problem and start Zowe again.

   **Example:**
   ```
   <timestamp> <ZWELS:nnn> ZWESVUSR INFO (zwe-internal-start-prepare) Zowe version: v3.6.0
   <timestamp> <ZWELS:nnn> ZWESVUSR INFO (validateJavaHome) Java version: 17.0.10
   <timestamp> <ZWELS:nnn> ZWESVUSR INFO (zwe-validate-certificate) Certificate checks passed.
   <timestamp> <ZWELS:nnn> ZWESVUSR INFO (zwe-internal-start-prepare,global_validate) global validations are successful
   ERROR: <timestamp> <ZWELS:nnn> ZWESVUSR ERROR (zwe-internal-start-prepare,validate_components) Error: Component apiml ended with nonzero rc=1
   <timestamp> <ZWELS:nnn> ZWESVUSR WARN (zwe-internal-start-prepare,validate_components) 1 errors were found during validation, please check the message, correct any properties required in <workspace>/.env/.zowe-merged.yaml and re-launch Zowe.
   <timestamp> <ZWELNCH:nnn> ZWESVUSR WARN ZWEL0066W command '<runtime>/bin/utils/configmgr' ended with code 1
   <timestamp> <ZWELNCH:nnn> ZWESVUSR ERROR ZWEL0030E failed to prepare Zowe instance
   ```

   Correct the property that the component reports, and then start Zowe again.

   </details>

7. **If the Caching Service fails to start, clear the Infinispan persistence data.**  
   If the Caching Service uses Infinispan storage, persistence data written by the earlier Infinispan version can prevent the service from starting after the upgrade. If this occurs, use the following procedure:

   a. Stop Zowe.  
   b. Remove the Infinispan persistence directory. Delete the contents or the folder located at:
      `<zowe.workspaceDirectory>/caching-service`.  
   c. Restart Zowe.

   :::warning  
   Removing the persistence directory clears all stored Caching Service data, including revoked Personal Access Tokens (PATs) and revoked Zowe JWTs.
   :::

   :::note  
   Infinispan virtual threads are turned off by default. On z/OS, leave the `components.caching-service.storage.infinispan.useVirtualThreads` property set to `false`. If you set the property to `true` on z/OS, the Caching Service issues a warning at startup, and virtual threads can stall Caching Service clustering in HA mode.
   :::

## Verifying the upgrade

After Zowe v3.6 starts, use the following checklist to confirm that the upgrade is successful.

- The following commands complete without errors:
  
    - `zwe validate dependencies`
    - `zwe validate certificate`
    - `zwe validate zosmf jwt`
  
- Confirm that unauthenticated requests to `/application/info` return HTTP 401. The same requests with credentials return HTTP 200.
- Confirm that `zowe.network.allowedDomains` includes every domain, IP address, or CIDR range from which services register.
- Confirm that onboarded services register successfully. If a registration is rejected, confirm that the cause is a host that is not in `zowe.network.allowedDomains`, and add the host if appropriate.
- If your services use URLs with encoded characters (`%2F`, `%5C`, `%25`, `%2E`, or semicolons), confirm that requests to them still succeed, or that `components.gateway.apiml.security.enableStrictUrlValidation` is set to `false`.
- Confirm z/OSMF is reachable through the API Gateway by the `/ibmzosmf` route, not `/zosmf`. Note that the `/ibmzosmf` route was introduced with the release of v3 and is not specific to the v3.6 upgrade.
- (HA installations only) Confirm that on startup, Zowe creates `.zowe-<haInstance>-merged.yaml` in the workspace `.env` directory, and that `ZWE_HA_INSTANCE_CONFIG` points to that file. For more information about HA upgrades, see [Upgrading Zowe in HA for zero downtime](./upgrade-zowe-no-downtime.md).

## System and Security Changes from Zowe v2 and v1

:::note
These changes apply to upgrades from Zowe v2 and v1. If you are upgrading from Zowe v3.5 or an earlier v3.x version, you can skip this section.
:::

* **SAF Settings**  
Existing SAF settings for Zowe do not need to be changed for v3. Install steps such as zwe init security, the job or workflow `ZWESECUR`, and the jobs `ZWEIRAC`, `ZWEITSS`, and `ZWEIACF` are not required to be re-run.

* **Keyrings and Keystores**  
Existing keyrings and keystores do not need to be changed for v3. Install steps such as `zwe init certificate`, the job or workflow `ZWEKRING`, or jobs starting with `ZWEIKR*` are not required to be re-run.

The following network changes are needed for added or removed servers:

| Component name | Change | Default Port | Default Jobname | Details |
|----------------|--------|--------------|-----------------|---------|
| zaas | Added | 7558 | ZWE1AZ | This component is responsible for authentication and is now required when using the API Mediation Layer |
| metrics-service | Removed | 7551 | ZWE1MS | This service has been deprecated and removed. The Open Telemetry standard serves as a replacement. |
| jobs-api | Removed | 7558 | ZWE1EJ | This component was deprecated in Zowe v2 and is now removed. Ensure that you switch to using equivalent z/OSMF endpoints. |
| files-api | Removed | 7559 | ZWE1EF | This component was deprecated in Zowe v2 and is now removed. Ensure that you switch to using equivalent z/OSMF endpoints. |
| cloud-gateway | Removed | 7563 | ZWE1CG | The cloud-gateway has been removed as a standalone component and merged into the gateway. |

## Configuration changes from Zowe v2 and v1

:::note
These changes apply to upgrades from Zowe v2 and v1. If you are upgrading from Zowe v3.5 or an earlier v3.x version, you can skip this section. For Zowe v3.5 configuration changes, see **Upgrading from Zowe v3.x to v3.6** in [Preparing Your Current Zowe Instance](#preparing-your-current-zowe-instance).
:::

Review the following changes to configuration and updated configuration parameters.

### New Configuration

* **components.zaas**  
Previously part of the `components.gateway` component, `zaas` in Zowe v3 is a separate component responsible for authentication. If you do not explicitly configure this section, `zaas` will still be enabled by default and will use **port 7558** unless you use single-service deployment mode. For more information, see [Upgrading to single-service API ML deployment](https://docs.zowe.org/stable/upgrade/upgrade-to-single-service-apiml-deployment/). 

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

Zowe v2 accepts an empty value for `zowe.certificate.keystore.password` and `zowe.certificate.truststore.password` when using keyring-based certificates. Zowe v3.6 requires both of these parameters to be set to the literal value `password`.

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
If you are using zosmf as your authorization service, ensure that you update this z/OSMF service configuration. 

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

Starting from Zowe v3.4.0, we recommend using the single-service deployment of API Mediation Layer. API ML single-service deployment mode runs the API Gateway, Discovery Service, API Catalog, and Caching Service in a single JVM process, which improves performance and simplifies configuration. For more information about enabling this mode and requirements for single-service deployment, see [Enabling single-service deployment of API Mediation Layer](https://docs.zowe.org/stable/user-guide/api-mediation/api-mediation-modulith/).

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

