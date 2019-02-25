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

1. Set the MFS_LOG_LEVEL parameter to "debug" in the MFSxPRM member. The member resides in the RUNHLQ.CMFSOPTN data set.
    ```
    MFS_LOG_LEVEL="debug"
    ```
2. Restart the API ML internal services (Gateway, Discovery Service, and Catalog) as applicable to the problem that you are troubleshooting.
You successfully enabled debug mode.
3. Repeat the procedure that initially caused the problem.
4. Review the debug messages and contact Support, if necessary.
5. After you finish troubleshooting the error, set the MFS_LOG_LEVEL parameter back to the initial setting:
    ```
    MFS_LOG_LEVEL=""
    ```
6. Restart all API ML services (Gateway, Discovery Service, and Catalog).
You successfully disabled debug mode.

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
    GETscheme://hostname:port/application/loggers/{name}
    ```
    Where:

    - {name} is the logger name
    
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

    - level is the new log level: **OFF**, **ERROR**, **WARN**, **INFO**, **DEBUG**, **TRACE**
    
    **Example:**

    ```
    http POST https://hostname:port/application/loggers/com.ca.mfaas.enable.model configuredLevel=WARN
    ```

## API ML stops accepting connections after z/OS TCP/IP stack is recycled

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

## Services that are Not Running Appear to be Running

**Symptom:**

Services that are not running appear to be running. The following message is displayed in the Discovery Service:

   **EMERGENCY! EUREKA MAY BE INCORRECTLY CLAIMING INSTANCES ARE UP WHEN THEY'RE NOT. RENEWALS ARE LESSER THAN THRESHOLD AND HENCE THE INSTANCES ARE NOT BEING EXPIRED JUST TO BE SAFE.**
    
**Cause:**

This message is expected behavior of the discovery service. If a service is incorrectly terminated without properly unregistering from Eureka, it initially enters _eviction status_ for a brief timeframe before the service is deregistered. Failure to properly terminate occurs when a service fails to respond to three consecutive heartbeat renewals. After the three heartbeat renewals are returned without a response, the Eureka discovery service keeps the service in _eviction status_ for one additional minute. If the service does not respond within this minute, the Eureka service unregisters this unresponsive service. When more than 15 percent of currently registered services are in _eviction status_, _self preservation mode_ is enabled. In _self preservation mode_, no services in eviction status are deregistered. As a result, these services continue to appear to be running even though they are not running.

**Solution:**

Use one of the following options to exit self preservation mode:

   - **Restart the services that appear to be running**
    
     Relaunch the services that appear to be registered. After the message disappears, close each of the services one at a time. Allow for a 3-minute period between closing each service.

   - **Restart the discovery service**
    
     Manually restart the discovery service. The new instance will not be in self perservation mode. In a few minutes, the running services register once again.

   - **Adjust the threshold of services in eviction status**
   
     Change the frequency of the discovery service from entering self preservation mode by adjusting the threshold of services in eviction status. 

       **Note:** The default threshold is .85. This results in the discovery service entering self preservation mode when 15 percent of currently registered services are in _eviction status_.
   
       ```
       eureka.renewalPercentThreshold=0.3
       ```
   
       This threshold limit causes the discovery service to enter self preservation mode when less than 30 percent of services are not responding.
   
   
