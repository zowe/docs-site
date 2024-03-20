# Authentication for API ML services

Review how services of the API Mediation Layer address authentication.

- [Services of API Mediation Layer](#services-of-api-mediation-layer)
- [Authentication endpoints](#authentication-endpoints)
- [Supported authentication methods](#supported-authentication-methods)
- [Authentication parameters](#authentication-parameters)
- [Discovery Service authentication](#discovery-service-authentication)
  - [Authentication with PassTickets](#authentication-with-passtickets)
 

:::tip
For information about authentication providers that handle authentication for the API Gateway, see [Authentication providers for API Mediation Layer](../../user-guide/authentication-providers-for-apiml.md).
:::

## Services of API Mediation Layer

- **API Gateway**

    - The API Gateway handles authentication
    - There are two authentication endpoints that allow authentication of the resource by providers
    - Diagnostic endpoints `https://{gatewayUrl}:{gatewayPort}/application/**` in API Gateway are protected by basic authentication, Zowe JWT token, or a client certificate

- **API Catalog**

    - API Catalog is accessed by users and requires a login
    - Protected access is performed by the Authentication and Authorization Service

- **Discovery Service**

    - Discovery Service is accessed by API Services
    - This access (reading information and registration) requires protection by means of a client certificate
    - (Optional) Access can be granted to users (administrators)
    - Diagnostic endpoints `https://{gatewayUrl}:{gatewayPort}/application/**` in Discovery Service are protected by basic authentication, Zowe JWT token, or a client certificate

- **API Services**

    - Authentication is service-dependent
    - It is recommended to use the Authentication and Authorization Service for authentication


## Authentication endpoints

The API Gateway contains the following REST API authentication endpoints:

- **`auth/login`**  
The full path of the `auth/login` endpoint appears as `https://{gatewayUrl}  :{gatewayPort}/gateway/api/v1/auth/login`.

  The `auth/login` endpoint authenticates mainframe user credentials and   returns an authentication token. The login request requires user   credentials though one of the following methods:
    * Basic access authentication
    * JSON with user credentials
    * Client certificate
  
  When authentication is successful, the response to the request is an empty body and a token is contained in a secure `HttpOnly` cookie named `apimlAuthenticationToken`. When authentication fails, the user receives a 401 status code.

- **`auth/query`**  
The full path of the `auth/query` endpoint appear as `https://{gatewayUrl}:   {gatewayPort}/gateway/api/v1/auth/query`.

   The `auth/query` endpoint validates the token and retrieves the    information associated with the token.
   The query request requires the token through one of the following methods:
     * A cookie named `apimlAuthenticationToken`
     * Bearer authentication

   When authentication is successful, the response to the request is a JSON object which contains information associated with the token. When authentication fails, the user receives a 401 status code.

- **`auth/ticket`**  
The `auth/ticket` endpoint generates a PassTicket for the user associated with a token. The full path of the `auth/ticket` endpoint appears as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/ticket`.

  This endpoint is protected by a client certificate.
  The ticket request requires the token in one of the following formats:
  
  - Cookie named `apimlAuthenticationToken`.
  - Bearer authentication
  
  The request takes the `applicationName` parameter, which is the name of the application for which the PassTicket should be generated. Supply this parameter.

  The response is a JSON object, which contains information associated with the ticket.

- **`auth/refresh`**  
 The `auth/refresh` endpoint generates a new token for the user based on valid jwt token. The full path of the `auth/refresh` endpoint appears as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/refresh`. The new token overwrites the old cookie with a `Set-Cookie` header. As part of the process, the old token gets invalidated and is not usable anymore.

  **Notes:** 
  
   - The endpoint is disabled by default. For more information, see [Enable JWT token endpoint](../../user-guide/api-mediation/configuration-jwt.md#enabling-a-jwt-token-refresh-endpoint).
   - The endpoint is protected by a client certificate.

  The refresh request requires the token in one of the following formats:
  
  - Cookie named `apimlAuthenticationToken`.
  - Bearer authentication
  
  For more information, see the OpenAPI documentation of the API Mediation Layer in the API Catalog.

## Supported authentication methods

The API Mediation Layer provides multiple methods which clients can use to authenticate. When the API ML is run as part
of Zowe, all of the following methods are enabled and supported. All methods are supported at least to some extent with each authentication provider.

Zowe supports three authentication methods with single-sign-on. Use the following links to the documentation about using the following supported authentication methods:

* [Authenticating with a JWT token](../../user-guide/authenticating-with-jwt-token.md)

* [Authenticating with client certificates](../../user-guide/authenticating-with-client-certificates.md).

* [Authenticating with personal access tokens](../../user-guide/api-mediation/authenticating-with-personal-access-token.md)


### Authenticate with Username/Password

The client can authenticate via Username and password. There are multiple methods which can be used to deliver  
credentials. For more details, see the ZAAS Client documentation. 


## Authentication parameters

Parameters are specified in the onboarding enablers.

Authentication parameters enable a service to accept a Zowe JWT or client certificate. The API Gateway translates the authentication token to an authentication method supported by a service.

The following example shows the parameters that define the service authentication method:

**Example:**

```yaml
authentication:
    scheme: httpBasicPassTicket
    applid: ZOWEAPPL
```

* **authentication.scheme**  
The value of this parameter specifies a service authentication scheme. Any valid headers or `X-Zowe-Auth-Failure` error headers are set and passed to southbound services. In addition, any `X-Zowe-Auth-Failure` error headers coming from the northbound service are also be passed to the southbound services without setting the valid headers. The `X-Zowe-Auth-Failure` error header contains details about the error and suggests potential actions.
The following schemes are supported by the API Gateway:

  * **bypass**  
  This value specifies that the token is passed unchanged to service.

  **Note:** This is the default scheme when no authentication parameters are specified.

  * **zoweJwt**  
    * When a Zowe JWT is provided, this scheme value specifies that the service accepts the Zowe JWT. No additional processing is done by the API Gateway.
    * When a client certificate is provided, the certificate is transformed into a Zowe JWT, and the southbound service performs the authentication.
    * If the southbound service needs to consume the JWT token from a custom HTTP request header to participate in the Zowe SSO, it is possible to provide a header in the Gateway configuration.
    The HTTP header is then added to each request towards the southbound service and contains the Zowe JWT to be consumed by the service. See [Enabling single sign on for extending services via JWT token configuration](../../user-guide/api-mediation/configuration-extender-jwt.md).
    

  * **httpBasicPassTicket**  

    This value specifies that a service accepts PassTickets in the Authorization header of the HTTP requests using the basic authentication scheme.
    It is necessary to provide a service APPLID in the `authentication.applid` parameter to prevent passticket generation errors.

    * When a JWT is provided, the service validates the Zowe JWT to use for passticket generation.
    * When a client certificate is provided, the service validates the certificate by mapping it to a mainframe user to use for passticket generation.
    * If the southbound service needs to consume the user ID and the passticket from custom HTTP request headers (i.e. to participate in the Zowe SSO), it is possible to provide the headers in the Gateway configuration.
    * The HTTP headers are then added to each request towards the southbound service. The headers contain the user ID and the passticket to be consumed by the service. For more information about the custom HTTP request headers, see [Adding a custom HTTP Auth header to store Zowe JWT token](../../user-guide/api-mediation/configuration-extender-jwt.md#adding-a-custom-http-auth-header-to-store-zowe-jwt-token). 

      
    For more information, see [Authentication with PassTickets](#authentication-with-passtickets).

  * **zosmf**  
    This value specifies that a service accepts z/OSMF LTPA (Lightweight Third-Party Authentication).
    This scheme should only be used only for a z/OSMF service used by the API Gateway Authentication Service and other z/OSMF services that use the same LTPA key.

    * When a JWT is provided, the token extracts the LTPA and forwards it to the service.
    * When a client certificate is provided, the certificate translates into a z/OSMF token, and also extracts the LTPA for the service to use.

    For more information about z/OSMF Single Sign-on, see [Establishing a single sign-on environment](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.4.0/com.ibm.zosmfcore.multisysplex.help.doc/izuG00hpManageSecurityCredentials.html)

  * **safIdt**  
    This value specifies that the service accepts SAF IDT, and expects that the token produced by the SAF IDT provider implementation is in the `X-SAF-Token` header. It is necessary to provide a service APPLID in the `authentication.applid` parameter.

    For more information, see [Implement a SAF IDT provider](implement-new-saf-provider.md).

  * **x509**  
    This value specifies that a service accepts client certificates forwarded in the HTTP header only. The Gateway service extracts information from a valid client certificate. For validation, the certificate needs to be trusted by API Mediation Layer. Extended Key Usage must either be empty or needs to contain a Client Authentication (1.3.6.1.5.5.7.3.2) entry. To use this scheme, it is also necessary to specify which headers to include. Specify these parameters in `headers`. This scheme does not relate to the certificate used in the TLS handshake between API ML and the southbound service, but rather the certificate that is forwarded in the header that authenticates the user.

* **authentication.headers**  
    When the `x509` scheme is specified, use the `headers` parameter to select which values to send to a service. Use one of the following values:

  * `X-Certificate-Public`  
The public part of client certificate base64 encoded

  * `X-Certificate-DistinguishedName`  
The distinguished name from client certificate

  * `X-Certificate-CommonName`  
The common name from the client certificate

* **authentication.applid**  
This parameter specifies a service APPLID.
  This parameter is valid only for the `httpBasicPassTicket` authentication scheme.

## Discovery Service authentication

There are several authentication mechanisms, depending on the desired endpoint, as described by the following matrix:

| Endpoint | Authentication method | Note |
|----|-----|------|
| UI (eureka homepage)                 | basic auth(MF), token              | see note about mainframe authentication  |
| application/**                       | basic auth(MF), token              |  see note about mainframe authentication  |
| application/health, application/info | none                          |     |
| eureka/**                            | client certificate                   | Allows for the other services to register without mainframe credentials or token. API ML's certificate can be used. It is stored in the `keystore/localhost/localhost.keystore.p12` keystore or in the SAF keyring. It is exported to .pem format for convenience. Any other certificate which is valid and trusted by Discovery service can be used. |
| discovery/**                         | certificate, basic auth(MF), token | see note about mainframe authentication |

**Note:** Some endpoints are protected by mainframe authentication. The authentication function is provided by the API Gateway. This functionality is not available until the Gateway registers itself to the Discovery Service.

Since the Discovery Service uses HTTPS, your client also requires verification of the validity of its certificate. Verification is performed by validating the client certificate against certificates stored in the truststore or SAF keyring.

  Some utilities including HTTPie require the certificate to be in PEM format. The exported certificate in .pem format is located here: `keystore/localhost/localhost.pem`.

 The following example shows the HTTPie command to access the Discovery Service endpoint for listing registered services and provides the client certificate:

 ```
 http --cert=keystore/localhost/localhost.pem --verify=false -j GET https://localhost:10011/eureka/apps/
 ```


### Authentication with PassTickets

The following types of API services support PassTickets:

- [API Services that register dynamically with API ML that provide authentication information](#api-services-that-register-dynamically-with-api-ml-that-provide-authentication-information)
- [API Services that register dynamically with API ML but do not provide metadata](#api-services-that-register-dynamically-with-api-ml-but-do-not-provide-metadata)
- [API services that are defined using a static YAML definition](#api-services-that-are-defined-using-a-static-yaml-definition)

#### API Services that register dynamically with API ML that provide authentication information

API services that support Zowe API Mediation Layer and use dynamic registration to the Discovery Service already provide metadata that enables PassTicket support.

As a system programmer, you are not required to do anything in this case. All required information is provided by the API service automatically.

#### API Services that register dynamically with API ML but do not provide metadata

Some services can use PassTickets but the API ML does not recognize that the service can accept PassTickets.
For such services, you can provide additional service metadata externally in the same file that contains the static YAML definiton. The static YAML definitions are described in [REST APIs without code changes required](./onboard-static-definition.md).

Add the following section to the YAML file with a static definition:

```yaml
additionalServiceMetadata:
    - serviceId: <serviceId>
      mode: UPDATE
      authentication:
        scheme: httpBasicPassTicket
        applid: <applid>
```

where:

- `<serviceId>`

  is the service ID of the service to which you want to add metadata.

#### API services that are defined using a static YAML definition

Add the following metadata to the same level as the `serviceId`:

**Example:**

```yaml
    - serviceId: ...
      authentication:
        scheme: httpBasicPassTicket
        applid: TSTAPPL
```

**Note:** The fields in this example are explained later in this article.

#### Adding YAML configuration to API services that register dynamically with API ML

As a developer of an API service that registers dynamically with the API ML, you need to provide additional metadata to tell the API Gateway to use PassTickets.
Additional metadata tells the API Gateway how to generate them. The following code shows an example of the YAML configuration that contains this metadata.

**Example:**

```yaml
authentication:
    scheme: httpBasicPassTicket
    applid: <applid>
```

where:

- `httpBasicPassTicket`

  is the value that indicates that the HTTP Basic authentication scheme is used with PassTickets.

- `<applid>`

  is the `APPLID` value that is used by the API service for PassTicket support (e.g. `OMVSAPPL`).
