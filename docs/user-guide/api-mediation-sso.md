# Using Zowe API ML Single Sign On 

You can extend Zowe and utilize Zowe Single Sign On (SSO) provided by Zowe API Mediation Layer (API ML) to enhance system security and improve the user experience. 

:::info Required roles: system administrator, security administrator
:::

Zowe Single Sign On (SSO) allows a user to authenticate once and access multiple z/OS services through API Mediation Layer. Upon authentication, ZAAS (Zowe Authentication and Authorization Service) issues an access token that represents the user's identity. This token can be reused across all services that participate in SSO, so the user does not need to re-enter credentials for each service.

In other words, after initial log-in with your mainframe credentials, Zowe gives you a token that is accepted by any service through the API Gateway which is used to verify your identity. 

:::note
Currently, API ML can provide SSO only in a single security domain.
:::

The following diagram illustrates the interactions between the general participants in the single sign on process. 

<img src={require("../images/api-mediation/sso-diagram.jpeg").default} alt="Zowe SSO Explanation" width="700"/>

There are two main types of components that participate in Zowe SSO through API ML:

* Zowe API ML client

   - This type of component is user-facing and can obtain user credentials through a user interface (web, CLI, desktop).
   - A Zowe API ML client calls API services through API ML.
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

If an API service cannot be modified to natively validate the Zowe JWT access token, it can still participate in Zowe SSO if authentication is possible via standard z/OS PassTickets. When a client presents a valid Zowe token, the API Gateway automatically generates a one-time PassTicket and passes the PassTicket to the downstream service in the HTTP Basic Authentication header.

Depending on the service you are connecting to, PassTicket configuration falls into one of two categories:

* **Core Subsystems (z/OSMF)**  
Starting in Zowe v3.4.0, when SAF is configured as your default authentication provider, API ML uses this PassTicket exchange mechanism to route core traffic to z/OSMF (`IZUDFLT`). This is a mandatory configuration requirement for standard Zowe installations.
For installation steps, see [Addressing z/OSMF PassTicket and authentication requirements](../user-guide/api-mediation/configuring-passtickets-for-zosmf-authentication.md).

* **Extending Services**  
If you are onboarding an existing, non-Zowe REST interface to API Mediation Layer that relies on PassTickets for mainframe authentication, you must configure a unique APPLID and session key profile. For extension steps, see
For more information, see [Enabling single sign on for extending services via PassTicket configuration](./api-mediation/configuration-extender-passtickets.md).

## Further resources

* [Accessing multiple services with SSO](./cli-using-integrating-apiml.md#accessing-multiple-services-with-sso)



