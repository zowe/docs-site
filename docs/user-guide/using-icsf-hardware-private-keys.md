# Using ICSF Hardware Private Keys

Zowe version 3.4.0 introduces API Mediation Layer (API ML) native support for ICSF-backed private keys.
Previously, ICSF-backed private keys were supported only via [AT-TLS](../user-guide/configuring-at-tls-for-zowe-server.md) with limitations to API ML functionality, wherein z/OSMF was required as the selected authentication provider and Personal Access Tokens could not be used.

:::note

We recommend enabling AT-TLS when relying on ICSF Hardware Private Keys since AT-TLS enablement provides TLS support for all Zowe components.

:::

## Configuring the z/OS system

Enabling API ML to use ICSF hardware private keys for signing tokens and native TLS support requires changes to server user authorization and the Java security policy. 

### Server user permissions

In order to interact with ICSF, the Zowe server user must be granted access to specific `CSFSERV` class resources.

Ensure that the user has `READ` access to the following resources in the `CSFSERV` class:

Resource|Description
---|---
CSFIQF|ICSF Query Facility callable service
CSFOWH|one-way hash generate callable service
CSFRNG|random number generate callable service
CSFRNGL|random number generate long callable service
CSFPKG|PKA key generate callable service
CSFDSG|digital signature generate service
CSFDSV|digital signature verify callable service
CSFPKX|PKA Public Key Extract callable service
CSFPKI|PKA key import callable service
CSFEDH|ECC Diffie-Hellman callable service

These permissions are necessary for key generation, encryption/decryption, signing of JWT tokens and other cryptographic operations performed via ICSF.

### Java configuration

:::tip

Zowe bundles an updated version of the Java security policy file. Enable this security policy file with the following setting in the zowe.yaml:

```yaml
zowe:
  environments:
    JVM_SECURITY_PROPERTIES_OVERRIDE: true
```

Note that this configuration overrides the JVM-defined cryptography provider list.

:::

Using ICSF hardware keys in API ML requires changes to the Java security configuration.

Perform the following changes in the `java.security` file, typically located in `$JAVA_HOME/conf/security` directory:

Ensure the following cryptography providers are installed at the top of the list:

```plaintext
security.provider.1=IBMJCEHYBRID
security.provider.2=IBMJCECCA
```

For more information, refer to the _IBM Semeru Runtime Certified Edition for z/OS_ IBM product documentation:

* Installing security providers
* IBMJCECCA
* IBMJCEHYBRID

## Configuring Zowe to Use ICSF Keyrings

To use ICSF Keyrings, update the `zowe.certificate` section in your `zowe.yaml` configuration file with the following settings:

1. Set `zowe.certificate.keystore.type` to `JCEHYBRIDRACFKS`

2. Set `zowe.certificate.truststore.type` to `JCEHYBRIDRACFKS`

Make sure `zowe.certificate.trustore.file` and `zowe.certificate.keystore.file` has protocol `safkeyring://` or `safkeyringhybridjce://`

## Troubleshooting

For information about troubleshooting ICSF keyring configuration, see [Troubleshooting certificate configuration](../../docs/troubleshoot/troubleshoot-zos-certificate.md).
