# Known Issues with API ML

## Error messages from TCP/IP

On starting Zowe, you may see the following messages in `DDNAME SYSPRINT`:
```
2025-09-02 11:05:10 user ERROR (gateway-service,bin/validate.sh:14) - Netstat test fail with exit code 16 (EZZ2376I Could not determine TCPIPjobname, using default of 'INET'
2025-09-02 11:05:10 user ERROR (gateway-service,bin/validate.sh:14) - EZZ2377I Could not establish affinity with INET (1011/11B3005A) - can not provide the requested option information)
```

Alternatively, you may see the following message:

```
2025-09-02 11:05:10 user ERROR (gateway-service,bin/validate.sh:14) Netstat test fail with exit code 255 (EZZ2385I Access to Netstat -c denied - SAF RC is 00000008)
```

In both cases, more details should be available on the SYSLOG. 

In the first case, it is likely that the SYSTCPD dataset from the TCP/IP job may not be accessible to the user running Zowe. A message such as the following may be seen on the SYSLOG at the same time as the error is generated in the Zowe output:

```
TSS7220E 101 J=stc A=user VOL=volume ACC=READ DSN=systcpd.dataset.name TSS7221E Dataset Not Accessible - systcpd.dataset.name
IEC150I 913-38,IFG0194E,stc,*OMVSEX,SYS00003,24A4,volume, 692 systcpd.dataset.name(member) *EZZ9297E UNABLE TO ACCESS FILE systcpd.dataset.name(member) - RC 00080008
```

**Action:**  
The security administrator should grant READ access to the SYSTCPD dataset mentioned on the SYSLOG to the user running Zowe.



## API ML stops accepting connections after z/OS TCP/IP stack is recycled

**Symptom:**

When z/OS TCP/IP stack is restarted, it is possible that the internal services of API Mediation Layer
(Gateway, Catalog, and Discovery service) stop accepting all incoming connections, go into a continuous loop,
and write numerous error messages in the log.

**Sample message:**

The following message is a typical error message displayed in STDOUT:

```
2018-Sep-12 12:17:22.850. org.apache.tomcat.util.net.NioEndpoint -- Socket accept failed java.io.IOException: EDC5122I Input/output error.

.at sun.nio.ch.ServerSocketChannelImpl.accept0(Native Method) ~.na:1.8.0.
.at sun.nio.ch.ServerSocketChannelImpl.accept(ServerSocketChannelImpl.java:478) ~.na:1.8.0.
.at sun.nio.ch.ServerSocketChannelImpl.accept(ServerSocketChannelImpl.java:287) ~.na:1.8.0.
.at org.apache.tomcat.util.net.NioEndpoint$Acceptor.run(NioEndpoint.java:455) ~.tomcat-coyote-8.5.29.jar!/:8.5.29.
.at java.lang.Thread.run(Thread.java:811) .na:2.9 (12-15-2017).
```
**Solution:**

Restart API Mediation Layer.

**Tip:**  To prevent this issue from occurring, it is strongly recommended not to restart the TCP/IP stack while API ML is running.

## API ML throws I/O error on GET request and cannot connect to other services

**Symptom:**

The API ML services are running but they are in the DOWN state and not working properly. The following exceptions can be found in the log: `java.net.UnknownHostException` and `java.net.NoRouteToHostException`. 

**Sample message:**

See the following message for full exceptions.

