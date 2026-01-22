# Configure OpenTelemetry Service Attributes

Services are identified via the `service.name` and `service.namespace` properties. These properties create a unique identity for API ML instances.


<!-- Can we add some detail around these points? -->
**Naming Conventions:** Provide guidance on naming services (e.g., zowe-apiml) to ensure consistency across HA (High Availability) deployments.

**Instance Tracking:** Describe the use of `service.instance.id` and how to ensure uniqueness across instances.

<!-- An idea might be to provide some detail of the mapping between zowe.yaml properties and OTel attributes. Also, where possible, can we specifiy default values? -->

### Required Service Attributes

The following attributes are required to define the logical identity of the API ML. These attributes are automatically appended to all telemetry signals (metrics, traces, and logs) produced by the resource:


* **service.name**  (Required)  
Logical name of the service. Must be the same for all instances within the same HA deployment. Expected to be globally unique if `namespace` is not defined. 

* **service.instance.id** (Required)  
Must be unique for each instance of `service.name` and `service.namespace` pair. Automatically generated UUID is generally recommended to ensure uniqueness.

* **service.namespace** (Required)   
The assigned value should help distinguish a group of services, such as the LPAR, or owner team. `service.name` is expected to be unique within the same `namespace`.

* **service.version**  (Required)   
The exact version of the service artifact, typically a semantic version (e.g., 1.2.3) or a build hash, used to identify the specific software release.

#### Configuration Example (`zowe.yaml`)

```yaml
zowe:
  observability:
    resource:
      attributes:
        service.name: "zowe-apiml"
        service.namespace: "mainframe-production"
        # service.instance.id: "optional-custom-id"

