# Configure Certificates 

You can use the existing certificate signed by an external certificate authority (CA) for HTTPS 
ports in the API Mediation Layer and the Zowe Application Framework, or else you can let the 
Zowe configuration script to generate a self-signed certificate by the local API Mediation CA.

If you let the Zowe configuration to generate a self-signed certificate, the certificates should 
be imported into your browser to avoid untrusted network traffic challenges. 
See [Import the local CA certificate to your browser](../extend/extend-apiml/api-mediation-security.md#import-the-local-ca-certificate-to-your-browser).

You can use an existing server certificate that is signed by an external CA. For example, 
CA managed by the IT department of your company that ensures that the certificates are trusted 
by browsers in your company.
 
You can also use a public certificate authority such as Symantec, Comodo, or GoDaddy. These
certificates are trusted by all browsers and most REST API clients. However, this option involves
a manual process of requesting a certificate. We recommend you to start with the local API 
Mediation Layer CA for an initial evaluation.

You can use the `bin/zowe-setup-certificates.sh` script to configure the certificates with the set of 
defined environment variables. The environment variables act as parameters for the certificate
configuration.

##### Generate Certificate with the Default Values
The script reads the default variable values that are provided in the `bin/zowe-setup-certificates.env`
file and generates the certificate signed by the local API Mediation CA and keystores in the 
`/global/zowe/keystore` location. To set up certificates with the default environment variables, 
ensure that you run the following script in the Zowe installation directory:
```shell script
bin/zowe-setup-certificates.sh
```
The keystore and certificates are generated in the default `/global/Zowe/keystore` directory.

##### Generate Certificate with the Custom Values
We recommend you to review all the parameters in the `zowe-setup-certificates.env` file and customize 
the values for variables  to meet your requirements. For example, set your preferred location to 
generate certificates and keystores. 

Follow the procedure to customize the values for variables in the `zowe-setup-certificates.env` file:

1. Copy the `bin/zowe-setup-certificates.env` file from the read-only location to a new 
    `/your/directory/zowe-setup-certificates.env` location.  
    
2. Customize the values for the variables based on the descriptions that are provided in the 
    `zowe-setup-certificates.env` file. 
    
3. Execute the following command with the customized environment file:
   ```shell script
    bin/zowe-setup-certificates.sh –p /your/directory/zowe-setup-certificates.env
   ```
   where `/your/directory/` specifies the location of your customized environment file. 
   
The keystore and certificates are generated based on the customized values in the 
`bin/zowe-setup-certificates.env` file.

The `zowe-setup-certificates.sh` command also generates `zowe-certificates.env` file in the 
`KEYSTORE_DIRECTORY` directory. This file is used in the Zowe instance configuration step. 
   
The following example shows how you can configure `zowe-setup-certificates.env` file to use the 
existing certificates:

1. Update the value of `EXTERNAL_CERTIFICATE`. The value needs to point to a keystore in PKCS12 format
   that contains the certificate with its private key. The file needs to be transferred as a binary to
   the z/OS system.

2. Update the value of `KEYSTORE_PASSWORD`. The value is a password to the PKCS12 keystore specified 
   in the `EXTERNAL_CERTIFICATE` variable.
    
3. Update the value of `EXTERNAL_CERTIFICATE_ALIAS` to the alias of the server certificate in the
   keystore.
   
    **Note:** If you do not know the certificate alias, run the following command where 
    `externalCertificate.p12` is a value of  `EXTERNAL_CERTIFICATE` in the 
    `zowe-setup-certificates.env` file.

   ```sh
   keytool -list -keystore externalCertificate.p12 -storepass password -storetype pkcs12 -v
   ```
   Expected output:
   ```
   Keystore type: PKCS12
   Keystore provider: SUN
   Your keystore contains 1 entry
   Alias name: apiml
   Creation date: Oct 9, 2019
   Entry type: PrivateKeyEntry
   Certificate chain length: 3
   ...
   ```
   In this case, alias can be found in `Alias name: apiml`. Therefore, set `EXTERNAL_CERTIFICATE_ALIAS=apiml`.
      
4. Update the value of `EXTERNAL_CERTIFICATE_AUTHORITIES` to the path of the public certificate of the 
   certificate authority that has signed the certificate. You can add additional certificate authorities 
   separated by spaces (specify the complete value **in quotes**). This can be used for certificate authorities 
   that have signed the certificates of the services that you want to access via the API Mediation Layer.

5. (Optional) If you have trouble getting the certificates and you want only to evaluate Zowe,
    you can switch off the certificate validation by setting `VERIFY_CERTIFICATES=false`. The HTTPS 
    will still be used but the API Mediation Layer will not validate any certificate.

    **Important!** Switching off certificate evaluation is a non-secure setup.

Following is the part of `zowe-setup-certificates.env` file snippet that uses existing certificates:
```shell script
# Should APIML verify certificates of services - true/false
VERIFY_CERTIFICATES=true
# optional - Path to a PKCS12 keystore with a server certificate for APIML
EXTERNAL_CERTIFICATE=/path/to/keystore.p12
# optional - Alias of the certificate in the keystore
EXTERNAL_CERTIFICATE_ALIAS=servercert
# optional - Public certificates of trusted CAs
EXTERNAL_CERTIFICATE_AUTHORITIES=”/path/to/cacert_1.cer /path/to/cacert_2.cer”
# Select a password that is used to secure EXTERNAL_CERTIFICATE keystore and 
# that will be also used to secure newly generated keystores for API Mediation
KEYSTORE_PASSWORD=mypass
```

You may encounter the following message:

```
apiml_cm.sh --action trust-zosmf has failed.
WARNING: z/OSMF is not trusted by the API Mediation Layer. Follow instructions in Zowe documentation about manual steps to trust z/OSMF
```

This error does not interfere with the installation progress and can be remediated after the installation completes.
For more information, see [Trust z/OSMF Certificate](../extend/extend-apiml/api-mediation-security.md#trust-a-z-osmf-certificate).


