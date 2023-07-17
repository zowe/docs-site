# Zowe certificate configuration overview

As a system programmer, review this article to learn about the key concepts of Zowe certificates, and options for certificate configuration. 

Zowe uses digital certificates for secure, encrypted network communication over Secure Sockets Layer/Transport Layer Security (SSL/TLS) and HTTPS protocols. Communication in Zowe can be between Zowe servers, or from Zowe to another server, or even between Zowe's servers and Zowe's client components.

Zowe's certificates are stored in its **keystore**. Verification of these certificates and any incoming certificates from other servers or clients is done by using certificates of certificate authorities (CAs) within Zowe's **truststore**.

Zowe supports using either file-based (`PKCS12`) or z/OS key ring-based (when on z/OS) keystores and truststores, and can re-use compatible stores if they exist. Alternatively, Zowe can assist in creating the stores by either generating certificates or by allowing users to import their own compatible certificates via the `zwe init certificate` command. For key rings, running the JCL `ZWEKRING` is also an option for certificate setup.


## Certificate concepts

Before getting started with configuring certificates, it is useful to familiarize yourself with the following key concepts:

* [Keystore](#keystore)
* [truststore](#truststore)
* [PKCS12](#pkcs12)
* [z/OS Key Ring](#zos-key-ring)
* [Server certificate](#server-certificate)
* [Client certificate](#client-certificate)
* [Self-signed certificates](#self-signed-certificates)
### Keystore
The keystore is the location where Zowe stores certificates that Zowe servers present to clients and other servers. In the simplest case, the keystore contains one private key and a certificate pair, which can then be used by each Zowe server. 

When using a key ring, a single key ring can serve both as a keystore and as a truststore if desired.

### Truststore
The truststore is used by Zowe to verify the authenticity of the certificates it encounters, whether communicating with another server, with one of Zowe's own servers, or with a client that presents a certificate. A truststore is composed of Certificate Authority (CA) certificates which are compared against the CAs that an incoming certificate claims to be signed by. To ensure a certificate is authentic, Zowe must verify that the certificate's claims are correct. Certificate claims include that the certificate was sent by the host that the certificate was issued to, and that the cryptographic signature of the authorities the certificate claims to have been signed by match those found within the truststore. This process helps to ensure that Zowe only communicates with hosts that you trust and have verified as authentic.

As stated previously, when using a key ring, a single key ring can be both a keystore and a truststore if desired.

### PKCS12
PKCS12 is a file format that allows a Zowe user to hold many crytopgrahic objects in one encrypted, passworded file. This file format is well-supported across platforms but because it is just a file, you may prefer to use z/OS key rings instead of PKCS12 certificates for ease of administration and maintenance.

### z/OS Key Ring
z/OS provides an interface to manage cryptographic objects in "key rings". As opposed to PKCS12 files, using z/OS key rings allows the crypto objects of many different products to be managed in a uniform manner. z/OS key rings are still encrypted, but do not use passwords for access. Instead, SAF privileges are used to manage access. Java's key ring API requires that the password field for key ring access be set to "password", so despite not needing a password, you may see this keyword.

Use of a z/OS keystore is the recommended option for storing certificates if system programmers are already familiar with the certificate operation and usage.
Creating a key ring and connecting the certificate key pair requires elevated permissions. When the TSO user ID does not have the authority to manipulate key rings and users want to create a Zowe sandbox environment or for testing purposes, the USS keystore is a good alternative.

### Server certificate
Servers need a certificate to identify themselves to clients. Every time you go to an HTTPS website for example, your browser checks the server certificate and its CA chain to verify that the server you reached is authentic.

### Client certificate
Clients do not always need certificates when communicating with servers, but sometimes client certificates can be used wherein the server verifies authenticity of the client similar to how the client verifies authenticity for the server. When client certificates are unique to a client, this can be used as a form of authentication to provide convenient yet secure login.

### Self-signed certificates
Self-signed certificates are certificates where the CA certificate that verifies the authenticity of the certificate is itself. This means there is no chain of trust to guarantee that the host with this certificate is the one you wanted to communicate with. Note that these certificates are not secure against other hosts masquerading as the one you wanted to access, so verifying certificates against the truststore is recommended for production environments.


## Certificate verification
When you configure Zowe, it is necessary to decide whether or not Zowe will perform verification of certificates against its truststore.
In the Zowe configuration YAML, the property `zowe.verifyCertificates` controls the verification behavior. It can be `DISABLED`, `NONSTRICT`, or `STRICT`.

You can set this property either before or after certificate setup, but **it is recommended to set `zowe.verifyCertificates` before certificate setup** because it affects the automation that Zowe can perform during certificate setup.

### DISABLED verification
If you set `zowe.verifyCertificates` to `DISABLED`, certificate verification is not performed. This is not recommended for security reasons, but may be used for proof of concept or when certificates within your environment are self-signed.

If you set `DISABLED` before certificate setup, Zowe will not automate putting z/OSMF trust objects into the Zowe truststore. This can result in failure to communicate with z/OSMF if at a later time you enable verification. As such, it is recommended to either set verification on by default, or to re-initialize the keystore if you choose to turn verification on at a later point.

### NONSTRICT verification
If you set `zowe.verifyCertificates` to `NONSTRICT`, certificate verification will be performed except for hostname validation. Using this setting, the certificate Common Name or Subject Alternate Name (SAN) is not checked. Skipping hostname validation facilitates deployment to environments where certificates are valid but do not contain a valid hostname. This configuration is for development purposes only and should not be used for production.

### STRICT verification
`STRICT` is the recommended setting for `zowe.verifyCertificates`. This setting performs maximum verification on all certificates Zowe sees, and uses Zowe's truststore.


## Zowe certificate requirements
If you do not yet have certificates, Zowe can create self-signed certificates for you. This is not recommended for production, so you should bring your own certificates. Note that these certificates must be valid for use with Zowe.

### Extended key usage
Zowe server certificates must either not have the `Extended Key Usage` (EKU) attribute, or have both the `TLS Web Server Authentication (1.3.6.1.5.5.7.3.1)` and `TLS Web Client Authentication (1.3.6.1.5.5.7.3.2)` values present within.

When a TLS certificate is used for encryption across a socket connection, two enpoints are used: One endpoint for the client, and another endpoint for the server. This usage is restricted with the `Extended Key Usage` (EKU) attribute. Zowe is using the same certificate for server and client authentication and so it is required that this certificate is valid for both. Certificate extension Extended Key Usage (EKU) is not required, however, if an EKU is specified, it must have both server and client usage. Otherwise, connection will be refused.

**Note:**  
 A problem can occur when z/OS certificates are configured to explicitly act only as a server for northbound certificates with a `TLS Web Server Authentication (1.3.6.1.5.5.7.3.1)` OID. As Zowe's micro services authenticate to the API Catalog on USS using TLS, the certificate needs to be valid as a southbound client certificate. To maintain server northbound functionality as well as validation as a southbound certificate, ensure that the certificate contains the `TLS Web Client Authentication (1.3.6.1.5.5.7.3.2)` value in the Extended Key Usage section.

Additionally, the `Digital signature and/or key agreement` must also be set with the extension value in the Key Usage section. For more information, see [key usage extensions and extended key usage](https://help.hcltechsw.com/domino/10.0.1/admin/conf_keyusageextensionsandextendedkeyusage_r.html).

### Hostname validity
The host communicating with a certificate should have its hostname match one of the values of the certificate's Common Name or Subject Alternate Name (SAN). If this condition is not true for at least one of the certificates seen by Zowe, then you may wish to set [NONSTRICT verification](#nonstrict-verification) within Zowe's configuration.

### z/OSMF access
The z/OSMF certificate is verified according to Zowe's [Certificate verification setting](#certificate-verification), as is the case with any certificate seen by Zowe. However, for z/OSMF, Zowe will also set up a trust relationship with z/OSMF within Zowe's truststore during certificate setup automation if the certificate setting is set to any value other than [DISABLED](#disabled-verification).


## Certificate setup type
Whether importing or letting Zowe generate certificates, the setup for Zowe certificate automation and the configuration to use an existing keystore and truststore depends upon the content type: file-based (`PKCS12`) or z/OS key ring-based.

### File-based (PKCS12) certificate setup

Zowe is able to use PKCS12 certificates that are stored in USS. Zowe uses a `keystore` directory to contain its certificates primarily in PKCS12 (`.p12`, `.pfx`) file format, but also in PEM (`.pem`) format. The truststore is in the `truststore` directory that holds the public keys and CA chain of servers which Zowe communicates with (for example z/OSMF).

### z/OS key ring-based certificate setup

Zowe is able to work with certificates held in a **z/OS Key ring**.  

The JCL member `.SZWESAMP(ZWEKRING)` contains security commands to create a SAF key ring. By default, this key ring is named `ZoweKeyring`. You can use the security commands in this JCL member to generate a Zowe certificate authority (CA) and sign the server certificate with this CA. The JCL contains commands for three z/OS security managers: RACF, TopSecret, and ACF2.

There are two ways to configure and submit `ZWEKRING`:

- Customize and submit the `ZWEKRING` JCL member.
- Customize the `zowe.setup.certificate` section in `zowe.yaml` and use the `zwe init certificate` command. 

    You can also use the `zwe init certificate` command to prepare a customized JCL member using `ZWEKRING` as a template.  

A number of key ring scenarios are supported:

- Creation of a local certificate authority (CA) which is used to sign a locally generated certificate. Both the CA and the certificate are placed in the `ZoweKeyring`.
- Import of an existing certificate already held in z/OS to the `ZoweKeyring` for use by Zowe.  
- Creation of a locally generated certificate and signed by an existing certificate authority. The certificatate is placed in the key ring.

## Next steps: Creating or importing certificates to Zowe

Review the following options to see which option best applies to your use case:

* If you have an existing certificate, you can import this certificate to the keystore. For more information, see [Import and configure an existing certificate](./import-certificates.md).

* If you do not have an existing certificate, you can  create one. For more information, see [Generate a certificate if you do not have a certificate](./generate-certificates.md).

* When your certificate is already in the keystore, it is ready for use. For more information, see [Use certificates](./use-certificates.md).

* If you run into any error when configuring certificates, see the [Troubleshooting guide for certificate configuring](placeholder).

