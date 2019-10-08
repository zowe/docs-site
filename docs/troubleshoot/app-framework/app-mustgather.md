# Gathering information to troubleshoot Zowe Application Framework

Gather the following information to troubleshoot Zowe&trade; Application Framework issues:

 - [z/OS release level](#z-os-release-level)
 - [Zowe version and release level](#zowe-version-and-release-level)
 - [Zowe application configuration](#zowe-application-configuration)
 - [Zowe Application Server Ports](#zowe-application-server-ports) 
 - [Log output from the Zowe Application Server](#log-output-from-the-zowe-application-server)
 - [Error message codes](#error-message-codes)
 - [JavaScript console output (Web Developer toolkit accessible by pressing F12)](#javascript-console-output)
 - [Screen captures (if applicable)](#screen-captures)
 - [Other relevant information (such as the version of Node.js that is running on the Zowe Application Server and the browser and browser version)](#other-relevant-information)

## z/OS release level
To find the z/OS release level, issue the following command in SDSF:  

```
/D IPLINFO
```
Check the output for the release level, for example: 
```
RELEASE z/OS 02.02.00
```

## Zowe version and release level
```
  cd <zowe-installation-directory>
  cat manifest.json
```

**Output:**

Displays zowe version
```  
  {
    "name": "Zowe",
    "version": "1.2.0",
    "description": "Zowe is an open source project created to host technologies that benefit the Z platform from all members of the Z community (Integrated Software Vendors, System Integrators and z/OS consumers). Zowe, like Mac or Windows, comes with a set of APIs and OS capabilities that applications build on and also includes some applications out of the box. Zowe offers modern interfaces to interact with z/OS and allows you to work with z/OS in a way that is similar to what you experience on cloud platforms today. You can use these interfaces as delivered or through plug-ins and extensions that are created by clients or third-party vendors.",
    "license": "EPL-2.0",
    "homepage": "https://zowe.org",
    "build": {
      "branch": "master",
      "number": 685,
      "commitHash": "63efa85df629db474197ec8481db50021e8fdd65",
      "timestamp": "1556733977010"
    }
  }

```

## Zowe application configuration

Configuration file helps customize the Zowe app server, and is important to look at while you troubleshoot.

```
# navigate to zowe installation folder
cd <zowe-installation-folder>

# navigate to server configuration folder
cd zlux-app-server/deploy/instance/ZLUX/serverConfig

# display config
cat zluxserver.json
```

Read more about the Zowe app server [configuration](../../user-guide/mvd-configuration.md) in the Zowe User Guide.

## Zowe Application Server ports 
 
 ```
  # navigate to zowe installation folder
  cd <zowe-installation-folder>

  # navigate to install log directory
  cd install_log
  
  # list file by most recent first
  ls -lt

  # pick latest file
  cat 2019-05-02-17-13-09.log | grep ZOWE_ZLUX_SERVER_HTTPS_PORT
  cat 2019-05-02-17-13-09.log | grep ZOWE_ZSS_SERVER_PORT

 ```

## Log output from the Zowe Application Server
There are two major components of Zowe application server:  `ZLUX` and `ZSS`.  They log to different files.

The default location for logs for both zlux and zss is folder `zlux-app-server/log`. You can customize the log location by using the environment variable.

```
env | grep ZLUX_NODE_LOG_DIR 
env | grep ZSS_LOG_DIR  
```

Read more about controlling the log location [here](../../user-guide/mvd-configuration.html#controlling-the-logging-location).

```
# navigate to zowe installation folder
cd <zowe-installation-folder>

# navigate to logs default location or custom location as described above
cd zlux-app-server/log

# custom log location can be found using environment variable

# list file by most recent first
ls -lt
```

**Output:**

List of files by most recent timestamp for both nodeServer as well ZSS.
```
nodeServer-<yyyy-mm-dd-hh-mm>.log
zssServer-<yyyy-mm-dd-hh-mm>.log
```

## Error message codes
It is advisable to look into log files for capturing error codes. 

## Javascript console output

Web Developer toolkit is accessible by pressing F12.      

Read more about it [here](https://developers.google.com/web/tools/chrome-devtools/open).

## Screen captures

If possible, add a screen capture of the issue.

## Other relevant information

Node.js – v6.14.4 minimum for z/OS, elsewhere v6, v8, and v10 work well.
```
node -v
```

npm – v6.4 minimum
```
npm -v
```

Java – v8 minimum
```
java -version
```
