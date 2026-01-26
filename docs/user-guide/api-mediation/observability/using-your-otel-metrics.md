# Using Your API ML OpenTelemetry Metrics

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


