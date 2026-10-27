# Upgrading Zowe

Performing an upgrade of Zowe involves following a subset of the first-time installation steps documented within the [Zowe z/OS components installation checklist](../user-guide/zos-components-installation-checklist.md) and updating your active Zowe YAML configuration file. 

:::info Required roles: system administrator, system programmer
:::

:::tip Tips
* If you are running Zowe in high availability (HA) mode, it is possible to perform a zero-downtime upgrade by routing traffic to a newly upgraded instance before shutting down the old instance. For more information, see [Upgrading Zowe in HA for zero downtime](./upgrade-zowe-no-downtime.md).

* If you need to revert an upgrade later, follow the recovery procedure in [Downgrading to a previous Zowe version](./downgrade-to-a-previous-zowe-version.md).
:::

## Installation and configuration tasks

To complete an upgrade, perform all tasks listed in the **Installing** section. However, you only need to complete selected tasks within the **Configuration** sections.

Unless otherwise noted by an announcement or SMP/E HOLD statement, you do not need to update certificates, instance data sets, networking, or security rules during an upgrade. Using [Configuring Zowe via JCL](../user-guide/configuring-zowe-via-jcl.md) as an example, you can skip the following configuration steps:

* **Instance Data sets**  
You do not need to recreate your existing data sets.

* **Security Rules (SAF)**  
Existing permissions remain valid. You can skip re-running security initialization jobs (like `ZWESECUR`, `ZWEIRAC`, or `zwe init security`).

* **Certificates**  
Existing keyrings and keystores do not need to be changed, allowing you to skip keyring tasks and `zwe init certificate`.

* **Networking**  
Unless you are explicitly adding or removing servers, network changes are unnecessary.

### Required JCL configuration steps for upgrades

| Task | Description | Sample JCL | `zwe` Command |
| :--- | :--- | :--- | :--- |
| **APF Authorize Privileged Content** | **Purpose:** Zowe contains one privileged component, ZIS, which enables the security model by which the majority of Zowe is unprivileged and in key 8. The load library for the ZIS component and its extension library must be set APF authorized and run in key 4 to use ZIS and components that depend upon it.<br /><br />**Action:**<br />1. APF authorize the data sets defined at `zowe.setup.dataset.authLoadlib` and `zowe.setup.dataset.authPluginLib`.<br />2. Define PPT entries for the members `ZWESIS01` and `ZWESAUX` as Key 4, NOSWAP in the `SCHEDxx` member of the system PARMLIB. | [ZWEIAPF](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEIAPF)  | `zwe init apfauth`  |
| **Copy STC JCL to PROCLIB** | **Purpose**: `ZWESLSTC` is the job for running Zowe's webservers, and `ZWESISTC` is for running the APF authorized cross-memory server. The `ZWESASTC` job is started by `ZWESISTC` on an as-needed basis.<br /><br />**Action**: Copy the members `ZWESLSTC`, `ZWESISTC`, and `ZWESASTC` into your desired PROCLIB. If the job names are customized, also modify the YAML values of them in `zowe.setup.security.stcs`. | [ZWEISTC](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEISTC)  | `zwe init stc`  |



## Reviewing YAML configuration changes

Zowe has default YAML properties that can change from version to version. It is recommended to always review the configuration files to check for changes that you might wish to apply to your own Zowe YAML.

* **`defaults.yaml`**  
This file is not meant to be edited, but you can observe changes and apply overrides within your Zowe YAML as desired.

* **`example-zowe.yaml`**  
This file is often used to create your Zowe YAML during first-time installations. This file also changes from version to version, but is not used directly by Zowe. Ff you do not take the changes from within the `example-zowe.yaml`, you might miss out on new features and behaviors.

### Comparing configuration files via GitHub

If you have two versions of Zowe, you can compare the `zowe-install-packaging` repository changes using the GitHub compare tool :

`https://github.com/zowe/zowe-install-packaging/compare/{from-version}...{to-version}`

