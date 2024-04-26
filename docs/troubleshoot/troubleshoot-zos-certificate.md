# Troubleshooting the certificate configuration

You may encounter problems when configuring certificates. Review the following article for  information that can help you troubleshoot problems when errors or warnings occur when configuring certificates.

## PKCS12 server keystore generation fails in Java 8 SR7FP15, SR7 FP16, and SR7 FP20

**Symptoms**

When you let Zowe create a PKCS12 keystore, some Zowe Desktop applications do not work and messages appear in the log such as the following:
* ZWES1060W Failed to init TLS environment, rc=1(Handle is not valid)
* ZWES1065E Failed to configure https server. Check agent https setting

 The keystore that is generated cannot be read by ZSS. As such, parts of Zowe cannot be used. 

**Solutions**

This error occurs because of the incompatibility between Java and GSK regarding cryptography.

Try one of the following options if you are affected by this error.

- Temporarily downgrade Java, for example to Java 8 SR7FP10, and generate the PKCS12 keystore again.

- Use the flags as presented in the following codeblock when generating a keystore: 

```
-J-Dkeystore.pkcs12.certProtectionAlgorithm=PBEWithSHAAnd40BitRC2 -J-
Dkeystore.pkcs12.certPbeIterationCount=50000 -J-
Dkeystore.pkcs12.keyProtectionAlgorithm=PBEWithSHAAnd3KeyTripleDES -J-
Dkeystore.pkcs12.keyPbeIterationCount=50000
```

- Set the flag `keystore.pkcs12.legacy` to enabled with no value to create a PKCS12 keystore that can be loaded.

:::note
* If you already have an existing keystore created with a proper java version, or are using keyrings, this error will not occur.
* If you are not planning to use Zowe Desktop then you can disable the ZSS component to avoid receiving ZSS component errors in the log.
:::

## Eureka request failed when using entrusted signed z/OSMF certificate

**Symptoms**

When using the entrusted signed z/OSMF certificate a problem may occur whereby the ZLUX AppServer cannot register with Eureka. Review of the logs indicate that the cause is the self-signed certificate:

```
<ZWED:198725> ZWESVUSR WARN (_zsf.bootstrap,webserver.js:156) ZWED0148E - Exception thrown when reading SAF keyring, e= Error: R_datalib call failed: function code: 01, SAF rc: 8, RACF rc: 8, RACF rsn: 44
```

**Solution**

The error indicates that the keyring does not exist or cannot be found.

Look at the keyring information and confirm the corresponding certificate authorities. Ensure that you specify the `certificateAuthorities` variable with the correct keyring label and the label of the conected CA in the `zowe.certificate` section of your `zowe.yaml` file. 

For example, if the keyring label is `ZoweKeyring` and the LABLCERT of the connected CA is `CA Internal Cert`, the `certificateAuthorities` varaible should be `certificateAuthorities: safkeyring://ZWESVUSR/ZoweKeyring&CA Internal Cert`.

## Error reported: wrong certificate setup (keyring certificate)

**Symptoms**

The certificate appears to be correct, but the Gateway and the Discovery Service are failing to start. A keyring certificate used is setup which does not need a value for `password` in the `zowe.certificate.keystore.password` and `zowe.certificate.truststore.password`. 

**Solution**

The password is only used for USS PKCS12 certificate files. The keyring is protected by SAF permissions. It is recommended to assign a value to `password` as shown in the following example:

**Example:**
```
certificate:
    keystore:
      type: JCERACFKS
      file: safkeyring:////ZWESVUSR/ZWEKeyring
      password: password
      alias: ZoweCert
    truststore:
      type: JCERACFKS
      file: safkeyring:////ZWESVUSR/ZWEKering
      password: password
    pem:
      key:
      certificate:
      certificateAuthorities: safkeyring:////ZWESVUSR/ZWEKering&zoweCA
```

