# Troubleshooting API ML

As an API Mediation Layer user, you may encounter problems with the functioning of API ML. This article presents known API ML issues and their solutions.

## Enable API ML Debug Mode

Use debug mode to activate the following functions:

- Display additional debug messages for the API ML 
- Enable changing log level for individual code components
    
**Important:** We highly recommend that you enable debug mode only when you want to troubleshoot issues.
Disable debug mode when you are not troubleshooting. Running in debug mode while operating API ML can adversely affect
its performance and create large log files that consume a large volume of disk space.

**Follow these steps:**

1. Navigate into ```<Zowe install directory>/api-mediation/scripts```

2. You will find the shell scripts that are used to launch api mediation layer:
    1. ```api-mediation-start-catalog.sh```
    2. ```api-mediation-start-discovery.sh```
    3. ```api-mediation-start-gateway.sh```

3. Edit the file of the service, which you intend to enable debug mode for (EBCDIC encoding is used on MF)

4. Find the line that contains the parameter and change it: 
    ```
    -Dspring.profiles.include=debug \
    ```

5. Restart Zowe for the change to take effect. You successfully enabled debug mode.

6. Repeat the procedure that initially caused the problem.

7. Review the debug messages and contact Support, if necessary.

8. After you finish troubleshooting the error, set the ```spring.profiles.include``` parameter back to the initial setting:
    ```
    -Dspring.profiles.include= \
    ```
9. Restart Zowe for the change to take effect.You successfully disabled debug mode.

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
    http POST https://hostname:port/application/loggers/com.ca.mfaas.enable.model configuredLevel=WARN
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

**Tip:**  To prevent this issue from occurring, it is strongly recommended not to restart TCP/IP stack while the API ML is running.
