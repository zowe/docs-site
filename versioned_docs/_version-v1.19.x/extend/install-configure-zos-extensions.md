# Install and configure Zowe server component

Learn how to install and configure the Zowe server components or extensions manually or by using scripts `zowe-install-component.sh` and `zowe-configure-component.sh`. 

## Install with `zowe-install-component.sh` (Technical Preview)

<Badge text="Technical Preview"/>

_Note: This section is for technical preview and we are happy to hear any feedback. Content in this section may be changed or improved in the future._

_Note: this feature is added with Zowe v1.19.0 release._

From Zowe v1.19.0, Zowe ships a `bin/zowe-install-component.sh` tool to help you install any Zowe server component (extension). Zowe core components are also installed with this tool. In order to be compatible with the tool, we recommend components follow [Zowe server component package format standard](packaging-zos-extensions.md#zowe-server-component-package-format).

The tool can be executed from z/OS USS, and it takes these command line parameters:

- **`-o|--component-file`**: (Required) Defines the path to the component package or directory.
- **`-c|--component-name`**: Specifies the name of the component. This parameter is optional if `NODE_HOME` is defined and the component has the manifest file. Otherwise, it's required.
- **`-i|--instance-dir`**: (Optional) Defines the path to the Zowe instance directory. When a value is defined, the script will also execute `bin/zowe-configure-component.sh` once it's installed.
- **`-d|--target-dir`**: (Optional) Defines the path to the installation target directory. For native components, the default value is `${ZOWE_ROOT_DIR}/components`. For non-native components, the script will check the value of the `ZWE_EXTENSION_DIR` variable. If the value is also empty, the script will fall back to the default target directory `/global/zowe/extensions`.
- **`-e|--auto-encoding`**: (Optional) Defines whether to automatically tag the encoding of the files that are shipped with the component. The default value is `auto`, which indicates that the script will determine whether the automatic tagging is needed or not. Note that the automatic tagging process is opinionated about which file extensions should be in which encoding. If this does not fit in your needs, a `pax` format is recommended to include the tagging information into your package. This option is only applicable for z/OS. Allowed values include:
  * `yes`: automatically tag the encoding of the files.
  * `no`: do not automatically tag encoding of the files.
  * `auto`: tag only when manifest is in `ISO8859-1` encoding.
- **`-k|--core`**: This is an optional boolean. It defines whether this component is bundled into the Zowe package as a core component.
- **`-l|--logs-dir`**: (Optional) Specifies the path to the log directory.
- **`-f|--log-file`**: (Optional) Instead of writing independent log to a directory, you have option to append log to this log file specified.

**Examples**

This command installs `my-zowe-component-1.2.3.pax` into `/global/zowe/extensions`.

```
$ zowe-install-component.sh -o /path/to/my-zowe-component-1.2.3.pax
```

This command installs `my-zowe-component-1.2.3.zip` into `/var/zowe/my-extensions` and also configures this component for the Zowe instance located at `/var/zowe/instance`. The installation and configuration logs will be written into `/var/zowe/instance/logs`.

```
$ zowe-install-component.sh \
    -o /path/to/my-zowe-component-1.2.3.zip \
    -d /var/zowe/my-extensions \
    -i /var/zowe/instance \
    -l /var/zowe/instance/logs
```

## Configure with `zowe-configure-component.sh` (Technical Preview)

<Badge text="Technical Preview"/>

_Note: This section is for technical preview and we are happy to hear any feedback. Content in this section may be changed or improved in the future._

_Note: This feature is added with Zowe v1.19.0 release._

From Zowe v1.19.0, Zowe ships a `bin/zowe-configure-components.sh` tool to help you configure an installed Zowe server component (extension) for a Zowe instance. Zowe core components are also configured with this tool. In order to be compatible with the tool, we recommend components follow [Zowe server component package format standard](packaging-zos-extensions.md#zowe-server-component-package-format).

You may not need to run this script directly if you have supplied `-i|--instance-dir` when you run `zowe-install-component.sh`.

The tool can be executed from z/OS USS, and it takes these command line parameters:

- **`-c|--component-name`**: (Required) Specifies the name of the component.
- **`-i|--instance-dir`**: (Required) Defines the path to the Zowe instance directory.
- **`-d|--target-dir`**: (Optional) Defines the directory where the component is installed. For native components, the default value is `${ZOWE_ROOT_DIR}/components`. For non-native components, the script will check `ZWE_EXTENSION_DIR` if possible. Otherwise, it will fall back to the default target directory `/global/zowe/extensions`.
- **`-k|--core`**: This is an optional Boolean. It defines whether this component is bundled into the Zowe package as a core component.
- **`-l|--logs-dir`**: (Optional) Defines the path to the log directory.
- **`-f|--log-file`**: (Optional) Instead of writing independent log to a directory, you have option to append log to this log file specified.

**Examples**

This command configures `my-zowe-component` installed in `/global/zowe/extensions` for the Zowe instance located at `/var/zowe/instance`.

```
$ zowe-configure-component.sh \
    -c my-zowe-component \
    -i /var/zowe/instance
```

This command configures `my-zowe-component` installed in `/var/zowe/my-extensions` for the Zowe instance located at `/var/zowe/instance`. The configuration logs will be written into `/var/zowe/instance/logs`.

```
$ zowe-configure-component.sh \
    -c my-zowe-component \
    -i /var/zowe/instance \
    -d /var/zowe/my-extensions \
    -l /var/zowe/instance/logs
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

You can configure whether to start the Zowe core component or not with the `LAUNCH_COMPONENTS` variable defined in `<INSTANCE_DIR>/instance.env`. The value of this variable can be a comma-separated list of core component names.

**Note:** You can also use full USS path to the component `bin` directory which contains lifecycle scripts, but this behavior will be deprecated in next major release.

### Zowe extensions

It is suggested that you install all Zowe extension runtime programs into a single location. The suggested default extension directory is `/global/zowe/extensions`. Each extension should be represented with the extension name in this directory, either a directory or a symbolic link. This location should be defined as `ZWE_EXTENSION_DIR` in `<INSTANCE_DIR>/instance.env`.

The Zowe launch script reads `EXTERNAL_COMPONENTS` defined in `<INSTANCE_DIR>/instance.env` to decide whether to start an extension. The value of `EXTERNAL_COMPONENTS` is a comma-separated list of extension names.

**Note:** You can also use full USS path to the extension `bin` directory which contains lifecycle scripts, but this behavior will be deprecated in next major release.

#### Example

The vendor MYVENDOR has a product named MYAPP that installs into `/usr/lpp/myvendor/myapp`. There is one Zowe extension shipped within it in the directory `/usr/lpp/myvendor/myapp/zowe-ext`. This subdirectory is a Zowe extension so they want it to be started and stopped with Zowe and run as an address space under the `ZWESVSTC` started task in the Zowe USS shell.

The directory `/usr/lpp/myvendor/myapp/zowe-ext` should include a `manifest.yaml` file to describe the extension. The script `/usr/lpp/myvendor/myapp/zowe-ext/bin/validate.sh` checks that the environment has been configured correctly and the script `/usr/lpp/myvendor/myapp/zowe-ext/bin/start.sh` starts the vendor application. The `/usr/lpp/myvendor/myapp/zowe-ext/manifest.yaml` should look like this:

```yaml
name: myapp
id: com.myvendor.myapp
title: My Zowe Extension
commands:
  validate: bin/validate.sh
  start: bin/start.sh
```

Because MYAPP is shipped within another product, the installation should create a symbolic link in `ZWE_EXTENSION_DIR` directory.

```
$ ls -l /global/zowe/extensions
total 16
lrwxrwxrwx   1 <USER> <GROUP>       23 Nov 11  2019 myapp -> /usr/lpp/myvendor/myapp/zowe-ext
```

Also `myapp` will be added into the value of the `EXTERNAL_COMPONENTS` variable in `<INSTANCE_DIR>/instance.env`.

```
ZWE_EXTENSION_DIR=/global/zowe/extension
EXTERNAL_COMPONENTS=some-other-extensions,myapp
```

You might need to manually run the script `<INSTANCE_DIR>/bin/install-app.sh` if your component is a Desktop plug-in. Or you can choose to add this step to [Zowe component Configure lifecycle stage](lifecycling-with-zwesvstc.md#configure).

When the Zowe instance is launched by running `<INSTANCE_DIR>/bin/zowe-start.sh`, it will read manifest `commands` instructions and call the `/usr/lpp/myvendor/myapp/zowe-ext/bin/start.sh` script. The started task will create an address space under `ZWESVSTC` for the vendor component.  When the Zowe instance is stopped, the address space is terminated.
