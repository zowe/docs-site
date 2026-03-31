# Finalize certificate configuration
<!-- TODO: add more about certificate pre-flight checks when they're added -->
Once you have your certificates prepared and loaded in either a z/OS key ring or a USS keystore and truststore, you can finish configuring certificates with Zowe.

Follow the procedure described in this article according to your requirements to finalize and review your Zowe certificate configuration.

:::info Required roles: system programmer, security administrator
:::

## Configuring certificates

If you have followed the [Zowe assisted certificate setup](./certificates-configuration-scenarios.md), using the `--update-config` option with the `zwe init certificate` command automatically populates the `zowe.certificate` section with the correct information. Review this information and ensure it is correct.

If you did not use the `--update-config` option, or are bringing your own certificates, follow the next sections to customize the `zowe.certificate` section in your `zowe.yaml` according to the configuration type you are using.

### Configuring PKCS12 certificates

Customize the `zowe.certificate` section in your `zowe.yaml` file with your PKCS12 certificates.

1. Follow this template to add the required values for configuration:

```yaml
zowe:
  # ... you have other fields before certificate
  certificate:
    keystore:
      type: PKCS12
      file: /path/to/your/keystore.p12
      # the password to your keystore
      password: password
      # alias is the name of your key/cert
      alias: my_cert_in_keystore_label
    truststore:
      # truststore can have the same values as keystore (minus alias), but can be a separate truststore if desired.
      # This example shows a separate truststore definition.
      type: PKCS12
      file: /path/to/your/truststore.p12
      # the password to your truststore 
      password: password
    pem:
      key: /path/to/your/cert.key
      certificate: /path/to/your/cert.cer
      certificateAuthorities: /path/to/your/cert_authority.cer
```

2. Confirm that all the values you provided are correct: 
    * The keystore, truststore, and certificates exist in their stated locations.
    * The passwords to the keystore and truststore are accurate.
    * The certificate alias is correct and exists in the provided keystore.
    * All file locations are accessible by your Zowe runtime user. 

3. Starting Zowe performs another series of verifications against your configuration. If there are any problems, error messages are included in the job output.


### Configuring key ring certificates

Customize the `zowe.certificate` section in your `zowe.yaml` file with your key ring certificates.

1. Follow this template to add the required values for configuration:

:::note NOTES
    - If you are using AT-TLS with Zowe, consult the [Enabling AT-TLS for single-service deployment mode](./configuring-at-tls-for-zowe-server-single-service.md) article before proceeding. The key ring you define in your AT-TLS configuration should be the key ring you supply in the following template.
    - If you want to use ICSF-backed private keys, consult the [Using ICSF hardware private keys](./using-icsf-hardware-private-keys.md) article before proceeding. As mentioned in that article, ensure you are using `JCEHYBRIDRACFKS` as you follow the template below.
    - If there is a `zowe.certificate.pem` section, remove it from your `zowe.yaml` file.
:::

```yaml
zowe:
  # ... you have other fields before certificate
  certificate:
    keystore:
      # Type of certificate storage. Value by default should be JCERACFKS. APIML additionally supports: JCEKS, JCECCAKS, JCECCARACFKS, or JCEHYBRIDRACFKS
      type: JCERACFKS
      file: safkeyring://YOURID/YOURKEYRING
      # "password" should literally be "password" for key rings
      password: password
      # alias is the name of your key/cert. Use the Case Sensitive, Space Sensitive value in your ESM's list ring capability
      alias: your_cert_label_in_keyring
    truststore:
      # Truststore usually has same values as keystore (minus alias), but can be different if desired.
      # In this example, we link the truststore values to match the keystore values. You can copy this verbatim in most cases.
      type: "${{ zowe.certificate.keystore.type }}"
      file: "${{ zowe.certificate.keystore.file }}"
      password: "${{ zowe.certificate.keystore.password }}"
```

2. Confirm that all the values you provided are correct: 
    * The keyring exists.
    * The certificate alias is correct and exists in the provided keyring.
    * The keyring is accessible by your Zowe runtime user.

3. Starting Zowe performs another series of verifications against your configuration. If there are any problems, error messages are included in the job output.