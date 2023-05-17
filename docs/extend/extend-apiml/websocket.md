<!-- omit in toc -->
# WebSocket support in API Gateway

The API Gateway includes a basic WebSocket proxy which enables the Gateway to access applications that use the WebSocket protocol together with a web UI and a REST API.

- [Architecture](#architecture)
  - [Security and Authentication](#security-and-authentication)
  - [Subprotocols](#subprotocols)
  - [High availability](#high-availability)
  - [Idle Timeout](#idle-timeout)
- [Diagnostics](#diagnostics)
- [Limitations](#limitations)

The service defines what WebSocket endpoints are exposed using Eureka metadata.

**Example:**

    eureka:
        instance:
            metadata-map:
                apiml:
                    routes:
                        ws_v1:
                            gatewayUrl: "ws/v1"
                            serviceUrl: /discoverableclient/ws

These metadata make it possible for requests from `wss://gatewayHost:gatewayPort/serviceId/ws/v1/path` to map to `wss://serviceHost:servicePort/discoverableclient/ws/path`, where:

* **`serviceId`**  
  is the service ID of the service.
  
* **`path`**  
  is the remaining path segment in the URL.

## Architecture

In WebSocket routing, the API ML Gateway acts as both a WebSocket server for the client requesting this connection and as a WebSocket client.

Client (i.e. web browser) <-> Gateway (WebSocket Server) - Gateway (WebSocket Client) <-> Service's WebSocket Server

As a general recommendation, clients should implement a ping-like mechanism to maintain the opened WebSocket sessions and not rely on the web browser to perform this action.

### Security and Authentication

The API Gateway usually uses TLS with the `wss` protocol. Services that use TLS enable the API Gateway to use `wss` to access these services. Services that do not use TLS require the API Gateway to use the `ws` protocol without TLS.
The API Gateway also supports basic authentication via WebSocket.

### Subprotocols

In addition to plain WebSocket support, API Mediation Layer also supports WebSocket subprotocols. Currently, only STOMP v1.2 and STOMP v1.1 are supported and tested. 

**Note:** It is possible to update the list of currently supported WebSocket subprotocols. Update the API Gateway configuration using the environment variable `SERVER_WEBSOCKET_SUPPORTEDPROTOCOLS` with the value of comma-separated subprotocol names. Support for additional subprotocols is not guaranteed as these subprotocols are not being tested.

 **Example:**

```
SERVER_WEBSOCKET_SUPPORTEDPROTOCOLS=v12.stomp,v11.stomp,wamp,soap
```

### High availability

In the high availability scenario, the API Gateway makes it possible to open a new Websocket session by utilizing the load balancing mechanism. 
Communication between the client and the server is handled by the API Gateway by propagating the session to a live instance.

### Idle Timeout

The WebSocket client on the API ML Gateway has a default Idle timeout of one hour. If a WebSocket session between the Gateway WebSocket Client and the Service's WebSocket Server does not have activity for the entire period, the connection is closed.

To customize this setting, set the following property in zowe.yaml:

```yaml
gateway:
    server:
      webSocket:
        maxIdleTimeout: 300000
```

**Note:** This setting is global for the API ML Gateway.

## Diagnostics

The list of active routed WebSocket sessions is available at the Actuator endpoint `websockets`. On `localhost`, it is available at https://localhost:10010/application/websockets.

The actuator endpoint is enabled with debugging enabled in the API ML Gateway.

## Limitations

Different HTTP status code errors may result. The WebSocket session starts before the session between the Gateway and the service starts. When a failure occurs when connecting to a service, the WebSocket session terminates with a WebSocket close code and a description of the failure rather than an HTTP error code.
