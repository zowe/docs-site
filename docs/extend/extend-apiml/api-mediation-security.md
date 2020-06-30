# Zowe API Mediation Layer Security

- [Zowe API Mediation Layer Security](#zowe-api-mediation-layer-security)
  - [How API ML transport security works](#how-api-ml-transport-security-works)
    - [Transport layer security](#transport-layer-security)
    - [Authentication](#authentication)
    - [Zowe API ML services](#zowe-api-ml-services)
    - [Zowe API ML TLS requirements](#zowe-api-ml-tls-requirements)
    - [Authentication for API ML services](#authentication-for-api-ml-services)
      - [Authentication endpoints](#authentication-endpoints)
      - [Authentication providers](#authentication-providers)
        - [z/OSMF Authentication Provider](#zosmf-authentication-provider)
        - [Dummy Authentication Provider](#dummy-authentication-provider)
    - [Authorization](#authorization)
    - [JWT Token](#jwt-token)
    - [z/OSMF JSON Web Tokens Support](#zosmf-json-web-tokens-support)
    - [API ML truststore and keystore](#api-ml-truststore-and-keystore)
    - [API ML SAF Keyring](#api-ml-saf-keyring)
    - [Discovery Service authentication](#discovery-service-authentication)
    - [Setting ciphers for API ML services](#setting-ciphers-for-api-ml-services)
  - [Participating in Zowe API ML Single-Sign-On](#participating-in-zowe-api-ml-single-sign-on)
    - [Zowe API ML client](#zowe-api-ml-client)
    - [API service accessed via Zowe API ML](#api-service-accessed-via-zowe-api-ml)
    - [Existing services that cannot be modified](#existing-services-that-cannot-be-modified)
  - [ZAAS Client](#zaas-client)
    - [Pre-requisites](#pre-requisites)
    - [API Documentation](#api-documentation)
      - [Obtain a JWT token (`login`)](#obtain-a-jwt-token-login)
      - [Validate and get details from the token (`query`)](#validate-and-get-details-from-the-token-query)
      - [Obtain a PassTicket (`passTicket`)](#obtain-a-passticket-passticket)
    - [Getting Started (Step by Step Instructions)](#getting-started-step-by-step-instructions)
  - [Certificate management in Zowe API Mediation Layer](#certificate-management-in-zowe-api-mediation-layer)
    - [Running on localhost](#running-on-localhost)
      - [How to start API ML on localhost with full HTTPS](#how-to-start-api-ml-on-localhost-with-full-https)
      - [Certificate management script](#certificate-management-script)
      - [Generate certificates for localhost](#generate-certificates-for-localhost)
      - [Generate a certificate for a new service on localhost](#generate-a-certificate-for-a-new-service-on-localhost)
      - [Add a service with an existing certificate to API ML on localhost](#add-a-service-with-an-existing-certificate-to-api-ml-on-localhost)
      - [Service registration to Discovery Service on localhost](#service-registration-to-discovery-service-on-localhost)
    - [Zowe runtime on z/OS](#zowe-runtime-on-zos)
      - [Certificates for z/OS installation from the Zowe PAX file](#certificates-for-zos-installation-from-the-zowe-pax-file)
      - [Import the local CA certificate to your browser](#import-the-local-ca-certificate-to-your-browser)
      - [Generate a keystore and truststore for a new service on z/OS](#generate-a-keystore-and-truststore-for-a-new-service-on-zos)
      - [Add a service with an existing certificate to API ML on z/OS](#add-a-service-with-an-existing-certificate-to-api-ml-on-zos)
      - [Procedure if the service is not trusted](#procedure-if-the-service-is-not-trusted)

## How API ML transport security works

Security within the API Mediation Layer (API ML) is performed on several levels. This article describes how API ML uses Transport Layer Security (TLS). As a system administrator or API developer, use this guide to familiarize yourself with the following security concepts:

### Transport layer security

Secure data during data-transport by using the TLS protocol for all connections to API Mediation Layer services. While it is possible to disable the TLS protocol for debugging purposes or other use-cases, the enabled TLS protocol is the default mode.

### Authentication

Authentication is the method of how an entity, whether it be a user (API Client) or an application (API Service), proves its true identity.

API ML uses the following authentication methods:

- **User ID and password**
    - The user ID and password are used to retrieve authentication tokens.
    - Requests originate from a user.
    - The user ID and password are validated by a z/OS security manager and
    a token is issued that is then used to access the API service.

- **TLS client certificates**
    - Certificates are for service-only requests.

### Zowe API ML services

The following range of service types apply to the Zowe&trade; API ML:

- **Zowe API ML services**

  - **Gateway Service (GW)**
    The Gateway is the access point for API clients that require access to API services.
    API services can be accessed through the Gateway by API Clients. The Gateway receives information about an API Service
    from the Discovery Service.

  - **Discovery Service (DS)**
    The Discovery Service collects information about API services and provides this information to the Gateway
    and other services. API ML internal services are also registered to the Discovery Service.

  - **API Catalog (AC)**
    The Catalog displays information about API services through a web UI. The Catalog receives information
    about an API service from the Discovery Service.

- **Authentication and Authorization Service (AAS)**

  AAS provides authentication and authorization functionality to check user access to resources on z/OS.
  The API ML uses z/OSMF API for  authentication. For more information, see: [APIML wiki](https://github.com/zowe/api-layer/wiki/Zowe-Authentication-and-Authorization-Service)

- **API Clients**

  External applications, users, or other API services that are accessing API services via the API Gateway

- **API Services**

  Applications that are accessed through the API Gateway. API services register themselves to the
  Discovery Service and can access other services through the Gateway. If an API service is installed
  in such a way that direct access is possible, API services can access other services without the Gateway.
  When APIs access other services, they can also function as API clients.

### Zowe API ML TLS requirements

The API ML TLS requires servers to provide HTTPS ports. Each of the API ML services has the following specific requirements:

- **API Client**
    - The API Client is not a server
    - Requires trust of the API Gateway
    - Has a truststore or SAF keyring that contains certificates required to trust the Gateway

- **Gateway Service**
    - Provides an HTTPS port
    - Has a keystore or SAF keyring with a server certificate
        - The certificate needs to be trusted by API Clients
        - This certificate should be trusted by web browsers because the API Gateway can be used to display web UIs
    - Has a truststore or SAF keyring that contains certificates needed to trust API Services

- **API Catalog**
    - Provides an HTTPS port
    - Has a keystore or SAF keyring with a server certificate
        - The certificate needs to be trusted by the API Gateway
        - This certificate does not need to be trusted by anyone else

- **Discovery Service**
    - Provides an HTTPS port
    - Has a keystore or SAF keyring with a server certificate
    - Has a truststore or SAF keyring that contains certificates needed to trust API services

- **API Service**
    - Provides an HTTPS port
    - Has a keystore or SAF keyring with a server and client certificate
        - The server certificate needs to be trusted by the Gateway
        - The client certificate needs to be trusted by the Discovery Service
        - The client and server certificates can be the same
        - These certificates do not need to be trusted by anyone else
    - Has a truststore or SAF keyring that contains one or more certificates that are required to trust the Gateway and Discovery Service

### Authentication for API ML services

- **API Gateway**

    - API Gateway handles authentication.
    - There are two authentication endpoints that allow to authenticate the resource by providers
    - Diagnostic endpoints `/application/**` in API Gateway are protected by basic authentication or Zowe JWT token.

- **API Catalog**

    - API Catalog is accessed by users and requires protection by a login
    - Protected access is performed by the Authentication and Authorization Service

- **Discovery Service**

    - Discovery Service is accessed by API Services
    - This access (reading information and registration) requires protection needs by a client certificate
    - (Optional) Access can be granted to users (administrators)
    - Diagnostic endpoints `/application/**` in Discovery Service are protected by basic authentication or Zowe JWT token.

- **API Services**

    - Authentication is service-dependent
    - Recommended to use the Authentication and Authorization Service for authentication


#### Authentication endpoints

The API Gateway contains two REST API authentication endpoints: `auth/login` and `auth/query`.

The `/login` endpoint authenticates mainframe user credentials and returns an authentication token. The login request requires user credentials though one of the following methods:
  * Basic access authentication
  * JSON with user credentials

When authentication is successful the response to the request is an empty body and a token is contained in a secure `HttpOnly` cookie named `apimlAuthenticationToken`. When authentication fails, a user gets a 401 status code.

The `/query` endpoint validates the token and retrieves the information associated with the token.
The query request requires the token through one of the following methods:
  * A cookie named `apimlAuthenticationToken`
  * Bearer authentication

When authentication is successful the response to the request is a JSON object which contains information associated with the token. When authentication fails, a user gets a 401 status code.

The `/ticket` endpoint generates a PassTicket for the user associated with a token.

This endpoint is protected by a client certificate.
The ticket request requires the token in one of the following formats:

- Cookie named apimlAuthenticationToken.
- Bearer authentication

The request takes one parameter named `applicationName`, the name of the application for which the PassTicket should be generated. This parameter must be supplied.

The response is a JSON object, which contains information associated with the ticket.

For more details, see the OpenAPI documentation of the API Mediation Layer in the API Catalog.

#### Authentication providers

API ML contains the following providers to handle authentication for the API Gateway:
* `z/OSMF Authentication Provider`
* `Dummy Authentication Provider`

##### z/OSMF Authentication Provider

The `z/OSMF Authentication Provider` allows API Gateway to authenticate with the z/OSMF service. The user needs z/OSMF access in order to authenticate.

Use the following properties of API Gateway to enable the `z/OSMF Authentication Provider`:
```
apiml.security.auth.provider: zosmf
apiml.security.auth.zosmfServiceId: zosmf  # Replace me with the correct z/OSMF service id
```

##### Dummy Authentication Provider

The `Dummy Authentication Provider` implements simple authentication for development purpose using dummy credentials (username:  `user`, password `user`). The `Dummy Authentication Provider` allows API Gateway to run without authenticating with the z/OSMF service.

Use the following property of API Gateway to enable the `Dummy Authentication Provider`:
```
apiml.security.auth.provider: dummy
```

### Authorization

Authorization is a method used to determine access rights of an entity.

In the API ML, authorization is performed by the z/OS security manager ([CA ACF2](https://www.ca.com/us/products/ca-acf2.html), [IBM RACF](https://www.ibm.com/support/knowledgecenter/zosbasics/com.ibm.zos.zsecurity/zsecc_042.htm), [CA Top Secret](https://www.ca.com/us/products/ca-top-secret.html)). An authentication token is used as proof of valid authentication. The authorization checks, however, are always performed by the z/OS security manager.

### JWT Token

The JWT secret that signs the JWT Token is an asymmetric private key that is generated during Zowe keystore configuration. The JWT token is signed with the RS256 signature algorithm.

You can find the JWT secret, alias `jwtsecret`, in the PKCS12 keystore that is stored in `${KEYSTORE_DIRECTORY}/localhost/localhost.keystore.p12`. The public key necessary to validate the JWT signature is read from the keystore.

For easy access, you can find the public key in the `${KEYSTORE_DIRECTORY}/localhost/localhost.keystore.jwtsecret.pem` file.

You can also use `/api/v1/gateway/auth/keys/public/all` endpoint to obtain all public keys that can be used to verify JWT tokens signature in a standard [JWK format](https://openid.net/specs/).

### z/OSMF JSON Web Tokens Support

Your z/OSMF instance can be enabled to support JWT tokens as described at [Enabling JSON Web Token support](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.4.0/com.ibm.zos.v2r4.izua300/izuconfig_EnableJSONWebTokens.htm).
In this case, the Zowe API ML uses this JWT token and does not generate its own Zowe JWT token. All authentication APIs, such as `/api/v1/gateway/login` and `/api/v1/gateway/check` function in the same way as without z/OSMF JWT.
The `zowe-setup-certificates.sh` stores the z/OSMF JWT public key to the `localhost.keystore.jwtsecret.pem` that can be used for JWT signature validation.

### API ML truststore and keystore

A _keystore_ is a repository of security certificates consisting of either authorization certificates or public key certificates with corresponding private keys (PK), used in TLS encryption. A _keystore_ can be stored in Java specific format (JKS) or use the standard format (PKCS12). The Zowe API ML uses PKCS12 to enable the keystores to be used
by other technologies in Zowe (Node.js).

### API ML SAF Keyring

As an alternative to using a keystore and truststore, API ML can read certificates from a SAF keyring. The user running the API ML must have rights to access the keyring. From the java perspective, the keyring behaves as the `JCERACFKS` keystore. The path to the keyring is specified as `safkeyring:////user_id/key_ring_id`. The content of SAF keyring is equivalent to the combined contents of the keystore and the truststore.

**Note:** When using JCEFACFKS as the keystore type, ensure that you define the class to handle the RACF keyring using the `-D` options to specify the `java.protocol.handler.pkgs property`:

    -Djava.protocol.handler.pkgs=com.ibm.crypto.provider

The elements in the following list, which apply to the API ML SAF Keyring, have these corresponding characteristics:

**The API ML local certificate authority (CA)**

- The API ML local CA contains a local CA certificate and a private key that needs to be securely stored.
- The API ML local certificate authority is used to sign certificates of services.
- The API ML local CA certificate is trusted by API services and clients.

**The API ML keystore or API ML SAF Keyring**

- Server certificate of the Gateway (with PK). This can be signed by the local CA or an external CA.
- Server certificate of the Discovery Service (with PK). This can be signed by the local CA.
- Server certificate of the Catalog (with PK). This can be signed by the local CA.
- Private asymmetric key for the JWT token, alias `jwtsecret`. The public key is exported to the `localhost.keystore.jwtsecret.cer` directory.
- The API ML keystore is used by API ML services.

**The API ML truststore or API ML SAF Keyring**

- Local CA public certificate.
- External CA public certificate (optional).
- Can contain self-signed certificates of API Services that are not signed by the local or external CA.
- Used by API ML services.

**Zowe core services**

- Services can use the same keystore and truststore or the same keyring as APIML for simpler installation and management.
- When using a keystore and truststore, services have to have rights to access and read them on the filesystem.
- When using a keyring, the user of the service must have authorization to read the keyring from the security system.
- Alternatively, services can have individual stores for higher security.

**API service keystore or SAF keyring** (for each service)

- The API service keystore contains a server and client certificate signed by the local CA.

**API service truststore or SAF keyring** (for each service)

- (Optional) The API service truststore contains a local CA and external CA certificates.

**Client certificates**

- A client certificate is a certificate that is used for validation of the HTTPS client. The client certificate of a Discovery Service client can be the same certificate as the server certificate of the services which the Discovery Service client uses.

### Discovery Service authentication

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

### Setting ciphers for API ML services

You can override ciphers that are used by the HTTPS servers in API ML services by configuring properties of the Gateway, Discovery Service, and API Catalog.

**Note:** You do not need to rebuild JAR files when you override the default values in shell scripts.

The *application.yml* file contains the default value for each service, and can be found [here](https://github.com/zowe/api-layer/blob/master/gateway-service/src/main/resources/application.yml). The default configuration is packed in .jar files. On z/OS, you can override the default configuration in `$ZOWE_ROOT_DIR/components/api-mediation/bin/start.sh`.
Add the launch parameter of the shell script to set a cipher:

```
-Dapiml.security.ciphers=<cipher-list>
```

On localhost, you can override the default configuration in [config/local/gateway-service.yml](https://github.com/zowe/api-layer/blob/master/config/local/gateway-service.yml) (including other YAML files for development purposes).

The following list shows the default ciphers. API ML services use the following cipher order:

**Note:** Ensure that the version of Java you use is compatible with the default cipherset.

```
   TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,
   TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,
   TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256,
   TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384
```

Only IANA ciphers names are supported. For more information, see [Cipher Suites](https://wiki.mozilla.org/Security/Server_Side_TLS#Cipher_suites) or [List of Ciphers](https://testssl.net/openssl-iana.mapping.html).

## Participating in Zowe API ML Single-Sign-On

As Zowe extender, you can extend Zowe and participate in Zowe Single-Sign-On provided by Zowe API ML.

The Zowe Single-Sign-On is based on a single authentication/identity token that identifies the z/OS user. This token needs to be trusted by extensions in order to be used. Only Zowe API ML and the ZAAS compoment (described above), can issue the authentication token based on valid z/OS credentials.

In the current release of Zowe, only a single z/OS security domain can be used. The current Zowe release also allows for a single technology scope, whereby only a single-sign-on to Zowe Desktop is possible. As such, a second sign-on is necessary to different types of clients, such as Zowe CLI, or web applications outside of Zowe Desktop.

This following section outlines the high-level steps necessary to achieve the sign-on.

There are two main types of components that are used in Zowe SSO via API ML:

* Zowe API ML client

   - This type of compoment is user-facing and can obtain credentials from the user through a user interface (web, CLI, desktop)
   - The Zowe API ML client calls API services through the API ML
   - An example of such clients are Zowe CLI or Zowe Desktop. Clients can be web or mobile applications

* An API service accessed through Zowe API ML

   - A service that is registered to API ML and is accessed through the API Gateway

In following sections, you will learn what is necessary to participate SSO for both types.

### Zowe API ML client

* Zowe API ML client needs to obtain an authentication token via the `/login` endpoint of ZAAS described above. This endpoint requires valid credentials.
* The client should not rely on the token format but use the ZAAS `/query` endpoint to validate the token and get information about it. This is useful when the API client has the token but does not store the associated data such as user ID.
* The API client needs to provide the authentication token to the API services in the form of a Secure HttpOnly cookie with the name `apimlAuthenticationToken` or in `Authorization: Bearer` HTTP header as described in the [Authenticated Request](https://github.com/zowe/sample-spring-boot-api-service/blob/master/zowe-rest-api-sample-spring/docs/api-client-authentication.md#authenticated-request).

**Note:** Plans for Zowe CLI to be an API ML client in the future, are desribed at [Zowe CLI: Token Authentication, MFA, and SSO](https://medium.com/zowe/zowe-cli-token-authentication-mfa-and-sso-b88bca3efa35).

### API service accessed via Zowe API ML

This section describes the requirements of a service to adopt the Zowe authentication token. Zowe will be able to support services that accept PassTickets in the future.

* The API service must accept the authentication token to the API services in the form of a Secure HttpOnly cookie with the name `apimlAuthenticationToken` or in the `Authorization: Bearer` HTTP header as described in the [Authenticated Request](https://github.com/zowe/sample-spring-boot-api-service/blob/master/zowe-rest-api-sample-spring/docs/api-client-authentication.md#authenticated-request).
* The API service must validate the token and extract information about the user ID by calling `/query` endpoint of the ZAAS described above. The alternative is validate the signature of the JWT token. The format of the signature and location of the public key is described above. The alternative should be used only when the calling of `/query` endpoint is not feasible.
* The API service needs to trust the Zowe API gateway that hosts the ZAAS, it needs to have the certificate of the CA that signed the Zowe API Gateway in its truststore.

The REST API of the ZAAS can be easily called from a Java application using [ZAAS Client](#zaas-client) described below.

### Existing services that cannot be modified

If you have a service that cannot be changed to adopt Zowe authentication token, they can still participate in Zowe Single-Sign-On via API ML.

They need to accept PassTicket in the HTTP Authorization header.
See [Enabling PassTicket creation for API Services that Accept PassTickets](api-mediation-passtickets.md) for more details.


## ZAAS Client

The ZAAS client is a plain Java library that provides authentication through a simple unified interface without the need
for detailed knowledge of the REST API calls presented in this section. The Client function has only a few dependencies including Apache HTTP Client, Lombok, and their associated dependencies. The client contains methods for retrieval of the JWT token, the PassTicket, and verification of JWT token information.

### Pre-requisites

- Java SDK version 1.8.
- An active instance of the API ML Gateway Service.
- A property file which defines the keystore or truststore certificates.

### API Documentation

The plain java library provides the `ZaasClient` interface with following public methods:

```java
public interface ZaasClient {
    String login(String userId, String password) throws ZaasClientException;
    String login(String authorizationHeader) throws ZaasClientException;
    ZaasToken query(String token) throws ZaasClientException;
    String passTicket(String jwtToken, String applicationId) throws ZaasClientException, ZaasConfigurationException;
}
```

This Java code enables your application to add the following functions:

- **Obtain a JWT token (`login`)**
- **Validate and get details from the token (`query`)**
- **Obtain a PassTicket (`passTicket`)**

#### Obtain a JWT token (`login`)

To integrate login, call one of the following methods for login in the `ZaasClient` interface:

- If the user provides credentials in the request body, call the following method from your API:

  ```java
  String login(String userId, String password) throws ZaasClientException;
  ```

- If the user provides credentials as Basic Auth, use the following method:

    ```java
    String login(String authorizationHeader) throws ZaasClientException;
    ```

These methods return the JWT token as a String. This token can then be used to authenticate the user in subsequent APIs.

**Note:**
Both methods automatically use the truststore file to add a security layer, which requires configuration in the `ConfigProperties` class.

#### Validate and get details from the token (`query`)

Use the `query` method to get the details embedded in the token. These details include creation time of the token, expiration time of the token, and the user who the token is issued to.

To use this method, call the method from your API.

```java
ZaasToken query(String token) throws ZaasClientException;
```

In return, you receive the `ZaasToken` Object in JSON format.

This method automatically uses the truststore file to add a security layer, which you configured in the `ConfigProperties` class.

#### Obtain a PassTicket (`passTicket`)

The `passTicket` method has an added layer of protection. To use this method, call the method of the interface and provide
a valid APPLID of the application and JWT token as an input.

The APPLID is the name of the application (up to 8 characters) that is used by security products to differentiate certain security operations (like PassTickets) between applications.

This method has an added layer of security, whereby you do not have to provide an input to the method since you already initialized the `ConfigProperties` class. As such, this method automatically fetches the truststore and keystore files as an input.

In return, this method provides a valid pass ticket as a String to the authorized user.

**Tip:** For additional information about PassTickets in API ML see [Enabling PassTicket creation for API Services that Accept PassTickets](https://docs.zowe.org/stable/extend/extend-apiml/api-mediation-passtickets.html).

### Getting Started (Step by Step Instructions)

To use this library, use the procedure described in this section.

**Follow these steps:**

1. Add `zaas-client` as a dependency in your project.

    Gradle:

      ```groovy
      dependencies {
          compile 'org.zowe.apiml.sdk:zaas-client:{{version}}'
      }
      ```

    Maven:

      ```xml
      <dependency>
                  <groupId>org.zowe.apiml.sdk:zaas-client</groupId>
                  <artifactId>{{version}}</artifactId>
      </dependency>
      ```

2. In your application, create your java class which will be used to create an instance of `ZaasClient`, which enables you to use its method to login, query, and to issue passTicket.

3. To use `zaas-client`, provide a property file for configuration.

   **Tip:** Check `org.zowe.apiml.zaasclient.config.ConfigProperites` to see which properties are required in the property file.

   **Configuration Properties:**

    ```java
    public class ConfigProperties {
        private String apimlHost;
        private String apimlPort;
        private String apimlBaseUrl;
        private String keyStoreType;
        private String keyStorePath;
        private String keyStorePassword;
        private String trustStoreType;
        private String trustStorePath;
        private String trustStorePassword;
    }
    ```

4. Create an instance of `ZaasClient` in your class and provide the `configProperties` object.

   **Example:**

    ```java
    ZaasClient zaasClient = new ZaasClientHttps(getConfigProperties());
    ```

You can now use any method from `ZaasClient` in your class.

**Example:**

For login, use the following code snippet:

```java
   String zaasClientToken = zaasClient.login("user", "user");
 ```

The following codeblock is an example of a `SampleZaasClientImplementation`.

**Example:**

```java
public class SampleZaasClientImplementation {

    /**
     * This method is used to fetch token from zaasClient
     * @param username
     * @param password
     * @return
     */
    public String login(String username, String password) {
        try {
            ZaasClient zaasClient = new ZaasClientHttps(getConfigProperties());
            String zaasClientToken = zaasClient.login(username, password);
            //Use this token  in subsequent calls
            return zaasClientToken;
        } catch (ZaasClientException | ZaasConfigurationException exception) {
            exception.printStackTrace();
        }
    }

    private ConfigProperties getConfigProperties() {
        // Load the values for configuration properties
     }
}
```

## Certificate management in Zowe API Mediation Layer

### Running on localhost

#### How to start API ML on localhost with full HTTPS

The https://github.com/zowe/api-layer repository already contains pre-generated certificates that can be used to start API ML with HTTPS on your computer. The certificates are not trusted by your browser so you can either ignore the security warning or generate your own certificates and add them to the truststore of your browser or system.

The certificates are described in more detail in the [TLS Certificates for localhost](https://github.com/zowe/api-layer/blob/master/keystore/README.md).

**Note:** When running on localhost, only the combination of using a keystore and truststore is supported.


#### Certificate management script

Zowe API Mediation Layer provides a script that can be used on Windows, Mac, Linux, and z/OS
to generate a certificate and keystore for the local CA, API Mediation Layer, and services.

This script is stored in `zowe/zowe-install-packaging` repository [bin/apiml_cm.sh](https://github.com/zowe/zowe-install-packaging/blob/master/bin/apiml_cm.sh).
It is a UNIX shell script that can be executed by Bash or z/OS Shell. For Windows, install Bash by going to the following link: [cmder](http://cmder.net/).


#### Generate certificates for localhost

**Follow these steps:**

1. Clone the `zowe-install-packaging` repository to your local machine.
2. Place the `bin/apiml_cm.sh` script intoto `scripts` directory in your API Mediation Layer repository folder
3. Use the following script in the root of the `api-layer` repository to generate certificates for localhost:

`scripts/apiml_cm.sh --action setup`

This script creates the certificates and keystore for the API Mediation Layer in your current workspace.


#### Generate a certificate for a new service on localhost

To generate a certificate for a new service on localhost, see [Generating certificate for a new service on localhost](https://github.com/zowe/api-layer/blob/master/keystore/README.md#generating-certificate-for-a-new-service-on-localhost).


#### Add a service with an existing certificate to API ML on localhost

For more information about adding a service with an existing certificate to API ML on localhost, see [Trust certificates of other services](https://github.com/zowe/api-layer/blob/master/keystore/README.md#trust-certificates-of-other-services).


#### Service registration to Discovery Service on localhost

To register a new service to the Discovery Service using HTTPS, provide a valid client certificate that is trusted by the Discovery Service.


### Zowe runtime on z/OS

#### Certificates for z/OS installation from the Zowe PAX file

Certificates for the API ML local CA and API ML service are automatically generated by installing the Zowe runtime on z/OS from the PAX file. Follow the instructions in [Installing the Zowe runtime on z/OS](../../user-guide/install-zos.md).

These certificates are generated by the certificate management script `zowe-setup-certificates.sh` that is installed to `$ZOWE_ROOT_DIR/bin/zowe-setup-certificates.sh`. This script internally calls the apiml_cm.sh script.

`$ZOWE_ROOT_DIR` is the directory where you installed the Zowe runtime.

The certificates are generated to the directory `$KEYSTORE_DIRECTORY` that is defined in a customized `$ZOWE_ROOT_DIR/bin/zowe-setup-certificates.env` file.

API ML keystore and truststore:

  * `$KEYSTORE_DIRECTORY/localhost/localhost.keystore.p12`
    - used for the HTTPS servers
    - contains the APIML server certificate signed by the local CA and private key for the server

  * `$KEYSTORE_DIRECTORY/localhost/localhost.truststore.p12`
    - used to validate trust when communicating with services that are registered to the API ML
    - contains the root certificate of the local CA (not the server certificate)
    - contains the local CA public certificate
    - can contain additional certificate to trust services that are not signed by a local CA

API ML keystores and truststores need be accessible by the user ID that executes the Zowe runtime.

Local CA:

  * `$KEYSTORE_DIRECTORY/local_ca/localca.cer`
    - public certificate of local CA

  * `$KEYSTORE_DIRECTORY/local_ca/localca.keystore.p12`
    - private key of the local CA

The local CA keystore is only accessible by the user that installs and manages the Zowe runtime.


#### Import the local CA certificate to your browser

Trust in the API ML server is a necessary precondition to properly encrypt traffic between web browsers and REST API client applications. Ensure this trust through the installation of a Certificate Authority (CA) public certificate. By default, API ML creates a local CA. Import the CA public certificate to the truststore for REST API clients and to your browser. You can also import the certificate to your root certificate store.

**Note:** The public certificate in the [PEM format](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) is stored at `$KEYSTORE_DIRECTORY/local_ca/localca.cer` where `$KEYSTORE_DIRECTORY` is defined in a customized `$ZOWE_ROOT_DIR/bin/zowe-setup-certificates.env` file during an installation step that generates Zowe certificates.

The certificate is stored in UTF-8 encoding so you need to transfer it as a binary file. Since this is the certificate to be trusted by your browser, it is recommended to use a secure connection for transfer.

**Follow these steps:**

1. Download the local CA certificate to your computer. Use one of the following methods to download the local CA certificate to your computer:

    - **Use [Zowe CLI](https://github.com/zowe/zowe-cli#zowe-cli--) (Recommended)**
    Issue the following command:

    `zowe zos-files download uss-file --binary $KEYSTORE_DIRECTORY/local_ca/localca.cer`

    - **Use `sftp`**
    Issue the following command:

    ```
    sftp <system>
    get $KEYSTORE_DIRECTORY/local_ca/localca.cer
    ```

    To verify that the file has been transferred correctly, open the file. The following heading and closing should appear:

    ```
    -----BEGIN CERTIFICATE-----
    ...
    -----END CERTIFICATE-----
    ```

2. Import the certificate to your root certificate store and trust it.

    - **For Windows**, run the following command:

      `certutil -enterprise -f -v -AddStore "Root" localca.cer`

      **Note:** Ensure that you open the terminal as **administrator**. This will install the certificate to the Trusted Root Certification Authorities.

    - **For macOS**, run the following command:

      `$ sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain localca.cer`

    - **For Firefox**, manually import your root certificate via the Firefox settings, or force Firefox to use the Windows truststore.

      **Note:** Firefox uses its own certificate truststore.

        Create a new Javascript file firefox-windows-truststore.js at `C:\Program Files (x86)\Mozilla Firefox\defaults\pref` with the   following content:

      ```
      /* Enable experimental Windows truststore support */
      pref("security.enterprise_roots.enabled", true);
      ```

#### Generate a keystore and truststore for a new service on z/OS

You can generate a keystore and truststore for a new service by calling the `apiml_cm.sh` script in the directory with API Mediation Layer:

```
cd $ZOWE_ROOT_DIR
bin/apiml_cm.sh --action new-service --service-alias <alias> --service-ext <ext> \
--service-keystore <keystore_path> --service-truststore <truststore_path> \
--service-dname <dname> --service-password <password> --service-validity <days> \
--local-ca-filename $KEYSTORE_DIRECTORY/local_ca/localca
 ```

The `service-alias` is an unique string to identify the key entry. All keystore entries (key and trusted certificate entries) are accessed via unique aliases. Since the keystore will have only one certificate, you can omit this parameter and use the default value `localhost`.

The `service-keystore` is a repository of security certificates plus corresponding private keys. The `<keystore_path>` is the path excluding the extension to the keystore that will be generated. It can be an absolute path or a path relative to the current working directory. The key store is generated in PKCS12 format with `.p12` extension. It should be path in an existing directory where your service expects the keystore.

**Example:** `/opt/myservice/keystore/service.keystore`.

The `service-truststore` contains certificates from other parties that you expect to communicate with, or from Certificate Authorities that you trust to identify other parties. The `<truststore_path>` is the path excluding the extension to the trust store that will be generated. It can be an absolute path or a path relative to the current working directory. The truststore is generated in PKCS12 format.

The `service-ext` specifies the X.509 extension that should be the Subject Alternate Name (SAN). The SAN contains host names that are used to access the service. You need specify the same hostname that is used by the service during API Mediation Layer registration.

**Example:** `"SAN=dns:localhost.localdomain,dns:localhost,ip:127.0.0.1"`

**Note:** For more information about SAN, see *SAN or SubjectAlternativeName* at [Java Keytool - Common Options](https://www.ibm.com/support/knowledgecenter/en/SSYKE2_8.0.0/com.ibm.java.security.component.80.doc/security-component/keytoolDocs/commonoptions.html).

The `service-dname` is the X.509 Distinguished Name and is used to identify entities, such as those which are named by the subject and issuer (signer) fields of X.509 certificates.

**Example:** `"CN=Zowe Service, OU=API Mediation Layer, O=Zowe Sample, L=Prague, S=Prague, C=CZ"`

The `service-validity` is the number of days after until the certificate expires.

The `service-password` is the keystore password. The purpose of the password is the integrity check. The access protection for the keystore and keystore need to be achieved by making them accessible only by the ZOVESVR user ID and the system administrator.

The `local-ca-filename` is the path to the keystore that is used to sign your new certificate with the local CA private key. It should point to the `$KEYSTORE_DIRECTORY/local_ca/localca` where `$KEYSTORE_DIRECTORY` is defined in a customized `$ZOWE_ROOT_DIR/bin/zowe-setup-certificates.env` file during an installation step that generates Zowe certificates.


#### Add a service with an existing certificate to API ML on z/OS

The API Mediation Layer requires validation of the certificate of each service that it accessed by the API Mediation Layer. The API Mediation Layer requires validation of the full certificate chain. Use one of the following methods:

- Import the public certificate of the root CA that has signed the certificate of the service to the APIML truststore.

- Ensure that your service has its own certificate. If it was signed by intermediate CA all intermediate CA certificates ensure that all certificates are in its keystore.

  **Note:** If the service does not provide intermediate CA certificates to the APIML then the validation fails. This can be circumvented by importing the intermediate CA certificates to the API ML truststore.

Import a public certificate to the APIML truststore by calling in the directory with API Mediation Layer:

```
cd $ZOWE_ROOT_DIR
bin/apiml_cm.sh --action trust --certificate <path-to-certificate-in-PEM-format> --alias <alias>
```

#### Procedure if the service is not trusted

When you try to access a service with the request similar to:

**Example:**

```http --verify=$KEYSTORE_DIRECTORY/local_ca/localca.cer GET https://<gatewayHost>:<port></port>/api/v1/<untrustedService>/greeting```

You will receive a similar response:

```
    HTTP/1.1 502
    Content-Type: application/json;charset=UTF-8

    {
        "messages": [
            {
                "messageContent": "The certificate of the service accessed by HTTPS using URI '/api/v1/<untrustedService>/greeting' is not trusted by the API Gateway: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target",
                "messageKey": "apiml.common.tlsError",
                "messageNumber": "AML0105",
                "messageType": "ERROR"
            }
        ]
    }
```

The response has the HTTP status code [502 Bad Gateway](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502) and a JSON response in the standardized format for error messages. The message has key `apiml.common.tlsError` and the message number `AML0105` and content that explains details about the message.

If you receive this message, import the certificate of your service or the CA that has signed it to the truststore of the API Mediation Layer as described above.
