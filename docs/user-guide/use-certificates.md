# Use certificates

Now you can use the certificates for your next actions. The following certificates are supported by Zowe:
- [PKCS12 certificates](#use-pkcs12-certificates)
- [JCERACFKS certificates](#use-jceracfks-certificates)


## Use PKCS12 certificates

To use PKCS12 certificates, run the command `zwe start -c ./zowe.yaml` in the directory with the `zowe.yaml` file to start Zowe.

When Zowe is launched, details for the PKCS12 certificate used are specified in the `zowe.yaml` section `certificates`. This contains information about the certificate name and the location of the certificate, together with the truststore location.

The two most common scenarios for using a PKCS12 certtificate are:  
* You have an existing certificate and wish to configure Zowe to use the certificate.
* You do not have a certificate and wish to [generate a new certificate](./generate-certificates.md). The `zwe init certificate` command supports both scenarios. The input parameters that control certificate configuration are specified in the section `zowe.setup.certificates`.

To check startup of Zowe, see review the article [Troubleshooting startup of Zowe z/OS components](https://docs.zowe.org/stable/troubleshoot/troubleshoot-zos-startup).

## Use JCERACFKS certificates

When Zowe is launched, details for the PKCS12 certificate used are specified in the `zowe.yaml` section `certificates`.  This contains information for the certificate name and its location, together with the truststore location.  

The two most common scenarios for using a PKCS12 certtificate are:

1. You have been given an existing certificate and wish to configure Zowe to use it.
2. You do not have a certificate and wish to generate a new one.

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

If you run into `<ZWED:527259> SZOWE CRITICAL unable to get issuer certificate`, check this section in your `zowe.yaml` file and see if it is the problem about the syntax.
