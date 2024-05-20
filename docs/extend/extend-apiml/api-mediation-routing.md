# API Mediation Layer Routing Documentation

## Overview

The API Mediation Layer (APIML) in Zowe acts as a Level 7 Load Balancer, using the API Gateway to route requests to backend 
services. It supports both single and multiple API ML instances.

The following diagram shows a request for a specific job from a customer and the services involved in the delivery of the request.

![Services Diagram](../../images/api-mediation/RoutingNorthboundSouthbound.png "Example services diagram")

**Key Concepts**
- Service ID: Unique identifier for each service.
- Instance Routing: Routes requests based on service instances.
- Versioning: Supports routing to specific service versions.

**Basic Routing**

In basic routing, requests are routed using the service ID, and optionally, the service version:

- **Example:** https://gateway-url/api/v1/service-id

**Routing Mechanism**
Routing can be configured for either a single or multiple API ML instances.

* **Single API ML Instance**  
Routes directly to the service based on the service ID as specified in the Eureka metadata.

* **Multiple API ML Instances**  
Uses Eureka metadata for service discovery and load balancing.

**Implementation Details**  
Routing configuration is defined in Eureka metadata.
Ensure proper setup for accurate routing. The following yaml file is an example of Eureka metadata configuration:

```yaml
apiml:
    service:                               
        routes:
            -   gateway-url: "ui/v1"
                service-url: ${apiml.service.contextPath}
            -   gateway-url: "api/v1"
                service-url: ${apiml.service.contextPath}/api/v1
            -   gateway-url: "ws/v1"
                service-url: ${apiml.service.contextPath}/ws
```

This part of the service configuration metadata defines how a request from an upstream (northbound) service is accepted and then passed to the downstream (southbound) service.

The following shows how URLs are translated if the downstream (southbound) service has the contextPath zosmf: 
- the request `https://apiml/ui/v1/desktop` from the user is translated to `https://service/zosmf/desktop`
- the request `https://apiml/api/v1/desktop` from the user is translated to `https://service/zosmf/api/v1/desktop`
- the request `https://apiml/ws/v1/desktop` from the user is translated to `https://service/zosmf/ws/desktop`

**Instance Routing**  
API ML supports routing to multiple instances of the same service, thereby distributing requests based on load balancing policies. Ensure that each service instance registers with a unique instance ID in Eureka.

**Versioning**  
API ML allows specifying the version of a service in the route. If a version is not specified, the latest version is used by default. Version specified routing provides flexibility in deploying and updating services without affecting existing clients.

**Example Usage**  
The following URL is an example of routing to a specific version of a service:

```http
https://gateway-url/api/v1/service-id?version=1.2
```

Note that if no version is specified, as in the following example, the request defaults to the latest service version:

```http
https://gateway-url/api/v1/service-id
```

## Terminology

* **Service**

  A service provides one or more APIs and is identified by a service ID. Note that sometimes the term "service name" is
  used to mean service ID.

  The default service ID is provided by the service developer in the service configuration file.

  A system administrator can replace the service ID with a specific name of the deployment environment using additional configuration that is external to the service deployment unit. Most often, this name is configured in a JAR or WAR file. 
  Ensure that you detail how to specify the name in your service documentation. 

  Services are deployed using one or more service instances, which share the same service ID and implementation.

* **Instance**

  Refers to the instance of a specific service providing one or more APIs.

## Deployments

- A single instance of the API Mediation Layer with one or more instances of the services onboarded
- Multiple instances of the API Mediation Layer in High Availability setup with one or more instances of the services onboarded

The onboarded services may be onboarded in one or more instances and the APIs that they provide may be versioned. API 
Mediation Layer supports distinction on the major version boundary. 

### GET call to a single instance of a service through single instance of API Mediation Layer

When there is one instance of the API Mediation Layer in the system, the API ML is expected to be the entry point to the system. The following diagrams show the process of making a `GET` call to a service available on a single instance. 

#### A GET call to a service with a single version on a single instance 

The following diagram shows the process in a `GET` call to a service with a single version available through z/OSMF:

![Single instance](../../images/api-mediation/SimpleRouting.png "Simple Routing")

#### A GET call to a service with multiple versions on a single instance

The following diagram shows the process in a `GET` call to a service with multiple versions available through z/OSMF: 

![Multiple versions](../../images/api-mediation/RoutingVersioned.png "Versioned Routing")

#### GET calls to multiple instances of a service
The following diagrams show the process of making a `GET` call through DVIPA when services are available across multiple instances, and when multiple versions of a service are available. 

![Multiple Instances](../../images/api-mediation/RoutingMultipleInstancesSysplex.png "Multiple Instances")
<!-- Should there be an arrow between DVIPA and LPAR2? What is the connection between LPAR1 and LPAR2?-->
### Multiple API Mediation Layer Instances

The following diagram shows the High Availability setup for API Mediation Layer, where the L5 load balancer is used in front of the API Gateway. 

#### Same LPAR Multiple API Mediation Layer Instances
<!-- I think we need some brief explanation about what DVIPA is/does and an examle of LPAR routing. I think we should show an example of the routing in the yaml code rather than in the diagram. It's confusing to read this on diagonal lines in a diagram.-->

![Same LPAR Multiple API Mediation Layer Instances](../../images/api-mediation/RoutingSysplexSameLpar.png "Same LPAR Multiple API Mediation Layer Instances")

#### Different LPAR Multiple API Mediation Layer Instances

![Different LPAR Multiple API Mediation Layer Instances](../../images/api-mediation/RoutingSysplexDifferentLpar.png "Different LPAR Multiple API Mediation Layer Instances")

### Advanced Configuration

Advanced routing configurations can include custom load balancing rules, fallback options, and route-specific policies. Refer to the detailed configuration guide for more advanced settings and examples.

### Troubleshooting

- **Common Issues:**
Misconfigured metadata, incorrect service IDs, and network issues.
- **Debugging Tips:**  
 Check Eureka registration details, API Gateway logs, and network connectivity.