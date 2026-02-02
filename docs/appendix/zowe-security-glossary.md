# Glossary of Zowe Security terminology

Zowe implements a number of modern cyber-security concepts. Before getting started with configuring certificates, it is useful to familiarize yourself with the basic terminology.
Read the following definitions for explanation of the security terms related to the core security technologies applied by Zowe:

- [Certificate concepts](#certificate-concepts)
- [Certificate verification](#certificate-verification)
- [Zowe certificate requirements](#zowe-certificate-requirements)
- [Certificate setup types](#certificate-setup-types)

## Certificate concepts

* [Keystore](#keystore)
* [Truststore](#truststore)
* [PKCS12](#pkcs12)
* [z/OS Key Ring](#zos-key-ring)
* [Server certificate](#server-certificate)
* [Client certificate](#client-certificate)
* [Self-signed certificates](#self-signed-certificates)

### Keystore
The keystore is the location where Zowe stores certificates that Zowe servers present to clients and other servers. In the simplest case, the keystore contains one private key and a certificate pair, which can then be used by each Zowe server.

When using a key ring, a single key ring can serve both as a keystore and as a truststore if desired.

### Truststore
The truststore is used by Zowe to verify the authenticity of the certificates it encounters, whether communicating with another server, with one of Zowe own servers, or with a client that presents a certificate. A truststore is composed of Certificate Authority (CA) certificates which are compared against the CAs that an incoming certificate claims to be signed by. To ensure a certificate is authentic, Zowe must verify that the certificate's claims are correct. Certificate claims include that the certificate was sent by the host that the certificate was issued to, and that the cryptographic signature of the authorities the certificate claims to have been signed by match those signatures found within the truststore. This process helps to ensure that Zowe only communicates with hosts that are trusted and have been verified as authentic.

When using a key ring, a single key ring can be both a keystore and a truststore if desired.

### PKCS12
PKCS12 is a file format that allows a Zowe user to hold many cryptographic objects in one encrypted, password-protected file. This file format is well-supported across platforms but because it is just a file, you may prefer to use z/OS key rings instead of PKCS12 certificates for ease of administration and maintenance.

### z/OS Key Ring
z/OS provides an interface to manage cryptographic objects in "key rings". As opposed to PKCS12 files, using z/OS key rings allows the crypto objects of many different products to be managed in a uniform manner. z/OS key rings are still encrypted, but do not use passwords for access. Instead, SAF privileges are used to manage access. Java's key ring API requires that the password field for key ring access be set to "password", so despite not needing a password, you may see this keyword.

Use of a z/OS keystore is the recommended option for storing certificates if system programmers are already familiar with the certificate operation and usage.
Creating a key ring and connecting the certificate key pair requires elevated permissions. When the TSO user ID does not have the authority to manipulate key rings and users want to create a Zowe sandbox environment or for testing purposes, the USS keystore is a good alternative.

### Server certificate
Servers need a certificate to identify themselves to clients. Every time you go to an HTTPS website for example, your browser checks the server certificate and its CA chain to verify that the server you reached is authentic.

### Client certificate
Clients do not always need certificates when communicating with servers, but sometimes client certificates can be used wherein the server verifies authenticity of the client similar to how the client verifies authenticity for the server. When client certificates are unique to a client, this can be used as a form of authentication to provide convenient yet secure login.

### Self-signed certificates
A self-signed certificate is one that is not signed by a CA at all – neither private nor public. In this case, the certificate is signed with its own private key, instead of requesting verification from a public or a private CA. This arrangement, however, means there is no chain of trust to guarantee that the host with this certificate is the one you wanted to communicate with. Note that these certificates are not secure against other hosts masquerading as the one you want to access. As such, it is highly recommended that certificates be verified against the truststore for production environments.

## Certificate verification
When you configure Zowe, it is necessary to decide whether Zowe will perform verification of certificates against its truststore.
In the Zowe configuration YAML, the property `zowe.verifyCertificates` controls the verification behavior. It can be `DISABLED`, `NONSTRICT`, or `STRICT`.

You can set this property either before or after certificate setup, but **it is recommended to set `zowe.verifyCertificates` before certificate setup** because it affects the automation that Zowe can perform during certificate setup.

- [DISABLED verification](#disabled-verification)
- [NON-STRICT verification](#non-strict-verification)
- [STRICT verification](#strict-verification)

### DISABLED verification
If you set `zowe.verifyCertificates` to `DISABLED`, certificate verification is not performed. This is not recommended for security reasons, but may be used for proof of concept or when certificates within your environment are self-signed.

If you set `DISABLED` before certificate setup, Zowe will not automate putting z/OSMF trust objects into the Zowe truststore. This can result in failure to communicate with z/OSMF if at a later time you enable verification. As such, it is recommended to either set verification on by default, or to re-initialize the keystore if you choose to turn verification on at a later point.

### NON-STRICT verification
If you set `zowe.verifyCertificates` to `NONSTRICT`, certificate verification will be performed except for hostname validation. Using this setting, the certificate Common Name or Subject Alternate Name (SAN) is not checked. Skipping hostname validation facilitates deployment to environments where certificates are valid but do not contain a valid hostname. This configuration is for development purposes only and should not be used for production.

### STRICT verification
`STRICT` is the recommended setting for `zowe.verifyCertificates`. This setting performs maximum verification on all certificates Zowe sees and uses a Zowe truststore.


## Zowe certificate requirements
If you do not yet have certificates, Zowe can create self-signed certificates for you. This is not recommended for production. Note that the certificates must be valid for use with Zowe.

- [Extended key usage](#extended-key-usage)
- [Hostname validity](#hostname-validity)
- [z/OSMF access](#zosmf-access)

### Extended key usage
Zowe server certificates must either not have the `Extended Key Usage` (EKU) attribute, or have both the `TLS Web Server Authentication (1.3.6.1.5.5.7.3.1)` and `TLS Web Client Authentication (1.3.6.1.5.5.7.3.2)` values present within.

Some Zowe components act as a server, some as a client, and some as both - client and server. The component certificate usage for each of these cases is controlled by the Extended Key Usage (EKU) certificate attribute. Zowe components use a single certificate/the same certificate for client and server authentication. As such, it is necessary that this certificate is valid for the intended usage/s of the component - client, server, or both. The EKU certificate extension attribute is not required. If, however, the EKU certificate extension attribute is specified, it must be defined with the intended usage/s. Otherwise, connection requests will be rejected by the other party.


### Hostname validity
The host communicating with a certificate should have its hostname match one of the values of the certificate's Common Name or Subject Alternate Name (SAN). If this condition is not true for at least one of the certificates seen by Zowe, then you may wish to set [NON-STRICT verification](#non-strict-verification) within Zowe configuration.

### z/OSMF access
The z/OSMF certificate is verified according to Zowe [Certificate verification setting](#certificate-verification), as is the case with any certificate seen by Zowe. However, Zowe will also set up a trust relationship with z/OSMF within the Zowe truststore during certificate setup automation if the certificate setting is set to any value other than [DISABLED](#disabled-verification).


## Certificate setup types
Zowe requires certificates in one of two formats: file-based (`PKCS12`) or z/OS key ring-based. If you are bringing your own previously defined certificates to Zowe, you can configure `zowe.certificate` with this information directly. Key rings are required for Zowe AT-TLS configurations. If you are not bringing your own certificates, [Zowe can assist](../user-guide/certificates-configuration-scenarios.md) with certificate generation.

- [File-based (PKCS12) certificate setup](#file-based-pkcs12-certificate-setup)
- [z/OS key ring-based certificate setup](#zos-key-ring-based-certificate-setup)

### File-based (PKCS12) certificate setup

Zowe is able to use PKCS12 certificates that are stored in USS. Zowe uses a `keystore` directory to contain its certificates primarily in PKCS12 (`.p12`, `.pfx`) file format, but also in PEM (`.pem`) format. The truststore is in the `truststore` directory that holds the public keys and CA chain of servers which Zowe communicates with (for example z/OSMF).

Generating PKCS12 certificates is covered in [Certificate configuration scenarios](../user-guide/certificates-configuration-scenarios.md) Scenario 1 and Scenario 2.
Configuring PKCS12 certificates is covered in [Finalize certificate configuration](../user-guide/certificates-finalize-configuration.md).

### z/OS key ring-based certificate setup

Zowe is able to work with certificates held in a **z/OS key ring**.

Generating keyrings with certificates is covered in [Certificate configuration scenarios](../user-guide/certificates-configuration-scenarios.md), Scenarios 3-5.
Configuring keyrings with certificates is covered in [Finalize certificate configuration](../user-guide/certificates-finalize-configuration.md).