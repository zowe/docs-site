# Using certificates 

Once you have generated or imported your certificates, you can now use the certificates with Zowe. Use the procedure descibed in this article that corresponds to the type of certificates you generated or imported.

:::info Required roles: system programmer, security administrator
:::
Choose from the following procedures:

- [Use PKCS12 certificates](#use-pkcs12-certificates)
- [Use JCERACFKS certificates](#use-jceracfks-certificates)

## Use PKCS12 certificates

To use PKCS12 certificates, run the command `zwe start -c ./zowe.yaml` in the directory with the `zowe.yaml` file to start Zowe.

Details about the PKCS12 certificate used when Zowe is launched are specified in the `zowe.yaml` section `certificates`. This section contains information about the certificate name and the location of the certificate, together with the truststore location.

The two most common scenarios for using a PKCS12 certificate are:

* You have an existing certificate and wish to configure Zowe to use the certificate.
* You do not have a certificate and wish to [generate a new certificate](./generate-certificates.md).  

  The `zwe init certificate` command supports both scenarios. The input parameters that control certificate configuration are specified in the section `zowe.setup.certificates`.

To troubleshoot issues during Zowe startup, see [Troubleshooting startup of Zowe z/OS components](https://docs.zowe.org/stable/troubleshoot/troubleshoot-zos-startup).

## Use JCERACFKS certificates

Details about the JCERACFKS certificate used when Zowe is launched are specified in the `zowe.yaml` section `certificates`. This section contains information about the certificate name and location, together with the truststore location.  

The two most common scenarios for using a JCERACFKS certificate are:

* You have been given an existing certificate and wish to configure Zowe to use it.
* You do not have a certificate and wish to generate a new one.

  The `zwe init certificate` command supports both scenarios. The input parameters that control certificate configuration are specified in the section `zowe.setup.certificates`. See the example of connecting a JCERACFKS certificate below.

**Example:**
![Alt text](../images/certificates/connect-JCERACFKS.png)

**Note:**
In this example, the command `zwe init certificate -c ./zowe.yaml --security-dry-run` allows the JCL to be inspected before submission, as well as handed off to a security administrator who has privileges to submit the JCL under their user ID. By default, the JCL id submitted immediately. For details about this example, see this [playlist](https://youtube.com/playlist?list=PL8REpLGaY9QEHLNA81DRgGqWcgOYC0PDX).

<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PL8REpLGaY9QEHLNA81DRgGqWcgOYC0PDX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
