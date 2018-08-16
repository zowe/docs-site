# Adding Apps to ZLUX Quick Start

While the zlux environment comes with predefined Apps and explorers, you also have the ability to extend the system and add your own apps. These apps can be created using any UI framework through an Iframe. However only Angular is supported natively.

In this section we will discuss:

- The file structure of the plugin system
- Configuring your app for Zoe with the pluginDefiniton.json
- Building and deploying newly added apps

## Plugin file system

To add new apps, files must be added in two locations.

- Zoe root (`/zaas1/zoe/<build-number>`)

  - Here is where the App project itself is added.

- Plugins Folder (`/zaas1/zoe/<build-number>/zlux-example-server/plugins`)

  - An identifier in the format of com.<**plugin-name**>.json is convention. Inside this json file the **plugin location** (generally the zoe root), and the **identifier name** are specified. To identify the plugin further, names such as auth, mvd, common, ext are postfixed after **com**. An example of such a file is below.

```json
{
  "identifier": "com.<plugin-name>",
  "pluginLocation": "../../<plugin-name>"
}
```

::: tip Web Folder

Although projects are added to the Zoe root, Zoe looks in the **web** folder under `/zaas1/zoe/<build-number>/<plugin-name>/web` when looking for an entry point to new apps. Make sure to put your **index.html** or other entry point in this folder.
:::

## Configuring your app for Zoe

In order for Zoe to be aware of an app, a pluginDefintion.json file must be included in the root of the project. This file lets Zoe know information about the framework used, reference files, and basic configuration for the app. An example of a pluginDefiniton.json could be:

```json
{
  "identifier": "com.<plugin-name>",
  "apiVersion": "1.0",
  "pluginVersion": "1.0",
  "pluginType": "application",
  "webContent": {
    "framework": "angular2",
    "launchDefinition": {
      "pluginShortNameKey": "helloWorldTitle",
      "pluginShortNameDefault": "Hello World",
      "imageSrc": "assets/icon.png"
    },
    "descriptionKey": "PluginDescription",
    "descriptionDefault": "Base MVD plugin template",
    "isSingleWindowApp": true,
    "defaultWindowStyle": {
      "width": 400,
      "height": 300
    }
  },
  "dataServices": [
    {
      "type": "router",
      "name": "hello",
      "serviceLookupMethod": "external",
      "fileName": "helloWorld.js",
      "routerFactory": "helloWorldRouter",
      "dependenciesIncluded": true
    }
  ]
}
```

### Explanation of plugin definition settings:

#### Identifier:

- File referenced in plugin folder.

#### Webcontent:

- Framework used (Angular or Iframe)
- App plugin name and icon source
- Description
- Default window size and style

#### Data services:

- Used for Native applications in Angular. If building an app in a non-native framework, leave this section blank.

::: tip
If you would like more information about the plugin system, please visit the [wiki](https://github.com/gizafoundation/zlux/wiki/Zlux-Plugin-Definition-&-Structure)
:::

## Build and Deploy

In order to build the newly added app,

1.  Run `./deploy.sh` found in `/zaas1/zoe/<build-number>/zlux-build`
2.  Run `./zoe-stop.sh` found in `/zaas1/zoe/<build-number>/scripts`
3.  Run `./zoe-start.sh` found in `/zaas1/zoe/<build-number>/scripts`
