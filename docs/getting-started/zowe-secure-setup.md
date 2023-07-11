# Zowe Security Overview
<!-- #NOTE: This article is not about certificates configuration. 
It is placed in the Getting Started department and is intended to provide a hogh-level overview of the security concepts
implemented by Zowe.
-->

Before installation and use of Zowe server-side components it is practical to first learn about security features built into the Zowe architecture.

Zowe implements comprehensive measures to secure mainframe services and data resources from unauthorized access.
Digital certificates are used by Zowe to facilitate secure electronic communication and data exchange between people, systems, and devices online.
User access is managed by authenticating user identity thorough modern authentication methods such as Multi-Factor Authentication (MFA), JWT, or Personal Access Token (PAT).
Authorization to access is managed by the mainframe security facility. 
Data is protected, in transition and in rest.

See the following topics to learn more detail about how Zowe leverages modern security concepts and technologies:

- [Digital certificates](#digital-certificates)
  - [Digital certificates usage](#digital-certificates-usage)
  - [PKI (Public Key Infrastructure)](#public-key-infrastructure)
  - [Transport Layer Security (TLS)](#transport-layer-security)
  - [Digital certificates types](#digital-certificates-types)
  - [Certificates storage](#certificates-storage)
- [Authentication methods](#authentication-methods)
  - [Authentication with JSON Web Tokens(JWT)](#authentication-with-json-web-tokensjwt)
  - [Authentication with client certificates](#authentication-with-client-certificates)
  - [Authentication with Personal Access Token (PAT)](#authentication-with-personal-access-token-pat)
  - [Authentication with SAF IDT Tokens (SAF IDT)](#authentication-with-saf-identity-tokens)
  - [Multi-factor authentication (MFA)](#multi-factor-authentication-mfa)
  - [Certificate Authority Advanced Authentication Mainframe (CA AAM)](#certificate-authority-advanced-authentication-mainframe-ca-aam)
- [Access Authorization](#authorization)

## Digital certificates
A Digital Certificate is an electronic file that is tied to a cryptographic (public and private) key pair and authenticates the identity of a website, individual, organization, user, device or server.
The nowadays de-facto standard is the x.509 family type of certificates, which are the foundation behind [Public Key Infrastructure (PKI)](#public-key-infrastructure) security. 

<!-- #TODO: Provide a concise description of what digital certificate is. Keep it basic and don't focus that much on details on usage or infrastructure. -->

Digital certificates according to x.509 standard specification are the cornerstone for securing communication channels between clients and servers.
x.509 certificates can also be used to provide identification of clients and service users.

Zowe doesn't compromise components communication channels security and strictly implements the latest versions of Transport Layer Security (TLS) using x.509 certificates. 
Additionally, Zowe provides client identity validation functionality based on the ownership of the provided x.509 client certificate and the mainframe security authentication mechanism.   

Certificate can be self-signed or issued by a Certificate Authority (CA). A CA is an organization which provides infrastructure for creation, validation and revocation of the certificates according to the contemporary security standards.
Digital certificates used by Zowe can be issued by the company's private CA or an external widely trusted CA.

**Note** In some cases, such as for testing purposes of Zowe, it is acceptable to use certificates issued and signed either by a company local CA, or even self-signed certificates issued by Zowe security tools specific for the target technology platform.
This is, however, not recommended for production environments.

Read the following sections to learn about the key concepts of the certificates-based security in Zowe.  

### Digital certificates usage
Digital certificates perform two primary functions:
- Verification of the identity of a sender/receiver of an electronic message
- Encryption/Decryption of the messages between the sender and the receiver.

Zowe uses digital certificates as a foundational element of both, communication and identity security.

Visit the [Zowe certificate usage](../user-guide/use-certificates.md) dedicated article, to learn details about how Zowe leverages certificates.

Read the [Zowe certificate configuration overview](../user-guide/configure-certificates.md) article in the Zowe User Guide documentation to understand the various options for Zowe certificate configuration.

### Public key infrastructure
[Public Key Infrastructure (PKI)](https://en.wikipedia.org/wiki/Public_key_infrastructure) is a key aspect of internet security. PKI is both the technology and processes that make up the framework for encryption to protect and authenticate digital communications.
PKI includes software, hardware, policies, and procedures that are used to create, distribute, manage, store, and revoke digital certificates and manage public-key encryption.

Visit the following external link, to learn [How Does PKI Work](https://www.keyfactor.com/education-center/what-is-pki/#section2).

Visit the following link to learn more about PKI in the context of the [z/OS Cryptographic Services](https://www.ibm.com/docs/en/zos/2.3.0?topic=planning-introducing-pki-services). 

### Transport Layer Security
[Transport Layer Security (TLS)](https://en.wikipedia.org/wiki/Transport_Layer_Security) is a standard protocol that provides authentication, privacy and data integrity between two communicating computer applications.
TLS uses a client-server handshake mechanism to establish an encrypted and secure connection and to ensure the authenticity of the communication.

The following diagram illustrates how TLS works:
![img.png](img.png)
<!-- #TODO: Provide TLS diagram - either own or from a free source -->

The TLS should always be used to ensure secure data-transport for all connections to API Mediation Layer services.

Zowe fully relies on TLS for securing the communication between its components, as well as between client application and Zowe server components.

For more information, see the [TLS requirements in Zowe API ML requirements](../extend/extend-apiml/zowe-api-mediation-layer-security-overview#zowe-api-ml-tls-requirements).

**Note** When installed on a mainframe system, Zowe is able to utilize the AT-TLS implementation if supported by the corresponding z/OS version/installation.

### Digital certificates types
When we discuss digital certificates types, we distinguish several aspects of the certificates as artifacts and their usage.
Certificates come in various file formats and can be stored in different [certificates storage](#certificates-storage) types. 

Digital X.509 certificates can be issued in various file formats such as PEM, DER, PKCS#7 and PKCS#12. 
PEM and PKCS#7 formats use Base64 ASCII encoding while DER and PKCS#12 use binary encoding.

In general, the choice of certificates format depends on the technologies used for the implementation of the server components and on the certificate storage type. 


Zowe supports:
* **file-based PKCS12**  
  PKCS12 certificates are the most general and widely deployed certificate format.
* **z/OS keyring-based keystore (JKS/JCEKS)**  
  JKS/JCEKS certificates are specific types of certificates that depend on the Java environment.

**Note:** Java 9 and higher can also work with PKCS12 certificates.

### Certificates storage

There are two options for the storage of certificates:

* Keystore and Truststore Combination
* SAF Keyrings

#### Keystore and Truststore Combination

Two key concepts to understand storage and verification of certificates are keystores and truststores.

* **Keystores** are used to store certificates and the verification of these certificates.
* **Truststores** are used for the storage of verification.

Zowe supports keystores and truststores that are either z/OS keyrings (when on z/OS) or PKCS12 files. By default, Zowe reads a PKCS12 keystore from `keystore` directory in zowe.yaml. This directory contains a server certificate, the Zowe generated certificate authority, and a `truststore` which holds intermediate certificates of servers that Zowe communicates with (for example z/OSMF).

* **Keystores**  
  Zowe can use PKCS12 certificates stored in USS to encrypt TLS communication between Zowe clients and Zowe z/OS servers, as well as intra z/OS Zowe server to Zowe server communication. Zowe uses a `keystore` directory to contain its external certificate, and a `truststore` directory to hold the public keys of servers which Zowe communicates with (for example z/OSMF).

* **Truststores**  
  Truststore are essential to provide secure communication with external services. The truststore serves as a secure repository for storing certificates and trust anchors. In the context of Zowe, the truststore establishes the trust relationships with external services as well as manages the relationship between Zowe's components and the certificates presented by the external services.

  In addition to utilizing the intra-address space of certificates, Zowe incorporates external services on z/OS to enhance the encryption of messages transmitted between its servers. These external services, such as z/OSMF or Zowe conformant extensions, have registered themselves with the API Mediation Layer.

  The API Mediation Layer, acting as an intermediary, validates these certificates. When the API ML receives a certificate from an external service, it examines each certificate in the certificate chain and compares it to the certificates in the truststore.

  By leveraging the truststore, Zowe ensures that only trusted and authorized external services can establish communication with its servers.

#### SAF Keyring

An alternative to certificate storage with keystores and trustores is to use a SAF Keyring. Use of a SAF Keyring is more secure than PKCS12 files. This SAF keyring method also makes it possible to import existing certificate or generate new certificates with Top Secret, ACF2, and RACF.

For details about SAF Keyring, see the documentation [API ML SAF Keyring](../extend/extend-apiml/certificate-management-in-zowe-apiml.md) in the article **Certificate management in Zowe API Mediation Layer**.
## Authentication methods

The API Mediation Layer provides multiple methods which clients can use to authenticate.

* [Authentication with JSON Web Tokens(JWT)](#authentication-with-json-web-tokensjwt)
* [Authentication with client certificates](#authentication-with-client-certificates)
* [Authentication with Personal Access Token (PAT)](#authentication-with-personal-access-token-pat)
* [Authentication with SAF Identity Tokens](#authentication-with-saf-identity-tokens)
* [Multi-factor authentication (MFA)](#multi-factor-authentication-mfa)
* [Certificate Authority Advanced Authentication Mainframe (CA AAM)](#certificate-authority-advanced-authentication-mainframe-ca-aam)
### Authentication with JSON Web Tokens(JWT)

When the user successfully authenticates with the API ML, the client receives a JWT token in exchange. This token can be used by the client to access REST services behind the API ML Gateway and also for subsequent user authentication. The access JWT Token is signed with the private key that is configured in the Zowe Identity Provider's certificate store, be it keystore or keyring.

To utilize [Single-Sign-On (SSO)](../user-guide/systemrequirements-zos#single-sign-on-sso), the Zowe API ML client needs to provide an access token to API services in the form of the cookie `apimlAuthenticationToken`, or in the `Authorization: Bearer` HTTP header as described [here](https://github.com/zowe/sample-spring-boot-api-service/blob/master/zowe-rest-api-sample-spring/docs/api-client-authentication.md#authenticated-request).

- Validation:
  - Use the Gateway query endpoint to validate the token and retrieve the information associated with the token.
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

If the keyring or a truststore contains at least one valid certificate authority (CA) other than the CA of the API ML, it is possible to use client certificates issued by this CA to authenticate to the API ML.

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

### Multi-factor authentication (MFA)

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
