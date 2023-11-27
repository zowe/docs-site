# Minimizing reentering user credentials (Single Sign On for Users)

:::info**Roles:** system programmer, system administrator, security administrator
:::

As a system programmer or system administrator, you can customize the way API ML handles authentication towards clients such as CLI and/or users. Usage of the following methods limits the frequency the user is reqired to use credentials to access API Mediation Layer. 

* One method to minimize the frequency of entering credentials is to use API Mediation Layer to generate, validate, and invalidate a Personal Access Token (PAT). This method enables access to tools such as VCS without having to use credentials of a specific person. The use of PAT does not require storing mainframe credentials as part of the automation configuration on a server during application development on z/OS.

 For more information, see [Using a Personal Access Token (PAT)](./api-mediation/api-mediation-personal-access-token). 

* Another method to minimize re-entering user credentials is to enable the JWT token refresh endpoint. Enabling the refresh endpoint allows you to exchange a valid JWT token for a new token with a new expiration date.

 For more information, see [Enabling JWT token refresh endpoint](./enabling-a-jwt-token-refresh-endpoint).

* Minimizing re-entering credentials can also be performed through Gateway client certificate authentication, whereby you can use a client certificate as the method of authentication for the API Mediation Layer Gateway. 

 For more information, see [Enabling a client certificate to authenticate for API ML Gateway](./gateway-client-certificate-authentication)
