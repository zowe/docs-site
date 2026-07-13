# Configuring an authentication provider for API Mediation Layer

:::info Required roles: system administrator, security administrator
:::

Choose from the following providers to handle authentication for the API Gateway:  
- [Configuring an authentication provider for API Mediation Layer](#configuring-an-authentication-provider-for-api-mediation-layer)
  - [SAF Authentication Provider (Recommended)](#saf-authentication-provider-recommended)
  - [z/OSMF Authentication Provider](#zosmf-authentication-provider)
    - [Handling Multiple z/OSMF Instances](#handling-multiple-zosmf-instances)
  - [Validating authentication](#validating-authentication)
    - [Environment-specific validation](#environment-specific-validation)
      - [High Availability (HA) setups — Validate cross-instance token trust](#high-availability-ha-setups--validate-cross-instance-token-trust)
      - [SAF provider — Validate z/OSMF login via API ML token](#saf-provider--validate-zosmf-login-via-api-ml-token)

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

## Validating authentication

Use the following validation steps to ensure that API ML is successfully issuing and validating tokens.

1. Ensure that your authetication provider is set to SAF:
    ```
    components.gateway.apiml.security.auth.provider: saf
    ```
    Verify your gateway log during startup has the following informational message:
    ```
    ZWEAM105I Using authentication provider: saf
    ```

2. Verify _curl_ availability.  
A version of _curl_ is shipped with the API ML binaries and can be located in the `bin/utils` directory of your Zowe installation.

3. Verify credentials and issue a token.  
To verify that you can successfully log in and receive a token, submit a POST request to the login endpoint with your credentials.
    ```bash
    curl -k -v -u "username:password" -X POST https://hostname:port/gateway/api/v1/auth/login
    ```
    A successful response returns an authentication token in the `Set-Cookie` header:
    ```
    < Set-Cookie: apimlAuthenticationToken=APIML_TOKEN
    ```

4. Validate the token by querying the auth endpoint:
    ```bash
    curl -k -s -o /dev/null -w "%{http_code}" --cookie "apimlAuthenticationToken=APIML_TOKEN" https://hostname:port/gateway/api/v1/auth/query
    ```
    Successful validation returns HTTP status code `200`.

### Environment-specific validation

You can also perform validation according to your specific enviornment:
* **High Availability (HA) setups:** Validate cross-instance token trust
* **z/OSMF Passthrough:** Validate z/OSMF login via API ML token

#### High Availability (HA) setups — Validate cross-instance token trust

For High Availability setups, validate that individual instances trust tokens issued by another instance. Generate a token on one instance, then validate the same token against the other instances.

```bash
# Generate token on instance 1 
curl -k -v -u "username:password" -X POST https://hostname1:port/gateway/api/v1/auth/login 

# Validate the same token on instance 2 
curl -k -s -o /dev/null -w "%{http_code}" --cookie "apimlAuthenticationToken=APIML_TOKEN" https://hostname2:port/gateway/api/v1/auth/query
```
Successful validation across instances returns HTTP status code `200`.

#### SAF provider — Validate z/OSMF login via API ML token

With the SAF authentication provider, z/OSMF is not required for API ML authentication. However, if you use z/OSMF (for example, Zowe client components), API ML must be configured to use PassTickets for z/OSMF authentication. Validate that login to z/OSMF via API ML works using the API ML token:
```bash
curl -k -s -o /dev/null -w "%{http_code}" --cookie "apimlAuthenticationToken=APIML_TOKEN" -H "X-CSRF-ZOSMF-HEADER: *" -X POST https://hostname:port/ibmzosmf/api/v1/zosmf/services/authenticate
```
Successful login returns HTTP status code `200`.
