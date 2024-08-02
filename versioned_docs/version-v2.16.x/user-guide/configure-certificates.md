# Configuring certificates

Review this article to learn about the key concepts of Zowe certificates, and options for certificate configuration. 

:::info Required roles: system programmer, security administrator
:::

Zowe uses digital certificates for secure, encrypted network communication over Secure Sockets Layer/Transport Layer Security (SSL/TLS) and HTTPS protocols. Communication in Zowe can be between Zowe servers, from Zowe to another server, or even between Zowe's servers and Zowe's client components.

Zowe's certificates are stored in its **keystore**. Verification of these certificates and any incoming certificates from other servers or clients is done by using certificates of certificate authorities (CAs) within Zowe's **truststore**.

Zowe supports using either file-based (`PKCS12`) or z/OS key ring-based (when on z/OS) keystores and truststores, and can reuse compatible stores if they exist. Zowe can assist in creating the stores by either generating certificates or by allowing users to import their own compatible certificates via the `zwe init certificate` command. 

* [Certificate concepts](#certificate-concepts)
* [Certificate verification](#certificate-verification)
* [Zowe certificate requirements](#zowe-certificate-requirements)
* [Certificate setup type](#certificate-setup-type)
* [Next steps: Creating or importing certificates to Zowe](#next-steps-creating-or-importing-certificates-to-zowe)

:::note 
If you are already familiar with certificate concepts and how Zowe uses certificates and are ready to get started, see the options under the section _Next steps: Creating or importing certificates to Zowe_ at the end of this article.
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
The keystore is the location where Zowe stores certificates that Zowe servers present to clients and other servers. In the simplest case, the keystore contains one private key and a certificate pair, which can then be used by each Zowe server.
When you are using a key ring, a single key ring can serve both as a keystore and as a truststore if desired.

### Truststore
The truststore is used by Zowe to verify the authenticity of the certificates that Zowe encounters. The authenticity is required when Zowe is communicating with another server, with one of Zowe's own servers, or with a client that presents a certificate. A truststore is composed of Certificate Authority (CA) certificates that are compared against the CAs that an incoming certificate claims to be signed by. To ensure a certificate is authentic, Zowe must verify that the certificate's claims are correct. Certificate claims include that the certificate was sent by the host that the certificate was issued to, and that the cryptographic signature of the authorities the certificate claims to have been signed by match those found within the truststore. This process helps to ensure that Zowe only communicates with hosts that you trust and have verified as authentic.
When using a key ring, a single key ring can be both a keystore and a truststore if desired.

### PKCS12
PKCS12 is a file format that allows a Zowe user to hold many crytopgrahic objects in one encrypted, passworded file. This file format is well supported across platforms but because it is just a file, you can prefer to use z/OS key rings instead of PKCS12 certificates for ease of administration and maintenance.

### z/OS key ring
z/OS provides an interface to manage cryptographic objects in "key rings". As opposed to PKCS12 files, using z/OS key rings allows the crypto objects of many different products to be managed in a uniform manner. z/OS key rings are still encrypted, but do not use passwords for access. Instead, SAF privileges are used to manage access. Java's key ring API requires that the password field for key ring access to be set to "password", so despite not needing a password, you can see this keyword.

Use of a z/OS keystore is the recommended option for storing certificates if system programmers are already familiar with the certificate operation and usage.
Creating a key ring and connecting the certificate key pair requires elevated permissions. When the TSO user ID does not have the authority to manipulate key rings and users want to create a Zowe sandbox environment or for testing purposes, the USS keystore is a good alternative.

One option for certificate setup for key rings is to copy the JCL `ZWEKRING` member of Zowe's SAMPLIB and customize its values. 

### Server certificate
Servers need a certificate to identify themselves to clients. Every time that you go to an HTTPS website, for example, your browser checks the server certificate and its CA chain to verify that the server you reached is authentic.

### Client certificate
Clients do not always need certificates when they are communicating with servers, but sometimes client certificates can be used wherein the server verifies authenticity of the client similar to how the client verifies authenticity for the server. When client certificates are unique to a client, the certificate can be used as a form of authentication to provide convenient yet secure login.

### Self-signed certificates
A self-signed certificate is one that is not signed by a CA at all – neither private nor public. In this case, the certificate is signed with its own private key, instead of requesting verification from a public or a private CA. It means that there is no chain of trust to guarantee that the host with this certificate is the one you wanted to communicate with. Note that these certificates are not secure against other hosts masquerading as the one you want to access. As such, it is highly recommended that certificates be verified against the truststore for production environments.

## Certificate verification
When you configure Zowe, it is necessary to decide whether Zowe verifies certificates against its truststore.

In the Zowe configuration YAML, the property `zowe.verifyCertificates` controls the verification behavior. It can be `DISABLED`, `NONSTRICT`, or `STRICT`.

You can set this property either before or after certificate setup, but **it is recommended to set `zowe.verifyCertificates` before certificate setup** because it affects the automation that Zowe can perform during certificate setup.

### DISABLED verification
If you set `zowe.verifyCertificates` to `DISABLED`, certificate verification is not performed. It is not recommended for security reasons, but may be used for proof of concept or when certificates within your environment are self-signed.

If you set `DISABLED` before certificate setup, Zowe does not automate putting z/OSMF trust objects into the Zowe truststore. This action can result in failure to communicate with z/OSMF if later you enable verification. As such. It is recommended to either set verification on by default, or to reinitialize the keystore if you choose to turn on verification at a later point.

### NON-STRICT verification
If you set `zowe.verifyCertificates` to `NONSTRICT`, certificate verification is performed except for hostname validation. Using this setting, the certificate Common Name or Subject Alternate Name (SAN) is not checked. Skipping hostname validation facilitates deployment to environments where certificates are valid but do not contain a valid hostname. This configuration is for development purposes only and should not be used for production.

### STRICT verification
`STRICT` is the recommended setting for `zowe.verifyCertificates`. This setting performs maximum verification on all certificates Zowe sees, and uses Zowe truststore.


## Zowe certificate requirements
If you do not yet have certificates, Zowe can create self-signed certificates for you. The use of self-signed certificates for production is not recommended, so you should bring your own certificates. Note that the certificates must be valid for use with Zowe.

### Extended key usage
Zowe server certificates must either not have the `Extended Key Usage` (EKU) attribute, or have both the `TLS Web Server Authentication (1.3.6.1.5.5.7.3.1)` and `TLS Web Client Authentication (1.3.6.1.5.5.7.3.2)` values present within.

Some Zowe components act as a server, some as a client, and some as both - client and server. The component certificate usage for each of these cases is controlled by the Extended Key Usage (EKU) certificate attribute. The Zowe components use a single certificate (or the same certificate) for client and server authentication, so it is required that this certificate is valid for the intended usage/s of the component - client, server, or both. The EKU certificate extension attribute is not required, however, if it is specified, it must be defined with the intended usage/s. Otherwise, connection requests will be rejected by the other party


### Hostname validity
The host communicating with a certificate should have its hostname match one of the values of the certificate's Common Name or Subject Alternate Name (SAN). If this condition is not true for at least one of the certificates that are seen by Zowe, then you may wish to set [NON-STRICT verification](#non-strict-verification) within Zowe's configuration.

### z/OSMF access
The z/OSMF certificate is verified according to Zowe's [Certificate verification setting](#certificate-verification), as is the case with any certificate that is seen by Zowe. However, Zowe will also set up a trust relationship with z/OSMF within Zowe's truststore during certificate setup automation if the certificate setting is set to any value other than [DISABLED](#disabled-verification).

## Certificate setup type
Whether importing or letting Zowe generate certificates, the setup for Zowe certificate automation and the configuration to use an existing keystore and truststore depends upon the content format: file-based (`PKCS12`) or z/OS key ring-based.

### File-based (PKCS12) certificate setup

Zowe is able to use PKCS12 certificates that are stored in USS. Zowe uses a `keystore` directory to contain its certificates primarily in PKCS12 (`.p12`, `.pfx`) file format, but also in PEM (`.pem`) format. The truststore is in the `truststore` directory that holds the public keys and CA chain of servers that Zowe communicates with (for example z/OSMF).

### z/OS key ring-based certificate setup

Zowe is able to work with certificates held in a **z/OS key ring**.  

The JCL member `.SZWESAMP(ZWEKRING)` contains security commands to create a SAF key ring. By default, this key ring is named `ZoweKeyring`. You can use the security commands in this JCL member to generate a Zowe certificate authority (CA) and sign the server certificate with this CA. The JCL contains commands for all three z/OS security managers: RACF, TopSecret, and ACF2.

There are two ways to configure and submit `ZWEKRING`:

- Copy the JCL `ZWEKRING` member and customize its values.
- Customize the `zowe.setup.certificate` section in `zowe.yaml` and use the `zwe init certificate` command.

    You can also use the `zwe init certificate` command to prepare a customized JCL member by using `ZWEKRING` as a template.  

A number of key ring scenarios are supported:

- Creation of a local certificate authority (CA) which is used to sign a locally generated certificate. Both the CA and the certificate are placed in the `ZoweKeyring`.
- Import of an existing certificate that is already held in z/OS to the `ZoweKeyring` for use by Zowe.  
- Import of an existing certificate already held in z/OS to the `ZoweKeyring` for use by Zowe.

## Next steps: Creating or importing certificates to Zowe

Review the following options and choose which best applies to your use case:

* Take our [Certificates Configuration Questionnaire](./certificates-configuration-questionnaire) to assist with determining which configuration scenario and associated zowe.yaml format best suits your use case.

* To review the various zowe.yaml files to see which certificate configuration applies to your specific use case, see [Certificate configuration scenarios](./certificate-configuration-scenarios.md).

* If you have an existing certificate, you can import this certificate to the keystore. For more information, see [Import and configure an existing certificate](./import-certificates.md).

* If you do not have an existing certificate, you can create one. For more information, see [Generate a certificate](./generate-certificates.md).

* When your certificate is already in the keystore, it is ready for use. For more information about how to use it, see [Use certificates](./use-certificates.md).

* If you run into any error when configuring certificates, see [Troubleshooting the certificate configuration](../troubleshoot/troubleshoot-zos-certificate.md).

