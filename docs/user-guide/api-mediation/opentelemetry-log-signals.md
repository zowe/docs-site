# OpenTelemetry log signals

:::info Role: system programmer
:::

The API Mediation Layer emits structured OpenTelemetry log signals for every request processed by the API Gateway. Each log signal contains a JSON payload of attributes that describe the request, the target service, and the authentication context. These logs are written to the `org.zowe.apiml.opentelemetry` logger at `INFO` level and can be consumed by OpenTelemetry collectors and observability platforms.

## Enabling OpenTelemetry log signals

OpenTelemetry log signals are enabled by default. The API Gateway will emit a log signal for every request unless explicitly disabled. To disable OpenTelemetry log signals, set the `otel.sdk.disabled` property to `true`:

```yaml
zowe:
  components:
    gateway:
      environment:
        OTEL_SDK_DISABLED: "true"
```

Alternatively, you can set the Spring Boot property directly:

```yaml
otel:
  sdk:
    disabled: true
```

## Configuring the OpenTelemetry logger

The log signals are written to the `org.zowe.apiml.opentelemetry` logger. You can configure this logger independently of other API Gateway loggers. For example, to write OTel signals to a dedicated file, add the following to your `logback.xml`:

```xml
<appender name="OTEL" class="ch.qos.logback.core.FileAppender">
    <file>${STORAGE_LOCATION}/otel-signals.log</file>
    <encoder>
        <pattern>%msg%n</pattern>
    </encoder>
</appender>

<logger name="org.zowe.apiml.opentelemetry" level="INFO" additivity="false">
    <appender-ref ref="OTEL"/>
</logger>
```

:::tip
Use `additivity="false"` to prevent OTel signal logs from appearing in your main application log.
:::

## Log signal attributes

Each log signal is a JSON object with the following attributes, depending on the authentication context.

### Base attributes (present in all log signals)

The following attributes are set for every request processed by the API Gateway, regardless of authentication method or outcome:

| Attribute | Type | Description | Example |
|:----------|:-----|:------------|:--------|
| `http.request.method` | `string` | HTTP method of the incoming request | `"GET"` |
| `url.scheme` | `string` | URL scheme | `"https"` |
| `url.path` | `string` | Request path | `"/service/api/v1/resource"` |
| `service.id` | `string` | Lowercase service ID | `"gateway"`, `"testservicebp"` |
| `service.instance.id` | `string` | Hostname, service ID, and port | `"localhost:gateway:10010"` |
| `service.response_code` | `string` | HTTP response status code | `"200"`, `"500"` |

### Authentication attributes

Authentication attributes are added by the authentication filters based on the request's authentication scheme.

| Attribute | Type | Description |
|:----------|:-----|:------------|
| `auth.service.auth.method` | `string` | Authentication scheme: `"bypass"`, `"zosmf"`, `"x509"`, `"passticket"`, `"oidc"`, etc. |
| `auth.method` | `string` | Authentication source type: `"zosmf"`, `"JWT"`, `"CLIENT_CERT"`, etc. |
| `user.id` | `string` | User ID associated with the request |
| `user.distributed.id` | `string[]` | Array of distributed user IDs (for multi-user scenarios) |
| `auth.status` | `string` | Authentication status: `"OK"` or `"ERROR"` |
| `auth.error.type` | `string` | Fully qualified class name of the authentication error |
| `auth.error.message` | `string` | Human-readable authentication error message |

## Anonymous requests (bypass authentication)

For routes configured with bypass authentication (services or endpoints that do not require authentication), the API Gateway emits log signals with anonymous user context.

### Attributes for bypass requests

The following attributes are set for all bypass requests:

| Attribute | Value | Notes |
|:----------|:------|:------|
| `auth.service.auth.method` | `"bypass"` | Authentication scheme is always `"bypass"` |
| `user.id` | `"anonymous"` | Explicitly set to `"anonymous"` for bypass routes |
| `auth.status` | `"OK"` | Bypass routes always report authentication as successful |

