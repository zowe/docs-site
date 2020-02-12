# Onboarding Overview

## Overview of APIs

Before identifying the API you want to expose in the Zowe&trade; API Mediation Layer, it is useful to consider the structure of APIs. An application programming interface (API) is a set of rules that allow programs to talk to each other. A developer creates an API on a server and allows a client to talk to the API. Representational State Transfer (REST) determines the look of an API and is a set of rules that developers follow when creating an API. One of these rules states that a user should be able to get a piece of data (resource) through URL endpoints using HTTP. These resources are usually represented in the form of JSON or XML documents. The preferred documentation type in Zowe&trade; is in JSON format.

A REST API service can provide one or more REST APIs and usually provides the latest version of each API. A REST service is hosted on a web server which can host one or more services, often referred to as _applications_. A web server that hosts multiple services  or applications is referred to as a _web application server_. Examples of _web application servers_ are [Apache Tomcat](http://tomcat.apache.org/) or [WebSphere Liberty](https://developer.ibm.com/wasdev/websphere-liberty/). 

**Note:** The  Zowe&trade; API Mediation Layer follows the [OpenAPI specification](https://swagger.io/specification/). 
Each API has its own title, description, and version (using [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html)).

## REST API Onboarding Enabler Guides

Services that can be updated to support the API Mediation Layer natively by updating the service code. Use the following REST API onboarding enabler guides to onboard your REST service to the Zowe API Mediation Layer when you use enabler versions 1.3 and higher:
- [Onboard a REST API service with the Plain Java Enabler (PJE)](api-mediation-onboard-an-existing-java-rest-api-service_plain-java-enabler.md)
- [Onboard a Spring Boot based REST API Service](api-mediation-onboarding-with-spring-boot-enabler.md)

Use the following REST API onboarding enabler guides to onboard your REST service to the API Mediation Layer when you use enabler versions 1.2 and lower:

- [Onboard a Java REST APIs with Spring Boot](api-mediation-onboard-a-spring-boot-rest-api-service.md)
- [Onboard a Java REST API service without Spring Boot](api-mediation-onboard-an-existing-java-rest-api-service-without-spring-boot-with-zowe-api-mediation-layer.md)

**Tip:** We recommend you use the enabler version 1.3 and higher to onboard your REST API service with the Zowe&trade; API Medaition Layer. Future fixes will not be published for enablers using version 1.2 and lower. 

To onboard a REST API service to the Zowe&trade; API Mediation Layer without changing the code of the API service (non-natively), follow the steps in the onboarding guide to [Onboard a REST API without code changes required](api-mediation-onboard-an-existing-rest-api-service-without-code-changes.md) (static onboarding).  

**Tip:** When developing a new service, we recommend that you update the code to support the API Mediation Layer natively. Use the previously listed onboarding guides for services that can be updated to support the API Mediation Layer natively. The benefit of supporting the API Mediation Layer natively is that it requires less configuration for the system administrator. Such service can be moved to different systems, can be listened to on a different port, or additional instances can be started without the need to change  configuration of the API Mediation Layer.

## Service Relationship Diagram
The following diagram shows the relations between various types of services, their APIs, REST API endpoints, and the API Gateway:

![REST API Components](../../user-guide/api-mediation/diagrams/rest-api-components.svg)


## Sample REST API Service

In microservice architecture, a web server usually provides a single service. A typical example of a single service implementation is a Spring Boot web application. 

To demonstrate the concepts that apply to REST API services, we use an  [example of a Spring Boot REST API service](https://github.com/swagger-api/swagger-samples/tree/master/java/java-spring-boot). This example is used in the REST API onboarding guide [REST APIs without code changes required](api-mediation-onboard-an-existing-rest-api-service-without-code-changes.md) (static onboarding).  

You can build this service using instructions in the source code of the [Spring Boot REST API service example](https://github.com/swagger-api/swagger-samples/blob/master/java/java-spring-boot/README.md).

The Sample REST API Service has a base URL. When you start this service on your computer, the _service base URL_ is: `http://localhost:8080`. 

**Note:** If a service is deployed to a web application server, the base URL of the service (application) has the following format: `https://application-server-hostname:port/application-name`.

This sample service provides one API that has the base path `/v2`, which is represented in the base URL of the API as `http://localhost:8080/v2`. In this base URL, `/v2` is a qualifier of the base path that was chosen by the developer of this API. Each API has a base path depending on the particular implementation of the service. 

This sample API has only one single endpoint:

- `/pets/{id}` - *Find pet by ID*. 

This endpoint in the sample service returns information about a pet when the `{id}` is between 0 and 10. If `{id}` is greater than 0 or a non-integer, an error is returned. These are conditions set in the sample service.

**Tip:** Access http://localhost:8080/v2/pets/1 to see what this REST API endpoint does. You should get the following response:

```json
{
    "category": {
        "id": 2,
        "name": "Cats"
    },
    "id": 1,
    "name": "Cat 1",
    "photoUrls": [
        "url1",
        "url2"
    ],
    "status": "available",
    "tags": [
        {
            "id": 1,
            "name": "tag1"
        },
        {
            "id": 2,
            "name": "tag2"
        }
    ]
}
```

**Note:** The onboarding guides demonstrate how to add the Sample REST API Service to the API Mediation Layer to make the service available through the `petstore` service ID.

The following diagram shows the relations between the Sample REST API Service and its corresponding API, REST API endpoint, and API Gateway:

![Sample REST API Components](../../user-guide/api-mediation/diagrams/rest-api-components-sample.svg)

This sample service provides a Swagger document in JSON format at the following URL:

 ```
 http://localhost:8080/v2/swagger.json
 ```

The Swagger document is used by the API Catalog to display API documentation.




