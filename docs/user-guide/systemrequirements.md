# System requirements

Before installing Zowe, ensure that your environment meets all of the prerequisites.

1. Ensure that IBM z/OS Management Facility (z/OSMF) is installed and configured correctly. z/OSMF is a prerequisite for the Zowe microservice that must be installed and running before you use Zowe. For details, see [z/OSMF requirements](#zosmf-requirements).

2. Review component specific requirements.
     -   [System requirements for zLUX, explorer server, and API Mediation](#system-requirements-for-zlux-explorer-server-and-api-mediation-layer)
     -   [System requirements for Zowe CLI](#system-requirements-for-zowe-cli)

## z/OSMF requirements

The following information contains procedures and tips for meeting z/OSMF requirements. For complete information, go to [IBM Knowledge Center](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3/en/homepage.html) and read the following documents.

- [IBM z/OS Management Facility Configuration Guide](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/IZUHPINFO_PartConfiguring.htm)
- [IBM z/OS Management Facility Help](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izu/izu.htm)

### z/OS requirements
Ensure that the z/OS system meets the following requirements:

Requirements  | Description  | Resources in IBM Knowledge Center
--|---|--
AXE (System REXX)    | z/OS uses AXR (System REXX) component to perform Incident Log tasks. The component enables REXX executable files to run outside of conventional TSO and batch environments.  |  [System REXX][1dae6ddc]
  Common Event Adapter (CEA) server| The CEA server, which is a co-requisite of the Common Information Model (CIM) server, enables the ability for z/OSMF to deliver z/OS events to C-language clients.       |  [Customizing for CEA][8e6f2b3e]
  Common Information Model (CIM) server| z/OSMF uses the CIM server to perform capacity-provisioning and workload-management tasks. Start the CIM server before you start z/OSMF (the IZU* started tasks).  |  [Reviewing your CIM server setup][155070cd]
CONSOLE and CONSPROF commands |The CONSOLE and CONSPROF commands must exist in the authorized command table.| [Customizing the CONSOLE and CONSPROF commands][51d741c4]
IBM z/OS Provisioning Toolkit  |  The IBM® z/OS® Provisioning Toolkit is a command line utility that provides the ability to provision z/OS development environments. If you want to provision CICS or Db2 environments with the Zowe CLI, this toolkit is required. | [What is IBM Cloud Provisioning and Management for z/OS? ][695feec1]
Java level   | IBM® 64-bit SDK for z/OS®, Java Technology Edition V7.1 or later is required. | [Software prerequisites for z/OSMF][0a0a3cac]
TSO region size   | To prevent **exceeds maximum region size** errors, verify that the TSO maximum region size is a minimum of 65536 KB for the z/OS system.   |  N/A
User IDs   | User IDs require a TSO segment (access) and an OMVS segment. During workflow processing and REST API requests, z/OSMF might start one or more TSO address spaces under the following job names: userid; substr(userid, 1, 6) CN (Console).  |  N/A

  [1dae6ddc]: https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.ieaa800/systemrexx.htm "System REXX"
  [8e6f2b3e]: https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.e0zb100/custcea.htm "Customizing for CEA"
  [155070cd]: https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/IZUHPINFO_AdditionalCIMStepsForZOS.htm "Reviewing your CIM server setup"
  [51d741c4]: https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.ikjb400/consol.htm "Customizing the CONSOLE and CONSPROF commands"
  [695feec1]: https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.izsc300/cloudProvOverview.htm "What is IBM Cloud Provisioning and Management for z/OS?"
  [0a0a3cac]: https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/IZUHPINFO_SoftwarePrereqs.htm "Software prerequisites for z/OSMF"

### Configuring z/OSMF

1. From the console, issue the following command to verify the version of z/OS:
    ```
    /D IPLINFO
    ```
    Part of the output contains the release, for example,
    ```
    RELEASE z/OS 02.02.00.
    ```

2. Configure z/OSMF.

    z/OSMF is a base element of z/OS V2.2 and V2.3, so it is already installed. But it might not be configured and running on every z/OS V2.2 and V2.3 system.

    In short, to configure an instance of z/OSMF, run the IBM-supplied jobs IZUSEC and IZUMKFS, and then start the z/OSMF server.
    The z/OSMF configuration process occurs in three stages, and in the following order:
    - Stage 1 - Security setup
    - Stage 2 - Configuration
    - Stage 3 - Server initialization

   This stage sequence is critical to a successful configuration. For complete information about how to configure z/OSMF, see [Configuring z/OSMF for the first time][56147429] if you use z/OS V2.2 or [Setting up z/OSMF for the first time][56699d6d] if V2.3.

  [56147429]: https://www.ibm.com/support/knowledgecenter/SSLTBW_2.2.0/com.ibm.zos.v2r2.izua300/IZUHPINFO_ConfiguringMain.htm "Configuring z/OSMF"
  [56699d6d]: https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/IZUHPINFO_ConfiguringMain.htm "Setting up z/OSMF for the first time"



**Note:** In z/OS V2.3, the base element z/OSMF is started by default at system initial program load (IPL). Therefore, z/OSMF is available for use as soon as you set up the system. If you prefer not to start z/OSMF automatically, disable the autostart function by checking for `START` commands for the z/OSMF started procedures in the _COMMNDxx parmlib_ member.

   The z/OS Operator Consoles task is new in Version 2.3. Applications that depend on access to the operator console such as Zowe CLI's RestConsoles API require Version 2.3.

3. Verify that the z/OSMF server and angel processes are running. From the command line, issue the following command:

    ```
    /D A,IZU*
    ```

    If jobs IZUANG1 and IZUSVR1 are not active, issue the following command to start the angel process:

    ```
    /S IZUANG1
    ```

    After you see the message ""CWWKB0056I INITIALIZATION COMPLETE FOR ANGEL"", issue the following command to start the server:

    ```
    /S IZUSVR1
    ```

    The server might take a few minutes to initialize. The z/OSMF server is available when the message ""CWWKF0011I: The server zosmfServer is ready to run a smarter planet."" is displayed.

4. Issue the following command to find the startup messages in the SDSF log of the z/OSMF server:

    ```
    f IZUG349I
    ```

    You could see a message similar to the following message, which indicates the port number:

    ```
    IZUG349I: The z/OSMF STANDALONE Server home page can be accessed at  https://mvs.hursley.ibm.com:443/zosmf after the z/OSMF server is started on your system.
    ```

    In this example, the port number is 443. You will need this port number later.

    Point your browser at the nominated z/OSMF STANDALONE Server home page and you should see its Welcome Page where you can log in.


#### z/OSMF REST services for the Zowe CLI
The Zowe CLI uses z/OSMF Representational State Transfer (REST) APIs to work with system resources and extract system data. Ensure that the following REST services are configured and available.

  z/OSMF REST services  | Requirements  | Resources in IBM knowledge Center
  --|---|--
  Cloud provisioning services | Cloud provisioning services are required for the Zowe CLI CICS and Db2 command groups. Endpoints begin with `/zosmf/provisioning/`  | [Cloud provisioning services][aab6df02]
  TSO/E address space services  | TSO/E address space services are required to issue TSO commands in the Zowe CLI. Endpoints begin with `/zosmf/tsoApp`  |  [TSO/E address space services][a5ec5a22]
  z/OS console services  | z/OS console services are required to issue console commands in the Zowe CLI. Endpoints begin with `/zosmf/restconsoles/`  | [z/OS console services][cec53ca4]
  z/OS data set and file REST interface  | z/OS data set and file REST interface is required to work with mainframe data sets and UNIX System Services files in the Zowe CLI. Endpoints begin with `/zosmf/restfiles/`  |  [z/OS data set and file REST interface][6bbf5bfd]
  z/OS jobs REST interface  |z/OS jobs REST interface is required to use the zos-jobs command group in the Zowe CLI. Endpoints begin with `/zosmf/restjobs/`   |  [z/OS jobs REST interface][9d372fb1]
  z/OSMF workflow services  | z/OSMF workflow services is required to create and manage z/OSMF workflows on a z/OS system. Endpoints begin with `/zosmf/workflow/`  | [z/OSMF workflow services][4e443fd6]

  [a5ec5a22]: https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua700/izuprog_API_TSOServices.htm "TSO/E address space services"
  [aab6df02]: https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/izuconfig_CloudProvSecuritySetup.htm "Cloud provisioning services"
  [cec53ca4]: https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua700/IZUHPINFO_API_RESTCONSOLE.htm "z/OS console"
  [6bbf5bfd]: https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua700/IZUHPINFO_API_RESTFILES.htm "z/OS data set and file interface"
  [9d372fb1]: https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua700/IZUHPINFO_API_RESTJOBS.htm "z/OS jobs interface"
  [4e443fd6]: https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua700/izuprog_API_WorkflowServices.htm "z/OSMF workflow services"  

  Zowe uses symbolic links to the z/OSMF `bootstrap.properties`, `jvm.security.override.properties`, and `ltpa.keys` files. Zowe reuses SAF, SSL, and LTPA configurations; therefore, they must be valid and complete.

  For more information, see [Using the z/OSMF REST services][0c0f6f64] in IBM z/OSMF documentation.

  [0c0f6f64]: https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua700/IZUHPINFO_RESTServices.htm "Using the z/OSMF REST services"

  To verify that z/OSMF REST services are configured correctly in your environment, enter the REST endpoint into your browser. For example: https://mvs.ibm.com:443/zosmf/restjobs/jobs

  **Note:**

  - Browsing z/OSMF endpoints requests your user ID and password for defaultRealm; these are your TSO user credentials.
  - The browser returns the status code 200 and a list of all jobs on the z/OS system. The list is in raw JSON format.


## System requirements for zLUX, explorer server, and API Mediation Layer

zLUX, explorer server, and API Mediation Layer are installed together. Before the installation, make sure your system meets the following requirements:

-   z/OS® Version 2.2 or later.
-   64-bit Java™ 8 JRE or later.
-   833 MB of HFS file space.
-   Supported browsers:
    -   Chrome 54 or later
    -   Firefox 44 or later
    -   Safari 11 or later
    -   Microsoft Edge

-  Node.js Version 6.11.2 or later on the z/OS host where you install the Zowe Node Server.

    1. To install Node.js on z/OS, follow the procedures at [https://developer.ibm.com/node/sdk/ztp](https://developer.ibm.com/node/sdk/ztp). Note that installation of the C/C++ compiler is not necessary for running zLUX.
    2. Set the *NODE_HOME* environment variable to the directory where Node.js is installed. For example, `NODE_HOME=/proj/mvd/node/installs/node-v6.11.2-os390-s390x`.

-   npm 5.4 or later for building zLUX applications.

     To update npm, issue the following command:

     ```
     npm install -g npm
     ```

### Planning for installation

The following information is required during the installation process. Make the decisions before the installtion.

- The HFS directory where you install Zowe, for example, `/var/zowe`.
- The HFS directory that contains a 64-bit Java™ 8 JRE.
- The z/OSMF installation directory that contains `derby.jar`, for example, `/usr/lpp/zosmf/lib`.
- The z/OSMF configuration user directory that contains the following z/OSMF files:

    - `/bootstrap.properties`
    - `/jvm.security.override.properties`
    - `/resources/security/ltpa.keys`

- The HTTP and HTTPS port numbers of the explorer server. By default, they are 7080 and 7443.
- The API Mediation Layer HTTP and HTTPS port numbers. You will be asked for 3 unique port numbers.
- The user ID that runs the Zowe started task.

    **Tip:** Use the same user ID that runs the z/OSMF `IZUSVR1` task, or a user ID with equivalent authorizations.

- The mainframe account under which the ZSS server runs must have UPDATE permission on the `BPX.DAEMON` and `BPX.SERVER` facility class profiles.


## System requirements for Zowe CLI
Before you install Zowe CLI, make sure your system meets the following requirements:

### Supported platforms

You can install Zowe CLI on any Windows or Linux operating system. For more information about known issues and workarounds, see [Troubleshooting installing Zowe CLI](troubleshootinstall.html#troubleshooting-installing-zowe-cli).

**Important!**

- Zowe CLI is not officially supported on Mac computers. However, Zowe CLI *might* run successfully on some Mac computers.
- Oracle Linux 6 is not supported.

### Free disk space

Zowe CLI requires approximately **100 MB** of free disk space. The actual quantity of free disk space consumed might vary depending on the operating system where you install Zowe CLI.

### Prerequisite software
Zowe CLI is designed and tested to integrate with z/OSMF running on IBM z/OS Version 2.2 or later. Before you can use Zowe CLI to interact with the mainframe, system programmers must install and configure IBM z/OSMF in your environment. This section provides supplemental information about Zowe CLI-specific tips or requirements that system programmers can refer to.

Before you install Zowe CLI, also install the following prerequisite software depending on the system where you install Zowe CLI:

**Note:** It's highly recommended that you update Node.js regularly to the latest Long Term Support (LTS) version.

#### Windows operating systems
Windows operating systems require the following software:

- Node.js V8.0 or later

    Click [here](https://nodejs.org/en/download/) to download Node.js.    

- Node Package Manager (npm) V5.0 or later

    **Note:** npm is included with the Node.js installation.

- Python V2.7  

    The command that installs C++ Compiler also installs Python on Windows.

- C++ Compiler (gcc 4.8.1 or later)

    From an administrator command prompt, issue the following command:

    ```
    npm install --global --production --add-python-to-path windows-build-tools
    ```

#### Mac operating systems
Mac operating systems require the following software:

- Node.js V8.0 or later   

    Click [here](https://nodejs.org/en/download/) to download Node.js.  

- Node Package Manager (npm) V5.0 or later

    **Note:** npm is included with the Node.js installation.

    **Tip:** If you install Node.js on a macOS operating system, it's highly recommended that you follow the instructions on the Node.js website (using package manager) to install `nodejs` and `nodejs-legacy`. For example, you can issue command `sudo apt install nodejs-legacy` to install `nodejs-legacy`. With `nodejs-legacy`, you can issue command `node` rather than `nodejs`.

- Python V2.7

    Click [here](https://www.python.org/download/releases/2.7/) to download Python 2.7.

- C ++ Compiler (gcc 4.8.1 or later)  

    The gcc compiler is included with macOS. To confirm that you have the compiler, issue the command `gcc –help`.

#### Linux operating systems
Linux  operating systems require the following software:

- Node.js V8.0 or later

    Click [here](https://nodejs.org/en/download/) to download Node.js.

- Node Package Manager (npm) V5.0 or later   

    **Note:** npm is included with the Node.js installation.

    **Tip:** If you install Node.js on a Linux operating system, it's highly recommended that you follow the instructions on the Node.js website (using package manager) to install `nodejs` and `nodejs-legacy`. For example, you can issue command `sudo apt install nodejs-legacy` to install `nodejs-legacy`. With `nodejs-legacy`, you can issue command `node` rather than `nodejs`.

- Python V2.7  

    Included with most Linux distributions.

- C ++ Compiler (gcc 4.8.1 or later)

    Gcc is included with most Linux distributions. To confirm that gcc is installed, issue the command `gcc –version`.

    To install gcc, issue one of the following commands:

    - Red Hat  
        ```
        sudo yum install gcc
        ```
    - Debian/Ubuntu
        ```
        sudo apt-get update
        ```
        ```
        sudo apt-get install build-essential
        ```
    - Arch Linux
        ```
        sudo pacman -S gcc
        ```
- Libsecret  

    To install Libsecret, issue one of the following commands:

    - Red Hat  
        ```
        sudo yum install libsecret-devel
        ```
    - Debian/Ubuntu  
        ```
        sudo apt-get install libsecret-1-dev
        ```
    - Arch Linux  
        ```
        sudo pacman -S libsecret
        ```
- Make  

    Make is included with most Linux distributions. To confirm that Make is installed, issue the command `make –-version`.

    To install Make, issue one of the following commands:

    - Red Hat  
        ```
        sudo yum install devtoolset-7
        ```
    - Debian/Ubuntu
        ```
        sudo apt-get install build-essential
        ```
    - Arch Linux  
        ```
        sudo pacman -S base-devel
        ```
