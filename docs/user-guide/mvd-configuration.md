# Configuring Zowe Application Framework

The Zowe Application ("App") Framework is configured in the Zowe configuration file. Configuration can be used to change things such as verbosity of logs, the way in which the App server communicates with the Mediation Layer, how ZSS operates, whether to use HTTPS or AT-TLS, what language the logs should be set, and many more attributes.

When you install Zowe&trade;, the App Framework is configured as a Mediation Layer client by default. This is simpler to administer because the App framework servers are accessible externally through a single port: API ML Gateway port. It is more secure because you can implement stricter browser security policies for accessing cross-origin content. 

You can modify the Zowe App Server and Zowe System Services (ZSS) configuration, as needed, or configure connections for the Terminal app plugins.

## Accessing the App Server

When the server is enabled and given a port within [the configuration file](configure-instance-directory.md), the App server will print a message ZWED0031I in the log output. At that time, it is ready to accept network communication. When using the API Mediation Layer (recommended), app-server URLs should be reached from the Gateway, and you should additionally wait for the message ZWEAM000I for the Gateway to be ready.

When Zowe is ready, the app-server can be found at `https://<externalDomain>:<components.gateway.port>/zlux/ui/v1`

(Not recommended): If the API Mediation Layer is not used, or you need to contact the App server directly, the ZWED0031I message states which port it is accessible from, though generally it will be the same value as specified within `components.app-server.port`. In that case, the server would be available at `https://<externalDomain>:<components.app-server.port>/`

### Accessing the Desktop

When the app-server and gateway are ready, the Desktop can be accessed from the API Mediation Layer Gateway, such as

`https://<externalDomain>:<components.gateway.port>/zlux/ui/v1/`, which will redirect to `https://<externalDomain>:<components.gateway.port>/zlux/ui/v1/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`

(Not recommended): If the mediation layer is not used, the Desktop will be accessible from the App server directly at `/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`

You should be accessing the App server via the Gateway port, but the App server still needs a port assigned to it which is the value of the *components.app-server.port* variable in the Zowe configuration file, 

TODO: Above linked file needs to be changed

## Accessing ZSS

TODO

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

The App Server can be accessed over HTTP and/or HTTPS, provided it has been configured for either. HTTPS should be used, as HTTP is not secure unless AT-TLS is used. `components.zss.tls` variable must be set to false in Zowe configuration file to use HTTP and AT-TLS.



TODO: Trim this section below




### HTTP

To configure the server for HTTP, complete these steps:

1. Define an attribute *http* within the top-level *node* attribute.

2. Define *port* within *http*. Where *port* is an integer parameter for the TCP port on which the server will listen. Specify 80 or a value between 1024-65535.

### HTTPS

For HTTPS, specify the following parameters:

1. Define an attribute *https* within the top-level *node* attribute.

2. Define the following within *https*:

- *port*: An integer parameter for the TCP port on which the server will listen. Specify 443 or a value between 1024-65535.
- *certificates*: An array of strings, which are paths to PEM format HTTPS certificate files.
- *keys*: An array of strings, which are paths to PEM format HTTPS key files.
- *pfx*: A string, which is a path to a PFX file which must contain certificates, keys, and optionally Certificate Authorities.
- *certificateAuthorities* (Optional): An array of strings, which are paths to certificate authorities files.
- *certificateRevocationLists* (Optional): An array of strings, which are paths to certificate revocation list (CRL) files.

**Note:** When using HTTPS, you must specify *pfx*, or both *certificates* and *keys*.

### Network example

In the example configuration, both HTTP and HTTPS are specified:

```
  "node": {
    "https": {
      "ipAddresses": ["0.0.0.0"],
      "port": 8544,
      //pfx (string), keys, certificates, certificateAuthorities, and certificateRevocationLists are all valid here.
      "keys": ["../defaults/serverConfig/server.key"],
      "certificates": ["../defaults/serverConfig/server.cert"]
    },
    "http": {
      "ipAddresses": ["0.0.0.0"],
      "port": 8543
    }
  }
```

