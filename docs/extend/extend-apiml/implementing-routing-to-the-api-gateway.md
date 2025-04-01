# Understanding service routing through the Gateway 

As an extender of API Mediation Layer, review how service routing thorough the Gateway works  

:::info Required roles: Zowe extender, application developer
:::

Choose from the following routing methods:

- 
  - [Routing with versioning](#routing-with-versioning))
  - [Routing without versioning](#routing-without-versioning)


Service instances provide information about routing to the API Gateway via Eureka metadata.

## Routing with versioning

For basic routing, the `gatewayUrl` and `sericeUrl` are specified with the corresponding version:

**Example:**

    routes:
        - gatewayUrl: "ui/v1"
          serviceUrl: "/helloworld"
        - gatewayUrl: "api/v1"
          serviceUrl: "/helloworld/v1"
        - gatewayUrl: "api/v2"
          serviceUrl: "/helloworld/v2"

In this example, the service has a service ID of `helloworldservice` that exposes the following endpoints:

* **UI**  
 `https://gateway/helloworldservice/ui/v1` routed to `https://hwServiceHost:port/helloworld/`
* **API major version 1**  
 `https://gateway/helloworldservice/api/v1` routed to `https://hwServiceHost:port/helloworld/v1`
* **API major version 2**  
  `https://gateway/helloworldservice/api/v2` routed to `https://hwServiceHost:port/helloworld/v2`

This type of routing has the following features:

* The gatewayUrl is matched against the prefix of the URL path used at the Gateway `https://gateway/urlPath`, where `urlPath` is `serviceId/prefix/resourcePath`.
* The service ID is used to find the service host and port.
* The `serviceUrl` is used to prefix the `resourcePath` at the service host.

:::note
The service ID is not included in the routing metadata, but the service ID is in the basic Eureka metadata.
:::

## Routing without versioning

This method of routing is similar to the previous method, but does not use the version part of the URL. This approach is useful for services that handle versioning themselves with different granularity.

One example that only uses a service ID is z/OSMF.

**Example:**

z/OSMF URL through the Gateway has the following format:

 `https://gateway:10010/ibmzosmf/api/restjobs/jobs/...`

* **ibmzosmf**  
Specifies the service ID.

* **/restjobs/1.0/...**  
Specifies the rest of the endpoint segment.

  Note that no version is specified in this URL.
