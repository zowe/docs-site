# Troubleshooting Zowe Application Framework

The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior installing and using the Zowe Application Framework. 

To help Zowe research any problems you might encounter, collect as much of the following information as possible and open an issue in GitHub with the collected information.

 - Zowe version and release level
 - z/OS release level
 - Job output and dump (if any)
   - Javascript console output (Web Developer toolkit accessible by pressing F12)
   - Log output from the Zowe Application Server
 - Error message codes
 - Screenshots (if applicable)
 - Other relevant information (such as the version of Node.js that is running on the Zowe Application Server and the browser and browser version).

 Unable to access cross meemory server

## Unable to log onto the Virtual Desktop

For the desktop to work the node server running under the ZOWESVR started task must be able to make cross memory calls to the ZWESIS01 load module running under the ZWESIS01 started task. 

If communication cannot occur then a user will not be able to log into the virtual desktop and an error mesage will be shown beneath the Usernamd and Password entry fields

  ```
  Authentication failed for 1 types:  Types: ["zss"]
  ```
**Solution:**

Open the log file ```/zlux-app-server/log/zss-yyyy-mm-dd-hh-ss.log```.  This file is created each time ZOWESVR is started and only the last five files are kept.  Look for the message starting ```ZIS status```.  When the desktop node server has been able to communicate correctly the line should be be followed by ``` - Ok``` so the log entry reads

```
Installing dataset contents service
ZIS status - Ok (name='ZWESIS_STD      ', zisRC=4, cmsRC=0,
```

If the line instead shows  ```Failure``` such as:

```
ZIS status - Failure (name='ZWESIS_STD      ', zisRC=8,
```
then the setup and configuration of the cross memory server has not been completed successfully.  The steps to setup the server are described in https://zowe.github.io/docs-site/latest/user-guide/install-zos.html#manually-installing-the-zowe-cross-memory-server.  

- Check that the ZWESIS01 started task is running and look into the log for any problems such as unable to find the load module
- If ZWESIS01 is running check that the user ID of the ZOWESVR started task is authorized to access the load module.  There is a security check in place to ensure only authorized code is able to call ZWESIS01 as it is an APF aurhorized load module.  The setup for each security manager is different and documented in the section "Security requirements for the cross mejory server" 