The Zowe's App Server and ZSS rely on many required or optional parameters to run, which includes setting up networking, deployment directories, plugin locations, and more. 
The App Server & ZSS have a shared configuration format, where the parameters can be specified in multiple ways, providing flexibility of how to configure them.
The App Server can take configuration values either by CLI argument, environment variable, or configuration file.
ZSS can take values by environment variable or configuration file. In the future, CLI argument support may be added.
Ultimately, the configuration values are treated as a JSON object, so the CLI and environment variable formats are ways to specify JSON as a key and value pair.

# CLI arguments
CLI arguments take precedence over environment variable and configuration file.
The format is `--key=value`
The key maps to a JSON object attribute, so to set the value of a nested object, such as the https configuration, you need multiple period-separated values.
For example:
```
"node": {
    "https": {
      "ipAddresses": ["0.0.0.0"],
      "port": 8544,
      //pfx (string), keys, certificates, certificateAuthorities, and certificateRevocationLists are all valid here.
      "keys": ["../defaults/serverConfig/server.key"],
      "certificates": ["../defaults/serverConfig/server.cert"]
    }
}
```
In CLI argument format, this is specified as
```
node.https.ipAddresses="0.0.0.0",
node.https.port=8554
node.https.keys="../defaults/serverConfig/server.key",
node.https.certificates="../defaults/serverConfig/server.cert",
```

**The key name is case-sensitive.**

**The types of the values are syntax-sensitive.**
* Numbers are treated as numbers, not strings. 
* false & true are treated as boolean.
* commas are for arrays. An array of length 1 has a comma at the end
* strings can have quotes, but otherwise everything that isnt an array, boolean, or number is a string
* objects are never values. They are the keys.

# Environment variables
CLI arguments take precedence over the configuration file, but are overridden by the CLI arguments.
The format is `ZWED_key=value`, where "ZWED_" is a prefix for any configuration object.
The key maps to a JSON object attribute, so to set the value of a nested object, such as the https configuration, you need multiple values.
For example:
```
"node": {
    "https": {
      "ipAddresses": ["0.0.0.0"],
      "port": 8544,
      //pfx (string), keys, certificates, certificateAuthorities, and certificateRevocationLists are all valid here.
      "keys": ["../defaults/serverConfig/server.key"],
      "certificates": ["../defaults/serverConfig/server.cert"]
    }
},
"logLevels": {
  "_zsf.auth":1,
  "org.zowe.terminal.tn3270.*": 5
}
```
In Environment variable format, this is specified as
```
ZWED_node_https_ipAddresses="0.0.0.0",
ZWED_node_https_port=8554
ZWED_node_https_keys="../defaults/serverConfig/server.key",
ZWED_node_https_certificates="../defaults/serverConfig/server.cert",
ZWED_logLevels__x5fzsf____auth:"1",
ZWED_logLevels_org____zowe____terminal____tn3270_x2e_x2a:"5"
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
Some common configuration options have names that do not follow the above special syntax. These options get mapped to the special syntax when the server runs, so the same behavior can be configured in more than one way. Many of these values are listed here https://docs.zowe.org/stable/user-guide/configure-instance-directory.html#reviewing-the-instance-env-file but for the App Server, the code that maps these values is contained within https://github.com/zowe/zlux-app-server/blob/master/bin/convert-env.sh


# Configuration File
Although overridden by both environment variables and CLI arguments, for convenience the App server and ZSS read from a JSON file with a common structure. ZSS reads this directly as a startup argument, while the App Server as defined in the [zlux-server-framework](https://github.com/zowe/zlux-server-framework) repository accepts several parameters which are intended to be read from a JSON file through an implementer of the server, such the default provided in the [zlux-app-server](https://github.com/zowe/zlux-app-server) repository, namely the [lib/zluxServer.js](https://github.com/zowe/zlux-app-server/blob/master/lib/zluxServer.js) file. This file accepts a JSON file that specifies most if not all parameters needed, but some other parameters can be provided via flags if desired. 

An example JSON file can be found within the [zlux-app-server](https://github.com/zowe/zlux-app-server), at [defaults/server.json](https://github.com/zowe/zlux-app-server/blob/master/defaults/serverConfig/server.json).

**NOTE: All examples within are based off of the *zlux-app-server* repository.**

## Network configuration
**Attributes listed here are to be defined within the server's JSON configuration file**
The App Server can be accessed over HTTP and/or HTTPS, provided it has been configured for either. 

### HTTP
To configure the server for HTTP, define an attribute *http* within the top-level *node* attribute. Then, define the following within *http*:
- *ipAddresses*: An array of strings of ipv4, ipv6, or hostnames that the server will bind to. If not specified, the default is 0.0.0.0
- *port*: An integer parameter for the TCP port that the server will listen on. Can be 80 or a value between 1024-65535.

### HTTPS
For HTTPS, a few parameters are required. First, define an attribute *https* within the top-level *node* attribute. Then, define the following within *https*:
- *ipAddresses*: An array of strings of ipv4, ipv6, or hostnames that the server will bind to. If not specified, the default is 0.0.0.0
- *port*: An integer parameter for the TCP port that the server will listen on. Can be 443 or a value between 1024-65535.
- *certificates*: An array of strings which are paths to PEM format HTTPS certificate files.
- *keys*: An array of strings which are paths to PEM format HTTPS key files.
- *pfx*: A string which is a path to a PFX file which must contain certificates, keys, and optionally Certificate Authorities.
- *certificateAuthorities* (Optional): An array of strings which are paths to certificate authorities files.
- *certificateRevocationLists* (Optional): An array of strings which are paths to certificate revocation list (CRL) files.

**NOTE: When using HTTPS, you must specify *pfx*, or both *certificates* and *keys*.**

### Network example
In our example configuration, you can see we've specified both HTTP and HTTPS:

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
// All paths relative to zlux-app-server/lib
// In real installations, these values will be configured during the install.
  "productDir":"../defaults",
  "siteDir":"/home/myuser/.zowe/workspace/app-server/site",
  "instanceDir":"/home/myuser/.zowe/workspace/app-server",
  "groupsDir":"/home/myuser/.zowe/workspace/app-server/groups",
  "usersDir":"/home/myuser/.zowe/workspace/app-server/users",

```

