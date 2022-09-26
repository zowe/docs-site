# Using API Mediation Layer

There are various ways you can use the API Mediation Layer. For more information see the following links to the specific topics:

* View Service Information and API Documentation
* Swagger "Try It Out" functionality
* Swagger Code Snippets functionality
* Static APIs refresh functionality
* Change password via API Catalog functionality
* Onboarding via Wizard

**Tip:** 
For testing purposes, it is not necessary to set up certificates when configuring the API Mediation Layer. You can configure Zowe without certificate setup and run Zowe with `verify_certificates: DISABLED`.  

For production environments, certificates are required. Ensure that certificates for each of the following services are issued by the Certificate Authority (CA) and that all keyrings contain the public part of the certificate for the relevant CA.  

* z/OSMF
* Zowe
* The service that is onboarding to Zowe