# Routing requests to REST APIs

As an application developer, you can route your service through the Gateway using the API Mediation Layer to consume a specific resource.

There are two ways to route your service to the API Mediation Layer:

* Basic Routing (using Service ID and version)
* Basic Routing (using only the service ID)

## Terminology

* **Service**

  A service provides one or more APIs, and is identified by a service ID. Note that sometimes the term "service name" is used to mean service ID.

  The default service ID is provided by the service developer in the service configuration file.

  A system administrator can replace the service ID with a deployment environment specific name using additional configuration that is external to the service deployment unit. Most often, this is configured in a JAR or WAR file.

  Services are deployed using one or more service instances, which share the same service ID and implementation.

* **URI (Uniform Resource Identifier)**

  A string of characters used to identify a resource. Each URI must point to a single corresponding resource that does not require any additional information, such as HTTP headers.

## APIML Basic Routing (using Service ID and version)

This method of basic routing is based on the service ID that identifies the service. The specific instance is selected by the API Gateway. All instances require an identical response. Eureka and Zuul expect this type of routing.

The URI identifies the resource, but does not identify the instance of the service as unique when multiple instances of the same service are provided. For example, when a service is running in high-availability (HA) mode.

Services of the same product that provide different resources, such as SYSVIEW on one system and SYSVIEW in a different sysplex, cannot have the same service ID (the same URI cannot have two different meanings).

In addition to the basic Zuul routing, the Zowe API Gateway supports versioning in which you can specify a major version. The Gateway routes a request only to an instance that provides the specified major version of the API.

The `/api/` prefix is used for REST APIs. The prefix `/ui/` applies to web UIs and the prefix `/ws/` applies to [WebSockets](websocket.md).

