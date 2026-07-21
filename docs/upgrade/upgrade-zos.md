# Upgrading

Performing an upgrade of Zowe involves following a subset of the first-time installation steps documented within the [Zowe z/OS components installation checklist](../user-guide/zos-components-installation-checklist.md), and updating your Zowe YAML. Exceptions are noted within this document.

:::warning
Zowe cannot be upgraded while Zowe services are active. Stop all running Zowe instances before proceeding with the upgrade process. For detailed instructions, see [Stop Zowe](../user-guide/start-zowe-zos.md).
If you need to revert an upgrade later, follow the recovery procedure in [Backout to revert to older Zowe version](./backout-zos.md).
:::
:::info Required role: system programmer
:::


## Installation and configuration tasks

To complete an upgrade, perform all tasks listed in the Installing section of the installation guide. However, you only need to execute selected tasks within the Configuration section.
Unless explicitly specified by a release announcement or an SMP/E HOLD statement, an upgrade does not require modifications to certificates, instance datasets, network properties, or SAF security rules.

For example, when referencing [Configuring Zowe via JCL](../user-guide/configuring-zowe-via-jcl.md), skip the following steps:

* Create Instance Data sets
* Grant SAF permissions
* Keyring Tasks


| Task | Description | Sample JCL | zwe command |
|------|-------------|------------|-------------|
|APF Authorize privileged content|**Purpose:** Zowe contains one privileged component, ZIS, which enables the security model by which the majority of Zowe is unprivileged and in key 8. The load library for the ZIS component and its extension library must be set APF authorized and run in key 4 to use ZIS and components that depend upon it.<br /><br />**Action:**<br />1) APF authorize the datasets defined at `zowe.setup.dataset.authLoadlib` and `zowe.setup.dataset.authPluginLib`.<br />2) Define PPT entries for the members ZWESIS01 and ZWESAUX as Key 4, NOSWAP in the SCHEDxx member of the system PARMLIB.|[ZWEIAPF](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEIAPF)| `zwe init apfauth` |
|Copy STC JCL to PROCLIB|**Purpose**: ZWESLSTC is the job for running Zowe's webservers, and ZWESISTC is for running the APF authorized cross-memory server. The ZWESASTC job is started by ZWESISTC on an as-needed basis.<br /><br />**Action**: Copy the members ZWESLSTC, ZWESISTC, and ZWESASTC into your desired PROCLIB. If the job names are customized, also modify the YAML values of them in `zowe.setup.security.stcs`|[ZWEISTC](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEISTC)| `zwe init stc` |

## Reviewing YAML configuration changes

Zowe has default YAML properties that can change from version to version.
The `default.yaml` file is not meant to be edited, but you can observe changes and apply overrides within your Zowe YAML as desired.

Zowe also has an example file, `example-zowe.yaml`, which is often used to create your Zowe YAML during first-time installations. This file also changes from version to version, but is not used by Zowe, so if you do not take the changes from within it, you may miss out on new features and behaviors.

It is recommended to always review these files to check for changes that you may wish to apply to your own Zowe YAML.
One way to review the changes is to use the compare tool in GitHub.

Given two versions of Zowe, you can compare the "zowe-install-packaging" repository changes with the following URL:

`https://github.com/zowe/zowe-install-packaging/compare/{from-version}...{to-version}`

For comparing between v3.3.0 and v3.4.0, that URL is:

https://github.com/zowe/zowe-install-packaging/compare/v3.3.0...v3.4.0

On that web page, you can search for `example-zowe.yaml` and `defaults.yaml` to see their changes.

## Version-specific upgrade steps

In addition to the standard upgrade process, when upgrading from specific older Zowe releases, perform the additional steps detailed in the following sections.


### Migrating from Zowe v2.18.x or Lower

<details>
<summary>Click here for configuration details.</summary>  

To upgrade from Zowe **v2.18.x** or a lower version, perform the following tasks. 

#### V3 Prerequisite Changes

Before starting the migration, ensure the following system requirements are met:

