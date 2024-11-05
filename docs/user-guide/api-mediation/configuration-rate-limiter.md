# Configuring custom rate limiter


The API Gateway offers a way to customize the rate limit per service by introducing a configurable rate limiter.

It’s essential for the system to prevent individual users from overloading it.
By setting rate limits per user on selected services, this configuration helps ensure that one user's activity doesn’t negatively impact the experience of others,
mitigating the risk of Distributed Denial-of-Service (DDoS) attacks and other automated exploit attempts. 
## Procedure

1. In the zowe.yaml, set the following rate limiting properties in api/gateway/routing:

   * **rateLimiterCapacity**  
  Defines the total number of requests that can be allowed at one time per user.

   * **rateLimiterTokens**  
  Defines the number of requests that are added to the service’s allowance at regular intervals. This property controls how quickly requests are replenished after being consumed.

   * **rateLimiterRefillDuration**  
  Sets the time interval (in minutes) at which new requests (or tokens) are added.

2. Define the services to limit:

   Use `servicesToLimitRequestRate` to specify a list of services to limit. In the following example, this property applies to the API Catalog. 

**Example configuration:**
```
    apiml:
        gateway: 
            routing: 
                rateLimiterCapacity: 20
                rateLimiterTokens: 20
                rateLimiterRefillDuration: 1
                servicesToLimitRequestRate: apicatalog
```
In simple terms, this rate-limiting configuration allows to control how many requests users can make to specified services and how quickly their request allowance renews, promoting fair access and better overall system stability.
