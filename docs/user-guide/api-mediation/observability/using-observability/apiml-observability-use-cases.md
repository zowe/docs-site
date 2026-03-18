# API ML Observability Use Cases

<!-- PABLO TO VALIDATE IF THESE CASES ARE CORRECT-->

The implementation of the OpenTelemetry standard provides a vendor-neutral way to observe API Mediation Layer (API ML). By combining "mainframe-aware" resource attributes with real-time signals, you can monitor performance and pinpoint issue troubleshooting.

The collection of API ML OpenTelemetry data could apply to the following use cases: 

* **Sysplex-Wide Traffic Analysis**  
Use the `zos.sysplex.name` and `zos.smf.id` attributes to aggregate and compare API traffic across your entire mainframe footprint. This traffic analysis allows you to identify if a performance spike is isolated to a single LPAR or if the spike is caused by a systemic issue affecting the entire Sysplex.

* **Latency Bottleneck Identification**  
 Analyze distributed traces to visualize the internal processing stages of the API ML. You can pinpoint exactly where delays occur — whether during SAF authentication, service ID resolution in the Discovery Service, or during southbound routing to a backend provider.

* **Cross-Platform Troubleshooting**
 When a distributed application, such as a cloud-based web app, experiences a failure, you can use a shared `traceId` to follow the request as the request enters the mainframe. This links the "front-end" error directly to a specific Service ID or ASID on z/OS, thereby reducing the Mean Time to Repair (MTTR).

* **Proactive Resource Management**  
  Monitor JVM-specific metrics, such as Heap Memory usage and Garbage Collection duration, within the API ML process. By correlating these metrics with request volume, you can predict when an instance might require additional memory or when to scale out by starting additional Gateway instances.

* **Security and Audit Forensics**  
 Correlate log records with traces to investigate failed security audits. If a request is rejected by the Gateway, the trace can show the origin of the call, while the associated logs (linked via the same `traceId`) provide the technical reason for the rejection, such as an expired token or insufficient SAF permissions.

 ## Next Steps

* For a quick-start to configure API ML to collect observability data through OpenTelemetry, see [Quick-start Configuration of API ML Observability](../quick-start-configuration-of-apiml-observability.md).

* For general information about configuration for  OpenTelemetry integration, automization of z/OS resource attribution, and architectural components for API ML observability, see [Configuring API ML Observability](../configuring-apiml-observability.md).