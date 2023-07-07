# Zowe certificate configuration overview

As a system programmer, review this article to learn about the key concepts of Zowe certificates, and options for certificate configuration.

Zowe provides the ability to [generate a certificate](./use-certificates.md) using the `zwe init certificate` command. Zowe can also be configured to [use an existing certificate](./import-certificates.md) provided by the user's security team in a z/OS customer shop.

## What Zowe certificates are used for?

Zowe uses certificates to verify the identity and subsequently establish an encrypted network connection between applications. The connection is using the Secure Sockets Layer/Transport Layer Security (SSL/TLS) protocol. Certificates and their associated private keys need to be stored either in a SAF key ring or in a `PKCS12` keystore.

## What certificates Zowe supports?

Zowe supports keystores and truststores that are either z/OS key rings (when on z/OS) or PKCS12 files.

### PKCS12 certificates in a keystore

Zowe is able to use PKCS12 certificates that are stored in USS. This certificate is used for encrypting TLS communication between Zowe clients and Zowe z/OS servers, as well as intra z/OS Zowe server to Zowe server communication. Zowe uses a `keystore` directory to contain its external certificate, and a `truststore` directory to hold the public keys of servers which Zowe communicates with (for example z/OSMF).

By default, Zowe is reading PKCS12 keystore from `keystore` directory which can be located in zowe.yaml. This directory contains a server certificate, the Zowe generated certificate authority, and a `truststore` which holds intermediate certificates of servers that Zowe communicates with (for example z/OSMF).

The use of a USS PKCS12 keystore is suitable for proof-of-concept projects as special permissions to create and manage the PKCS12 keystore are not required. For production usage of Zowe, it is recommended to work with certificates held in z/OS key rings. Configuring z/OS key rings may require security administrator privileges.  

### JCERACFKS certificates in a key ring

Zowe is able to work with certificates held in a **z/OS Key ring**.  

The JCL member `.SZWESAMP(ZWEKRING)` contains security commands to create a SAF key ring. By default, this keyring is named `ZoweKeyring`. You can use the security commands in this JCL member to generate a Zowe certificate authority (CA) and sign the server certificate with this CA. The JCL contains commands for three z/OS security managers: RACF, TopSecret, and ACF/2.

There are two ways to configure and submit `ZWEKRING`:

- Customize and submit the `ZWEKRING` JCL member.
- Customize the `zowe.setup.certificate` section in `zowe.yaml` and use the `zwe init certificate` command.

Use the `zwe init certificate` command to prepare a customized JCL member using `ZWEKRING` as a template.  

A number of key ring scenarios are supported:

- Creation of a local certificate authority (CA) which is used to sign a locally generated certificate. Both the CA and the certificate are placed in the `ZoweKeyring`.
- Import of an existing certificate already held in z/OS to the `ZoweKeyring` for use by Zowe.  
- Creation of a locally generated certificate and signed by an existing certificate authority. The certificate is placed in the key ring.

## Where to get started with Zowe certificates?

Zowe records the configuration in `zowe.yaml` file with [5 different scenarios](./certificate-configuration-scenarios.md) for you to quickly get started with.

Before starting configuring your certificate, you might want to get familiar with the concepts in Zowe certificates.

### Background knowledge

#### Certificates in Zowe architecture

Placeholder for a diagram

#### Truststore

Truststores are the repositories that contain cryptographic artifacts like certificates and private keys that are used for cryptographic protocols such as TLS. A truststore contains the certificate authority certificates which the endpoint trusts.

The concept of the "truststore" is vital when it comes to secure communication with external services. It serves as a secure repository for storing certificates and trust anchors. In Zowe, the "truststore" is utilized to establish trust relationships with external services. The truststore captures and manages the relationship between Zowe's components and the certificates presented by the external services.

In addition to utilizing the intra-address space of certificates, Zowe incorporates external services on z/OS to enhance the encryption of messages transmitted between its servers. These external services, such as z/OSMF or Zowe conformant extensions, have registered themselves with the API Mediation Layer.

[Zowe API Mediation Layer](../user-guide/api-mediation/api-mediation-overview.md), acting as an intermediary, is responsible for validating these certificates. When the API Mediation Layer receives a certificate from an external service, it examines each certificate in the certificate chain and compares it to the certificates in the "truststore."

By leveraging the truststore, Zowe ensures that only trusted and authorized external services can establish communication with its servers. The truststore validates the authenticity and integrity of the presented certificates, providing an additional layer of security.

#### Keystore and Key ring

Keystores are repositories that contain cryptographic artifacts like certificates and private keys that are used for cryptographic protocols such as TLS.

A keystore contains personal certificates, plus the corresponding private keys that are used to identify the owner of the certificate.
For TLS, a personal certificate represents the identity of a TLS endpoint. Both the client (for example, a REST client) and the server (for example, a IBM® z/OS® Connect server) might have personal certificates to identify themselves.

