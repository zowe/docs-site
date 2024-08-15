# Enabling single sign on for clients via personal access token configuration 


:::info Roles: system programmer, system administrator, security administrator
:::

By default the API Mediation Layer does not provide the ability to use personal access tokens. For more information about about
this functionality, see [Personal Access Tokens](api-mediation-personal-access-token.md).

Use the following procedure to enable personal access tokens.

1. Open the file `zowe.yaml`.
2. Find or add the property with the value `components.gateway.apiml.security.personalAccessToken.enabled: true`.
3. Restart Zowe.