# Configuring API ML Observability

To enable observability in the Zowe API Mediation Layer (API ML), you must configure the OpenTelemetry (OTel) SDK to capture **[telemetry signals](overview-of-apiml-observability-and-otel-architecture.md#telemetry-signals-and-observability)** and enrich them with **[resource attributes](overview-of-apiml-observability-and-otel-architecture.md#resource-attributes)**. This process ensures that your mainframe performance and health data are accurately identified and correlated within your observability backend.

For details about OTel Observability architecture and API ML Observability use cases, see [Overview of API ML Observability and OTel Architecture](overview-of-apiml-observability-and-otel-architecture.md).

## Prerequisites

* Administrative access to your `zowe.yaml` configuration file.
* Access to an OTLP-collector to visualize the observability data. Common examples of OTLP-collectors include
[Prometheus](https://prometheus.io/), [Grafana](https://grafana.io/), or [Jaeger](https://www.jaegertracing.io/).

Follow these steps to configure your observability metadata before activating the telemetry stream for API Mediation Layer.

### Define Service Identity

Establish the logical identity of your API ML instance. This step ensures that your monitoring tool can group high-availability instances together while still allowing you to pinpoint specific address spaces.

1. **Assign a common service name.**
Set the `service.name` to a shared value across all instances belonging to the same logical application (For example, `zowe-apiml`).

2. **Define the service namespace.**
Use `service.namespace` to group instances by logical boundaries, such as a specific data center, sysplex, or business unit.

3. **Identify specific instances.**
Utilize `service.instance.id` to differentiate between individual address spaces or jobs within the same namespace.

4. **Confirm attribute requirements.**
Ensure these identifiers align with the grouping and filtering logic of your backend.

For more information, see [Configuring OpenTelemetry service attributes](configuring-otel-service-attributes.md).


### Configure zowe.yaml

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
      # These attributes are calculated but we allow them to be overridden
      # attributes:
      #   deployment:
      #     environment:
      #       name: XXXXX # Determined automatically based on system symbols, can be overriden by sysprog, or provided if the system symbol does not exist
      #   zos:
      #     sysplex:
      #       name: XXX # Determined automatically based on system symbols, can be overriden by sysprog, or provided if the system symbol does not exist
      #     smf:
      #       id: XXX # Determined automatically based on system symbols, can be overriden by sysprog, or provided if the system symbol does not exist
      #   mainframe:
      #     lpar:
      #       name: XXXX # Determined automatically based on system symbols, can be overriden by sysprog, or provided if the system symbol does not exist
```
* For details about `deployment.environment.name`, see [Configuring OTel Deployment Attributes](configuring-otel-deployment-attributes.md).
* For details about `zos.sysplex.name`, `zos.smf.id`, and `mainframe.lpar.name`, see [Configuring OTel z/OS Attributes](configuring-otel-zos-attributes.md).


::note
If your collector is working and you have defined the service identity and correctly configured the zowe.yaml file, the integration is fully functional. API Mediation Layer automatically discovers the `service.instance.id` and existing z/OS system attributes defined in zowe.yaml. If you choose to manually override these automated values or define custom environment labels, you can perform the remaining optional steps in this procedure.
:::

If you are not overriding the automated values or defining custom environment variables, proceed to [Enable the OTel Exporter in zowe.yaml](#enable-the-otel-exporter-in-zoweyaml).

### (Optional) Label the Deployment Environment

API ML performs automatic discovery of the environment name based on the `&ENVIRON.` z/OS system symbol. If you need to manually define the lifecycle stage to prevent data from development or test environments from appearing in production dashboards, you can override this resource attribute.

1. **Check for existing system symbols.**  
 Determine if the `&ENVIRON.` symbol is already defined in your z/OS environment. If it is correctly set (`PROD` or `TEST`), API ML captures this value automatically.

2. **Determine the lifecycle stage.**  
 Identify the appropriate logical name for the environment where this instance is running (For example, `production`, `staging`, `sandbox`).

3. **Define the attribute in zowe.yaml**  
 Uncomment the `attributes` block and add the `deployment` and `environment` nesting as shown in the example to the resource section of your configuration. Doing so overrides the system discovery.

4. **Restart API ML.**  
 Apply the changes and restart the service to ensure the new environment label is attached to all outgoing telemetry signals.

For more information, see [Configuring OpenTelemetry deployment attributes](configuring-otel-deployment-attributes.md).

### (Optional) Validate and Override z/OS Context

Review the resource attributes captured automatically by the **System Discovery** process. API ML queries z/OS control blocks to identify the SMF ID, Sysplex, and LPAR.

1. **Verify reporting requirements.**  
Check that the automatically discovered attributes (e.g., zos.smf.id or zos.sysplex.name) align with your organization’s naming conventions and reporting requirements.
2. **Identify missing or incorrect symbols.**  
If attributes are missing or incorrect, confirm whether the corresponding z/OS system symbols (like `&SYSNAME.`) are properly set. Automation relies on these symbols for discovery.
3. **Apply manual overrides in `zowe.yaml`.**  
If the system symbols cannot be changed or if you require custom logical identifiers, manually define the properties in the `resource` section of your zowe.yaml.

**Example of a manual override for SMF ID:**

```yaml
      attributes:
        zos:
          smf:
            id: "MYSMF"
```

 For more information, see [Configuring OpenTelemetry z/OS attributes](configuring-otel-zos-attributes.md).

### Enable the OTel Exporter in zowe.yaml

Once your attributes are defined, finalize the configuration to activate the OTel SDK and point it toward your collector.

1. **Set the global activation flag.**  
Set `enabled: true` under the `telemetry` section of `zowe.yaml`.

2. **Configure the collector endpoint.**  
Define the `endpoint` URL where your OTel collector is listening.

3. **Specify the protocol.**  
Choose the preferred communication protocol (usually `gRPC` on port `4317` or `HTTP` on port `4318`).

4. **Restart API ML.**  
For the changes to take effect, you must restart the API ML address space.

5. **Check the Logs.**  
Upon restart, check the API ML logs for a message similar to the following message:

  ```
  OTel SDK initialized successfully. Exporting signals to http://...
  ```
For more information, see [Enabling Observability in zowe.yaml](enabling-observability-in-zowe.yaml.md).

### Understanding the Result

Once this procedure is complete, the API ML begins producing **Signals** (Metrics, Traces, and Logs) that are wrapped in the **Resource Attributes** you configured.

| Component | Role | Outcome |
| :--- | :--- | :--- |
| **Telemetry Signals** | Operational Data | Tells you **what** is happening (latency, errors). |
| **Resource Attributes** | Identifying Metadata | Tells you **where** it is happening (LPAR, Job Name, Site). |

For details about signals and resource attributes, see [Overview of API ML Observability and OTel Architecture](overview-of-apiml-observability-and-otel-architecture.md).
