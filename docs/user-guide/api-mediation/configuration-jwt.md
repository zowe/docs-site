# Enabling single sign on for clients via JSON Web Token (JWT) configuration 

:::info Roles: system programmer, system administrator, security administrator
:::

As a system programmer, you can customize how JSON Web Token (JWT) authentication is performed, the service that provides the JWT authentication token, the possiblity to refresh JWT, and other characteristics of JWT for consumption. 

- [Enabling single sign on for clients via JSON Web Token (JWT) configuration](#enabling-single-sign-on-for-clients-via-json-web-token-jwt-configuration)
  - [Using SAF as an authentication provider](#using-saf-as-an-authentication-provider)
  - [Enabling a JWT refresh endpoint](#enabling-a-jwt-refresh-endpoint)
  - [Authorization](#authorization)
  - [Additional customizable properties when using JWTs](#additional-customizable-properties-when-using-jwts)

## Using SAF as an authentication provider

Starting with Zowe v3.4.0, the API Gateway uses SAF as its default authentication provider (`apiml.security.auth.provider: saf`). Under this framework, authentication requests natively utilize SAF directly rather than routing explicitly through z/OSMF for initial validation.

While the SAF provider allows Zowe API Mediation Layer (API ML) to run on systems where z/OSMF is completely absent, many deployments still require communication with z/OSMF for core runtime services. When SAF authentication is active and z/OSMF is available on the system, the API Gateway automatically interacts with z/OSMF using a static service definition configured with the `httpBasicPassticket` authentication scheme. To ensure that generated tokens and requests are accepted by z/OSMF in this configuration, you must authorize the Zowe started task to generate PassTickets for the z/OSMF APPLID. For more information, see [Addressing z/OSMF PassTicket and authentication requirements](../api-mediation/configuring-passtickets-for-zosmf-authentication.md).
     
1. Open the `zowe.yaml` configuration file.
2. Find or add the following property, and ensure the value is set to `saf` to utilize SAF. Alternatively, you can change this value to `zosmf` if your environment explicitly mandates falling back to legacy z/OSMF direct authentication:
```
components.gateway.apiml.security.auth.provider: saf
```
3. Restart Zowe.

Authentication requests now utilize SAF as the authentication provider. API ML can run without z/OSMF present on the system. 

## Enabling a JWT refresh endpoint

Enable the `/gateway/api/v1/auth/refresh` endpoint to exchange a valid JWT for a new token with a new expiration date. Call the endpoint with a valid JWT and trusted client certificate. When utilizing either the SAF or z/OSMF authentication providers, you must ensure that API Mediation Layer is enabled for PassTicket generation and the z/OSMF APPLID is authorized.

For more information, see [Addressing z/OSMF PassTicket and authentication requirements](../api-mediation/configuring-passtickets-for-zosmf-authentication.md).


1. Open the file `zowe.yaml`.
2. Configure the following properties:

  * **components.gateway.apiml.security.allowtokenrefresh: true**  
  Add this property to enable the refresh endpoint.

  * **components.gateway.apiml.security.zosmf.applid**  
  If you use z/OSMF as an authentication provider, provide a valid `APPLID`. The API ML generates a PassTicket for the specified `APPLID` and subsequently uses this PassTicket to authenticate to z/OSMF. The default value in the installation of z/OSMF is `IZUDFLT`.

:::note

Problems have been noted with the functionality of the property `components.gateway.apiml.security.allowtokenrefresh`. For more information about the bug, see [issue #3468 in the api-layer repo](https://github.com/zowe/api-layer/issues/3468). 

We recommend you use the following workaround:

1. Configure the following parameter in `environments`:

  ```
  zowe:
    environments:
      APIML_SECURITY_ALLOWTOKENREFRESH: true 
  ```

2. Restart Zowe.

:::

## Authorization

Authorization is used to set the access rights of an entity.

In the API ML, authorization is performed by any of the following z/OS security managers:
* [ACF2](https://www.broadcom.com/products/mainframe/identity-access/acf2)
* [IBM RACF](https://www.ibm.com/support/knowledgecenter/zosbasics/com.ibm.zos.zsecurity/zsecc_042.htm)
* [Top Secret](https://www.broadcom.com/products/mainframe/security/top-secret). 

An authentication token is used as proof of valid authentication. The authorization checks, however, are always performed by the z/OS security manager.

## Additional customizable properties when using JWTs

You can also customize the following properties when authenticating with a JWT:

* **components.gateway.apiml.security.auth.zosmf.ServiceId**  
    This parameter specifies the z/OSMF service id used as authentication provider. The service id is defined in the static definition of z/OSMF. The default value is `ibmzosmf`.

* **components.gateway.apiml.security.auth.tokenProperties.expirationInSeconds**  
    This property is relevant only when the JWT is generated by the API Mediation Layer and specifies to the time before expiration.

    API ML generation of the JWT occurs in the following cases:

    * z/OSMF is only available as an older version which does not support JWTs  
    * The SAF provider is used

    To use a custom configuration for z/OSMF which changes the expiration of the LTPA token, it is necessary to also set the expiration in this parameter.
    

