# Zowe V3 Migration Guide

This guide outlines the steps and changes required to migrate from Zowe v2 to Zowe v3. While the migration process is similar to a Zowe v2 minor release upgrade, there are several new and updated configuration parameters to consider. Follow the steps below to ensure a smooth migration.


## Prerequisites

Before starting the migration, ensure the following system requirements are met:

- **z/OSMF**: Version V2R5 with APAR PH12143 is required or V3R1. 
- **Java**: `java.home` should point to **Java 17** location.
- **Node.js**: `node.home` should be set to **Node.js 18** version or above.
- **Keyrings**: If you are using keyrings, verify that you use correct syntax: `safkeyring://` instead of `safkeyring:////`.



## Configuration changes

### New Configuration

**components.zaas**:  
  Previously part of the `components.gateway` component, zaas has now been moved to a separate component responsible for authentication.  
  If you do not explicitly configure this section, zaas will still be enabled by default and will be using **port 7558**.

```yaml
components:
  zaas:
    enabled: true
    port: 7558
    debug: false
```

### Updated Configuration Parameters
---

#### Gateway z/OSMF service configuration

The service ID for gateway zosmf has changed to **ibmzosmf** <br/>
The `jwtAutoconfiguration` should be set to **jwt** (default) or **ltpa**, **auto** is not supported anymore.<br/>
If you are using zosmf as your auth service, this needs to be updated.

```yaml
components:
  gateway:
    apiml:
      security:
        auth:
          zosmf:
             jwtAutoconfiguration: jwt
             serviceId: ibmzosmf
```

#### Caching Service

The caching service now defaults to **Infinispan** mode instead of **VSAM**.<br/>
**VSAM** is deprecated (still supported but not recommended).<br/>
A new parameter for the key exchange port has been added to the default configuraion.

```yaml
components:
  caching-service:
    storage:
      mode: infinispan
      infinispan:
        jgroups:
          port: 7600
          keyExchange:
            port: 7601
```
#### ZSS Server

The ZSS server now runs in **64-bit** mode by default.

```yaml
components:
  zss:
    agent:
      64bit: true
```

### Removed Configuration Parameters
---
The following configuration parameters have been deprecated in Zowe v3, so should be removed from your configuraion

#### Deprecated Settings:

**zowe.useConfigmgr**: The parameter zowe.useConfigmgr=false is no longer supported.

**components.gateway.server.internal**: The internal gateway server has been removed due to limited usage.

```yaml
components:
  gateway:
    server:
      internal:
```

#### Removed Components:

**metrics-service**: This service has been deprecated and removed, currently there is no replacement. The Open Telemetry standard will be implemented later, which will serve as a replacement.<br/>
**cloud-gateway**: The cloud-gateway component has been removed as a standalone component and merged into the gateway.<br/>
**jobs-api** and **files-api**: These components were deprecated in Zowe v2 and are now removed in v3. You should switch to using equivalent z/OSMF endpoints.



## Special Considerations for Older Versions

### Migrating from Zowe v2.16.0 or Lower

If you are migrating from Zowe **v2.16.0** or lower, ensure the following `zowe.network` section is added to your configuration:

```yaml
  network:
    server:
      tls:
        attls: false
        # TLS settings only apply when attls=false
        # Else you must use AT-TLS configuration for TLS customization.
        minTls: "TLSv1.2"
        maxTls: "TLSv1.3"
    client:
      tls:
        attls: false
```

### Migrating from Zowe v2.10.0 or Lower

If you are migrating from Zowe **v2.10.0** or lower, consider taking advantage of the new **sysMessages** feature.<br/>
The `zowe.sysMessages` is a new array that allows you to select messages that when found by the launcher will be duplicated into the system's log.

### Migrating from Zowe v2.3.0 or Lower

If you are running Zowe **v2.3.0** or lower, a **clean install** of Zowe v3 is highly recommended to avoid potential issues during the migration process.