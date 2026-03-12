# Overview of API ML Observability and OTel Architecture

Enable system observability of Zowe API Mediation Layer (API ML) through integration with [OpenTelemetry (OTel)](https://opentelemetry.io/). This integration enables API ML to produce observability data that describes runtime behavior, request processing, and service interactions.

:::info Required role: System administrator
:::

By adopting the OpenTelemetry standard, API ML provides a vendor-neutral way to monitor performance and diagnose issues. System administrators can export this data to industry-standard analysis tool, commonly referred to as an OpenTelemetry (OTel) Collector, to gain insights into resource utilization and latency within the mainframe environment.

:::caution Important
API ML system observability is available exclusively for the API ML single-service deployment. The Observability feature is not supported in the legacy microservice-based architecture of API ML.
:::

## Overview of OpenTelemetry Architecture

:::note
Beginning with Zowe v 3.5.0 API ML integrates OpenTelemetry following current OTel semantics and defaults from the OTel project, and select z/OS-specific features. For details about specified z/OS attributes, see [Advanced API ML Observability Configuration in zowe.yaml](advanced-apiml-observability-config.md).
:::

API ML observability is built upon **Resources** (the 'who' and 'where'), which define the identity and z/OS context of the system, and **Signals** (the 'what' and 'how'), which represent the actual streams of metrics, traces, and logs produced by those resources.

API ML supports both z/OS and non-z/OS deployments. 

## Resource Attributes

A **Resource** In OpenTelemetry represents the entity producing telemetry. For Zowe, this is the API ML single-service instance. Every [signal](#telemetry-signals-and-observability) (metric/trace/log) produced carries a set of attributes that identify a specific instance.

OpenTelemetry resource attributes for the Zowe API ML are organized into three logical groups of attributes: Service, Deployment, and z/OS. This categorization follows the [OpenTelemetry Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/resource/) (standardized naming rules) to ensure that the telemetry produced by Zowe is consistent with industry standards and easily consumable by monitoring backends.

### Resource Attribute Categories

* **Service Attributes**  
Define the logical identity of your application. The service.name allows you to group multiple instances into a single functional view. Additional attributes like `service.instance.id` or `service.namespace` distinguish between different installations or individual jobs, allowing you to monitor the entire ecosystem while pinpointing issues within a specific LPAR or site.

* **Deployment Attributes:**  
Describe the lifecycle stage of the service, and filter telemetry data by environment, such as distinguishing production issues from test environment noise.

* **z/OS Attributes**  
Provide critical mainframe context by identifying the specific physical and logical environment (LPAR, Sysplex, and OS version) where the process is running.

  For details about specific z/OS Attributes, see [Index of OpenTelemetry z/OS Attributes](index-of-otel-zos-attributes.md).

## Telemetry Signals and Observability

The API ML produces a range of telemetry data referred to as _signals_. A signal, defined as a discrete stream of telemetry data, is represented by any one of three types: metrics, traces, and logs, each of which are described in more detail in this section. By default, the OpenTelemetry integration captures performance, health, and interaction signals, which are enriched with the resource attributes configured in your zowe.yaml to provide environmental context. You can also specify where data is exported. Observability is achieved through the combination of telemetry signals, which quantify the real-time state and activity of the system, and resource attributes, which provide the structural labels necessary to organize and interpret those signals.

Signals can be any of the following signal types:

* [Metrics](https://opentelemetry.io/docs/concepts/signals/metrics/) (performance tracking)
* [Traces](https://opentelemetry.io/docs/concepts/signals/traces/) (request journeys)
* [Logs](https://opentelemetry.io/docs/concepts/signals/logs/) (event records).

Each of these signal types represents a specific category of observation from a system. Every signal is automatically enriched based on resource attributes, which act as a common identity across all telemetry streams. This enrichment process categorizes data into Service (logical identity), Deployment (environment tier), and z/OS (system and hardware context) metadata. By mapping these consistent attributes to every metric, trace, and log, the system creates a unified data model where a performance spike in a metric can be directly linked to a specific error in a log or a delay in a trace. This structured categorization allows administrators to filter, group, and correlate data across the entire Sysplex using standard observability tools, transforming raw telemetry into a detailed map of system health.

While these signals are enriched with mainframe-aware context when running on z/OS, API ML can also have full observability when deployed on other platforms such as Linux or within containerized environments. In these non-z/OS scenarios, the discovery engine automatically applies standard OpenTelemetry semantic conventions, capturing metadata like host names, operating system types, and process identifiers. This flexibility ensures that regardless of the underlying infrastructure, the telemetry signals remain consistent and actionable across your monitoring stack.

:::info How to understand Signals vs Resources

To better understand the relationship between signals and resources, it is useful to consider the analogy of a postal package and the label on the package:

* The **Signal** is the contents of the package. It contains the actual "goods" — the specific data about an event, such as a log message, a trace of a request, or a performance metric.
* The **Resource Attributes** are the shipping label fixed to the outside of the package. The label does not change the contents, but tells you exactly where the package originated (e.g., the specific LPAR, Sysplex, or Service Name).

Taken together, the Signal provides the evidence of what happened (the "what"), while the Resource Attributes provide the context of where it happened (the "where"). Without the label, the data is just a pile of anonymous packages; with the label, you can immediately sort and filter your data to isolate issues in specific parts of your infrastructure.
:::

### Understanding API ML Telemetry Signals

API Mediation Layer utilizes the three core OpenTelemetry signals to provide a complete picture of your mainframe gateway’s health and performance. By combining these signals, administrators can identify high-level symptoms, and also pinpoint root causes within a specific service or address space. The follow points describe how diffent signal types apply to API ML observability:

* **Metrics (The "How Much")**  
Metrics are numerical representations of data measured over intervals of time. In the context of API ML, they are used to track system health, observe performance trends, and trigger automated alerts before issues impact end-users.

  * **JVM & System Health**  
  Monitors standard indicators such as heap memory usage, garbage collection duration, and CPU utilization of the API ML process.

  * **Traffic & Throughput**  
  Tracks counters and gauges for request volume, HTTP error rates, and the number of active concurrent connections.

* **Traces (The "Where")**  
Traces record the end-to-end path of a request as it moves through the API ML. They provide a "big picture" view of how the gateway interacts with discovery services and backend providers.

  * **Span Intervals**  
  Captures discrete segments of work (called Spans), such as the time required for SAF authentication, service ID resolution, or the physical routing of a request to a provider.

  * **Latency Analysis**  
  Identifies specific bottlenecks in the request lifecycle, allowing you to see exactly which stage of processing is causing delays.

* **Logs (The "What" and "Why")**  
Logs are timestamped text records of discrete events. They provide the deep technical context necessary to understand why a specific error occurred or how the state of the API ML has changed.

  * **Activity Records**  
  Captures critical system events such as service registration/deregistration, security audit failures, and lifecycle transitions like startup or shutdown.

  * **Correlation**  
  Logs produced by the API ML include OTel traceId metadata. This allows you to jump from a specific error log directly to the associated trace to see the full context of the failed request.

## API ML Observability Use Cases

The implementation of the OpenTelemetry standard provides a vendor-neutral way to observe Zowe API Mediation Layer. By combining "mainframe-aware" resource attributes with real-time signals, you can monitor performance and pinpoint issue troubleshooting.

Common use cases for leveraging OpenTelemetry within the API ML include:

* **Sysplex-Wide Traffic Analysis**  
Use the `zos.sysplex.name` and `zos.smf.id` attributes to aggregate and compare API traffic across your entire mainframe footprint. This traffic analysis allows you to identify if a performance spike is isolated to a single LPAR or if the spike is caused by a systemic issue affecting the entire Sysplex.

* **Latency Bottleneck Identification**  
 Analyze distributed traces to visualize the internal processing stages of the API ML. You can pinpoint exactly where delays occur — whether during SAF authentication, service ID resolution in the Discovery Service, or during southbound routing to a backend provider.

* **Cross-Platform Troubleshooting**
 When a distributed application, such as a cloud-based web app, experiences a failure, you can use a shared `traceId` to follow the request as the request enters the mainframe. This links the "front-end" error directly to a specific Service ID or ASID on z/OS, thereby reducing the Mean Time to Repair (MTTR).

* **Proactive Resource Management**  
  Monitor JVM-specific metrics, such as Heap Memory usage and Garbage Collection duration, within the API ML process. By correlating these metrics with request volume, you can predict when an instance might require additional memory or when to scale out by starting additional Gateway instances.

* **Security and Audit Forensics**  
 Correlate log records with traces to investigate failed security audits. If a request is rejected by the Gateway, the trace can show the origin of the call, while the associated logs (linked via the same `traceId`) provide the technical reason for the rejection, such as an expired token or insufficient SAF permissions.