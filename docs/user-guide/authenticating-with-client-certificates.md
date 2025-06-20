# Authenticating with client certificates

:::info Required roles: system administrator, security administrator
:::

Authentication for integration with API Mediation Layer (API ML) can also be performed by the client when the service endpoint is called through
the API ML Gateway with client certificates. Client certificates in Zowe follow the X.509 standard which provide secure communication of networks and authenticates the identity of a user, device, or server. 

X.509 client certification must be enabled and configured. For details about this configuration, see [Enabling single sign on for clients via client certificate configuration](./api-mediation/configuration-client-certificates.md).

:::note Notes:

* When calling the login endpoint with basic authentication credentials, as well as with client certificate, the basic 
  authentication credentials take precedence and the client certificate is ignored.

* If you are calling a specific endpoint on one of the onboarded services, API Mediation Layer ignores Basic authentication. In this case, the Basic authentication is not part of the authenticated request.
:::

For details about how authentication by means of client certificates is performed in the Gateway, see [How the Gateway resolves authentication](#how-the-gateway-resolves-authentication) later in this article.


## Configure your z/OS system to support client certificate authentication for specific users

Register the client certificate with the user IDs in your ESM.

The following commands show options for both the internal API ML mapper and ZSS.

:::note

If using the internal API ML mapper (default from Zowe v3) and the MAP / CERTMAP option with distinguished name filters, use the `CHCKCERT` or equivalent command on the certificate to use the same order and format of the certificate's distinguished name as displayed.
:::

**RACF**
<details>
<summary>Click here for an example command in RACF. </summary>

  Use the following example if you are using the internal API ML mapper:

  Activate the `DIGTNMAP` class:
  
  ```racf
  SETROPTS CLASSACT(DIGTNMAP) RACLIST(DIGTNMAP)
  ```

  Create the mapping for the user and a distinguished name filter:

  ```racf
  RACDCERT ID(<userid>) MAP 
  SDNFILTER('<subject's-distinguished-name-filter>')
  WITHLABEL('<label>')
  SETROPTS RACLIST(DIGTNMAP) REFRESH
  ```
  * `<userid>`  
  Specifies the userid that the certificate maps to.
  
  * `<subject's-distinguished-name-filter>`  
  Specifies the subject name from the user's certificate.

  * `<label>`  
  Specifies the name (label) to use for reference purposes.

  Alternatively, if you disabled the internal API ML mapper, use the following command to add the certificate to a userid:
  
  Use the following example if you are using ZSS:

  ```racf
  RACDCERT ADD(<dataset>) ID(<userid>) WITHLABEL('<label>') TRUST
  SETROPTS RACLIST(DIGTCERT, DIGTRING) REFRESH
  ```

  :::tip
  To disable the API ML mapper, ensure that you set the parameter `components.gateway.apiml.security.useInternalMapper` to `false`.
  :::
</details>

**ACF2** 

<details>
<summary>Click here for an example command in ACF2. </summary>  

  Use the following example if you are using the internal API ML mapper:

  Create the mapping for the user and a distinguished name filter:

  ```acf2
  CERTMAP.<recid>     
  SDNFILTR(<subject's-distinguished-name-filter>)
  LABEL(<label>)
  USERID(<userid>)
  TRUST
  ```
  * `<recid>`  
  Specifies the record ID that uniquely identifies a particular record.

  * `<subject's-distinguished-name-filter>`  
  Specifies the subject name from the user's certificate.

  * `<label>`  
  Specifies the name (label) to use for reference purposes.

   * `<userid>`  
  Specifies the userid that the certificate maps to.

  Alternatively, if you disabled the internal API ML mapper, use the following command to add the certificate to a userid:

  Use the following example if you are using ZSS:

  ```acf2
  INSERT <userid>.<certname> DSNAME('<dataset>') LABEL(<label>) TRUST
  ```

</details>

**Top Secret**

<details>
<summary>Click here for an example command in Top Secret. </summary>

  Use the following example if you are using the internal API ML mapper:

  Create the mapping for the user and a distinguished name filter:
  
  ```tss
  TSS ADDT0(<userid>) CERTMAP(<recid>)
  SDNFILTR('<subject's-distinguished-name-filter>')
  USERID(<userid>)
  TRUST
  ```

   * `<userid>`  
  Specifies the userid that the certificate maps to.

  * `<recid>`  
  Specifies the record ID that uniquely identifies a particular record.

   * `<subject's-distinguished-name-filter>`  
  Specifies the subject name from the user's certificate.

  Alternatively, if you disabled the internal API ML mapper, use the following command to add the certificate to an ACID:

  :::info
  ACID refers to an Accessor ID which is used by Top Secret to manage users and their permissions. For more information, see [ACIDs](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-top-secret-for-z-os/16-0/getting-started/product-overview/acids.html) in the Top Secret documentation.
  :::

  Use the following example if you are using ZSS:

  ```tss
  TSS ADDTO(<userid>) DIGICERT(<certname>) LABLCERT('<label>') DCDSN('<dataset>') TRUST
  ```

</details>

Additional details are likely described in your security system documentation.

:::note Notes

* The alternative ESM map commands allow mapping a certificate to a user without adding the X.509 certificate to the ESM database. While this approach is more convenient, it could be considered less secure than adding the certificate to the ACID, which offers better control and protection.
* Ensure that you have the Issuer certificate imported in the truststore or in the SAF keyring. Alternatively, you can generate these certificates in SAF.
* Ensure that the client certificate has the following `Extended Key Usage` metadata:  
`OID: 1.3.6.1.5.5.7.3.2`  
This metadata can be used for TLS client authentication.
:::

## Validate the client certificate functionality

To validate that the client certificate functionality works properly, call the login endpoint with the certificate that was set up using the steps in [Configure your z/OS system to support client certificate authentication for a specific user](#configure-your-zos-system-to-support-client-certificate-authentication-for-specific-users) described previously in this article.

Validate using _CURL_, a command line utility that runs on Linux based systems:

**Example:**

```bash
curl -X POST \
--cert /path/to/cert.pem \
--key /path/to/key.pem \
https://api-mediation-layer:7554/gateway/api/v1/auth/login -v
```

* **cert**  
  Specifies the certificate location
* **key**  
  Path to the private key
* **7554**  
  This value is a place holder. Replace this value with the configured API Gateway port in the instance

x.509 Client Certificate authentication is correctly configured if the result of the request is HTTP 200 with an `apimlAuthenticationToken` cookie generated.

Your Zowe instance is configured to accept x.509 client certificates authentication.

## Java sample application

**Note:** This code sample requires JDK 17 or a newer version.

You can find a [Java sample application](https://github.com/zowe/api-layer/blob/v3.x.x/client-cert-auth-sample/src/main/java/org/zowe/apiml/Main.java) in the Zowe API Layer repository. This sample can help you get started with client certificate authentication. 

To run the application, see [Run Client Certificate Authentication Sample](https://github.com/zowe/api-layer/blob/v3.x.x/client-cert-auth-sample/README.md) in the Zowe API Layer repository.

## How the Gateway resolves authentication

When sending a request to a service with a client certificate, the Gateway performs the following process to resolve authentication:

1. The client calls the service endpoint through the API ML Gateway with the client certificate.
2. The client certificate is verified as a valid TLS client certificate against the trusted certificate authorities (CAs) of the Gateway.
3. The certificate is checked against the CA in the Zowe keyring. If the certificate is valid, the security service (eg RACF MAP) then checks to see if the certificate is mapped to a userid. .<!-- Original text: The public key of the provided client certificate is verified against SAF. SAF subsequently returns a user ID that owns this certificate. -->
4. If the id is authenticated and authorized, the downstream service can use the id for authentication to the downstream service. <!-- Original: The Gateway then performs the login of the mapped user and provides valid authentication to the downstream service. -->

When sending a request to the login endpoint with a client certificate, the Gateway performs the following process to exchange the client certificate for an authentication token:

1. The client calls the API ML Gateway login endpoint with the client certificate.
2. The client certificate is verified to ensure this is a valid TLS client certificate against the trusted CAs of the Gateway.
3. The public part of the provided client certificate is verified against SAF. SAF subsequently returns a user ID that owns this certificate.
4. The Gateway then performs the login of the mapped user and returns a valid JWT token.

:::note Notes:

* As of Zowe release 3.0.0, the Internal API ML Mapper is the default API that provides this mapping between the public part of the client certificate and SAF user ID. Alternatively, you can use Z Secure Services (ZSS) to provide this API for API ML, with the noted exception when using ACF2, although we recommend using the internal API ML mapper.
* For information about ZSS, see the section Zowe runtime in the [Zowe server-side installation overview](./install-zos.md).
:::

The following diagram shows how routing works with ZSS, in the case where the ZSS API is used for the identity mapping.

![Zowe client certificate authentication diagram](../images/api-mediation/zowe-client-cert-auth.png)


