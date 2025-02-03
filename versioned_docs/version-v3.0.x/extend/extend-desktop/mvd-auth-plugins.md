ZLUX has a security system that can determine whether users should be permitted to do certain actions by running checks for user authenticity and authority that are relevant to the environment. It does this by providing an API such that security plugins can be installed to answer requests for authentication & authorization. This way, regardless of what security manager or operating system ZLUX is running on, the rules of that security manager can be respected & leveraged. 

An example of this is that in past releases of Zowe, ZLUX has been configured to utilize either ZSS, API Mediation Layer, or z/OSMF to determine if a user's credentials are valid and if they are able to call a given REST API.

# Server Configuration
ZLUX will not run without a security plugin being configured. Within the server configuration file, a section `dataserviceAuthentication` exists which describes which plugin(s) to use, and which one is the default. Several can be used, as different plugins/services can be protected by different security plugins.

`dataserviceAuthentication` has the following attributes within:

* defaultAuthentication: The name of the security plugin type that should be used for all plugins unless otherwise specified.
* rbac: A boolean that security plugins can utilize to determine whether the configuration should use role-based authorization control. Currently the `org.zowe.zlux.auth.zss` plugin uses this.


## Example

The following configuration for the server security can be added in zowe configuration file under `components.app-server`:

```
components:
  app-server:
    dataserviceAuthentication:
      rbac: false
      defaultAuthentication: zss   
```


# Security Plugin API
Security plugins are plugins which have nodeJS code that the server can call to delegate security operations.

## Constructor
The constructor is currently given 4 parameters:
* pluginDefinition: The object describing the plugin's definition file
* pluginConf: An object that gives the plugin it's configuration from the [Config Service internal storage](https://github.com/zowe/zlux/wiki/Configuration-Dataservice#internal--bootstrapping-use)
* serverConfiguration: The object describing the server's current configuration
* context: An object holding contextual objects
    * logger: A logger with the name of the plugin's ID

### Constructor return object
The constructor should return a capabilities object, which helps the server to know what sort of security operations it can handle. Currently, the following properties are used in the capabilities object.
* canGetStatus: If the getStatus(sessionState) function exists
* canRefresh: If the refreshStatus(request, sessionState) function exists
* canAuthenticate: If the authenticate(request, sessionState):Promise function exists (Required, assumed)
* canAuthorized: If the *authorized(request, sessionState, options) function exists (Required, assumed)
* proxyAuthorizations: If the addProxyAuthorizations(req1, req2Options, sessionState) function exists