```
org.springframework.web.client.ResourceAccessException: I/O error on GET request for "https://system.lvn.broadcom.net:7553/eureka/apps/apicatalog": system.lvn.broadcom.net; nested exception is java.net.UnknownHostException: USILCA32.lvn.broadcom.net

.at org.springframework.web.client.RestTemplate.doExecute(RestTemplate.java:732) ~Ýspring-web-5.0.8.RELEASE.jar!/:5.0.8.RELEASE¨

.at org.springframework.web.client.RestTemplate.execute(RestTemplate.java:680) ~Ýspring-web-5.0.8.RELEASE.jar!/:5.0.8.RELEASE¨

.at org.springframework.web.client.RestTemplate.exchange(RestTemplate.java:600) ~Ýspring-web-5.0.8.RELEASE.jar!/:5.0.8.RELEASE¨

.at com.ca.mfaas.apicatalog.services.initialisation.InstanceRetrievalService.queryDiscoveryForInstances(InstanceRetrievalService.java:276) Ýclasses!/:na¨

.at com.ca.mfaas.apicatalog.services.initialisation.InstanceRetrievalService.getInstanceInfo(InstanceRetrievalService.java:158) Ýclasses!/:na¨

.at com.ca.mfaas.apicatalog.services.initialisation.InstanceRetrievalService.retrieveAndRegisterAllInstancesWithCatalog(InstanceRetrievalService.java:90) Ýclas

….

main¨ o.a.http.impl.client.DefaultHttpClient   : I/O exception (java.net.NoRouteToHostException) caught when connecting to {s}->https://localhost:7553: EDC8130I Host cannot be reached. (Host unreachable)

main¨ o.a.http.impl.client.DefaultHttpClient   : Retrying connect to {s}->https://localhost:7553 
```

**Solution:**

The Zowe started task needs to run under a user with sufficient privileges. As a workaround, you can try to run the started task under the same user ID as z/OSMF (typically IZUSVR).

The hostname that is displayed in the details of the exception is a valid hostname. You can validate that the hostname is valid by using `ping` command on the same mainframe system. For example, `ping system.lvn.broadcom.net`. If it is valid, then the problem can be caused by insufficient privileges of your started task that is not allowed network access.

