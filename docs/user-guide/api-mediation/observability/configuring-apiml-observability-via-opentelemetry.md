# Configuring API ML Observability via OpenTelemetry

Enable observability of functionalities in the Zowe API Mediation Layer (API ML) through integration with [OpenTelemetry (OTel)](https://opentelemetry.io/). This integration enables API ML to produce observability data that describe runtime behavior, request processing, and service interactions.  

:::info
Required role: System administrator
:::

API ML observability uses the OpenTelemetry (OTel) standard to enable system administrators to monitor performance, diagnose latency issues, and understand resource utilization within a mainframe environment using industry-standard tools like [Prometheus](https://prometheus.io/), [Grafana](https://grafana.io/), or [Jaeger](https://www.jaegertracing.io/). These anaysis tools make it possible for API ML users to monitor system activity, diagnose issues, and understand service behavior without requiring a specific observability vendor.

:::note
Observability features are available exclusively for the API ML single-service deployment. These features are not supported in the legacy microservice-based architecture of API ML.
:::

## Resource Attributes 

A **Resource** In OpenTelemetry represents the entity producing telemetry. For Zowe, this is the API ML single-service instance. Every _signal_ (metric/trace/log) produced carries a set of attributes that identify a specific instance. 

OpenTelemetry resource attributes for the Zowe API ML are organized into three logical groups of attributes: Service, Deployment, and z/OS. This categorization follows the [OpenTelemetry Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/resource/) to ensure that the telemetry produced by Zowe is consistent with industry standards and easily consumable by monitoring backends. 

### Attribute Categories

* **Service Attributes**  
These attributes define the logical identity of your application. The `service.name` allows you to group multiple instances into a single functional view (for example,  "North-Region-APIML"). However, you can also use additional attributes like `service.instance.id` or `service.namespace` to distinguish between different installations or individual jobs. Configuring these sub-parameters ensures you can monitor the health of the entire API ecosystem while still being able to identify issues within a specific LPAR or geographic site.

For details about Service Attributes, see [Configuring OpenTelemetry Service Attributes](configuring-otel-service-attributes.md).

* **Deployment Attributes:**  
These attributes describe the lifecycle stage of the service. They allow you to filter telemetry data by environment (e.g., distinguishing production issues from test environment noise).

For details about Deployment Attributes, see [Configuring OpenTelemetry Deployment Attributes](configuring-otel-deployment-attributes.md).

* **z/OS Attributes**  
These attributes provide critical mainframe context. They identify the specific physical and logical environment (LPAR, Sysplex, and OS version) where the process is running, which is essential for mainframe-specific performance analysis.

For details about z/OS Attributes, see [Configuring OpenTelemetry z/OS Attributes](configuring-otel-zos-attributes.md).

## Telemetry Signals and Observability

The API ML produces a range of telemetry data referred to as _signals_. A signal, defined as a discrete stream of telemetry data, is represented by any one of three types: metrics, traces, and logs, which are described in more detail in this section. By default, the OpenTelemetry integration captures performance, health, and interaction signals, which are enriched with the resource attributes configured in your zowe.yaml to provide environmental context. You can also specify where data is exported. Observability is achieved through the combination of telemetry signals, which quantify the real-time state and activity of the system, and resource attributes, which provide the structural labels necessary to organize and interpret those signals.

Signals can be any of the following signal types: 

* [Metrics](https://opentelemetry.io/docs/concepts/signals/metrics/) (performance tracking)
* [Traces](https://opentelemetry.io/docs/concepts/signals/traces/) (request journeys)
* [Logs](https://opentelemetry.io/docs/concepts/signals/logs/) (event records). 

Each of these signal types represent a specific category of observation from a system. Every signal is automatically enriched based on resource attributes. These attributes act as a common identity, whereby data is categorized into Service (logical identity), Deployment (environment tier), and z/OS (system and hardware context). This categorization approach ensures that all telemetry is "mainframe-aware" allowing administrators to filter, group, and correlate data across the entire Sysplex using standard observability tools. 

While these signals are enriched with mainframe-aware context when running on z/OS, API ML can also have full observability when deployed on other platforms such as Linux or within containerized environments. In these non-z/OS scenarios, the discovery engine automatically applies standard OpenTelemetry semantic conventions, capturing metadata like host names. This flexibility ensures that regardless of the underlying infrastructure, the telemetry signals remain consistent and actionable across your monitoring stack.

:::info How to understand Signals vs Resources 

To better understand the relationship between signals and resources, it is useful to consider the analogy of a Shipping Package and its Label:

* The **Signal** is the contents of the package. It contains the actual "goods"—the specific data about an event, such as a log message, a trace of a request, or a performance metric.
* The **Resource Attributes** are the shipping label fixed to the outside of the package. The label does not change the contents, but tells you exactly where the package originated (e.g., the specific LPAR, Sysplex, or Service Name).

Taken together, the Signal provides the evidence of what happened (the "what"), while the Resource Attributes provide the context of where it happened (the "where"). Without the label, the data is just a pile of anonymous packages; with the label, you can immediately sort and filter your data to isolate issues in specific parts of your infrastructure. 

:::

### Metrics (Runtime Behavior & Health)

<!-- Please replace these place holder metrics with actual metrics that will be implemented -->
Metrics provide numerical data used to track trends and trigger alerts.

* **JVM & System Metrics:**
    * **process.runtime.jvm.memory.usage**  
    Current utilization of heap and non-heap memory.

    * **process.runtime.jvm.gc.duration**  
    Time spent in Garbage Collection, critical for identifying critical pauses.

    * **system.cpu.utilization**  
    CPU usage percentage for the process and the overall LPAR.

* **Request Processing Metrics:**
    * **apiml.request.count**  
    A counter of all incoming requests, categorized by `http.method` and `http.
    status_code`.

    * **apiml.request.duration**  
    A histogram measuring the total time spent within the Modulith for each request.

    * **apiml.active.requests**  
    A gauge showing the current number of concurrent requests being processed.

:::note
For examples of usability of OpenTelemetry metrics, see [Using your API ML OpenTelemetry metrics](using-your-otel-metrics.md).
:::


### Traces (Service Interactions)
Traces record the path of a request as it traverses the API ML.

<!-- Please replace these place holder traces with actual traces that will be implemented -->

* **Gateway Spans**  
Measures the entry point latency and the time taken to proxy the request to a backend service.

* **Authentication Spans**  
Tracks the duration of security checks (e.g., SAF, JWT validation, or ZSS calls).

* **Discovery Spans**  
Records the time taken to resolve a service ID to a specific physical URL.

### Logs (System Events)
Logs provide the "why" behind errors or changes in state.

* **Access Logs**  
High-volume logs detailing every request, including the `traceId` for correlation with traces.

* **Security Logs**  
Records of failed authentication attempts or unauthorized access to protected routes.

* **Lifecycle Logs**  
Critical events such as service registration, heartbeat failures, or Modulith startup/shutdown.



<!-- Are there Mainframe-specific metrics that we should mention? -->

