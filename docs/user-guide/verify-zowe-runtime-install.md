# Verifying Zowe installation on z/OS

Once Zowe&trade; is running follow the instructions in the following sections to verify that the components are installed correctly and are functional.

- [Verifying Zowe Application Framework installation](#verifying-zowe-application-framework-installation)       
- [Verifying z/OS Services installation](#verifying-z-os-services-installation)
- [Verifying API Mediation installation](#verifying-api-mediation-installation)

## Verifying Zowe Application Framework installation

If the Zowe Application Framework is installed correctly, you can open the Zowe Desktop from a supported browser.

From a supported browser, open the Zowe Desktop at `https://myhost:httpsPort/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`

where:

- _myHost_ is the host on which you installed the Zowe Application Server.
- _httpPort_ is the port number that is assigned to _node.http.port_ in `zluxserver.json`.
- _httpsPort_ is the port number that is assigned to _node.https.port_ in `zluxserver.json`.

  For example, if the Zowe Application Server runs on host _myhost_ and the port number that is assigned to _node.https.port_ is 12345, you specify `https://myhost:12345/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`.

## Verifying z/OS Services installation

After the ZWESVSTC procedure is started, you can verify the installation of z/OS Services from an internet browser by entering the following case-sensitive URL:

```
https://hostName:<_gatewayPort_>/api/v1/jobs?prefix=*
```

where, _gatewayPort_ is the port number that is assigned to `ZOWE_ZLUX_SERVER_HTTPS_PORT` in the instance.env file used to launch Zowe, see [Configure instance directory](configure-instance-directory.md#ports).


`api:mediation:gatewayPort` in `zowe-install.yaml`.

## Verifying API Mediation installation

Use your preferred REST API client to review the value of the status variable of the API Catalog service that is routed through the API Gateway using the following URL:

```
https://hostName:basePort/api/v1/apicatalog/application/health
```

The `hostName` is set during install, and `basePort` is set as the `gatewayPort` parameter.

**Example:**

The following example illustrates how to use the **curl** utility to invoke API Mediation Layer endpoint and the **grep** utility to parse out the response status variable value

```
$ curl -v -k --silent https://hostName:basePort/api/v1/apicatalog/application/health 2>&1 | grep -Po '(?<=\"status\"\:\")[^\"]+'
UP
```

The response `UP` confirms that API Mediation Layer is installed and is running properly.
