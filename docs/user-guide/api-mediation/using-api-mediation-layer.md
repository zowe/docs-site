# Using API Mediation Layer

There are various ways you can use the API Mediation Layer. The two primary use cases for using the API ML are to onboard a REST API service to the API ML to contribute to the Zowe community, and to access APIs, their associated Swagger documentation and code snippets of APIs which have already been onboarded to the Mediation Layer via the API Catalog. See the following topics for detailed information about how to use the API Mediaiton Layer:  

* Onboarding via Wizard
* Ways to use API ML via API ML Catalog:  

    * View Service Information and API Documentation
    * Swagger "Try It Out" functionality
    * Swagger Code Snippets functionality
    * Static APIs refresh functionality
    * Change password via API Catalog functionality

**Tip:** 
For testing purposes, it is not necessary to set up certificates when configuring the API Mediation Layer. You can configure Zowe without certificate setup and run Zowe with `verify_certificates: DISABLED`.  

For production environments, certificates are required. Ensure that certificates for each of the following services are issued by the Certificate Authority (CA) and that all keyrings contain the public part of the certificate for the relevant CA.  

* z/OSMF
* Zowe
* The service that is onboarding to Zowe

