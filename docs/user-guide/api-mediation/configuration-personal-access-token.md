# Enabling single sign on for clients via Personal Access Token configuration 


:::info Roles: system programmer, system administrator, security administrator
:::

Review this article for steps that enable single sign on via Personal Access Tokens. 

## Prerequisite using the Caching Service

To enable Personal Access Token support when using the Caching Service, **Infinispan** is the required storage solution. Infinispan is part of Zowe installation. No additional software or installation is required when using this storage solution.

To enable this storage method, set the value of `components.caching-service.storage.mode` to `infinispan` in the `zowe.yaml` configuration file. For more information on other properties for infinispan and their values see [Infinispan configuration](../../extend/extend-apiml/api-mediation-infinispan.md#infinispan-configuration).


  ``` yaml
  components:
    caching-service:
      storage:
        mode: infinispan
        infinispan: 
          jgroups:
            port: 7098
  ```

## Enabling Personal Access Tokens

Use the following procedure to enable Personal Access Tokens.

1. Open the file `zowe.yaml`.
2. Find or add the property with the value `components.gateway.apiml.security.personalAccessToken.enabled: true`.
3. Restart Zowe.

For more information about using Personal Access Tokens, see [Authenticating with a Personal Access Token](./authenticating-with-personal-access-token.md).

:::note
To enable Personal Access Token support when using the Caching Service, **Infinispan** is the required storage solution. Infinispan is part of Zowe installation. No additional software or installation is required when using this storage solution.
:::