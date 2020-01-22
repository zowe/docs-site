# Configuring the Zowe runtime

After you install Zowe&trade; through either the convenience build by running the `zowe-install.sh` command or through the SMP/E build by running the RECEIVE and APPLY jobs, you will have a Zowe runtime directory or <ROOT_DIR> in USS as well as a PDS SAMPLIB and a PDS load library in MVS.

Before lauching Zowe there are two additional USS folders that need to be created.  

## Zowe instance directory

The Zowe instance directory contains contains configuration data required to launch a Zowe runtime and is where log files are stored.   

More than one instance directory can be used for the same Zowe runtime, allowing different configurations to have different port ranges, to have different version pre-requisites (node, Java) and to bring up different subsystems.

More information on Zowe instance directories is in [Zowe instance directory](configure-instance-directory.md)

## Zowe keystore directory

The Zowe keystore directory contains the key used by the Zowe desktop and the Zowe API mediation layer to secure its TLS communication with clients (such as web browsers or REST AI clients). The keystore directory also has a trust store where public keys of any servers that Zowe communicates to (such as z/OSMF) are held.

A keystore directory needs to be created for a Zowe instance to be launched successfully, and a keystore directory can be shared between Zowe instances and between Zowe runtimes.  

More information on Zowe keystore directories is in [Configuring Zowe certificate store](configure-certificates.md).

## Configuring the ZWESVSTC started task

Zowe has a number of runtimes on z/OS: the z/OS Service microservice server, the Zowe Application Server, and the Zowe API Mediation Layer microservices. A single PROCLIB `ZWESVSTC` is used to start all of these microservices.  This member is installed by Zowe into the data set SAMPLIB `SZWESAMP` during the installation or either a convenience build or SMP/E.  The steps to configure the z/OS runtime in order to launch the started task are described in [Configuring the Zowe started task](configure-zowe-server.md).

## Configuring the Zowe cross memory server

The Zowe cross memory server provides privileged cross-memory services to the Zowe Desktop and runs as an APF authorized program.  The same cross memory server can be used by multiple Zowe desktops.  The steps to configure and launch the cross memory server are described in [Configure the cross memory server](configure-cross-memory-server.md)

**Note:** The cross memory server is not used by the API Mediation Layer. If you are only launching the API Mediation Layer and you are not launching the Zowe desktop, you do not need to configure and launch the cross memory server.  Controlling which components of Zowe are started is determined by the `LAUNCH_COMPONENT_GROUPS` value in the `instance.env` file in the Zowe instance directory, see [Configure Instance Directory](configure-instance-directory.md#component-groups).  

## Starting and stopping the Zowe runtime on z/OS

Zowe has a number of runtimes on z/OS: the z/OS Service microservice server, the Zowe Application Server, and the Zowe API Mediation Layer microservices. When you run the ZWESVSTC PROC, all of these components start. Stopping ZWESVSTC PROC stops all of the components that run as independent Unix processes.

### Starting the ZWESVSTC PROC

To start the ZWESVSTC PROC, run the `zowe-start.sh` script at the Unix Systems Services command prompt:

```
cd $ZOWE_INSTANCE_DIR/bin
./zowe-start.sh
```
where:

_$ZOWE_INSTANCE_DIR_ is the directory where you set the instance directory to. This script starts the ZWESVSTC PROC for you so you do not have to log on to TSO and use SDSF.

If you prefer to use SDSF to start Zowe, start ZWESVSTC by issuing the following operator command in SDSF:

```
/S ZWESVSTC,INSTANCE='$ZOWE_INSTANCE_DIR'
```

To test whether the API Mediation Layer is active, open the URL: `https://<hostname>:7554`.

To test whether the Zowe desktop is active, open the URL: `https://<hostname>:8554`.

The port number 7554 is the default API Gateway port and the port number 8554 is the default Zowe desktop port. You can overwrite theses port in the `zowe-install.yaml` file before the `zowe-configure.sh` script is run. See the section [Port Allocations](#port-allocations).

### Stopping the ZWESVSTC PROC

To stop the ZWESVSTC PROC, run the `zowe-stop.sh` script at the Unix Systems Services command prompt:

```
cd $ZOWE_INSTANCE_DIR/bin
./zowe-stop.sh
```

If you prefer to use SDSF to stop Zowe, stop ZWESVSTC by issuing the following operator command in SDSF:

    ```
    /C ${ZOWE_PREFIX}${ZOWE_INSTANCE}SV
    ```
    Where ZOWE_PREFIX and ZOWE_INSTANCE are specified in your configuration (and default to ZWE and 1)

Either method will stop the z/OS Service microservice server, the Zowe Application Server, and the zSS server.

When you stop the ZWESVSTC, you might get the following error message:

```
IEE842I ZWESVSTC DUPLICATE NAME FOUND- REENTER COMMAND WITH 'A='
```

This error results when there is more than one started task named ZWESVSTC. To resolve the issue, stop the required ZWESVSTC instance by issuing the following commands:

```
/C ${ZOWE_PREFIX}${ZOWE_INSTANCE}SV,A=asid
```
Where ZOWE_PREFIX and ZOWE_INSTANCE are specified in your configuration (and default to ZWE and 1) and you can obtain the _asid_ from the value of `A=asid` when you issue the following commands:

```
/D A,${ZOWE_PREFIX}${ZOWE_INSTANCE}SV
```

## Starting and stopping the Zowe Cross Memory Server on z/OS

The Cross Memory server is run as a started task from the JCL in the PROCLIB member ZWESISTC. It supports reusable address spaces and can be started through SDSF with the operator start command with the REUSASID=YES keyword:
```
/S ZWESISTC,REUSASID=YES
```
The ZWESISTC task starts and stops the ZWESSTC task as needed. Do not start the ZWESASTC task manually.

To end the Zowe APF Angel process, issue the operator stop command through SDSF:

```
/P ZWESISTC
```

**Note:** The starting and stopping of the ZWESVSTC for the main Zowe servers is independent of the ZWESISTC angel process. If you are running more than one ZWESVSTC instance on the same LPAR, then these will be sharing the same ZWESISTC cross memory server. Stopping ZWESISTC will affect the behavior of all Zowe servers on the same LPAR which use the same cross-memory server name, for example ZWESIS_STD. The Zowe Cross Memory Server is designed to be a long-lived address space. There is no requirement to recycle on a regular basis. When the cross-memory server is started with a new version of the ZWESIS01 load module, it will abandon its current load module instance in LPA and will load the updated version.
