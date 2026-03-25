# Interpreting API ML OpenTelemetry Log Export Structures

Interpret API ML telemetry signals to pinpoint the root cause of latency spikes, audit security events, and correlate cross-service requests across your mainframe ecosystem.

:::info Required role: System administrator
:::

API ML signals act as a post-execution receipt. A signal is generated and queued for export only after the Gateway has obtained a definitive result (success or failure) from a target service. To optimize network performance, signals are buffered in memory and transmitted via a Batch Exporter. While delivered as a bundle, each entry in the export is processed by your OTel Collector as a unique, independent signal.

By linking specific backend performance metrics to individual user actions and mainframe resource states within each signal, administrators can pinpoint whether a latency spike was caused by a routing error, an authentication failure, or an infrastructure bottleneck. To optimize network performance, these captured attributes are buffered in memory and transmitted via a Batch Exporter. While delivered as a bundle, each entry in the export is processed by your OTel Collector as a unique, independent signal.

## High-Level Hierarchy

API ML exports observability data using a hierarchical OpenTelemetry (OTel) structure that correlates infrastructure metadata with specific application events. This hierarchy consists of the following log types:

* **Resource Logs**  
Resource Logs provide the metadata about the entity producing the logs (for example, the service, host, and OS). Resource Logs define the environmental and process context, such as host architecture and service names, to ensure that global metadata is defined once rather than redundantly for every event.
For details, see [Resource Attributes](configuring-apiml-observability.md#resource-attributes) in _Configuring API ML Observability_

* **Scope Logs**  
Scope Logs identify the specific instrumentation library responsible for capturing the telemetry. Within this section, the `logRecords` array contains the individual signals, which the SDK buffers in memory and exports as a single collection to minimize network overhead and improve performance.

  While multiple `logRecords` are delivered in a single bundle, the OTel Collector processes each entry in the array as a unique, independent signal.

* **Schema URL**  
The Schema URL provides information about which version of the OTel Semantic Conventions is being used. This URL ensures that all attributes are standardized, allowing downstream collectors to consistently interpret the data across different monitoring platforms.

## Functional Classification of API ML Signals

API ML signals represent a standardized telemetry record for every transaction handled by the Gateway. To monitor the ecosystem effectively, administrators must distinguish between the two primary traffic flows captured by these signals:

| Category | Target Endpoint | Description | Common Paths |
| :--- | :--- | :--- | :--- |
| **Internal Service Requests** | API ML Core Services | Requests processed directly by native API ML components for administrative or session-based tasks. | `/login`, `/logout`, `/services` |
| **Routed Service Traffic** | Onboarded Microservices | Requests where the Gateway acts as a reverse proxy, authenticating and forwarding traffic to external microservices. | `/apicatalog/api/v1/...`, `/your-app/api/...` |


## Log Record Attributes (Signals)

Each entry in the `logRecords` array represents a distinct signal and contains the following standard OpenTelemetry fields:

:::info
For details about these log record attributes, see [Log and Event Record Definition](https://opentelemetry.io/docs/specs/otel/logs/data-model/#log-and-event-record-definition) in the OpenTelemetry documentation.
:::

* **timeUnixNano**  
  The precise time the event occurred in nanoseconds since the Unix epoch. Type: Int64.

* **observedTimeUnixNano**  
  The time the event was observed by the OpenTelemetry SDK. Type: Int64.

* **severityNumber**  
  A standardized numerical value (1-24) representing the severity of the log. Type: Int.

* **severityText**  
  The human-readable string representing the severity level (for example, INFO, ERROR). Type: String.

* **body**  
  A JSON-formatted string containing the application-specific custom attributes. Type: String (JSON).

* **flags**  
  Internal OpenTelemetry flags, typically used to indicate if the trace was sampled. Type: Int.

* **traceId**  
  A unique 16-byte identifier for the entire distributed trace. Type: String.

* **spanId**  
  A unique 8-byte identifier for the specific unit of work within the trace. Type: String.


## Body JSON Attributes (Custom Signals)

The following attributes are found within the JSON of the `body` field and represent API ML specific logic:

* **url.path**  
  The absolute path of the request processed by the API ML Gateway. 

* **url.scheme**  
  The protocol used for the request (for example, `https`). 

* **http.request.method**  
  The HTTP verb used for the request (for example, `GET`, `POST`, `PUT`). 

* **error.type**  
  High-level classification of a failure (for example, `Timeout`, `AuthError`), populated on non-success results. 

* **error.message**  
  Detailed description providing context for the encountered failure. 

* **user.id**  
  The identifier of the authenticated principal or user. 

* **auth.method**  
  The authentication mechanism utilized by the client (for example, `JWT`, `x509`, `zoweJwt`). 

* **auth.status**  
  The result of the credential validation process (for example, `OK`, `DENIED`). 

* **service.id**  
  The logical identifier of the target service in the API ML ecosystem. 

* **service.instance.id**  
  The unique identifier for the specific instance of the service handling the request. 

* **service.response_code**  
  The HTTP status code returned to the client following the operation. 

**Example Body Structure:**
```json
{
  "http.request.method": "GET",
  "service.id": "discovery",
  "service.response_code": "200",
  "url.path": "/eureka/apps/"
}
```


## Example of Batch exporter

In the following example, the exporter is a batch exporter wherein a number of logs are collected and exported all at once.
The custom attributes are the keys and values in the JSON-formatted string of the log record.

<details>

<summary>Click here for the full batch exporter example.</summary>

```json

{
    "resourceLogs": [
        {
            "resource": {
                "attributes": [
                    {
                        "key": "deployment.environment",
                        "value": {
                            "stringValue": "dev"
                        }
                    },
                    {
                        "key": "host.arch",
                        "value": {
                            "stringValue": "aarch64"
                        }
                    },
                    {
                        "key": "host.name",
                        "value": {
                            "stringValue": "LNWRVGV2LP"
                        }
                    },
                    {
                        "key": "os.description",
                        "value": {
                            "stringValue": "Mac OS X 26.3.1"
                        }
                    },
                    {
                        "key": "os.type",
                        "value": {
                            "stringValue": "darwin"
                        }
                    },
                    {
                        "key": "os.version",
                        "value": {
                            "stringValue": "26.3.1"
                        }
                    },
                    {
                        "key": "process.command_args",
                        "value": {
                            "arrayValue": {
                                "values": [
                                    {
                                        "stringValue": "/Users/pc891986/.sdkman/candidates/java/17.0.18.1-sem/bin/java"
                                    },
                                    {
                                        "stringValue": "--add-opens=java.base/java.lang=ALL-UNNAMED"
                                    },
                                    {
                                        "stringValue": "--add-opens=java.base/java.lang.invoke=ALL-UNNAMED"
                                    },
                                    {
                                        "stringValue": "--add-opens=java.base/java.nio.channels.spi=ALL-UNNAMED"
                                    },
                                    {
                                        "stringValue": "--add-opens=java.base/java.util=ALL-UNNAMED"
                                    },
                                    {
                                        "stringValue": "--add-opens=java.base/java.util.concurrent=ALL-UNNAMED"
                                    },
                                    {
                                        "stringValue": "--add-opens=java.base/javax.net.ssl=ALL-UNNAMED"
                                    },
                                    {
                                        "stringValue": "-jar"
                                    },
                                    {
                                        "stringValue": "apiml/build/libs/apiml.jar"
                                    },
                                    {
                                        "stringValue": "--spring.config.additional-location=file:./config/local/apiml-service.yml"
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "key": "process.executable.path",
                        "value": {
                            "stringValue": "/Users/pc891986/.sdkman/candidates/java/17.0.18.1-sem/bin/java"
                        }
                    },
                    {
                        "key": "process.pid",
                        "value": {
                            "intValue": "66470"
                        }
                    },
                    {
                        "key": "process.runtime.description",
                        "value": {
                            "stringValue": "Eclipse OpenJ9 Eclipse OpenJ9 VM 17.0.18+8-openj9-0.57.0"
                        }
                    },
                    {
                        "key": "process.runtime.name",
                        "value": {
                            "stringValue": "IBM Semeru Runtime Open Edition"
                        }
                    },
                    {
                        "key": "process.runtime.version",
                        "value": {
                            "stringValue": "17.0.18+8"
                        }
                    },
                    {
                        "key": "service.instance.id",
                        "value": {
                            "stringValue": "localhost:gateway:10010"
                        }
                    },
                    {
                        "key": "service.name",
                        "value": {
                            "stringValue": "apiml"
                        }
                    },
                    {
                        "key": "service.version",
                        "value": {
                            "stringValue": "3.5.12-SNAPSHOT"
                        }
                    },
                    {
                        "key": "telemetry.distro.name",
                        "value": {
                            "stringValue": "opentelemetry-spring-boot-starter"
                        }
                    },
                    {
                        "key": "telemetry.distro.version",
                        "value": {
                            "stringValue": "2.24.0"
                        }
                    },
                    {
                        "key": "telemetry.sdk.language",
                        "value": {
                            "stringValue": "java"
                        }
                    },
                    {
                        "key": "telemetry.sdk.name",
                        "value": {
                            "stringValue": "opentelemetry"
                        }
                    },
                    {
                        "key": "telemetry.sdk.version",
                        "value": {
                            "stringValue": "1.58.0"
                        }
                    }
                ]
            },
            "scopeLogs": [
                {
                    "scope": {
                        "name": "org.zowe.apiml.opentelemetry"
                    },
                    "logRecords": [
                        {
                            "timeUnixNano": "1774256967925054000",
                            "observedTimeUnixNano": "1774256967931296000",
                            "severityNumber": 9,
                            "severityText": "INFO",
                            "body": {
                                "stringValue": "{\"http.request.method\":\"GET\",\"service.id\":\"discovery\",\"service.instance.id\":\"localhost:discovery:10011\",\"service.response_code\":\"200\",\"url.path\":\"/eureka/apps/\",\"url.scheme\":\"https\"}"
                            },
                            "flags": 1,
                            "traceId": "9f58121a31d1e6920e177fec52720478",
                            "spanId": "ac9f3b1fb720d6c9"
                        },
                        {
                            "timeUnixNano": "1774256967982081000",
                            "observedTimeUnixNano": "1774256967982108000",
                            "severityNumber": 9,
                            "severityText": "INFO",
                            "body": {
                                "stringValue": "{\"http.request.method\":\"PUT\",\"service.id\":\"discovery\",\"service.instance.id\":\"localhost:discovery:10011\",\"service.response_code\":\"200\",\"url.path\":\"/eureka/apps/DISCOVERABLECLIENT/localhost:discoverableclient:10012\",\"url.scheme\":\"https\"}"
                            },
                            "flags": 1,
                            "traceId": "33cab24562932b9d905b1b9b3abdc026",
                            "spanId": "95d795fdb6275d38"
                        },
                        {
                            "timeUnixNano": "1774256968029241000",
                            "observedTimeUnixNano": "1774256968029284000",
                            "severityNumber": 9,
                            "severityText": "INFO",
                            "body": {
                                "stringValue": "{\"http.request.method\":\"POST\",\"service.id\":\"discovery\",\"service.instance.id\":\"localhost:discovery:10011\",\"service.response_code\":\"204\",\"url.path\":\"/eureka/apps/DISCOVERABLECLIENT\",\"url.scheme\":\"https\"}"
                            },
                            "flags": 1,
                            "traceId": "5a1ac23171136688a9fcb80c33c607f4",
                            "spanId": "340d2212dd655078"
                        }
                    ]
                }
            ],
            "schemaUrl": "https://opentelemetry.io/schemas/1.24.0"
        }
    ]
}
```
</details>


## Signal Examples and Attribute Mapping

The following scenarios represent common signals emitted by API ML. Each example includes the specific attributes present in the signal body and the resulting JSON payload.

### A Service registered successfully to Eureka (API ML - Discovery Service)

This signal is emitted when an onboarded service instance successfully registers its metadata with the Discovery Service registry.

* **http.request.method**  
The HTTP verb (`POST`).
* **service.id**  
The logical ID of the Discovery service.
* **service.instance.id**  
The specific host and port of the Discovery instance.
* **service.response_code**  
The status returned by the registry (`204`).
* **url.path**  
The Eureka registration endpoint.
* **url.scheme**  
The communication protocol (`https`).

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

### A Service sent a successful heartbeat

This signal indicates that an active service instance has successfully renewed its lease with the Discovery Service to maintain its availability status.

* **http.request.method**  
The HTTP verb (`PUT`).

* **service.id**  
The logical ID of the target service.

* **service.instance.id**  
The specific instance sending the heartbeat.

* **service.response_code**  
The status of the heartbeat renewal (`200`).

* **url.path**  
The specific Eureka instance lease renewal path.

* **url.scheme**  
The communication protocol (`https`).

```json
{
  "http.request.method": "PUT",
  "service.id": "discovery",
  "service.instance.id": "localhost:discovery:10011",
  "service.response_code": "200",
  "url.path": "/eureka/apps/DISCOVERABLECLIENT/localhost:discoverableclient:10012",
  "url.scheme": "https"
}
```

### A successful login attempt

This signal captures a successful authentication event initiated by a user through the API ML Gateway login endpoint.

* **http.request.method**  
The HTTP verb (`POST`).

* **service.id**  
The logical ID for the Gateway.

* **service.instance.id**  
The Gateway instance handling the authentication.

* **service.response_code**  
The status of the login request (`204`).

* **url.path**  
The authentication login endpoint.

* **url.scheme**  
The communication protocol (`https`).
```json
{
  "http.request.method": "POST",
  "service.id": "gateway",
  "service.instance.id": "localhost:gateway:10010",
  "service.response_code": "204",
  "url.path": "/gateway/api/v1/auth/login",
  "url.scheme": "https"
}
```

### A successful request to API ML (authenticated but not populating information)

This signal represents a successful, authenticated request to the API Catalog service, typically used for retrieving container or service metadata. While the status indicates a successful transaction, this signal is frequently used to troubleshoot scenarios where the request is valid but the resulting response contains an empty data set.

* **http.request.method**  
The HTTP verb (`GET`).

* **service.id**  
The logical ID of the API Catalog.

* **service.instance.id**  
The instance providing catalog data.

* **service.response_code**  
The success status (`200`).

* **url.path**  
The endpoint for retrieving containers.

* **url.scheme**  
The communication protocol (`https`).
```json
{
  "http.request.method": "GET",
  "service.id": "apicatalog",
  "service.instance.id": "localhost:apicatalog:10010",
  "service.response_code": "200",
  "url.path": "/apicatalog/api/v1/containers",
  "url.scheme": "https"
}
```

### Invalid authentication (WIP)

This signal captures the technical context of a request utilizing x509 certificate-based authentication during the routing process.

* **auth.service.auth.method**  
The security provider method (`x509`).

* **http.request.method**  
The HTTP verb (`GET`).

* **service.id**  
The logical ID of the target client service.

* **service.instance.id**  
The instance identifier.

* **service.response_code**  
The status code returned (`200`).

* **url.path**  
The request path for the client API.

* **url.scheme**  
The communication protocol (`https`).

```json
{
  "auth.service.auth.method": "x509",
  "http.request.method": "GET",
  "service.id": "discoverableclient",
  "service.instance.id": "localhost:discoverableclient:10012",
  "service.response_code": "200",
  "url.path": "/discoverableclient/api/v1/request",
  "url.scheme": "https"
}
```

### Valid authentication when routing to an onboarded service (JWT)

This signal describes a request successfully authenticated via a Zowe JWT that has been routed to a downstream onboarded service.

* **auth.method**  
The general authentication type (`JWT`).

* **auth.service.auth.method**  
The specific Zowe provider (`zoweJwt`).

* **auth.status**  
The final result of authentication (`OK`).

* **http.request.method**  
The HTTP verb (`GET`).

* **service.id**  
The logical ID of the Zowe JWT service.

* **service.instance.id**  
The unique service instance identifier.

* **service.response_code**  
The successful status code (`200`).

* **url.path**  
The routed request endpoint.

* **url.scheme**  
The communication protocol (`https`).

* **user.id**  
The identifier of the authenticated user.

```json
{
  "auth.method": "JWT",
  "auth.service.auth.method": "zoweJwt",
  "auth.status": "OK",
  "http.request.method": "GET",
  "service.id": "zowejwt",
  "service.instance.id": "static-localhost:zowejwt:10012",
  "service.response_code": "200",
  "url.path": "/zowejwt/api/v1/request",
  "url.scheme": "https",
  "user.id": "USER"
}
```
