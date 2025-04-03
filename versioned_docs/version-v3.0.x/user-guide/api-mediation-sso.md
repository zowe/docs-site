# Zowe API Mediation Layer Single Sign On Overview

You can extend Zowe and utilize Zowe Single Sign On (SSO) provided by Zowe API Mediation Layer (API ML) to enhance system security and improve the user experience. 

:::info Required roles: system administrator, security administrator
:::

This article provides an overview of the API ML single sign on feature, the principle participants in the SSO process, and links to detailed Zowe SSO documentation. Zowe Single Sign On is based on single-user authentication which produces an access token that represents the user in communication with z/OS services accessible through the API Mediation Layer. The access token is issued by the Zowe Authentication and Authorization Service (ZAAS), which is part of API ML. ZAAS issues an access token based on valid z/OS credentials. This token can be validated by any component participating in SSO. 

:::note
Currently, API ML can provide SSO only in a single security domain.
:::

- [Zowe API Mediation Layer Single Sign On Overview](#zowe-api-mediation-layer-single-sign-on-overview)
    - [Zowe API ML client](#zowe-api-ml-client)
    - [API service accessed via Zowe API ML](#api-service-accessed-via-zowe-api-ml)
    - [Existing services that cannot be modified](#existing-services-that-cannot-be-modified)
  - [Further resources](#further-resources)

The following diagram describes the interactions between the general participants in the single sign on process. 

<img src={require("../images/api-mediation/sso-diagram.jpeg").default} alt="Zowe SSO Explanation" width="700"/>

There are two main types of components that participate in Zowe SSO through API ML:

* Zowe API ML client

   - This type of component is user-facing and can obtain user credentials through a user interface (web, CLI, desktop).
   - A Zowe API ML client calls API services through the API ML.
   - An example of such clients are Zowe CLI or Zowe Desktop. 

* API service accessed via Zowe API ML

   - A service that is registered to API ML and is accessed through the API ML Gateway.
   - Services are protected by an access token or PassTicket.
   - The access token or PassTicket can be validated by the called API service.

The following sections describe what is necessary to utilize SSO for both types of components.

### Zowe API ML client

* The Zowe API ML client needs to obtain an access token via the `/login` endpoint of ZAAS by providing z/OS credentials.
* A client can call the ZAAS `/query` endpoint to validate the token and get information from the token. This is useful when the API client has the token but does not store the associated data such as the user ID.
* The API client needs to provide the access token to API services in the form of a Secure HttpOnly cookie with the name `apimlAuthenticationToken`, or in the `Authorization: Bearer` HTTP header as described in [Authenticated Request](https://github.com/zowe/sample-spring-boot-api-service/blob/master/zowe-rest-api-sample-spring/docs/api-client-authentication.md#authenticated-request).

### API service accessed via Zowe API ML

This section describes the requirements that an API service needs to satisfy to adopt a Zowe SSO access token. 

* The token received by the API ML Gateway is first validated and then may be passed directly to the service. Alternatively, the API ML Gateway can exchange the token for a PassTicket if the API service is configured to expect a PassTicket.
* The API service should validate the token. It can use ZAAS Client or directly call the `query` endpoint.
* The API service can extract information about the user ID by calling the ZAAS `/query` endpoint. 
* The alternative is to validate the signature of the JWT token using the public key of the token issuer (e.g. the API ML Gateway). The API service needs to have the API ML Gateway certificate along with the full CA certification chain in the API service truststore. 

:::note
The REST API of ZAAS can easily be called from a Java application using the [ZAAS Client](../extend/extend-apiml/zaas-client.md).
:::

### Existing services that cannot be modified

If you have a service that cannot be changed to adopt the Zowe authentication token, the service can utilize Zowe SSO if the API service is able to handle PassTickets. 

For more information, see [Enabling single sign on for extending services via PassTicket configuration](./api-mediation/configuration-extender-passtickets.md).

## Further resources

* [User guide for SSO in Zowe CLI](./cli-using-integrating-apiml.md#accessing-multiple-services-with-sso)
* [System requirements for using web tokens for SSO in Zlux and ZSS](./systemrequirements.md)