### Example bypass log signal

```json
{
  "http.request.method": "GET",
  "url.scheme": "https",
  "url.path": "/testservicebp/api/v1/200",
  "service.id": "testservicebp",
  "service.instance.id": "localhost:testservicebp:10020",
  "service.response_code": "200",
  "auth.service.auth.method": "bypass",
  "user.id": "anonymous",
  "auth.status": "OK"
}
```

### Bypass error attributes

When a service behind a bypass route returns an error status code (such as `500`), the log signal still reports anonymous user context and successful authentication status. This is because the authentication phase (bypass) always succeeds — the error is a downstream service error, not an authentication failure:

```json
{
  "http.request.method": "GET",
  "url.scheme": "https",
  "url.path": "/testservicebp/api/v1/500",
  "service.id": "testservicebp",
  "service.instance.id": "localhost:testservicebp:10020",
  "service.response_code": "500",
  "auth.service.auth.method": "bypass",
  "user.id": "anonymous",
  "auth.status": "OK"
}
```

The `auth.error.type` and `auth.error.message` attributes are **not present** for bypass routes, as these attributes are only populated when authentication itself fails.

## Authenticated requests

For routes requiring authentication, the API Gateway populates the user identity from the authentication response.

### Successful authentication

When authentication succeeds:

| Attribute | Value |
|:----------|:------|
| `user.id` | Uppercase user ID from the authentication provider (e.g., `"ZWESVUSR"`) |
| `auth.status` | `"OK"` |
| `user.distributed.id` | Array of distributed user IDs if applicable |
| `auth.method` | Authentication source type (e.g., `"zosmf"`, `"JWT"`, `"CLIENT_CERT"`) |

Example for a successful X509-authenticated request:

```json
{
  "http.request.method": "POST",
  "url.scheme": "https",
  "url.path": "/discoverable-client/api/v1/service",
  "service.id": "discoverableclient",
  "service.instance.id": "localhost:discoverableclient:10012",
  "service.response_code": "200",
  "auth.service.auth.method": "x509",
  "auth.method": "CLIENT_CERT",
  "user.id": "ZWESVUSR",
  "auth.status": "OK"
}
```

### Failed authentication

When authentication fails, the log signal includes error details:

| Attribute | Value |
|:----------|:------|
| `auth.status` | `"ERROR"` |
| `auth.error.type` | Exception class name (e.g., `"org.zowe.apiml.security.common.token.TokenNotValidException"`) |
| `auth.error.message` | Error message (e.g., `"Invalid or missing authentication"`) |

Example for a failed token-based authentication:

```json
{
  "http.request.method": "GET",
  "url.scheme": "https",
  "url.path": "/discoverable-client/api/v1/protected",
  "service.id": "discoverableclient",
  "service.instance.id": "localhost:discoverableclient:10012",
  "service.response_code": "401",
  "auth.service.auth.method": "zosmf",
  "auth.status": "ERROR",
  "auth.error.type": "org.zowe.apiml.security.common.token.TokenNotValidException",
  "auth.error.message": "Token is not valid for URL '/discoverable-client/api/v1/protected'"
}
```

## Distinguishing anonymous from authenticated requests

You can distinguish between anonymous and authenticated requests by examining two key attributes:

| Scenario | `user.id` | `auth.service.auth.method` | `auth.status` |
|:---------|:----------|:---------------------------|:--------------|
| **Bypass (anonymous)** | `"anonymous"` (lowercase) | `"bypass"` | `"OK"` |
| **Authenticated (success)** | Uppercase user ID | `"zosmf"`, `"x509"`, `"oidc"`, etc. | `"OK"` |
| **Authenticated (failure)** | May not be set | Value of the attempted scheme | `"ERROR"` |

The `user.id` attribute is always lowercase `"anonymous"` for bypass routes and always **uppercase** for authenticated routes. The `auth.service.auth.method` attribute is always `"bypass"` for anonymous requests, while authenticated requests display the actual authentication scheme used.
