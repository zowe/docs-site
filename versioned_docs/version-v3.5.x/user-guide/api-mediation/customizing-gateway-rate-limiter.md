# Customizing Gateway rate limiter

:::info Role: system programmer
:::

The API Gateway offers a way to customize the rate limit for each service via a configurable rate limiter, which prevents individual users from overloading the system with excessive requests.  Configuring the rate limiter helps ensure that a user's activity does not negatively impact the experience of other users by mitigating the risk of Distributed Denial-of-Service (DDoS) attacks and other automated exploit attempts. 

Use the following procedure to customize the Gateway rate limiter:

1. In the zowe.yaml, set the following rate limiting properties in api/gateway:

   * **rateLimiterCapacity**  
  Defines the total number of requests that can be allowed at one time per user. The default value is set to 20.

   * **rateLimiterTokens**  
  Defines the number of requests that are added to the service’s allowance at regular intervals. This property controls how quickly requests are replenished after being consumed. The default value is set to 20.

   * **rateLimiterRefillDuration**  
  Sets the time interval (in minutes) at which new requests (or tokens) are added. The default value is set to 1.

2. Define the services to limit:

   Use `servicesToLimitRequestRate` to specify a list of services to limit. In the following example, this property applies to the API Catalog. 

**Example configuration:**
```
    apiml:
        gateway: 
            rateLimiterCapacity: 35
            rateLimiterTokens: 35
            rateLimiterRefillDuration: 2
            servicesToLimitRequestRate: apicatalog
```
You configured the properties of the rate limiter for the API Catalog, thereby improving user accessibility and overall system stability. 

