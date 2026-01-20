# Advanced API Mediation Layer Configuration

There are multiple options for customizing Zowe API Mediation Layer according to your specific use case. Review the various use cases presented in this section, and follow the links to the corresponding documentation that describes how to perform your specific customization. API ML customization can be performed in the following areas:

* [Enabling Single-Service deployment of API Mediation Layer](./api-mediation/api-mediation-modulith.md)
* [Enabling Single Sign On for Clients](./api-mediation/configuration-single-sign-on-user.md)
    * [Enabling single sign on for clients via X.509 client certificate configuration](./api-mediation/configuration-client-certificates.md)
    * [Enabling single sign on for clients via Personal Access Token configuration](./api-mediation/configuration-personal-access-token.md)
    * [Enabling single sign on for clients via JSON Web Token (JWT) configuration](./api-mediation/configuration-jwt.md)
* [Enabling Single Sign On for Extending Services](./api-mediation/configuration-enable-single-sign-on-extenders.md)
    * [Enabling single sign on for extending services via JSON Web Token (JWT) configuration](./api-mediation/configuration-extender-jwt.md)
    * [Enabling single sign on for extending services via PassTicket configuration](./api-mediation/configuration-extender-passtickets.md)
* [Customizing routing behavior](./api-mediation/configuration-routing.md)
    * [Configuring routing in a multi-tenant environment](./api-mediation/configuration-multi-tenancy-routing.md)
    * [Customizing Cross-Origin Resource Sharing (CORS)](./api-mediation/configuration-cors.md)
    * [Using encoded slashes](./api-mediation/configuration-url-handling.md)
    * [Customizing Gateway retry policy](./api-mediation/configuration-gateway-retry-policy.md)
    * [Configuring a unique cookie name for a specific API ML instance](./api-mediation/configuration-unique-cookie-name-for-multiple-zowe-instances.md)
    * [Retrieving a specific service within your environment](./api-mediation/configuration-access-specific-instance-of-service.md)
    * [Distributing the load balancer cache](./api-mediation/configuration-distributed-load-balancer-cache.md)
    * [Setting a consistent service ID](./api-mediation/configuration-set-consistent-service-id.md)
* [Customizing management of API ML load limits](./api-mediation/configuration-customizing-management-of-apiml-load-limits.md)
    * [Customizing connection limits](./api-mediation/configuration-connection-limits.md)
    * [Customizing Gateway timeouts](./api-mediation/configuration-gateway-timeouts.md)
    * [Customizing Gateway rate limiter](./api-mediation/customizing-gateway-rate-limiter.md)
    * [Customizing Java Heap sizes](./api-mediation/configuration-customizing-java-heap-sizes.md) 
* [Configuring authorization of API ML](./api-mediation/configuration-authorization.md)
    * [Limiting access to information or services in the API Catalog](./api-mediation/configuration-limiting-access-to-info-or-services-in-api-catalog.md)
    * [Configuring SAF resource checking](./api-mediation/configuration-saf-resource-checking.md)
    * [Configuring Health Check Protection](./api-mediation/configuration-health-endpoint-protection.md)
* [Configuring an authentication provider for API Mediation Layer](./authentication-providers-for-apiml.md)
* Configuring storage for the Caching service
    * [Using Infinispan as a storage solution through the Caching service](../extend/extend-apiml/api-mediation-infinispan.md)
    * [Using VSAM as a storage solution through the Caching service](../extend/extend-apiml/api-mediation-vsam.md)
    * [Using Redis as a storage solution through the Caching service](../extend/extend-apiml/api-mediation-redis.md)
* [Customizing the API Catalog UI](./api-mediation/configuration-customizing-the-api-catalog-ui.md)
* [Customizing Zowe API Mediation Layer logging](./api-mediation/configuration-logging.md)
* [Configuring initial API Mediation Layer startup message 
* [Customizing logging for API Mediation Layer startup for SYSLOG](./api-mediation/wto-message-on-startup.md)
  

