# Single Sign On Integration for Extenders

:::info Role: Infrastructure application developer
:::

As an infrastructure application developer, review the ways a service can integrate with API Mediation Layer (API ML) and participate in the Single Sign On for REST APIs on the z/OS platform. 

:::note
This article does not cover the client methods to call API ML and authenticate. For more information about API ML authentication, see the [Single Sign On Overview](../../user-guide/api-mediation-sso.md) in the User Guide. 
:::

To integrate with API Mediation Layer and leverage Single Sign On, choose from the following three possible methods:

- [Accepting JWT](#accepting-jwt) (recommended)
- [Accepting SAF IDT](#accepting-saf-idt)
- [Accepting PassTickets](#accepting-passtickets)

Three additional possibilities can potentially be leveraged to enable Single Sign On but are **not** properly integrated with the standard API ML:

* [Bypassing authentication for the service](#bypassing-authentication-for-the-service)   
    **Note:** This option is for SSO only if the service does not have an authenticated endpoint.
* [Accepting client certificates via x509 scheme](#accepting-client-certificates-via-x509-scheme)
* [Accepting z/OSMF LTPA token](#accepting-zosmf-ltpa-token)


Service configuration is generally provided in the yaml file when using one of the enablers outlined in this section. Key to general configuration is the `authentication` object. The `scheme` property under the `authentication` object states what type of authentication the service expects and is shared across all types of authentication. 

**Example:**

```yaml
authentication:
    scheme: httpBasicPassTicket
    applid: ZOWEAPPL
```

* **authentication.scheme**  
Specifies a service authentication scheme. The following schemes participate in single sign on are supported by the API Gateway: `zoweJwt`, `safIdt`, `httpBasicPassTicket`. Two additional schemes that do not properly participate but may be relevant are `bypass`, and `x509`.

In the event that there is an issue with authentication, API Mediation Layer sets `X-Zowe-Auth-Failure` error headers which are passed to downstream services. In addition, any `X-Zowe-Auth-Failure` error headers coming from an upstream service are also  passed to the downstream services without setting valid headers. The `X-Zowe-Auth-Failure` error header contains details about the error and suggests potential actions.

## Accepting JWT

Accepting JWT is the recommended method for integrating. No configuration is needed on the user's side. 

```yaml
authentication:
    scheme: zoweJwt
```

* When a Zowe JWT is provided, this scheme value specifies that the service accepts the Zowe JWT. No additional processing is done by the API Gateway.
* When a client certificate is provided, the certificate is transformed into a Zowe JWT, and the downstream service performs the authentication.
* If the downstream service needs to consume the JWT token from a custom HTTP request header to participate in the Zowe SSO, it is possible to provide a header in the Gateway configuration.
* The HTTP header is then added to each request towards the downstream service and contains the Zowe JWT to be consumed by the service. For more information, see [Enabling single sign on for extending services via JWT token configuration](../../user-guide/api-mediation/configuration-extender-jwt.md).

## Accepting SAF IDT

Using the scheme value `safIdt` specifies that the service accepts SAF IDT, and expects that the token produced by the SAF IDT provider implementation is in the `X-SAF-Token` header. It is necessary to provide a service APPLID in the `authentication.applid` parameter.

```yaml
authentication:
    scheme: safIdt
    applid: <applid>
```

- `<applid>`  
Specifies the `APPLID` value that is used by the API service for PassTicket support (e.g. `OMVSAPPL`).

For more information, see [Implement a SAF IDT provider](implement-new-saf-provider.md).

## Accepting PassTickets

Using the scheme value `httpBasicPassTicket` specifies that a service accepts PassTickets in the Authorization header of the HTTP requests using the basic authentication scheme.
It is necessary to provide a service APPLID in the `authentication.applid` parameter to prevent PassTicket generation errors and to make sure API Mediation Layer can generate PassTickets with the given APPLID. 

* When a JWT is provided, the service validates the Zowe JWT to use for PassTicket generation.
* When a client certificate is provided, the service validates the certificate by mapping the certificate to a mainframe user to use for PassTicket generation.
* If the downstream service needs to consume the user ID and the PassTicket from custom HTTP request headers (i.e. to participate in the Zowe SSO), it is possible to provide the headers in the Gateway configuration.
* The HTTP headers are then added to each request towards the downstream service. The headers contain the user ID and the PassTicket to be consumed by the service. For more information about the custom HTTP request headers, see [Adding a custom HTTP Auth header to store Zowe JWT token](../../user-guide/api-mediation/configuration-extender-jwt.md#adding-a-custom-http-auth-header-to-store-zowe-jwt-token). 

```yaml
authentication:
    scheme: httpBasicPassTicket
    appliId: <applid>
```

- `<applid>`  
Specifies the `APPLID` value that is used by the API service for PassTicket support (e.g. `OMVSAPPL`).

For more information, see [Enabling single sign on for extending services via PassTicket configuration](../../user-guide/api-mediation/configuration-extender-passtickets.md).

## Bypassing authentication for the service

Using the scheme value `bypass` specifies that the token is passed unchanged to the service.

:::note
This is the default scheme when no authentication parameters are specified.
:::

```yaml
authentication:
    scheme: bypass
```

## Accepting client certificates via x509 scheme

While it is possible to integrate with client certificates by setting the scheme with the value `x509`, this approach is not recommended. We recommned that you use any of the previously described methods, whereby API ML will validate the certificate for you and ideally provide a Zowe JWT. 

The `x509` scheme value specifies that a service accepts client certificates forwarded in the HTTP header only. The Gateway service extracts information from a valid client certificate. For validation, the certificate needs to be trusted by API Mediation Layer. Extended Key Usage must either be empty or needs to contain a Client Authentication (1.3.6.1.5.5.7.3.2) entry. To use this scheme, it is also necessary to specify which headers to include. Specify these parameters in `headers`. This scheme does not relate to the certificate used in the TLS handshake between API ML and the downstream service, but rather the certificate that is forwarded in the header that authenticates the user.

```yaml
authentication:
    scheme: x509
    headers: X-Certificate-Public
```

* **authentication.headers**  
    When the `x509` scheme is specified, use the `headers` parameter to select which values to send to a service. Use one of the following values:

  * `X-Certificate-Public`  
  The public part of client certificate base64 encoded

  * `X-Certificate-DistinguishedName`  
  The distinguished name from client certificate

  * `X-Certificate-CommonName`  
  The common name from the client certificate

## Accepting z/OSMF LTPA token

Using the scheme value `zosmf` specifies that a service accepts z/OSMF LTPA (Lightweight Third-Party Authentication).
This scheme should only be used for a z/OSMF service used by the API Gateway Authentication Service, and other z/OSMF services that are using the same LTPA key. 

```yaml
authentication:
    scheme: zosmf
```

:::tip
For more information about z/OSMF Single Sign-on, see [Establishing a single sign-on environment](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.4.0/com.ibm.zosmfcore.multisysplex.help.doc/izuG00hpManageSecurityCredentials.html).
:::