# Overview of Observability

<!-- DRAFT INTRO -->
Observability of functionalities in the Zowe API Mediation Layer (API ML) can be provided through integration with OpenTelemetry (OTel). This integration enables API ML to produce observability data, including [metrics](https://opentelemetry.io/docs/concepts/signals/metrics/), [logs](https://opentelemetry.io/docs/concepts/signals/logs/), and [traces](https://opentelemetry.io/docs/concepts/signals/traces/), that describe runtime behavior, request processing, and service interactions. This observability data can be collected and exported to supported analysis tools, thereby making it possible for API ML users to monitor system activity, diagnose issues, and understand service behavior without requiring a specific observability vendor.

:::info
Required role: System administrator
:::

Observability can be enabled and configured using API ML and OpenTelemetry settings in the zowe.yaml file. You can also specify where data is exported.

By leveraging the OpenTelemetry (OTel) standard, API ML allows system administrators to monitor performance, diagnose latency issues, and understand resource utilization within a mainframe environment using industry-standard tools like Prometheus, Grafana, or Jaeger.

:::note
Observability features are available exclusively for the API ML single-service deployment. These features are not supported in the legacy microservice-based architecture of API ML.
:::

## Resource Attributes 

In OpenTelemetry, a **Resource** represents the entity producing telemetry. For Zowe, this is the API ML single-service instance. Every signal (metric/trace/log) produced carries a set of attributes that identify a specific instance. 

To organize the OpenTelemetry resource attributes for the Zowe API ML are organized into three logical groups: Service, z/OS, and Deployment.

This categorization follows the [OpenTelemetry Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/resource/) to ensure that the telemetry produced by Zowe is consistent with industry standards and easily consumable by monitoring backends. 

### Attribute Categories

* **Service Attributes**  
These identify the logical entity producing the data. They are used to group telemetry from all instances of the API ML into a single "service" view in your monitoring tools.

For details about Service Attributes, see [Configuring OpenTelemetry Service Attributes](configuring-otel-service-attributes.md).

* **z/OS Attributes**  
These provide critical mainframe context. They identify the specific physical and logical environment (LPAR, Sysplex, and OS version) where the process is running, which is essential for mainframe-specific performance analysis.

For details about z/OS Attributes, see [Configuring OpenTelemetry z/OS Attributes](configuring-otel-zos-attributes.md).

* **Deployment Attributes:**  
These describe the lifecycle stage of the service. They allow you to filter telemetry data by environment (e.g., distinguishing production issues from test environment noise).

For details about Deployment Attributes, see [Configuring OpenTelemetry Deployment Attributes](configuring-otel-deployment-attributes.md).

## Telemetry Data Produced

Zowe API ML produces several categories of data out-of-the-box via OpenTelemetry.

### Out-of-the-box (Standard OTel)

* **JVM Metrics:** Memory usage (heap/non-heap), Garbage Collection (GC) frequency and duration, thread counts, and class loading.

* **System Metrics:** CPU usage (System vs. Process) and File Descriptor usage.

* **HTTP Metrics:** Request latency, throughput, and error rates (4xx/5xx) for all API traffic passing through the Modulith.

<!-- Are there Mainframe-specific metrics that we should mention? -->

