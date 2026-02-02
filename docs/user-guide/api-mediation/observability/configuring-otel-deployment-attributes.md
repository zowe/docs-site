# Configuring OpenTelemetry Deployment Attributes

To configure deployment-specific resource attributes for the Zowe API ML. These attributes allow you to categorize telemetry data based on the lifecycle stage of the application, such as distinguishing between production, staging, or development environments.

While platform-specific attributes (like those for z/OS) focus on the execution environment and are often discovered automatically, deployment attributes are strictly informative and describe the logical purpose of the instance. Deployment attributes are defined manually and are universal across all platforms where API ML runs (z/OS, Linux, or Containers). These attributes do not affect the unique identity of the service but are essential for filtering and grouping data within your observability backend. By explicitly labeling your environment, you ensure that performance anomalies in a test environment do not trigger false alerts in production monitoring views.

## Deployment Attribute Reference

The following attribute is used to describe the deployment of the single-service deployment of API ML:

* **deployment.environment.name**  
    Specifies the name of the deployment environment (Example: dev, test, staging, or production). Configuration Source: zowe.yaml

## Configuration Example in zowe.yaml

To set the deployment environment, add the `deployment.environment.name` key to the `resource.attributes` section of your zowe.yaml file.

```
zowe:
  observability:
    enabled: true
    resource:
      attributes:
      # Deployment Attribute (Manual Entry)
      deployment.environment.name: "production"
```