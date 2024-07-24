# Enabling single sign on for clients via personal access token configuration 


:::info Roles: system programmer, system administrator, security administrator
:::

For Personal Access Token functionality to work properly, Caching Service with Infinispan ad backedn provider needs to be started. 

Use the following procedure to enable personal access tokens.

1. Open the file `zowe.yaml`.
2. Find or add the property with the value `components.gateway.apiml.security.personalAccessToken.enabled: true`.
3. Restart Zowe.

For more information about using personal access tokens, see [Authenticating with a Personal Access Token](./authenticating-with-personal-access-token.md).