# Sample Output from API ML OpenTelemetry

<!-- Note output data also contains attributes coming from the  Spring OpenTelemetry SDK, these are documented in the respective SDK documentation -->

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
                            "stringValue": "MVSDE66"
                        }
                    },
                    {
                        "key": "mainframe.lpar.name",
                        "value": {
                            "stringValue": "DE66"
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
                    // Full command line used to launch the Zowe
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
                    // Remove from here
                    {
                        "key": "telemetry.distro.name",
                        "value": {
                            "stringValue": "opentelemetry-spring-boot-starter"
                        }
                    },
                    {
                        "key": "telemetry.distro.version",
                        "value": {
                            "stringValue": "2.24.0"
                        }
                    },
                    {
                        "key": "telemetry.sdk.language",
                        "value": {
                            "stringValue": "java"
                        }
                    },
                    {
                        "key": "telemetry.sdk.name",
                        "value": {
                            "stringValue": "opentelemetry"
                        }
                    },
                    {
                        "key": "telemetry.sdk.version",
                        "value": {
                            "stringValue": "1.58.0"
                        }
                    },
                    // Remove to here
                    {
                        "key": "zos.smf.id",
                        "value": {
                            "stringValue": "DE66"
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
