# Zowe certificates questionnaire

Answering the questions in this questionnaire will help to make your choice of certificates setup according to your planned Zowe deployment.

If you need to learn more about the certificates based security terminology, review the [certificates concepts](../appendix/zowe-security-glossary#certificate-concepts) in our Security Glossary.   

If you want to lean more about how Zowe uses digital certificates, visit the [Zowe Certificates Overview](../getting-started/zowe-certificates-overview).

Before you answer [the questions]() you could also review the [Certificate Configuration Scenarios](certificate-configuration-scenarios.md) to understand better the certificates configuration options. 

## Certificates configuration options

1. Certificates storage type.

You can instruct Zowe installation to store your certificates in a:
- File-based keystore/truststore pair
- IBM keyring

2. Certificate file format.

You need to acquire or generate certificates in the format accepted by the selected storage type.
Vice-versa, if you already have digital certificates for your servers, you'd need to select the appropriate storage type that can host them. 
The digital certificate types that can be used by Zowe are: 
- PKCS12
- JKS / JCEKS

3. Certificate signing

Every digital certificate must be signed by a public/private Certificate Authority(CA), or they can be self-signed. Recursively, the CA's signing certificates also must be signed, 
effectively building a trust chain, rooted by a trusted Root Certificate Authority (who's certificate is self-signed). The Root CA can be a public or a private one.     

When the certificates are signed by a public CA, their genuineness can be easily verified due to the transitive trust policy based on the signing certificates chain and the public availability of that certificates.   
When the CA is a private to the organization, the clients must explicitly request the CA certificate of the private Root CA and then import it to their trust stores in order to apply the transitive trust policy.   

Choose the type of certificate-signing:
- Self-signed
- Private CA
- Public CA

4. Client or Server validation

Certificates usage can be limited to a server, a client or both. This means that a certificate explicitly created for server usage, can't be used by a client application, and vice-versa a client certificate can't be used by a server component.
If needed to use the same certificate for both usage types, then it is necessary to either not limit the usage to one type or specify both types in the Extended Usage Attribute. Zowe requires to explicitly state the Client and Server usage in the Extended Usage Atribute of the certificates.

- Only Client validation
- Only Server validation
- Both, Client and Server validation

## Certificates configuration questionnaire

Now when you understand the certificates configuration options, answer the following questions
to choose the best options for certificates type and properties according to your Zowe deployment plan:

1. What is your target environment
   1. Production - Live production systems open for access from the internet/VPN
   2. Test (Services, Integrations, Set up, )
   3. Zowe Development (Enhance Zowe, Develop extensions, Develop services, ...)
   4. Private system (Learning, Experimenting)

2. Will your installation run on mainframe (z/OS, USS)?
   1. Yes, all Zowe server components will be hosted on the mainframe.
   2. No, all Zowe server components will be installed off-platform (z/OS).
   3. Hybrid approach - some Zowe server components will be installed on-platform and some will be installed off-platform. 

3. What certificates storage type you plan to use? 
   1. I plan to use z/OS keyring
   2. I plan to use keystore/truststore files pair

4. Was the certificate already imported to your keystore/truststore (regardless of the certificate format and storage type)
   1. Yes, my valid certificates were previously imported
   2. No, I need to import my new certificates

5. Do you intend to use your certificate for server, for client, or for both?
   1. Server only
   2. Client only
   3. Server and Client
   
## Certificates configuration decision flow
Review the diagram below to understand the certificates configuration decision flow.
Use the answers you provided in the questionnaire above to decide which path to follow in corresponding decision block (the yellow diamonds).

![Certificates configuration decision tree](../images/install/config-certificates.png)

1. If you have an existing certificate, you can import it to a key storage of type depending on the certificates format.

** Note: ** Before importing your certificates, check the next question to make sure that their format, type and properties correspond to the required protection and acceptability, according to the planned deployment environment (DEV, TEST, PROD).
For example, you should not use self-signed certificates for production environments.

For more information, see [Import and configure an existing certificate](./import-certificates.md).

2. If your existing certificates are self-signed (Q2) and your target environment is production (Q3), we strongly recommend that you acquire new certificates from your trusted CA.

3. If you do not have an existing certificate, you can create one (self-signed option) or acquire a new one from a trusted CA, depending on your target environment type (DEV/TEST or PROD).

4. If you plan to use z/OS keyring you'd need to generate JCEKS type of certificate. On contrary, if you prefer to store your certificates in a keystore/truststore pair, you'd need to generate PKCS12 type of certificate.

For more information, see [Generate a certificate if you do not have a certificate](./generate-certificates.md).s

** Note: ** If you plan for production deployment and need to acquire certificates from a trusted CA, follow the same rule to decide what type of certificate to request from the CA.

5. If you plan to use the same certificate for client and server usage - Q5 and Q6 (your service accepts inbound connections and performs calls to other TLS-secured services), you'd need to generate your certificates with the EXTENDED USAGE attribute set to CLIENT and SERVER.

** Note: ** If you plan production deployment and need to acquire certificates from a trusted CA, follow the same rule to decide what values for the EXTENDED USAGE attribute values to request from the CA.

6. Once you have the certificates created or acquired, import them to your certificate store - Q8.

For more information, see the [Import certificates article](./import-certificates.md).

7. When your certificate is already in the keystore, it is ready for use. Edit your Zowe configuration to reflect the options and settings selected above.

For more information, see [Use certificates](./use-certificates.md).

8. If you run into any error when configuring certificates, see the [Troubleshooting the certificate configuration](../troubleshoot/troubleshoot-zos-certificate.md).


## Next Steps
If yon need to learn more about the basics for configuring review certificates please review the [Configure Zowe Certificates](./configure-certificates) article
or visit the [Certificates Overview](../getting-started/zowe-certificates-overview) in the Getting Started documentation.
