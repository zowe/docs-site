# URI Broker

The URI Broker is an object in the application plug-in web framework, which facilitates calls to the Zowe&trade; Application Server by constructing URIs that use the context from the calling application plug-in.

1. [Accessing the URI Broker](#accessing-the-uri-broker)
    1. [Natively](#natively)
    1. [In an iframe](#in-an-iframe)
1. [Functions](#functions)
    1. [Accessing an application plug-in's dataservices](#accessing-an-application-plug-ins-dataservices)
        1. [HTTP dataservice URI](#http-dataservice-uri)
        1. [Websocket dataservice URI](#websocket-dataservice-uri)
    1. [Accessing the application plug-in's configuration resources](#accessing-application-plug-ins-configuration-resources)
        1. [Standard configuration access](#standard-configuration-access)
        1. [Scoped configuration access](#scoped-configuration-access)
    1. [Accessing static content](#accessing-static-content)
    1. [Accessing the application plug-in's root](#accessing-the-application-plug-ins-root)
    1. [Server queries](#server-queries)
        1. [Accessing list of plugins](#accessing-list-of-plugins)

## Accessing the URI Broker

The URI Broker is accessible independent of other frameworks involved such as Angular, and is also accessible through iframe. This is because it is attached to a global when within the Zowe Desktop. For more information, see [Zowe Desktop and window management](mvd-desktopandwindowmgt.md).
Access the URI Broker through one of two locations:

### Natively:

`window.ZoweZLUX.uriBroker`

### In an iframe:

`window.parent.ZoweZLUX.uriBroker`


## Functions

The URI Broker builds the following categories of URIs depending upon what the application plug-in is designed to call.

### Accessing an application plug-in's dataservices

Dataservices can be based on HTTP (REST) or Websocket. For more information, see [Dataservices](mvd-dataservices.md).

#### HTTP Dataservice URI

 `pluginRESTUri(plugin:ZLUX.Plugin, serviceName: string, relativePath:string): string`

Returns: A URI for making an HTTP service request.


#### Websocket Dataservice URI

`pluginWSUri(plugin: ZLUX.Plugin, serviceName:string, relativePath:string): string`

Returns: A URI for making a Websocket connection to the service.


### Accessing application plug-in's configuration resources

Defaults and user storage might exist for an application plug-in such that they can be retrieved through the Configuration Dataservice.

There are different scopes and actions to take with this service, and therefore there are a few URIs that can be built:

#### Standard configuration access

`pluginConfigUri(pluginDefinition: ZLUX.Plugin, resourcePath:string, resourceName?:string): string`

Returns: A URI for accessing the requested resource under the user's storage.


#### Scoped configuration access
 `pluginConfigForScopeUri(pluginDefinition: ZLUX.Plugin, scope: string, resourcePath:string, resourceName?:string): string`

Returns: A URI for accessing a specific scope for a given resource.


### Accessing static content

Content under an application plug-in's `web` directory is static content accessible by a browser.
This can be accessed through:

`pluginResourceUri(pluginDefinition: ZLUX.Plugin, relativePath: string): string`

Returns: A URI for getting static content.

For more information about the `web` directory, see [Application plug-in filesystem structure](mvd-plugindefandstruct#application-plug-in-filesystem-structure).

### Accessing the application plug-in's root

Static content and services are accessed off of the root URI of an application plug-in. If there are other points that you must access on that application plug-in, you can get the root:

`pluginRootUri(pluginDefinition: ZLUX.Plugin): string`

Returns: A URI to the root of the application plug-in.

### Server queries

A client can find different information about a server's configuration or the configuration as seen by the current user by accessing specific APIs.

#### Accessing a list of plug-ins

`pluginListUri(pluginType: ZLUX.PluginType): string`

Returns: A URI, which when accessed returns the list of existing plug-ins on the server by  type, such as "Application" or "all".
