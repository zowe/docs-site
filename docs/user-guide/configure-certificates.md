# Configuring Zowe certificates 

Zowe uses a certificate to encrypt data for communication across secure sockets. An instance of Zowe references a USS directory referred to as a KEYTORE_DIRECTORY which contains information about where the certificate is located.  More than one instance of Zowe can share the same KEYSTORE_DIRECTORY, which is defined by the variable `KEYSTORE_DIRECTORY` in the `instance.env` file, see [Creating and configuring the Zowe instance directory](./configure-instance-directory.md).  

## Northbound Certificate

The Zowe certificate is used by the API Mediation Layer on its northbound edge when identifying itself and encrypting https:// traffic to web browsers or REST client applications.  

## Southbound Certificate

As well as being a server, Zowe itself is a client to services on the southbound edge of its API Mediation Layer that it communicates to over secure sockets.  These southbound services use certificates to encrypt their data, and Zowe uses a trust store to store its relationship to these certificates.  The southbound services that are started by Zowe itself and run as address spaces under its `ZWESVSTC` started task (such as the API discovery service, the explorer JES REST API server) re-use the same Zowe certificate used by the API Mediation Layer on its northbound client edge.  

## Trust store

As well as Zowe using its certificates intra-address space,  to encrypt messages between its servers, Zowe uses external services on z/OS (such as z/OSMF or Zowe conformant extensions that have registered themselves with the API Mediation Layer).  These services will present their own certificate to the API Mediation Layer, in which case the trust store is used to capture the relationship between Zowe's southbound edge and these external certificates.  

If you wish to disable the trust store validation of southbound certificates the value `VERIFY_CERTIFICATES=true` can be set to `false` in the `zowe-setup-certificates.env` file in the `KEYSTORE_DIRECTORY`.  A scenario when this is recommended is if certificate being presented to the API Mediation Layer is self signed (i.e. from an unknown certificate authority).  For example, the z/OSMF certificate may be self signed in which case the Zowe API Mediation Layer will not recognize the signing authority.  


<!--
<img src="../images/common/zowe-ssl.png" alt="Zowe SSL" width="700px"/> 
-->

## Creating a KEYSTORE_DIRECTORY

The `KEYSTORE_DIRECTORY` is created using the script `<ROOT_DIR>/bin/zowe-setup-certificates.sh`.  The input parameters for the script are held in a configuration file `<ROOT_DIR>/bin/zowe-setup-certificates.env` that should to be customized for each environment to match their security rules and practices.  Once the script `zowe-setup-certificates.sh` has been run and the `KEYSTORE_DIRECTORY` created in USS one, or many, instances of Zowe can use that keystore directory by specifying it in their `instance.env` variable `KEYSTORE_DIRECTORY`.  

Zowe supports certificates being stored either in a in a USS direectory **Java KeyStore** format or else held in a **z/OS Keyring**.  

z/OS keyrings are the preferred methods for storing certificates in many environments where systems programmers will already be familiar with how to control access to the keyring.  To work with z/OS keyrings the user ID configuring Zowe needs to have elevated privileges, so the ability to work with a USS JavaKeystore is provided for scenarios such as testing or developer sandbox Zowe instances.  

