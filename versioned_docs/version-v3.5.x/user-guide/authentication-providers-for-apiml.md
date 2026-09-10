# Configuring an authentication provider for API Mediation Layer

:::info Required roles: system administrator, security administrator
:::

Choose from the following providers to handle authentication for the API Gateway:  
- [Configuring an authentication provider for API Mediation Layer](#configuring-an-authentication-provider-for-api-mediation-layer)
  - [SAF Authentication Provider (Recommended)](#saf-authentication-provider-recommended)
  - [z/OSMF Authentication Provider](#zosmf-authentication-provider)
    - [Handling Multiple z/OSMF Instances](#handling-multiple-zosmf-instances)

:::note
For development purposes, a dummy authentication provider is also available. This provider is not intend for production purposes. For more information, see [Dummy Authentication Provider](../extend/extend-apiml/api-mediation-layer-development-setup.md#dummy-authentication-provider) in _Deploy API Mediation Layer locally_.
:::

:::tip
We recommend that you use SAF as your authentication provider when possible. With the SAF provider, the API Gateway acts as the authentication service. The provided credentials are validated directly by the API Gateway via SAF APIs.
:::

## SAF Authentication Provider (Recommended)

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
```yaml
components.gateway.apiml.security.auth.provider: zosmf
components.gateway.apiml.security.auth.zosmfServiceId: ibmzosmf  # Default z/OSMF service ID
```

**`components.gateway.apiml.security.auth.zosmfServiceId`**  
 Change only if you customized the z/OSMF service ID in your static API definition. The value must match the `serviceId` of the z/OSMF static definition that Zowe generates during configuration.  
 **Default:** `ibmzosmf`.

 ### Handling Multiple z/OSMF Instances

 If your environment utilizes multiple z/OSMF instances, choose one of the following configuration options based on your architectural needs:

- **Identical instances (HA across sysplex):** 
Use this option if your z/OSMF instances are identical and you want the API Gateway to automatically load-balance requests across your sysplex for High Availability.

  Use the same service ID (`ibmzosmf`). The Gateway discovers all instances and load-balances.

  **Example:**
  ```
  components.gateway.apiml.security.auth.zosmfServiceId: ibmzosmf
  ```

- **Distinct instances (different LPARs with different configs):** 

  Assign a unique service ID to each distinct z/OSMF instance. This unique value must exactly match the custom serviceId specified in the corresponding z/OSMF static API definition that Zowe generates during configuration.
  
  **Example:**
  ```
  components.gateway.apiml.security.auth.zosmfServiceId: ibmzosmf-lpar2
  ```



