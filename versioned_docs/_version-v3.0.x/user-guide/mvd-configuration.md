# Advanced Application Framework Configuration

The Zowe Application ("App") Framework is configured in the Zowe configuration file. Configuration can be used to change things such as verbosity of logs, the way in which the App server communicates with the Mediation Layer, how ZSS operates, whether to use HTTPS or AT-TLS, what language the logs should be set, and many more attributes.

When you install Zowe&trade;, the App Framework is configured as a Mediation Layer client by default. This is simpler to administer because the App framework servers are accessible externally through a single port: API ML Gateway port. It is more secure because you can implement stricter browser security policies for accessing cross-origin content.

You can modify the Zowe App Server and Zowe System Services (ZSS) configuration, as needed, or configure connections for the Terminal app plugins.

## Accessing ZSS

The `zss` server should be accessed  through the `gateway` when both are present. When both are ready, ZSS can be accessed from the API Mediation Layer Gateway, such as

`https://<zowe.externalDomain>:<components.gateway.port>/zss/api/v1/`.

Although you access the ZSS server via the Gateway port, the ZSS server still needs a port assigned to it which is the value of the *components.zss.port* variable in the Zowe configuration file.

If the mediation layer is not used, ZSS directly at `https://<zowe.externalDomain>:<components.zss.port>/`.

## Configuration file

### app-server configuration

