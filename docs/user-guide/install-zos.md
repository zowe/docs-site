# Installing the Zowe Application Framework, explorer server, and API Mediation Layer

As a Zowe user, install Zowe Application Framework, explorer server, and Zowe API Mediation Layer on z/OS to begin using Zowe.

## Prerequisites

- Before you start the installation on z/OS, ensure that your environment meets the necessary requirements. For details, see [System requirements](systemrequirements.md).

- The user ID that is used to perform the installation must have authority to set the ``'-a'`` extattr flag. This requires a minimum of read access to the BPX.FILEATTR.APF resource profile in the RACF CLASS. It is not essential for this access to be enabled before you run the `zowe-install.sh` script that installs Zowe on z/OS. However, if this access must be enabled before you run the `zowe-runtime-authorize.sh` script.

## Installing the Zowe runtime on z/OS

To install Zowe API Mediation Layer, Zowe Application Framework, and explorer server, you install the Zowe runtime on z/OS.

 **Follow these steps:**

1. Navigate to the directory where the installation archive is extracted. Locate the `/install` directory.

    ```
         /install
            /zowe-install.sh
            /zowe-install.yaml
    ```

2. Review the `zowe-install.yaml` file which contains the following properties:

    - `install:rootDir` is the directory that Zowe installs to create a Zowe runtime. The default directory is `~/zowe/0.9.3`. The user's home directory is the default value. This ensures that the user who is performing the installation has permission to create the directories that are required for the installation. If the Zowe runtime will be maintained by multiple users it is recommended to use another directory, such as `/var/zowe/v.r.m`.

       You can run the installation process multiple times with different values in the `zowe-install.yaml` file to create separate installations of the Zowe runtime. Ensure that the directory where Zowe will be installed is empty. The install script exits if the directory is not empty and creates the directory if it does not exist.

    - Zowe API Mediation Layer has three ports: two HTTP ports and one HTTPS port, for each micro-service.

    - The Explorer-server has two ports: one for HTTP and one for HTTPS. The liberty server is used for the explorer-ui components.

    - The zlux-server has three ports: the HTTP and HTTPS ports that are used by the Zowe Application Server, and the port that is used by the ZSS Server.

    **Example:**

    ```yaml
     install:
       rootDir=/var/zowe/0.9.5

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

    **Note:** If all of the default port values are acceptable, the ports do not need to be changed. To allocate ports, ensure that the ports are not in use for the Zowe runtime servers.

3. Determine which ports are not available.

    a. Display a list of ports that are in use with the following command:

      ```
      TSO NETSTAT
      ```

    b. Display a list of reserved ports with the following command:

      ```
      TSO NETSTAT PORTLIST
      ```

      The `zowe-install.yaml` also contains the telnet and SSH port with defaults of 23 and 22.  If your z/OS LPAR uses different ports, edit the values. This allows the TN3270 terminal desktop application as well as the VT terminal desktop application to connect.  Unlike the ports which must not be in use which are needed by Zowe runtime for its Zowe Application Framework and explorer server, the terminal ports are expected to be in use.

      ```
      # Ports for the TN3270 and the VT terminal to connect to
      terminals:
          sshPort=22
          telnetPort=23
      ```

4. Execute the `zowe-install.sh` script.

    With the current directory being the `/install` directory, execute the script `zowe-install.sh` by issuing the following command:

    ```
    zowe-install.sh  
    ```

    **Note:** You might receive the following error that the file cannot be executed:

    ```
    zowe-install.sh: cannot execute
    ```
    The error results when the install script does not have execute permission. To add execute permission, issue the following command:

    ```
    chmod u+x zowe-install.sh.
    ```

5. Configure Zowe as a started task.

     The ZOWESVR must be configured as a started task (STC) under the IZUSVR user ID.

    - If you use RACF, issue the following commands:

      ```
      RDEFINE STARTED ZOWESVR.* UACC(NONE) STDATA(USER(IZUSVR) GROUP(IZUADMIN) PRIVILEGED(NO) TRUSTED(NO) TRACE(YES))  
      SETROPTS REFRESH RACLIST(STARTED)
      ```

    - If you use CA ACF2, issue the following commands:

      ```
      SET CONTROL(GSO)
      INSERT STC.ZOWESVR LOGONID(IZUSVR) GROUP(IZUADMIN) STCID(ZOWESVR)
      F ACF2,REFRESH(STC)
      ```

    - If you use CA Top Secret, issue the following commands:

      ```
      TSS ADDTO(STC) PROCNAME(ZOWESVR) ACID(IZUSVR)
      ```

6. Add the users to the required groups, IZUADMIN for administrators, and IZUUSER for standard users.

    - If you use RACF, issue the following command:

      ```
      CONNECT (userid) GROUP(IZUADMIN)
      ```

    - If you use CA ACF2, issue the following commands:

      ```
      ACFNRULE TYPE(TGR) KEY(IZUADMIN) ADD(UID(<uid string of user>) ALLOW)
      F ACF2,REBUILD(TGR)
      ```

    - If you use CA Top Secret, issue the following commands:

      ```
      TSS ADD(userid)  PROFILE(IZUADMIN)
      TSS ADD(userid)  GROUP(IZUADMGP)
      ```

      When the `zowe-install.sh` script runs, it performs a number of steps broken down into sections. For more details about these steps, see [Troubleshooting the installation](../troubleshoot/troubleshootinstall.md).

## Starting and stopping the Zowe runtime on z/OS

Zowe has three runtime components on z/OS: the explorer server, the Zowe Application Server, and Zowe API Mediation Layer. When you run the ZOWESVR PROC, all of these components start. The Zowe Application Server startup script also starts the zSS server, so starting the ZOWESVR PROC starts all the four servers. Stopping ZOWESVR PROC stops all four servers.

### Starting the ZOWESVR PROC

To start the ZOWESVR PROC, run the `zowe-start.sh` script at the Unix Systems Services command prompt:

```
cd $ZOWE_ROOT_DIR/scripts
./zowe-start.sh
```
where:

_$ZOWE_ROOT_DIR_ is the directory where you installed the Zowe runtime. This script starts the ZOWESVR PROC for you so you don't have to log on to TSO and use SDSF.

**Note:** The default startup allows self-signed and expired certificates from the Zowe Application Framework proxy data services such as the explorer server.

If you prefer to use SDSF to start Zowe, start ZOWESVR by issuing the following operator command in SDSF:

```
/S ZOWESVR
```

By default, Zowe uses the runtime version that you most recently installed. To start a different runtime, specify its server path on the START command:

```
/S ZOWESVR,SRVRPATH='$ZOWE_ROOT_DIR/explorer-server'
```

To test whether the explorer server is active, open the URL: `https://<hostname>:7443/explorer-mvs`.

