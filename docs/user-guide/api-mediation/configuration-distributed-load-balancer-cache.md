# Distributing the load balancer cache

:::info Role: system programmer
:::

The Gateway uses the caching service to store sticky-session routing records only for services that set `customMetadata.apiml.lb.type` to `authentication`. In this case, the caching service must be running. With the default round-robin schema, no cache is used. This may be relevant for the HA setups.

:::note
The v2 parameter `components.gateway.apiml.loadBalancer.distribute` does not exist in v3 and has no effect. There is no switch to enable or disable distribution. Remove it from zowe.yaml.
:::

Use the `authentication` value of the `customMetadata.apiml.lb.type` parameter to specify which load balancing schema the service requires. This is a sticky session functionality based on the ID of the user. The user ID is understood from the Zowe SSO token on the client's request. Requests without the token are routed in a round-robin fashion. The user is first routed in a round robin fashion, and then the routed instance Id is cached. The instance information is used for subsequent requests to route the client to the cached target service instance. This session's default expiration time is a global value defined in the Gateway. After the session expires, the process initiates again.

For more information, see [Customizing metadata](../../extend/extend-apiml/custom-metadata.md).