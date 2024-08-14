# Enabling single sign on for clients via client certificate configuration


:::info Roles: system programmer, system administrator, security administrator
:::

Use the following procedure to enable the zowe.yaml file to use a client certificate as the method of authentication for the API Mediation Layer Gateway. 

1. Open the `zowe.yaml` configuration file.
2. Configure the following properties:

   * **components.gateway.apiml.security.x509.enabled**  
   This property is the global feature toggle. Set the value to `true` to enable client certificate functionality.

   * **components.gateway.apiml.security.zosmf.applid**  
   When z/OSMF is used as an authentication provider, provide a valid `APPLID` to allow for client certificate authentication. The API ML generates a passticket for the specified `APPLID` and subsequently uses this passticket to authenticate to z/OSMF. The default value in the installation of z/OSMF is `IZUDFLT`.
  
   :::note
   The following steps are only required if the ZSS hostname or default Zowe user name are altered:
   :::

3. Change the following property if user mapping is provided by an external API:

   * **components.gateway.apiml.security.x509.externalMapperUrl**

   :::note
   Skip this step if user mapping is not provided by an external API.
   :::

   The API Mediation Gateway uses an external API to map a certificate to the owner in SAF. This property informs the Gateway about the location of this API. ZSS is the default API provider in Zowe. You can provide your own API to perform the mapping. In this case, it is necessary to customize this value.

   The following URL is the default value for Zowe and ZSS:

     ```
     https://${ZWE_haInstance_hostname}:${GATEWAY_PORT}/zss/api/v1/certificate/x509/map
     ```

4. Add the following property if the Zowe runtime userId is altered from the default `ZWESVUSR`:

:::note
Skip this step if the Zowe runtime userId is not altered from the default `ZWESVUSR`.
:::

   * **components.gateway.apiml.security.x509.externalMapperUser**
   
   To authenticate to the mapping API, a JWT is sent with the request. The token represents the user that is configured with this property. The user authorization is required to use the `IRR.RUSERMAP` resource within the `FACILITY` class. The default value is `ZWESVUSR`. Permissions are set up during installation with the `ZWESECUR` JCL or workflow.

   If you customized the `ZWESECUR` JCL or workflow (the customization of zowe runtime user: `// SET ZOWEUSER=ZWESVUSR * userid for Zowe started task`) and changed the default USERID, create the `components.gateway.apiml.security.x509.externalMapperUser` property and set the value by adding a new line as in the following example:

   **Example:**

   ```
   components.gateway.apiml.security.x509.externalMapperUser: yournewuserid  
   ```

5. Restart Zowe.

