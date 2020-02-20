# Onboarding Overview

## What can you expect from this guide

This guide shows how to onboard [sample service](#Sample-REST-API-Service) into Zowe. There are various ways how to achieve this, depending on the language your service is written in, or the choice of framework. The intent of this guide is to demonstrate various approaches you can take and explain the process in detail. At the end of the guide, you will:
- have the [sample service](#Sample-REST-API-Service) onboarded in Zowe
- be able to select and apply appropriate onboarding method for your service

## Prerequisites

- Running instance of Zowe
 
  Zowe instance with API Mediation Layer running is mandatory prerequisite for service to onboard into. You should be able to login to API Catalog to verify service's onboarding is successful.
  
  For [static onboarding](#//TODO), access to Zowe runtime is required, so the static service definition can be created.
  
- Certificate that is trusted by Zowe

  Zowe uses secured communication over TLSv1.2 so protocol version and use of certificate is required. The certificate needs to be trusted by Zowe so the service can register in Discovery service. More information about [API Mediation Layer security setup](api-mediation-security.md#certificate-management-in-zowe-api-mediation-layer)      

- Rest API enabled service that you want to onboard

  This can be arbitrary Rest API enabled service or you can use the [sample service](#Sample-REST-API-Service).
  
  Service should document it's Rest API by providing valid Swagger Json. This documentation is displayed in API Catalog. OpenApi 2.0/3.0 standards are supported.

- Access to Zowe artifactory

    ```
    Repository URL: https://zowe.jfrog.io/zowe/libs-release
    ```

- Gradle or Maven build system

    The guide is describing how to achieve it's objective using these tools.
  
## Service Onboarding Guides

Services can be updated to support the API Mediation Layer natively by updating the service code. Use the following guides to onboard your REST service to the Zowe API Mediation Layer:

### Recommended for services using Java

- [Onboard a REST API service with the Plain Java Enabler (PJE)](docs/extend/extend-apiml/onboard-plain-java-enabler.md)
- [Onboard a Spring Boot based REST API Service](docs/extend/extend-apiml/onboard-spring-boot-enabler.md)

### Other options

Use the following options If your service is not created in Java, you do not want to change your codebase or use the libraries above. 

- [Onboard a REST API using static definition without code changes](docs/extend/extend-apiml/onboard-static-definition.md)
- [Onboard a REST API directly calling Zowe Discovery Service](docs/extend/extend-apiml/onboard-direct-eureka-call.md)

### Legacy enablers

For legacy enabler documentation (version 1.2 and lower) please refer to the previous version of the documentation: 

- [Zowe Docs version 1.8.x](#https://docs.zowe.org/v1-8-x/extend/extend-apiml/api-mediation-onboard-overview)

**Tip:** We recommend you use the enabler version 1.3 and higher to onboard your REST API service to the Zowe&trade; API Medaition Layer. Future fixes will not be published for enablers using version 1.2 and lower. 

**Tip:** When developing a new service, we recommend that you update the code to support the API Mediation Layer natively. The benefit of supporting the API Mediation Layer natively is that it requires less configuration for the system administrator. Additionally, natively onboarded services can be moved to different systems, can be listened to on a different port, and additional instances can be started without the need to change API Mediation Layer configuration.

## Sample REST API Service

To demonstrate the concepts that apply to REST API services, we use an  [example of a Spring Boot REST API service](https://github.com/swagger-api/swagger-samples/tree/master/java/java-spring-boot). This example is used in the REST API onboarding guide [REST APIs without code changes required](docs/extend/extend-apiml/onboard-static-definition.md) (static onboarding).  

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




