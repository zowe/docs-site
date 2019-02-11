# Troubleshooting API ML

As a system administrator, when problems occur with the API Mediation Layer (API ML), use the following methods to troubleshoot the API ML:
  
**Tip:** When you encounter issues with API ML, we recommend that you contact CA Support. 
To help CA Support assist you with issues, provide Support with the records that your log files contain. You can generate
log files automatically when you enable debug mode.

## Enable API ML Debug Mode ##

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

# Change the Log Level of Individual Code Components #

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
 **Note:** Contact CA Support to get more detailed information about how and when to use the `application/loggers` endpoints.
    
    
    
    
    
   
