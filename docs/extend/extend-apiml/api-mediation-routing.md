# API Mediation Layer Routing Documentation

## Overview

The API Mediation Layer (APIML) in Zowe acts as a Level 7 Load Balancer, using the API Gateway to route requests to backend 
services. It supports both single and multiple API ML instances.

The diagram showing the request for specific job from customer and the services involved in the delivery of the request.

![Services Diagram](../../images/api-mediation/RoutingNorthboundSouthbound.png "Example services diagram")

**Key Concepts**
- Service ID: Unique identifier for each service.
- Instance Routing: Routes requests based on service instances.
- Versioning: Supports routing to specific service versions.

**Basic Routing**

In basic routing, requests are routed using the service ID and optionally, the service version:

- Example: https://gateway-url/api/v1/service-id

**Routing Mechanism**
Routing can be configured for either single or multiple API ML instance.

* **Single APIML Instance**  
Routes directly to the service based on service ID.
<!-- Does routing for single instances use Eureka metadata? --> - Yes it does
* **Multiple APIML Instances**  
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

This part of the metadata configuration of the service defines how the request coming from the northbound service will be
accepted adn then passed to the southbound service.

If the southbound service will have contextPath zosmf: 
- the request `https://apiml/ui/v1/desktop` from the user will be translated to `https://service/zosmf/desktop`
- the request `https://apiml/api/v1/desktop` from the user will be translated to `https://service/zosmf/api/v1/desktop`
- the request `https://apiml/ws/v1/desktop` from the user will be translated to `https://service/zosmf/ws/desktop`

**Instance Routing**  
API ML supports routing to multiple instances of the same service, thereby distributing requests based on load balancing policies. Ensure each service instance registers with a unique instance ID in Eureka.

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

- Single instance of the API Mediation Layer with one or more instances of the services onboarded
- Multiple instances of the API Mediation Layer in High Availability setup with one or more instances of the services onboarded

The onboarded services may be onboarded in one or more instances and the APIs that they provide may be versioned. API 
Mediation Layer supports distinction on the major version boundary. 

### Make a GET call to a service through single instance of API Mediation Layer

When there is one instance of the API Mediation Layer in the system, the API ML is expected to be the entry point to the 
system. The following diagrams show the process of making a GET call to a service available on a single instance. 

#### A GET call to a service with a single version on a single instance 

The following diagram show the flow of the request through different involved components for GET request to the z/OSMF 
service deployed on one LPAR with one instance. The z/OSMF in this case doesn't version the API. 

![Single instance](../../images/api-mediation/SimpleRouting.png "Simple Routing")

<!-- Maybe "Transform authentication" could be "JWT to PassTicket transformation" -->
<!-- To do that, we would need to show all the examples or at least many. I would rather keep it simple as this isn't the key part for the diagram. -->

#### A GET call to a service with multiple versions on a single instance

The following diagram show the flow of the request through different involved components for GET request to the z/OSMF
service deployed on one LPAR with one instance. The z/OSMF in this case versions API and the request is intended for specific 
major version.  

![Multiple versions](../../images/api-mediation/RoutingVersioned.png "Versioned Routing")

#### GET calls to multiple instances of a service

The following diagram show the flow of the request through different involved components for GET request to the z/OSMF
service deployed on one LPAR with multiple instances. The z/OSMF in this case versions API and the request is intended 
for specific major version.

![Multiple Instances](../../images/api-mediation/RoutingOneLparMultipleInstances.png "Multiple Instances")

### Make a GET call to a service through multiple API Mediation Layer Instances

When there are multiple API Mediation Layer Instances in the system, the DVIPA is expected as the load balancer 
distributing the requests to the API Mediation Layer Instances and then the API Mediation Layer distributes the requests
to the running instances of the specific service. The following diagrams show how the flow of single request can look
like. 

#### Same LPAR Multiple API Mediation Layer Instances
<!-- I hink we need some brief explanation about what DVIPA is/does and an examle of LPAR routing. I think we should show an example of the routing in the yaml code rather than in the diagram. It's confusing to read this on diagonal lines in a diagram.-->
<!-- DVIPA information is above now. The specific text doesn't matter, this is about showing the topology of the system and flow. -->

The following diagram show the flow of the request through different involved components for GET request to the z/OSMF
service deployed on multiple LPARs with multiple instances on one and one instance on another. The z/OSMF in this case
versions API and the request is intended for specific major version. DVIPA randomly selects one of the available
API Mediation Layer instances, which then selects randomly one of the available service instances in this case on the same LPAR. 

![Same LPAR Multiple API Mediation Layer Instances](../../images/api-mediation/RoutingSysplexSameLpar.png "Same LPAR Multiple API Mediation Layer Instances")

#### Different LPAR Multiple API Mediation Layer Instances

The following diagram show the flow of the request through different involved components for GET request to the z/OSMF
service deployed on multiple LPARs with multiple instances on one and one instance on another. The z/OSMF in this case 
versions API and the request is intended for specific major version. DVIPA randomly selects one of the available 
API Mediation Layer instances, which then selects randomly one of the available service instances regardless whether the 
instance resides on the same LPAR. In this case the selected instance is on another LPAR. 


![Different LPAR Multiple API Mediation Layer Instances](../../images/api-mediation/RoutingSysplexDifferentLpar.png "Different LPAR Multiple API Mediation Layer Instances")

## Advanced Configuration

Advanced routing configurations can include custom load balancing rules, fallback options, and route-specific policies. 
Refer to the detailed configuration guide for more advanced settings and examples.

By default, the routing through the API Mediation Layer selects the instance to route to in Round-robin fashion for each
specific request. It's possible to change this behavior to stick the specific user to a specific instance or to change 
the behavior by providing the option to go to a specific instance of a service. 

## Troubleshooting

<!-- TODO: Add more details or link to the correct places. -->

- Common Issues: Misconfigured metadata, incorrect service IDs, and network issues.
- Debugging Tips: Check Eureka registration details, API Gateway logs, and network connectivity.