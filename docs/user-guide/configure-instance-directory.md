# Creating and configuring the Zowe instance directory

The Zowe instance directory contains configuration data required to launch a Zowe runtime.  This includes port numbers, location of dependent runtimes such as Java, Node, z/OSMF, as well as log files. When Zowe is started, configuration data will be read from files in the instance directory and logs will be written to files in the instance directory. 

## Prerequisites

Before creating an instance directory, ensure that you have created a keystore directory that contains the Zowe certificate. For more information about how to create a keystore directory, see [Creating Zowe certificates](configure-certificates.md).  Also, ensure that you have already configured the z/OS environment. For information about how to configure the z/OS environment, see [Configuring the z/OS system for Zowe](configure-zos-system.md).

## Creating an instance directory

To create an instance directory, navigate to the Zowe runtime directory `<ZOWE_ROOT_DIR>` and execute the following commands:

```sh
<ROOT_DIR>/bin/zowe-configure-instance.sh -c <PATH_TO_INSTANCE_DIR>
```

Multiple instance directories can be created and used to launch independent Zowe runtimes from the same Zowe runtime directory.  

The Zowe instance directory contains a file `/bin/instance.env` that stores configuration data. The data is read each time Zowe is started.  

The purpose of the instance directory is to hold information in the z/OS File System (zFS) that is created (such as log files) or modified (such as preferences) or configured (such as port numbers) away from the zFS runtime directory for Zowe.  This allows the runtime directory to be read only and to be replaced when a new Zowe release is installed, with customizations being preserved in the instance directory.  

If you have an instance directory that is created from a previous release of Zowe 1.8 or later and are installing a newer release of Zowe, then you should run `zowe-configure-instance.sh -c <PATH_TO_INSTANCE_DIR>` pointing to the existing instance directory to have it updated with any new values.  The release documentation for each new release will specify when this is required, and the file `manifest.json` within each instance directory contains information for which Zowe release it was created from.

## Reviewing the `instance.env` file

To operate Zowe, a number of zFS folders need to be located for prerequisites on the platform. Default values are selected when you run `zowe-configure-instance.sh`. You might want to modify the values.  

### Component groups

`LAUNCH_COMPONENT_GROUPS` : This is a comma separated list of which z/OS microservice groups are started when Zowe launches. 
  - `GATEWAY` will start the API mediation layer which includes the API catalog, the API gateway and the API discovery service.  These three address spaces are Apache Tomcat servers and uses the version of Java on z/OS as determined by the `JAVA_HOME` value.  
  - `DESKTOP` will start the Zowe desktop which is the browser GUI for hosting Zowe applications such as the 3270 Terminal emulator or the File Explorer.  The Zowe desktop is a node application and uses the version specified by the `HOME_HOME` value.  
  - Vendor products may extend Zowe with their own component group that they wish to be lifecycled by the Zowe `ZWESVSTC` started task and run as a Zowe sub address space.  To do this specify the fully qualified directory provided by the vendor containing that contains their Zowe extension scripts.  This directory will contain a `start.sh` script **(required)** that will be called when the `ZWESVSTC` started task is launched, a `configure.sh` script **(optional)** that will perform any configuration steps such as adding iFrame plugins to the Zowe desktop, as well as `validate.sh` script **(optional)** that can used to perform any pre-launch validation such as checking system pre-reqs.   More documentation on how a vendor can extend Zowe with a sub address space is covered in 

  
  and a `configure.sh` script **(optional)** 

### Component prerequisites

- `JAVA_HOME`:  The path where 64-bit Java 8 or later is installed.  Only needs to be specified if not already set as a shell variable.  Defaults to `/usr/lpp/java/J8.0_64`.
- `NODE_HOME`:  The path to the Node.js runtime.  Only needs to be specified if not already set as a shell variable.  
- `ROOT_DIR`: The directory where the Zowe runtime is located.  Defaults to the location of where `zowe-configure-instance` was executed. 
- `ZOSMF_PORT`: The port used by z/OSMF REST services.  Defaults to value determined through running `netstat`.
- `ZOSMF_HOST`: The host name of the z/OSMF REST API services.
- `ZOWE_EXPLORER_HOST`: The hostname of where the Explorer servers are launched from.  Defaults to running `hostname -c`.  Ensure that this host name is externally accessible from clients who want to use Zowe as well as internally accessible from z/OS itself.  
- `ZOWE_IP_ADDRESS`:  The IP address of your z/OS system which must be externally accessible to clients who want to use Zowe.  This is important to verify for IBM Z Development & Test Environment and cloud systems, where the default that is determined through running `ping` and `dig` on z/OS return a different IP address from the external address.  
- `APIML_ENABLE_SSO`: Define whether single sign-on should be enabled. Use a value of `true` or `false`. Defaults to `false`.

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
   - **DS** - Node.js instance for the ZSS Server
   - **DT** - Zowe Desktop Application Server
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

