# Creating and configuring the Zowe instance directory

The Zowe instance directory or `<INSTANCE_DIRECTORY>` contains configuration data required to launch a Zowe runtime.  This includes port numbers, location of dependent runtimes such as Java, Node, z/OSMF, as well as log files. When Zowe is started, configuration data will be read from files in the instance directory and logs will be written to files in the instance directory. 

The instance directory ``<INSTANCE_DIRECTORY>/bin` contains a number of key scripts
 - `zowe-start.sh` is used to start the Zowe runtime by launching the `ZWESVSTC` started task.
  - `zowe-stop.sh` is used to stop the Zowe runtime by terminating the `ZWESVSTC` started task.  
  - `zowe-support.sh` can be used to capture diagnostics around the Zowe runtime for troubleshooting and off-line problem determination, see [Capturing diagnostics to assist problem determination](../troubleshoot/troubleshoot-diagnostics.md).

## Prerequisites

Before creating an instance directory, ensure that you have created a keystore directory that contains the Zowe certificate. For more information about how to create a keystore directory, see [Creating Zowe certificates](configure-certificates.md).  Also, ensure that you have already configured the z/OS environment. For information about how to configure the z/OS environment, see [Configuring the z/OS system for Zowe](configure-zos-system.md).

## Creating an instance directory

To create an instance directory, you can use one of the following methods: 

### Method 1: Use the `zowe-configure-instance.sh` script

navigate to the Zowe runtime directory `<ZOWE_ROOT_DIR>` and execute the following commands:

```sh
<ROOT_DIR>/bin/zowe-configure-instance.sh -c <PATH_TO_INSTANCE_DIR>
```

Multiple instance directories can be created and used to launch independent Zowe runtimes from the same Zowe runtime directory.  

The Zowe instance directory contains a file `instance.env` that stores configuration data. The data is read each time Zowe is started.  

The purpose of the instance directory is to hold information in the z/OS File System (zFS) that is created (such as log files) or modified (such as preferences) or configured (such as port numbers) away from the zFS runtime directory for Zowe.  This allows the runtime directory to be read only and to be replaced when a new Zowe release is installed, with customizations being preserved in the instance directory.  

If you have an instance directory that is created from a previous release of Zowe 1.8 or later and are installing a newer release of Zowe, then you should run `zowe-configure-instance.sh -c <PATH_TO_INSTANCE_DIR>` pointing to the existing instance directory to have it updated with any new values.  The release documentation for each new release will specify when this is required, and the file `manifest.json` within each instance directory contains information for which Zowe release it was created from.

In order to allow the `ZWESVSTC` started task to have permission to acces the contents of the `<INSTANCE_DIR>` the `zowe-configure-instance.sh` script sets the group ownership of the top level directory and its child to be `ZWEADMIN`.  If a different group is used for the `ZWESVSTC` started task you can specify this with the optional `-g` argument, for example.

```sh
<ROOT_DIR>/bin/zowe-configure-instance.sh -c <PATH_TO_INSTANCE_DIR> -g <GROUP>
```

### Method 2: Use z/OSMF Workflow

The z/OSMF workflow lets you create and configure a Zowe instance directory that is required to launch a Zowe runtime. This includes port numbers, location of dependent runtimes such as Java, Node, z/OSMF, as well as log files. The z/OSMF workflow also lets you start the Zowe instance started task. 

**Important** Ensure that your site has configured z/OSMF as described in the IBM Knowledge Center and addressed the z/OSMF security requirements for CA ACF2, CA Top Secret, or IBM RACF as applicable. Apply all z/OSMF related product maintenance to ensure the workflows are available for use.

Perform the following steps to register and execute the workflow in the z/OSMF web interface:

 1.	Log in to the z/OSMF web interface and select Use Desktop Interface.
 2.	Select the **Workflows** tile.
 3.	Select **Create Workflow** from the **Actions** menu.
      
      The **Create Workflow** panel appears.
 5.	Enter the complete USS path to the workflow you want to register in the Workflow Definition File field.
     
     - If you installed Zowe with the SMP/E build, the workflow is located in the SMP/E target zFS file system that was mounted during the installation. The path to the workflow definition file is  *[pathPrefix]/usr/lpp/zowe/files/workflows/ZWEWRF03.xml*.

    - (Optional) Enter the complete USS path to the edited workflow properties file in the Workflow Variable Input File field. 
    
      Use this file to customize product instances and automate workflow execution, saving time and effort when deploying multiple standardized Zowe instances. Values from this file override the default values for the workflow variables.

      The sample properties file is located in the same directory with the workflow definition file as follows: *<pathPrefix>/usr/lpp/zowe/files/workflows/ZWEWRF03.properties*

      Create a copy of this file, and then modify as described in the file. Set the field to the path where the new file is located.

      if you use the convenience build, the workflows and variable input files are located in the USS runtime folder in *files/workflows*.

5.	Select the System where the workflow runs.
6. Select **Next**.
8.	Specify a unique Workflow name. 
9.	Select or enter an Owner user ID, and select **Assign all steps to owner user ID**.
10. Select **Finish**. 

    The workflow is registered in z/OSMF. The workflow is available for execution to deploy and configure the Zowe instance. 
11.	Execute the steps in the following order:

    -	**Define Variables** 
    
        The workflow includes the list of Zowe configuration and the started task variables. Enter the values for variables based on your mainframe environment and Zowe configuration requirements.
    - **Create a Zowe instance**

       Execute the step to create a Zowe instance directory.
	
    - **Change the instance configuration**

      Execute the step to configure the Zowe instance. The configuration of the Zowe instance depends on the values for variables that you defined in the first step.
    - **Copy the STC to the procedure library**
    
        If the procedure library is empty, skip this step.
    - **Start the Zowe instance**
       
        Execute the step to start the instance.
12. Perform the following steps to execute each step individually:

     1. Double-click the title of the step.

     2. Select the Perform tab.

     3. Review the step contents and update the input values as required.
     4. Select **Next**.
     5. Repeat the previous two steps to complete all items until the option Finish is available.
     6. Select **Finish**.
    
    After you execute each step, the step is marked as Complete. The workflow is executed. 
    
For general information about how to execute z/OSMF workflow steps, watch the [z/OSMF Workflows Tutorial](https://www.youtube.com/watch?v=KLKi7bhKBlE&feature=youtu.be).

After completing the workflow execution, you can view the running ZWESVSTC procedure.

## Reviewing the `instance.env` file

To operate Zowe, a number of zFS folders need to be located for prerequisites on the platform. Default values are selected when you run `zowe-configure-instance.sh`. You might want to modify the values.  

### Component groups

`LAUNCH_COMPONENT_GROUPS`: This is a comma-separated list of which z/OS microservice groups are started when Zowe launches. 
  - `GATEWAY` will start the API mediation layer that includes the API catalog, the API gateway, and the API discovery service.  These three address spaces are Apache Tomcat servers and uses the version of Java on z/OS as determined by the `JAVA_HOME` value.  
  - `DESKTOP` will start the Zowe desktop that is the browser GUI for hosting Zowe applications such as the 3270 Terminal emulator or the File Explorer.  The Zowe desktop is a node application and uses the version specified by the `NODE_HOME` value.  
  - Vendor products may extend Zowe with their own component group that they want to be lifecycled by the Zowe `ZWESVSTC` started task and run as a Zowe sub address space.  To do this, specify the fully qualified directory provided by the vendor that contains their Zowe extension scripts.  This directory will contain a `start.sh` script **(required)** that is called when the `ZWESVSTC` started task is launched, a `configure.sh` script **(optional)** that performs any configuration steps such as adding iFrame plug-ins to the Zowe desktop, and a `validate.sh` script **(optional)** that can be used to perform any pre-launch validation such as checking system prerequisites. For more information about how a vendor can extend Zowe with a sub address space, see the [Extending](../extend/extend-apiml/onboard-overview.md) section.

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

**Note:** If all of the default port values are acceptable, the ports do not need to be changed. To allocate ports for the Zowe runtime servers, ensure that the ports are not in use.

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

- `ZWEAD_EXTERNAL_STATIC_DEF_DIRECTORIES`:  Full USS path to the directory that contains static API Mediation Layer .yml definition files.  For more information, see [Onboard a REST API without code changes required](../extend/extend-apiml/onboard-static-definition.md#add-a-definition-in-the-api-mediation-layer-in-the-zowe-runtime).  Multiple paths should be semicolon separated. This value allows a Zowe instance to be configured so that the API Mediation Layer can be extended by third party REST API and web UI servers. 

- `EXTERNAL_COMPONENTS`: For third-party extenders to add the full path to the directory that contains their component lifecycle scripts.  For more information, see [Zowe lifecycle - Zowe extensions](../extend/lifecycling-with-zwesvstc.md#zowe-extensions).