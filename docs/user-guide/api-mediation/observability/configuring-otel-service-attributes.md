# Configure OpenTelemetry Service Attributes

Services are identified via the `service.name` and `service.namespace` properties. These properties create a unique identity for API ML instances.


<!-- Can we add some detail around these points? -->
**Naming Conventions:** Provide guidance on naming services (e.g., zowe-apiml) to ensure consistency across HA (High Availability) deployments.

**Instance Tracking:** Describe the use of `service.instance.id` and how to ensure uniqueness across instances.

<!-- An idea might be to provide some detail of the mapping between zowe.yaml properties and OTel attributes. Also, where possible, can we specifiy default values? -->

### Required Service Attributes

The following attributes define the logical identity of the APIML Modulith. These attributes are automatically appended to all telemetry signals (metrics, traces, and logs) produced by the resource.

**service.name**  
Logical name of the service. Must be the same for all instances within the same HA deployment. Expected to be globally unique if `namespace` is not defined.

**service.instance.id**  
Must be unique for each instance of `service.name` and `service.namespace` pair. Automatically generated UUID is generally recommended to ensure uniqueness.

**service.namespace**  
The assigned value should help distinguish a group of services, such as the LPAR, or owner team. `service.name` is expected to be unique within the same `namespace`.

**service.version**  
The exact version of the service artifact, typically a semantic version (e.g., 1.2.3) or a build hash, used to identify the specific software release.

**deployment.environment.name**  
Name of the deployment environment (Example: dev, test, staging, or production).

**zos.smf.id**  
The System Management Facility (SMF) Identifier uniquely identifies a z/OS system within a Sysplex or mainframe environment and is used for system and performance analysis.

**zos.sysplex.name**  
The name of the Sysplex to which the z/OS system belongs.

**mainframe.lpar.name**  
Name of the logical partition that hosts a system with a mainframe operating system.

**os.type**  
The operating system type, which for this context should be set to `zos`.

**os.version**  
The version string of the operating system. On z/OS, this should be the release returned by the command d iplinfo.

**process.command**  
The command used to launch the process (i.e., the command name). On z/OS, this should be set to the name of the job used to start the z/OS system software.

**process.pid**  
Process identifier (PID). On z/OS, this should be set to the Address Space Identifier (ASID).

#### Configuration Example (`zowe.yaml`)

```yaml
zowe:
  components:
    api-mediation-layer:
      observability:
        resource:
          attributes:
            service.name: "zowe-apiml"
            service.namespace: "mainframe-production"
            # service.instance.id: "optional-custom-id"

