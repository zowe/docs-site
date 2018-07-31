# Installing API Mediation, zLUX, and explorer server

You install API Mediation, zLUX, and explorer server on z/OS.

Before you install the runtime on z/OS, ensure that your environment meets the requirements. See [System requirements](planinstall.md).

## Installing the Zowe runtime on z/OS

To install API Mediation Layer, zLux, and explorer server, you install the Zowe runtime on z/OS.

**Follow these steps:**

1.  Navigate to the directory where the install archive was unpacked. Locate the `/install` directory.

    ```
         /install
            /zoe-install.sh
            /zoe-install.yaml
    ```

2.  Review the `zoe-install.yaml` file which contains the following properties.

    - `install:rootDir` is the directory that Zowe will be installed into to create a Zowe runtime. The default directory is `~/zoe/0.8.3`. The user's home directory is the default value to ensure that the installing user has permission to create the directories that are required for the install. If the Zowe runtime will be maintained by multiple users it might be more appropriate to use another directory, such as `/var/zoe/v.r.m`.

      You can run the installation process multiple times with different values in the `zoe-install.yaml` file to create separate installations of the Zowe runtime. The directory that Zowe is installed into must be empty. The install script exits if the directory is not empty and creates the directory if it does not exist.

    - API Mediation Layer has three ports - two HTTP ports and one HTTPS port, each for a micro-service.

    - Explorer-server has two ports - one for HTTP and one for HTTPS. The liberty server is used for the explorer-ui components.

    - zLux-server has three ports: the HTTP and HTTPS ports that are used by the zLUX window manager server, and the port that is used by the ZSS server.


    ```yaml
    install:
     rootDir=/var/zoe/0.8.3

    api-mediation:
      catalogHttpPort=7552
      discoveryHttpPort=7553
      gatewayHttpsPort=7554

    explorer-server:
      httpPort=7080
      httpsPort=7443

    # http and https ports for the node server
    zlux-server:
      httpPort=8543
      httpsPort=8544
      zssPort=8542
    ```

    If all of the default port values are acceptable then you do not need to change them. The ports must not be in use for the Zowe runtime servers to be able to allocate them.  

    To determine which ports are not available, follow these steps:

    - To display a list of ports that are in use, issue the following command:

    ```
    TSO NETSTAT
    ```

    - To display a list of reserved ports, issue the following command:

    ```
    TSO NETSTAT PORTLIST
    ```  

    The zoe-install.yaml also contains the telnet and SSH port with defaults of 23 and 22.  If your z/OS LPAR is using different ports, edit the values. This is to allow the TN3270 terminal desktop app to connect as well as the VT terminal desktop app.  Unlike the ports needed by the Zowe runtime for its zLUX and explorer server which must be unused, the terminal ports are expected to be in use.

    ```
    # Ports for the TN3270 and the VT terminal to connect to
    terminals:
        sshPort=22
        telnetPort=23
    ```

3.  Execute the zoe-install.sh script.

    With the current directory being the `/install` directory, execute the script `zoe-install.sh` by issuing the following command:

    ```
    zoe-install.sh
    ```

    You might receive the following error that the file cannot be executed.

    ```
    zoe-install.sh: cannot execute
    ```

    The error is due to that the install script does not have execute permission. To add execute permission, issue the following command:

    ```
    chmod u+x zoe-install.sh.
    ```

    When the `zoe-install.sh` script runs, it performs a number of steps broken down into sections. These are covered more in the section [Troubleshooting installing the Zowe runtime](zoeinstalltroubleshoot.md).

## Starting and stopping the Zowe runtime on z/OS

Zowe has two runtime components on z/OS, the explorer server and the zLUX server. When you run the ZOESVR PROC, it starts both these components. The zLUX server startup script also starts the zSS server, so starting the ZOESVR PROC starts all three servers, and stopping it stops all three.

**Starting the ZOESVR PROC**

To start the ZOESVR PROC, run the `zoe-start.sh` script at the Unix Systems Services command prompt:

```
cd $ZOE_ROOT_DIR/scripts
./zoe-start.sh
```

where _$ZOE_ROOT_DIR_ is the directory where you installed the Zowe runtime. This script starts the ZOESVR PROC for you so you don't have to log on to TSO and use SDSF.

If you prefer to use SDSF to start Zowe, start ZOESVR by issuing the following operator command in SDSF:

```
/S ZOESVR
```

By default, Zowe uses the runtime version that you most recently installed. To start a different runtime, specify its server path on the START command:

```
/S ZOESVR,SRVRPATH='$ZOE_ROOT_DIR/explorer-server'
```

To test whether the explorer server is active, open the URL `https://<hostname>:7443/ui`.

The port number 7443 is the default port and can be overridden through the `zoe-install.yaml` file before the `zoe-install.sh` script is run. See [Installing Zowe runtime on z/OS](zoeinstall.md).

**Stopping the ZOESVR PROC**

To stop the ZOESVR PROC, run the `zoe-stop.sh` script at the Unix Systems Services command prompt:

```
cd $ZOE_ROOT_DIR/scripts
./zoe-stop.sh
```

