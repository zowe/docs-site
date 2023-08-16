# Zowe certificates questionnaire

To properly configure Zowe to use certificates for server-side component installation, it is important to understand certificate setup options. Understanding these options makes it possible to select the best [certificate configuration scenario](./certificate-configuration-scenarios.md) that fits your Zowe deployment use case. To assit you in making this certificate scenario selection, it is useful to familiarize yourself with the Zowe certificate decision process, and answer the questions in the following [questionnaire](#certificates-configuration-questionnaire).

**Tip:**
Before answering the questionnaire you may want to make your self familiar with the certificate configuration basics and Zowe certificates configuration overview.
- [Certificates concepts](../appendix/zowe-security-glossary#certificate-concepts) explained in our [Zowe Security Glossary](../appendix/zowe-security-glossary)
- [Zowe certificates overview](../getting-started/zowe-certificates-overview)


## Certificates configuration decision flow

Review the following flow diagram to improve your understanding of the Zowe certificates configuration decision process.

![Certificates configuration decision tree](../images/install/config-certificates.png)

Answer the questions presented in the numbered yellow diamonds and decide which path best suits your certificate configuration use case. 

**Note:**
The numerated decision blocks correspond to the questions of the certificates configuration questionnaire.


**Question 1:** Do you plan to use an existing certificate?  
If you have an existing certificate, you can import this certificate to the planned key storage z/OS keyring or file based keystore/truststore.

**Note:**
Before importing your certificates, check the following questions to make sure that their format, type and properties correspond to the required protection and acceptability depending on the planned deployment environment (DEV, TEST, PROD).
For example, use self-signed certificates only with development or testing environments and not with production environments.

For more information, see [Import and configure an existing certificate](./import-certificates).


**Question 2:** Is your certificate self-signed?  
If your existing certificates are self-signed and your target environment is production, we strongly recommend that you acquire new certificates from your trusted CA.

**Question 3:** What is your target deployment environment?  
Depending on your target environment type (DEV/TEST or PROD), you can create your certificates (self-signed option) or acquire a new ones from a trusted CA.

**Note:** If you plan a production deployment and need to acquire certificates from a trusted CA, follow the same rule to decide what type of certificate to request from the CA.

**Question 4:** Is your certificate only for SERVER usage?  
If you plan to use the same certificate for client and server usage, you need to generate your certificates with the EXTENDED USAGE attribute set to CLIENT and SERVER.

**Note:**  
If you plan a production deployment and need to acquire certificates from a trusted CA, follow the same rule to determine the EXTENDED USAGE attribute values to request from the CA.

For more information, see [Generate a certificate if you do not have a certificate](./generate-certificates).
:::

**Question 5:** Is your certificate already imported to a keystore/truststore or keyring?  
If your certificates are not yet imported, determine where to import them.

For more information, see the [Import certificates article](./import-certificates).

**Question 6:** Do you plan to use a keyring?  
Decide if you want to store the certificate in a z/OS keyring or to a file based keystore/truststore.

**Tip:**  
While using a keystore/truststore pair is possible to store your certificates, we recommend that you use z/OS keyrings for production deployments.

## Certificates configuration questionnaire

Now that you understand the certificates configuration options, answer the following questions
to choose the best options for certificates type and properties according to your Zowe deployment plan:

**Question 1:** Do you plan to use existing certificates?
   * Yes, I already have certificates for my server/s.  
   See [certificates configuration scenario 4](./certificate-configuration-scenarios#scenario-4-use-a-zos-keyring-based-keystore-and-connect-to-an-existing-certificate).
   * No, I do not have certificates for my server/s. See the following possible scenarios:
      * [certificates configuration scenario 1](./certificate-configuration-scenarios#scenario-1-use-a-file-based-pkcs12-keystore-with-zowe-generated-certificates)
      * [certificates configuration scenario 3](certificate-configuration-scenarios#scenario-3-use-a-zos-keyring-based-keystore-with-zowe-generated-certificates)
      * [certificates configuration scenario 5](certificate-configuration-scenarios#scenario-5-use-a-zos-keyring-based-keystore-and-import-a-certificate-stored-in-a-data-set)

**Question 2:** Are your certificates self-signed?
   * Yes, my existing certificates are self-signed. See the following possible sceanarios:
      * [certificates configuration scenario 1](certificate-configuration-scenarios#scenario-1-use-a-file-based-pkcs12-keystore-with-zowe-generated-certificates)
      * [certificates configuration scenario 3](certificate-configuration-scenarios#scenario-3-use-a-zos-keyring-based-keystore-with-zowe-generated-certificates)   
   * No, my existing certificates are signed by trusted CA. See the following possible sceanarios:  
      * [certificates configuration scenario 2](certificate-configuration-scenarios#scenario-2-use-a-file-based-pkcs12-keystore-and-import-a-certificate-generated-by-another-ca)  
      * [certificates configuration scenario 4](certificate-configuration-scenarios#scenario-4-use-a-zos-keyring-based-keystore-and-connect-to-an-existing-certificate)  
      * [certificates configuration scenario 5](certificate-configuration-scenarios#scenario-5-use-a-zos-keyring-based-keystore-and-import-a-certificate-stored-in-a-data-set)

**Question 3:** What is your target environment?
   * Production / live production systems open for access from the internet/VPN  
   See the following possible scenarios:  
      * [certificates configuration scenario2](certificate-configuration-scenarios#scenario-2-use-a-file-based-pkcs12-keystore-and-import-a-certificate-generated-by-another-ca)  
      * [certificates configuration scenario 4](certificate-configuration-scenarios#scenario-4-use-a-zos-keyring-based-keystore-and-connect-to-an-existing-certificate)  
      * [certificates configuration scenario 5](certificate-configuration-scenarios#scenario-5-use-a-zos-keyring-based-keystore-and-import-a-certificate-stored-in-a-data-set)
   * Test/Dev/Private (Learning, Experimenting)  
   See the following possible scenarios:  
      * [certificates configuration scenario 1](certificate-configuration-scenarios#scenario-1-use-a-file-based-pkcs12-keystore-with-zowe-generated-certificates)  
      * [certificates configuration scenario 3](certificate-configuration-scenarios#scenario-3-use-a-zos-keyring-based-keystore-with-zowe-generated-certificates)

**Question 4:** Do you intend to use your certificates for server, for client, or for both?
   * Server only (your service only accepts calls from TLS-secured clients).
   * Client only (your service only performs calls to TLS-secured services).
   * Server and client (your service accepts inbound connections and performs calls to other TLS-secured services).

**Question 5:** What certificates storage type do you plan to use?
   * I plan to use a z/OS keyring.  
   See the following possible scenarios:
      * [certificates configuration scenario 3](certificate-configuration-scenarios#scenario-3-use-a-zos-keyring-based-keystore-with-zowe-generated-certificates)  
      * [certificates configuration scenario 4](certificate-configuration-scenarios#scenario-4-use-a-zos-keyring-based-keystore-and-connect-to-an-existing-certificate)  
      * [certificates configuration scenario 5](certificate-configuration-scenarios#scenario-5-use-a-zos-keyring-based-keystore-and-import-a-certificate-stored-in-a-data-set)
   *  I plan to use keystore/truststore files pair.  
   See the following possible scenarios:
      * [certificates configuration scenario 1](certificate-configuration-scenarios#scenario-1-use-a-file-based-pkcs12-keystore-with-zowe-generated-certificates)  
      * [certificates configuration scenario 2](certificate-configuration-scenarios#scenario-2-use-a-file-based-pkcs12-keystore-and-import-a-certificate-generated-by-another-ca)

## Additional information

You can find more information about the Zowe certificates configuration in these topics:
- [Configure Zowe Certificates](./configure-certificates).

## Next Step
Now that you understand your certificates configuration options, you can select a Zowe [certificate configuration scenario](certificate-configuration-scenarios).

**Tip:**
See the [Troubleshooting the certificate configuration](../troubleshoot/troubleshoot-zos-certificate), to find resolution of errors you encounter when configuring the Zowe certificates.

