# Authentication API
This topic describes the web service API for user authentication. 

The authentication mechanism of the ZLUX server allows for an administrator to gate access to services by a given auth handler, while on the user side the authentication structure allows for a user to login to one or more endpoints at once provided they share the same credentials given.

## Handlers

The auth handlers are a type of zlux server plugin (type=nodeAuthentication) which are categorized by which kind of authentication they can provide. Whether it's to z/OS via `type=saf` or theoretical authentication such as Facebook or Amazon cloud, the handler API is abstract to handle different types of security needs.

### Handler installation

Auth handler plugins are installed like any other plugin.

### Handler configuration

The server top-level configuration attribute `dataserviceAuthentication` states properties about which plugins to use and how to use them.

For example,
```json
  "dataserviceAuthentication": {
    "defaultAuthentication": "saf",
    "rbac": true
  }
```

The `dataserviceAuthentication` attribute has the following properties:

* defaultAuthentication: Which authentication category to choose by default, in case multiple are installed.
* rbac: Whether or not the server should do authority checks in addition to authentication checks when requesting a dataservice.


### Handler context

These plugins are given an object, `context`, in the constructor.
Context has attributes to help the plugin know about the server configuration, provide a named logger, and more. The parameters include:

* pluginDefinition: The object describing the plugin's definition file
* pluginConf: An object that gives the plugin its configuration from the [Config Service internal storage](mvd-configdataservice.md#internal-and-bootstrapping)
* serverConfiguration: The object describing the server's current configuration
* context: An object holding contextual objects
    * logger: A logger with the name of the plugin's ID

### Handler capabilities

A handler's constructor should return a capabilities object that states which capabilities the plugin has.
If a capabilities object is not returned, it is assumed that only the authenticate and authorize functions are implemented, for backward compatibility support.
The capabilities object should include:

* canGetCategories: (true/false) If the getCategories() function exists, which returns a string array of categories of auth the plugin can support given the server context. This is useful if the plugin can support multiple categories conditionally.
* canLogout: (true/false) If the logout(request, sessionState) function exists. Used to clear state and cookies when a session should be ended.
* canGetStatus: (true/false) If the getStatus(sessionState) function exists
* canRefresh: (true/false) If the refreshStatus(request, sessionState) function exists, which is used to renew a session that has an expiration limit.
* canAuthenticate: (true/false) If the authenticate(request, sessionState):Promise function exists (Required, assumed)
* canAuthorized: (true/false) If the *authorized(request, sessionState, options) function exists (Required, assumed)
* haCompatible: (true/false) Used to be sure that a plugin has no state that would be lost in a high availibility environment.
* canGenerateHaSessionId: (true/false) If generateHaSessionId(request) exists, which is used to set the value used for an app-server session for a user. When not in a high availability environment, the app-server generates its own session ID.
* canResetPassword: (true/false) If passwordRest(request, sessionState) exists
* proxyAuthorizations: (true/false) If the addProxyAuthorizations(req1, req2Options, sessionState) function exists

### Examples

sso-auth, which conditionally implements the saf, zss, and apiml security types: https://github.com/zowe/zlux-server-framework/tree/v2.x/master/plugins/sso-auth

### High availability (HA)

Some auth handlers are not capable of working in a high availability environment.
In these environments, there can be multiple zlux servers and there may not be a safe and secure way to share session state data.
This extends to the zlux server cookie as well, which is not sharable between multiple servers by default.
Therefore, high availability has the following two requirements from an auth handler plugin:
1) The plugin must state that it is HA capable by setting the capability flag `haCompatible=true`, usually indicating that the plugin has no state data.
2) A plugin must have capability `canGenerateHaSessionId=true` so that the zlux server cookie is sharable between multiple zlux servers.


## REST API

### Check status
Returns the current authentication status of the user to the caller.

```
GET /auth
```

Response example:

```
{
  "categories": {
    "zss": { 
      "authenticated": true,
      "plugins": {
        "org.zowe.zlux.auth.safsso": {
          "authenticated": true,
          "username":"foo",
          "expms": 60000
        }
      }
    },
    "zosmf": {
      "authenticated": false,
      "plugins": {
        "org.zowe.zlux.auth.zosmf": {
          "authenticated": false
        }
      }
    }
  }
}
```

Every key in the response object is a registered auth type. The value object is guaranteed to have a Boolean field named "authenticated" which indicates that at least one plugin in the category was able to authenticate the user.

Each item also has a field called "plugins", where every property value is a plugin-specific object.

## Authenticate
Authenticates the user against authentication back-ends.

```
POST /auth
```

Request body example:

```
{
  "categories": ["zosmf"],
  "username": "foo",
  "password": "1970-01-01"
}
```
The categories parameter is optional. If omitted, all auth plugins are invoked with the username and password Response example:
```
{
  "success": true,
  "categories": {
    "saf": {
      "success": true,
      "plugins": {
        "org.zowe.zlux.auth.safsso": {
          "success": true
          "username":"foo",
          "expms": 60000
        }
      }
    },
    "zosmf": {
      "success": true,
      "plugins": {
        "org.zowe.zlux.auth.zosmf": {
          "success": true
        }
      }
    }
  }
}
```
First-level keys are authentication categories or types. "success" means that all of the types requested have been successful. For example typeA successful AND typeB successful AND ...

Second-level keys are auth plugin IDs. "success" on this level means that there's at least one successful result in that auth type. For example, pluginA successful OR pluginB successful OR ...

## User not authenticated or not authorized
The response received by the browser when calling any service, when the user is either not authenticated or not allowed to access the service.

### Not authenticated
```
HTTP 401

{
  "category": "saf",
  "pluginID": "org.zowe.zlux.auth.safsso",
  "result": {
    "authenticated": false,
    "authorized": false,
    "reason": "a category of success or error may appear here",
    "reasonseCode": "ZSS 401 or other codes may appear here",
    "error": {
      "message": "an error message may appear here"
    }
  }
}
```
The client is supposed to address this by showing the user a login form which will later invoke the login service for the plugin mentioned and repeat the request.

### Not authorized
```
HTTP 403

{
  "category": "saf",
  "pluginID": "org.zowe.zlux.auth.safsso",
  "result": {
    "authenticated": true,
    "authorized": false
  }
}
```
There's no general way for the client to address this, except than show the user an error message.


### Refresh status
If you have an active session, some auth plugins may be able to renew the session.
Not all plugins support this action, so while the call may return successful, if there is an associated expiration time you may notice that the expiration time has not changed or been reset.

```
GET /auth-refresh
```

Response example:
```
{
  "success": true,
  "categories": {
    "saf": {
      "success": true,
      "plugins": {
        "org.zowe.zlux.auth.safsso": {
          "success": true
          "username":"foo",
          "expms": 60000
        }
      }
    }
  }
}
```

### Logout
When you have an active session, you can terminate it early with a logout. This should remove cookies and tell the server to clear any cache it had about a session.

```
POST /auth-logout
```


### Password changes
Some auth plugins will allow you to change your password. Depending on the backing security (such as SAF), you may need to provide your current password to change it.

```
POST /auth-password
```
