# Configuring Zowe certificates 

As a system administrator, review this article to learn about the key concepts of Zowe certificates and the certificate configuring procudure.

Zowe uses a certificate to encrypt data for communication across secure sockets. The certificate used is specified in the `zowe.certificates` section of the `zowe.yaml`, and can either be a `PKCS12` certificate held in a USS keystore `.p12` file, or else a `JCERACKS` certificate held in a keyring.  

Zowe provides the ability to generate a certificate using the `zwe init certificate` command, and it can also be configured to use an existing certificate that might be provided by the security team in a z/OS customer shop.
 
## Trust store

In addition to Zowe using the intra-address space of certificates, Zowe uses external services on z/OS (such as z/OSMF or Zowe conformant extensions that have registered themselves with the API Mediation Layer) to encrypt messages between its servers.  These services present their own certificate to the API Mediation Layer, in which case the trust store is used to capture the relationship between Zowe's southbound edge and these external certificates.  

To disable the trust store validation of southbound certificates, set the value `zowe.verifyCertificates: DISABLED` in the `zowe.yaml` configuration file. A scenario when this is recommended is if the z/OSMF certificate is self-signed or uses an untrusted CA. In this case, Zowe API Mediation Layer does not recognize the signing authority.  

To enable certificate validation without hostname validation, set `zowe.verifyCertificates: NONSTRICT`. Using this setting, the certificate Common Name or Subject Alternate Name (SAN) is not checked. This facilitates deployment to environments where certificates are valid but do not contain a valid hostname. This configuration is for development purposes only and should not be used for production.

A proper setup of trust store is mandatory to successfully start Zowe with `zowe.verifyCertificates: STRICT`.


## Keystore versus key ring

Zowe supports certificates that are stored either in a USS directory **Java KeyStore** `.p12` format or else held in a **z/OS Keyring**. z/OS keystore are the preferred choice for storing certificates where system programmers are already familiar with their operation and usage. The user ID setting up a keystore and connecting it with certificates requires elevated permissions, and in scenarios where you need to create a Zowe sandbox environment or for testing purposes and your TSO user ID doesn't have authority to manipulate key rings, USS keystores are a good alternative.

### PKCS12 certificates in a keystore

Zowe is able to use PKCS12 certificates that are stored in USS. This certificate is used for encrypting TLS communication between Zowe clients and the Zowe z/OS servers, as well as intra z/OS Zowe server to Zowe server.  Zowe uses a `keystore` directory to contain its external certificate, and a `truststore` directory to hold the public keys of servers it communicates with (for example z/OSMF).  

Using USS PKCS12 certificates is useful for proof of concept projects using a self signed certificate.  For production usage of Zowe it is recomended to work with certificates held in z/OS keyrings.  Working with z/OS keyrings may require system administrator priviledges and working with your z/OS security team, so the self signed PKCS12 path is provided to assist with configuring and launching test and scratch Zowe instances.

### JCERACFKS certificates in a key ring

Zowe is able to work with certificates held in a **z/OS Keyring**.  

The JCL member `.SZWESAMP(ZWEKRING)` contains the security commands to create a keyring named `ZoweKeyring` and manage the certificate and certificate authoritie (CA) used by Zowe's servers to encrypt TLS communications.  The JCL contains commands for three z/OS security managers: RACF, TopSecret, and ACF/2.

There are two ways to configure and submit `ZWEKRING`.

- Customize and submit the `ZWEKRING` JCL member.
- Customize the `zowe.setup.certificate` section in `zowe.yaml` and use the `zwe init certificate` command. 

If you use the `zwe init certificate` command this will prepare a customized JCL member using `ZWEKRING` as a template.  

A number of keyring scenarios are supported:

- Creation of a local certificate authority (CA) which is used to sign a locally generated certificate, both of which are placed into the `ZoweKeyring`.
- Importing an existing certificate already held in z/OS to the `ZoweKeyring` for use by Zowe.  
- Creation of a locally generated certificate and signing it with an existing certificate authority, and placing the certificate into the key ring.


### Create a certificate authority and use it to self sign a certificate

The `zwe init security` command takes its input from the `zowe.setup.security` section in `zowe.yaml`.  To help with customizing the file there are five sections in the file.

## Extended key usage

When a TLS certificate is used for encryption across a socket connection, one of those endpoints is the client and the other is a server.  This usage is restricted with the `Extended Key Usage` (EKU) attribute. Zowe can work with certificates that have no EKU, however if an EKU is specified it must have both server and client usage. 

An example of where this is a problem with Zowe, is that z/OS certificates may be configured to explicitly only act as server northbound certificates with a `TLS Web Server Authentication (1.3.6.1.5.5.7.3.1)` OID. However, because Zowe's micro services authenticate to the API Catalog on USS using TLS, the certificate needs to be valid as a southbound client certificate.  To do this, ensure that the certificate contains the `TLS Web Client Authentication (1.3.6.1.5.5.7.3.2)` value in the Extended Key Usage section. 

Additionally, the `Digital signature and/or key agreement` must also be set as extension value in the Key Usage section. For more information, see [key usage extensions and extended key usage](https://help.hcltechsw.com/domino/10.0.1/admin/conf_keyusageextensionsandextendedkeyusage_r.html).

## How to configure your certificate?

If you have an existing certificate, you can import it to the keystore or keyring. See instructions in [Configure certificates if you have existing certificates](./import-certificates.md).

If you don't have an existing certificate, you need to create one. See instructions in [Generate a certificate if you don't have a certificate](./generate-certificates.md).

When your certificate is ready in the keystore or keyring, you can start using it. See instructions in [Use certificates](./use-certificates.md).

If you run into any error when configuring certificates, you can start troubleshooting from [Troubleshooting guide for certificate configuring](placeholder).
