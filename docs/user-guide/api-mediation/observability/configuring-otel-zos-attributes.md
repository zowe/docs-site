# Configure OpenTelemetry z/OS Attributes

<!-- VALIDATE THIS CONTENT AFTER SUPPORT IS IMPLEMENTED. -->

z/OS-specific resource attributes for API ML provide essential mainframe context to your telemetry data, allowing you to correlate metrics, traces, and logs with specific system identifiers such as SMF IDs, Sysplex names, and LPARs. By providing z/OS platform context, mainframe performance data can be integrated into distributed observability backends.

## How system discovery works

System Discovery is the automated process by which API ML identifies its own physical and logical environment. Instead of requiring a system administrator to manually enter details for every instance, the software performs an internal "inventory" check at startup to populate its identity.

The attributes are populated through a coordinated effort between the OpenTelemetry (OTel) SDK and the Zowe Discovery Service:

* **The OTel SDK** (The "Gatherer")  
As part of the API ML single-service instance, the SDK executes platform-specific calls at initialization. The SDK queries z/OS Control Blocks (memory structures used by the operating system, such as the CVT or ECVT) to retrieve the identity of the system, and also captures the Address Space ID (ASID) and Job Name.

* **The Discovery Service** (The "Provider")  
While the OTel SDK gathers low-level operating system data, the SDK queries the Zowe Discovery Service to retrieve and map specific service instance metadata, such as registered service IDs and status, directly into the OpenTelemetry resource attributes. This ensures that the identity reported in your telemetry matches the identity used for service registration and routing within API ML.

By the time the API ML is ready to process its first request, the system discovery process has already enriched the service with its identity — the unique combination of service name, location, and z/OS system data that distinguishes this instance. This automation ensures every telemetry signal is accurately tagged with the following z/OS attributes without manual intervention:

The z/OS attributes are primarily populated through an automated System Discovery process that occurs during the initialization of the API ML service. The integrated OpenTelemetry SDK executes platform-specific calls to query z/OS Control Blocks (such as the CVTSNAME or ECVT) and system variables.

## z/OS Attribute Reference

The following attributes are captured during system discovery to describe the mainframe environment:

* **zos.smf.id**  
The System Management Facility (SMF) Identifier that uniquely identifies a z/OS system within a SYSPLEX.
Configuration Source: System discovery

* **zos.sysplex.name**  
The name of the SYSPLEX to which the z/OS system belongs.
Configuration Source: System discovery

* **mainframe.lpar.name**  
Name of the LPAR that hosts the z/OS system.
Configuration Source: System discovery

* **os.type**  
The operating system type, set to `zos`.
Configuration Source: Static

* **os.version**  
The version string of the operating system (e.g., the release returned by `D IPLINFO`).
Configuration Source: System discovery

* **process.command**  
The command or JOB name used to launch the Zowe process.
Configuration Source: System discovery

* **process.pid**  
The Process Identifier. For details about this property, see [Process Attributes](https://opentelemetry.io/docs/specs/semconv/registry/attributes/process/) in the OpenTelemetry documentation.
Configuration Source: System discovery

## Overriding Discovered Attributes in zowe.yaml

While the discovery process handles most identifiers automatically, you may occasionally need to provide a manual override (for example, in shared environments where you wish to report a custom logical LPAR name). This is performed in the `resource.attributes` section of your zowe.yaml:

```
zowe:
  observability:
    enabled: true
    resource:
      attributes:
        # Overriding discovered z/OS attributes
        zos.smf.id: "MVS1"
        zos.sysplex.name: "LOCALPLX"
        mainframe.lpar.name: "PRODLPAR"
```
