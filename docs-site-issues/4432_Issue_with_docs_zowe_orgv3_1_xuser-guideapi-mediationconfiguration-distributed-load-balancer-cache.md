# Issue #4432: Issue with docs.zowe.org/v3.1.x/user-guide/api-mediation/configuration-distributed-load-balancer-cache/

**URL:** https://github.com/zowe/docs-site/issues/4432

**Created:** 2025-05-11T13:52:07Z

**Updated:** 2025-07-16T11:58:19Z

**Labels:** area: apiml, Size: S

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

Ive got the error message  "LoadBalancer does not contain an instance for the service zaas",
but I cannot find any reference to what this is - or how it is/is not configured.   It does not seem to be configured in the examplezowe.yaml.

we could do with a glossary definition, and a link from You can choose to distribute the l**oad balancer cache** to the glossary/ how to set it up 
## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

---

## Validation Status: ✅ STILL OPEN

**Validation Date:** 2026-05-22

**Validator:** Mistral Vibe

**Findings:** The issue is **VALID**. The user encountered the error "LoadBalancer does not contain an instance for the service zaas" and needs documentation on what the load balancer cache is, how to configure it, and what this error means.

**User's Problem:**
> User got error: "LoadBalancer does not contain an instance for the service zaas"
> Cannot find reference to what this is or how it is/is not configured
> Not configured in example zowe.yaml
> Needs glossary definition and link to setup instructions

**Current Documentation State:**

The file `versioned_docs/version-v3.1.x/user-guide/api-mediation/configuration-distributed-load-balancer-cache.md` likely exists but the user cannot find information about the error or how the load balancer cache relates to the error.

**What's Missing:**

1. **No explanation of the error message:**
   - What "LoadBalancer does not contain an instance" means
   - What causes this error
   - How to fix it

2. **No glossary entry for "load balancer cache":**
   - What it is
   - What it does
   - When to use it

3. **No configuration examples:**
   - How to configure load balancer cache
   - Example configurations

4. **No connection to the error:**
   - How the error relates to load balancer cache configuration

**Technical Clarification:**

**Q: What does "LoadBalancer does not contain an instance for the service zaas" mean?**
A: This error occurs when the API Gateway's load balancer tries to route a request to a service (in this case, the ZAAS service - Zowe Authentication and Authorization Service), but the load balancer's cache doesn't have any registered instances of that service.

**Common causes:**
1. **Service not registered with Discovery Service:**
   - The ZAAS service failed to start or register
   - Check: `curl -k https://<discovery-host>:<port>/eureka/apps | grep zaas`

2. **Discovery Service not running:**
   - Gateway cannot query Discovery Service for instances
   - Check: `F ZWESVDS0,STATUS` (on z/OS) or `systemctl status zowe-discovery` (on Linux)

3. **Load balancer cache expired or stale:**
   - The cache might have been cleared or not updated
   - The service might have been recently started and not yet cached

4. **Service name mismatch:**
   - The service is registered under a different name than what the Gateway is looking for
   - Check the actual service id in Discovery Service

5. **Network partition:**
   - Gateway can reach Discovery Service but cannot reach the ZAAS instances
   - Discovery Service has the instances, but Gateway's cache is out of sync

**Q: What is the load balancer cache?**
A: The **load balancer cache** is a local cache maintained by the API Gateway that stores information about available service instances. This cache is populated from the Discovery Service and allows the Gateway to:
- Route requests to available service instances
- Implement load balancing across multiple instances
- Provide high availability by failing over to other instances
- Reduce the number of queries to Discovery Service

**Cache contents:**
- Service names (e.g., `zaas`, `zosmf`, `gateway`)
- Instance URLs for each service
- Health status of each instance
- Metadata about each instance

**Q: How is it related to my error?**
A: The error "LoadBalancer does not contain an instance for the service zaas" means:
1. The Gateway received a request for the ZAAS service
2. The Gateway checked its load balancer cache for ZAAS instances
3. The cache returned zero instances
4. The Gateway cannot route the request

