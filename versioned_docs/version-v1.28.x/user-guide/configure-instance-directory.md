# Creating and configuring the Zowe instance directory

The Zowe instance directory or `<INSTANCE_DIRECTORY>` contains configuration data required to launch a Zowe runtime.  This includes port numbers, location of dependent runtimes such as Java, Node, z/OSMF, as well as log files. When Zowe is started, configuration data will be read from files in the instance directory and logs will be written to files in the instance directory.

**Note: The creation of an instance directory will set default values for users who want to run all Zowe z/OS components. If you are using Docker, you must make a small configuration change to disable the components on z/OS that will instead run in Docker.**

## Introduction  

The purpose of the instance directory is to hold information in the z/OS File System (zFS) that is created (such as log files) or modified (such as preferences) or configured (such as port numbers) away from the zFS runtime directory for Zowe.  This allows the runtime directory to be read-only and to be replaced when a new Zowe release is installed, with customizations being preserved in the instance directory.  

Multiple instance directories can be created and used to launch independent Zowe runtimes from the same Zowe runtime directory. 

The Zowe instance directory contains a file `instance.env` that stores the Zowe configuration data. The data is read each time Zowe is started. You can modify `instance.env` to configure the Zowe runtime. See [Updating the instance.env configuration file](#updating-the-instanceenv-configuration-file) for more information.  

Alternatively, from v1.22.0 release, you can use a YAML format configuration file `zowe.yaml` instead of `instance.env` to configure the Zowe runtime. See [Updating the zowe.yaml configuration file](#updating-the-zowe-yaml-configuration-file) for more information.

The instance directory `<INSTANCE_DIRECTORY>/bin` contains other key scripts as follows:
- `zowe-start.sh` is used to start the Zowe runtime by launching the `ZWESVSTC` started task.
- `zowe-stop.sh` is used to stop the Zowe runtime by terminating the `ZWESVSTC` started task.  
- `zowe-support.sh` can be used to capture diagnostics around the Zowe runtime for troubleshooting and off-line problem determination, see [Capturing diagnostics to assist problem determination](../troubleshoot/troubleshoot-diagnostics.md).

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

If you have an instance directory that is created from a previous release of Zowe 1.8 or later and are installing a newer release of Zowe, then you should run `zowe-configure-instance.sh -c <PATH_TO_INSTANCE_DIR>` pointing to the existing instance directory to have it updated with any new values.  The release documentation for each new release will specify when this is required, and the file `manifest.json` within each instance directory contains information for which Zowe release it was created from.

In order to allow the `ZWESVSTC` started task to have permission to access the contents of the `<INSTANCE_DIR>` the `zowe-configure-instance.sh` script sets the group ownership of the top level directory and its child to be `ZWEADMIN`.  If a different group is used for the `ZWESVSTC` started task you can specify this with the optional `-g` argument, for example.

```shell
<RUNTIME_DIR>/bin/zowe-configure-instance.sh -c <PATH_TO_INSTANCE_DIR> -g <GROUP>
```

Watch the following video that shows how to create an `instance.env` file that is used to launch Zowe with default parameters and a USS keystore containing a self-signed TLS certificate.

<iframe class="embed-responsive-item" id="youtubeplayer" title="Zowe Configure Instance and Launch with Self-Signed Keystore Certificate" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/oxmDHZUFjtg" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"> </iframe>

[Download the script](/Zowe_launch_self_signed_certificate.txt)

## Updating the instance.env configuration file

To operate Zowe, a number of zFS folders need to be located for prerequisites on the platform. Default values are selected when you run `zowe-configure-instance.sh`. You might want to modify the values. 

**Contents in this section**

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

- `JAVA_HOME`:  The path where 64-bit Java 8 or later is installed.  Only needs to be specified if not already set as a shell variable.  Defaults to `/usr/lpp/java/J8.0_64`.
- `NODE_HOME`:  The path to the Node.js runtime.  Only needs to be specified if not already set as a shell variable.  
- `ROOT_DIR`: The directory where the Zowe runtime is located, also referred to as the `<RUNTIME_DIR>`.  Defaults to the location of where `zowe-configure-instance` was executed. 
- `ZOSMF_PORT`: The port used by z/OSMF REST services.  Defaults to value determined through running `netstat`.
- `ZOSMF_HOST`: The host name of the z/OSMF REST API services.

- `ZOWE_EXPLORER_HOST`: The hostname of where the Explorer servers are launched from.  Defaults to running `hostname -c`.  Ensure that this host name is externally accessible from clients who want to use Zowe as well as internally accessible from z/OS itself.  
- `ZOWE_IP_ADDRESS`:  The IP address of your z/OS system which must be externally accessible to clients who want to use Zowe.  This is important to verify for IBM Z Development & Test Environment and cloud systems, where the default that is determined through running `ping` and `dig` on z/OS returns a different IP address from the external address.  

### Domain, Hostname and IP Address

- `ZOWE_EXPLORER_HOST`: The hostname of where the Explorer servers are launched from.  Defaults to running `hostname -c`.  Ensure that this host name is externally accessible from clients who want to use Zowe as well as internally accessible from z/OS itself.  
- `ZOWE_IP_ADDRESS`:  The IP address of your z/OS system which must be externally accessible to clients who want to use Zowe.  This is important to verify for IBM Z Development & Test Environment and cloud systems, where the default that is determined through running `ping` and `dig` on z/OS returns a different IP address from the external address.  

When configuring a Zowe instance through the `instance.env` file, `ZOWE_IP_ADDRESS` and `ZOWE_EXPLORER_HOST` are used to specify where the Zowe servers can be reached. 

However, these values may not reflect the website name that you access Zowe from. This is especially true in the following cases:
- You are using a proxy
- The URL is a derivative of the value of `ZOWE_EXPLORER_HOST`, such as `myhost` versus `myhost.mycompany.com`

In these cases, it may be necessary to specify a value for `ZWE_EXTERNAL_HOSTS` in the form of a comma-separated list of the addresses from which you want to access Zowe in your browser. 

In the previous example, `ZWE_EXTERNAL_HOSTS` could include both `myhost` and `myhost.mycompany.com`. In the `instance.env`, this would look like: `ZWE_EXTERNAL_HOSTS=myhost,myhost.mycompany.com`

This configuration value maybe used for multiple purposes, including referrer-based security checks. In the case that the values are not specified, referrer checks will use the default values of `ZOWE_IP_ADDRESS`, `ZOWE_EXPLORER_HOST`, and the system's hostname. Therefore, if these values are not what you put into your browser, you will want to specify `ZWE_EXTERNAL_HOSTS` to set the correct value. 

- `ZOWE_EXPLORER_FRAME_ANCESTORS`: The MVS, USS, and JES Explorer are served by their respective explorer UI address spaces.  These are accessed through the Zowe desktop where they are hosted as iFrames.  To protect against double iFrame security vulnerabilities, browsers all of the valid address that may be used by the browser must be explicitly declared in this property.  The default values are: `"${ZOWE_EXPLORER_HOST}:*,${ZOWE_IP_ADDRESS}:*"`. If there are any other URLs by which the Zowe Explorers can be served, then these should be appended to the preceding comma-separated list.

### Component groups

`LAUNCH_COMPONENT_GROUPS`: This is a comma-separated list of which z/OS microservice groups are started when Zowe launches. 
  - `GATEWAY` will start the API mediation layer that includes the API catalog, the API gateway, and the API discovery service.  These three address spaces are Apache Tomcat servers and use the version of Java on z/OS as determined by the `JAVA_HOME` value.  In addition to the mediation layer, the z/OS Explorer services are included here as well.
  - `DESKTOP` will start the Zowe desktop that is the browser GUI for hosting Zowe applications such as the 3270 Terminal emulator or the File Explorer.  It will also start ZSS. The Zowe desktop is a node application and uses the version specified by the `NODE_HOME` value.
  - `ZSS` will start the ZSS server without including the Desktop and Application Framework server. This can be used with Docker so that you do not run servers on z/OS that will already be running within Docker. This may also be useful if you want to utilize ZSS core features or plug-ins without needing the Desktop. ZSS is a pre-requisite for the Zowe desktop, so when the `DESKTOP` group is specified then the zss server will be implicitly started. For more information on the zssServer and the technology stack of the Zowe servers see [Zowe architecture](../getting-started/zowe-architecture.md).
  - Vendor products may extend Zowe with their own component group that they want to be lifecycled by the Zowe `ZWESVSTC` started task and run as a Zowe sub address space.  To do this, specify the fully qualified directory provided by the vendor that contains their Zowe extension scripts.  This directory will contain a `start.sh` script **(required)** that is called when the `ZWESVSTC` started task is launched, a `configure.sh` script **(optional)** that performs any configuration steps such as adding iFrame plug-ins to the Zowe desktop, and a `validate.sh` script **(optional)** that can be used to perform any pre-launch validation such as checking system prerequisites. For more information about how a vendor can extend Zowe with a sub address space, see the [Extending](../extend/extend-apiml/onboard-overview.md) section.

**Note: If you are using Docker, it is recommended to remove GATEWAY and DESKTOP from LAUNCH_COMPONENT_GROUPS by setting `LAUNCH_COMPONENT_GROUPS=ZSS`. This will prevent duplication of servers running both in Docker and on z/OS.** <Badge text="Technical Preview"/>

### Keystore configuration

- `KEYSTORE_DIRECTORY`: This is a path to a zFS directory containing the certificate that Zowe uses to identify itself and encrypt https:// traffic to its clients accessing REST APIs or web pages.  This also contains a truststore used to hold the public keys of any z/OS services that Zowe is communicating to, such as z/OSMF.  The keystore directory must be created the first time Zowe is installed onto a z/OS system and it can be shared between different Zowe runtimes.   For more information about how to create a keystore directory, see [Configuring Zowe certificates](configure-certificates.md).

### Address space names

Individual address spaces for different Zowe instances and their subcomponents can be distinguished from each other in RMF records or SDSF views by specifying how they are named.  Address space names are 8 characters long and made up of a prefix `ZOWE_PREFIX`, instance `ZOWE_INSTANCE` followed by an identifier for each subcomponent.  

- `ZOWE_PREFIX`: This defines a prefix for Zowe address space STC names.  Defaults to `ZWE`.   
- `ZOWE_INSTANCE`: This is appended to the `ZOWE_PREFIX` to build up the address space name.  Defaults to `1`

- A subcomponent will be one of the following values:
   - **AC** - API ML Catalog
   - **AD** - API ML Discovery Service
   - **AG** - API ML Gateway
   - **DS** - App Server
   - **EF** - Explorer API Data Sets
   - **EJ** - Explorer API Jobs
   - **SZ** - ZSS Server
   - **UD** - Explorer UI Data Sets
   - **UJ** - Explorer UI Jobs
   - **UU** - Explorer UI USS
   
The STC name of the main started task is `ZOWE_PREFIX`+`ZOWE_INSTANCE`+`SV`.

**Example:**

  ```yaml
  ZOWE_PREFIX=ZWE
  ZOWE_INSTANCE=X
  ```
  the first instance of Zowe API ML Gateway identifier will be as follows:

  ```
  ZWEXAG
  ```

**Note:** If the address space names are not assigned correctly for each subcomponents, check that the step [Configure address space job naming](configure-zos-system.md#configure-address-space-job-naming) has been performed correctly for the z/OS user ID `ZWESVUSR`.

### Ports

When Zowe starts, a number of its microservices need to be given port numbers that these microservices use to provide access to their services.  You can leave default values for components that are not in use. The two most important port numbers are the `GATEWAY_PORT` which is for access to the API Gateway through which REST APIs can be viewed and accessed, and `ZOWE_ZLUX_SERVER_HTTPS_PORT` which is used to deliver content to client web browsers logging in to the Zowe desktop.  All of the other ports are not typically used by clients and used for intra-service communication by Zowe.  

- `CATALOG_PORT`: The port the API Catalog service will use. Used when `LAUNCH_COMPONENT_GROUPS` includes `GATEWAY`.
- `DISCOVERY_PORT`: The port the discovery service will use. Used when `LAUNCH_COMPONENT_GROUPS` includes `GATEWAY`.
- `GATEWAY_PORT`: The port the API gateway service will use. Used when `LAUNCH_COMPONENT_GROUPS` includes `GATEWAY`. This port is used by REST API clients to access z/OS services through the API mediation layer, so should be accessible to these clients.  This is also the port used to log on to the API catalog web page through a browser.
- `JOBS_API_PORT`: The port the jobs API service will use. Used when `LAUNCH_COMPONENT_GROUPS` includes `GATEWAY`.
- `FILES_API_PORT`: The port the files API service will use. Used when `LAUNCH_COMPONENT_GROUPS` includes `GATEWAY`.
- `JES_EXPLORER_UI_PORT`: The port the jes-explorer UI service will use. Used when `LAUNCH_COMPONENT_GROUPS` includes `GATEWAY`.
- `MVS_EXPLORER_UI_PORT`: The port the mvs-explorer UI service will use. Used when `LAUNCH_COMPONENT_GROUPS`` includes GATEWAY`.
- `USS_EXPLORER_UI_PORT`: The port the uss-explorer UI service will use. Used when `LAUNCH_COMPONENT_GROUPS` includes `GATEWAY`.
- `ZOWE_ZLUX_SERVER_HTTPS_PORT`: The port used by the Zowe desktop.  Used when `LAUNCH_COMPONENT_GROUPS` includes `DESKTOP`. It should be accessible to client machines with browsers wanting to log on to the Zowe desktop.  
- `ZOWE_ZSS_SERVER_PORT`: This port is used by the ZSS server. Used when `LAUNCH_COMPONENT_GROUPS` includes `DESKTOP` or `ZSS`.

**Note:** If all of the default port values are acceptable, the ports do not need to be changed. To allocate ports for the Zowe runtime servers, ensure that the ports are not in use.


#### Port validation

When Zowe starts up, it may automatically check if the above ports are available for use by Zowe. If it detects that a port is already occupied, then Zowe will not start as a precaution. In a DVIPA or other advanced networking configuration, this behavior can be customized in case Zowe misinterprets a port as being occupied. In `instance.env`, one of two customization parameters can be added to alter the default behavior:

- `ZWE_NETWORK_VIPA_IP=some.ip`: When set, Zowe will narrow its port validation to this specific IP
- `ZWE_NETWORK_VALIDATE_PORT_FREE`: When set to `false`, Zowe will skip validation. By default, this is `true`.


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

- `ZOWE_ZLUX_SSH_PORT`: The Zowe desktop contains an application *VT Terminal* which opens a terminal to z/OS inside the Zowe desktop web page.  This port is the number used by the z/OS SSH service and defaults to 22.  The USS command `netstat -b | grep SSHD1` can be used to display the SSH port used on a z/OS system.  
- `ZOWE_ZLUX_TELNET_PORT`: The Zowe desktop contains an application *3270 Terminal* which opens a 3270 emulator inside the Zowe desktop web page.  This port is the number used by the z/OS telnet service and defaults to 23. The USS command `netstat -b | grep TN3270` can be used to display the telnet port used on a z/OS system.
- `ZOWE_ZLUX_SECURITY_TYPE`: The *3270 Terminal* application needs to know whether the telnet service is using `tls` or `telnet` for security.  The default value is blank for `telnet`.

### API Mediation Layer configuration

The following parameters can be set to customize the configuration of all API Mediation Layer components:

- `APIML_DEBUG_MODE_ENABLED` : When this parameter is set to `true`, detailed logging of activity by the API mediation layer occurs. This can be useful to diagnose unexpected behavior of the API gateway, API discovery, or API catalog services.  Default value is `false`.  

The following parameters can be set to customize the configuration of the Discovery:

- `ZWE_DISCOVERY_SERVICES_LIST`: A comma-separated list of the endpoints for each Discovery Service instance. The default value is `https://${ZOWE_EXPLORER_HOST}:${DISCOVERY_PORT}/eureka/`.

The following parameters can be set to customize the configuration of the Gateway:

- `APIML_ALLOW_ENCODED_SLASHES`: When this parameter is set to `true`, the Gateway allows encoded characters to be part of URL requests redirected through the Gateway.
- `APIML_CORS_ENABLED`: When this parameter is set to `true`, CORS are enabled in the API Gateway for Gateway routes `api/v1/gateway/**`.
- `APIML_PREFER_IP_ADDRESS`: Set this parameter to `true`  to advertise a service IP address instead of its hostname. **Note**, this configuration is deprecated. Zowe start script will ignore this value and always set it to `false`.
- `APIML_GATEWAY_TIMEOUT_MILLIS`: Specifies the timeout for connection to the services in milliseconds. 
- `APIML_SECURITY_X509_ENABLED`: Set this parameter to `true`, to enable the client certificate authentication functionality through ZSS.
- `APIML_SECURITY_ZOSMF_APPLID`: The z/OSMF APPLID used for PassTicket.
- `APIML_SECURITY_AUTH_PROVIDER`: The authentication provider used by the API Gateway. By default, the API Gateway uses z/OSMF as an authentication provider. It is possible to switch to SAF as the authentication provider instead of z/OSMF.

The following values are used to customize the configuration of Caching Service.

- `ZWE_CACHING_SERVICE_PORT=7555`: The port the Caching Service will use.
- `ZWE_CACHING_SERVICE_PERSISTENT=`: This field sets the storage type used to persist data in the Caching Service. Valid options are `REDIS`, `INFINISPAN` or `VSAM`. `REDIS` is currently only supported as an off-Z storage solution. `VSAM` is only supported on Z. `INFINISPAN` is both an off-Z and Z solution, and it is mainly intended for z/OS as it offers good performance.
- `ZWE_CACHING_SERVICE_VSAM_DATASET`: This field sets the `VSAM` dataset name to be used to store Caching Service data. This field is required if `ZWE_CACHING_SERVICE_PERSISTENT` is set to `VSAM`, otherwise this field is not needed.

Refer to detailed section about [API Gateway configuration](api-mediation/api-gateway-configuration.md)

### Cross memory server

- `ZOWE_ZSS_XMEM_SERVER_NAME`: For the Zowe Desktop to operate communication with the Zowe cross memory server.  The default procedure name `ZWESIS_STD` is used for the cross memory server. However, this can be changed in the `ZWESISTC` PROBLIC member.  This might occur to match local naming standards, or to allow isolated testing of a new version of the cross memory server while an older version is running concurrently.  The Zowe desktop that runs under the `ZWESVSTC` started task will locate the appropriate cross memory server running under its started task `ZWESISTC` using the `ZOWE_ZSS_XMEM_SERVER_NAME` value.  If this handshake cannot occur, users will be unable to log in to the Zowe desktop. See [Troubleshooting: ZSS server unable to communicate with X-MEM](../troubleshoot/app-framework/app-troubleshoot.md#zss-server-unable-to-communicate-with-x-mem).

   ```
   //ZWESISTC  PROC NAME='ZWESIS_STD',MEM=00,RGN=0M
   ```

- `ZWES_ZIS_LOADLIB`: The dataset name where the Zowe cross memory server (ZIS) load library resides. Having this value defined can help in automation around ZIS and ZIS plugins.
- `ZWES_ZIS_PLUGINLIB`: The dataset name where plugins for ZIS should be placed. When this is specified, components that contain ZIS plugins will have their load library content placed here.
- `ZWES_ZIS_PARMLIB`: The dataset name where parameters about ZIS should be placed. Having this value defined is necessary for automatically installing ZIS plugins that are within a component.


### Extensions

- `ZWEAD_EXTERNAL_STATIC_DEF_DIRECTORIES`:  Full USS path to the directory that contains static API Mediation Layer .yml definition files.  For more information, see [Onboard a REST API without code changes required](../extend/extend-apiml/onboard-static-definition.md#add-a-definition-in-the-api-mediation-layer-in-the-zowe-runtime).  Multiple paths should be semicolon separated. This value allows a Zowe instance to be configured so that the API Mediation Layer can be extended by third party REST API and web UI servers. 
- `EXTERNAL_COMPONENTS`: For third-party extenders to add the full path to the directory that contains their component lifecycle scripts.  For more information, see [Zowe lifecycle - Zowe extensions](../extend/lifecycling-with-zwesvstc.md#zowe-extensions).
- `ZWE_DISCOVERY_SERVICES_LIST`: _(Work in progress)_ **Do not modify this value** from its supplied default of `https://${ZOWE_EXPLORER_HOST}:${DISCOVERY_PORT}/eureka/`. 
- `ZWE_CACHING_SERVICE_PORT=7555`: _(Work in progress)_ This port is not yet used so the value does not need to be availale.
- `ZWE_CACHING_SERVICE_PERSISTENT`: _(Work in progress)_ This is used to set the storage type used to persist cached data. Valid options are `REDIS` or `VSAM`.
- `ZWE_CACHING_SERVICE_VSAM_DATASET`: _(Work in progress)_

## Updating the zowe.yaml configuration file

Instead of using `instance.env` to configure the Zowe runtime, you can also use a `zowe.yaml` file to configure Zowe in more granular level. `zowe.yaml` is also required to start Zowe in high availability mode.  To make Zowe runtime recognize the `zowe.yaml` configuration, you must create a `zowe.yaml` file and remove the `instance.env` file from the instance directory. See [Creating the zowe.yaml file](#creating-the-zoweyaml-file) for instructions.

**Note:** In the following sections, we refer configuration keys with concatenation of key names and dots. For example, if you want to update the configuration key `zowe.internalCertificate.keystore.type` with value `PKCS12`, you should set value for this entry in the `zowe.yaml`:

```yaml
zowe:
  internalCertificate:
    keystore:
      type: PKCS12
```

To learn more about the YAML format, please visit [yaml.org](https://yaml.org/).

**Contents in this section**

- [Known limitations for Zowe high availability](#known-limitations-for-zowe-high-availability)
- [Creating the zowe.yaml file](#creating-the-zoweyaml-file)
- [High level overview of YAML configuration file](#high-level-overview-of-yaml-configuration-file)
- [Extract sharable configuration out of zowe.yaml](#extract-sharable-configuration-out-of-zoweyaml)
- [Configuration override](#configuration-override)
- [YAML configurations - certificate](#yaml-configurations---certificate)
- [YAML configurations - zowe](#yaml-configurations---zowe)
- [YAML configurations - java](#yaml-configurations---java)
- [YAML configurations - node](#yaml-configurations---node)
- [YAML configurations - zOSMF](#yaml-configurations---zosmf)
- [YAML configurations - components](#yaml-configurations---components)
    - [Configure component gateway](#configure-component-gateway)
    - [Configure component discovery](#configure-component-discovery)
    - [Configure component api-catalog](#configure-component-api-catalog)
    - [Configure component caching-service](#configure-component-caching-service)
    - [Configure component app-server](#configure-component-app-server)
    - [Configure component zss](#configure-component-zss)
    - [Configure component jobs-api](#configure-component-jobs-api)
    - [Configure component files-api](#configure-component-files-api)
    - [Configure component explorer-jes](#configure-component-explorer-jes)
    - [Configure component explorer-mvs](#configure-component-explorer-mvs)
    - [Configure component explorer-uss](#configure-component-explorer-uss)
    - [Configure external extension](#configure-external-extension)
- [YAML configurations - haInstances](#yaml-configurations---hainstances)

### Known limitations for Zowe high availability

- To allow Sysplex Distributor to route traffic to the Gateway, you can only start one Gateway in each LPAR within the Sysplex. All Gateways instances should be started on the same port configured on Sysplex Distributor.
- Zowe App Server should be accessed through the Gateway with a URL like `https://<dvipa-domain>:<external-port>/zlux/ui/v1`.

### Creating the zowe.yaml file

There are two ways to create a `zowe.yaml` file.

- Copy the example file `<instance-dir>/bin/example-zowe.yaml` to `<instance-dir>/zowe.yaml` and modify it based on your configuration.
- Convert from an existing `instance.env` file by using a utility tool in `<instance-dir>/bin/utils/convert-to-zowe-yaml.sh` shipped with Zowe. Issue the following command to convert an `instance.env` file to `zowe.yaml` format: 

   ```
   <instance-dir>/bin/utils/convert-to-zowe-yaml.sh <instance-dir>/instance.env <instance-dir>/zowe.yaml
   ```

   where, the `<instance-dir>` is your instance directory path. 

After `zowe.yaml` is created, you should add new `haInstances` section and define ha-instance(s) you want to start in your Sysplex.

### High level overview of YAML configuration file

The YAML configuration file has few high level sections:

- **`zowe`**: defines global configurations specific to Zowe, including default values.
- **`java`**: defines Java configurations used by Zowe components.
- **`node`**: defines node.js configurations used by Zowe components.
- **`zOSMF`**: tells Zowe your z/OSMF configurations.
- **`components`**: defines detailed configurations for each Zowe component or extension. Each component or extension may have a key entry under this section. For example, `components.gateway` is configuration for API Mediation Layer Gateway service.
- **`haInstances`**: defines customized configurations for each High Availability (HA) instance. You should predefine all Zowe HA instances you want to start within your Sysplex.

### Extract sharable configuration out of zowe.yaml

The Zowe YAML configuration file supports a special `@include` annotation that can be used in any level of the configuration. This enables you to organize your YAML configuration files and extract sharable configurations to a separate YAML file.

For example, you can define a sharable certificate configuration file `<keystore-dir>/zowe-certificates.yaml` like this:

```yaml
keystore:
  alias: localhost
  password: password
  file: /global/zowe/keystore/localhost/localhost.keystore.p12
  type: PKCS12
trustStore:
  file: /global/zowe/keystore/localhost/localhost.truststore.p12
  certificateAuthorities: ""
pem:
  key: /global/zowe/keystore/localhost/localhost.keystore.key
  certificate: /global/zowe/keystore/localhost/localhost.keystore.cer-ebcdic
  certificateAuthority: /global/zowe/keystore/local_ca/localca.cer-ebcdic
```

Then in your `<instance-dir>/zowe.yaml`, you can import this certification file like this:

```yaml
zowe:
  externalCertificate:
    @include: "<keystore-dir>/zowe-certificates.yaml"
  internalCertificate:
    @include: "<keystore-dir>/zowe-certificates.yaml"
```

### Configuration override

Inside `zowe.yaml`, you can define default values and they may be overridden in more granular level configurations. This can happen in several ways:

- Component can override default certificate configuration. For specific entry of certification configuration, if it's not overridden, it will fall back to default configurations. For example, in this configuration:

  ```yaml
  zowe:
    internalCertificate:
      keystore:
        alias: localhost
        password: password
        file: /global/zowe/keystore/localhost/localhost.keystore.p12
        type: PKCS12
      trustStore:
        file: /global/zowe/keystore/localhost/localhost.truststore.p12
        certificateAuthorities: ""
      pem:
        key: /global/zowe/keystore/localhost/localhost.keystore.key
        certificate: /global/zowe/keystore/localhost/localhost.keystore.cer-ebcdic
        certificateAuthority: /global/zowe/keystore/local_ca/localca.cer-ebcdic
  components:
    app-server:
      certificate:
        keystore:
          alias: app-server
        pem:
          key: /global/zowe/keystore/localhost/localhost.keystore.app-server.key
          certificate: /global/zowe/keystore/localhost/localhost.keystore.app-server.cer-ebcdic
  ```
  
  App Server will use the certificate alias `app-server` instead of `localhost` from the same keystore defined in `zowe.internalCertificate.keystore.file`. And it will use the exact same truststore defined in `zowe.internalCertificate.trustStore.file`.

- HA instance component configuration `haInstances.<ha-instance>.components.<component>` can override global level component configurations `components.<component>`. Any configuration you can find in `components.<component>` level can be overridden in `haInstances.<ha-instance>.components.<component>` level. For example, in this configuration:

  ```yaml
  components:
    app-server:
      enabled: true
      port: 8544
  haInstances:
    lpar2a:
      components:
        app-server:
          enabled: false
    lpar2b:
      components:
        app-server:
          port: 28544
  ```
  
  App Server on `lpar2a` HA instance will not be started. On `lpar2b` HA instance, it will be started but on port 28544.

### YAML configurations - certificate

In Zowe YAML configuration, certificate definition shares the same format and this format can be used in several configuration entries. For example, `zowe.externalCertificate`, `zowe.internalCertificate`, `components.<component>.certificate`, and `haInstances.<ha-instance>.components.<component>.certificate`. The certificate definition may include the following entries:

- `keystore.type`: Defines the type of the keystore. If you are using keystore, this value usually should be `PKCS12`. If you are using keyring, this value should be `JCERACFKS`.
- `keystore.file`: Defines the path of the keystore file. If you are using keyring, this should look like `safkeyring:////<keyring-owner>/<keyring-name>`. For example, `safkeyring:////ZWESVUSR/ZoweKeyring`.
- `keystore.alias`: represents the alias name of the certificate stored in keystore. If you are using keyring, this is the certificate label connected to the keyring.
- `keystore.password`: Defines the password of the keystore.
- `trustStore.file`: Defines the path to the truststore file. If you are using keyring, this should look like `safkeyring:////<keyring-owner>/<keyring-name>`, usually will be the same value of `keystore.file`.
- `trustStore.certificateAuthorities`: defines extra certificate authorities you will trust. This should point to CA files in PEM format.
- `pem.key`: Defines the private key file in PEM format. This can be used by applications that do not support either PKCS12 keystore format or z/OS keyring.
- `pem.certificate`: Defines the public key file in PEM format. This can be used by applications that do not support either PKCS12 keystore format or z/OS keyring.
- `pem.certificateAuthority`: Defines certificate authorities in PEM format. This can be used by applications that do not support either PKCS12 keystore format or z/OS keyring.

**Note:** With the `zowe.yaml` configuration, all certificate related configurations are merged into the `zowe.yaml` file. `<keystore-dir>/zowe-certificates.env` will not be used.

### YAML configurations - zowe

The high-level configuration `zowe` supports these definitions:

- `zowe.runtimeDirectory`: Tells Zowe the runtime directory connected to this Zowe instance. This is equivalent to the `ROOT_DIR` variable in the `instance.env` file.
- `zowe.extensionDirectory`: Tells Zowe where you put the runtime of all your extensions. This is equivalent to the `ZWE_EXTENSION_DIR` variable in the `instance.env` file.
- `zowe.jobPrefix`: Defines the Zowe job prefix for the ZWESVSTC started task. This is equivalent to the `ZOWE_PREFIX` variable in the `instance.env` file.
- `zowe.identifier`: Defines the Zowe job identifier for the ZWESVSTC started task. This is equivalent to the `ZOWE_INSTANCE` variable in the `instance.env` file.
- `zowe.externalDomains`: Defines a list of external domains that will be used by the Zowe instance. This configuration is an array of domain name strings. This is equivalent to the `ZWE_EXTERNAL_HOSTS` variable in the `instance.env` file but should be represented as an array. In Sysplex deployment, this is the DVIPA domain name defined in Sysplex Distributor. For example,
   
   ```yaml
   zowe:
    externalDomains:
    - external.my-company.com
    - additional-dvipa-domain.my-company.com
   ```

- `zowe.externalPort`: Defines the port that will be exposed to external Zowe users. By default, this value is set based on the  `GATEWAY_PORT` variable in the in the `instance.env` file. In Sysplex deployment, this is the DVIPA port defined in Sysplex Distributor. See [Configure Sysplex Distributor](configure-sysplex.md#configure-sysplex-distributor) for more information.
- `zowe.environments`: Defines extra environment variables to customize the Zowe runtime. This configuration is a list of key / value pairs. This is equivalent to adding new environment variables to the `instance.env` file. For example,
   ```yaml
   zowe:
    environments:
      MY_NEW_ENV: value-of-my-env
   ```
- `zowe.externalCertificate`: Defines the [northbound certificate](configure-certificates.md#northbound-certificate) facing Zowe users. These configurations are defined in `<keystore-dir>/zowe-certificates.env`.
  
  **Note:** This configuration is not the same as the `EXTERNAL_CERTIFICATE` configuration in `zowe-setup-certificates.env`. In `zowe-setup-certificates.env`, `EXTERNAL_CERTIFICATE` means that the certificate is not generated by the `zowe-setup-certificates.sh` utility script.

- `zowe.internalCertificate`: Defines the default [southbound certificate](configure-certificates.md#southbound-certificate) used within Zowe services. These configurations are defined in `<keystore-dir>/zowe-certificates.env`. By default, this is the same as  `zowe.externalCertificate`.

- `zowe.launcher`: The launcher section defines defaults about how the Zowe launcher should act upon components.
- `zowe.launcher.restartIntervals`: An array of positive integers that defines how many times a component should be tried to be restarted if it fails, and how much time to wait in seconds for that restart to succeed before retrying.
- `zowe.launcher.minUptime`: The minimum amount of time a zowe component should be running in order to be declared as started successfully.
- `zowe.launcher.shareAs`: Whether or not the launcher should start components in the same address space as it. See documentation for [_BPX_SHAREAS](https://www.ibm.com/docs/en/zos/2.4.0?topic=shell-setting-bpx-shareas-bpx-spawn-script) for details.

### YAML configurations - java

The high-level configuration `java` supports these definitions:

- `home`: Defines the path to the Java runtime directory. This is equivalent to the `JAVA_HOME` variable in the `instance.env` file.

### YAML configurations - node

The high-level configuration `node` supports these definitions:

- `home`: Defines the path to the Node.js runtime directory. This is equivalent to the `NODE_HOME` variable in the `instance.env` file.

### YAML configurations - zOSMF

The high-level configuration `zOSMF` supports these definitions:

- `zOSMF.host`: Defines the hostname of your z/OSMF instance. This is equivalent to the `ZOSMF_HOST` variable in the `instance.env` file.
- `zOSMF.port`: Defines the port of your z/OSMF instance. This is equivalent to the `ZOSMF_PORT` variable in the `instance.env` file.
- `zOSMF.applId`: Defines the application ID of your z/OSMF instance. This is equivalent to the `APIML_SECURITY_ZOSMF_APPLID` variable in the `instance.env` file.

### YAML configurations - components

All Zowe components and extensions can have a dedicated section under the `components` high-level configuration.

In this section, `<component>` represents any Zowe components or extensions. For all components and extensions, these are the common definitions.

- `components.<component>.enabled`: Defines if you want to start this component in this Zowe instance. This is a much detailed granular definition of the `LAUNCH_COMPONENT_GROUPS` variable in `instance.env`. This allows you to control each component instead of a group. For external components, also known as extensions, this configuration also replaces the `EXTERNAL_COMPONENTS` variable in `instance.env`.
- `components.<component>.certificate`: you can customize a component to use different certificate from default values. This section follows same format defined in [YAML configurations - certificate](#yaml-configurations-certificate). If this is not customized, the component will use certificates defined in `zowe.internalCertificate`.
- `components.<component>.launcher`: Any component can have a launcher section which overrides the overall Zowe Launcher default defined in `zowe.launcher`.

#### Configure component gateway

These configurations can be used under the `components.gateway` section:

- `port`: Defines the port which the gateway should be started on. This is equivalent to the `GATEWAY_PORT` variable in `instance.env`.
- `debug`: Defines whether to enable debug mode for gateway. This is equivalent to the `APIML_DEBUG_MODE_ENABLED` variable in `instance.env` but with better granular level.
- `apiml.service.allowEncodedSlashes`: When this parameter is set to `true`, the Gateway allows encoded characters to be part of URL requests redirected through the Gateway.  This is equivalent to the `APIML_ALLOW_ENCODED_SLASHES` variable in `instance.env`.
- `apiml.service.corsEnabled`: When this parameter is set to `true`, CORS are enabled in the API Gateway for Gateway routes `api/v1/gateway/**`. This is equivalent to the `APIML_CORS_ENABLED` variable in `instance.env`.
- `apiml.service.preferIpAddress`: Set this parameter to `true`  to advertise a service IP address instead of its hostname. **Note:** This configuration is deprecated. Zowe start script will ignore this value and always set it to `false`. This is equivalent to the `APIML_PREFER_IP_ADDRESS` variable in `instance.env`.
- `apiml.gateway.timeoutMillis`: Specifies the timeout for connection to the services in milliseconds. This is equivalent to the `APIML_GATEWAY_TIMEOUT_MILLIS` variable in `instance.env`.
- `apiml.security.x509.enabled`: Set this parameter to `true` to enable the client certificate authentication functionality through ZSS. This is equivalent to the `APIML_SECURITY_X509_ENABLED` variable in `instance.env`.
- `apiml.security.x509.externalMapperUrl`: Defines the URL where Gateway can query the mapping of client certificates. This is equivalent to the `APIML_GATEWAY_EXTERNAL_MAPPER` variable in `instance.env`.
- `apiml.security.zosmf.applid`: Defines the z/OSMF APPLID used for PassTicket. This is equivalent to the `APIML_SECURITY_ZOSMF_APPLID` variable in `instance.env`. This should have the same value of `zOSMF.applId`. This entry is kept for backward compatibility.
- `apiml.security.auth.provider`: Defines the authentication provider used by the API Gateway. This is equivalent to the  `APIML_SECURITY_AUTH_PROVIDER` variable in `instance.env`.
- `apiml.security.authorization.endpoint.url`: Defines the URL to the authorization endpoint. This endpoint tells Gateway if a user has a particular permission on SAF profile. For example, permission to the `APIML.SERVICES` profile of `ZOWE` class. This is equivalent to the `APIML_SECURITY_AUTHORIZATION_ENDPOINT_URL` variable in `instance.env`.
- `apiml.security.ssl.verifySslCertificatesOfServices`: Defines whether APIML should verify certificates of services in strict mode. Setting to `true` will enable the `strict` mode where APIML will validate if the certificate is trusted in turststore, and also if the certificate Common Name or Subject Alternate Name (SAN) matches the service hostname. This is equivalent to the `VERIFY_CERTIFICATES` variable defined in `<keystore-dir>/zowe-certificates.env`.
- `apiml.security.ssl.nonStrictVerifySslCertificatesOfServices`: Defines whether APIML should verify certificates of services in non-strict mode. Setting the value to `true` will enable the `non-strict` mode where APIML will validate if the certificate is trusted in turststore, but ignore the certificate Common Name or Subject Alternate Name (SAN) check. Zowe will ignore this configuration when strict mode is enabled with `apiml.security.ssl.verifySslCertificatesOfServices`. This is equivalent to the `NONSTRICT_VERIFY_CERTIFICATES` variable defined in `<keystore-dir>/zowe-certificates.env`.
- `apiml.server.maxConnectionsPerRoute`: Specifies the maximum connections for each service. This is equivalent to the  `APIML_MAX_CONNECTIONS_PER_ROUTE` variable in `instance.env`.
- `apiml.server.maxTotalConnections`: Specifies the total connections for all services registered under API Mediation Layer. This is equivalent to the `APIML_MAX_TOTAL_CONNECTIONS` variable in `instance.env`.

#### Configure component discovery

These configurations can be used under the `components.discovery` section:

- `port`: Defines the port which discovery should be started on. This is equivalent to the `DISCOVERY_PORT` variable in `instance.env`.
- `debug`: Defines whether to enable debug mode for gateway. This is equivalent to the `APIML_DEBUG_MODE_ENABLED` variable in `instance.env` but with better granular level.
- `apiml.service.preferIpAddress`: Set this parameter to `true`  to advertise a service IP address instead of its hostname. **Note:** This configuration is deprecated. The Zowe start script will ignore this value and always set it to `false`. This is equivalent to the  `APIML_PREFER_IP_ADDRESS` variable in `instance.env`.
- `apiml.security.ssl.verifySslCertificatesOfServices`: Defines whether APIML should verify certificates of services in strict mode. Setting to `true` will enable the `strict` mode where APIML will validate both if the certificate is trusted in turststore, and also if the certificate Common Name or Subject Alternate Name (SAN) matches the service hostname. This is equivalent to the `VERIFY_CERTIFICATES` variable defined in `<keystore-dir>/zowe-certificates.env`.
- `apiml.security.ssl.nonStrictVerifySslCertificatesOfServices`: Defines whether APIML should verify certificates of services in non-strict mode. Setting to `true` will enable the `non-strict` mode where APIML will validate if the certificate is trusted in turststore, but ignore the certificate Common Name or Subject Alternate Name (SAN) check. Zowe will ignore this configuration if strict mode is enabled with `apiml.security.ssl.verifySslCertificatesOfServices`. This is equivalent to the `NONSTRICT_VERIFY_CERTIFICATES` variable defined in `<keystore-dir>/zowe-certificates.env`.
- `alternativeStaticApiDefinitionsDirectories`: Specifies the alternative directories of static definitions. This is equivalent to the  `APIML_MAX_CONNECTIONS_PER_ROUTE` variable in `instance.env`.
- `apiml.server.maxTotalConnections`: Specifies the total connections for all services registered under API Mediation Layer. This is equivalent to the `ZWEAD_EXTERNAL_STATIC_DEF_DIRECTORIES` variable in `instance.env`.

#### Configure component api-catalog

These configurations can be used under the `components.api-catalog` section:

- `port`: Defines the port which API Catalog should be started on. This is equivalent to the `CATALOG_PORT` variable in `instance.env`.
- `debug`: Defines if we want to enable debug mode for gateway. This is equivalent to the `APIML_DEBUG_MODE_ENABLED` variable but with better granular level.
- `environment.preferIpAddress`: Set this parameter to `true`  to advertise a service IP address instead of its hostname. **Note:** This configuration is deprecated. Zowe start script will ignore this value and always set it to `false`. This is equivalent to the  `APIML_PREFER_IP_ADDRESS` variable in `instance.env`.

#### Configure component caching-service

These configurations can be used under the `components.caching-service` section:

- `port`: Defines the port which Caching Service should be started on. This is equivalent to the `ZWE_CACHING_SERVICE_PORT` variable in `instance.env`.
- `debug`: Defines if we want to enable debug mode for gateway. This is equivalent to the `APIML_DEBUG_MODE_ENABLED` variable in `instance.env` but with better granular level.
- `storage.mode`: Sets the storage type used to persist data in the Caching Service. This is equivalent to the `ZWE_CACHING_SERVICE_PERSISTENT` variable in `instance.env`.
- `storage.size`: Specifies amount of records before eviction strategies start evicting. This is equivalent to the `ZWE_CACHING_STORAGE_SIZE` variable in `instance.env`.
- `storage.evictionStrategy`: Specifies eviction strategy to be used when the storage size is achieved. This is equivalent to the `ZWE_CACHING_EVICTION_STRATEGY` variable in `instance.env`.
- `storage.vsam.name`: Specifies the data set name of the caching service VSAM data set. This is equivalent to the `ZWE_CACHING_SERVICE_VSAM_DATASET` variable in `instance.env`.
- `storage.redis.masterNodeUri`: Specifies the URI used to connect to the Redis master instance in the form `username:password@host:port`. This is equivalent to the `CACHING_STORAGE_REDIS_MASTERNODEURI` variable in `instance.env`.
- `storage.redis.timeout`: Specifies the timeout second to Redis. Defaults to 60 seconds. This is equivalent to the `CACHING_STORAGE_REDIS_TIMEOUT` variable in `instance.env`.
- `storage.redis.sentinel.masterInstance`: Specifies the Redis master instance ID used by the Redis Sentinel instances. This is equivalent to the `CACHING_STORAGE_REDIS_SENTINEL_MASTERINSTANCE` variable in `instance.env`.
- `storage.redis.sentinel.nodes`: Specifies the array of URIs used to connect to a Redis Sentinel instances in the form `username:password@host:port`. This is equivalent to the `CACHING_STORAGE_REDIS_SENTINEL_NODES` variable in `instance.env`.
- `storage.redis.ssl.enabled`: Specifies the boolean flag indicating if Redis is being used with SSL/TLS support. Defaults to `true`. This is equivalent to the `CACHING_STORAGE_REDIS_SSL_ENABLED` variable in `instance.env`.
- `storage.redis.ssl.keystore`: Specifies the keystore file used to store the private key. This is equivalent to the `CACHING_STORAGE_REDIS_SSL_KEYSTORE` variable in `instance.env`.
- `storage.redis.ssl.keystorePassword`: Specifies the password used to unlock the keystore. This is equivalent to the `CACHING_STORAGE_REDIS_SSL_KEYSTOREPASSWORD` variable in `instance.env`.
- `storage.redis.ssl.truststore`: Specifies the truststore file used to keep other parties public keys and certificates. This is equivalent to the `CACHING_STORAGE_REDIS_SSL_TRUSTSTORE` variable in `instance.env`.
- `storage.redis.ssl.truststorePassword`: Specifies the password used to unlock the truststore. This is equivalent to the `CACHING_STORAGE_REDIS_SSL_TRUSTSTOREPASSWORD` variable in `instance.env`.
- `storage.infinispan.initialHosts`: Specifies the list of cluster nodes (members) used in Cross-Site Replication. This is equivalent to the `CACHING_STORAGE_INFINISPAN_INITIALHOSTS` variable in `instance.env`.
- `storage.infinispan.persistence.dataLocation`: Specifies he path where the Soft-Index store will keep its data files for the Infinispan Soft-Index Cache Store. This is equivalent to the `CACHING_STORAGE_INFINISPAN_PERSISTENCE_DATALOCATION` variable in `instance.env`.
- `jgroups.bind.port`: Specifies the Jgroups port for used by Infinispan. This is equivalent to the `JGROUPS_BIND_PORT` variable in `instance.env`.
- `jgroups.bind.address`: Specifies the Jgroups address for used by Infinispan. This is equivalent to the `JGROUPS_BIND_ADDRESS` variable in `instance.env`.
- `environment.preferIpAddress`: Set this parameter to `true`  to advertise a service IP address instead of its hostname. **Note:** this configuration is deprecated. Zowe start script will ignore this value and always set it to `false`. This is equivalent to the `APIML_PREFER_IP_ADDRESS` variable in `instance.env`.
- `apiml.security.ssl.verifySslCertificatesOfServices`: Specifies whether APIML should verify certificates of services in strict mode. Set to `true` will enable `strict` mode that APIML will validate both if the certificate is trusted in turststore, and also if the certificate Common Name or Subject Alternate Name (SAN) match the service hostname. This is equivalent to the `VERIFY_CERTIFICATES` variable defined in `<keystore-dir>/zowe-certificates.env`.
- `apiml.security.ssl.nonStrictVerifySslCertificatesOfServices`: Defines whether APIML should verify certificates of services in non-strict mode. Setting to `true` will enable `non-strict` mode where APIML will validate if the certificate is trusted in turststore, but ignore the certificate Common Name or Subject Alternate Name (SAN) check. Zowe will ignore this configuration if strict mode is enabled with `apiml.security.ssl.verifySslCertificatesOfServices`. This is equivalent to the `NONSTRICT_VERIFY_CERTIFICATES` variable defined in `<keystore-dir>/zowe-certificates.env`.

#### Configure component app-server

These configurations can be used under the `components.app-server` section:

- `port`: Defines the port which App Server should be started on. This is equivalent to the `ZOWE_ZLUX_SERVER_HTTPS_PORT` variable in `instance.env`.

#### Configure component zss

These configurations can be used under the `components.zss` section:

- `port`: Defines the port which ZSS should be started on. This is equivalent to the `ZOWE_ZSS_SERVER_PORT` variable in `instance.env`.
- `crossMemoryServerName`: Defines the procedure name of cross memory server. This is equivalent to the `ZOWE_ZSS_XMEM_SERVER_NAME` variable in `instance.env`.
- `tls`: Defines whether ZSS service has enabled TLS. This is equivalent to the `ZOWE_ZSS_SERVER_TLS` variable in `instance.env`.

#### Configure component jobs-api

These configurations can be used under the `components.jobs-api` section:

- `port`: Defines the port which Jobs API should be started on. This is equivalent to the `JOBS_API_PORT` variable in `instance.env`.

#### Configure component files-api

These configurations can be used under the `components.files-api` section:

- `port`: Defines the port which Files API should be started on. This is equivalent to the `FILES_API_PORT` variable in `instance.env`.

#### Configure component explorer-jes

These configurations can be used under the `components.explorer-jes` section:

- `port`: Defines the port which JES UI Explorer should be started on. This is equivalent to the `JES_EXPLORER_UI_PORT` variable in `instance.env`.
- `frameAncestors`: Defines the frame ancestors supported by UI Explorer. This is equivalent to the `ZOWE_EXPLORER_FRAME_ANCESTORS` variable in `instance.env` but in better granular level.

#### Configure component explorer-mvs

These configurations can be used under the `components.explorer-mvs` section:

- `port`: Defines the port which MVS UI Explorer should be started on. This is equivalent to the `MVS_EXPLORER_UI_PORT` variable in `instance.env`.
- `frameAncestors`: Defines the frame ancestors supported by UI Explorer. This is equivalent to the `ZOWE_EXPLORER_FRAME_ANCESTORS` variable in `instance.env` but in better granular level.

#### Configure component explorer-uss

These configurations can be used under the `components.explorer-uss` section:

- `port`: Defines the port which USS UI Explorer should be started on. This is equivalent to the `USS_EXPLORER_UI_PORT` variable in `instance.env`.
- `frameAncestors`: Defines the frame ancestors supported by UI Explorer. This is equivalent to the `ZOWE_EXPLORER_FRAME_ANCESTORS` variable in `instance.env` but in better granular level.

#### Configure external extension

You can define a `components.<extension-id>` section and use common component configuration entries.

For example, enable `my-extension`:

```yaml
components:
  # for extensions, you can add your definition like this
  my-extension:
    enabled: true
```

### YAML configurations - haInstances

All Zowe high availability instances should have a dedicated section under the `haInstances` high-level configuration.

In this section, `<ha-instance>` represents any Zowe high availability instance ID.

For all high availability instances, these are the common definitions.

- `haInstances.<ha-instance>.hostname`: Defines the host name where you want to start this instance. This could be the host name of one LPAR in your Sysplex.
- `haInstances.<ha-instance>.ip`: Defines the IP address where you want to start this instance. This could be the IP address of one LPAR in your Sysplex.
- `haInstances.<ha-instance>.components.<component>`: Optional settings you can override component configurations for this high availability instance. See [Configuration override](#configuration-override) for more details.


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
   ZOWE_EXPLORER_HOST=
   ZOWE_IP_ADDRESS= 
   ```

   The `ZOWE_EXPLORER_HOST` value must resolve to the external IP address, otherwise you should use the external IP address as the value for `ZOWE_EXPLORER_HOST`.   

   The `zowe-configure-instance.sh` script will attempt to discover the IP address and hostname of your system if you leave these unset.  

   When the script cannot determine the hostname or the IP address, it will ask you to enter the IP address manually during the dialog.  If you have not specified a value for `ZOWE_EXPLORER_HOST`, then the script will use the IP address as the hostname. 

   The values of `ZOWE_EXPLORER_HOST` and `ZOWE_IP_ADDRESS` that the script discovered are appended to the `instance.env` file unless they were already set in that file or as shell environment variables before you ran the script. 
