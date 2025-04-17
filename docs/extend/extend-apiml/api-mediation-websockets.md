# Routing Websocket based APIs

It is possible to route WebSocket APIs through the API Mediation Layer. For details about Websocket routing from the client side, see [Routing with websockets](../../user-guide/routing-with-websockets.md).

To accept Websockets, it is necessary that the API Mediation Layer know that a Websocket connection is required. This is done when the issuer of the call adds the `(/ws/...)` prefix in the URL of the called API. 

**Example:**
The following is an example of a valid URL for a Websocket API.

`https://gatewayUrl/exampleService/ws/v1/communicate` 

## Configuring the service for Websockets

The configuration relevant for Websockets is contained within the routes section in the configuration. A complete example using a WebSocket that is statically onboarded is available in the [API ML repo](https://github.com/zowe/api-layer/blob/567c261bbe3e8702b62cdbc73afcdf0afa847a8b/config/docker/api-defs/staticclient.yml#L66).

**Example:**
```
services:
    - serviceId: staticclient2
      routes:
        - gatewayUrl: ws/v1
          serviceRelativeUrl: /ws
```

The `ws` in the beginning of the Gateway URL provides the notification that it is a WebSocket connection, and will be treated as such. 

:::note
The `serviceRelativeUrl` is customizable and does not have to contain `ws`.

**Example:**
It is possible to access via the URL `https://gatewayUrl/exampleService/ws/v1/communicate` on the actual server that would appear as the URL `https://serverUrl/exampleService/ui/communicate`.
:::