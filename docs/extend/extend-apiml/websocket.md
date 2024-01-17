
# Using WebSocket support in API Gateway

The API Gateway includes a basic WebSocket proxy which enables the Gateway to access applications that use the WebSocket protocol together with a web UI and a REST API.

- [Architecture](#architecture)
  - [Security and Authentication](#security-and-authentication)
  - [Subprotocols](#subprotocols)
  - [High availability](#high-availability)
  - [Idle Timeout](#idle-timeout)
- [Diagnostics](#diagnostics)
- [Limitations](#limitations)

The service defines which WebSocket endpoints are exposed by using Eureka metadata.

**Example:**

    eureka:
        instance:
            metadata-map:
                apiml:
                    routes:
                        ws_v1:
                            gatewayUrl: "ws/v1"
                            serviceUrl: /${serviceId}/ws

These metadata make it possible for requests from `wss://gatewayHost:gatewayPort/${serviceId}/ws/v1/path` to map to `wss://serviceHost:servicePort/${serviceId}/ws/v1/path`.

* **`serviceId`**  
  Specifies the service ID of the service.
  
* **`path`**  
  Specifies the remaining path segment in the URL.

