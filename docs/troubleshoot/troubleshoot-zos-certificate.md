# Troubleshooting certificate configuration

You may encounter problems when configuring certificates. Review the following article for troubleshooting solutions to errors or warnings that can occur when configuring certificates.

## PKCS12 server keystore generation fails in Java 8 SR7FP15, SR7 FP16, and SR7 FP20

**Symptoms**

Some Zowe Desktop applications do not work when Zowe creates a PKCS12 keystore. A message may appear in the log such as the following:
* ZWES1060W Failed to init TLS environment, rc=1(Handle is not valid)
* ZWES1065E Failed to configure https server. Check agent https setting.

These messages indicate that ZSS cannot read the generated keystore. As such, parts of Zowe cannot be used. 

**Solutions**

This error results from the incompatibility between Java and GSK regarding cryptography.

Try one of the following options if you are affected by this error:

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
* If you are not planning to use Zowe Desktop, you can disable the ZSS component to avoid receiving ZSS component errors in the log.
:::

## Eureka request failed when using entrusted signed z/OSMF certificate

**Symptoms**

A problem may occur when using the entrusted signed z/OSMF certificate, whereby the ZLUX AppServer cannot register with Eureka. Logs indicate that the cause is the self-signed certificate:

```
<ZWED:198725> ZWESVUSR WARN (_zsf.bootstrap,webserver.js:156) ZWED0148E - Exception thrown when reading SAF keyring, e= Error: R_datalib call failed: function code: 01, SAF rc: 8, RACF rc: 8, RACF rsn: 44
```

**Solution**

The error indicates that the keyring does not exist or cannot be found.

Look at the keyring information and confirm the corresponding certificate authorities. Ensure that you specify the `certificateAuthorities` variable with the correct keyring label, and the label of the connected CA in the `zowe.certificate` section of your `zowe.yaml` file. 

For example, if the keyring label is `ZoweKeyring` and the LABLCERT of the connected CA is `CA Internal Cert`, the `certificateAuthorities` varaible should be `certificateAuthorities: safkeyring://ZWESVUSR/ZoweKeyring&CA Internal Cert`.

## Zowe startup fails with empty password field in the keyring setup

**Symptoms**

The certificate appears to be correct, but the Gateway and the Discovery Service fail during start. The setup of the keyring certificate does not require a value for `password` in the `zowe.certificate.keystore.password` and `zowe.certificate.truststore.password`. 

**Solution**

The password is only used for USS PKCS12 certificate files. The keyring is protected by SAF permissions. Note that in some configurations, Zowe does not work if the password value is empty in the keyring configuration. We recommended that you assign a value to `password` as shown in the following example:

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
      file: safkeyring:////ZWESVUSR/ZWEKeyring
      password: password
    pem:
      key:
      certificate:
      certificateAuthorities: safkeyring:////ZWESVUSR/ZWEKeyring&zoweCA
```

