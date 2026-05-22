# Working with certificates

Certificates authorize communication between a server and client, such as z/OSMF and Zowe CLI. The client CLI must "trust" the server to successfully issue commands. Use one of the following methods to let the CLI communicate with the server.
## Configure certificates signed by a Certificate Authority (CA)
System administrators can configure the server with a certificate signed by a Certificate Authority (CA) trusted by Mozilla. When a CA trusted by Mozilla exists in the certificate chain, the CLI automatically recognizes the server and authorizes the connection.

:::info find out more

- [Using certificates with z/OS client/server applications](https://www.ibm.com/docs/en/zos/2.5.0?topic=certificates-using-zos-clientserver-applications) in the IBM Documentation.
- [Configuring the z/OSMF key ring and certificate](https://www.ibm.com/docs/en/zos/2.5.0?topic=configurations-configuring-zosmf-server-certificate-key-ring) in the IBM Documentation.
- [Certificate management in Zowe API Mediation Layer](../extend/extend-apiml/certificate-management-in-zowe-apiml.md)
- [Mozilla Included CA Certificate List](https://wiki.mozilla.org/CA/Included_Certificates)

:::

## Extend trusted certificates on client

If your organization uses self-signed certificates in the certificate chain (rather than a CA trusted by Mozilla), you can download the certificate to your computer and add it to the local list of trusted certificates. Provide the certificate locally using the `NODE_EXTRA_CA_CERTS` environment variable.

Organizations might want to configure all client computers to trust the self-signed certificate.

:::info find out more

The blog post [Zowe CLI: Providing NODE_EXTRA_CA_CERTS](https://medium.com/@dkelosky/zowe-cli-providing-node-extra-ca-certs-117727d936e5) outlines the process for using environment variables to trust a self-signed certificate.

:::

## Bypass certificate requirement

If you do not have server certificates configured at your site, or you want to trust a known self-signed certificate, you can append the `--reject-unauthorized false` flag to your CLI commands. Setting the `--reject-unauthorized` flag to `false` rejects self-signed certificates and essentially bypasses the certificate requirement.

:::warning important

Understand the security implications of accepting self-signed certificates at your site before you use this command.

:::

To bypass the certificate requirement, open a command line window and issue the following command with your information:
```
zowe zosmf check status --host <host> --port <port> --user <username> --pass <password> --reject-unauthorized false
```

- `<host>`

    Specifies the host name.

- `<port>`

    Specifies the port number.

- `<username>`

    Specifies the user name.

- `<password>`

    Specifies the user password.
