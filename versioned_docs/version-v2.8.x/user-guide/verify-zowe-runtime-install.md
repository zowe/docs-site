# Verifying Zowe installation on z/OS

After the Zowe&trade; started task `ZWESLSTC` is running, follow the instructions in the following sections to verify that the components are functional. 

- [Verifying Zowe Application Framework installation](#verifying-zowe-application-framework-installation)
- [Verifying API Mediation installation](#verifying-api-mediation-installation)
- [Verifying z/OS Services installation](#verifying-z-os-services-installation)

**Note:** Not all components may have been started. Which components have been started depends on your setting of the component `enabled` status in Zowe configuration file (usually `zowe.yaml`). If you set `enabled` to be `true` for `gateway`, `discovery` and `api-catalog`, the API Mediation Layer and z/OS Services are started. If you set `enabled` to be `true` for `app-server` and `zss`, the Zowe Application Framework (also known as Zowe desktop) are started. Those using containerization may only have `ZSS` started. For more information, see reference of [YAML configurations - components](../appendix/zowe-yaml-configuration#yaml-configurations---components).

## Verifying Zowe Application Framework installation

If the Zowe Application Framework is installed correctly, you can open the Zowe Desktop from a supported browser.

From a supported browser, open the Zowe Desktop at `https://myhost:httpsPort`

where,

- _myHost_ is the host on which you installed the Zowe Application Server.
- _httpsPort_ is the port number value `components.app-server.port` in `zowe.yaml`. For more information, see [Configure component app-server](../appendix/zowe-yaml-configuration#configure-component-app-server).

  For example, if the Zowe Application Server runs on host _myhost_ and the port number that is assigned to `components.app-server.port` is 12345, you specify `https://myhost:12345`.  The web desktop uses page direct to the actual initial page which is `https://myhost:12345/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`. If the redirect fails, try the full URL.  

If the desktop appears but you are unable to log on, check [Cannot log into the Zowe desktop](../troubleshoot/app-framework/app-troubleshoot.md#cannot-log-in-to-the-zowe-desktop) for troubleshooting tips.


## Verifying API Mediation installation

Use your preferred REST API client to review the value of the status variable of the API Catalog service that is routed through the API Gateway using the following URL:

```
https://myhost:httpsPort/apicatalog/api/v1/application/health
```

where, 

- _myHost_ is the host on which you installed the Zowe API Mediation Layer.
- _httpsPort_ is the port number value `zowe.externalPort` in `zowe.yaml`. For more information, see [Domain and port to access Zowe](../appendix/zowe-yaml-configuration#domain-and-port-to-access-zowe).

**Example:**

The following example illustrates how to use the **curl** utility to invoke API Mediation Layer endpoint and the **grep** utility to parse out the response status variable value

```
$ curl -v -k --silent https://myhost:httpsPort/apicatalog/api/v1/application/health 2>&1 | awk '/"status":"UP"/' | awk -F\" '{print$4;}'
UP
```

The response `UP` confirms that API Mediation Layer is installed and is running properly.

## Verifying z/OS Services installation

Zowe z/OS services usually are registered with Zowe APIML Discovery and exposed with certain service url like `/<service>/api/v1`.

Here we give an example of verifying `jobs-api` shipped with Zowe. Please be aware that `jobs-api` is not enabled by default if you created your Zowe configuration file from `example-zowe.yaml`. To enable `jobs-api`, you need to set `components.jobs-api.enabled` to be `true` and restart Zowe. You can verify the installation of `jobs-api` service from an internet browser by entering the following case-sensitive URL:

```
https://hostName:gatewayPort/jobs/api/v1/jobs?prefix=*
```

where, 

`gatewayPort` is the port number that is assigned to `zowe.externalPort` in the `zowe.yaml` file used to launch Zowe. For more information, see [Domain and port to access Zowe](../appendix/zowe-yaml-configuration#domain-and-port-to-access-zowe).

The above link should prompt you to login. After you input correct user name and password of your target z/OS system, you should see JSON format data of all jobs running on the system.
