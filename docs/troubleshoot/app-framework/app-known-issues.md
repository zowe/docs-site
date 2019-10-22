# Known Zowe Application Framework issues

The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior installing and using Zowe&trade; Application Framework.

Most of the solutions below identify issues by referring to the Zowe [logs](app-mustgather.md). To identify and resolve issues, you should become familiar with their names and locations.

## Desktop apps fail to load

**Symptom:**

When you open apps in the desktop they display a page with the message "The plugin failed to load."

**Solution:**

NodeJS v8.16.1 performs auto-encoding in a way that breaks Zowe apps. See [https://github.com/ibmruntimes/node/issues/142](https://github.com/ibmruntimes/node/issues/142) for details.

Use node v8.16.0 which is available at [https://www.ibm.com/ca-en/marketplace/sdk-nodejs-compiler-zos](https://www.ibm.com/ca-en/marketplace/sdk-nodejs-compiler-zos). Download the `ibm-trial-node-v8.16.0-os390-s390x.pax.Z` file.

## NODEJSAPP disables immediately

**Symptom:**

If you receive the message CEE5207E The signal SIGABRT was received in stderr, you might have reached the limit for shared message queues on your LPAR.

**Solution:**

When Node.js applications are terminated by a SIGKILL signal, shared message queues might not be deallocated. In the IBM "[Troubleshooting Node.js applications](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.5.0/troubleshooting/node/node-troubleshooting.html)" documentation, see the section titled **If the NODEJSAPP disables immediately**.


## Cannot log in to the Zowe Desktop

**Symptom:**

When you attempt to log in to the Zowe Desktop, you receive the following error message, displayed beneath the **Username** and **Password** fields. 

```
Authentication failed for 1 types:  Types: ["zss"]
```

**Solution:**

For the Zowe Desktop to work, the node server that runs under the ZOWESVR started task must be able to make cross memory calls to the ZWESIS01 load module running under the ZWESIS01 started task. If this communication fails, you see the authentication error.

To solve the problem, follow these steps: 
1. Open the log file `/zlux-app-server/log/zssServer-yyyy-mm-dd-hh-ss.log`.  This file is created each time ZOWESVR is started and only the last five files are kept.  

2. Look for the message that starts with `ZIS status`.  

   If communication is working the message includes `Ok`. For example:

   ```
   ZIS status - Ok (name='ZWESIS_STD      ', cmsRC=0, description='Ok'
   ```

   If communication is not working the message includes `Failure`. For example:

   ```
   ZIS status - Failure (name='ZWESIS_STD      ', cmsRC=39, description='Cross-memory call ABENDed'
   ```

    If communication is not working, check that the ZWESIS01 started task is running. If not, start it. Also, search the log for problems, for example statements saying that the server was unable to find the load module.
    
    If the problem is not easily-fixable (such as the ZWESIS01 task not running), then it is likely that the cross memory server setup and configuration did not complete successfully. To set up and configure the cross memory server, follow steps as described in the topic [Manually installing the Zowe Cross Memory Server](../../user-guide/install-zos.html#manually-installing-the-zowe-cross-memory-server).  

    If there is an authorization problem, the message might include `Permission Denied`. For example:

    ```
    ZIS status - Failure (name='ZWESIS_STD      ', cmsRC=33, description='Permission denied'
    ```
    Check that the user ID of the ZOWESVR started task is authorized to access the load module. Only authorized code can call ZWESIS01 because it is an APF-authorized load module. The setup for each security manager is different and is documented in the section "Security requirements for the cross memory server" in the topic  [Manually installing the Zowe Cross Memory Server](../../user-guide/install-zos.html#manually-installing-the-zowe-cross-memory-server).

    **Note** If you are using RACF security manager, a common reason for seeing `Permission Denied` is that the user running the started task ZOWESVR (typically IZUSVR) does not have READ access to the FACILITY class ZWES.IS.

    If the message includes the following text, the configuration of the Application Framework server may be incomplete:

    ```
    ZIS status - Failure read failed ret code 1121 reason 0x76650446
    ```
    If you are using AT/TLS, then the ```"attls" : true``` statement might be missing from the ```zluxserver.json``` file. For more information, see [Configuring Zowe App Server for HTTPS communication with ZSS](../../user-guide/mvd-configuration.html#configuring-zss-for-https)

## Server startup problem ret=1115

**Symptom:**
When ZOWESVR is restarted, the following message is returned in the output of the ZSS server log file, `/zlux-app-server/log/zssServer-yyyy-mm-dd-hh-ss.log`:
```
server startup problem ret=1115
```

**Solution:**
This message means that some other process is already listening on port 7542, either at address 127.0.0.1 (localhost) or at 0.0.0.0 (all addresses). This prevents the ZSS server from starting.

One possibility is that a previously running ZSS server did not shut down correctly, and either the operating system has not released the socket after the ZSS server shut down, or the ZSS server is still running.


## Application plug-in not in Zowe Desktop

**Symptom:**  
An application plug-in is not appearing in the Zowe Desktop.

**Troubleshooting:**   
To check if the plug-in loaded successfully, enter the following URL in a browser to display all successfully loaded Zowe plug-ins:

`https://my.mainframe.com:8544/plugins?type=application`

You can also search the [node server logs](app-mustgather.md) for the plug-in identifier, for example `org.zowe.sample.app`. If the plug-in loaded successfully, you will find the following message:
```
[2019-08-06 13:54:21.341 _zsf.bootstrap INFO] - Plugin org.zowe.sampleapp at path=zlux\org.zowe.sampleapp loaded.
```
If the plug-in did not load successfully, you will find the following message:
```
[2019-08-06 13:54:21.208 _zsf.bootstrap WARNING] - Error: org.zowe.sampleapp 
```
If the identifier is not in the logs, make sure the plug-in's locator file is in the `/zlux-app-server/deploy/instance/ZLUX/plugins/` directory. The plug-in locator is a `.json` file, usually with same name as the identifier, for example `org.zowe.sampleapp.json`. Open the file and make sure that the path defined with the `pluginLocation` attribute is correct. If the path is relative, make sure it is relative to the `zlux-app-server/bin` directory. 

For more information on loading plug-ins to the Desktop, see [Adding Your App to the Desktop](../../extend/extend-desktop/zlux-workshop-user-browser.html#adding-your-app-to-the-desktop).


## Error: You must specify MVD_DESKTOP_DIR in your environment

**Symptom:** 

A plug-in build in your local environment using `npm run start` or `npm run build` failed with an error message about a missing MVD_DESKTOP_DIR environment variable. 

**Solution:**   
Add the Zowe Desktop directory path to the MVD_DESKTOP_DIR environment variable. To specify the path, run the following commands in your Windows console or Linux bash shell:

- Windows
  ```
  export MVD_DESKTOP_DIR=<zlux-root-dir>/zlux-app-manager/virtual-desktop
  ```

- Mac Os/Linux
  ```
  set MVD_DESKTOP_DIR=<zlux-root-dir>/zlux-app-manager/virtual-desktop
  ```
