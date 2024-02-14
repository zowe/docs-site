# Authenticating with client certificates

:::info Required roles: system administrator, security administrator
:::

Authentication for integration with API ML can also be performed by the client when the service endpoint is called through the API ML Gateway with client certificates. 

:::tip
There is a limitation with respect to performing authentication using Z Secure Services (ZSS) with ACF2 systems. If you are using ACF2, and are using Zowe v2.14 or a later version, use the recommended internal API ML mapper.
:::

:::note Notes:
* When calling the login endpoint with basic authentication credentials as well as with client certificate, the basic authentication credentials take precedence and client certificate is ignored. 

* If you are calling a specific endpoint on one of the onboarded services, API Mediation Layer ignores Basic authentication. In this case, the Basic authentication is not part of the authenticated request.
:::

## How the Gateway resolves authentication 

When sending a request to a service with a client certificate, the Gateway performs the following process to resolve authentication:

* The client calls the service endpoint through the API ML Gateway with the client certificate.
* The client certificate is verified as a valid TLS client certificate against the trusted certificate authorities (CAs) of the Gateway.
* The public key of the provided client certificate is verified against SAF. SAF subsequently returns a user ID that owns this certificate. As of Zowe version 2.14, the API for API ML can be provided by the internal API ML mapper if the mapper is enabled. Alternatively, you can use Z Secure Services (ZSS) to provide this API for API ML, although we recommend using the internal API ML mapper.
* The Gateway then performs the login of the mapped user and provides valid authentication to the downstream service. 

:::note Notes:
* Currently, ZSS is the default API that provides this mapping between the public part of the client certificate and SAF user ID. However, the recommended method is to use the internal API ML mapper. For information about the internal API ML mapper, see [Enabling the internal API ML mapper](#enabling-the-internal-api-ml-mapper) described in this article.
* For information about ZSS, see the section Zowe runtime in the [Zowe server-side installation overview](./install-zos).
:::

When sending a request to the login endpoint with a client certificate, the Gateway performs the following process to exchange the client certificate for an authentication token:

* The client calls the API ML Gateway login endpoint with the client certificate.
* The client certificate is verified to ensure this is a valid TLS client certificate against the trusted CAs of the Gateway.
* The public part of the provided client certificate is verified against SAF. SAF subsequently returns a user ID that owns this certificate. As of Zowe release 2.14, the internal API ML mapper can provide this API for API ML if enabled in the zowe.yaml file. Alternatively, ZSS can provide this API for API ML, with the noted exception when using ACF2.
* The Gateway then performs the login of the mapped user and returns a valid JWT token.

:::note
ZSS is currently the default API that provides this mapping between the public part of the client certificate and SAF user ID. Using the internal API ML mapper is, however, the recommended method. 
:::

![Zowe client certificate authentication diagram](../images/api-mediation/zowe-client-cert-auth.png)

:::tip
For more information, see the Medium blog post [Zowe client certificate authentication](https://medium.com/zowe/zowe-client-certificate-authentication-5f1c7d4d579).
:::

## Prerequisites when using ZSS

When using ZSS for authentication, ensure that you satisfy the following prerequisites before you set up client certificate authentication. These prerequsites do not apply when using the internal API ML mapper.

1. Set the password for the Zowe runtime user. The user is created with the `NOPASSWORD` parameter by the Zowe installer. It is necessary to change this password. 

  For RACF, issue the following TSO command:  

  `ALTUSER <ZOWE_RUNTIME_USER (ZWESVUSR by default)> PASSWORD(<NEWPASSWORD>)`  

  For other security systems, refer to the documentation for an equivalent command.

2. Verify that the Zowe runtime user is allowed to log in to z/OSMF. (Check that the user is a member of the default `IZUUSER` group.)

:::note
Ensure that you have the Issuer certificate imported in the truststore or in the SAF keyring. Alternatively, you can generate these certificates in SAF. 
Ensure that the client certificate has the following `Extended Key Usage` metadata:  
`OID: 1.3.6.1.5.5.7.3.2`  
This metadata can be used for TLS client authentication.
:::

## Configure your z/OS system to support client certificate authentication

1. Register the client certificate with the user ID in your ESM. The following commands apply to both the internal API ML mapper and ZSS.

  **Example command in RACF:**  

  `RACDCERT ADD(<dataset>) ID(<userid>) WITHLABEL('<label>') TRUST` 

  **Example command in ACF2:** 

  `INSERT <userid>.<certname> DSNAME('<dataset>') LABEL(<label>) TRUST`

  **Example command in Top Secret:** 

  `TSS ADDTO(<userid>) DIGICERT(<certname>) LABLCERT('<label>') DCDSN('<dataset>') TRUST`

  Additional details are likely described in your security system documentation.

2. Import the external CA to the truststore or keyring of the API Mediation Layer.
3. Configure the Gateway for client certificate authentication. Follow the procedure described in [Enabling single sign on for clients via client certificate configuration](../user-guide/api-mediation/configuration-client-certificates.).

:::caution Important:
* PassTicket generation must be enabled for the Zowe runtime user. The user must be able to generate a PassTicket for the user and for the APPLID of z/OSMF. For more information, see [Configuring Zowe to use PassTickets](./api-mediation/configuration-extender-passtickets/#configuring-zowe-to-use-passtickets).

* The Zowe runtime user must be enabled to perform identity mapping in SAF. For more information about identity mapping in SAF, see [Configure main Zowe server to use client certificate identity mapping](./configure-zos-system/#configure-main-zowe-server-to-use-client-certificate-identity-mapping).
:::

:::note Notes:
* The internal API ML mapper can provide the API for API ML if enabled in the zowe.yaml file. Use of the internal API ML mapper is the recommended method. Note that the mapper feature is available for Zowe release 2.14 and later releases. Alternatively, ZSS can be configured to participate in Zowe SSO. 

* Currently, ZSS is the default API that provides this mapping between the public part of the client certificate and the SAF user ID, however the use of the internal API ML mapper is the recommended method.  

* For more information about configuring ZSS, see [Configure components zss](../appendix/zowe-yaml-configuration/#configure-component-zss) in the References section of Zowe Docs.
:::

### Enabling the internal API ML mapper

To enable the internal API ML mapper, set the following property in zowe.yaml:
```
gateway:  
  apiml:  
    security:  
      userInternalMapper: true 
```
Note that the internal API ML mapper option is only available for Zowe release 2.14 and later releases. 


## Validate the client certificate functionality

To validate that the client certificate functionality works properly, call the login endpoint with the certificate that was set up using the steps in [Configure your z/OS system to support client certificate authentication](#configure-your-zos-system-to-support-client-certificate-authentication) described previously in this article. 

Validate using _CURL_, a command line utility that runs on Linux based systems:

**Example:**
```
curl --cert /path/to/cert.pem --key /path/to/key.pem https://api-mediation-layer:7554/gateway/api/v1/login
```
Your Zowe instance is configured to accept x.509 client certificates authentication.

