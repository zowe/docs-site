# Zowe certificates questionnaire

Answering this [questionnaire](#certificates-configuration-questionnaire) will help you understand the certificates setup options and to select applicable [cetificates confguration scenario](certificate-configuration-scenarios.md) 
for your planned Zowe deployment.
:::info
Before answering the questionnaire you may want to make your self familiar with the certificate configuration basics and Zowe certificates configuration overview.
- [Certificates concepts](../appendix/zowe-security-glossary#certificate-concepts) explained in our [Zowe Security Glossary](../appendix/zowe-security-glossary).
- [Zowe certificates overview](../getting-started/zowe-certificates-overview).
:::

## Certificates configuration decision flow

Use this flow diagram to understand better the Zowe certificates configuration decision process.

![Certificates configuration decision tree](../images/install/config-certificates.png)

Review the diagram to understand the certificates configuration decision flow.
Answer the questions (the numbered yellow diamonds) to decide which path to follow in corresponding decision block.

A. If you have an existing certificate (see Question 1), you can import it to the planned key storage z/OS keyring or file based keystore/truststore.

:::note
Before importing your certificates, check the next questions to make sure that their format, type and properties correspond to the required protection and acceptability, according to the planned deployment environment (DEV, TEST, PROD).
For example, you should not use self-signed certificates for production environments.
:::
:::info
For more information, see [Import and configure an existing certificate](./import-certificates.md).
:::

B. If your existing certificates are self-signed (see Question 2) and your target environment is production (see Question 3), we strongly recommend that you acquire new certificates from your trusted CA.

C. Depending on your target environment type (see Question 3) - DEV/TEST or PROD, you can create your certificates (self-signed option) or acquire a new ones from a trusted CA.
   :::note
   If you plan for production deployment and need to acquire certificates from a trusted CA, follow the same rule to decide what type of certificate to request from the CA.
   :::

D. If you plan to use the same certificate for client and server usage (see Question 4), you need to generate your certificates with the EXTENDED USAGE attribute set to CLIENT and SERVER.
   :::note
   If you plan production deployment and need to acquire certificates from a trusted CA, follow the same rule to decide what values for the EXTENDED USAGE attribute values to request from the CA.
   :::
   :::info
   For more information, see [Generate a certificate if you do not have a certificate](./generate-certificates.md).
   :::

E. Decide if you want to store the certificate in a z/OS keyring.
   :::tip
   You may decide to store your certificates in a keystore/truststore pair, but you should prefer z/OS keyrings for production deployments.

F. Once you have the certificates created or acquired, import them to your certificate store - see Question 8.
   :::info
   For more information, see the [Import certificates article](./import-certificates.md).
   ::

Ready! Your certificate is now in the keystore and is ready for use.

Edit your Zowe configuration to reflect the options and settings selected preceding.

:::info
For more information, see [Use certificates](./use-certificates.md).
:::

## Certificates configuration questionnaire

Now when you understand the certificates configuration options, answer the following questions
to choose the best options for certificates type and properties according to your Zowe deployment plan:

A. Do you plan to use existing certificates?
   a. Yes, I already have certificates for my server/s.
   b. No, I don't have certificates for my server/s.
   
B. Are your certificates self-signed?
   ac. Yes, my existing certificates are self-signed.
   b. No, my existing certificates are signed by trusted CA.

C. What is your target environment?
   a. Production - Live production systems open for access from the internet/VPN.
   b. Test/Dev/Private (Learning, Experimenting).

D. Do you intend to use your certificates for server, for client, or for both?
   a. Server only (your service only accepts calls from TLS-secured clients).
   b. Client only (your service only performs calls to TLS-secured services).
   c. Server and client (your service accepts inbound connections and performs calls to other TLS-secured services).

E. What certificates storage type do you plan to use?
   a. I plan to use z/OS keyring.
   b. I plan to use keystore/truststore files pair.

## Additional information

You can find more information about the Zowe certificates configuration in these topics:
- [Configure Zowe Certificates](./configure-certificates).

## Next Step
Now that you understand your certificates configuration options, you can select a Zowe [certificate configuration scenario](certificate-configuration-scenarios.md).
:::tip
See the [Troubleshooting the certificate configuration](../troubleshoot/troubleshoot-zos-certificate.md), to find resolution of errors you encounter when configuring the Zowe certificates.
:::
