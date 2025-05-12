# Authentication for API ML services

Review how services of the API Mediation Layer address authentication.

- [Authentication for API ML services](#authentication-for-api-ml-services)
  - [Services of API Mediation Layer](#services-of-api-mediation-layer)
  - [Authentication endpoints](#authentication-endpoints)
  - [Supported authentication methods](#supported-authentication-methods)
    - [Authenticate with Username/Password](#authenticate-with-usernamepassword)
  - [Authentication parameters](#authentication-parameters)
  - [Discovery Service authentication](#discovery-service-authentication)
  - [zOSMF Authentication](#zosmf-authentication)
 

:::tip
For information about authentication providers that handle authentication for the API Gateway, see [Authentication providers for API Mediation Layer](../../user-guide/authentication-providers-for-apiml.md).
:::

## Services of API Mediation Layer

- **API Gateway**

    - The API Gateway handles authentication
    - Diagnostic endpoints `https://{gatewayUrl}:{gatewayPort}/application/**` in the API Gateway are protected by basic authentication, Zowe JWT, or a client certificate

- **API Catalog**

    - API Catalog is accessed by users and requires a login
    - Protected access is performed by the Authentication and Authorization Service

- **Discovery Service**

    - The Discovery Service is accessed by API Services
    - This access (reading information and registration) requires protection by means of a client certificate
    - (Optional) Access can be granted to users (administrators)
    - Diagnostic endpoints `https://{gatewayUrl}:{gatewayPort}/application/**` in the Discovery Service are protected by basic authentication, Zowe JWT, or a client certificate

- **z/OSMF**

    - z/OSMF is not itself part of the API Mediation Layer but z/OSMF is the default authentication provider.   


## Authentication endpoints

The API Gateway contains the following REST API authentication endpoints, which are also documented in the [Open API Documentation](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/zowe/docs-site/docs-staging/api_definitions/gateway.json):

- **auth/login**  
The full path of the `auth/login` endpoint appears as `https://{gatewayUrl}  :{gatewayPort}/gateway/api/v1/auth/login`.

  The `auth/login` endpoint authenticates mainframe user credentials and returns an authentication token. The login request requires user credentials though one of the following methods:
    * Basic access authentication
    * JSON with user credentials
    * Client certificate
  
  When authentication is successful, the response to the request is an empty body and a token is contained in a secure `HttpOnly` cookie named `apimlAuthenticationToken`. When authentication fails, the user receives a 401 status code.

* **auth/query**  
The full path of the `auth/query` endpoint appears as `https://{gatewayUrl}:   {gatewayPort}/gateway/api/v1/auth/query`.

   The `auth/query` endpoint validates the token and retrieves information associated with the token.
   The query request requires the token through one of the following methods:
     * A cookie named `apimlAuthenticationToken`
     * Bearer authentication

   When authentication is successful, the response to the request is a JSON object which contains information associated with the token. When authentication fails, the user receives a 401 status code.

- **auth/ticket**  
The `auth/ticket` endpoint generates a PassTicket for the user associated with a token. The full path of the `auth/ticket` endpoint appears as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/ticket`.

  This endpoint is protected by a client certificate.
  The ticket request requires the token in one of the following formats:
  
  - Cookie named `apimlAuthenticationToken`.
  - Bearer authentication
  
  The request takes the `applicationName` parameter, which is the name of the application for which the PassTicket should be generated. This parameter must be provided. 

  The response is a JSON object, which contains information associated with the ticket.

- **auth/refresh**  
 The `auth/refresh` endpoint generates a new token for the user based on valid JWT. The full path of the `auth/refresh` endpoint appears as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/refresh`. The new token overwrites the old cookie with a `Set-Cookie` header. As part of the process, the old token gets invalidated and is no longer usable.

  **Notes:** 
  
   - The endpoint is disabled by default. For more information, see [Enable a JWT refresh endpoint](../../user-guide/api-mediation/configuration-jwt.md#enabling-a-jwt-refresh-endpoint).
   - The endpoint is protected by a client certificate.

  The refresh request requires the token in one of the following formats:
  
  - Cookie named `apimlAuthenticationToken`.
  - Bearer authentication
  
  For more information, see the OpenAPI documentation of the API Mediation Layer in the API Catalog.

## Supported authentication methods

The API Mediation Layer provides multiple methods which clients can use to authenticate. When the API ML is run as part
of Zowe, all of the following methods are enabled and supported. All methods are supported at least to some extent with each authentication provider.

Zowe supports three authentication methods with single-sign-on. If you have username and password the expectation is that you exchange the username and password via login for JWT token or use them to generate the Personal Access Token. Use the following links to the documentation about using the following supported authentication methods:

* [Authenticating with a JWT](../../user-guide/authenticating-with-jwt-token.md)

* [Authenticating with client certificates](../../user-guide/authenticating-with-client-certificates.md).

* [Authenticating with personal access tokens](../../user-guide/api-mediation/authenticating-with-personal-access-token.md)


### Authenticate with Username/Password

The client can authenticate via Username and password. There are multiple methods which can be used to deliver  
credentials. For more details, see the [ZAAS Client documentation](./zaas-client.md). 

## Authentication parameters

For information about the authentication parameters and how your service can integrate with the API Mediation Layer, see [Single Sign On Integration for Extenders](./api-medation-sso-integration-extenders.md)

## Discovery Service authentication

Review the following table of available authentication mechanisms according to the desired endpoint: 

| Endpoint | Authentication method | Note |
|----|-----|------|
| UI (eureka homepage)                 | basic auth(MF), token              | see note about mainframe authentication  |
| application/**                       | basic auth(MF), token              |  see note about mainframe authentication  |
| application/health, application/info | none                          |     |
| eureka/**                            | client certificate                   | Allows for the other services to register without mainframe credentials or token. API ML's certificate can be used. It is stored in the `keystore/localhost/localhost.keystore.p12` keystore or in the SAF keyring. It is exported to .pem format for convenience. Any other certificate which is valid and trusted by Discovery service can be used. |
| discovery/**                         | certificate, basic auth(MF), token | see note about mainframe authentication |

:::note Notes:
* Some endpoints are protected by mainframe authentication. The authentication function is provided by the API Gateway. This functionality is not available until the Gateway registers itself to the Discovery Service.

* Since the Discovery Service uses HTTPS, your client also requires verification of the validity of its certificate. Verification is performed by validating the client certificate against certificates stored in the truststore or SAF keyring.

* Some utilities including HTTPie require the certificate to be in PEM format. The exported certificate in .pem format is located here: `keystore/localhost/localhost.pem`.

:::

 The following example shows the HTTPie command to access the Discovery Service endpoint for listing registered services and provides the client certificate:

 ```
 http --cert=keystore/localhost/localhost.pem --verify=false -j GET https://localhost:10011/eureka/apps/
 ```

## zOSMF Authentication 

The zOSMF service is onboarded statically under the `ibmzosmf` service id. The specific definition is created during the Zowe configuration based on the values provided in the `zowe.yaml` file. 

The `authentication.scheme` value for z/OSMF is:

 * **zosmf**  
    This value specifies that a service accepts z/OSMF LTPA (Lightweight Third-Party Authentication).
    This scheme should only be used only for a z/OSMF service used by the API Gateway Authentication Service and other z/OSMF services that use the same LTPA key.

    * When a JWT is provided, the token extracts the LTPA and forwards the LTPA to the service.
    * When a client certificate is provided, the certificate translates into a z/OSMF token, and also extracts the LTPA for the service to use.

    For more information about z/OSMF Single Sign On, see [Establishing a single sign on environment](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.4.0/com.ibm.zosmfcore.multisysplex.help.doc/izuG00hpManageSecurityCredentials.html) in the IBM documentation.

This method should not be used for any other service. 