You can fix it by setting up the security environment as described in the [Zowe documentation](../user-guide/configure-zos-system.md#configure-security-environment-switching).

## SEC0002 error when logging in to API Catalog

SEC0002 error typically appears when users fail to log in to API Catalog. The following image shows the API Catalog login page with the SEC0002 error.

<img src={require("../images/common/Error.png").default} alt="SEC0002 Error" title="SEC0002 Error" width="450" height="350"/>

The error is caused by failed z/OSMF authentication. To determine the reason authentication failed, open the ZWESLSTC joblog and look for a message that contains `ZosmfAuthenticationProvider`. The following is an example of the message that contains `ZosmfAuthenticationProvider`:

```
2019-08-05 11:25:03.431 ERROR 5 --- .0.0-7552-exec-3. c.c.m.s.l.ZosmfAuthenticationProvider    : Can not access z/OSMF service. Uri 'https://ABC12.slv.broadcom.net:1443' returned: I/O error on GET request for "https://ABC12.slv.broadcom.net:1443/zosmf/info": ... 
```

Check the rest of the message, and identify the cause of the problem. The following list provides the possible reasons and solutions for the z/OSMF authentication issue:

   
### Connection refused

In the following message, failure to connect to API Catalog occurs when connection is refused:

```
Connect to ABC12.slv.broadcom.net:1443 .ABC12.slv.broadcom.net/127.0.0.1. failed: EDC8128I Connection refused.; nested exception is org.apache.http.conn.HttpHostConnectException: 
```
The reason for the refused connection message is either invalid z/OSMF configuration or z/OSMF being unavailable. The preceding message indicates that z/OSMF is not on the 127.0.0.1:1443 interface.

**Solution:**

### Configure z/OSMF

Make sure that z/OSMF is running and is on 127.0.0.1:1443 interface, and try to log in to API Catalog again. If you get the same error message, change z/OSMF configuration.

**Follow these steps:**

1. Locate the z/OSMF PARMLIB member IZUPRMxx.

    For example, locate IZUPRM00 member in SYS1.PARMLIB.
    
2. Change the current `HOSTNAME` configuration to `HOSTNAME('*')`.
3. Change the current `HTTP_SSL_PORT` configuration to `HTTP_SSL_PORT('1443')`.

    **Important!** If you change the port in the z/OSMF configuration file, all your applications lose connection to z/OSMF.

For more information, see [Syntax rules for IZUPRMxx](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/izuconfig_IZUPRMxx.htm).

If changing the z/OSMF configuration does not fix the issue, reconfigure Zowe.

**Follow these steps:**

1. Open `.zowe_profile` in the home directory of the user who installed Zowe.
2. Modify the value of the `ZOWE_ZOSMF_PORT` variable. 
3. Reinstall Zowe.


### Missing z/OSMF host name in subject alternative names

In following message, failure to connect to API Catalog is caused by a missing z/OSMF host name in the subject alternative names:

```
Certificate for <ABC12.slv.broadcom.net> doesn't match any of the subject alternative names: ..; nested exception is javax.net.ssl.SSLPeerUnverifiedException: Certificate for <ABC12.slv.broadcom.net> doesn't match any of the subject alternative names: ..
```

**Solutions:**

Fix the missing z/OSMF host name in subject alternative names using the following methods:

**Note:** Apply the insecure fix only if you use API Catalog for testing purposes.

- [Secure fix](#secure-fix)
- [Insecure fix](#insecure-fix)

### Secure fix

**Follow these steps:**

1. Obtain a valid certificate for z/OSMF and place it in the z/OSMF keyring. For more information, see [Configure the z/OSMF Keyring and Certificate](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/izuconfig_KeyringAndCertificate.htm).
2. Re-create the Zowe keystore by deleting it and re-creating it. For more information, see [Zowe certificate configuration overview](../user-guide/configure-certificates.md) and the corresponding sub-articles in this section. The Zowe keystore directory is the value of the `KEYSTORE_DIRECTORY` variable in the `zowe.yaml` file that is used to launch Zowe.

### Insecure fix

**Follow these steps:**

1. Re-create the Zowe keystore by deleting it and re-creating it. 
2. In the `zowe.yaml` file that used to launch Zowe, ensure the property `zowe.verifyCertificates` is set to `DISABLED` or `NONSTRICT`. The default value is `STRICT` which ensures that Zowe validates the certificate authority's signing chain is trusted, and that the IP address for Zowe's servers match the certificate's subject alternative name. 

**Important!** Disabling `zowe.verifyCertificates` may expose your server to security risks. Ensure that you contact your system administrator before disabling these certificates and use these options only for troubleshooting purposes.

### Invalid z/OSMF host name in subject alternative names

In the following message, failure to connect to API Catalog is caused by an invalid z/OSMF host name in the subject alternative names:

```
Certificate for <ABC12.slv.broadcom.net> doesn't match any of the subject alternative names: [abc12.ca.com, abc12, localhost, abc12-slck, abc12-slck.ca.com, abc12-slck1, abc12-slck1.ca.com, abc12-slck2, abc12-slck2.ca.com, usilabc12, usilabc12.ca.com]; 
nested exception is javax.net.ssl.SSLPeerUnverifiedException: Certificate for <ABC12.slv.broadcom.net> doesn't match any of the subject alternative names: [abc12.ca.com, abc12, localhost, abc12-slck, abc12-slck.ca.com, abc12-slck1, abc12-slck1.ca.com, abc12-slck2, abc12-slck2.ca.com, usilabc12, usilabc12.ca.com]
```

**Solutions:**

Fix the invalid z/OSMF host name in the subject alternative names using the following methods:

- [Request a new certificate](#request-a-new-certificate)
- [Re-create the Zowe keystore](#re-create-the-zowe-keystore)

### Request a new certificate

Request a new certificate that contains a valid z/OSMF host name in the subject alternative names.

### Re-create the Zowe keystore

Re-create the Zowe keystore by deleting it and re-creating it. For more information, see [Importing a file-based PKCS12 certificate](../user-guide/import-certificates.md#importing-an-existing-pkcs12-certificate).  The Zowe keystore directory is the value of the `KEYSTORE_DIRECTORY` variable in the `zowe.yaml` file that is used to launch Zowe.


