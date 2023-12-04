# Customizing connection limits

:::info**Role:** system programmer
:::

By default, the API Gateway accepts up to 100 concurrent connections per route, and 1000 total concurrent connections. Any further concurrent requests are queued until the completion of an existing request. The API Gateway is built on top of Apache HTTP components that require these two connection limits for concurrent requests. 

Use the following procedure to change the number of concurrent connections.

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.server.maxConnectionsPerRoute` and set the value to an appropriate positive integer.
3. Find or add the property `components.gateway.server.maxTotalConnections` and set the value to an appropriate positive integer.