# Zowe Application Framework configuration
After you install Zowe, you can optionally configure the terminal application plug-ins or modify the Zowe Application Server and Zowe System Services (ZSS) configuration, if needed.

## Setting up terminal application plug-ins

Follow these optional steps to configure the default connection to open for the terminal application plug-ins.

### Setting up the TN3270 mainframe terminal application plug-in

`_defaultTN3270.json` is a file in `tn3270-ng2/`, which is deployed during setup. Within this file, you can specify the following parameters to configure the terminal connection:
```    
      "host": <hostname>
      "port": <port>
      “security”: {
      type: <”telnet” or “tls”>
    }
```    
### Setting up the VT Terminal application plug-in

`_defaultVT.json` is a file in `vt-ng2/`, which is deployed during setup. Within this file, you can specify the following parameters to configure the terminal connection:
``` 
    “host”:<hostname>
    “port”:<port>
    “security”: {
      type: <”telnet” or “ssh”>
    }
```    

### Configuration file
The Zowe Application Server and ZSS rely on many parameters to run, which includes setting up networking, deployment directories, plug-in locations, and more. 

For convenience, the Zowe Application Server and ZSS read from a JSON file with a common structure. ZSS reads this file directly as a startup argument, while the Zowe Application Server (as defined in the `zlux-server-framework` repository) accepts several parameters, which are intended to be read from a JSON file through an implementer of the server, such as the example in the `zlux-app-server` repository, the `js/zluxServer.js` file. This file accepts a JSON file that specifies most, if not all, of the parameters needed. Other parameters can be provided through flags, if needed. 

An example of a JSON file (`zluxserver.json`) can be found in the `zlux-app-server` repository, in the `config` directory. 

**Note:** All examples are based on the *zlux-app-server* repository.

### Network configuration

**Note:** The following attributes are to be defined in the server's JSON configuration file.

The Zowe Application Server can be accessed over HTTP, HTTPS, or both, provided it has been configured for either (or both). 

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

When the Zowe Application Server is running, it accesses the server's settings and reads or modifies the contents of its resource storage. All of this data is stored within the `Deploy` folder hierarchy, which is spread out into a several scopes:

- `Product`: The contents of this folder are not meant to be modified, but used as defaults for a product.
- `Site`: The contents of this folder are intended to be shared across multiple Zowe Application Server instances, perhaps on a network drive.
- `Instance`: This folder represents the broadest scope of data within the given Zowe Application Server instance.
- `Group`: Multiple users can be associated into one group, so that settings are shared among them.
- `User`: When authenticated, users have their own settings and storage for the application plug-ins that they use.

These directories dictate where the [Configuration Dataservice](../extend/extend-desktop/mvd-configdataservice.md) stores content.

#### Deploy example
```
// All paths relative to zlux-app-server/js or zlux-app-server/bin
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

To include application plug-ins, define the location of the plug-ins directory in the configuration file, through the top-level attribute **pluginsDir**.

**Note:** In this example, the directory for these JSON files is `/plugins`. Yet, to separate configuration files from runtime files, the `zlux-app-server` repository copies the contents of this folder into `/deploy/instance/ZLUX/plugins`. So, the example configuration file uses the latter directory.

#### Plug-ins directory example
```
// All paths relative to zlux-app-server/js or zlux-app-server/bin
// In real installations, these values will be configured during the install process.
//...
  "pluginsDir":"../deploy/instance/ZLUX/plugins",
