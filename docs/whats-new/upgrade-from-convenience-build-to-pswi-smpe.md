# Zowe Upgrade from Convenience Build to PSWI/SMP/E Installation

Review the recommended procedure for upgrading an existing Zowe installation from a convenience build to a PSWI (Portable Software Instance) or SMP/E-based installation. The steps outline the best practices for upgrading and include all necessary tasks for reusing or updating configuration, managing runtime datasets, and maintaining service continuity.

## Prerequisites before upgrade

Ensure you meet the following conditions before you start the upgrade process:

* Confirm the current installed version of Zowe (e.g., v3.0).
* Determine if the upgrade target is the same version or a newer version (e.g., v3.1).
* Backup the following elements:
    * The existing zowe.yaml configuration file
    * Zowe runtime datasets
    * STC JCLs and PARMLIB members

## Installing Zowe via PSWI or SMP/E

Choose your installation method, either PSWI or SMP/E, based on your preferences.

### PSWI Installation (Portable Software Instance)

1. Download the Zowe PSWI package.
2. Install using z/OSMF workflows or standalone jobs provided.
3. Ensure the runtime libraries are correctly installed.

For more information about PSWI installation, see [Installing Zowe from a Portable Software Instance](../user-guide/install-zowe-pswi.md).

### SMP/E Installation

1. Acquire the Zowe SMP/E package.
2. Execute SMP/E RECEIVE, APPLY, and ACCEPT jobs.
3. Validate successful deployment of Zowe into target libraries.
4. Utilize Zowe SAMPLIB for post-install configuration.

For more information about SMP/E installation, see [Installing Zowe SMP/E overview](../user-guide/install-zowe-smpe-overview.md).

## Configuring to the same or newer version

When upgrading from the convenience build, you can either use PSWI or SMP/E to upgrade to the same version or to a higher version.

### Upgrade to the same version

If the target PSWI/SMP/E version matches the currently installed convenience build, use the following outline of steps:

1. Reuse the existing zowe.yaml file.
2. Continue using the current runtime datasets, or for SMP/E, from the target library.
3. Update ZOWE STC and YAML to point to new Zowe libraries from PROCLIB & YAML.

### Upgrade to a newer version

If migrating to a newer version of Zowe for example from v3.0 to v3.1, you can either use PSWI workflows, or alternatively, by configuring the SMP/E SAMPLIB.

* **Using PSWI Workflows**  
  You can use z/OSMF workflows provided in the PSWI package to perform the following tasks:
  * Generate a new zowe.yaml configuration
  * Allocate new runtime datasets
  * Configure system definitions (e.g. APF, PROCLIB)

* **Using SMP/E SAMPLIB**
  
  Use members from ZOWE SAMPLIB to perform the following tasks:
  * Allocate and define new runtime datasets
  * Create or customize a new zowe.yaml
  * Configure system definitions (e.g. APF, PROCLIB)

:::tip
Ensure all new configurations are validated for compatibility and correctness.
:::

## Switch between Zowe versions

Use the following step outline to switch between Zowe versions (e.g. v3.0 and v3.1):

1. Update STEPLIB in Zowe STC JCLs to reflect correct target libraries.
2. Modify PARMLIB member references accordingly.
3. Restart all affected Zowe STCs.

## Validate after upgrade

Follow these steps to validate that you successfully upgraded your Zowe installation.

1. Start the following Zowe STCs:
  * ZWESISTC
  * ZWESLSTC
2. Monitor logs for any anomalies or errors.
3. Validate functionality by checking the following functionalities:
  * Access Zowe Desktop
  * Confirm API services <!-- where are these services confirmed? In the Desktop? -->
4. Review system and application logs for configuration or version mismatches.
   For more information, see [Verifying Zowe installation on z/OS](../user-guide/verify-zowe-runtime-install.md)

:::tip
Use the following guidelines to maintain rollback readiness in the event of unexpected issues during your Zowe upgrade:
* Retain previous runtime datasets
* Keep backup copies of all JCLs and configuration members
* Be prepared to reassign STEPLIB/PARMLIB back to convenience build settings
:::
