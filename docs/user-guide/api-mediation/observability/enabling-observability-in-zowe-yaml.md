# Enabling API ML Observability in zowe.yaml

Review how to enable and configure the OpenTelemetry (OTel) integration within the Zowe API Mediation Layer (API ML) single-service deployment. Configure these parameters in `zowe.yaml` to enable API ML to export metrics, traces, and logs to an OpenTelemetry Collector.

## Configuration Overview

The observability configuration is located under the `apiml` API Mediation Layer `components` section of the zowe.yaml, under which there are three observability properties:

`components.apiml.telemetry`. Under this:

* **enabled**  
  Activates the OTel SDK. Set to `true` to initialize the OpenTelemetry SDK to enable observability.

* **exporter.endpoint**  
Defines where the data is sent.  

<!-- * **resource**  
Defines the identity of the producer (Attributes). -->

* **service.name**  
    Logical name of the service. Must be the same for all instances within the same HA deployment. Expected to be globally unique if `namespace` is not defined.

* **service.namespace**  
    The assigned value should help distinguish a group of services, such as the LPAR, or owner team. `service.name` is expected to be unique within the same `namespace`.

* **attributes**

    A collection of key-value pairs used to identify the telemetry source. See the following sub-properties of `resource.attributes`:

    * **deployment.environment.name**  
    Specifies the name of the deployment environment (Example: dev, test, staging, or production). Configuration Source: zowe.yaml

To enable observability, configure the OpenTelemetry exporter and resource attributes within your `zowe.yaml` file with the following structure:

```yaml
components:
  apiml:
    telemetry:
      enabled: true
      exporter:
        endpoint: "http://otel-collector.your.domain:4317"
      service:
        name:
        namespace:
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

## How the Export Works

When `components.apiml.telemetry.enabled: true` is set, the API ML single-service starts a background telemetry engine. This engine gathers all signals and bundles these signals with all Resource Attributes. These bundles are then pushed by means of the OTLP Exporter to your specified endpoint.

## Validating the Configuration

After applying the changes to zowe.yaml and restarting the API Mediation Layer, verify that the OpenTelemetry integration is active and communicating with your collector.

1. Check the API ML Startup Logs.
Review the job logs for the API ML service. Upon successful initialization with observability enabled, look for messages indicating the OpenTelemetry SDK has started.

    To confirm successful initialization, review the log entries which confirm that the OTLP exporter has initialized and is attempting to connect to the specified endpoint. If the endpoint is unreachable or the protocol is mismatched, the logs will typically show Exporting failed or Connection refused messages from the OTel SDK.

2. Verify Signal Reception in your Observability Tool.
The most definitive validation is to confirm that data is appearing in your chosen observability backend: 

   a. Search by Service Name. 
    In your monitoring tool's UI, look for the value you defined in `service.name` (e.g., zowe-apiml).  

   b. Filter by Namespace.  
    If you have multiple installations, use the `service.namespace` filter to isolate data from this specific instance.

3. Confirm Attributes.  
Select a trace or metric and verify that the Resource Attributes (such as `zos.smf.id` or `mainframe.lpar.name`) are correctly attached.

4. Use the Collector's Logging (Optional).  
If data is not appearing in the backend, check the logs of your OpenTelemetry Collector. If the collector is configured with the logging or debug exporter, you will see raw incoming "Export" requests from the API ML's IP address.
