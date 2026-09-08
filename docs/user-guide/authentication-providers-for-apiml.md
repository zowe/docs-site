# Configuring an authentication provider for API Mediation Layer

:::info Required roles: system administrator, security administrator
:::

Choose from the following providers to handle authentication for the API Gateway:  
- [Configuring an authentication provider for API Mediation Layer](#configuring-an-authentication-provider-for-api-mediation-layer)
  - [SAF authentication provider (Recommended)](#saf-authentication-provider-recommended)
  - [z/OSMF authentication provider](#zosmf-authentication-provider)
    - [Handling multiple z/OSMF instances](#handling-multiple-zosmf-instances)
  - [Validating authentication](#validating-authentication)

:::note
For development purposes, a dummy authentication provider is also available. This provider is not intend for production purposes. For more information, see [Dummy Authentication Provider](../extend/extend-apiml/api-mediation-layer-development-setup.md#dummy-authentication-provider) in _Deploy API Mediation Layer locally_.
:::

:::tip
We recommend that you use SAF as your authentication provider when possible. With the SAF provider, the API Gateway acts as the authentication service. The provided credentials are validated directly by the API Gateway via SAF APIs.
:::

## SAF authentication provider (Recommended)

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

## z/OSMF authentication provider

The `z/OSMF Authentication Provider` is the alternative provider which allows the API Gateway to authenticate with the z/OSMF service. In this case, user access to z/OSMF is required to authenticate.

Use the following properties of the API Gateway to enable the `z/OSMF Authentication Provider`:
```yaml
components.gateway.apiml.security.auth.provider: zosmf
components.gateway.apiml.security.auth.zosmfServiceId: ibmzosmf  # Default z/OSMF service ID
```

**`components.gateway.apiml.security.auth.zosmfServiceId`**  
 Change only if you customized the z/OSMF service ID in your static API definition. The value must match the `serviceId` of the z/OSMF static definition that Zowe generates during configuration.  
 **Default:** `ibmzosmf`.

 ### Handling multiple z/OSMF instances

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

## Validating authentication

Use the following steps to validate the functionality of both z/OSMF and SAF authentication providers.

When configuring the SAF authentication provider, the system issues the informational message `ZWEAM105I`. For details about this message, see [ZWEAM105I](../troubleshoot/troubleshoot-apiml-error-codes.md#zweam105i) in Error Message Codes.

:::note
The validation steps below use _cURL_. If _cURL_ is not available, or if network restrictions prevent external requests, you can execute _cURL_ directly from the API ML server itself. _cURL_ is shipped with the API ML binaries and can be found in the `bin/utils` directory of your Zowe installation.
:::

Follow these steps to validate your authentication setup:

1. Set your authentication provider to SAF.  
You can verify this setting by checking your server logs for the `ZWEAM105I` message.

1. Verify _cURL_ availability.  
Confirm that you have access to _cURL_ either on your local client machine or via the `bin/utils` directory on the API ML server.

1. Verify credentials and issue a token.  
Submit a login request to generate an authentication token.

    ```Bash
    curl -k -v -u "username:password" -X POST https://hostname:port/gateway/api/v1/auth/login
    ```
    A successful response returns an authentication token in the Set-Cookie header:

    ```
    < Set-Cookie: apimlAuthenticationToken=APIML_TOKEN
    ```

1. Validate the token.  
Verify that the token you just issued is recognized and valid.

    ```Bash
    curl -k -s -o /dev/null -w "%{http_code}" --cookie "apimlAuthenticationToken=APIML_TOKEN" https://hostname:port/gateway/api/v1/auth/query
    ```

    A successful validation returns an HTTP status code `200`.

    **Validating z/OSMF login via API ML token (SAF Provider)**  
With the SAF authentication provider, z/OSMF is not required for API ML authentication. However, if you use z/OSMF (for example, with Zowe client components), API ML must be configured to use PassTickets for z/OSMF authentication.

    For more information about configuring PassTickets, see [Enabling single sign on for extending services via PassTicket configuration](../user-guide/api-mediation/configuration-extender-passtickets.md). 

    :::note
    The following validation will fail if you are using the SAF provider and PassTickets have not been set up.
    :::

    Validate that login to z/OSMF via API  ML works using the APIML token:

    ```Bash
    curl -k -s -o /dev/null -w "%{http_code}" --cookie "apimlAuthenticationToken=APIML_TOKEN" -H "X-CSRF-ZOSMF-HEADER: *" -X POST https://hostname:port/ibmzosmf/api/v1/zosmf/services/authenticate
    ```

    A successful login returns an HTTP status code `200`.

1. For High Availability (HA) setup, validate cross-instance token trust.  
For HA setups, you must validate that individual instances trust tokens issued by another instance. Generate a token on one instance, and validate this same token against a different instance.

    **Generate token on instance 1:**
    ```bash
    curl -k -v -u "username:password" -X POST https://hostname1:port/gateway/api/v1/auth/login
    ```

    **Validate the same token on instance 2:**

    ```bash
    curl -k -s -o /dev/null -w "%{http_code}" --cookie "apimlAuthenticationToken=APIML_TOKEN" https://hostname2:port/gateway/api/v1/auth/query
    ```

    Successful validation across instances returns the HTTP status code `200`.





