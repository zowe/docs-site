# Routing requests to REST APIs

API consumers can access any services onboarded to the API Mediation Layer through a single port. In this context, 'service' refers to one or more instances that share the same API and are onboarded under the same service Id. Some services provide versioned APIs, while other services provide an unversioned API. From the consumer side, the API Mediation Layer takes care of situations in which one instance is down and/or distributing the load between different instances of a service. 

Types of services include both versioned and nonversioned services:

* **Versioned services**  
Routing with service ID and version

* **Nonversioned services**  
Using only the service ID

Under certain conditions it is possible to route to a specific instance of service.

## Terminology

* **Service**

  * A service provides one or more APIs, and is identified by a service ID. Note that sometimes the term "service name" is used to mean the service ID.  
  * The default service ID is provided by the service developer in the service configuration file.  
  * A system administrator can replace the service ID with a deployment environment specific name by setting the `apimlId` property in the service metadata. This allows routing to use a custom identifier without changing the service's own configuration.  
  * Services are deployed using one or more service instances, which share the same service ID and implementation.

* **URI (Uniform Resource Identifier)**

  The URI is a string of characters used to identify a resource. Each URI must point to a single corresponding resource that does not require any additional information, such as HTTP headers.

## Basic Routing

The basic method of routing is based on the service ID. For services that have multiple versions of an API, the secondary parameter is the version of the API that the user wants to reach. 

### API ML Routing to the Versioned service

The URI identifies the resource, but does not identify the instance of the service as unique when multiple instances of the same service are provided, such as when a service is running in high-availability (HA) mode. To get to a specific instance, it is necessary to access the instance with a specific API ML configuration and header `X-Forward-To`.

In addition to the basic routing, the Zowe API Gateway supports versioning in which the user can specify a major version. The Gateway routes a request only to an instance that provides the specified major version of the API.

The URL prefixes are defined by each service in its metadata configuration. Common conventions include:

* The `/api/` prefix is used for REST APIs.
* The prefix `/ui/` applies to web UIs
* The prefix `/ws/` applies to WebSockets
* The prefix `/graphql/` applies to the GraphQL API

The URL expected by the API Gateway has the following format:

`https://{gatewayHost}:{port}/{serviceId}/{gatewayUrl}/{resource}`

Where `{gatewayUrl}` is the prefix registered by the service (e.g., `api/v1`, `ui/v1`, `ws/v1`). The gateway port on z/OS defaults to `7554` (configurable via `zowe.yaml`).

**Example:**

The following address shows the original URL of a resource exposed by a service:

```
https://service:10015/enablerv1sampleapp/api/v1/samples
```

The following address shows the API Gateway URL of the resource:

```
https://gateway:7554/enablerv1sampleapp/api/v1/samples
```

The following diagram illustrates how basic routing works:

![Zowe API Mediation basic routing](../../images/api-mediation/Basic-Routing.png)

### Implementation details for routing

The Zowe API Gateway is built on Spring Cloud Gateway. It dynamically generates routes from the service registry (Eureka). Services register their `gatewayUrl` prefixes in metadata, and the gateway creates routing rules by matching the path `/{serviceId}/{gatewayUrl}/**` and rewriting it to the service's internal URL.

Routing supports two modes:
- **Path-based routing** (`ByBasePath`): matches requests by `/{serviceId}/{gatewayUrl}/**` and rewrites the path to the service's internal URL.
- **Header-based routing** (`ByHeader`): uses the `X-Forward-To` header to route requests to a specific service or instance.

The gateway also exposes its own native endpoints under the `/gateway/` prefix for authentication and token management:
- `/gateway/api/v1/auth/login` — user login
- `/gateway/api/v1/auth/query` — query authentication status
- `/gateway/api/v1/auth/access-token/generate` — generate access tokens
- `/gateway/api/v1/auth/keys/public` — retrieve public keys for token verification


## Zowe architecture with high availability enablement on Sysplex

The following diagram illustrates the difference in locations of Zowe components when deploying Zowe into a Sysplex with high availability enabled as opposed to running all components on a single z/OS system.  

![Zowe Architecture Diagram with High Availability Enablement](../../images/common/zowe-architecture-lpar.png)

Zowe has a high availability feature built-in. To enable this feature, you can define the `haInstances` section in your YAML configuration file.

The preceding diagram shows that `ZWESLSTC` started two Zowe instances running on two separate LPARs. These LPARs can be on the same or different sysplexes.  

- Sysplex distributor port sharing enables the API Gateway 7554 ports to be shared, which makes it possible for  incoming requests to be routed to either the Gateway on LPAR A or LPAR B.
- The discovery servers on each LPAR communicate with each other and share their registered instances, which allows the API Gateway on LPAR A to dispatch APIs to components either on its own LPAR, or alternatively to components on LPAR B. As indicated in the diagram, each component has two input lines: one from the API Gateway on its own LPAR, and one from the Gateway on the other LPAR. When one of the LPARs goes down, the other LPAR remains operating within the sysplex, thereby providing high availability to clients that connect through the shared port irrespective of which Zowe instance is serving the API requests.

The `zowe.yaml` file can be configured to start Zowe instances on more than two LPARS, and also to start more than one Zowe instance on a single LPAR, thereby providing a grid cluster of Zowe components that can meet availability and scalability requirements.  

The configuration entries of each LPAR in the `zowe.yaml` file control which components are started. This configuration mechanism makes it possible to start just the desktop and API Mediation Layer on the first LPAR, and start all of the Zowe components on the second LPAR. Because the desktop on the first LPAR is available to the gateway of the second LPAR, all desktop traffic is routed to the second LPAR.  

The caching services for each Zowe instance, whether on the same LPAR, or distributed across the sysplex, are connected to each other by the same shared VSAM data set. This arrangement allows state sharing so that each instance behaves similarly to the user irrespective of where their request is routed.  

To learn more about Zowe with high availability enablement, see [Configuring Sysplex for high availability](../configure-sysplex.md).

## API Versioning

Service instances provide one or more different API versions. One important assumption is that one service instance does not provide two versions with the same major version. No assumptions are made regarding which versions are provided and how. As such, an instance can provide only one version and that another version is provided by a different instance, and other services can have instances that provide multiple versions.

The API user specifies only the major version in the URI. The API Catalog needs to differentiate between different _full versions_ internally and be able to return a specific full version or return documentation for the highest version of the specified major version that is supported by all running services.

### Guidelines

- The version of the API is not dependent on the product release.

- Two last versions are supported.

 - **Major version**  
 This version is specified by the user of the API in the URI, and increased only when a backward incompatible change is introduced. This circumstance is rare because the REST APIs should be designed to allow extensibility.

 - **Minor version**  
 This version is not specified in the URI but the user should know what is it. It is important to display the correct level of documentation. The minor version is increased when the API is extended with a new feature (if you use a new resource available in v1.2, the request fails on v1.1). If there are multiple instances of the services that have different minor versions, the service together will state that the lowest minor version is available.
 
 **Example:**
 
 Instance A provide v1.3 and v2.2. Instance B was not yet upgraded and provides v1.2 and v2.1. Subsequently, the service provides v1.2 and v2.1.

 - **Patch version**  
 The Patch version is not specified in the URI and does not indicate a difference in the API. A patch version is used only when the API documentation is patched or a bug was fixed with no change in the API.

 ![API Versioning](../../images/api-mediation/API-Versioning.png)