When Zowe starts, a number of its microservices need to be given port numbers that they can use to allow access to their services.  The two most important port numbers are the `GATEWAY_PORT` which is for access to the API gateway through which REST APIs can be viewed and accessed, and `ZOWE_ZLUX_SERVER_HTTPS_PORT` which is used to deliver content to client web browsers logging in to the Zowe desktop.  All of the other ports are not typically used by clients and used for intra-service communication by Zowe.  

- `CATALOG_PORT`: The port the API catalog service will use.
- `DISCOVERY_PORT`: The port the discovery service will use.
- `GATEWAY_PORT`: The port the API gateway service will use.  This port is used by REST API clients to access z/OS services through the API mediation layer, so should be accessible to these clients.  This is also the port used to log on to the API catalog web page through a browser.
- `JOBS_API_PORT`: The port the jobs API service will use.
- `FILES_API_PORT`: The port the files API service will use.
- `JES_EXPLORER_UI_PORT`: The port the jes-explorer UI service will use.
- `MVS_EXPLORER_UI_PORT`: The port the mvs-explorer UI service will use.
- `USS_EXPLORER_UI_PORT`: The port the uss-explorer UI service will use.
- `ZOWE_ZLUX_SERVER_HTTPS_PORT`: The port used by the Zowe desktop.  It should be accessible to client machines with browsers wanting to log on to the Zowe desktop.  
- `ZOWE_ZSS_SERVER_PORT`: This port is used by the ZSS server.  

**Note:** If all of the default port values are acceptable, the ports do not need to be changed. To allocate ports, ensure that the ports are not in use for the Zowe runtime servers.

To determine which ports are not available, follow these steps:

1. Display a list of ports that are in use with the following command:

   ```
   TSO NETSTAT
   ```

2. Display a list of reserved ports with the following command:

   ```
   TSO NETSTAT PORTLIST
   ```

#### Terminal ports

**Note:** Unlike the ports needed by the Zowe runtime for its Zowe Application Framework and z/OS Services which must be unused, the terminal ports are expected to be in use.  

- `ZOWE_ZLUX_SSH_PORT`: The Zowe desktop contains an application *VT Terminal* which opens a terminal to z/OS inside the Zowe desktop web page.  This port is the number used by the z/OS SSH service and defaults to 22.  The USS command `netstat -b | grep SSHD1` can be used to display the SSH port used on a z/OS system.  
- `ZOWE_ZLUX_TELNET_PORT`: The Zowe desktop contains an application *3270 Terminal* which opens a 3270 emulator inside the Zowe desktop web page.  This port is the number used by the z/OS telnet service and defaults to 23. The USS command `netstat -b | grep TN3270` can be used to display the telnet port used on a z/OS system.
- `ZOWE_ZLUX_SECURITY_TYPE`: The *3270 Terminal* application needs to know whether the telnet service is using `tls` or `telnet` for security.  The default value is blank for `telnet`.

### Extensions

- ZWEAD_EXTERNAL_STATIC_DEF_DIRECTORIES:  Full USS path to directory containing static API Mediation Layer .yml definition files.  For more detail see [Onboard a REST API without code changes required](../extend/extend-apiml/api-mediation-onboard-an-existing-rest-api-service-without-code-changes.md#6.-add-a-definition-in-the-api-mediation-layer-in-the-zowe-runtime).  Multiple paths should be semi-colon separated. This value allows a Zowe instance to be configured so that the API Mediation Layer can be extended by third party REST API and web UI servers.  
