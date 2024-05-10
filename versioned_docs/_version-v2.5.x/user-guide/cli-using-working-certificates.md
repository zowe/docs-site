# Working with certificates

Certificates authorize communication between a server and client, such as z/OSMF and Zowe CLI. The client CLI must "trust" the server to successfully issue commands. Use one of the following methods to let the CLI communicate with the server.
## Configure certificates signed by a Certificate Authority (CA)
System Administrators can configure the server with a certificate signed by a Certificate Authority (CA) trusted by Mozilla. When a CA trusted by Mozilla exists in the certificate chain, the CLI automatically recognizes the server and authorizes the connection.
**Related information:**
- [Using certificates with z/OS client/server applications](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.icha700/icha700_Using_certificates_with_z_OS_client_server_applications.htm) in the IBM Knowledge Center.
- [Configuring the z/OSMF key ring and certificate](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/izuconfig_KeyringAndCertificate.htm) in the IBM Knowledge Center.
- [Certificate management in Zowe API Mediation Layer](../extend/extend-apiml/api-mediation-security.md#certificate-management-in-zowe-api-mediation-layer)
- [Mozilla Included CA Certificate List](https://wiki.mozilla.org/CA/Included_Certificates)
## Extend trusted certificates on client
If your organization uses self-signed certificates in the certificate chain (rather than a CA trusted by Mozilla), you can download the certificate to your computer add it to the local list of trusted certificates. Provide the certificate locally using the `NODE_EXTRA_CA_CERTS` environment variable. Organizations might want to configure all client computers to trust the self-signed certificate.
[This blog post](https://medium.com/@dkelosky/zowe-cli-providing-node-extra-ca-certs-117727d936e5) outlines the process for using environment variables to trust the self-signed certificate.
## Bypass certificate requirement
If you do not have server certificates configured at your site, or you want to trust a known self-signed certificate, you can append the `--reject-unauthorized false` flag to your CLI commands. Setting the `--reject-unauthorized` flag to `false` rejects self-signed certificates and essentially bypasses the certificate requirement.

**Important!** Understand the security implications of accepting self-signed certificates at your site before you use this command.

**Example:**
```
zowe zosmf check status --host <host> --port <port> --user <username> --pass <password> --reject-unauthorized false
```
