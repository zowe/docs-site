# Enabling a JWT token refresh endpoint

:::info**Roles:** system programmer, system administrator, security administrator
:::

Enable the `/gateway/api/v1/auth/refresh` endpoint to exchange a valid JWT token for a new token with a new expiration date. Call the endpoint with a valid JWT token and trusted client certificate. When using the z/OSMF authentication provider, enable API Mediation Layer for PassTicket generation and configure the z/OSMF APPLID. 

For more information, see [Configure Passtickets](../../extend/extend-apiml/api-mediation-passtickets.md).

1. Open the file `zowe.yaml`.
2. Configure the following properties:

    * **components.gateway.apiml.security.allowtokenrefresh: true**  
    Add this property to enable the refresh endpoint.

    * **components.gateway.apiml.security.zosmf.applid**  
    If you use z/OSMF as an authentication provider, provide a valid `APPLID`. The API ML generates a passticket for the specified `APPLID` and subsequently uses this passticket to authenticate to z/OSMF. The default value in the installation of z/OSMF is `IZUDFLT`.

3. Restart Zowe.