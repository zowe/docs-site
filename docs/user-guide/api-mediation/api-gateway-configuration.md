# API Gateway configuration parameters

## Zowe runtime configuration parameters

As an application developer who wants to run Zowe, set the following parameters during the Zowe runtime configuration by modifying the `<Zowe install directory>/components/api-mediation/bin/start.sh` file:

* **[API ML configuration](#api-ml-configuration)**
* **[Service configuration](#service-configuration)**
* **[Retry policy](#retry-policy)**
* **[Zuul configuration](#zuul-configuration)**
* **[Hystrix configuration](#hystrix-configuration)**
* **[Additional parameters](#additional-parameters)**

## API ML configuration

* **apiml.service.allowEncodedSlashes**

    By default, the API Mediation Layer accepts encoded slashes in the URL path of the request. If you are onboarding applications which expose endpoints that expect encoded slashes you must keep the default configuration. We recommend that you change the property to `false` if you do not expect the applications to use the encoded slashes. 
    
    Use the following procedure to reject encoded slashes.
    
    **Follow these steps:**
        
    1. Open the file `<Zowe install directory>/components/api-mediation/bin/start.sh`.
    2. Find the line that contains the `-Dapiml.service.allowEncodedSlashes=true` parameter and set the value to `false`.
    3. Restart Zowe&trade. 
        
    Requests with encoded slashes are now rejected by the API Mediation Layer.
       
* **apiml.service.corsEnabled**

    By default, CORS are disabled in the API Gateway for the Gateway routes `api/v1/gateway/**`. Allowing CORS for the Gateway is necessary to enable CORS at the service level. Use the following procedure to enable CORS.
        
    **Follow these steps:**
         
    1. Open the file `<Zowe install directory>/components/api-mediation/bin/start.sh`.
    2. Find the line that contains the `-Dapiml.service.corsEnabled=false` parameter and set the value to `true`.
    3. Restart Zowe&trade.
      
    Requests through the Gateway now contain a CORS header. 

* **apiml.service.hostname**

    This property is used to set the API Gateway hostname.

* **apiml.service.port**

    This property is used to set the API Gateway port.

* **apiml.service.discoveryServiceUrls**

    This property specifies the Discovery Service URL used by the service to register to Eureka.

* **apiml.service.preferIpAddress**

    Set the value of this property to `true` to advertise a service IP address instead of its hostname.
    
    **Notes:** 
    * If you set this property to `true`, you need to modify the value of `discoveryLocations:` to use the IP address instead of hostname. Failure to modify the value prevents Eureka from detecting registered services, and as consequence the **available-replicas** will be empty. 
    * Enabling this property may also cause issues with SSL certificates and Subject Alternative Name (SAN). 

* **apiml.cache.storage.location** 

    This property specifies the location of the EhCache used by Spring.
    
    **Note:** It is necessary for the API ML process to have write access to the cache location.

* **apiml.gateway.timeoutMillis**

    This property is used to define the timeout value for connection to services.

* **apiml.security.ssl.verifySslCertificatesOfServices**

    This parameter makes it possible to prevent server certificate validation.

    **Important!** Ensure that this parameter is set to `true` in production environments. 
    Setting this parameter to `false` in production environments significantly degrades the overall security of the system.

* **apiml.security.auth.zosmfServiceId**

    This parameter specifies the z/OSMF service id used as authentication provider. The service id is defined in the static definition of z/OSMF. The default value is `zosmf`. 

* **apiml.zoweManifest**

    It is also possible to know the version of API ML and Zowe (if API ML used as part of Zowe), using the `/api/v1/gateway/version` endpoint in the API Gateway service in the following format: 
    
        https://localhost:10010/api/v1/gateway/version
    
    This parameter lets you view the Zowe version by using the `/version` endpoint. To view the version requires setting up the launch parameter of the API Gateway - `apiml.zoweManifest` with a path to the Zowe build `manifest.json` file. This file is usually located in the root folder of Zowe build. 
    If the encoding of manifest.json file is different from UTF-8 and IBM1047, it requires setting up the launch parameter of API Gateway - `apiml.zoweManifestEncoding` with correct encoding.

* **apiml.security.auth.provider**

    By default, the API Gateway uses z/OSMF as an authentication provider. It is possible to switch to SAF as the authentication
    provider instead of z/OSMF. The intended usage of SAF as an authentication provider is for systems without z/OSMF.
    If SAF is used and the z/OSMF is available on the system, the created tokens are not accepted by z/OSMF. Use
    the following procedure to switch to SAF. 

    **Follow these steps:**
         
    1. Open the file `<Zowe install directory>/components/api-mediation/bin/start.sh`.
    2. Find the line that contains the `-Dapiml.security.auth.zosmfServiceId=zosmf` parameter and replace it with `-Dapiml.security.auth.provider=saf`.
    3. Restart Zowe&trade.
    
    Authentication requests now utilize SAF as the authentication provider. API ML can run without z/OSMF present on the system. 

* **apiml.security.auth.tokenProperties.expirationInSeconds**

    This property is relevant only when the JWT token is generated by the API Mediation Layer. API ML generation of the JWT token occurs in the following cases:
    
    * z/OSMF is only available as an older version which does not support JWT tokens 
    * The SAF provider is used
     
    To use a custom configuration for z/OSMF which changes the expiration of LTPA token, it is necessary to also set the expiration in this parameter. 
    
    **Note:** The default value is 8 hours which mimicks the 8 hour default expiration of the LTPA token in z/OSMF.
    
    **Follow these steps:**
         
    1. Open the file `<Zowe install directory>/components/api-mediation/bin/start.sh`.
    2. Find the line that contains the `-cp ${ROOT_DIR}"/components/api-mediation/gateway-service.jar":/usr/include/java_classes/IRRRacf.jar`.
    3. Before this line, add on a new line in the following format
    ```
    -Dapiml.security.auth.tokenProperties.expirationInSeconds={expirationTimeInSeconds} \
    ```
    where:
    
    * `{expirationTimeInSeconds}` refers to the specific time before expiration
    
    4. Restart Zowe&trade.

## Service configuration

For more information about service configuration parameters, see [Onboarding a REST API service with the Plain Java Enabler (PJE)](../../extend/extend-apiml/onboard-plain-java-enabler.md).

## Retry policy

In default configuration, retry for all requests is disabled, with one exception: the server retries `GET` requests that finish with status code `503`. 
To change this default configuration, include the following parameters:

* **ribbon.retryableStatusCodes**

    Provides a list of status codes, for which the server should retry the request.
    
    **Example:** `-Dribbon.retryableStatusCodes="503, 404"` 
    
* **ribbon.OkToRetryOnAllOperations**

     Specifies whether all operations can be retried for this service. The default value is `false`. In this case, only `GET` requests are retried if they return a response code that is listed in `ribbon.retryableStatusCodes`. Setting this parameter to `true` enables retry requests for all methods which return a response code listed in `ribbon.retryableStatusCodes`. 
     
**Note:** Enabling retry can impact server resources due to request body buffering.

* **ribbon.MaxAutoRetries**
    
    Specifies the number of times a failed request is retried on the same server. This number is multiplied with `ribbon.MaxAutoRetriesNextServer`. The default value is `0`.
    
* **ribbon.MaxAutoRetriesNextServer**
    
    Specfies the number of additional servers that attempt to make the request. This number excleds the first server. The default value is `5`. 
    
**ribbon.connectTimeout**
    
   Specifies the value in milliseconds that specifies a period, in which API ML should establish a single, non-managed connection with this service. If omitted, the default value specified in the API ML Gateway service configuration is used.

* **ribbon.readTimeout**
    
    Specifies the time in milliseconds of inactivity between two packets in response from this service to API ML. If omitted, the default value specified in the API ML Gateway service configuration is used.

* **ribbon.connectionManagerTimeout**
    
    HttpClient employs a special entity to manage access to HTTP connections called by the HTTP connection manager. The purpose of an HTTP connection manager is to serve as a factory for new HTTP connections, to manage the life cycle of persistent connections, and to synchronize access to persistent connections. Internally, it works with managed connections which serve as proxies for real connections. `ConnectionManagerTimeout` specifies a period, in which managed connections with API ML should be established. The value is in milliseconds. If omitted, the default value specified in the API ML Gateway service configuration is used.
    
* **ribbon.GZipPayload**     

    When set to `false`, this parameter stops the API Gateway from deflating gzip responses from services.

## Zuul configuration

As a provider for routing and filtering, the API Gateway contains a Zuul configuration as shown in the following example:

```yaml
zuul:
    sslHostnameValidationEnabled: false
    addProxyHeaders: true
    traceRequestBody: true
    ignoreSecurityHeaders: false
    includeDebugHeader: false
    sensitiveHeaders: Expires,Date
    ignoredPatterns:
        - /ws/**
    host:
        connectTimeoutMillis: ${apiml.gateway.timeoutMillis}
        socketTimeoutMillis: ${apiml.gateway.timeoutMillis}
    forceOriginalQueryStringEncoding: true
    retryable: true
    decodeUrl: false # Flag to indicate whether to decode the matched URL or use it as is

```   
 
The Zuul configuration allows the API Gateway to act as a reverse proxy server through which API requests can be routed from clients on its northbound edge to z/OS servers on its southbound edge.

**Note:** For more information about Zuul configuration parameters, see the [Spring Cloud Netflix documentation](https://cloud.spring.io/spring-cloud-netflix/multi/multi__router_and_filter_zuul.html).

## Hystrix configuration

The API Gateway contains a Hystrix configuration as shown in the following example:

```yaml
hystrix:
    command:
        default:
            fallback:
                enabled: false
            circuitBreaker:
                enabled: false
            execution:
                timeout:
                    enabled: false
                isolation:
                    thread:
                        timeoutInMilliseconds: ${apiml.gateway.timeoutMillis}
                    strategy: SEMAPHORE
                    semaphore:
                        maxConcurrentRequests: 100000
```

Hystrix is a latency and fault tolerance library designed to isolate points of access to remote systems, 
services and 3rd party libraries, stop cascading failure, and enable resilience in complex distributed systems where failure is inevitable.

**Note:** For more information about Hystrix configuration parameters, see the [Netflix - Hystrix documentation](https://github.com/Netflix/Hystrix/wiki/Configuration#execution.isolation.strategy).

## Additional parameters

* **ibm.serversocket.recover**

    In a multiple network stack environment (CINET), when one of the stacks fails, no notification or Java™ exception occurs for a Java program that is listening on an INADDR_ANY socket. 
    Also, when new stacks become available, the Java application does not become aware of them until it rebinds the INADDR socket. 
    By default, this parameter is enabled in the API Gateway, meaning that an exception (`NetworkRecycledException`) is thrown to the application to allow it either to fail or to attempt to rebind. 
    For more information, see the [IBM documentation](https://www.ibm.com/support/knowledgecenter/SSYKE2_7.1.0/com.ibm.java.zos.71.doc/user/cinet.html).

* **java.io.tmpdir**

    This property is a standard Java system property which is used by the disk-based storage policies. It determines where the JVM writes temporary files, including those written by these storage policies. The default value is typically `/tmp` on Unix-like platforms.

* **spring.profiles.include**

    This property can be used to unconditionally add active profiles. For more information, see [Spring documentation](https://docs.spring.io/spring-boot/docs/1.2.0.M1/reference/html/boot-features-profiles.html#boot-features-adding-active-profiles).
