# Configuring the Zowe instance directory

The Zowe instance directory contains configuration data required to launch a Zowe runtime.  This includes port numbers, location of dependent runtimes such as Java, Node, z/OSMF, as well as log files. When Zowe is started, configuration data will be read from files in the instance directory and logs will be written to files in the instance directory.  

To create an instance directory, navigate to the Zowe runtime directory `<ZOWE_ROOT_DIR>` and execute the following commands:

```sh
<ROOT_DIR>/bin/zowe-configure-instance.sh -c <PATH_TO_INSTANCE_DIR>
```

Multiple instance directories can be created and used to launch independent Zowe runtimes from the same Zowe runtime directory.  

The Zowe instance directory conains a file `/bin/instance.env` that stores configuration data. The data is read each time Zowe is started.  

## Reviewing the `instance.env` file

To operate Zowe, a number of ZFS folders need to be located for prerequisites on the platform. Default values are selected when you run `zowe-configure-instance.sh`. You might want to modify the values.  

### General configuration

- `ROOT_DIR`: The directory where the Zowe runtime is located.  Defaults to the location of where `zowe-configure-instance` was executed.  
- `ZOWE_JAVA_HOME`:  The path where 64 bit Java 8 or later is installed.  Defaults to `/usr/lpp/java/J8.0_64`.
- `ZOWE_NODE_HOME`:  The path to the node runtime.  Defaults to value of `NODE_HOME`
- `ZOSMF_PORT`: The port used by z/OSMF REST services.  Defaults to value determined through running `netstat`.
- `ZOSMF_HOST`: The host name of the z/OSMF REST API services.
- `ZOWE_EXPLORER_HOST`: The hostname of where the explorer servers are launched from.  Defaults to running `hostname -c`.  Ensure that this host name is externally accessible from clients who want to use Zowe as well as internally accessible from z/OS itself.  
- `ZOWE_IP_ADDRESS`:  The IP address of your z/OS system which must be externally accessible from clients who want to use Zowe.  This is important to verify for zD&T and cloud systems, where the default that is determined through running `ping` and `dig` on z/OS return a different IP address from the external address.  
- `APIML_ENABLE_SSO`: Define whether single sign-on should be enabled. Use a value of `true` or `false`. Defaults to `false`.

### Keystore configuration

- `KEYSTORE_DIRECTORY`: This is a path to a USS folder containing the certificate that Zowe uses to identify itself and encrypt https:// traffic to its clients accessing REST APIs or web pages.  This also contains a trust store used to hold the public keys of any z/OS services that Zowe communites to, such as z/OSMF.  The keystore directory must be created the first time Zowe is installed into a z/OS system and it can be shared between different Zowe runtimes.  

### Address space names

Individual address spaces for different Zowe instances can be distinguished from each other in RMF records or SDSF views by specifying how they are named.  Address spaces names are eight characters long and made up of a prefix `ZOWE_PREFIX`, instance `ZOWE_INSTANCE` followed by an identifier for each subcomponent.  

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

### Ports

When Zowe starts, a number of its micro services need to be given port numbers that they can use to allow access to their services.  The two most important port numbers are the `GATEWAY_PORT` which is for access to the API gateway through which REST APIs can be viewed and accessed, and `ZOWE_ZLUX_SERVER_HTTPS_PORT` which is used to deliver content to client web browsers logging into the Zowe desktop.  All of the other ports are not typically used by clients and used for intra service communication by Zowe.  

- `CATALOG_PORT`: The port the API catalog service will use.
- `DISCOVERY_PORT`: The port the discovery service will use.
- `GATEWAY_PORT`: The port the API gateway service will use.  This port is used by REST API clients to access z/OS services through the API mediation layer, so should be accessible to these clients.  This is also the port used to log onto the API catalog web page through a browser.
- `JOBS_API_PORT`: The port the jobs API service will use.
- `FILES_API_PORT`: The port the files API service will use.
- `JES_EXPLORER_UI_PORT`: The port the jes-explorer UI service will use.
- `MVS_EXPLORER_UI_PORT`: The port the mvs-explorer UI service will use.
- `USS_EXPLORER_UI_PORT`: The port the uss-explorer UI service will use.
- `ZOWE_ZLUX_SERVER_HTTPS_PORT`: The port used by the Zowe desktop.  It should be accessible to client machines with browsers wishing to log onto the Zowe desktop.  
- `ZOWE_ZSS_SERVER_PORT`: This port is used by the ZSS server.  

**Notes:** If all of the default port values are acceptable, the ports do not need to be changed. To allocate ports, ensure that the ports are not in use for the Zowe runtime servers.

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
- `ZOWE_ZLUX_TELNET_PORT`: The Zowe desktop contains an application *TN 3270 Terminal* which opens a 3270 emulator inside the Zowe desktop web page.  This port is the number used by the z/OS telnet service and defaults to 23. The USS command `netstat -b | grep TN3270` can be used to display the telnet port used on a z/OS system.
- `ZOWE_ZLUX_SECURITY_TYPE`: The *TN 3270 Terminal* application needs to know whether the telnet service is using `tls` or `telnet` for security.  The default value is blank for `telnet`.

### Components

- `LAUNCH_COMPONENT_GROUPS` : This is a comma separated list of which z/OS microservice groups are started when Zowe launches. 
  - `GATEWAY` will start the API mediation layer which includes the API catalog, the API gateway and the API discovery service.  These three address spaces are Apache Tomcat servers and uses the version of Java on z/OS as determined by the `ZOWE_JAVA_HOME` value.  
  - `DESKTOP` will start the Zowe desktop which is the browser GUI for hosting Zowe applications such as the TN3270 emulator or the File Explorer.  The Zowe desktop is a node application and uses the version specified by the `ZOWE_HOME_HOME` value.  