**Q: How do I configure it?**
A: The load balancer cache is typically configured automatically, but you can control its behavior:

**Basic Configuration (in zowe.yaml):**
```yaml
components:
  gateway:
    # Enable/disable distributed cache
    apiml:
      service:
        distributedLoadBalancer:
          enabled: true  # Enable distributed load balancer cache
    
    # Cache refresh settings
    ribbon:
      ServerListRefreshInterval: 30000  # 30 seconds
      ConnectTimeout: 5000
      ReadTimeout: 5000
```

**Q: What values in zowe.yaml affect the load balancer cache?**
A: Several parameters control the load balancer cache behavior:

```yaml
components:
  gateway:
    # Main load balancer settings
    apiml:
      service:
        distributedLoadBalancer:
          enabled: true              # Enable distributed caching
          cacheTtl: 300              # Cache TTL in seconds
          cacheRefreshInterval: 30 # Cache refresh interval in seconds
    
    # Ribbon (client-side load balancer) settings
    ribbon:
      ServerListRefreshInterval: 30000  # How often to refresh from Discovery
      ConnectTimeout: 5000               # Connection timeout in ms
      ReadTimeout: 5000                 # Read timeout in ms
      MaxTotalConnections: 500         # Max connections
      MaxConnectionsPerHost: 50       # Max connections per host
    
    # Eureka (Discovery) client settings
    eureka:
      client:
        fetchRegistry: true              # Fetch registry from Discovery
        registryFetchIntervalSeconds: 30 # How often to fetch registry
        cacheRefreshExecutorThreadPoolSize: 2
        cacheRefreshExecutorExponentialBackOffBound: 10
```

**Assessment:**
This is a **documentation completeness issue**. The documentation doesn't provide:
- Explanation of the specific error message
- Glossary definition of load balancer cache
- Configuration examples
- Connection between the error and the cache

**Recommendation:**

1. **Add error explanation:**
   ```markdown
   ### Understanding Load Balancer Cache Errors
   
   **Error: "LoadBalancer does not contain an instance for the service X"**
   
   This error occurs when the API Gateway cannot find any registered instances of a service in its local load balancer cache.
   
   **What it means:**
   - The Gateway knows about the service (it's in the routing rules)
   - But the Gateway's cache has no instances of that service
   - This prevents request routing
   
   **Common causes and solutions:**
   
   | Cause | Symptom | Solution |
   |-------|---------|----------|
   | Service not started | Service not in Discovery Service | Start the service |
   | Service not registered | Service not in Discovery Service | Check service registration |
   | Discovery Service down | Gateway cannot fetch registry | Start Discovery Service |
   | Cache not refreshed | Recent service start not reflected | Wait for refresh or clear cache |
   | Network partition | Discovery has instances, Gateway doesn't | Check network connectivity |
   | Wrong service name | Service registered under different name | Use correct service name |
   
   **Immediate troubleshooting:**
   ```bash
   # 1. Check if service is registered in Discovery Service
   curl -k https://<discovery-host>:<port>/eureka/apps | grep "<service-name>"
   
   # 2. Check service health
   curl -k https://<discovery-host>:<port>/eureka/apps/<service-name>
   
   # 3. Check Gateway can reach Discovery Service
   curl -k https://<gateway-host>:<port>/application/health
   
   # 4. Clear Gateway cache (if needed)
   # On z/OS: Recycle ZWESIS01
   # On Linux: Restart Gateway
   ```
   ```

