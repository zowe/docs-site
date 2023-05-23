# Configure certificates if you have existing certificates

## Import your PKCS12 certificate

To import the certificate, you need to configure the section `>>>> Certificate setup scenario 2` in `zowe.yaml`. Before you import a PKCS12 certificate, you need to import a certificate authority first. For PKCS12 certificate users, here are some instructions for the fileds in the `zowe.yaml` file.

- Define `zowe.setup.certificate.pkcs12.import.keystore` if you already acquired certificate from other CA, stored them in PKCS12 format, and want to import into Zowe PKCS12 keystore.
- `zowe.setup.certificate.pkcs12.import.password` is the password for keystore defined in `zowe.setup.certificate.pkcs12.import.keystore`.
- `zowe.setup.certificate.pkcs12.import.alias` is the original certificate alias defined in `zowe.setup.certificate.pkcs12.import.keystore`. After imported, the certificate will be saved as alias specified in `zowe.setup.certificate.pkcs12.name`.

```
zowe:
  setup:
    certificate:
      type: PKCS12
      pkcs12:
        directory: /var/zowe/keystore
        lock: true
          name: localhost
          password: password
        import:
          keystore: ""
          password: ""
          alias: ""
      importCertificateAuthorities:
        - ""
```

**Notes:**

- Due to the limitation of RACDCERT command, the `importCertificateAuthorities` field contains maximum 2 entries.


### Manually import a certificate authority into a web browser

To import an existing certificate and avoid the browser untrusted CA challenge, you have to import Zowe's certificates into the browser to avoid untrusted network traffic challenges.

Trust in the API ML server is a necessary precondition for secure communication between Browser or API Client application. Ensure this trust through the installation of a Certificate Authority (CA) public certificate. By default, API ML creates a local CA. Import the CA public certificate to the truststore for REST API clients and to your browser. You can also import the certificate to your root certificate store.

**Notes:** 

<!-- - If a SAF keyring is being used and set up with `ZWEKRING` JCL, the procedure to obtain the certificate does not apply. It is recommended that you work with your security system administrator to obtain the certificate. Start the procedure at step 2. -->

- The public certificate in the [PEM format](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) is stored at `<KEYSTORE_DIRECTORY>/local_ca/localca.cer` where `<KEYSTORE_DIRECTORY>` is defined in a customized `<RUNTIME_DIR>/bin/zowe-setup-certificates.env` file during the installation step that generates Zowe certificates. The certificate is stored in UTF-8 encoding so you need to transfer it as a binary file. Since this is the certificate to be trusted by your browser, it is recommended to use a secure connection for transfer.

- Windows currently does not recognize the PEM format. For Windows, use the P12 version of the `local_cer`.

**Follow these steps:**

1. Download the local CA certificate to your computer. Use one of the following methods to download the local CA certificate to your computer:

    - **Use [Zowe CLI](https://github.com/zowe/zowe-cli#zowe-cli--) (Recommended)**  
Issue the following command:

        `zowe zos-files download uss-file --binary $KEYSTORE_DIRECTORY/local_ca/localca.cer`

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

      `certutil -enterprise -f -v -AddStore "Root" localca.cer`

      **Note:** Ensure that you open the terminal as **administrator**. This will install the certificate to the Trusted Root Certification Authorities.

    - **For macOS**, run the following command:

      `$ sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain localca.cer`

    - **For Firefox**, manually import your root certificate via the Firefox settings, or force Firefox to use the Windows truststore.

      **Note:** Firefox uses its own certificate truststore.

        Create a new Javascript file firefox-windows-truststore.js at `C:\Program Files (x86)\Mozilla Firefox\defaults\pref` with the   following content:

      ```
      /* Enable experimental Windows truststore support */
      pref("security.enterprise_roots.enabled", true);
      ```

To avoid requiring each browser to trust the CA that signed the Zowe certificate, you can use a public certificate authority such as _Symantec_, _Comodo_, _Let's Encrypt_, or _GoDaddy_to create a certificate. These certificates are trusted by all browsers and most REST API clients. This option, however, requires a manual process to request a certificate and may incur a cost payable to the publicly trusted CA.

## Connect to your JCERACFKS certificate

To import the certificate, you need to configure the section `>>>> Certificate setup scenario 4` in `zowe.yaml`. Please see the instructions for each field. For JCERACFKS certificate users, here are some instructions for the fileds in the `zowe.yaml` file.

- `zowe.setup.certificate.keyring.connect.user`is required and tells Zowe the owner of existing certificate. This field can have value of SITE or a user ID.
- `zowe.setup.certificate.keyring.connect.label` is also required and tells Zowe the label of existing certificate.

```
zowe:
  setup:
    certificate:
      type: JCERACFKS
      keyring:
        name: ZoweKeyring
        connect:
          user: IBMUSER
          label: ""
      importCertificateAuthorities:
        - ""
```

**Notes:**

- Due to the limitation of RACDCERT command, the `importCertificateAuthorities` field contains maximum 2 entries.

## Import the certificate stored in MVS data set into Zowe keyring

To import a certificate that is stored in a data set into a key ring, you need to configure the section `>>>> Certificate setup scenario 5` in `zowe.yaml`. For JCERACFKS certificate users, here are some instructions for the fileds in the `zowe.yaml` file.

- `zowe.setup.certificate.keyring.connect.dsName` is required in this case. It tells Zowe the data set where the certificate stored.
- `zowe.setup.certificate.keyring.connect.password` is the password when importing the certificate.
- The certificate will be imported with label defined in `zowe.setup.certificate.keyring.label`.

```
zowe:
  setup:
    certificate:
      type: JCERACFKS
      keyring:
        name: ZoweKeyring
        label: localhost
      import:
        dsName: ""
        password: ""
```

<!-- Any command to run? -->

## Next steps

Now you have your certificates ready, learn more about [how to use these certificates](./use-certificates.md) in Zowe production environement.