- [Configuring Zowe certificates in a key ring](#configuring-zowe-certificates-in-a-key-ring)	
- [Configuring Zowe certificates in UNIX files](#configuring-zowe-certificates-in-unix-files)

<!-->
<img src="../images/common/zowe-ssl.png" alt="Zowe SSL" width="700px"/> 
-->

## Configuring Zowe certificates in a key ring	

The JCL member `ZWEKRING` is provided as part of the PDS sample library `SZWESAMP` delivered with Zowe.  The JCL contains the security commands to create the keyring and manage the certificates that Zowe will use.  The JCL must customized before submitting and should be reviewed by a systems programmer familiar with z/OS certificates and keyrings.

### ZWEKRING

The `ZWEKRING` JCL helps you create a keyring containing a certificate and a local certificate authority that is used to self-sign the certificate.  Other scenarios (such as importing an existing certificate) are described in the `ZWEKRING` JCL with the commands commented out) but are currently unsupported and included in beta mode for early testing and feedback.  If you find any issues please raise an issue at https://github.com/zowe/zowe-install-packaging/issues.  Future releases of Zowe will provide support for more keyring scenarios.  

The `PRODUCT` variable specifies the z/OS security manager.  The default is `RACF` and should be changed to `ACF2` or `TSS` if you are using Access Control Facility CA-ACF2 or CA Top Secret for z/OS as your z/OS security manager.  

```
//         SET  PRODUCT=RACF         * RACF, ACF2, or TSS
```

The Zowe certificate is used on the northbound edge of the API Mediation Layer to encrypt data between web browser and other client applications such as the Zowe command line interface.  These client applications will validate that the network TCP/IP address that they have accessed the encrypted data from matches the network address in the certificate.  If the address does not match the browser will not continue as it will consider the site as unsecure.  To ensure the browser is able to establish a secure connection the `HOSTNAME` and `IPADDRESS` in the `ZWEKRING` JCL member should be set to match the hostname and TCP/IP address of the Zowe API Mediation Layer.  

```
//*      * Hostname of the system where Zowe is to run
//         SET HOSTNAME=''
//*      * IP address of the system where Zowe is to run
//         SET IPADDRES=''
//*      * Keyring for the Zowe userid
```

```
//         SET ZOWERING='ZoweKeyring'
//*      * Zowe's certificate label
//         SET    LABEL='localhost'
```

To customize the JCL, edit the JCL variables at the beginning of the JCL and carefully review and edit all the security commands that are valid for your security manager.	

<!--[//]: # "TODO keyring documentation - ZWEKRING JCL - describe what it does, describe how to work with 	
            it(self signed, externally signed certs), describe parts that could be confusing, 	
            connecting CA chain and z/osmf cert. Give an example of the keyring content" -->	

**Important!**	

 - If you want APIML to verify certificates (for example, `VERIFY_CERTIFICATES=true` is set in the `zowe-setup-certificate.env` file), then the root CA of the z/OSMF certificate must be connected with the Zowe key ring. The ZWEKRING is ready for such a scenario.	

   You only need to set the `ROOTZFCA` variable in the ZWEKRING JCL. You can find the root CA by listing a chain of the z/OSMF certificate. For example,	
    - RACF 	
      ```	
      RACDCERT ID(IZUSVR) LISTCHAIN(LABEL('DefaultzOSMFCert.IZUDFLT'))	
      ```	
    - Top Secret	
      ```	
      TSS LIST(IZUSVR) LABLCERT('DefaultzOSMFCert.IZUDFLT') CHAIN	
      ``` 	
    - ACF2	
      ```	
      SET PROFILE(USER) DIVISION(CERTDATA)	
      CHKCERT IZUSVR LABEL(DefaultzOSMFCert.IZUDFLT) CHAIN	
      ``` 	

 - The Zowe certificate must be connected to the key ring together with its CA chain (all certificates in the chain). 	

   The ZWEKRING has two variables `ITRMZWCA` and `ROOTZWCA` and corresponding "connect to keyring" commands that support the scenario where the Zowe certificate has one intermediate CA and the root CA in its CA chain. If your Zowe certificate has no intermediate CA or has more than one intermediate CA, then you must add or remove the connecting commands accordingly.	

   To find out what the certificate's CA chain is, you can use the example commands in the previous note.	

   If Zowe certificate is self-signed or signed by the local Zowe CA, then ignore `ITRMZWCA` and `ROOTZWCA` variables. In this case, you might see error messages in the JCL related to the `ITRMZWCA` and `ROOTZWCA` variables.	


 - You can share a certificate with Zowe if the certificate is already stored in the security manager's database. Such a certificate should be owned by the special SITE ACID (CERTSITE ACID for Top Secret or SITECERT ACID for ACF2).	

   In this scenario, you must modify the "connect to keyring" security command so that it connects the SITE owned certificate to the Zowe key ring. Also, you must allow the ZWESVUSR acid to extract private key from the SITE owned certificate. You can do that by uncommenting the security command in the ZWEKRING JCL that gives ZWESVUSR CONTROL access to the `IRR.DIGTCERT.GENCERT` resource.	

After the ZWEKRING JCL successfully configures the certificates and key ring, you must customize the `zowe-setup-certificate.env` file and run the `zowe-setup-certificate.sh` script so that Zowe knows what the key ring and certificate names are. In the `zowe-setup-certificate.env` file, customize the key ring related variables:	

- `GENERATE_CERTS_FOR_KEYRING`	

   Must be set to `false` so that the `zowe-setup-certificate.sh` script does not repeat the job already done by the ZWEKRING JCL. Defaults to `false` value.	

- `VERIFY_CERTIFICATES` 	

   If set to true, the key ring must contain root CA of the z/OSMF certificate (it must be configured by the ZWEKRING JCL).	

- `KEYSTORE_ALIAS`	

   The certificate alias must match either the `LABEL` variable in the ZWEKRING JCL or the label of the certificate already stored in the security manager's database.	

- `ZOWE_USER_ID` 	

   The owner of the key ring matches the `ZOWEUSER` variable in the ZWEKRING JCL. Defaults to the `ZWESVUSR` user ID. 	

- `ZOWE_KEYRING` 	

   The key ring name matches the `ZOWERING` variable in the ZWEKRING JCL. 	

    **Warning:** If the variable is empty, then the script generates certificates to UNIX keystore files. 	


When the `zowe-setup-certificates.sh` script executes successfully, it generates the `zowe-certificates.env` file in the `KEYSTORE_DIRECTORY` directory. This file is used in the Zowe instance configuration step, see [Creating and configuring the Zowe instance directory](../user-guide/configure-instance-directory.md#keystore-configuration).	


## Configuring Zowe certificates in UNIX files

A keystore directory is used by Zowe to hold the certificate used for encrypting communication between Zowe clients and the Zowe z/OS servers.  It also holds the truststore used to hold public keys of any servers that Zowe trusts. When Zowe is launched, the instance directory configuration file `instance.env` specifies the location of the keystore directory. See [Configure instance directory](configure-instance-directory.md#keystore-directory).

If you have already created a keystore directory from a previous release of Version 1.8 or later, then you may reuse the existing keystore directory with newer version of Zowe.

You can use the existing certificate signed by an external certificate authority (CA) for HTTPS ports in the API Mediation Layer and the Zowe Application Framework, or else you can let the Zowe configuration script to generate a self-signed certificate by the local API Mediation CA.

If you let the Zowe configuration generate a self-signed certificate, the certificates should be imported into your browser to avoid untrusted network traffic challenges. See [Import the local CA certificate to your browser](../extend/extend-apiml/api-mediation-security.md#import-the-local-ca-certificate-to-your-browser).  If you do not import the certificates into your browser when you access a Zowe web page, you may be challenged that the web page cannot be trusted and, depending on the browser you are using, have to add an exception to proceed to the web page.  Some browser versions may not accept the Zowe certificate because it is self-signed and the signing authority is not recognized as a trusted source.  Manually importing the certificate into your browser makes it a trusted source and the challenges will no longer occur.  

If you have an existing server certificate that is signed by an external CA, then you use this for the Zowe certificate. This could be a CA managed by the IT department of your company, which has already ensured that any certificates signed by that CA are trusted by browsers in your company because they have included their company's CA in their company's browsers' truststore.  This will avoid the need to manually import the local CA into each client machine's browsers.  
 
If you want to avoid the need to have each browser trust the CA that has signed the Zowe certificate, you can use a public certificate authority such as Symantec, Comodo, or GoDaddy to create a certificate. These certificates are trusted by all browsers and most REST API clients. However, this option involves a manual process of requesting a certificate and may incur a cost payable to the publicly trusted CA.

We recommend that you start with the local API Mediation Layer CA for an initial evaluation.

You can use the `<ROOT_DIR>/bin/zowe-setup-certificates.sh` script in the Zowe runtime directory to configure the certificates with the set of defined environment variables. The environment variables act as parameters for the certificate configuration are held in the file `<ROOT_DIR>/bin/zowe-setup-certificates.env`. 

## Generate certificate with the default values

The script reads the default variable values that are provided in the `<ROOT_DIR>/bin/zowe-setup-certificates.env` file and generates the certificate signed by the local API Mediation CA and keystores in the `/global/zowe/keystore` location.   To set up certificates with the default environment variables, ensure that you run the following script in the Zowe runtime directory:

```shell script
<ROOT_DIR>/bin/zowe-setup-certificates.sh
```

generates the keystore in `/global/zowe/keystore`.  On many z/OS installations access to this location will be restricted to privileged users so this step should be done by a system programmer with site knowledge for where the certificate should be stored in a way that the public key can be read but private key access is controlled.  

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
`KEYSTORE_DIRECTORY` directory. This file is used in the Zowe instance configuration step, see [Creating and configuring the Zowe instance directory](../user-guide/configure-instance-directory.md#keystore-configuration).
   
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

This error must be resolved before you can proceed with the next installation step.

**Notes:** 

- On many z/OS systems, the certificate for z/OSMF is not signed by a trusted CA and is a self-signed certificate by the z/OS system programmer who configured z/OSMF.  If that is the case, then Zowe itself will not trust the z/OSMF certificate and any function dependent on z/OSMF will not operate correctly.  To ensure that Zowe trusts a z/OSMF self-signed certificate, you must use the value `VERIFY_CERTIFICATES=false` in the `zowe-setup-certificates.env` file.  This is also required if the certificate is from a recognized CA but for a different host name, which can occur when a trusted certificate is copied from one source and reused within a z/OS installation for different servers other than that it was originally created for.  

## Using web tokens for SSO on ZLUX and ZSS

Users must create a PKCS#11 token before continuing. This can be done through the USS utility, "gskkyman".

### Creating a PKCS#11 Token

Ensure that the SO.TOKEN_NAME profile exists in CRYPTOZ, and that the user who will be creating tokens has either UPDATE or CONTROL access.

1. Define profile: "RDEFINE CRYPTOZ SO.TOKEN_NAME"
2. Add user with UPDATE access: "PERMIT SO.** ACCESS(UPDATE) CLASS(CRYPTOZ) ID(USERID)"
3. Ensure profile was created: "RLIST CRYPTOZ *"
4. Activate class with new profile: 
    - "SETROPTS RACLIST(CRYPTOZ)"
  
    - "SETROPTS CLASSACT(CRYPTOZ)" 

A user should now be able to use "gskkyman" to create a token.

### Accessing token

Ensure USER.TOKEN_NAME profile exists in CRYPTOZ:

1. Define profile: "RDEFINE CRYPTOZ USER.TOKEN_NAME"
2. Add user with READ access: "PERMIT USER.TOKEN_NAME ACCESS(UPDATE) CLASS(CRYPTOZ) ID(USERID)"
3. Ensure profile was created: "RLIST CRYPTOZ *"
4. Activate class with new profile: 

    - "SETROPTS RACLIST(CRYPTOZ)"

    - "SETROPTS CLASSACT(CRYPTOZ)"

Configure zowe-setup-certifcates.env using the following parameters. Both are required to enable SSO.

- PKCS#11 token name for SSO. Must already exist.

  `PKCS11_TOKEN_NAME=<newly created token name>`

- PKCS#11 token label for SSO. Must not already exist.

  `PKCS11_TOKEN_LABEL=<unique label>`

### Enabling SSO

1. Run zowe-setup-certificates.sh. 

    - If you are upgrading from an older of version of Zowe that has the apiml configured: "rerun zowe-setup-certificates.sh"

    - If upgrading, point the zowe instance to the newly generated keystore, or overwrite the previous one.

2. In the ZSS server configuration, enable SSO and input your token name/label:

```

"agent": {

  //host is for zlux to know, not zss

  "host": "localhost",

  "http": {

   "ipAddresses": ["0.0.0.0"],

   "port": 0000

  },

  "jwt": {

   "enabled": true,

   "fallback": false,

   "key": {

​    "token": "TOKEN.NAME",

​    "label": "KEY_NAME"

   }

  },

 },

```

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
   
   On systems with their own internal IP domain, the hostname might not resolve to the external IP address.  This happens on ZD&T ADCD-derived systems, where the hostname is usually `S0W1.DAL-EBIS.IHOST.COM` which resolves to `10.1.1.2`.  When the script cannot determine the hostname or the external IP address, it will ask you to enter the IP address manually during the dialog.  If you have not specified a value for HOSTNAME in `zowe-setup-certificates.env`, then the script will use the given IP address as the hostname. This will fail, because certificates cannot have a numeric hostname. 
   
   Therefore, you must specify an alphabetic hostname such as the following one on ZD&T systems before you run the script `zowe-setup-certificates.sh`.
   ```
   HOSTNAME=S0W1.DAL-EBIS.IHOST.COM 
   ```

   The values of HOSTNAME and IPADDRESS that the script discovered are appended to the `zowe-setup-certificates.env` file unless they were already set in that file or as shell environment variables before you ran the script.  
