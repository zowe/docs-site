# Advanced API ML Observability Configuration in zowe.yaml

Review the complete configuration structure for OpenTelemetry (OTel) integration within the Zowe API Mediation Layer (API ML). Use this advanced configuration to manually define or override system-discovered attributes to align with specific organizational reporting requirements.

For a simplified setup that relies on automatic system discovery, see [COnfiguring API ML Observability](configuring-apiml-observability.md).

## Full zowe.yaml configuration for API ML Observability

Use the following zowe.yaml configuration template for the full hierarchy of service identity and resource attribute overrides. Replace the placeholder values (for example, <your-service-name>) with your specific environment details.

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

The observability configuration is located under the `apiml` API Mediation Layer `components` section of the zowe.yaml.

### Core Configuration

* **enabled**  
A flag that initializes the OpenTelemetry SDK. Must be set to `true` to generate and export observability data.  
**Default:** `true`

* **exporter.endpoint**  
The destination URL for your OTLP (OpenTelemetry Protocol) collector.

### Service Identity

* **service.name**  
The logical name of the application. All instances of API ML in a high-availability (HA) cluster should share this name to be grouped correctly in your backend (for example, `zowe-apiml`). Expected to be globally unique if `namespace` is not defined.

* **service.namespace**  
The assigned value used to distinguish a group of services, such as the LPAR, or owner team. `service.name` is expected to be unique within the same `namespace`.

### Resource Attributes (Manual Overrides)

These attributes describe the host environment. While API ML attempts to discover these automatically from z/OS system symbols, these attriibutes can be manually defined as needed according to your company policies.  

* **deployment.environment.name**  
Specifies the lifecycle stage of the service. Common values include `production`, `staging`, `test`, or `dev`.

* **zos.sysplex.name**  
The name of the z/OS Sysplex where the Zowe instance is executing. Specify this attribute to aggregate performance data across a cluster of systems.

* **zos.smf.id**  
The System Management Facilities identifier. This is a one to four character ID that uniquely identifies the specific z/OS image within a complex.

* **mainframe.lpar.name**  
The name of the Logical Partition (LPAR).


## Validating the Configuration

After applying the changes to zowe.yaml and restarting the API Mediation Layer, verify that the OpenTelemetry integration is active and communicating with your collector.

1. **Check the API ML Startup Logs.**
Review the job logs for the API ML service. Upon successful initialization with observability enabled, look for messages indicating the OpenTelemetry SDK has started.

    To confirm successful initialization, review the log entries which confirm that the OTLP exporter has initialized and is attempting to connect to the specified endpoint. If the endpoint is unreachable or the protocol is mismatched, the logs will typically show Exporting failed or Connection refused messages from the OTel SDK.

2. **Verify Signal Reception in your Observability Tool.**
The most definitive validation is to confirm that data is appearing in your chosen observability backend. Use either of the following options: 

     * **Search by Service Name**   
    In your monitoring tool's UI, look for the value you defined in `service.name` (For example, `zowe-apiml`).  

     * **Filter by Namespace**    
    If you have multiple installations, use the `service.namespace` filter to isolate data from this specific instance.

3. **Confirm Attributes.**  
Select a trace or metric and verify that the Resource Attributes (such as `zos.smf.id` or `mainframe.lpar.name`) are correctly attached.

4. **Use the Collector's Logging (Optional).**  
If data is not appearing in the backend, check the logs of your OpenTelemetry Collector. If the collector is configured with the logging or debug exporter, raw incoming "Export" requests from the API ML's IP address are generated.


