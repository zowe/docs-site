# Customizing routing behavior 

:::info Roles: system programmer, system administrator, security administrator
:::

The Zowe API Mediation Layer offers a range of routing configurations for enhanced functionality and security. 

You can customize your configuration for how API ML manages both northbound and southbound load limits in single instances, including changing the number of concurrent connections per route passing through the API Gateway, and changing the global Gateway timeout value for the API ML instance.

To change the number of concurrent connections per route passing through the API Gateway, see [Customizing connection limits](./configuration-connection-limits.md).

To change the global Gateway timeout value for the API ML instance, see [Customizing Gateway timeouts](./configuration-gateway-timeouts.md).

Also see the following properties in API Gateway configuration parameters: 
* `server.maxTotalConnections`
* `server.maxConnectionsPerRoute`

Customizing CORS enables the Gateway to handle Cross-Origin Resource Sharing requests, while settings for encoded slashes and unique cookie names cater to specific operational needs of onboarding applications and multiple Zowe instances.

For more information, see [Customizing Cross-Origin Resource Sharing (CORS)](./configuration-cors.md)

To onboard applications which expose endpoints that expect encoded slashes, see [Using encoded slashes](./configuration-url-handling.md)

The Gateway retry policy, customizable through zowe.yaml, optimizes request handling, which can be especially useful in high availability scenarios.

To customize the Gateway retry policy, see [Customizing Gateway retry policy](./configuration-gateway-retry-policy.md).

Additionally, API ML supports specific instance access and load balancer cache distribution, improving service identification and scalability. These configurations, including service ID adjustments for compatibility with Zowe v2, demonstrate Zowe's adaptability and robustness in API management.

To configure a unique cookie name for each instance to prevent overwriting of the default cookie name in the case of multiple Zowe instances, or for more complex deployment strategies, see [Configuring a unique cookie name for a specific API ML instance](./configuration-unique-cookie-name-for-multiple-zowe-instances.md).

To determine which service instance is being called, you can customize the Gateway to output a routed instance header. For more information, see [Retrieving a specific service within your environment](./configuration-access-specific-instance-of-service.md).

To distribute the load balancer cache between instances of the API Gateway, see [Distributing the load balancer cache](./configuration-distributed-load-balancer-cache.md).

To modify the service ID to ensure compatibility of services that use a non-conformant organization prefix with Zowe v2, see [Setting a consistent service ID](./configuration-set-consistent-service-id.md).


