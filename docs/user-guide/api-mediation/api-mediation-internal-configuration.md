# API Gateway configuration parameters

As an application developer who wants to change the default configuration of the API Mediation Layer, set the following parameters by modifying the `<Zowe install directory>/components/gateway/bin/start.sh` file:

  * [Service configuration](#service-configuration)
  * [Zuul configuration](#zuul-configuration)
  * [Hystrix configuration](#hystrix-configuration)
  
## Service configuration

For information about service configuration parameters, see [Onboarding a REST API service with the Plain Java Enabler (PJE)](../../extend/extend-apiml/onboard-plain-java-enabler.md).

## Zuul configuration

As a provider for routing and filtering, the API Gateway contains a Zuul configuration as shown in the following example.

**Example:**

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
        maxTotalConnections: ${server.maxConnectionsPerRoute}
        maxPerRouteConnections: ${server.maxTotalConnections}
    forceOriginalQueryStringEncoding: true
    retryable: true
    decodeUrl: false # Flag to indicate whether to decode the matched URL or use it as is

```   
 
The Zuul configuration allows the API Gateway to act as a reverse proxy server through which API requests can be routed from clients on the northbound edge to z/OS servers on the  southbound edge.

**Note:** For more information about Zuul configuration parameters, see the [Spring Cloud Netflix documentation](https://cloud.spring.io/spring-cloud-netflix/multi/multi__router_and_filter_zuul.html).

## Hystrix configuration

The API Gateway contains a Hystrix configuration as shown in the following example.

**Example:**

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
                        maxConcurrentRequests: ${server.maxTotalConnections}
```

Hystrix is a latency and fault tolerance library designed to isolate points of access to remote systems, 
services and third-party libraries, stop cascading failure, and enable resilience in complex distributed systems where failure is inevitable.

**Note:** For more information about Hystrix configuration parameters, see the [Netflix - Hystrix documentation](https://github.com/Netflix/Hystrix/wiki/Configuration#execution.isolation.strategy).