# WebSocket support in API Gateway

The API Gateway includes a basic WebSocket proxy which enables the Gateway to access applications that use the WebSocket protocol together with a web UI and REST API.

The service can define what WebSocket services are exposed using Eureka metadata.

**Example:**

    eureka:
        instance:
            metadata-map:
                apiml:
                    routes:
                        ws_v1:
                            gatewayUrl: "ws/v1"
                            serviceUrl: /discoverableclient/ws

These metadata make it possible for requests from `wss://gatewayHost:port/serviceId/ws/v1/path` to map to `ws://serviceHost:port/discoverableclient/ws/path`,
where:

* **`serviceId`**  
  is the service ID of the service
  
* **`path`**  
  is the remaining path segment in the URL.

## Security and Authentication

The API Gateway usually uses TLS with the `wss` protocol. Services that use TLS enable the API Gateway to use `wss` to access these services. Services that do not use TLS require the API Gateway to use the `ws` protocol without TLS.
The API Gateway also supports basic authentication via WebSocket.

## Subprotocols

In addition to plain WebSocket support, API Mediation Layer also supports WebSocket subprotocols. Currently, only STOMP v1.2 and STOMP v1.1 are supported and tested. 

**Note:** It is possible to update the list of currently supported WebSocket subprotocols. Update the API Gateway configuration using the environment variable `SERVER_WEBSOCKET_SUPPORTEDPROTOCOLS` with the value of comma-separated subprotocol names. Support for additional subprotocols is not guaranteed as these subprotocols are not being tested.

 **Example:**
```
SERVER_WEBSOCKET_SUPPORTEDPROTOCOLS=v12.stomp,v11.stomp,wamp,soap
```
## High availability

In the high availability scenario, the API Gateway makes it possible to open a new Websocket session by utilizing the load balancing mechanism. 
Communication between the client and the server is handled by the API Gateway by propagating the session to a live instance.

## Diagnostics 

The list of active routed WebSocket sessions is available at the Actuator endpoint `websockets`. On `localhost`, it is available at https://localhost:10010/application/websockets.

## Limitations

Different HTTP status code errors may result. The WebSocket session starts before the session between the Gateway and the service starts. When a failure occurs when connecting to a service, the WebSocket session terminates with a WebSocket close code and a description of the failure rather than an HTTP error code.
