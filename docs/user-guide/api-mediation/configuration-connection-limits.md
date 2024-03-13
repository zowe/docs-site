# Customizing connection limits

:::info Role: system programmer
:::

## TCP/IP Connection Limits

By default, the API Gateway accepts up to 100 concurrent connections per route, and 1000 total concurrent connections. Any further concurrent requests are queued until the completion of an existing request. The API Gateway is built on top of Apache HTTP components that require these two connection limits for concurrent requests. 

Use the following procedure to change the number of concurrent connections.

1. Open the file `zowe.yaml`.
2. Find or add the property `zowe.components.gateway.server.maxConnectionsPerRoute` and set the value to an appropriate positive integer.
3. Find or add the property `zowe.components.gateway.server.maxTotalConnections` and set the value to an appropriate positive integer.

## Websocket Limits

The API Mediation Layer supports Websocket connections. It's possible to configure the limits around timeouts, all the values are in miliseconds. This may be relevant if you see problems for example around the usage of TN32790 terminal in Virtual Desktop. 

```
zowe:
  components:
    gateway:
      server:
        websocket:
          connectTimeout: 15000
          stopTimeout: 30000
          asyncWriteTimeout: 60000
          maxIdleTimeout:3600000
```

Use the following procedure to change the limits:

1. Open the file `zowe.yaml`.
2. Find or add the property `zowe.components.gateway.server.websocket.connectTimeout` and set the value to an appropriate positive integer. This timeout limits how long the API Gateway waits until it drops connection if it can't reach the target server. Default is 15 seconds.
3. Find or add the property `zowe.components.gateway.server.websocket.stopTimeout` and set the value to an appropriate positive integer. This timeout handles how long the API Gateway waits before it fails on stop message for the Websocket connection. Default is 30 seconds.
4. Find or add the property `zowe.components.gateway.server.websocket.asyncWriteTimeout` and set the value to an appropriate positive integer. This timeout handles how long it takes before the server fails with unsuccessful response when trying to write message to the Websocket connection. Default is 60 seconds.
5. Find or add the property `zowe.components.gateway.server.websocket.maxIdleTimeout` and set the value to an appropriate positive integer. This timeout handles how long the Websocket connection remains open if there is no communication happening over the open connection. Default is one hour.
