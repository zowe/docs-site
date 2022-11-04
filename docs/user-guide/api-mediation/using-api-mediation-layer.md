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

*  **Ways to use API ML via API ML Catalog**  
    * [View Service Information and API Documentation](../api-mediation-view-service-information-and-api-doc.md)
    * [Swagger "Try It Out" functionality](../api-mediation-swagger-try-it-out.md)
    * [Swagger Code Snippets functionality](../api-mediation-swagger-code-snippets.md)
    * [Static APIs refresh functionality](../api-mediation-static-api-refresh.md)
    * [Change password via API Catalog functionality](../api-mediation-change-password-via-catalog.md) 
    * [Onboarding a REST API service with the YAML Wizard](../onboard-wizard.md)

* **Other features when using API ML**  
    * [Using Metrics Service (Technical Preview)](../api-mediation-metrics-service.md)
    * [API Mediation Layer Routing](../../extend/extend-apiml/api-mediation-routing.md)
    * [Obtaining Information about API Services](../../extend/extend-apiml/service-information.md)
    * [WebSocket support in API Gateway](../../extend/extend-apiml/websocket.md)


