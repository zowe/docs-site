# Configuring API ML Observability

To enable observability in the Zowe API Mediation Layer (API ML), you must configure the OpenTelemetry (OTel) SDK to capture **[telemetry signals](overview-of-apiml-observability-and-otel-architecture.md#telemetry-signals-and-observability)** and enrich them with **[resource attributes](overview-of-apiml-observability-and-otel-architecture.md#resource-attributes)**. This process ensures that your mainframe performance and health data are accurately identified and correlated within your observability backend.

For details about OTel Observability architecture and API ML Observability use cases, see [Overview of API ML Observability and OTel Architecture](overview-of-apiml-observability-and-otel-architecture.md).

## Prerequisites

* Administrative access to your `zowe.yaml` configuration file.
* Access to an OTLP-collector to visualize the observability data. Common examples of OTLP-collectors include
[Prometheus](https://prometheus.io/), [Grafana](https://grafana.io/), or [Jaeger](https://www.jaegertracing.io/).

Follow these steps to configure your observability metadata before activating the telemetry stream for API Mediation Layer.

### 1. Define service identity

Establish the logical identity of your API ML instance. This step ensures that your monitoring tool can group high-availability instances together while still allowing you to pinpoint specific address spaces.

i. **Assign a common service name.**  
    Set the `service.name` to a shared value across all instances belonging to the same logical application (For example, `zowe-apiml`).

ii. **Define the service namespace.**  
Use `service.namespace` to group instances by logical boundaries, such as a specific data center, sysplex, or business unit.

iii. **Confirm attribute requirements.**  
Ensure these identifiers align with the grouping and filtering logic of your backend.

For more information, see [Configuring OpenTelemetry service attributes](configuring-otel-service-attributes.md).

### 2. Configure zowe.yaml

Update your `zowe.yaml` configuration to enable the telemetry signal collection and direct these signals to your OpenTelemetry collector endpoint.

```yaml
components:
  apiml:
    telemetry:
      enabled: true
      exporter:
        endpoint: "http://otel-collector.your.domain:4317"
      service:
        name: "<your-service-name>"           # e.g., "zowe-apiml"
        namespace: "<your-environment-name>"  # e.g., "production" or "test"
```

<!-- MAYBE LINK TO THE DETAILED ZOWE.YAML ARTICLE -->

::note
If your collector is working and you have defined the service identity and correctly configured the zowe.yaml file, the integration is fully functional. API Mediation Layer automatically discovers the `service.instance.id` and existing z/OS system attributes defined in zowe.yaml. If you choose to manually override these automated values or define custom environment labels, you can perform the remaining optional steps in this procedure.
:::

If you are not overriding the automated values or defining custom environment variables, proceed to [Enable the OTel Exporter in zowe.yaml](#enable-the-otel-exporter-in-zoweyaml).

### 3. Review or override the Deployment Environment label

By default, API ML automatically discovers your environment name using the `&ENVIRON.` z/OS system symbol. You only need to manually configure this attribute if you are deploying in a non-z/OS environment (such as Kubernetes), if the system symbol is missing, or if you want to use a custom label to isolate development data from production dashboards.

Fordetails about overriding the deployment environment variable, see [Advanced API ML Observability Configuration](advanced-apiml-observability-config.md).

i. **Check for existing system symbols.**  
    Determine if the `&ENVIRON.` symbol is already defined in your z/OS environment. If this attribute is correctly set (`PROD` or `TEST`), API ML captures this value automatically.

ii. **Determine the lifecycle stage.**  
 Identify the appropriate logical name for the environment where this instance is running (For example, `production`, `staging`, `sandbox`).

iii. **Define the attribute in zowe.yaml.**  
 To override the system discovery, uncomment the `attributes` block and add the `deployment` and `environment` nesting as shown in the example to the resource section of your configuration. Doing so overrides the system discovery.

iv. **Restart API ML.**  
 Apply the changes and restart the service to ensure the new environment label is attached to all outgoing telemetry signals.

### 4. Review or override the z/OS context

API ML automatically queries z/OS control blocks to identify the SMF ID, Sysplex, and LPAR. You only need to manually configure these attributes in zowe.yaml if the system symbols (`&SMFID.`, `&SYSPLEX.`, `&SYSNAME.`) are missing, or if you require custom logical identifiers for your reporting.

| Component z/OS attribute | z/OS system symbol | 
| :--- | :--- | 
| zos.smf.id | &SMFID. |
| zos.sysplex.name | &SYSPLEX. |
| mainframe.lpar.name | &SYSNAME. |

For details about overriding the values of these z/OS attributes, see [Advanced API ML Observability Configuration](advanced-apiml-observability-config.md).

i. **Verify reporting requirements.**  
Check that the automatically discovered attributes align with your organization’s naming conventions and reporting requirements.

ii. **Identify missing or incorrect symbols.**  
If attributes are missing in your observability backend, confirm whether the corresponding z/OS system symbols are properly set in your environment.

iii. **Apply manual overrides in `zowe.yaml`.**  
To override the system discovery, add the specific attribute path to the attributes block in your zowe.yaml. This ensures the manual value takes precedence.

iv. **Restart API ML.**  
For the changes to take effect, you must restart the Zowe task.

For a complete list of override examples, see [Advanced API ML Observability Configuration](advanced-apiml-observability-config.md).

### Understanding the Result

Once this procedure is complete, the API ML begins producing **Signals** (Metrics, Traces, and Logs) that are wrapped in the **Resource Attributes** you configured.

| Component | Role | Outcome |
| :--- | :--- | :--- |
| **Telemetry Signals** | Operational Data | Tells you **what** is happening (latency, errors). |
| **Resource Attributes** | Identifying Metadata | Tells you **where** it is happening (LPAR, Job Name, Site). |

For details about signals and resource attributes, see [Overview of API ML Observability and OTel Architecture](overview-of-apiml-observability-and-otel-architecture.md).
