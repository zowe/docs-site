# Advanced API Mediation Layer Configuration

There are multiple options for customizing Zowe API Mediation Layer according to your specific use case. Review the various use cases presented in this article and follow the links to the corresponding documentation that describes how to perform your specific customization.

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

:::info**Required roles:** system programmer, system administrator
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

## Self-generate debug information

:::info**Required role:** system administrator
:::

As a system administrator, you can generate debug information to troubleshoot problems, or to provide you with additional information to pass along to Zowe support.
