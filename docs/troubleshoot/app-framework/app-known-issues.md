# Known Zowe Application Framework issues

`Tip:` Check [logs](app-mustgather.md) first

## Unable to log in to the Zowe Desktop

**Symptom:**

When you attempt to log in to the Zowe Desktop, you receive the following error message that is displayed beneath the **Username** and **Password** fields. 

```
Authentication failed for 1 types:  Types: ["zss"]
```

**Solution:**

For the Zowe Desktop to work, the node server that runs under the ZOWESVR started task must be able to make cross memory calls to the ZWESIS01 load module running under the ZWESIS01 started task. You encounter this authentication failure error if the communication cannot occur.

To solve the problem, follow these steps: 
1. Open the log file `/zlux-app-server/log/zssServer-yyyy-mm-dd-hh-ss.log`.  This file is created each time ZOWESVR is started and only the last five files are kept.  

2. Look for the message that starts with `ZIS status`.  

   When the desktop node server is able to communicate correctly, the line is followed by `- Ok`, so the log entry reads as follows:

   ```
   ZIS status - Ok (name='ZWESIS_STD      ', cmsRC=0, description='Ok'
   ```

   If the line shows `Failure` such as:

   ```
   ZIS status - Failure (name='ZWESIS_STD      ', cmsRC=39, description='Cross-memory call ABENDed'
   ```

   then, the setup and configuration of the cross memory server did not complete successfully. You must follow the steps as described in [Manually installing the Zowe Cross Memory Server](../../user-guide/install-zos.html#manually-installing-the-zowe-cross-memory-server) to set up the cross memory server.  

   - Check that the ZWESIS01 started task is running and look into the log for any problems such as unable to find the load module.

   If the line shows `Permission Denied` such as:

   ```
   ZIS status - Failure (name='ZWESIS_STD      ', cmsRC=33, description='Permission denied'
   ```
    - Check that the user ID of the ZOWESVR started task is authorized to access the load module. There is a security check in place to ensure that only authorized code is able to call ZWESIS01 as it is an APF-authorized load module. The setup for each security manager is different and documented in the section "Security requirements for the cross memory server" in at [Manually installing the Zowe Cross Memory Server](../../user-guide/install-zos.html#manually-installing-the-zowe-cross-memory-server).

    ***Note*** If you are using RACF security manager a common reason for seeing `Permission Denied` is that the user running the started task ZOWESVR (typically IZUSVR) does not have READ access to the FACILITY class ZWES.IS.

    If directly after the ```ZIS status - Failure``` maessage you see the line

    ```
    read failed ret code 1121 reason 0x76650446
    ```
    - If you are using AT/TLS then this the configuration of the Application Framework server may be incomplete, specifically the addition of the ```"attls" : true``` statement into the ```zluxserver.json``` file.  See the documentation section at [Configuring Zowe App Server for HTTPS communication with ZSS](../../user-guide/mvd-configuration.html#configuring-zss-for-https)

## Server startup problem ret=1115

**Symptom:**
When ZOWESVR is restarted, the following message is returned in the output of the ZSS server log:
```
server startup problem ret=1115
```

**Solution:**
This message means that some other process is already listening on port 7542, either at address 127.0.0.1 (localhost) or at 0.0.0.0 (all addresses). This prevents the ZSS server from starting.

One possibility is that a previously running ZSS server did not shut down correctly, and either the the operating system has not released the socket after the ZSS server shut down, or the ZSS server is still running.


## Added new plugin, but could not locate plugin on zowe desktop

**Symptom:**  
Added new zowe application plugin to web desktop, but plugin do not appear on zowe desktop

**Basic Troubleshooting:**   
Lets say plugin identifier of your app in `org.zowe.sampleapp`, search for its identifier string in [node server logs](app-mustgather.md)

If plugin loaded successfully, you will find the following statement in your log
```
[2019-08-06 13:54:21.341 _zsf.bootstrap INFO] - Plugin org.zowe.sampleapp at path=zlux\org.zowe.sampleapp loaded.
```
If error, you can find error message here:
```
[2019-08-06 13:54:21.208 _zsf.bootstrap WARNING] - Error: org.zowe.sampleapp 
```
All successfully installed plugin can be found using following url:    
`https://my.mainframe.com:8544/plugins?type=application`

If plugin identifier string is not found in node server logs, please check if you have *plugin locator* defined and present in directory `/zlux-app-server/deploy/instance/ZLUX/plugins/`. Plugin locator is a json file usually defined as same name as plugin identifier eg in this case it would be `org.zowe.sampleapp.json`

```
 # navigate to zlux app server instance
 cd <zlux_root_folder>/zlux-app-server

 #navigate to all the included plugin
 cd deploy/instance/ZLUX/plugins

 # try find sample app plugin locator file
 cat org.zowe.sampleapp.json
```
Make sure path defined with `pluginLocation` attribute in plugin locator json is correct and if relative it should be relative to zlux-app-server/bin.

Read more about it [here](../../extend/extend-desktop/zlux-workshop-user-browser.html#adding-your-app-to-the-desktop)

## Error: You must specify MVD_DESKTOP_DIR in your environment

**Symptom:** 

Plugin build in your local environment using `npm run start` or `npm run build` is failed with error message about missing environment variable MVD_DESKTOP_DIR. 

**Solution:**   
This message means you have to specify MVD_DESKTOP_DIR environment variable with path of zowe virtual desktop directory. Run the following commands in your windows console or linux bash to define one.

Windows
```
export MVD_DESKTOP_DIR=<zlux-root-dir>/zlux-app-manager/virtual-desktop
```

Mac Os/Linux
```
set MVD_DESKTOP_DIR=<zlux-root-dir>/zlux-app-manager/virtual-desktop
```
