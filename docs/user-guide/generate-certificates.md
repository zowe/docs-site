# Generate a certificate if you don't have a certificate

## Create a self-signed PKCS12 certificate 

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

## Create a self signed JCERACFKS certificate

The following `zowe.yaml` example will generate:

 - A `JCERACFKS` certificate, specified in `zowe.setup.certificate.type` 
 - A keyring named `ZoweKeyring` specified in  `zowe.setup.certificate.keyring.name`. 
 - A certificate with the label `localhost` specified in `zowe.setup.certificate.keyring.label`  
 - A certificate authority with the label `localca` specified in  `zowe.setup.certificate.keyring.caLabel` with a common name `Zowe Service CA`.

```
zowe:
  setup:
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

When the command is run a customized JCL member name in created the `CUST.JCLLIB` data set.  The PDS name is defined in the `zowe.setup.dataset.jcllib` property.  In the sample below the PDS meember `USER.ZWEV2.CUST.JCLLIB(ZW101431)` is created that contains the security manager commands and then submitted as a job ID `ZWEKRING(JOB03054)`.  

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

Because the `--update-config` parameter was specified the runtime configuration section of `zowe.yaml` is updated to match the values to the generated keystore, certificate, and certificate authority.  
Note: `zowe.certificate.keystore.password` has a hardcoded password field. However, if you are using `type: PKCS12`, the password field must be the real password.

```
zowe:
  certificate:
    keystore:
      alias: localhost
      password: 'password'
      file: safkeyring://ZWESVUSR/ZoweKeyring
      type: JCERACFKS
    truststore:
      type: JCERACFKS
      file: safkeyring://ZWESVUSR/ZoweKeyring
      password:
    pem:
      key:
      certificate:
      certificateAuthorities: safkeyring://ZWESVUSR/ZoweKeyring&localca
```
