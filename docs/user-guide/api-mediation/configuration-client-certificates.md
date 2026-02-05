# Enabling single sign on for clients via X.509 client certificate configuration

:::info Roles: system programmer, system administrator, security administrator
:::

In Zowe you can validate your identity with the API ML using X.509 client certificates to access onboarded APIs. This functionality is disabled by default. Follow the steps in this article to enable authentication against API ML onboarded APIs with X.509 client certificates.

There are two methods to enable X.509 client certificate functionality integrated with the SAF:

* The default and recommended method via the Internal Mapper component of API Mediation Layer  
  **Note:** The Internal API ML Mapper is simpler to configure and provides more functionality than ZSS.
* The older and deprecated method via ZSS

Review this article to learn about the required configuration to authenticate with either method.

For information about the usage of the client certificate when this feature is enabled, see [Authenticating with client certificates](../authenticating-with-client-certificates.md).

## General prerequisites

* Zowe has correct TLS setup.
* The truststore, which is configured in the config file, needs to contain the CA certificates of all incoming client certificates.

:::caution Important:

* The Zowe runtime user must be enabled to perform identity mapping in SAF. For more information about identity mapping in SAF, see [Configure main Zowe server to use client certificate identity mapping](../configure-zos-system.md#configure-main-zowe-server-to-use-client-certificate-identity-mapping).
:::

* Verify that the Zowe runtime user is allowed to log in to z/OSMF. (Check that the user is a member of the default `IZUUSER` group.)

  :::note
  Ensure that you have the Issuer certificate imported in the truststore or in the SAF keyring. If you define a certificate using openssl on Linux, import the Certificate Authority. Certificates can also be generated in SAF.
  :::

  :::caution Important:

  * PassTicket generation must be enabled for the Zowe runtime user. The user must be able to generate a PassTicket for the user and for the APPLID of z/OSMF. For more information, see [Configuring Zowe to use PassTickets](../api-mediation/configuration-extender-passtickets.md#configuring-zowe-to-use-passtickets).
  :::

  :::tip
  There is a limitation with respect to performing authentication using Z Secure Services (ZSS) with ACF2 systems. If you are using ACF2, use the recommended Internal API ML Mapper.
  :::

## Configure the Internal API ML Mapper

Use the following procedure to enable the zowe.yaml file to use a X.509 client certificate as the method of authentication for the API Mediation Layer Gateway. Note that the use of the Internal API ML Mapper is the recommended method.

1. Open the `zowe.yaml` configuration file.
2. Configure the following properties, or add these properties if not present in your configuration yaml file:

   * **components.gateway.apiml.security.x509.enabled**  
     This property is the global feature toggle. Set the value to `true` to enable client certificate functionality.
   * **components.gateway.apiml.security.useInternalMapper**  
     This property is the global feature toggle. Set the value to `true` to enable the Internal API ML Mapper.

3. Restart Zowe to re-initialize the API Mediation Layer Gateway so that the Internal API ML Mapper is operational.

## Configure ZSS

For information about configuring ZSS, see [Configure components zss](../../appendix/zowe-yaml-configuration.md#configure-component-zss) in _Zowe YAML server configuration file references_.

### Prerequisites for ZSS

When using ZSS for authentication, ensure that you satisfy the following prerequisites before you set up client certificate authentication:

Set the password for the Zowe runtime user. The user is created with the `NOPASSWORD` parameter by the Zowe installer. It is necessary to change this password.

For RACF, issue the following TSO command:

```racf
ALTUSER <ZOWE_RUNTIME_USER (ZWESVUSR by default)> PASSWORD(<NEWPASSWORD>)
```
For other security systems, refer to the documentation for an equivalent command.

### Configuring X.509 Client Certificate Authentication in zowe.yaml

Enable X.509 client certificates as an authentication method for the API Mediation Layer Gateway.

#### Prerequisites for X.509 Client Certificates

Before you update configuration for X.509 Client Certificate authentication, ensure that the Zowe runtime user ID (default `ZWESVUSR`) has the required authorization to use the **`IRR.RUSERMAP`** resource within the **`FACILITY`** class. 

These permissions are typically established during installation via the `ZWESECUR` JCL or configuration workflow. This authorization is required for the Gateway to map certificates to SAF user identities.

#### X.509 Client Certificate Authentication Configuration Procedure

Follow these steps to update the `zowe.yaml` configuration file and enable certificate-based authentication:

1. Open your `zowe.yaml` file.

2. Enable the primary feature flags.  
   Navigate to the security section and update the following properties to activate the certificate filter and define the authentication handshake:
   * **components.gateway.apiml.security.x509.enabled**  
   Set this to `true` to enable the global client certificate functionality.
   * **components.gateway.apiml.security.zosmf.applid**  
   If using z/OSMF as an authentication provider, specify a valid `APPLID`. The API ML generates a PassTicket for this ID to authenticate users to z/OSMF. The default value is typically `IZUDFLT`.

3. Configure an external mapper (Optional).   
  :::note
  Skip this step if you use the default ZSS mapping service. 
  ::: 
   
   If your environment requires user mapping through a custom external API, update the following property:
   * **components.gateway.apiml.security.x509.externalMapperUrl**  
   Specifies the location of the API used to map certificates to SAF owners.
     
     **Default ZSS URL:** `https://${ZWE_haInstance_hostname}:${ZWE_components_gateway_port}/zss/api/v1/certificate/x509/map`

4. Define the runtime user for certificate mapping (Optional).  
  :::note
  Skip this step if your Zowe runtime user ID is the default `ZWESVUSR`.
  :::

   If you customized the `ZWESECUR` JCL (for example, by setting `// SET ZOWEUSER=customID`), you must explicitly define the specified user to allow the Gateway to generate JSON Web Tokens (JWTs) for mapping requests:
   * **components.gateway.apiml.security.x509.externalMapperUser**  
   Set this to your customized Zowe runtime user ID.
   
   **Example:**
   ```yaml
   components.gateway.apiml.security.x509.externalMapperUser: yournewuserid
   ```

5. Restart Zowe to refresh the configuration and initialize the new security filters.

X.509 client certificate authentication is now active. The API ML can now attempt to authenticate clients using their provided certificates upon the next connection attempt.