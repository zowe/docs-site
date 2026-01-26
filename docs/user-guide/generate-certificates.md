
# Generating a certificate  

If you do not have a certificate, follow the procedure in this article that corresponds to the certificate type you choose to generate.

:::info Required roles: system programmer, security administrator
:::

Choose from the following certificate types:

* [Creating a PKCS12 certificate](#creating-a-pkcs12-keystore)
* [Creating a JCERACFKS certificate](#creating-a-jceracfks-certificate)

Both certificate types are self-signed certificates.

## Creating a PKCS12 keystore

Use can create PKCS12 certificates that are stored in USS. This certificate is used for encrypting TLS communication between Zowe clients and Zowe z/OS servers, as well as z/OS Zowe server to server communication. Zowe uses a keystore directory to contain its external certificate, and a truststore directory to hold the public keys of servers it communicate with (for example z/OSMF).

Follow these steps to generate a PKCS12 keystore:

1. [Configure the PKCS12 setup section in zowe.yaml](#configure-the-pkcs12-setup-section-in-zoweyaml)
2. [Run the command to generate a PKCS12 keystore](#run-the-command-to-generate-a-pkcs12-keystore)


### Next steps after PKCS12 setup

When using a Zowe-generated certificate, you will be challenged by your browser when logging in to Zowe to accept Zowe's untrusted certificate authority. Depending on the browser you are using, there are different ways to proceed. See next steps about how to [import the PKCS12 certificate to your browser](./import-certificates.md).

## Creating a JCERACFKS certificate

You can create a JCERACFKS certificate for use in a z/OS keystore. JCERACFKS uses SAF and RACF services to protect key material and certificates.

Use the following procedure to configure the `zowe.yaml` file for JCERACFKS certificates:

1. [Configure the JCERACFKS setup section in zowe.yaml](#configure-the-jceracfks-setup-section-in-zoweyaml)
2. [Run the command to generate a JCERACFKS certificate](#run-the-command-to-generate-a-jceracfks-certificate)

To assist with updating `zowe.yaml`, see the example yaml in [Scenario 3: Use a z/OS keyring-based keystore with Zowe generated certificates](certificate-configuration-scenarios.md#scenario-3-use-a-zos-keyring-based-keystore-with-zowe-generated-certificates) in the article Certificate configuration scenarios.
### Configure the JCERACFKS setup section in zowe.yaml

For JCERACFKS certificate (z/OS key ring) users, customize the following parameters in the `zowe.yaml` file:

| Parameter | Description |
| ---------- | ----------- |
| `zowe.setup.certificate.keyring.owner` | The key ring owner. This parameter is optional and the default value is `zowe.setup.security.users.zowe`. If this parameter is not defined, the default value is ZWESVUSR.|
| `zowe.setup.certificate.keyring.name`  | Specifies the key ring name to be created on z/OS. This parameter is required if `zowe.setup.certificate.type` is `JCERACFKS`.|

The following `zowe.yaml` example generates the following artifacts:

 - A `JCERACFKS` certificate, specified in `zowe.setup.certificate.type`.
 - A key ring named `ZoweKeyring` specified in  `zowe.setup.certificate.keyring.name`.
 - A certificate with the label `localhost` specified in `zowe.setup.certificate.keyring.label`.  
 - A certificate authority with the label `localca` specified in  `zowe.setup.certificate.keyring.caLabel` with a common name `Zowe Service CA`.

**Example `zowe.yaml` file using a JCERACFKS certificate:**
```yaml
zowe:
  setup:
    certificate:
      type: JCERACFKS
      createZosmfTrust: true
      keyring:
        name: ZoweKeyring   
        label: localhost   # Optional, default value is localhost.
        caLabel: localca   # Optional, default value is localca.
      dname:   # Distinguished name for Zowe generated certificates. All optional.
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

:::note Notes:
- Alias names should be all lower cases.
- The name and labels shown above are the default value in `zowe.yaml`.
- `dname` for distinguished name is all optional.
- Domain names and IPs should be added to the certificate SAN. If the field `san` is not defined, the `zwe init` command will use `zowe.externalDomains`. The value for the `san` parameter presented in the example is for demonstration purposes.
:::

### Run the command to generate a JCERACFKS certificate

After you configure the `zowe.yaml`, use the following procedure to generate a JCERACFKS certificate.

1. Log in to your system. In this example, run `ssh dvipa.my-company.com` with your password.

2. Run the following command in the directory with this `zowe.yaml` in terminal to generate the certificate and update the configuration values in `zowe.yaml`.

   `zwe init certificate -c <path-to-your-zowe-configuration-yaml> --update-config`

    When the command is run, a customized JCL member name is created in the `CUST.JCLLIB` data set. The PDS name is defined in the `zowe.setup.dataset.jcllib` property. In the following example output, the PDS member `USER.ZWE3.CUST.JCLLIB(ZW101431)` is created that contains the security manager commands, and then submitted as a job ID: `ZWEKRING(JOB03054)`.

The following command output shows the generation of a JCERACFKS certificate using the default values. Note that some detailed output messages have been omitted.

**Command output:**
```
#>zwe init certificate -c <path-to-your-zowe-configuration-yaml> --update-config
-------------------------------------------------------------------------------
>> Generate Zowe certificate in keyring

>>>> Modify ZWEKRING
    - IBMUSER.ZWEV3.CUST.JCLLIB(ZW101431) is prepared
>>>> Submit IBMUSER.ZWEV3.CUST.JCLLIB(ZW101431)
    - Job ZWEKRING(JOB03054) ends with code 0 (COMPLETED).
>> Certificate is generated in keyring successfully.

-------------------------------------------------------------------------------
>> Update certificate configuration to <path-to-your-zowe-configuration-yaml>
>> Zowe configuration is updated successfully.

#>
```

:::tip  
As shown in the example, the job ends with code `0`. There may, however, be failures in the individual steps. It is advised to check the job output. The security manager commands in the job are generated based on the value of `zowe.security.product`. Job steps for each product can be determined by the security manager.  
:::

3. Open the `zowe.yaml` file to check the references to the newly generated certificate values. Because the `--update-config` parameter was specified, the runtime configuration section of zowe.yaml is updated to match the values to the generated keystore, certificate, and certificate authority. The updated section is shown in the following code snippet:

**Updated `zowe.certificate` section in `zowe.yaml`:**
```yaml
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
      password: "password"
    pem:
      key:
      certificate:
      certificateAuthorities: safkeyring://ZWESVUSR/ZoweKeyring&localca
```

:::note 
`zowe.certificate.keystore.password` has a hardcoded password value. If you are using `type: PKCS12`, the password field must be the real password.
:::

You completed the procedure to generate a JCERACFKS certificate.

### Next steps after JCERACFKS setup

For more information about how to use your JCERACFKS certificate, see [Use JCERACFKS certificates](./use-certificates.md).
