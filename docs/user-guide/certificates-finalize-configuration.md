# Finalize certificate configuration

Once you have your certificates and either key ring or USS keystore and truststore ready, you can finish configuring certificates with Zowe. Follow the procedure described in this article according to your requirements to finalize and review your Zowe certificate configuration.

:::info Required roles: system programmer, security administrator
:::
Choose from the following procedures:

- [Review PKCS12 Certificate Configuration](#review-pkcs12-certificate-configuration)
- [Review JCERACFKS Certificate Configuration](#review-jceracfks-certificate-configuration)

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

Ensure all the values in this section are correct: they exist in their stated locations, the passwords to the keystore and truststore are accurate, and all file locations are accessible by your Zowe runtime user. 

You can verify the certificate configuration is accurate by starting Zowe. <!-- TODO: cert preflight checks? -->

## Review JCERACFKS certificate configuration

When Zowe is launched, details about the JCERACFKS certificates are found in the `zowe.yaml` file's `zowe.certificate` section. This section contains information about the certificate name, certificate keystore, and certificate truststore. Both the keystore and truststore are z/OSMF key rings in this case.

If you have used Zowe Assisted Certificate Setup with `--update-config`, the `zowe.certificate` section should be filled out correctly for you. If you did not use `--update-config`, or are bringing your own JCERACFKS certificates, then customize your `zowe.yaml` file's `zowe.certificate` section using this guide:

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


