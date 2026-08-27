# Configuring an authentication provider for API Mediation Layer

:::info Required roles: system administrator, security administrator
:::

Choose from the following providers to handle authentication for the API Gateway:  
* [z/OSMF Authentication Provider](#zosmf-authentication-provider)
* [SAF Authentication Provider](#saf-authentication-provider)

:::note
For development purposes, a dummy authentication provider is also available. This provider is not intend for production purposes. For more information, see [Dummy Authentication Provider](../extend/extend-apiml/api-mediation-layer-development-setup.md#dummy-authentication-provider) in _Deploy API Mediation Layer locally_.
:::

:::tip
* In most cases, we recommend you use  the z/OSMF Authentication Provider. z/OSMF is part of z/OS. As such, this provider is the best option for providing the authentication API.

* When z/OSMF is not available, we recommend you use the SAF Authentication provider. With the SAF provider, the API Gateway acts as the authentication service. The provided credentials are validated directly by API Gateway via SAF APIs.
:::

## z/OSMF Authentication Provider

The `z/OSMF Authentication Provider` allows the API Gateway to authenticate with the z/OSMF service. The user needs z/OSMF access in order to authenticate.

Use the following properties of the API Gateway to enable the `z/OSMF Authentication Provider`:
```
components.gateway.apiml.security.auth.provider: zosmf
components.gateway.apiml.security.auth.zosmfServiceId: ibmzosmf  # Replace me with the correct z/OSMF service id
```
## SAF Authentication Provider

The `SAF Authentication Provider` allows the API Gateway to authenticate directly with the z/OS SAF provider that is installed on the system. The user needs a SAF account to authenticate. 

Use the following property of the API Gateway to enable the `SAF Authentication Provider`:
```
components.gateway.apiml.security.auth.provider: saf
```


