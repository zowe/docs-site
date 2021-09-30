# Install, upgrade, and configure Zowe server component

Learn how to install, upgrade, and configure the Zowe server components or extensions manually or by using the following scripts: 
* `zowe-install-component.sh`
* `zowe-upgrade-component.sh` (optional)
* `zowe-configure-component.sh`. 

**Note:** The `zowe-upgrade-component.sh` script is currently an alpha release feature. As such, this script could present compatibility issues between the upgraded components and other Zowe components.
 
## Install with `zowe-install-component.sh` (Technical Preview)

<Badge text="Technical Preview"/>

**Notes:** 
* This section is for technical preview. As such, we welcome  feedback. Content in this section may be changed or improved in the future.

* This feature is added with Zowe v1.19.0 release.

From Zowe v1.19.0, Zowe ships a `bin/zowe-install-component.sh` tool to help you install any Zowe server component (extension). Zowe core components are also installed with this utility. In order to be compatible with the utility, we recommend components follow [Zowe server component package format standard](packaging-zos-extensions.md#zowe-server-component-package-format).

Execute the utility from z/OS USS. Use the following command line parameters:

- **`-o|--component-file`**

  (Required) Defines the path to the component package or directory.
- **`-c|--component-name`**

  Specifies the name of the component. This parameter is optional if `NODE_HOME` is defined and the component has the manifest file, otherwise, this parameter is required.
- **`-i|--instance-dir`**

  (Optional) Defines the path to the Zowe instance directory. When a value is defined, the script also executes `bin/zowe-configure-component.sh` following installation.

- **`-d|--target-dir`**

  (Optional) Defines the path to the installation target directory. For native components, the default value is `${ZOWE_ROOT_DIR}/components`. For non-native components, the script checks the value of the `ZWE_EXTENSION_DIR` variable. If the value is also empty, the script falls back to the default target directory `/global/zowe/extensions`.

- **`-e|--auto-encoding`**

  (Optional) Defines whether to automatically tag the encoding of the files that are shipped with the component. The default value is `auto`, which indicates that the script determines whether the automatic tagging is needed or not.
  
  **Note:** The automatic tagging process is opinionated about which file extensions should be in which encoding. If this does not fit in your needs, a `pax` format is recommended to include the tagging information into your package. This option is only applicable for z/OS. The following list presents the allowed values:
  * `yes`
  
    This option automatically tag the encoding of the files.
  * `no`
  
    Do not automatically tag encoding of the files.

  * `auto`
  
    Tag only when manifest is in `ISO8859-1` encoding.

 - **`-k|--core`**

   This is an optional boolean. This parameter defines whether this component is bundled into the Zowe package as a core component.
- **`-l|--logs-dir`**

  (Optional) Specifies the path to the log directory.
- **`-f|--log-file`**

  (Optional) Instead of writing an independent log to a directory, you have the option to append log to this log file specified.

**Examples:**

The following command installs the `my-zowe-component-1.2.3.pax` into `/global/zowe/extensions`.

```
$ zowe-install-component.sh -o /path/to/my-zowe-component-1.2.3.pax
```

The following command installs `my-zowe-component-1.2.3.zip` into `/var/zowe/my-extensions` and also configures this component for the Zowe instance located at `/var/zowe/instance`. The installation and configuration logs writes to `/var/zowe/instance/logs`.

```
$ zowe-install-component.sh \
    -o /path/to/my-zowe-component-1.2.3.zip \
    -d /var/zowe/my-extensions \
    -i /var/zowe/instance \
    -l /var/zowe/instance/logs
```

## Upgrade with `zowe-upgrade-component.sh` (Technical Preview)

<Badge text="Technical Preview"/>

**Notes:** 
* This section is for technical preview. As such, we welcome any feedback. Content in this section may be changed or improved in the future.

* _This feature is to be added with the Zowe v1.22.0 release._

From Zowe v1.22.0, Zowe ships a `bin/zowe-upgrade-component.sh` utility to help you upgrade any Zowe core component to the latest version available into the Zowe Artifactory.  
By default, Zowe core components are not updated with this utility. To enable the upgrade functionality, set the optional boolean value `ZOWE_COMPONENTS_UPGRADE` to `true` as part of the installation configuration. Once the user has enabled this parameter, the `zowe-install.sh` 
install script calls the `zowe-upgrade-component.sh` script.
The Zowe components get updated and then installed and configured using the `zowe-install-component.sh` and `zowe-configure-component.sh` scripts.
In order to be compatible with this utility, we recommend components follow the [Zowe server component package format standard](packaging-zos-extensions.md#zowe-server-component-package-format).

The Zowe upgrade component utility can be executed from z/OS USS. You can use the following command line parameters:

- **`-o|--component-file`**

  (Required) Defines the path to the component package or directory.

- **`-l|--logs-dir`**

  (Optional) Specifies the path to the log directory.
- **`-f|--log-file`**

  (Optional) Instead of writing independent log to a directory, you have option to append log to this log file specified.

**Examples:**

```
$ zowe-upgrade-component.sh -o /path/to/my-zowe-component-1.2.3.pax
```

This command upgrades `my-zowe-component-1.2.3.zip` to its latest version. The upgrade logs write to `/var/zowe/instance/logs`.

```
$ zowe-upgrade-component.sh \
    -o /path/to/my-zowe-component-1.2.3.zip \
    -l /var/zowe/instance/logs
```

## Configure with `zowe-configure-component.sh` (Technical Preview)

<Badge text="Technical Preview"/>

_Note: This section is for technical preview and we are happy to hear any feedback. Content in this section may be changed or improved in the future._

**Note:** This feature is made available with the Zowe v1.19.0 release.

From Zowe v1.19.0, Zowe ships a `bin/zowe-configure-components.sh` utility to help you configure an installed Zowe server component (extension) for a Zowe instance. Zowe core components are also configured with this utility. In order to be compatible with the utility, we recommend components follow [Zowe server component package format standard](packaging-zos-extensions.md#zowe-server-component-package-format).

You may not need to run this script directly if you have supplied `-i|--instance-dir` when you run `zowe-install-component.sh`.

Execute this utility from z/OS USS. Use the following command line parameters:

- **`-c|--component-name`**

  (Required) Specifies the name of the component.

- **`-i|--instance-dir`**

  (Required) Defines the path to the Zowe instance directory.

- **`-d|--target-dir`**

  (Optional) Defines the directory where the component is installed. For native components, the default value is `${ZOWE_ROOT_DIR}/components`. For non-native components, the script will check `ZWE_EXTENSION_DIR` if possible. Otherwise, it will fall back to the default target directory `/global/zowe/extensions`.

- **`-k|--core`**

  This is an optional Boolean. It defines whether this component is bundled into the Zowe package as a core component.

- **`-l|--logs-dir`**

  (Optional) Defines the path to the log directory.

- **`-f|--log-file`**

  (Optional) Instead of writing independent log to a directory, you have option to append log to this log file specified.

**Examples:**

The following command configures `my-zowe-component` installed in `/global/zowe/extensions` for the Zowe instance located at `/var/zowe/instance`.

```
$ zowe-configure-component.sh \
    -c my-zowe-component \
    -i /var/zowe/instance
```

The following command configures `my-zowe-component` installed in `/var/zowe/my-extensions` for the Zowe instance located at `/var/zowe/instance`. The configuration logs write to `/var/zowe/instance/logs`.

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

**Note:** You can also use the full USS path to the component `bin` directory which contains lifecycle scripts, but this behavior will be deprecated in next major release.

### Zowe extensions

We recommend that you install all Zowe extension runtime programs into a single location. The suggested default extension directory is `/global/zowe/extensions`. Each extension should be represented with the extension name in this directory, and use either a directory or a symbolic link. This location should be defined as `ZWE_EXTENSION_DIR` in `<INSTANCE_DIR>/instance.env`.

The Zowe launch script reads `EXTERNAL_COMPONENTS` defined in `<INSTANCE_DIR>/instance.env` to determine whether to start an extension. The value of `EXTERNAL_COMPONENTS` is a comma-separated list of extension names.

**Note:** You can also use the full USS path to the extension `bin` directory which contains lifecycle scripts. This behavior, however, is to be deprecated in next major release.

**Example:**

The vendor MYVENDOR has a product named MYAPP that installs into `/usr/lpp/myvendor/myapp`. There is one Zowe extension shipped within the product in the directory `/usr/lpp/myvendor/myapp/zowe-ext`. This subdirectory is a Zowe extension so that the product can be started and stopped with Zowe and run as an address space under the `ZWESVSTC` started task in the Zowe USS shell.

The directory `/usr/lpp/myvendor/myapp/zowe-ext` should include a `manifest.yaml` file to describe the extension. The script `/usr/lpp/myvendor/myapp/zowe-ext/bin/validate.sh` checks that the environment is configured correctly and the script `/usr/lpp/myvendor/myapp/zowe-ext/bin/start.sh` starts the vendor application. The `/usr/lpp/myvendor/myapp/zowe-ext/manifest.yaml` should look like this:

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

Also, `myapp` is added into the value of the `EXTERNAL_COMPONENTS` variable in `<INSTANCE_DIR>/instance.env`.

```
ZWE_EXTENSION_DIR=/global/zowe/extension
EXTERNAL_COMPONENTS=some-other-extensions,myapp
```

You might need to manually run the script `<INSTANCE_DIR>/bin/install-app.sh` if your component is a Desktop plug-in. Alternatively, you can choose to add this step to [Zowe component Configure lifecycle stage](lifecycling-with-zwesvstc.md#configure).

When the Zowe instance is launched by running `<INSTANCE_DIR>/bin/zowe-start.sh`, it will read manifest `commands` instructions and call the `/usr/lpp/myvendor/myapp/zowe-ext/bin/start.sh` script. The started task will create an address space under `ZWESVSTC` for the vendor component.  When the Zowe instance is stopped, the address space is terminated.


## Verify with `zowe-verify-component.sh` (Technical Preview)

<Badge text="Technical Preview"/>

_Note: This section is for technical preview and we are happy to hear any feedback. Content in this section may be changed or improved in the future._

_Note: This feature is added with Zowe v1.22.0 release._

From Zowe v1.22.0, Zowe ships a `bin/zowe-verify-component.sh` tool to help you verify an installed Zowe server component (extension) for a Zowe instance. In order to be compatible with the tool, we recommend components follow [Zowe server component package format standard](packaging-zos-extensions.md#zowe-server-component-package-format) and define [Zowe component manifest](packaging-zos-extensions.md#zowe-component-manifest).

The `zowe-verify-component.sh` script checks and verifies whether a specified component is up and running. You can use it to verify both core and external Zowe components.

_IMPORTANT: To successfully verify whether a component service is registered on Zowe API Mediation Layer, this utility script requires authentication with a valid system user who has proper permission granted. For more information on the required user permission, please check [Protection of Service Information](../extend/extend-apiml/service-information.md#protection-of-service-information)._

The tool can be executed from z/OS USS, and it takes these command line parameters:

- **`-c|--component-id`**: (Required) Specifies the name of the Zowe component that you want to verify.
- **`-i|--instance-dir`**: (Required) Specifies the path to the Zowe instance directory.
- **`-u|--username`**: (Required) Username of a specified user for the current system.
- **`-p|--password`**: (Required) Password of the specified user.

**Examples**

This command will verify the `external-zowe-component` installed in `/global/zowe/extensions` for the Zowe instance installed at `/var/zowe/instance`.

```
$ zowe-verify-component.sh \
    -c external-zowe-component \
    -i /var/zowe/instance \
    -u user \
    -p pass
```

You can also run the following commands to get the same results but instead of passing in values for the -u and -p parameters, you can use the export command.

```
$ export VERIFY_USER_NAME=user
$ export VERIFY_PASSWORD=pass
$ zowe-verify-component.sh \
    -c external-zowe-component \
    -i /var/zowe/instance
```
