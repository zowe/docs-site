# Advanced API ML Observability Configuration in zowe.yaml

Review the complete configuration structure for OpenTelemetry (OTel) integration within the Zowe API Mediation Layer (API ML). Use this advanced configuration to manually define or override system-discovered attributes to align with specific organizational reporting requirements.

:::info Required role: System administrator
:::

:::note
For a simplified setup that relies on automatic system discovery, see [Configuring API ML Observability](configuring-apiml-observability.md).
:::

<!--
PLEASE ADD SECTION ABOUT THE COLLECTOR CONNECTION ADVANCED CONFIGURATION

-->

## Full zowe.yaml configuration for API ML Observability

The observability configuration is located under the `apiml` API Mediation Layer `components` section of the zowe.yaml.

Use the following zowe.yaml configuration template for the full hierarchy of service identity and resource attribute overrides. Replace the placeholder values (for example, `<your-service-name>`) with your specific environment details.

```yaml
components:
  apiml:
    telemetry:
      enabled: true
      exporter:
        endpoint: "http://otel-collector.your.domain:4317"
      service:
        name: "zowe-apiml"
        namespace: "production"
      attributes:
        deployment:
          environment:
            name: "<your-deployment-environment-name>"
        zos:
          sysplex:
            name: "<your-sysplex-name>"
          smf:
            id: "<your-smf-id>"
        mainframe:
          lpar:
            name: "<your-lpar-name>"
```

Review the following attributes and their corresponding definitions in the full zowe.yaml configuration for API ML observability.

### Core Configuration

Configuration of the following core attributes is required:

* **enabled**  
A flag that initializes the OpenTelemetry SDK. Must be set to `true` to generate and export observability data.  
**Default:** `true`

* **exporter.endpoint**  
The destination URL for your OTLP (OpenTelemetry Protocol) collector.

### Service Identity Attributes

* **service.name**  
The logical name of the application. All instances of API ML in a high-availability (HA) cluster should share this name to be grouped correctly in your backend (for example, `zowe-apiml`). The `service.name` value is expected to be globally unique if `namespace` is not defined. Configuration of this attribute is required.

* **service.namespace**  
The assigned value used to distinguish a group of services, such as the LPAR, or owner team. `service.name` is expected to be unique within the same `namespace`. Configuration of this attribute is required.

* **service.instance.id** (The Unique Instance)    
Identifies a specific running process or Address Space. This attribute is automatically generated via `hostname:serviceId:port`. This value must be globally unique for every instance. As multiple z/OS systems can run identical Job Names, if customizing this attribute, ensure that you combine the Job Name with a unique identifier (such as the LPAR name or a UUID) to ensure the instance can be isolated during troubleshooting.

### Resource Attributes (Manual Overrides)

The following resource attributes describe the host environment. While API ML attempts to discover these automatically from z/OS system symbols, these attributes can be manually defined as needed according to your company policies.  

:::caution
API ML is designed to automatically detect your environment name, and the z/OS environment context. This automation ensures that every telemetry signal (metric, trace, or log) is enriched with mainframe-specific metadata. We recommend that you **_do not_** manually configure these environment attributes unless your company policies require customization.

For details about how resource attributes are automatically detected, see [Automated Resource Attribution](overview-of-apiml-observability.md#automated-resource-attribution) in the _Overview of API ML Observability_.
:::

* **deployment.environment.name**  
Specifies the lifecycle stage of the service. Common values include `production`, `staging`, `test`, or `dev`.

* **zos.sysplex.name**  
Specifies the name of the z/OS Sysplex where the Zowe instance is executing. Specify this attribute to aggregate performance data across a cluster of systems.

* **zos.smf.id**  
The System Management Facilities identifier. This value is a one to four character ID that uniquely identifies the specific z/OS image within a complex.

* **mainframe.lpar.name**  
The name of the Logical Partition (LPAR).

## Validating the Configuration

After you apply the changes to zowe.yaml and restart the Zowe task, verify that the OpenTelemetry integration is active and communicating with your collector.

1. **Check the API ML Startup Logs.**  
Review the job logs for the API ML service. Upon successful initialization with observability enabled, look for messages indicating the OpenTelemetry SDK has started.

    To confirm successful initialization, review the log entries which confirm that the OTLP exporter has initialized and is attempting to connect to the specified endpoint. If the endpoint is unreachable or the protocol is mismatched, the logs typically show Exporting failed or Connection refused messages from the OTel SDK.

2. **Verify Signal Reception in your Observability Tool.**  
The most definitive validation is to confirm that data is appearing in your chosen observability backend. Use either of the following options:

   * **Search by Service Name**  
    In your monitoring tool's UI, look for the value you defined in `service.name` (For example, `zowe-apiml`).  

   * **Filter by Namespace**  
    If you have multiple installations, use the `service.namespace` filter to isolate data from this specific instance.

3. **Confirm Attributes.**  
Select a trace or metric and verify that the Resource Attributes (such as `zos.smf.id` or `mainframe.lpar.name`) are correctly attached.

4. **Use the Collector's Logging (Optional).**  
If data is not appearing in the backend, check the logs of your OpenTelemetry Collector. If the collector is configured with the logging or debug exporter, raw incoming export requests from the API ML's IP address are generated.

## Next steps

* **Review your observability output.**  
To verify that telemetry is flowing, configure an exporter in your OTLP-collector to send data to your chosen visualization tool (such as Grafana, Jaeger, or Prometheus). For details on how to route this data, see the heading _Exporters_ in the [OpenTelemetry documentation](https://opentelemetry.io/docs/concepts/components/).

* **Review Sample Output.**  
  To review sample output for API ML OpenTelemetry, see [Sample Output from API ML OpenTelemetry](sample-output-from-apiml-otel.md).
