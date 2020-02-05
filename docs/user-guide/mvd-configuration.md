# Zowe Application Framework configuration
After you install Zowe&trade;, you can optionally configure the Zowe Application Framework as a Mediation Layer client, configure connections for the terminal application plug-ins, or modify the Zowe Application Server and Zowe System Services (ZSS) configuration, as needed.

## Configuring the framework as a Mediation Layer client
For simpler Zowe administration and better security, you can install an instance of the Zowe Application Framework as an API Mediation Layer client.

This configuration is simpler to administer because the framework servers are accessible externally through a single port. It is more secure because you can implement stricter browser security policies for accessing cross-origin content.

You must use SSL certificates to configure the Zowe Application Server to communicate with the SSL-enabled Mediation Layer. Those certificates were created during the Zowe installation process, and are located in the `$ROOT_DIR/components/app-server/share/zlux-app-server/defaults/serverConfig` directory.

### Enabling the Application Server to register with the Mediation Layer

When you install Zowe v1.8.0 or later, the Application Server automatically registers with the Mediation Layer.

For earlier releases, you must register the Application Server with the Mediation Layer manually. Refer to previous release documentation for more information.

### Accessing the Application Server
To access the Application Server through the Mediation Layer, use the Mediation Layer gateway server hostname and port. For example, when accessed directly, this is Zowe Desktop URL: `https://<appservername_port>/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`

When accessed through the Mediation Layer, this is the Zowe Desktop URL:
`https://<gwsname_port>/ui/v1/zlux/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`

## Setting up terminal application plug-ins

Follow these optional steps to configure the default connection to open for the terminal application plug-ins.

### Setting up the TN3270 mainframe terminal application plug-in

The port, security, and other parameters of the TN3270 plug-in are controlled by a configuration file that is present on the initial run. The configuration is located in an instance at `$INSTANCE_DIR/workspace/app-server/ZLUX/pluginStorage/org.zowe.terminal.tn3270/sessions/_defaultTN3270.json`.

The file has the following format:

```
      "host": <hostname>
      "port": <port>
      "security": {
      type: <"telnet" or "tls">
    }
```

**Note:** The file is stored within the Configuration Dataservice structure so that it can be customized for individual users. For example, to customize configuration for a user named "Fred", place a custom file in the path `$INSTANCE_DIR/worksapce/app-server/users/fred/ZLUX/pluginStorage/org.zowe.terminal.tn3270/sessions/_defaultTN3270.json`.

### Setting up the VT Terminal application plug-in

The port, security, and other parameters of the VT plug-in are controlled by a configuration file that is present on the initial run. The configuration is located in an instance at  `$INSTANCE_DIR/workspace/app-server/ZLUX/pluginStorage/org.zowe.terminal.vt/sessions/_defaultVT.json`.

The file has the following format:

```
      "host": <hostname>
      "port": <port>
      "security": {
      type: <"telnet" or "ssh">
    }
```

**Note:** The file is stored within the Configuration Dataservice structure so that it can be customized for individual users. For example, to customize configuration for a user named "Fred", place a custom file in the path `$INSTANCE_DIR/worksapce/app-server/users/fred/ZLUX/pluginStorage/org.zowe.terminal.vt/sessions/_defaultVT.json`.

## Configuration file

The Zowe App Server and ZSS rely on many required or optional parameters to run, which includes setting up networking, deployment directories, plugin locations, and more.

For convenience, the Zowe Application Server and ZSS read from a JSON file with a common structure. ZSS reads this file directly as a startup argument, while the Zowe Application Server (as defined in the `zlux-server-framework` repository) accepts several parameters. The parameters are intended to be read from a JSON file through an implementer of the server, such as the example in the `zlux-app-server` repository (the `lib/zluxServer.js` file). The file accepts a JSON file that specifies most, if not all, of the parameters needed. Other parameters can be provided through flags, if needed.

For an instance, the configuration file is located at and can be edited at `$INSTANCE_DIR/workspace/app-server/serverConfig/server.json`. The defaults from which that file is generated are located at `$ROOT_DIR/components/app-server/share/zlux-app-server/defaults/serverConfig/server.json`

**Note:** All examples are based on the *zlux-app-server* repository defaults.

## Network configuration

**Note:** The following attributes are to be defined in the server's JSON configuration file.

