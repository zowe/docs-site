# API ML Provided Observability Signals and Attributes

**TODO: Dev to provide Actual Signals and Attributes**

<!-- This could be included in this topic. Please review -->

## Custom Telemetry Template
Use this template when requesting or defining new custom metrics for the API ML:

* **Signal Type**: (Metric / Trace / Log)
* **Name**: `zowe.apiml.[component].[functional_area]`
* **Description**: What does this signal represent?
* **Required Attributes**: 
    * `route.id`: Identifier of the routed service.
    * `client.id`: (Optional) The ID of the consuming application.
    * `zos.smf.id`: Automatically inherited from Resource.