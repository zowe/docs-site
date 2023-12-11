# Customizing management of API ML load limits 

:::info**Role:** system programmer
::: 

As a system programmer, you can customize your configuration for how API ML manages both northbound and southbound load limits in single instances:

 * To change the number of concurrent connections per route passing through the API Gateway, see [Customizing connection limits](./connection-limits).
 * To change the global Gateway timeout value for the API ML instance, see [Customizing Gateway timeouts](./gateway-timeouts).
 * Also see the following properties in [API Gateway configuration parameters](./api-mediation/api-mediation-internal-configuration/#runtime-configuration): 
    * `server.maxTotalConnections`
    * `server.maxConnectionsPerRoute`

Review the following configuration customization options for how API ML manages load limits in high availability:

* To customize the Gateway retry policy, see [Customizing Gateway retry policy](./gateway-retry-policy).

* To configure a unique cookie name for each instance to prevent overwriting of the default cookie name in the case of multiple Zowe instances, or for more complex deployment strategies, see [Configuring a unique cookie name for a specific API ML instance](./unique-cookie-name-for-multiple-zowe-instances).
* To distribute the load balancer cache between instances of the API Gateway, see [Distributing the load balancer cache](./distributed-load-balancer-cache).
* To ..., see [Setting a consistent service ID](./configuration-set-consistent-service-id.md).
