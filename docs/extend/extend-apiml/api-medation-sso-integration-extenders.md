# Single Sign On Integration for Extenders

:::info Role: Infrastructure application developer
:::

As an infrastructure application developer, review the ways a service can integrate with API Mediation Layer (API ML) and participate in the Single Sign On (SSO) for REST APIs on the z/OS platform. 

:::note
This article does not cover the client methods to call API ML and authenticate. For more information about API ML authentication, see the [Single Sign On Overview](../../user-guide/api-mediation-sso.md) in the User Guide. 
:::

To integrate with API Mediation Layer and leverage SSO, choose from the following three possible methods:

- [Accepting JWT token (recommended)](#accepting-jwt)
- [Accepting SAF IDT token](#accepting-saf-idt)
- [Accepting PassTicket](#accepting-passtickets)

Additional possibilities can potentially be leveraged to enable SSO but are **not** properly integrated with the standard API ML:

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
Specifies a service authentication scheme. The following schemes that participate in SSO are supported by the API Gateway: 
* `zoweJwt`
* `safIdt`
* `httpBasicPassTicket`
* `zosmf`. 
  
    Two additional schemes that do not properly participate in SSO but may be relevant are `bypass`, and `x509`.

  The following table provides a quick reference of the available authentication schemes, their descriptions, and whether they are integrated with SSO:

  | Scheme | Description | SSO Integrated |
  |---|---|:---:|
  | `zoweJwt` | Service accepts Zowe JWT tokens | Fully integrated |
  | `safIdt` | Service accepts SAF IDT tokens | Fully integrated |
  | `httpBasicPassTicket` | Service accepts PassTickets via HTTP Basic Auth | Fully integrated |
  | `zosmf` | Service accepts z/OSMF LTPA tokens | Integrated with limitations. Recommended not to be used outside the z/OSMF setup for the z/OSMF authentication provider |
  | `bypass` | Token passed unchanged to the service | Not integrated |
  | `x509` | Service accepts client certificates forwarded in headers | Not integrated |

In the event that there is an issue with authentication, API ML sets `X-Zowe-Auth-Failure` error headers which are passed to downstream services. In addition, any `X-Zowe-Auth-Failure` error headers coming from an upstream service are also passed to the downstream services without setting valid headers. The `X-Zowe-Auth-Failure` error header contains details about the error and suggests potential actions.

## Accepting JWT

Accepting JSON Web Tokens (JWT) is the recommended method for integrating. No configuration is needed on the client-side. No additional configuration is needed in the service's onboarding definition beyond specifying the scheme:

```yaml
authentication:
    scheme: zoweJwt
```

* When a Zowe JWT is provided, this scheme value specifies that the service accepts the Zowe JWT. No additional processing is done by the API Gateway.
* When a client certificate is provided, the certificate is transformed into a Zowe JWT, and the downstream service performs the authentication.
* If the downstream service needs to consume the JWT from a custom HTTP request header to participate in the Zowe SSO, it is possible to provide a header in the Gateway configuration.
* The HTTP header is then added to each request towards the downstream service and contains the Zowe JWT to be consumed by the service. For more information, see [Enabling single sign on for extending services via JWT configuration](../../user-guide/api-mediation/configuration-extender-jwt.md).

## Accepting SAF IDT

Using the scheme value `safIdt` specifies that the service accepts SAF IDT, and expects that the token produced by the SAF IDT provider implementation is in the `X-SAF-Token` header. It is necessary to provide a service APPLID in the `authentication.applid` parameter:

```yaml
authentication:
    scheme: safIdt
    applid: <applid>
```

- `<applid>`  
Specifies the APPLID value that is used by the API service for PassTicket support (for example, `OMVSAPPL`).

For more information, see [Implementing a new SAF IDT provider](implement-new-saf-provider.md).

## Accepting PassTickets

Using the scheme value `httpBasicPassTicket` specifies that a service accepts PassTickets in the Authorization header of the HTTP requests using the basic authentication scheme.
It is necessary to provide a service APPLID in the `authentication.applid` parameter to prevent PassTicket generation errors, and to make sure API Mediation Layer can generate PassTickets with the given APPLID. 

* When a client authenticates to API ML using a Zowe JWT, the API ML Gateway validates the JWT to identify the user, generates a PassTicket for that user using the configured APPLID, and forwards the PassTicket to your service in the `Authorization: Basic` header. Your service does not receive or validate the JWT directly.
* When a client authenticates to API ML using a client certificate, the API ML Gateway maps the certificate to a mainframe user identity, generates a PassTicket for that user using the configured APPLID, and forwards it to your service in the `Authorization: Basic` header. Your service does not receive or validate the certificate directly.
* If the downstream service needs to consume the user ID and the PassTicket from custom HTTP request headers (for example, to participate in the Zowe SSO), it is possible to provide the headers in the Gateway configuration.
* The HTTP headers are then added to each request towards the downstream service. The headers contain the user ID and the PassTicket to be consumed by the service. For more information about the custom HTTP request headers, see [Adding a custom HTTP Auth header to store Zowe JWT](../../user-guide/api-mediation/configuration-extender-jwt.md#adding-a-custom-http-auth-header-to-store-zowe-jwt). 

```yaml
authentication:
    scheme: httpBasicPassTicket
    applid: <applid>
```

- `<applid>`  
Specifies the APPLID value that is used by the API service for PassTicket support (for example, `OMVSAPPL`).

For more information, see [Enabling single sign on for extending services via PassTicket configuration](../../user-guide/api-mediation/configuration-extender-passtickets.md).

## Bypassing authentication for the service

Using the scheme value `bypass` specifies that the token is passed unchanged to the service.

:::note
`bypass` is the default scheme when no authentication parameters are specified.
:::

```yaml
authentication:
    scheme: bypass
```

## Accepting client certificates via x509 scheme

While it is possible to integrate with client certificates by setting the scheme with the value `x509`, this approach is not recommended. We recommend that you use any of the previously described methods, whereby API ML validates the certificate for you and ideally provides a Zowe JWT. 

The `x509` scheme value specifies that a service accepts client certificates forwarded in the HTTP header only. The Gateway service extracts information from a valid client certificate. For validation, the certificate needs to be trusted by API Mediation Layer. Extended Key Usage must either be empty or needs to contain a Client Authentication (`1.3.6.1.5.5.7.3.2`) entry. To use this scheme, it is also necessary to specify which headers to include. Specify these parameters in `headers`. This scheme does not relate to the certificate used in the TLS handshake between API ML and the downstream service, but rather the certificate that is forwarded in the header that authenticates the user.

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
For more information about z/OSMF single sign-on, see [Establishing a single sign-on environment](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.4.0/com.ibm.zosmfcore.multisysplex.help.doc/izuG00hpManageSecurityCredentials.html).
:::

## Forwarding x509 client certificate
When a client uses a x509 client certificates for authentication, the certificate can be forwarded to a downstream service. This is an alternative to the [Bypassing authentication for the service](#bypassing-authentication-for-the-service) option for client certificates.

The following steps outline the x509 client certificate forwarding flow:

1. A client sends a request to the API Gateway secured by a client certificate.
2. The API Gateway extracts the client certificate from the request and puts this certificate into the `Client-Cert` header.
3. The API Gateway forwards the request to the downstream service. The request is secured by the Zowe server certificate.
4. The downstream service must validate the Zowe server certificate in the request to verify the certificate's origin and extract the original client certificate from the header. This validation makes it possible for the service to then perform the authentication.

Both the API ML Gateway and the downstream service must conform to the following requirements to support x509 certificate forwarding:

### API ML Gateway requirements

- Enable client certificate forwarding in the `zowe.yaml`
    ```yaml
   components:
      gateway:    
        apiml:
          security:
            x509:
              enabled: true
    ```
- The API Gateway must trust the client certificate's issuer. As such, the API Gateway truststore must contain the client issuer's certificate.

### Downstream service requirements

- The downstream service must indicate that it supports forwarded client certificates in the meta-information used in the onboarding process. The property `apiml.service.supportClientCertForwarding` must be set to `true`.
  
- To validate the Zowe server certificate used by the API Gateway, the service must be aware of the Zowe server certificate chain. This chain is available via the `/certificates` endpoint provided by every API Gateway instance. 

## Authentication Failure Handling

When a downstream (southbound) service is integrated with API ML, the API Gateway evaluates incoming authentication and translates this authentication into downstream security artifacts. If this upstream authentication process fails, API ML provides diagnostic feedback to your service via a dedicated HTTP header:

* **Header Name:** `X-Zowe-Auth-Failure`

### Purpose and Flow of the Header

The primary purpose of the `X-Zowe-Auth-Failure` header is to help your service distinguish between an **upstream authentication failure** (where API ML could not verify the user's identity or generate credentials) and a **downstream authorization failure** (where the user's identity is valid, but your service lacks permissions to grant them access).

The following sequence outlines the flow when an authentication anomaly occurs at the Gateway layer:
1. **Request Propagation:**  
API ML strips out potentially broken identity artifacts (such as empty basic auth credentials) and injects the `X-Zowe-Auth-Failure` header into the request forwarded to your southbound service.
2. **Upstream Pass-Through:**  
If an upstream client passes an `X-Zowe-Auth-Failure` header directly in the initial call. API ML does not remove the header if passed from the upstream service. 
1. **Response Propagation:**  
The API ML Gateway also attaches this same header to the final HTTP response sent back to the client, ensuring request-response visibility.


### Expected Error Codes

The value of the `X-Zowe-Auth-Failure` header contains explicit message strings. The table below outlines the core error codes that can appear in this header, along with their general meanings:

| Error Code | Reason for Failure |
| :--- | :--- |
| **`ZWEAG160E`** | **No authentication provided in the request:** The client request is missing required authentication context or headers completely. |
| **`ZWEAG167E`** | **No client certificate provided in the request:** The client request is missing required authentication context or headers completely. |
| **`ZWEAG141E`** | **The generation of the PassTicket failed:** Invalid or missing authentication. |
| *(Generic Fallback)* | **Invalid or missing authentication:** Fallback string when a generalized authentication validation error occurs. |
| *(Variant)* | **Invalid client certificate in request:** Fallback string when a client certificate is supplied but fails validation check variants. |

:::note
For complete definitions, mitigation steps, and deeper technical context for each of these codes, see [Error Message Codes](../../troubleshoot/troubleshoot-apiml-error-codes.md) under _Troubleshooting Zowe API Mediation Layer_.
:::


### HTTP Request and Response Examples

**Example of the header on the forwarded request to the southbound service**  
When an upstream failure occurs (for example, no mapping identity is found), API ML forwards the request to your service with the header injected:

```http
GET /my-service/api/v1/data HTTP/1.1
Host: my-service:8080
X-Zowe-Auth-Failure: ZWEAG160E No authentication provided in the request
```

**Example HTTP response showing the header to the client**  
The corresponding response returned by the Gateway contains the header context to inform the client or UI application:

```html
HTTP/1.1 200 OK
X-Zowe-Auth-Failure: ZWEAG160E No authentication provided in the request
Content-Type: application/json

{"message": "The request was processed but authentication was not successful"}
```

**Personal Access Token (PAT) specific example**  
If a client passes a valid token that was built for a different service, a localized failure response is issued:

```html
GET /some-service/api/v1/data HTTP/1.1
Authorization: Bearer <valid-PAT-for-different-service>

HTTP/1.1 200 OK
X-Zowe-Auth-Failure: Invalid or missing authentication
```

**Code Example: Reading the Header (Java)**

To handle this header cleanly within your southbound service logic, intercept the incoming header value using your application framework's routing layer. Extenders should read the header, log it locally, use it to construct meaningful error responses, and cleanly separate gateway identity concerns from internal authorization routines.

The following Spring Boot example demonstrates how to extract the error, log its context, and propagate a meaningful response:

```java
@GetMapping("/api/v1/data")
public ResponseEntity<?> getData(
    @RequestHeader(value = "X-Zowe-Auth-Failure", required = false) String authFailure
) {
    if (authFailure != null) {
        log.warn("API ML authentication failed: {}", authFailure);
        
        // Return 401 to the client with the API ML's error detail
        return ResponseEntity.status(401)
            .header("X-Zowe-Auth-Failure", authFailure)
            .body(Map.of("error", "Authentication failed", "detail", authFailure));
    }
    
    // Normal processing...
}
```

This example demonstrates how a southbound service can intercept upstream issues by checking for the `X-Zowe-Auth-Failure` header before executing any business logic. When present, the service safely logs the specific diagnostic message locally to preserve an audit trail and interrupts the request issuing a 401 Unauthorized JSON response. This pattern ensures that upstream authentication failures are isolated from your service's internal authorization logic while also providing clear feedback to the client.


