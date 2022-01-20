# Troubleshooting the certificate configuration

The following topic provides the information that can help you troubleshoot problems when you encounter errors or warnings in configuring certificates.

## Configuring a certificate that uses an external certificate authority (CA)

**Symptom**

When you configure the Zowe certificate with an external certificate that is signed by an external CA, you might encounter the following error.

```
_ZWED:16843383 ZWESVUSR WARN (zsf.apiml,apiml.js:195) Error: write EPROTO 1976209423206449153:error:14094416:SSL routines:ssl3_read_bytes:sslv3 alert certificate unknown:../deps/openssl/openssl/ssl/record/rec_layer_s3.c:1544:SSL alert number 46
at WriteWrap.onWriteComplete Ýas oncomplete¨ (internal/stream_base_commons.js:87:16) {
errno: 'EPROTO',
code: 'EPROTO',
syscall: 'write'
```


**Solution**

This error is caused because the external certificate is not imported into the truststore.

You can follow these steps to resolve the issue.

1. Download the external certificate when your browser is pointed to the Zowe virtual Desktop.

2. Save this certificate in a `USS` file. For example, the file is named as `public.cer-ebcdic` here.

3. Run the following command in the `<Keystore_Directory>` to import this certificate into the Zowe truststore, `localhost.truststore.p12`.

```
keytool -import -alias public1 -file public.cer-ebcdic -storetype PKCS12 -storepass xxxxxx -keystore localhost.truststore.p12
```

**Note**

The configuration is a part in `zowe-setup-certificates.env` file. You must make sure that `EXTERNAL_CERTIFICATE_ALIAS` is not blank.

```shell
EXTERNAL_CERTIFICATE=/path/to/keystore.p12
# It should be PKCS12 (.p12) file.
EXTERNAL_CERTIFICATE_ALIAS=servercert
# It should be in the .p12 file.
KEYSTORE_PASSWORD=mypass
# It should be the password of .p12 file.
EXTERNAL_CERTIFICATE_AUTHORITIES="/path/to/cacert_1.cer /path/to/cacert_2.cer"
# It should be the public certificates of trusted CAs, base64 (.pem or .cer).
ZOSMF_CERTIFICATE= 
# It should be base64 (.pem or .cer).
```

4. Restart Zowe and check whether the error is resolved.
