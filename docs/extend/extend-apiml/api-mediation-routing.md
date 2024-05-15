# API Mediation Layer Routing Documentation

## Overview

The API Mediation Layer (APIML) in Zowe acts as a Level 7 Load Balancer, using the API Gateway to route requests to backend 
services. It supports both single and multiple API ML instances.

![Services Diagram](../../images/api-mediation/RoutingNorthboundSouthbound.png "Example services diagram")
<!--Add description of diagram.  Would "request job" and "request dataset" be more accurate?-->

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
<!-- Does routing for single instances use Eureka metadata? -->
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
<!-- Describe what is being configured in this yaml example.-->

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
<!-- I would suggest moving the Advanced Configuration and Troubleshooting sections to the end after the diagrams that show the various GET call scenarios -->

### Advanced Configuration

Advanced routing configurations can include custom load balancing rules, fallback options, and route-specific policies. Refer to the detailed configuration guide for more advanced settings and examples.

### Troubleshooting

- Common Issues: Misconfigured metadata, incorrect service IDs, and network issues.
- Debugging Tips: Check Eureka registration details, API Gateway logs, and network connectivity.

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

### Single API Mediation Layer Instance
<!-- I don't think this title is very clear. It seems tht what is initially being described is making a GET call for a single instance with one or more versions. Perhaps this descriptive section should be entitled, "Description of a GET call with single and multiple versions and instances". -->

A service can be deployed with one instance or with multiple instances. The service exposes APIs which may also be versioned. The following diagrams show the component relationships for single and multiple instances with single and multiple API service versions.

#### GET call to a single instance of a service
<!-- I would suggest the title, "Making a GET call to a single instance of API ML". -->

When there is one instance of the API Mediation Layer in the system, the API ML is expected to be the entry point to the system. The following diagrams show the process of making a GET call to a service available on a single instance. <!-- Please check for accuracy -->

##### A GET call to a service with a single version on a single instance 
<!-- We should include a statement describing the diagram, perhaps something like, "The following diagram shows the process in a GET call to a service with a single version available through z/OSMF:" -->

![Single instance](../../images/api-mediation/SimpleRouting.png "Simple Routing")

<!-- Maybe "Transform authentication" could be "JWT to PassTicket transformation" -->

##### A GET call to a service with multiple versions on a single instance

<!-- We should include a statement describing the diagram, perhaps something like, "The following diagram shows the process in a GET call to a service with multiple versions available through z/OSMF:" --> 

![Multiple versions](../../images/api-mediation/RoutingVersioned.png "Versioned Routing")

#### GET calls to multiple instances of a service
The following diagrams show the process of making a GET call through DVIPA when services are available across multiple instances, and when multiple versions of a service are available. <!-- Please check for accuracy -->

![Multiple Instances](../../images/api-mediation/RoutingMultipleInstancesSysplex.png "Multiple Instances")
<!-- Should there be an arrow between DVIPA and LPAR2? What is the connection between LPAR1 and LPAR2?-->
### Multiple API Mediation Layer Instances

The following diagram shows the High Availability setup for API Mediation Layer, where the L5 load balancer is used in front of the API Gateway. 

#### Same LPAR Multiple API Mediation Layer Instances
<!-- I hink we need some brief explanation about what DVIPA is/does and an examle of LPAR routing. I think we should show an example of the routing in the yaml code rather than in the diagram. It's confusing to read this on diagonal lines in a diagram.-->

![Same LPAR Multiple API Mediation Layer Instances](../../images/api-mediation/RoutingSysplexSameLpar.png "Same LPAR Multiple API Mediation Layer Instances")

#### Different LPAR Multiple API Mediation Layer Instances

![Different LPAR Multiple API Mediation Layer Instances](../../images/api-mediation/RoutingSysplexDifferentLpar.png "Different LPAR Multiple API Mediation Layer Instances")