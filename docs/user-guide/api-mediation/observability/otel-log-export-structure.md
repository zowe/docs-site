# OpenTelemetry Log Export Structure

Review the hierarchical structure and attribute sequence of the OpenTelemetry (OTel) signals exported by the API Mediation Layer (API ML).

## High-Level Hierarchy
The export follows a three-layer nesting strategy:

* **Resource Logs**  
Metadata about the entity producing the logs (e.g., the service, host, and OS).

* **Scope Logs**  
Information about the specific library or "instrumentation scope" that collected the log.

* **Schema URL**
Information about which version of the OTel Semantic Conventions is being used.


## Resource Logs  
The top-level object, `resourceLogs`, serves as the entry point for a batch of signals, and contains all metadata related to the entity (the "Resource") that generated the telemetry.

### Resource Attributes (Metadata)

Attributes found under `resourceLogs` -> `resource` -> `attributes` represent the Standard Attributes. These are consistent across all log records in a single export batch.

* **deployment.environment**
  The deployment stage (for example, `dev`, `prod`). Type: String.

* **host.arch**
  The CPU architecture of the host (for example, `aarch64`). Type: String.

* **host.name**
  The identifier or FQDN of the host machine. Type: String.

* **os.description**
  Full text description of the Operating System. Type: String.

* **os.type**
  The operating system family (for example, darwin, linux). Type: String.

* **os.version**
  The specific version of the host OS. Type: String.

* **process.command_args**
  An array of strings representing the full command used to launch the Java process, including JVM flags and configuration paths. Type: Array.

* **process.executable.path**
  The absolute path to the Java binary. Type: String.

* **process.pid**
  The Process ID assigned by the Operating System. Type: Int.

* **process.runtime.description**
  Detailed string describing the JVM and build version. Type: String.

* **process.runtime.name**
  The commercial name of the runtime (for example, IBM Semeru). Type: String.

* **process.runtime.version**
  The technical version of the Java runtime. Type: String.

* **service.instance.id**
  A unique identifier for the specific running service instance. Type: String.

* **service.name**
  The logical name of the service (for example, apiml). Type: String.

* **service.version**
  The build version of the API ML component. Type: String.

* **telemetry.distro.name**
  The name of the OTel distribution (for example, opentelemetry-spring-boot-starter). Type: String.

* **telemetry.distro.version**
  The version of the distribution wrapper. Type: String.

* **telemetry.sdk.language**
  The SDK language (always java). Type: String.

* **telemetry.sdk.name**
  The official name of the OTel SDK. Type: String.

* **telemetry.sdk.version**
  The version of the core OpenTelemetry SDK. Type: String.

## Scope Logs

Following the `resource` metadata is the `scopeLogs` object: `org.zowe.apiml.opentelemetry`.  This object identifies the specific instrumentation library that captured the data.

The `logRecords` array within this section contains multiple signals. The SDK buffers these in memory and exports them as a single collection to reduce network overhead.

API ML uses a Batch Exporter to deliver these signals to the OTel Collector.

While multiple `logRecords` are delivered in a single bundle, the OTel Collector treats each entry in the `logRecords` array as a unique, independent signal.

## Log Record Attributes (Signals)

Each entry in the `logRecords` array represents a distinct signal and contains the following standard OpenTelemetry fields:

* **timeUnixNano**
  The precise time the event occurred in nanoseconds since the Unix epoch. Type: Int64.

* **observedTimeUnixNano**
  The time the event was observed by the OpenTelemetry SDK. Type: Int64.

* **severityNumber**
  A standardized numerical value (1-24) representing the severity of the log. Type: Int.

* **severityText**
  The human-readable string representing the severity level (e.g., INFO, ERROR). Type: String.

* **body**
  A JSON-formatted string containing the application-specific custom attributes. Type: String (JSON).

* **flags**
  Internal OpenTelemetry flags, typically used to indicate if the trace was sampled. Type: Int.

* **traceId**
  A unique 16-byte identifier for the entire distributed trace. Type: String.

* **spanId**
  A unique 8-byte identifier for the specific unit of work within the trace. Type: String.


