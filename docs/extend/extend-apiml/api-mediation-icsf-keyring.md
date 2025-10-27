# Zowe API Mediation Layer - ICSF Hardware Keyring

## Configuring Zowe to Use ICSF Keyrings

Zowe supports the use of ICSF hardware keyrings through the hybrid security provider.
To enable this support, update the `zowe.certificate` section in your `zowe.yaml` configuration file as follows:

* Set `zowe.certificate.keystore.type` to `JCEHYBRIDRACFKS`

* Set `zowe.certificate.truststore.type` to `JCEHYBRIDRACFKS`

These settings allow Zowe to leverage ICSF-protected keys through the hybrid keyring provider.

`zowe.certificate.truststore.type` should be `JCEHYBRIDRACFKS`

## Required Permissions for the Zowe Server User

The Zowe server user must be granted access to specific `CSFSERV` class resources in order to interact with ICSF.
Ensure that the user has `READ` access to the following profiles in the `CSFSERV` class:

```
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
These permissions are necessary for key generation, encryption/decryption, 
signing of JWT tokens and other cryptographic operations performed via ICSF.

## Troubleshooting

For more information about troubleshooting, check [troubleshooting](../../troubleshoot/troubleshoot-zos-certificate.md).