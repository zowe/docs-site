# Configuring an authentication provider for API Mediation Layer

:::info Required roles: system administrator, security administrator
:::

Choose from the following providers to handle authentication for the API Gateway:  
- [Configuring an authentication provider for API Mediation Layer](#configuring-an-authentication-provider-for-api-mediation-layer)
  - [SAF Authentication Provider](#saf-authentication-provider)
  - [z/OSMF Authentication Provider](#zosmf-authentication-provider)

:::note
For development purposes, a dummy authentication provider is also available. This provider is not intend for production purposes. For more information, see [Dummy Authentication Provider](../extend/extend-apiml/api-mediation-layer-development-setup.md#dummy-authentication-provider) in _Deploy API Mediation Layer locally_.
:::

:::tip
* We recommend that you use SAF as your authentication provider when possible. With the SAF provider, the API Gateway acts as the authentication service. The provided credentials are validated directly by the API Gateway via SAF APIs.
:::

## SAF Authentication Provider

The `SAF Authentication Provider` allows the API Gateway to authenticate directly with the z/OS SAF provider that is installed on the system. The user needs a SAF account to authenticate. 

Use the following property of the API Gateway to enable the `SAF Authentication Provider`:
```
components.gateway.apiml.security.auth.provider: saf
```

:::note

In Zowe v3.4 and later versions, if the API Gateway is configured to use SAF authentication, z/OSMF APIs used by 
Desktop Explorer apps authenticate using PassTickets instead of a JWT/LTPA token. As such, ensure that 
PassTickets are configured and enabled for z/OSMF. 

:::

## z/OSMF Authentication Provider

The `z/OSMF Authentication Provider` is the alternative provider which allows the API Gateway to authenticate with the z/OSMF service. In this case, user access to z/OSMF is required to authenticate.

Use the following properties of the API Gateway to enable the `z/OSMF Authentication Provider`:
```
components.gateway.apiml.security.auth.provider: zosmf
components.gateway.apiml.security.auth.zosmfServiceId: ibmzosmf  # Replace me with the correct z/OSMF service id
```



