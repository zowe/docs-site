# Authenticating with client certificates

You can perform authentication with client certificates.

If the keyring or a truststore contains at least one valid certificate authority (CA) other than the CA of API ML, it is possible to use the client certificates issued by this CA to authenticate to API ML. This feature is not enabled by default and must be configured.

:::note
There is a limitation with respect to ACF2 systems. If you would like to offer feedback using client
certificate authentication, please create an issue in the Zowe [api-layer repository](https://github.com/zowe/api-layer).
:::

When providing credentials during a login request with a client certificate on the same login request, the credentials take precedence and the client certificate is ignored.

## How the Gateway resolves authentication 

When sending a request to a service with a client certificate, the Gateway performs the following process to resolve authentication:

* The client calls the service endpoint through API ML Gateway with the client certificate.
* The client certificate and private key are checked as a valid TLS client certificate against the trusted CAs of the Gateway.
* The public part of the provided client certificate is checked against SAF. SAF subsequently returns a user ID that owns this certificate. Z Secure Services (ZSS)* provides this API for API ML. 
* The Gateway performs the login of the mapped user and provides valid authentication to the southbound service.

:::note
* For information about ZSS, see the section Zowe runtime in the [Zowe server-side installation overview](./install-zos).
:::

When sending a request to the login endpoint with a client certificate, the Gateway performs the following process to exchange the client certificate for an authentication token.

* The client calls the API ML Gateway login endpoint with the client certificate.
* The client certificate and private key are checked as a valid TLS client certificate against the trusted CAs of the Gateway.
* The public part of the provided client certificate is checked against SAF. SAF subsequently returns a user ID that owns this certificate. ZSS provides this API for API ML. 
* The Gateway performs the login of the mapped user and returns a valid JWT token.

![Zowe client certificate authentication diagram](../../images/api-mediation/zowe-client-cert-auth.png)

:::tip
For more information, see the Medium blog post [Zowe client certificate authentication](https://medium.com/zowe/zowe-client-certificate-authentication-5f1c7d4d579).

## Prerequisites

Ensure that you satisfy the following requirements before you set up client certificate authentication:

1. Specify the Zowe runtime user and set your protection by password. The user is created with the `NOPASSWORD` parameter by the Zowe installer. It is necessary to change this password. 

  For RACF, issue the following TSO command:  

  `ALTUSER <ZOWE_RUNTIME_USER (ZWESVUSR by default)> PASSWORD(<NEWPASSWORD>)`  

  For other security systems, refer to the documentation for an equivalent command.

2. Verify that the Zowe runtime user is allowed to log in to z/OSMF. (Check that the user is a member of the default `IZUUSER` group.)

  :::note
  Ensure that you have an external Certificate Authority and signed client certificates. Alternatively, you can generate these certificates in SAF. The client certificate must have correct `Extended Key Usage` metadata so the metadate can be used for TLS client authentication. (`OID: 1.3.6.1.5.5.7.3.2`)
  :::

## Configure your z/OS system to support client certificate authentication

1. Import the client certificates to SAF, or add them to a user profile.  
**Examples:** `RACDCERT ADD` or `RACDCERT GENCERT`.  
For more information, see your security system documentation.
2. Import the external CA to the truststore or keyring of the API Mediation Layer.
3. Configure the Gateway for client certificate authentication. Follow the procedure described in [Enabling single sign on for clients via client certificate configuration](../../user-guide/api-mediation/configuration-client-certificates).

:::note**Notes:**
* PassTicket generation must be enabled for the Zowe runtime user. The user must be able to generate a PassTicket for the user and for the APPLID of z/OSMF. For more information, see [Configure Passticket](#authentication-with-passtickets).
* The Zowe runtime user must be enabled to perform identity mapping in SAF. For more information, see [Additional security rights that need to be granted](../../user-guide/configure-zos-system/#configure-main-Zowe-server-use-identity-mapping).
* ZSS must be configured to participate in Zowe SSO. For more information, see [Configure components zss](../../appendix/zowe-yaml-configuration/#configure-component-zss).
:::

## Validate the client certificate functionality

To validate that the client certificate functionality works properly, call the login endpoint with the certificate that was set up using the steps in _Configure your z/OS system to support client certificate authentication_. 

Validate using CURL, a command line utility that runs on Linux based systems:

**Example:**
```
curl --cert /path/to/cert.pem --key /path/to/key.pem https://api-mediation-layer:7554/gateway/api/v1/login
```
Your Zowe instance is configured to accept x.509 client certificates authentication.

