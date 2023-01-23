# Zowe server component and extension management

This page covers how to install and manage Zowe server components or extensions by using `zwe components` commands.
 
## Installing a component

Zowe ships the [`zwe components install` command](../appendix/zwe_server_command_reference/zwe/components/install/zwe-components-install.md) to help end-user to install any Zowe server extensions (extensions are components that are not part of Zowe core). In order to be compatible with the command, components must follow [Zowe server component package format standard](../extend/packaging-zos-extensions.md#zowe-server-component-package-format).

More information such as parameters and examples can be found on the [`zwe components install` reference page](../appendix/zwe_server_command_reference/zwe/components/install/zwe-components-install.md)

  **Note:** The automatic tagging process is opinionated about which file extensions should be in which encoding. If this does not fit in your needs, a `pax` format is recommended to include the tagging information into your package. This option is only applicable for z/OS. The following list presents the allowed values:
  * `yes`
  
    This option automatically tag the encoding of the files.
  * `no`
  
    Do not automatically tag encoding of the files.

  * `auto`
  
    Tag only when manifest is in `ISO8859-1` encoding.

- **`--log-dir|--log|-l`**

  (String, Optional) Specifies the path to the log directory.

- **`--debug|--verbose|-v`**

  (Boolean, Optional) Enable debug level logging. This will help on troubleshooting issues.

- **`--trace|-vv`**

  (Boolean, Optional) Enable the most detail trace level logging. This will help on troubleshooting issues.

## Enable and disable component

Zowe ships [`zwe components enable`](../appendix/zwe_server_command_reference/zwe/components/zwe-components-enable.md) and [`zwe components disable`](../appendix/zwe_server_command_reference/zwe/components/zwe-components-disable.md) commands to help you enable and disable Zowe server component (extension). In order to be compatible with these commands, components must follow [Zowe server component package format standard](../extend/packaging-zos-extensions.md#zowe-server-component-package-format).

**Important** these commands will update your `zowe.yaml` configuration file.

**Note** `zwe components install` command will enable the component globally if `--skip-enable` is not passed to it.

More information such as parameters and examples can be found on the [`zwe components enable` reference page](../appendix/zwe_server_command_reference/zwe/components/zwe-components-enable.md) and the [`zwe components disable` reference page](../appendix/zwe_server_command_reference/zwe/components/zwe-components-disable.md)

## Upgrading a component

`zwe components install` is only used for installing a component that is not yet installed.
If you need to install a new version of an existing component, you must use the [`zwe components upgrade` command](../appendix/zwe_server_command_reference/zwe/components/zwe-components-upgrade.md) instead.

More information such as parameters and examples can be found on the [`zwe components install` reference page](../appendix/zwe_server_command_reference/zwe/components/install/zwe-components-install.md)

This command can be used to upgrade all components that have an upgrade available when using `zwe` with a component package registry. More information can be found within [the component package registry documentation](../extend/component-registries.md)


## Uninstalling a component

`zwe components uninstall` can be used to remove a previously installed extension. It will not remove core components. 

More information such as parameters and examples can be found on the [`zwe components uninstall` reference page](../appendix/zwe_server_command_reference/zwe/components/zwe-components-uninstall.md)


## Searching for a component

`zwe components search` helps you find components that are available for installation from your chosen component package registry. This command requires that you have configured your Zowe instance for use with such a registry. [Click here for more information on how to set up and use a component package registry](../extend/component-registries.md)

More information such as parameters and examples can be found on the [`zwe components search` reference page](../appendix/zwe_server_command_reference/zwe/components/zwe-components-search.md)


## Manual Component management

It's recommended to use `zwe components` for all component management. The information below is provided for troubleshooting purposes.

### Zowe core components

The Zowe runtime directory delivers its core components in the `<RUNTIME_DIR>/components/` directory. A typical components directory looks like this:

```
<RUNTIME_DIR>/components/
  /discovery
  /gateway
  /app-server
  /explorer-jes
  /explorer-mvs
  /files-api
  /jobs-api
  /...
```

Same as all Zowe server components, Zowe core components can be enabled or disabled by setting `components.<component>.enabled` to `true` or `false`.

### Zowe z/OS extensions

All Zowe z/OS extension runtime programs are installed into a single location which is defined as `zowe.extensionDirectory` in `zowe.yaml`. Each extension should be represented with the extension name in this directory, and use either a directory or a symbolic link.

The Zowe launch script reads `components.<component>.enabled` and `haInstances.<ha-instance>.components.<component>.enabled` defined in `zowe.yaml` to determine whether to start an extension in current HA instance. The value of this `enabled` is boolean either `true` or `false`.

**Example:**

The vendor MYVENDOR has a product named MYAPP that installs into `/usr/lpp/myvendor/myapp`. There is one Zowe extension shipped within the product in the directory `/usr/lpp/myvendor/myapp/zowe-ext`. This subdirectory is a Zowe extension so that the product can be started and stopped with Zowe and run as an address space under the `ZWESLSTC` started task in the Zowe USS shell.

The directory `/usr/lpp/myvendor/myapp/zowe-ext` should include a `manifest.yaml` file to describe the extension. The script `/usr/lpp/myvendor/myapp/zowe-ext/bin/validate.sh` checks that the environment is configured correctly and the script `/usr/lpp/myvendor/myapp/zowe-ext/bin/start.sh` starts the vendor application. The `/usr/lpp/myvendor/myapp/zowe-ext/manifest.yaml` should look like this:

```yaml
name: myapp
id: com.myvendor.myapp
title: My Zowe Extension
commands:
  validate: bin/validate.sh
  start: bin/start.sh
```

Because MYAPP is shipped within another product, the installation should create a symbolic link in `zowe.extensionDirectory` directory.

```
$ ls -l /global/zowe/extensions
total 16
lrwxrwxrwx   1 <USER> <GROUP>       23 Nov 11  2019 myapp -> /usr/lpp/myvendor/myapp/zowe-ext
```

Also, `myapp` is enabled in `zowe.yaml` like this.

```
components:
  myapp:
    enabled: true
```

When the Zowe instance is launched by running `zwe start` command, it will read manifest `commands` instructions and call the `/usr/lpp/myvendor/myapp/zowe-ext/bin/start.sh` script. The started task will create an address space under `ZWESLSTC` for the vendor component.  When the Zowe instance is stopped, the address space is terminated.
