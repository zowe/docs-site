# Troubleshooting API ML

As an API Mediation Layer user, you may encounter problems with how the API ML functions. This article presents known API ML issues and their solutions.

## Enable API ML Debug Mode

Use debug mode to activate the following functions:

- Display additional debug messages for API ML
- Enable changing log level for individual code components

**Important:** We highly recommend that you enable debug mode only when you want to troubleshoot issues.
Disable debug mode when you are not troubleshooting. Running in debug mode while operating API ML can adversely affect
its performance and create large log files that consume a large volume of disk space.

**Follow these steps:**

1. Open the file `<Zowe install directory>/components/api-mediation/bin/start.sh`.

2. Find the API Mediation Layer service, for which you want to enable the debug mode: discovery, catalog, or gateway.

3. Find the line that contains the `LOG_LEVEL=` parameter and set the value to `debug`:

   ```
    LOG_LEVEL=debug
   ```

4. Restart Zowe&trade;.

    You have enabled the debug mode.

5. (Optional) Reproduce a bug that causes issues and review debug messages. If you are unable to resolve the issue, create an issue [here](https://github.com/zowe/api-layer/issues/).     

6. Disable the debug mode. Find the `LOG_LEVEL` parameter, and change its current value to the default `LOG_LEVEL=` one:
    ```
    LOG_LEVEL=
    ```
7. Restart Zowe.

    You have disabled the debug mode.

## Change the Log Level of Individual Code Components

You can change the log level of a particular code component of the API ML internal service at run time.

**Follow these steps:**

1. Enable API ML Debug Mode as described in Enable API ML Debug Mode.
This activates the application/loggers endpoints in each API ML internal service (Gateway, Discovery Service, and Catalog).
2. List the available loggers of a service by issuing the GET request for the given service URL:

    ```
    GET scheme://hostname:port/application/loggers
    ```

    Where:
    - **scheme**

        API ML service scheme (http or https)

    - **hostname**

        API ML service hostname

    - **port**

        TCP port where API ML service listens on. The port is defined by the configuration parameter MFS_GW_PORT for the Gateway,
    MFS_DS_PORT for the Discovery Service (by default, set to gateway port + 1), and MFS_AC_PORT for the Catalog
    (by default, set to gateway port + 2).

    **Exception:** For the catalog you will able to get list the available loggers by issuing the GET request for the given service URL:
    ```
    GET [gateway-scheme]://[gateway-hostname]:[gateway-port]/api/v1/apicatalog/application/loggers
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

3. Alternatively, you extract the configuration of a specific logger using the extended **GET** request:

    ```
    GET scheme://hostname:port/application/loggers/{name}
    ```
    Where:

    - **{name}**

         is the logger name

4. Change the log level of the given component of the API ML internal service. Use the POST request for the given service URL:

    ```
    POST scheme://hostname:port/application/loggers/{name}
    ```
    The POST request requires a new log level parameter value that is provided in the request body:
    ```
    {

    "configuredLevel": "level"

    }
    ```
    Where:

    - **level**

        is the new log level: **OFF**, **ERROR**, **WARN**, **INFO**, **DEBUG**, **TRACE**

    **Example:**

    ```
    http POST https://hostname:port/application/loggers/org.zowe.apiml.enable.model configuredLevel=WARN
    ```



## Known Issues

### API ML stops accepting connections after z/OS TCP/IP stack is recycled

**Symptom:**

When z/OS TCP/IP stack is restarted, it is possible that the internal services of API Mediation Layer
(Gateway, Catalog, and Discovery Service) stop accepting all incoming connections, go into a continuous loop,
and write a numerous error messages in the log.

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

The error is caused by failed z/OSMF authentication. To determine the reason authentication failed, open the ZWESVSTC joblog and look for a message that contains `ZosmfAuthenticationProvider`. The following is an example of the message that contains `ZosmfAuthenticationProvider`:

```
2019-08-05 11:25:03.431 ERROR 5 --- .0.0-7552-exec-3. c.c.m.s.l.ZosmfAuthenticationProvider    : Can not access z/OSMF service. Uri 'https://ABC12.slv.broadcom.net:1443' returned: I/O error on GET request for "https://ABC12.slv.broadcom.net:1443/zosmf/info": ... 
```

Check the rest of the message, and identify the cause of the problem. The following list provides the possible reasons and solutions for the z/OSMF authentication issue:

- [Connection refused](#connection-refused)
- [Missing z/OSMF host name in subject alternative names](#missing-z-osmf-host-name-in-subject-alternative-names)
- [Invalid z/OSMF host name in subject alternative names](#invalid-z-osmf-host-name-in-subject-alternative-names)

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

- [Secure fix](#Secure-fix)
- [Insecure fix](#insecure-fix)

#### Secure fix

**Follow these steps:**

1. Obtain a valid certificate for z/OSMF and place it in the z/OSMF keyring. For more information, see [Configure the z/OSMF Keyring and Certificate](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/izuconfig_KeyringAndCertificate.htm).
2. Re-create the Zowe keystore by deleting it and re-creating it. For more information, see [Configuring Zowe certificates](../user-guide/configure-certificates).  The Zowe keystore directory is the value of the `KEYSTORE_DIRECTORY` variable in the `instance.env` file in the instance directory that is used to launch Zowe. See [Creating and configuring the Zowe instance directory](../user-guide/configure-instance-directory.md#keystore-configuration) for more information. 

#### Insecure fix

**Follow these steps:**

1. Re-create the Zowe keystore by deleting it and re-creating it. For more information, see [Configuring Zowe certificates](../user-guide/configure-certificates). In the `zowe-setup-certificates.env` file that is used to generate the keystore, ensure that the property `VERIFY_CERTIFICATES` is set to `FALSE`.


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

Re-create the Zowe keystore by deleting it and re-creating it. For more information, see [Configuring Zowe certificates](../user-guide/configure-certificates).  The Zowe keystore directory is the value of the `KEYSTORE_DIRECTORY` variable in the `instance.env` file in the instance directory that is used to launch Zowe. See [Creating and configuring the Zowe instance directory](../user-guide/configure-instance-directory.md#keystore-configuration).

### API ML throws I/O error on GET request and cannot connect to other services

**Symptom:**

The API ML services are running but they are in DOWN state and not working properly. The following exceptions can be found in the log: `java.net.UnknownHostException` and `java.net.NoRouteToHostException`. 

**Sample message:**

See the following message for full exceptions.

```
org.springframework.web.client.ResourceAccessException: I/O error on GET request for "https://USILCA32.lvn.broadcom.net:7553/eureka/apps/apicatalog": USILCA32.lvn.broadcom.net; nested exception is java.net.UnknownHostException: USILCA32.lvn.broadcom.net

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

The Zowe started task needs to run under the same user ID as z/OSMF (typically IZUSVR). This is stated in the [installation documentation](../user-guide/configure-zos-system#grant-users-permission-to-access-z-osmf).

The hostname that is displayed in the details of the exception is a valid hostname. You can validate that the hostname is valid by using `ping` command on the same mainframe system. For example, `ping USILCA32.lvn.broadcom.net`. If it is valid, then the problem can be caused by insufficient privileges of your started task that is not allowed to do network access.

You can fix it by setting up the security environment as described in the [Zowe documentation](../user-guide/configure-zos-system#configure-security-environment-switching).

### Certificate error when using both an external certificate and Single Sign-On to deploy Zowe

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

This issue might occur when you use a Zowe version of 1.12.0 or later. To resolve the issue, you can download your external root certificate and intermediate certificates in PEM format. Then, add the following parameter in the Zowe `instance.env` file.
 
```ZWED_node_https_certificateAuthorities="/path/to/zowe/keystore/local_ca/localca.cer-ebcdic","/path/to/carootcert.pem","/path/to/caintermediatecert.pem"```
 
Recycle your Zowe server. You should be able to log in to the Zowe Desktop successfully now.
