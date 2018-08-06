::: tip Web Folder

Although projects are added to the Zoe root, Zoe looks in the **web** folder under `/zaas1/zoe/<build-number>/<plugin-name>/web` when looking for an entry point to new apps. Make sure to put your **index.html** or other entry point in this folder.
:::

## Configuring your app for Zoe

In order for Zoe to be aware of an app, a pluginDefintion.json file must be included in the root of the project. This file lets Zoe know information about the framework used, reference files, and basic configuration for the app. An example of a pluginDefiniton.json could be:

```json
{
  "identifier": "com.<plugin-name>", // File referenced in plugins folder
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