## Configuration Directories
When running, the App Server will access the server's settings and read or modify the contents of its resource storage. All of this data is stored within a hierarchy of folders which correspond to scopes:

- Product: The contents of this folder are not meant to be modified, but used as defaults for a product.
- Site: The contents of this folder are intended to be shared across multiple App Server instances, perhaps on a network drive.
- Instance: This folder represents the broadest scope of data within the given App Server instance.
- Group: Multiple users can be associated into one group, so that settings are shared among them.
- User: When authenticated, users have their own settings and storage for the Apps that they use.

These directories dictate where the Configuration Dataservice will store content. For more information, see the [Configuration Dataservice documentation](..//extend-desktop/mvd-configdataservice.md)

### Old defaults
Prior to Zowe release 2.0.0, the location of the configuration directories were initialized to be within the `<INSTANCE_DIR>` folder unless otherwise customized. 2.0.0 does have backwards compatibility for the existence of these directories, but `<INSTANCE_DIR>` folder no longer exists, so they should be migrated to match the ones specified in the Zowe configuration file.

| Folder | New Location | Old Location | Note
|--------|--------------|--------------|-----
| siteDir | <workspaceDirectory>/app-server/site | <INSTANCE_DIR>/workspace/app-server/site |
| instanceDir | <workspaceDirectory>/app-server | <INSTANCE_DIR>/workspace/app-server | instanceDir term isn't used anymore. workspaceDirectory is used
| groupsDir | <workspaceDirectory>/app-server/groups | <INSTANCE_DIR>/workspace/app-server/groups |
| usersDir | <workspaceDirectory>/app-server/users | <INSTANCE_DIR>/workspace/app-server/users |
| pluginsDir | <workspaceDirectory>/app-server/plugins | <INSTANCE_DIR>/workspace/app-server/plugins |


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
  port: 8542
  crossMemoryServerName: ZWESIS_STD
```

(Not recommended) Unsecure, HTTP example with AT-TLS:
```
zss:
  enabled: true
  port: 8542
  crossMemoryServerName: ZWESIS_STD
  tls: false
  agent:
    http:
      ipAddresses: ["127.0.0.1"]
      attls: true
```

### Configuring ZSS for AT-TLS

By default, ZSS is enabled in HTTPS and doesn't require an advanced configuration outside the required attributes in the recommended example above.

If you want to use RACF or AT-TLS (which requires ZSS to be in HTTP mode), you must have a basic knowledge of your security product and you must have Policy Agent configured. For more information on [AT-TLS](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.1.0/com.ibm.zos.v2r1.halx001/transtls.htm) and [Policy Agent](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.2.0/com.ibm.zos.v2r2.halz002/pbn_pol_agnt.htm), see the [z/OS Knowledge Center](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.2.0/com.ibm.zos.v2r2/en/homepage.html).

You must have the authority to alter security definitions related to certificate management, and you must be authorized to work with and update the Policy Agent.

If you are going to use AT-TLS, you will need to set up TLS rule and TLS keyring. The next section will cover that information.

**Note:** Bracketed values below (including the brackets) are variables. Replace them with values relevant to your organization. Always use the same value when substituting a variable that occurs multiple times.

#### Creating certificates and key ring for the ZSS server using RACF
In this step you will create a root CA certificate and a ZSS server certificate signed by the CA certificate. Next you create a key ring owned by the ZSS server with the certificates attached.

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
-	`[server_userid]` must be the ZSS server user ID.
- `[server_common_name]` must be the ZSS server host name.

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

7. Enter the following RACF command to export the CA certificate to a dataset so it can be imported by the Zowe App Server:
  ```
  RACDCERT CERTAUTH EXPORT(LABEL('[ca_label]')) +
    DSN('[output_dataset_name]') FORMAT(CERTB64)
  ```

#### Defining the AT-TLS rule
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



TODO: Below section needs to be modifed and linked configure instance directory file changed



### Installing additional ZSS instances
After you install Zowe, you can install and configure additional instances of ZSS on the same z/OS server. You might want to do this to test different ZSS versions.

The following steps assume you have installed a Zowe runtime instance (which includes ZSS), and that you are installing a second runtime instance to install an additional ZSS.

1. To stop the installed Zowe runtime, in SDSF enter the following command:

   ```
    /C ${ZOWE_PREFIX}${ZOWE_INSTANCE}SV
    ```
    Where ZOWE_PREFIX and ZOWE_INSTANCE are specified in your configuration (and default to ZWE and 1)

2. Create a new Zowe instance directory by following steps in [Creating and configuring the Zowe instance directory](configure-instance-directory.md).

   **Note:** In the Zowe configuration file, specify ports that are not used by the first Zowe runtime.

3. To restart the first Zowe runtime, in SDSF enter the following command:

   ```
   /S ZWESVSTC,INSTANCE='$INSTANCE_DIR'
   ```

   Where `$INSTANCE_DIR` is the Zowe instance directory. 

4. To specify a name for the new ZSS instance, follow these steps:

   1. Copy the PROCLIB member JCL named ZWESISTC that was installed with the new runtime.

   2. Rename the copy to uniquely identify it as the JCL that starts the new ZSS, for example ZWESIS02.

   3. Edit the JCL, and in the  `NAME` parameter specify a unique name for the cross-memory server, for example:

      ```
      //ZWESIS02  PROC NAME='ZWESIS_MYSRV',MEM=00,RGN=0M
      ```

      Where `ZWESIS_MYSRV` is the unique name of the new ZSS.

5. To start the new ZSS, in SDSF enter the following command:

   ```
    /S ZWESIS02
   ```

6. Make sure that the TSO user ID that runs the first ZSS started task also runs the new ZSS started task. The default ID is ZWESVUSR.

7. In the new ZSS `server.json` configuration file, add a `"privilegedServerName"` parameter and specify the new ZSS name, for example:

    ```
   "productDir":"../defaults",
    // All paths relative to zlux-app-server/bin
    // In real installations, these values will be configured during the install.
   "productDir":"../defaults",
   "siteDir":"../deploy/site",
   "instanceDir":"../deploy/instance",
   "groupsDir":"../deploy/instance/groups",
   "usersDir":"../deploy/instance/users",
   "pluginsDir":"../defaults/plugins",
   "privilegedServerName":"ZWESIS_MYSRV",
   "dataserviceAuthentication": { ... }
   ```

    **Note:** The instance location of `server.json` is `$INSTANCE_DIR/workspace/app-server/serverConfig/server.json`, and the defaults are stored in `$ROOT_DIR/components/app-server/share/zlux-app-server/defaults/serverConfig/server.json`

8. To start the new Zowe runtime, in SDSF enter the following command:

   ```
   /S ZWESVSTC,INSTANCE='$ZOWE_INSTANCE_DIR'
   ```

9.  To verify that the new cross-memory server is being used, check for the following messages in the `ZWESVSTC` server job log:

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
- <runtimeDirectory> variable comes from Zowe configuration file.

1. Enable RBAC.

2. Navigate to the following location:
   ```
   <runtimeDirectory>/components/app-server/share/zlux-app-server/defaults/ZLUX/pluginStorage/org.zowe.zlux.bootstrap/plugins
   ```
3. Copy the `allowedPlugins.json` file and paste it in the following location:
   ```
   <runtimeDirectory>/components/app-server/share/zlux-app-server/deploy/instance/ZLUX/pluginStorage
   ```
4. Open the copied `allowedPlugins.json` file and perform either of the following steps:
    - To make an app unavailable, delete it from the list of objects.
    - To make an app available, copy an existing plugin object and specify the app's values in the new object. Identifier and version attributes are required.

5. [Restart the app server](configure-zowe-server.md#stopping-the-zwesvstc-proc).

### Controlling app access for individual users

1. Enable RBAC.

2. In the user's ID directory path, in the `\pluginStorage` directory, create `\org.zowe.zlux.bootstrap\plugins` directories. For example:
    ```
    <runtimeDirectory>/components/app-server/share/zlux-app-server/deploy/instance/ZLUX/pluginStorage/org.zowe.zlux.bootstrap/plugins
    ```

3. In the `/plugins` directory, create an `allowedPlugins.json` file. You can use the default `allowedPlugins.json` file as a template by copying it from the following location:
   ```
   <runtimeDirectory>/components/app-server/share/zlux-app-server/defaults/ZLUX/pluginStorage/org.zowe.zlux.bootstrap/plugins
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

6. [Restart the app server](configure-zowe-server.md#stopping-the-zwesvstc-proc).


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

`/<product>/plugins/<plugin_id>/services/<service>/<version>/<path>`

For example:

`/ZLUX/plugins/org.zowe.foo/services/baz/_current/users/fred`

Where the path is `/users/fred`.

SAF profiles have the following format:

`<product>.<instance_id>.<service>.<pluginid_with_underscores>.<service>.<HTTP_method>.<url_with_forward_slashes_replaced_by_periods>`

For example, to issue a POST request to the dataservice endpoint documented above, users must have READ access to the following profile:

`ZLUX.DEFAULT.SVC.ORG_ZOWE_FOO.BAZ.POST.USERS.FRED`

For configuration dataservice endpoint profiles use the service code `CFG`. For core dataservice endpoints use `COR`. For all other dataservice endpoints use `SVC`.

### Creating generic authorization profiles
Some endpoints can generate an unlimited number of URIs. For example, an endpoint that performs a DELETE action on any file would generate a different URI for each file, and users can create an unlimited number of files. To apply RBAC to this type of endpoint you must create a generic profile, for example:

`ZLUX.DEFAULT.COR.ORG_ZOWE_FOO.BAZ.DELETE.**`

You can create generic profile names using wildcards, such as asterisks (*). For information on generic profile naming, see [IBM documentation](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.1.0/com.ibm.zos.v2r1.icha100/egnoff.htm).

### Configuring basic authorization

The following are recommended for basic authorization:

- To give administrators access to everything in Zowe, create the following profile and give them UPDATE access to it: `ZLUX.**`
- To give non-administrators basic access to the site and product, create the following profile and give them READ access to it: `ZLUX.*.ORG_ZOWE_*`
- To prevent non-administrators from configuring endpoints at the product and instance levels, create the following profile and do not give them access to it: `ZLUX.DEFAULT.CFG.**`
- To give non-administrators all access to user, create the following profile and give them UPDATE access to it: `ZLUX.DEFAULT.CFG.*.*.USER.**`


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

* **apiml-auth**: Calls the Zowe API Mediation Layer from the app-server for authentication. By default, the Mediation Layer calls z/OSMF to answer the authentication request. The session created mirrors the z/OSMF session.

* **zosmf-auth**: Calls z/OSMF auth from the app-server to answer the authentication request. The created z/OSMF session is valid for about 8 hours.

* **zss-auth**: Calls Zowe ZSS from the app-server to answer the authentication request. The created ZSS session is valid for 1 hour, but is renewable on request prior to expiration. In the Desktop, the session is automatically renewed if the user is detected as active. If the user is detected as idle, the session will expire.

When a session expires, the credentials used for the initial login are likely to be invalid for re-use, since MFA credentials are often one-time-use or time-based.

In the Desktop, Apps that you opened prior to expiration will remain open so that your work can resume after entering new credentials.

### Configuration

When you use the default Zowe SMP/E or convenience build configuration, you do not need to change Zowe to get started with MFA.

To configure Zowe for MFA with a configuration other than the default, take the following steps:

1. Choose an App Server security plugin that is compatible with MFA. The [apiml-auth, zss-auth, and zosmf-auth](#session-duration-and-expiration) plugins are all compatible.
2. Locate the App Server's configuration file in `$INSTANCE_DIR/workspace/app-server/serverConfig/server.json`
3. Edit the configuration file to modify the section `dataserviceAuthentication`.

4. Set `defaultAuthentication` to the same category as the plugin of choice, for example:
    * **apiml-auth**: "apiml"
    * **zosmf-auth**: "zosmf"
    * **zss-auth**: "zss"
5. Define the plugins to use in the configuration file by adding a section for the chosen category within `dataserviceAuthentication.implementationDefaults` as an object with the attribute `plugins`, which is an array of plugin ID strings, where the plugins each have the following IDs:
    * **apiml-auth**: "org.zowe.zlux.auth.apiml"
    * **zosmf-auth**: "org.zowe.zlux.auth.zosmf"
    * **zss-auth**: "org.zowe.zlux.auth.zss"

The following is an example configuration for `zss-auth`, as seen in a default installation of Zowe:
```json
"dataserviceAuthentication": {
  "defaultAuthentication": "zss",
  "implementationDefaults": {
    "zss": {
      "plugins": [
        "org.zowe.zlux.auth.zss"
      ]
    }
  }
}
```


## Administering the servers and plugins using an API
You can use a REST API to retrieve and edit Zowe App Server and ZSS server configuration values, and list, add, update, and delete plugins. If an administrator has configured Zowe to [use RBAC](https://docs.zowe.org/stable/user-guide/mvd-configuration.html#applying-role-based-access-control-to-dataservices), they must authorize you to access the endpoints.

The API returns the following information in a JSON response:

| API                                                       | Description                                                  |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| /server (GET)                                             | Returns a list of accessible server endpoints for the Zowe App Server. |
| /server/config (GET)                                      | Returns the Zowe App Server configuration from the `zluxserver.json` file. |
| /server/log (GET)                                         | Returns the contents of the Zowe App Server log file. |
| /server/loglevels (GET)                                   | Returns the verbosity levels set in the Zowe App Server logger. |
| /server/environment (GET)                                 | Returns Zowe App Server environment information, such as the operating system version, node server version, and process ID. |
| /server/reload (GET)                                      | Reloads the Zowe App Server. Only available in cluster mode. |
| /server/agent (GET)                                       | Returns a list of accessible server endpoints for the ZSS server. |
| /server/agent/config (GET)                                | Returns the ZSS server configuration from the `zluxserver.json` file. |
| /server/agent/log (GET)                                   | Returns the contents of the ZSS log file.                    |
| /server/agent/loglevels (GET)                             | Returns the verbosity levels of the ZSS logger.              |
| /server/agent/environment (GET)                           | Returns ZSS environment information.                         |
| /server/config/:attrib (POST)                             | Specify values for server configuration attributes in the `zluxserver.json` file. You can change a subset of configuration values. |
| /server/logLevels/name/:componentName/level/:level (POST) | Specify the logger that you are using and a verbosity level. |
| /plugins (GET)                                            | Returns a list of all plugins and their dataservices.        |
| /plugins (PUT)                                            | Adds a new plugin or upgrades an existing plugin. Only available in cluster mode. |
| /plugins/:id (DELETE)                                     | Deletes a plugin. Only available in cluster mode.            |

Swagger API documentation is provided in the `<RUNTIME_DIR>/components/app-server/share/zlux-app-server/doc/swagger/server-plugins-api.yaml` file. To see it in HTML format, you can paste the contents into the Swagger editor at https://editor.swagger.io/.

**Note:** The "agent" end points interact with the agent specified in the `server.json` file. By default this is ZSS.