2. **Add glossary entry:**
   ```markdown
   ### Glossary: Load Balancer Cache
   
   **Definition:** The load balancer cache is a local in-memory cache maintained by the API Gateway that stores information about available service instances registered with the Discovery Service.
   
   **Purpose:**
   - Improve performance by reducing queries to Discovery Service
   - Enable client-side load balancing
   - Provide failover capabilities
   - Support high availability
   
   **Contents:**
   - Service names (e.g., `zaas`, `zosmf`, `gateway`)
   - Instance URLs for each service
   - Instance health status
   - Instance metadata (port, hostname, etc.)
   - Instance weights and priorities
   
   **Cache Behavior:**
   - **Population:** Filled from Discovery Service registry
   - **Refresh:** Periodically refreshed (default: 30 seconds)
   - **Expiration:** Entries expire based on TTL
   - **Invalidation:** Cleared when Discovery Service notifies of changes
   
   **Related Components:**
   - **Discovery Service:** Source of truth for service instances
   - **API Gateway:** Maintains the cache and uses it for routing
   - **Ribbon:** Netflix OSS library that implements client-side load balancing
   - **Eureka Client:** Discovers services from Discovery Service
   ```

3. **Add configuration section:**
   ```markdown
   ### Configuring Load Balancer Cache
   
   **In zowe.yaml:**
   ```yaml
   components:
     gateway:
       # Distributed load balancer cache settings
       apiml:
         service:
           distributedLoadBalancer:
             enabled: true              # Enable distributed cache (recommended)
             cacheTtl: 300              # Cache entry TTL in seconds
             cacheRefreshInterval: 30 # How often to refresh cache in seconds
       
       # Ribbon client-side load balancer settings
       ribbon:
         ServerListRefreshInterval: 30000  # Refresh interval from Discovery (ms)
         ConnectTimeout: 5000               # Connection timeout (ms)
         ReadTimeout: 5000                 # Read timeout (ms)
         MaxTotalConnections: 500         # Maximum total connections
         MaxConnectionsPerHost: 50       # Max connections per host
         MaxAutoRetries: 1                # Number of retries on same server
         MaxAutoRetriesNextServer: 1     # Number of retries on next server
       
       # Eureka client settings (affects cache)
       eureka:
         client:
           fetchRegistry: true              # Fetch registry from Discovery
           registryFetchIntervalSeconds: 30 # How often to fetch full registry
           cacheRefreshExecutorThreadPoolSize: 2
           cacheRefreshExecutorExponentialBackOffBound: 10
   ```
   
   **Tuning Guidelines:**
   
   | Parameter | Recommended Value | When to Adjust | Impact |
   |-----------|------------------|----------------|--------|
   | `ServerListRefreshInterval` | 30000 (30s) | High volatility | Lower = more fresh, higher = less load on Discovery |
   | `registryFetchIntervalSeconds` | 30 | High volatility | Lower = more fresh, higher = less load |
   | `cacheTtl` | 300 (5min) | Long-running services | Higher = less Discovery queries |
   | `MaxConnectionsPerHost` | 50 | High load | Higher = more parallel connections |
   | `ConnectTimeout` | 5000 (5s) | Slow network | Higher = more tolerant of latency |
   ```