You can implement additional routing using a Zuul pre-filter. For more information about how to implement a Zuul filter, see [Router and Filter: Zuul](https://cloud.spring.io/spring-cloud-netflix/multi/multi__router_and_filter_zuul.html)

The URL format expected by the API Gateway is:

`https://{gatewayHost}:{port}/{serviceId}/api/v{majorVersion}/{resource}`

**Example:**

The following address shows the original URL of a resource exposed by a service:

```
http://service:10015/enablerv1sampleapp/api/v1/samples
```

The following address shows the API Gateway URL of the resource:

```
https://gateway:10010/enablerv1sampleapp/api/v1/samples
```

The following diagram illustrates how basic routing works:

<img src={require("../../images/api-mediation/Basic-Routing.png").default} alt="Zowe API Mediation basic routing"/>

### Implementation Details

Service instances provide information about routing to the API Gateway via Eureka metadata.

**Example:**

    metadata-map:
        apiml:
            routes:
                ui_v1:
                    gatewayUrl: "ui/v1"
                    serviceUrl: "/helloworld"
                api_v1:
                    gatewayUrl: "api/v1"
                    serviceUrl: "/helloworld/v1"
                api_v2:
                    gatewayUrl: "api/v2"
                    serviceUrl: "/helloworld/v2"

In this example, the service has a service ID of `helloworldservice` that exposes the following endpoints:

* **UI** - `https://gateway/helloworldservice/ui/v1` routed to `https://hwServiceHost:port/helloworld/`
* **API major version 1** - `https://gateway/helloworldservice/api/v1` routed to `https://hwServiceHost:port/helloworld/v1`
* **API major version 2** - `https://gateway/helloworldservice/api/v2` routed to `https://hwServiceHost:port/helloworld/v2`

where:

* The gatewayUrl is matched against the prefix of the URL path used at the Gateway `https://gateway/urlPath`, where `urlPath` is `serviceId/prefix/resourcePath`.
* The service ID is used to find the service host and port.
* The `serviceUrl` is used to prefix the `resourcePath` at the service host.

**Note:** The service ID is not included in the routing metadata, but the service ID is in the basic Eureka metadata.

## Basic Routing (using only the service ID)

This method of routing is similar to the previous method, but does not use the version part of the URL. This approach is useful for services that handle versioning themselves with different granularity.

One example that only uses a service ID is z/OSMF.

**Example:**

z/OSMF URL through the Gateway: `https://gateway:10010/zosmf/api/restjobs/jobs/...`

where:

* `zosmf` is the service ID.
* `/restjobs/1.0/...` is the rest of the endpoint segment.

Note that no version is specified in this URL.

## Zowe architecture with high availability enablement on Sysplex

The following diagram illustrates the difference in locations of Zowe components when deploying Zowe into a Sysplex with high availability enabled as opposed to running all components on a single z/OS system.  

![Zowe Architecture Diagram with High Availability Enablement](../images/common/zowe-architecture-lpar.png)

Zowe has high availability feature build-in. To enable this feature, you can define `haInstances` section in your YAML configuration file.

The diagram above shows that `ZWESLSTC` has started two Zowe instances running on two separate LPARs that can be on the same or different sysplexes.  

- The Sysplex distributor port sharing enables the API Gateway 7554 ports to be shared so that incoming requests can be routed to either the gateway on LPAR A or LPAR B.
- The discovery servers on each LPAR communicate with each other and share their registered instances, which allows the API gateway on LPAR A to dispatch APIs to components either on its own LPAR, or alternatively to components on LPAR B. As indicated on the diagram, each component has two input lines: one from the API gateway on its own LPAR and one from the gateway on the other LPAR.  When one of the LPARs goes down, the other LPAR remains operating within the sysplex providing high availability to clients that connect through the shared port irrespective of which Zowe instance is serving the API requests.

The `zowe.yaml` file can be configured to start Zowe instances on more than two LPARS, and also to start more than one Zowe instance on a single LPAR, thereby providing a grid cluster of Zowe components that can meet availability and scalability requirements.  

The configuration entries of each LPAR in the `zowe.yaml` file control which components are started. This configuration mechanism makes it possible to start just the desktop and API Mediation Layer on the first LPAR, and start all of the Zowe components on the second LPAR. Because the desktop on the first LPAR is available to the gateway of the second LPAR, all desktop traffic is routed there.  

The caching services for each Zowe instance, whether on the same LPAR, or distributed across the sysplex, are connected to each other by the same shared VSAM data set.  This arrangement allows state sharing so that each instance behaves similarly to the user irrespective of where their request is routed.  

For simplification of the diagram above, the Jobs and Files API servers are not shown as being started. If the user defines Jobs and Files API servers to be started in the `zowe.yaml` configuration file, these servers behave the same as the servers illustrated. In other words, these services register to their API discovery server which then communicates with other discovery servers on other Zowe instances on either the same or other LPARs. The API traffic received by any API gateway on any Zowe instance is routed to any of the Jobs or Files API components that are available.  

To learn more about Zowe with high availability enablement, see [Configuring Sysplex for high availability](../user-guide/configure-sysplex.md).

## API Versioning

Service instances provide one or more different API versions (we take only one assumption: one
service instance will not provide two versions with the same major version, no other assumptions
which versions will be provided and how - e.g. an instance can provide only one version and another
version will be provided by different instance, other services can have instances that provide
multiple versions).

The API user specifies only the major version in the URI. The API catalog needs to differentiate
between different _full versions_ internally and able to return a specific full version or return
documentation for the highest version of the specified major version that is supported by all
running services.

Guidelines:

- The version of the API, not dependent on the product release

- Two last versions are supported

 - Major version - specified by the user of the API in the URI - increased only when backward
 incompatible change is introduced (it is rare because the REST APIs should be designed to allow
 extensibility)

 - Minor version - not specified in the URI but the user should know what is it, important to
 display the correct level of documentation. Increased when the API is extended with a new feature
 (if you use a new resource available in v1.2, the service has to provide at least v1.2, the request
 fails on v1.1). If there are multiple instances of the services that have different minor versions,
 the service together will say that has the lowest minor version (e.g instance A provide v1.3 and
 v2.2, instance B was not yet upgraded and provides v1.2 and v2.1, then the service provides v1.2
 and v2.1)

 - Patch version - not specified in the URI, no difference in the API, used only when the API
 documentation is patched or a bug was fixed, there is no change in the API

 ![API Versioning](../../images/api-mediation/API-Versioning.png)
