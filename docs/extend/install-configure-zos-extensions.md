# Install Zowe server component

Learn how to install Zowe server components or extensions by using `zwe components install` commands or manually.
 
## Install component

Zowe ships [`zwe components install` command](../appendix/zwe_server_command_reference/zwe/components/install/zwe-components-install.md) to help end-user to install any Zowe server components (extensions). Zowe core components are also installed with this command. In order to be compatible with the command, components must follow [Zowe server component package format standard](packaging-zos-extensions.md#zowe-server-component-package-format).

**Important** this command will also enable the component globally by updating your `zowe.yaml` configuration file. You can pass `--skip-enable` to disable this behavior.

Execute the command from z/OS USS. Use the following command line parameters:

- **`--component-file|--component|-o`**

  (String, Required) Defines the path to the component package or directory.

- **`--config|-c`**

  (String, Required) Defines the path to the Zowe YAML configuration. `zwe components install` relies on the `zowe.extensionDirectory` definition to know where the component will be installed.

-- **`--skip-enable`**

  (Boolean, Optional) Tells the command do not enable the component by updating `zowe.yaml` configuration file.

- **`--auto-encoding|-e`**

  (String, Optional) Defines whether to automatically tag the encoding of the files that are shipped with the component. The default value is `auto`, which indicates that the script determines whether the automatic tagging is needed or not.
  
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

**Examples:**

The following command installs the `my-zowe-component-1.2.3.pax` into `/global/zowe/extensions` which is defined as `zowe.extensionDirectory` in `/path/to/my/zowe.yaml`.

```
$ zwe components install -o /path/to/my-zowe-component-1.2.3.pax -c /path/to/my/zowe.yaml
```

## Enable and disable component

Zowe ships [`zwe components enable`](../appendix/zwe_server_command_reference/zwe/components/zwe-components-enable.md) and [`zwe components disable`](../appendix/zwe_server_command_reference/zwe/components/zwe-components-disable.md) commands to help you enable and disable Zowe server component (extension). In order to be compatible with these commands, components must follow [Zowe server component package format standard](packaging-zos-extensions.md#zowe-server-component-package-format).

**Important** these commands will update your `zowe.yaml` configuration file.

**Note** `zwe components install` command will enable the component globally if `--skip-enable` is not passed.

Execute these commands from z/OS USS. Use the following command line parameters:

- **`--component|-o`**

  (String, Required) Defines the component name should be enabled or disabled.

- **`--config|-c`**

  (String, Required) Defines the path to the Zowe YAML configuration. `zwe components install` relies on the `zowe.extensionDirectory` definition to know where the component will be installed.

- **`--ha-instance|-i`**

  (String, Optional) Defines the Zowe high availability instance ID of where the component will be enabled or disabled. If this argument is not passed, the component will be enabled/disabled globally from `components.<component>.enabled`. If this argument has a value, only specified HA instance will be changed, which is `haInstances.<ha-instance>.components.<component>.enabled`.

- **`--log-dir|--log|-l`**

  (String, Optional) Specifies the path to the log directory.

- **`--debug|--verbose|-v`**

  (Boolean, Optional) Enable debug level logging. This will help on troubleshooting issues.

- **`--trace|-vv`**

  (Boolean, Optional) Enable the most detail trace level logging. This will help on troubleshooting issues.

**Examples:**

The following command enables `my-zowe-component`.

```
$ zwe components enable \
    -o my-zowe-component \
    -c /path/to/my/zowe.yaml
```

The following command will disable `my-zowe-component` on HA instance `lpar1`. The configuration logs write to `/var/zowe/logs`.

```
$ zwe components disable \
    -o my-zowe-component \
    -c /path/to/my/zowe.yaml \
    -i lpar1 \
    -l /var/zowe/logs
```

## Install and configure manually

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
