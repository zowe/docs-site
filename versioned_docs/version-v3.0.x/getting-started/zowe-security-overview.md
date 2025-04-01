# Zowe Security Overview

Zowe implements comprehensive measures to secure mainframe services and data resources in transition and in rest:

- Digital certificates are used by Zowe to facilitate secure electronic communication and data exchange between people, systems, and devices online.
- User identity is authenticated through modern authentication methods such as OIDC/Oauth2, JWT, or Personal Access Token (PAT). Potentially with added Multi-Factor Authentication (MFA).
- User access is authorized by System Authorization Facility (SAF) / External Security Manager (ESM).

Before installation and use of Zowe server-side components, it is practical to first learn about the core security features built into the Zowe architecture.

This document provides an overview of the security technologies and features implemented by Zowe and links to Zowe practical guides on how to achieve specific tasks and goals.    

**Note:** If you are familiar with security technologies and concepts such as digital certificates, authentication, authorization, and z/OS security, 
you may prefer to skip the introductory sections, and see the [Additional resources section](#additional-resources) at the end of this article
to jump directly to the security related technical guidance provided on how to Set up Zowe, Use Zowe or Extend Zowe.

Review the following sections to learn about how Zowe leverages modern security concepts and technologies:
  - [Digital certificates](#digital-certificates)
  - [User Authentication](#user-authentication)
  - [Access Authorization](#access-authorization)
  
## Digital certificates

A Digital Certificate is an electronic file that is tied to a cryptographic (public and private) key pair and authenticates the identity of a website, individual, organization, user, device or server.
The de-facto standard is the x.509 family type of certificates, which are the foundation behind Public Key Infrastructure (PKI) security.
An X.509 certificate binds an identity to a public key using a digital signature.
A certificate contains an identity (a hostname, or an organization, or an individual) and a public key (RSA, DSA, ECDSA, ed25519, etc.).

A certificate can be self-signed or issued by a Certificate Authority (CA). A CA is a trusted organization which provides infrastructure for creation, validation and revocation of the certificates according to the contemporary security standards.

:::note

For testing purposes of Zowe, it is acceptable to use certificates issued and signed either by the company's local Certificate Authority (CA), or even certificates issued by Zowe security tools and signed by generated CA specific for the target technology platform.
Use of certificates signed by generated CA, however, is not recommended for production environments.

:::

:::tip

Review digital certificates terminology in the [Zowe security glossary](../appendix/zowe-security-glossary#certificate-concepts) before getting started with configuring certificates.

:::

### Digital certificates usage
Zowe uses digital certificates to secure the communication channel between Zowe components as well as between Zowe clients and Zowe services. Digital client certificates can also be used to validate that a client-user (the service user) identity is known to the mainframe security facility.   

**Next Steps:**
- Read more about digital certificates mechanics in the [Use certificates](../user-guide/use-certificates.md) in the Zowe documentation.
- Read the [Zowe certificate configuration overview](../user-guide/configure-certificates.md) article in the Zowe User Guide documentation to understand the various options for Zowe certificate configuration.

## User Authentication
Zowe always authenticates the users accessing its interfaces and services. 

Zowe API ML implements a Single-Sign-On feature which allows users to authenticate once, whereby users can access all mainframe resources that they are granted access rights to for the period in which the Zowe credentials remain valid.

API ML uses multiple authentication methods - Basic Auth (username-password), OIDC/OAuth2, Client certificates and Personal Access Tokens with possibility of strengthening of the security by adding external Multi-Factor Authentication provider.

**Next steps:**
- For more details on the authentication methods used by Zowe, see the dedicated [API ML User Authentication](./zowe-security-authentication) article.    

## Access Authorization
[Authorization](https://en.wikipedia.org/wiki/Authorization "Authorization refers to the mechanism of granting specific permissions to users for accessing particular resources or functions.") is the mechanism by which a security system grants or rejects access to protected resources.

Zowe fully relies on the SAF/ESM for control on the user access to mainframe resources. Authorization is processed by SAF when a mainframe service attempts to access these services under the identity of the user authenticated by Zowe.

**Tip:**
We recommend you review the core [Authorization](https://en.wikipedia.org/wiki/Authorization "Is any mechanism by which a system grants or revokes the right to access some data or perform some action.") concepts by reading the 
related topics in the [Zowe Security Glossary](../appendix/zowe-security-glossary).

### SAF resource check
In some cases Zowe API ML can check for the authorization of the user on certain endpoints even before the request is propagated to the target mainframe service.
Access to a SAF resource is checked with the installed z/OS External Security Manager (ESM).

**Next steps:**
For detailed information, see the [SAF resource checking documentation](../user-guide/api-mediation/configuration-saf-resource-checking).

## Additional resources
For more information about getting started with certificates including determining your certificate configuration use case, importing certificates, generating certificates and using certificates, see the following resources:  

- [Use-case based certificates configuration scenarios](../user-guide/certificate-configuration-scenarios.md)
- [Generate certificates for Zowe servers](../user-guide/generate-certificates.md)
- [Import certificates](../user-guide/import-certificates.md)
- [Configure Zowe to use certificates](../user-guide/configure-certificates.md)

