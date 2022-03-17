# Configuring JCERACFS certificates in a key ring

Zowe is able to work with certificates held in a **z/OS Keyring**.  

The JCL member `.SZWESAMP(ZWEKRING)` contains the security commands to create a keyring named ``ZoweKeyring` and manage the certificate and certificate authoritie (CA) used by Zowe's servers to encrypt TLS communications.  The JCL contains commands for three z/OS security managers: RACF, TopSecret, and ACF/2.

There are two ways to configure and submit `ZWEKRING`.

- Customize and submit the `ZWEKRING` JCL member.
- Customize the `zowe.setup.certificate` section in `zowe.yaml` and use the `zwe init certificate` command. 

If you use the `zwe init certificate` command this will prepare a customized JCL member using `ZWEKRING` as a template.  

A number of keytring scenarios are supported

- Creation of a local certificate authority (CA) which is used to sign a locally generated certificate, both of which are placed into the `ZoweKeyring`.
- Importing an existing certificate already held in z/OS to the `ZoweKeyring` for use by Zowe.  
- Creation of a locally generated certificated and signing it with an existing certificate authority, and placing the certificate into the key ring. 

### Create a certificate authority and use it to self sign a certificate

The `zwe init security` command takes its input from the `zowe.setup.security` section in `zowe.yaml`.  To help with customizing the file there are five sections in the file 

## Create a self signed JCERACFKS certificate

The following `zowe.yaml` example will generate:

 - A `JCERACFKS` certificate, specified in `zowe.setup.certificate.type` 
 - A keyring named `ZoweKeyring` specified in  `zowe.setup.certificate.keyring.name`. 
 - A certificate with the label `localhost` specified in `zowe.setup.certificate.keyring.label`  
 - A certificate authority with the label `localca` specified in  `zowe.setup.certificate.keyring.caLabel` with a common name `Zowe Service CA`.

```
zowe
  init
    certificate:
      # Type of certificate storage. Valid values are: PKCS12 or JCERACFKS
      type: JCERACFKS
      keyring:
        name: Zowe Keyring
        label: localhost
        caLabel: localca
      dname:
        caCommonName: Zowe Service CA
        commonName:
        orgUnit:
        org:
        locality:
        state:
        country:
      validity: 3650
```

The follow command output shows generation of a self signed JCERACFKS certificate using the default values.  Some detailed output messages have been omitted.

When the command is run a customized JCL member name in created the `CUST.JCLLIB` data set.  The PDS name is defined in the `zowe.setup.dataset.jcllib` property.  In the sample below the PDS meember `WINCHJ.ZWEV2.CUST.JCLLIB(ZW101431)` is created that contains the security manager commands and then submitted as a job ID `ZWEKRING(JOB03054)`.  

```
#>zwe init certificate -c ./zowe.yaml --update-config
-------------------------------------------------------------------------------
>> Generate Zowe certificate in keyring

>>>> Modify ZWEKRING
    - IBMUSER.ZWEV2.CUST.JCLLIB(ZW101431) is prepared
>>>> Submit IBMUSER.ZWEV2.CUST.JCLLIB(ZW101431)
    - Job ZWEKRING(JOB03054) ends with code 0 (COMPLETED).
>> Certificate is generated in keyring successfully.

-------------------------------------------------------------------------------
>> Update certificate configuration to ./zowe.yaml
>> Zowe configuration is updated successfully.

#>
```

Even though the job ends with code 0 there may be failures in the individual steps.  It is advised to check the job output.  The security manager commands in the job will be generated based on the value of `zowe.security.product`, and the job steps for each product are broken apart by security manager.  

Because the `--update-config` parmarater was specified the runtime configuration section of `zowe.yaml` is updated to match the values to the generated keystore, certificate, and certificate authority.  

```
zowe
  certificate:
    keystore:
      alias: localhost
      password:
      file: safkeyring:////ZWESVUSR/ZoweKeyring
      type: JCERACFKS
    truststore:
      type: JCERACFKS
      file: safkeyring:////ZWESVUSR/ZoweKeyring
      password:
    pem:
      key:
      certificate:
      certificateAuthorities: safkeyring:////ZWESVUSR/ZoweKeyring&localca
```