*Example (Comparing v3.3.0 to v3.4.0):*
[https://github.com/zowe/zowe-install-packaging/compare/v3.3.0...v3.4.0](https://github.com/zowe/zowe-install-packaging/compare/v3.3.0...v3.4.0)

On that web page, you can search for `example-zowe.yaml` and `defaults.yaml` to see their changes.

## Version-Specific upgrade procedures

Major version upgrades, or upgrades from older legacy versions, require specific prerequisite checks, architectural changes, and configuration updates. For detailed instructions on upgrading from specific releases, refer to the following dedicated upgrade procedures:

:::warning Important Note on Extension Compatibility
Any extensions or products built upon Zowe v1 are unlikely to work in v2 or v3 without upgrading such extensions or products. Refer to your product documentation on actions to take, and ensure you have obtained v2/v3 compatible versions of your third-party extensions from their vendors before proceeding with a clean installation.
:::

### Upgrading from Zowe v3.5.x to v3.6.x

:::info Required roles: system programmer, system administrator
:::

Upgrading from Zowe v3.5.x to v3.6.x follows the standard upgrade flow described in this article. Ensure that steps detailed in [Zowe z/OS components installation checklist](../user-guide/zos-components-installation-checklist.md) are satisfied and then review the changes in this section before you restart Zowe.

#### Review the configuration changes

To see the changes between the two releases, compare the `zowe-install-packaging` repository and search for `example-zowe.yaml` and `defaults.yaml`:

[https://github.com/zowe/zowe-install-packaging/compare/v3.5.0...v3.6.0](https://github.com/zowe/zowe-install-packaging/compare/v3.5.0...v3.6.0)

#### New and changed YAML properties

Review the following properties in your `zowe.yaml` file and decide whether to adopt each of them:

```yaml
zowe:
  network:
    allowedDomains:          # Domains permitted in service registration metadata.
      - "example.com"        # Defaults already include externalDomains and
      - "*.another.com"      # haInstances hostnames.
  launchScript:
    startupChecks:
      zosmfjwt: exit         # exit | warn | disabled
components:
  apiml:
    logging:
      level: info            # quiet | info | debug
storage:
  infinispan:
    useVirtualThreads: false
```

| Property | Upgrade decision |
| :--- | :--- |
| `zowe.network.allowedDomains` | Add any domain, IP address, or CIDR range outside your `zowe.network.server.externalDomains` and `haInstances` hostnames from which services register with the API Discovery Service. Otherwise, registrations from those hosts can be rejected or produce warnings. See [Configuring allowed domains and IP addresses for service registration](../user-guide/api-mediation/config-allowed-domains-for-service-reg.md) and the [Zowe YAML configuration file reference](../appendix/zowe-yaml-configuration.md). |
| `components.apiml.logging.level` (and the per-component variant `components.<component>.logging.level`) | Optional. Set the API ML log level to `quiet`, `info`, or `debug`. Legacy `debug` parameters still take precedence. See [Configuring API ML logging](../user-guide/api-mediation/configuration-logging.md) and the [Zowe YAML configuration file reference](../appendix/zowe-yaml-configuration.md). |
| `zowe.launchScript.startupChecks.zosmfjwt` | Applies when Zowe uses z/OSMF JWT authentication. The default `exit` stops startup if the z/OSMF JWT check fails. Set `warn` to continue startup with a warning, or `disabled` to skip the check. You can run the same check manually with `zwe validate zosmf jwt`. See the [Zowe YAML configuration file reference](../appendix/zowe-yaml-configuration.md). |
| `storage.infinispan.useVirtualThreads` | Optional. Enables Infinispan virtual threads, which require Java 21 or later. The default is `false`. See the [Zowe YAML configuration file reference](../appendix/zowe-yaml-configuration.md). |

#### Actuator endpoint authentication

Actuator endpoints are REST APIs used to monitor and manage a running application. They expose operational data such as health status, metrics, configuration details, and version metadata.

After you upgrade, unauthenticated requests to the API Gateway `/application/info` and `/application/version` endpoints return HTTP 401. Monitoring probes and automation scripts that call these endpoints without credentials must be updated.

| Authentication State | Example Command | Before Upgrade | After Upgrade |
| :--- | :--- | :--- | :--- |
| **Unauthenticated** | `curl -k https://<gateway>:7554/application/info` | HTTP 200 | HTTP 401 |
| **Authenticated** | `curl -k -u <user>:<pass> https://<gateway>:7554/application/info` | HTTP 200 | HTTP 200 |

Update your probes to authenticate. For the full endpoint list, credential options, and the `components.gateway.apiml.health.protected` setting, see [Configuring health check, information, and version endpoint protection](../user-guide/api-mediation/configuration-health-endpoint-protection.md).

:::warning
Setting `components.gateway.apiml.health.protected: false` exposes health, information, and version metadata without authentication. Use an authenticated client whenever possible. If unauthenticated access is required, restrict access through another trusted control, such as network-level controls.
:::

:::info
* **Certificate initialization:**  
`zwe init certificate` now generates a random password when `zowe.setup.certificate.pkcs12.password` or `zowe.setup.certificate.pkcs12.caPassword` is left at the default value. This applies to keystore scenarios only; keyring scenarios are unaffected. Update any automation that relies on the literal default password before you re-run certificate initialization. See [zwe init certificate](../appendix/zwe_server_command_reference/zwe/init/zwe-init-certificate.md).
  
* **High availability (HA):**  
At startup in HA mode, Zowe writes a merged configuration file for each HA instance to the workspace `.env` directory. See [Upgrading Zowe in HA for zero downtime](./upgrade-zowe-no-downtime.md).
:::

#### Post-upgrade verification checklist

1. Review `zowe.yaml` for `zowe.network.allowedDomains` and confirm that all hosts that register services are allowed.
2. If Zowe uses z/OSMF JWT authentication, run `zwe validate zosmf jwt` and confirm that it succeeds.
3. Confirm that unauthenticated requests to `/application/info` return HTTP 401, and that authenticated requests return HTTP 200 with the same payload as before the upgrade.
4. Update monitoring probes and scripts that call `/application/info` and `/application/version`.
5. If you run in HA mode, confirm that `.zowe-<haInstance>-merged.yaml` exists in the workspace `.env` directory.
6. Revert any temporary diagnostic settings, such as `zosmfjwt: warn` or test entries in `allowedDomains`.

:::note
For the new `zwe validate zosmf jwt` command, see [zwe validate zosmf jwt](../appendix/zwe_server_command_reference/zwe/validate/zwe-validate-zosmf-jwt.md).
:::

### Upgrading from older releases

* **[Upgrading from Zowe Vx to Zowe V3](./upgrade-zowe-v3.md)**  
Follow this procedure to upgrade from Zowe v2 to Zowe v3, or from Zowe v1 to Zowe v3. This article details V3 prerequisites (including Java 17, Node.js 18 or 20, and z/OSMF JWT support), new component configurations such as `zaas` and Infinispan caching, and handles migration exceptions for older v2.x releases.

    :::caution Important
    If you are currently running on an earlier v2 version of Zowe, before upgrading to Zowe v3.x, first upgrade to Zowe v2.18.x.
    :::

* **[Upgrading from Zowe V1 to Zowe V2](./upgrade-zowe-v2.md)**  
Follow this procedure to upgrade an existing Zowe server component from version 1 to version 2. Because there is no clear upgrade path from v1 to v2 or v3, you must perform a clean installation of Zowe. This article provides a detailed map for updating component manifests, lifecycle scripts, and environment variables to achieve compatibility with Zowe version 2.