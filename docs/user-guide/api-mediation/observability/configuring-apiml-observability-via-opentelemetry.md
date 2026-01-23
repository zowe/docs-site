# Configuring API ML Observability via OpenTelemetry

Observability of functionalities in the Zowe API Mediation Layer (API ML) can be provided through integration with OpenTelemetry (OTel). This integration enables API ML to produce observability data that describe runtime behavior, request processing, and service interactions. This observability data can be collected and exported to supported analysis tools, thereby making it possible for API ML users to monitor system activity, diagnose issues, and understand service behavior without requiring a specific observability vendor.

:::info
Required role: System administrator
:::

Observability can be enabled and configured using API ML and OpenTelemetry settings in the zowe.yaml file. You can also specify where data is exported.

By leveraging the OpenTelemetry (OTel) standard, API ML allows system administrators to monitor performance, diagnose latency issues, and understand resource utilization within a mainframe environment using industry-standard tools like Prometheus, Grafana, or Jaeger.

:::note
Observability features are available exclusively for the API ML single-service deployment. These features are not supported in the legacy microservice-based architecture of API ML.
:::

## Resource Attributes 

In OpenTelemetry, a **Resource** represents the entity producing telemetry. For Zowe, this is the API ML single-service instance. Every signal (metric/trace/log) produced carries a set of attributes that identify a specific instance. 

OpenTelemetry resource attributes for the Zowe API ML are organized into three logical groups: Service, Deployment, and z/OS.

This categorization follows the [OpenTelemetry Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/resource/) to ensure that the telemetry produced by Zowe is consistent with industry standards and easily consumable by monitoring backends. 

### Attribute Categories

* **Service Attributes**  
These identify the logical entity producing the data. They are used to group telemetry from all instances of the API ML into a single "service" view in your monitoring tools.

For details about Service Attributes, see [Configuring OpenTelemetry Service Attributes](configuring-otel-service-attributes.md).

* **Deployment Attributes:**  
These describe the lifecycle stage of the service. They allow you to filter telemetry data by environment (e.g., distinguishing production issues from test environment noise).

For details about Deployment Attributes, see [Configuring OpenTelemetry Deployment Attributes](configuring-otel-deployment-attributes.md).

* **z/OS Attributes**  
These provide critical mainframe context. They identify the specific physical and logical environment (LPAR, Sysplex, and OS version) where the process is running, which is essential for mainframe-specific performance analysis.

For details about z/OS Attributes, see [Configuring OpenTelemetry z/OS Attributes](configuring-otel-zos-attributes.md).

## Telemetry Data Produced

The API ML produces a range of telemetry data. By default, the OpenTelemetry integration captures performance, health, and interaction data made available through resource attributes  configured in your `zowe.yaml`. 

## Telemetry Signal Categories

Observability in the API ML is built on the interaction between Signals and Resource Attributes. A _signal_, defined as a discrete stream of telemetry data, is represented by any one of three types of telemetry data: 

* [Metrics](https://opentelemetry.io/docs/concepts/signals/metrics/) (performance tracking)
* [Traces](https://opentelemetry.io/docs/concepts/signals/traces/) (request journeys)
* [Logs](https://opentelemetry.io/docs/concepts/signals/logs/) (event records). 

Each of these types of telemetry data represent a specific category of observation from a system. Every signal is automatically created based on Resource Attributes. These attributes act as a common identity, whereby data is categorized into Service (logical identity), z/OS (system and hardware context), and Deployment (environment tier). This categorization approach ensures that all telemetry is "mainframe-aware" allowing administrators to filter, group, and correlate data across the entire Sysplex using standard observability tools. 

### Metrics (Runtime Behavior & Health)
Metrics provide numerical data used to track trends and trigger alerts.

* **JVM & System Metrics**
    * **`process.runtime.jvm.memory.usage`**: Current utilization of heap and non-heap memory.
    * **`process.runtime.jvm.gc.duration`**: Time spent in Garbage Collection, critical for identifying "stop-the-world" pauses.
    * **`system.cpu.utilization`**: CPU usage percentage for the process and the overall LPAR.

* **Request Processing Metrics**
    * **`apiml.request.count`**: A counter of all incoming requests, categorized by `http.method` and `http.status_code`.
    * **`apiml.request.duration`**: A histogram measuring the total time spent within the Modulith for each request.
    * **`apiml.active.requests`**: A gauge showing the current number of concurrent requests being processed.

### Traces (Service Interactions)
Traces record the path of a request as it traverses the API ML.

* **Gateway Spans**: Measures the entry point latency and the time taken to proxy the request to a backend service.
* **Authentication Spans**: Tracks the duration of security checks (e.g., SAF, JWT validation, or ZSS calls).
* **Discovery Spans**: Records the time taken to resolve a service ID to a specific physical URL.

### Logs (System Events)
Logs provide the "why" behind errors or changes in state.

* **Access Logs**: High-volume logs detailing every request, including the `traceId` for correlation with traces.
* **Security Logs**: Records of failed authentication attempts or unauthorized access to protected routes.
* **Lifecycle Logs**: Critical events such as service registration, heartbeat failures, or Modulith startup/shutdown.

## Examples of Useability of Telemetry data in API ML

How a system administrator interacts with this data depends on the visualization tool used (e.g., Grafana, Jaeger, or Broadcom WatchTower).

### Example 1: High-Level Health Monitoring (Metrics)
A system administrator views a Grafana dashboard. The administrator notices a spike in **`apiml.request.errors`**. 
* **The View**: A red line graph shows a sudden jump from 0% to 15% error rate.
* **The Insight**: By filtering the dashboard using the attribute **`zos.smf.id`**, the admin realizes the errors are only occurring on **LPAR1**, while **LPAR2** remains healthy. This suggests a local configuration or connectivity issue on a specific system rather than a global software bug.


### Example 2: Latency Troubleshooting (Traces)
A user reports that a specific API is "timing out." The admin finds the relevant **`traceId`** in the logs and opens it in a trace viewer.
* **The View**: A "Gantt chart" style visualization of the request.
* **The Insight**:
    * `apiml.gateway.total`: 2005ms
    * `apiml.auth.check`: 5ms
    * `apiml.backend.proxy`: 2000ms
* **The Action**: The admin sees that the Modulith itself only spent 5ms on logic, but waited 2 seconds for the backend mainframe service to respond. The admin can now confidently contact the specific backend service team.




<!-- Are there Mainframe-specific metrics that we should mention? -->

