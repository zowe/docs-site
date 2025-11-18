# ZSS configuration

ZSS provides APIs that any server or client can use. By default, the Zowe Desktop includes Apps which rely upon ZSS APIs, and therefore it's recommended that whenever the `app-server` is enabled in the Zowe YAML, that `zss` is also enabled.


### ZSS 64 or 31 bit modes

Two versions of ZSS are included in Zowe, a 64 bit version and a 31 bit version. It is recommended to run the 64 bit version to conserve shared system memory but you must match the ZSS version with the version your ZSS plugins support. Official Zowe distributions contain plugins that support both 64 bit and 31 bit, but extensions may only support one or the other.

#### Verifying which ZSS mode is in use

You can check which version of ZSS you are running by looking at the logs. At startup, the message ZWES1013I states which mode is being used, for example:

`ZWES1013I ZSS Server has started. Version 3.0.0 64-bit`

Or

`ZWES1013I ZSS Server has started. Version 3.0.0 31-bit`

#### Verifying which ZSS mode plugins support

You can check if a ZSS plugin supports 64 bit or 31 bit ZSS by reading the pluginDefinition.json file of the plugin.
In each component or extension you have, its manifest file will state if there are `appFw` plugin entries.
In each folder referenced by the `appFw` section, you will see a pluginDefinition.json file.
Within that file, if you see a section that says `type: 'service'`, then you can check its ZSS mode support.
If the service has the property `libraryName64`, then it supports 64 bit. If it says `libraryName31`, then it supports 31 bit. Both may exist if it supports both. If it instead only contains `libraryName`, this is ambigious and deprecated, and most likely that plugin only supports 31 bit ZSS. A plugin only supporting 31 bit ZSS must be recompiled for 64 bit support, so you must contact the developers to accomplish that.

Example: [the sample angular app supports both 31 bit and 64 bit zss](https://github.com/zowe/sample-angular-app/blob/083855582e8a82cf48abc21e15fa20bd59bfe180/pluginDefinition.json#L50-L53)

#### Setting ZSS 64 bit or 31 bit mode

You can switch between ZSS 64 bit and 31 bit mode by setting the value `components.zss.agent.64bit` to true or false in the Zowe configuration file. The value will not take effect until next server restart.

#### Customizing ZSS session duration

In a standard Zowe installation, all Zowe servers utilize the API Mediation Layer's token-based, single-sign on authentication. This authentication in turn cooperates with z/OSMF, and the session duration is typically that of z/OSMF's, which defaults to 8 hours before the session expires.  In that situation, customization of session duration is best done by customizing z/OSMF's session duration, as a part of its Liberty configuration.

If you are not using the API Mediation Layer, or are trying to contact ZSS directly, then ZSS's own session logic is used. When authenticated directly to ZSS, it will respond to authenticated HTTP requests with a cookie which is valid by default for 1 hour. This can be customized by creating and editing a file named "timeouts.json" within ZSS's instance directory. The default location is `<zowe.workspaceDirectory>/app-server/serverConfig/timeouts.json`, because the default instance directory is `<zowe.workspaceDirectory>/app-server`, but can be customized by editing the value of `components.zss.instanceDir`.

The timeouts.json file has the following layout:

```
{
  "users": {
    "zoweuser1": 3600
  },
  "groups": {
    "developers": 7200
  }
}
```

Where you can have a "users" section that lists user accounts on the z/OS system, and "groups" section that lists groups on that system.
The numbers for each entry are in seconds, where in the example `zoweuser1` has the default session duration value of 1 hour.
It is possible that a user specified in this file is also in a group specified in this file. If so, the user value takes priority.
If a user authenticates to ZSS and their user or group is not found in this file, then the default value of 1 hour is used.
If this file is missing, Zowe will print a message about it missing, but it does not harm Zowe as the default value of 1 hour would be used for all direct authentications to ZSS.


