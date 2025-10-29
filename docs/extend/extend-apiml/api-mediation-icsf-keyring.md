# Zowe API Mediation Layer - Using ICSF Hardware Private Key

Zowe version 3.5.0 introduces support in the API Mediation Layer for ICSF-backed private keys.
Previously this was supported only via [AT-TLS](../../user-guide/configuring-at-tls-for-zowe-server.md) with limitations whereas z/OSMF was required as the selected authentication provider and Personal Access Tokens could not be used.

## Configuring the z/OS system

Enabling Zowe API Mediation Layer to use ICSF keyrings requires changes to the server user authorization and Java security policy.

### Server user permissions

The Zowe server user must be granted access to specific `CSFSERV` class resources in order to interact with ICSF.
Ensure that the user has `READ` access to the following resources in the `CSFSERV` class:

|Resource|Description|

```plaintext
|CSFIQF|ICSF Query Facility callable service|
|CSFOWH|one-way hash generate callable service|
|CSFRNG|random number generate callable service|
|CSFRNGL|random number generate long callable service|
|CSFPKG|PKA key generate callable service|
|CSFDSG|digital signature generate service|
|CSFDSV|digital signature verify callable service|
|CSFPKX|PKA Public Key Extract callable service|
|CSFPKI|PKA key import callable service|
|CSFEDH|ECC Diffie-Hellman callable service|
```

These permissions are necessary for key generation, encryption/decryption, signing of JWT tokens and other cryptographic operations performed via ICSF.

### Java configuration

:::tip

Zowe bundles an updated version of the java security policy file. This can be enabled by setting:

```yaml
zowe:
  environments:
    JVM_SECURITY_PROPERTIES_OVERRIDE: true
```

Note this will override the JVM-defined cryptography provider list.

:::

Using ICSF hardware keys in API ML requires changes to the Java security configuration.
Perform the following changes in the `java.security` file, typically located in `$JAVA_HOME/conf/security` directory:

1. Ensure the following cryptography providers are installed at the top of the list:

```plaintext
security.provider.1=IBMJCEHYBRID
security.provider.2=IBMJCECCA
```

For more information, refer to the `IBM Semeru Runtime Certified Edition for z/OS` IBM product documentation, articles `Installing security providers`, `IBMJCECCA` and `IBMJCEHYBRID`.

## Configuring Zowe to Use ICSF Keyrings

Update the `zowe.certificate` section in your `zowe.yaml` configuration file as follows:

* Set `zowe.certificate.keystore.type` to `JCEHYBRIDRACFKS`

* Set `zowe.certificate.truststore.type` to `JCEHYBRIDRACFKS`

Make sure `zowe.certificate.trustore.file` and `zowe.certificate.keystore.file` has protocol `safkeyring://` or `safkeyringhybridjce://`

## Troubleshooting

For more information about troubleshooting, check [troubleshooting](../../troubleshoot/troubleshoot-zos-certificate.md).
