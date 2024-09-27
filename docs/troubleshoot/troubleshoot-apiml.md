# Troubleshooting Zowe API Mediation Layer

As an API Mediation Layer user, you may encounter problems with how the API ML functions. This article presents known API ML issues and their solutions.

:::note
To troubleshoot errors or warnings that can occur when configuring certificates, see the article [Troubleshooting certificate configuration](./troubleshoot-zos-certificate.md).
:::

* [Install API ML without Certificate Setup](#install-api-ml-without-certificate-setup)
* [Enable API ML Debug Mode](#enable-api-ml-debug-mode)
* [Change the Log Level of Individual Code Components](#change-the-log-level-of-individual-code-components)
* [Services that are not running appear to be running](#services-that-are-not-running-appear-to-be-running)
* [Debug and Fix Common Problems with SSL/TLS Setup](#debug-and-fix-common-problems-with-ssltls-setup)
* [SDSF Job search fails](#sdsf-job-search-fails)
* [Known Issues](#known-issues)
    * [API ML stops accepting connections after z/OS TCP/IP stack is recycled](#api-ml-stops-accepting-connections-after-zos-tcpip-stack-is-recycled)
    * [SEC0002 error when logging in to API Catalog](#sec0002-error-when-logging-in-to-api-catalog)
    * [API ML throws I/O error on GET request and cannot connect to other services](#api-ml-throws-io-error-on-get-request-and-cannot-connect-to-other-services)
    
## Install API ML without Certificate Setup

For testing purposes, it is not necessary to set up certificates when configuring the API Mediation Layer. You can configure Zowe without certificate setup and run Zowe with `verify_certificates: DISABLED`.

**Important:** For production environments, certificates are required. Ensure that certificates for each of the following services are issued by the Certificate Authority (CA) and that all keyrings contain the public part of the certificate for the relevant CA:
* z/OSMF
* Zowe
* The service that is onboarded to Zowe

## Enable API ML Debug Mode

Use debug mode to activate the following functions:

- Display additional debug messages for API ML
- Enable changing log level for individual code components
- Gather atypical debug information

When on z/OS, API ML log messages are written to the STC job log.

**Important:** We highly recommend that you enable debug mode only when you want to troubleshoot issues.
Disable debug mode when you are not troubleshooting. Running in debug mode while operating API ML can adversely affect
its performance and create large log files that consume a large volume of disk space.

**Follow these steps:**

1. Open the file `zowe.yaml`.

2. For each component, find the `components.*.debug` parameter and set the value to `true`:

   ```
    components.gateway.debug: true
   ```
   By default, debug mode is disabled, and the `components.*.debug` is set to `false`.
   
3. Restart Zowe&trade;.

   You enabled debug mode for the API ML core services (API Catalog, API Gateway and Discovery Service).

4. (Optional) Reproduce a bug that causes issues and review debug messages. If you are unable to resolve the issue, create an issue [here](https://github.com/zowe/api-layer/issues/).     

## Change the Log Level of Individual Code Components

You can change the log level of a particular code component of the API ML internal service at run time.

**Follow these steps:**

1. Enable API ML Debug Mode as described in Enable API ML Debug Mode.
This activates the application/loggers endpoints in each API ML internal service (Gateway, Discovery Service, and Catalog).
2. List the available loggers of a service by issuing the **GET** request for the given service URL:

    ```
    GET scheme://hostname:port/application/loggers
    ```
    - **scheme**

        Specifies the API ML service scheme (http or https)

    - **hostname**

        Specifies the API ML service hostname

    - **port**

        Specifies the TCP port where API ML service listens on. The port is defined by the configuration parameter MFS_GW_PORT for the Gateway,
    MFS_DS_PORT for the Discovery Service (by default, set to gateway port + 1), and MFS_AC_PORT for the Catalog
    (by default, set to gateway port + 2).

    **Note:**  For the Catalog you can list the available loggers by issuing a **GET** request for the given service URL in the following format:
    ```
    GET [gateway-scheme]://[gateway-hostname]:[gateway-port]/apicatalog/api/v1/application/loggers
    ```

    **Tip:** One way to issue REST calls is to use the http command in the free HTTPie tool: https://httpie.org/.

    **Example:**

    ```
    HTTPie command:
    http GET https://lpar.ca.com:10000/application/loggers

    Output:
    {"levels":["OFF","ERROR","WARN","INFO","DEBUG","TRACE"],
     "loggers":{
       "ROOT":{"configuredLevel":"INFO","effectiveLevel":"INFO"},
       "com":{"configuredLevel":null,"effectiveLevel":"INFO"},
       "com.ca":{"configuredLevel":null,"effectiveLevel":"INFO"},
       ...
     }
    }
    ```

3. Alternatively, extract the configuration of a specific logger using the extended **GET** request:

    ```
    GET scheme://hostname:port/application/loggers/{name}
    ```

    - **\{name\}**

         Specifies the logger name

4. Change the log level of the given component of the API ML internal service. Use the **POST** request for the given service URL:

    ```
    POST scheme://hostname:port/application/loggers/{name}
    ```
    The **POST** request requires a new log level parameter value that is provided in the request body:
    ```
    {

    "configuredLevel": "level"

    }
    ```

    - **level**

        Specifies the new log level: **OFF**, **ERROR**, **WARN**, **INFO**, **DEBUG**, **TRACE**

    **Example:**

    ```
    http POST https://hostname:port/application/loggers/org.zowe.apiml.enable.model configuredLevel=WARN
    ```

### Gather atypical debug information

* **ZWE_configs_debug**  
This property can be used to unconditionally add active debug profiles.

For more information, see [Adding active profiles](https://docs.spring.io/spring-boot/docs/1.2.0.M1/reference/html/boot-features-profiles.html#boot-features-adding-active-profiles) in the Spring documentation.

* **ZWE_configs_sslDebug**  
This property can be used to enable the SSL debugging. This property can also assist with determining what exactly is happening at the SSL layer.

This property uses the `-Djavax.net.debug` Java parameter when starting the Gateway component. By setting `ZWE_configs_sslDebug` to `ssl`, all SSL debugging is turned on. The `ZWE_configs_sslDebug` parameter also accepts other values that can enable a different level of tracing. 

For more information, see the article **_Debugging Utilities_** in the IBM documentation.

:::note
This property can also be enabled for other API ML components.
:::


## Services that are not running appear to be running

Services that are not running appear to be running. The following message is displayed in the Discovery Service:

   **EMERGENCY! EUREKA MAY BE INCORRECTLY CLAIMING INSTANCES ARE UP WHEN THEY'RE NOT. RENEWALS ARE LESSER THAN THRESHOLD AND HENCE THE INSTANCES ARE NOT BEING EXPIRED JUST TO BE SAFE.**
    
**Cause:**

This message is expected behavior of the discovery service. If a service is incorrectly terminated without properly unregistering from Eureka, it initially enters _eviction status_ for a brief timeframe before the service is deregistered. Failure to properly terminate occurs when a service fails to respond to three consecutive heartbeat renewals. After the three heartbeat renewals are returned without a response, the Eureka discovery service keeps the service in _eviction status_ for one additional minute. If the service does not respond within this minute, the Eureka service unregisters this unresponsive service. When more than 15 percent of currently registered services are in _eviction status_, _self preservation mode_ is enabled. In _self preservation mode_, no services in eviction status are deregistered. As a result, these services continue to appear to be running even though they are not running.

**Solution:**

Use one of the following options to exit self preservation mode:

   - **Restart the services that appear to be running**  
   Relaunch the services that appear to be registered. After the message disappears, close each of the services one at a time. Allow for a 3-minute period between closing each service.

   - **Restart the discovery service**  
   Manually restart the discovery service. The new instance will not be in self preservation mode. In a few minutes, the running services re-register.

   - **Adjust the threshold of services in eviction status**  
   Change the frequency of the discovery service from entering self preservation mode by adjusting the threshold of services in eviction status. 

        **Note:** The default threshold is .85. This results in the discovery service entering self preservation mode when 15 percent of currently registered services are in _eviction status_.
       
        **Example:**
   
        ```
        eureka.renewalPercentThreshold=0.3
        ```
   
        This threshold limit causes the discovery service to enter self preservation mode when less than 30 percent of services are not responding.
   
## Debug and Fix Common Problems with SSL/TLS Setup

Review tips described in the blog post [Troubleshooting SSL/TLS setup with Zowe Certificate Analyzer](https://medium.com/zowe/troubleshooting-ssl-tls-setup-with-zowe-certificate-analyser-31aeec9e1144) to find out how you can use the Zowe Certificate Analyzer to address the following common issues with SSL/TLS setup:

* How to verify if the API ML server certificate is trusted by your service
* How to get a CA certificate in the correct format
* How to perform a TLS handshake with debug logs
* How to debug remote services
* How to enable mutual authentication using a client certificate
* How to add a trusted certificate to a SAF Key ring

## SDSF Job search fails

Search for jobs using SDSF failed for prefix {} and owner {}: exc.sdsf_invocation_failed 8 (Issue does not impace ZD&T boxes)

### Solution:

You must be authorized to use SDSF with REXX on your z/OS system. For authorization, activate the SDSF RACF class and add the following 3 profiles to your system:

- `GROUP.ISFSORIG`
- `GROUP.ISFSPROG.SDSF`
- `ISF.CONNECT.`

Users must belong to a group that has READ access to these profiles.

This is quite a complex area and you should ask your systems programmer for advice. On most systems, the GROUP.\* profiles are not required and it is sufficient to have the following ISF profile defined:

class profile SDSF ISF.CONNECT.\*\* (G)

## Known Issues

### API ML stops accepting connections after z/OS TCP/IP stack is recycled

**Symptom:**

When z/OS TCP/IP stack is restarted, it is possible that the internal services of API Mediation Layer
(Gateway, Catalog, and Discovery Service) stop accepting all incoming connections, go into a continuous loop,
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

### SEC0002 error when logging in to API Catalog

SEC0002 error typically appears when users fail to log in to API Catalog. The following image shows the API Catalog login page with the SEC0002 error.

<img src={require("../images/common/Error.png").default} alt="SEC0002 Error" title="SEC0002 Error" width="450" height="350"/>

The error is caused by failed z/OSMF authentication. To determine the reason authentication failed, open the ZWESLSTC joblog and look for a message that contains `ZosmfAuthenticationProvider`. The following is an example of the message that contains `ZosmfAuthenticationProvider`:

```
2019-08-05 11:25:03.431 ERROR 5 --- .0.0-7552-exec-3. c.c.m.s.l.ZosmfAuthenticationProvider    : Can not access z/OSMF service. Uri 'https://ABC12.slv.broadcom.net:1443' returned: I/O error on GET request for "https://ABC12.slv.broadcom.net:1443/zosmf/info": ... 
```

Check the rest of the message, and identify the cause of the problem. The following list provides the possible reasons and solutions for the z/OSMF authentication issue:

- [Connection refused](#connection-refused)
- [Configure z/OSMF](#configure-zosmf)
- [Missing z/OSMF host name in subject alternative names](#missing-zosmf-host-name-in-subject-alternative-names)
- [Invalid z/OSMF host name in subject alternative names](#invalid-zosmf-host-name-in-subject-alternative-names)
- [Secure Fix](#secure-fix)
- [Insecure Fix](#insecure-fix)
- [Invalid z/OSMF host name in subject alternative names](#invalid-zosmf-host-name-in-subject-alternative-names)
- [Request a new certificate](#request-a-new-certificate)
- [Re-create the Zowe keystore](#re-create-the-zowe-keystore)

#### Connection refused

In the following message, failure to connect to API Catalog occurs when connection is refused:

```
Connect to ABC12.slv.broadcom.net:1443 .ABC12.slv.broadcom.net/127.0.0.1. failed: EDC8128I Connection refused.; nested exception is org.apache.http.conn.HttpHostConnectException: 
```
The reason for the refused connection message is either invalid z/OSMF configuration or z/OSMF being unavailable. The preceding message indicates that z/OSMF is not on the 127.0.0.1:1443 interface.

**Solution:**

#### Configure z/OSMF

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


#### Missing z/OSMF host name in subject alternative names

In following message, failure to connect to API Catalog is caused by a missing z/OSMF host name in the subject alternative names:

```
Certificate for <ABC12.slv.broadcom.net> doesn't match any of the subject alternative names: ..; nested exception is javax.net.ssl.SSLPeerUnverifiedException: Certificate for <ABC12.slv.broadcom.net> doesn't match any of the subject alternative names: ..
```

**Solutions:**

Fix the missing z/OSMF host name in subject alternative names using the following methods:

**Note:** Apply the insecure fix only if you use API Catalog for testing purposes.

- [Secure fix](#secure-fix)
- [Insecure fix](#insecure-fix)

#### Secure fix

**Follow these steps:**

1. Obtain a valid certificate for z/OSMF and place it in the z/OSMF keyring. For more information, see [Configure the z/OSMF Keyring and Certificate](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/izuconfig_KeyringAndCertificate.htm).
2. Re-create the Zowe keystore by deleting it and re-creating it. For more information, see [Zowe certificate configuration overview](../user-guide/configure-certificates.md) and the corresponding sub-articles in this section. The Zowe keystore directory is the value of the `KEYSTORE_DIRECTORY` variable in the `zowe.yaml` file that is used to launch Zowe.

#### Insecure fix

**Follow these steps:**

1. Re-create the Zowe keystore by deleting it and re-creating it. 
2. In the `zowe.yaml` file that used to launch Zowe, ensure the property `zowe.verifyCertificates` is set to `DISABLED` or `NONSTRICT`. The default value is `STRICT` which ensures that Zowe validates the certificate authority's signing chain is trusted, and that the IP address for Zowe's servers match the certificate's subject alternative name. 

**Important!** Disabling `zowe.verifyCertificates` may expose your server to security risks. Ensure that you contact your system administrator before disabling these certificates and use these options only for troubleshooting purposes.

#### Invalid z/OSMF host name in subject alternative names

In the following message, failure to connect to API Catalog is caused by an invalid z/OSMF host name in the subject alternative names:

```
Certificate for <ABC12.slv.broadcom.net> doesn't match any of the subject alternative names: [abc12.ca.com, abc12, localhost, abc12-slck, abc12-slck.ca.com, abc12-slck1, abc12-slck1.ca.com, abc12-slck2, abc12-slck2.ca.com, usilabc12, usilabc12.ca.com]; 
nested exception is javax.net.ssl.SSLPeerUnverifiedException: Certificate for <ABC12.slv.broadcom.net> doesn't match any of the subject alternative names: [abc12.ca.com, abc12, localhost, abc12-slck, abc12-slck.ca.com, abc12-slck1, abc12-slck1.ca.com, abc12-slck2, abc12-slck2.ca.com, usilabc12, usilabc12.ca.com]
```

**Solutions:**

Fix the invalid z/OSMF host name in the subject alternative names using the following methods:

- [Request a new certificate](#request-a-new-certificate)
- [Re-create the Zowe keystore](#re-create-the-zowe-keystore)

#### Request a new certificate

Request a new certificate that contains a valid z/OSMF host name in the subject alternative names.

#### Re-create the Zowe keystore

Re-create the Zowe keystore by deleting it and re-creating it. For more information, see [Importing a file-based PKCS12 certificate](../user-guide/import-certificates.md/#importing-an-existing-pkcs12-certificate).  The Zowe keystore directory is the value of the `KEYSTORE_DIRECTORY` variable in the `zowe.yaml` file that is used to launch Zowe.

### API ML throws I/O error on GET request and cannot connect to other services

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

You can fix it by setting up the security environment as described in the [Zowe documentation](../user-guide/configure-zos-system#configure-security-environment-switching).