```

### Logging configuration

For more information, see [Logging Utility](../extend/extend-desktop/mvd-logutility.md).

### ZSS configuration

Running ZSS requires a JSON configuration file that is similar or the same as the one used for the Zowe Application Server. The attributes that are needed for ZSS, at minimum, are:*rootDir*, *productDir*, *siteDir*, *instanceDir*, *groupsDir*, *usersDir*, *pluginsDir* and *zssPort*. All of these attributes have the same meaning as described above for the server, but if the Zowe Application Server and ZSS are not run from the same location, then these directories can be different.

The *zssPort* attribute is specific to ZSS. This is the TCP port on which ZSS listens in order to be contacted by the Zowe Application Server. Define this port in the configuration file as a value between 1024-65535.

#### Connecting the Zowe Application Server to ZSS

When you run the Zowe Application Server, specify the following flags to declare which ZSS instance the Zowe Application Framework will proxy ZSS requests to:

- *-h*: Declares the host where ZSS can be found. Use as "-h \<hostname\>" 
- *-P*: Declares the port at which ZSS is listening. Use as "-P \<port\>"

### Configuring ZSS for HTTPS
To secure ZSS, you can use Application Transparent Transport Layer Security (AT-TLS) to enable Hyper Text Transfer Protocol Secure (HTTPS) on communication with ZSS.

Before you begin, you must have a basic knowledge of RACF and AT-TLS, and you must have Policy Agent configured. For more information on [AT-TLS](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.1.0/com.ibm.zos.v2r1.halx001/transtls.htm) and [Policy Agent](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.2.0/com.ibm.zos.v2r2.halz002/pbn_pol_agnt.htm), see the [z/OS Knowledge Center](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.2.0/com.ibm.zos.v2r2/en/homepage.html).

To configure ZSS for HTTPS, you create a certificate authority (CA) certificate and a personal certificate, and add the personal certificate to a key ring. Then you define an AT-TLS rule. Then you copy the certificate to the Zowe App Server and specify values in the Zowe App Server configuration file.

By default, the Zowe App Server is the only client that communicates with the ZSS server. In these steps, you configure HTTPS between them by creating a CA certificate and using it to sign a personal certificate. If you want to configure other clients to communicate with ZSS, best practice is to sign their certificates using a recognized certificate authority, such as Symantec. For more information, see documentation for that client.

**Note:** Bracketed values below (including the brackets) are variables. Replace them with values relevant to your organization.

#### Creating certificates and a key ring
Use the IBM Resource Access Control Facility (RACF) to create a CA certificate and a personal certificate, and sign the personal certificate with the CA certificate. Then create a key ring with the personal certificate attached.

1. Enter the following command to generate a RACF (CA) certificate:
  ```
  RACDCERT CERTAUTH GENCERT +                          
    SUBJECTSDN(CN('[common_name]') +                        
    OU('[organizational_unit]') +                                       
    O('[organization_name]') +                                         
    L('[locality]') SP('[state_or_province]') C('[country]')) +           
    KEYUSAGE(HANDSHAKE DATAENCRYPT DOCSIGN CERTSIGN) + 
    WITHLABEL('[ca_label]') +                            
    NOTAFTER(DATE([xxxx/xx/xx])) +                       
    SIZE(2048)
  ```
  **Note:** `[common_name]` must be the ZSS server host name.

2. Enter the follow command to generate a RACF personal certificate signed by the CA certificate:
  ```
  RACDCERT ID('[cert_owner]') GENCERT +                          
    SUBJECTSDN(CN('[common_name]') +                        
    OU('[organizational_unit]') +                                       
    O('[organization_name]') +                                         
    L('[locality]') SP('[state_or_province]') C('[country]')) +           
    KEYUSAGE(HANDSHAKE DATAENCRYPT DOCSIGN CERTSIGN) + 
    WITHLABEL('[personal_label]') +                            
    NOTAFTER(DATE([xxxx/xx/xx])) +                       
    SIZE(2048) +
    SIGNWITH(CERTAUTH LABEL('[ca_label]'))
  ```

3. Enter the following command to create a RACF key ring and connect the personal certificate to the key ring:
  ```
  RACDCERT ID([cert_owner]) ADDRING([ring_name])                
  RACDCERT CONNECT(ID([cert_owner]) LABEL('[cert_label]') RING([ring_name])) 
  RACDCERT ID([cert_owner]) LISTRING([ring_name])
  ```

4. Enter the following command to refresh the DIGTRING and DIGTCERT classes to activate your changes:
  ```
  SETROPTS RACLIST(DIGTRING,DIGTCERT) REFRESH
  ```

5. Enter the following command to verify your changes:
  ```
  RACDCERT LISTRING([ring_name]) ID([cert_owner])
  ```

6. Enter the following command to export the RACF CA certificate to a dataset:
  ```
  RACDCERT EXPORT(LABEL('[ca_label]')) CERTAUTH DSN('[output_dataset_name]') FORMAT(CERTB64)
  ```

#### Defining the AT-TLS rule
To define the AT-TLS rule, use the sample below to specify values in your AT-TLS Policy Agent Configuration file:

```
TTLSRule                          ATTLS1~ZSS
{
  LocalAddr                       All
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

#### Configuring the Zowe App Server for HTTPS communication with ZSS
Copy the CA certificate to the ZSS server. Then in the Zowe App Server configuration file, specify the location of the certificate, and add a parameter to specify that ZSS uses AT-TLS.

1. Enter the following command to copy the CA certificate to the correct location in UNIX System Services (USS):

```
cp "//'[output_dataset_name]'" 'zlux-app-server/deploy/instance/ZLUX/serverConfig/[ca_cert]'
```
2. In the `zlux-app-server/deploy/instance/ZLUX/serverConfig` directory, open the `zluxserver.json` file.
3. In the **node.https.certificateAuthorities** object, add the CA certificate file path, for example:
```
"certificateAuthorities": ["../deploy/instance/ZLUX/serverConfig/[ca_cert]"]
```
4. In the **agent.http** object add the key-value pair `"attls": true`, for example:
```
"agent": {
  "host": "localhost",
  "http": {
    "ipAddresses": ["127.0.0.1"],
    "port": 8542,
    "attls": true
  }
}
```

### Enabling tracing

To obtain more information about how a server is working, you can enable tracing within the `zluxserver.json` file. 

For example:
 
```
"logLevels": {
  "_zsf.routing": 0,
  "_zsf.install": 0,
  "_zss.traceLevel": 0,
  "_zss.fileTrace": 1
}
```

Specify the following settings inside the **logLevels** object.

All settings are optional.

#### Zowe Application Server tracing

To determine how the Zowe Application Server (`zlux-app-server`) is working, you can assign a logging level to one or more of the pre-defined logger names in the `zluxserver.json` file. 

The log prefix for the Zowe Application Server is **_zsf**, which is used by the server framework. (Applications and plug-ins that are attached to the server do not use the **_zsf** prefix.)

The following are the logger names that you can specify:

**_zsf.bootstrap**
Logging that pertains to the startup of the server.

**_zsf.auth**
Logging for network calls that must be checked for authentication and authorization purposes.

**_zsf.static**
Logging of the serving of static files (such as images) from an application's `/web` folder.

**_zsf.child**
Logging of child processes, if any.

**_zsf.utils**
Logging for miscellaneous utilities that the server relies upon.

**_zsf.proxy**
Logging for proxies that are set up in the server.

**_zsf.install**
Logging for the installation of plug-ins.

**_zsf.apiml**
Logging for communication with the api mediation layer.

**_zsf.routing**
Logging for dispatching network requests to plug-in dataservices.

**_zsf.network**
Logging for the HTTPS server status (connection, ports, IP, and so on)

#### Log levels

The log levels are:

 -  SEVERE = 0,
 -  WARNING = 1,
 -  INFO = 2,
 -  FINE = 3,
 -  FINER = 4,
 -  FINEST = 5

FINE, FINER, and FINEST are log levels for debugging, with increasing verbosity.

#### Enabling tracing for ZSS 

To increase logging for ZSS, you can assign a logging level (an integer value greater than zero) to one or more of the pre-defined logger names in the `zluxserver.json` file.

A higher value specifies greater verbosity.

The log prefix for ZSS is **_zss**. The following are the logger names that you can specify:

**_zss.traceLevel:**
Controls general server logging verbosity.

**_zss.fileTrace:** 
Logs file serving behavior (if file serving is enabled).

**_zss.socketTrace:** 
Logs general TCP Socket behavior.

**_zss.httpParseTrace:** 
Logs parsing of HTTP messages.

**_zss.httpDispatchTrace:** 
Logs dispatching of HTTP messages to dataservices.

**_zss.httpHeadersTrace:** 
Logs parsing and setting of HTTP headers.

**_zss.httpSocketTrace:** 
Logs TCP socket behavior for HTTP.

**_zss.httpCloseConversationTrace:** 
Logs HTTP behavior for when an HTTP conversation ends.

**_zss.httpAuthTrace:** 
Logs behavior for session security.

When you are finished specifying the settings, save the `zluxserver.json` file.


## Zowe Application Framework logging

The Zowe Application Framework log files contain processing messages and statistics. The log files are generated in the following default locations:

- Zowe Application Server: `zlux-app-server/log/nodeServer-yyyy-mm-dd-hh-mm.log`
- ZSS: `zlux-app-server/log/zssServer-yyyy-mm-dd-hh-mm.log`
 
The logs are timestamped in the format yyyy-mm-dd-hh-mm and older logs are deleted when a new log is created at server startup.


### Controlling the logging location

The log information is written to a file and to the screen. (On Windows, logs are written to a file only.)

#### ZLUX_NODE_LOG_DIR and ZSS_LOG_DIR environment variables

To control where the information is logged, use the environment variable *ZLUX_NODE_LOG_DIR*, for the Zowe Application Server, and *ZSS_LOG_DIR*, for ZSS. While these variables are intended to specify a directory, if you specify a location that is a file name, Zowe will write the logs to the specified file instead (for example: `/dev/null` to disable logging). 

When you specify the environment variables *ZLUX_NODE_LOG_DIR* and *ZSS_LOG_DIR* and you specify directories rather than files, Zowe will timestamp the logs and delete the older logs that exceed the *ZLUX_NODE_LOGS_TO_KEEP* threshold. 

#### ZLUX_NODE_LOG_FILE and ZSS_LOG_FILE environment variables

If you set the log file name for the Zowe Application Server by setting the *ZLUX_NODE_LOG_FILE* environment variable, or if you set the log file for ZSS by setting the *ZSS_LOG_FILE* environment variable, there will only be one log file, and it will be overwritten each time the server is launched.

**Note**: When you set the *ZLUX_NODE_LOG_FILE* or *ZSS_LOG_FILE* environment variables, Zowe will not override the log names, set a timestamp, or delete the logs.

If the directory or file cannot be created, the server will run (but it might not perform logging properly).

### Retaining logs
By default, the last five logs are retained. To specify a different number of logs to retain, set *ZLUX_NODE_LOGS_TO_KEEP* (Zowe Application Server logs) or *ZSS_LOGS_TO_KEEP* (ZSS logs) to the number of logs that you want to keep. For example, if you set *ZLUX_NODE_LOGS_TO_KEEP* to 10, when the eleventh log is created, the first log is deleted. 
