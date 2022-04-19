# Creating and configuring the Zowe instance directory

The Zowe instance directory or `<INSTANCE_DIRECTORY>` contains configuration data required to launch a Zowe runtime. These data includes port numbers, location of dependent runtimes such as Java, Node, z/OSMF, as well as log files. When Zowe is started, configuration data is read from files in the instance directory and logs write to files in the instance directory.

**Note:** The creation of an instance directory sets default values for users who want to run all Zowe z/OS components. If you are using Docker, it is necessary to make a small configuration change to disable the components on z/OS that instead run in Docker.

## Introduction  

The purpose of the instance directory is to hold information in the z/OS File System (zFS) that is created (such as log files) or modified (such as preferences) or configured (such as port numbers) away from the zFS runtime directory for Zowe.  This allows the runtime directory to be read-only and to be replaced when a new Zowe release is installed, with customizations being preserved in the instance directory.  

Multiple instance directories can be created and used to launch independent Zowe runtimes from the same Zowe runtime directory. 

The Zowe instance directory contains a file `instance.env` that stores the Zowe configuration data. These data are read each time Zowe is started. You can modify `instance.env` to configure the Zowe runtime. See [Updating the instance.env configuration file](#updating-the-instanceenv-configuration-file) for more information.  

Alternatively, from v1.22.0 release, you can use a YAML format configuration file `zowe.yaml` instead of `instance.env` to configure the Zowe runtime. See [Updating the zowe.yaml configuration file](#updating-the-zowe-yaml-configuration-file) for more information.

The instance directory `<INSTANCE_DIRECTORY>/bin` contains the following key scripts:
- **`zowe-start.sh`**  
 This script is used to start the Zowe runtime by launching the `ZWESVSTC` started task.
- **`zowe-stop.sh**`**  
 This script is used to stop the Zowe runtime by terminating the `ZWESVSTC` started task.  
- **`zowe-support.sh`**  
This script can be used to capture diagnostics around the Zowe runtime for troubleshooting and off-line problem determination. For more information, see [Capturing diagnostics to assist problem determination](../troubleshoot/troubleshoot-diagnostics.md).

**High availability considerations:** 

- If you plan to run Zowe in a Sysplex for high availability, the instance directory should be placed in a shared USS file system. This way, all Zowe instances within the Sysplex can read and write to the same instance directory.
- `zowe.yaml` is required if you want to start Zowe in high availability mode. 

## Prerequisites

Before creating an instance directory, ensure that you have created a keystore directory that contains the Zowe certificate. See [Creating Zowe certificates](configure-certificates.md) for instructions.  Also, ensure that you have already configured the z/OS environment. See [Configuring the z/OS system for Zowe](configure-zos-system.md) for instructions.

## Creating an instance directory

To create an instance directory, use the `zowe-configure-instance.sh` script.

Navigate to the Zowe runtime directory `<RUNTIME_DIR>` and execute the following commands:

```shell
<RUNTIME_DIR>/bin/zowe-configure-instance.sh -c <PATH_TO_INSTANCE_DIR>
```

If you have an instance directory that is created from a previous release of Zowe 1.8 or later and are installing a newer release of Zowe, run the following script:  
`zowe-configure-instance.sh -c <PATH_TO_INSTANCE_DIR>`  
Ensure that you are pointing to the existing instance directory. This updates the directory with any new values. The release documentation for each new release specifies when running this script is required. The file `manifest.json` within each instance directory contains information for which Zowe release it was created from.

In order to allow the `ZWESVSTC` started task to have permission to access the contents of the `<INSTANCE_DIR>` the `zowe-configure-instance.sh` script sets the group ownership of the top level directory and its child to be `ZWEADMIN`.  If a different group is used for the `ZWESVSTC` started task you can specify this with the optional `-g` argument.

**Example:**

```shell
<RUNTIME_DIR>/bin/zowe-configure-instance.sh -c <PATH_TO_INSTANCE_DIR> -g <GROUP>
```

Watch the following video that shows how to create an `instance.env` file that is used to launch Zowe with default parameters and a USS keystore containing a self-signed TLS certificate.

<iframe class="embed-responsive-item" id="youtubeplayer" title="Zowe Configure Instance and Launch with Self-Signed Keystore Certificate" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/oxmDHZUFjtg" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"> </iframe>

[Download the script](/Zowe_launch_self_signed_certificate.txt)

## Updating the instance.env configuration file

To operate Zowe, a number of zFS folders need to be located for prerequisites on the platform. Default values are selected when you run `zowe-configure-instance.sh`. You might want to modify the values. 

- [Zowe prerequisites](#zowe-prerequisites)
- [Domain, Hostname and IP Address](#domain-hostname-and-ip-address)
- [Component groups](#component-groups)
- [Keystore configuration](#keystore-configuration)
- [Address space names](#address-space-names)
- [Ports](#ports)
    - [Terminal ports](#terminal-ports)
- [API Mediation Layer configuration](#api-mediation-layer-configuration)
- [Cross memory server](#cross-memory-server)
- [Extensions](#extensions)

### Zowe prerequisites

- **`JAVA_HOME`**  
  The path where 64-bit Java 8 or later is installed.  Only needs to be specified if not already set as a shell variable.  Defaults to `/usr/lpp/java/J8.0_64`.
- **`NODE_HOME`**  
  The path to the Node.js runtime. Specification of this variable is only required if the variable is not already set as a shell variable.  
- **`ROOT_DIR`**  
 The directory where the Zowe runtime is located, also referred to as the `<RUNTIME_DIR>`. This directory value defaults to the location of where `zowe-configure-instance` was executed. 
- **`ZOSMF_PORT`**  
 The port used by z/OSMF REST services. This value defaults to the value determined through running `netstat`.
- **`ZOSMF_HOST`**  
 The host name of the z/OSMF REST API services.
- **`ZWE_haInstance_hostname`**  
 The hostname of where the Explorer servers are launched from. Defaults to running `hostname -c`.  Ensure that this host name is externally accessible from clients who want to use Zowe as well as internally accessible from z/OS itself.  
- **`ZOWE_IP_ADDRESS`**  
 The IP address of your z/OS system which must be externally accessible to clients who want to use Zowe.  This is important to verify for IBM Z Development & Test Environment and cloud systems, where the default that is determined through running `ping` and `dig` on z/OS returns a different IP address from the external address.  

### Domain, Hostname and IP Address

- **`zowe.externalDomains`**  
 The hostname of where the Explorer servers are launched from.  Defaults to running `hostname -c`.  Ensure that this host name is externally accessible from clients who want to use Zowe as well as internally accessible from z/OS itself.  
- **`ZOWE_IP_ADDRESS`**  
 The IP address of your z/OS system which must be externally accessible to clients who want to use Zowe.  This is important to verify for IBM Z Development & Test Environment and cloud systems, where the default that is determined through running `ping` and `dig` on z/OS returns a different IP address from the external address.  

When configuring a Zowe instance through the `instance.env` file, `ZOWE_IP_ADDRESS` and `zowe.externalDomains` are used to specify where the Zowe servers can be reached. 

However, these values may not reflect the website name that you access Zowe from. This is especially true in the following cases:
- You are using a proxy
- The URL is a derivative of the value of `zowe.externalDomains`, such as `myhost` versus `myhost.mycompany.com`

In these cases, it may be necessary to specify a value for `ZWE_EXTERNAL_HOSTS` in the form of a comma-separated list of the addresses from which you want to access Zowe in your browser. 

In the previous example, `ZWE_EXTERNAL_HOSTS` could include both `myhost` and `myhost.mycompany.com`. In the `instance.env`, this would look like: `ZWE_EXTERNAL_HOSTS=myhost,myhost.mycompany.com`

This configuration value maybe used for multiple purposes, including referrer-based security checks. In the case that the values are not specified, referrer checks will use the default values of `ZOWE_IP_ADDRESS`, `zowe.externalDomains`, and the system's hostname. Therefore, if these values are not what you put into your browser, you will want to specify `ZWE_EXTERNAL_HOSTS` to set the correct value. 

- **`ZOWE_EXPLORER_FRAME_ANCESTORS`**  
 The MVS, USS, and JES Explorer are served by their respective explorer UI address spaces.  These are accessed through the Zowe desktop where they are hosted as iFrames.  To protect against double iFrame security vulnerabilities, browsers all of the valid address that may be used by the browser must be explicitly declared in this property.  The default values are: `"${ZWE_haInstance_hostname}:*,${ZOWE_IP_ADDRESS}:*"`. If there are any other URLs by which the Zowe Explorers can be served, then these should be appended to the preceding comma-separated list.

### Component groups

**`LAUNCH_COMPONENT_GROUPS`**  
 This is a comma-separated list of which z/OS microservice groups are started when Zowe launches. 
  - `GATEWAY` starts the API Mediation Layer that includes the API Catalog, the API Gateway, and the API Discovery service.  These three address spaces are Apache Tomcat servers and use the version of Java on z/OS as determined by the `JAVA_HOME` value.  In addition to API ML, z/OS Explorer services are included here as well.
  - `DESKTOP` starts the Zowe desktop that is the browser GUI for hosting Zowe applications such as the 3270 Terminal emulator or the File Explorer.  `Desktop` also start ZSS. The Zowe desktop is a node application and uses the version specified by the `NODE_HOME` value.
  - `ZSS` starts the ZSS server without including the Desktop and Application Framework server. This can be used with Docker so that you do not run servers on z/OS that are already running within Docker. This may also be useful to utilize ZSS core features or plug-ins without needing the Desktop. ZSS is a pre-requisite for the Zowe desktop. As such, when the `DESKTOP` group is specified the zss server is implicitly started. For more information on the zssServer and the technology stack of the Zowe servers see [Zowe architecture](../getting-started/zowe-architecture.md).
  - Vendor products may extend Zowe with their own component group that they want to be lifecycled by the Zowe `ZWESVSTC` started task and run as a Zowe sub address space. To extend Zowe with vendor products, specify the fully qualified directory provided by the vendor that contains their Zowe extension scripts. This directory contains the following scripts:
    - A `start.sh` script **(required)** that is called when the `ZWESVSTC` started task is launched
    - A `configure.sh` script **(optional)** that performs any configuration steps such as adding iFrame plug-ins to the Zowe desktop
    - A `validate.sh` script **(optional)** that can be used to perform any pre-launch validation such as checking system prerequisites.  

     For more information about how a vendor can extend Zowe with a sub address space, see the [Extending](../extend/extend-apiml/onboard-overview.md) section.

**Note:** If you are using Docker, it is recommended to remove GATEWAY and DESKTOP from LAUNCH_COMPONENT_GROUPS by setting `LAUNCH_COMPONENT_GROUPS=ZSS`. This prevents duplication of servers running both in Docker and on z/OS. <Badge text="Technical Preview"/>

### Keystore configuration

- **`KEYSTORE_DIRECTORY`**  
 This is a path to a zFS directory containing the certificate that Zowe uses to identify itself and encrypt https:// traffic to its clients accessing REST APIs or web pages.  This directory also contains a truststore used to hold the public keys of any z/OS services that Zowe is communicating to, such as z/OSMF. The keystore directory must be created the first time Zowe is installed onto a z/OS system and can be shared between different Zowe runtimes. For more information about how to create a keystore directory, see [Configuring Zowe certificates](configure-certificates.md).

### Address space names

Individual address spaces for different Zowe instances and their subcomponents can be distinguished from each other in RMF records or SDSF views by specifying how they are named.  Address space names are 8 characters long and made up of a prefix `ZOWE_PREFIX`, instance `ZOWE_INSTANCE` followed by an identifier for each subcomponent.  

- **`ZOWE_PREFIX`**  
 This variable defines a prefix for Zowe address space STC names.  Defaults to `ZWE`.   
- **`ZOWE_INSTANCE`**
 This variable is appended to the `ZOWE_PREFIX` to build up the address space name.  Defaults to `1`

- Subcomponents have one of the following values:
   - **AC**  
    API ML Catalog
   - **AD**  
    API ML Discovery Service
   - **AG**  
    API ML Gateway
   - **DS**  
    App Server
   - **EF**  
    Explorer API Data Sets
   - **EJ**  
    Explorer API Jobs
   - **SZ**  
    ZSS Server
   - **UD**  
    Explorer UI Data Sets
   - **UJ**  
    Explorer UI Jobs
   - **UU**  
    Explorer UI USS
   
The STC name of the main started task is: `ZOWE_PREFIX`+`ZOWE_INSTANCE`+`SV`.

**Example:**

  ```yaml
  ZOWE_PREFIX=ZWE
  ZOWE_INSTANCE=X
  ```
  The first instance of Zowe API ML Gateway identifier is `ZWEXAG`.
  

**Note:** If the address space names are not assigned correctly for each subcomponents, check that the step [Configure address space job naming](configure-zos-system.md#configure-address-space-job-naming) has been performed correctly for the z/OS user ID `ZWESVUSR`.

### Ports

When Zowe starts, a number of its microservices need to be given port numbers that these microservices use to provide access to their services.  You can leave default values for components that are not in use. The two most important port numbers are the `GATEWAY_PORT`, and `ZOWE_ZLUX_SERVER_HTTPS_PORT`. 
- **`GATEWAY_PORT`**  
Specifies the access to the API Gateway through which REST APIs can be viewed and accessed.
- **`ZOWE_ZLUX_SERVER_HTTPS_PORT`**  
Specifies the port used to deliver content to client web browsers logging in to the Zowe desktop.  All of the other ports are not typically used by clients and used for intra-service communication by Zowe.  
- **`CATALOG_PORT`**  
 The port the API Catalog service uses. Used when `LAUNCH_COMPONENT_GROUPS` includes `GATEWAY`.
- **`DISCOVERY_PORT`**  
 The port the discovery service uses. Used when `LAUNCH_COMPONENT_GROUPS` includes `GATEWAY`.
- **`GATEWAY_PORT`**  
 The port the API Gateway service uses. Used when `LAUNCH_COMPONENT_GROUPS` includes `GATEWAY`. This port is used by REST API clients to access z/OS services through the API ML, so should be accessible to these clients. This is also the port used to log on to the API Catalog web page through a browser.
- **`JOBS_API_PORT`**  
 The port the jobs API service use. Used when `LAUNCH_COMPONENT_GROUPS` includes `GATEWAY`.
- **`FILES_API_PORT`**  
 The port the files API service use. Used when `LAUNCH_COMPONENT_GROUPS` includes `GATEWAY`.
- **`JES_EXPLORER_UI_PORT`**  
The port the jes-explorer UI service use. Used when `LAUNCH_COMPONENT_GROUPS` includes `GATEWAY`.
- **`MVS_EXPLORER_UI_PORT`**  
 The port the mvs-explorer UI service use. Used when `LAUNCH_COMPONENT_GROUPS`` includes GATEWAY`.
- **`USS_EXPLORER_UI_PORT`**  
 The port the uss-explorer UI service use. Used when `LAUNCH_COMPONENT_GROUPS` includes `GATEWAY`.
- **`ZOWE_ZLUX_SERVER_HTTPS_PORT`**  
 The port used by the Zowe desktop.  Used when `LAUNCH_COMPONENT_GROUPS` includes `DESKTOP`. It should be accessible to client machines with browsers wanting to log on to the Zowe desktop.  
- **`ZOWE_ZSS_SERVER_PORT`**  
 This port is used by the ZSS server. Used when `LAUNCH_COMPONENT_GROUPS` includes `DESKTOP` or `ZSS`.

**Note:** If all of the default port values are acceptable, the ports do not need to be changed. To allocate ports for the Zowe runtime servers, ensure that the ports are not in use.

To determine which ports are not available, follow these steps:

1. Display the list of ports that are in use with the following command:

   ```
   TSO NETSTAT
   ```

2. Display the list of reserved ports with the following command:

   ```
   TSO NETSTAT PORTLIST
   ```

#### Terminal ports

**Note:** Unlike the ports needed by the Zowe runtime for its Zowe Application Framework and z/OS Services which must be unused, the terminal ports are expected to be in use.  

- **`ZOWE_ZLUX_SSH_PORT`**  
 The Zowe desktop contains an application *VT Terminal* which opens a terminal to z/OS inside the Zowe desktop web page.  This port is the number used by the z/OS SSH service and defaults to 22.  The USS command `netstat -b | grep SSHD1` can be used to display the SSH port used on a z/OS system.  
- **`ZOWE_ZLUX_TELNET_PORT`**  
 The Zowe desktop contains an application *3270 Terminal* which opens a 3270 emulator inside the Zowe desktop web page.  This port is the number used by the z/OS telnet service and defaults to 23. The USS command `netstat -b | grep TN3270` can be used to display the telnet port used on a z/OS system.
- **`ZOWE_ZLUX_SECURITY_TYPE`**  
 The *3270 Terminal* application needs to know whether the telnet service is using `tls` or `telnet` for security.  The default value is blank for `telnet`.

### API Mediation Layer configuration

The following parameters can be set to customize the configuration of all API Mediation Layer components:

- **`APIML_DEBUG_MODE_ENABLED`**  
 When this parameter is set to `true`, detailed logging of activity by the API Mediation Layer occurs. This can be useful to diagnose unexpected behavior of the API Gateway, API Discovery, or API Catalog services.  Default value is `false`.  

The following parameters can be set to customize the configuration of the Discovery:

- **`ZWE_DISCOVERY_SERVICES_LIST`**  
 A comma-separated list of the endpoints for each Discovery Service instance. The default value is `https://${ZWE_haInstance_hostname}:${DISCOVERY_PORT}/eureka/`.

The following parameters can be set to customize the configuration of the Gateway:

- **`APIML_ALLOW_ENCODED_SLASHES`**  
 When this parameter is set to `true`, the Gateway allows encoded characters to be part of URL requests redirected through the Gateway.
- **`APIML_CORS_ENABLED`**  
 When this parameter is set to `true`, CORS are enabled in the API Gateway for Gateway routes `gateway/api/v1/**`.
- **`APIML_PREFER_IP_ADDRESS`**  
 Set this parameter to `true`  to advertise a service IP address instead of its hostname.  
 **Note**, this configuration is deprecated. Zowe start script will ignore this value and always set it to `false`.
- **`APIML_GATEWAY_TIMEOUT_MILLIS`**  
 Specifies the timeout for connection to the services in milliseconds. 
- **`APIML_SECURITY_X509_ENABLED`**  
 Set this parameter to `true`, to enable the client certificate authentication functionality through ZSS.
- **`APIML_SECURITY_ZOSMF_APPLID`**  
 The z/OSMF APPLID used for PassTicket.
- **`APIML_SECURITY_AUTH_PROVIDER`**  
 The authentication provider used by the API Gateway. By default, the API Gateway uses z/OSMF as an authentication provider. It is possible to switch to SAF as the authentication provider instead of z/OSMF.

The following values are used to customize the configuration of Caching Service.

- `ZWE_CACHING_SERVICE_PORT=7555`: The port the Caching Service will use.
- `ZWE_CACHING_SERVICE_PERSISTENT=`: This field sets the storage type used to persist data in the Caching Service. Valid options are `REDIS` or `VSAM`. `REDIS` is currently only supported as an off-Z storage solution. `VSAM` is only supported on Z.
- `ZWE_CACHING_SERVICE_VSAM_DATASET`: This field sets the `VSAM` dataset name to be used to store Caching Service data. This field is required if `ZWE_CACHING_SERVICE_PERSISTENT` is set to `VSAM`, otherwise this field is not needed.

Refer to detailed section about [API Gateway configuration](api-mediation/api-gateway-configuration.md)

### Cross memory server

- **`ZOWE_ZSS_XMEM_SERVER_NAME`**  
 For the Zowe Desktop to operate communication with the Zowe cross memory server. The default procedure name `ZWESIS_STD` is used for the cross memory server. However, this can be changed in the `ZWESISTC` PROBLIC member. This might occur to match local naming standards, or to allow isolated testing of a new version of the cross memory server while an older version is running concurrently.  The Zowe desktop that runs under the `ZWESVSTC` started task locates the appropriate cross memory server running under its started task `ZWESISTC` using the `ZOWE_ZSS_XMEM_SERVER_NAME` value. If this handshake cannot occur, users are be unable to log in to the Zowe desktop. For more information, see [Troubleshooting: ZSS server unable to communicate with X-MEM](../troubleshoot/app-framework/app-troubleshoot.md#zss-server-unable-to-communicate-with-x-mem).

   ```
   //ZWESISTC  PROC NAME='ZWESIS_STD',MEM=00,RGN=0M
   ```

- **`ZWES_ZIS_LOADLIB`**  
 The dataset name where the Zowe cross memory server (ZIS) load library resides. Having this value defined can help in automation around ZIS and ZIS plugins.
- **`ZWES_ZIS_PLUGINLIB`**  
 The dataset name where plugins for ZIS should be placed. When this is specified, components that contain ZIS plugins will have their load library content placed here.
- **`ZWES_ZIS_PARMLIB`**  
 The dataset name where parameters about ZIS should be placed. Having this value defined is necessary for automatically installing ZIS plugins that are within a component.


### Extensions

- **`ZWE_STATIC_DEFINITIONS_DIR`**  
  Full USS path to the directory that contains static API Mediation Layer .yml definition files.  For more information, see [Onboard a REST API without code changes required](../extend/extend-apiml/onboard-static-definition.md#add-a-definition-in-the-api-mediation-layer-in-the-zowe-runtime).  Multiple paths should be semicolon separated. This value allows a Zowe instance to be configured so that the API Mediation Layer can be extended by third party REST API and web UI servers. 
- **`EXTERNAL_COMPONENTS`**  
 For third-party extenders to add the full path to the directory that contains their component lifecycle scripts.  For more information, see [Zowe lifecycle - Zowe extensions](../extend/lifecycling-with-zwesvstc.md#zowe-extensions).
- **`ZWE_DISCOVERY_SERVICES_LIST`** _(Work in progress)_   
**Do not modify this value** from its supplied default of `https://${ZWE_haInstance_hostname}:${DISCOVERY_PORT}/eureka/`. 
- **`ZWE_CACHING_SERVICE_PORT=7555`** _(Work in progress)_  
 This port is not yet used so the value does not need to be availale.
- **`ZWE_CACHING_SERVICE_PERSISTENT`**  _(Work in progress)_  
 This is used to set the storage type used to persist cached data. Valid options are `REDIS` or `VSAM`.
- **`ZWE_CACHING_SERVICE_VSAM_DATASET`** _(Work in progress)_

## Creating and updating zowe.yaml configuration file

There are two ways to create a `zowe.yaml` configuration file.

- Copy the example file `<runtime-dir>/bin/example-zowe.yaml` to `<runtime-dir>/zowe.yaml` and modify it based on your configuration.
- Convert from an existing v1 `instance.env` file by using migration command shipped with Zowe v2. Issue the following command to convert an `instance.env` file to `zowe.yaml` format: 

   ```
   <runtime-dir>/bin/`zwe migrate from v1 --instance-env <instance-dir>/instance.env --config <instance-dir>/zowe.yaml
   ```

   where, the `<runtime-dir>` is the USS directory where Zowe v2 is installed.

Check [Zowe YAML Configuration File Reference](../appendix/zowe-yaml-configuration.md) for details of this file.
## Hints and tips

Learn about some hints and tips that you might find useful when you create and configure the Zowe instance.

When you are configuring Zowe on z/OS, you need to [create certificates](configure-certificates.md), and then create the Zowe instance.

The creation of a Zowe instance is controlled by the [`instance.env` file](#updating-the-instance-env-configuration-file) in your instance directory `INSTANCE_DIR`. 

1.	Keystore 
   
    Edit the `instance.env` file to set the keystore directory to the one you created when you ran `zowe-setup-certificates.sh`.

    The keyword and value in `instance.env` should be the same as in `zowe-setup-certificates.env`, as shown below
    ```
 	 KEYSTORE_DIRECTORY=/my/zowe/instance/keystore
    ```
   
2. Hostname and IP address
   
   The `zowe-configure-instance.sh` script handles the IP address and hostname the same way `zowe-setup-certificates.sh` does.  
   
   In `instance.env`,  you specify the IP address and hostname using the following keywords:
   ```
   zowe.externalDomains=
   ZOWE_IP_ADDRESS= 
   ```

   The `zowe.externalDomains` value must resolve to the external IP address, otherwise you should use the external IP address as the value for `zowe.externalDomains`.   

   The `zowe-configure-instance.sh` script will attempt to discover the IP address and hostname of your system if you leave these unset.  

   When the script cannot determine the hostname or the IP address, it will ask you to enter the IP address manually during the dialog.  If you have not specified a value for `zowe.externalDomains`, then the script will use the IP address as the hostname. 

   The values of `zowe.externalDomains` and `ZOWE_IP_ADDRESS` that the script discovered are appended to the `instance.env` file unless they were already set in that file or as shell environment variables before you ran the script. 
