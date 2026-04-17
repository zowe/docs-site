# Configuring API ML Observability 

Enable system observability of Zowe API Mediation Layer (API ML) through integration with [OpenTelemetry (OTel)](https://opentelemetry.io/). This integration enables API ML to produce observability data that describes runtime behavior, request processing, and service interactions.

:::info Required role: System administrator
:::

By adopting the OpenTelemetry standard, API ML provides a vendor-neutral framework to monitor performance and diagnose issues. System administrators can export telemetry data to an industry-standard OpenTelemetry (OTel) Collector to gain insights into resource utilization and latency within the mainframe environment. This integration utilizes the OpenTelemetry Protocol (OTLP), which standardizes how traces, metrics, and logs are encoded and transmitted. By leveraging OTLP, API ML ensures that telemetry data output is fully compatible with the broader observability ecosystem, regardless of the specific analysis tool used.

:::caution Important
API ML system observability is available exclusively for the API ML single-service deployment. The Observability feature is not supported in the legacy microservice-based architecture of API ML.
:::

:::note Notes:
* Beginning with Zowe v 3.5.0, API ML integrates OpenTelemetry following current OTel semantics and defaults from the OTel project, and select z/OS-specific features. 
  
* API ML supports both z/OS and non-z/OS deployments. 
:::

## Overview of OpenTelemetry Architecture

API ML observability is built upon **Resources** (the 'who' and 'where'), which define the identity and z/OS context of the system, and **Signals** (the 'what' and 'how'), which represent the actual streams of metrics, traces, and logs produced by those resources. 
In the API ML context, resource attributes are defined in three categories:
* Service Attributes
* Deployment Attributes 
* z/OS Attributes
 
<details>
<summary>Click here for details about <b>Resource Attributes</b> in OpenTelemetry.</summary>

## Resource Attributes

A **Resource** In OpenTelemetry represents the entity producing telemetry. For Zowe, this is the API ML single-service instance. Every _signal_ (metric/trace/log) produced carries a set of attributes that identify a specific instance.

OpenTelemetry resource attributes for API ML are organized into three logical groups of attributes: Service, Deployment, and z/OS. This categorization follows the [OpenTelemetry Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/resource/) (standardized naming rules) to ensure that the telemetry produced by Zowe is consistent with industry standards and easily consumable by monitoring backends.

### Resource Attribute Categories

* **Service Attributes**  
Define the logical identity of your application. The service.name allows you to group multiple instances into a single functional view. Additional attributes like `service.instance.id` or `service.namespace` distinguish between different installations or individual jobs, allowing you to monitor the entire ecosystem while pinpointing issues within a specific Logical Partition (LPAR) or site.

* **Deployment Attributes:**  
Describe the lifecycle stage of the service, and filter telemetry data by environment, such as distinguishing production issues from test environment noise.

* **z/OS Attributes**  
Provide critical mainframe context by identifying the specific physical and logical environment (LPAR, Sysplex, and OS version) where the process is running.

  For details about specific z/OS Attributes, see [Index of OpenTelemetry z/OS Attributes](index-of-otel-zos-attributes.md).

</details>

The API ML service itself produces a range of telemetry data referred to as _signals_. A signal, defined as a discrete stream of telemetry data, is represented by any one of three types: metrics, traces, and logs.

<details>
<summary>Click here for futher details about API ML <b>Signals</b> used in OpenTelemetry.</summary>

## Telemetry Signals and Observability

By default, the OpenTelemetry integration captures performance, health, and interaction signals, which are enriched with the resource attributes configured in your zowe.yaml to provide environmental context. You can also specify where data is exported. Observability is achieved through the combination of telemetry signals, which quantify the real-time state and activity of the system, and resource attributes, which provide the structural labels necessary to organize and interpret those signals.

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

</details>

### Architectural Components of API ML Observability

The observability stack for API ML consists of three primary layers:

* **The Provider (API ML)**  
Captures internal events and exports them using the OTLP protocol. Details about the provider are found in the Zowe Docs documentation.
* **The Collector**  
A standalone service (OTel Collector) that receives, processes, and exports data. Details about the OTel Colector are found in the [OpenTelemetry documentation](https://opentelemetry.io/).
* **The Backend (Visualization)**  
Tools like Grafana, Jaeger, or Prometheus where the data is stored and visualized. Details about backend visualization are found in the specific product documentation.

## Overview of Manual Core Configuration 

To activate observability, you must:

1. Define the identity of the API ML instance by setting the name (`service.name`) and the environment (`service.namespace`).
2. Enable the telemetry stream and define your OpenTelemetry Protocol (OTLP) collector URL in the zowe.yaml.

For detailed instructions of how to configure these settings, see [Quick-start configuration of API ML Observability](quick-start-configuration-of-apiml-observability.md).

## Automated Resource Attribution

To simplify the configuration process, API ML is designed to automatically detect the z/OS environment context. This automation ensures that every telemetry signal (metric, trace, or log) is enriched with mainframe-specific metadata. This metadate enrichment allows users to filter, group, and visualize data by Sysplex, LPAR, or specific environment without tagging manually.

### Automated Environment Discovery

By default, API ML automatically discovers your environment name using the `&ENVIRON.` z/OS system symbol. Manual configuration of the deployment environment is only necessary if:

* You are deploying in a non-z/OS environment (such as Kubernetes).
* The `&ENVIRON.` system symbol is missing from your system configuration.
* You want to use a custom label to isolate development data from production dashboards (e.g., using `SANDBOX` instead of the system default).

For details about how to override the deployment environment variable, see [Advanced configuration of API ML Observability](advanced-configuration-of-apiml-observability.md).

### z/OS Contextual Metadata

API ML automatically queries z/OS control blocks to identify the SMF ID, Sysplex, and LPAR. The following system symbols are used to automatically assign values to the corresponding OpenTelemetry resource attributes:

| z/OS system symbol | Component z/OS attribute |
| :--- | :--- |
| `&SMFID.` | `zos.smf.id` |
| `&SYSPLEX.` | `zos.sysplex.name` |
| `&SYSNAME.` | `mainframe.lpar.name` |

This contextual automation ensures that telemetry data remains traceable to the LPAR where the service is running.

For details about how to override the values of these z/OS attributes, see [Advanced configuration of API ML Observability](advanced-configuration-of-apiml-observability.md).

## Next Step

* For a quick-start to configure API ML to collect observability data through OpenTelemetry, see [Quick-start configuration of API ML Observability](quick-start-configuration-of-apiml-observability.md).

## Additional Resources

* For details about API ML Telemetry signals, see [Understanding API ML Telemetry Signals](./using-observability/understanding-apiml-telemetry-signals.md).
* For details about how API ML OpenTelemetry data could apply to a range of use cases, see [API ML Observability Use Cases](./using-observability/apiml-observability-use-cases.md).
