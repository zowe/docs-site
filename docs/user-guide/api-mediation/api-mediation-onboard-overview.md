# Onboarding Overview

## Overview of APIs

Before identifying the API you want to expose in the API Mediation Layer, it is useful to consider the structure of APIs. An API or application programming interface is a set of rules that allow programs to talk to each other. A developer creates an API on a server and allows a client to talk to the API. Representational State Transfer (REST) determines the look of an API. REST is a set of rules that developers follow when creating an API. One of these rules states that a user should be able to get a piece of data (called a resource) accessible through URL endpoints using HTTP. These resources are usually represented in the form of JSON or XML documents. The preferred documentation type in Zowe is JSON format.

A REST API service can provide one or more REST APIs and usually provides the latest version of each API. A REST service is hosted on a web server which can host one or more services. A service is sometimes called an _application_. A web server that hosts multiple services (applications) is referred to as a _web application server_. Examples of _web application servers_ are [Apache Tomcat](http://tomcat.apache.org/) or [WebSphere Liberty](https://developer.ibm.com/wasdev/websphere-liberty/). 

**Note:** Definitions used in this procedure follow the [OpenAPI specification](https://swagger.io/specification/). 
Each API has its own title, description, and version (versioned using [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

![REST API Components](diagrams/rest-api-components.svg)


## Sample REST API Service

In microservice architecture, a web server usually provides a single service. A typical example of a single service implementation is a Spring Boot web application. The following example of a simple REST API service demonstrates the use of the terms _application_, and _web application server_ and uses a Spring Boot web service: https://github.com/swagger-api/swagger-samples/tree/master/java/java-spring-boot.

You can build this service using instructions in the source code of that example (https://github.com/swagger-api/swagger-samples/blob/master/java/java-spring-boot/README.md) or you can use another existing service.

The sample service has a base URL. When you start this service on your computer, the _service base URL_ is: http://localhost:8080. 

**Note:** If a service is deployed to an application server, a base URL of such service (application) can be: `http://application-server-hostname:port/application-name.`

This service provides one API that has the base path `/v2`, which is represented in the base URL of the API as http://localhost:8080/v2.

This API provides only one endpoint:

- `/pets/{id}` - *Find pet by ID*. This endpoint returns a pet when 0 < ID <= 10. ID > 10 or when non-integers simulate API error conditions.

Access http://localhost:8080/v2/pets/1 to get the following response:

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

The onboarding guides demonstrate how to add the sample service to the API Mediation Layer in to make it available through the `petstore` service ID.

![Sample REST API Components](diagrams/rest-api-components-sample.svg)


## API Service Types

The process of onboarding depends on the method that is used to develop the API service.

While any REST API service can be added to the API Mediation Layer, this documentation focuses on following types:

- Services that can be updated to support the API Mediation natively by updating their code:
    - [REST API service implemented in Java using Spring Boot](api-mediation-onboard-an-existing-spring-boot-rest-api-service.md)
    - [REST API service implemented in Java using Jersey](api-mediation-onboard-an-existing-java-jersey-rest-api-service.md)
    - [REST API service implemented in Java with any REST API framework](api-mediation-onboard-an-existing-java-rest-api-service.md)
  
- [Services that needs to be added to the API Mediation Layer without code changes](api-mediation-onboard-an-existing-rest-api-service-without-code-changes.md)

If you develop a new service, we recommend that you update the code to support the API Mediation Layer natively. The benefit of supporting the API Mediation Layer natively is that it requires less configuration for the system administrator. Such service can be moved to different system, listen on different port, or additional instances can be started without the need to changed the configuration of the API Mediation Layer.