If you prefer to use SDSF to stop Zowe, stop ZOESVR by issuing the following operator command in SDSF:

```
/C ZOESVR  
```

Either of the methods will stop the explorer server, the zLUX server, and the zSS server.

When you stop the ZOESVR, you might get the following error message:

`IEE842I ZOESVR DUPLICATE NAME FOUND- REENTER COMMAND WITH 'A='`

This is because there is more than one started task named ZOESVR. To resolve the issue, stop the required ZOESVR instance by using one of the following methods:

- Issue the following commands:

  `/C ZOESVR,A=asid`

  You can obtain the _asid_ from the value of `A=asid` when you issue the following commands:

  `/D A,ZOESVR`

- Select the instance in SDSF and type `C` for CANCEL in the NP column next to the job.

## Verifying installation

After you complete the installation of Project Zowe, use the following procedures to verify that Project Zowe is installed correctly and is functional.

### Verifying zLUX installation

If zLUX is installed correctly, you can open the MVD from a supported browser.

From a supported browser, open the MVD at `https://myhost:httpsPort/ZLUX/plugins/com.rs.mvd/web/index.html`

where:

- _myHost_ is the host on which you installed the Zowe Node Server.
- _httpPort_ is the port number that was assigned to `node.http.port` in `zluxserver.json`.
- _httpsPort_ is the port number that was assigned to _node.https.port_ in `zluxserver.json`.
  For example, if the Zowe Node Server is installed on host _myhost_ and the port number that is assigned to the HTTP port is 12345, you specify `https://myhost:12345/ZLUX/plugins/com.rs.mvd/web/index.htm`.

#### Setting up terminal application plug-ins

Follow these optional steps to configure the default connection to open for the terminal application plug-ins.

##### Setting up the TN3270 mainframe terminal application plug-in

`_defaultTN3270.json` is a file in `tn3270-ng2/`, which is deployed during setup. Within this file, you can specify the following parameters to configure the terminal connection:

"host": `<hostname>`
"port": `<port>`
“security”: {
type: `<”telnet” or “tls”>`
}

##### Setting up the VT Terminal application plug-in

`_defaultVT.json` is a file in `vt-ng2/`, which is deployed during setup. Within this file, you can specify the following parameters to configure the terminal connection:

    “host”:<hostname>
    “port”:<port>
    “security”: {
      type: <”telnet” or “ssh”>
    }

### Verifying explorer server installation

After explorer server is installed and the ZOESVR procedure is started, you can verify the installation from an Internet browser by using the following case-sensitive URL:

`https://<your.server>:<atlasport>/Atlas/api/system/version`

where _your.server_ is the host name or IP address of the z/OS® system where explorer server is installed, and _atlasport_ is the port number that is chosen during installation. You can verify the port number in the `server.xml` file that is located in the explorer server installation directory, which is `/var/atlas/wlp/usr/servers/Atlas/server.xml`by default. Look for the `httpsPort` assignment in the `server.xml` file, for example: httpPort="7443".

This URL sends an HTTP GET request to the Liberty Profile explorer server. If explorer server is installed correctly, a JSON payload that indicates the current explorer server application version is returned. For example:

```
{ "version": "V0.0.1" }
```

**Note:** The first time that you interact with the explorer server, you are prompted to enter an MVS™ user ID and password. The MVS user ID and password are passed over the secure HTTPS connection to establish authentication.

After you verify that explorer server was successfully installed, you can access the UI at:

`https://<your.server>:<atlasport>/ui/\#/`

If explorer server is not installed successfully, see [Troubleshooting installation](troubleshoot.md) for solutions.

#### Verifying the availability of explorer server REST APIs

To verify the availability of all explorer server REST APIs, use the Liberty Profile's REST API discovery feature from an internet browser with the following URL. This URL is case-sensitive.

`https://<your.server>:<atlasport>/ibm/api/explorer`

With the discovery feature, you can also try each discovered API. The users who verify the availability must have access to their data sets and job information by using relevant explorer server APIs. This ensures that your z/OSMF configuration is valid, complete, and compatible with the explorer server application. For example, try the following APIs:

Explorer server: JES Jobs APIs

`GET /Atlas/api/jobs`

This API returns job information for the calling user.

Explorer server: Data set APIs

`GET /Atlas/api/datasets/userid.**`

This API returns a list of the userid.\*\* MVS data sets.

### Verifying API Mediation installation

Use your preferred REST API client to review the value of the status variable of the API Catalog service that is routed through the API Gateway using the following URL:

```
https://hostName:basePort/api/v1/caapicatalog/application/state
```

The `hostName` is set during install, and `basePort` is set as the `gatewayHttpsPort` parameter.

**Example:**

The following example illustrates how to use the **curl** utility to invoke API Mediation Layer endpoint and the **grep** utility to parse out the response status variable value

```
$ curl -v -k --silent https://hostName:basePort/api/v1/caapicatalog/application/state 2>&1 | grep -Po '(?<=\"status\"\:\")[^\"]+'
UP
```

The response `UP` confirms that API Mediation Layer was installed and is running properly.
