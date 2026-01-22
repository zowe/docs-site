# Configure OpenTelemetry z/OS Attributes

z/OS-specific resource attributes for API ML provide essential mainframe context to your telemetry data, allowing you to correlate metrics and traces with specific system identifiers such as SMF IDs, Sysplex names, and LPARs. By providing z/OS platform context, mainframe performance data can be integrated into distributed observability backends.

The z/OS attributes are primarily populated through an automated System Discovery process. Upon the initialization of the single-service deployment of API ML, the integrated OpenTelemetry SDK executes platform-specific calls to query z/OS Control Blocks and system variables. This process identifies the current execution environment by retrieving values such as the Address Space Identifier (ASID), which is mapped to `process.pid`, and the system release level via `D IPLINFO` for `os.version`. If these attributes are already defined in the zowe.yaml configuration file, the discovery engine treats the manual entries as overrides, ensuring that user-defined values take precedence over detected system defaults.

These attributes provide environmental context specific to the IBM z/OS platform.

## z/OS Attribute Reference

The following attributes are captured to describe the mainframe environment:

* **zos.smf.id**  
The System Management Facility (SMF) Identifier that uniquely identifies a z/OS system within a SYSPLEX.
Configuration Source: System discovery

* **zos.sysplex.name**  
The name of the SYSPLEX to which the z/OS system belongs.
Configuration Source: System discovery

* **mainframe.lpar.name**  
Name of the logical partition (LPAR) that hosts the z/OS system.
Configuration Source: System discovery

* **os.type**  
The operating system type, set to zos.
Configuration Source: Static

* **os.version**  
The version string of the operating system (e.g., the release returned by D IPLINFO).
Configuration Source: System discovery

* **process.command**  
The command or JOB name used to launch the Zowe process.
Configuration Source: System discovery

* **process.pid**  
The Process Identifier, which on z/OS is set to the Address Space Identifier (ASID).
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
