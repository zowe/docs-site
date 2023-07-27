# Zowe certificates questionnaire

## Certificates configuration options

### Keystore/Truststore storage 
#### File-based
#### IBM keyring

### Certificate file format
#### PKCS12
#### JKS / JCEKS

### Certificate signing
#### Self-signed
#### Private CA
### Public CA

### Client or Server validation
#### Only Client validation
#### Only Server validation
#### Both, Client and Server validation


Based on the above choices  of the previous questions 


Answer the following questions to choose the best option for certificates types and storage according to your Zowe deployment plan.  

## Q1: Will your installation run on mainframe (z/OS, USS)?
- A1: Yes, all Zowe server components will be hosted on the mainframe.
- A2: No, all Zowe server components will be installed off-platform (z/OS).
- A3: Hybrid approach - some Zowe server components will be installed on-platform and some will be installed off-platform. 

## Q2: What is your target environment
- A1: Production - Live production systems open for access from the internet/VPN 
- A2: Test (Services, Integrations, Set up, ) - 
- A3: Zowe Development (Enhance Zowe, Develop extensions, Develop services, ...)
- A4: Private system (Learning, Experimenting)

## Q3: 

## Q4:  Was the certificate already imported to your kaystore/truststore (regardless of the certificate format and storage type)
- Yes, my valid certificates were previously imported
- No, I need to import mys new certificates
