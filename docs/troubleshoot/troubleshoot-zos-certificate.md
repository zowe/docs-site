# Troubleshooting the certificate configuration

The following topic provides the information that can help you troubleshoot problems when you encounter errors or warnings in configuring certificates.

## PKCS 12 server keystore generation fails in Java 8 SR7FP15, SR7 FP16, and SR7 FP20

**Symptoms**

When you let Zowe server installs create a PKCS12 keystore, the keystore that is generated cannot be read by ZSS. Then, parts of Zowe cannot be used. 

**Solutions**

This error occurs because of the incompatibility which is found between Java and GSK regarding cryptography.

You can try one of the following options if you are affected by this error.

- Temporarily downgrade Java, for example, to Java 8 SR7FP10.

- Use the flags as below when generating a keystore. 

```
-J-Dkeystore.pkcs12.certProtectionAlgorithm=PBEWithSHAAnd40BitRC2 -J-
Dkeystore.pkcs12.certPbeIterationCount=50000 -J-
Dkeystore.pkcs12.keyProtectionAlgorithm=PBEWithSHAAnd3KeyTripleDES -J-
Dkeystore.pkcs12.keyPbeIterationCount=50000
```

- Set the flag `keystore.pkcs12.legacy` enabled with no value to create a PKCS12 keystore that can be loaded.

**Notes**

If you already have an existing keystore or you are using keyrings, this error will not happen.

If you do not use ZSS, this error will not happen because ZSS is on by default.

If you already use your own PKCS12 files instead of the files that Zowe generates for you, this error will not happen. 