What is key ring?

#### Extended key usage

When a TLS certificate is used for encryption across a socket connection two enpoints are used: One endpoint for the client, and another endpoint for the server. This usage is restricted with the `Extended Key Usage` (EKU) attribute. Zowe is using the same certificate for server and client authentication and so it is required that this certificate is valid for both. Certificate extension Extended Key Usage (EKU) is not required, however, if an EKU is specified, it must have both server and client usage. Otherwise, a connection will be refused.

**Note:**  
 A problem can occur when z/OS certificates are configured to explicitly act only as a server for northbound certificates with a `TLS Web Server Authentication (1.3.6.1.5.5.7.3.1)` OID. As Zowe's micro services authenticate to the API Catalog on USS using TLS, the certificate needs to be valid as a southbound client certificate. To maintain server northbound functionality as well as validation as a southbound certificate, ensure that the certificate contains the `TLS Web Client Authentication (1.3.6.1.5.5.7.3.2)` value in the Extended Key Usage section.

Additionally, the `Digital signature and/or key agreement` must also be set with the extension value in the Key Usage section. For more information, see [key usage extensions and extended key usage](https://help.hcltechsw.com/domino/10.0.1/admin/conf_keyusageextensionsandextendedkeyusage_r.html).

### Configuration in zowe.yaml file

Zowe records the final configuration in `zowe.yaml` file.

## How to manage certificates and verification in Zowe?

Certificates and their verification are managed within a keystore (certificate storage) and a truststore (verification storage).

Zowe supports certificates that are stored either in a USS directory Java KeyStore format or else held in a z/OS Keyring. z/OS keystore is the preferred choice for storing certificates where system programmers are already familiar with their operation and usage. The user ID setting up a keystore and connecting it with certificates requires elevated permissions, and in scenarios where you need to create a Zowe sandbox environment or for testing purposes and your TSO user ID doesn't have authority to manipulate key rings, USS keystores are a good alternative.

* If you are using a USS keystore, then the script zowe-setup-certificates.env is the configuration step required to create the USS directory that contains the certificate. This is described in detail in Configuring Zowe certificates in a USS KeyStore.

* If you are using a key ring, the sample JCL member `ZWEKRING` provided in the PDS library `SZWESAMP` contains the security commands to create a key ring and manage its associated certificates. This is described in Configuring Zowe certificates in a key ring which provides instructions for how to configure Zowe to work with the following certificates.
    * a self-signed certificate
    * a certificate signed with an existing certificate authority
    * an existing certificate already held in the SAF database that can be added to the Zowe key ring.

For both scenarios, where the certificate is held in a USS Java Keystore or a z/OS key ring, the `USS KEYSTORE_DIRECTORY` is still required which is created with the script zowe-setup-certificates.sh.

* In the USS scenario, this directory holds the `.cer` and `.pem` files for the certificate itself.
* In the key ring scenario, this directory stores the location and name of the Zowe key ring and its certificates.

### Enable certificate validation without hostname validation

To enable certificate validation without hostname validation, set `zowe.verifyCertificates: NONSTRICT`. Using this setting, the certificate Common Name or Subject Alternate Name (SAN) is not checked. Disabling this parameter facilitates deployment to environments where certificates are valid but do not contain a valid hostname. This configuration is for development purposes only and should not be used for production.

A proper setup of the truststore is mandatory to successfully start Zowe with `zowe.verifyCertificates: STRICT`.

## Choosing USS Keystore or z/OS Key ring to store Zowe certificates

Zowe supports certificates that are stored either in a USS directory **Java KeyStore** in the `.p12` format or, alternatively, certificates held in a **z/OS Key ring**. Use of a z/OS keystore is the recommended option for storing certificates if system programmers are already familiar with the certificate operation and usage.
Creating a key ring and connecting the certificate key pair requires elevated permissions. When the TSO user ID does not have the authority to manipulate key rings and users want to create a Zowe sandbox environment or for testing purposes, the USS keystore is a good alternative.

### Create a certificate authority and use it to self-signed a certificate

The `zwe init security` command takes its input from the `zowe.setup.security` section in the `zowe.yaml` file. To help with file customization, there are five sections in the file.

## Next steps: How to configure your certificate?

If you have an existing certificate, you can import this certificate to the keystore or key ring. For more information, see the instructions in [Import and configure an existing certificate](./import-certificates.md).

If you do not have an existing certificate, you need to create one. See instructions in [Generate a certificate if you do not have a certificate](./generate-certificates.md).

When your certificate is in the keystore or key ring, it is ready for use. For more information, see instructions in [Use certificates](./use-certificates.md).

If you run into any error when configuring certificates, see [Troubleshooting guide for certificate configuring](placeholder).

