# Configuring Zowe certificates 

A keystore directory is used by Zowe to hold the certificate used for encrypting communication between Zowe clients and the Zowe z/OS servers.  It also holds the truststore used to hold public keys of any servers that Zowe trusts.  When a Zowe is launched the instance directory configuration file `instance.env` specifies the location of the keystore directory, see [Configure instance directory](configure-instance-directory.md#keystore-directory)

If you have already created a keystore directory from a previous release of Version 1.8 or later, then you may reuse the existing keystore directory with newer version of Zowe.

You can use the existing certificate signed by an external certificate authority (CA) for HTTPS ports in the API Mediation Layer and the Zowe Application Framework, or else you can let the Zowe configuration script to generate a self-signed certificate by the local API Mediation CA.

If you let the Zowe configuration to generate a self-signed certificate, the certificates should be imported into your browser to avoid untrusted network traffic challenges. See [Import the local CA certificate to your browser](../extend/extend-apiml/api-mediation-security.md#import-the-local-ca-certificate-to-your-browser).  If you do not import the certificates into your browser when you access a Zowe web page, you may be challenged that the web page cannot be trusted and, depending on the browser you are using, have to add an exception to proceed to the web page.  Some browser versions may not accept the Zowe certificate because it is self-signed and the signing authority is not recognized as a trusted source.  Manually importing the certificate into your browser makes it a trusted source and the challenges will no longer occur.  

If you have an existing server certificate that is signed by an external CA, then you use this for the Zowe certificate. This could be a CA managed by the IT department of your company which has already ensured that any certificates signed by that CA are trusted by browsers in your company because they have included their company's CA in their company's browsers' truststore.  This will avoid the need to manually import the local CA into each client machine's browsers.  
 
If you want to avoid the need to have each browser trust the CA that has signed the Zowe certificate, you can use a public certificate authority such as Symantec, Comodo, or GoDaddy to create a certificate. These certificates are trusted by all browsers and most REST API clients. However, this option involves a manual process of requesting a certificate and may incur a cost payable to the publicly trusted CA.

It's recommended that you start with the local API Mediation Layer CA for an initial evaluation.

You can use the `<ROOT_DIR>/bin/zowe-setup-certificates.sh` script in the Zowe runtime directory to configure the certificates with the set of defined environment variables. The environment variables act as parameters for the certificate configuration are held in the file `<ROOT_DIR>/bin/zowe-setup-certificates.env`. 

## Generate certificate with the default values

The script reads the default variable values that are provided in the `<ROOT_DIR>/bin/zowe-setup-certificates.env` file and generates the certificate signed by the local API Mediation CA and keystores in the `/global/zowe/keystore` location.   To set up certificates with the default environment variables, ensure that you run the following script in the Zowe runtime directory:

```shell script
<ROOT_DIR>/bin/zowe-setup-certificates.sh
```

generates the keystore in `u/zowe/mykeystore`.  On many z/OS installations access to this location will be restricted to priveledged users so this step should be done by a system programmer with site knowledge for where the certificate should be stored in a way that the public key can be read but private key access is controlled.  

## Generate certificate with the custom values

We recommend that you review all the parameters in the `zowe-setup-certificates.env` file and customize the values for variables to meet your requirements. For example, set your preferred location to generate certificates and keystores. 

Follow the procedure to customize the values for variables in the `zowe-setup-certificates.env` file:

1. Copy the `bin/zowe-setup-certificates.env` file from the read-only location to a new 
    `<your_directory>/zowe-setup-certificates.env` location.  
    
2. Customize the values for the variables based on the descriptions that are provided in the 
    `zowe-setup-certificates.env` file. 
    
3. Execute the following command with the customized environment file:
   ```shell script
    bin/zowe-setup-certificates.sh –p <your_directory>/zowe-setup-certificates.env [-l <log_directory>]
   ```
   where `<your_directory>` specifies the location of your customized environment file and `<log-directory>` is an optional parameter that overrides the default log output directory of `/global/zowe/logs`, if it is writable, or `~/zowe/logs`.
   
The keystore and certificates are generated based on the customized values in the 
`bin/zowe-setup-certificates.env` file.

The `zowe-setup-certificates.sh` command also generates `zowe-certificates.env` file in the 
`KEYSTORE_DIRECTORY` directory. This file is used in the Zowe instance configuration step, see [Creating and configururing the Zowe instance directory](../user-guide/configure-instance-directory.md#keystore-configuration).
   
The following example shows how you can configure `zowe-setup-certificates.env` file to use the existing certificates:

1. Update the value of `EXTERNAL_CERTIFICATE`. The value needs to point to a keystore in PKCS12 format that contains the certificate with its private key. The file needs to be transferred as a binary to the z/OS system.

2. Update the value of `KEYSTORE_PASSWORD`. The value is a password to the PKCS12 keystore specified in the `EXTERNAL_CERTIFICATE` variable.
    
3. Update the value of `EXTERNAL_CERTIFICATE_ALIAS` to the alias of the server certificate in the keystore.
   
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
   In this case, the alias can be found in `Alias name: apiml`. Therefore, set `EXTERNAL_CERTIFICATE_ALIAS=apiml`.
      
4. Update the value of `EXTERNAL_CERTIFICATE_AUTHORITIES` to the path of the public certificate of the certificate authority that has signed the certificate. You can add additional certificate authorities separated by spaces (specify the complete value **in quotes**). This can be used for certificate authorities that have signed the certificates of the services that you want to access via the API Mediation Layer.

5. (Optional) If you have trouble getting the certificates and you want only to evaluate Zowe, you can switch off the certificate validation by setting `VERIFY_CERTIFICATES=false`. The HTTPS will still be used but the API Mediation Layer will not validate any certificate.

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
EXTERNAL_CERTIFICATE_AUTHORITIES="/path/to/cacert_1.cer /path/to/cacert_2.cer"
# Select a password that is used to secure EXTERNAL_CERTIFICATE keystore and 
# that will be also used to secure newly generated keystores for API Mediation
KEYSTORE_PASSWORD=mypass
```

You may encounter the following message:

```
apiml_cm.sh --action trust-zosmf has failed. See $LOG_FILE for more details
ERROR: z/OSMF is not trusted by the API Mediation Layer. Make sure ZOWE_ZOSMF_HOST and ZOWE_ZOSMF_PORT variables define the desired z/OSMF instance.
ZOWE_ZOSMF_HOST=${ZOWE_ZOSMF_HOST}   ZOWE_ZOSMF_PORT=${ZOWE_ZOSMF_PORT}
You can also specify z/OSMF certificate explicitly in the ZOSMF_CERTIFICATE environmental variable in the zowe-setup-certificates.env file.
```

This error has to be resolved before you can proceed with the next installation step.

**Notes:** 

- On many z/OS systems, the certificate for z/OSMF is not signed by a trusted CA and is a self-signed certificate by the z/OS system programmer who configured z/OSMF.  If that is the case, then Zowe itself will not trust the z/OSMF certificate and any function dependent on z/OSMF will not operate correctly.  To ensure that Zowe trusts a z/OSMF self-signed certificate, you must use the value `VERIFY_CERTIFICATES=false` in the `zowe-setup-certificates.env` file.  This is also required if the certificate is from a recognized CA but for a different host name, which can occur when a trusted certificate is copied from one source and reused within a z/OS installation for different servers other than that it was originally created for.  
