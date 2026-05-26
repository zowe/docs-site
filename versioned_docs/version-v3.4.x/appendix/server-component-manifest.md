# Server component manifest file reference

Zowe server component manifest file defines the name and purpose of the component. It also provides information about how this component should be installed, configured, and started. It can be named as `manifest.yaml`, `manifest.yml`, or `manifest.json` and should be located in the root directory of the component. Currently, only `YAML` or `JSON` format are supported. 

The manifest file contains the following properties:

- **`name`**

  (Required) Defines a short, computer-readable name of the component. This component name is used as directory name after it is installed. The allowed characters in the name are alphabets, numbers, hyphen (`-`) and underscore (`_`). For example, `explorer-jes` is a valid extension name.

- **`id`**

  (Optional) Defines a long, computer-readable identifier of the component. If the component is hosted as one of the projects in [Open Mainframe Project](https://www.openmainframeproject.org/), the identifier also matches the component path in the Zowe Artifactory. For example, `org.zowe.explorer-jes` is a valid identifier. You can locate the component's official releases by looking into the `libs-release-local/org/zowe/explorer-jes/` directory in the [Zowe Artifactory](https://zowe.jfrog.io/ui/repos/tree/General/libs-release-local%2Forg%2Fzowe%2Fexplorer-jes).

- **`version`**: 

  (Optional but recommended) This is the current version of the component without the prefix of `v`. For example, `2.0.0` is a valid `version` value.

- **`title`**

  (Optional) Defines a short human-readable name for this component. This value will also be used as the default title for API Catalog tile, or App Framework plug-in title. For example, `JES Explorer` is a valid `title` for the `explorer-jes` component.

- **`description`**

  (Optional) Defines a long human-readable description of this component. There is no restriction on what you can put in the field.

- **`license`**

  (Optional but recommended) Defines the license code of the component. For example, Zowe core components have `EPL-2.0` value in this field.
  
- **`schemas`**

  (Required) Defines the location of json schema files that are compatible with certain portions of Zowe as denoted by each child property.
  
  * **`configs`**
  
    (Required) Defines the location of the json schema file which extends the Zowe Component base schema.

- **`build`**

  (Optional but strongly recommended) Defines the build information of the current package, including git commit hash, and so on. When Zowe core components define manifest file, these fields are left as template variables. The template will be updated when a publishable package is created. It supports the following subfields:

  * **`branch`**
  
    It indicates which branch this package is built from.

  * **`number`**
  
    You may create multiple packages in the same branch. This is the sequential number of the current package.

  * **`commitHash`**
  
    This is the commit hash of the package that can be used to match the exact source code in the repository. Zowe core components usually use `git rev-parse --verify HEAD` to retrieve the commit hash.

  * **`timestamp`**
  
    This is the UNIX timestamp when the package is created.

- **`commands`**

  This defines actions that should be taken when the component is installed, configured, started, or tested. You must issue this command with one or more subfields as listed below. For example, `commands.install`. All subfields are optional and usually should point to a USS command or script.

  * **`install`**
  
    This defines extra steps when installing this component. It will be automatically executed if you install your component with the `zwe components install` server command.

  * **`validate`**
  
    This defines extra validations that the component requires other than global validations. It is for runtime purpose, and will be automatically executed each time Zowe is started.

  * **`configure`**
  
    This defines extra configuration steps before starting the component. It is for runtime purpose, and will be automatically executed each time Zowe is started.

  * **`start`**
  
    This tells the Zowe launch script how to start the component. It is for runtime purpose, and will be automatically executed each time Zowe is started.

- **`apimlServices`**

  This section defines how the component will be registered to the API Mediation Layer Discovery Service. All subfields are optional.

  * **`dynamic`**
  
    Array of objects. This information will tell Zowe and users what services you will register under the Discovery service.

    - **`serviceId`**
    
      This defines the service ID registered to the Discovery service.
      
  * **`static`**
  
    Array of objects. When the component is statically registered under the Discovery service, this tells Zowe where to find these static definitions. This information is for the Zowe runtime. When Zowe is starting, the launch script will check this field and put the parse static definition file into the directory defined as `ZWE_STATIC_DEFINITIONS_DIR` in the Zowe instance.

    - **`file`**
  
      Defines the path to the static definition file. This file is supposed to be a template.

  * **`basePackage`**

        Defines the base package name of the extension. It is used to notify the extended service of the location for component scan.

- **`appfwPlugins`**

  Array of objects. This section defines how the component will be registered to the App Framework plug-in. All subfields are optional.
  
  * **`path`**
  
    This points to the directory where App Framework `pluginDefinition.json` file is located. When Zowe is starting, the launch script will check this field and register the plug-in to Zowe App Framework Server.

- **`gatewaySharedLibs`**: Array of objects. This section defines the API ML extension(s) attributes which will get installed and used by API ML.
  
  * **`path`**
  
    This points to the directory where the JAR files are housed for an extension and later on copied into the API ML extensions workspace directory. If there is more than 1 extension to a single manifest (say for a product family of multiple extensions), then multiple path variables can be contained within the manifest denoted by individual folders, for example `path/to/yourextension1/`.
    Alternatively, `path` can be the JAR file path rather than a directory path.

- **`zisPlugins`**

  List of ZIS plugin objects. This section defines the ZIS plugin(s) attributes necessary for ZIS plugin installation and automation.

  * **`id`**
    
    This is the unique plugin ID of the ZIS plugin.

  * **`path`**
    
    This points to the directory where the load modules are housed for a plugin, for example `zisServer`. If there is more than 1 plugin to a single manifest (say for a product family of multiple plugins), then multiple path variables can be contained within the manifest denoted by individual folders, for example `yourplugin1/zisServer`. The parameters for the Zowe parmlib are assumed to be in `<PATH>/samplib`. The names of the plugin executables are assumed to be in `<PATH>/loadlib`.

  For example,
  
  ```yaml
  zisPlugins:
    -
      id: yourplugin1
      path: yourplugin-1/zisServer
    -
      id: yourplugin2
      path: yourplugin2/zisServer
  ```

- **`configs`**

  Component can define it's own configuration in this section in desired hierarchy. This is the brief guidance for component user to learn what are the configurations and what are the default values. Any configurations defined here can be placed into `zowe.yaml` `components.<component-name>` section for customization.

  For example, if the component has this defined in component manifest,

  ```yaml
  name: myextension
  configs:
    port: 4567
    another:
      config: value
  ```

  You can choose to put those configurations into `components.myextension` or `haInstance.<ha-instance>.components.myextension` of `zowe.yaml` like this:

  ```yaml
  zowe:
    extensionDirectory: /path/to/all/extensions
  components:
    myextension:
      enabled: true
      port: 14567
      another:
        config: my-value
  haInstances:
    lpar1:
    lpar2:
      components:
        myextension:
          enabled: true
          port: 24567
          another:
            config: my-value2
  ```

  Component can use auto-generate environment variables in lifecycle scripts to learn how the component is configured for current HA instance. In the preceding use case,

  * For HA instance `lpar1`, `ZWE_configs_port` value is `14567`, `ZWE_configs_another_config` value is `my-value`, which are default values.
  * For HA instance `lpar2`, `ZWE_configs_port` value is `24567`, `ZWE_configs_another_config` value is `my-value2`.

  From another component, you can find `myextension` configurations like this,

  * For HA instance `lpar1`, `ZWE_components_myextension_port` value is `14567`, `ZWE_components_myextension_another_config` value is `my-value`, which are default values.
  * For HA instance `lpar2`, `ZWE_components_myextension_port` value is `24567`, `ZWE_components_myextension_another_config` value is `my-value2`.

- **`dependencies`**: (Optional) This section defines the component's dependencies.
  * **`zos`**: Array of objects. This subfield defines components or services from z/OS.
    - **`apiml`**: true or false. Indicates whether the dependency is registered/searchable with the Discovery service
    - **`version`**: This defines the version range of the dependency. Acceptable formats: `version`, `>version`, `>=version`, `<version`, `<=version`


**Note:** All paths of directories or files mentioned previously should be relative paths to the root directory where manifest is located.
