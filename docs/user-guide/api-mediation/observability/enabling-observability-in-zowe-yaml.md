# Enabling API ML Observability in zowe.yaml

Review how to enable and configure the OpenTelemetry (OTel) integration within the Zowe API Mediation Layer (API ML) single-service deployment. Configure these parameters in `zowe.yaml` to enable API ML to export metrics, traces, and logs to an OpenTelemetry Collector.

## Configuration Overview

The observability configuration is located under the API Mediation Layer `component` section of the zowe.yaml, under which there are three observability properties:

* **enabled**  
  Activates the OTel SDK. Set to `true` to initialize the OpenTelemetry SDK to enable observability. 

* **exporter**  
Defines where the data is sent.  

* **resource**  
Defines the identity of the producer (Attributes).

  * **resource.attributes**  
    A collection of key-value pairs used to identify the telemetry source. See the following sub-properties of `resource.attributes`:

    * **service.name**  
    Logical name of the service. Must be the same for all instances within the same HA deployment. Expected to be globally unique if `namespace` is not defined.

    * **service.namespace**  
    The assigned value should help distinguish a group of services, such as the LPAR, or owner team. `service.name` is expected to be unique within the same `namespace`.

    * **deployment.environment.name**  
    Specifies the name of the deployment environment (Example: dev, test, staging, or production). Configuration Source: zowe.yaml

To enable observability, configure the OpenTelemetry exporter and resource attributes within your `zowe.yaml` file with the following structure:

```
zowe:
  observability:
    enabled: true
    exporter:
      otlp:
        endpoint: "http://otel-collector.your.domain:4317"
        protocol: "grpc"
        timeout: 10000
    resource:
      attributes:
        service.name: "zowe-apiml"
        service.namespace: "finance-production"
        deployment.environment.name: "production"
```

## How the Export Works

When `enabled: true` is set, the API ML single-service starts a background telemetry engine. This engine gathers all signals and bundles these signals with all Resource Attributes. These bundles are then pushed by means of the OTLP Exporter to your specified endpoint.

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