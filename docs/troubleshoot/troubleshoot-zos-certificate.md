# Troubleshooting certificate configuration

As an API Mediation Layer user, you may encounter problems when configuring certificates. Review the following article to troubleshoot errors or warnings that can occur when configuring certificates.

* [PKCS12 server keystore generation fails in Java 8 SR7FP15, SR7 FP16, and SR7 FP20](#pkcs12-server-keystore-generation-fails-in-java-8-sr7fp15-sr7-fp16-and-sr7-fp20)
* [Eureka request failed when using entrusted signed z/OSMF certificate](#eureka-request-failed-when-using-entrusted-signed-zosmf-certificate)
* [Zowe startup fails with empty password field in the keyring setup](#zowe-startup-fails-with-empty-password-field-in-the-keyring-setup)
* [Certificate error when using both an external certificate and Single Sign-On to deploy Zowe](#certificate-error-when-using-both-an-external-certificate-and-single-sign-on-to-deploy-zowe)
* [Browser unable to connect due to a CIPHER error](#browser-unable-to-connect-due-to-a-cipher-error)
* [API Components unable to handshake](#api-components-unable-to-handshake)
* [Java z/OS components of Zowe unable to read certificates from keyring](#java-zos-components-of-zowe-unable-to-read-certificates-from-keyring)
* [Java z/OS components of Zowe cannot load the certificate private key pair from the keyring](#java-zos-components-of-zowe-cannot-load-the-certificate-private-key-pair-from-the-keyring)
* [Exception thrown when reading SAF keyring \{ZWED0148E\}](#exception-thrown-when-reading-saf-keyring-zwed0148e)
* [ZWEAM400E Error initializing SSL Context when using Java 11](#zweam400e-error-initializing-ssl-context-when-using-java-11)
* [Failed to load JCERACFKS keyring when using Java 11](#failed-to-load-jceracfks-keyring-when-using-java-11)

## PKCS12 server keystore generation fails in Java 8 SR7FP15, SR7 FP16, and SR7 FP20

**Symptoms**

Some Zowe Desktop applications do not work when Zowe creates a PKCS12 keystore. A message may appear in the log such as the following:
* ZWES1060W Failed to init TLS environment, rc=1(Handle is not valid)
* ZWES1065E Failed to configure https server. Check agent https setting.

These messages indicate that ZSS cannot read the generated keystore. As such, parts of Zowe are not functional. 

**Solutions**

This error results from the incompatibility between Java and GSK regarding cryptography.

Try one of the following options if you are affected by this error:

- Temporarily downgrade Java, for example to Java 8 SR7FP10, and generate the PKCS12 keystore again.

- Upgrade Zowe to a later version 2.11.0 or a newer version in which this issue is fixed.

:::note
* This error will not occur if you already have an existing keystore created with a proper Java version, or are using keyrings.
* If you do not plan to use Zowe Desktop, you can disable the ZSS component to avoid receiving ZSS component errors in the log.
:::

## Eureka request failed when using entrusted signed z/OSMF certificate

**Symptoms**

A problem may occur when using the entrusted signed z/OSMF certificate, whereby the ZLUX AppServer cannot register with Eureka. Logs indicate that the cause is the self-signed certificate:

```
<ZWED:198725> ZWESVUSR WARN (_zsf.bootstrap,webserver.js:156) ZWED0148E - Exception thrown when reading SAF keyring, e= Error: R_datalib call failed: function code: 01, SAF rc: 8, RACF rc: 8, RACF rsn: 44
```

**Solution**

The error indicates that the keyring does not exist or cannot be found.

Review the keyring information and confirm the corresponding certificate authorities. Ensure that you specify the `certificateAuthorities` variable with the correct keyring label, and the label of the connected CA in the `zowe.certificate` section of your `zowe.yaml` file. 

For example, if the keyring label is `ZoweKeyring` and the LABLCERT of the connected CA is `CA Internal Cert`, the `certificateAuthorities` variable should be `certificateAuthorities: safkeyring://ZWESVUSR/ZoweKeyring&CA Internal Cert`.

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

## Certificate error when using both an external certificate and Single Sign-On to deploy Zowe

**Symptom:**

You used an external certificate and Single Sign-On to deploy Zowe. When you log in to the Zowe Desktop, you encounter an error similar to the following:

```
2020-07-28 02:13:43.203 <ZWED:262486> IZUSVR WARN (org.zowe.zlux.auth.safsso,apimlHandler.js:263) APIML query error: self signed certificate in certificate chain
2020-07-28 02:13:43.288 <ZWED:262486> IZUSVR WARN (org.zowe.zlux.auth.safsso,apimlHandler.js:337) APIML login has failed:
2020-07-28 02:13:43.288 <ZWED:262486> IZUSVR WARN (org.zowe.zlux.auth.safsso,apimlHandler.js:338)  Error: self signed certificate in certificate chain
   at TLSSocket.onConnectSecure (_tls_wrap.js:1321:34)
   at TLSSocket.emit (events.js:210:5)
   at TLSSocket._finishInit (_tls_wrap.js:794:8)
   at TLSWrap.ssl.onhandshakedone (_tls_wrap.js:608:12) {
 code: 'SELF_SIGNED_CERT_IN_CHAIN'
}
```

**Solution:**

This issue might occur when you use a Zowe version of 1.12.0 or later. To resolve the issue, you can download your external root certificate and intermediate certificates in PEM format. Then, add the following parameter in the `zowe.yaml` file.
 
```environments.ZWED_node_https_certificateAuthorities: "/path/to/zowe/keystore/local_ca/localca.cer-ebcdic","/path/to/carootcert.pem","/path/to/caintermediatecert.pem"```
 
Recycle your Zowe server. You should be able to log in to the Zowe Desktop successfully now.

## Browser unable to connect due to a CIPHER error

**Symptom:**

When connecting to the API Mediation Layer, the web browser throws an error saying that the site is unable to provide a secure connection because of an error with ciphers.  

The error shown varies depending on the browser. For example, 

- For Google Chrome:

   <img src={require("../images/common/cipher_mismatch.png").default} alt="CIPHER_MISMATCH" title="CIPHER_MISMATCH Error"/>

- For Mozilla Firefox:

   <img src={require("../images/common/cipher_overlap.png").default} alt="CIPHER_OVERLAP" title="CIPHER_OVERLAP Error"/>

**Solution:**

Remove `GCM` as a disabled `TLS` algorithm from the Java runtime being used by Zowe.  

To do this, first locate the `$JAVA_HOME/lib/security/java.security` file. You can find the value of `$JAVA_HOME` in one of the following ways. 

- Method 1: By looking at the `java.home` value in the `zowe.yaml` file used to start Zowe.  

   For example, if the `zowe.yaml` file contains the following line, 

   ```
   java.home: `/usr/lpp/java/J8.0_64/
   ```

   then, the `$JAVA_HOME/lib/security/java.security` file will be `/usr/lpp/java/J8.0_64/lib/security/java.security`.

- Method 2: By inspecting the `STDOUT` JES spool file for the `ZWESLSTC` started task that launches the API Mediation Layer.

   
In the `java.security` file, there is a parameter value for `jdk.tls.disabledAlgorithms`.

**Example:**

```
jdk.tls.disabledAlgorithms=SSLv3, RC4, MD5withRSA, DH keySize < 1024, 3DES_EDE_CBC, DESede, EC keySize < 224, GCM
```

**Note:** This line may have a continuation character `\` and be split across two lines due to its length.  

Edit the parameter value for `jdk.tls.disabledAlgorithms` to remove `GCM`. If, as shown in the previous example, the line ends `<224, GCM`, remove the preceding comma so the values remain as a well-formed list of comma-separated algorithms:

**Example:**

```
jdk.tls.disabledAlgorithms=SSLv3, RC4, MD5withRSA, DH keySize < 1024, 3DES_EDE_CBC, DESede, EC keySize < 224
```

**Note:** The file permissions of `java.security` might be restricted for privileged users at most z/OS sites.  

After you remove `GCM`, restart the `ZWESLSTC` started task for the change to take effect.

## API Components unable to handshake

**Symptom:**

The API Mediation Layer address spaces ZWE1AG, ZWE1AC and ZWE1AD start successfully and are visible in SDSF, 
however they are unable to communicate with each other.

Externally, the status of the API Gateway homepage displays **!** icons against the API Catalog, Discovery Service and Authentication Service (shown on the left side image below)
 which do not progress to green tick icons as normally occurs during successful startup (shown on the right side image below).
 
<img src={require("../images/api-mediation/apiml-startup.png").default} alt="Zowe API Mediation Layer Startup" width="600px"/> 

The Zowe desktop is able to start but logon fails.
 
The log contains messages to indicate that connections are being reset. For example, the following message shows that the API Gateway `ZWEAG` is unable to connect to the API Discovery service, by default 7553.

``` 
<ZWEAGW1:DiscoveryClient-InstanceInfoReplicator-0:16843005> ZWESVUSR INFO  (o.a.h.i.c.DefaultHttpClient) I/O exception (java.net.SocketException) caught when connecting to {s}->https://<host>:<disovery_server_port>: Connection reset
2021-01-26 15:21:43.302 <ZWEAGW1:DiscoveryClient-InstanceInfoReplicator-0:16843005> ZWESVUSR DEBUG (o.a.h.i.c.DefaultHttpClient) Connection reset
java.net.SocketException: Connection reset
```

The Zowe desktop is able to be displayed in a browser but fails to logon.
 
**Solution:**

Check that the Zowe certificate has been configured as a client certificate, and not just as a server certificate. For more informtion, see More detail can be found in [Configuring certificates overview](../user-guide/configure-certificates).

## Java z/OS components of Zowe unable to read certificates from keyring

**Symptom:**

Java z/OS components of Zowe are unable to read certificates from a keyring. This problem may appear as an error as in the following example where Java treats the SAF keyring as a file.

**Example:**
```
Caused by: java.io.FileNotFoundException: safkeyring:/ZWESVUSR/ZoweKeyring
at java.io.FileInputStream.open(FileInputStream.java:212)
at java.io.FileInputStream.<init>(FileInputStream.java:152)
at java.io.FileInputStream.<init>(FileInputStream.java:104)
at com.ibm.jsse2.be$p$a.a(be$p$a.java:1)
at com.ibm.jsse2.be$p$a.run(be$p$a.java:2)
```

**Solution:**

Apply the following APAR to address this issue:

* [APAR IJ31756](https://www.ibm.com/support/pages/apar/IJ31756)

## Java z/OS components of Zowe cannot load the certificate private key pair from the keyring

**Symptom:**

API ML components configured with SAF keyring are not able to start due to an unrecoverable exception. The exception message notifies the user that the private key is not properly padded.

**Example:**
```
Caused by: java.security.UnrecoverableKeyException: Given final block not properly padded
	at com.ibm.crypto.provider.I.a(Unknown Source)
	at com.ibm.crypto.provider.JceRACFKeyStore.engineGetKey(Unknown Source)
	at java.security.KeyStore.getKey(KeyStore.java:1034)
	at org.apache.tomcat.util.net.SSLUtilBase.getKeyManagers(SSLUtilBase.java:354)
	at org.apache.tomcat.util.net.SSLUtilBase.createSSLContext(SSLUtilBase.java:247)
	at org.apache.tomcat.util.net.AbstractJsseEndpoint.createSSLContext(AbstractJsseEndpoint.java:105)
```

**Solution:**

Make sure that the private key stored in the keyring is not encrypted by a password, or that the private key integrity is not protected by a password. This is not related to SAF keyrings themselves, which are not usually protected by password, but rather to is related to the concrete certificate private key pair stored in the SAF keyring. 

## Exception thrown when reading SAF keyring \{ZWED0148E\}

**Symptom:**

If you see one or more of the following messages in the logs, the cause is keyring configuration.


- ZWED0148E - Exception thrown when reading SAF keyring, e= Error: R_datalib call failed: function code: 01, SAF rc: `number`, RACF rc: `number`, RACF rsn: `number`


* java.io.IOException: R_datalib (IRRSDL00) error: profile for ring not found (`number`, `number`, `number`)

You may also see the following log message:

`ZWES1060W Failed to init TLS environment, rc=1(Handle is not valid)`

 **Note:** This log message can have other causes too, such as lack of READ permission to resources in the CRYPTOZ class.

**Solution:**

1. Refer to table 2 (DataGetFirst) of the [Return and Reason Codes](https://www.ibm.com/docs/en/zos/2.5.0?topic=library-return-reason-codes) to determine the specific problem.
2. Check your keyring (such as with a LISTRING command) and your zowe configuration file's `zowe.certificate` section to spot and resolve the issue.

**Example:** 
 If ZWED0148E contains the following message, it indicates that Zowe's local certificate authority (local CA) `ZoweCert`, the certificate `jwtsecret`, or the Zowe certificate `localhost` does not exist in the Zowe keyring. 

```
2021-01-18 10:16:33.601 <ZWED:16847011> ZWESVUSR WARN (_zsf.bootstrap,webserver.js:156) ZWED0148E - Exception thrown when reading SAF keyring, e= TypeError: R_datalib call failed: function code: 01, SAF rc: 8, RACF rc: 8, RACF rsn: 44
at Object.getPemEncodedData (/software/zowev15/1.15.0/components/app-server/share/zlux-server-framework/node_modules/keyring_js/index.js:21:26)
```

Zowe's local CA certificate has its default name `ZoweCert`. Zowe Desktop hardcodes this certificate in the configuration scripts.

If you are using your own trusted CA certificate in the keyring, and the name is different from the default one, this error will occur. To resolve the issue, you must match the names in the [Zowe configuration](../user-guide/configure-certificates). 

If you are using Zowe's local CA certificate and you still receive **ZWED0148E**, you may find the following message in the same log.

```
  "https": {
    "ipAddresses": [
      "0.0.0.0"
    ],
    "port": 8544,
    "keys": [
      "safkeyring://ZWESVUSR/ring&Label A"
    ],
    "certificates": [
      "safkeyring://ZWESVUSR/ring&Label A"
    ],
    "certificateAuthorities": [
      "safkeyring://ZWESVUSR/ring&Label B",
      "safkeyring://ZWESVUSR/ring&Label B"
    ]
  },
```

In this case, ensure that the label names exactly match the names in TSO when confirming your keyring. Any difference in spaces, capitalization, or other places throw the error.

## ZWEAM400E Error initializing SSL Context when using Java 11

**Symptom:**

API ML components configured with SAF keyring are not able to start due to an unrecoverable exception. The message indicates that `safkeyring` is an unknown protocol. 

**Examples:**
```
2023-06-27 13:07:04.493 <ZWEAGW1:main:394418> ZWESVUSR ERROR (o.z.a.s.HttpsFactory) error java.net.MalformedURLException: unknown protocol: safkeyring                                           
.at java.base/java.net.URL.<init>(URL.java:652)                                                        
.at java.base/java.net.URL.<init>(URL.java:541)                                                        
.at java.base/java.net.URL.<init>(URL.java:488)                                                        
.at org.zowe.apiml.security.SecurityUtils.keyRingUrl(SecurityUtils.java:246)
...                                                           
```
```
2023-06-27 13:07:04.528 <ZWEAGW1:main:394418> ZWESVUSR ERROR (o.z.a.s.HttpsFactory) ZWEAM400E Error initializing SSL Context: 'unknown protocol: safkeyring' 
```

**Solution:**

Starting with Java 11, the safkeyring URLs are dependent on the type of RACF keystore as presented in the following table.

| URL | Keystore |
|------|---------|
| JCECCARACFKS | `safkeyringjcecca://ZWESVUSR/ZOWERING` |
| JCERACFKS | `safkeyringjce://ZWESVUSR/ZOWERING` |
| JCEHYBRIDRACFKS | `safkeyringjcehybrid://ZWESVUSR/ZOWERING` |

## Failed to load JCERACFKS keyring when using Java 11

**Symptom:**

API ML components do not start properly because they fail to load the JCERACFKS keyring. The exception message indicates that the keyring is not available. 
The keyring, however, is configured correctly and the STC user can access it. 

**Examples:**
```
2023-06-27 13:07:45.138 ..35m<ZWEACS1:main:67502789>..0;39m APIMTST ..31mERROR..0;39m ..36m(o.a.t.u.n.SSLUtilBase)..0;39m Failed to load keystore type .JCERACFKS. with path .safkeyring://ZWESVUSR/ZOWERING. due to .JCERACFKS not found.
java.security.KeyStoreException: JCERACFKS not found                                                                                                            
.at java.base/java.security.KeyStore.getInstance(KeyStore.java:878)                                                                                             
.at org.apache.tomcat.util.net.SSLUtilBase.getStore(SSLUtilBase.java:187)                                                                                       
.at org.apache.tomcat.util.net.SSLHostConfigCertificate.getCertificateKeystore(SSLHostConfigCertificate.java:207)                                                                                                                                        
...
Caused by: java.security.NoSuchAlgorithmException:                           
JCERACFKS KeyStore not available                                             
.at java.base/sun.security.jca.GetInstance.getInstance(GetInstance.java:159) 
.at java.base/java.security.Security.getImpl(Security.java:725)              
.at java.base/java.security.KeyStore.getInstance(KeyStore.java:875)          
```

**Solution:**

In Java 11 releases before 11.0.17.0, the `IBMZSecurity` security provider is not enabled by default. Locate the `java.security` configuration file in the `$JAVA_HOME/conf/security` USS directory 
and open the file for editing. Modify the list of security providers and insert `IBMZSecurity` on second position. The list of enabled security providers should resemble the following series:
```
security.provider.1=OpenJCEPlus
security.provider.2=IBMZSecurity
security.provider.3=SUN
security.provider.4=SunRsaSign
security.provider.5=SunEC
security.provider.6=SunJSSE
security.provider.7=SunJCE
security.provider.8=SunJGSS
security.provider.9=SunSASL
security.provider.10=XMLDSig
security.provider.11=SunPCSC
security.provider.12=JdkLDAP
security.provider.13=JdkSASL
security.provider.14=SunPKCS11
```
For more information see the steps in [Enabling the IBMZSecurity provider](https://www.ibm.com/docs/en/semeru-runtime-ce-z/11?topic=guide-ibmzsecurity#ibmzsecurity__enabling_z_provider__title__1).
