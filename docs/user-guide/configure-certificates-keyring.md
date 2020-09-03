
<!-->
<img src="../images/common/zowe-ssl.png" alt="Zowe SSL" width="700px"/> 

The `KEYSTORE_DIRECTORY` is created using the script `<ROOT_DIR>/bin/zowe-setup-certificates.sh`.  The input parameters for the script are held in a configuration file `<ROOT_DIR>/bin/zowe-setup-certificates.env` that should to be customized for each environment to match their security rules and practices.  Once the script `zowe-setup-certificates.sh` has been run and the `KEYSTORE_DIRECTORY` created in USS one, or many, instances of Zowe can use that keystore directory by specifying it in their `instance.env` variable `KEYSTORE_DIRECTORY`.  

-->

## Configuring Zowe certificates in a key ring	

The JCL member `ZWEKRING` is provided as part of the PDS sample library `SZWESAMP` delivered with Zowe.  The JCL contains the security commands to create the keyring and manage the certificates that Zowe will use.  The JCL must customized before submitting and should be reviewed by a systems programmer familiar with z/OS certificates and keyrings.

After running `ZWEKRING` successfully, the script `zowe-setup-certificates.sh` needs to be run which will create the `KEYSTORE_DIRECTORY` in USS.  Depending on how the `ZWEKRING` member has been customized the configuration file `zowe-setup-certificates.env` that is used to create the `KEYSTORE_DIRECTORY` will need to be customized.

### ZWEKRING

The `ZWEKRING` JCL helps you create a keyring containing a certificate and a local certificate authority that is used to self-sign the certificate.  Other scenarios (such as importing an existing certificate) are described in the `ZWEKRING` JCL with the commands commented out) but are currently unsupported and included in beta mode for early testing and feedback with Zowe 1.15.  If you find any issues please raise an issue at https://github.com/zowe/zowe-install-packaging/issues.  Future releases of Zowe will provide support for more keyring scenarios.  

The `PRODUCT` variable specifies the z/OS security manager.  The default is `RACF` and should be changed to `ACF2` or `TSS` if you are using Access Control Facility CA-ACF2 or CA Top Secret for z/OS as your z/OS security manager.  

```
//         SET  PRODUCT=RACF         * RACF, ACF2, or TSS
```

If you are using a security manager other than RACF you will need to comment out the RACF security commands and uncomment the commands for your security manager.  This is described more in the JCL member `ZWEKRING`

The Zowe certificate is used on the northbound edge of the API Mediation Layer to encrypt data between web browser and other client applications such as the Zowe command line interface.  These client applications will validate that the network TCP/IP address that they have accessed the encrypted data from matches the network address in the certificate.  If the address does not match the browser will not continue as it will consider the site as unsecure.  To ensure the browser is able to establish a secure connection the `HOSTNAME` and `IPADDRESS` in the `ZWEKRING` JCL member should be set to match the hostname and TCP/IP address of the Zowe API Mediation Layer.  

```
//*      * Hostname of the system where Zowe is to run
//         SET HOSTNAME=''
//*      * IP address of the system where Zowe is to run
//         SET IPADDRES=''
//*      * Keyring for the Zowe userid
```

The `ZOWERING` label is used for the name of the keyring created, which defaults to `ZoweKeyring`.  The certificate name is specified in the `LABEL` label and defaults to `localhost`.  

```
//         SET ZOWERING='ZoweKeyring'
//*      * Zowe's certificate label
//         SET    LABEL='localhost'
```

The value of the `ZOWERING` label should match the value of the `ZOWE_KEYRING` variable in the `zowe-setup-certificates.env` file.  The value of the `LABEL` label should match the value of the `KEYSTORE_ALIAS` variable in the `zowe-setup-certificates.env` file.  

The `ZWEKRING` JCL supports scenarios such as importing a certificate into the ZoweKeyring. These are in beta with Zowe 1.15 and are described in the comments in the JCL member.  

To customize the JCL, edit the JCL variables at the beginning of the JCL and carefully review and edit all the security commands that are valid for your security manager.	

<!--[//]: # "TODO keyring documentation - ZWEKRING JCL - describe what it does, describe how to work with 	
            it(self signed, externally signed certs), describe parts that could be confusing, 	
            connecting CA chain and z/osmf cert. Give an example of the keyring content" -->	

## Zowe Keyring as a trust store 

The value of the parameter `VERIFY_CERTIFICATES` in the `zowe-certificates.env` file in the `KEYSTORE_DIRECTORY` controls whether at runtime Zowe's servers validate the authenticity of any southbound certificates.  If the value is `true` then the certificate must be signed by a recognized certificate authority (CA), and if the value is `false` then self signed certificates are allowed.  This section of the keystore configuration is only required if you are using `VERIFY_CERTIFICATES=true`.  

If you have set `VERIFY_CERTIFICATES=true` then because Zowe will validate the authenticity of the z/OSMF certificate the root CA of the z/OSMF certificate must be connected with the Zowe keyring.  This is done by setting the label `ROOTZFCA`.  

```
//*      * Name/Label of the root CA of the z/OSMF certificate
//         SET ROOTZFCA=
```

 - If you are unsure of the root CA you can find it by listing the chain of the z/OSMF certificate using the following commands:

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

<!--

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

-->

When the `ZWEKRING` JCL runs successfully it will create a keyring named `ZoweKeyring` owned by `ZWESVUSR` containing the Zowe certificate (called `localhost`), the local CA (called `ZoweCert`), and the certificate used to encrypt the Json Web Token (JWT) required for single sign-on (called `jwtsecret`).  

When the `zowe-setup-certificates.sh` script executes successfully, it will generate the USS `KEYSTORE_DIRECTORY` that contains the file `zowe-certificates.env`. This file is used in the Zowe instance configuration step, see [Creating and configuring the Zowe instance directory](../user-guide/configure-instance-directory.md#keystore-configuration).  