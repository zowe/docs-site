# Customizing JWT behavior as per integration with extending services

:::info**Roles:** system programmer, system administrator, security administrator
:::

## Adding a custom HTTP Auth header to store Zowe JWT token

:::info**Role:** system programmer
:::

If a southbound service needs to consume the Zowe JWT token from an HTTP request header to participate in the Zowe SSO, you can define a custom HTTP header name as part of the Gateway configuration.
The southbound service must use the `zoweJwt` scheme in order to leverage this functionality. Once the HTTP header name is defined, each request to the southbound service contains the JWT token in the custom header.

Use the following procedure to add the custom HTTP header.

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.security.auth.jwt.customAuthHeader` and set the value which represents the header's name.
3. Restart Zowe.

Requests through the Gateway towards the southbound service now contain the custom HTTP header with the JWT token.