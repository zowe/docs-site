# Overview of Observability

<!-- DRAFT INTRO -->
Observability of functionalities in the Zowe API Mediation Layer (API ML) can be provided through integration with OpenTelemetry (OTel). This integration enables API ML to produce observability data, including metrics, logs, and traces, that describe runtime behavior, request processing, and service interactions. This observability data can be collected and exported to supported analysis tools, thereby making it possible for API ML users to monitor system activity, diagnose issues, and understand service behavior without requiring a specific observability vendor.

Observability can be enabled and configured using API ML and OpenTelemetry settings in the zowe.yaml file to control which data is produced and where data are exported.