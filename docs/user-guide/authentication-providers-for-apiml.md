# Authentication providers for API Mediation Layer

API ML contains the following providers to handle authentication for the API Gateway:  
* [z/OSMF Authentication Provider](#z-osmf-authentication-provider)
* [SAF Authentication Provider](#saf-authentication-provider)
* [Dummy Authentication Provider](#dummy-authentication-provider)

In most cases, we recommend you use  the z/OSMF Authentication Provider. z/OSMF is part of z/OS. As such, this provider is the best option for providing the authentication API.

When z/OSMF is not available, we recommend you use the SAF Authentication provider. With the SAF provider, the API Gateway acts as the authentication service. The provided credentials are validated directly by API Gateway via SAF APIs.

## z/OSMF Authentication Provider

The `z/OSMF Authentication Provider` allows the API Gateway to authenticate with the z/OSMF service. The user needs z/OSMF access in order to authenticate.

Use the following properties of the API Gateway to enable the `z/OSMF Authentication Provider`:
```
apiml.security.auth.provider: zosmf
apiml.security.auth.zosmfServiceId: zosmf  # Replace me with the correct z/OSMF service id
```
## SAF Authentication Provider

The `SAF Authentication Provider` allows the API Gateway to authenticate directly with the z/OS SAF provider that is installed on the system. The user needs a SAF account to authenticate. 

Use the following property of the API Gateway to enable the `SAF Authentication Provider`:
```
apiml.security.auth.provider: saf
```
**Note:** To provide your own implementation of the SAF IDT provider, see the [Implement new SAF provider](implement-new-saf-provider.md) guidelines.

## Dummy Authentication Provider

The `Dummy Authentication Provider` implements simple authentication for development purposes using dummy credentials (username:  `user`, password `user`). The `Dummy Authentication Provider` makes it possible for the API Gateway to run without authenticating with the z/OSMF service.

Use the following property of the API Gateway to enable the `Dummy Authentication Provider`:
```
apiml.security.auth.provider: dummy
```
