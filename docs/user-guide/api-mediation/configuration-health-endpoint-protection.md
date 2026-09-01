# Configuring Health Check Protection

:::info Role: system programmer
::: 

As a system programmer, you can disable the security setting for the health check endpoint of the API Gateway. This setting determines whether the health check endpoint is accessible without authentication, or alternatively requires authentication. In Zowe V2, authentication was not required. Disabling protection for the health check endpoint can limit the security of the API Gateway by allowing access to sensitive status information about the Gateway.

Use the following procedure to set the value of the health check endpoint of the API Gateway:  

1. Open the file `zowe.yaml`.
2. Configure the following property:

* `components.gateway.apiml.health.protected`  
This property defines whether the health check endpoint is accessible with or without authentication.

:::note
The default value of this parameter is `true`.
:::

**Example:**

```yaml
components:
    gateway:
        apiml:
            gateway:
                health:
                    protected: true
```

In this example, setting `protected` to `true` protects the health check endpoint by requiring authentication. The default setting is `true` (protected).Only authenticated users can access the health check endpoint. Requiring authentication ensures that sensitive information about the status of the Gateway is not exposed to unauthenticated users.

To allow open access to the health check endpoint, set the parameter to `false`. Setting this parameter to `false` permits access to this endpoint without authentication. In this case, anyone can access the health check endpoint and obtain information about the status of the Gateway.

The health endpoint protection can be configured on other Zowe components as well:

* `components.discovery.apiml.health.protected`  
  This property defines whether the health check endpoint on Discovery Service is accessible with or without authentication.
* `components.api-catalog.apiml.health.protected`  
  This property defines whether the health check endpoint on API Catalog Service is accessible with or without authentication.
* `components.zaas.apiml.health.protected`
  This property defines whether the health check endpoint on ZAAS Service is accessible with or without authentication.

## Environment Recommendations

When setting this parameter, we recommend applying the following values according to your environment:

* **In Production Environments**  
It is recommended to set `components.*.apiml.health.protected` to `true` to enhance security and protect sensitive information about the API Gateway's health status. This is the default.

* **In Development/Testing Environments**  
 setting `components.*.apiml.health.protected` to `false` can simplify the testing process, reduce development overhead, and assist with debugging.  


-----------------------------------------------------------------------

# Configuring Health Check, Information, and Version Endpoint Protection

:::info Role: system programmer
::: 

As a system programmer, you can configure the security settings for the API Gateway's operational endpoints. By default, the API ML endpoints require authentication to prevent unauthorized access to sensitive operational metadata. This behavior applies to both single-service and microservices deployment modes.

Review this topic to identify which endpoints are protected, determine default authentication settings, update your monitoring requests with supported credentials, and optionally opt into unauthenticated access if your environment requires it.

## Migration Guidance and Upgrade Warning

:::caution Upgrade Warning
Because the default value of the protection setting remains `true`, the endpoints for application info and version now actively enforce authentication. 

Monitoring systems, availability probes, readiness checks, automated scripts, and diagnostic tools that call these endpoints without credentials will begin receiving HTTP `401 Unauthorized` responses after upgrading. Administrators must either update clients to authenticate (recommended) or explicitly disable protection where unauthenticated access is required.
:::

## Endpoint Matrix

The Gateway configuration was expanded to govern multiple endpoints under a single property, which differs from other components whose settings remained unchanged. 

The following matrix details which endpoints are governed by the `apiml.health.protected` property for each component:

| Component | Governed Endpoints | Property |
| :--- | :--- | :--- |
| **Gateway** | `/application/health`<br>`/application/info`<br>`/application/version`<br>`/gateway/version`<br>`/gateway/api/v1/version` | `components.gateway.apiml.health.protected` |
| **Discovery** | `/application/health` | `components.discovery.apiml.health.protected` |
| **API Catalog** | `/application/health` | `components.api-catalog.apiml.health.protected` |
| **ZAAS** | `/application/health` | `components.zaas.apiml.health.protected` |

## Authentication and Access Control

When protection is enabled, unauthenticated requests to the listed endpoints return an HTTP `401`. Authenticated read (`GET`) requests to these endpoints are allowed. 

Accessing these informational endpoints does **not** require the `ZOWE.APIML.DEBUG` SAF resource, as that resource is strictly reserved for modifying sensitive actuator state.

You can authenticate monitoring and diagnostic requests using the following supported methods:

* **Basic Authentication:**  
Provide a valid z/OS username and password (for example, using the `--user` flag in `curl` or a standard `Authorization: Basic <base64>` header).
* **API ML JWT:**  
Send a valid JSON Web Token in the `Authorization` header using the `Bearer <token>` format.

:::note
While the `apimlAuthenticationToken` cookie is supported for active browser sessions, we do not recommend relying on browser cookies for external monitoring automation or script-based health checks.
:::

## Configuration 

Use the following procedures to set the value of the health check and informational endpoints in your `zowe.yaml` file. The correct property hierarchy is `components.gateway.apiml.health.protected`.

### Keep operational endpoints protected (Default)

The default value of this parameter is `true`, which is the recommended setting for production environments to ensure operational metadata is not exposed.

**zowe.yaml:**
```yaml
components:
  gateway:
    apiml:
      health:
        protected: true
```

### Explicitly allow unauthenticated access

Setting this property to `false` permits unauthenticated access to **all five** listed Gateway endpoints, not only `/application/health`.

**zowe.yaml:**
```yaml
components:
  gateway:
    apiml:
      health:
        protected: false
```

:::caution Security Restriction
Setting `components.gateway.apiml.health.protected: false` exposes the Gateway health, information, and version endpoints without authentication. This can reveal operational status, build identifiers, commit information, or other deployment metadata. Use the default protected setting in production unless unauthenticated monitoring is required and access is restricted through another trusted control.
:::


## Verification Examples

You can use the following copy-ready commands to verify the expected HTTP status with and without authentication.

**Verify that an unauthenticated request is rejected:**
*Expected status: 401*
```bash
curl --silent --insecure \
  --output /dev/null \
  --write-out '%{http_code}\n' \
  https://<gateway-host>:<gateway-port>/application/info
```

**Access the endpoint with Basic authentication:**
```bash
curl --silent --insecure \
  --user '<user>:<password>' \
  https://<gateway-host>:<gateway-port>/application/info
```

**Verify all version endpoint aliases:**
*Expected status for each authenticated request: 200*
```bash
for endpoint in \
  /application/version \
  /gateway/version \
  /gateway/api/v1/version
do
  curl --silent --insecure \
    --user '<user>:<password>' \
    --output /dev/null \
    --write-out "${endpoint}: %{http_code}\n" \
    "https://<gateway-host>:<gateway-port>${endpoint}"
done
```
