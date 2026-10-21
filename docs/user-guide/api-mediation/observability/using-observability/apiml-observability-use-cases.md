# API ML Observability use cases

The implementation of the OpenTelemetry standard provides a vendor-neutral way to observe API Mediation Layer (API ML). By combining environment-aware resource attributes, including mainframe support, with real-time signals, you can monitor performance and pinpoint issue troubleshooting.

## User and Service Activity Reporting

You can use telemetry data to report the following information:

  * Who uses your z/OS APIs
  * Which services they use
  * How that usage changes over time. 
  
API ML creates an OpenTelemetry log record for every request to a service. Each record carries the following pieces of information:  

  * Request path
  * HTTP method
  * Response code
  * Authentication method
  * Result
  * Mapped mainframe `user.id`
  * `service.id` of the requested service. 

You can aggregate these records in your observability backend to answer questions such as:

  * Who are the users, and which services do they use?
  * When does usage occur?
  * How often do users call each service?
  * Which authentication methods do users rely on (Basic, JWT, client certificate, or PAT)?
  * How does usage develop over time?

API ML does not create metrics for every combination of service, URL path, and user ID, because the number of unique combinations can grow without limit and overwhelm your metrics backend. Instead, API ML records this detail as semi-structured log attributes, so you can derive the information on demand with a log query. For example, you can count distinct `user.id` values per `service.id` per week for a management report, or group requests by `auth.method` to see whether users are moving from Basic authentication to tokens. 
  
::info
* For a sample query, see [Using your OpenTelemetry metrics](./using-your-otel-metrics.md). 
* For the full list of attributes, see [Log signal examples and attribute mapping](./log-signal-examples-and-attribute-mapping.md).
:::

:::caution Important:
These log records contain `user.id` values. Apply the same access restrictions to this data as you apply to API ML audit logs.
:::

## Other possible observability use cases

The collection of API ML OpenTelemetry data could also apply to the following use cases: 

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