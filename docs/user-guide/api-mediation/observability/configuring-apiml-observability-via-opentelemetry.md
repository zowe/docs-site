# Configuring API ML Observability via OpenTelemetry

Enable system observability of Zowe API Mediation Layer (API ML) through integration with [OpenTelemetry (OTel)](https://opentelemetry.io/). This integration enables API ML to produce observability data that describes runtime behavior, request processing, and service interactions.  

:::info
Required role: System administrator
:::

By adopting the OpenTelemetry standard, API ML provides a vendor-neutral way to monitor performance and diagnose issues. System administrators can export this data to industry-standard analysis tools - such as [Prometheus](https://prometheus.io/), [Grafana](https://grafana.io/), or [Jaeger](https://www.jaegertracing.io/) - to gain insights into resource utilization and latency within the mainframe environment.

:::caution Important
API ML system observability is available exclusively for the API ML single-service deployment. These features are not supported in the legacy microservice-based architecture of API ML.
:::

## API ML Observability Use Cases

The implementation of the OpenTelemetry standard provides a vendor-neutral way to observe Zowe API Mediation Layer. By combining "mainframe-aware" resource attributes with real-time signals, you can monitor performance and pinpoint issue troubleshooting.

Common use cases for leveraging OpenTelemetry within the API ML include:

* **Sysplex-Wide Traffic Analysis** Use the `zos.sysplex.name` and `zos.smf.id` attributes to aggregate and compare API traffic across your entire mainframe footprint. This traffic analysis allows you to identify if a performance spike is isolated to a single LPAR or if it is a systemic issue affecting the entire Sysplex.

* **Latency Bottleneck Identification** By analyzing distributed traces, you can visualize the internal processing stages of the API ML. You can pinpoint exactly where delays occur — whether during **SAF authentication**, **service ID resolution** in the Discovery Service, or during **southbound routing** to a backend provider.

* **Cross-Platform Troubleshooting** When a distributed application, such as a cloud-based web app, experiences a failure, you can use a shared `traceId` to follow the request as the request enters the mainframe. This links the "front-end" error directly to a specific **Service ID** or **ASID** on z/OS, thereby reducing the Mean Time to Repair (MTTR).

* **Proactive Resource Management** Monitor JVM-specific metrics—such as **Heap Memory usage** and **Garbage Collection duration** — within the API ML process. By correlating these metrics with request volume, you can predict when an instance might require additional memory or when to scale out by starting additional Gateway instances.

* **Security and Audit Forensics** Correlate log records with traces to investigate failed security audits. If a request is rejected by the Gateway, the trace can show the origin of the call, while the associated logs (linked via the same `traceId`) provide the technical reason for the rejection, such as an expired token or insufficient SAF permissions.

## Prerequisites

* Administrative access to your `zowe.yaml` configuration file.

## Overview of Observability Configuration

To enable observability in the Zowe API Mediation Layer (API ML), you must configure the OpenTelemetry (OTel) SDK to capture **telemetry signals** and enrich them with **resource attributes**. This process ensures that your mainframe performance and health data are accurately identified and correlated within your observability backend.

Follow these steps to configure your observability metadata before activating the telemetry stream for API Mediation Layer.

### 1. Define Service Identity
Establish the logical identity of your API ML instance. This step ensures that your monitoring tool can group high-availability instances together while still allowing you to pinpoint specific address spaces.

* Set the `service.name` to a common value across all instances (e.g., `zowe-apiml`).
* Use `service.namespace` and `service.instance.id` to differentiate between data centers, sysplexes, or specific jobs.
* For more information, see [Configuring OpenTelemetry service attributes](configuring-otel-service-attributes.md).

### 2. Label the Deployment Environment
Manually define the lifecycle stage of the instance. Doing so prevents data from development or test environments from triggering false alerts in your production dashboards.

* Configure the `deployment.environment.name` (e.g., `production`, `test`).
* For more information, see [Configuring OpenTelemetry deployment attributes](configuring-otel-deployment-attributes.md).

### 3. Validate and Override z/OS Context
Review the attributes captured automatically by the **System Discovery** process. The API ML queries z/OS control blocks to identify the SMF ID, Sysplex, and LPAR.
* Verify that the automatically discovered attributes (like `zos.smf.id`) meet your reporting requirements.
* Apply manual overrides in `zowe.yaml` only if custom logical identifiers are necessary.
* For more information, see [Configuring OpenTelemetry z/OS attributes](configuring-otel-zos-attributes.md).


### 4. Enable the OTel Exporter in zowe.yaml
The final step is to activate the OTel SDK and point it toward your collector.
* Set `enabled: true` under the observability section of `zowe.yaml`.
* Define your collector's `endpoint` and preferred `protocol` (gRPC or HTTP).
* **See:** [Enabling Observability in zowe.yaml](enabling-observability-in-zowe.yaml.md)


### Understanding the Result
Once this procedure is complete, the API ML begins producing **Signals** (Metrics, Traces, and Logs) that are wrapped in the **Resource Attributes** you configured.

| Component | Role | Outcome |
| :--- | :--- | :--- |
| **Telemetry Signals** | Operational Data | Tells you **what** is happening (latency, errors). |
| **Resource Attributes** | Identifying Metadata | Tells you **where** it is happening (LPAR, Job Name, Site). |

## Next Steps

Before you start to configure observability for API ML via OpenTelemetry, review the [Overview of OpenTelemetry Architecture](overview-of-otel-architecture.md).

