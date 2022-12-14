# Authentication API
This topic describes the web service API for user authentication. 

The authentication mechanism of the ZLUX server allows for an administrator to gate access to services by a given auth handler, while on the user side the authentication structure allows for a user to login to one or more endpoints at once provided they share the same credentials given.

## Check status
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
        "org.zowe.zlux.auth.zss": {
          "authenticated": true,
          "username":"foo"
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
    "zss": {
      "success": true,
      "plugins": {
        "org.zowe.zlux.auth.zss": {
          "success": true
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
  "category": "zss",
  "pluginID": "org.zowe.zlux.auth.zss",
  "result": {
    "authenticated": false,
    "authorized": false
  }
}
```
The client is supposed to address this by showing the user a login form which will later invoke the login service for the plugin mentioned and repeat the request.

### Not authorized
```
HTTP 403

{
  "category": "zss",
  "pluginID": "org.zowe.zlux.auth.zss",
  "result": {
    "authenticated": true,
    "authorized": false
  }
}
```
There's no general way for the client to address this, except than show the user an error message.