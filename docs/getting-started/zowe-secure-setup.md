# Zowe secureity features
<! #NOTE: This article is not about certificates configuration. It is placed in the Getting Started department and is intended to provide
really only an overview of the security concepts implemented by Zowe.  
-->

Learn about the Zowe security features before you start using or installing Zowe.

Zowe implements comprehensive measures to secure mainframe services and data resources from unauthorized access, regardless if in transition or in rest.

Digital certificates according to x.509 standard specification are the cornerstone for securing communication channels between clients and servers, as well as can be used to provide identification of clients and service users.  
The communication channels are secured by the latest versions of Transport Layer Security (TLS) using x.509 certificates. Client identification can be ensured by the proof of ownership of provided x.509 certificate.  
User access is managed by authenticating the user identity via modern authentication methods, such as Multi-Factor Authentication (MFA), JWT, or Personal Access Token (PAT).
Authorization to access is managed by the mainframe security facility.

Read further to learn more detail on how Zowe leverages modern security concepts and technologies:
- Digital certificates

  - [Digital certificates usage](#digital-certificates-usage)
  - [PKI (Public Key Infrastructure)](#public-key-infrastructure)
  - [Transport Layer Security (TLS)](#transport-layer-security)
  - [Digital certificates types](#digital-certificates-types)
  - [Certificates storage](#certificates-storage)
- Authentication methods
  - [Authentication with JSON Web Tokens(JWT)](#authentication-with-json-web-tokensjwt)
  - [Authentication with client certificates](#authentication-with-client-certificates)
  - [Authentication with Personal Access Token (PAT)](#authentication-with-personal-access-token-pat)
  - [Authentication with SAF IDT Tokens (SAF IDT)](#authentication-with-saf-identity-tokens)
  - [Multi-factor authentication (MFA)](#multi-factor-authentication-mfa)
- [Access Authorization](#authorization)

## Digital certificates
Digital certificates facilitate secure electronic communication and data exchange between people, systems, and devices online. They are the foundation to implementing [Public Key Infrastructure (PKI)](#public-key-infrastructure) security.
A Digital Certificate is an electronic file that is tied to a cryptographic (public and private) key pair and authenticates the identity of a website, individual, organization, user, device or server.

Digital certificates are issued by Certificate Authorities (CAs), which are trusted organizations providing infrastructure for creation of the certificates according to the contemporary security standards.   
CAs also provide certificate revocation and validation methods. 

In some cases, e.g. for testing purposes of Zowe, it is acceptable to use certificates issued and signed either by a company local CA, or even self-signed certificates issued by using security tools specific for the target technology platform.
This is however not recommended for production environments.

### Digital certificates usage
Digital certificates perform two primary functions:
- Verifying the identity of the sender/receiver of an electronic message
- Providing the means to encrypt/decrypt messages between sender and receiver.

Zowe uses digital certificates as foundation element of the communication and identity security.

Learn more about how to set up and configure digital certificates used in Zowe - <!-- #TODO Provide link.-->

### Public key infrastructure
PKI, or Public Key Infrastructure is an important aspect of internet security. It is the set of technology and processes
that make up a framework of encryption to protect and authenticate digital communications.
This includes software, hardware, policies, and procedures that are used to create, distribute, manage, store, and revoke digital certificates.

<!-- TODO: Learn more about PKI ...provide link to:
  - GLosary, FAQ, Standards, Specifications BLogs?
-->

### Transport Layer Security
<!-- #TODO: Provide a concise description of wat digital certificate is. Keep it basic and don't focus that much on details on usage or infrastructure. -->
Transport Layer Security (TLS) is a standard protocol that provides authentication, privacy and data integrity between two communicating computer applications.
TLS uses a client-server handshake mechanism to establish an encrypted and secure connection and to ensure the authenticity of the communication.

The TLS should be used to ensure secure data-transport for all connections to API Mediation Layer services.
To best illustrate how TLS works, look at the provided diagram below:
![img.png](img.png)
<!-- #TODO: Provide TLS diagram - either own or from a free source -->
<!-- Candidate to remove or move elsewhere 
  - Java in version at least 8 sr6 fp25 is installed on the system.
  - The following list shows the cipher suites that API ML services use.

```
TLS_AES_128_GCM_SHA256, TLS_AES_256_GCM_SHA384, TLS_CHACHA_POLY1305_SHA256
```
-->

For more information, see the [TLS requirements in Zowe API ML requirements](../extend/extend-apiml/zowe-api-mediation-layer-security-overview#zowe-api-ml-tls-requirements).

### Digital certificates types
The digital certificates can be issued in various formats. The format is dependent on the certificate storage type PKCS12 or JKS/JCEKS.
The most general and widely deployed certificate format today is PKCS12, while the JKS and the more extended JCEKS are specific for Java environments.

**Note: Java 9 and higher can also work with PKCS12 certificates

### Certificates storage

- Keystores and truststores
  - PKCS12](#pkcs12)

  - SAF Keyring

You can choose to use a SAF keyring instead of keystore and truststore for storing certificates. It is more secure than PKCS12 files. And SAF keyring allows you to import existing or generate new certificates with Top Secret, ACF2, and RACF.

For details about SAF Keyring, see the documentation [here](../extend/extend-apiml/certificate-management-in-zowe-apiml.md).

## Authentication methods

The API Mediation Layer provides multiple methods which clients can use to authenticate.

### Authentication with JSON Web Tokens(JWT)

When the user successfully authenticates with the API ML, the client receives a JWT token in exchange. This token can be used by the client to access REST services behind the API ML Gateway and also for subsequent user authentication. The access JWT Token is signed with the private key that is configured in the Zowe Identity Provider's certificate store, be it keystore or keyring.

To utilize [Single-Sign-On (SSO)](../user-guide/systemrequirements-zos#single-sign-on-sso), the Zowe API ML client needs to provide the access token to API services in the form of the cookie `apimlAuthenticationToken`, or in the `Authorization: Bearer` HTTP header as described [here](https://github.com/zowe/sample-spring-boot-api-service/blob/master/zowe-rest-api-sample-spring/docs/api-client-authentication.md#authenticated-request).

- Validation:
  - Use Gateway query endpoint to validate the token and retrieve the information associated with the token.
  - Use JWKS to validate.

- JWT token issuers
  - API ML - SAF, zOSMF LTPA (Lightweight Third-Party Authentication)
  - zOSMF - zOSMF JWT

Encoded JWT example:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Note:** The endpoint is disabled by default.

### Authentication with client certificates

If the keyring or a truststore contains at least one valid certificate authority (CA) other than the CA of the API ML, it is possible to use the client certificates issued by this CA to authenticate to the API ML.

It is provided by client during the TLS handshake. And this authentication is performed with the following prerequisites:

- The authentication scheme is `x509` standard.
- Certificate Authority (CA) must be trusted by Zowe.
- Extended Key Usage (EKU) should contain a Client Authentication entry.
- The certificate is connected to mainframe identity.

For details, see the [Authentication for API ML services documentation](../extend/extend-apiml/authentication-for-apiml-services#authentication-parameters).

### Authentication with Personal Access Token (PAT)

A Personal Access Token (PAT) is a specific scoped JWT with configurable validity duration. PAT authentication method is an alternative to using client certificate for authentication. It is disabled by default. To enable this functionality, see [the configuration documentation](../user-guide/api-mediation/api-gateway-configuration#personal-access-token ).

**Benefits**

- Long-lived. The maximum validity is 90 days.
- Scoped. Users are required to provide a scope. It is only valid for the specified services.
- Secure. If a security breech is suspected, the security administrator can invalidate all the tokens based on criteria as established by rules.

For more information about PAT, see [the Personal Access Token documentation](../user-guide/api-mediation/api-mediation-personal-access-token).

### Authentication with SAF Identity Tokens

The SAF Authentication Provider allows the API Gateway to authenticate the user directly with the z/OS SAF provider that is installed on the system.

The SAF IDT token is signed in JWT format and can be consumed by southbound services.

SAF IDT is issued for specified `APPLID` and is valid for up to 24 hours. The SAF IDT is not returned to the clients. They receive an API ML-generated JWT access token instead, which is internally mapped to the corresponding SAF IDT.

For more information about configuring the token, see the [Configure signed SAF Identity tokens (IDT) documentation](../user-guide/configure-zos-system#configure-signed-saf-identity-tokens-idt).

**Validation**

- API ML REST endpoint is used.
- The security administrator can configure an IDTDATA class profile to control how certain fields in an IDT are generated and how a specified IDT is validated in `RACROUTE REQUEST=VERIFY`. For details, see the ***Signed and Unsigned Identity Tokens*** and ***IDT Configuration*** subsections in [z/OS Security Server RACROUTE Macro Reference](https://www.ibm.com/docs/en/zos/2.4.0?topic=reference-activating-using-idta-parameter-in-racroute-requestverify).

## Multi-factor authentication (MFA)

Multi-factor authentication is provided by third-party products which Zowe is compatible with. The following are known to work:

- [CA Advanced Authentication Mainframe](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-advanced-authentication-mainframe/2-0.html)
- [IBM Z Multi-Factor Authentication](https://www.ibm.com/products/ibm-multifactor-authentication-for-zos).

For details about multi-fator authentication, see [the MFA documentation here](../user-guide/mvd-configuration#multi-factor-authentication-configuration).

### Certificate Authority Advanced Authentication Mainframe (CA AAM)

To add dynamic element to the authentication, you can configure the Certificate Authority Advanced Authentication Mainframe to enable multi-factor authentication. For details about CA AAM, see [the documentation](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-advanced-authentication-mainframe/2-0.html).

**Note:** Make sure that SSO is configured before you use MFA in Zowe.

**Prerequisite**

To support the multi-factor authentication, it is necessary to apply z/OSMF APAR [PH39582](https://www.ibm.com/support/pages/apar/PH39582).

**Limitations**

- Next token mode isn’t supported. But there is a workaround using TN3270.
- New PIN Mode isn’t supported.

## Authorization

The API ML can check for the authorization of the user on certain endpoints. Access to a SAF resource is checked with External Security Manager (ESM).

### SAF resource check

To verify the ownership of the SAF resource, you can use the following available providers:

- `native`(*default*) - on-platform
- `endpoint` - off-platform

**Example of the protected service**

`GET /gateway/{serviceId}/`

For detailed information, see the [SAF resource checking documentation](../user-guide/api-mediation/api-gateway-configuration#saf-resource-checking).
