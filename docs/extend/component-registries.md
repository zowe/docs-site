# Component package registries

Component package registries are on-premisis or remote storage which contains Zowe components (usually, extensions) and allows Zowe administrators to download an extension and its dependent extensions from that storage.
A component package registry makes Zowe component and extension management easier by reducing the need for manually uploading and installing an extension and its dependencies into Zowe.

Zowe server content can manage components and extensions via the [`zwe components` commands](../user-guide/install-configure-zos-extensions.md).
These commands have optional parameters for performing operations using a registry instead of only using content local to the Zowe host.
Note: Using `zwe` with component package registries requires that `zowe.useConfigmgr=true` is set in your Zowe server configuration. [See using the configuration manager for more info](../user-guide/configmgr-using.md)

Registries can be any technology that can be used to satisfy the Zowe component registry handler API. For example, npm, conda, artifactory, rpm and more could potentially be used as registries.
Currently Zowe server installs ship with a registry "Handler" for using an NPM server as a Zowe component package registry. Support for alternatives can be added, please refer to the [making your own handler section.](#making-your-own-handler)

## Registry examples

Consider the following examples where use of a registry is compared to managing extensions without a registry.

### Installing an extension

A Zowe server extension can be installed with a local archive such as in
`zwe components install -o my-zowe-extension-1.0.0.pax --config zowe.yaml`

This has two shortcomings:
* In order to run that command, the extension must first have been uploaded to the Zowe host.
* Does that extension work after installation, or does it have a dependency that must also be installed? It's not known without reading documentation.

Both issues can be resolved by using a registry, such as in
`zwe components install -o my-zowe-extension --config zowe.yaml`

In this example, because `zwe` was not given the name of a file, it takes the parameter "my-zowe-extension" and searches for an extension package with that exact name within the component package registry configured for Zowe.
If the package is found in the registry, that extension and all of its dependencies will be downloaded and then installed.
**Note: This means you must trust the registry that you use. On-premisis registries are a great way to curate a list of trusted extensions and make it easy to install them. On the other hand, it would not be recommended to use a registry found on a public network, because you do not want to install extensions that you have not vetted.**

The above example omits the registry configuration information, so the values default to what is containted within the zowe.yaml
If they were explicitly provided instead, the command may look like
`zwe components install -o my-zowe-extension --config zowe.yaml --handler npm --registry https://my-on-prem-registry.company.com/npm`

### Upgrading an extension

If a new version of an extension comes out, you can upgrade your extension from a local archive with
`zwe components install -o my-zowe-extension-2.0.0.pax --config zowe.yaml`

This will replace the old extension with the new one.
This has three shortcomings:
* You must somehow be alerted that there is a new version available.
* In order to run that command, the extension must first have been uploaded to the Zowe host.
* Does that extension work after installation, or does it have a dependency that must also be installed? It's not known without reading documentation.

If you use a registry, you can be alerted that a new version is available by running the command
`zwe components upgrade -o all --config zowe.yaml --dry-run`

This command reports on **all** of the components that have upgrades available. The `--dry-run` parameter skips doing the actual upgrade, so you could upgrade every available extension at once by running this without `--dry-run` too.

Once learning that an upgrade is available, you can perform it with
`zwe components upgrade -o my-zowe-extension --config zowe.yaml`

This command is similar to `install`, it will upgrade your extension and also any dependencies.

### Uninstalling extensions

When running `zwe components uninstall -o my-zowe-extension`, the extension will be removed regardless of if you are using a registry or not. But if you are using a registry, the registry handler will also ensure any information it kept about the extension is cleaned up at that time.

### Searching for extensions

`zwe components search` requires a registry to function, because it searches that registry to try to find an extension that includes whatever you searched for.
You can search for any pattern, which may include fuzzy matches such as

`zwe components search -o database* --config zowe.yaml`
This would return a list of extensions that can be installed that start with the word "database". Note that each registry and handler can have different search capabilities. Not all will support partial matches.


## Configuring zwe to use a registry

Each `zwe components` command can take the parameter `--registry` to specify the location (such as HTTPS URL) of a registry, and the parameter `--handler` to specify which handler to use with that registry. `--handler` determines which registry type you are using, such as npm.

When these parameters are not specified, then the default values are found within the zowe YAML configuration.
Within a zowe YAML configuration, the section `zowe.extensionRegistry` controls how `zwe` uses a registry. [The schema for this section can be found in the zowe YAML schema](https://github.com/zowe/zowe-install-packaging/blob/v2.x/master/schemas/zowe-yaml-schema.json)

An example of configuring zwe for use with Zowe's own npm registry and npm handler would look like:

```
zowe:
  extensionRegistry:
    defaultHandler: npm
    handlers:
      npm:
        registry: https://zowe.jfrog.io/zowe/npm
        path: ${{ zowe.runtimeDirectory }}/bin/commands/components/npm.js
```

The above example states that the default registry type will be "npm", and that the npm type is handled by the handler located at the path `${{ zowe.runtimeDirectory }}/bin/commands/components/npm.js`. This handler will by default use the registry located at `https://zowe.jfrog.io/zowe/api/npm/npm-local-release/`.

## Using multiple registries

It is anticipated that extensions from different companies will be located on different registries, so it is possible to use multiple registries with Zowe.
Please note that registry types or handlers may not be able to resolve dependencies across different registries, so in this case extensions should only declare a dependency on other extensions that can be found within the same registry.
To switch between registries for accessing extensions in different registries, you can just use the `--registry` option on a `zwe components` command.
For example, instead of searching for "database" extensions within the default registry as in

`zwe components search -o database* --config zowe.yaml`

You may instead specify a registry,

`zwe components search -o database* --config zowe.yaml --registry first-registry.foo`

And if the extension you want isn't found there, you can try another registry,

`zwe components search -o database* --config zowe.yaml --registry second-registry.foo`

Then you'd be able to install the extension from that specific registry such as,

`zwe components install -o database-product --config zowe.yaml --registry second-registry.foo`

Note that Zowe does not currently track which registry an extension originated from, so when performing `zwe component upgrade`, you will need to specify the registry if the extension did not come from the default registry.


## Setting up a registry

Although you can use a registry set up by an organization you trust, you can also set up your own registry.
This can be very useful for curating a list of Zowe extensions that are approved for use in your organization.
Many package managers, whether language-specific, z/OS native or otherwise, could be used to manage Zowe extension packages via whichever registry or repository technology they use.
Therefore Zowe cannot give guidance on every possible registry, but below are some suggestions that may be useful to you.

### npm

npm is the nodejs package manager. Typically npm registries store javascript code intended for use in a web browser or nodejs, but it's also possible to just store Zowe extensions instead.
npm registries are webservers that have an API which associates uploaded packages to users which own them, and such user accounts may also determine what you are permitted to download.
What webserver you use, and how user credentials are managed isn't standardized by npm, any webserver could be an npm server as long as it fulfills the npm API.

As an example, https://verdaccio.org/ is such a webserver that you can set up to create your own on-premisis npm package registry.
You can find out more about verdaccio and [how to set up a verdaccio-based npm registry on their website](https://verdaccio.org/docs/what-is-verdaccio/)

Another example is jfrog artifactory. Artifactory can store packages to serve through an npm registry, a docker registry, and much more.
You can find out more about artifactory and [how to set up an artifactory-based npm registry on their website](https://www.jfrog.com/confluence/display/JFROG/npm+Registry)

## Making your own handler

Handlers connect `zwe` with a component package registry. For each `zwe components` command, `zwe` will call one hanndler with a set of parameters and expect certain output from the handler in return before completing the `zwe` command processing.

Handlers are at minimum an EECMAScript2020-compatible JavaScript module file that implements the Handler API.
This file is **not** nodejs, but rather is run within a [quickjs](https://bellard.org/quickjs/quickjs.html) environment. This file can in turn call other commands, but must return output for `zwe` to continue with.

This handler JavaScript file can be located at any unix path on the host where Zowe is, and the location is [specified within the zowe YAML](#configuring-zwe-to-use-a-registry)

When a `zwe components` command needs to use a handler, the handler is given input in the form of environment variables. If output is expected, the handler API requires each output attribute to be a key=value pair on a new line.

The following table details the input and output expected for each handler action.

| Attribute | Type | Input or Output | Actions | Description |
|-----------|------|-----------------|---------|-------------|
| `ZWE_CLI_REGISTRY_COMMAND` | string | Input | All | Values of 'install', 'upgrade', 'uninstall', 'search' inform handler which action to take and what additional input & output to expect |
| `ZWE_CLI_PARAMETER_REGISTRY` | string | Input | Install, Upgrade, Uninstall, Search | Used to inform handler which registry to use. Can be any format the handler understands. |
| `ZWE_CLI_REGISTRY_DRY_RUN` | boolean | Input | Install, Upgrade, Uninstall | If true, handler should show as much as possible about what would happen during this command, without committing changes that would alter which components are installed. |
| `ZWE_CLI_PARAMETER_COMPONENT_NAME` | string | Input | Install, Upgrade, Uninstall, Search | Value varies by command. For 'install' and 'uninstall', this value is the exact name of a component. For upgrade, it may also be 'all' to perform an upgrade for all components possible. For 'search', it may be any string to perform searching for exact or partial matching component names. |
| `ZWE_CLI_PARAMETER_COMPONENT_FILE` | string | Output | Install, Upgrade, Uninstall | A comma-separated list of components that have been added or removed. During 'install' or 'upgrade', the list must be full unix paths to component folders or archives that were added. For 'uninstall', the list must instead be just the names of the components that were removed. If the handler failed during its operation or there were no changes, the output should instead just be the string 'null'. |

An example of running `zwe components install -o exact-component-name --handler npm --registry "https://zowe.jfrog.io/zowe/api/npm/npm-local-release/"` would have the handler being given the following environment variables:

```
ZWE_CLI_REGISTRY_COMMAND=install
ZWE_CLI_PARAMETER_REGISTRY=https://zowe
ZWE_CLI_REGISTRY_DRY_RUN=false
ZWE_CLI_PARAMETER_COMPONENT_NAME=exact-component-name
```

And after the command completes, the handler can print anything in STDOUT and STDERR as long as STDOUT includes a line specifying the location of the components installed, via `ZWE_CLI_PARAMETER_COMPONENT_FILE`. The output could look like:

```
2 packages installed
Operation successful
return code=0
ZWE_CLI_PARAMETER_COMPONENT_FILE=/my/components/exact-component-name/archive.pax,/my/components/dependency1
```

Where `archive.pax` is an archive of `exact-component-name`, while 'dependency1' is a folder containing the un-archived contents of `dependency1`.


### Handler code

The Handler API interface is [located within Zowe's code here](https://github.com/zowe/zowe-install-packaging/blob/2751a194048f0050fc7ebcaeaac8c96a36106991/bin/commands/components/handlerutils.ts)

And Zowe delivers a handler written for use with [npm, located here](https://github.com/zowe/zowe-install-packaging/blob/2751a194048f0050fc7ebcaeaac8c96a36106991/bin/commands/components/npm.ts)


## Component Packaging Requirements

Zowe extensions can be written in a variety of languages and may have network-level dependencies. These attributes of extensions may seem like an odd fit for some existing package managers such as those that are language specific. However, all Zowe requires out of a package manager is that the manager can deliver an archive of a extension or folder containing an extension. The Zowe community has found that delivering a Zowe extension as an archive can avoid the complexities of some package managers and make it simple to deliver an extension via one or more package manager with minimal work. Below are some patterns that can work for certain package managers.

### npm

The npm handler that is delivered by Zowe expects that each npm package either contains an archive of a Zowe extension or that the entire package folder is itself the Zowe extension.
You should become familiar with the [attributes of a package.json file](https://docs.npmjs.com/files/package.json/) as some are referenced below.

The Zowe component registry handler determines which is true by reading the `package.json` of the npm package and looking for the `main` attribute. If `main` exists, its value must be a path to the archive of the extension, relative to the package root folder.
For example, the `angular-sample` extension npm package has this folder structure:
```
/angular-sample
  /package.json
  /angular-sample.pax
```

The handler determines that `angular-sample.pax` is the archive of the extension when it sees the `main` property within the package.json below:

```
{
	"name": "angular-sample",
	"version": "2.6.0",
	"description": "Sample App Showcasing Angular Adapter",
	"main": "angular-sample.pax",
	"homepage": "https://zowe.org",
	"keywords": [
		"zlux",
		"appfw",
		"app",
		"angular",
		"sample"
	],
	"license": "EPL-2.0",
	"repository": {
		"type": "git",
		"url": "https://github.com/zowe/sample-angular-app.git"
	}
 }
```
 
If `main` were not defined, then Zowe would instead expect that this folder was an extension, which for example would have a `manifest.yaml` at the root of the folder.
 
npm requires that each package contain a `package.json` file, and there are certain fields that are required within it. Several fields have overlap in meaning with Zowe's extension manifest files, so Zowe delivers a utility to help you automate the creation of a `package.json` file using a `manifest.yaml` file as input. [This Zowe npm module will copy the properties from one file to the other for you](https://github.com/zowe/zowe-install-packaging/tree/v2.x/master/bin/utils/manifest-to-npmpackage)

The simplest and most robust way to deliver a Zowe extension via npm is to build your extension, then archive the entire folder of the extension as a `.pax` file, and put that into a folder with a single `package.json` file for npm which has the `main` attribute set to the name of your pax archive, and use the `dependencies` section of the package.json to list if your extension depends on any other Zowe extensions.
Once you have your npm package, you can upload it to the registry of your choice using standard npm commands, such as:

```
npm login
cd /your/extension/package/folder
npm publish
```

## Additional resources

While this document is the authoritative source on Zowe's component package regpistry technology, older additional information may be found in [the presentation](https://github.com/zowe/zowe-install-packaging/files/9292283/appstore2.pdf) and [the recording](https://zoom.us/rec/share/y6zsW5U9QWE1s1r4M3nFnSO9Kkv3yeT5boyZFqWH1BxW3Tju_jcAGP7jO1DsLuZq.rhlqHx6DgPxmXBhW?startTime=1660053548000) used during the initial technology prototype.
