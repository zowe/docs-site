# Configuring PKCS12 certificates

Zowe is able to use PKCS12 certificates that are stored in USS.  This certificate is used for encrypting TLS communication between Zowe clients and the Zowe z/OS servers, as well as intra z/OS Zowe server to Zowe server.  Zowe uses a `keystore` directory to contain its external certificate, and a `truststore` directory to hold the public keys of servers it communicate with (for example z/OSMF).  

Using USS PKCS12 certificates is useful for proof of concept projects using a self signed certificates.  For production usage of Zowe it is recomended to work with certificates held in z/OS keystores.  Working with z/OS keystores may require system administrator priviledges and working with your z/OS security team, so the self signed PKCS12 path is provided to assist with configuring and launching test and scratch Zowe instances.  

## Use a PKCS12 certificate

When Zowe is launched details for the PKCS12 certificate used are specified in the `zowe.yaml` section `certificates`.  This contains information for the certificate name and its location, together with the truststore location.  

The two most common scenario for using a PKCS12 certtificate are where you have been given an existing certificate and wish to configure Zowe to use it, or else you do not have a certificate and wish to generate a new one.  The `zwe init certificate` command supports both scenarios.  The input parameters that control certificate configuration
are specified in the section `zowe.setup.certificates`

## Create a self signed PKCS12 certificate

The following `zowe.yaml` example will generate: 

 - A `PKCS12` certificate, specified in `zowe.setup.certificate.type` 
 - A keystore directory `/global/zowe/keystore` specified in  `zowe.setup.certificate.pkcs12.directory`. 
 - A certificate name (or alias) `localhost` specified in `zowe.setup.certificate.pkcs12.name`  
 - A certificate authority name `local_ca` specified in `zowe.setup.certificate.certificate.pkcs12.caAlias`.

```
zowe:
  setup:
    certificate:
      type: PKCS12
      dname:
        caCommonName: 
        commonName:
        orgUnit:
        org:
        locality:
        state:
        country:
      validity: 3650
      pkcs12:
        directory: /global/zowe/keystore
        name: localhost
        password: password
      caAlias: local_ca
        caPassword: local_ca_password
        import:
          keystore:
          password:
          alias:
```

To assist with updating `zowe.yaml` the values to generate a self signed PKCS12 certificate are included in the section beginning ` # >>>> Certificate setup scenario 1`.  Other certificate scenarios lower down in the `zowe.yaml` file are commented out.

The `zwe init certificate` command will generate a certificate based on the `zowe.yaml` values in the `zowe.setup.certificate` section.  These certificate values used at runtime are referenced in the `zowe.yanl` section `zowe.certificates`. Specify `--update-config` for the `zwe` command to update the runtime `zowe.certificates` section to reference the generated certificate generated from the `zowe.setup.certificate`. 

The follow command output shows generation of a self signed PKCS12 certificate using the default values.  Some detailed output messages have been omitted, but the flow can be viewed that creates the CA, creates the keystore and adds the CA to it,  create the certificate and adds that to the keystore,  creates the truststore,  changes directory permissions to restrict access to the private key.

```
#>zwe init certificate -c ./zowe.yaml --update-config
-------------------------------------------------------------------------------
>> Creating certificate authority "local_ca"
>> Certificate authority local_ca is created successfully.
-------------------------------------------------------------------------------
>> Export keystore /global/zowe/keystore/local_ca/local_ca.keystore.p12
>> Keystore /global/zowe/keystore/local_ca/local_ca.keystore.p12 is exported successfully.
-------------------------------------------------------------------------------
>> Creating certificate "localhost"
>> Certificate localhost is created successfully.
-------------------------------------------------------------------------------
>> Export keystore /global/zowe/keystore/localhost/localhost.keystore.p12
>> Keystore /global/zowe/keystore/localhost/localhost.keystore.p12 is exported successfully.-------------------------------------------------------------------------------
>> Export keystore /global/zowe/keystore/localhost/localhost.truststore.p12
>> Keystore /global/zowe/keystore/localhost/localhost.truststore.p12 is exported successfully.
-------------------------------------------------------------------------------
>> Lock keystore directory /global/zowe/keystore
>> Keystore directory /global/zowe/keystore is locked.
-------------------------------------------------------------------------------
>> Update certificate configuration to ./zowe.yaml

- update "zowe.certificate.keystore.type" with value: PKCS12
...
- update "zowe.certificate.pem.certificateAuthorities" with value: /global/zowe/keystore/local_ca/local_ca.cer

>> Zowe configuration is updated successfully.

#>
```

Because `--update-config` was specified the `zowe.certificates` section's values are updated to reference the newly generated certificate.  These updates are logged by the `zwe init certificate` command output.  Open the `zowe.yaml` file to check the references to the newly generated certificate values, as shown below:

```
  certificate:
    keystore:
      type: PKCS12
      file: /global/zowe/keystore/localhost/localhost.keystore.p12
      password: password
      alias: localhost
    truststore:
      type: PKCS12
      file: /global/zowe/keystore/localhost/localhost.truststore.p12
      password: password
    pem:
      key: /global/zowe/keystore/localhost/localhost.key
      certificate: /global/zowe/keystore/localhost/localhost.cer
      certificateAuthorities: /global/zowe/keystore/local_ca/local_ca.cer
```

When using a self-signed certificate, you will be challenged by your browser when logging in to Zowe to accept its untrusted certificate authority.  Depending on the browser you are using there are different ways to proceed.  

### Manually import a certificate authority into a web browser

To avoid the browser untrusted CA challenge, you can import Zowe's certificates into the browser to avoid untrusted network traffic challenges. For more information, see [Import the local CA certificate to your browser](../extend/extend-apiml/api-mediation-security.md#import-the-local-ca-certificate-to-your-browser). 

To avoid requiring each browser to trust the CA that signed the Zowe certificate, you can use a public certificate authority such as _Symantec_, _Comodo_, _Let's Encrypt_, or _GoDaddy_to create a certificate. These certificates are trusted by all browsers and most REST API clients. This option, however, requires a manual process to request a certificate and may incur a cost payable to the publicly trusted CA.

<!--

## Import an existing self signed PKCS12 certificate

**TODO**

## SSO

**TODO**
-->