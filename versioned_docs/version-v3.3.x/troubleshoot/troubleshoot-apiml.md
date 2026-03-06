# Troubleshooting Zowe API Mediation Layer

As an API Mediation Layer user, you may encounter problems with how the API ML functions. This article presents known API ML issues and their solutions.

:::note
To troubleshoot errors or warnings that can occur when configuring certificates, see the article [Troubleshooting certificate configuration](./troubleshoot-zos-certificate.md).
:::
  
## Install API ML without Certificate Setup

For testing purposes, it is not necessary to set up certificates when configuring the API Mediation Layer. You can configure Zowe without certificate setup and run Zowe with `verify_certificates: DISABLED`.

:::caution Important:
For production environments, certificates are required. Ensure that certificates for each of the following services are issued by the Certificate Authority (CA) and that all keyrings contain the public part of the certificate for the relevant CA:
* z/OSMF
* Zowe
* The service that is onboarded to Zowe

:::

## Enable API ML Debug Mode

Use debug mode to activate the following functions:

- Display additional debug messages for API ML
- Enable changing log level for individual code components
- Gather atypical debug information

When on z/OS, API ML log messages are written to the STC job log.

:::caution Important:
We highly recommend that you enable debug mode only when you want to troubleshoot issues.
Disable debug mode when you are not troubleshooting. Running in debug mode while operating API ML can adversely affect
its performance and create large log files that consume a large volume of disk space.
:::

**Follow these steps:**

1. Open the file `zowe.yaml`.

2. For each component, find the `components.*.debug` parameter and set the value to `true`:

   ```
    components.gateway.debug: true
   ```
   By default, debug mode is disabled, and the `components.*.debug` is set to `false`.
   
3. Restart Zowe&trade;.

   You enabled debug mode for the API ML core services (API Catalog, API Gateway and Discovery service).

4. (Optional) Reproduce a bug that causes issues and review debug messages. If you are unable to resolve the issue, create an issue [here](https://github.com/zowe/api-layer/issues/).     

## Change the Log Level of Individual Code Components

You can change the log level of a particular code component of the API ML internal service at run time.

**Follow these steps:**

1. Enable API ML Debug Mode as described in Enable API ML Debug Mode.
This activates the application/loggers endpoints in each API ML internal service (Gateway, Discovery service, and Catalog).
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
    MFS_DS_PORT for the Discovery service (by default, set to gateway port + 1), and MFS_AC_PORT for the Catalog
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

## Gather atypical debug information

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

Services that are not running appear to be running. The following message is displayed in the Discovery service:

   **EMERGENCY! EUREKA MAY BE INCORRECTLY CLAIMING INSTANCES ARE UP WHEN THEY'RE NOT. RENEWALS ARE LESSER THAN THRESHOLD AND HENCE THE INSTANCES ARE NOT BEING EXPIRED JUST TO BE SAFE.**
    
**Cause:**

This message is expected behavior of the Discovery service. If a service is incorrectly terminated without properly unregistering from Eureka, the service initially enters _eviction status_ for a brief timeframe before the service is deregistered. Failure to properly terminate occurs when a service fails to respond to three consecutive heartbeat renewals. After the three heartbeat renewals are returned without a response, the Eureka Discovery service keeps the service in _eviction status_ for one additional minute. If the service does not respond within this minute, the Eureka service unregisters this unresponsive service. When more than 15 percent of currently registered services are in _eviction status_, _self preservation mode_ is enabled. In _self preservation mode_, no services in eviction status are deregistered. As a result, these services continue to appear to be running even though they are not running.

**Solution:**

Use one of the following options to exit self preservation mode:

- **Restart the services that appear to be running**  
Relaunch the services that appear to be registered. After the message disappears, close each of the services one at a time. Allow for a 3-minute period between closing each service. The procedure for restarting services that are not part of Zowe is specific to the services and is documented in the service documentation. 

- **Restart the Discovery service**  
Manually restart the Discovery service. The new instance will not be in self preservation mode. In a few minutes, the running services re-register.
   
    **Note:** 
    
    The Discovery service can be stopped with the following command:  
    ```F <instance-job-name>,APPL=STOP(<component_name>)```
    
    The Discovery service can be started again with the following command:  
    ```F <instance-job-name>,APPL=START(<component_name>)```

    **Example:**

    ```
    F ZWESLSTC,APPL=STOP(discovery-service)
    F ZWESLSTC,APPL=START(discovery-service)
    ```

- **Adjust the threshold of services in eviction status**  
Change the frequency of the Discovery service from entering self preservation mode by adjusting the threshold of services in eviction status. 

    **Note:** The default threshold is .85. This results in the Discovery service entering self preservation mode when 15 percent of currently registered services are in _eviction status_.
       
    **Example:**
   
    ```
    eureka.renewalPercentThreshold=0.3
    ```
   
    This threshold limit causes the Discovery service to enter self preservation mode when less than 30 percent of services are not responding.
   
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

**Solution:**

You must be authorized to use SDSF with REXX on your z/OS system. For authorization, activate the SDSF RACF class and add the following 3 profiles to your system:

- `GROUP.ISFSORIG`
- `GROUP.ISFSPROG.SDSF`
- `ISF.CONNECT.`

Users must belong to a group that has READ access to these profiles.

This is quite a complex area and you should ask your systems programmer for advice. On most systems, the GROUP.\* profiles are not required and it is sufficient to have the following ISF profile defined:

class profile SDSF ISF.CONNECT.\*\* (G)