## Body JSON Attributes (Custom Signals)

The following attributes are found within the stringified JSON of the `body` field. These represent the specific business and routing logic of the API Mediation Layer:

* **url.path**
  The absolute path of the request processed by the API ML Gateway. Type: String.

* **url.scheme**
  The protocol used for the request (e.g., https). Type: String.

* **http.request.method**
  The HTTP verb used for the request (e.g., GET, POST, PUT). Type: String.

* **error.type**
  High-level classification of a failure (e.g., Timeout, AuthError), populated on non-success results. Type: String.

* **error.message**
  Detailed description providing context for the encountered failure. Type: String.

* **user.id**
  The identifier of the authenticated principal or user. Type: String.

* **auth.method**
  The authentication mechanism utilized by the client (e.g., JWT, x509, zoweJwt). Type: String.

* **auth.status**
  The result of the credential validation process (e.g., OK, DENIED). Type: String.

* **service.id**
  The logical identifier of the target service in the API ML ecosystem. Type: String.

* **service.instance.id**
  The unique identifier for the specific instance of the service handling the request. Type: String.

* **service.response_code**
  The HTTP status code returned to the client following the operation. Type: String.


**Example Body Structure:**
```json
{
  "http.request.method": "GET",
  "service.id": "discovery",
  "service.response_code": "200",
  "url.path": "/eureka/apps/"
}
```
Log signals can now be emitted for each request that passes through the Gateway. The API ML Gateway generates a telemetry signal for every request it processes and has two primary categories of traffic:

* **Internal Service Requests**  
Requests directed to native API ML endpoints, such as authentication (`/login`, `/logout`) and discovery management (`/services`).

* **Routed Service Traffic**  
Requests that pass through the Gateway to reach external microservices onboarded to the API ML ecosystem.

In both scenarios, the Gateway acts as the central processing point, emitting a signal immediately after a result (success or failure) is obtained from the target service.

## Common Telemetry Scenarios and Signal Examples

The following examples illustrate the JSON-formatted string found within the `body` attribute of the OTLP log record. These examples represent the finalized result of various interactions within the API ML.

### Service Discovery Lifecycle
These signals are emitted by the **Discovery Service** and track how microservices interact with the Eureka registry.

**Successful Service Registration**
Indicates a new service instance has successfully introduced itself to the ecosystem.
* **Response Code:** `204` (No Content - typical for successful Eureka registration).
* **Key Path:** `/eureka/apps/{SERVICE_ID}`.

```json
{
  "http.request.method": "POST",
  "service.id": "discovery",
  "service.instance.id": "localhost:discovery:10011",
  "service.response_code": "204",
  "url.path": "/eureka/apps/DISCOVERABLECLIENT",
  "url.scheme": "https"
}
```
### A successful instance heartbeat

Indicates an onboarded service remains in "UP" status.

**Response Code:** `200` (OK).

**HTTP Method:** `PUT`.

```
{
  "http.request.method": "PUT",
  "service.id": "discovery",
  "service.instance.id": "localhost:discovery:10011",
  "service.response_code": "200",
  "url.path": "/eureka/apps/DISCOVERABLECLIENT/localhost:discoverableclient:10012",
  "url.scheme": "https"
}
```

### Gateway Authentication and Access

These signals track security events and internal API ML service requests.

#### Successful User Login
A finalized signal from the Gateway authentication provider.

**Service ID:** `gateway`.

**Response Code:** `204` (Success).
```
{
  "http.request.method": "POST",
  "service.id": "gateway",
  "service.instance.id": "localhost:gateway:10010",
  "service.response_code": "204",
  "url.path": "/gateway/api/v1/auth/login",
  "url.scheme": "https"
}
```

#### Authenticated Request to API Catalog

A successful request to the API Catalog service by an authenticated principal.

```
{
  "http.request.method": "GET",
  "service.id": "apicatalog",
  "service.instance.id": "localhost:apicatalog:10010",
  "service.response_code": "200",
  "url.path": "/apicatalog/api/v1/containers",
  "url.scheme": "https"
}
```