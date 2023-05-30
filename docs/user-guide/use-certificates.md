# Use certificates

## Use PKCS12 certificates

When Zowe is launched details for the PKCS12 certificate used are specified in the `zowe.yaml` section `certificates`. This contains information for the certificate name and its location, together with the truststore location.

The two most common scenarios for using a PKCS12 certtificate are (1) where you have been given an existing certificate and wish to configure Zowe to use it, or else (2) you do not have a certificate and wish to [generate a new one](./generate-certificates.md). The `zwe init certificate` command supports both scenarios. The input parameters that control certificate configuration are specified in the section `zowe.setup.certificates`

## Use JCERACFKS certificates

When Zowe is launched, details for the PKCS12 certificate used are specified in the `zowe.yaml` section `certificates`.  This contains information for the certificate name and its location, together with the truststore location.  

The two most common scenarios for using a PKCS12 certtificate are where you have been given an existing certificate and wish to configure Zowe to use it, or else you do not have a certificate and wish to generate a new one.  The `zwe init certificate` command supports both scenarios.  The input parameters that control certificate configuration
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