The port number `7443` is the default port. You can overwrite this port in the `zowe-install.yaml` file before the `zowe-install.sh` script is run. See [Installing Zowe runtime on z/OS](install-zos.md).

### Stopping the ZOWESVR PROC

To stop the ZOWESVR PROC, run the `zowe-stop.sh` script at the Unix Systems Services command prompt:

```
cd $ZOWE_ROOT_DIR/scripts
./zowe-stop.sh
```

If you prefer to use SDSF to stop Zowe, stop ZOWESVR by issuing the following operator command in SDSF:

```
/C ZOWESVR
```

Either of the methods will stop the explorer server, the Zowe Application Server, and the zSS server.

When you stop the ZOWESVR, you might get the following error message:

```
IEE842I ZOWESVR DUPLICATE NAME FOUND- REENTER COMMAND WITH 'A='
```

This error results when there is more than one started task named ZOWESVR. To resolve the issue, stop the required ZOWESVR instance by issuing the following commands:

```
/C ZOWESVR,A=asid
```

You can obtain the _asid_ from the value of `A=asid` when you issue the following commands:

```
/D A,ZOWESVR
```

## Verifying installation

After you complete the installation of Zowe API Mediation Layer, Zowe Application Framework, and explorer server, use the following procedures to verify that the components are installed correctly and are functional.