- **z/OSMF**  
Version V2R5 or V3R1 is required. JWT support for z/OSMF is highly recommended. For more information, see [Enabling JSON Web Token support](https://www.ibm.com/docs/en/zos/3.1.0?topic=configurations-enabling-json-web-token-support) in the IBM documentation. If you do not have JWT support in z/OSMF, make sure to set `components.gateway.apiml.security.auth.zosmf.jwtAutoconfiguration` to `ltpa`.
- **Java**  
Java 17 is required. The Zowe YAML parameter `java.home` value should be a **Java 17** home location. If an administrator uses `zwe init` to set up Zowe, ensure the `java` for that user is v17 by including it in the `PATH` environment variable.
- **Node.js**  
Ensure that the Zowe YAML parameter `node.home` value is **Node.js 18 or 20** home location. Node 16 and earlier versions are no longer supported.


#### System and Security Changes

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


#### Configuration updates

Review the following changes to configuration and updated configuration parameters.

##### New Configuration

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

##### Updated Configuration Parameters
---

###### Keyring URI format

If you use keyrings, verify that Zowe YAML references to `safkeyring`. Use two forward slashes (`safkeyring://`). Do not use four forward slashes (`safkeyring:////`).

###### API Gateway z/OSMF service configuration

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

###### Caching Service storage mode

The Caching service now defaults to **Infinispan** storage mode instead of the **VSAM** storage mode.
While **VSAM** is still supported, this storage mode is being deprecated and is not recommended.
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

###### App Server plug-in cleanup

Backup and remove the directory `<zowe.workspaceDirectory>/app-server/plugins`. Zowe automatically regenerates this directory on startup. Deleting this directory removes outdated plugin references and prevents startup errors.

###### ZSS Server 64-bit mode execution

The ZSS server now runs in **64-bit** mode by default.

```yaml
components:
  zss:
    agent:
      64bit: true
```

##### Deprecated Settings

The following configuration parameters have been deprecated in Zowe v3. Ensure that these parameters are removed from your configuration.

**zowe.useConfigmgr**  
The parameter `zowe.useConfigmgr=false` is no longer supported.

**components.gateway.server.internal**  
The internal gateway server implementation has been removed.

```yaml
components:
  gateway:
    server:
      internal:
```

</details>
<br />

### Migrating from Zowe v2.16.0 or Lower

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
<br />

### Migrating from Zowe v2.15.0 or Lower

<details>
<summary>Click here for configuration details.</summary>  

To upgrade from Zowe **v2.15.0** or a lower version, perform the following tasks. 

If you are migrating from Zowe **v2.15.0** or a lower version, ensure that Zowe configurations using keyrings do not have the section `zowe.certificate.pem`.
This section is no longer needed and can cause startup error in newer versions of Zowe.

</details>
<br />

### Migrating from Zowe v2.10.0 or Lower

<details>
<summary>Click here for configuration details.</summary>  

To upgrade from Zowe **v2.10.0** or a lower version, perform the following tasks. 

If you are migrating from Zowe **v2.10.0** or a lower version, consider taking advantage of the new **sysMessages** feature.

The `zowe.sysMessages` is a new array that allows you to select messages that, when found by the launcher, will be duplicated into the system's log.

</details>
<br />

### Migrating from Zowe v2.9.0 or Lower

<details>
<summary>Click here for configuration details.</summary>

To upgrade from Zowe **v2.9.0** or a lower version, perform the following tasks. 

If you are migrating from Zowe **v2.9.0** or a lower version, it is recommended to delete the `<zowe.workspaceDirectory>/app-server/plugins` directory so that it can be regenerated on the next run of Zowe.
In this version and prior there were old and no longer used Application Framework plugins and references to them will complicate logs with harmless errors.

</details>
<br />

### Migrating from Zowe v2.3.0 or Lower

<details>
<summary>Click here for configuration details.</summary>

To upgrade from Zowe **v2.3.0** or a lower version, perform the following tasks. 

If you are running Zowe **v2.3.0** or a lower version, a **clean install** of Zowe v3 is highly recommended to avoid potential issues during the migration process.

</details>
<br />

### Migrating from Zowe v1

<details>
<summary>Click here for configuration details.</summary>

To upgrade from Zowe **v1** perform the following tasks. 

If you are using v1, you must perform a clean install of Zowe rather than upgrading it as there is not a clear upgrade path from v1 to v2 or v3.
Any extensions or products built upon Zowe v1 are unlikely to work in v2 or v3 without upgrading them. Refer to any product documentation on actions to take. For more information, see [Upgrading from Zowe V1 to Zowe V2](../upgrade/upgrade-zowe-v2.md).

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

