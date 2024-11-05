# Configuring custom rate limiter


The API Gateway offers a way to customize rate limit per service by introducing a configurable rate limiter.

It’s essential for the system to prevent individual users from overloading it. 
By setting rate limits per user on selected services, this configuration helps ensure that one user's activity doesn’t negatively impact the experience of others, 
mitigating the risk of Distributed Denial-of-Service (DDoS) attacks and other automated exploit attempts. By balancing user access over time, it ensures fair and secure access.

Example configuration:
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    apiml:
        gateway: 
            routing: 
                rateLimiterCapacity: 20
                rateLimiterTokens: 20
                rateLimiterRefillDuration: 1
                servicesToLimitRequestRate: apicatalog



Description:
1. Set rate limiting properties:

* `rateLimiterCapacity` - Defines the total number of requests that can be allowed at one time per user.
* `rateLimiterTokens` -  Defines the number of requests that are added to the service’s allowance at regular intervals. This controls how quickly requests are replenished after being consumed.
* `rateLimiterRefillDuration` -  Sets the time interval (in minutes) at which new requests (or tokens) are added.

2. Define services to limit:

   Use servicesToLimitRequestRate to specify a list of services to limit.


In simple terms, this rate-limiting configuration allows to control how many requests users can make to specified services and how quickly their request allowance renews, promoting fair access and better overall system stability.

