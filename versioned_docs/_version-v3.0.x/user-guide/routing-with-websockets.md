# Routing with WebSockets

In WebSocket routing, the API ML Gateway acts as both a WebSocket server for the client requesting this connection, and as a WebSocket client.

The following schema describes the interactions between client-side and server-side components where the Gateway has a double role as both client and server.

```
Client (i.e. web browser) <-> [Gateway (WebSocket Server) - Gateway (WebSocket Client)] <-> Service's WebSocket Server
```

:::tip
We recommend that clients implement a ping-like mechanism to maintain the opened WebSocket sessions and not rely on the web browser to perform this action.
:::

- [Security and Authentication](#security-and-authentication)
- [Subprotocols](#subprotocols)
- [High availability](#high-availability)
- [Idle Timeout](#idle-timeout)
- [Diagnostics](#diagnostics)
- [Limitations](#limitations)

## Security and Authentication

The API Gateway usually uses TLS with the `wss` protocol. Services that use TLS enable the API Gateway to use `wss` to access these services. Services that do not use TLS require the API Gateway to use the `ws` protocol without TLS.
The API Gateway also supports basic authentication via WebSocket.

## Subprotocols

In addition to plain WebSocket support, API Mediation Layer also supports WebSocket subprotocols. Currently, only STOMP v1.2 and STOMP v1.1 are supported and tested. 

:::note
It is possible to update the list of currently supported WebSocket subprotocols. Update the API Gateway configuration using the environment variable `SERVER_WEBSOCKET_SUPPORTEDPROTOCOLS` with the value of comma-separated subprotocol names. Support for additional subprotocols is not guaranteed as these subprotocols are not being tested.
:::

 **Example:**

```
SERVER_WEBSOCKET_SUPPORTEDPROTOCOLS=v12.stomp,v11.stomp,wamp,soap
```

## High availability

In the high availability scenario, a WebSocket session is established between client and a selected Gateway. This session is then tied to this instance for its entire duration.

## Idle Timeout

The WebSocket client on the API ML Gateway has a default Idle timeout of one hour. If a WebSocket session between the Gateway WebSocket Client and the Service's WebSocket Server is inactive for the entire period, the connection is closed.

To customize this setting, set the following property in zowe.yaml:

```yaml
gateway:
    server:
      webSocket:
        maxIdleTimeout: 300000
```

:::note
This setting is global for the API ML Gateway.
:::

## Diagnostics

The list of active routed WebSocket sessions is available at the Actuator endpoint `websockets`. On `localhost`, it is available at https://localhost:10010/application/websockets.

The actuator endpoint is enabled with debugging enabled in the API ML Gateway.

## Limitations

Different HTTP status code errors may result. The WebSocket session starts before the session starts between the Gateway and the service. When a failure occurs when connecting to a service, the WebSocket session terminates with the WebSocket close code and a description of the failure that occurred between the Gateway and the Service rather than an HTTP error code.
