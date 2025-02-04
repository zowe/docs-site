# Using API Mediation Layer

There are numerous ways you can use the API Mediation Layer. Review this topic and its child pages to learn more about the various ways to use the API Mediation Layer.  
For information about the API versioning, see [API Catalog and Versioning](../../extend/extend-apiml/api-mediation-versioning.md).

**Tip:** 
For testing purposes, it is not necessary to set up certificates when configuring the API Mediation Layer. You can configure Zowe without certificate setup and run Zowe with `verify_certificates: DISABLED`.  

For production environments, certificates are required. Ensure that certificates for each of the following services are issued by the Certificate Authority (CA) and that all keyrings contain the public part of the certificate for the relevant CA.  

* z/OSMF
* Zowe
* The service that is onboarding to Zowe

## API Mediation Layer Use Cases

There are two primary use cases for using the API ML:

* To access APIs which have already been onboarded to the Mediation Layer via the API Catalog, and leverage their associated Swagger documentation and code snippets. 
* To onboard a REST API service to the API ML to contribute to the Zowe community.

See the following topics for detailed information about how to use the API Mediation Layer:  

### Using Single Sign On (SSO)

Three authentication methods can be used with single sign on:

* [Authenticating with a JWT token](../authenticating-with-jwt-token.md)
* [Authenticating with client certificates](../authenticating-with-client-certificates.md)
* [Authenticating with a Personal Access Token](./authenticating-with-personal-access-token.md)

### Using multi-factor authentication

User identity verification can be performed by using multi-factor authentication. For more information, see [Using multi-factor authentication (MFA)](./using-multi-factor-authentication.md).

### API Routing

Various routing options can be used for APIs when using API Mediation Layer:

* [Routing requests to REST APIs](./routing-requests-to-rest-apis.md)
* [Routing with WebSickets](../routing-with-websockets.md)
* [Using GraphQL APIs](use-graphql-api.md)
* [MultiTenancy Configuration](./api-mediation-multi-tenancy.md)

### Learning more about APIs 

API Mediation Layer makes it possible to view API information is a variety of ways:

* [Obtaining information about API Services](../obtaining-information-about-api-services.md)
* [Using Swagger "Try it out" in the API Catalog](../api-mediation-swagger-try-it-out.md)
* [Using Swagger Code Snippets in the API Catalog](../api-mediation-swagger-code-snippets.md)

### Administrating APIs

* [Using Static API services refresh in the API Catalog](../api-mediation-static-api-refresh.md)
* [Onboarding a REST API service with the YAML Wizard](../onboard-wizard.md)

### Using the Caching Service

As an API developer, you can use the Caching Service as a storage solution to enable resource sharing between service instances, thereby ensuring High Availability of services. For details, see [Using the Caching service](./api-mediation-caching-service.md).

### Using API Catalog

There are various options for using the API Catalog:

* [Viewing Service Information abd API Documentation in the API Catalog](../api-mediation-view-service-information-and-api-doc.md)
* [Changing an expired password via API Catalog](../api-mediation-change-password-via-catalog.md)

### Additional use case when usig API Mediation Layer

* [SMF records](./api-mediation-smf.md)

