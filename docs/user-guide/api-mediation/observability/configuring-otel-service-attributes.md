# Configure OpenTelemetry Service Attributes

Services are identified via the `service.name` and `service.namespace` properties. These properties create a unique identity for API ML instances.


<!-- Can we add some detail around these points? -->
**Naming Conventions:** Provide guidance on naming services (e.g., zowe-apiml) to ensure consistency across HA (High Availability) deployments.

**Instance Tracking:** Describe the use of `service.instance.id` and how to ensure uniqueness across instances.

<!-- An idea might be to provide some detail of the mapping between zowe.yaml properties and OTel attributes. Also, where possible, can we specifiy default values? -->