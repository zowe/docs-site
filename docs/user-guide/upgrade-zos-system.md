# Upgrading the z/OS system for Zowe

If you have previously installed Zowe the system will have already been prepared and configured to launch a Zowe instance. A Zowe configuration consists of three USS directories, see [Topology of the Zowe z/OS launch process](./installandconfig.md#topology-of-the-zowe-z/OS-launch-process).  

 - The runtime directory that contains the binaries and executables, see [RUNTIME_DIR](./installandconfig.md#runtime-dir).  This directory is read only and contains a `manifest.json` file that can be used to identify its release number, see [Check the Zowe release number](../troubleshoot/troubleshoot-zowe-release. md#check-the-zowe-release-number).  A new Zowe runtime directory is created when a new version of Zowe is installed.
 - The instance directory that is used to launch the Zowe started task `ZWESVSTC`, see [INSTANCE_DIR](./installandconfig.md#instance-dir).  The instance directory is read write as it contains log files as well as the file `instance.env` that contains environment launch values.
 - The keystore directory that contains details about certificates used by Zowe, see [KEYSTORE_DIRECTORY](./installandconfig.md#instance-dir).

There are also two data sets that are created by the Zowe install.

- SZWESAMP containing 10 members.  Five are JCL to configure (and deconfigure Zowe), three are PROCLIB members, one contains PPT entries, one is a PARMLIB member, and one contains console commands.  See [SZWESAMP data set](./install-zowe-zos-convenience-build.md#step-3-choose-a-dataset-hlq-for-the-samplib-and-loadlib)
- SZWEAUTH is an APF Authorized PDSE load library containing the load modules `ZWESIS01` for the cross memory server and `ZWESAUX` for the auxiliary address space, see [SZWEAUTH data set](./install-zowe-zos-convenience-build.md#step-3-choose-a-dataset-hlq-for-the-samplib-and-loadlib).


## Upgrading the instance directory

A Zowe instance directory is created using the script `zowe-configure-instance.sh` contained in the `<RUNTIME_DIR>/bin` directory. 

After installing a new version of Zowe the new runtime will either be in the same directory as the previous version, e.g. `/usr/lpp/zowe` if SMP/E has been used, or else may be in a different directory, e, `~/zowe/zowe-r.M.m` if using a convenience build installation.

In both situations the instance directory used for the previous version of Zowe can be kept and re-used to launch the new version of Zowe.  Run the script `zowe-configure-instance.sh` from the new `<RUNTIME_DIR>/bin` directory with the `-c` argument pointing to the location of the existing instance directory. This is the same method used to create an instance directory with default values in an empty target directory, however if `-c` argument is a pre-existing instance directory rather than wiping and creating fresh contents, the contents are updated.  This includes updating the `manifest.json` file in the instance directory allowing you to see the version that an instance was last configured from.  In addition new values with their defaults may be added to the existing `instance.env` file as new releases of Zowe offer new configuration options.  Options previously changed from their default, such as port values or locations of dependent runtimes are not modified.

The `zowe-configure-instance.sh` script will echo any values that are added to the `instance.env` file.

```
Missing properties that will be appended to /u/winchj/zowe-instance/instance.env:
```

A Zowe instance directory `instance.env` file points to the `RUNTIME_DIR` directory used to launch a Zowe instance with the value `ROOT_DIR`.  This directory is **NOT** updated by `zowe-configure-instance.sh` and needs to be updated manually, see [Reviewing the instance.env file](./configure-instance-directory.md#comopnent-prerequisites).

An example of this scenario is:

- Zowe 1.12.0 is installed to `/u/myuser/zowe/zowe-1.12.0` as a convenience build and the script `/u/myuser/zowe/zowe-1.12.0/bin/zowe-configure-instance.sh -c /u/myuser/zowe-instance-dir` is executed.  The `/u/myuser/zowe-instance-dir/instance.env` file will point to the runtime directory from which it was created, e.g. `ROOT_DIR=/u/myuser/zowe/zowe-1.12.0`.
- Zowe 1.16.0 is installed to `/u/myuser/zowe/zowe-1.16.0`.  In order to re-use the same instance directory that has been customized the script `/u/myuser/zowe/zowe-1.16.0/bin/zowe-configure-instance.sh -c /u/myuser/zowe-instance-dir` is executed.  If the script `/u/myuser/zowe-instance-dir/bin/zowe-start.sh` is executed to launch Zowe because the `ROOT_DIR` value has not been changed the 1.12 release is started and not the new 1.16.  To resolve this update `/u/myuser/zowe-instance-dir/instance.env` value `ROOT_DIR=/u/myuser/zowe/zowe.1.12.0` to be `ROOT_DIR=/u/myuser/zowe/zowe.1.16.0`.

```
ROOT_DIR=<fully qualified path to Zowe runtime directory>
```

If the `ROOT_DIR` value is not updated and the directory it points to is removed then `zowe-start.sh` will fail with the error `<RUNTIME_DIRECTORY>/scripts/internal/opercmd: ./zowe-start.sh 6: FSUM7351 not found`, see [](../troubleshoot/troubleshoot-zos.md#unable-to-launch-zowe-with-{-fsum7351-})

## Updating the PROCLIB members

Zowe releases contains two proclib members, `ZWESISTC` and `ZWESVSTC` in the PDS `SZWESAMP`.  When the previous release of Zowe was installed these would have been copied to a PDS in the proclib concatention path and defined to run under their respective user IDs of `ZWESVUSR` and `ZWESIUSR`, see [Installing the Zowe started task (ZWESVSTC)](./configure-zowe-server.md) and [Installing the Zowe cross memory server (ZWESISTC)](./configure-xmem-server.md).

The proclib members do not usually get updated between Zowe releases, so during an upgrade you may keep the previous JCL problibs.  If the proclib members are updated then the HOLDDATA and the [release notes](../getting-started/summaryofchanges.md) will describe any changes and alert you that the proclibs need updating.  If you are upgrading Zowe and jumping releases, for example moving from 1.12 to 1.16, then you should check the HOLDDATA (for SMP/E) and the release notes for all intervening releases (1.12, 1.13, 1.14, 1.15) to see if the proclibs have changed.  

## Updating the cross memory server load modules

Zowe releases contain two load modules, `ZWESIS00` for the cross memory server and `ZWESAUX` for the auxiliary server.  There are delivered in a PDSE `SZWEAUTH` that is created by the installation process.  

If this PDSE is the same one used by the `ZWESISTC` proclib that starts the cross memory server, then because the installation replaces the data set and its contents no action is required.  This is the recommended approach to configure a Zowe environment.

If you have copied the `SZWEAUTH` members to another PDSE that you are using as a runtime load module, then you should re-copy the updated members to the runtime location.  

## Updating the system and security configuration

The JCL member `ZWESECUR` delivered in the PDS member `SZWESAMP` contains the TSO commands used to configure a z/OS environment for launching Zowe.  

The contents of `ZWESECUR` do not usually get updated between Zowe releases, so during an upgrade you should not need to re-run the JCL.  If there are additions then the HOLDDATA for the SMP/E release and the [release notes](../getting-started/summaryofchanges.md) will describe the changes.  

## Upgrading the keystore directory

When the previous release of Zowe was configured a keystore directory would have been created.  This would either contain the Zowe certificate, or else reference a SAF keyring that contains the Zowe certificate, see [Configuring Zowe certificates](./configure-certificates.md).  The USS keystore directory is created using the script `<RUNTIME_DIR>/bin/zowe-setup-certificates.sh` that is delivered with the new Zowe release, and creates the USS file `<KEYSTORE_DIRECTORY/zowe-setup-certificates.env` containing key value parameters used by the Zowe runtime to locate its certificate.  

Typically the `<KEYSTORE_DIRECTORY>` is forward compatible can be used when moving forward to a new Zowe release.  There are situations when new functionality is introduced into a Zowe release when new key values pairs may be introduced to the `<KEYSTORE_DIRECTORY>/zowe-setup-certificates.env` file, in which case the new release will describe the new functionality in its HOLDDATA (for SMP/E) or release notes.  If this occurs it will be necessary to create a new `KEYSTORE_DIRECTORY` in order to exploit the new functionality.  This was the case when Zowe 1.13 introduced support for storing certificates in a SAF keyring.  

Zowe provides a JCL member `SZWESAMP(ZWEKRING)` to create the keystore and populate it with the Zowe certificate. Unless instructed by the HOLDDATA or release notes there is no need to re-create the keystore or certificate and ones used with previous Zowe releases can be re-used.  

## Service Disruption During Upgrades

When Zowe is upgraded the started tasks `ZWESVSTC` and `ZWESISTC` need to be stopped and started for the changes to take effect.  This will cause active operations to fail.  Idle, or passive operations, such as an open webpage on the Zowe desktop may continue to work without disruption under the following circumstances:

- SSO is being used
- SSO is not being used, but a new page in the browser is opened to re-login to Zowe

In both cases the original webpages will have access to currently valid credentials, allowing the web page to issue new operations without needing a page reload.  However, in-process operations that failed during the upgrade, unless retired manually or automatically may necessitate a page load reload.  

### Zowe extensions

Zowe extensions can depend on servers, databases, and other software that is outside the scope of Zowe. Therefore you should refer to each plugin's documentation to understand what to expect when an upgrade occurs. 

#### Zowe desktop 

A system programmer with admin rights may invoke the role base access control (RBAC)controlled App Server endpoint `/server/reload` to reload the server without the need for an end user webpage reload.  This endpoint and more are documented in swagger [here](https://github.com/zowe/zlux-app-server/blob/staging/doc/swagger/server-plugins-api.yaml). 

If the plugin uses the ZSS server to provide a REST api, ZSS must be restarted causing the same disruption behavior as a Zowe server upgrade.

If the plugin has web content that shows in the Zowe desktop without an iframe you must reload the desktop to see the updated content.

