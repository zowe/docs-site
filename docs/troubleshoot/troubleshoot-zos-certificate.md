# Troubleshooting the certificate configuration

If you encounter an issue or error when configuring Zowe certificates in `zowe.yaml` file, you can see the following topics for details.

If you encounter issues with using an existing JCERACFKS certificate for Zowe’s z/OS components, please see [the detailed step-by-step guide](https://medium.com/zowe/master-zowe-certificates-use-an-existing-jceracfks-certificate-for-zowes-z-os-components-975ffa0d9f2f). You can also watch the video guide in the [Zowe configuration video playlist](https://youtube.com/playlist?list=PL8REpLGaY9QEHLNA81DRgGqWcgOYC0PDX&feature=shared).

## [JCERACFKS certificate] The AppServer fails to register with Eureka (v2.8 and previous versions)

**Symptoms**

We have updated Zowe to use the Entrust signed z/OSMF certificates . All appears to  be OK with z/OSMF and all seems to be ok with Zowe with the exception the the AppServer cannot register with Eureka. The error messages shown as below means that the keyring doesn’t exist or it cant find this keyring.

```
ZWESVUSR WARN (_zsf.bootstrap,webserver.js:156) ZWED0148E - Exception thrown when reading SAF keyring, e= Error: R_datalib call failed: function code: 01, SAF rc: 8, RACF rc: 8, RACF rsn: 44
```

**Solutions**

You can try to modify the value in the `zowe.certificate.certificateAuthorities` section to be `safkeyring://xxxxx&1CA-AC1 CA Internal Cert`.

For example:
```
certificate:
  keystore:
    type: JCERACFKS
    file: safkeyring://ZWESVUSR/ZoweKeyring
    password: password
    alias: IZUSVR.IZUDFLT
  truststore:
    type: JCERACFKS
    file: safkeyring://ZWESVUSR/ZoweKeyring
    password: password
  pem:
    key:
      certificate:
      certificateAuthorities: "safkeyring://ZWESVUSR/ZoweKeyring&1CA-AC1 CA Internal Cert"
```

## [PKCS12 certificate] PKCS12 server keystore generation fails in Java 8 SR7FP15, SR7 FP16, and SR7 FP20

**Symptoms**

When you let Zowe server install create a PKCS12 keystore, the keystore that is generated cannot be read by ZSS. Then, parts of Zowe cannot be used. 

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
