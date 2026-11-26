# API ML Routing Overview

The API Mediation Layer (API ML) in Zowe acts as a Level 7 Load Balancer, using the API Gateway to route requests to backend 
services. The routing feature supports both single and multiple API ML instances.

The following diagram shows a request for a specific job from a customer and the services involved in the delivery of the request.

![Services Diagram](../../images/api-mediation/job_request_diagram.png "Example services diagram")

**Key Concepts**
- **Service**

  A service provides one or more APIs and is identified by a service ID. Note that sometimes the term "service name" refers to the service ID.

  The default service ID is provided by the service developer in the service configuration file.

  A system administrator can replace the service ID with a specific name of the deployment environment using additional configuration that is external to the service deployment unit. Typically, this name is configured in a JAR or WAR file. 
  Ensure that you detail how to specify the name in your service documentation. 

  Services are deployed using one or more service instances, which share the same service ID and implementation.

- **Instance**  
  Refers to the instance of a specific service providing one or more APIs
- **Service ID**  
  The unique identifier for each service
- **Instance Routing**  
  Routes requests based on service instances
- **Versioning**  
  Supports routing by the version segment in the API Gateway path, for example `/api/v1`.

## Basic Routing

In basic routing, requests are routed using the service ID and the API Gateway path:

**Example:** `https://gateway-url/{serviceId}/{gatewayUrl}` 

:::note
`{gatewayUrl}` is an API Gateway path such as `api/v1`.
:::

**Routing Mechanism**
Routing can be configured for either single or multiple API ML instances

* **Single API ML Instance**  
Uses Eureka metadata for direct routing to a service based on the service ID

* **Multiple API ML Instances**  
Uses Eureka metadata for service discovery and load balancing

**Implementation Details**  
Routing configuration is defined in service routes, which are registered as Eureka metadata.
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

This part of the service metadata configuration defines how the request coming from the upstream (northbound) service will be
accepted and then passed to the downstream (southbound) service.

The following shows service URL tansformations if the downstream (southbound) service has the contextPath zosmf: 
- The request `https://apiml/zosmf/ui/v1/desktop` from the user is transformed to `https://service/zosmf/desktop`
- The request `https://apiml/zosmf/api/v1/desktop` from the user is transformed to `https://service/zosmf/api/v1/desktop`
- The request `https://apiml/zosmf/ws/v1/desktop` from the user is transformed to `https://service/zosmf/ws/desktop`

**Instance Routing**  
API ML supports routing to multiple instances of the same service, thereby distributing requests based on load balancing policies. By default, the service is routed using the basic round robin schema. Sticky session routing is managed by the API ML cache. Ensure each service instance registers with a unique instance ID in Eureka. For more information, see [Customizing metadata](custom-metadata.md).

**Versioning**  
API ML uses path-based routing to provide flexibility in deploying and updating services without affecting existing clients.

**Example Usage**  
The version is part of the path and is matched by the route's `gatewayUrl` (for example, `api/v1` or `api/v2`). Routes are matched on the base path `/{serviceId}/{gatewayUrl}`. To make several major versions available, define a route for each version.
```http
https://gateway-url/service-id/api/v1/resource
https://gateway-url/service-id/api/v2/resource
```

Note that the `?version=` query parameter has no effect. If you used it in API ML v2, replace it with the path-based route.

## Deployments

Deployment can be for single or multiple instances.

- **A single instance** of the API Mediation Layer with one or more instances of the services onboarded
- **Multiple instances** of the API Mediation Layer in High Availability setup with one or more instances of the services onboarded

The onboarded services may be onboarded in one or more instances and the APIs that the services provide may be versioned. API Mediation Layer supports distinction on the major version boundary by path, as defined in the service routes. 

### Making a GET call to a service through single instance of API ML

When there is one instance of the API Mediation Layer in the system, the API ML is expected to be the entry point to the system. The following diagrams show the process of making a `GET` call to a service available on a single instance. 

#### A GET call to a service with a single version on a single instance 

The following diagram shows the flow of a `GET` request through different involved components to the z/OSMF service deployed on one LPAR with one instance. z/OSMF in this case does not version the API. 

![Single instance](../../images/api-mediation/routing_diagram_1.png "Simple Routing")

#### A GET call to a service with multiple versions on a single instance

The following diagram shows the flow of a `GET` request through different involved components to the z/OSMF service deployed on one LPAR with one instance. In this case, z/OSMF versions the API and the request is intended for a specific major version.  

![Multiple versions](../../images/api-mediation/routing_diagram_2.png "Versioned Routing")

#### GET calls to multiple instances of a service

The following diagram shows the flow of a `GET` request through different involved components to the z/OSMF service deployed on one LPAR with multiple instances. In this case, z/OSMF versions the API and the request is intended for a specific major version.

![Multiple Instances](../../images/api-mediation/routing_diagram_3.png "Multiple Instances")

### A GET call to a service through multiple API Mediation Layer Instances

When there are multiple API Mediation Layer Instances in the system, DVIPA is expected as the load balancer which distributes requests to API Mediation Layer instances. API Mediation Layer subsequently distributes the requests to the running instances of the specific service. The following diagrams shows the flow of a single request. 

#### Same LPAR Multiple API Mediation Layer Instances

The following diagram shows the flow of the `GET` request through different involved components to the z/OSMF service deployed on multiple LPARs with multiple instances on one LPAR, and one instance on another LPAR. In this case, z/OSMF versions the API and the request is intended for a specific major version. DVIPA randomly selects one of the available API Mediation Layer instances, which then randomly selects one of the available service instances (in this case on the same LPAR). 

![Same LPAR Multiple API Mediation Layer Instances](../../images/api-mediation/routing_diagram_4.png "Same LPAR Multiple API Mediation Layer Instances")

#### Different LPAR Multiple API Mediation Layer Instances

The following diagram shows the flow of the `GET` request through different involved components to the z/OSMF service deployed on multiple LPARs with multiple instances on one LPAR, and one instance on another LPAR. In this case, z/OSMF versions the API and the request is intended for a specific major version. DVIPA randomly selects one of the available API Mediation Layer instances, which subsequently randomly selects one of the available service instances regardless whether the 
instance resides on the same LPAR. In this case the selected instance is on another LPAR. 


![Different LPAR Multiple API Mediation Layer Instances](../../images/api-mediation/routing_diagram_5.png "Different LPAR Multiple API Mediation Layer Instances")

## Advanced Configuration

Advanced routing configurations can include custom load balancing rules, fallback options, and route-specific policies. 
Refer to the detailed configuration guide for more advanced settings and examples.

By default, routing through the API Mediation Layer selects the instance to route to in Round-robin fashion for each
specific request. It is possible to change this behavior to assign a specific user to a specific instance or to change 
the behavior by providing the option to go to a specific instance of a service. This is a sticky session functionality based on the ID of the user. For more information on the `authentication` value of the `customMetadata.apiml.lb.type` parameter, see [Customizing metadata](custom-metadata.md). 

For details about how to route a client request to a specific instance using the `X-InstanceId` header, see [Retrieving a specific service within your environment](../../user-guide/api-mediation/configuration-access-specific-instance-of-service.md).
