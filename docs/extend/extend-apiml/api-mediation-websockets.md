# Websocket based APIs

It's possible to route the WebSocket APIs through the API Mediation Layer. The explanation from the client side perspective is in [Routing with websockets](../../user-guide/routing-with-websockets.md)

The API Mediation Layer needs to know that it should require the Websocket connection to accept it. This is done via specific prefix in the API part that is used by the callee (/ws/...)

The example of valid URL for Websocket is `https://gatewayUrl/exampleService/ws/v1/communicate` 

## Configuration of service

The configuration relevant for the Websockets lives within the routes space of configuration. The full example using the WebSocket that is statically onboarded is available in [API ML repo](https://github.com/zowe/api-layer/blob/567c261bbe3e8702b62cdbc73afcdf0afa847a8b/config/docker/api-defs/staticclient.yml#L66)

```
services:
    - serviceId: staticclient2
      routes:
        - gatewayUrl: ws/v1
          serviceRelativeUrl: /ws
```

The ws in the beginning of the gateway URL outlines that it is indeed WebSocket connection and will be treated as such. The serviceRelativeUrl is customizable and doesn't have to contain ws

E.g. it's possible to access via `https://gatewayUrl/exampleService/ws/v1/communicate` URL on the actual server that would look for example like `https://serverUrl/exampleService/ui/communicate`
