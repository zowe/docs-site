# API Mediation Layer routing

`Service` - A service provides one or more APIs. A service is identified by its service ID (sometimes the term service name is used in the same meaning). 
The default service ID is provided by service developer in the service configuration file. 
The service ID can be replaced with deployment environment specific name by the system administrator using additional configuration external to the service deployment unit (most often a jar or war file). 
Services are deployed using one or more service instances, which share the same service ID and implementation.

`URI (Uniform Resource Identifier)` is a string of characters used to identify a resource. The same URI should always go to the same resource without any need to other information (e.g. HTTP headers).

### APIML Basic Routing (Service ID and version-based)

Basic routing is based on the service ID that is used to identify the service. The specific instance is selected by the API gateway. The response needs to be the same for all instances. This is the type of routing that is expected by Eureka and Zuul.

The URI identifies the resource. It does not identify uniquely the instance of the same service in the case when there multiple instances that are providing the same service (i.e. service is running in HA mode). 
Services of the same product that are providing different resources (e.g. SYSVIEW on one system and SYSVIEW in a different sysplex) cannot have the same service ID (the same URI cannot have two different meanings). 

In addition to the basic Zuul routing, the Zowe API Gateway adds support for versioning where a major version can be specified. 
The gateway routes request only to an instance that provide the specified major version of the API. 
The `/api/` prefix is used for REST APIs. There is also `/ui/` prefix for web UIs and `/ws/` for WebSockets.

Additional routing can be implemented using a Zuul Pre-filter.

The URL format expected by the API Gateway is:

`https://{gatewayHost}:{port}/api/v{majorVersion}/{serviceId}/{resource}`

**Example: z/OSMF routes (without version)**

* z/OSMF direct URL: `https://ca32.ca.com:1443/zosmf/restjobs/1.0/...`
* Gateway URL: `https://ca3x.ca.com:10010/api/zosmfca32/restjobs/1.0/...`

<img src="../../images/api-mediation/Basic-Routing.png" alt="Zowe API Mediation basic routing"/> 


#### Implementation Details

The service instances provide information about routing to the API gateway via the Eureka metadata.


    metadata-map:
        apiml:
            routes:
                uiv1:
                    gateway-url: "ui/v1"
                    service-url: "/helloworld"
                apiv1:
                    gateway-url: "api/v1"
                    service-url: "/helloworld/v1"
                apiv2:
                    gateway-url: "api/v2"
                    service-url: "/helloworld/v2"

In this case, we have a service (service ID is `helloworldservice` - it is not included in the routing metadata but in basic Eureka metadata) that exposes:

* `UI` - `https://gateway/ui/v1/helloworldservice` will be routed to the `https://hwServiceHost:port/helloworld/`
* `API major version 1` - `https://gateway/api/v1/helloworldservice` will be routed to `https://hwServiceHost:port/helloworld/v1`
* `API major version 2` - `https://gateway/api/v2/helloworldservice` will be routed to `https://hwServiceHost:port/helloworld/v2`

The gateway-url is matched against the prefix of the URL path used at the gateway `https://gateway/urlPath` where urlPath is `prefix/serviceId/resourcePath`. 
The service ID is used to find the service host and port. 
The service-url is used to prefix the resourcePath at the service host.

### Basic Routing (only service ID-based)

Same as the previous but the version part of the URL is not used. This is useful for services that handle their versioning themselves with different granularity.
An example of this is z/OSMF.
