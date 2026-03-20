# Sample Output from API ML OpenTelemetry

Once the configuration is active, API ML exports OTLP-compliant packets to your collector. The result is a context-aware telemetry stream where every signal (metric, trace, or log) is enriched with resource attributes. These attributes allow you to filter and group performance data by infrastructure, application identity, or specific process details.

<!-- Note output data also contains attributes coming from the  Spring OpenTelemetry SDK, these are documented in the respective SDK documentation -->
**Sample Output:**

```json
{
    "resourceMetrics": [
        {
            "resource": {
                "attributes": [
                    {
                        "key": "host.arch",
                        "value": {
                            "stringValue": "s390x"
                        }
                    },
                    {
                        "key": "host.name",
                        "value": {
                            "stringValue": "MVSLPR1"
                        }
                    },
                    {
                        "key": "mainframe.lpar.name",
                        "value": {
                            "stringValue": "LPR1"
                        }
                    },
                    {
                        "key": "os.description",
                        "value": {
                            "stringValue": "z/OS 03.01.00"
                        }
                    },
                    {
                        "key": "os.type",
                        "value": {
                            "stringValue": "zos"
                        }
                    },
                    {
                        "key": "os.version",
                        "value": {
                            "stringValue": "03.01.00"
                        }
                    },
                    // Full command line used to launch Zowe
                    {
                        "key": "process.command_line",
                        "value": {
                            "stringValue": "/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/bin/java -Xoptionsfile=/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/lib/options.default -jar /u/users/zowe/zowe-vnightly-v3/runtime/components/apiml/bin/apiml-lite.jar"
                        }
                    },
                    {
                        "key": "process.executable.path",
                        "value": {
                            "stringValue": "/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/bin/java"
                        }
                    },
                    {
                        "key": "process.pid",
                        "value": {
                            "intValue": "33620070"
                        }
                    },
                    {
                        "key": "process.runtime.description",
                        "value": {
                            "stringValue": "IBM Corporation IBM J9 VM z/OS-Release-17.0.10.0-b01"
                        }
                    },
                    {
                        "key": "process.runtime.name",
                        "value": {
                            "stringValue": "IBM Semeru Runtime Certified Edition for z/OS"
                        }
                    },
                    // For apiml, process.runtime.version is the version of the Java runtime
                    {
                        "key": "process.runtime.version",
                        "value": {
                            "stringValue": "17.0.10+7"
                        }
                    },
                    {
                        "key": "process.zos.jobname",
                        "value": {
                            "stringValue": "ZWE1AG"
                        }
                    },
                    {
                        "key": "process.zos.userid",
                        "value": {
                            "stringValue": "ZWESVUSR"
                        }
                    },
                    {
                        "key": "service.instance.id",
                        "value": {
                            "stringValue": "hostname:gateway:10010"
                        }
                    },
                    {
                        "key": "service.name",
                        "value": {
                            "stringValue": "apiml:MINIPLEX:10010"
                        }
                    },
                    {
                        "key": "service.namespace",
                        "value": {
                            "stringValue": "MINIPLEX_IT"
                        }
                    },
                    {
                        "key": "service.version",
                        "value": {
                            "stringValue": "3.5.7-PR-4456-3-SNAPSHOT"
                        }
                    },
                    {
                        "key": "zos.smf.id",
                        "value": {
                            "stringValue": "LPR1"
                        }
                    },
                    {
                        "key": "zos.sysplex.name",
                        "value": {
                            "stringValue": "MINIPLEX"
                        }
                    }
                ]
            },
        }
    ]
}
```

API ML exports OTLP-compliant telemetry signals where each payload is enriched with namespaced resource attributes. These attributes are transmitted as a flat-map structure, and adhere to OpenTelemetry Semantic Conventions—using dot-notation prefixes to establish logical hierarchies. These hierarchies facilitate analysis, filtering, and aggregation within an observability backend.

:::note
For a full list of OTel z/OS attributes for z/OS integration, see the _OpenTelemetry Semanic Conventions_ for [z/OS software](https://opentelemetry.io/docs/specs/semconv/resource/zos/).
:::

## Service & Metadata (`service`) 

* **service.name**  
The logical name of the service, used for grouping multiple instances into a single application view.

* **service.namespace**  
A logical grouping for services, often representing a data center, environment, or business unit.

* **service.instance.id**  
A unique identifier for a specific instance of a service, used to distinguish between different address spaces.

* **service.version**  
The specific version or build number of the API ML component.

## Infrastructure (`host`, `mainframe`, `zos`)

* **host.arch**  
The CPU architecture of the host machine (e.g., s390x for IBM Z).

* **host.name**  
The network hostname or system name of the machine where the service is running.

* **mainframe.lpar.name**  
The name of the Logical Partition (LPAR).

* **zos.smf.id**  
The System Management Facility (SMF) identifier of the z/OS system.

* **zos.sysplex.name**  
The name of the z/OS Sysplex (System Complex) where the instance is located.

## Operating System & Runtime (`os` and `process.runtime`)

* **os.type**  
The operating system type (e.g., zos).

* **os.version**  
The specific version and release level of the operating system.

* **os.description**  
A human-readable string describing the operating system and its version.

* **process.runtime.name**  
The name of the runtime environment (e.g., IBM Semeru Runtime Certified Edition for z/OS).

* **process.runtime.version**  
The version of the Java runtime environment executing the service.

* **process.runtime.description**  
Detailed build and release information for the specific Java Virtual Machine (JVM).

## Process & Identity (`process`) 

* **process.pid**  
The Process Identifier (PID) of the running service.

* **process.executable.path**  
The absolute path to the binary used to start the process.

* **process.command_line**  
The full command string, including arguments and flags, used to launch the Zowe component.

* **process.zos.jobname**  
The z/OS Job Name associated with the running task.

* **process.zos.userid**  
The z/OS User ID (ACF2/TopSecret/RACF) under which the task is executing.

