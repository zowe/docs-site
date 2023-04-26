# Use certificates

## Use PKCS12 certificates

placeholder

## Use JCERACFKS certificates

When Zowe is launched, details for the PKCS12 certificate used are specified in the `zowe.yaml` section `certificates`.  This contains information for the certificate name and its location, together with the truststore location.  

The two most common scenario for using a PKCS12 certtificate are where you have been given an existing certificate and wish to configure Zowe to use it, or else you do not have a certificate and wish to generate a new one.  The `zwe init certificate` command supports both scenarios.  The input parameters that control certificate configuration
are specified in the section `zowe.setup.certificates`

