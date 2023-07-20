# Zowe Security Overview
Before installation and use of Zowe server-side components it is practical to first learn about core security features built into the Zowe architecture.

This document provides 
  - An overview of the security technologies and features implemented by Zowe
  - Links to Zowe practical guides on How-to fulfil/achieve specific tasks/goals.    

**Note** If you are familiar with security technologies and concepts such as digital certificates, authentication, authorization, and z/OS security, 
you may prefer to skip the introductory sections, and use the following [links section](#links) 
to jump directly to the technical guidance provided on how to [Setup Zowe](#), [Use Zowe](#) and [Extend Zowe](#) documentation:

  - [Setup certificates](#)
  - [Authenticate users](#)
  - [Authorize users](#)

<!-- TODO#PZA: provide general security architecture overview diagram -->

Zowe implements comprehensive measures to secure mainframe services and data resources in transition and in rest:

  - Digital certificates are used by Zowe to facilitate secure electronic communication and data exchange between people, systems, and devices online.
  - User identity is authenticated through modern authentication methods such as Multi-Factor Authentication (MFA), JWT, or Personal Access Token (PAT).
  - User access is authorized by SAF (the installed mainframe Extended Security Manager (ESM)).

Read the following topics to learn more detail about how Zowe leverages modern security concepts and technologies:
  - [Digital certificates usage](#digital-certificates-usage)
  - [User Authentication](#user-authentication)
  - [Access Authorization](#access-authorization)
  - [z/OS security](#zos-security)

***Tip*** Make sure you also check the [Additional resources](#additional-resources) section at the end of this document.

## Digital certificates
Make sure you understand digital certificates terminology in the [Zowe security glossary](../appendix/zowe-security-glossary#certificate-concepts)

### Digital certificates usage

Read more about digital certificates mechanics in the [Zowe certificate usage](../user-guide/use-certificates.md) dedicated article.

Read the [Zowe certificate configuration overview](../user-guide/configure-certificates.md) article in the Zowe User Guide documentation to understand the various options for Zowe certificate configuration.

## User Authentication

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

### Authentication with client certificates

If the keyring or a truststore contains at least one valid certificate authority (CA) other than the CA of the API ML, it is possible to use client certificates issued by this CA to authenticate to the API ML.

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

For more information about configuring the token, see the [Configure signed SAF Identity tokens (IDT) documentation](../user-guide/configure-zos-system#configure-signed-saf-identity-tokens-idt).

### Multi-factor authentication (MFA)

Multi-factor authentication is provided by third-party products which Zowe is compatible with. The following are known to work:

For details about multi-fator authentication, see [the MFA documentation here](../user-guide/mvd-configuration#multi-factor-authentication-configuration).

### Certificate Authority Advanced Authentication Mainframe (CA AAM)

To add dynamic element to the authentication, you can configure the Certificate Authority Advanced Authentication Mainframe to enable multi-factor authentication. For details about CA AAM, see [the documentation](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-advanced-authentication-mainframe/2-0.html).

## Access Authorization

The API ML can check for the authorization of the user on certain endpoints. Access to a SAF resource is checked with External Security Manager (ESM).

### SAF resource check

For detailed information, see the [SAF resource checking documentation](../user-guide/api-mediation/api-gateway-configuration#saf-resource-checking).

## z/OS security

# Additional resources
Visit the following links to learn About the: 
- [Varios certificates configuration scenarios](../user-guide/api-mediation/certificate-configuration-scenarios).
- [Generate certificates for Zowe servers](../user-guide/generate-certificates)
- [Import certificates](../user-guide/import-certificates)
- [Configure Zowe to use certificates](../user-guide/configure-certificates)