# Upgrading the z/OS system for Zowe

If you installed Zowe previously, the system is already prepared and configured to launch a Zowe instance. A Zowe configuration consists of three USS directories. See [Topology of the Zowe z/OS launch process](./installandconfig.md#topology-of-the-zowe-z/OS-launch-process) for more information.  

- The runtime directory that contains the binary and executable files. See [RUNTIME_DIR](./installandconfig.md#runtime-dir) for more information.  This directory is read only and contains a `manifest.json` file that can be used to identify its release number. See [Check the Zowe release number](../troubleshoot/troubleshoot-zowe-release.md#check-the-zowe-release-number) for more information. A new Zowe runtime directory is created when a new version of Zowe is installed.
- The instance directory that is used to launch the Zowe started task `ZWESVSTC`. See [INSTANCE_DIR](./installandconfig.md#instance-dir) for more information.  The instance directory is read/write as it contains log files and the file `instance.env` that contains environment launch values.
- The keystore directory that contains details about certificates used by Zowe. See [KEYSTORE_DIRECTORY](./installandconfig.md#instance-dir) for more information.

Zowe installation also creates two data sets.

- **SZWESAMP**

   This contains 10 members. Four of them are JCLs to configure (and unconfigure Zowe). Three are PROCLIB members. One contains PPT entries. One is a PARMLIB member and one contains console commands. See [SZWESAMP data set](./install-zowe-zos-convenience-build.md#step-3-choose-a-dataset-hlq-for-the-samplib-and-loadlib) for more information.

- **SZWEAUTH**

   This is an APF-authorized PDSE load library containing the load modules `ZWESIS01` for the cross memory server and `ZWESAUX` for the auxiliary address space. See [SZWEAUTH data set](./install-zowe-zos-convenience-build.md#step-3-choose-a-dataset-hlq-for-the-samplib-and-loadlib) for more information.


## Upgrading the instance directory

A Zowe instance directory is created using the script `zowe-configure-instance.sh` in the `<RUNTIME_DIR>/bin` directory. 

After installing a new version of Zowe, the new runtime will either be in the same directory as the previous version, for example, `/usr/lpp/zowe` if SMP/E has been used, or else may be in a different directory, for example, `~/zowe/zowe-r.M.m` if using a convenience build installation.

In both situations, you can keep and reuse the instance directory that is used for the previous version of Zowe to launch the new version of Zowe. To do this, run the script `zowe-configure-instance.sh` from the new `<RUNTIME_DIR>/bin` directory with the `-c` argument pointing to the location of the existing instance directory. This is the same method used to create an instance directory with default values in an empty target directory, however if `-c` argument is a pre-existing instance directory rather than wiping and creating fresh contents, the contents are updated.  In the situation where the previous instance directory was created from a different runtime directory, the `ROOT_DIR=` value in `instance.env` will be updated to reference the `<RUNTIME_DIR>` from which `zowe-configure-instance.sh` was executed.  In addition the `manifest.json` file in the instance directory will be updated with the `"version:"` of the `<RUNTIME_DIR>`.  This can be used as a way to see the Zowe version that an instance was last configured from. See [Check the Zowe release number](../troubleshoot/troubleshoot-zowe-release.md#check-the-zowe-release-number).  

The `zowe-configure-instance.sh` script will detect if there are new configuration values that have been introduced since the instance directory was last created, and append these to `instance.env` with default values.  New values added will be echoed in the shell running the `zowe-configure-instance.sh` script, and are be described in [Reviewing the instance.env file](./configure-instance-directory.md#reviewing-the-instance.env-file).  Values in `instance.env` previously changed from their default, such as port values or locations of dependent runtimes, are not modified.

The `zowe-configure-instance.sh` script will echo any values that are added to the `instance.env` file.

```
Missing properties that will be appended to /u/winchj/zowe-instance/instance.env:
```

## Updating the PROCLIB members

Zowe releases contain two proclib members, `ZWESISTC` and `ZWESVSTC` in the PDS `SZWESAMP`.  When the previous release of Zowe was installed, these would have been copied to a PDS in the proclib concatenation path and defined to run under their respective user IDs of `ZWESVUSR` and `ZWESIUSR`. See [Installing the Zowe started task (ZWESVSTC)](./configure-zowe-server.md) and [Installing the Zowe cross memory server (ZWESISTC)](./configure-xmem-server.md).

The proclib members do not usually get updated between Zowe releases, so during an upgrade you may keep the previous JCL proclibs.  If the proclib members are updated then the HOLDDATA and the [release notes](../getting-started/summaryofchanges.md) will describe any changes and alert you that the proclibs need to be updated.  If you are upgrading Zowe and jumping releases, for example moving from 1.12 to 1.16, then you should check the HOLDDATA (for SMP/E) and the release notes for all intervening releases (1.12, 1.13, 1.14, 1.15) to see if the proclibs have changed.  

## Updating the cross memory server load modules

Zowe releases contain two load modules, `ZWESIS00` for the cross memory server and `ZWESAUX` for the auxiliary server.  There are delivered in a PDSE `SZWEAUTH` that is created by the installation process.  

If this PDSE is the same one used by the `ZWESISTC` proclib that starts the cross memory server, then because the installation replaces the data set and its contents no action is required.  This is the recommended approach to configure a Zowe environment.

If you have copied the `SZWEAUTH` members to another PDSE that you are using as a runtime load module, then you should recopy the updated members to the runtime location.  

## Updating the system and security configuration

The JCL member `ZWESECUR` delivered in the PDS member `SZWESAMP` contains the TSO commands used to configure a z/OS environment for launching Zowe.  

The contents of `ZWESECUR` do not usually get updated between Zowe releases, so during an upgrade you should not need to rerun the JCL.  If there are additions, then the HOLDDATA for the SMP/E release and the [release notes](../getting-started/summaryofchanges.md) will describe the changes.  

## Upgrading the keystore directory

When the previous release of Zowe was configured, a keystore directory would have been created.  This would either contain the Zowe certificate, or else reference a SAF keyring that contains the Zowe certificate. See [Configuring Zowe certificates](./configure-certificates.md).  The USS keystore directory is created using the script `<RUNTIME_DIR>/bin/zowe-setup-certificates.sh` that is delivered with the new Zowe release, and creates the USS file `<KEYSTORE_DIRECTORY/zowe-setup-certificates.env` containing key value parameters used by the Zowe runtime to locate its certificate.  

Typically, the `<KEYSTORE_DIRECTORY>` is compatible with later versions and can be used when moving forward to a new Zowe release.  There are situations when new functionality is introduced into a Zowe release when new key values pairs may be introduced to the `<KEYSTORE_DIRECTORY>/zowe-setup-certificates.env` file, in which case the new release will describe the new functionality in its HOLDDATA (for SMP/E) or release notes.  If this occurs, it will be necessary to create a new `KEYSTORE_DIRECTORY` in order to use the new functionality.  This was the case when Zowe 1.15 introduced support for storing certificates in a SAF keyring.  

Zowe provides a JCL member `SZWESAMP(ZWEKRING)` to create the keystore and populate it with the Zowe certificate. Unless instructed by the HOLDDATA or release notes, there is no need to re-create the keystore or certificate and ones used with previous Zowe releases can be reused.  

## Service disruption during upgrades

When Zowe is upgraded, the started tasks `ZWESVSTC` and `ZWESISTC` need to be stopped and started for the changes to take effect.  This will cause active operations to fail.  Idle, or passive operations, such as an open webpage on the Zowe desktop may continue to work without disruption under the following circumstances:

- SSO is being used
- SSO is not being used, but a new page in the browser is opened to re-login to Zowe

In both cases, the original webpages will have access to currently valid credentials, allowing the web page to issue new operations without reloading a page.  However, in-process operations that failed during the upgrade, unless retired manually or automatically may necessitate a page reload.  

### Zowe extensions

Zowe extensions can depend on servers, databases, and other software that is outside the scope of Zowe. Therefore, you should refer to each plug-in's documentation to understand what to expect when an upgrade occurs. 

#### Zowe desktop 

A system programmer with admin rights may invoke the role base access control (RBAC) controlled App Server endpoint `/server/reload` to reload the server without the need for an end user webpage reload.  This endpoint and more are documented in swagger [here](https://github.com/zowe/zlux-app-server/blob/staging/doc/swagger/server-plugins-api.yaml). 

If the plug-in uses the ZSS server to provide a REST API, ZSS must be restarted causing the same disruption behavior as a Zowe server upgrade.

If the plug-in has web content that shows in the Zowe desktop without an iframe, you must reload the desktop to see the updated content.

