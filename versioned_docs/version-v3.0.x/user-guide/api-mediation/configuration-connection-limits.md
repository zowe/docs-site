# Customizing connection limits

:::info Role: system programmer
:::

## TCP/IP Connection Limits

By default, the API Gateway accepts up to 100 concurrent connections per route, and 1000 total concurrent connections. Any further concurrent requests are queued until the completion of an existing request. The API Gateway is built on top of Apache HTTP components that require these two connection limits for concurrent requests.

Use the following procedure to change the number of concurrent connections:

1. Open the file `zowe.yaml`.
2. Find or add the property `zowe.components.gateway.server.maxConnectionsPerRoute` and set the value to an appropriate positive integer. Defaults to 100 max reusable connections per route.
3. Find or add the property `zowe.components.gateway.server.maxTotalConnections` and set the value to an appropriate positive integer. Defaults to 1000 max total concurrent connections.

## Websocket Limits

The API Mediation Layer supports Websocket connections. It is possible to configure the limits around timeouts. All the values are in milliseconds. Customizing this limit may be practical if you see problems such as with the usage of the TN3270 terminal in Virtual Desktop. 

```yaml
zowe:
  components:
    gateway:
      server:
        webSocket:
          connectTimeout: 15000
          stopTimeout: 30000
          asyncWriteTimeout: 60000
          maxIdleTimeout: 3600000
          requestBufferSize: 8192
```

Use the following procedure to change the limits:

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.server.websocket.connectTimeout`, and set the value to an appropriate positive integer. This timeout limits how long the API Gateway waits until it drops connection if it cannot reach the target server. The default is 45 seconds (45000 milliseconds).
3. Find or add the property `components.gateway.server.websocket.asyncWriteTimeout`, and set the value to an appropriate positive integer. This timeout handles how long it takes before the server fails with unsuccessful response when trying to write a message to the Websocket connection. The default is 60 seconds (60000 milliseconds).
4. Find or add the property `components.gateway.server.websocket.maxIdleTimeout`, and set the value to an appropriate positive integer. This timeout handles how long the Websocket connection remains open if there is no communication happening over the open connection. The default is one hour (3600000 milliseconds).
5. Find or add the property `components.gateway.server.websocket.requestBufferSize` and set the value to an appropriate positive integer. This property handles the max request size allowed in WebSocket handshake requests. The default is 8K.
