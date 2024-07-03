# Customizing Gateway timeouts

:::info Role: system programmer
:::

Use the following procedure to change the global timeout value for the API Mediation Layer instance.

1. Open the file `zowe.yaml`.
2. Configure the following properties:

  * **components.gateway.apiml.gateway.timeoutmillis**  
   This property defines the global value for http/ws client timeout.
  
  :::note
  Ribbon configures the client that connects to the routed services.
  :::
  * **components.gateway.ribbon.connectTimeout**  
  Specifies the value in milliseconds which corresponds to the period in which API ML should establish a single, non-managed connection with the service. If omitted, the default value specified in the API ML Gateway service configuration is used.

  * **components.gateway.ribbon.readTimeout**  
  Specifies the time in milliseconds of inactivity between two packets in response from this service to API ML. If omitted, the default value specified in the API ML Gateway service configuration is used.

  * **components.gateway.ribbon.connectionManagerTimeout**  
  The HttpClient employs a special entity to manage access to HTTP connections called by the HTTP connection manager. The purpose of an HTTP connection manager is to serve as a factory for new HTTP connections, to manage the life cycle of persistent connections, and to synchronize access to persistent connections. Internally, the connections that are managed serve as proxies for real connections. `ConnectionManagerTimeout` specifies a period during which managed connections with API ML should be established. The value is in milliseconds. If omitted, the default value specified in the API ML Gateway service configuration is used.

  * **components.gateway.httpclient.requestConnectionTimeout**  
  Specifies the HTTP Client Request Connection Timeout for southbound services from the API Gateway. This setting defines the period that the API Gateway waits for response from the southbound server before issuing a connection refused response.

3. Restart Zowe.