### Verifying Zowe Application Framework installation

If the Zowe Application Framework is installed correctly, you can open the Zowe Desktop from a supported browser.

From a supported browser, open the Zowe Desktop at `https://myhost:httpsPort/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`

where:

- _myHost_ is the host on which you installed the Zowe Application Server.
- _httpPort_ is the port number that is assigned to _node.http.port_ in `zluxserver.json`.
- _httpsPort_ is the port number that is assigned to _node.https.port_ in `zluxserver.json`.
  For example, if the Zowe Application Server runs on host _myhost_ and the port number that is assigned to _node.http.port_ is 12345, you specify `https://myhost:12345/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.htm`.

### Verifying explorer server installation

After the explorer server is installed and the ZOWESVR procedure is started, you can verify the installation from an internet browser by entering the following case-sensitive URL:

`https://<your.server>:<atlasport>/api/v1/system/version`

where:

- _your.server_ is the host name or IP address of the z/OS® system where explorer server is installed
- _atlasport_ is the port number that is chosen during installation.
  You can verify the port number in the `server.xml` file. This file is located in the explorer server installation directory, which is `/var/zowe/explorer-server/wlp/usr/servers/Atlas/server.xml` by default. The port number is visible in the `httpsPort` assignment in the `server.xml` file.

**Example:** `httpPort="7443"`.

This URL sends an HTTP GET request to the Liberty Profile explorer server. If explorer server is installed correctly, a JSON payload that indicates the current explorer server application version is returned.

**Example:**

```
{ "version": "V0.0.1" }
```

**Note:** The first time that you interact with the explorer server, you are prompted to enter an MVS™ user ID and password. The MVS user ID and password are passed over the secure HTTPS connection to establish authentication.

After you verify that explorer server is successfully installed, you can access the UI at the following URLs:

- `https://<your.server>:<atlasport>/ui/v1/jobs/#/`
- `https://<your.server>:<atlasport>/ui/v1/datasets/#/`
- `https://<your.server>:<atlasport>/ui/v1/uss/#/`

If explorer server is not installed successfully, see [Troubleshooting installation](../troubleshoot/troubleshootinstall.md) for solutions.

#### Verifying the availability of explorer server REST APIs

To verify the availability of all explorer server REST APIs, use the Liberty Profile's REST API discovery feature from an internet browser with the following URL. This URL is case-sensitive.

`https://<your.server>:<atlasport>/ibm/api/explorer`

With the discovery feature, you can also try each discovered API. The users who verify the availability must have access to their data sets and job information by using relevant explorer server APIs. This ensures that your z/OSMF configuration is valid, complete, and compatible with the explorer server application. For example, try the following APIs:

Explorer server: JES Jobs APIs

`GET /api/v1/jobs`

This API returns job information for the calling user.

Explorer server: Data set APIs

`GET /api/v1/datasets/userid.**`

This API returns a list of the userid.\*\* MVS data sets.

### Verifying API Mediation installation

Use your preferred REST API client to review the value of the status variable of the API Catalog service that is routed through the API Gateway using the following URL:

```
https://hostName:basePort/api/v1/apicatalog/application/state
```

The `hostName` is set during install, and `basePort` is set as the `gatewayHttpsPort` parameter.

**Example:**

The following example illustrates how to use the **curl** utility to invoke API Mediation Layer endpoint and the **grep** utility to parse out the response status variable value

```
$ curl -v -k --silent https://hostName:basePort/api/v1/apicatalog/application/state 2>&1 | grep -Po '(?<=\"status\"\:\")[^\"]+'
UP
```

The response `UP` confirms that API Mediation Layer is installed and is running properly.
