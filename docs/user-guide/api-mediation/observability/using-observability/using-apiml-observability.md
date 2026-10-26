# Using API ML observability

The implementation of the OpenTelemetry standard provides a vendor-neutral way to observe the API Mediation Layer (API ML). By combining environment-aware resource attributes, including mainframe support, with real-time signals, administrators can monitor performance, validate request routing, and pinpoint issue troubleshooting across their z/OS-based service infrastructure.

Review the following articles to learn more about implementing and utilizing API ML observability:

**[API ML Observability use cases](apiml-observability-use-cases.md)**  
Review how to use data for various operational and security scenarios, including user and service activity reporting, sysplex-wide traffic analysis, proactive resource management, and cross-platform troubleshooting.

**[Customizing and interpreting API ML OpenTelemetry log signals](customizing-and-interpreting-apiml-otel-log-signals.md)**  
Learn how to monitor and assess the security and routing activity of your Gateway. This article covers the functional classification of signals, resource contexts, standard log records, and custom API ML JSON body attributes.

**[Log signal examples and attribute mapping](log-signal-examples-and-attribute-mapping.md)**  
Review JSON payload examples of common log signals emitted by API ML. Scenarios include service registrations, heartbeats, successful login attempts, and both valid and invalid authentication routing.

**[Understanding API ML telemetry signals](understanding-apiml-telemetry-signals.md)**  
Discover how API ML utilizes core observability signals to provide a complete, high-level picture of your mainframe gateway’s health and performance.