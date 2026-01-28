# Configure OpenTelemetry z/OS Attributes

<!-- VALIDATE THIS CONTENT AFTER SUPPORT IS IMPLEMENTED. -->

z/OS-specific resource attributes for API ML provide essential mainframe context to your telemetry data, allowing you to correlate metrics, traces, and logs with specific system identifiers such as SMF IDs, Sysplex names, and LPARs. By providing z/OS platform context, mainframe performance data can be integrated into distributed observability backends.

## How system discovery works

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
