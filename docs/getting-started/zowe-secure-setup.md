# Zowe secure setup and configuration

Learn how to install and configure Zowe securely before you deploy Zowe in production.

A production instance of Zowe needs to run in a High Availability setup to achieve the necessary availability. The certificates used within the network communication to validate the servers should be stored in Keyrings to get the most out of the platform’s security. The network should be secured using TLS in version 1.3 to limit future risk.

Here is a list of all the security considerations and configurations needed.

- Transport Layer Security (TLS)
  - [TLS requirements](#tls-requirements)
  - [SAF Keyring](#saf-keyring)
- Authentication methods
  - [Authentication with JSON Web Tokens(JWT)](#authentication-with-json-web-tokensjwt)
  - [Authentication with client certificates](#authentication-with-client-certificates)
  - [Authentication with Personal Access Token (PAT)](#authentication-with-personal-access-token-pat)
  - [Authentication with SAF IDT Tokens](#authentication-with-saf-idt-tokens)
- [Multi-factor authentication (MFA)](#multi-factor-authentication-mfa)
- [Authorization](#authorization)
- High Availability
  - [Sysplex architecture and configuration](#sysplex-architecture-and-configuration)
  - [Caching service setup and configuration](#caching-service-setup-and-configuration)
- [Observation](#observation)

## Transport Layer Security(TLS)

The TLS protocol should be used to ensure secure data-transport for all connections to API Mediation Layer services.

### TLS requirements

- Java in version at least 8 sr6 fp25 is installed on the system.
- The following list shows the cipher suites that API ML services use.

```
TLS_AES_128_GCM_SHA256, TLS_AES_256_GCM_SHA384, TLS_CHACHA_POLY1305_SHA256
```

For more information, see the [TLS requirements in Zowe API ML requirements](../extend/extend-apiml/zowe-api-mediation-layer-security-overview#zowe-api-ml-tls-requirements).

### SAF keyring

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

- Long lived. The maximum validity is 90 days.
- Scoped. Users are required to provide a scope. It is only valid for the specified services.
- Secure. If a security breech is suspected, the security administrator can invalidate all the tokens based on criteria as established by rules.

For more information about PAT, see [the Personal Access Token documentation](../user-guide/api-mediation/api-mediation-personal-access-token).

### Authentication with SAF Identity Tokens (SAF IDT)

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
- [IBM Z Multi-Factor Authentication](https://www.ibm.com/us-en/marketplace/ibm-multifactor-authentication-for-zos).

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

## High Availability

To deploy Zowe in high availability (HA) mode, you must set up a Parallel Sysplex® environment. A Parallel Sysplex is a cluster of z/OS® systems that cooperatively use certain hardware and software components to achieve a high-availability workload processing environment.

### Sysplex architecture and configuration

Sysplex is required to make sure multiple Zowe instances can work together. Check [Configuring Sysplex for high availability](../user-guide/configure-sysplex) for more details.

To enable high availability when Zowe runs in Sysplex, you need to meet the following requirements:

- Zowe instance with should be installed on every LPAR.
- The API services must be registered to each Zowe instance.
- Shared File system should be created between LPARs in Sysplex. See [How to share file systems in a Sysplex](https://www.ibm.com/docs/en/zos/2.4.0?topic=planning-sharing-file-systems-in-sysplex).
- z/OSMF High Availability mode should be configured. See [Configuring z/OSMF high availability in Sysplex](../user-guide/systemrequirements-zosmf-ha).

Instance on every LPAR is started.

**Configuration**

The configuration for the specific instance is composed of the defaults in the main section and the overrides in the `haInstances` section of the `zowe.yaml` configuration file.

In this section, `ha-instance` represents any Zowe high availability instance ID. Every instance has internal id and a section with overrides compared to the main configuration in the beginning of the `zowe.yaml` file. Check the [Zowe YAML configuration reference](../appendix/zowe-yaml-configuration#yaml-configurations---hainstances) for details.

### Caching service setup and configuration

Zowe uses the Caching Service to centralize the state data persistent in high availability (HA) mode. It can be used to share information between services.

If you are runnning the caching service on z/OS, there are three storage methods with their own characteristics:

- [VSAM](../user-guide/configure-caching-service-ha)
  - Familiar to zOS engineers.
  - Slow.
- [Redis](../extend/extend-apiml/api-mediation-redis#redis-configuration)
  - Needs to run in Distributed world separately.
  - Good for Kubernetes deployment.
- [Infinispan (*recommended*)](../extend/extend-apiml/api-mediation-infinispan#infinispan-configuration)
  - Part of the Caching service.
  - Doesn’t need separate processes.
  - Highly performant.

## Observation

It is essential to have observation in the whole secure operation process. The service availability is visible to everyone. It’s easy to find performance issues with southbound services.

To do so, Zowe can easily integrate with the Alerting and Monitoring enterprise services such as ELK, Splunk, Grafana, etc and integrate the data as part of the Zero Trust Architecture approach with, for example, SIEM (Security Incident Event Management).

<!--**Prerequisites**
- Zowe System Services are installed and configured.
- Zowe cross memory server for SAF should be configured.
**Possible providers**
- Keycloak
- Okta -->