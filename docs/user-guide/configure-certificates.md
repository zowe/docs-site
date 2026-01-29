# Configuring certificates

Review this article to learn about the key concepts of Zowe certificates, and options for certificate configuration. 

:::info Required roles: system programmer, security administrator
:::

Zowe uses digital certificates for secure, encrypted network communication over Secure Sockets Layer/Transport Layer Security (SSL/TLS) and HTTPS protocols. Communication in Zowe can be between Zowe servers, from Zowe to another server, or even between Zowe's servers and Zowe's client components.

Zowe's certificates are stored in its **keystore**. Verification of these certificates and any incoming certificates from other servers or clients is done by using certificates of certificate authorities (CAs) within Zowe's **truststore**.

Zowe supports using either file-based (`PKCS12`) or z/OS key ring-based (when on z/OS) keystores and truststores, and can reuse compatible stores if they exist. 

* [Certificate concepts](#certificate-concepts)
* [Certificate verification](#certificate-verification)
* [Zowe certificate requirements](#zowe-certificate-requirements)
* [Certificate setup type](#certificate-setup-type)
* [Next steps: Creating or importing certificates to Zowe](#next-steps-creating-or-importing-certificates-to-zowe)

:::note 
If you are already familiar with certificate concepts and how Zowe uses certificates and are ready to get started, see the options under the section [_Next steps: Creating or importing certificates to Zowe_](#next-steps-creating-or-importing-certificates-to-zowe) at the end of this article.
:::

## Certificate concepts

Before you get started with configuring certificates, it is useful to familiarize yourself with the following key concepts:

* [Keystore](#keystore)
* [Truststore](#truststore)
* [PKCS12](#pkcs12)
* [z/OS key ring](#zos-key-ring)
* [Server certificate](#server-certificate)
* [Client certificate](#client-certificate)
* [Self-signed certificates](#self-signed-certificates)

### Keystore
The keystore is the location where Zowe stores certificates that Zowe servers present to clients and other servers. In the simplest case, the keystore contains one certificate represented by a public/private key pair, which can then be used by each Zowe server.

### Truststore
The truststore is used by Zowe to verify the authenticity of the certificates that Zowe encounters. The authenticity is required when Zowe is communicating with another server, with one of Zowe's own servers, or with a client that presents a certificate. A truststore is composed of Certificate Authority (CA) certificates that are compared against the CAs that an incoming certificate claims to be signed by. To ensure a certificate is authentic, Zowe must verify that the certificate's claims are correct. This process helps to ensure that Zowe only communicates with hosts that you trust and have verified as authentic.

### PKCS12
PKCS12 is a file format that allows a Zowe user to hold many cryptographic objects in one encrypted, password-protected file which is well supported across platforms. PKCS12 setups typically have distinct keystores and truststores, though you can use one store as both keystore and truststore. Throughout Zowe's documentation, we will by default treat the keystore and truststore as separate and distinct.

* Use of PKCS12 keystores and truststores is recommended for non-production environments.

### z/OS key ring
z/OS provides an interface to manage cryptographic objects in "key rings". Compared with PKCS12, using z/OS key rings grants a deeper integration of certificates into z/OS systems and security management, which benefits systems management and operations across multiple products. z/OS key rings are still encrypted, but do not use passwords for access. Instead, SAF privileges are used to manage access.

* Use of z/OS key rings is recommended for production environments.

### Server certificate
Servers need a certificate to identify themselves to clients. Every time that you go to an HTTPS website, for example, your browser checks the server certificate and its CA chain to verify that the server you reached is authentic.

### Client certificate
Clients do not always need certificates when they are communicating with servers, but sometimes client certificates can be used to establish the server's trust of a client's identity, similar to how the client verifies authenticity for the server. When client certificates are unique to a client, the certificate can be used as a form of authentication and login.

### Self-signed certificates
A self-signed certificate is one that is not signed by a public or private certificate authority. In this case, the certificate is signed with its own private key, instead of requesting a signature from a public or a private CA. Self-signed certificates means there is no chain of trust to guarantee that the host with such a certificate is definitively the one you wanted to communicate with, and such they are considered **insecure**. Therefore, we highly recommended and by default require all certificates be verified against a certificate authority in the truststore.

## Certificate verification
When you configure Zowe, it is necessary to decide whether Zowe verifies certificates against its truststore.

In the Zowe configuration YAML, the property `zowe.verifyCertificates` controls the verification behavior. It can be `DISABLED`, `NONSTRICT`, or `STRICT`.

You can set this property either before or after certificate setup, but **it is recommended to set `zowe.verifyCertificates` before certificate setup**.

### DISABLED verification
If you set `zowe.verifyCertificates` to `DISABLED`, certificate verification is not performed. It is not recommended for security reasons, but may be used for proof of concept or when certificates within your environment are self-signed.

If you set `DISABLED` before certificate setup, Zowe does not automate putting z/OSMF trust objects into the Zowe truststore. This action can result in failure to communicate with z/OSMF if later you enable verification. As such, it is recommended to either set verification on by default, or to reinitialize the keystore if you choose to turn on verification at a later point.

### NON-STRICT verification
If you set `zowe.verifyCertificates` to `NONSTRICT`, certificate verification is performed except for hostname validation. Using this setting, the certificate Common Name or Subject Alternate Name (SAN) is not checked. Skipping hostname validation facilitates deployment to environments where certificates are valid but do not contain a valid hostname. This configuration is for development purposes only and should not be used for production.

### STRICT verification
`STRICT` is the recommended setting for `zowe.verifyCertificates`. This setting performs maximum verification on all certificates Zowe sees, and uses Zowe truststore.


## Zowe certificate requirements
If you do not yet have certificates, Zowe can create self-signed certificates for you. The use of self-signed certificates for production is not recommended, so you should bring your own certificates. Note that the certificates must be valid for use with Zowe.

### Extended key usage
Zowe server certificates must either not have the `Extended Key Usage` (EKU) attribute, or have both the `TLS Web Server Authentication (1.3.6.1.5.5.7.3.1)` and `TLS Web Client Authentication (1.3.6.1.5.5.7.3.2)` values present within.

Some Zowe components act as a server, some as a client, and some as both - client and server. The component certificate usage for each of these cases is controlled by the Extended Key Usage (EKU) certificate attribute. The Zowe components use a single certificate (or the same certificate) for client and server authentication, so it is required that this certificate is valid for the intended usage/s of the component - client, server, or both. The EKU certificate extension attribute is not required, however, if it is specified, it must be defined with the intended usage/s. Otherwise, connection requests will be rejected by the other party


### JWT Token Signing Algorithm

The server certificate could be used to sign JWT tokens when one of the following conditions is valid:

- The token provider is set as SAF (see `apiml.security.auth.provider=saf`)
- The token provider is set as z/OSMF (see `apiml.security.auth.provider=zosmf`) _and_ z/OSMF is not [configured to support JWT tokens](https://www.ibm.com/docs/en/zos/3.1.0?topic=configurations-enabling-json-web-token-support)
- [Personal access tokens (PAT)](../getting-started/zowe-security-authentication.md#authentication-with-personal-access-token-pat) are enabled

Given one of those conditions, the supported JWT signing algorithm is `RSASSA-PKCS1-v1_5` using SHA-256 signature algorithm as defined by RFC 7518, Section 3.3. This algorithm requires a 2048-bit key, so ensure your server certificate has a key size of at least 2048 bits.

### Hostname validity
The host communicating with a certificate should have its hostname match one of the values of the certificate's Common Name or Subject Alternate Name (SAN). If this condition is not true for at least one of the certificates that are seen by Zowe, then you can set [NON-STRICT verification](#non-strict-verification) within Zowe's configuration as a workaround. It is recommended to update your certificates so their SAN or Common Name match the hostname.

### z/OSMF access
z/OSMF's certificate is verified according to Zowe's [Certificate verification setting](#certificate-verification), as is the case with any certificate that is seen by Zowe. Therefore, you will need the certificate authority which signed z/OSMF's certificate in Zowe's truststore. 

## Certificate setup type
Zowe offers automated assistance setting up certificates, though this is disabled by default during the installation process, as we expect most users to bring their own certificates to Zowe. Zowe offers automation for five different scenarios covering both PKCS12 and z/OS key ring options, detailed later under [Certificate Configuration Scenarios](./certificate-configuration-scenarios.md).

## Next steps: Configuring Certificates for Zowe

Review the following options and choose which best applies to your use case:

* If you are bringing your own certificates and key ring, and configuring them without Zowe's automated assistance, see [Finalize Certificate Configuration](./certificates-finalize-configuration.md). You should also choose this option if you are setting up Zowe with an [AT-TLS configuration](./configuring-at-tls-for-zowe-server-single-service.md).

* If you are not bringing your own certificates and key ring and will use Zowe's automated assistance, take our [Certificates Configuration Questionnaire](./certificates-configuration-questionnaire.md) to determine which configuration scenario best suits your use case and proceed from there.

If you run into any error when configuring certificates, see [Troubleshooting the certificate configuration](../troubleshoot/troubleshoot-zos-certificate.md).
