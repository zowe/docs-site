# Customizing and Interpreting API ML OpenTelemetry Log Signals

Use API ML OpenTelemetry (OTel) log signals to monitor and assess security and routing activity of your z/OS-based service infrastructure. By aggregating these signals in a monitoring backend, administrators can validate request routing, visualize usage trends and operational evolution, such as shifting latency patterns and fluctuations in traffic volume, and maintain a comprehensive audit trail of all Gateway transactions. 

:::info Required role: System administrator
:::

Every individual request, service heartbeat, and registration event triggers a unique, independent log signal. Signals are generated and queued for export only after the Gateway has obtained a definitive result (success or failure) from a target service. To optimize network performance, log signals are buffered in memory and transmitted via a Batch Exporter. While delivered as a bundle, each entry in the export is processed by your OTel Collector as a unique, independent log signal.

## Functional Classification of API ML Signals

API ML signals represent a standardized telemetry log record for every transaction handled by the Gateway. 

The telemetry data identifies users as authenticated principals (captured via the `user.id` attribute) who interact with two distinct service types: 
* Internal API ML Core Services (such as Discovery and API Catalog)
* Onboarded Microservices routed through the Gateway


| Target Endpoint | Description | Common Paths |
| :--- | :--- | :--- |
| **API ML Core Services** | Requests processed directly by native API ML components for administrative or session-based tasks. | `/login`, `/logout`, `/services` |
| **Onboarded Microservices** | Requests where the Gateway acts as a reverse proxy, authenticating and forwarding traffic to external microservices. | `/apicatalog/api/v1/...`, `/your-app/api/...` |


## Log Record Attributes  

API ML telemetry links a parent Resource Context with individual Log Records to provide a complete operational picture. The Resource Context identifies API ML as the producing service and details the API ML environment, including the deployment tier, hosting infrastructure (such as the LPAR and Host name), and the runtime stack (including z/OS version, OS type, and JVM/Process specifics).

By linking discrete Log Records to this parent context, the telemetry hierarchy ensures that every signal, such as service heartbeats to routed requests, is automatically contextualized by the metadata of the specific API ML instance that generated the signal.

* **Resource Context (Resource Logs)**  
Resource Logs provide the metadata about the entity producing the logs (for example, the service, host, and OS). Resource Logs define the environmental and process context, such as host architecture and service names, to ensure that global metadata is defined once rather than redundantly for every event.
For details, see [Resource Attributes](../configuring-apiml-observability.md#resource-attributes) in _Configuring API ML Observability_

* **Log and Event Record Definition**  

The Log and Event Record Definition establishes a standardized logical model that contextualizes discrete events within a specific resource and is comprised of specific fields including timestamps, severity levels, and body content. 

:::info
For details about these log record attributes, see [Log and Event Record Definition](https://opentelemetry.io/docs/specs/otel/logs/data-model/#log-and-event-record-definition) in the OpenTelemetry documentation.
:::

Due to the batch nature of the API ML implementation, each entry in the `logRecords` section represents a distinct signal and contains the following standard OpenTelemetry fields:

* **timeUnixNano**  
  The precise time the event occurred in nanoseconds since the Unix epoch. Type: Int64.   
  **Note:** Usage is captured at the moment of execution; while signals are buffered for network efficiency, the `timeUnixNano` field records the exact nanosecond a user or service interaction occurred on the mainframe.

* **observedTimeUnixNano**  
  The time the event was observed by the OpenTelemetry SDK. Type: Int64.

* **severityNumber**  
  A standardized numerical value (1-24) representing the severity of the log. Type: Int.

* **severityText**  
  The human-readable string representing the severity level (for example, INFO, ERROR). Type: String.

* **body**  
  A JSON-formatted string containing the application-specific custom attributes. Type: String (JSON). API ML custom inforation is contained in this section

* **flags**  
  Internal OpenTelemetry flags, typically used to indicate if the trace was sampled. Type: Int.

* **traceId**  
  A unique 16-byte identifier for the entire distributed trace. Type: String.

* **spanId**  
  A unique 8-byte identifier for the specific unit of work within the trace. Type: String.


## Body JSON Attributes (Custom API ML Signals)

API ML automatically collects specific data points including request paths, HTTP methods, user IDs, and authentication status to enable customized filtering within your monitoring backend. The following attributes are found within the JSON of the `body` field and represent API ML specific logic:

* **auth.service.auth.method**  
The specific authentication credential required by the target backend service from the API ML Gateway (for example, `passticket` or `jwt`). This attribute identifies the mechanism used to ensure the Gateway can successfully authenticate with the microservice on behalf of the user.

* **user.distributed_id**  
The original remote identity provided during OIDC-based authentication. While the standard `user.id` attribute contains the identity as mapped to the local z/OS environment, `user.distributed_id` applies the unique identifier from the external distributed identity provider.

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
  The authentication mechanism utilized by the client (for example, `JWT`, `x509`).  
  **Note:** Multiple credential types are supported, primarily utilizing JWT (JSON Web Tokens), and x509 certificate-based authentication. Each of these credential types are tracked via the `auth.method` attribute to audit security flows.

* **auth.status**  
  The result of the credential validation process (for example, `OK`, `DENIED`). 

* **service.id**  
  The logical identifier of the target service in the API ML ecosystem. 

* **service.instance.id**  
  The unique identifier for the specific instance of the service handling the request. 

* **service.response_code**  
  The HTTP status code returned to API ML after the routing. 

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

In the following example, the exporter functions as a batch exporter, where multiple logs are collected and transmitted simultaneously.

:::note
The signals in these examples are presented in JSON format, which reflects how the the signals were saved for subsequent reception by the collector. Depending on your specific OpenTelemetry Collector configuration, the data representation may vary. To verify the signals in your environment, you can view them directly in the collector output logs or through an OpenTelemetry log viewer application.
:::

<details>

<summary>Click here for the full batch exporter example in JSON formatted output.</summary> 

**Example:**

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
                                        "stringValue": "/Users/<user-id>/.sdkman/candidates/java/17.0.18.1-sem/bin/java"
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
                            "stringValue": "/Users/<user-id>/.sdkman/candidates/java/17.0.18.1-sem/bin/java"
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

To review scenarios that represent common log signals emitted by API ML, see [Log signal examples and attribute mapping](log-signal-examples-and-attribute-mapping.md).

