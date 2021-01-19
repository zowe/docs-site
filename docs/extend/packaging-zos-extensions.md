# Packaging z/OS extensions

You can extend Zowe in multiple ways. You may extend Zowe with "microservices", which may start a new service within Zowe. You can also create Zowe App Framework plug-ins to provide UI to users.

Before you start, review the following terms first. 

- **component**: is the most generic way to describe a program which can work within Zowe. It can be a microservice, a Zowe App Framework plug-in, or even just a shared program to be used by other Zowe components. This is also the generic word when referring to both Zowe core components and extensions. In most of the cases described in this topic, this terminology doesn't include programs running on the client side, like Zowe CLI plug-in or Zowe Explorer (VSCode extension).
- **extension**: is similar to **component** but excludes Zowe core components. It is recommended that you install all Zowe extensions into a shared extension directory.

## Zowe server component package format

You can package Zowe components (extensions) into various formats. You can package them as a stand-alone PAX, ZIP, or TAR file. You can also bundle and ship your Zowe extension(s) within another product.

A typical component package, for example, `jobs-api-package-1.0.4.zip`, consists of these files and directories:

```
+-- manifest.yaml
|-- apiml-static-registration.yaml.template
|-- bin/
    |-- configure.sh
    |-- jobs-api-server-1.0.4-boot.jar
    |-- start.sh
    |-- validate.sh
```

where,

- `manifest.yaml`: This is the Zowe component manifest file. You can find detailed definition of manifest in [Zowe Component Manifest](#zowe-component-manifest).
- `apiml-static-registration.yaml.template`: This is a supporting file that instructs the Zowe launch script how to register this extension service to the API Mediation Layer Discovery service. In this case, this file is referred in the `manifest.yaml` `apimlServices.static[0].file` field. This file is optional depending on the function of the component and you can change and customize the file name in the manifest file.
- `bin/(configure|start|validate).sh`: These are Zowe component lifecycle scripts. You may not need these files depending on the function of the component. You can find detailed definition of lifecycle scripts in [Zowe lifecycle](#zowe-runtime-lifecycle).

It is also suggested that you put the following files into the package:

- `README.md`: This file is a brief introduction to your extension in Markdown format, including how it should be installed, configured, verified, and so on.
- `LICENSE`: This is the full license text file.

If you decide to bundle and ship Zowe extensions within another product, you can put the whole directory structure above into your product package as subdirectories. Take the following structure as an example.

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

Zowe extensions, as well as core components, can use a manifest file to describe itself. The manifest file defines the name and purpose of the component. It also provides information about how this component should be installed, configured, started, and tested. It can be named as `manifest.yaml`, `manifest.yml`, or `manifest.json` and should locate in the root directory of the component. Currently, only `YAML` or `JSON` format is supported.

The manifest file contains the following properties:

- **`name`**: (Required) Defines a short, computer-readable name of the component. This component name will be used as directory name after it is installed. The allowed characters in the name are alphabets, numbers, hyphen (`-`) and underscore (`_`). For example, `explorer-jes` is a valid extension name.
- **`id`**: (Optional) Defines a long, computer-readable identifier of the component. If the component is hosted as one of the projects in [Open Mainframe Project](https://www.openmainframeproject.org/), the identifier also matches the component path in the Zowe Artifactory. For example, `org.zowe.explorer-jes` is a valid identifier. You can locate the component's official releases by looking into the `libs-release-local/org/zowe/explorer-jes/` directory in the [Zowe Artifactory](https://zowe.jfrog.io/ui/repos/tree/General/libs-release-local%2Forg%2Fzowe%2Fexplorer-jes).
- **`version`**: (Optional but recommended) This is the current version of the component without the prefix of `v`. For example, `1.0.4` is a valid `version` value.
- **`title`**: (Optional) Defines a short human-readable name for this component. This value will also be used as the default title for API Catalog tile, or App Framework plug-in title. For example, `JES Explorer` is a valid `title` for the `explorer-jes` component.
- **`description`**: (Optional) Defines a long human-readable description of this component. There is no restriction on what you can put in the field.
- **`license`**: (Optional but recommended) Defines the license code of the component. For example, Zowe core components have `EPL-2.0` value in this field.
- **`build`**: (Optional but strongly recommended) Defines the build information of the current package, including git commit hash, and so on. When Zowe core components define manifest file, these fields are left as template variables. The template will be updated when a publishable package is created. It supports the following subfields:
  * **`branch`**: It tells the user which branch this package is built from.
  * **`number`**: You may create multiple packages in the same branch. This is the sequential number of the current package.
  * **`commitHash`**: This is the commit hash of the package that can be used to match the exact source code in the repository. Zowe core components usually use `git rev-parse --verify HEAD` to retrieve the commit hash.
  * **`timestamp`**: This is the UNIX timestamp when the package is created.
- **`commands`**: This defines actions that should be taken when the component is installed, configured, started, or tested. You must issue this command with one or more subfields as listed below. For example, `commands.install`. All subfields are optional and usually should point to a USS command or script.
  * **`install`**: This defines extra steps when installing this component. It will be automatically executed if you install your component with the `<RUNTIME_DIR>/bin/zowe-install-component.sh` utility tool.
  * **`configureInstance`**: This defines extra steps when configuring the component for a Zowe instance. It will be automatically executed if you configure your component with the `<RUNTIME_DIR>/bin/zowe-configure-component.sh` utility tool.
  * **`validate`**: This defines extra validations that the component requires other than global validations. It is for runtime purpose, and will be automatically executed each time Zowe is started.
  * **`configure`**: This defines extra configuration steps before starting the component. It is for runtime purpose, and will be automatically executed each time Zowe is started.
  * **`start`**: This tells the Zowe launch script how to start the component. It is for runtime purpose, and will be automatically executed each time Zowe is started.
- **`apimlServices`**: This section defines how the component will be registered to the API Mediation Layer Discovery Service. All subfields are optional.
  * **`dynamic`**: Array of objects. This information will tell Zowe and users what services you will register under the Discovery service.
    - **`serviceId`**: This defines the service ID registered to the Discovery service.
  * **`static`**: Array of objects. When the component is statically registered under the Discovery service, this tells Zowe where to find these static definitions. This information is for the Zowe runtime. When Zowe is started, the launch script will check this field and put the parse static definition file into the directory defined as `STATIC_DEF_CONFIG_DIR` in the Zowe instance.
    - **`file`**: Defines the path to the static definition file. This file is supposed to be a template.
- **`appfwPlugins`**: Array of objects. This section defines how the component will be registered to the App Framework plug-in. All subfields are optional.
  * **`path`**: This points to the directory where App Framework `pluginDefinition.json` file is located. If you use the `<RUNTIME_DIR>/bin/zowe-configure-component.sh` utility tool to configure this component for an instance, the script will automatically execute `<INSTANCE_DIR>/bin/install-app.sh` with this path.

_Please note: All paths of directories or files mentioned above should be relative paths to the root directory where manifest is located._

## Sample manifests

There are many examples you may find across Zowe GitHub repositories, for example:

- [API Catalog manifest.yaml](https://github.com/zowe/api-layer/blob/master/api-catalog-package/src/main/resources/manifest.yaml)
- [Jobs API manifest.yaml](https://github.com/zowe/jobs/blob/master/jobs-zowe-server-package/src/main/resources/manifest.yaml)
- [Sample Node API and API Catalog extension manifest.yaml](https://github.com/zowe/sample-node-api/blob/master/manifest.yaml)
- [Sample Zowe App Framework extension manifest.yaml](https://github.com/zowe/sample-trial-app/blob/master/manifest.yaml)
