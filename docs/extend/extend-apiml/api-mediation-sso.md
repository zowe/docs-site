# Utilizing Zowe API ML Single-Sign-On

As a contributer to Zowe, you can extend Zowe and utilize Zowe Single-Sign-On provided by Zowe API ML.

Zowe Single-Sign-On is based on a single authentication/identity token that identifies the z/OS user. This token needs to be trusted by extensions in order to be used. Only Zowe API ML and the ZAAS component can issue an authentication token based on valid z/OS credentials. This article describes the multiple [authentication methods](api-mediation-security.md#Supported-authentication-methods) you can use to obtain the token.
In the current release of Zowe, only a single z/OS security domain can be used. The current Zowe release also allows for a single technology scope, whereby only a single-sign-on to Zowe Desktop is possible. As such, a second sign-on method is necessary for clients, such as Zowe CLI, or web applications that are outside of Zowe Desktop.

This following section outlines the high-level steps necessary to achieve the sign-on. The following diagram shows high
level overview of the process. 

<img src="../../images/api-mediation/sso-diagram.jpeg" alt="Zowe SSO Explanation" width="700"/>

There are two main types of components that are used in Zowe SSO via API ML:

* Zowe API ML client

   - This type of component is user-facing and can obtain credentials from the user through a user interface (web, CLI, desktop)
   - The Zowe API ML client calls API services through the API ML
   - An example of such clients are Zowe CLI or Zowe Desktop. Clients can be web or mobile applications

* An API service accessed through Zowe API ML

   - A service that is registered to API ML and is accessed through the API Gateway

The following sections describe what is necessary to participate SSO for both types.

### Zowe API ML client

* Zowe API ML client needs to obtain an authentication token via the `/login` endpoint of ZAAS described above. This endpoint requires valid credentials.
* The client should not rely on the token format but use the ZAAS `/query` endpoint to validate the token and get information about it. This is useful when the API client has the token but does not store the associated data such as user ID.
* The API client needs to provide the authentication token to the API services in the form of a Secure HttpOnly cookie with the name `apimlAuthenticationToken` or in `Authorization: Bearer` HTTP header as described in the [Authenticated Request](https://github.com/zowe/sample-spring-boot-api-service/blob/master/zowe-rest-api-sample-spring/docs/api-client-authentication.md#authenticated-request).

**Note:** Plans for Zowe CLI to be an API ML client in the future, are desribed at [Zowe CLI: Token Authentication, MFA, and SSO](https://medium.com/zowe/zowe-cli-token-authentication-mfa-and-sso-b88bca3efa35).

### API service accessed via Zowe API ML

This section describes the requirements of a service to adopt the Zowe authentication token. In the future, we intend to allow Zowe to support services that accept PassTickets. 

* The API service must accept the authentication token to the API services in the form of a Secure HttpOnly cookie with the name `apimlAuthenticationToken` or in the `Authorization: Bearer` HTTP header as described in the [Authenticated Request](https://github.com/zowe/sample-spring-boot-api-service/blob/master/zowe-rest-api-sample-spring/docs/api-client-authentication.md#authenticated-request).
* The API service must validate the token and extract information about the user ID by calling `/query` endpoint of the ZAAS described above. The alternative is validate the signature of the JWT token. The format of the signature and location of the public key is described above. The alternative should be used only when the calling of `/query` endpoint is not feasible.
* The API service needs to trust the Zowe API gateway that hosts the ZAAS, it needs to have the certificate of the CA that signed the Zowe API Gateway in its truststore.

The REST API of the ZAAS can be easily called from a Java application using [ZAAS Client](api-mediation-security.md#zaas-client) described below.

### Existing services that cannot be modified

If you have a service that cannot be changed to adopt Zowe authentication token, they can still participate in Zowe Single-Sign-On via API ML.

They need to accept PassTicket in the HTTP Authorization header.
See [Enabling PassTicket creation for API Services that Accept PassTickets](api-mediation-passtickets.md) for more details.


## Further resources

* [User guide for SSO in Zowe CLI ](https://docs.zowe.org/stable/user-guide/cli-usingcli.html#accessing-multiple-services-with-sso)
* [System requirements for using web tokens for SSO in Zlux and ZSS](https://docs.zowe.org/stable/user-guide/systemrequirements.html#using-web-tokens-for-sso-on-zlux-and-zss)
* [Certificate configuration for the usage of web tokens for SSO in Zlux and ZSS](https://docs.zowe.org/stable/user-guide/configure-certificates.html#using-web-tokens-for-sso-on-zlux-and-zss) 


