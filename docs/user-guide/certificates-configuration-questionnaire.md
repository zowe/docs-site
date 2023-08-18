# Zowe certificates questionnaire

To properly configure Zowe to use certificates for server-side component installation, it is important to understand certificate setup options. 
Understanding these options makes it possible to select the best [certificate configuration scenario](./certificate-configuration-scenarios.md) that fits your Zowe deployment use case. 
To assist you in making this certificate scenario selection, it is useful to familiarize yourself with the Zowe certificate decision process, and answer the questions in the questionnaire at the end of this article.

**Tip:**
Before answering the questionnaire you may want to make your self familiar with the certificate configuration basics and Zowe certificates configuration overview.
- [Certificates concepts](../appendix/zowe-security-glossary#certificate-concepts) explained in our [Zowe Security Glossary](../appendix/zowe-security-glossary)
- [Zowe certificates overview](../getting-started/zowe-certificates-overview)

## Certificates configuration decision flow

Review the following flow diagram to improve your understanding of the Zowe certificates configuration decision process. 

**Note:**

![Certificates configuration decision tree](../images/install/certificates-config-scenarios.png)

The numerated decision blocks (the yellow diamonds) in the diagram correspond to the questions of the certificates configuration [questionnaire](#certificates-configuration-questionnaire).
The questions presented in the numbered decision blocks can help you decide which path best suits your certificate configuration use case.

**Question 1:** What is your target deployment environment?  
Depending on your target environment type (DEV/TEST or PROD), you can create your certificates (self-signed option), acquire a new ones from a trusted CA, or use existing certificates.

**Question 2:** Do you need to use certificate signed by the company's or by an external CA?  
If you plan to use self-signed certificates and your target environment is production, we strongly recommend that you acquire new certificates from your trusted CA.

**Question 3:** Do you plan to use a keyring?  
Decide if you want to store the certificate in a z/OS keyring or to a file based keystore/truststore.

**Tip:**  
While using a keystore/truststore pair is possible to store your certificates, we recommend that you use z/OS keyrings for production deployments.

**Question 4:** Do you plan to use an existing certificate from another keyring or from a dataset?  
If you have an existing certificate, you can import or connect this certificate to the planned z/OS keyring based storage.

Before importing your certificates, check to make sure that their format, type and properties correspond to the required protection and acceptability depending on the planned deployment environment (DEV, TEST, PROD).
For example, use self-signed certificates only with development or testing environments and not with production environments.

For more information, see [Import and configure an existing certificate](./import-certificates).

## Certificates configuration questionnaire

Now that you understand the certificates configuration decision flow, answer the following questions to choose the best scenario for certificates type, properties and storage according to your Zowe deployment plan:

**Question 1:** What is your target environment?
* Production / live production systems open for access from the internet/VPN  
  The following scenarios are applicable:
    * [certificates configuration scenario 3](certificate-configuration-scenarios#scenario-3-use-a-zos-keyring-based-keystore-with-zowe-generated-certificates)
    * [certificates configuration scenario 4](certificate-configuration-scenarios#scenario-4-use-a-zos-keyring-based-keystore-and-connect-to-an-existing-certificate)
    * [certificates configuration scenario 5](certificate-configuration-scenarios#scenario-5-use-a-zos-keyring-based-keystore-and-import-a-certificate-stored-in-a-data-set)
* Test/Dev/Private (Learning, Experimenting)  
  All [certificates configuration scenarios](certificate-configuration-scenarios) are applicable.

**Question 2:** Do you need to use certificate signed by the company's or by an external CA?
* No, my certificates can be self-signed.
  The following scenarios are applicable:
    * [certificates configuration scenario 1](certificate-configuration-scenarios#scenario-1-use-a-file-based-pkcs12-keystore-with-zowe-generated-certificates)
    * [certificates configuration scenario 3](certificate-configuration-scenarios#scenario-3-use-a-zos-keyring-based-keystore-with-zowe-generated-certificates)   
* Yes, my certificates are signed by trusted CA.
  The following scenarios are applicable:  
    * [certificates configuration scenario 2](certificate-configuration-scenarios#scenario-2-use-a-file-based-pkcs12-keystore-and-import-a-certificate-generated-by-another-ca)  
    * [certificates configuration scenario 4](certificate-configuration-scenarios#scenario-4-use-a-zos-keyring-based-keystore-and-connect-to-an-existing-certificate)  
    * [certificates configuration scenario 5](certificate-configuration-scenarios#scenario-5-use-a-zos-keyring-based-keystore-and-import-a-certificate-stored-in-a-data-set)

**Question 3:** What certificates storage type do you plan to use?
* I plan to use a z/OS keyring.  
  The following scenarios are applicable:
    * [certificates configuration scenario 3](certificate-configuration-scenarios#scenario-3-use-a-zos-keyring-based-keystore-with-zowe-generated-certificates)  
    * [certificates configuration scenario 4](certificate-configuration-scenarios#scenario-4-use-a-zos-keyring-based-keystore-and-connect-to-an-existing-certificate)  
    * [certificates configuration scenario 5](certificate-configuration-scenarios#scenario-5-use-a-zos-keyring-based-keystore-and-import-a-certificate-stored-in-a-data-set)
* I plan to use keystore/truststore files pair.  
  The following scenarios are applicable:
    * [certificates configuration scenario 1](certificate-configuration-scenarios#scenario-1-use-a-file-based-pkcs12-keystore-with-zowe-generated-certificates)  
    * [certificates configuration scenario 2](certificate-configuration-scenarios#scenario-2-use-a-file-based-pkcs12-keystore-and-import-a-certificate-generated-by-another-ca)

**Question 4:** Where is your existing certificate stored - in another keyring or a dataset?
* I want to use existing certificate connected to another z/OS keyring.  
  The following scenario is applicable:
    * [certificates configuration scenario 4](./certificate-configuration-scenarios#scenario-4-use-a-zos-keyring-based-keystore-and-connect-to-an-existing-certificate).
* I want to use existing certificate stored in a dataset.
  The following scenario is applicable:
    * [certificates configuration scenario 5](certificate-configuration-scenarios#scenario-5-use-a-zos-keyring-based-keystore-and-import-a-certificate-stored-in-a-data-set)

## Additional information

You can find more information about the Zowe certificates configuration in these topics:
- [Configure Zowe Certificates](./configure-certificates).

## Next Step
Now that you understand your certificates configuration options, you can select a Zowe [certificate configuration scenario](certificate-configuration-scenarios).

**Tip:**
See the [Troubleshooting the certificate configuration](../troubleshoot/troubleshoot-zos-certificate), to find resolution of errors you encounter when configuring the Zowe certificates.

