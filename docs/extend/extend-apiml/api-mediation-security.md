# Zowe API Mediation Layer Security

- [How API ML transport security works](#how-api-ml-transport-security-works)
  - [Transport layer security](#transport-layer-security)
  - [Authentication](#authentication)
  - [Zowe API ML services](#zowe-api-ml-services)
  - [Zowe API ML TLS requirements](#zowe-api-ml-tls-requirements)
  - [Authentication for API ML services](#authentication-for-api-ml-services)
    - [Authentication endpoints](#authentication-endpoints)
    - [Authentication providers](#authentication-providers)
      - [z/OSMF Authentication Provider](#z-osmf-authentication-provider)
      - [Dummy Authentication Provider](#dummy-authentication-provider)
  - [Authorization](#authorization)
  - [JWT Token](#jwt-token)
  - [API ML truststore and keystore](#api-ml-truststore-and-keystore)
  - [Authentication to the Discovery Service](#authentication-to-the-discovery-service)
  - [Setting Ciphers for API ML Services](#setting-ciphers-for-api-ml-services)
- [Certificate management in Zowe API Mediation Layer](#certificate-management-in-zowe-api-mediation-layer)
  - [Running on localhost](#running-on-localhost)
    - [How to start API ML on localhost with full HTTPS](#how-to-start-api-ml-on-localhost-with-full-https)
    - [Certificate management script](#certificate-management-script)
    - [Generate certificates for localhost](#generate-certificates-for-localhost)
    - [Generate a certificate for a new service on localhost](#generate-a-certificate-for-a-new-service-on-localhost)
    - [Add a service with an existing certificate to API ML on localhost](#add-a-service-with-an-existing-certificate-to-api-ml-on-localhost)
    - [Log in to Discovery Service on localhost](#log-in-to-discovery-service-on-localhost)
  - [Zowe runtime on z/OS](#zowe-runtime-on-z-os)
    - [Certificates for z/OS installation from the Zowe PAX file](#certificates-for-z-os-installation-from-the-zowe-pax-file)
    - [Import the local CA certificate to your browser](#import-the-local-ca-certificate-to-your-browser)
    - [Generate a keystore and truststore for a new service on z/OS](#generate-a-keystore-and-truststore-for-a-new-service-on-z-os)
    - [Add a service with an existing certificate to API ML on z/OS](#add-a-service-with-an-existing-certificate-to-api-ml-on-z-os)
      - [Procedure if the service is not trusted](#procedure-if-the-service-is-not-trusted)
    - [Trust a z/OSMF certificate](#trust-a-z-osmf-certificate)
    - [Disable certificate validation](#disable-certificate-validation)  
- [Security Service Client library](#security-service-client-library)
    - [@EnableApimlAuth annotation](#@enableApimlAuth-annotation)
    - [Gateway lookup logic](#gateway-lookup-logic)
    - [Useful classes](#useful-classes)

## How API ML transport security works

Security within the API Mediaiton Layer (API ML) is performed on several levels. This article describes how API ML uses Transport Layer Security (TLS). As a system administrator or API developer, use this guide to familiarize yourself with the following security concepts:  

### Transport layer security

Secure data during data-transport by using the TLS protocol for all connections to API Mediation Layer services. While it is possible to disable the TLS protocol for debugging purposes or other use-cases, the enabled TLS protocol is the default mode.

### Authentication

Authentication is the method of how an entity, whether it be a user (API Client) or an application (API Service), proves its true identity.  

API ML uses the following authentication methods:

- **User ID and password** 
    - The user ID and password are used to retrieve authentication tokens. 
    - Requests originate from a user.
    - The user ID and password are validated by a z/OS security manager and
    a token is issued that is then used to access the API service.
    
- **TLS client certificates**
    - Certificates are for service-only requests.

### Zowe API ML services

The following range of service types apply to the Zowe API ML:

- **Zowe API ML services**

  - **Gateway Service (GW)**
    The Gateway is the access point for API clients that require access to API services. 
    API services can be accessed through the Gateway by API Clients. The Gateway receives information about an API Service 
    from the Discovery Service.
        
  - **Discovery Service (DS)**
    The Discovery Service collects information about API services and provides this information to the Gateway 
    and other services. API ML internal services are also registered to the Discovery Service.
        
  - **API Catalog (AC)**
    The Catalog displays information about API services through a web UI. The Catalog receives information
    about an API service from the Discovery Service.

- **Authentication and Authorization Service (AAS)** 

  AAS provides authentication and authorization functionality to check user access to resources on z/OS. 
  The API ML uses z/OSMF API for  authentication. For more information, see: [APIML wiki](https://github.com/zowe/api-layer/wiki/Zowe-Authentication-and-Authorization-Service)

- **API Clients**

  External applications, users, or other API services that are accessing API services via the API Gateway
  
- **API Services** 

  Applications that are accessed through the API Gateway. API services register themselves to the 
  Discovery Service and can access other services through the Gateway. If an API service is installed 
  in such a way that direct access is possible, API services can access other services without the Gateway. 
  When APIs access other services, they can also function as API clients.

### Zowe API ML TLS requirements

The API ML TLS requires servers to provide HTTPS ports. Each of the API ML services has the following specific requirements:

- **API Client**
    - The API Client is not a server
    - Requires trust of the API Gateway
    - Has a truststore that contains certificates required to trust the Gateway

- **Gateway Service**
    - Provides an HTTPS port
    - Has a keystore with a server certificate
        - The certificate needs to be trusted by API Clients
        - This certificate should be trusted by web browsers because the API Gateway can be used to display web UIs
    - Has a truststore that contains certificates needed to trust API Services

- **API Catalog**
    - Provides an HTTPS port
    - Has a keystore with a server certificate
        - The certificate needs to be trusted by the API Gateway
        - This certificate does not need to be trusted by anyone else

- **Discovery Service**
    - Provides an HTTPS port
    - Has a keystore with a server certificate
        - The certificate needs to be trusted by API Clients
    - Has a truststore that contains certificates needed to trust API services

- **API Service**
    - Provides an HTTPS port
    - Has a keystore with a server and client certificate
        - The server certificate needs to be trusted by the Gateway
        - The client certificate needs to be trusted by the Discovery Service
        - The client and server certificates can be the same
        - These certificates do not need to be trusted by anyone else
    - Has a truststore that contains one or more certificates that are required to trust the Gateway and Discovery Service
  

### Authentication for API ML services

- **API Gateway**

    - API Gateway handles authentication. 
    - There are two authentication endpoints that allow to authenticate the resource by providers
    - Diagnostic endpoints `/application/**` in API Gateway are protected by basic authentication or Zowe JWT token.

- **API Catalog**

    - API Catalog is accessed by users and requires protection by a login
    - Protected access is performed by the Authentication and Authorization Service 

- **Discovery Service**

    - Discovery Service is accessed by API Services
    - This access (reading information and registration) requires protection needs by a client certificate
    - (Optional) Access can be granted to users (administrators) 
    - Diagnostic endpoints `/application/**` in Discovery Service are protected by basic authentication or Zowe JWT token.

- **API Services**

    - Authentication is service-dependent
    - Recommended to use the Authentication and Authorization Service for authentication


#### Authentication endpoints

The API Gateway contains two REST API authentication endpoints: `auth/login` and `auth/query`.

The `/login` endpoint allows to authenticate mainframe user credentials and returns an authentication token. The login request requires the user credentials in one of the following formats:
  * Basic access authentication
  * JSON with user credentials 

1. When successfully authenticated, the response to the request is an empty body and a token in a secure `HttpOnly` cookie named `apimlAuthenticationToken`. 
2.  When authentication failed, a user gets 401 status code.

The `/query` endpoint allows to validate the token and retrieves the information associated with the token.
The query request requires the token in one of the following formats: 
  * Cookie named `apimlAuthenticationToken`
  * Bearer authentication  
  
1. When successfully authenticated, the response to the request is a JSON object, which contains information associated with the token
2. When authentication failed, a user gets 401 status code. 

#### Authentication providers

API ML contains the following providers to handle authentication for the API Gateway:
* `z/OSMF Authentication Provider`
* `Dummy Authentication Provider`

##### z/OSMF Authentication Provider 

The `z/OSMF Authentication Provider` allows API Gateway to authenticate with the z/OSMF service. The user needs z/OSMF access in order to authenticate.

Use the following properties of API Gateway to enable the `z/OSMF Authentication Provider`:
```
apiml.security.auth.provider: zosmf
apiml.security.auth.zosmfServiceId: zosmf  # Replace me with the correct z/OSMF service id
```

##### Dummy Authentication Provider

The `Dummy Authentication Provider` implements simple authentication for development purpose using dummy credentials (username:  `user`, password `user`). The `Dummy Authentication Provider` allows API Gateway to run without authenticating with the z/OSMF service.

Use the following property of API Gateway to enable the `Dummy Authentication Provider`:
```
apiml.security.auth.provider: dummy
```

### Authorization

Authorization is a method used to determine access rights of an entity.

In the API ML, authorization is performed by the z/OS security manager ([CA ACF2](https://www.ca.com/us/products/ca-acf2.html), [IBM RACF](https://www.ibm.com/support/knowledgecenter/zosbasics/com.ibm.zos.zsecurity/zsecc_042.htm), [CA Top Secret](https://www.ca.com/us/products/ca-top-secret.html)). An authentication token is used as proof of valid authentication. The authorization checks, however, are always performed by the z/OS security manager.

### JWT Token

The JWT Secret that signs the JWT Token is an asymmetric private key that is generated during installation. You can find the JWT Secret, alias "jwtsecret", in the  PKCS12 keystore /keystore/localhost/localhost.keystore.p12. The public key necessary to read the JWT Secret is called from the keystore. For easy access, you can find the public key in the `localhost.keystore.jwtsecret.cer` directory. The JWT token is signed with the RS256 signature algorithm. 

### API ML truststore and keystore

A _keystore_ is a repository of security certificates consisting of either authorization certificates or public key certificates with corresponding private keys (PK), used in TLS encryption. A _keystore_ can be stored in Java specific format (JKS) or use the standard format (PKCS12). The Zowe API ML uses PKCS12 to enable the keystores to be used
by other technologies used in Zowe (Node.js).

**The API ML local certificate authority (CA)**

- The API ML local CA contains a local CA certificate and a private key that needs to be securely stored
- Used to sign certificates of services
- The API ML local CA certificate is trusted by API services and clients

**The API ML keystore**

- Server certificate of the Gateway (with PK). This can be signed by the local CA or an external CA
- Server certificate of the Discovery Service (with PK). This can be signed by the local CA
- Server certificate of the Catalog (with PK). This can be signed by the local CA
- Private asymmetric key for the JWT token, alias `jwtsecret`. The  public key is exported to the `localhost.keystore.jwtsecret.cer` directory. 
- The API ML keystore is used by API ML services

**The API ML truststore**

- The API ML truststore contains a local CA public certificate
- Contains an external CA public certificate (optional)
- Can contain self-signed certificates of API Services that are not signed by the local or external CA
- Used by API ML services

**Zowe core services**

- Services can use the same keystore and truststore as APIML for simpler installation and management
- Alternatively, services can have individual stores for higher security

**API service keystore** (for each service)

- Contains a server and client certificate signed by the local CA
  
**API service truststore** (for each service)  

- (Optional) Contains a local CA and external CA certificates 

**Client certificates**

- A client certificate is a certificate that is used for validation of the HTTPS client. The client certificate of a Discovery Service client can be the same certificate as the server certificate of the services which the Discovery Service client uses.

### Authentication to the Discovery Service

The Discovery Service has the following types of users that require authentication:

- **Administrators and developers who need to log in to the homepage of the Discovery Service**
  
    - HTTP mode: the access is protected by basic Eureka authentication.
    
    - HTTPS mode: the access is protected by mainframe credentials (basic or token) or x509 certificate.
    The `application/**` endpoint is protected by mainframe credentials (basic or token) and the `discovery/**` endpoint is protected by mainframe credentials (basic or token) or x509 certificate.
    The `eureka/**` endpoint is protected by the x509 certificate.
    The certificate is stored in the `keystore/localhost/localhost.keystore.p12` keystore.
    Some utilities including HTTPie require the certificate to be in PEM format. You can find it in `keystore/localhost/localhost.pem`.
    Since the Discovery Service is using HTTPS, your client also requires verification of the validity of its certificate. Verification is performed by trusting the local CA certificate which is store at `keystore/local_ca/localca.cer`.
    The following is an example of how to access Discovery Service from CLI with full certificate validation:
    `http --cert=keystore/localhost/localhost.pem --verify=keystore/local_ca/localca.cer -j GET https://localhost:10011/eureka/apps/`

    
   The `application/health` and `application/info` endpoints do not require authentication in both mode.
    
- **Services that need to register to the Discovery Service**

    These services are not users that have a user ID and password but are other services. They authenticate using client certificate. The client certificate is the same TLS certificate that the service uses for HTTPS communication. 

**Note:** API Gateway needs first to be registered to the Discovery Service in order provide authentication using mainframe credentials.

### Setting ciphers for API ML services

You can override ciphers that are used by the HTTPS servers in API ML services by configuring properties of the gateway, discovery service, and API catalog.

**Note:** You do not need to rebuild JAR files when you override the default values in shell scirpts.

The *application.yml* file contains the default value for each service, and can be found [here](https://github.com/zowe/api-layer/blob/master/gateway-service/src/main/resources/application.yml). The default configuration is packed in .jar files. On z/OS, you can override the default configuration in `$ZOWE_ROOT_DIR/api-mediation/scripts/api-mediation-start-*.sh`, where `*` expands to `gateway`, `catalog`, and `discovery`.
Add the launch parameter of the shell script to set a cipher:

```
-Dapiml.security.ciphers=<cipher-list>
```

On localhost, you can override the default configuration in [config/local/gateway-service.yml](https://github.com/zowe/api-layer/blob/master/config/local/gateway-service.yml) (including other YAML files for development purposes).

The following list shows default ciphers. The API ML services use the following cipher order:

**Note:** Ensure that the version of Java you use is compatible with the default cipherset.

```
   TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,
   TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,
   TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256,
   TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384
```

Only IANA ciphers names are supported. For more information, see [Cipher Suites](https://wiki.mozilla.org/Security/Server_Side_TLS#Cipher_suites) or [List of Ciphers](https://testssl.net/openssl-iana.mapping.html).

## Certificate management in Zowe API Mediation Layer

### Running on localhost

#### How to start API ML on localhost with full HTTPS

The https://github.com/zowe/api-layer repository already contains pre-generated certificates that can be used to start API ML with HTTPS on your computer. The certificates are not trusted by your browser so you can either ignore the security warning or generate your own certificates and add them to the truststore of your browser or system.

The certificates are described in more detail in the https://github.com/zowe/api-layer/blob/master/keystore/README.md.


#### Certificate management script

Zowe API Mediation Layer provides a script that can used on Windows, Mac, Linux, and z/OS
to generate a certificate and keystore for the local CA, API Mediation Layer, and services.

This script is stored in [scripts/apiml_cm.sh](https://github.com/zowe/api-layer/blob/master/scripts/apiml_cm.sh).
It is a UNIX shell script that can be executed by Bash or z/OS Shell. For Windows, install Bash by going to the following link: [cmder](http://cmder.net/).


#### Generate certificates for localhost

Use the following script in the root of the `api-layer` repository to generate certificates for localhost:

`scripts/apiml_cm.sh --action setup`

This script creates the certificates and keystore for the API Mediation Layer in your current workspace.


#### Generate a certificate for a new service on localhost

To generate a certificate for a new service on localhost, see
https://github.com/zowe/api-layer/blob/master/keystore/README.md#generating-certificate-for-a-new-service-on-localhost


#### Add a service with an existing certificate to API ML on localhost

The instructions are described at:
https://github.com/zowe/api-layer/blob/master/keystore/README.md#trust-certificates-of-other-services


#### Log in to Discovery Service on localhost

To access Discovery Service on localhost provide valid mainframe credentials or token.

### Zowe runtime on z/OS

#### Certificates for z/OS installation from the Zowe PAX file

Certificates for the API ML local CA and API ML service are automatically generated by installing the Zowe runtime on z/OS from the PAX file. Following the instructions in [Installing the Zowe runtime on z/OS](https://zowe.github.io/docs-site/latest/user-guide/install-zos.html) 

These certificates are generated by the certificate management script `apiml_cm.sh` that is installed to `$ZOWE_ROOT_DIR/api-mediation/scripts/apiml_cm.sh`.    

`$ZOWE_ROOT_DIR` is the directory where you installed the Zowe runtime.

The certificates are generated to the directory `$ZOWE_ROOT_DIR/api-mediation/keystore`.

API ML keystore and truststore:

  * `$ZOWE_ROOT_DIR/api-mediation/keystore/local/localhost.keystore.p12` 
    - used for the HTTPS servers
    - contains the APIML server certificate signed by the local CA and private key for the server
    
  * `$ZOWE_ROOT_DIR/api-mediation/keystore/local/localhost.truststore.p12` 
    - use to validate trust when communicating with the services that are registered to the APIML
    - contains the root certificate of the local CA (not the server certificate)
    - contains the local CA public certificate
    - can contain additional certificate to trust services that are not signed by local CA

API ML keystores and truststores needs be accessible by the user ID that executes the Zowe runtime.

Local CA:

  * `$ZOWE_ROOT_DIR/api-mediation/keystoree/local_ca/localca.cer`
    - public certificate of local CA
  
  * `$ZOWE_ROOT_DIR/api-mediation/keystore/local_ca/localca.keystore.p12`
    - private key of the local CA 

The local CA keystore is only accessible by the user that is installs and manages the Zowe runtime. 


#### Import the local CA certificate to your browser

Trust in the API ML server is a necessary precondition to properly encrypt traffic between web browsers and REST API client applications. Ensure this trust through the installation of a Certificate Authority (CA) public certificate. By default, API ML creates a local CA. Import the CA public certificate to the truststore for REST API clients and to your browser. You can also import the certificate to your root certificate store.

**Note:** The public certificate in the [PEM format](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) is stored at `$ZOWE_ROOT_DIR/api-mediation/keystore/local_ca/localca.cer` where `$ZOWE_ROOT_DIR`  is the directory that was used for the Zowe runtime during installation.

The certificate is stored in UTF-8 encoding so you need to transfer it as a binary file. Since this is the certificate that your browser is going to trust, it is recommended to use a secure connection for transfer.

**Follow these steps:**

1. Download the local CA certificate to your computer. Use one of the following methods to download the local CA certificate to your computer:

    - **Use [Zowe CLI](https://github.com/zowe/zowe-cli#zowe-cli--) (Recommended)**
    Issue teh following command:

    `zowe zos-files download uss-file --binary $ZOWE_ROOT_DIR/api-mediation/keystore/local_ca/localca.cer`

    - **Use `sftp`**
    Issue the following command:

    ```
    sftp <system>
    get $ZOWE_ROOT_DIR/api-mediation/keystore/local_ca/localca.cer
    ```

    To verify that the file has been transferred correctly, open the file. The following heading and closing shoulf appear: 
   
    ```
    -----BEGIN CERTIFICATE-----
    ...
    -----END CERTIFICATE-----
    ```

2. Import the certificate to your root certificate store and trust it. 

    - **For Windows**
    Run the following command:

    `certutil -enterprise -f -v -AddStore "Root" localca.cer` 
    
    **Note:** Ensure that you open the terminal as **administrator**. This will install the certificate to the Trusted Root Certification Authorities. 

    - **For macOS** 
    Run the following command: 

    `$ sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain localca.cer` 

    - **For Firefox**
    You can manually import your root certificate via the Firefox settings, or force Firefox to use the Windows truststore:
    
    **Note:** Firefox uses its own certificate truststore. 
    
    Create a new Javascript file firefox-windows-truststore.js at `C:\Program Files (x86)\Mozilla Firefox\defaults\pref` with the following content:

    ```
    /* Enable experimental Windows truststore support */
    pref("security.enterprise_roots.enabled", true);
    ```

#### Generate a keystore and truststore for a new service on z/OS

You can generate a keystore and truststore for a new service by calling the `apiml_cm.sh` script in the directory with API Mediation Layer:

```
cd $ZOWE_ROOT_DIR/api-mediation
scripts/apiml_cm.sh --action new-service --service-alias <alias> --service-ext <ext> \
--service-keystore <keystore_path> --service-truststore <truststore_path> \
--service-dname <dname> --service-password <password> --service-validity <days> \
--local-ca-filename $ZOWE_ROOT_DIR/api-mediation/keystore/local_ca/localca 
 ```

The `service-alias` is an unique string to identify the key entry. All keystore entries (key and trusted certificate entries) are accessed via unique aliases. Since the keystore will have only one certificate, you can omit this parameter and use the default value `localhost`.

The `service-keystore` is a repository of security certificates plus corresponding private keys. The `<keystore_path>` is the path excluding the extension to the keystore that will be generated. It can be an absolute path or a path relative to the current working directory. The key store is generated in PKCS12 format with `.p12` extension. It should be path in an existing directory where your service expects the keystore. For example: `/opt/myservice/keystore/service.keystore`.

The `service-truststore` contains certificates from other parties that you expect to communicate with, or from Certificate Authorities that you trust to identify other parties. The `<truststore_path>` is the path excluding the extension to the trust store that will be generated. It can be an absolute path or a path relative to the current working directory. The truststore is generated in PKCS12 format.

The `service-ext` specifies the X.509 extension that should be the Subject Alternate Name (SAN). The SAN has contain host names that are used to access the service. You need specify the same hostname that is used by the service during API Mediation Layer registration. For example:

`"SAN=dns:localhost.localdomain,dns:localhost,ip:127.0.0.1"`

**Note:** For more information about SAN, see *SAN or SubjectAlternativeName* at [Java Keytool - Common Options](https://www.ibm.com/support/knowledgecenter/en/SSYKE2_8.0.0/com.ibm.java.security.component.80.doc/security-component/keytoolDocs/commonoptions.html).

The `service-dname` is the X.509 Distinguished Name and is used to identify entities, such as those which are named by the subject and issuer (signer) fields of X.509 certificates. For example:

`"CN=Zowe Service, OU=API Mediation Layer, O=Zowe Sample, L=Prague, S=Prague, C=CZ"`


The `service-validity` is the number of days after that the certificate will expire.

The `service-password` is the keystore password. The purpose of the password is the integrity check. The access protection for the keystore and keystore need to be achieved by making them accessible only by the ZOVESVR user ID and the system administrator.

The `local-ca-filename` is the path to the keystore that is used to sign your new certificate with the local CA private key. If you an in the `$ZOWE_RUNTIME/api-mediation-directory`, you can omit this parameter. It should point to the `$ZOWE_ROOT_DIR/api-mediation/keystore/local_ca/localca`.


#### Add a service with an existing certificate to API ML on z/OS

The API Mediation Layer requires validation of the certificate of each service that it accessed by the API Mediation Layer. The API Mediation Layer requires validation of the full certificate chain. Use one of the following methods:

- Import the public certificate of the root CA that has signed the certificate of the service to the APIML truststore.

- Ensure that your service has its own certificate. If it was signed by intermediate CA all intermediate CA certificates ensure that all certificates are in its keystore.

    **Note:** If the service does not provide intermediate CA certificates to the APIML then the validation fails. This can be circumvented by importing the intermediate CA certificates to the API ML truststore.

Import a public certificate to the APIML truststore by calling in the directory with API Mediation Layer:

```
cd $ZOWE_ROOT_DIR/api-mediation
scripts/apiml_cm.sh --action trust --certificate <path-to-certificate-in-PEM-format> --alias <alias>
```

##### Procedure if the service is not trusted

If you access a service that is not trusted, for example, by issuing a REST API request to it:

```http --verify=keystore/local_ca/localca.cer GET https://<gatewayHost>:<port></port>/api/v1/<untrustedService>/greeting```

You will receive a similar response:

```
    HTTP/1.1 502
    Content-Type: application/json;charset=UTF-8

    {
        "messages": [
            {
                "messageContent": "The certificate of the service accessed by HTTPS using URI '/api/v1/<untrustedService>/greeting' is not trusted by the API Gateway: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target",
                "messageKey": "apiml.common.tlsError",
                "messageNumber": "AML0105",
                "messageType": "ERROR"
            }
        ]
    }
```
    
The response has the HTTP status code [502 Bad Gateway](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502) and a JSON response in the standardized format for error messages. The message has key `apiml.common.tlsError` and the message number `AML0105` and content that explains details about the message.

If you receive this message, import the certificate of your service or the CA that has signed it to the truststore of the API Mediation Layer as described above.


#### Trust a z/OSMF certificate

The Zowe installation script tries to import z/OSMF public certificates to the truststore of API Mediation Layer automatically.  This requires the user ID that is doing the installation to be able to read the z/OSMF keyring.

If it is not possible, you will see following error message:

`WARNING: z/OSMF is not trusted by the API Mediation Layer.`

To allow `apiml_cm.sh` to run, it should be sufficient to give CONTROL access for the user of `IRR.DIGTCERT.LIST` (needed for a SITE certificate) and UPDATE access for the user of `IRR.DIGTCERT.LISTRING`, but in some cases (for example, you have already created a certificate), you might have to permit the user CONTROL access to `IRR.DIGTCERT.**`.

**Follow these steps:**

1. Add z/OSMF to the truststore manually as a user that has access rights to read the z/OSMF keyring. The read access to z/OSMF keyring can be granted by the following commands:

- RACF:

    ```
    PERMIT IRR.DIGTCERT.LIST CLASS(FACILITY) ID(acid) ACCESS(CONTROL)
    PERMIT IRR.DIGTCERT.LISTRING CLASS(FACILITY) ID(acid) ACCESS(UPDATE)
    ```
    To access the private key belonging to SITE or CERTAUTH in a keyring, you can use either the FACILITY class or the RDATALIB class.

    If you use the FACILITY class, ensure that you have access rights to the following resources:

    * `UPDATE` access on `IRR.DIGTCERT.LISTRING`, and
    
    * `CONTROL` access on `IRR.DIGTCERT.GENCERT`

    If you use the RDATALIB class, ensure that you have access rights on the following resource:
    
    * `CONTROL` access on `<keyring owner>.<ring name>.LST`

    **Note:** If you have both `FACILITY` and `RDATALIB` active, the access check will use the `RDATALIB` class. If you do not have access to that specific profile, access is denied. It does not fall back to the `FACILITY` class.

- Top Secret:
      
    ```
    TSS ADD(dept) IBMFAC(IRR.DIGTCERT)
    TSS PER(acid) IBMFAC(IRR.DIGTCERT.LIST) ACCESS(CONTROL) 
    TSS PER(acid) IBMFAC(IRR.DIGTCERT.LISTRING) ACCESS(UPDATE)
    ```

- ACF2:

    ```
      ACF 
      SET RESOURCE(FAC) 
      RECKEY IRR ADD(DIGTCERT.LIST UID(acid) - 
        SERVICE(CONTROL) ALLOW)                                           
      RECKEY IRR ADD(DIGTCERT.LISTRING UID(acid) -  
        SERVICE(UPDATE) ALLOW)
      F ACF2,REBUILD(FAC) 
    ```

    where:

    - `acid` is the user ID of the user that is installing Zowe.

2. Issue the following command to find the name of the z/OSMF keyring:
 
    `cat /var/zosmf/configuration/servers/zosmfServer/bootstrap.properties | grep izu.ssl.key.store.saf.keyring`

    This will return a line like the following one:
 
    `izu.ssl.key.store.saf.keyring=IZUKeyring.IZUDFLT`

3. Run following commands as a superuser to import z/OSMF certificates:

    **Note:** This should be the same keyring name as specified in the PARMLIB member for z/OSMF. For example, in SYS1.PARMLIB(IZUPRMxx) you will see a line like this:

    `KEYRING_NAME('IZUKeyring.IZUDFLT')`

4. Substitute the value of the z/OSMF keyring that is obtained above from `bootstrap.properties` in the value of the `--zosmf-keyring` parameter:

    ```
        su
        cd $ZOWE_RUNTIME/api-mediation
        scripts/apiml_cm.sh --action trust-zosmf --zosmf-keyring IZUKeyring.IZUDFLT --zosmf-userid IZUSVR
    ```

If the import is successful, restart the Zowe server to make the changes effective.

If the import is not successful, you may receive an error such as the following error: 

```
keytool error (likely untranslated): java.io.IOException: The private key of IZUDFLT is not available or no authority to access the private key
It is not possible to read z/OSMF keyring IZUSVR/IZUKeyring.IZUDFLT. The effective user ID was: acid. You need to run this command as user that has access to the z/OSMF keyring:
```

Verify that you receive these messages in the log:

```
ICH408I USER(acid ) GROUP(group ) NAME(name        )
 IRR.DIGTCERT.GENCERT CL(FACILITY)
 INSUFFICIENT ACCESS AUTHORITY
 FROM IRR.DIGTCERT.** (G)
 ACCESS INTENT(CONTROL)  ACCESS ALLOWED(NONE   )
```

If you receive these messages, permit the user to have CONTROL access to `IRR.DIGTCERT.**` with the following RACF command or the equivalent command for ACF2 or Top Secret:

```
PERMIT IRR.DIGTCERT.** CLASS(FACILITY) ID(acid) ACCESS(CONTROL)
```

If the import is successful, restart the Zowe server to make the changes effective.

#### Disable certificate validation

To use Zowe without setting up certificates, disable the validation of the TLS/SSL certificates by the API Mediation Layer.

Update the following property:

`-Dapiml.security.verifySslCertificatesOfServices=false`

in following shell scripts:

- `$ZOWE_RUNTIME/api-mediation/scripts/api-mediation-start-catalog.sh`
- `$ZOWE_RUNTIME/api-mediation/scripts/api-mediation-start-discovery.sh`
- `$ZOWE_RUNTIME/api-mediation/scripts/api-mediation-start-gateway.sh`

## Security Service Client Library

The `security-service-client-spring` library enables authentication and endpoint protection. The library relies on API ML Gateway to provide authentication and token validation, and consists of the following components:
  - `com.ca.apiml.security.common` - Components that are necessary to build Spring security
  - `com.ca.apiml.security.client` - Components that enables the security client and Gateway lookup

#### @EnableApimlAuth annotation
Use `@EnableApimlAuth` annotation to enable the security client and integration of the `security-service-client-spring` library. The annotation handles necessary component scans, creates the `GatewaySecurityService`, and starts the Gateway lookup logic.

#### Gateway lookup logic 
Security client uses the `GatewayClient` Spring component to represent a Gateway instance. Lookup logic scans the embedded Discovery client and sets a Gateway instance to ‘Gateway Client’ after the Spring context starts. The scanning process happens asynchronously from the context start-up. The security client provides the authentication service once the Gateway is found. Lookup status can be retrieved by calling `GatewayClient.isInitialized()` method or listen for `GatewayLookupCompleteEvent` event, which gets published after the Gateway instance is found.

#### Useful classes
The core class of the library is `com.ca.apiml.security.client.service.GatewaySecurityService`, which provides a facility to perform login and to validate the jwt token. The `GatewaySecurityService` has the following methods:

  - `login` - Allows to login to the API Gateway with a username and password and retrieve the valid JWT token
  - `query` - Allows to verify the JWT token validity and return the JWT token data
  
 The following providers process authentication requests:
  
   - `com.ca.apiml.security.client.login.GatewayLoginProvider` - Verifies the mainframe credentials 
   - `com.ca.apiml.security.client.token.GatewayTokenProvider` - Authenticates the JWT token

The library contains the following Spring security filters and handlers:

- `com.ca.apiml.security.common.content.BasicContentFilter` - Authenticates the credentials from the basic authorization header. The filter in the `SecurityConfiguration` class is used to secure content with basic authentication. The credentials are extracted from the request header and are passed to the `GatewayLoginProvider`, which calls the `/login` endpoint.
- `com.ca.apiml.security.common.content.CookieContentFilter` - Authenticates the JWT token that is stored in the cookie. This filter in a `SecurityConfiguration` is used to secure content with the JWT token stored in the cookie. The JWT token is extracted from the cookie and passed to the `GatewayTokenProvider`, which calls the `/query` endpoint.
- `SuccessfulLoginHandler` - Handles the successful login
- `UnauthorizedHandler` - Handles unauthorized access
- `BasicAuthUnauthorizedHandler` - Handles unauthorized access in the case of basic authentication
- `FailedAuthenticationHandler` - Handles authentication failure
- `ResourceAccessExceptionHandler` - Handles exceptions related to accessing other services/resources, such as GatewayNotFoundException or ServiceNotAccessibleException
- `AuthExceptionHandler` - Handles exceptions thrown during authentication process

For more information, see [Api Catalog security configuration](https://github.com/zowe/api-layer/blob/master/api-catalog-services/src/main/java/com/ca/mfaas/apicatalog/security/SecurityConfiguration.java) (Reference usage of the library), [Spring Security Architecture](https://spring.io/guides/topicals/spring-security-architecture) and [Security with Spring Tutorial](https://www.baeldung.com/security-spring).
