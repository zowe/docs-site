---
meta:
  - name: description
    content: z/OSMF is a prerequisite for installing Zowe. This topic describes procedures and tips for meeting z/OSMF requirements for Zowe to work. You can refer to the Knowledge Center of IBM z/OS Management Facility for detailed information. 
  - name: keywords
    content: Zowe, z/OSMF, system requirements, prerequisite
---

# Configuring z/OSMF

The following information contains procedures and tips for meeting z/OSMF requirements. For complete information, go to [IBM Knowledge Center](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3/en/homepage.html) and read the following documents.

- [IBM z/OS Management Facility Configuration Guide](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/IZUHPINFO_PartConfiguring.htm)
- [IBM z/OS Management Facility Help](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izu/izu.htm)

## z/OS requirements for z/OSMF configuration
Ensure that the z/OS system meets the following requirements:

Requirements  | Description  | Resources in IBM Knowledge Center
---|---|---
AXR (System REXX)    | z/OS uses AXR (System REXX) component to perform Incident Log tasks. The component enables REXX executable files to run outside of conventional TSO and batch environments.  |  [System REXX][1dae6ddc]
  Common Event Adapter (CEA) server| The CEA server, which is a co-requisite of the Common Information Model (CIM) server, enables the ability for z/OSMF to deliver z/OS events to C-language clients.       |  [Customizing for CEA][8e6f2b3e]
  Common Information Model (CIM) server| z/OSMF uses the CIM server to perform capacity-provisioning and workload-management tasks. Start the CIM server before you start z/OSMF (the IZU* started tasks).  |  [Reviewing your CIM server setup][155070cd]
CONSOLE and CONSPROF commands |The CONSOLE and CONSPROF commands must exist in the authorized command table.| [Customizing the CONSOLE and CONSPROF commands][51d741c4]
Java level   | IBM® 64-bit SDK for z/OS®, Java Technology Edition V8 or later is required. | [Software prerequisites for z/OSMF][0a0a3cac]
TSO region size   | To prevent **exceeds maximum region size** errors, verify that the TSO maximum region size is a minimum of 65536 KB for the z/OS system.   |  N/A
User IDs   | User IDs require a TSO segment (access) and an OMVS segment. During workflow processing and REST API requests, z/OSMF might start one or more TSO address spaces under the following job names: userid; substr(userid, 1, 6) CN (Console).  |  N/A

  [1dae6ddc]: https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.ieaa800/systemrexx.htm "System REXX"
  [8e6f2b3e]: https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.e0zb100/custcea.htm "Customizing for CEA"
  [155070cd]: https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/IZUHPINFO_AdditionalCIMStepsForZOS.htm "Reviewing your CIM server setup"
  [51d741c4]: https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.ikjb400/consol.htm "Customizing the CONSOLE and CONSPROF commands"
  [695feec1]: https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.izsc300/cloudProvOverview.htm "What is IBM Cloud Provisioning and Management for z/OS?"
  [0a0a3cac]: https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/IZUHPINFO_SoftwarePrereqs.htm "Software prerequisites for z/OSMF"

## Configuring z/OSMF

**Follow these steps:**

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

   The z/OS Operator Consoles task is new in Version 2.3. Applications that depend on access to the operator console such as Zowe&trade; CLI's RestConsoles API require Version 2.3.

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

**Note:** If your implementation uses an external security manager other than RACF (for example, Top Secret for z/OS or ACF2 for z/OS), you provide equivalent commands for your environment. For more information, see the following product documentation:

- [Configure z/OS Management Facility for Top Secret](https://techdocs.broadcom.com/content/broadcom/techdocs/us/en/ca-mainframe-software/security/ca-top-secret-for-z-os/16-0/installing/configure-z-os-management-facility-for-ca-top-secret.html)

- [Configure z/OS Management Facility for ACF2](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-acf2-for-z-os/16-0/installing/configure-z-os-management-facility-for-ca-acf2.html)

## z/OSMF REST services for the Zowe CLI
The Zowe CLI uses z/OSMF Representational State Transfer (REST) APIs to work with system resources and extract system data. Ensure that the following REST services are configured and available.

  z/OSMF REST services  | Requirements  | Resources in IBM knowledge Center
  ---|---|---
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

  **Notes:**

  - Browsing z/OSMF endpoints requests your user ID and password for defaultRealm; these are your TSO user credentials.
  - The browser returns the status code 200 and a list of all jobs on the z/OS system. The list is in raw JSON format.

## Configuration of z/OSMF to properly work with API ML

There is an issue observed in z/OSMF which leads to a stuck JSON web token(JWT). It manifests as the endpoint `/zosmf/services/authenticate` issuing a JWT with success RC that is not valid for API calls, resulting in 401 response status code. This is a persistent condition.
To get the token unstuck, perform a logout with the LTPA token from the login request. This causes logins to start serving unique JWTs again.
Until this issue is properly fixed in z/OSMF, we propose a possible temporary workaround. Update z/OSMF configuration with `allowBasicAuthLookup="false"`. After applying this change, each authentication call results in generating a new JWT. 