# Zowe Security Overview
Zowe implements comprehensive measures to secure mainframe services and data resources in transition and in rest:

- Digital certificates are used by Zowe to facilitate secure electronic communication and data exchange between people, systems, and devices online.
- User identity is authenticated through modern authentication methods such as OIDC/Oauth2, Multi-Factor Authentication (MFA), JWT, or Personal Access Token (PAT).
- User access is authorized by System Authorization Facility (SAF) / External Security Manager (ESM).

Before installation and use of Zowe server-side components it is practical to first learn about the core security features built into the Zowe architecture.

This document provides 
  - An overview of the security technologies and features implemented by Zowe
  - Links to Zowe practical guides on How-to fulfil/achieve specific tasks/goals.    

**Note** If you are familiar with security technologies and concepts such as digital certificates, authentication, authorization, and z/OS security, 
you may prefer to skip the introductory sections, and use the below [Additional resources section](#additional-resources) 
to jump directly to the security related technical guidance provided on how to Set up Zowe, Use Zowe or Extend Zowe:

<!-- TODO#PZA: provide general security architecture overview diagram -->

Read the following sections to learn about how Zowe leverages modern security concepts and technologies:
  - [Digital certificates](#digital-certificates)
  - [User Authentication](#user-authentication)
  - [Access Authorization](#access-authorization)
  - [z/OS security](#zos-security)

## Digital certificates
A Digital Certificate is an electronic file that is tied to a cryptographic (public and private) key pair and authenticates the identity of a website, individual, organization, user, device or server.
The nowadays de-facto standard is the x.509 family type of certificates, which are the foundation behind [Public Key Infrastructure (PKI)](#public-key-infrastructure) security.
An X.509 certificate binds an identity to a public key using a digital signature.
A certificate contains an identity (a hostname, or an organization, or an individual) and a public key (RSA, DSA, ECDSA, ed25519, etc.).

Certificate can be self-signed or issued by a Certificate Authority (CA). A CA is a trusted organization which provides infrastructure for creation, validation and revocation of the certificates according to the contemporary security standards.

**Note:** 
For testing purposes of Zowe, it is acceptable to use certificates issued and signed either by the company's local CA, or even self-signed certificates issued by Zowe security tools specific for the target technology platform.
This is, however, not recommended for production environments.

**Tip:** Make sure you understand digital certificates terminology in the [Zowe security glossary](../appendix/zowe-security-glossary#certificate-concepts).

### Digital certificates usage
Zowe uses digital certificates to secure the communication channel between Zowe components as well between Zowe clients and Zowe services. Digital client certificates can be also used to validate that a client-user (aka service user) identity is known to the mainframe security facility.   

**Next Steps:**
- Read more about digital certificates mechanics in the [Zowe certificate usage](../user-guide/use-certificates.md) dedicated article.
- Read the [Zowe certificate configuration overview](../user-guide/configure-certificates.md) article in the Zowe User Guide documentation to understand the various options for Zowe certificate configuration.

## User Authentication
Zowe always authenticates the users accessing its interfaces and services. 

Zowe API ML implements a Singls-Sign-On feature which allows the users to authenticate once and for the validity time of the provided Zowe credentials the users can access all mainframe resources that they are granted access rights to.    

API ML uses multiple authentication methods - from Basic Auth (username-password), to external Multi-Factor Authentication providers, and modern authentication protocols, such as OIDC/OAuth2.    

**Tip:** Make sure you understand the core [User Authentication](../appendix/zowe-security-glossary#user-authentication "The process or action of verifying the identity of a user or process.") terminology provided in the [Zowe Security Glossary](../appendix/zowe-security-glossary)

**Next steps:**
- Read the dedicated [API ML User Authentication](./zowe-security-authentication) article for more details on the authentication methods used by Zowe.    

## Access Authorization
[Authorization](../appendix/zowe-security-glossary#access-authorization "Authorization refers to the mechanism of granting specific permissions to users for accessing particular resources or functions.") is the mechanism by which a security system grants or rejects access to protected resources.

Zowe fully relies on the SAF/ESM for control on the user access to mainframe resources. The authorization is processed by SAF when a mainframe service attempts to access them under the identity of the user authenticated by Zowe.

**Tip:**
Make sure you understand the core [Authorization](../appendix/zowe-security-glossary#access-authorization "Is any mechanism by which a system grants or revokes the right to access some data or perform some action.") concepts by reading the 
related topics in the [Zowe Security Glossary](../appendix/zowe-security-glossary).

### SAF resource check
In some cases Zowe API ML can check for the authorization of the user on certain endpoints even before the request is propagated to the target mainframe service.
Access to a SAF resource is checked with actually installed z/OS External Security Manager (ESM).

**Next steps:**
For detailed information, see the [SAF resource checking documentation](../user-guide/api-mediation/api-gateway-configuration#saf-resource-checking).

## z/OS security
<!-- TODO: PZA. Describe briefly z/OS security concepts (other that Authorization) -->

## Additional resources
Visit the following links to learn About the: 
- [Various certificates configuration scenarios](../user-guide/certificate-configuration-scenarios).
- [Generate certificates for Zowe servers](../user-guide/generate-certificates)
- [Import certificates](../user-guide/import-certificates)
- [Configure Zowe to use certificates](../user-guide/configure-certificates)
