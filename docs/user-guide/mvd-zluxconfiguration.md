# zLUX configuration
After you install Zowe, you can optionally configure the terminal application plug-ins or modify the zLUX Proxy Server and ZSS configuration, if needed.

## Setting up terminal application plug-ins

Follow these optional steps to configure the default connection to open for the terminal application plug-ins.

### Setting up the TN3270 mainframe terminal application plug-in

`_defaultTN3270.json` is a file in `tn3270-ng2/`, which is deployed during setup. Within this file, you can specify the following parameters to configure the terminal connection:
    
      "host": <hostname>
      "port": <port>
      “security”: {
      type: <”telnet” or “tls”>
    }
    
### Setting up the VT Terminal application plug-in

`_defaultVT.json` is a file in `vt-ng2/`, which is deployed during setup. Within this file, you can specify the following parameters to configure the terminal connection:
 
    “host”:<hostname>
    “port”:<port>
    “security”: {
      type: <”telnet” or “ssh”>
    }
    
## Configuring the zLUX Proxy Server and ZSS

### Configuration file
The zLUX Proxy Server and ZSS rely on many parameters to run, which includes setting up networking, deployment directories, plug-in locations, and more. 

For convenience, the zLUX Proxy Server and ZSS read from a JSON file with a common structure. ZSS reads this file directly as a startup argument, while the zLUX Proxy Server as defined in the `zlux-proxy-server` repository accepts several parameters, which are intended to be read from a JSON file through an implementer of the server, such as the example in the `zlux-example-server` repository, the `js/zluxServer.js` file. This file accepts a JSON file that specifies most, if not all, of the parameters needed. Other parameters can be provided through flags, if needed. 

An example JSON file can be found in the `zlux-example-server` repository, in the zluxserver.json in the `config` directory. 

**Note:** All examples are based on the *zlux-example-server* repository.

### Network configuration

**Note:** The following attributes are to be defined in the server's JSON configuration file.

The zLUX server can be accessed over HTTP, HTTPS, or both, provided it has been configured for either (or both). 

#### HTTP

To configure the server for HTTP, complete these steps:

1. Define an attribute *http* within the top-level *node* attribute. 

2. Define *port* within *http*. Where *port* is an integer parameter for the TCP port on which the server will listen. Specify 80 or a value between 1024-65535.

#### HTTPS

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

#### Network example

In the example configuration, both HTTP and HTTPS are specified:

```
  "node": {
    "https": {
      "port": 8544,
      //pfx (string), keys, certificates, certificateAuthorities, and certificateRevocationLists are all valid here.
      "keys": ["../deploy/product/ZLUX/serverConfig/server.key"],
      "certificates": ["../deploy/product/ZLUX/serverConfig/server.cert"]
    },
    "http": {
      "port": 8543
    }
  }
```
### Deploy configuration

When the zLUX Proxy Server is running, it accesses the server's settings and reads or modifies the contents of its resource storage. All of this data is stored within the `Deploy` folder hierarchy, which is spread out into a several scopes:

- `Product`: The contents of this folder are not meant to be modified, but used as defaults for a product.
- `Site`: The contents of this folder are intended to be shared across multiple zLUX Proxy Server instances, perhaps on a network drive.
- `Instance`: This folder represents the broadest scope of data within the given zLUX Proxy Server instance.
- `Group`: Multiple users can be associated into one group, so that settings are shared among them.
- `User`: When authenticated, users have their own settings and storage for the application plug-ins that they use.

These directories dictate where the [Configuration Dataservice](mvd-configdataservice.md) stores content.

#### Deploy example
```
// All paths relative to zlux-example-server/js or zlux-example-server/bin
// In real installations, these values will be configured during the installation process.
  "rootDir":"../deploy",
  "productDir":"../deploy/product",
  "siteDir":"../deploy/site",
  "instanceDir":"../deploy/instance",
  "groupsDir":"../deploy/instance/groups",
  "usersDir":"../deploy/instance/users"

```

### Application plug-in configuration

This topic describes application plug-ins that are defined in advance.

In the configuration file, you can specify a directory that contains JSON files, which tell the server what application plug-in to include and where to find it on disk. The backend of these application plug-ins use the server's plug-in structure, so much of the server-side references to application plug-ins use the term *plug-in*.

To include application plug-ins, define the location of the plug-ins directory in the configuration file, through the top-level attribute **pluginsDir**

**Note:** In this example, the directory for these JSON files is [/plugins](https://github.com/gizafoundation/zlux-example-server/tree/master/plugins). Yet, to separate configuration files from runtime files, the *zlux-example-server* repository copies the contents of this folder into `/deploy/instance/ZLUX/plugins`. So, the example configuration file uses the latter directory.

#### Plug-ins directory example
```
// All paths relative to zlux-example-server/js or zlux-example-server/bin
// In real installations, these values will be configured during the install process.
//...
  "pluginsDir":"../deploy/instance/ZLUX/plugins",
```

### Logging configuration

For more information, see [Logging Utility](mvd-logutility.md)

### ZSS configuration

Running ZSS requires a JSON configuration file that is similar or the same as the one used for the zLUX Proxy Server. The attributes that are needed for ZSS, at minimum, are:*rootDir*, *productDir*, *siteDir*, *instanceDir*, *groupsDir*, *usersDir*, *pluginsDir* and *zssPort*. All of these attributes have the same meaning as described above for the Proxy Server, but if the Proxy Server and ZSS are not run from the same location, then these directories can be different.

The *zssPort* attribute is specific to ZSS. This is the TCP port on which ZSS listens in order to be contacted by the zLUX server. Define this port in the configuration file as a value between 1024-65535.

#### Connecting the zLUX Proxy Server to ZSS

When you run the zLUX Proxy Server, specify the following flags to declare which ZSS instance zLUX will proxy ZSS requests to:

- *-h*: Declares the host where ZSS can be found. Use as "-h \<hostname\>" 
- *-P*: Declares the port at which ZSS is listening. Use as "-P \<port\>"
