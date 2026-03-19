# Quick-start configuration of API ML Observability

To enable observability in the Zowe API Mediation Layer (API ML), you must configure the OpenTelemetry (OTel) SDK to capture **telemetry signals** and enrich them with **resource attributes**. This process ensures that your mainframe performance and health data are accurately identified and correlated within your observability backend.

:::info Required role: System administrator
:::

## Prerequisites

* Administrative access to your `zowe.yaml` configuration file.
* Access to an OTLP-collector to visualize the observability data. Common examples of OTLP-collectors include
[Prometheus](https://prometheus.io/), [Grafana](https://grafana.io/), or [Jaeger](https://www.jaegertracing.io/).

## Quick-start Configuration of API ML Observability Overview

Quick-start configuration of API ML observability consists of three steps:

[1. Define service identity](#1-define-service-identity)  
[2. Configure zowe.yaml](#2-configure-zoweyaml)  
[3. Verify your configuration](#3-verify-your-configuration) 

### 1. Define service identity

Establish the logical identity of your API ML instance. This step ensures that your monitoring tool can group high-availability instances together while still allowing you to pinpoint specific address spaces.

Services are identified via the `service.name`, `service.namespace`, and `service.instance.id` properties. Together, these attributes create a unique identity for API ML instances across your enterprise. Note that `service.instance.id` is automatically generated via `hostname:serviceId:port` and is not customizable.

In complex mainframe environments, you may have multiple API ML installations across different Sysplexes or data centers. To monitor these effectively, you must balance Logical Grouping (viewing all API ML traffic as one functional unit) with Instance Differentiation (identifying exactly which specific Address Space is experiencing an issue).

:::info **The Hierarchy of Identification**

OpenTelemetry uses a three-tier approach to define service identity:

* **service.name** (The Service)  
Identifies the logical name of the service. This property value should be identical for all instances across your entire organization that perform the same function (e.g., zowe-apiml). Expected to be globally unique if `namespace` is not defined.

* **service.namespace** (The Environment/Site)  
Groups services into logical sets. Use this property value to distinguish between different installations, such as sysplex-a vs. sysplex-b, or north-datacenter vs. south-datacenter. `service.name` is expected to be unique within the same `namespace`.

* **service.instance.id** (The Unique Instance)  
Identifies a specific running process or Address Space. This attribute is automatically generated via `hostname:serviceId:port`.
:::

i. **Assign a common service name.**  
    Set the `service.name` to a shared value across all instances belonging to the same logical application (For example, `zowe-apiml`). This attribute identifies the logical name of the service. This property value should be identical for all instances across your entire organization that perform the same function. The service name value is expected to be globally unique if `namespace` is not defined.

ii. **Define the service namespace.**  
Use `service.namespace` to group instances by logical boundaries, such as a specific data center, sysplex, or business unit. `service.name` is expected to be unique within the same `namespace`.

iii. **Confirm attribute requirements.**  
Ensure these identifiers align with the grouping and filtering logic of your backend.

### 2. Configure zowe.yaml

Update your `zowe.yaml` configuration to enable the telemetry signal collection and direct these signals to your OpenTelemetry collector endpoint.

```yaml
components:
  apiml:
    telemetry:
      enabled: true
      exporter:
        endpoint: "https://otel-collector.your.domain:4317"
      service:
        name: "<your-service-name>"           # example: "zowe-apiml"
        namespace: "<your-service-namespace>" # example: "sysplex-a" 
```
<!--TODO: Secure exporter endpoint requires configuration-->
:::note **Notes:**

* If your collector is working and you have defined the service identity and correctly configured the zowe.yaml file, the integration is fully functional. API Mediation Layer automatically discovers the `service.instance.id` and existing z/OS system attributes defined in zowe.yaml. If you choose to manually override these automated values or define custom environment labels, you can perform the remaining optional steps in this procedure.

* To customize automatically discovered attributes, see the full zowe.yaml configuration for API ML observability in the article [Advanced configuration of API ML Observability](advanced-configuration-of-apiml-observability.md). Note that using the values generated through the automization is the preferred method.  
:::

API ML observability is enabled.

### 3. Verify your configuration

To ensure your configuration is working as expected, perform the following checks:

1. Monitor the OTel Collector.  
   Access your OTLP-collector (such as Prometheus, Grafana, or Jaeger) to confirm that telemetry signals from the API ML components are being received, parsed, and visualized correctly.

2. Review API ML Error Logs.  
  If telemetry data does not appear in your collector, review the API ML service logs. These logs provide details regarding connectivity issues, incorrect endpoints, or authentication errors between Zowe and the OpenTelemetry backend.

## Next steps

* **Review your observability output.**  
To verify that telemetry is flowing, configure an exporter in your OTLP-collector to send data to your chosen visualization tool (such as Grafana, Jaeger, or Prometheus). For details on how to route this data, see the heading _Exporters_ in the [OpenTelemetry documentation](https://opentelemetry.io/docs/concepts/components/).

* **Review Sample Output.**  
  To review sample output for API ML OpenTelemetry, see [Sample Output from API ML OpenTelemetry](sample-output-from-apiml-otel.md).
