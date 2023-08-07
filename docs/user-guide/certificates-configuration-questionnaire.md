# Zowe certificates questionnaire

Answering the questions in this questionnaire will help to narrow the choices of certificates setup according to your planned Zowe deployment.

If you need to learn more about the certificates based security terminology, review the [certificates concepts](../appendix/zowe-security-glossary#certificate-concepts) in our Security Glossary.   

If you want to lean more about how Zowe uses digital certificates, visit the [Zowe Certificates Overview](../getting-started/zowe-certificates-overview).

Before you answer the questions you could also review the [Certificate Configuration Scenarios](certificate-configuration-scenarios.md) to understand better the certificates configuration options. 

## Certificates configuration options

### Certificates storage type
You can instruct Zowe installation to store your certificates in a:
- File-based keystore/truststore pair
- IBM keyring



### Certificate file format
You need to acquire or generate certificates in the format accepted by the selected storage type.
Vice-versa, if you already have digital certificates for your servers, you'd need to select the appropriate storage type that can host them. 
The digital certificate types that can be used by Zowe are: 
- PKCS12
- JKS / JCEKS

### Certificate signing
Every digital certificate must be signed by a public/private Certificate Authority(CA), or they can be self-signed. Recursively, the CA's signing certificates also must be signed, 
effectively building a trust chain, rooted by a trusted Root Certificate Authority (who's certificate is self-signed). The Root CA can be a public or a private one.     

When the certificates are signed by a public CA, their genuineness can be easily verified due to the transitive trust policy based on the signing certificates chain and the public availability of that certificates.   
When the CA is a private to the organization, the clients must explicitly request the CA certificate of the private Root CA and then import it to their trust stores in order to apply the transitive trust policy.   

Choose the type of certificate-signing:
- Self-signed
- Private CA
- Public CA

### Client or Server validation
Certificates usage can be limited to a server, a client or both. This means that a certificate explicitly created for server usage, can't be used by a client application, and vice-versa a client certificate can't be used by a server component.
If needed to use the same certificate for both usage types, then it is necessary to either not limit the usage to one type or specify both types in the Extended Usage Attribute. Zowe requires to explicitly state the Client and Server usage in the Extended Usage Atribute of the certificates.

- Only Client validation
- Only Server validation
- Both, Client and Server validation


Based on the above options, answer the following questions to choose the best options for certificates format and storage according to your Zowe deployment plan.  

## Q1: What is your target environment
- A1: Production - Live production systems open for access from the internet/VPN

- A2: Test (Services, Integrations, Set up, ) -

- A3: Zowe Development (Enhance Zowe, Develop extensions, Develop services, ...)

- A4: Private system (Learning, Experimenting)

## Q2: Will your installation run on mainframe (z/OS, USS)?
- A1: Yes, all Zowe server components will be hosted on the mainframe.


- A2: No, all Zowe server components will be installed off-platform (z/OS).


- A3: Hybrid approach - some Zowe server components will be installed on-platform and some will be installed off-platform. 

## Q3: 

## Q4:  Was the certificate already imported to your kaystore/truststore (regardless of the certificate format and storage type)
- Yes, my valid certificates were previously imported

- No, I need to import mys new certificates

## Next Steps
Based on your answer and choice of (Certificates Configuration Scenario](certificate-configuration-scenarios) you can review the following related articles.

If yon need to learn more about the basics for configuring review certificates please review the [Configure Zowe Certificates](./configure-certificates) article
or visit the [Certificates Overview](../getting-started/zowe-certificates-overview) in the Getting Started documentation.
