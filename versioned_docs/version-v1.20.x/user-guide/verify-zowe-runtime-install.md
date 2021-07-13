# Verifying Zowe installation on z/OS

After the Zowe&trade; started task `ZWESVSTC` is running, follow the instructions in the following sections to verify that the components are functional. 

- [Verifying Zowe Application Framework installation](#verifying-zowe-application-framework-installation)
- [Verifying API Mediation installation](#verifying-api-mediation-installation)
- [Verifying z/OS Services installation](#verifying-z-os-services-installation)

**Note:** Not all components may have been started. Which components have been started depends on your setting of the variable `LAUNCH_COMPONENT_GROUPS` in the `instance.env` file. If you defined the value `GATEWAY`, the API Mediation Layer and z/OS Services are started. If you defined the value `DESKTOP`, the Zowe Application Framework (also known as Zowe desktop) is started. Those using Docker may only have `ZSS` started. For more information, see [Creating and configuring the Zowe instance directory](configure-instance-directory.md#component-groups).

## Verifying Zowe Application Framework installation

If the Zowe Application Framework is installed correctly, you can open the Zowe Desktop from a supported browser.

From a supported browser, open the Zowe Desktop at `https://myhost:httpsPort`

where,

- _myHost_ is the host on which you installed the Zowe Application Server.
- _httpsPort_ is the port number value `ZOWE_ZLUX_SERVER_HTTPS_PORT` in `instance.env`. For more information, see [Creating and configuring the Zowe instance directory](configure-instance-directory.md#ports).

  For example, if the Zowe Application Server runs on host _myhost_ and the port number that is assigned to `ZOWE_ZLUX_SERVER_HTTPS_PORT` is 12345, you specify `https://myhost:12345`.  The web desktop uses page direct to the actual initial page which is `https://myhost:12345/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`. If the redirect fails, try the full URL.  

If the desktop appears but you are unable to log on, check [Cannot log into the Zowe desktop](../troubleshoot/app-framework/app-troubleshoot.md#cannot-log-in-to-the-zowe-desktop) for troubleshooting tips.


## Verifying API Mediation installation

Use your preferred REST API client to review the value of the status variable of the API Catalog service that is routed through the API Gateway using the following URL:

```
https://myhost:httpsPort/api/v1/apicatalog/application/health
```

where, 

- _myHost_ is the host on which you installed the Zowe API Mediation Layer.
- _httpsPort_ is the port number value `GATEWAY_PORT` in `instance.env`. For more information, see [Creating and configuring the Zowe instance directory](configure-instance-directory.md#ports).

**Example:**

The following example illustrates how to use the **curl** utility to invoke API Mediation Layer endpoint and the **grep** utility to parse out the response status variable value

```
$ curl -v -k --silent https://myhost:httpsPort/api/v1/apicatalog/application/health 2>&1 | grep -Po '(?<=\"status\"\:\")[^\"]+'
UP
```

The response `UP` confirms that API Mediation Layer is installed and is running properly.

## Verifying z/OS Services installation

You can verify the installation of z/OS Services from an internet browser by entering the following case-sensitive URL:

```
https://hostName:gatewayPort/api/v1/jobs?prefix=*
```

where, 

`gatewayPort` is the port number that is assigned to `GATEWAY_PORT` in the `instance.env` file used to launch Zowe. For more information, see [Creating and configuring the Zowe instance directory](configure-instance-directory.md#ports).

