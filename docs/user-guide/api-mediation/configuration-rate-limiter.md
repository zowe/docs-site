# Configuring custom rate limiter


The API Gateway offers a way to customize rate limit per service by introducing a configurable rate limiter.
Below is an example configuration:
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    apiml:
        gateway: 
            routing: 
                rateLimiterCapacity: 20
                rateLimiterTokens: 20
                rateLimiterRefillDuration: 1
                servicesToLimitRequestRate: discoverableclient, apicatalog
                cookieNameForRateLimit: apimlAuthenticationToken



Description: 
1. Set rate limiting properties: 

* `rateLimiterCapacity` - Defines the total number of requests that can be allowed at one time per user.
* `rateLimiterTokens` -  Defines the number of requests that are added to the service’s allowance at regular intervals. This controls how quickly requests are replenished after being consumed.
* `rateLimiterRefillDuration` -  Sets the time interval (in minutes) at which new requests (or tokens) are added.

2. Define services to limit:

   Use `servicesToLimitRequestRate` to specify a list of services to limit.


3. Define a cookie name for user identification:

    Use `cookieNameForRateLimit` to specify a cookie name that identifies the user for rate-limiting purposes.
