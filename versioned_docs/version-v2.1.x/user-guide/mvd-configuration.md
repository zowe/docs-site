# Configuring Zowe Application Framework

The Zowe Application ("App") Framework is configured in the Zowe configuration file. Configuration can be used to change things such as verbosity of logs, the way in which the App server communicates with the Mediation Layer, how ZSS operates, whether to use HTTPS or AT-TLS, what language the logs should be set, and many more attributes.

When you install Zowe&trade;, the App Framework is configured as a Mediation Layer client by default. This is simpler to administer because the App framework servers are accessible externally through a single port: API ML Gateway port. It is more secure because you can implement stricter browser security policies for accessing cross-origin content. 

You can modify the Zowe App Server and Zowe System Services (ZSS) configuration, as needed, or configure connections for the Terminal app plugins.

## Accessing the App Server

When the server is enabled and given a port within [the configuration file](#configuration-file), the App server will print a message ZWED0031I in the log output. At that time, it is ready to accept network communication. When using the API Mediation Layer (recommended), app-server URLs should be reached from the Gateway, and you should additionally wait for the message ZWEAM000I for the Gateway to be ready.

When Zowe is ready, the app-server can be found at `https://<zowe.externalDomain>:<components.gateway.port>/zlux/ui/v1`

(Not recommended): If the API Mediation Layer is not used, or you need to contact the App server directly, the ZWED0031I message states which port it is accessible from, though generally it will be the same value as specified within `components.app-server.port`. In that case, the server would be available at `https://<zowe.externalDomain>:<components.app-server.port>/`

### Accessing the Desktop

The `app-server` should be accessed through the `gateway` when both are present. When both are ready, the Desktop can be accessed from the API Mediation Layer Gateway, such as

`https://<zowe.externalDomain>:<components.gateway.port>/zlux/ui/v1/`, which will redirect to `https://<zowe.externalDomain>:<components.gateway.port>/zlux/ui/v1/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`

Although you access the App server via the Gateway port, the App server still needs a port assigned to it which is the value of the *components.app-server.port* variable in the Zowe configuration file.

(Not recommended): If the mediation layer is not used, the Desktop will be accessible from the App server directly at `/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`

## Accessing ZSS

The `zss` server should be accessed  through the `gateway` when both are present. When both are ready, ZSS can be accessed from the API Mediation Layer Gateway, such as

`https://<zowe.externalDomain>:<components.gateway.port>/zss/api/v1/`

Although you access the ZSS server via the Gateway port, the ZSS server still needs a port assigned to it which is the value of the *components.zss.port* variable in the Zowe configuration file.

If the mediation layer is not used, ZSS directly at `https://<zowe.externalDomain>:<components.zss.port>/`

## Configuration file

### app-server configuration

The app-server uses the Zowe server configuration file for customizing server behavior. For a full list of parameters, requirements, and descriptions, see [the json-schema document for the app-server](https://github.com/zowe/zlux/blob/v2.x/staging/schemas/zlux-config-schema.json) which describes attributes that can be specified within the configuration file section `components.app-server`

### zss configuration

ZSS shares some parameters in common with the app-server, so you can consult the above json-schema document to find out which parameters are valid within `components.zss` of the Zowe configuration file. However, some parameters within the app-server schema are not used by ZSS, such as the `node` section. A ZSS-centric schema will be available soon.

## Environment variables

In the latest version of Zowe, `instance.env` is no longer used. However, some environment variables that could be specified within v1 can still be set within v2 in the `zowe.environments` section of the server configuration file. Environment variables starting with `ZWED_` map to values that can be specified within `components.app-server` and `components.zss` so they are redundant, but you can refer to the above json-schema document to see which values are useful or deprecated.


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

The App Server can be accessed over HTTP and/or HTTPS, provided it has been configured for either. HTTPS should be used, as HTTP is not secure unless AT-TLS is used.
When AT-TLS is used by ZSS, `components.zss.agent.http.attls` must be set to true.

### HTTPS

Both `app-server` and `zss` server components use HTTPS by default, and the `port` parameters `components.app-server.port` and `components.zss.port` control which port they are accessible from. However, each have advanced configuration options to control their HTTPS behavior.

The `app-server` component configuration can be used to customize its HTTPS connection such as which certificate and ciphers to use, and these parameters are to be set within `components.app-server.node.https` as defined within the [json-schema file](https://github.com/zowe/zlux-app-server/blob/v2.x/staging/schemas/app-server-config.json#L15)

The `zss` component configuration can be used to customize its HTTPS connection such as which certificate and ciphers to use, and these parameters are to be set within `components.zss.agent.https` as defined within the [json-schema file](https://github.com/zowe/zss/blob/v2.x/staging/schemas/zss-config.json#L81)


### HTTP

The `app-server` can be configured for HTTP via the `components.app-server.node.http` section of the Zowe configuration file, as specified within the `app-server` [json-schema file](https://github.com/zowe/zlux-app-server/blob/v2.x/staging/schemas/app-server-config.json#L73).

The `zss` server can be configured for HTTP via the `components.zss.agent.http` section of the Zowe configuration file, as specified within the `zss` [json-schema file](https://github.com/zowe/zss/blob/v2.x/staging/schemas/zss-config.json#L99). Note that `components.zss.tls` must be set to false for HTTP to take effect, and that `components.zss.agent.http.attls` must be set to true for AT-TLS to be recognized correctly.



## Configuration Directories
When running, the App Server will access the server's settings and read or modify the contents of its resource storage. All of this data is stored within a hierarchy of folders which correspond to scopes:

- Product: The contents of this folder are not meant to be modified, but used as defaults for a product.
- Site: The contents of this folder are intended to be shared across multiple App Server instances, perhaps on a network drive.
- Instance: This folder represents the broadest scope of data within the given App Server instance.
- Group: Multiple users can be associated into one group, so that settings are shared among them.
- User: When authenticated, users have their own settings and storage for the Apps that they use.

These directories dictate where the Configuration Dataservice will store content. For more information, see the [Configuration Dataservice documentation](../extend/extend-desktop/mvd-configdataservice.md)

### Old defaults
Prior to Zowe release 2.0.0, the location of the configuration directories were initialized to be within the `<INSTANCE_DIR>` folder unless otherwise customized. 2.0.0 does have backwards compatibility for the existence of these directories, but `<INSTANCE_DIR>` folder no longer exists, so they should be migrated to match the ones specified in the Zowe configuration file.

| Folder | New Location | Old Location | Note
|--------|--------------|--------------|-----
| siteDir | `<zowe.workspaceDirectory>/app-server/site` | `<INSTANCE_DIR>/workspace/app-server/site` |
| instanceDir | `<zowe.workspaceDirectory>/app-server` | `<INSTANCE_DIR>/workspace/app-server` | instanceDir term isn't used anymore. workspaceDirectory is used
| groupsDir | `<zowe.workspaceDirectory>/app-server/groups` | `<INSTANCE_DIR>/workspace/app-server/groups` |
| usersDir | `<zowe.workspaceDirectory>/app-server/users` | `<INSTANCE_DIR>/workspace/app-server/users` |
| pluginsDir | `<zowe.workspaceDirectory>/app-server/plugins` | `<INSTANCE_DIR>/workspace/app-server/plugins` |


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

Running ZSS requires a Zowe configuration file configuration that is similar to the one used for the Zowe App Server (by structure and property names). The attributes that are needed for ZSS (*components.zss*) at minimum, are: *port*, *crossMemoryServerName*.

By default, ZSS is configured to use HTTPS with the same certificate information and port specification as the other Zowe services. If you are looking to use AT-TLS instead, then you must set *component.zss.tls* variable to false and define `component.zss.agent.http` section with port, ipAddresses, and attls: true as shown below

(Recommended) Example of the agent body:
```
zss:
  enabled: true
  tls: true
  port: 7557
  crossMemoryServerName: ZWESIS_STD
```

(Not recommended) Unsecure, HTTP example with AT-TLS:
```
zss:
  enabled: true
  port: 7557
  crossMemoryServerName: ZWESIS_STD
  tls: false
  agent:
    http:
      ipAddresses: ["127.0.0.1"]
      attls: true
```

### ZSS 64 or 31 bit modes

Two versions of ZSS are included in Zowe, a 64 bit version and a 31 bit version. It is recommended to run the 64 bit version to conserve shared system memory but you must match the ZSS version with the version your ZSS plugins support. Official Zowe distributions contain plugins that support both 64 bit and 31 bit, but extensions may only support one or the other. 

#### Verifying which ZSS mode is in use

You can check which version of ZSS you are running by looking at the logs. At startup, the message ZWES1013I states which mode is being used, for example:

`ZWES1013I ZSS Server has started. Version 2.0.0 64-bit`

Or

`ZWES1013I ZSS Server has started. Version 2.0.0 31-bit`

#### Verifying which ZSS mode plugins support

You can check if a ZSS plugin supports 64 bit or 31 bit ZSS by reading the pluginDefinition.json file of the plugin.
In each component or extension you have, its manifest file will state if there are `appFw` plugin entries.
In each folder referenced by the `appFw` section, you will see a pluginDefinition.json file.
Within that file, if you see a section that says `type: 'service'`, then you can check its ZSS mode support.
If the service has the property `libraryName64`, then it supports 64 bit. If it says `libraryName31`, then it supports 31 bit. Both may exist if it supports both. If it instead only contains `libraryName`, this is ambigious and deprecated, and most likely that plugin only supports 31 bit ZSS. A plugin only supporting 31 bit ZSS must be recompiled for 64 bit support, so you must contact the developers to accomplish that.

Example: [the sample angular app supports both 31 bit and 64 bit zss](https://github.com/zowe/sample-angular-app/blob/083855582e8a82cf48abc21e15fa20bd59bfe180/pluginDefinition.json#L50-L53)

#### Setting ZSS 64 bit or 31 bit mode

You can switch between ZSS 64 bit and 31 bit mode by setting the value `components.zss.agent.64bit` to true or false in the Zowe configuration file. The value will not take effect until next server restart.

## Using AT-TLS in the App Framework

By default, both ZSS and the App server use HTTPS regardless of platform. However, some may wish to use AT-TLS on z/OS as an alternative way to provide HTTPS.
In order to do this, the servers must run in HTTP mode instead, and utilize AT-TLS for HTTPS. **The servers should never use HTTP without AT-TLS, it would be insecure**.
If you want to use AT-TLS, you must have a basic knowledge of your security product and you must have Policy Agent configured. For more information on [AT-TLS](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.1.0/com.ibm.zos.v2r1.halx001/transtls.htm) and [Policy Agent](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.2.0/com.ibm.zos.v2r2.halz002/pbn_pol_agnt.htm), see the [z/OS Knowledge Center](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.2.0/com.ibm.zos.v2r2/en/homepage.html).

There are a few requirements to working with AT-TLS:
* You must have the authority to alter security definitions related to certificate management, and you must be authorized to work with and update the Policy Agent.
* AT-TLS needs a TLS rule and keyring. The next section will cover that information.

**Note:** Bracketed values below (including the brackets) are variables. Replace them with values relevant to your organization. Always use the same value when substituting a variable that occurs multiple times.

### Creating AT-TLS certificates and keyring using RACF
In the following commands and examples you will create a root CA certificate and a server certificate signed by it. These will be placed within a keyring which is owned by the user that runs the Zowe server.
**Note: These actions can be done for various Zowe servers, but in these examples we set up ZSS for AT-TLS. You can subsitute ZSS for another server if desired.**


Key variables:

| Variable  | Value   |
| --------- | ------ |
| `[ca_common_name]` |   |
| `[ca_label]`   |   |
| `[server_userid]`	   |   |
| `[server_common_name]`	  |   |
| `[server_label]`	  |   |
| `[ring_name]`	  |   |
| `[output_dataset_name]`	  |   |

**Note**:
-  `[server_userid]` must be the server user ID, such as the STC user.
- `[server_common_name]` must be the z/OS hostname that runs Zowe

1. Enter the following RACF command to generate a CA certificate:
  ```
  RACDCERT CERTAUTH GENCERT +
    SUBJECTSDN(CN('[ca_common_name]') +
    OU('[organizational_unit]') +
    O('[organization_name]') +
    L('[locality]') SP('[state_or_province]') C('[country]')) +
    KEYUSAGE(CERTSIGN) +
    WITHLABEL('[ca_label]') +
    NOTAFTER(DATE([yyyy/mm/dd])) +
    SIZE(2048)
  ```
2. Enter the follow RACF command to generate a server certificate signed by the CA certificate:
  ```
  RACDCERT ID('[server_userid]') GENCERT +
    SUBJECTSDN(CN('[common_name]') +
    OU('[organizational_unit]') +
    O('[organization_name]') +
    L('[locality]') SP('[state_or_province]') C('[country]')) +
    KEYUSAGE(HANDSHAKE) +
    WITHLABEL('[server_label]') +
    NOTAFTER(DATE([yyyy/mm/dd])) +
    SIZE(2048) +
    SIGNWITH(CERTAUTH LABEL('[ca_label]'))
  ```

3. Enter the following RACF commands to create a key ring and connect the certificates to the key ring:
  ```
  RACDCERT ID([server_userid]) ADDRING([ring_name])
  RACDCERT ID([server_userid]) CONNECT(ID([server_userid]) +
    LABEL('[server_label]') RING([ring_name]) DEFAULT)
  RACDCERT ID([server_userid]) CONNECT(CERTAUTH +
    LABEL('[ca_label]') RING([ring_name]))
  ```

4. Enter the following RACF command to refresh the DIGTRING and DIGTCERT classes to activate your changes:
  ```
  SETROPTS RACLIST(DIGTRING,DIGTCERT) REFRESH
  ```

5. Enter the following RACF commands to verify your changes:
  ```
  RACDCERT ID([server_userid]) LISTRING([ring_name])
  RACDCERT ID([server_userid]) LISTCHAIN(LABEL(‘[server_label])’)
  ```

6. Enter the following RACF commands to allow the ZSS server to use the certificates. Only issue the RDEFINE commands if the profiles do not yet exist.
  ```
  RDEFINE FACILITY IRR.DIGTCERT.LIST UACC(NONE)
  RDEFINE FACILITY IRR.DIGTCERT.LISTRING UACC(NONE)
  PERMIT IRR.DIGTCERT.LIST CLASS(FACILITY) ACCESS(READ) +
    ID([server_userid])
  PERMIT IRR.DIGTCERT.LISTRING CLASS(FACILITY) ACCESS(READ) +
    ID([server_userid])
  SETROPTS RACLIST(FACILITY) REFRESH
  ```

**Note**: These sample commands use the FACILTY class to manage certificate related authorizations. You can also use the RDATALIB class, which offers granular control over the authorizations.

7. Enter the following RACF command to export the CA certificate to a dataset so it can be imported by the Zowe server:
  ```
  RACDCERT CERTAUTH EXPORT(LABEL('[ca_label]')) +
    DSN('[output_dataset_name]') FORMAT(CERTB64)
  ```

### Defining the AT-TLS rule
To define the AT-TLS rule, use the sample below to specify values in your AT-TLS Policy Agent Configuration file:

```
TTLSRule                          ATTLS1~ZSS
{
  LocalAddr                       All
  RemoteAddr                      All
  LocalPortRange                  [zss_port]
  Jobname                         *
  Userid                          *
  Direction                       Inbound
  Priority                        255
  TTLSGroupActionRef              gAct1~ZSS
  TTLSEnvironmentActionRef        eAct1~ZSS
  TTLSConnectionActionRef         cAct1~ZSS
}
TTLSGroupAction                   gAct1~ZSS
{
  TTLSEnabled                     On
  Trace                           1
}
TTLSEnvironmentAction             eAct1~ZSS
{
  HandshakeRole                   Server
  EnvironmentUserInstance         0
  TTLSKeyringParmsRef             key~ZSS
  Trace                           1
}
TTLSConnectionAction              cAct1~ZSS
{
  HandshakeRole                   Server
  TTLSCipherParmsRef              cipherZSS
  TTLSConnectionAdvancedParmsRef  cAdv1~ZSS
  Trace                           1
}
TTLSConnectionAdvancedParms       cAdv1~ZSS
{
  SSLv3                           Off
  TLSv1                           Off
  TLSv1.1                         Off
  TLSv1.2                         On
  CertificateLabel                [personal_label]
}
TTLSKeyringParms                  key~ZSS
{
  Keyring                         [ring_name]
}
TTLSCipherParms                   cipher~ZSS
{
  V3CipherSuites                  TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256
  V3CipherSuites                  TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384
  V3CipherSuites                  TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256
  V3CipherSuites                  TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384
  V3CipherSuites                  TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256
  V3CipherSuites                  TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
  V3CipherSuites                  TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
  V3CipherSuites                  TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
}
```


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

4. [Stop the Zowe instance you wish to point to the ZIS server](https://docs.zowe.org/stable/user-guide/stop-zowe-zos)

5. Locate the zowe configuration file for the Zowe instance, and edit the parameter `components.zss.privilegedServerName` to match the name of the ZIS STC name chosen, such as `ZWESIS_MYSRV`

6. [Restart the Zowe instance](https://docs.zowe.org/stable/user-guide/configure-zowe-server#step-3-launch-the-zwesvstc-started-task)

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
   <zowe.runtimeDirectory>/components/app-server/share/zlux-app-server/deploy/instance/ZLUX/pluginStorage
   ```
4. Open the copied `allowedPlugins.json` file and perform either of the following steps:
    - To make an app unavailable, delete it from the list of objects.
    - To make an app available, copy an existing plugin object and specify the app's values in the new object. Identifier and version attributes are required.

5. [Restart the app server](start-zowe-zos.md).

### Controlling app access for individual users

1. Enable RBAC.

2. In the user's ID directory path, in the `\pluginStorage` directory, create `\org.zowe.zlux.bootstrap\plugins` directories. For example:
    ```
    <zowe.runtimeDirectory>/components/app-server/share/zlux-app-server/deploy/instance/ZLUX/pluginStorage/org.zowe.zlux.bootstrap/plugins
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

You can apply access control to Zowe endpoints and to your app endpoints. Zowe provides endpoints for a set of configuration dataservices and a set of core dataservices. Apps can use [configuration endpoints](../extend/extend-desktop/mvd-configdataservice.md#configuration-dataservice) to store and their own configuration and other data. Administrators can use core endpoints to [get status information](mvd-configuration.md#Administering-the-servers-and-plugins-using-an-API) from the App Framework and ZSS servers. Any dataservice added as part of an app plugin is a service dataservice.

### Defining the RACF ZOWE class
If you use RACF security, take the following steps define the ZOWE class to the CDT class:

1. Make sure that the CDT class is active and RACLISTed.
2. In TSO, issue the following command:
    ```
    RDEFINE CDT ZOWE UACC(NONE)
    CDTINFO(
        DEFAULTUACC(NONE)
        FIRST(ALPHA) OTHER(ALPHA,NATIONAL,NUMERIC,SPECIAL)
        MAXLENGTH(246)
        POSIT(607)
        RACLIST(DISALLOWED))
    ```
    If you receive the following message, ignore it:
    ```
    "Warning: The POSIT value is not within the recommended ranges for installation use. The valid ranges are 19-56 and 128-527."
    ```
3. In TSO, issue the following command to refresh the CDT class:
    ```
    SETROPTS RACLIST(CDT) REFRESH
    ```
4. In TSO, issue the following command to activate the ZOWE class:
    ```
    SETROPTS CLASSACT(ZOWE)
    ```

For more information on RACF security administration, see the IBM Knowledge Center at [https://www.ibm.com/support/knowledgecenter/](https://www.ibm.com/support/knowledgecenter/).

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

For information on endpoint URLs, see [Dataservice endpoint URL lengths and RBAC](../extend/extend-desktop/mvd-dataservices.md#limiting-the-length-of-dataservice-paths-for-rbac)

## Multi-factor authentication configuration

[Multi-factor authentication](https://www.ibm.com/support/knowledgecenter/SSNR6Z_2.0.0/com.ibm.mfa.v2r0.azfu100/azf_server.htm) is an optional feature for Zowe.

As of Zowe version 1.8.0, the Zowe App Framework, Desktop, and all apps present in the SMP/E or convenience builds support [out-of-band MFA](https://www.ibm.com/support/knowledgecenter/SSNR6Z_2.0.0/com.ibm.mfa.v2r0.azfu100/azf_oobconcepts.htm) by entering an MFA assigned token or passcode into password field of the Desktop login screen, or by accessing the app-server `/auth` REST API endpoint.

For a list of compatible MFA products, see [Known compatible MFA products](systemrequirements-zos.md#multi-factor-authentication-mfa).

### Session duration and expiration

After successful authentication, a Zowe Desktop session is created by authentication plugins.

The duration of the session is determined by the plugin used. Some plugins are capable of renewing the session prior to expiration, while others may have a fixed session length.

Zowe is bundled with a few of these plugins:

* **sso-auth**: Uses either ZSS or the API Mediation Layer for authentication, and ZSS for RBAC authorization. This plugin also supports resetting or changing your password via a ZSS API. Whether ZSS or API Mediation Layer or both are used for authentication depends upon SSO settings. Starting with Zowe 1.28.0, SSO is enabled by default such that only API Mediation Layer is called at authentication time. By default, the Mediation Layer calls z/OSMF to answer the authentication request. The session created mirrors the z/OSMF session.

* **trivial-auth**: This plugin is used for development and testing, as it always returns true for any function. It could be used if there were specific services you did not need authentication for, while you wanted authentication elsewhere.

When a session expires, the credentials used for the initial login are likely to be invalid for re-use, since MFA credentials are often one-time-use or time-based.

In the Desktop, Apps that you opened prior to expiration will remain open so that your work can resume after entering new credentials.

### Configuration

When you use the default Zowe SMP/E or convenience build configuration, you do not need to change Zowe to get started with MFA.

To configure Zowe for MFA with a configuration other than the default, take the following steps:

1. Choose an App Server security plugin that is compatible with MFA. The [sso-auth](#session-duration-and-expiration) plugin is compatible.
2. Locate the App Server's configuration file in `zowe.yaml`.
3. Edit the configuration file to modify the section `components.app-server.dataserviceAuthentication`.

4. Set `defaultAuthentication` to the same category as the plugin of choice, as seen in its pluginDefinition.json file. For example:
    * **sso-auth**: "saf"
    * **trivial-auth**: "fallback"

The following is an example configuration for `sso-auth`, as seen in a default installation of Zowe:
```
components:
  app-server:
    dataserviceAuthentication: 
      defaultAuthentication: saf
```


## Administering the servers and plugins using an API
The App Server has a REST API to retrieve and edit both the App Server and ZSS server configuration values, and list, add, update, and delete plugins. Most of the features require RBAC to be enabled and for your user to have RBAC access to utilize these endpoints. For more information see documentation on how to  [use RBAC](https://docs.zowe.org/stable/user-guide/mvd-configuration.html#controlling-access-to-dataservices)

The API returns the following information in a JSON response:

| API                                                       | Description                                                  |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| /server (GET)                                             | Returns a list of accessible server endpoints for the Zowe App Server. |
| /server/config (GET)                                      | Returns the Zowe App Server configuration which follows [this specification](https://github.com/zowe/zlux-app-server/blob/v2.x/master/schemas/app-server-config.json). |
| /server/log (GET)                                         | Returns the contents of the Zowe App Server log file. |
| /server/loglevels (GET)                                   | Returns the verbosity levels set in the Zowe App Server logger. |
| /server/environment (GET)                                 | Returns Zowe App Server environment information, such as the operating system version, node server version, and process ID. |
| /server/reload (GET)                                      | Reloads the Zowe App Server. Only available in cluster mode. |
| /server/agent (GET)                                       | Returns a list of accessible server endpoints for the ZSS server. |
| /server/agent/config (GET)                                | Returns the ZSS server configuration which follows [this specification](https://github.com/zowe/zss/blob/v2.x/staging/schemas/zss-config.json). |
| /server/agent/log (GET)                                   | Returns the contents of the ZSS log file.                    |
| /server/agent/loglevels (GET)                             | Returns the verbosity levels of the ZSS logger.              |
| /server/agent/environment (GET)                           | Returns ZSS environment information.                         |
| /server/logLevels/name/:componentName/level/:level (POST) | Specify the logger that you are using and a verbosity level. |
| /plugins (GET)                                            | Returns a list of all plugins and their dataservices.        |
| /plugins (PUT)                                            | Adds a new plugin or upgrades an existing plugin. Only available in cluster mode (default). |
| /plugins/:id (DELETE)                                     | Deletes a plugin. Only available in cluster mode (default).  |

Swagger API documentation is provided in the `<zowe.runtimeDirectory>/components/app-server/share/zlux-app-server/doc/swagger/server-plugins-api.yaml` file. To see it in HTML format, you can paste the contents into the Swagger editor at https://editor.swagger.io/.

**Note:** The "agent" end points interact with the agent specified in the zowe configuration file. By default this is ZSS.
