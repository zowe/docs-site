# Packaging z/OS Extensions and Zowe Component Lifecycle

## Components vs Extensions

Zowe can be extended in multiple ways. You may extend Zowe with "microservices", which may start a new service within Zowe. Or you can create Desktop plugins to provide UI to end-users.

- **component**: is the most generic way to describe a small part of program to work with Zowe. It can be a microservice, can be a desktop plugin, or even just a shared program be used by other programs. This is also the generic word we use to refer to both Zowe core components and extensions. In most of the cases described below, this terminology doesn't include programs running on client side, like Zowe CLI plugin.
- **extension**: is similar to **component** but excludes Zowe core components. All Zowe extensions are suggested to installed into a shared extension directory.

## Zowe server component package format <Badge text="Technical Preview"/>

_Notes: this section is for technical preview. Content in this section may be changed or improved in the future._

Zowe extensions can be packaged into various formats. You have the choice of packaging your extension into a standalone PAX, ZIP or TAR file, or you can also bundle and ship your Zowe extensions with another product. Zowe core components also follows this format.

A typical extension package, for example, `jobs-api-package-1.0.4.zip` has content of these files:

```
--- manifest.yaml
|-- apiml-static-registration.yaml.template
|-- bin/
    |-- configure.sh
    |-- jobs-api-server-1.0.4-boot.jar
    |-- start.sh
    |-- validate.sh
```

