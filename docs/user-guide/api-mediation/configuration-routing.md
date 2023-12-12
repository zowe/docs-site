# Customizing routing behavior 

:::info**Roles:** system programmer, system administrator, security administrator
:::

The Zowe API Mediation Layer offers a range of routing configurations for enhanced functionality and security. You can customize your configuration for how API ML manages both northbound and southbound load limits in single instances, including changing the number of concurrent connections per route passing through the API Gateway, and changing the global Gateway timeout value for the API ML instance.

Customizing CORS enables the Gateway to handle Cross-Origin Resource Sharing requests, while settings for encoded slashes and unique cookie names cater to specific operational needs of onboarding applications and multiple Zowe instances. The Gateway retry policy, customizable through zowe.yaml, optimizes request handling, which can be especially useful in high availability scenarios.

Additionally, API ML supports specific instance access and load balancer cache distribution, improving service identification and scalability. These configurations, including service ID adjustments for compatibility with Zowe v2, demonstrate Zowe's adaptability and robustness in API management.

For details about specific configuration procedures, see the following links:

- [Customizing management of API ML load limits](./configuration-customizing-management-of-apiml-load-limits)
    - [Customizing connection limits](./configuration-connection-limits)
    - [Customizing Gateway timeouts](./configuration-gateway-timeouts)
- [Customizing Cross-Origin Resource Sharing (CORS)](./configuration-cors)
- [Using encoded slashes](./configuration-url-handling)
- [Customizing Gateway retry policy](./configuration-gateway-retry-policy)
- [Configuring a unique cookie name for a specific API ML instance](./configuration-unique-cookie-name-for-multiple-zowe-instances)
- [Retrieving a specific service within your environment](./configuration-access-specific-instance-of-service)
- [Distributing the load balancer cache](./configuration-distributed-load-balancer-cache)
- [Setting a consistent service ID](./configuration-set-consistent-service-id)