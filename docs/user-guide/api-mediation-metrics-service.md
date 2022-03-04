# Using Metrics Service (Technical Preview)

As a system administrator, use the Metrics Service to view information about the acitivty of services running in the API Mediation Layer.
Currently, only HTTP metrics are displayed for core API Mediation Layer services.

In order for the Metrics Service to run, you must set `components.metrics-service.enabled` in `zowe.yaml` to `true`. Additionally, for each APIML service you want to have metrics collected for, you must set `components.<service>.apiml.metrics.enabled` set to `true` in `zowe.yaml`, or `configs.apiml.metrics.enabled` set to `true` in the service's manifest. When metrics are enabled for the API Gateway, the Gateway homepage displays a link to the Metrics Service dashboard. The dashboard is available at `https://{gateway_host}:{gateway_port}/metrics-service/ui/v1`.`

## API Mediation Layer Metrics Service Demo Video

Watch this [video](https://youtu.be/KkuE6xADxPk) to see a demo of the Metrics Service.

<iframe class="embed-responsive-item" id="youtubeplayer" title="APIML metrics service demo" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/KkuE6xADxPk" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"> </iframe>

## View HTTP Metrics in the Metrics Service Dashboard

Use the Metrics Service to view HTTP metrics such as number of requests, response times, and error rates. The below image describes the information provided in the Metrics Service dashboard.

<img src="https://raw.githubusercontent.com/wiki/Netflix/Hystrix/images/dashboard-annoted-circuit-640.png" alt="discoverable client api v1" width="500"/>

To view the HTTP metrics for a service, select the corresponding tab in the Metrics Service dashboard. Metrics are displayed for each endpoint of a service, aggregated from all service instances.

**Example:**

<img src={require("../images/api-mediation/metrics-service-dashboard.png").default} alt="discoverable client api v1" width="500"/>

Metrics are provided on a near real-time basis, so the display shows the current activity of the selected service. At this time there is no persistence for this information.

Service instances expose their HTTP metrics at `https://<service_host>:<service_port>/application/hystrix.stream` using the Server-Sent-Events protocol. The Metrics Service collects these streams and aggregates them across service instances before displaying.

**Note:** At this time, the `/application/hystrix.stream` endpoint for a service does not require authentication if metrics are enabled for that service. If metrics for that service are not enabled, `/application/hystrix.stream` is protected by authentication.
