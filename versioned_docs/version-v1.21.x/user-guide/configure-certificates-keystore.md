# Configuring Zowe certificates in UNIX files

A keystore directory is used by Zowe to hold the certificate used for encrypting communication between Zowe clients and the Zowe z/OS servers.  The keystore directory also holds the truststore used to hold public keys of any servers that Zowe trusts. When Zowe is launched, the instance directory configuration file `instance.env` specifies the location of the keystore directory. For more information, see [Creating and configuring the Zowe instance directory](configure-instance-directory.md#keystore-directory).

If you created a keystore directory from a previous release of Version 1.8 or later, you can reuse the existing keystore directory with the newer version of Zowe.

You can use the existing certificate signed by an external certificate authority (CA) for HTTPS ports in the API Mediation Layer and the Zowe Application Framework. Alternatively, you can permit the Zowe configuration script to generate a self-signed certificate by the local API Mediation CA.

If you permit the Zowe configuration to generate a self-signed certificate, be sure to import the certificates into your browser to avoid untrusted network traffic challenges. For more information, see [Import the local CA certificate to your browser](../extend/extend-apiml/api-mediation-security.md#import-the-local-ca-certificate-to-your-browser). 

**Note:** If you do not import the certificates into your browser when you access a Zowe web page, you may be challenged that the web page cannot be trusted.  Depending on the browser you are using, you may have to add an exception to proceed to the web page. Some browser versions may not accept the Zowe certificate because the certificate is self-signed and the signing authority is not recognized as a trusted source.  Manually importing the certificate into your browser ensures that the source is trusted, thereby preventing authenication challenges.  

If you have an existing server certificate that is signed by an external CA, use this certificate as your Zowe certificate. An example is a CA managed by the IT department of your company, which  already ensured that any certificates signed by that CA are trusted by browsers in your company because they have included the CA of the company in the truststore in company browsers.  This avoids the need to manually import the local CA into each browser of the client machine.  
 
To avoid requiring each browser to trust the CA that signed the Zowe certificate, you can use a public certificate authority such as _Symantec_, _Comodo_, _Let's Encrypt_, or _GoDaddy_to create a certificate. These certificates are trusted by all browsers and most REST API clients. This option, however, requires a manual process to request a certificate and may incur a cost payable to the publicly trusted CA.

We recommend that you start with the local API Mediation Layer CA for an initial evaluation.

You can use the `<RUNTIME_DIR>/bin/zowe-setup-certificates.sh` script in the Zowe runtime directory to configure certificates with the set of defined environment variables. The environment variables which act as parameters for the certificate configuration are held in the file `<RUNTIME_DIR>/bin/zowe-setup-certificates.env`. 

**Note:** In order to enable Client Authentication in your generated certificate, your server certificate must contain the `TLS Web Client Authentication (1.3.6.1.5.5.7.3.2)` value in the Extended Key Usage section. 
Additionally, the `Digital signature and/or key agreement` must be also set as an extension value in the Key Usage section. For more information, see [Key usage extentions and extended key usage](https://help.hcltechsw.com/domino/10.0.1/admin/conf_keyusageextensionsandextendedkeyusage_r.html) in the HCL Software documention.

## Generate a certificate with default values

You can generate a certificate with default values. Use a script to read the default variable values that are provided in the `<RUNTIME_DIR>/bin/zowe-setup-certificates.env` file. This script  generates the certificate signed by the local API Mediation CA and keystores in the `/global/zowe/keystore` location. To set up certificates with the default environment variables, run the following script in the Zowe runtime directory:

```shell
<RUNTIME_DIR>/bin/zowe-setup-certificates.sh
```

This script generates the keystore in `/global/zowe/keystore`.

**Note:** As z/OS installations access to this location is restricted to privileged users, ensure that this step is performed by a system programmer with site knowledge of where the certificate should be stored so that the public key is readable but and that the private key access is controlled.  

## Generate a certificate with custom values

We recommend that you review all parameters in the `zowe-setup-certificates.env` file, and customize the values for variables to meet your requirements. One example is to set your preferred location to generate certificates and keystores. 

Use the the following procedure to customize the values for variables in the `zowe-setup-certificates.env` file.

**Follow these steps:**

1. Copy the `bin/zowe-setup-certificates.env` file from the read-only location to a new 
    `<your_directory>/zowe-setup-certificates.env` location.  
    
2. Customize the values for the variables based on the descriptions that are provided in the 
    `zowe-setup-certificates.env` file. 
    
3. Execute the following command with the customized environment file:
   ```shell
    bin/zowe-setup-certificates.sh –p <your_directory>/zowe-setup-certificates.env [-l <log_directory>]
   ```
   where:
   
   * **`<your_directory>`**
   
     specifies the location of your customized environment file
     
   * **`<log-directory>`**
   
     is an optional parameter that overrides the default log output directory of `/global/zowe/logs`, if it is writable, or `~/zowe/logs`.
   
The keystore and certificates are generated based on the customized values in the `bin/zowe-setup-certificates.env` file.

The `zowe-setup-certificates.sh` command also generates the `zowe-certificates.env` file in the 
`KEYSTORE_DIRECTORY` directory. This file is used in the Zowe instance configuration step. For more information, see [Creating and configuring the Zowe instance directory](../user-guide/configure-instance-directory.md#keystore-configuration).
   
## Configure `zowe-setup-certificates.env` to use existing certificates 

The following procedure shows how to configure the `zowe-setup-certificates.env` file to use the existing certificates.

**Follow these steps:**

1. Update the value of `EXTERNAL_CERTIFICATE`. The value needs to point to a keystore in PKCS12 format that contains the certificate with its private key. The file needs to be transferred as a binary to the z/OS system.

2. Update the value of `KEYSTORE_PASSWORD`. The value is a password to the PKCS12 keystore specified in the `EXTERNAL_CERTIFICATE` variable.
    
3. Update the value of `EXTERNAL_CERTIFICATE_ALIAS` to the alias of the server certificate in the keystore.
   
    **Note:** If you do not know the certificate alias, run the following command where 
    `externalCertificate.p12` is a value of  `EXTERNAL_CERTIFICATE` in the 
    `zowe-setup-certificates.env` file.

   ```shell
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
      
4. Update the value of `EXTERNAL_CERTIFICATE_AUTHORITIES` to the path of the public certificate of the certificate authority that has signed the certificate. You can add additional certificate authorities separated by spaces. 

    **Note:**
Be sure to specify the complete value _in quotes_. This can be used for certificate authorities that have signed the certificates of the services that you want to access through the API Mediation Layer.

5. (Optional) If you have trouble getting the certificates and you want only to evaluate Zowe, you can switch off the certificate validation by setting `VERIFY_CERTIFICATES=false` and `NONSTRICT_VERIFY_CERTIFICATES=false`. This setting continues to use HTTPS, but the API Mediation Layer will not validate any certificate.

    **Important!** Switching off certificate evaluation is a non-secure setup. Please talk to your system administrator before you do so and only use these options for troubleshooting purpose.

   The following script is the part of `zowe-setup-certificates.env` file  that uses existing certificates:

    ```shell
    # Should APIML verify certificates of services it uses in strict mode - true/false
    # "strict mode" will verify if the certificates is trusted in truststore, also verify
    # if the certificate Common Name or Subject Alternate Name (SAN) match the service hostname.
    # if this value is true, NONSTRICT_VERIFY_CERTIFICATES will be ignored.
    VERIFY_CERTIFICATES=true
    # Should APIML verify certificates of services it uses in non-strict mode - true/false
    # "non-strict mode" will verify if the certificates is trusted in truststore, but
    # certificate Common Name or Subject Alternate Name (SAN) will NOT be checked.
    NONSTRICT_VERIFY_CERTIFICATES=true
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

This error must be resolved before you can proceed with the next installation step.

**Note:** 

On many z/OS systems, the certificate for z/OSMF is not signed by a trusted CA and is a self-signed certificate by the z/OS system programmer who configured z/OSMF. Based on the configuration, there is chance zowe-setup-certificates.sh may not be able to detect z/OSMF certificate and certificate authority successfully. In this case, you can define `ZOSMF_CERTIFICATE=` manually to let Zowe trust the certificate you determined.

If the certificate is from a recognized CA but for a different host name, which can occur when a trusted certificate is copied from one source and reused within a z/OS installation for different servers other than that it was originally created for. We recommended to regenerate certificates with correct `HOSTNAME=` option.

Switching off `VERIFY_CERTIFICATES`, especially `NONSTRICT_VERIFY_CERTIFICATES` is not recommended. It may expose security risks to your z/OS system.

## Using web tokens for SSO on ZLUX and ZSS

Users can use `ZWESSOTK` JCL to create a `PKCS#11` token and configure required security setup. The `ZWESSOTK` JCL is provided as part of the PDS sample library `SZWESAMP` that is delivered with Zowe.

Before you submit the JCL, you must [customize it](#customizing-the-zwessotk-jcl) and review it with a system programmer who is familiar with z/OS certificates. The JCL member contains commands for two z/OS security managers: RACF and TopSecret. Adding support of ACF/2 is a work in progress.

The `ZWESSOTK` JCL contains commands for the following scenarios:

- Defining security requirements needed by following steps and using the `PKCS#11` token.
- (Optional) Creation of a locally generated certificated can be used as JWT secret.
- Creation of `PKCS#11` token.
- Binding JWT secret certificate to the `PKCS#11` token.

### Customizing the `ZWESSOTK` JCL

To customize the `ZWESSOTK` JCL, edit the JCL variables at the beginning of the JCL and carefully review and edit all the security commands that are valid for your security manager. Review the information in this section when you customize the JCL.

#### `PRODUCT` variable

The `PRODUCT` variable specifies the z/OS security manager. The default value is `RACF`. Change the value to `ACF2` or `TSS` if you are using ACF2 or Top Secret for z/OS as your z/OS security manager.

```
//         SET  PRODUCT=RACF         * RACF, ACF2, or TSS
```

#### `JWTDSNAM` variable

If you already have a certificate you want to use as JWT secret, you can set the data set name and uncomment section `Import JWT secret` below.

#### `JWTLABEL` variable

This is the certificate label of the JWT secret. This variable has a default value of `jwtsecret`. This label name should match the value of `PKCS11_TOKEN_LABEL` in `zowe-setup-certificates.env`.

#### `SSOTOKEN` variable

This is the `PKCS#11` token name will be created by `ZWESSOTK` JCL. This token name should match the value of `PKCS11_TOKEN_NAME` in `zowe-setup-certificates.env`.


### Enabling SSO

To enable SSO, you should run `zowe-setup-certificates.sh` with values of `PKCS11_TOKEN_NAME` and `PKCS11_TOKEN_LABEL` matching what you defined in `ZWESSKTK` JCL.

If you are upgrading from an old version of Zowe, you can

  - rerun zowe-setup-certificates.sh,
  - then overwrite `KEYSTORE_DIRECTORY` in your `instance.env` to the newly generated keystore directory.

## Hints and tips

Learn about some hints and tips that you might find useful when you create certificates. 

You create the certificates by running the script `zowe-setup-certificates.sh`. You do not need to rerun the script after the first time you install Zowe, unless instructed otherwise by SMP/E HOLDDATA or the release notes for that release.

The creation of the certificates is controlled by the `zowe-setup-certificates.env` file, and you should have placed a copy of that file in your instance directory `INSTANCE_DIR`. 

1. Keystore 
   
   In your copy of the  `zowe-setup-certificates.env` file, specify the location where you want the `zowe-setup-certificates.sh` script to place the keys it generates.
   ```
   KEYSTORE_DIRECTORY=/my/zowe/instance/keystore
   ```
   By default, a keystore can be shared by all instances, which is also recommended.  The default location is `/global/zowe/keystore`. You can use a different shared location if you prefer.  The Zowe instance uses the keystore that you specify in `instance.env` in your instance directory `INSTANCE_DIR`.  This can be the shared location or you can create another keystore in a different location for that instance and use that one instead. A single, shared keystore is recommended.    

2. Hostname and IP address

   You specify the hostname and IP address with the following keywords in the `zowe-setup-certificates.env` file.
   ```
   HOSTNAME= 
   IPADDRESS=
   ```
   The certificates require the value of `HOSTNAME` to be an alphabetic hostname.  Numeric hostnames such as an IP address are not allowed.
   
   The `zowe-setup-certificates.sh` script attempts to discover the IP address and hostname of your system if you leave these unconfigured in `zowe-setup-certificates.env`.  
   
   On systems with their own internal IP domain, the hostname might not resolve to the external IP address.  This happens on ZD&T ADCD-derived systems, where the hostname is usually `S0W1.DAL-EBIS.IHOST.COM` which resolves to `10.1.1.2`.  When the script cannot determine the hostname or the external IP address, it will ask you to enter the IP address manually during the dialog.  If you have not specified a value for HOSTNAME in `zowe-setup-certificates.env`, then the script will use the given IP address as the hostname. This will fail because certificates cannot have a numeric hostname. 
   
   Therefore, you must specify an alphabetic hostname such as the following one on ZD&T systems before you run the script `zowe-setup-certificates.sh`.
   ```
   HOSTNAME=S0W1.DAL-EBIS.IHOST.COM 
   ```

   The values of `HOSTNAME` and `IPADDRESS` that the script discovered are appended to the `zowe-setup-certificates.env` file unless they were already set in that file or as shell environment variables before you ran the script.  
