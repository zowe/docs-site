# Gathering information to troubleshoot Zowe Application Framework

Gather the following information to troubleshoot Zowe&trade; Application Framework issues:

- [z/OS release level](#z-os-release-level)
- [Zowe version and release level](#zowe-version-and-release-level)
- [Log output from the Zowe Application Server](#log-output-from-the-zowe-application-server)
- [Error message codes](#error-message-codes)
- [JavaScript console output (Web Developer toolkit accessible by pressing F12)](#javascript-console-output)
- [Screen captures (if applicable)](#screen-captures)

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

## Log output from the Zowe Application Server

There are two major components of Zowe application server:  `ZLUX` and `ZSS`.  They log to different files.

The default location for logs for both zlux and zss is folder `$INSTANCE_DIR/logs`, but can customize the log locations by using environment variables in $INSTANCE_DIR/instance.env

```
cat $INSTANCE_DIR/instance.env | grep ZWED_NODE_LOG_DIR 
cat $INSTANCE_DIR/instance.env | grep ZWES_LOG_DIR  
```

Read more about controlling the log location [here](../../user-guide/mvd-configuration#controlling-the-logging-location).

```
# navigate to zowe instance logs folder
cd <zowe-instance-folder>/logs

# or if customized, navigate to the environment variable path
cd $ZWED_NODE_LOG_DIR

# list file by most recent first
ls -lt
```

**Output:**

List of files by most recent timestamp for both app-server as well ZSS.

```
appServer-<yyyy-mm-dd-hh-mm>.log
zssServer-<yyyy-mm-dd-hh-mm>.log
```

## Error message codes

It is advisable to look into log files for capturing error codes.
Warning messages contain the word "WARN", and errors contain "CRITICAL"

## Javascript console output

When the web UI such as the Zowe Desktop or Apps inside it have an issue, the root problem may originate from either server-side or browser-side behavior.
In addition to the server logs, the browser logs should be gathered. They can be accessed by opening a browser's web developer toolkit. Most browsers allow this via pressing F12.

Read more about it [here](https://developers.google.com/web/tools/chrome-devtools/open).

## Screen captures

If possible, add a screen capture of the issue.
