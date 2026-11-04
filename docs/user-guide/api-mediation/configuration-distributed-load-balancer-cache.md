# Distributing the load balancer cache

:::info Role: system programmer
:::
<!-- Not sure if this firest paragraph still applies in v 3 -->
You can choose to distribute the load balancer cache between instances of the API Gateway. To distribute the load balancer cache, it is necessary that the caching service is running. Gateway service instances are required to have the same DN (Distinguished name) on the server certificate. This may be relevant for the HA setups.

:::note
The v2 parameter `components.gateway.apiml.loadBalancer.distribute` is no longer supported, so the load balancer cache is shared through the caching service.
:::

Use the `authentication` value of the `customMetadata.apiml.lb.type` parameter to specify which load balancing schema the service requires. This is a sticky session functionality based on the ID of the user. The user ID is understood from the Zowe SSO token on the client's request. Requests without the token are routed in a round-robin fashion. The user is first routed in a round robin fashion, and then the routed instance Id is cached. The instance information is used for subsequent requests to route the client to the cached target service instance. This session's default expiration time is a global value defined in the Gateway. After the session expires, the process initiates again.

For more information, see [Customizing metadata](../../extend/extend-apiml/custom-metadata.md).