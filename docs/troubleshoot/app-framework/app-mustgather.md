# Gathering information to troubleshoot Zowe Application Framework

Follow these instructions to gather specific pieces of information to help troubleshoot Zowe CLI issues.

 - z/OS release level
 - Zowe version and release level
 - Log output from the Zowe Application Server
 - Zowe Application Configuration
 - Zowe Application Server Ports 
 - Error message codes
 - JavaScript console output (Web Developer toolkit accessible by pressing F12)
 - Screen captures (if applicable)
 - Other relevant information (such as the version of Node.js that is running on the Zowe Application Server and the browser and browser version).

## z/OS release level
From the console, issue the following command to verify the version of z/OS:  

```
/D IPLINFO
```

Output:
Part of the output contains the release, for example `RELEASE z/OS 02.02.00`


## zowe version and release level
```
  cd <zowe-installation-directory>
  cat manifest.json
```

Output:
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

## Log output from the Zowe Application Server
There are two major components of zowe application server- `ZLUX` & `ZSS`, they log to different files by default.

Default location for logs for both zlux and zss is folder `zlux-app-server/log`
Log location can be customized using environment variable.

```
env | grep ZLUX_NODE_LOG_DIR 
env | grep ZSS_LOG_DIR  
```

Read more about contorolling log location [here](https://zowe.github.io/docs-site/latest/user-guide/mvd-configuration.html#controlling-the-logging-location)


```
# navigate to zowe installation folder
cd <zowe-installation-folder>

# navigate to logs default location or custom location as decribed above
cd zlux-app-server/log


# custom log location can be found using environment variable

# list file by most recent first
ls -lt
```

Output: 
List of files by most recent timestamp for both nodeServer as well ZSS
```
nodeServer-<yyyy-mm-dd-hh-mm>.log
zssServer-<yyyy-mm-dd-hh-mm>.log
```

## Zowe Application Configuration

Configuration file help customize app server, and is important to look at while troubleshooting

```
# navigate to zowe installation folder
cd <zowe-installation-folder>

# navigate to server configuration folder
cd zlux-app-server/deploy/instance/ZLUX/serverConfig

# display config
cat zluxserver.json
```

Read more about app server [configuration](https://zowe.github.io/docs-site/latest/user-guide/mvd-configuration.html) in zowe **user guide** section.


## Zowe Application Server Ports 
 
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











  