# Configuration Dataservice

The Configuration Dataservice is an essential component of the Zowe&trade; Application Framework, which acts as a JSON resource storage service, and is accessible externally by REST API and internally to the server by dataservices.

The Configuration Dataservice allows for saving preferences of applications, management of defaults and privileges within a Zowe ecosystem, and bootstrapping configuration of the server's dataservices.

The fundamental element of extensibility of the Zowe Application Framework is a *plug-in*. The Configuration Dataservice works with data for plug-ins. Every resource that is stored in the Configuration Service is stored for a particular plug-in, and valid resources to be accessed are determined by the definition of each plug-in in how it uses the Configuration Dataservice.

The behavior of the Configuration Dataservice is dependent upon the Resource structure for a plug-in. Each plug-in lists the valid resources, and the administrators can set permissions for the users who can view or modify these resources.

1. [Resource Scope](#resource-scope)
1. [REST API](#rest-api)
    1. [REST Query Parameters](#rest-query-parameters)
    1. [REST HTTP Methods](#rest-http-methods)
        1. [GET](#get)
        1. [PUT](#put)
        1. [DELETE](#delete)
    1. [Administrative Access & Group](#administrative-access-group)
1. [App API](#application-api)
1. [Internal and Bootstrapping](#internal-and-bootstrapping)
1. [Packaging Defaults](#packaging-defaults)
1. [Plugin Definition](#plug-in-definition)
1. [Aggregation Policies](#aggregation-policies)
1. [Examples](#examples)

## Resource Scope

Data is stored within the Configuration Dataservice according to the selected *Scope*. The intent of *Scope* within the Dataservice is to facilitate company-wide administration and privilege management of Zowe data.

When a user requests a resource, the resource that is retrieved is an override or an aggregation of the broader scopes that encompass the *Scope* from which they are viewing the data.

When a user stores a resource, the resource is stored within a *Scope* but only if the user has access privilege to update within that *Scope*.

*Scope* is one of the following:

**Plugin**

Configuration defaults that come with a plugin. Cannot be modified.

**Product** 

Configuration defaults that come with the product. Cannot be modified.

**Site**

Data that can be used between multiple instances of the Zowe Application Server.

**Instance**

Data within an individual Zowe Application Server.

**Group**

Data that is shared between multiple users in a group.(Pending)

**User**

Data for an individual user.(Pending)

**Note:** While Authorization tuning can allow for settings such as GET from Instance to work without login, *User* and *Group* scope queries will be rejected if not logged in due to the requirement to pull resources from a specific user. Because of this, *User* and *Group* scopes will not be functional until the Security Framework is merged into the mainline.

Where *Plugin* is the broadest scope and *User* is the narrowest scope.

When you specify *Scope* *User*, the service manages configuration for your particular username, using the authentication of the session. This way, the *User* scope is always mapped to your current username.

Consider a case where a user wants to access preferences for their text editor. One way they could do this is to use the REST API to retrieve the settings resource from the *Instance* scope.

The *Instance* scope might contain editor defaults set by the administrator. But, if there are no defaults in *Instance*, then the data in *Group* and *User* would be checked.

Therefore, the data the user receives would be no broader than what is stored in the *Instance* scope, but might have only been the settings they saved within their own *User* scope (if the broader scopes do not have data for the resource).

Later, the user might want to save changes, and they try to save them in the *Instance* scope. Most likely, this action will be rejected because of the preferences set by the administrator to disallow changes to the *Instance* scope by ordinary users.

## REST API

When you reach the Configuration Service through a REST API, HTTP methods are used to perform the desired operation.

The HTTP URL scheme for the configuration dataservice is:

`<Server>/plugins/com.rs.configjs/services/data/<plugin ID>/<Scope>/<resource>/<optional subresources>?<query>`

Where the resources are one or more levels deep, using as many layers of subresources as needed.

Think of a resource as a collection of elements, or a directory. To access a single element, you must use the query parameter "name="

### REST query parameters

**Name** (string) 

Get or put a single element rather than a collection.

**Recursive** (boolean) 

When performing a DELETE, specifies whether to delete subresources too.

**Listing** (boolean) 

When performing a GET against a resource with content subresources, `listing=true` will provide the names of the subresources rather than both the names and contents.

### REST HTTP methods

Below is an explanation of each type of REST call.

Each API call includes an example request and response against a hypothetical application called the "code editor".

#### GET

GET `/plugins/com.rs.configjs/services/data/<plugin>/<scope>/<resource>?name=<element>`

  * This returns JSON with the attribute "content" being a JSON resource that is the entire configuration that was requested. For example:

  ```/plugins/com.rs.configjs/services/data/org.openmainframe.zowe.codeeditor/user/sessions/default?name=tabs```

  The parts of the URL are:

  - Plugin: org.openmainframe.zowe.codeeditor
  - Scope: user
  - Resource: sessions
  - Subresource: default
  - Element = tabs

The response body is a JSON config:
```
{
	"_objectType" : "com.rs.config.resource",
	"_metadataVersion" : "1.1",
	"resource" : "org.openmainframe.zowe.codeeditor/USER/sessions/default",
	"contents" : {
		"_metadataVersion" : "1.1",
		"_objectType" : "org.openmainframe.zowe.codeeditor.sessions.tabs",
		"tabs" : [{
				"title" : "TSSPG.REXX.EXEC(ARCTEST2)",
				"filePath" : "TSSPG.REXX.EXEC(ARCTEST2)",
				"isDataset" : true
			}, {
				"title" : ".profile",
				"filePath" : "/u/tsspg/.profile"
			}
		]
	}
}
```

GET `/plugins/com.rs.configjs/services/data/<plugin>/<scope>/<resource>`

  This returns JSON with the attribute `content` being a JSON object that has each attribute being another JSON object, which is a single configuration element.

GET `/plugins/com.rs.configjs/services/data/<plugin>/<scope>/<resource>`

(When subresources exist.)

  This returns a listing of subresources that can, in turn, be queried.

#### PUT

PUT `/plugins/com.rs.configjs/services/data/<plugin>/<scope>/<resource>?name=<element>`

Stores a single element (must be a JSON object {...}) within the requested scope, ignoring aggregation policies, depending on the user privilege. For example: 

  ```/plugins/com.rs.configjs/services/data/org.openmainframe.zowe.codeeditor/user/sessions/default?name=tabs```

Body:

```
{
  "_metadataVersion" : "1.1",
  "_objectType" : "org.openmainframe.zowe.codeeditor.sessions.tabs",
  "tabs" : [{
      "title" : ".profile",
      "filePath" : "/u/tsspg/.profile"
    }, {
      "title" : "TSSPG.REXX.EXEC(ARCTEST2)",
      "filePath" : "TSSPG.REXX.EXEC(ARCTEST2)",
      "isDataset" : true
    }, {
      "title" : ".emacs",
      "filePath" : "/u/tsspg/.emacs"
    }
  ]
}

```
Response:

```
{
  "_objectType" : "com.rs.config.resourceUpdate",
  "_metadataVersion" : "1.1",
  "resource" : "org.openmainframe.zowe.codeeditor/USER/sessions/default",
  "result" : "Replaced item."
}
```

#### DELETE

DELETE `/plugins/com.rs.configjs/services/data/<plugin>/<scope>/<resource>?recursive=true`

  Deletes all files in all leaf resources below the resource specified.

DELETE `/plugins/com.rs.configjs/services/data/<plugin>/<scope>/<resource>?name=<element>`

  Deletes a single file in a leaf resource.

DELETE `/plugins/com.rs.configjs/services/data/<plugin>/<scope>/<resource>`

  * Deletes all files in a leaf resource.
  * Does not delete the directory on disk.


### Administrative access and group

By means not discussed here, but instead handled by the server's authentication and authorization code, a user might be privileged to access or modify items that they do not own.

In the simplest case, it might mean that the user is able to do a PUT, POST, or DELETE to a level above *User*, such as *Instance*.

The more interesting case is in accessing another user's contents. In this case, the shape of the URL is different. Compare the following two commands:

GET `/plugins/com.rs.configjs/services/data/<plugin>/user/<resource>`

Gets the content for the current user.

GET `/plugins/com.rs.configjs/services/data/<plugin>/users/<username>/<resource>`

Gets the content for a specific user if authorized.

This is the same structure that is used for the *Group* scope. When requesting content from the *Group* scope, the user is checked to see if they are authorized to make the request for the specific group. For example:

GET `/plugins/com.rs.configjs/services/data/<plugin>/group/<groupname>/<resource>`

Gets the content for the given group, if the user is authorized.


## Application API

Retrieves and stores configuration information from specific scopes. 

**Note:** This API should only be used for configuration administration user interfaces.

`ZLUX.UriBroker.pluginConfigForScopeUri(pluginDefinition: ZLUX.Plugin, scope: string, resourcePath:string, resourceName:string): string;`

A shortcut for the preceding method, and the preferred method when you are retrieving configuration information, is simply to "consume" it. It "asks" for configurations using the *User* scope, and allows the configuration service to decide which configuration information to retrieve and how to aggregate it. (See below on how the configuration service evaluates what to return for this type of request).

`ZLUX.UriBroker.pluginConfigUri(pluginDefinition: ZLUX.Plugin, resourcePath:string, resourceName:string): string;`

## Internal and bootstrapping

Some dataservices within plug-ins can take configuration that affects their behavior. This configuration is stored within the Configuration Dataservice structure, but it is not accessible through the REST API.

Within the instance configuration directory of a zLUX installation, each plugin may optionally have an `_internal` directory. An example of such a path would be:

`~/.zowe/workspace/app-server/ZLUX/pluginStorage/<pluginName>/_internal`

Within each `_internal` directory, the following directories might exist:

* `services/<servicename>`: Configuration resources for the specific service.
* `plugin`: Configuration resources that are visible to all services in the plug-in.

The JSON contents within these directories are provided as Objects to dataservices through the dataservice context Object.

## Packaging Defaults
The best way to provide default settings for a plugin is to include it as part of the plugin's package.  
It's easy to distribute to users, requires no configuration steps, and is read-only from the server.  
To package, all content must be stored within the `/config/storageDefaults` directory of your plugin.  
Within, non-leaf resources are folders, and leaf resources are files, regardless of JSON or binary.  
The `_internal` folder and content is also permitted.

## Plug-in definition

Because the Configuration Dataservices stores data on a per-plug-in basis, each plug-in must define their resource structure to make use of the Configuration Dataservice. The resource structure definition is included in the plug-in's `pluginDefinition.json` file.

For each resource and subresource, you can define an `aggregationPolicy` to control how the data of a broader scope alters the resource data that is returned to a user when requesting a resource from a narrower Scope.

For example:
```
  "configurationData": { //is a direct attribute of the pluginDefinition JSON
    "resources": { //always required
      "preferences": {
        "locationType": "relative", //this is the only option for now, but later absolute paths may be accepted
        "aggregationPolicy": "override" //override and none for now, but more in the future
      },
      "sessions": { //the name at this level represents the name used within a URL, such as /plugins/com.rs.configjs/services/data/org.openmainframe.zowe.codeeditor/user/sessions
        "aggregationPolicy": "none",
        "subResources": {
          "sessionName": {
            "variable": true, //if variable=true is present, the resource must be the only one in that group but the name of the resource is substituted for the name given in the REST request, so it represents more than one
            "aggregationPolicy": "none"
          }
        }
      }
    }
  }
```

## Aggregation policies

Aggregation policies determine how the Configuration Dataservice aggregates JSON objects from different Scopes together when a user requests a resource. If the user requests a resource from the *User* scope, the data from the User scope might replace or be merged with the data from a broader scope such as *Instance*, to make a combined resource object that is returned to the user.

Aggregation policies are defined by a plug-in developer in the plug-in's definition for the Configuration Service, as the attribute `aggregationPolicy` within a resource.

The following policies are currently implemented:

* **NONE**: If the Configuration Dataservice is called for *Scope User*, only user-saved settings are sent, unless there are no user-saved settings for the query, in which case the dataservice attempts to send data that is found at a broader scope.

* **OVERRIDE**: The Configuration Dataservice obtains data for the resource that is requested at the broadest level found, and joins the resource's properties from narrower scopes, overriding broader attributes with narrower ones, when found.


## Examples

  [zlux-app-manager](https://github.com/zowe/zlux-app-manager/tree/v2.x/master/bootstrap/src/uri/mvd-uri.ts)
  [VT Terminal App](https://github.com/zowe/vt-ng2/blob/v2.x/master/webClient/src/app/app.component.ts)