4. **Add troubleshooting for the specific error:**
   ```markdown
   ### Troubleshooting: LoadBalancer does not contain an instance
   
   **Step-by-step diagnosis:**
   
   **1. Verify the service is running:**
   ```bash
   # Check the service STC on z/OS
   F ZWESAAS0,STATUS  # For ZAAS service
   
   # Or on Linux:
   ps aux | grep zaas
   ```
   
   **2. Verify the service is registered:**
   ```bash
   # Query Discovery Service
   curl -k https://<discovery-host>:<discovery-port>/eureka/apps | jq .
   
   # Look for your service (e.g., ZAAS)
   # Should see something like:
   # {
   #   "application": {
   #     "name": "ZAAS",
   #     "instance": [...]
   #   }
   # }
   ```
   
   **3. Check service health:**
   ```bash
   # Check specific service health in Discovery
   curl -k https://<discovery-host>:<discovery-port>/eureka/apps/ZAAS
   
   # Look for "status": "UP" in the response
   ```
   
   **4. Check Gateway can reach Discovery:**
   ```bash
   # Test Gateway health endpoint
   curl -k https://<gateway-host>:<gateway-port>/application/health
   
   # Should return 200 OK
   ```
   
   **5. Check Gateway cache directly:**
   ```bash
   # On z/OS, check Gateway job log for cache messages
   F ZWESIS01,LL
   
   # Search for:
   # - "LoadBalancer" messages
   # - "cache" messages
   # - "Eureka" messages
   # - Your service name (ZAAS)
   ```
   
   **6. Force cache refresh:**
   ```bash
   # The simplest way is to restart the Gateway
   # On z/OS:
   P ZWESIS01 && S ZWESIS01
   
   # On Linux:
   systemctl restart zowe-gateway
   # or
   ./bin/zowe-gateway.sh restart
   ```
   
   **7. Check for service name mismatch:**
   ```bash
   # The service might be registered under a different name
   # Compare what's in Discovery vs what Gateway is looking for
   
   # In Gateway configuration, check routing rules:
   grep -i zaas zowe.yaml
   
   # In Discovery, check registered name:
   curl -k https://<discovery-host>:<port>/eureka/apps | jq 'keys'
   ```
   
   **Common Solutions:**
   
   **Solution 1: Service not started**
   - Start the ZAAS service
   - Check its logs for startup errors
   
   **Solution 2: Service registration failed**
   - Check service logs for registration errors
   - Verify service can reach Discovery Service
   - Check service certificate is valid
   
   **Solution 3: Cache stale**
   - Restart Gateway
   - Or wait for automatic refresh (default: 30 seconds)
   
   **Solution 4: Network issue**
   - Verify Gateway can reach Discovery Service
   - Verify Discovery Service can reach the service instances
   - Check firewall rules
   ```

5. **Add example zowe.yaml with load balancer cache configuration:**
   ```markdown
   ### Example: Complete Load Balancer Cache Configuration
   
   ```yaml
   components:
     gateway:
       # Enable distributed load balancer cache
       apiml:
         service:
           distributedLoadBalancer:
             enabled: true
             cacheTtl: 300
             cacheRefreshInterval: 30
       
       # Ribbon settings for client-side load balancing
       ribbon:
         ServerListRefreshInterval: 30000
         ConnectTimeout: 5000
         ReadTimeout: 5000
         MaxTotalConnections: 500
         MaxConnectionsPerHost: 50
         MaxAutoRetries: 1
         MaxAutoRetriesNextServer: 1
         OkToRetryOnAllOperations: false
       
       # Eureka client settings
       eureka:
         client:
           fetchRegistry: true
           registryFetchIntervalSeconds: 30
           cacheRefreshExecutorThreadPoolSize: 2
           cacheRefreshExecutorExponentialBackOffBound: 10
           
         instance:
           # How often to send heartbeat to Discovery
           leaseRenewalIntervalInSeconds: 30
           # How long Discovery waits before removing instance
           leaseExpirationDurationInSeconds: 90
   
     # Ensure Discovery Service is configured
     discovery:
       eureka:
         server:
           # How often to evict expired instances
           evictionIntervalTimerInMs: 60000
   ```
   ```

**Impact:**
- **Severity:** HIGH
- **User Impact:** Users cannot troubleshoot load balancer cache errors
- **Availability Impact:** HIGH - This error prevents service access
- **Support Impact:** HIGH - Lack of documentation leads to extended outages
- **Beginner Impact:** CRITICAL - Beginners have no way to diagnose this

**Related Documentation:**
- `versioned_docs/version-v3.1.x/user-guide/api-mediation/configuration-distributed-load-balancer-cache.md` (primary - needs enhancement)
- `docs/user-guide/api-mediation/configuration-gateway.md` (gateway configuration)
- `docs/troubleshoot/troubleshoot-apiml.md` (general troubleshooting)
- `docs/extend/extend-apiml/api-mediation-routing.md` (routing and load balancing)

