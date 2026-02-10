# Enabling single sign on for clients via X.509 client certificate configuration

:::info Roles: system programmer, system administrator, security administrator
:::

In Zowe you can validate your identity with the API ML using X.509 client certificates to access onboarded APIs. This functionality is disabled by default. Follow the steps in this article to enable authentication against API ML onboarded APIs with X.509 client certificates.

## Procedure overview

Follow these steps to enable single sign on for clients via X.509 client certificate configuration:

1. Map your authentication with the API ML Gateway through any one of the following options:

     * Configure the Internal API ML Mapper (recommended)  
        This is the default setting in Zowe v3 and later releases.
     * Configure ZSS  
        (You also have the option to configure ZSS in a separate Zowe instance.)

2. Configure X.509 Client Certificate Authentication in zowe.yaml.

## Prerequisites

Before enabling this feature, ensure your environment meets the following requirements:

* **TLS Setup:** Zowe must have a correct TLS configuration. The truststore must contain the Certificate Authority (CA) certificates of all incoming client certificates.
* **SAF Identity Mapping:** The Zowe runtime user must be authorized to perform identity mapping in SAF. For more information about identity mapping in SAF, see [Configure main Zowe server to use client certificate identity mapping](../configure-zos-system.md#configure-main-zowe-server-to-use-client-certificate-identity-mapping).
* **z/OSMF Access:** The Zowe runtime user must be a member of the default `IZUUSER` group to log in to z/OSMF.
* **PassTicket Generation:** The Zowe runtime user must be able to generate PassTickets for the user and for the z/OSMF `APPLID`. For more information, see [Configuring Zowe to use PassTickets](../api-mediation/configuration-extender-passtickets.md#configuring-zowe-to-use-passtickets).

:::note
There is a limitation with respect to performing authentication using Z Secure Services (ZSS) with ACF2 systems. If you are using ACF2, use the recommended Internal API ML Mapper.
:::

## Map your authentication with the API ML Gateway

You can enable X.509 client certificate functionality integrated with the SAF through either of the the following methods:

* **Configure the Internal API ML Mapper**  
This is the default and most performant method for Zowe v3 and later. It is simpler to configure and is the required method for ACF2 users.  

* **Configure ZSS**  
This legacy method uses Z Secure Services (ZSS) to perform mapping. You also have the option to call a ZSS endpoint in a separate Zowe instance. 

  **Notes:**  
  * ZSS has limitations with ACF2 systems. 
  * This method requires the certificate to be added to the user in z/OS.
  * ZSS mapping does not support `IDMAP`.   

:::note
For information about the usage of the client certificate when this feature is enabled, see [Authenticating with client certificates](../authenticating-with-client-certificates.md).
:::

<details>
<summary> Click here to configure the internal API ML mapper. (recommended)</summary>

## Configure the internal API ML mapper

Use the following procedure to enable the zowe.yaml file to use a X.509 client certificate as the method of authentication for the API Mediation Layer Gateway. Note that the use of the Internal API ML Mapper is the recommended method.

1. Open the `zowe.yaml` configuration file.
2. Configure the following properties, or add these properties if not present in your configuration yaml file:

   * **components.gateway.apiml.security.x509.enabled**  
     This property is the global feature toggle. Set the value to `true` to enable client certificate functionality.
   * **components.gateway.apiml.security.useInternalMapper**  
     This property is the global feature toggle. Set the value to `true` to enable the Internal API ML Mapper. (This is the default in v3)

3. Restart Zowe to re-initialize the API Mediation Layer Gateway so that the Internal API ML Mapper is operational.

You can now proceed to [configuring X.509 Client Certificate Authentication in zowe.yaml](#configure-x509-client-certificate-authentication-in-zoweyaml).

</details>

<details>
<summary>Click here to Configure ZSS.</summary>

## Configure ZSS

**Note:** Configuring ZSS is not the recommended mapping method. For details about the recommended mapping method, see [Configure the Internal API ML Mapper](#configure-the-internal-api-ml-mapper).

For information about configuring ZSS, see [Configure components zss](../../appendix/zowe-yaml-configuration.md#configure-component-zss) in _Zowe YAML server configuration file references_.

1. Set Runtime User Password.

    ZSS cannot perform mapping if the Zowe runtime user (default `ZWESVUSR`) is set to `NOPASSWORD`.

    ```racf
    ALTUSER <ZOWE_RUNTIME_USER (ZWESVUSR by default)> PASSWORD(<NEWPASSWORD>)
    ```

    For other security systems, refer to the documentation for an equivalent command.

2. External URL (Conditional)  

    If your ZSS instance is located in a separate Zowe instance, update the following property in zowe.yaml:

    * **components.gateway.apiml.security.x509.externalMapperUrl**  

      Specifies the location of the API used to map certificates to SAF owners.

      **Default ZSS URL:**

      ```url
        https://${ZWE_haInstance_hostname}:${ZWE_components_gateway_port}/zss/api/v1/certificate/x509/map
      ```

You can now proceed to [configuring X.509 Client Certificate Authentication in zowe.yaml](#configure-x509-client-certificate-authentication-in-zoweyaml).

</details>

## Configure X.509 Client Certificate Authentication in zowe.yaml

Enable X.509 client certificates as an authentication method for the API Mediation Layer Gateway.

### Prerequisites for X.509 Client Certificates

Before you update configuration for X.509 Client Certificate authentication, ensure that the Zowe runtime user ID (default `ZWESVUSR`) has the required authorization to use the **`IRR.RUSERMAP`** resource within the **`FACILITY`** class.

These permissions are typically established during installation via the `ZWESECUR` JCL or configuration workflow. This authorization is required for the Gateway to map certificates to SAF user identities.

### X.509 Client Certificate Authentication Configuration Procedure

Follow these steps to update the `zowe.yaml` configuration file and enable certificate-based authentication:

1. Open your `zowe.yaml` file.

2. Enable the primary feature flags.

    Navigate to the security section and update the following properties to activate the certificate filter and define the authentication andshake:

    * **components.gateway.apiml.security.x509.enabled**  
      Set this to `true` to enable the global client certificate functionality.
    * **components.gateway.apiml.security.zosmf.applid**  
      If using z/OSMF as an authentication provider, specify a valid `APPLID`. The API ML generates a PassTicket for this ID to authenticate sers to z/OSMF. The default value is typically `IZUDFLT`.

3. Define the runtime user for certificate mapping (Optional).  

  :::note
  Skip this step if your Zowe runtime user ID is the default `ZWESVUSR`.
  :::

   If you customized the `ZWESECUR` JCL (for example, by setting `// SET ZOWEUSER=customID`), you must explicitly define the specified user to allow the Gateway to generate JSON Web Tokens (JWTs) for mapping requests:

* **components.gateway.apiml.security.x509.externalMapperUser**  
    Set this to your customized Zowe runtime user ID.

   **Example:**

   ```yaml
    components:
      gateway:
        apiml:
          security:
            x509:
              externalMapperUser: yournewuserid
   ```

4. Restart Zowe to refresh the configuration and initialize the new security filters.

X.509 client certificate authentication is now active. The API ML can now attempt to authenticate clients using their provided certificates upon the next connection attempt.
