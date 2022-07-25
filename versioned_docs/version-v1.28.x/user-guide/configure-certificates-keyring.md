# Configuring Zowe certificates in a key ring

Zowe is able to work with certificates held in a **z/OS Keyring**.  For background on Zowe certificates, see [Configuring Zowe certificates](./configure-certificates.md). To configure Zowe certificates in a key ring, run the `ZWEKRING` JCL that contains the security commands to create the key ring and manage the certificates that Zowe will use. The `ZWEKRING` JCL is provided as part of the PDS sample library `SZWESAMP` that is delivered with Zowe. 

Before you submit the JCL, you must [customize it](#customizing-the-zwekring-jcl) and review it with a system programmer who is familiar with z/OS certificates and key rings. The JCL member contains commands for three z/OS security managers: RACF, TopSecret, and ACF/2.

The `ZWEKRING` JCL contains commands for three scenarios:

- Creation of a local CA which is used to sign a locally generated certificate, both of which are placed into the key ring.
- Importing an existing certificate already held in z/OS to the key ring for use by Zowe. 
- Creation of a locally generated certificated and signing it with an existing certificate authority, and placing the certificate into the key ring. 


After you run the `ZWEKRING` JCL, a keyring named `ZoweKeyring` containing the Zowe certificate is created.  In order for a Zowe instance to work with the keystore certificate, you also need to create a USS keystore directory.  This USS keystore directory does not contain any certificates, but is required for the Zowe [instance.env](./configure-instance-directory#keystore-configuration) file to configure the Zowe shell correctly so that the keystore certificate can be located by the Zowe runtime. 

To create the USS keystore directory after successfully running `ZWEKRING` JCL member, run the script `<RUNTIME_DIR>/bin/zowe-setup-certificates.sh`. This script has an input parameter `-p` which specifies the location of a configuration file controlling how and where the directory and its contents are created.  Copy the file `<RUNTIME_DIR>/bin/zowe-setup-certificates.env` to a writeable location and review and edit its contents to match property values used in `ZWEKRING` JCL member.  Then, run the script by using the following command:

```.sh
zowe-setup-certificates.sh -p <path to zowe-setup-keyring-certificates.env>
```

Watch this end to end [video](https://youtu.be/PGpXaje4DJk) for the top down scenario, where a RACF certificate authority is generated and used to self-sign Zowe's certificate, both of which are held in the `ZoweKeyring`.  

<iframe class="embed-responsive-item" id="youtubeplayer" title="Generate a self-signed certificate in a RACF keyring" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/PGpXaje4DJk" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"> </iframe>

[Download the script](/Zowe_configuration_self_signed_keyring_certificate.txt)

## Customizing the ZWEKRING JCL

To customize the `ZWEKRING` JCL, edit the JCL variables at the beginning of the JCL and carefully review and edit all the security commands that are valid for your security manager. Review the information in this section when you customize the JCL. 

### `PRODUCT` variable

The `PRODUCT` variable specifies the z/OS security manager.  The default value is `RACF`. Change the value to `ACF2` or `TSS` if you are using ACF2 or Top Secret for z/OS as your z/OS security manager.  

```
//         SET  PRODUCT=RACF         * RACF, ACF2, or TSS
```

### `HOSTNAME` and `IPADDRESS`

The Zowe certificate is used on the northbound edge of the API Mediation Layer to encrypt data between web browser and other client applications such as the Zowe command line interface. These client applications will validate that the network TCP/IP address that they have accessed the encrypted data from matches the network address in the certificate.  If the address does not match, the browser will not continue as it will consider the site as unsecure.  

To ensure that the browser is able to establish a secure connection, set the `HOSTNAME` and `IPADDRESS` in the `ZWEKRING` JCL member to match the hostname and TCP/IP address of the Zowe API Mediation Layer.  

```
//*      * Hostname of the system where Zowe is to run
//         SET HOSTNAME=''
//*      * IP address of the system where Zowe is to run
//         SET IPADDRES=''
//*      * Keyring for the Zowe userid
```

### `ZOWERING` and `LABEL` labels

The `ZOWERING` label is used for the name of the key ring created. The default value is `ZoweKeyring`.  The `LABEL` label specifies the certificate name and defaults to `localhost`.  

```
//         SET ZOWERING='ZoweKeyring'
//*      * Zowe's certificate label
//         SET    LABEL='localhost'
```

- The value of the `ZOWERING` label should match the value of the `ZOWE_KEYRING` variable in the `zowe-setup-keyring-certificates.env` file.  
- The value of the `LABEL` label should match the value of the `KEYSTORE_ALIAS` variable in the `zowe-setup-keyring-certificates.env` file.  

### `ROOTZFCA` label

<!--Configuring Zowe key ring as a trust store -->

The `ROOTZFCA` label connects the root CA of the z/OSMF certificate with the Zowe key ring. 

**When to set this label?** 

The value of the parameter `VERIFY_CERTIFICATES` and `NONSTRICT_VERIFY_CERTIFICATES` in the `zowe-certificates.env` file in the `KEYSTORE_DIRECTORY` controls whether Zowe's servers validate the authenticity of any southbound certificates at runtime.  If the `NONSTRICT_VERIFY_CERTIFICATES` value is `true`, then the certificate must be signed by a recognized certificate authority (CA), and if the value is `false` then Zowe services will not validate authenticity of the certificate.  If the `VERIFY_CERTIFICATES` value is `true`, beyond the validation of `NONSTRICT_VERIFY_CERTIFICATES`, Zowe will also validate if the certificate "Common Name" or "Subject Alternate Name" (SAN) matches the domain name. This section of the keystore configuration is only required if you are using `VERIFY_CERTIFICATES=true` or `NONSTRICT_VERIFY_CERTIFICATES=true`.  

When you set `VERIFY_CERTIFICATES=true` or `NONSTRICT_VERIFY_CERTIFICATES=true`, then Zowe will validate the authenticity of the z/OSMF certificate, so the root CA of the z/OSMF certificate must be connected with the Zowe key ring. You can connect them by setting the label `ROOTZFCA`.  

```
//*      * Name/Label of the root CA of the z/OSMF certificate
//         SET ROOTZFCA=
```

If you are unsure of the root CA you can find it by listing the chain of the z/OSMF certificate using the following commands:

- RACF 	
   ```	
   RACDCERT ID(IZUSVR) LISTCHAIN(LABEL('DefaultzOSMFCert.IZUDFLT'))
   ```

   You can use the `CERTAUTH` certificate label as the value of `ROOTZFCA`.
- Top Secret	
   ```
   TSS LIST(IZUSVR) LABLCERT('DefaultzOSMFCert.IZUDFLT') CHAIN
   ```

   If you see a line like `DIGICERT = ZOSMFCA          ACCESSORID = CERTAUTH`, you should use `CERTAUTH` record ID `ZOSMFCA` as the value of `ROOTZFCA`.
- ACF2	
   ```	
   SET PROFILE(USER) DIVISION(CERTDATA)
   CHKCERT IZUSVR LABEL(DefaultzOSMFCert.IZUDFLT) CHAIN
   ```

   You should use `CERTAUTH` record ID as the value of `ROOTZFCA`.

<!--

 - The Zowe certificate must be connected to the key ring together with its CA chain (all certificates in the chain). 	

   The ZWEKRING has two variables `ITRMZWCA` and `ROOTZWCA` and corresponding "connect to keyring" commands that support the scenario where the Zowe certificate has one intermediate CA and the root CA in its CA chain. If your Zowe certificate has no intermediate CA or has more than one intermediate CA, then you must add or remove the connecting commands accordingly.	

   To find out what the certificate's CA chain is, you can use the example commands in the previous note.	

   If Zowe certificate is self-signed or signed by the local Zowe CA, then ignore `ITRMZWCA` and `ROOTZWCA` variables. In this case, you might see error messages in the JCL related to the `ITRMZWCA` and `ROOTZWCA` variables.	


 - You can share a certificate with Zowe if the certificate is already stored in the security manager's database. Such a certificate should be owned by the special SITE ACID (CERTSITE ACID for Top Secret or SITECERT ACID for ACF2).	

   In this scenario, you must modify the "connect to keyring" security command so that it connects the SITE owned certificate to the Zowe key ring. Also, you must allow the ZWESVUSR acid to extract private key from the SITE owned certificate. You can do that by uncommenting the security command in the ZWEKRING JCL that gives ZWESVUSR CONTROL access to the `IRR.DIGTCERT.GENCERT` resource.	

After the ZWEKRING JCL successfully configures the certificates and key ring, you must customize the `zowe-setup-keyring certificate.env` file and run the `zowe-setup-certificate.sh` script so that Zowe knows what the key ring and certificate names are. In the `zowe-setup-keyring-certificate.env` file, customize the key ring related variables:	

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

## Results

When the `ZWEKRING` JCL runs successfully, it will create a key ring named `ZoweKeyring` owned by `ZWESVUSR` containing the following: 
- The Zowe certificate (called `localhost`)
- The local CA (called `ZoweCert`)

When the `zowe-setup-certificates.sh` script executes successfully, it will generate the USS `KEYSTORE_DIRECTORY` that contains the file `zowe-certificates.env`. This file is used in the Zowe instance configuration step. See [Creating and configuring the Zowe instance directory](../user-guide/configure-instance-directory.md#keystore-configuration).

## Cleanup

The JCL member `ZWENOKYR` provided in the PDS sample library `SZWESAMP` contains the inverse commands contained in `ZWEKKRING`. This allows an environment to be cleaned up and have one or more certificates, key rings, and certificate authorities created by `ZWEKRING` removed from the z/OS environment.  This is useful if you are creating a DevOps pipeline to install and configure and environment for Zowe using `ZWEKRING` and want to clean that environment before rerunning the pipeline.
