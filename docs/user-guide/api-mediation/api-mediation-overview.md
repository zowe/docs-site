# API Mediation Layer

The API Mediation Layer provides a single point of access for mainframe service REST APIs. The layer offers enterprise, cloud-like features such as high-availability, scalability, dynamic API discovery, consistent security, a single sign-on experience, and documentation. The API Mediation Layer facilitates secure communication across loosely coupled microservices through the API Gateway. The API Mediation Layer consists of three components: the Gateway, the Discovery Service, and the Catalog. The Gateway provides secure communication across loosely coupled API services. The Discovery Service enables you to determine the location and status of service instances running inside the API ML ecosystem. The Catalog provides an easy-to-use interface to view all discovered services, their associated APIs, and Swagger documentation in a user-friendly manner. 

## Key features  
* Consistent Access: API routing and standardization of API service URLs through the Gateway component provides users with a consistent way to access mainframe APIs at a predefined address.
* Dynamic Discovery: The Discovery Service automatically determines the location and status of API services.
* High-Availability: API Mediation Layer is designed with high-availability of services and scalability in mind.
* Redundancy and Scalability: API service throughput is easily increased by starting multiple API service instances without the need to change configuration.
* Presentation of Services: The API Catalog component provides easy access to discovered API services and their associated documentation in a user-friendly manner. Access to the contents of the API Catalog is controlled through a z/OS security facility. 
* Encrypted Communication: API ML facilitates secure and trusted communication across both internal components and discovered API services.

## API Mediation Layer architecture 
The following diagram illustrates the single point of access through the Gateway, and the interactions between API ML components and services:

![API Mediation Layer Architecture diagram](diagrams/image2018-2-26%20 14_53_46.png)

## Components
The API Layer consists of the following key components:

### API Gateway
The microservices that are contained within the ecosystem are located behind a reverse proxy. Clients interact with the gateway layer (reverse proxy). This layer forwards API requests to the appropriate corresponding service through the microservice endpoint UI. The gateway is built using Netflix Zuul and Spring Boot technology.

### Discovery Service
The Discovery service is the central point in the API Gateway infrastructure that accepts "announcements of REST services" and serves as a repository of active services. Back-end microservices register with this service either directly by using a Eureka client. Non-Spring Boot applications register with the Discover Service indirectly through a Sidecar. The Discovery Service is built on Eureka and Spring Boot technology.

### API Catalog
The API Catalog is the catalog of published APIs and their associated documentation that are discoverable or can be available if provisioned from the service catalog. The API documentation is visualized using the Swagger UI. The API Catalog contains APIs of services available as product versions. A service can be implemented by one or more service instances, which provide exactly the same service for high-availability or scalability. 

## Onboarding APIs
The most important part of the ecosystem are the real API services that provide useful APIs. Use the following topics to understand what options you have for adding new APIs to the Mediation Layer:

* [Onboarding Overview](../../extend/extend-apiml/api-mediation-onboard-overview.md)
