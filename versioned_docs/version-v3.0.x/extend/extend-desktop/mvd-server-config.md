# Advanced Server Configuration

The Zowe's App Server and ZSS rely on many required or optional parameters to run, which includes setting up networking, deployment directories, plugin locations, and more. 

## Configuration file

The servers use a YAML file for configuration. The [global schema](https://github.com/zowe/zowe-install-packaging/blob/v2.x/staging/schemas/zowe-yaml-schema.json) describes the parts of configuration that are common between servers.

The App Server specifically is configured by the `components.app-server` section of the YAML, and that section follows [this App-server schema](https://github.com/zowe/zlux-app-server/blob/v2.x/staging/schemas/app-server-config.json).

ZSS is instead configured by the `components.zss` section, following [the ZSS schema](https://github.com/zowe/zss/blob/v2.x/staging/schemas/zss-config.json).

The App server can additionally use environment variables to override the YAML file.

## Environment variables (app-server only)

CLI arguments take precedence over the configuration file, but are overridden by the CLI arguments.
The format is `ZWED_key=value`, where `ZWED_` is a prefix for any configuration object.

The attributes specified will be put within the `components.app-server` subsection of the Zowe configuration.

The key maps to a JSON object attribute, so to set the value of a nested object, such as the https configuration, you need multiple values.

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
* They are case-sensitive.
* All ASCII characters except `"` are allowed in the object attribute names.
    * An encoding scheme is used for many symbols because environment variables can only have names with the characters `A`-`Z`, `a`-`z`, `0`-`9`, `_`, `.`, and `-`.
    * The scheme is _x followed by 2 hex numbers will be converted to the corresponding ASCII character, such as _x41 mapping to `A`.
* `_` is used as the object separator, so an escape sequence is used if `_` is actually needed for the key.
    * Single leading and trailing _ are treated as literal `_`.
    * `__` will be maps to literal `_`
    * `___` maps to literal `-`
    * `____` maps to literal `.`

**The types of the values are syntax-sensitive.**
* Numbers are treated as numbers, not strings. 
* `false` and `true` are treated as boolean.
* Commas are for arrays. An array of length 1 has a comma at the end.
* Strings can have quotes, but otherwise everything that is not an array, boolean, or number is a string.
* Objects are never values, they are the keys.


## Parameter details
Below is some more detail on certain parameters than can be covered within the json-schema.

### Configuration directories

When running, the App Server will access the server's settings and read/modify the contents of its resource storage.

All of this data is stored within a hierarchy of a few folders, which is correspond to scopes:
- Product: The contents of this folder are not meant to be modified, but used as defaults for a product.
- Site: The contents of this folder are intended to be shared across multiple App Server instances, perhaps on a network drive.
- Instance: This folder represents the broadest scope of data within the given App Server instance.
- Group: Multiple users can be associated into one group, so that settings are shared among them.
- User: When authenticated, users have their own settings and storage for the Apps that they use.

These directories dictate where the [Configuration Dataservice](https://github.com/zowe/zlux/wiki/Configuration-Dataservice) will store content.

#### Directories example

```
  "productDir":"../defaults",
  "siteDir":"/home/myuser/.zowe/workspace/app-server/site",
  "instanceDir":"/home/myuser/.zowe/workspace/app-server",
  "groupsDir":"/home/myuser/.zowe/workspace/app-server/groups",
  "usersDir":"/home/myuser/.zowe/workspace/app-server/users",
```

### App configuration

This section does not cover any dynamic runtime inclusion of Apps, but rather Apps defined in advance.

In the configuration file, a directory can be specified which contains JSON files which tell the server what App is to be included and where to find it on disk. The backend of these Apps use the Server's Plugin structure, so much of the server-side references to Apps use the term Plugin.

To include Apps, be sure to define the location of the Plugins directory in the configuration file, via the top-level attribute *pluginsDir*

:::note

In this example, the directory for these JSON files is [/defaults/plugins](https://github.com/zowe/zlux-app-server/tree/v3.x/master/defaults/plugins). Yet, in order to separate configuration files from runtime files, the App Server will initialize by copying the contents of this folder into the defined instance directory, of which the default is `~/.zowe/workspace/app-server`. So, the example configuration file uses the latter directory.

:::

#### Plug-ins directory example

```
// All paths relative to zlux-app-server/lib
// In real installations, these values will be configured during the install.
//...
  "pluginsDir":"../defaults/plugins",
```

### Logging configuration

For more information, see [Logging Utility](mvd-logutility.md).

### ZSS Configuration

ZSS is configured by the same Zowe YAML file used by the App server, within the `components.zss` section of the file. The [ZSS schema for components.zss be found here](https://github.com/zowe/zss/blob/v2.x/staging/schemas/zss-config.json). More information about the configuration can be found in its [README file](https://github.com/zowe/zss/#quick-run-how-to-start-zss).

#### Connecting ZSS to App Server

The App Server can connect to ZSS either directly or through the API Mediation Layer Gateway when that is running.

The connection information is stored within the object `components.app-server.agent`, which describes whether the Gateway is involved, or if not, on which host and port can ZSS be found. For more information, see the [agent section of the schema](https://github.com/zowe/zlux-app-server/blob/c22105381e129bd999c47e838b424679eba26aa6/schemas/app-server-config.json#L262)

