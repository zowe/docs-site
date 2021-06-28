# Dataservices

Dataservices are a dynamic component of the backend of a Zowe application. Dataservices are optional, because the proxy server might only serve static content for a particular application. However, when included in an application, a dataservice defines a URL space for which the server will run the extensible code from the application. Dataservices are primarily intended to be used to create REST APIs and Websocket channels.

## Defining a dataservice

Within the `sample-app` repository, in the top directory, you will find a `pluginDefinition.json` file. Each application requires this file, because it defines how the server registers and uses the backend of an application (called a plug-in in the terminology of the proxy server).

Within the JSON file, there is a top level attribute, *dataServices*:
```
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
```
### Dataservices defined in pluginDefinition

The following attributes are valid for each dataservice in the *dataServices* array:

 **type**

 Specify one of the following values:

  - **router**: Router dataservices that run under the proxy server, and use ExpressJS Routers for attaching actions to URLs and methods.

  - **service**: Service dataservices that run under ZSS, and utilize the API of ZSS dataservices for attaching actions to URLs and methods.

**name**

 The name of the service that must be unique for each `pluginDefinition.json` file. The name is used to reference the dataservice during logging and it is also is used in the construction of the URL space that the dataservice occupies.

**serviceLookupMethod**

 Specify `external` unless otherwise instructed.

**fileName**

The name of the file that is the entry point for construction of the dataservice, relative to the application's `/lib` directory. In the case of `sample-app`, upon transpilation of the typescript code, javascript files are placed into the `/lib` directory.

**routerFactory (Optional)**

 When you use a router dataservice, the dataservice is included in the proxy server through a `require()` statement. If the dataservice's exports are defined such that the router is provided through a factory of a specific name, you must state the name of the exported factory using this attribute.

**dependenciesIncluded**

 Must be `true` for anything in the `pluginDefinition.json` file. (This setting is false only when adding dataservices to the server dynamically.)

### Limiting the length of dataservice paths for RBAC
If your administrator configures the Zowe Application Framework to use role-based access control (RBAC), then when you create a dataservice you must consider the length of its paths.

To control access to dataservices, administrators can enable RBAC, then use a z/OS security product such as RACF to map roles and authorities to a System Authorization Facility (SAF) profile. For information on RBAC, see [Applying role-based access control to dataservices](../../user-guide/mvd-configuration.md#applying-role-based-access-control-to-dataservices).

SAF profiles have the following format:

`<product>.<instance id>.SVC.<pluginid_with_underscores>.<service>.<HTTP method>.<dataservice path with forward slashes '/' replaced by periods '.'>`

For example, to access this dataservice endpoint:

`/ZLUX/plugins/org.zowe.foo/services/baz/_current/users/fred`

Users must have READ access to the following profile:

`ZLUX.DEFAULT.SVC.ORG_ZOWE_FOO.BAZ.POST.USERS.FRED`

Profiles cannot contain more than 246 characters. If the path section of an endpoint URL makes the profile name exceed limit, the path is trimmed to only include elements that do not exceed the limit. For example, imagine that each path section in this endpoint URL contains 64 characters:

`/ZLUX/plugins/org.zowe.zossystem.subsystems/services/data/_current/aa..a/bb..b/cc..c/dd..d` 

So `aa..a` is 64 "a" characters, `bb..b` is 64 "b" characters, and so on. The URL could then map to the following example profile:

`ZLUX.DEFAULT.SVC.ORG_ZOWE_ZOSSYSTEM_SUBSYSTEMS.DATA.GET.AA..A.BB..B`

The profile ends at the `BB..B` section because adding `CC..C` would put it over 246 characters. So in this example, all dataservice endpoints with paths that start with `AA..A.BB..B` are controlled by this one profile.

To avoid this issue, we recommend that you maintain relatively short endpoint URL paths.

## Dataservice API

The API for a dataservice can be categorized as Router-based or ZSS-based, and Websocket or not.

**Note:** Each Router dataservice can safely import express, express-ws, and bluebird without requiring the modules to be present, because these modules exist in the proxy server's directory and the *NODE_MODULES* environment variable can include this directory.

### Router-based dataservices


#### HTTP/REST router dataservices

Router-based dataservices must return a (bluebird) Promise that resolves to an ExpressJS router upon success. For more information, see the ExpressJS guide on use of Router middleware: [Using Router Middleware](http://expressjs.com/en/guide/using-middleware#middleware.router).

Because of the nature of Router middleware, the dataservice need only specify URLs that stem from a root '/' path, as the paths specified in the router are later prepended with the unique URL space of the dataservice.

The Promise for the Router can be within a Factory export function, as mentioned in the `pluginDefinition` specification for *routerFactory* above, or by the module constructor.

An example is available in `sample-app/nodeServer/ts/helloWorld.ts`

#### Websocket router dataservices

ExpressJS routers are fairly flexible, so the contract to create the Router for Websockets is not significantly different.

Here, the express-ws package is used, which adds websockets through the ws package to ExpressJS. The two changes between a websocket-based router and a normal router are that the method is 'ws', as in `router.ws(<url>,<callback>)`, and  the callback provides the websocket on which you must define event listeners.

See the ws and express-ws topics on [www.npmjs.com](https://www.npmjs.com) for more information about how they work, as the API for websocket router dataservices is primarily provided in these packages.

An example is available in `zlux-server-framework/plugins/terminal-proxy/lib/terminalProxy.js`

#### Router dataservice context

Every router-based dataservice is provided with a `Context` object upon creation that provides definitions of its surroundings and the functions that are helpful. The following items are present in the `Context` object:

**serviceDefinition**

The dataservice definition, originally from the `pluginDefinition.json` file within a plug-in.

**serviceConfiguration**

An object that contains the contents of configuration files, if present.

**logger**

An instance of a Zowe Logger, which has its component name as the unique name of the dataservice within a plug-in.

**makeSublogger**

A function to create a Zowe Logger with a new name, which is appended to the unique name of the dataservice.

**addBodyParseMiddleware**

A function that provides common body parsers for HTTP bodies, such as JSON and plaintext.

**plugin**

An object that contains more context from the plug-in scope, including:

- **pluginDef**: The contents of the `pluginDefinition.json` file that contains this dataservice.

- **server**: An object that contains information about the server's configuration such as:

    - **app**: Information about the product, which includes the *productCode* (for example: `ZLUX`).

    - **user**: Configuration information of the server, such as the port on which it is listening.
