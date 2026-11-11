# Zowe API Mediation Layer Security Overview

Review this article to learn about topics which address security features in Zowe API Mediation Layer (API ML):

- [Zowe API Mediation Layer Security Overview](#zowe-api-mediation-layer-security-overview)
  - [How API ML transport security works](#how-api-ml-transport-security-works)
    - [Transport layer security](#transport-layer-security)
    - [Authentication](#authentication)
    - [Zowe API ML services](#zowe-api-ml-services)
    - [Zowe API ML TLS requirements](#zowe-api-ml-tls-requirements)
  - [Setting ciphers for API ML services](#setting-ciphers-for-api-ml-services)
    - [Overriding Ciphers on z/OS](#overriding-ciphers-on-zos)
    - [Overriding Ciphers on Localhost (Development)](#overriding-ciphers-on-localhost-development)
    - [Default Cipher Suite Order](#default-cipher-suite-order)
  - [JSON Web Token (JWT)](#json-web-token-jwt)
  - [z/OSMF JSON Web Tokens Support](#zosmf-json-web-tokens-support)

## How API ML transport security works

Security within API ML is performed on several levels. This article describes how API ML uses Transport Layer Security (TLS). As a system administrator or API developer, use this guide to familiarize yourself with TLS security concepts. 

### Transport layer security

The TLS protocol is used to ensure secure data-transport for all connections to API ML services. While you can temporarily disable TLS for debugging purposes or local development, TLS is enabled by default for all production modes.

### Authentication

Authentication verifies the identity of an entity, whether it is an end-user (API Client) or an application (API Service).

API ML supports the following authentication methods:

- **User ID and password**
    - The user ID and password are used to retrieve authentication tokens
    - Credentials provided by the user are validated by the z/OS security manager (SAF), which then issues a secure token used for subsequent API service access.

- **TLS client certificates**  
    - Used for service-to-service authentication between API ML components. 
    - These certificates can also authenticate end users via X.509 certificates mapped to mainframe identities. For more information, see [Authenticating with client certificates](../../user-guide/authenticating-with-client-certificates.md).

- **OIDC authentication**
 
  - Authenticates mainframe users with an external/distributed Identity Provider (IDP) implemented by an OIDC/OAuth2 provider, such as OKTA, KeyCloak, Microsoft Entra ID (a.k.a. Azure Active Directory) and others.
  Client applications can ask their users to log in at the authentication page of the OIDC provider, and then access APIs with the JWT Access Token that is provided by the external IDP. The following process outlines that basic flow:
  1. The client application intiates the OIDC authentication flow with the distributed OIDC provider.  
  2. The user provides credentials as required at the provider's authentication page/end-point.
  3. The client application obtains authorization in the form of code that is exchanged for access JWT token (or an Identity JWT and Refresh JWT).
  4. The client application passes the access JWT token to the API ML Gateway with subsequent requests for mainframe resources.
  5. API ML federates the user identities and calls the requested resource with appropriate mainframe user credentials.

For more information, see [Authenticating with OIDC](../extend-apiml/api-mediation-oidc-authentication.md)

### Zowe API ML services

The following range of service types apply to Zowe&trade; API ML:

- **Zowe API ML Core Services**

  - **Gateway Service (GW)**  
    The Gateway is the access point for API clients that require access to API services.
    API services can be accessed through the Gateway by API clients. The Gateway receives information about an API Service
    from the Discovery Service.

  - **Discovery Service (DS)**  
    The Discovery Service collects information about API services and provides this information to the Gateway
    and other services. API ML internal services also register to the Discovery Service.

  - **API Catalog (AC)**  
    The Catalog displays information about API services through a web UI. The API Catalog receives information about an API service from the Discovery Service.

- **Authentication and Authorization Service (AAS)**  
    AAS provides authentication and authorization functionality to check user access to resources on z/OS. API ML uses the z/OSMF API for authentication. 

- **API Clients**  
    API clients are external applications, users, or other API services that access API services through the API Gateway.

- **API Services**  
    API services are applications that are accessed through the API Gateway. API services register themselves to the
    Discovery Service and can access other services through the Gateway. If an API service is installed
    so that direct access is possible, API services can access other services without the Gateway.
    When APIs access other services, they can also function as API clients.

### Zowe API ML TLS requirements

API ML requires TLS-secured HTTPS communication for all internal services. Each component must be configured with the appropriate keystores, truststores, and HTTPS ports:

- **API Client**
    - Acts strictly as a client, not an HTTPS server.
    - Must trust the API Gateway's server certificate via a local truststore or a SAF keyring containing the Gateway's CA or server certificate.

- **Gateway Service**
    - Exposes an external HTTPS port.
    - Requires a keystore or SAF keyring with a server certificate that is trusted by external API Clients and web browsers (since it serves web UIs).
    - Requires a truststore or SAF keyring containing certificates needed to trust downstream API Services.

- **API Catalog**
    - Exposes an internal HTTPS port.
    - Requires a keystore or SAF keyring with a server certificate that must be trusted by the API Gateway (it does not need to be trusted by external clients).

- **Discovery Service**
    - Exposes an internal HTTPS port.
    - Requires a keystore or SAF keyring with a server certificate.
    - Requires a truststore or SAF keyring containing certificates needed to trust registering API services.

- **API Service**
    - Exposes an HTTPS port.
    - Requires a keystore or SAF keyring with a server and client certificate (these can be identical). The server certificate must be trusted by the Gateway, whereby the client certificate must be trusted by the Discovery Service.
    - Requires a truststore or SAF keyring containing the certificates necessary to trust both the Gateway and the Discovery Service.

## Setting ciphers for API ML services

You can override ciphers that are used by the HTTPS servers in API ML services by configuring properties of the Gateway, Discovery Service, and [API Catalog](#zowe-api-ml-services) (the web UI that displays registered API services).

**Note:** You do not need to rebuild `.jar` files when you override the default values in shell scripts.

The default value for each service can be found in the [application.yml](https://github.com/zowe/api-layer/blob/master/gateway-service/src/main/resources/application.yml) file. The default configuration is packed in `.jar` files. 

### Overriding Ciphers on z/OS
Modify the component launch parameters in the shell script located at  
```
<RUNTIME_DIR>/components/<APIML_COMPONENT>/bin/start.sh 
```
by adding the following Java property:

```
-Dapiml.security.ciphers=<cipher-list>
```

### Overriding Ciphers on Localhost (Development)

Modify the respective YAML files in your local configuration directory, such as [config/local/gateway-service.yml](https://github.com/zowe/api-layer/blob/master/config/local/gateway-service.yml) (including other YAML files for development purposes).
 
### Default Cipher Suite Order 

The following list shows the default ciphers. API ML services use the following cipher order:

**Note:** Ensure that the version of Java you use is compatible with the default cipherset.

```
   TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,
   TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,
   TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256,
   TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384,TLS_AES_128_GCM_SHA256,TLS_AES_256_GCM_SHA384
```
:::note
Only IANA ciphers names are supported. For more information, see [Cipher Suites](https://wiki.mozilla.org/Security/Server_Side_TLS#Cipher_suites) or [List of Ciphers](https://testssl.sh/openssl-iana.mapping.html).
:::

## JSON Web Token (JWT)

The API ML authentication token in the form of JWT is signed with an asymmetric private key that is generated during Zowe keystore configuration. The JWT is signed with the RS256 signature algorithm.

- **Private Key Location:**  
Stored under the alias localhost within the PKCS12 keystore located at: `${KEYSTORE_DIRECTORY}/localhost/localhost.keystore.p12`. The public key necessary to validate the JWT signature is read from the keystore.

- Public Key Verification: Third-party applications can programmatically validate the JWT signature by pulling the public key in standard [JWK format](https://datatracker.ietf.org/doc/html/rfc7517) from the following Gateway endpoint:
    ```
    /gateway/api/v1/auth/keys/public
    ```
## z/OSMF JSON Web Tokens Support

Your z/OSMF instance can be enabled to support JWTs as described in [Enabling JSON Web Token support](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.4.0/com.ibm.zos.v2r4.izua300/izuconfig_EnableJSONWebTokens.htm).
In this case, Zowe API ML adopts and passes through the z/OSMF-generated JWT instead of generating a unique Zowe JWT. 

Under this setup:

- Core authentication endpoints like `/gateway/api/v1/login` and `/gateway/api/v1/check` remain fully functional and function in the same way as without z/OSMF JWT.
- The Gateway endpoint `/gateway/api/v1/auth/keys/public` dynamically serves the z/OSMF JSON Web Key (JWK) to allow clients to verify token signatures natively.
