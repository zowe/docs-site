# Zowe API Mediation Layer Security

<!-- TOC depthFrom:2 depthTo:3 orderedList:true -->

1. [Introduction and requirements](#introduction-and-requirements)
    1. [Transport-level Security](#transport-level-security)
    2. [Authentication](#authentication)
    3. [Authorization](#authorization)
    4. [Types of services](#types-of-services)
    5. [Transport Security Requirements](#transport-security-requirements)
    6. [Authentication](#authentication-1)
    7. [Trust stores and key stores](#trust-stores-and-key-stores)
2. [Client Certificates](#client-certificates)
3. [Certificate Management in Zowe API Mediation Layer](#certificate-management-in-zowe-api-mediation-layer)
4. [Running on localhost](#running-on-localhost)
    1. [How to start APIML on localhost with full HTTPS](#how-to-start-apiml-on-localhost-with-full-https)
    2. [Certificate management script](#certificate-management-script)
    3. [Generating own certificates for localhost](#generating-own-certificates-for-localhost)
    4. [Generating certificate for a new service on localhost](#generating-certificate-for-a-new-service-on-localhost)
    5. [Add a service with an existing certificate to APIML on localhost](#add-a-service-with-an-existing-certificate-to-apiml-on-localhost)
    6. [Zowe runtime on z/OS](#zowe-runtime-on-zos)
    7. [Certificates for z/OS installation from the Zowe PAX file](#certificates-for-zos-installation-from-the-zowe-pax-file)
    8. [Generating certificate for a new service on localhost](#generating-certificate-for-a-new-service-on-localhost-1)
    9. [Add a service with an existing certificate to APIML on localhost](#add-a-service-with-an-existing-certificate-to-apiml-on-localhost-1)

<!-- /TOC -->

## Introduction and requirements

The security of the APIML is done on several levels. They are described in following sections.

### Transport-level Security

The data need to be secured during transport this is achieved by using TLS protocol for all connections to APIML services. While it is allowed to disable it (e.g. for debugging purposes), the default mode is to have in on.

### Authentication

Authentication is a way how an entity - a user or an application (API Client or API Service) can prove that they are what they claim to be.

The APIML is using to authentication methods:
- user ID and password (and authentication tokes retrieved by using user ID and password) 
    - requests originate from a user
    - user ID and password are validated by z/OS security manager and then the token is used to access the API service
- TLS client certificates - for service-only requests

In the future, we would like APIML to support client certificates to access the gateway.

### Authorization

Authorization is a method how access rights of an entity are determined.

In the APIML, the authorization is done by z/OS security manager ([CA ACF2](https://www.ca.com/us/products/ca-acf2.html), [IBM RACF](https://www.ibm.com/support/knowledgecenter/zosbasics/com.ibm.zos.zsecurity/zsecc_042.htm), [CA Top Secret](https://www.ca.com/us/products/ca-top-secret.html)). The authentication token is used as a proof of a valid authentication but authorization checks are always done by the z/OS security manager.


### Types of services

- Zowe Core services:

    - Zowe APIML services:
    
        - Gateway Service (GW)
            - The gateway is the access point for API clients that need to access API services
            - API Services can be accessed via the gateway by API Clients
            - Gateway gets information about API Service from Discovery Service
        
        - Discovery Service (DS)
            - The discovery service collects information about API Services and provides it to GW and other services
            - API Mediation services are registered to it too
        
        - API Catalog (AC)
            - Displays information about API services in a web UI
            - Gets information about API Service from Discovery Service

        - Authentication and Authorization Service (AAS) 
            - Provides authentication and authorization functionality to check access of users to resources on z/OS
            - Security service is not provided as an individual microservice but is included to the Gateway Service
            - More details are on in [APIML wiki](https://github.com/gizafoundation/api-layer/wiki/Zowe-Authentication-and-Authorization-Service)

    - Non-APIML Zowe Core services (zLUX, Atlas)

        - They are like other regular API Client and Service described below

- API Clients
    - API Clients are external applications, users, or other API services that are accessing the API services via the GW
  
- API Services 
    - API Services are applications that want to be accessed via the gateway
    - They register themselves to the DS
    - API Services can always access other services via GW
    - API Services can sometimes access other services without GW (in case that they are installed in such way that direct access is possible)
    - API Services can be API Clients to (when they access other services)

Following diagram show basic relationships between services:
![Services Diagram](../../images/api-mediation/apiml-components.svg)


### Transport Security Requirements

All the servers need to provide HTTPS ports.

The requirements for the services are following:

- API Client
    - Is not a server
    - Needs to trust GW
    - Has a trust store that contains certificate(s) needed to trust GW

- Gateway Service
    - Provides HTTPS port
    - Has a key store with the server certificate
        - The certificate needs to be trusted by API Clients
        - This certificate should be trusted by web browsers because GW be used to display web UIs
    - Has a trust store that contains certificates needed to trust API Services

- API Catalog
    - Provides HTTPS port
    - Has a key store with the server certificate
        - The certificate needs to be trusted by GW
        - This certificate does not need to be trusted by anyone else

- Discovery Service
    - Provides HTTPS port
    - Has a key store with the server certificate
        - The certificate needs to be trusted by API Clients
    - Has a trust store that contains certificates needed to trust API Services

- API Service
    - Provides HTTPS port
    - Has a key store with the server and client certificate
        - The server certificate needs to be trusted by GW
        - The client certificate needs to be trusted by DS
        - The client and server certificates can be the same
        - These certificates do not need to be trusted by anyone else
    - Has a trust store that contains certificate(s) needed to trust GW and DS
  

### Authentication

- API Gateway

    - API gateway does not handle authentication right now - requests are sent to the API services who need to handle authentication

- API Catalog

    - API catalog is accessed by users and it needs to be protected by a login
    - This is done via Authentication and Authorization Service

- Discovery Service

    - DS is accessed by API Services
    - This access (reading information and registration) needs to be protected by client certificate
    - Access can be allowed to users (administrators) - optional

- API Services

    - It is up to the service
    - It should be using Authentication and Authorization Service for authentication


###  Trust stores and key stores

A _key store_ is a repository of security certificates - either authorization certificates or public key certificates - plus corresponding private keys, used in TLS encryption. It can be stored in Java specific format (JKS) or use the standard format (PKCS12). The Zowe APIML is using PKCS12 so the key stores can be used
by other technologies used in Zowe (Node.js).

The APIML local CA:

- Contains local CA certificate and its private key (needs to be store securely)
- It is used to sign certificates of services
- Its certificate is trusted by API services and clients

The APIML key store:

- server certificate of GW (with PK) - can be signed by local CA or external CA
- server certificate of DS (with PK) - can be signed by local CA
- server certificate of AC (with PK) - can be signed by local CA
- used by APIML services

The APIML trust store:

- contains local CA public certificate
- contains external CA public certificate (optional)
- can contain self-signed certificates of API Services that are not signed by local or external CA
- used by APIML services

Zowe Core services:

- they can use the same key store and trust store as APIML for simpler installation and management
- or they can have individual stores for higher security

API service key store (for each service)

- contains server and client certificate signed by local CA
  
API service trust store (for each service)  

- contains local CA and external CA certificates (optional)


## Client Certificates

A client certificate is a certificate that is used for validation of the HTTPS client.

## Certificate Management in Zowe API Mediation Layer

## Running on localhost

### How to start APIML on localhost with full HTTPS

The https://github.com/zowe/api-layer repository already contains pre-generated certificates that can be used to start APIML with HTTPS on your computer. The certificates are not trusted by your browser so can either ignore security warning or generate your own certificates and add them to the trust store of your browser or system.

The certificates are described in more detail in the https://github.com/zowe/api-layer/blob/https-local-certmgmt-%2372/keystore/README.md.


### Certificate management script

Zowe API Mediation layer provides a script that can used on Windows, Mac, Linux, and z/OS
to generate the certificate and key store for the local CA, API Mediation Layer, and services.

It is stored in [scripts/apiml_cm.sh](https://github.com/zowe/api-layer/blob/master/scripts/apiml_cm.sh.
It is a UNIX shell script that can be executed by Bash or z/OS Shell. For Windows, you need to install Bash, for example by using [cmder](http://cmder.net/).


### Generating own certificates for localhost

Use the following script in the root of the `api-layer` repository:

    scripts/apiml_cm.sh --action setup

This creates the certificates and key store for the API Mediation Layer in your current workspace.


### Generating certificate for a new service on localhost

The instructions are described at:
https://github.com/zowe/api-layer/blob/master/keystore/README.md#generating-certificate-for-a-new-service-on-localhost


### Add a service with an existing certificate to APIML on localhost

This will be documented during work on the following user story: https://waffle.io/zowe/api-layer/cards/5bd8be80283e09001babbf86


### Zowe runtime on z/OS

### Certificates for z/OS installation from the Zowe PAX file

When you install the Zowe runtime on z/OS from the PAX file following the instructions in [Installing the Zowe runtime on z/OS](https://zowe.github.io/docs-site/latest/user-guide/install-zos.html), the certificates for the APIML local CA and APIML service are automatically generated.

They are generated by the certificate management script `apiml_cm.sh` that is installed to `$ZOWE_ROOT_DIR/api-mediation/scripts/apiml_cm.sh`.    

`$ZOWE_ROOT_DIR` is the directory where you installed the Zowe runtime.

The certificates are generated to the directory `$ZOWE_ROOT_DIR/api-mediation/keystore`.

APIML key store and trust store:

  * `$ZOWE_ROOT_DIR/api-mediation/keystore/local/localhost.keystore.p12` 
    - used for the HTTPS servers
    - contains the APIML server certificate signed by the local CA and private key for the server
    
  * `$ZOWE_ROOT_DIR/api-mediation/keystore/local/localhost.truststore.p12` 
    - use to validate trust when communicating with the services that are registered to the APIML
    - contains the root certificate of the local CA (not the server certificate)
    - contains the local CA public certificate
    - can contain additional certificate to trust services that are not signed by local CA

APIML key and trust stores needs be accessible by the user ID that executes the Zowe runtime.

Local CA:

  * `$ZOWE_ROOT_DIR/api-mediation/keystoree/local_ca/localca.cer`
    - public certificate of local CA
  
  * `$ZOWE_ROOT_DIR/api-mediation/keystore/local_ca/localca.keystore.p12`
    - private key of the local CA 

Local CA key store can be accessible only by the user that is installing and managing the Zowe runtime. 


### Generating certificate for a new service on localhost

Follow the same steps as in https://github.com/zowe/api-layer/blob/master/keystore/README.md#generating-certificate-for-a-new-service-on-localhost.

Use the certificate management script that is store at `$ZOWE_ROOT_DIR/api-mediation/scripts/apiml_cm.sh`.


### Add a service with an existing certificate to APIML on localhost

This will be documented during work on the following user story: https://waffle.io/zowe/api-layer/cards/5bd8be80283e09001babbf86
