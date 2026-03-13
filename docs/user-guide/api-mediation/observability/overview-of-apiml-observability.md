# Overview of API ML Observability

Enable system observability of Zowe API Mediation Layer (API ML) through integration with [OpenTelemetry (OTel)](https://opentelemetry.io/). This integration enables API ML to produce observability data that describes runtime behavior, request processing, and service interactions.

:::info Required role: System administrator
:::

By adopting the OpenTelemetry standard, API ML provides a vendor-neutral way to monitor performance and diagnose issues. System administrators can export this data to industry-standard analysis tool, commonly referred to as an OpenTelemetry (OTel) Collector, to gain insights into resource utilization and latency within the mainframe environment.

:::caution Important
API ML system observability is available exclusively for the API ML single-service deployment. The Observability feature is not supported in the legacy microservice-based architecture of API ML.
:::

:::note Notes:
* Beginning with Zowe v 3.5.0 API ML integrates OpenTelemetry following current OTel semantics and defaults from the OTel project, and select z/OS-specific features. 
* API ML supports both z/OS and non-z/OS deployments. 
:::

## Automated Resource Attribution

To simplify the configuration process, API ML is designed to automatically detect the z/OS environment context. This automation ensures that every telemetry signal (metric, trace, or log) is enriched with mainframe-specific metadata. This allow users to filter, group, and visualize data by Sysplex, LPAR, or specific environment without manual tagging.

### Automated Environment Discovery
By default, API ML automatically discovers your environment name using the `&ENVIRON.` z/OS system symbol. Manual configuration of the deployment environment is only necessary if:

* You are deploying in a non-z/OS environment (such as Kubernetes).
* The `&ENVIRON.` system symbol is missing from your system configuration.
* You want to use a custom label to isolate development data from production dashboards (e.g., using `SANDBOX` instead of the system default).

For details about how to override the deployment environment variable, see [Advanced API ML Observability Configuration](advanced-apiml-observability-config.md).

### z/OS Contextual Metadata
API ML automatically queries z/OS control blocks to identify the SMF ID, Sysplex, and LPAR. The following system symbols are used to automatically assign values to the corresponding OpenTelemetry resource attributes:

| z/OS system symbol | Component z/OS attribute |
| :--- | :--- |
| `&SMFID.` | `zos.smf.id` |
| `&SYSPLEX.` | `zos.sysplex.name` |
| `&SYSNAME.` | `mainframe.lpar.name` |

This contextual automation ensures that telemetry data remains traceable to the LPAR where the service is running.

For details about how to override the values of these z/OS attributes, see [Advanced API ML Observability Configuration](advanced-apiml-observability-config.md).

## Architecture Components

The observability stack for API ML consists of three primary layers:

* **The Provider (API ML)**  
Captures internal events and exports them using the OTLP protocol. Details about the provider are found in the Zowe Docs documentation.
* **The Collector**  
A standalone service (OTel Collector) that receives, processes, and exports data. Details about the OTel Colector are found in the [OpenTelemetry documentation](https://opentelemetry.io/).
* **The Backend (Visualization)**  
Tools like Grafana, Jaeger, or Prometheus where the data is stored and visualized. Details about the Backend visualization is found in the specific product documentation.

## Next Steps

* For a quick-start to configure API ML to collect observability data through OpenTlemetry, see [Configuring API ML Observability](configuring-apiml-observability.md).
* For details about how to override the automated assigning of environment and z/OS attributes, see [Advanced API ML Observability Configuration in zowe.yaml](advanced-apiml-observability-config.md).

## Additional Resources

* For details about API ML Telemetry signals, see [Understanding API ML Telemetry Signals](./mayberemove/understanding-apiml-telemetry-signals.md).
* For details about OpenTelemetry architecture, see [Overview of OpenTelemetry Architecture](./mayberemove/overview-of-otel-architecture.md).
* For details about how API ML OpenTelemetry data could apply to a range of use cases, see [API ML Observability Use Cases](./mayberemove/apiml-observability-use-cases.md).
