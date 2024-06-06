# Configuring Zowe certificates 

As a system administrator, review this article to learn about the key concepts of Zowe certificates.

Zowe uses a certificate to encrypt data for communication across secure sockets. The certificate used is specified in the `zowe.certificates` section of the `zowe.yaml`, and can either be a `PKCS12` certificate held in a USS keystore `.p12` file, or else a `JCERACKS` certificate held in a keyring.  

Zowe provides the ability to generate a certificate using the `zwe init certificate` command, and it can also be configured to use an existing certificate that might be provided by the security team in a z/OS customer shop.
 
## Trust store

In addition to Zowe using the intra-address space of certificates, Zowe uses external services on z/OS (such as z/OSMF or Zowe conformant extensions that have registered themselves with the API Mediation Layer) to encrypt messages between its servers.  These services present their own certificate to the API Mediation Layer, in which case the trust store is used to capture the relationship between Zowe's southbound edge and these external certificates.  

To disable the trust store validation of southbound certificates, set the value `zowe.verifyCertificates: DISABLED` in the `zowe.yaml` configuration file.  A scenario when this is recommended is if the z/OSMF certificate is be self-signed or uses an untrusted CA. In this case, Zowe API Mediation Layer does not recognize the signing authority.  

To enable certificate validation without hostname validation, set `zowe.verifyCertificates: NONSTRICT`. Using this setting, the certificate Common Name or Subject Alternate Name (SAN) is not checked. This facilitates deployment to environments where certificates are valid but do not contain a valid hostname. This configuration is for development purposes only and should not be used for production.

A proper setup of trust store is mandatory to successfully start Zowe with `zowe.verifyCertificates: STRICT`.

## Keystore versus key ring

Zowe supports certificates that are stored either in a USS directory **Java KeyStore** `.p12` format or else held in a **z/OS Keyring**.  z/OS keystore are the preferred choice for storing certificates where system programmers are already familiar with their operation and usage.  The user ID setting up a keystore and connecting it with certificates requires elevated permissions, and in scenarios where you need to create a Zowe sandbox environment or for testing purposes and your TSO user ID doesn't have authority to manipulate key rings, USS keystores are a good alternative.  

## Extended key usage

When a TLS certificate is used for encryption across a socket connection, one of those endpoints is the client and the other is a server.  This usage is restricted with the `Extended Key Usage` (EKU) attribute.  Zowe can work with certificates that have no EKU, however if an EKU is specified it must have both server and client usage. 

An example of where this is a problem with Zowe, is that z/OS certificates may be configured to explicitly only act as server northbound certificates with a `TLS Web Server Authentication (1.3.6.1.5.5.7.3.1)` OID.  However, because Zowe's micro services authenticate to the API Catalog on USS using TLS, the certificate needs to be valid as a southbound client certificate.  To do this, ensure that the certificate contains the `TLS Web Client Authentication (1.3.6.1.5.5.7.3.2)` value in the Extended Key Usage section. 

Additionally, the `Digital signature and/or key agreement` must also be set as extension value in the Key Usage section. For more information, see [key usage extensions and extended key usage](https://help.hcltechsw.com/domino/10.0.1/admin/conf_keyusageextensionsandextendedkeyusage_r.html).
 