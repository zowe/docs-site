# Verifying Zowe installation on z/OS

After the Zowe&trade; started task `ZWESLSTC` is running, follow the procedures applicable to your installation to verify that the components are functional. 

- [Verifying Zowe Application Framework installation](#verifying-zowe-application-framework-installation)
- [Verifying API Mediation Layer installation](#verifying-api-mediation-layer-installation)
- [Verifying z/OS Services installation](#verifying-zos-services-installation)

:::note
Not all components may have been started. Which components have been started depends on your setting of the component `enabled` status in Zowe configuration file (usually `zowe.yaml`). 

**Examples:**
* If you set `enabled` to be `true` for `gateway`, `discovery` and `api-catalog`, the API Mediation Layer and z/OS Services are started.
* If you set `enabled` to be `true` for `app-server` and `zss`, the Zowe Application Framework (Zowe desktop) are started.
* Configurations that use containerization may only have `ZSS` started.

For more information, see [YAML configurations - components](../appendix/zowe-yaml-configuration#yaml-configurations---components).
:::

## Verifying Zowe Application Framework installation

If the Zowe Application Framework is installed correctly, you can open the Zowe Desktop from a supported browser.

From a supported browser, open the Zowe Desktop at `https://myhost:httpsPort`

where:

- **_myHost_**  
is the host on which you installed the Zowe Application Server.
- **_httpsPort_**  
is the port number value `components.app-server.port` in `zowe.yaml`. For more information, see [Configure component app-server](../appendix/zowe-yaml-configuration#configure-component-app-server).

  For example, if the Zowe Application Server runs on host _myhost_ and the port number that is assigned to `components.app-server.port` is 12345, you specify `https://myhost:12345`.  The web desktop uses page direct to the actual initial page which is `https://myhost:12345/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`. If the redirect fails, try the full URL.  

If the desktop appears but you are unable to log on, check [Cannot log into the Zowe desktop](../troubleshoot/app-framework/app-troubleshoot.md#cannot-log-in-to-the-zowe-desktop) for troubleshooting tips.


## Verifying API Mediation Layer installation

Use your preferred REST API client to review the value of the status variable of the API Catalog service that is routed through the API Gateway using the following URL:

```
https://myhost:httpsPort/apicatalog/api/v1/application/health
```

where: 

- **_myHost_**  
is the host on which you installed the Zowe API Mediation Layer.
- **_httpsPort_**  
is the port number value `zowe.externalPort` in `zowe.yaml`. For more information, see [Domain and port to access Zowe](../appendix/zowe-yaml-configuration#domain-and-port-to-access-zowe).

**Example:**

The following example illustrates how to use the **curl** utility to invoke an API Mediation Layer endpoint and the **grep** utility to parse out the response status variable value. The `curl` command is a powerful tool used for making HTTP requests from the command line. It allows you to send and receive data from various protocols, including HTTP, HTTPS, FTP, and more. 

```
$ curl -v -k --silent https://myhost:httpsPort/apicatalog/api/v1/application/health 2>&1 | awk '/"status":"UP"/' | awk -F\" '{print$4;}'
UP
```

-  **`-v`**  
The `-v` option stands for "verbose." When you include this option, curl provides more detailed information during the request and response process. It displays additional information such as the request headers, response headers, and other debugging details.

- **`-k`**  
The `-k` option stands for "insecure" or "insecure SSL." When you include this option, curl allows insecure connections and bypasses SSL certificate verification. It is useful when making requests to HTTPS URLs with self-signed certificates or when dealing with SSL certificate issues. However, it is important to note that using `-k` removes security checks and may expose you to potential security risks. Exercise caution when using this option, especially in production environments.

The response `UP` confirms that API Mediation Layer is installed and is running properly. For more instructions about `curl` command, see the [tutorial](https://curl.se/docs/manual.html).

## Verifying z/OS Services installation

Zowe z/OS services usually are registered with Zowe API ML Discovery and exposed with a certain service url like `/<service>/api/v1`.

To verify a service is necessary to call any available endpoint, for example:

```
https://hostName:gatewayPort/serviceId/api/v1/version
```

where: 

* **`gatewayPort`**  
is the port number that is assigned to `zowe.externalPort` in the `zowe.yaml` file used to launch Zowe. For more information, see [Domain and port to access Zowe](../appendix/zowe-yaml-configuration#domain-and-port-to-access-zowe).

The path `serviceId/api/v1/version` depends on a specific service. You can also use API Catalog to verify a registered service.
