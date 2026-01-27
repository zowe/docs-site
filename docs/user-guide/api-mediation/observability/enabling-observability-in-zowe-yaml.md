# Enabling API ML Observability in zowe.yaml

Review how to enable and configure the OpenTelemetry (OTel) integration within the Zowe API Mediation Layer (API ML) single-service deployment. Configure these parameters in `zowe.yaml` to enable API ML to export metrics, traces, and logs to an OpenTelemetry Collector.

## Configuration Overview

The observability configuration is located under the API Mediation Layer `component` section of the zowe.yaml, under which there are three observability properties:

* **enabled**  
  Activates the OTel SDK. Set to `true` to initialize the OpenTelemetry SDK. 

* **exporter**  
Defines where the data is sent.  Sub-properties of `exporter` include the following:

  * **exporter.otlp.protocol**  
    The URL of your OTLP-compatible collector (e.g., z-Iris or Jaeger)

  * **exporter.otlp.protocol**  
    The protocol is either `grpc` or `http/protobuf`.
    **Default:** `grcp`

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

When `enabled: true` is set, the API ML single-service starts a background telemetry engine. This engine gathers all signals, including JVM heap or request latency, and bundles these signals with all Resource Attributes. These bundles are then pushed by means of the OTLP Exporter to your specified endpoint.

:::note
If the endpoint is unreachable, API ML logs a warning, but service traffic is not interrupted. It is recommended to use a local OTel collector to minimize network latency. For information about the OTel collector, see [Quick start](https://opentelemetry.io/docs/collector/quick-start/) in the OpenTelemetry documentation. 

For the OTel official download, see [OpenTelemetry Collector Releases](https://github.com/open-telemetry/opentelemetry-collector-releases/releases)
For z/OS environments, you would typically look for the Linux on Z versions if running in a containerized environment, or check specific vendor distributions if running natively.
:::