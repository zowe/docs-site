# Advanced API Mediation Layer Configuration

There are multiple options for customizing Zowe API Mediation Layer according to your specific use case. Review the various use cases presented in this article, and the roles that perform them, and follow the links to the corresponding documentation that describes how to perform your specific customization. API ML customization can be performed in the following areas:

* [General API ML services configuration](#general-api-ml-services-configuration)
* [Limit access to information or services in the API Catalog](#limit-access-to-information-or-services-in-the-api-catalog)
* [Minimize entering user credentials](#minimize-entering-user-credentials)
* [Self-generate debugging information](#self-generate-debugging-information)
* [Customize JWT authentication](#customize-jwt-authentication)
* [Customize configurations when integrating services with API ML](#customize-configurations-when-integrating-services-with-api-ml)
* [Customize API ML load limits for single instances and in HA](#customize-api-ml-load-limits-for-single-instances-and-in-ha)
* [Customize the API Catalog UI](#customize-the-api-catalog-ui)
* [Retreive a specific service within your environment](#retreive-a-specific-service-within-your-environment)
* [Set a consistent service ID](#set-a-consistent-service-id)

## General API ML services configuration

The following configuration options are applicable to all services:

* **apiml.service.hostname**  
This property is used to set the Discovery Service hostname. The value can be set by defining the `ZWE_haInstance_hostname` property in the zowe.yaml file.

* **apiml.service.port**  
  This property is used to set the Discovery Service port. The value can be set by defining the `ZWE_configs_port` property in the zowe.yaml file.

* **AT-TLS setup**  
    The communication server on z/OS provides a functionality to encrypt HTTP communication for on-platform running jobs. This functionality is refered to as Application Transparent Transport Layer Security (AT-TLS). Starting with Zowe version 1.24, it is possible to leverage AT-TLS within the API Mediation Layer. Each API ML component can run with AT-TLS rules applied.  

    For more information, see [AT-TLS](./api-mediation/api-gateway-configuration/#at-tls) in the article Advanced Gateway features configuration.

## Limit access to information or services in the API Catalog

:::info**Required role:** system administrator
:::

* As a system administrator, you can limit access to information and/or services available within the API Catalog and through the API Mediation Layer.

    For more information, see [Hide service information](./api-mediation/api-catalog-configuration/#hide-service-information) in the article Advanced API Catalog features configuration.

* The API ML can check for the authorization of the user on certain endpoints. Access to a SAF resource is checked via an External Security Manager (ESM)

    For more information, see [SAF Resource Checking](./api-mediation/api-gateway-configuration/#saf-resource-checking) in the article Advanced Gateway features configuration.

## Minimize entering user credentials

:::info**Roles:** system programmer, system administrator
:::

As a system programmer or system administrator, you can customize API ML to minimize how often you are required to enter your user credentials.

* You can use API Mediation Layer to generate, validate, and invalidate a Personal Access Token (PAT) that can enable access to tools such as VCS without having to use credentials of a specific person. The use of PAT does not require storing mainframe credentials as part of the automation configuration on a server during application development on z/OS.

    For more information, see [Using a Personal Access Token (PAT)](./api-mediation/api-mediation-personal-access-token.md). 

* Another method to minimize re-entering user credentials is to enable the JWT token refresh endpoint. Enabling the refresh endpoint allows you to exchange a valid JWT token for a new token with a new expiration date.

    For more information, see [Enable JWT token refresh endpoint](./api-mediation/api-gateway-configuration/#enable-jwt-token-refresh-endpoint) in the article Advanced Gateway features configuration.

* Minimizing re-entering credentials can also be performed through Gateway client certificate authentication, whereby you can use a client certificate as the method of authentication for the API Mediation Layer Gateway. 

    For more information, see [Gateway client certificate authentication](./api-mediation/api-gateway-configuration/#gateway-client-certificate-authentication) in the article Advanced Gateway features configuration.

* Another method to minimize re-entering credentials on the client side is to authenticate your service with the API Mediation Layer through the use of PassTickets. When an API client provides a valid Zowe JWT token or client certificate to the API ML, the API Gateway then generates a valid PassTicket for any API service that supports PassTickets. The API Gateway then uses the PassTicket to access that API service. 

    For more information, see [Configuring Zowe to use PassTickets](../extend/extend-apiml/api-mediation-passtickets.md).

## Self-generate debugging information

:::info**Role:** system administrator
:::

As a system administrator, you can generate debug information to troubleshoot problems, or to provide you with additional information to pass along to Zowe support. Enable the following properties to assist with debugging:

* **ZWE_configs_debug**  
This property can be used to unconditionally add active debug profiles. For more information, see [Adding active profiles](https://docs.spring.io/spring-boot/docs/1.2.0.M1/reference/html/boot-features-profiles.html#boot-features-adding-active-profiles) in the Spring documentation.

* **ZWE_configs_sslDebug**  
This property can be used to enable the SSL debugging. This property can also assist with determining what exactly is happening at the SSL layer.
This property uses the `-Djavax.net.debug` Java parameter when starting the Gateway component. By setting `ZWE_configs_sslDebug` to ssl, all SSL debugging is turned on. The `ZWE_configs_sslDebug` parameter also accepts other values that enables a different level of tracing. For more information, see the article **_Debugging Utilities_** in the IBM documentation.

    **Note:** This property can also be enabled for other API ML components.

## Customize JWT authentication 

:::info**Role:** system programmer
:::

As a system programmer, you can customize how JWT authentication is performed, and the service that provides the JWT authentication token.

* By default, the API Gateway uses z/OSMF as an authentication provider. It is possible, however, to switch to SAF as the authentication provider. The intended usage of SAF as an authentication provider is for systems without z/OSMF.

    For more information, see [SAF as an Authentication provider](./api-mediation/api-gateway-configuration/#saf-as-an-authentication-provider) in the article Advanced Gateway features configuration. 
    
    Also see the following properties:
    
    * **[apiml.security.auth.tokenProperties.expirationInSeconds](./api-mediation/api-mediation-internal-configuration/#runtime-configuration)**  
    This property is relevant only when the JWT is generated by the API Mediation Layer and refers to th specific time before expiration.

    * **[components.gateway.apiml.security.auth.zosmf.ServiceId](./api-mediation/api-gateway-configuration/#runtime-configuration)**  
        This parameter specifies the z/OSMF service id used as authentication provider. The service id is defined in the static definition of z/OSMF. The default value is zosmf.

 ## Customize configurations when integrating services with API ML 

 :::info**Role:** system programmer
:::

As a system programmer there are various configuration requirements that apply when extending services to integrate with API ML. Review the following customizations that apply to your use case:

 * To configure Zowe to use PassTickets and enable PassTicket support in the Gateway, see: [Configuring Zowe to use PassTickets](../extend/extend-apiml/api-mediation-passtickets.md), and [Enabling PassTicket support](./api-mediation/api-gateway-configuration/#enabling-passticket-support).
 * To disable the use of encoded slashes in the URL path of a request, see [encoded slashes](./api-mediation/api-gateway-configuration/#encoded-slashes)
 * To add a custom HTTP Auth header to store a Zowe JWT token, see [Add a custom HTTP Auth header to store Zowe JWT token](./api-mediation/api-gateway-configuration/#add-a-custom-http-auth-header-to-store-zowe-jwt-token).
 * To add custom HTTP Auth headers to store a user ID and PassTicket, see [Add custom HTTP Auth headers to store user ID and PassTicket](./api-mediation/api-gateway-configuration/#add-custom-http-auth-headers-to-store-user-id-and-passticket).
 * To configure API ML to handle CORS for a new service, see [CORS handling](./api-mediation/api-gateway-configuration/#cors-handling).

 ## Customize API ML load limits for single instances and in HA 

:::info**Role:** system programmer
::: 

 As a system programmer, you can customize your configuration for how API ML manages both northbound and southbound load limits in single instances:

 * To change the number of concurrent connections per route passing through the API Gateway, see [Connection limits](./api-mediation/api-gateway-configuration/#connection-limits).
 * To change the global Gateway timeout value for the API ML instance, see [Gateway timeouts](./api-mediation/api-gateway-configuration/#gateway-timeouts).
 * Also see the following properties in [API Gateway configuration parameters](./api-mediation/api-mediation-internal-configuration/#runtime-configuration): 
    * `server.maxTotalConnections`
    * `server.maxConnectionsPerRoute`

Review the following configuration customization options for how API ML manages  load limits in high availability:

* To customize the Gateway retry policy, see [Gateway retry policy](./api-mediation/api-gateway-configuration/#gateway-retry-policy).
* To distribute the load balancer cache between instances of the API Gateway, see [Distributed load balancer cache](./api-mediation/api-gateway-configuration/#distributed-load-balancer-cache).
* To configure a unique cookie name for the instances to prevent overwriting of the default cookie name in the case of multiple Zowe instances, or for more complex deployment strategies, see [Unique cookie name for multiple zowe instances](./api-mediation/api-gateway-configuration/#unique-cookie-name-for-multiple-zowe-instances).

## Customize the API Catalog UI

:::info**Role:** system administrator
:::

As a system administrator, you can customize the API Catalog UI to have a similar interface to your organization's service, or with your existing visualization portal.

* To customize the logotype and selected syle options in the zowe.yaml file, see [API Catalog branding](./api-mediation/api-catalog-configuration/#api-catalog-branding).
* To replace or remove the API Catolog service from the Gateway home page and health checks, see [Replace or remove the Catalog with another service](./api-mediation/api-gateway-configuration/#replace-or-remove-the-catalog-with-another-service).

## Retreive a specific service within your environment

:::info**Roles:** system programmer, system administrator
:::

The API Gateway can output a special header that contains the value of the instance ID of the API service that the request has been routed to. This is useful for understanding which service instance is being called.

For more information, see [Routed instance header](./api-mediation/api-gateway-configuration/#routed-instance-header).

## Set a consistent service ID 

:::info**Role:** API service extender:::

As an API service extender you can modify the service ID to ensure compatibility of services that use a non-conformant organization prefix with Zowe v2.

For more information, see the following parameter in the article Discovery Service configuration parameters:

* **[components.discovery.apiml.discovery.serviceIdPrefixReplacer](./api-mediation/discovery-service-configuration/#api-ml-configuration)**  
    This parameter is used to modify the service ID of a service instance, before it registers to API ML. Using this parameter ensures compatibility of services that use a non-conformant organization prefix with v2, based on Zowe v2 conformance.






