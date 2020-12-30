# Install and Configure Zowe Server Component

## Install with zowe-install-component.sh <Badge text="Technical Preview"/>

_Note: this section is for technical preview. Content in this section may be changed or improved in the future._

_Note: this feature is added with Zowe v1.19.0 release._

From v1.19.0, Zowe ships a `bin/zowe-install-components.sh` tool to help you install any Zowe server component (extension). Zowe core components are also installed with this tool. To make the tool works better, the component to be installed is suggested to follow [Zowe server component package format standard](packaging-zos-extensions.md#zowe-server-component-package-format).

The tool can be executed from z/OS USS, and it takes these command line parameters:

- **`-o|--component-file`**: This is required. It's the path to the component package or directory.
- **`-c|--component-name`**: This is optional. It's the name of the component. If `NODE_HOME` is defined, and the component has manifest file, this value is optional. Otherwise it's required.
- **`-i|--instance-dir`**: This is optional. It's the path to Zowe instance directory. If this has a value, the script will also execute `bin/zowe-configure-component.sh` once it's installed.
- **`-d|--target-dir`**: This is optional. It's the path to installation target directory. For native component, default value is `${ZOWE_ROOT_DIR}/components`. For non-native component, the script will check `ZWE_EXTENSION_DIR` variable value. If it's also empty, the script will fall back to default target directory, which is `/global/zowe/extensions`.
- **`-e|--auto-encoding`**: This is optional. It defines whether we should automatically tag the encoding of the files shipped with the component. Default value is `auto`, which means the script will determine if the automatic tagging is needed or not. This option is only applicable for z/OS. Allowed values are:
  * `yes`: automatically tag the encoding of the files,
  * `no`: do not automatically tag encoding of the files,
  * `auto`: only tag when manifest is in `ISO8859-1` encoding.
- **`-n|--native`**: This is an optional boolean. It defines whether this component is bundled into Zowe package as core component.
- **`-l|--logs-dir`**: This is optional. It's the path to logs directory.
- **`-f|--log-file`**: This is optional. Instead of writing independent log to a directory, you have option to append log to this log file specified.

**Examples**

This command will install `my-zowe-component-1.2.3.pax` into `/global/zowe/extensions`.

```
$ zowe-install-component.sh -o /path/to/my-zowe-component-1.2.3.pax
```

This command will install `my-zowe-component-1.2.3.zip` into `/var/zowe/my-extensions` and also configure this component for Zowe instance located at `/var/zowe/instance`. The install/configure logs will be written into `/var/zowe/instance/logs`.

```
$ zowe-install-component.sh \
    -o /path/to/my-zowe-component-1.2.3.zip \
    -d /var/zowe/my-extensions \
    -i /var/zowe/instance \
    -l /var/zowe/instance/logs
```

## Configure with zowe-configure-component.sh <Badge text="Technical Preview"/>

_Note: this section is for technical preview. Content in this section may be changed or improved in the future._

_Note: this feature is added with Zowe v1.19.0 release._

From v1.19.0, Zowe ships a `bin/zowe-configure-components.sh` tool to help you configure an installed Zowe server component (extension) for a Zowe instance. Zowe core components are also configured with this tool. To make the tool works better, the component to be configured is suggested to follow [Zowe server component package format standard](packaging-zos-extensions.md#zowe-server-component-package-format).

You may not need to run this script directly if you have supplied `-i|--instance-dir` when you run `zowe-install-component.sh`.

The tool can be executed from z/OS USS, and it takes these command line parameters:

- **`-c|--component-name`**: This is required. It's the name of the component.
- **`-i|--instance-dir`**: This is required. It's the path to Zowe instance directory.
- **`-d|--target-dir`**: This is optional. It's the directory where the component is installed. For native component, default value is `${ZOWE_ROOT_DIR}/components`. For non-native component, the script will check `ZWE_EXTENSION_DIR` if possible. Otherwise will fall back to default target directory `/global/zowe/extensions`.
- **`-n|--native`**: This is an optional boolean. It defines whether this component is bundled into Zowe package as core component.
- **`-l|--logs-dir`**: This is optional. It's the path to logs directory.
- **`-f|--log-file`**: This is optional. Instead of writing independent log to a directory, you have option to append log to this log file specified.

**Examples**

This command will configure `my-zowe-component` installed in `/global/zowe/extensions` for Zowe instance located at `/var/zowe/instance`.

```
$ zowe-configure-component.sh \
    -c my-zowe-component \
    -i /var/zowe/instance
```

This command will configure `my-zowe-component` installed in `/var/zowe/my-extensions` for Zowe instance located at `/var/zowe/instance`. The configure logs will be written into `/var/zowe/instance/logs`.

```
$ zowe-configure-component.sh \
    -c my-zowe-component \
    -i /var/zowe/instance \
    -d /var/zowe/my-extensions \
    -l /var/zowe/instance/logs
```

## Install and configure manually

### Zowe core components

The Zowe runtime directory delivers its core components in `<RUNTIME_DIR>/components/` directory. A typical components directory looks like this:

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

Zowe core component can be configured to be started or not with `LAUNCH_COMPONENTS` variable defined in `<INSTANCE_DIR>/instance.env`. The value of this variable can be core component name list separated with comma.

_Note: You can also use full USS path to the component `bin` directory which contains lifecycle scripts, but this behavior will be deprecated in next major release._

### Zowe extensions

All Zowe extension runtime program are suggested to be installed into a single location. The suggested default extension directory is `/global/zowe/extensions`. Each extension should be represented with extension name in this directory, either a directory or a symbolic link. This location should be defined as `ZWE_EXTENSION_DIR` in `<INSTANCE_DIR>/instance.env`.

Zowe launch script reads `EXTERNAL_COMPONENTS` defined in `<INSTANCE_DIR>/instance.env` to know if the extension should be started or not. The value of `EXTERNAL_COMPONENTS` should be a comma separated list of extension name.

_Note: You can also use full USS path to the extension `bin` directory which contains lifecycle scripts, but this behavior will be deprecated in next major release._

**Example:**

Vendor MYVENDOR has a product MYAPP that installs into `/usr/lpp/myvendor/myapp`. There is Zowe extension shipped within it in directory `/usr/lpp/myvendor/myapp/zowe-ext`. This sub-directory is a Zowe extension so they want it to be started and stopped with Zowe and run as an address space under the `ZWESVSTC` in the Zowe USS shell.   

`/usr/lpp/myvendor/myapp/zowe-ext` should include a `manifest.yaml` to describe the extension. The script `/usr/lpp/myvendor/myapp/zowe-ext/bin/validate.sh` checks that the environment has been configured correctly and the script `/usr/lpp/myvendor/myapp/zowe-ext/bin/start.sh` starts the vendor application. The `/usr/lpp/myvendor/myapp/zowe-ext/manifest.yaml` should look like this:

```yaml
name: myapp
id: com.myvendor.myapp
title: My Zowe Extension
commands:
  validate: bin/validate.sh
  start: bin/start.sh
```

Since MYAPP is shipped within another product, the installation should create a symbolic link in `ZWE_EXTENSION_DIR` directory.

```
$ ls -l /global/zowe/extensions
total 16
lrwxrwxrwx   1 <USER> <GROUP>       23 Nov 11  2019 myapp -> /usr/lpp/myvendor/myapp/zowe-ext
```

Also `myapp` will be added into the value of `EXTERNAL_COMPONENTS` in `<INSTANCE_DIR>/instance.env`.

```
ZWE_EXTENSION_DIR=/global/zowe/extension
EXTERNAL_COMPONENTS=some-other-extensions,myapp
```

You may need to manually run `<INSTANCE_DIR>/bin/install-app.sh` if your component is a Desktop plugin. Or you can choose to add this step to [Zowe component Configure lifecycle stage](lifecycling-with-zwesvstc.md#configure).

When the Zowe instance is launched by running `<INSTANCE_DIR>/bin/zowe-start.sh`, it will read manifest `commands` instructions, and will call the `/usr/lpp/myvendor/myapp/zowe-ext/bin/start.sh` script and the started task will create an address space under `ZWESVSTC` for the vendor component.  When the Zowe instance is stopped, the address space is terminated.
