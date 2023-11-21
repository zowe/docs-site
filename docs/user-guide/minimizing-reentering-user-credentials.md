# Minimizing reentering user credentials

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