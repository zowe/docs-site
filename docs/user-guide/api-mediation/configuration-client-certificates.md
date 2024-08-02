# Enabling single sign on for clients via client certificate configuration

:::info Roles: system programmer, system administrator, security administrator
:::

You can authenticate against API ML onboarded APIs. This functionality is disabled by default. Follow the steps in this article to enable authentication against API ML onboarded APIs. 

There are two methods to enable client certificate functionality: 
* The default and recommended method via the internal mapper component of API Mediation Layer  
The internal API ML mapper is simpler to configure and provides more functionality than ZSS.
* The older and deprecated method via ZSS

Review this article to learn about the required configuration to authenticate with either method. 

For information about the usage of the client certificate when this feature is enabled, see [Authenticating with client certificates](../authenticating-with-client-certificates.md).

## General prerequisites

* Zowe has correct TLS setup 
* The external CA used for issuing client certificates to specific users is imported to the truststore or keyring of the API Mediation Layer.

:::caution Important:
* The Zowe runtime user must be enabled to perform identity mapping in SAF. For more information about identity mapping in SAF, see [Configure main Zowe server to use client certificate identity mapping](../configure-zos-system.md#configure-main-zowe-server-to-use-distributed-identity-mapping).
:::

## Configure Internal API ML Mapper

Use the following procedure to enable the zowe.yaml file to use a client certificate as the method of authentication for the API Mediation Layer Gateway. Note that the use of the internal API ML mapper is the recommended method.

1. Open the `zowe.yaml` configuration file.
2. Configure the following properties:

   * **components.gateway.apiml.security.x509.enabled**  
     This property is the global feature toggle. Set the value to `true` to enable client certificate functionality.
   * **components.gateway.apiml.security.useInternalMapper**  
     This property is the global feature toggle. Set the value to `true` to enable Internal Mapper

3. Restart Zowe.

## Configure ZSS

For information about configuring ZSS, see [Configure components zss](../../appendix/zowe-yaml-configuration.md#configure-component-zss) in the References section of Zowe Docs.

### Prerequisites for ZSS

When using ZSS for authentication, ensure that you satisfy the following prerequisites before you set up client certificate authentication:

1. Set the password for the Zowe runtime user. The user is created with the `NOPASSWORD` parameter by the Zowe installer. It is necessary to change this password.

For RACF, issue the following TSO command:

`ALTUSER <ZOWE_RUNTIME_USER (ZWESVUSR by default)> PASSWORD(<NEWPASSWORD>)`

For other security systems, refer to the documentation for an equivalent command.

2. Verify that the Zowe runtime user is allowed to log in to z/OSMF. (Check that the user is a member of the default `IZUUSER` group.)

:::note
Ensure that you have the Issuer certificate imported in the truststore or in the SAF keyring. Alternatively, you can generate these certificates in SAF.
:::

:::caution Important:
* PassTicket generation must be enabled for the Zowe runtime user. The user must be able to generate a PassTicket for the user and for the APPLID of z/OSMF. For more information, see [Configuring Zowe to use PassTickets](../api-mediation/configuration-extender-passtickets.md#configuring-zowe-to-use-passtickets).
:::

:::tip
There is a limitation with respect to performing authentication using Z Secure Services (ZSS) with ACF2 systems. If you are using ACF2, use the recommended internal API ML mapper.
:::

### Enabling zowe.yaml to use a client certificate

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

  :::note
   Skip this step if user mapping is not provided by an external API.
   :::
   * **components.gateway.apiml.security.x509.externalMapperUrl**  
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

You enabled zowe.yaml to use a client certificate.