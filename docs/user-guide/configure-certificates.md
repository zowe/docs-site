# Configuring Zowe certificates 

As a system administrator, review this article to learn about the key concepts of Zowe certificates, and options for certificate configuration. 

Zowe uses digital certificates to verify the identity and subsequently establish an encrypted network connection between applications using the Secure Sockets Layer/Transport Layer Security (SSL/TLS) protocol. The certificate needs to be stored together with belonging private key either in the SAF key ring or in the `PKCS12` java keystore.

Zowe provides the ability to generate a certificate using the `zwe init certificate` command. Zowe can also be configured to use an existing certificate provided by the security team in a z/OS customer shop.
 
## Trust store

In addition to the use of the intra-address space of certificates, Zowe also uses external services on z/OS to encrypt messages between its servers. Such z/OS external services include z/OSMF or Zowe conformant extensions that have registered themselves with the API Mediation Layer. These services present their own certificate to the API Mediation Layer, whereby the trust store is used to capture the relationship between Zowe's southbound edge and these external certificates.  

### Disable trust store validation of certificates

To disable the trust store validation of southbound certificates, set the value `zowe.verifyCertificates: DISABLED` in the `zowe.yaml` configuration file. A scenario when this is recommended is if the z/OSMF certificate is self-signed or uses an untrusted CA. In this case, Zowe API Mediation Layer does not recognize the signing authority.  

### Enable certificate validation without hostname validation

To enable certificate validation without hostname validation, set `zowe.verifyCertificates: NONSTRICT`. Using this setting, the certificate Common Name or Subject Alternate Name (SAN) is not checked. Disabling this parameter facilitates deployment to environments where certificates are valid but do not contain a valid hostname. This configuration is for development purposes only and should not be used for production.

A proper setup of the trust store is mandatory to successfully start Zowe with `zowe.verifyCertificates: STRICT`.

## Keystore versus key ring

Zowe supports certificates that are stored either in a USS directory **Java KeyStore** in the `.p12` format or, alternatively, the certificates are held in a **z/OS Keyring**. Use of a z/OS keystore is the recommended option for storing certificates if system programmers are already familiar with the certificate operation and usage. To set up a keystore and connect the keystore with certificates requires elevated permissions granted to the user ID. When the TSO user ID does not have authority to manipulate key rings in such cases as creating a Zowe sandbox environment or for testing purposes, USS keystores are a good alternative.

### PKCS12 certificates in a keystore

<!-- Zowe is able to use PKCS12 certificates that are stored in USS. This certificate is used for encrypting TLS communication between Zowe clients and Zowe z/OS servers, as well as intra z/OS Zowe server to Zowe server communication. Zowe uses a `keystore` directory to contain its external certificate, and a `truststore` directory to hold the public keys of servers which Zowe communicates with (for example z/OSMF). -->
By default, Zowe is reading PKCS12 keystore from `keystore` directory which can be located in zowe.yaml. This directory contains server certificate, Zowe generated certificate authority, and a `truststore` which holds intermediate certificates of servers that Zowe communicates with (for example z/OSMF).

USS PKCS12 keystore is valid for proof-of-concept projects because it does not require special permissions to create and manage. For production usage of Zowe, it is recommended to work with certificates held in z/OS key rings. Configuring z/OS key rings may require security administrator privileges and work with your z/OS security team. 

### JCERACFKS certificates in a key ring

Zowe is able to work with certificates held in a **z/OS Keyring**.  

The JCL member `.SZWESAMP(ZWEKRING)` contains the security commands to create a key ring named `ZoweKeyring` as well as manage the certificate and certificate authority (CA) used by Zowe's servers to encrypt TLS communications. The JCL contains commands for three z/OS security managers: RACF, TopSecret, and ACF/2.

There are two ways to configure and submit `ZWEKRING`.

- Customize and submit the `ZWEKRING` JCL member.
- Customize the `zowe.setup.certificate` section in `zowe.yaml` and use the `zwe init certificate` command. 

Using the `zwe init certificate` command prepares a customized JCL member using `ZWEKRING` as a template.  

A number of key ring scenarios are supported:

- Creation of a local certificate authority (CA) which is used to sign a locally generated certificate. Both the CA and the certificate are placed into the `ZoweKeyring`.
- Importing an existing certificate already held in z/OS to the `ZoweKeyring` for use by Zowe.  
- Creation of a locally generated certificate and signing it with an existing certificate authority. The certificatate is placed in the key ring.

### Create a certificate authority and use it to self sign a certificate

The `zwe init security` command takes its input from the `zowe.setup.security` section in the `zowe.yaml` file. To help with file customization, there are five sections in the file.

## Extended key usage

When a TLS certificate is used for encryption across a socket connection two enpoints are used: One endpoint for the client, and another endpoint for the server. This usage is restricted with the `Extended Key Usage` (EKU) attribute. Zowe is using the same certificate for server and client authentication and so it is required that this certificate is valid for both. Certificate extension Extended Key Usage (EKU) is not required, however, if an EKU is specified, it must have both server and client usage. Otherwise, a connection will be refused.

**Note:**  
 A problem can occur when z/OS certificates are configured to explicitly act only as a server for northbound certificates with a `TLS Web Server Authentication (1.3.6.1.5.5.7.3.1)` OID. As Zowe's micro services authenticate to the API Catalog on USS using TLS, the certificate needs to be valid as a southbound client certificate. To maintain server northbound functionality as well as validation as a southbound certificate, ensure that the certificate contains the `TLS Web Client Authentication (1.3.6.1.5.5.7.3.2)` value in the Extended Key Usage section.

Additionally, the `Digital signature and/or key agreement` must also be set with the extension value in the Key Usage section. For more information, see [key usage extensions and extended key usage](https://help.hcltechsw.com/domino/10.0.1/admin/conf_keyusageextensionsandextendedkeyusage_r.html).

## Next steps: How to configure your certificate?

If you have an existing certificate, you can import this certificate to the keystore or key ring. For more information, see the instructions in [Configure certificates if you have existing certificates](./import-certificates.md).

If you do not have an existing certificate, you need to create one. See instructions in [Generate a certificate if you do not have a certificate](./generate-certificates.md).

When your certificate is in the keystore or key ring, it is ready for use. For more information, see instructions in [Use certificates](./use-certificates.md).

If you run into any error when configuring certificates, see [Troubleshooting guide for certificate configuring](placeholder).
