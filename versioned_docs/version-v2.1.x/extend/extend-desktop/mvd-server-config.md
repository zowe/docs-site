The Zowe's App Server and ZSS rely on many required or optional parameters to run, which includes setting up networking, deployment directories, plugin locations, and more. 
These parameters can be specified in multiple ways: configuration files, CLI arguments, or environment variables.

Every configuration option and requirement is documented within the application framework [json-schema file](https://github.com/zowe/zlux/blob/v2.x/staging/schemas/zlux-config-schema.json)

# Configuration file
In Zowe's server configuration file, app-server parameters can be specified within `components.app-server` as shown in the component [json-schema file](https://github.com/zowe/zlux/blob/v2.x/staging/schemas/zowe-schema.json), or `components.zss` for ZSS.

# Environment variables
CLI arguments take precedence over the configuration file, but are overridden by the CLI arguments.
The format is `ZWED_key=value`, where "ZWED_" is a prefix for any configuration object.
The key maps to a YAML object attribute, so to set the value of a nested object, such as the https configuration, you need multiple values.
For example:
```
node: 
    https: 
      ipAddresses: 0.0.0.0
      port: 7556
      //pfx (string), keys, certificates, certificateAuthorities, and certificateRevocationLists are all valid here.
      keys: "../defaults/serverConfig/server.key"
      certificates: "../defaults/serverConfig/server.cert"
    

logLevels: 
  _zsf.auth:1
  org.zowe.terminal.tn3270.*: 5

```
In Environment variable format, this is specified as
```
ZWED_node_https_ipAddresses=0.0.0.0
ZWED_node_https_port=8554
ZWED_node_https_keys="../defaults/serverConfig/server.key"
ZWED_node_https_certificates="../defaults/serverConfig/server.cert"
ZWED_logLevels__x5fzsf____auth:1
ZWED_logLevels_org____zowe____terminal____tn3270_x2e_x2a:5
```

**The key names are syntax sensitive.**
* They are case-sensitive
* All ascii characters except " are allowed in the object attribute names.
    * An encoding scheme is used for many symbols because environment variables can only have names with the characters A-Z, a-z, 0-9, `_`, `.`, and `-`
    * The scheme is _x followed by 2 hex numbers will be converted to the corresponding ASCII character, such as _x41 mapping to `A`
* _ is used as the object separator, so an escape sequence is used if `_` is actually needed for the key.
    * Single leading and trailing _ are treated as literal `_`
    * __ will be maps to literal `_`
    * ___ maps to literal `-`
    * ____ maps to literal `.`

**The types of the values are syntax-sensitive.**
* Numbers are treated as numbers, not strings. 
* false & true are treated as boolean.
* commas are for arrays. An array of length 1 has a comma at the end
* strings can have quotes, but otherwise everything that isnt an array, boolean, or number is a string
* objects are never values. They are the keys.

## Friendly names for environment variables
Some common configuration options have names that do not follow the above special syntax. These options get mapped to the special syntax when the server runs, so the same behavior can be configured in more than one way. Many of these values are listed here https://docs.zowe.org/stable/user-guide/configure-instance-directory.html#reviewing-the-instance-env-file but for the App Server, the code that maps these values is contained within https://github.com/zowe/zlux-app-server/blob/v2.x/master/bin/convert-env.sh


Although overridden by both environment variables and CLI arguments, for convenience the App server and ZSS read from a configuration file with a common structure. ZSS reads this directly as a startup argument, while the App Server as defined in the [zlux-server-framework](https://github.com/zowe/zlux-server-framework) repository accepts several parameters which are intended to be read from a YAML file through an implementer of the server, such the default provided in the [zlux-app-server](https://github.com/zowe/zlux-app-server) repository, namely the [lib/zluxServer.js](https://github.com/zowe/zlux-app-server/blob/v2.x/master/lib/zluxServer.js) file. This file accepts a YAML file that specifies most if not all parameters needed, but some other parameters can be provided via flags if desired. 


# CLI arguments (app-server only)
CLI arguments take precedence over environment variable and configuration files.
The format is `--key=value`
The key maps to a YAML object attribute, so to set the value of a nested object, such as the https configuration, you need multiple period-separated values.
For example:
```
node: 
    https: 
      ipAddresses: 0.0.0.0
      port: 7556
      //pfx (string), keys, certificates, certificateAuthorities, and certificateRevocationLists are all valid here.
      keys: "../defaults/serverConfig/server.key"
      certificates: "../defaults/serverConfig/server.cert"
    
```
In CLI argument format, this is specified as
```
node.https.ipAddresses=0.0.0.0
node.https.port=8554
node.https.keys="../defaults/serverConfig/server.key"
node.https.certificates="../defaults/serverConfig/server.cert"
```

**NOTE: ZSS does not support CLI arguments**

**The key name is case-sensitive.**

**The types of the values are syntax-sensitive.**
* Numbers are treated as numbers, not strings. 
* false & true are treated as boolean.
* commas are for arrays. An array of length 1 has a comma at the end
* strings can have quotes, but otherwise everything that isnt an array, boolean, or number is a string
* objects are never values. They are the keys.


# Parameter Details
Below is some more detail on certain parameters than can be covered within the json-schema.

## Configuration Directories
When running, the App Server will access the server's settings and read/modify the contents of its resource storage.
All of this data is stored within a heirarchy of a few folders, which is correspond to scopes:
- Product: The contents of this folder are not meant to be modified, but used as defaults for a product.
- Site: The contents of this folder are intended to be shared across multiple App Server instances, perhaps on a network drive.
- Instance: This folder represents the broadest scope of data within the given App Server instance.
- Group: Multiple users can be associated into one group, so that settings are shared among them.
- User: When authenticated, users have their own settings and storage for the Apps that they use.

These directories dictate where the [Configuration Dataservice](https://github.com/zowe/zlux/wiki/Configuration-Dataservice) will store content.

### Directories example
```
  "productDir":"../defaults",
  "siteDir":"/home/myuser/.zowe/workspace/app-server/site",
  "instanceDir":"/home/myuser/.zowe/workspace/app-server",
  "groupsDir":"/home/myuser/.zowe/workspace/app-server/groups",
  "usersDir":"/home/myuser/.zowe/workspace/app-server/users",

```


## App configuration
This section does not cover any dynamic runtime inclusion of Apps, but rather Apps defined in advance.
In the configuration file, a directory can be specified which contains JSON files which tell the server what App is to be included and where to find it on disk. The backend of these Apps use the Server's Plugin structure, so much of the server-side references to Apps use the term Plugin.

To include Apps, be sure to define the location of the Plugins directory in the configuration file, via the top-level attribute *pluginsDir*

**NOTE: In this example, the directory for these JSON files is [/defaults/plugins](https://github.com/zowe/zlux-app-server/tree/v2.x/master/defaults/plugins). Yet, in order to separate configuration files from runtime files, the App Server will initialize by copying the contents of this folder into the defined instance directory, of which the default is ~/.zowe/workspace/app-server. So, the example configuration file uses the latter directory.**

### Plugins directory example
```
// All paths relative to zlux-app-server/lib
// In real installations, these values will be configured during the install.
//...
  "pluginsDir":"../defaults/plugins",
```

## Logging configuration
For more information, see [Logging Utility](mvd-logutility.md).

## ZSS Configuration
When running ZSS, it will require a configuration file similar or the same as the one used for the App Server. The attributes that are needed for ZSS, at minimum, are: *productDir*, *siteDir*, *instanceDir*, *groupsDir*, *usersDir*, *pluginsDir* and **agent**. All of these attributes have the same meaning as described above for the App server, but if the App server and ZSS are not run from the same location, then these directories may be different if desired.

### ZSS Networking

The attributes that control ZSS exclusively are within the **agent** object. ZSS uses HTTPS by default, but for those who wish to use AT-TLS instead of the built-in HTTPS support, ZSS can use HTTP as well. HTTP should never be used without [AT-TLS](https://zowe.github.io/docs-site/latest/user-guide/mvd-configuration.html#defining-the-at-tls-rule), as this is a security risk. The values `agent.https.port`, `agent.http.port` tell ZSS which ports to bind to, but also where the app-server can find ZSS. The values `agent.host` is used to tell app-server where to find ZSS as well, though `agent.https.ipAddresses` and `agent.http.ipAddresses` tell ZSS which addresses to bind to. For addresses, at this time only the first value of that array is used, and it may either be a hostname or an ipv4 address.

Example of the agent body:
```
  agent: 
    host: localhost
    https: 
      ipAddresses: 0.0.0.0
      port: 7557
    
```
