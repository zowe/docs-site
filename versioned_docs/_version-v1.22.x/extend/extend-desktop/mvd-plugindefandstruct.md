# Plug-ins definition and structure

The Zowe&trade; Application Server (`zlux-server-framework`) enables extensiblity with application plug-ins. Application plug-ins are a subcategory of the unit of extensibility in the server called a *plug-in*.

The files that define a plug-in are located in the `pluginsDir` directory. 


## Application plug-in filesystem structure

An application plug-in can be loaded from a filesystem that is accessible to the Zowe Application Server, or it can be loaded dynamically at runtime. When accessed from a filesystem, there are important considerations for the developer and the user as to where to place the files for proper build, packaging, and operation.

### Root files and directories

The root of an application plug-in directory contains the following files and directories.

#### pluginDefinition.json

This file describes an application plug-in to the Zowe Application Server. (A plug-in is the unit of extensibility for the Zowe Application Server. An application plug-in is a plug-in of the type "Application", the most common and visible type of plug-in.) A definition file informs the server whether the application plug-in has server-side dataservices, client-side web content, or both. The attributes of this file and how it is found by the server are described in the [Plugin Definition article](https://github.com/zowe/ZLUX/wiki/ZLUX-Plugin-Definition-&-Structure).

### Dev and source content

Aside from demonstration or open source application plug-ins, the following directories should not be visible on a deployed server because the directories are used to build content and are not read by the server.

#### nodeServer

When an application plug-in has router-type dataservices, they are interpreted by the Zowe Application Server by attaching them as ExpressJS routers. It is recommended that you write application plug-ins using [Typescript](http://www.typescriptlang.org/), because it facilitates well-structured code. Use of Typescript results in build steps because the pre-transpilation Typescript content is not to be consumed by NodeJS. Therefore, keep server-side source code in the `nodeServer` directory. At runtime, the server loads router dataservices from the [lib](#lib) directory.

#### webClient

When an application plug-in has the *webContent* attribute in its definition, the server serves static content for a client. To optimize loading of the application plug-in to the user, use Typescript to write the application plug-in and then package it using [Webpack](https://webpack.js.org/). Use of Typescript and Webpack result in build steps because the pre-transpilation Typescript and the pre-webpack content are not to be consumed by the browser. Therefore, separate the source code  from the served content by placing source code in the `webClient` directory.

### Runtime content

At runtime, the following set of directories are used by the server and client.

#### lib

The `lib` directory is where router-type dataservices are loaded by use in the Zowe Application Server. If the JS files that are loaded from the `lib` directory require NodeJS modules, which are not provided by the server base (the modules `zlux-server-framework` requires are added to `NODE_PATH` at runtime), then you must include these modules in `lib/node_modules` for local directory lookup or ensure that they are found on the `NODE_PATH` environment variable. `nodeServer/node_modules` is not automatically accessed at runtime because it is a dev and build directory.

#### web

The `web` directory is where the server serves static content for an application plug-in that includes the *webContent* attribute in its definition. Typically, this directory contains the output of a webpack build. Anything you place in this directory can be accessed by a client, so only include content that is intended to be consumed by clients.

### Packaging applications as compressed files
Application plug-in files can be served to browsers as compressed files in brotli (.br) or gzip (.gz) format. The file must be below the application's `/web` directory, and the browser must support the compression method. If there are multiple compressed files in the `/web` directory, the Zowe Application Server and browser perform runtime negotiation to decide which file to use.

## Location of plug-in files

The files that define a plug-in are located in the `plugins` directory.

### pluginsDir directory

At startup, the server reads from the `plugins` directory. The server loads the valid plug-ins that are found by the information that is provided in the JSON files.

Within the `pluginsDir` directory are a collection of JSON files. Each file has two attributes, which serve to locate a plug-in on disk:

**location**: This is a directory path that is relative to the server's executable (such as `zlux-app-server/bin/nodeServer.sh`) at which a `pluginDefinition.json` file is expected to be found.

**identifier**: The unique string (commonly styled as a Java resource) of a plug-in, which must match what is in the `pluginDefinition.json` file.


## Plug-in definition file

`pluginDefinition.json` is a file that describes a plug-in. Each plug-in requires this file, because it defines how the server will register and use the backend of an application plug-in (called a *plug-in* in the terminology of the proxy server). The attributes in each file are dependent upon the `pluginType` attribute. Consider the following `pluginDefinition.json` file from `sample-app`:

```
{
  "identifier": "com.rs.mvd.myplugin",
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
    "descriptionKey": "MyPluginDescription",
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

## Plug-in attributes

There are two categories of attributes: General and Application.

### General attributes

**identifier** 

Every application plug-in must have a unique string ID that associates it with a URL space on the server.

**apiVersion**

The version number for the pluginDefinition scheme and application plug-in or dataservice requirements. The default is 1.0.0.

**pluginVersion**

The version number of the individual plug-in.

**pluginType**

A string that specifies the type of plug-in. The type of plug-in determines the other attributes that are valid in the definition.

-  **application**: Defines the plug-in as an application plug-in. Application plug-ins are composed of a collection of web content for presentation in the Zowe web component (such as the Zowe Desktop), or a collection of dataservices (REST and websocket), or both.

-  **library**: Defines the plug-in as a library that serves static content at a known URL space.

-  **node authentication**: Authentication and Authorization handlers for the Zowe Application Server.

### Application attributes

When a plug-in is of *pluginType* application, the following attributes are valid:

**webContent**

An object that defines several attributes about the content that is shown in a web UI.

**dataServices**

An array of objects that describe REST or websocket dataservices.

**configurationData**

An object that describes the resource structure that the application plug-in uses for storing user, group, and server data.

### Application web content attributes

An application that has the *webContent* attribute defined provides content that is displayed in a Zowe web UI. 

The following attributes determine some of this behavior:

**framework**

States the type of web framework that is used, which determines the other attributes that are valid in *webContent*.

-  **angular2**: Defines the application as having an Angular (2+) web framework component. This is the standard for a "native" framework Zowe application.

-  **iframe**: Defines the application as being external to the native Zowe web application environment, but instead embedded in an iframe wrapper.

**launchDefinition**

An object that details several attributes for presenting the application in a web UI.

-  **pluginShortNameDefault**: A string that gives a name to the application when i18n is not present. When i18n is present, i18n is applied by using the *pluginShortNameKey*.

-  **descriptionDefault**: A longer string that specifies a description of the application within a UI. The description is seen when i18n is not present. When i18n is present, i18n is applied by using the *descriptionKey*.

-  **imageSrc**: The relative path (from `/web`) to a small image file that represents the application icon.

**defaultWindowStyle** 

An object that details the placement of a default window for the application in a web UI.

-  **width**: The default width of the application plug-in window, in pixels.

-  **height**: The default height of the application plug-in window, in pixels.

###   IFrame application web content

In addition to the general web content attributes, when the framework of an application is "iframe", you must specify the page that is being embedded in the iframe. To do so, include the attribute *startingPage* within *webContent*. *startingPage* is relative to the application's `/web` directory.

Specify *startingPage* as a relative path rather than an absolute path because the `pluginDefinition.json` file is intended to be read-only, and therefore would not work well when the hostname of a page changes.

Within an IFrame, the application plug-in still has access to the globals that are used by Zowe for application-to-application communication; simply access *window.parent.ZoweZLUX*.

