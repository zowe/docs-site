# Managing certificates in Zowe API Mediation Layer

Review details of certificate management in Zowe API Mediation Layer (API ML). This article decribes both how to manage certificates when running on localhost, as well as certificate management using Zowe runtime on z/OS. Additional information is provided about about the API ML truststore and keystore, and API ML SAF Keyring.

  - [Running on localhost](#running-on-localhost)
    - [How to start API ML on localhost with full HTTPS](#how-to-start-api-ml-on-localhost-with-full-https)
    - [Certificate management guide](#certificate-management-guide)
    - [Generate a certificate for a new service on localhost](#generate-a-certificate-for-a-new-service-on-localhost)
    - [Add a service with an existing certificate to API ML on localhost](#add-a-service-with-an-existing-certificate-to-api-ml-on-localhost)
    - [Service registration to Discovery Service on localhost](#service-registration-to-discovery-service-on-localhost)
  - [Zowe runtime on z/OS](#zowe-runtime-on-zos)
    - [Import the local CA certificate to your browser](#import-the-local-ca-certificate-to-your-browser)
    - [Generate a keystore and truststore for a new service on z/OS](#generate-a-keystore-and-truststore-for-a-new-service-on-zos)
    - [Add a service with an existing certificate to API ML on z/OS](#add-a-service-with-an-existing-certificate-to-api-ml-on-zos)
      - [Procedure if the service is not trusted](#procedure-if-the-service-is-not-trusted)
  - [Truststore and keystore or SAF keyring](#truststore-and-keystore-or-saf-keyring)
    - [API ML truststore and keystore](#api-ml-truststore-and-keystore)
    - [API ML SAF Keyring](#api-ml-saf-keyring)

## Running on localhost

### How to start API ML on localhost with full HTTPS

The [api-layer repository](https://github.com/zowe/api-layer) contains pre-generated certificates that can be used to start API ML with HTTPS on your computer. The certificates are not trusted by your browser so you can either ignore the security warning or generate your own certificates and add them to the truststore of your browser or system.

For more information about certificates, see [TLS Certificates for localhost](https://github.com/zowe/api-layer/blob/master/keystore/README.md).

:::note
When running on localhost, only the combination of using a keystore and truststore is supported.
:::


### Certificate management guide

Zowe API Mediation Layer provides a guide that can be used to generate a keystore and truststore using the Zowe local certificate authority on Windows, Mac, Linux, and z/OS.

This guide is maintained in the `zowe/api-layer` repository [keystore/README.md](https://github.com/zowe/api-layer/blob/v2.x.x/keystore/README.md), and uses a combination of openssl and java keytool. 


### Generate a certificate for a new service on localhost

To generate a certificate for a new service on localhost, see [Generating certificate for a new service on localhost](https://github.com/zowe/api-layer/blob/master/keystore/README.md#generating-certificate-for-a-new-service-on-localhost).


### Add a service with an existing certificate to API ML on localhost

For information about adding a service with an existing certificate to API ML on localhost, see [Trust certificates of other services](https://github.com/zowe/api-layer/blob/master/keystore/README.md#trust-certificates-of-other-services).


### Service registration to Discovery Service on localhost

To register a new service to the Discovery Service using HTTPS, provide a valid client certificate that is trusted by the Discovery Service.


## Zowe runtime on z/OS

Certificates for the API ML local CA and API ML service are managed by installing the Zowe runtime on z/OS. For more information see [Installing the Zowe runtime on z/OS](../../user-guide/install-zos.md).

There are two ways to set up certificates on a z/OS machine:

- [Certificates in UNIX files (truststore and keystore)](#api-ml-truststore-and-keystore)
- [Certificates in SAF keyring](#api-ml-saf-keyring)
 
For detailed instructions about how to set up certificates during installation, see the following articles:
* [Use PKCS12 certificates](../../user-guide/use-certificates.md#use-pkcs12-certificates)
* [Use JCERACFS certificates](../../user-guide/use-certificates.md#use-jceracfks-certificates) in a keyring 

Follow the procedure in the applicable section described in this article during installation.

### Import the local CA certificate to your browser

Trust in the API ML server is a necessary precondition for secure communication between a browser or API Client application. Ensure this trust through the installation of a Certificate Authority (CA) public certificate. By default, API ML creates a local CA. Import the CA public certificate to the truststore for REST API clients and to your browser. You can also import the certificate to your root certificate store.

:::note Notes
- If a SAF keyring is being used and set up with `ZWEKRING` JCL, the procedure to obtain the certificate does not apply. It is recommended that you work with your security system administrator to obtain the certificate. Start the procedure at step 2.

- The public certificate in the [PEM format](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) is stored at `<KEYSTORE_DIRECTORY>/local_ca/localca.cer`, where `<KEYSTORE_DIRECTORY>` is defined in a customized `zowe.yaml` file during the installation step that generates Zowe certificates. The certificate is stored in UTF-8 encoding so you need to transfer it as a binary file. Since this is the certificate to be trusted by your browser, it is recommended to use a secure connection for transfer.

- Windows currently does not recognize the PEM format. For Windows, use the P12 version of the `local_cer`.
:::

**Follow these steps:**

1. Download the local CA certificate to your computer. Use one of the following methods to download the local CA certificate to your computer:

    - **Use [Zowe CLI](https://github.com/zowe/zowe-cli#zowe-cli--) (Recommended)**  
Issue the following command:

        ```
        zowe zos-files download uss-file --binary $KEYSTORE_DIRECTORY/local_ca/localca.cer
        ```

    - **Use `sftp`**  
Issue the following command:

        ```
        sftp <system>
        get $KEYSTORE_DIRECTORY/local_ca/localca.cer
        ```

    To verify that the file has been transferred correctly, open the file. The following heading and closing should appear:

    ```
    -----BEGIN CERTIFICATE-----
    ...
    -----END CERTIFICATE-----
    ```

2. Import the certificate to your root certificate store and trust it.

    - **For Windows**, run the following command:

      ```
      certutil -enterprise -f -v -AddStore "Root" localca.cer
      ```

      **Note:** Ensure that you open the terminal as **administrator**. This will install the certificate to the Trusted Root Certification Authorities.

    - **For macOS**, run the following command:

      ```
      $ sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain localca.cer
      ```

    - **For Firefox**, manually import your root certificate via the Firefox settings, or force Firefox to use the Windows truststore.

      **Note:** Firefox uses its own certificate truststore.

        Create a new Javascript file firefox-windows-truststore.js at `C:\Program Files (x86)\Mozilla Firefox\defaults\pref` with the   following content:

      ```
      /* Enable experimental Windows truststore support */
      pref("security.enterprise_roots.enabled", true);
      ```

### Generate a keystore and truststore for a new service on z/OS

You can generate a keystore and truststore for a new service using the local CA in the keystore directory.

:::note
This procedure applies to a UNIX file keystore and truststore only. For the SAF keyring option, it is recommended that you perform the actions manually using your security system commands.
:::

Use the `zwe` command available in the zowe distribution package and execute following example.

**Example:**
```
zwe certificate pkcs12 create cert -d <service-keystore-directory> -a <cert-alias> -p <keystore-password> -k <service-name> --ca-alias <ca-alias> --ca-password <ca-keystore-password>
 ```

* **cert-alias**  
Specifies a unique string to identify the key entry. All keystore entries (key and trusted certificate entries) are accessed via unique aliases. Since the keystore has only one certificate, you can omit this parameter and use the default value `localhost`.

* **service-keystore-directory**  
 Specifies the repository of security certificates plus the corresponding private keys. The `<keystore_path>` is the path excluding the extension to the keystore that is generated. It can be an absolute path or a path relative to the current working directory. The key store is generated in PKCS12 format with the `.p12` extension. Ensure that the path is in an existing directory where your service expects the keystore.

  **Example:** `/opt/myservice/keystore/`.

* **service-name**  
Specifies the name of the service for which you want to generate keystore. A keystore will be created in the directory with the same name.
 **Example:** `my-new-service`.

* **keystore-password**  
 Specifies the keystore password. 

* **ca-keystore-password**  
Specifies the local certificate authority keystore password. 

* **ca-alias**  
Specifies the local certificate authority alias in the keystore. Zowe CA is stored under the `local_ca` alias.

### Add a service with an existing certificate to API ML on z/OS

API Mediation Layer requires validation of the certificate of each service accessed by API Mediation Layer. API Mediation Layer requires validation of the full certificate chain.

:::note
This procedure applies only to UNIX file keystore/truststore. For the SAF keyring option, we recommend you perform the actions manually using your security system commands.
:::

Import the public certificate of the CA that has signed the certificate of the service to the API ML truststore.

:::note
Validation fails if a service does not provide intermediate CA certificates to the API ML. This can be circumvented by importing the intermediate CA certificates to the API ML truststore.
:::

#### Procedure if the service is not trusted

If your service is not trusted, you may receive a response with the HTTP status code [502 Bad Gateway](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502) and a JSON response in the standardized format for error messages. The following request is an example of when this error response may occur.

**Example:**

```
http --verify=$KEYSTORE_DIRECTORY/local_ca/localca.cer GET https://<gatewayHost>:<port>/<untrustedService>/api/v1/greeting
```

In this example, you receive a similar response:

```
    HTTP/1.1 502
    Content-Type: application/json;charset=UTF-8

    {
        "messages": [
            {
                "messageContent": "The certificate of the service accessed by HTTPS using URI '/<untrustedService>/api/v1/greeting' is not trusted by the API Gateway: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target",
                "messageKey": "apiml.common.tlsError",
                "messageNumber": "AML0105",
                "messageType": "ERROR"
            }
        ]
    }
```

The message has the key `apiml.common.tlsError`, and message number `AML0105`. The content explains details about the message.

If you receive this message, import the certificate of your service or the CA that signed it to the truststore of the API Mediation Layer as described previously.

## Truststore and keystore or SAF keyring

There are two options for how certificates are stored when running Zowe on z/OS:
* API ML truststore and keystore
* API ML SAF keyring 

### API ML truststore and keystore

A _keystore_ is a repository of security certificates consisting of either authorization certificates or public key certificates with corresponding private keys (PK), used in TLS encryption. A _keystore_ can be stored in Java specific format (JKS) or use the standard format (PKCS12). The Zowe API ML uses PKCS12 to enable the keystores to be used
by other technologies in Zowe (Node.js).

### API ML SAF Keyring

As an alternative to using a keystore and truststore, API ML can read certificates from a _SAF keyring_. The user running the API ML must have rights to access the keyring. From the java perspective, the keyring behaves as the `JCERACFKS` keystore. The path to the keyring is specified as `safkeyring://user_id/key_ring_id`. The content of the SAF keyring is equivalent to the combined contents of the keystore and the truststore.

:::note
When using JCERACFKS as the keystore type, ensure that you define the class to handle the RACF keyring. Use the `-D` options to specify the `java.protocol.handler.pkgs property`:

    -Djava.protocol.handler.pkgs=com.ibm.crypto.provider
:::

Review the characterisitics of following elements of the API ML SAF Keyring:

**The API ML local certificate authority (CA)**

- The API ML local CA contains a local CA certificate and a private key that needs to be securely stored.
- The API ML local certificate authority is used to sign certificates of services.
- The API ML local CA certificate is trusted by API services and clients.

**The API ML keystore or API ML SAF Keyring**

- The server certificate of the Gateway (with PK)can be signed by the local CA or an external CA.
- The server certificate of the Discovery Service (with PK) can be signed by the local CA.
- The server certificate of the Catalog (with PK) can be signed by the local CA.
- The API ML keystore is used by API ML services.

**The API ML truststore or API ML SAF Keyring**

- Local CA public certificate
- External CA public certificate (optional)
- Can contain self-signed certificates of API Services that are not signed by the local or external CA
- Used by API ML services

**Zowe core services**

- Services can use the same keystore and truststore or the same keyring as API ML for simpler installation and management.
- When using a keystore and truststore, services have to have rights to access and read them on the filesystem.
- When using a keyring, the user of the service must have authorization to read the keyring from the security system.
- Alternatively, services can have individual stores for higher security.

**API service keystore or SAF keyring** (for each service)

- The API service keystore contains a server and client certificate signed by the local CA.

**API service truststore or SAF keyring** (for each service)

- (Optional) The API service truststore contains a local CA and external CA certificates.

**Client certificates**

- A client certificate is a certificate that is used for validation of the HTTPS client. The client certificate of a Discovery Service client can be the same certificate as the server certificate of the services which the Discovery Service client uses.
