# Zowe Security
Zowe implements comprehensive measures to secure mainframe services and data resources in transition and in rest:

- Digital certificates are used by Zowe to facilitate secure electronic communication and data exchange between people, systems, and devices online.
- User identity is authenticated through modern authentication methods such as Multi-Factor Authentication (MFA), JWT, or Personal Access Token (PAT).
- User access is authorized by SAF (the installed mainframe Extended Security Manager (ESM)).

Before installation and use of Zowe server-side components it is practical to first learn about core security features built into the Zowe architecture.

This document provides 
  - An overview of the security technologies and features implemented by Zowe
  - Links to Zowe practical guides on How-to fulfil/achieve specific tasks/goals.    

**Note** If you are familiar with security technologies and concepts such as digital certificates, authentication, authorization, and z/OS security, 
you may prefer to skip the introductory sections, and use the following [links section](#additional-resources) 
to jump directly to the security related technical guidance provided on how to Set up Zowe, Use Zowe or Extend Zowe:

<!-- TODO#PZA: provide general security architecture overview diagram -->

Read the following sections to learn details about how Zowe leverages modern security concepts and technologies:
  - [Digital certificates](#digital-certificates)
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

[Authentication](../appendix/zowe-security-glossary#user-authentication "The process or action of verifying the identity of a user or process.")


## Access Authorization

[Authorization](../appendix/zowe-security-glossary#access-authorization "Is any mechanism by which a system grants or revokes the right to access some data or perform some action.")
The API ML can check for the authorization of the user on certain endpoints. Access to a SAF resource is checked with External Security Manager (ESM).

### SAF resource check

For detailed information, see the [SAF resource checking documentation](../user-guide/api-mediation/api-gateway-configuration#saf-resource-checking).

## z/OS security

# Additional resources
Visit the following links to learn About the: 
- [Varios certificates configuration scenarios](../user-guide/certificate-configuration-scenarios).
- [Generate certificates for Zowe servers](../user-guide/generate-certificates)
- [Import certificates](../user-guide/import-certificates)
- [Configure Zowe to use certificates](../user-guide/configure-certificates)
