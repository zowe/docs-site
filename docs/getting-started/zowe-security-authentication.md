# Zowe User Authentication
The API Mediation Layer provides multiple methods which clients can use to authenticate.

* [Authentication with JSON Web Tokens (JWT)](#authentication-with-json-web-tokensjwt)
* [Authentication with client certificates](#authentication-with-client-certificates)
* [Authentication with Personal Access Token (PAT)](#authentication-with-personal-access-token-pat)
* [Authentication with SAF Identity Tokens](#authentication-with-saf-identity-tokens)
* [Multi-factor authentication (MFA)](#multi-factor-authentication-mfa)
* [Certificate Authority Advanced Authentication Mainframe (CA AAM)](#certificate-authority-advanced-authentication-mainframe-ca-aam)

## Authentication with JSON Web Tokens(JWT)

When the user successfully authenticates with the API ML, the client receives a JWT token in exchange. This token can be used by the client to access REST services behind the API ML Gateway and also for subsequent user authentication. The access JWT Token is signed with the private key that is configured in the Zowe Identity Provider's certificate store, regardless of whether the token is in a keystore or keyring.

To utilize [Single-Sign-On (SSO)](../user-guide/systemrequirements-zos#single-sign-on-sso), the Zowe API ML client needs to provide an access token to API services in the form of the cookie `apimlAuthenticationToken`, or in the `Authorization: Bearer` HTTP header as described in [this authenticated request example](https://github.com/zowe/sample-spring-boot-api-service/blob/master/zowe-rest-api-sample-spring/docs/api-client-authentication.md#authenticated-request).

## Authentication with client certificates

If the keyring or a truststore contains at least one valid certificate authority (CA) other than the CA of the API ML, it is possible to use client certificates issued by this CA to authenticate to the API ML.

For more information, see the [Authentication for API ML services documentation](../extend/extend-apiml/authentication-for-apiml-services.md)

## Authentication with Personal Access Token (PAT)

A Personal Access Token (PAT) is a specific scoped JWT with a configurable validity duration. The PAT authentication method is an alternative to using a client certificate for authentication. It is disabled by default. To enable this functionality, see [the configuration documentation](../user-guide/api-mediation/api-gateway-configuration#personal-access-token).

**Benefits of PAT**

- Long-lived. The maximum validity is 90 days.
- Scoped. Users are required to provide a scope. It is only valid for the specified services.
- Secure. If a security breech is suspected, the security administrator can invalidate all the tokens based on criteria as established by rules.

For more information about PAT, see [the Personal Access Token documentation](../user-guide/api-mediation/api-mediation-personal-access-token).

## Authentication with SAF Identity Tokens
The SAF Authentication Provider allows the API Gateway to authenticate the user directly with the z/OS SAF provider that is installed on the system.

For more information about configuring the token, see the [Configure signed SAF Identity tokens (IDT) documentation](../user-guide/configure-zos-system#configure-signed-saf-identity-tokens-idt).

## Multi-factor authentication (MFA)

Multi-factor authentication is provided by third-party products which Zowe is compatible with. The following are known to work with Zowe:
- [CA Advanced Authentication Mainframe](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-advanced-authentication-mainframe/2-0.html)
- [IBM Z Multi-Factor Authentication](https://www.ibm.com/products/ibm-multifactor-authentication-for-zos).

Additionally, Zowe API ML can be configured to accept OIDC/OAuth2 user authentication tokens. In this particular case, MFA support is built into the OIDC provider system.
It does not rely on the mainframe MFA technology, but is equally secure.

For details about multi-factor authentication, see [the MFA documentation here](../user-guide/mvd-configuration#multi-factor-authentication-configuration).

## Certificate Authority Advanced Authentication Mainframe (CA AAM)

To add a dynamic element to the authentication, you can configure the Certificate Authority Advanced Authentication Mainframe to enable multi-factor authentication. For more information about CA AAM, see the [Advanced Authentication Mainframe documentation](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-advanced-authentication-mainframe/2-0.html).
