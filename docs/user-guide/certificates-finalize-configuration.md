# Finalize certificate configuration

Once you have your certificates and either key ring or USS keystore and truststore ready, you can finish configuring certificates with Zowe. Follow the procedure described in this article according to your requirements to finalize and review your Zowe certificate configuration.

:::info Required roles: system programmer, security administrator
:::
Choose from the following procedures:

- [Review PKCS12 Certificate Configuration](#review-pkcs12-certificate-configuration)
- [Review JCERACFKS Certificate Configuration](#review-key-ring-certificate-configuration)

## Review PKCS12 certificate configuration

When Zowe is launched, details about the PKCS12 certificates are found in the `zowe.yaml` file's `zowe.certificate` section. This configuration block contains information about the certificate name and the location of the certificate, together with the keystore and truststore location.

If you have used [Zowe Assisted Certificate Setup](./certificates-configuration-scenarios.md) with `--update-config`, the `zowe.certificate` section should be filled out correctly for you. If you did not use `--update-config`, or are bringing your own PKCS12 certificates, then customize your `zowe.yaml` file's `zowe.certificate` section using this guide:

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

Manually review that all the values you provided are correct: 
* The keystore, truststore, and certificates exist in their stated locations.
* The passwords to the keystore and truststore are accurate.
* The certificate alias is correct and exists in the provided keystore.
* All file locations are accessible by your Zowe runtime user. 

After manual review, you are ready to start Zowe with your certificate configuration. When Zowe starts, it will perform another series of verifications against your configuration and alert you in the job output if there are any problems. <!-- TODO: cert preflight checks? -->

## Review key ring certificate configuration

When Zowe is launched, details about the key ring certificates are found in the `zowe.yaml` file's `zowe.certificate` section. This section contains information about the certificate name, certificate keystore, and certificate truststore. Both the keystore and truststore are z/OSMF key rings in this case.

If you have used Zowe Assisted Certificate Setup with `--update-config`, the `zowe.certificate` section should be filled out correctly for you. If you did not use `--update-config`, or are bringing your own key ring and certificates, then customize your `zowe.yaml` file's `zowe.certificate` section using the below guide.

If you are using AT-TLS with Zowe, consult the [Enabling AT-TLS for single-service deployment mode](./configuring-at-tls-for-zowe-server-single-service.md) article before proceeding. The key ring you define in your AT-TLS configuration should be the key ring you supply in the below guide.

If you want to use ICSF-backed private keys, consult the [Using ICSF Hardware Private Keys](./using-icsf-hardware-private-keys.md) article before proceeding. As mentioned in that article, ensure you are using `JCEHYBRIDRACFKS` as you follow the below example.

:::note If there is a `zowe.certificate.pem` section, remove it from your `zowe.yaml` file.
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

Manually review that all the values you provided are correct: 
* The keyring exists.
* The certificate alias is correct and exists in the provided keyring.
* The keyring is accessible by your Zowe runtime user.

After manual review, you are ready to start Zowe with your certificate configuration. When Zowe starts, it will perform another series of verifications against your configuration and alert you in the job output if there are any problems. <!-- TODO: cert preflight checks? -->