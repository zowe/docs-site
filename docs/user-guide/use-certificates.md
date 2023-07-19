# Use certificates

Once you have generated or imported your certificates, you can now use the certificates with Zowe. Use the procedure that corresponds to the type of certificates you generated or imported: 

- [Use PKCS12 certificates](#use-pkcs12-certificates)
- [Use JCERACFKS certificates](#use-jceracfks-certificates)

## Use PKCS12 certificates

To use PKCS12 certificates, run the command `zwe start -c ./zowe.yaml` in the directory with the `zowe.yaml` file to start Zowe.

The details about the PKCS12 certificate used when Zowe is launched, are specified in the `zowe.yaml` section `certificates`. This section contains information about the certificate name and the location of the certificate, together with the truststore location.

The two most common scenarios for using a PKCS12 certificate are:  
* You have an existing certificate and wish to configure Zowe to use the certificate.
* You do not have a certificate and wish to [generate a new certificate](./generate-certificates.md).  

  The `zwe init certificate` command supports both scenarios. The input parameters that control certificate configuration are specified in the section `zowe.setup.certificates`.

To troubleshoot issues during Zowe startup, see [Troubleshooting startup of Zowe z/OS components](https://docs.zowe.org/stable/troubleshoot/troubleshoot-zos-startup).

## Use JCERACFKS certificates

The details about the JCERACFKS certificate used when Zowe is launched, are specified in the `zowe.yaml` section `certificates`.  This contains information about the certificate name and its location, together with the truststore location.  

The two most common scenarios for using a JCERACFKS certificate are:

* You have been given an existing certificate and wish to configure Zowe to use it.
* You do not have a certificate and wish to generate a new one.

  The `zwe init certificate` command supports both scenarios. The input parameters that control certificate configuration
are specified in the section `zowe.setup.certificates`

### Use multiple certificate authorities

If you use mutiple certificate authorites, the syntax in the `zowe.yaml` is shown as below.

```
certificate:
  pem:                                                                           
    key: ""                                                                      
    certificate: ""                                                              
    certificateAuthorities:                                                      
    - "safkeyring:////stcusername/KeyName&ca name 1"        
    - "safkeyring:////stcusername/KeyName&ca name 2"
```

If you receive the error message, `<ZWED:527259> ZOWE CRITICAL unable to get issuer certificate`, check this section in your `zowe.yaml` file and verify that the syntax is correct.

