# Configure OpenTelemetry Service Attributes

Services are identified via the service.name, service.namespace, and service.instance.id properties. Together, these attributes create a unique identity for API ML instances across your enterprise.

In complex mainframe environments, you may have multiple API ML installations across different Sysplexes or data centers. To monitor these effectively, you must balance Logical Grouping (viewing all API ML traffic as one functional unit) with Instance Differentiation (identifying exactly which specific Address Space is experiencing an issue).

## The Hierarchy of Identification
OpenTelemetry uses a three-tier approach to define service identity:

* **service.name** (The Service)  
Identifies the logical name of the service. This property value should be identical for all instances across your entire organization that perform the same function (e.g., zowe-apiml). Expected to be globally unique if `namespace` is not defined.

* **service.namespace** (The Environment/Site)  
Groups services into logical sets. Use this property value to distinguish between different installations, such as sysplex-a vs. sysplex-b, or north-datacenter vs. south-datacenter. `service.name` is expected to be unique within the same `namespace`.

* **service.instance.id** (The Unique Instance)  
Identifies a specific running process or Address Space. This value must be globally unique for every instance. As multiple z/OS systems can run identical Job Names, ensure that you combine the Job Name with a unique identifier (such as the LPAR name or a UUID) to ensure the instance can be isolated during troubleshooting.

<!-- Should we add service.version to this list of properties? -->

## Configuration Examples

**Example 1: Single API ML Installation (High Availability)**

In this scenario, both instances share the same namespace because they belong to the same logical cluster on the same Sysplex.

| Attribute | Instance 1 | Instance 2 |
| :--- | :--- | :--- |
| **service.name** | `zowe-apiml` | `zowe-apiml` |
| **service.namespace** | `production-plex` | `production-plex` |
| **service.instance.id** | `APIML01` | `APIML02` |

**Instance 1 configuration**
```
zowe:
  components:
    api-mediation-layer:
      observability:
        enabled: true
        resource:
          attributes:
            service.name: "zowe-apiml"
            service.namespace: "production-plex"
            service.instance.id: "APIML01"
```            
**Instance 2 configuration**
```
zowe:
  components:
    api-mediation-layer:
      observability:
        enabled: true
        resource:
          attributes:
            service.name: "zowe-apiml"
            service.namespace: "production-plex"
            service.instance.id: "APIML02"
```

## Example of Multi-Site Deployment

In this scenario, instances are separated by namespace to represent their physical data center locations.

| Attribute | Site 1 (Instance A) | Site 1 (Instance B) | Site 2 (Instance C) |
| :--- | :--- | :--- | :--- |
| **service.name** | `zowe-apiml` | `zowe-apiml` | `zowe-apiml` |
| **service.namespace** | `east-coast` | `east-coast` | `west-coast` |
| **service.instance.id** | `ZOWE-E1` | `ZOWE-E2` | `ZOWE-W1` |

**Site 1 (East Coast) Configuration:**

```
zowe:
  components:
    api-mediation-layer:
      observability:
        enabled: true
        resource:
          attributes:
            service.name: "zowe-apiml"
            service.namespace: "east-coast"
            service.instance.id: "ZOWE-E1"
```
**Site 2 (West Coast) Configuration:**
```
zowe:
  components:
    api-mediation-layer:
      observability:
        enabled: true
        resource:
          attributes:
            service.name: "zowe-apiml"
            service.namespace: "west-coast"
            service.instance.id: "ZOWE-W1"
```
