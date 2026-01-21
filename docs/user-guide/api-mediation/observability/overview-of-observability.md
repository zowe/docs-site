# Overview of Observability

<!-- DRAFT INTRO -->
Observability of functionalities in the Zowe API Mediation Layer (API ML) can be provided through integration with OpenTelemetry (OTel). This integration enables API ML to produce observability data, including metrics, logs, and traces, that describe runtime behavior, request processing, and service interactions. This observability data can be collected and exported to supported analysis tools, thereby making it possible for API ML users to monitor system activity, diagnose issues, and understand service behavior without requiring a specific observability vendor.

:::info
Required role: System administrator
:::

Observability can be enabled and configured using API ML and OpenTelemetry settings in the zowe.yaml file to control which data is produced and where data is exported.

By leveraging the OpenTelemetry (OTel) standard, API ML allows system administrators to monitor performance, diagnose latency issues, and understand resource utilization within a mainframe environment using industry-standard tools like Prometheus, Grafana, or Jaeger.

:::note
Observability features are currently available exclusively for the API ML Modulith deployment. These features are not supported in the legacy microservice-based architecture of API ML.
:::

## Resource Attributes 

In OpenTelemetry, a **Resource** represents the entity producing telemetry. For Zowe, this is the API ML single-service instance. Every signal (metric/trace) produced carries a set of attributes that identify this instance. The following attributes are integrated based on OpenTelemetry semantic conventions and z/OS-specific requirements:

| Attribute | Description | Configuration Source |
| :--- | :--- | :--- |
| **`service.name`** | Logical name of the service. Identical for all instances in an HA deployment. | `zowe.yaml` |
| **`service.instance.id`** | Unique identifier for the instance (UUID recommended). | Auto-generated / `zowe.yaml` |
| **`service.namespace`** | Groups services (e.g., by LPAR or Team). | `zowe.yaml` |
| **`service.version`** | The version of the APIML component. | System metadata |
| **`deployment.environment`** | Environment type (e.g., production, test). | `zowe.yaml` |
| **`zos.smf.id`** | The SMF Identifier of the z/OS system. | System discovery |
| **`zos.sysplex.name`** | Name of the SYSPLEX. | System discovery |
| **`mainframe.lpar.name`** | Name of the LPAR hosting the process. | System discovery |
| **`os.type`** | Set to `zos`. | Static |
| **`process.pid`** | Address Space Identifier (ASID) on z/OS. | System discovery |


## Enabling Observability 

To enable observability, configure the OpenTelemetry exporter and resource attributes within the zowe.yaml configuration file.

Add or update the following section in your zowe.yaml:

```
zowe:
  components:
    api-mediation-layer:
      observability:
        enabled: true  # Master switch for OTel features
        exporter:
          otlp:
            endpoint: "http://your-otel-collector:4317" # OTLP collector address
            protocol: "grpc"
        resource:
          attributes:
            service.name: "zowe-apiml"
            service.namespace: "mainframe-lpar1"
            deployment.environment: "production"
            # Custom attributes can be added here
```