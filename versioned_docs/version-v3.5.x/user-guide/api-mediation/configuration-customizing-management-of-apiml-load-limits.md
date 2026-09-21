# Customizing management of API ML load limits 

:::info Role: system programmer
::: 

As a system programmer, you can customize your configuration for how API ML manages both northbound and southbound load limits in single instances:

 * To change the number of concurrent connections per route passing through the API Gateway, see [Customizing connection limits](./configuration-connection-limits.md).

 * To change the global Gateway timeout value for the API ML instance, see [Customizing Gateway timeouts](./configuration-gateway-timeouts.md).
  
 * To change the number of concurrent requests an application should support and its impact on the size of the Java memory heap, see [Customizing Java Heap sizes](./configuration-customizing-java-heap-sizes.md).

 * To customize the rate limit for each service, see [Customizing Gateway rate limiter](./customizing-gateway-rate-limiter.md).