The app-server uses the Zowe server configuration file for customizing server behavior. For a full list of parameters, requirements, and descriptions, see [the json-schema document for the app-server](https://github.com/zowe/zlux-app-server/blob/v3.x/staging/schemas/app-server-config.json) which describes attributes that can be specified within the configuration file section `components.app-server`

### zss configuration

ZSS shares some parameters in common with the app-server, so you can consult the above json-schema document to find out which parameters are valid within `components.zss` of the Zowe configuration file. However, some parameters within the app-server schema are not used by ZSS, such as the `node` section. A ZSS-centric schema will be available soon.


## Configuring the framework as a Mediation Layer client

The App Server and ZSS automatically register to the API Mediation Layer when present.
If this is not desired, registration can disabled by setting the properties `components.app-server.mediationLayer.server.enabled=false` for app-server and `components.zss.mediationLayer.enabled=false` for ZSS.

## Setting up terminal app plugins

Follow these optional steps to configure the default connection to open for the terminal app plugins.

### Setting up the TN3270 mainframe terminal app plugin

The file `_defaultTN3270.json` within the `tn3270-ng2` app folder `/config/storageDefaults/sessions/` is deployed to the [configuration dataservice](../extend/extend-desktop/mvd-configdataservice.md) when the app-server runs for the first time. This file is used to tell the terminal what host to connect to by default. If you'd like to customize this default, you can edit the file directly within the configuration dataservice `<components.app-server.instanceDir>/org.zowe.terminal.tn3270/sessions/_defaultTN3270.json`. Or you can open the app, customize a session within the UI, click the save icon (floppy icon) and then copy that file from `<components.app-server.usersDir>/<your user>/org.zowe.terminal.tn3270/sessions/_defaultTN3270.json` to `<components.app-server.instanceDir>/org.zowe.terminal.tn3270/sessions/_defaultTN3270.json`. Either way, you will see a file with the following properties:

```
  "host": <hostname>
  "port": <port>
  "security": {
    type: <"telnet" or "tls">
  }
```

### Setting up the VT Terminal app plugin

The file `_defaultVT.json` within the `vt-ng2` app folder `/config/storageDefaults/sessions/` is deployed to the [configuration dataservice](../extend/extend-desktop/mvd-configdataservice.md) when the app-server runs for the first time. This file is used to tell the terminal what host to connect to by default. If you'd like to customize this default, you can edit the file directly within the configuration dataservice `<components.app-server.instanceDir>/org.zowe.terminal.vt/sessions/_defaultVT.json`. Or you can open the app, customize a session within the UI, click the save icon (floppy icon) and then copy that file from `<components.app-server.usersDir>/<your user>/org.zowe.terminal.vt/sessions/_defaultVT.json` to `<components.app-server.instanceDir>/org.zowe.terminal.vt/sessions/_defaultVT.json`. Either way, you will see a file with the following properties:

```
  "host":<hostname>
  "port":<port>
  "security": {
    type: <"telnet" or "ssh">
  }
```

## Network configuration

**Note:** The following attributes are to be defined in the Zowe configuration file.

The App Server and ZSS both can be accessed over HTTPS, either natively or via AT-TLS by setting appropriate AT-TLS rules and Zowe YAML assignments. When using native HTTPS, the TLS properties can be further customized within the YAML.

### Port configuration

The Zowe YAML property `components.<component-name>.port` can be used to set the port for any Zowe server. By default, the following is used but can be overridden:

```yaml
components:
  app-server:
    port: 7556
  zss:
    port: 7557
```

### IP configuration

By default, all Zowe servers listen on the IP address `0.0.0.0`. This can be customized.
The Zowe YAML property `zowe.network.server.tls.listenAddresses` can be used to instruct both `app-server` and `zss` of which IP to listen on. This property can be nested within each component if it is desired to customize them individually. Alternatively, TCPIP port rules can be used to control the assignment of `0.0.0.0` into a particular alternative IP address.
[You can read more about this in the network requirements page](./address-network-requirements.md).

### AT-TLS

You can instruct Zowe servers to expect TLS using the property `zowe.network.server.tls.attls: true`. This is for setting AT-TLS for all the Zowe servers. For more granular control, you can set the following:

```yaml
components:
  app-server:
    zowe:
      network:
        server:
          tls:
            attls: true
        client:
          tls:
            attls: true
```

Which would instruct only the `app-server` Component to expect AT-TLS for both inbound and outbound traffic. The same configuration can be done for `zss`, though `zowe.network.server.tls.attls: true` is a simplified way to instruct both servers to expect AT-TLS altogether. For more information, see [Configuring AT-TLS for Zowe server](./configuring-at-tls-for-zowe-server.md).

#### AT-TLS Rule Suggestions

The `app-server` and `zss` Components of Zowe are servers that may accept incoming connections from each other, other Zowe servers, and clients outside z/OS such as browsers either directly or indirectly such as when APIML is used.

Due to this, both Inbound and Outbound direction AT-TLS rules are needed for these servers.
The Inbound rules can be filtered by the listening ports of the servers, but Outbound rules may need to be set by either jobnames or destination ports.



The ports and jobnames can be found in the [Addressing network requirements](./address-network-requirements.md) documentation.

The Outbound rules can have HandshakeRole of Client, but when APIML is enabled, it is required that `app-server` and `zss` include their server certificates as client certificates using the `CertificateLabel` property of a `TTLSConnectionAdvancedParms` rule. For more information, see [Configuring AT-TLS for Zowe server](./configuring-at-tls-for-zowe-server.md#for-communication-between-api-gateway-and-other-core-services).

The Inbound rules can have a HandshakeRole of Server or ServerWithClientAuth.



### Native TLS

The configuration object `zowe.network.server.tls` and `zowe.network.client.tls` can be set to control all Zowe components, or just `app-server` or `zss` but nesting the object within them. This object can control ciphers by listing IANA cipher names, minimum and maximum TLS levels, and for some servers even curves can be customized via a list.

An example for configuration is given below, but the specification for all options is found [within the Zowe YAML schema](https://github.com/zowe/zowe-install-packaging/blob/fdcdb2618080cf87031c070aed7e90503699ab5f/schemas/zowe-yaml-schema.json#L939)

```yaml
zowe:
  network:
    server:
      tls: # This sets all servers to default only to use TLSv1.3, with only specific ciphers
        minTls: "TLSv1.3"
        maxTls: "TLSv1.3"
        ciphers:
        - "TLS_AES_128_GCM_SHA256"
        - "TLS_AES_256_GCM_SHA384"
components:
  app-server:
    zowe:
      network:
        client:
          tls: # This customizes the app-server specifically to have a different minimum TLS for client requests
            minTls: "TLSv1.2"
```


## Configuration Directories
When running, the App Server will access the server's settings and read or modify the contents of its resource storage. All of this data is stored within a hierarchy of folders which correspond to scopes:

- Product: The contents of this folder are not meant to be modified, but used as defaults for a product.
- Site: The contents of this folder are intended to be shared across multiple App Server instances, perhaps on a network drive.
- Instance: This folder represents the broadest scope of data within the given App Server instance.
- Group: Multiple users can be associated into one group, so that settings are shared among them.
- User: When authenticated, users have their own settings and storage for the Apps that they use.

These directories dictate where the Configuration Dataservice will store content. For more information, see the [Configuration Dataservice documentation](../extend/extend-desktop/mvd-configdataservice.md)


## App plugin configuration

The App framework will load plugins from Components such as extensions based upon their enabled status in Zowe configuration. The server caches knowledge of these plugins in the `<workspaceDirectory>/app-server/plugins` folder. This location can be customized with the *components.app-server.pluginsDir* variable in the Zowe configuration file.

## Logging configuration

For more information, see [Logging Utility](../extend/extend-desktop/mvd-logutility.md).

### Enabling tracing

To obtain more information about how a server is working, you can enable tracing within the Zowe configuration file via *components.app-server.logLevels* or *components.zss.logLevels* variable. For more information on all loggers, check out the [Extended documentation](../extend/extend-desktop/mvd-core-loggers.md).

For example:

```
app-server:
    {...}
    logLevels:
      _zsf.routing: 0
      _zsf.install: 0
```

```
zss:
    {...}
    logLevels:
      _zss.traceLevel: 0
      _zss.fileTrace: 1
```

All settings are optional.

### Log files

The app-server and zss will create log files containing processing messages and statistics. The log files are generated within the log directory specified within the Zowe configuration file  (`zowe.logDirectory`). The filename patterns are:

- App Server: `<zowe.logDirectory>/appServer-yyyy-mm-dd-hh-mm.log`
- ZSS: `<zowe.logDirectory>/zssServer-yyyy-mm-dd-hh-mm.log`

#### Retaining logs

By default, the last five log files are retained. You can change this by setting environment variables within the `zowe.environments` section of the Zowe server configuration file. To specify a different number of logs to retain, set `ZWED_NODE_LOGS_TO_KEEP` for app-server logs, or *ZWES_LOGS_TO_KEEP* for zss logs. For example, if you set `ZWED_NODE_LOGS_TO_KEEP` to 10, when the eleventh log is created, the first log is deleted.

#### Controlling the logging location

At minimum, the log information for both app-server and zss are written to STDOUT such that messages are visible in the terminal that starts Zowe and when on z/OS, the STC job log.

By default, both servers additionally log to files and the location of these files can be changed or logging to them can be disabled.
The following environment variables can be used to customize the app-server and zss log locations by setting the values within the `zowe.environments` section of the Zowe configuration file.

* `ZWED_NODE_LOG_DIR`: Overrides the zowe configuration file value of `zowe.logDirectory` for app-server, but keeps the default filenames.
* `ZWES_LOG_DIR`: Overrides the zowe configuration file value of `zowe.logDirectory` for zss, but keeps the default filenames.
* `ZWED_NODE_LOG_FILE`: Specifies the full path to the file where logs will be written from app-server. This overrides both `ZWED_NODE_LOG_DIR` and `zowe.logDirectory`. If the path is `/dev/null` then no log file will be written. This option does not timestamp logs or keep multiple of them.
* `ZWES_LOG_FILE`: Specifies the full path to the file where logs will be written from zss. This overrides both `ZWES_LOG_DIR` and `zowe.logDirectory`. If the path is `/dev/null` then no log file will be written. This option does not timestamp logs or keep multiple of them.

If the directory or file specified cannot be created, the server will run (but it might not perform logging properly).


## ZSS configuration

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


## Using multiple ZIS instances
When you install Zowe, it is ready to be used for 1 instance of each component. However, ZIS can have a one-to-many relationship with the Zowe webservers, and so you may wish to have more than one copy of ZIS for testing or to handle different groups of ZIS plugins.

The following steps can be followed to point a Zowe instance at a particular ZIS server.

1. [Create a copy of the ZIS server](https://docs.zowe.org/stable/user-guide/configure-xmem-server). You could run multiple copies of the same code by having different STC JCLs pointing to the same LOADLIB, or run different copies of ZIS by having JCLs pointing to different LOADLIBs.

2. Edit the JCL of the ZIS STC. In the  `NAME` parameter specify a unique name for the ZIS server, for example:

      ```
      //ZWESIS02  PROC NAME='ZWESIS_MYSRV',MEM=00,RGN=0M
      ```

      Where `ZWESIS_MYSRV` is the unique name of the new ZIS.

3. [Start the new ZIS](https://docs.zowe.org/stable/user-guide/configure-xmem-server#starting-and-stopping-the-cross-memory-server-on-zos) with whatever PROCLIB name was chosen.

4. [Stop the Zowe instance you wish to point to the ZIS server](../user-guide/start-zowe-zos.md).

5. Locate the zowe configuration file for the Zowe instance, and edit the parameter `components.zss.privilegedServerName` to match the name of the ZIS STC name chosen, such as `ZWESIS_MYSRV`

6. [Restart the Zowe instance](../user-guide/start-zowe-zos/#starting-and-stopping-zowe-main-server-zweslstc-on-zos-with-zwe-server-command)

7.  Verify that the new ZIS server is being used by checking for the following messages in the `ZWESLSTC` server job log:

   `ZIS status - Ok (name='ZWESIS_MYSRV    ', cmsRC=0, description='Ok', clientVersion=2)`


## Controlling access to apps

You can control which apps are accessible (visible) to all Zowe desktop users, and which are accessible only to individual users. For example, you can make an app that is under development only visible to the team working on it.

You control access by editing JSON files that list the apps. One file lists the apps all users can see, and you can create a file for each user. When a user logs into the desktop, Zowe determines the apps that user can see by concatenating their list with the all users list.

You can also control access to the JSON files. The files are accessible directly on the file system, and since they are within the configuration dataservice directories, they are also accessible via REST API. We recommend that only Zowe administrators be allowed to access the file system locations, and you control that by setting the directories and their contents to have file permissions on z/OS that only allow the Zowe admin group read & write access. You control who can read and edit the JSON files through the REST API by controlling who can [access the configuration dataservice objects](mvd-configuration.md#creating-authorization-profiles) URLs that serve the JSON files.

### Enabling RBAC

By default, RBAC is disabled and all authenticated Zowe users can access all dataservices. To enable RBAC, follow these steps:

1. To enable RBAC, set the *components.zss.dataserviceAuthentication.rbac* and *components.app-server.dataserviceAuthentication.rbac* variables to `true` in the Zowe configuration file.

### Controlling app access for all users

**Note:**
- `<zowe.runtimeDirectory>` variable comes from the Zowe configuration file.

1. Enable RBAC.

2. Navigate to the following location:
   ```
   <zowe.runtimeDirectory>/components/app-server/share/zlux-app-server/defaults/ZLUX/pluginStorage/org.zowe.zlux.bootstrap/plugins
   ```
3. Copy the `allowedPlugins.json` file and paste it in the following location:
   ```
   <zowe.workspaceDirectory>/app-server/ZLUX/pluginStorage/org.zowe.zlux.bootstrap/plugins
   ```
4. Open the copied `allowedPlugins.json` file and perform either of the following steps:
    - To make an app unavailable, delete it from the list of objects.
    - To make an app available, copy an existing plugin object and specify the app's values in the new object. Identifier and version attributes are required.

5. [Restart the app server](start-zowe-zos.md).

### Controlling app access for individual users

1. Enable RBAC.

2. In the user's ID directory path, in the `\pluginStorage` directory, create `\org.zowe.zlux.bootstrap\plugins` directories. For example:
    ```
    <zowe.workspaceDirectory>/app-server/ZLUX/pluginStorage/org.zowe.zlux.bootstrap/plugins
    ```

3. In the `/plugins` directory, create an `allowedPlugins.json` file. You can use the default `allowedPlugins.json` file as a template by copying it from the following location:
   ```
   <zpwe.runtimeDirectory>/components/app-server/share/zlux-app-server/defaults/ZLUX/pluginStorage/org.zowe.zlux.bootstrap/plugins
   ```
6. Open the `allowedPlugins.json` file and specify apps that user can access. For example:
    ```json
    {
      "allowedPlugins": [
        {
          "identifier": "org.zowe.appA",
          "versions": [
            "1.1"
          ]
        },
        {
          "identifier": "org.zowe.appB",
          "versions": [
            "*"
          ]
        },
    }
    ```

    **Notes:**
    - Identifier and version attributes are required.
    - When a user logs in to the desktop, Zowe determines which apps they can see by concatenating the list of apps available to all users with the apps available to the individual user.

6. [Restart the app server](start-zowe-zos.md).


## Controlling access to dataservices
To apply role-based access control (RBAC) to dataservice endpoints, you must enable RBAC for Zowe, and then use a z/OS security product such as RACF to map roles and authorities to the endpoints. After you apply RBAC, Zowe checks authorities before allowing access to the endpoints.

You can apply access control to Zowe endpoints and to your app endpoints. Zowe provides endpoints for a set of configuration dataservices and a set of core dataservices. Apps can use [configuration endpoints](../extend/extend-desktop/mvd-configdataservice.md#configuration-dataservice) to store and their own configuration and other data. Administrators can use core endpoints to [get status information](mvd-configuration.md#administering-the-servers-and-plugins-using-an-api) from the App Framework and ZSS servers. Any dataservice added as part of an app plugin is a service dataservice.

### Creating authorization profiles
For users to access endpoints after you enable RBAC, in the ZOWE class you must create System Authorization Facility (SAF) profiles for each endpoint and give users READ access to those profiles.

Endpoints are identified by URIs in the following format:

`/ZLUX/plugins/<plugin_id>/services/<service>/<version>/<path>`

For example:

`/ZLUX/plugins/org.zowe.foo/services/baz/_current/users/fred`

Where the path is `/users/fred`.

SAF profiles have the following format:

`ZLUX.<zowe.rbacProfileIdentifier>.<servicename>.<pluginid_with_underscores>.<service>.<HTTP_method>.<url_with_forward_slashes_replaced_by_periods>`

For example, to issue a POST request to the dataservice endpoint documented above, users must have READ access to the following profile:

`ZLUX.1.SVC.ORG_ZOWE_FOO.BAZ.POST.USERS.FRED`

For configuration dataservice endpoint profiles use the service code `CFG`. For core dataservice endpoints use `COR`. For all other dataservice endpoints use `SVC`.

### Creating generic authorization profiles
Some endpoints can generate an unlimited number of URIs. For example, an endpoint that performs a DELETE action on any file would generate a different URI for each file, and users can create an unlimited number of files. To apply RBAC to this type of endpoint you must create a generic profile, for example:

`ZLUX.1.COR.ORG_ZOWE_FOO.BAZ.DELETE.**`

You can create generic profile names using wildcards, such as asterisks (*). For information on generic profile naming, see [IBM documentation](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.1.0/com.ibm.zos.v2r1.icha100/egnoff.htm).

### Configuring basic authorization

The following are recommended for basic authorization:

- To give administrators access to everything in Zowe, create the following profile and give them UPDATE access to it: `ZLUX.**`
- To give non-administrators basic access to the site and product, create the following profile and give them READ access to it: `ZLUX.*.ORG_ZOWE_*`
- To prevent non-administrators from configuring endpoints at the product and instance levels, create the following profile and do not give them access to it: `ZLUX.1.CFG.**`
- To give non-administrators all access to user, create the following profile and give them UPDATE access to it: `ZLUX.1.CFG.*.*.USER.**`


### Endpoint URL length limitations
SAF profiles cannot contain more than 246 characters. If the path section of an endpoint URL is long enough that the profile name exceeds the limit, the path is trimmed to only include elements that do not exceed the limit. To avoid this issue, we recommend that appliction developers maintain relatively short endpoint URL paths.

For information on endpoint URLs, see [Using dataservices with RBAC](../extend/extend-desktop/mvd-dataservices.md#using-dataservices-with-rbac)

## Customizing Security Plugins

By default, the `app-server` handles security questions by utilizing either the API Mediation Layer, or ZSS, depending on which is present. If the API Mediation Layer is present, it is used to establish an SSO session which ZSS also respects. When RBAC is enabled, ZSS is queried for authorization questions.

This behavior is performed by an `app-server` security plugin named `sso-auth`.
Security plugins can be installed as part of Zowe extensions, and `app-server` can be customized to prefer them via the Zowe YAML.
Different security plugins could be used to operate in different environments, with different security systems, or with different session characteristics.
For more information, [read the extender's guide on security plugins](../extend/extend-desktop/mvd-authentication-api)

### Session duration and expiration

After successful authentication, a Zowe Desktop session is created by authentication plugins.

The duration of the session is determined by the plugin used. Some plugins are capable of renewing the session prior to expiration, while others may have a fixed session length.

The session duration and expiration behavior of the default security plugin, `sso-auth`, is determined by API Medation Layer configuration if present, and otherwise upon ZSS configuration.
If API Medation Layer is enabled, by default it will use z/OSMF as the session provider and the session duration will be based upon z/OSMF settings. [You can read more about API Mediation Layer providers here](authentication-providers-for-apiml.md).
If the API Mediation Layer is not enabled, you can [use or customize ZSS's default session duration of one hour](#customizing-zss-session-duration).

When a session expires, the credentials used for the initial login are likely to be invalid for re-use, since MFA credentials are often one-time-use or time-based.

In the Desktop, Apps that you opened prior to expiration will remain open so that your work can resume after entering new credentials.


## Administering the servers and plugins using an API
The App Server has a REST API to retrieve and edit both the App Server and ZSS server configuration values, and list, add, update, and delete plugins. Most of the features require RBAC to be enabled and for your user to have RBAC access to utilize these endpoints. For more information see documentation on how to  [use RBAC](https://docs.zowe.org/stable/user-guide/mvd-configuration.html#controlling-access-to-dataservices)

The API returns the following information in a JSON response:

| API                                                       | Description                                                  |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| /server (GET)                                             | Returns a list of accessible server endpoints for the Zowe App Server. |
| /server/config (GET)                                      | Returns the Zowe App Server configuration which follows [this specification](https://github.com/zowe/zlux-app-server/blob/v3.x/master/schemas/app-server-config.json). |
| /server/log (GET)                                         | Returns the contents of the Zowe App Server log file. |
| /server/loglevels (GET)                                   | Returns the verbosity levels set in the Zowe App Server logger. |
| /server/environment (GET)                                 | Returns Zowe App Server environment information, such as the operating system version, node server version, and process ID. |
| /server/reload (GET)                                      | Reloads the Zowe App Server. Only available in cluster mode. |
| /server/agent (GET)                                       | Returns a list of accessible server endpoints for the ZSS server. |
| /server/agent/config (GET)                                | Returns the ZSS server configuration which follows [this specification](https://github.com/zowe/zss/blob/v3.x/staging/schemas/zss-config.json). |
| /server/agent/log (GET)                                   | Returns the contents of the ZSS log file.                    |
| /server/agent/loglevels (GET)                             | Returns the verbosity levels of the ZSS logger.              |
| /server/agent/environment (GET)                           | Returns ZSS environment information.                         |
| /server/logLevels/name/:componentName/level/:level (POST) | Specify the logger that you are using and a verbosity level. |
| /plugins (GET)                                            | Returns a list of all plugins and their dataservices.        |
| /plugins (PUT)                                            | Adds a new plugin or upgrades an existing plugin. Only available in cluster mode (default). |
| /plugins/:id (DELETE)                                     | Deletes a plugin. Only available in cluster mode (default).  |

Swagger API documentation is provided in the `<zowe.runtimeDirectory>/components/app-server/share/zlux-app-server/doc/swagger/server-plugins-api.yaml` file. To see it in HTML format, you can paste the contents into the Swagger editor at https://editor.swagger.io/.

**Note:** The "agent" end points interact with the agent specified in the zowe configuration file. By default this is ZSS.


## Managing Cluster Mode for app-server

On the Zowe servers, the component "app-server" has an environment variable "ZLUX_NO_CLUSTER" which controls whether or not it uses cluster mode. Cluster mode is enabled by default. However, you might need to disable cluster mode under certain circumstances. When cluster mode is disabled, make sure you are aware of the potential drawbacks and benefit.

When you **disable** cluster mode, you will lose the following benefits:

1. **Performance under high user Count:** This is due to the absence of redundant workers, which can impact the system's efficiency when dealing with a large number of users.

2. **Reduced downtime during unexpected exceptions:** The low-downtime characteristic, where only one request is interrupted compared to around 15 seconds of downtime, is compromised.

### To turn the cluster mode on

- Do NOT include the `zowe.environments.ZLUX_NO_CLUSTER `in the `zowe.yaml` file.

### To turn the cluster mode off

- Include `zowe.environments.ZLUX_NO_CLUSTER=1` in the `zowe.yaml` file.

