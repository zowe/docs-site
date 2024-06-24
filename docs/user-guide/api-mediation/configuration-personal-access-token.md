# Enabling single sign on for clients via Personal Access Token configuration 


:::info Roles: system programmer, system administrator, security administrator
:::

Use the following procedure to enable Personal Access Tokens.

1. Open the file `zowe.yaml`.
2. Find or add the property with the value `components.gateway.apiml.security.personalAccessToken.enabled: true`.
3. Restart Zowe.

For more information about using Personal Access Tokens, see [Authenticating with a Personal Access Token](./authenticating-with-personal-access-token.md).

:::note
In order to enable the Personal Access Tokens support when using the Caching Service, **Infinispan** is required as the storage solution.
:::