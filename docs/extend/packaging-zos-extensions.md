# Packaging z/OS Extensions

Zowe can be extended in multiple ways. You may extend Zowe with "microservices", which may start a new service within Zowe. Or you can create App Framework plugins to provide UI to end-users.

- **component**: is the most generic way to describe a program which can work within Zowe. It can be a microservice, can be an App Framework plugin, or even just a shared program be used by other Zowe components. This is also the generic word we refer to both Zowe core components and extensions. In most of the cases described below, this terminology doesn't include programs running on client side, like Zowe CLI plugin or Zowe Explorer (VSCode extension).
- **extension**: is similar to **component** but excludes Zowe core components. All Zowe extensions are suggested to installed into a shared extension directory.

## Zowe server component package format

Zowe components (extensions) can be packaged into various formats. You have the choice of choosing from a standalone PAX, ZIP or TAR file, or you can also choose to bundle and ship your Zowe extension(s) within another product.

A typical component package, for example, `jobs-api-package-1.0.4.zip` has content of these files and directories:

```
+-- manifest.yaml
|-- apiml-static-registration.yaml.template
|-- bin/
    |-- configure.sh
    |-- jobs-api-server-1.0.4-boot.jar
    |-- start.sh
    |-- validate.sh
```

- `manifest.yaml`: Zowe component manifest file. Detail definition of manifest can be found in [Zowe Component Manifest](#zowe-component-manifest) section.
- `apiml-static-registration.yaml.template`: Supporting file to instruct Zowe launch script how to register this extension service to API Mediation Layer Discovery service. In this case, this file is referred in `manifest.yaml` `apimlServices.static[0].file` field. This file is optional based on the function of the component and the file name can also be changed and customized in manifest file.
- `bin/(configure|start|validate).sh`: These are Zowe component lifecycle scripts. You may not need these files based on the function of the component. Detail definition of lifecycle scripts can be found in [Zowe lifecycle](#zowe-runtime-lifecycle) section.

We also suggest to put other files into the package:

- `README.md`: a brief introduction of your extension in Markdown format, like how it should be installed, configured, verified, etc.
- `LICENSE`: full license text file.

If you decide to bundle and ship Zowe extension(s) within another product. You can put the whole directory structure above into your product package as sub-directories. For example:

```
+-- <my-product-root>
    |-- <other-directories-and-files>
    |-- zowe-extension-A
        |-- manifest.yaml
        |-- bin/
            |-- start.sh
    |-- zowe-extension-B
        |-- manifest.yaml
        |-- bin/
            |-- start.sh
```

## Zowe component manifest

_Note: this feature is added with Zowe v1.19.0 release._

Zowe extensions, and as well as core components, can use a manifest file to describe itself. The manifest file defines the name, purpose of the component, and it also provides information how this component should be installed, configured, started, and tested. It can be named as `manifest.yaml`, `manifest.yml` or `manifest.json` and should locate in the root directory of this component. Currently only `YAML` or `JSON` format are supported.

The properties supported by the manifest file are listed here:

- **`name`**: This is required. It defines a short, computer readable name of the component. This component name will be used as directory name your component after it's installed. The allowed characters in the name are alphabets, numbers, hyphen (`-`) and underscore (`_`). For example, `explorer-jes` is a valid extension name.
- **`id`**: This is optional. It defines a long, computer readable identifier of the component. If the component is hosted as one of [Open Mainframe Project](https://www.openmainframeproject.org/), the identifier also matches the component path in Zowe Artifactory. For example, `org.zowe.explorer-jes` is a valid identifier, we can locate the component official releases by looking into `libs-release-local/org/zowe/explorer-jes/` directory of [Zowe Artifactory](https://zowe.jfrog.io/ui/repos/tree/General/libs-release-local%2Forg%2Fzowe%2Fexplorer-jes).
- **`version`**: This is optional but suggested. This is the current version of the component without `v` prefix. For example, `1.0.4` is a valid `version` value.
- **`title`**: This is optional. It defines a short human readable name of this component. This value will also be used as default title for API Catalog tile, or App Framework plugin title. For example, `JES Explorer` is a good `title` for `explorer-jes` component.
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
  * **`static`**: Array of objects. If the component is statically registered under Discovery service, this tells Zowe where to find these static definitions. This information is for Zowe runtime. When Zowe is started, the launch script will check this field and put the parse static definition file into the directory defined as `STATIC_DEF_CONFIG_DIR` in Zowe instance.
    - **`file`**: Path to the static definition file. This file is supposed to be a template.
- **`appfwPlugins`**: Array of objects. This section defines how the component will be registered to App Framework Plugin. All sub-fields are optional.
  * **`path`**: This points to the directory where App Framework `pluginDefinition.json` file is located. If you use `<RUNTIME_DIR>/bin/zowe-configure-component.sh` utility tool to configure this component for an instance, the script will execute `<INSTANCE_DIR>/bin/install-app.sh` with this path automatically.

_Please note: all paths of directories or files mentioned above should be relative paths to the root directory where manifest located._

## Sample Manifests

There are many examples you may find across Zowe github repositories. Here are few of them:

- [API Catalog manifest.yaml](https://github.com/zowe/api-layer/blob/master/api-catalog-package/src/main/resources/manifest.yaml)
- [Jobs API manifest.yaml](https://github.com/zowe/jobs/blob/master/jobs-zowe-server-package/src/main/resources/manifest.yaml)
- [Sample Node API and API Catalog extension manifest.yaml](https://github.com/zowe/sample-node-api/blob/master/manifest.yaml)
- [Sample Zowe App Framework extension manifest.yaml](https://github.com/zowe/sample-trial-app/blob/master/manifest.yaml)
