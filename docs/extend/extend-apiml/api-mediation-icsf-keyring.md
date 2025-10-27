# Zowe API Mediation Layer - ICSF Hardware Keyring

Zowe version 3.5.0 introduces support in the API Mediation Layer for ICSF-backed private keys.
Previously this was supported only via AT-TLS with limitations

Depending on configuration, the API ML may use the private key for signing tokens.

## Configuring the z/OS system

Enabling Zowe API Mediation Layer to use ICSF keyrings requires changes to the server user authorization and Java security policy.

### Server user permissions

The Zowe server user must be granted access to specific `CSFSERV` class resources in order to interact with ICSF.
Ensure that the user has `READ` access to the following profiles in the `CSFSERV` class:

```plaintext
CSFIQF
CSFOWH
CSFRNG
CSFRNGL
CSFPKG
CSFDSG
CSFDSV
CSFPKX
CSFPKI
CSFEDH
```

These permissions are necessary for key generation, encryption/decryption, signing of JWT tokens and other cryptographic operations performed via ICSF.

### Java configuration

Using it requires changes to the Java installation:

:::tip:::

Zowe bundles an updated version of the java security policy file. This can be enabled by setting:

```yaml
zowe:
  environments:
    XXX_XXX_XXX: true
```

::::::

## Configuring Zowe to Use ICSF Keyrings

Update the `zowe.certificate` section in your `zowe.yaml` configuration file as follows:

* Set `zowe.certificate.keystore.type` to `JCEHYBRIDRACFKS`

* Set `zowe.certificate.truststore.type` to `JCEHYBRIDRACFKS`

Make sure `zowe.certificate.trustore.name` and `zowe.certificate.keystore.name` has protocol `safkeyring://` or `safkeyringhybridjce`

## Troubleshooting

For more information about troubleshooting, check [troubleshooting](../../troubleshoot/troubleshoot-zos-certificate.md).
