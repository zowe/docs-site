# Troubleshooting Zowe Application Framework

The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior installing and using Zowe&trade; Application Framework which includes the Zowe Desktop.

Most of the solutions below identify issues by referring to the [Zowe logs](app-mustgather.md). To identify and resolve issues, you should be familiar with their names and locations.

The Zowe Application Framework manages issues in GitHub. When you troubleshoot a problem, you can check whether a GitHub issue (open or closed) that covers the problem already exists. For a list of issues, see the [zlux repo](https://github.com/zowe/zlux/issues).

## Desktop apps fail to load

**Symptom:**

When you open apps in the Zowe desktop, a page is displayed with the message "The plugin failed to load."

**Solution:**

This problem may occur due to file encoding. If this occurs in a Zowe extension, verify it is correctly encoded.

## NODEJSAPP disables immediately

**Symptom:**

You receive the message `CEE5207E The signal SIGABRT was received in stderr`. 

**Solution:**

You might have reached the limit for shared message queues on your LPAR. When Node.js applications are terminated by a SIGKILL signal, shared message queues might not be deallocated. For more information, see the **If the NODEJSAPP disables immediately** section in the [Troubleshooting Node.js applications](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.5.0/troubleshooting/node/node-troubleshooting.html) topic on IBM Knowledge Center.

## Cannot log in to the Zowe Desktop

**Symptom:**

When you attempt to log in to the Zowe Desktop, you receive the following error message that is displayed beneath the **Username** and **Password** fields. 

```
Authentication failed for 3 types:  Types: ["saf","apiml","zss"]
```
The Zowe desktop attempts to authenticate the credentials using the types that have been configured, by default the three above of `["saf","apiml","zss"]`. If Zowe has been configured with the `LAUNCH_COMPONENT_GROUPS=DESKTOP` where `GATEWAY` is not a launch group, then the message will just include the types `["saf","zss"]`.

**Solution:**

This can be due to network disruption, a server not running, certificate issues, incorrect password, or a locked account. If the reason for failure isn't known, you should [gather information to contact support](../servers/must-gather)

Below are some additional, possible reasons for the failure:

For the Zowe Desktop to work, the node server that runs under the ZWESLSTC started task must be able to make cross memory calls to the ZWESIS01 load module running under the ZWESISTC started task. If this communication fails, you see the authentication error.  

There are three known problems that might cause this error.  The [Zowe architecture diagram](../../getting-started/zowe-architecture.md) shows the following connections. One of these three connections likely failed. 

1. The zssServer connection to the `ZWESISTC` started task using cross memory communication. If this fails, see [zssServer unable to communicate with ZIS](#zss-server-unable-to-communicate-with-zis).  The architecture diagram below has been annotated with a (1) to show this connection.
2. The Zowe Desktop Application Framework server connection to the zssServer across the default port 7557. If this fails, see [Application Framework unable to communicate with zssServer](#application-framework-unable-to-communicate-with-zssserver).  The architecture diagram below has been annotated with a (2) to show this connection.  
3. The Zowe Desktop Application Framework server cannot connect to API Mediation Layer for authentication. If this fails, see [Application Framework unable to communicate with API Mediation Layer](#application-framework-unable-to-communicate-with-api-mediation-layer).

<img src={require("../../images/common/zowe-desktop-unable-to-logon.png").default} alt="Zowe Desktop Unable to logon.png" width="700px"/> 

### ZSS server unable to communicate with ZIS

- Open the log file `zowe.logDirectory/zssServer-yyyy-mm-dd-hh-ss.log`.  This file is created each time ZWESLSTC is started and only the last five files are kept.  

- Look for the message that starts with `ZIS status`.  



   - If the communication works, the message includes `Ok`. For example:

     ```
     ZIS status - Ok (name='ZWESIS_STD      ', cmsRC=0, description='Ok'
     ```
   
     If the communication works, the problem is likely that the Application Framework server is unable to communicate to the zssServer. For more information, see [Application Framework unable to communicate with zssServer](#application-framework-unable-to-communicate-with-zssserver).

   - If the communication is not working, the message includes `Failure`. For example:

     ```
     ZIS status - Failure (name='ZWESIS_STD      ', cmsRC=39, description='Cross-memory call ABENDed')
     ```
     or
     ```
     ZIS status - Failure (name='ZWESIS_STD      ', cmsRC=64, description='N/A', clientVersion=`2`)
     ```
     or
     ```
     ZIS status - Failure (name='ZWESIS_STD      ',cmsRC=47, description='N/A', clientVersion='2')
     ```
     or
     ```
     ZIS status - 'Failure' (name='ZWESI_STD     ', cmsRC='12', description='N/A', clientVersion='2')
     ```

     In this case, check that the ZWESISTC started task is running. If not, start it with the TSO command `/S ZWESISTC`
    
   - If the problem cannot be easily fixed (such as the ZWESISTC task not running), then it is likely that the ZIS server is not running. To check whether the server is running, check the started task `ZWESISTC` log for any errors.  

   - If the ZIS server `ZWESISTC` started task is running, check that the program name of the cross memory procedure matches between the `ZWESISTC` PROBLIB member and the `instance.env` file used to launch Zowe. 
    
     By default the proc value is `ZWESIS_STD`, and if a new name is chosen then both files need to be updated for the handshake to be successful.

     The line in the `ZWESISTC` problib that defines the procedure name that ZIS will use is
     ```
     //ZWESISTC  PROC NAME='ZWESIS_STD',MEM=00,RGN=0M
     ```
     The line in the `instance.env` that specifies the cross memory procedure that the zssServer will try to attach to is
     ```
     ZWES_XMEM_SERVER_NAME=ZWESIS_STD
     ```
   
   - If this is the first time you set up Zowe, it is possible that the ZIS server configuration did not complete successfully. To set up and configure the ZIS server, follow steps as described in the topic [Installing and configuring the Zowe ZIS server (ZWESISTC)](../../user-guide/configure-xmem-server.md).  Once `ZWESISTC` is started, if problems persist, check its log to ensure it has been able to correctly locate its load module ZWESIS01 as well as the parmlib ZWESIP00.  

   - If there is an authorization problem, the message might include `Permission Denied`. For example:

     ```
     ZIS status - Failure (name='ZWESIS_STD      ', cmsRC=33, description='Permission denied'
     ```
     Check that the user ID of the ZWESLSTC started task is authorized to access the load module. Only authorized code can call ZWESIS01 because it is an APF-authorized load module. 

     **Note:** If you are using RACF security manager, a common reason for seeing `Permission Denied` is that the user running the started task ZWESLSTC (typically ZWESVUSR) does not have READ access to the FACILITY class ZWES.IS.

    If the message includes the following text, the configuration of the Application Framework server may be incomplete:

    ```
    ZIS status - Failure read failed ret code 1121 reason 0x76650446
    ```
    If you are using AT/TLS, then the ```components.app-server.agent.http.attls=true``` statement might be missing from the server configuration file. For more information, see [Configuring Zowe App Server for HTTPS communication with ZSS](../../user-guide/mvd-configuration#configuring-zss-for-https).


### Application Framework unable to communicate with zssServer

Follow these steps: 

- Open the log file `zowe.logDirectory/appServer-yyyy-mm-dd-hh-ss.log`.  This file is created each time ZWESLSTC is started and only the last five files are kept.  

- Look for the message that starts with `GetAddrInfoReqWrap.onlookup` and the log messages below.  

   ```
   yyyy-mm-dd hh:mm:ss.ms <ZWED:16842977> ZWESVUSR INFO (_zsf.apiml,apiml.
   yyyy-mm-dd hh:mm:ss.ms <ZWED:16842977> ZWESVUSR INFO (_zsf.auth,webauth
   yyyy-mm-dd hh:mm:ss.ms <ZWED:16842977> ZWESVUSR WARN (_zsf.proxy,proxy.
     at GetAddrInfoReqWrap.onlookup Ýas oncomplete¨ (dns.js:64:26) {    
     errno: 'ENOTFOUND',                                                  
     code: 'ENOTFOUND',                                                    
     syscall: 'getaddrinfo',                                              
     hostname: 'localhost'                                                    
   ``` 
  These messages show that the host name `localhost` cannot be reached between the Zowe desktop server and the zssServer because `localhost` has not been mapped to an IP address.  

- Map localhost to port 127.0.0.1. 

   Create an entry in the file `/etc/hosts` that contains the line

   ```
   127.0.0.1       localhost
   ```

- Restart the `ZWESLSTC` address space.


### Slow performance of the VT terminal on SSH

**Symptom:**

When you try to use VT terminal on the Zowe Desktop to connect to the UNIX System Services through SSH, the VT terminal on node v12 slows down. Then, the connection fails because the connecting process can run into the 3-minute limit.

**Solution:**

To solve this issue, use Telnet through port 1023 to connect to the UNIX System Services.

### Application Framework unable to communicate with API Mediation Layer

Follow these steps:

- Verify whether API Mediation Layer is started or not. If it is started, you can see a service status page with all green check marks by visiting `https://<your-zowe-host>:<gateway-port>`. If there are any red cross marks, follow the instructions in [Troubleshooting API ML](../troubleshoot-apiml.md) to identify and solve the issue.
- You may need to wait a little longer to allow API Mediation Layer Gateway to complete the environment test.


## Server startup problem ret=1115

**Symptom:**
When ZWESLSTC is restarted, the following message is returned in the output of the ZSS server log file, `zowe.logDirectory/zssServer-yyyy-mm-dd-hh-ss.log`:
```
server startup problem ret=1115
```

**Solution:**
This message means that some other process is already listening on port 7542, either at address 127.0.0.1 (localhost) or at 0.0.0.0 (all addresses). This prevents the ZSS server from starting.

One possibility is that a previously running ZSS server did not shut down correctly, and either the operating system has not released the socket after the ZSS server shut down, or the ZSS server is still running.

## Server error EACCESS on z/os

**Symptoms:**
When you see messages like this in the server logs:
```
Error: listen EACCES: permission denied 0.0.0.0:8548
     at Server.setupListenHandle [as _listen2] (net.js:1305:21)
     at listenInCluster (net.js:1370:12)
```
```
<ZWED:1234> ZWEUSER WARN (_zsf.network,webserver.js:233) ZWED0071W - Unexpected error on server 0.0.0.0:8544. E=bind EACCES 0.0.0.0:8544. Stack trace follows.
 Error: bind EACCES 0.0.0.0:8544
     at listenOnMasterHandle (net.js:1389:18)
```
It is a sign that a permission error is stopping Zowe servers from completing the action of binding to a TCP Port for listening for client connections. This can manifest in the servers being inaccessible.

Network permissions control varies by OS, to resolve this we don't have a tip for users of containers, but for z/os, IBM has a guide on access control, for more details check
[Port Statement](https://www.ibm.com/docs/en/zos/2.4.0?topic=control-controlling-access-particular-ports) 

Also, there is a very important part troubleshooting step just for Zowe.
When you are setting a PORT statement, you can assign rules by jobname.
When FACILITY resource `BPX.JOBNAME` is granted for the zowe STC user (recommended!) then each server of zowe will have a different jobname. It will not be "ZWESLSTC" or "ZWESLSTC" as it would be when that resource is not granted. They'll instead be other names that start with "ZWE".

**Note**: So, for a troubleshooting tip on the server error EACCESS on z/os, note that not only should an administrator check their PORT statements, they should probably set their jobname in the port statements to `ZWE` since it will catch all zowe components regardless of whether or not `BPX.JOBNAME` is granted.


## Application plug-in not in Zowe Desktop

**Symptom:**  
An application plug-in is not appearing in the Zowe Desktop.

**Solution:**   
To check whether the plug-in loaded successfully, enter the following URL in a browser to display all successfully loaded Zowe plug-ins:

`https://my.mainframe.com:7556/plugins?type=application`

You can also search the [node server logs](app-mustgather.md) for the plug-in identifier, for example `org.zowe.sample.app`. If the plug-in loaded successfully, you will find the following message:
```
[2019-08-06 13:54:21.341 _zsf.bootstrap INFO] - Plugin org.zowe.sampleapp at path=zlux\org.zowe.sampleapp loaded.
```
If the plug-in did not load successfully, you will find the following message:
```
[2019-08-06 13:54:21.208 _zsf.bootstrap WARNING] - Error: org.zowe.sampleapp 
```
If the identifier is not in the logs, make sure the plug-in's locator file is in the `/zlux-app-server/deploy/instance/ZLUX/plugins/` directory. The plug-in locator is a `.json` file, usually with same name as the identifier, for example `org.zowe.sampleapp.json`. Open the file and make sure that the path that is defined with the `pluginLocation` attribute is correct. If the path is relative, make sure it is relative to the `zlux-app-server/bin` directory. 

For more information on loading plug-ins to the Desktop, see [Adding Your App to the Desktop](https://github.com/zowe/workshop-user-browser-app/blob/master/README.md).

## Error: You must specify MVD_DESKTOP_DIR in your environment

**Symptom:** 

A plug-in that is built in your local environment using `npm run start` or `npm run build` failed with an error message about a missing MVD_DESKTOP_DIR environment variable. 

**Solution:**   
Add the Zowe Desktop directory path to the `MVD_DESKTOP_DIR` environment variable. To specify the path, run the following commands in your Windows console or Linux bash shell:

- Windows
  ```
  export MVD_DESKTOP_DIR=<zlux-root-dir>/zlux-app-manager/virtual-desktop
  ```

- Mac Os/Linux
  ```
  set MVD_DESKTOP_DIR=<zlux-root-dir>/zlux-app-manager/virtual-desktop
  ```

## Error: Exception thrown when reading SAF keyring \{ZWED0148E\}

**Symptom:**
The error message indicates that Zowe's local certificate authority (local CA) `ZoweCert`, the certificate `jwtsecret`, or the Zowe certificate `localhost` does not exist in the Zowe keyring. ZWED0148E contains the following messages.

```
2021-01-18 10:16:33.601 <ZWED:16847011> ZWESVUSR WARN (_zsf.bootstrap,webserver.js:156) ZWED0148E - Exception thrown when reading SAF keyring, e= TypeError: R_datalib call failed: function code: 01, SAF rc: 8, RACF rc: 8, RACF rsn: 44
at Object.getPemEncodedData (/software/zowev15/1.15.0/components/app-server/share/zlux-server-framework/node_modules/keyring_js/index.js:21:26)
```

**Solution:**

Zowe's local CA certificate has its default name `ZoweCert`, and the Zowe Desktop hardcodes this certificate in the configuration scripts.

If you are using your own trusted CA certificate in the keyring and the name is different from the default one, this error will occur. To resolve the issue, you must match the names in the Zowe configuration. For more information, see [Configuring certificates overview](../../user-guide/configure-certificates). 

If you are using Zowe's local CA certificate but it still reports **ZWED0148E**, you may find the following message in the same log.

```
  "https": {
    "ipAddresses": [
      "0.0.0.0"
    ],
    "port": 8544,
    "keys": [
      "safkeyring://ZWESVUSR/ring&Label A"
    ],
    "certificates": [
      "safkeyring://ZWESVUSR/ring&Label A"
    ],
    "certificateAuthorities": [
      "safkeyring://ZWESVUSR/ring&Label B",
      "safkeyring://ZWESVUSR/ring&Label B"
    ]
  },
```

In this case, you must make sure that the label names exactly match the names in TSO when looking up the keyring you own. Any difference in spaces, capitalization, or other places will cause the error.

## Warning: Problem making eureka request \{ Error: connect ECONNREFUSED \}

**Symptom:** 
The Zowe started task `ZWESLSTC` log contains error messages reporting problems connecting 

```
Problem making eureka request { Error: connect ECONNREFUSED 10.1.1.2:7553
at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1195:14)
errno: 'ECONNREFUSED',
code: 'ECONNREFUSED',
syscall: 'connect',
address: '10.1.1.2',
port: 7553 }
```

**Solution:**   
You can ignore these messages. These messages are timing-related where different Eureka servers come up, try to connect to each other, and warn that the endpoint they are trying to perform a handshake with is not available.  When all of the Eurka services have started, these errors will stop being logged.  

## Warning: Zowe extensions access to ZSS security endpoints fail

**Symptom:**

Zowe extensions fail when accessing the ZSS APIs such as the `security-mgmt/classes/default-class/profiles` endpoint. The following error is written to the log.

```
BPXTLS failed: rc=-1, return code=163, reason code=0x0be80820
```

**Solution:**

Access to the ZSS endpoints are protected. To access the ZSS endpoints, the user must have `READ` access on the `OMVSAPPL` resource in the `APPL` class.

To fix this permit access, issue the following TSO command, where `userID` is the started task ID of the requesting process. The vendor documentation describes which userID to use which might be `ZWESVUSR`.  

```
PERMIT OMVSAPPL CLASS(APPL) ACCESS(READ) ID(userID)
```
