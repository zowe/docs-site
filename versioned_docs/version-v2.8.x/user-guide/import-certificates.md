# Configure certificates if you have existing certificates

## Import your PKCS12 certificate

Before you import a PKCS12 certificate, you need to import a certificate authority first.

### Manually import a certificate authority into a web browser

To import an existing certificate and avoid the browser untrusted CA challenge, you have to import Zowe's certificates into the browser to avoid untrusted network traffic challenges. For more information, see [Import the local CA certificate to your browser](../extend/extend-apiml/certificate-management-in-zowe-apiml.md/#import-the-local-ca-certificate-to-your-browser).

To avoid requiring each browser to trust the CA that signed the Zowe certificate, you can use a public certificate authority such as _Symantec_, _Comodo_, _Let's Encrypt_, or _GoDaddy_to create a certificate. These certificates are trusted by all browsers and most REST API clients. This option, however, requires a manual process to request a certificate and may incur a cost payable to the publicly trusted CA.

## Connect your JCERACFKS certificate