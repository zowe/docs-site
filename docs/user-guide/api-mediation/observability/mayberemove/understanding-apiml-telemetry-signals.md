# Understanding API ML Telemetry Signals

API Mediation Layer utilizes the three core OpenTelemetry signals to provide a complete picture of your mainframe gateway’s health and performance. By combining these signals, administrators can identify high-level symptoms, and also pinpoint root causes within a specific service or address space. The follow points describe how diffent signal types apply to API ML observability:

* **Metrics (The "How Much")**  
Metrics are numerical representations of data measured over intervals of time. In the context of API ML, they are used to track system health, observe performance trends, and trigger automated alerts before issues impact end-users.

  * **JVM & System Health**  
  Monitors standard indicators such as heap memory usage, garbage collection duration, and CPU utilization of the API ML process.

  * **Traffic & Throughput**  
  Tracks counters and gauges for request volume, HTTP error rates, and the number of active concurrent connections.

* **Traces (The "Where")**  
Traces record the end-to-end path of a request as it moves through the API ML. They provide a "big picture" view of how the gateway interacts with discovery services and backend providers.

  * **Span Intervals**  
  Captures discrete segments of work (called Spans), such as the time required for SAF authentication, service ID resolution, or the physical routing of a request to a provider.

  * **Latency Analysis**  
  Identifies specific bottlenecks in the request lifecycle, allowing you to see exactly which stage of processing is causing delays.

* **Logs (The "What" and "Why")**  
Logs are timestamped text records of discrete events. They provide the deep technical context necessary to understand why a specific error occurred or how the state of the API ML has changed.

  * **Activity Records**  
  Captures critical system events such as service registration/deregistration, security audit failures, and lifecycle transitions like startup or shutdown.

  * **Correlation**  
  Logs produced by the API ML include OTel traceId metadata. This allows you to jump from a specific error log directly to the associated trace to see the full context of the failed request.

## Next Steps

* For a quick-start to configure API ML to collect observability data through OpenTelemetry, see [Configuring API ML Observability](../configuring-apiml-observability.md).

* For general information about configuration for  OpenTelemetry integration, automization of z/OS resource attribution, and architectural components for API ML observability, see [Overview of API ML Observability](../overview-of-apiml-observability.md).