- `manifest.yaml`: Zowe extension manifest file. Detail definition of manifest can be found in [Zowe Component Manifest](#zowe-component-manifest) section.
- `apiml-static-registration.yaml.template`: Supporting file to instruct Zowe launch script how to register this extension service to API Mediation Layer Discovery service. In this case, this file is referred in `manifest.yaml` `apimlServices.static[0].file` field. You may not need this file based on the purpose of the extension.
- `bin/(configure|start|validate).sh`: These are Zowe component/extension lifecycle scripts. You may not need these files based on the purpose of the extension. Detail definition of lifecycle scripts can be found in [Zowe lifecycle](#zowe-runtime-lifecycle) section.

We also suggest to put other files into the package:

- `README.md`: a brief introduction of your extension in Markdown format, like how it should be installed, configured, verified, etc.
- `LICENSE`: full license text file.

If you decide to bundle and ship Zowe extension within another product. You can put the whole folder structure into your product package as subfolders. For example:

```
--- <my-product-root>
|-- <other-folder-and-files>
|-- zowe-extension-A
    |-- manifest.yaml
    |-- bin/
        |-- start.sh
|-- zowe-extension-B
    |-- manifest.yaml
    |-- bin/
        |-- start.sh
```

## Zowe component manifest <Badge text="Technical Preview"/>

_Notes: this section is for technical preview. Content in this section may be changed or improved in the future._

Zowe extensions, and as well as core components, use a manifest file to describe itself. The manifest file defines the name, purpose of the component, and it also provides information how this component should be installed, configured, started, and tested. It can be named as `manifest.yaml`, `manifest.yml` or `manifest.json` and should locate in the root folder of this component. Currently only `YAML` or `JSON` format are supported.

The properties supported by the manifest file are listed here:

- **`name`**: This is required. It defines a short, computer readable name of the component. This component name will be used as folder name your component after it's installed. The allowed characters in the name are alphabets, numbers, hyphen (`-`) and underscore (`_`). For example, `explorer-jes` is a valid extension name.
- **`id`**: This is optional. It defines a long, computer readable identifier of the component. The identifier also matches the component path in Zowe Artifactory. For example, `org.zowe.explorer-jes` is a valid identifier, we can locate the component official releases by looking into `libs-release-local/org/zowe/explorer-jes/` folder of [Zowe Artifactory](https://zowe.jfrog.io/ui/repos/tree/General/libs-release-local%2Forg%2Fzowe%2Fexplorer-jes).
- **`version`**: This is optional but suggested. This is the current version of the component without `v` prefix. For example, `1.0.4` is a valid `version` value.
- **`title`**: This is optional. It defines a short human readable name of this component. This value will also be used as default title for API Catalog tile, or Desktop plugin title. For example, `JES Explorer` is a good `title` for `explorer-jes` component.
- **`description`**: This is optional. It defines a long human readable description of this component. There is not restrictions on what can be put into the field.
- **`license`**: This is optional but suggested. It defines the license code of the component. For example, Zowe core components have `EPL-2.0` value in this field.
- **`build`**: This is optional but strongly suggested. It defines the build information of current package, including git commit hash, etc. When Zowe core components defines manifest file, these fields are left as template variables. The template will be updated when we create a publishable package. It supports 4 sub-fields:
  * **`branch`**: It tells the user which branch this package is built from.
  * **`number`**: You may create multiple packages in same branch. This is the sequential number of the current package.
  * **`commitHash`**: This is the commit hash of the package we can match the exact source code in repository. Zowe core components usually uses `git rev-parse --verify HEAD` to retrieve commit hash.
  * **`timestamp`**: This is the unix timestamp when the package is created.
- **`commands`**: This field is high level of several sub-fields to define actions should be taken when the component is installed, configured, started or tested. All sub-fields are optional and usually should be pointed to a USS command or script.
  * **`install`**: This defines extra steps when installing this component. It will be automatically executed if you install your component with `<RUNTIME_DIR>/bin/zowe-install-component.sh` utility tool.
  * **`configureInstance`**: This defines extra steps when configure the component for a Zowe instance. It will be automatically executed if you configure your component with `<RUNTIME_DIR>/bin/zowe-configure-component.sh` utility tool.
  * **`validate`**: This defines extra validations the component requires other than global validations. It is for runtime purpose, and will be automatically executed every time when Zowe is started.
  * **`configure`**: This defines extra configuration steps before starting the component. It is for runtime purpose, and will be automatically executed every time  when Zowe is started.
  * **`start`**: This tells Zowe launch script how to start the component. It is for runtime purpose, and will be automatically executed every time  when Zowe is started.
- **`apimlServices`**: This section defines how the component will be registered to API Mediation Layer Discovery Service. All sub-fields are optional.
  * **`dynamic`**: Array of objects. This information will tell Zowe and users what services you will register under Discovery service.
    - **`serviceId`**: This defines the service ID registered to Discovery Service.
  * **`static`**: Array of objects. If the component is statically registered under Discovery service, this tells Zowe where to find these static definitions. This information is for Zowe runtime. When Zowe is started, the launch script will check this field and put the parse static definition file into the folder defined as `STATIC_DEF_CONFIG_DIR` in Zowe instance.
    - **`file`**: Path to the static definition file. This file is supposed to be a template. An example can be found in [Jobs API manifest.yaml](https://github.com/zowe/jobs/blob/master/jobs-zowe-server-package/src/main/resources/manifest.yaml).
- **`desktopPlugins`**: Array of objects. This section defines how the component will be registered to Desktop Plugin. All sub-fields are optional.
  * **`path`**: This points to the directory where Desktop `pluginDefinition.json` file is located. If you use `<RUNTIME_DIR>/bin/zowe-configure-component.sh` utility tool to configure this component for an instance, the script will execute `<INSTANCE_DIR>/bin/install-app.sh` with this path automatically.
- **`desktopIframePlugins`**: Array of objects. It tells Zowe this component has Desktop Iframe Plugins and the Zowe launch script will execute `<RUNTIME_DIR>/bin/utils/zowe-install-iframe-plugin.sh` for this plugin when Zowe is started. Please note, this section is for backward compatible purpose, it will be deprecated in next major release.
  * **`id`**: This is optional, default value is `id` in higher level.
  * **`title`**: This is optional, default value is `title` in higher level.
  * **`url`**: this is the full URL or path to your iframe plugin entry point. If it's a path, a prefix of `https://${ZOWE_EXPLORER_HOST}:${GATEWAY_PORT}` will be automatically added.
  * **`icon`**: this is the desktop plugin icon.

_Please note: all paths of directories or files mentioned above should be relative paths to the root directory where manifest located._

## Install and configure Zowe component

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

Zowe core component can be configured to be started or not with `LAUNCH_COMPONENTS` variable defined in `<INSTANCE_DIR>/instance.env`. The value of this variable can be core component name list separated with comma. You can also use full USS path to the component `bin` folder which contains lifecycle scripts, but this behavior will be deprecated in next major release.

### Zowe extensions

All Zowe extension runtime program are suggested to be installed into a single location. The suggested default extension directory is `/global/zowe/extensions`. Each extension should be represented with extension name in this folder, either a directory or a symbolic link. This location should be defined as `ZWE_EXTENSION_DIR` in `<INSTANCE_DIR>/instance.env`.

Zowe launch script reads `EXTERNAL_COMPONENTS` defined in `<INSTANCE_DIR>/instance.env` to know if the extension should be started or not. The value of `EXTERNAL_COMPONENTS` should be a comma separated list of extension name. You can also use full USS path to the extension `bin` folder which contains lifecycle scripts, but this behavior will be deprecated in next major release.

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

Since MYAPP is shipped within another product, the installation will create a symbolic link in `ZWE_EXTENSION_DIR` folder.

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

When the Zowe instance is launched by running `<INSTANCE_DIR>/bin/zowe-start.sh`, it will read manifest `commands` instructions, and will call the `/usr/lpp/myvendor/myapp/zowe-ext/bin/start.sh` script and the started task will create an address space under `ZWESVSTC` for the vendor component.  When the Zowe instance is stopped, the address space is terminated.

## Zowe runtime lifecycle

This topic describes the runtime lifecycle of Zowe core components and how an offering that provides a Zowe extension can set up runtime lifecycle for their component.  

The Zowe UNIX System Services (USS) components are run as part of the started task `ZWESVSTC`. For more information, see [Starting Zowe from a USS shell](../user-guide/configure-zowe-server.md#option-1-starting-zowe-from-a-uss-shell). There are two key USS directories that play different roles when launching Zowe.  

- The Zowe runtime directory `<RUNTIME_DIR>` that contains the executable files is an immutable set of directories and files that are replaced each time a new release is applied.  The initial release or an upgrade is installed either with UNIX shell scripts (see [Installing Zowe runtime from a convenience build](../user-guide/install-zowe-zos-convenience-build.md)), or SMP/E where the runtime directory is laid down initially as FMID AZWE001 and then upgraded through rollup PTF builds (see [Installing Zowe SMP/E](../user-guide/install-zowe-smpe.md)).  The Zowe runtime directory is not altered during operation of Zowe, so no data is written to it and no customization is performed on its contents.  

- The Zowe instance directory `<INSTANCE_DIR>` contains information that is specific to a launch of Zowe.  It contains configuration settings that determine how an instance of the Zowe server is started, such as ports that are used or paths to dependent Java and Node.js runtimes.  The instance directory also contains log directory where different 'microservices' write trace data for diagnosis, as well as a workspace and shell scripts to start and stop Zowe.  More than one Zowe instance directory can be created to allow multiple launches of a Zowe runtime, each one isolated from each other and starting Zowe depending on how the instance directory has been configured. For more information, see [Creating and configuring the Zowe instance directory](../user-guide/configure-instance-directory.md).

To start Zowe, the script `<INSTANCE_DIR>/bin/zowe-start.sh` is run from a USS shell.  This uses a REXX program to launch the started task `ZWESVSTC`, passing the instance directory path as a parameter.  It is the equivalent of using the TSO command `/S ZWESVSTC,INSTANCE='<INSTANCE_DIR>',JOBNAME='<JOBNAME>'`.  The `ZWESVSTC` PROCLIB uses the program that creates a USS process and starts the script `<INSTANCE_DIR>/bin/internal/run-zowe.sh`.  By using `BPXATSL` to start the USS process, all of the address spaces started under this shell are managed by SDSF.  If the `zowe-start.sh` run `run-zowe.sh` directly, the USS processes will not run as a started task and will run under the user ID of whoever ran the `run-zowe.sh` script rather than the Zowe user ID of `ZWESVUSR`, likely leading to permission errors accessing the contents of the `<RUNTIME_DIR>` as well as the Zowe certificate. For these reasons, the `zowe-start.sh` script launches Zowe's USS process beneath the started task `ZWESVSTC`.  

When `run-zowe.sh` is run in the USS shell that `BPXBATSL` creates, it executes the file `<INSTANCE_DIR>/instance.env`.  This file sets a number of shell variables, such as `ROOT_DIR` that points to the directory with the `<RUNTIME_DIR>`, variables for all of the ports used by the Zowe components, and other configuration data. For more information, see [Reviewing the instance.env file](../user-guide/configure-instance-directory.md#reviewing-the-instance.env-file).

**Note:**

The scripts of core Zowe components and some extensions use the helper library `<RUNTIME_DIR>/scripts/utils`.  Currently, these are not publicly supported. Future releases of Zowe might provide these as supported system programming interfaces (SPIs) and include their usage in the Zowe documentation.  

## Zowe component runtime lifecycle

Each Zowe component will be installed with its own USS directory, which contains its executable files. Within each component's USS directory, a `bin` directory is suggested to contain scripts that are used for the lifecycle of the component.  When Zowe is started, it identifies the components that are configured to launch and then execute the scripts of those components in the cycle of [validate](#validate), [configure](#configure), and [start](#start).  All components are validated, then all are configured, and finally all are started. This technique is used as follows: 
- Used for the base Zowe components that are included with the core Zowe runtime.
- Applies to extensions to allow vendor offerings to be able to have the lifecycle of their 'microservices' within the Zowe USS shell and be included as address spaces under the `ZWESVSTC` started task.

### Validate

Each component is optional to instruct Zowe runtime to validate itself with a USS command defined in manifest `commands.validate`. If this is not defined, for backward compatible purpose, a call to its `/bin/validate.sh` script will be executed if it exists.

If present, the `validate` script performs tasks such as:
- Check that the shell has the correct prerequisites.
- Validate that ports are available.
- Perform other steps to ensure that the component is able to be launched successfully.

During execution of the `validate` script, if an error is detected, then a component should echo a message that contains information to assist a user diagnosing the problem.

### Configure

Each component is optional to instruct Zowe runtime to configure itself with a USS command defined in manifest `commands.configure`. If this is not defined, for backward compatible purpose, a call to its `/bin/configure.sh` script will be executed if it exists.

If the component has manifest defined, some configure actions will be performed automatically based on manifest definition:

- `apimlServices.static`: Zowe runtime will automatically parse and add your static definition to API Mediation Layer.
- `desktopIframePlugins`: Zowe runtime will automatically register your Desktop iframe plugin to Zlux.

For backward compatible purpose, you can choose to configure component by yourself with `/bin/configure.sh`. An example configuration step is if a component wants to install applications into the Zowe desktop as iframes, or add API endpoints statically into the API Mediation Layer.  Because a component's `configure.sh` script is run inside the USS shell that the `instance.env` has initialized, it will have all of the shell variables for prerequisites set, so the configure step can be used to query these in order to prepare the component ready for launch.  

### Start

Each component is optional to instruct Zowe runtime to start itself with a USS command defined in manifest `commands.start`. If this is not defined, for backward compatible purpose, a call to its `/bin/start.sh` script will be executed if it exists. If your component is not supposed to be started by itself, for example, the component is a shared library, you can skip this instruction.

It is up to each component to start itself based on how it has been written.  We recommend that any variables that someone who configure Zowe may need to vary, such as timeout values, port numbers, or similar, are specified as variables in the `instance.env` file and then referenced as shell variables in the `start.sh` script to be passed into the component runtime.

## Sample extensions

### Sample Zowe API extension

The repository [https://github.com/zowe/sample-node-api](https://github.com/zowe/sample-node-api) contains a sample Zowe extension with a node server providing sample APIs for looking at cars in a dealership. For more information, see [sample-node-api](https://github.com/zowe/sample-node-api/blob/master/README.md).  

The [configure.sh](https://github.com/zowe/sample-node-api/blob/master/bin/configure.sh) script statically registers the API into the API Mediation Layer as well as a tile that includes the Swagger definitions into the API Catalog.

### Sample Zowe Desktop and API Catalog extension

The repository [https://github.com/zowe/sample-trial-app](https://github.com/zowe/sample-trial-app) contains a sample Zowe extension with a node server providing a web page that gives a user interface to the APIs included with the API sample above.  

The [configure.sh](https://github.com/zowe/sample-trial-app/blob/master/bin/configure.sh) script installs a web page into the Zowe Desktop by using the utility script `<RUNTIME_DIR>/bin/utils/zowe-install-iframe-plugin.sh`.  The [configure.sh](https://github.com/zowe/sample-trial-app/blob/master/bin/configure.sh) script also installs a tile into the API Mediation Layer's API Catalog.