The App Server can be accessed over HTTP and/or HTTPS, provided it has been configured for either.

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
When running, the App Server will access the server's settings and read or modify the contents of its resource storage. All of this data is stored within a heirarchy of folders which correspond to scopes:

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
Prior to Zowe release 1.8.0, the location of the configuration directories were initialized to be within the `zlux-app-server` folder unless otherwise customized. 1.8.0 has backwards compatibility for the existence of these directories, but they can and should be migrated to take advantage of future enhancements.

| Folder | New Location | Old Location | Note
|--------|--------------|--------------|-----
| productDir | zlux-app-server/defaults | zlux-app-server/deploy/product | Official installs place zlux-app-server within <ROOT_DIR>/components/app-server/share
| siteDir | <INSTANCE_DIR>/workspace/app-server/site | zlux-app-server/deploy/site | INSTANCE_DIR is ~/.zowe if not otherwise defined. Site is placed within instance due to lack of SITE_DIR as of 1.8
| instanceDir | <INSTANCE_DIR>/workspace/app-server | zlux-app-server/deploy/instance |
| groupsDir | <INSTANCE_DIR>/workspace/app-server/groups | zlux-app-server/deploy/instance/groups |
| usersDir | <INSTANCE_DIR>/workspace/app-server/users | zlux-app-server/deploy/instance/users |
| pluginsDir | <INSTANCE_DIR>/workspace/app-server/plugins | zlux-app-server/deploy/instance/ZLUX/plugins | Defaults located at zlux-app-server/defaults/plugins, previously at zlux-app-server/plugins


## Application plug-in configuration

This topic describes application plug-ins that are defined in advance.

In the configuration file, you can specify a directory that contains JSON files, which tell the server what application plug-in to include and where to find it on disk. The backend of these application plug-ins use the server's plug-in structure, so much of the server-side references to application plug-ins use the term *plug-in*.

To include application plug-ins, define the location of the plug-ins directory in the configuration file, through the top-level attribute **pluginsDir**.

**Note:** In this example, the directory for these JSON files is the Application Server defaults. However, in an instance of Zowe it is best to provide a folder unique to that instance - usually `$INSTANCE_DIR/workspace/app-server/plugins`.

### Plug-ins directory example

```
// All paths relative to zlux-app-server/lib
// In real installations, these values will be configured during the install process.
//...
  "pluginsDir":"../defaults/plugins",
```

## Logging configuration

For more information, see [Logging Utility](../extend/extend-desktop/mvd-logutility.md).

## ZSS configuration

Running ZSS requires a JSON configuration file that is similar or the same as the one used for the Zowe Application Server. The attributes that are needed for ZSS, at minimum, are:*productDir*, *siteDir*, *instanceDir*, *groupsDir*, *usersDir*, *pluginsDir* and *agent.http.port*. All of these attributes have the same meaning as described above for the server, but if the Zowe Application Server and ZSS are not run from the same location, then these directories can be different.

Attributes that control ZSS are in the agent object. For example, *agent.http.port* is the TCP port that ZSS will listen on to be contacted by the App Server. Define this in the configuration file as a value between 1024-65535. Similarly, if specified, *agent.http.ipAddresses* will be used to determine which IP addresses the server should bind to. Only the first value of the array is used. It can either be a hostname or an ipv4 address.

Example of the agent body:
```
  "agent": {
    "host": "localhost",
    "http": {
      "ipAddresses": ["127.0.0.1"],
      "port": 8542
    }
  }
```

### Connecting App Server to ZSS

When running the App Server, simply specify a few flags to declare which ZSS instance the App Server will proxy ZSS requests to:

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

#### Configuring the Zowe App Server for HTTPS communication with ZSS
Copy the CA certificate to the ZSS server. Then in the Zowe App Server configuration file, specify the location of the certificate, and add a parameter to specify that ZSS uses AT-TLS.

1. Enter the following command to copy the CA certificate to the correct location in UNIX System Services (USS):

