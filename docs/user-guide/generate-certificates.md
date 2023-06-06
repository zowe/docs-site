# Generate a certificate if you do not have a certificate

If you do not have a certificate, you can generate either of the following certificate types:
* PKCS12 certificate
* JCERACFKS certificate 

Both certificate types are self-signed certificates.
## Create a self-signed PKCS12 certificate

Use the following procedure to configure zowe.yaml and create a self-signed PKCS12 certificate:

1. [Configure the PKCS12 setup section in zowe.yaml](#configure-the-pkcs12-setup-section-in-zoweyaml)
2. [Run the command to generate a PKCS12 certificate](#run-the-command-to-generate-a-pkcs12-certificate)
### Configure the PKCS12 setup section in zowe.yaml

For PKCS12 certificate users, customize the following parameters in the `zowe.yaml` file:

- `zowe.setup.certificate.pkcs12.directory`  
Specifies the directory where you plan to store the PKCS12 keystore and truststore. This is required if `zowe.setup.certificate.type` is PKCS12.
- `zowe.setup.certificate.pkcs12.lock`  
 Is a boolean configuration to tell if we should lock the PKCS12 keystore directory only for Zowe runtime user and group. Default value is true.
- `zowe.setup.certificate.pkcs12`  
(Optional) Define name, password, caAlias and caPassword to customize the keystore and truststore. It is recommended to update these values from the default values.  
**Note:** Alias names should be all in lower case.
- `dname`  
 (Optional) Specifies the distinguished name. Domain names and IPs should be added into certificate SAN. If the field `san` is not defined, the `zwe init` command uses `zowe.externalDomains`. 


**Example:**  

The following `zowe.yaml` example generates the following artifacts:

 - A `PKCS12` certificate, specified in `zowe.setup.certificate.type`
 - A keystore directory `/var/zowe/keystore`, specified in  `zowe.setup.certificate.pkcs12.directory`.
 - A certificate name (or alias) `localhost`, specified in `zowe.setup.certificate.pkcs12.name`  
 - A certificate authority name `local_ca`, specified in `zowe.setup.certificate.certificate.pkcs12.caAlias`

```
zowe:
  setup:
    certificate:
      type: PKCS12
        directory: /var/zowe/keystore
        lock: true
        name: localhost
        password: password
        caAlias: local_ca
        caPassword: local_ca_password
      dname:
        caCommonName: ""
        commonName: ""
        orgUnit: ""
        org: ""
        locality: ""
        state: ""
        country: ""
      validity: 3650
      san:
        - dvipa.my-company.com
        - 12.34.56.78
```

To assist with updating `zowe.yaml`, the values to generate a self-signed PKCS12 certificate are included in the section beginning with`# >>>> Certificate setup scenario 1`. Other certificate scenarios lower down in the `zowe.yaml` file are commented out.

### Run the command to generate a PKCS12 certificate

The `zwe init certificate` command generates a certificate based on `zowe.yaml` values in the `zowe.setup.certificate` section. These certificate values used at runtime are referenced in the  `zowe.certificates` section in the `zowe.yaml` file. Specify `--update-config` for the `zwe` command. This setting updates the runtime `zowe.certificates` section to reference the generated certificate generated from the `zowe.setup.certificate`.

The following command output shows the generation of a self-signed PKCS12 certificate using the default values, and has the following associated artifacts: 

**Note:**  
Some detailed output messages have been omitted.

- The CA is created.
- The keystore is created and the CA is added to the keystore.
- The certificate is createed and is added to the keystore.
- The truststore is created. 
- Directory permissions are changed to restrict access to the private key.

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

Values of the `zowe.certificates` section are updated with customization of `--update-config` to reference the newly generated certificate. These updates are logged by the `zwe init certificate` command output.

Open the `zowe.yaml` file to check the references to the newly generated certificate values, as shown in the following code snippet:

```
  certificate:
    keystore:
      type: PKCS12
      file: /var/zowe/keystore/localhost/localhost.keystore.p12
      password: password
      alias: localhost
    truststore:
      type: PKCS12
      file: /var/zowe/keystore/localhost/localhost.truststore.p12
      password: password
    pem:
      key: /var/zowe/keystore/localhost/localhost.key
      certificate: /var/zowe/keystore/localhost/localhost.cer
      certificateAuthorities: /var/zowe/keystore/local_ca/local_ca.cer
```

For details about the certificate you generated, run the following command:  
 `keytool -v -list keystore localhost.keystore.p12`  
For more information about additional commands to manage a keystore, see the [keytool documentation](https://docs.oracle.com/en/java/javase/11/tools/keytool.html).

### Next steps after PKCS12 setup

When using a self-signed certificate, you will be challenged by your browser when logging in to Zowe to accept Zowe's untrusted certificate authority. Depending on the browser you are using there are different ways to proceed. See next steps about how to [import the PKCS12 certificate to your brower](./import-certificates#import-your-pkcs12-certificate).

## Create a self-signed JCERACFKS certificate

Use the following procedure to configure zowe.yaml and create a self-signed PKCS12:

1. [Configure the JCERACFKS setup section in zowe.yaml](#configure-the-jceracfks-setup-section-in-zoweyaml)
2. [Run the command to generate a JCERACFKS certificate](#run-the-command-to-generate-a-jceracfks-certificate)
### Configure the JCERACFKS setup section in zowe.yaml

For JCERACFKS certificate (z/OS keyring) users, customize the following parameters in the `zowe.yaml` file:

- `zowe.setup.certificate.keyring.owner` is the keyring owner. It's optional and default value is `zowe.setup.security.users.zowe`. If it's also not defined, the default value is ZWESVUSR.
- `zowe.setup.certificate.keyring.name`  
 Specifies the keyring name to be created on z/OS. This is required if `zowe.setup.certificate.type` is `JCERACFKS`.

The following `zowe.yaml` example generates the following artifacts:

 - A `JCERACFKS` certificate, specified in `zowe.setup.certificate.type`
 - A key ring named `ZoweKeyring` specified in  `zowe.setup.certificate.keyring.name`
 - A certificate with the label `localhost` specified in `zowe.setup.certificate.keyring.label`  
 - A certificate authority with the label `localca` specified in  `zowe.setup.certificate.keyring.caLabel` with a common name `Zowe Service CA`

**Example:**
```
zowe:
  setup:
    certificate:
      type: JCERACFKS
      createZosmfTrust: true
      keyring:
        name: ZoweKeyring
        label: localhost
        caLabel: localca
      dname:
        caCommonName: ""
        commonName: ""
        orgUnit: ""
        org: ""
        locality: ""
        state: ""
        country: ""
      validity: 3650
      san:
        - dvipa.my-company.com
        - 12.34.56.78
```

**Notes:** 

- Alias names should be all lower cases.
- The name and lables shown above are the default value in `zowe.yaml`.
- `dname` for distinguished name is all optional.
- Domain names and IPs should be added into certificate SAN. If the field `san` is not defined, the `zwe init` command will use `zowe.externalDomains`. The value for the `san` parameter presented in the example is for demonstration purposes.

To assist with updating `zowe.yaml`, the values to generate a self-signed PKCS12 certificate are included in the section beginning with` # >>>> Certificate setup scenario 3`. Other certificate scenarios in the `zowe.yaml` file are commented out.

### Run the command to generate a JCERACFKS certificate

The following command output shows the generation of a self-signed JCERACFKS certificate using the default values. Some detailed output messages have been omitted.

When the command is run, a customized JCL member name is created in the `CUST.JCLLIB` data set. The PDS name is defined in the `zowe.setup.dataset.jcllib` property. In the following example, the PDS meember `USER.ZWEV2.CUST.JCLLIB(ZW101431)` is created that contains the security manager commands, and then submitted as a job ID: `ZWEKRING(JOB03054)`.  

**Example:**
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
**Notes:**  
* As shown in the example, the job ends with code `0`. There may, however, be failures in the individual steps. It is advised to check the job output. The security manager commands in the job are generated based on the value of `zowe.security.product`. Job steps for each product can be determined by the security manager.  

* The runtime configuration section of `zowe.yaml` is updated to match the values in the generated keystore, certificate, and certificate authority resulting from the specification of the `--update-config` parameter. 

* `zowe.certificate.keystore.password` has a hardcoded password value. However, if you are using `type: PKCS12`, the password field must be the real password.

**YAML example:**
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

### Next steps after JCERACFKS setup

For more information about how to use your JCERACFKS certificate, see [Use JCERACFKS certificates](./use-certificates#use-jceracfks-certificates).