### Old defaults
Prior to Zowe release 1.8.0, the location of the configuration directories were initialized to be within the `zlux-app-server` folder unless otherwise customized.
1.8.0 has backwards compatibility for the existence of these directories, but they can and should be migrated to take advantage of future enhancements.

| Folder | New Location | Old Location | Note
|--------|--------------|--------------|-----
| productDir | zlux-app-server/defaults | zlux-app-server/deploy/product | Official installs place zlux-app-server within <ROOT_DIR>/components/app-server/share
| siteDir | <INSTANCE_DIR>/workspace/app-server/site | zlux-app-server/deploy/site | INSTANCE_DIR is ~/.zowe if not otherwise defined. Site is placed within instance due to lack of SITE_DIR as of 1.8
| instanceDir | <INSTANCE_DIR>/workspace/app-server | zlux-app-server/deploy/instance |
| groupsDir | <INSTANCE_DIR>/workspace/app-server/groups | zlux-app-server/deploy/instance/groups |
| usersDir | <INSTANCE_DIR>/workspace/app-server/users | zlux-app-server/deploy/instance/users |
| pluginsDir | <INSTANCE_DIR>/workspace/app-server/plugins | zlux-app-server/deploy/instance/ZLUX/plugins | Defaults located at zlux-app-server/defaults/plugins, previously at zlux-app-server/plugins


## App configuration
This section does not cover any dynamic runtime inclusion of Apps, but rather Apps defined in advance.
In the configuration file, a directory can be specified which contains JSON files which tell the server what App is to be included and where to find it on disk. The backend of these Apps use the Server's Plugin structure, so much of the server-side references to Apps use the term Plugin.

To include Apps, be sure to define the location of the Plugins directory in the configuration file, via the top-level attribute *pluginsDir*

**NOTE: In this example, the directory for these JSON files is [/defaults/plugins](https://github.com/zowe/zlux-app-server/tree/master/defaults/plugins). Yet, in order to separate configuration files from runtime files, the App Server will initialize by copying the contents of this folder into the defined instance directory, of which the default is ~/.zowe/workspace/app-server. So, the example configuration file uses the latter directory.**

### Plugins directory example
```
// All paths relative to zlux-app-server/lib
// In real installations, these values will be configured during the install.
//...
  "pluginsDir":"../defaults/plugins",
```

## Logging configuration
[See logger documentation](https://github.com/zowe/zlux/wiki/Logging#server-startup-logging-configuration)

## ZSS Configuration
When running ZSS, it will require a JSON configuration file similar or the same as the one used for the App Server. The attributes that are needed for ZSS, at minimum, are: *productDir*, *siteDir*, *instanceDir*, *groupsDir*, *usersDir*, *pluginsDir* and **agent**. All of these attributes have the same meaning as described above for the App server, but if the App server and ZSS are not run from the same location, then these directories may be different if desired.

The attributes that control ZSS exclusively are within the **agent** object. **agent.http.port** for example is the TCP port which ZSS will listen on to be contacted by the App Server. Define this in the configuration file as a value between 1024-65535. Similarly, if given **agent.http.ipAddresses** will be used to determine which IP addresses the server should bind to. At this time, only the first value of that array is used, and it may either be a hostname or an ipv4 address.

Example of the agent body:
```json
  "agent": {
    "host": "localhost",
    "http": {
      "ipAddresses": ["127.0.0.1"],
      "port": 8542
    }
  }
```

### HTTP
To configure the agent for HTTP, define an attribute *http* within the top-level *agent* attribute. Then, define the following within *http*:
- *ipAddresses*: An array of strings of ipv4, ipv6, or hostnames that the server will bind to. If not specified, the default is 127.0.0.1
- *port*: An integer parameter for the TCP port that the server will listen on. Can be 80 or a value between 1024-65535.
- *attls*: Tells the App server whether or not the agent is using attls, which requires a separate configuration detailed here: https://zowe.github.io/docs-site/latest/user-guide/mvd-configuration.html#defining-the-at-tls-rule

### Connecting App Server to ZSS

When running the App Server, simply specify a few flags to declare which ZSS instance the App Server will proxy ZSS requests to:
- *-h*: Declares the host where ZSS can be found. Use as "-h \<hostname\>" 
- *-P*: Declares the port at which ZSS is listening. Use as "-P \<port\>"