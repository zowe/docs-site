# Packaging z/OS extensions

You can extend Zowe in multiple ways. You may extend Zowe with microservices, which may start a new service within Zowe. You can also create Zowe App Framework plug-ins to provide users with a UI.

Before you start, review the following terms:

- **component**:

   Component refers to the most generic way to describe a program which can work within Zowe. It can be a microservice, a Zowe App Framework plug-in, or even just a shared program to be used by other Zowe components. This is also the generic word when referring to both Zowe core components and extensions. In most of the cases described in this topic, this terminology does not include programs running on the client side, like Zowe CLI plug-in or Zowe Explorer (VSCode extension).
- **extension**

   Extension is similar to **component** but excludes Zowe core components. It is recommended that you install all Zowe extensions into a shared extension directory.

## Zowe server component package format

You can package Zowe components (extensions) into various formats. You can package them as a stand-alone PAX, ZIP, or TAR file. You can also bundle and ship your Zowe extension(s) within another product.

A typical component package, for example, `jobs-api-package-1.0.4.zip`, consists of the following files and directories:

```
+-- manifest.yaml
|-- apiml-static-registration.yaml.template
|-- schema.json
|-- bin/
    |-- configure.sh
    |-- jobs-api-server-1.0.4-boot.jar
    |-- start.sh
    |-- validate.sh
```


- `manifest.yaml`

   Refers to the Zowe component manifest file. You can find detailed definition of manifest in [Server Component Manifest File Reference](../appendix/server-component-manifest.md).
   
- `schema.json`

   An example filename of the [json schema](https://json-schema.org/) file specified by the manifest property `schemas.configs` as detailed in [Server Component Manifest File Reference](../appendix/server-component-manifest.md). The file details the parameters that are valid for the component's configuration within Zowe server configuration files. See documentation on [server component schema files](server-schemas.md) for more information.

- `apiml-static-registration.yaml.template`

   Refers to a supporting file that instructs the Zowe launch script how to register this extension service to the API Mediation Layer Discovery service. In this case, this file is referred in the `manifest.yaml` `apimlServices.static[0].file` field. This file is optional depending on the function of the component and you can change and customize the file name in the manifest file.
- `bin/(configure|start|validate).sh`

   This file contains the Zowe component lifecycle scripts. You may not need these files depending on the function of the component. You can find detailed definition of lifecycle scripts in [Zowe component runtime lifecycle](lifecycling-with-zwesvstc.md#zowe-component-runtime-lifecycle).

It is also suggested that you put the following files into the package:

- `README.md`

  This file is a brief introduction to your extension in Markdown format, including how it should be installed, configured, verified, and so on.
- `LICENSE`

   This is the full license text file.

If you decide to bundle and ship Zowe extensions within another product, you can put the whole directory structure presented previously into your product package as subdirectories. Take the following structure as an example.

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

Zowe extensions, as well as core components, can use a manifest file to describe itself. Check [Server Component Manifest File Reference](../appendix/server-component-manifest.md) for details.

## Sample manifests

For examples of manifests thoughout Zowe GitHub repositories, see the following links:  

- [API Catalog manifest.yaml](https://github.com/zowe/api-layer/blob/v2.x.x/api-catalog-package/src/main/resources/manifest.yaml)
- [Jobs API manifest.yaml](https://github.com/zowe/jobs/blob/v2.x/master/jobs-zowe-server-package/src/main/resources/manifest.yaml)
- [Sample Node API and API Catalog extension manifest.yaml](https://github.com/zowe/sample-node-api/blob/master/manifest.yaml)
- [Sample Zowe App Framework extension manifest.yaml](https://github.com/zowe/sample-trial-app/blob/master/manifest.yaml)
