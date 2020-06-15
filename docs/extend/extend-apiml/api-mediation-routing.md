# API Mediation Layer routing

As an application developer, route your service to ...
There are two ways to route to the API Mediation Layer:

* API ML Basic Routing (Service ID and version-based)
* Basic Routing (only service ID-based)

## Terminology

* **Service**

  A service provides one or more APIs. A service is identified by its service ID (sometimes the term service name is used in the same     meaning). 
  The default service ID is provided by service developer in the service configuration file. 
  The service ID can be replaced with deployment environment specific name by the system administrator using additional configuration     external to the service deployment unit (most often a jar or war file). 
  Services are deployed using one or more service instances, which share the same service ID and implementation.

* **URI (Uniform Resource Identifier)**

  A string of characters used to identify a resource. The same URI should always go to the same resource without any need to other         information (e.g. HTTP headers).

## APIML Basic Routing (Service ID and version-based)

Basic routing is based on the service ID that is used to identify the service. The specific instance is selected by the API Gateway. Identical response are required for all instances. Eureka and Zuul expect this type of routing.

The URI identifies the resource. It does not identify the instance of the same service as unique when multiple instances of the same service are provided, such as when the service is running in HA mode. 
Services of the same product that are providing different resources, such as SYSVIEW on one system and SYSVIEW in a different sysplex, cannot have the same service ID as the same URI cannot have two different meanings. 

In addition to the basic Zuul routing, the Zowe API Gateway adds support for versioning where a major version can be specified. 
The Gateway routes a request only to an instance that provides the specified major version of the API. 
The `/api/` prefix is used for REST APIs. The prefix `/ui/` prefix applies to web UIs and the prefix `/ws/` applies to WebSockets.

Additional routing can be implemented using a Zuul Pre-filter.

The URL format expected by the API Gateway is:

`https://{gatewayHost}:{port}/api/v{majorVersion}/{serviceId}/{resource}`

The following examples shows z/OSMF routes without a version.

**Examples:**

* `z/OSMF direct URL: `https://ca32.ca.com:1443/zosmf/restjobs/1.0/...`
* `Gateway URL: `https://ca3x.ca.com:10010/api/zosmfca32/restjobs/1.0/...`

The following diagram presents how basic routing works:
<img src="../../images/api-mediation/Basic-Routing.png" alt="Zowe API Mediation basic routing"/> 


### Implementation Details

The service instances provide information about routing to the API Gateway via the Eureka metadata.

**Example:**

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

In this case, we have a service with a service ID of `helloworldservice` that exposes:

* `UI` - `https://gateway/ui/v1/helloworldservice` routed to `https://hwServiceHost:port/helloworld/`
* `API major version 1` - `https://gateway/api/v1/helloworldservice` routed to `https://hwServiceHost:port/helloworld/v1`
* `API major version 2` - `https://gateway/api/v2/helloworldservice` routed to `https://hwServiceHost:port/helloworld/v2`

**Note:** This service ID is not included in the routing metadata but in the basic Eureka metadata. 

where:

* The gateway-url is matched against the prefix of the URL path used at the Gateway `https://gateway/urlPath` where urlPath is `prefix/serviceId/resourcePath`. 
* The service ID is used to find the service host and port. 
* The service-url is used to prefix the resourcePath at the service host.

## Basic Routing (only service ID-based)

This method of routing is the same as the previous method but does not use the version part of the URL. This is useful for services that handle their versioning themselves with different granularity.
An example of this is z/OSMF.

**Example?**

