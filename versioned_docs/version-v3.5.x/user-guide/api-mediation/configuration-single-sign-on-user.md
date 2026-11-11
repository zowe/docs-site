# Enabling single sign on for clients

:::info Roles: system programmer, system administrator, security administrator
:::

As a system programmer or system administrator, you can customize the way API ML handles authentication towards clients such as CLI and/or users. Each of the following methods limits the frequency the user is reqired to enter credentials to access API Mediation Layer: 

* One method to minimize the frequency of re-entering credentials is via Gateway client certificate authentication, whereby you can use a client certificate as the method of authentication for the API Mediation Layer Gateway. 

 For more information, see [Enabling single sign on for clients via client certificate configuration](./configuration-client-certificates.md)

* Another method to minimize the frequency of entering credentials is to use API Mediation Layer to generate, validate, and invalidate a Personal Access Token (PAT). This method enables access to tools such as VCS without having to use credentials of a specific person. The use of PAT does not require storing mainframe credentials as part of the automation configuration on a server during application development on z/OS.

 For more information, see [Enabling single sign on for clients via personal access token configuration](./configuration-personal-access-token.md). 

 * Minimizing re-entering user credentials can also be performed via the JWT token refresh endpoint. Enabling the refresh endpoint allows you to exchange a valid JWT token for a new token with a new expiration date.

 For more information, see [Enabling single sign on for clients via JWT token configuration](./configuration-jwt.md).