```
cp "//'[output_dataset_name]'" 'zlux-app-server/deploy/instance/ZLUX/serverConfig/[ca_cert]'
```
2. In the `[INSTANCE_DIR]/workspace/app-server/serverConfig` directory, open the `server.json` file.
3. In the **node.https.certificateAuthorities** object, add the CA certificate file path, for example:
```
"certificateAuthorities": ["[INSTANCE_DIR]/workspace/app-server/serverConfig/[ca_cert]"]
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

### Installing additional ZSS instances
After you install Zowe, you can install and configure additional instances of ZSS on the same z/OS server. You might want to do this to test different ZSS versions.

The following steps assume you have installed a Zowe runtime instance (which includes ZSS), and that you are installing a second runtime instance to install an additional ZSS.

1. To stop the installed Zowe runtime, in SDSF enter the following command:

   ```text
    /C ${ZOWE_PREFIX}${ZOWE_INSTANCE}SV
    ```
    Where ZOWE_PREFIX and ZOWE_INSTANCE are specified in your configuration (and default to ZWE and 1)

2. Install a new Zowe runtime by following steps in [Installing Zowe on z/OS](install-zos.md#obtaining-and-preparing-the-installation-file).

   **Note:** In the `zowe-install.yaml` configuration file, specify ports that are not used by the first Zowe runtime.

3. To restart the first Zowe runtime, in SDSF enter the following command:

   ```text
   /S ZWESVSTC,SRVRPATH='$ZOWE_ROOT_DIR'
   ```

   Where `'$ZOWE_ROOT_DIR'` is the first Zowe runtime root directory. By default the command starts the most recently installed runtime unless you specify the root directory of the runtime that you want to start.

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

6. Make sure that the TSO user ID that runs the first ZSS started task also runs the new ZSS started task. The default ID is IZUSVR.

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

   ```text
   /S ZWESVSTC,INSTANCE='$ZOWE_INSTANCE_DIR'
   ```

9.  To verify that the new cross-memory server is being used, check for the following messages in the `ZWESVSTC` server job log:

   `ZIS status - Ok (name='ZWESIS_MYSRV    ', cmsRC=0, description='Ok', clientVersion=2)`

## Controlling access to applications

You can control which applications are accessible (visible) to all Zowe desktop users, and which are accessible only to individual users. For example, you can make an application that is under development only visible to the team working on it.

You control access by editing JSON files that list the apps. One file lists the apps all users can see, and you can create a file for each user. When a user logs into the desktop, Zowe determines the apps that user can see by concatenating their list with the all users list.

You can also control access to the JSON files. The files are accessible directly on the file system, and since they are within the configuration dataservice directories, they are also accessible via REST API. We recommend that only Zowe administrators be allowed to access the file system locations, and you control that by setting the directories and their contents to have file permissions on z/OS that only allow the Zowe admin group read & write access. You control who can read and edit the JSON files through the REST API by controlling who can [access the configuration dataservice objects](mvd-configuration.md#creating-authorization-profiles) URLs that serve the JSON files.

### Controlling application access for all users

1. Open the Zowe Application Server configuration JSON file. By default, the file is in the following location:
    ```
    $ROOT_DIR/components/app-server/share/zlux-app-server/defaults/serverConfig/server.json
    ```

2. To enable RBAC, in the `dataserviceAuthentication` object add the object: `"rbac": true`

3. Navigate to the following location:
   ```
   $ROOT_DIR/components/app-server/share/zlux-app-server/defaults/ZLUX/pluginStorage/org.zowe.zlux.bootstrap/plugins
   ```
4. Copy the `allowedPlugins.json` file and paste it in the following location:  
   ```
   .zowe/workspace/app-server/ZLUX/pluginStorage/org.zowe.zlux.bootstrap
   ```
5. Open the copied `allowedPlugins.json` file and perform either of the following steps:
    - To an application unavailable, delete it from the list of objects.
    - To make an application available, copy an existing plugin object and specify the application's values in the new object. Identifier and version attributes are required. 

6. [Restart the app server](configure-zowe-server.md#stopping-the-zwesvstc-proc).

### Controlling application access for individual users

1. Open the Zowe Application Server configuration JSON file. By default, the file is in the following location:
    ```
    $ROOT_DIR/components/app-server/share/zlux-app-server/defaults/serverConfig/server.json
    ```
2. To enable RBAC, in the `dataserviceAuthentication` object add the object: `"rbac": true`

3. In the user's ID directory path, in the `\pluginStorage` directory, create `\org.zowe.zlux.bootstrap\plugins` directories. For example:
    ```
    .zowe\workspace\app-server\users\TS6320\ZLUX\pluginStorage\org.zowe.zlux.bootstrap\plugins
    ```

4. In the `/plugins` directory, create an `allowedPlugins.json` file. You can use the default `allowedPlugins.json` file as a template by copying it from the following location:
   ```
   $ROOT_DIR/components/app-server/share/zlux-app-server/defaults/ZLUX/pluginStorage/org.zowe.zlux.bootstrap/plugins
   ```
6. Open the `allowedPlugins.json` file and specify applications that user can access. For example:
    ```json
    {
      "allowedPlugins": [
        {
          "identifier": "org.zowe.appA",
          "versions": [
            "*"
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

You can apply access control to Zowe endpoints and to your application endpoints. Zowe provides endpoints for a set of configuration dataservices and a set of core dataservices. Applications can use [configuration endpoints](../extend/extend-desktop/mvd-configdataservice.md#configuration-dataservice) to store and their own configuration and other data. Administrators can use core endpoints to [get status information](mvd-configuration.md#Administering-the-servers-and-plugins-using-an-API) from the Application Framework and ZSS servers. Any dataservice added as part of an application plugin is a service dataservice.

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

For more information RACF security administration, see the IBM Knowledge Center at [https://www.ibm.com/support/knowledgecenter/](https://www.ibm.com/support/knowledgecenter/).

### Enabling RBAC

By default, RBAC is disabled and all authenticated Zowe users can access all dataservices. To enable RBAC, follow these steps:

1. Open the Zowe Application Server configuration JSON file. In the a server instance, the configuration file is `$INSTANCE_DIR/workspace/app-server/serverConfig/server.json`.

2. In the `dataserviceAuthentication` object, add `"rbac": true`.

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


## Enabling tracing

To obtain more information about how a server is working, you can enable tracing within the `server.json` file.

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

### Zowe Application Server tracing

To determine how the Zowe Application Server (`zlux-app-server`) is working, you can assign a logging level to one or more of the pre-defined logger names in the `server.json` file.

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

### Log levels

The log levels are:

 -  SEVERE = 0,
 -  WARNING = 1,
 -  INFO = 2,
 -  FINE = 3,
 -  FINER = 4,
 -  FINEST = 5

FINE, FINER, and FINEST are log levels for debugging, with increasing verbosity.

### Enabling tracing for ZSS

To increase logging for ZSS, you can assign a logging level (an integer value greater than zero) to one or more of the pre-defined logger names in the `server.json` file.

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

When you are finished specifying the settings, save the `server.json` file.


## Zowe Application Framework logging

The Zowe Application Framework log files contain processing messages and statistics. The log files are generated in the following default locations:

- Zowe Application Server: `$INSTANCE_DIR/logs/appServer-yyyy-mm-dd-hh-mm.log`
- ZSS: `$INSTANCE_DIR/logs/zssServer-yyyy-mm-dd-hh-mm.log`

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

## Administering the servers and plugins using an API
You can use a REST API to retrieve and edit Zowe Application Server and ZSS server configuration values, and list, add, update, and delete plugins. If an administrator has configured Zowe to [use RBAC](https://docs.zowe.org/stable/user-guide/mvd-configuration.html#applying-role-based-access-control-to-dataservices), they must authorize you to access the endpoints.

The API returns the following information in a JSON response:

| API                                                       | Description                                                  |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| /server (GET)                                             | Returns a list of accessible server endpoints for the Zowe Application Server. |
| /server/config (GET)                                      | Returns the Zowe Application Server configuration from the `zluxserver.json` file. |
| /server/log (GET)                                         | Returns the contents of the Zowe Application Server log file. |
| /server/loglevels (GET)                                   | Returns the verbosity levels set in the Zowe Application Server logger. |
| /server/environment (GET)                                 | Returns Zowe Application Server environment information, such as the operating system version, node server version, and process ID. |
| /server/reload (GET)                                      | Reloads the Zowe Application Server. Only available in cluster mode. |
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

Swagger API documentation is provided in the `$ROOT_DIR/components/app-server/share/zlux-app-server/doc/swagger/server-plugins-api.yaml` file. To see it in HTML format, you can paste the contents into the Swagger editor at https://editor.swagger.io/.

**Note:** The "agent" end points interact with the agent specified in the `server.json` file. By default this is ZSS.
