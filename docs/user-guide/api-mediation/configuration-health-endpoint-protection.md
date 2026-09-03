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
