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

Major version upgrades, or upgrades from older legacy versions, require specific prerequisite checks, architectural changes, and configuration updates. For detailed instructions on upgrading from specific releases, refer to the follwoing dedicated upgrade procedures:

:::warning Important Note on Extension Compatibility
Any extensions or products built upon Zowe v1 are unlikely to work in v2 or v3 without upgrading such extensions or products. Refer to your product documentation on actions to take, and ensure you have obtained v2/v3 compatible versions of your third-party extensions from their vendors before proceeding with a clean installation.
:::

* **[Upgrading from Zowe Vx to Zowe V3](./upgrade-zowe-v3.md)**  
Follow this procedure to upgrade from Zowe v2 to Zowe v3, or from Zowe v1 to Zowe v3. This article details V3 prerequisites (including Java 17, Node.js 18 or 20, and z/OSMF JWT support), new component configurations such as `zaas` and Infinispan caching, and handles migration exceptions for older v2.x releases.

    :::caution Important
    If you are currently running on an earlier v2 version of Zowe, before upgrading to Zowe v3.x, first upgrade to Zowe v2.18.x.
    :::

* **[Upgrading from Zowe V1 to Zowe V2](./upgrade-zowe-v2.md)**  
Follow this procedure to upgrade an existing Zowe server component from version 1 to version 2. Because there is no clear upgrade path from v1 to v2 or v3, you must perform a clean installation of Zowe. This article provides a detailed map for updating component manifests, lifecycle scripts, and environment variables to achieve compatibility with Zowe version 2.