# Zowe secure setup and configuration

Learn how to install and configure Zowe securely before you deploy Zowe in production. 

A production instance of Zowe needs to run in a High Availability setup to achieve the necessary availability. The certificates used within the network communication to validate the servers should be stored in Keyrings to get the most out of the platform’s security. The network should be secured using TLS in version 1.3 to limit future risk. 

Here is a list of all the security considerations and configurations needed. 

- TLS 1.2 or 1.3
   - Keyrings
- Authentication methods 
  - JWT Tokens
  - Client Certificates
  - Personal Access Tokens
  - SAF IDT Tokens
- Multi Factor Authentication
  - CA AAM
- Authorization
  - SAF
- High Availability
  - Caching Service Setup
- Observation
  - Audit Log 
    - Integrate data in your observability solution
- Distributed Identity Federation
  - Okta
  - KeyCloak

## Transport Layer Security(TLS)

- TLS v1.3 requirements:
  - Java 8 sr6 fp25
  - Cipher suites: TLS_AES_128_GCM_SHA256, TLS_AES_256_GCM_SHA384, TLS_CHACHA_POLY1305_SHA256
- SAF Keyring
  - more secure than PKCS12 files
  - Import existing or generate new with Top Secret, ACF2 and RACF 

## Authentication Methods

### JSON Web Tokens(JWT)

- SSO usage:
  - Cookies: apimlAuthenticationToken
  - Authorization: Bearer
- Validation:
  - Gateway query endpoint
  - Using JWKS 
- Issuers: 
  - API ML - SAF, zOSMF LTPA
  - zOSMF - zOSMF JWT

Encoded JWT:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### Client certificates

- Provided by client during TLS handshake
- x.509 standard
- Requirements:
  - CA must be trusted by Zowe
  - EKU needs to contain client auth
  - Connected to mainframe identity

### Personal access token

- Alternative to client certificate authentication.
- Disbaled by default
- Benefits:
  - Long lived - up to 90 days.
  - Scoped - valid for specified services only.
  - Token’s life cycle manageable by administrator.

### SAF IDT Tokens

- Signed JWT format
- Consumed by southbound services
- Hidden from clients
- Issued for APPLID and valid up to 24 hours.
- Validation:
  - API ML REST endpoint
  - RACROUTE REQUEST=VERIFY

## Multi Factor Authentication

CA AAM

**Prerequisites** 

z/OSMF APAR https://www.ibm.com/support/pages/apar/PH39582 needs to be applied

**Reason**
Add dynamic element to the authentication

**Limitations**
- Next token mode isn’t supported
  - There is workaround using TN3270
- New PIN Mode isn’t supported
