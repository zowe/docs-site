import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Zowe V3 Migration Guide

This guide outlines the steps and changes required to migrate from Zowe v2 to Zowe v3. While the migration process is similar to a Zowe v2 minor release upgrade, there are several new and updated configuration parameters to consider. Follow the steps described in this article to ensure a smooth migration.


## Prerequisites

Before starting the migration, ensure the following system requirements are met:

- **z/OSMF**  
Version V2R5 with APAR PH12143 is required or V3R1. 
- **Java**  
`java.home` should point to **Java 17** location.
- **Node.js**  
`node.home` should be set to **Node.js 18** version or above.
- **Keyrings**  
If you are using keyrings, verify that you use correct syntax: `safkeyring://` instead of `safkeyring:////`.


## System and Security Changes

Existing SAF settings for Zowe do not need to be changed for v3, so install steps such as `zwe init security`, the job or workflow ZWESECUR, and the jobs ZWEIRAC, ZWEITSS, and ZWEIACF are not required to be re-run.
Existing keyrings and keystores do not need to be changed for v3, so install steps such as `zwe init certificate`, the job or workflow ZWEKRING or jobs starting with ZWEIKR* are not required to be re-run.
The PROCLIB entries for v3.0.0 have not changed since v2.18.0, but it is always recommended to keep these up to date.


## YAML Configuration changes

Review the following changes to configuration and updated configuration parameters.

### New Configuration

**components.zaas**  
  Previously part of the `components.gateway` component, zaas in Zowe v3 is a separate component responsible for authentication.  
  If you do not explicitly configure this section, zaas will still be enabled by default and will use **port 7558**.

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

The service ID for gateway zosmf has changed to **ibmzosmf**. <br/>
Set `jwtAutoconfiguration` to **jwt** (default) or **ltpa**. Note that **auto** is no longer supported.<br/>
If you are using zosmf as your auth service, ensure that you update this z/OSMF service configuration. 

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

The Caching service now defaults to **Infinispan** mode instead of **VSAM**.
While **VSAM** is still supported, this storage method is being deprecated and is not recommended.
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
Extensions containing ZSS plugins must include the correct plugin type, 31-bit or 64-bit, to work with the version of ZSS used.
64-bit is recommended to avoid 31-bit memory constraints.
If you need to use 31-bit for extensions that are not yet compatible, you can switch between modes with the following parameter.

```yaml
components:
  zss:
    agent:
      64bit: true
```

### Removed Configuration Parameters

The following configuration parameters have been deprecated in Zowe v3. Ensure that these parameters are removed from your configuration.

#### Deprecated Settings:

**zowe.useConfigmgr**  
The parameter `zowe.useConfigmgr=false` is no longer supported.

**components.gateway.server.internal**  
The internal gateway server has been removed due to limited usage.

```yaml
components:
  gateway:
    server:
      internal:
```

#### Removed Components:

**metrics-service**  
This service has been deprecated and removed. Currently, no replacement is available. The Open Telemetry standard will be implemented later, which will serve as a replacement.

**cloud-gateway**  
The cloud-gateway component has been removed as a standalone component and merged into the gateway.

**jobs-api** and **files-api**  
These two components were deprecated in Zowe v2 and are now removed in v3. Ensure that you switch to using equivalent z/OSMF endpoints.


## Special Considerations for Older Versions

### Migrating from Zowe v2.16.0 or Lower

If you are migrating from Zowe **v2.16.0** or a lower version, perform the following tasks:

1) Ensure the following `zowe.network` section is added to your configuration:

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

2) Update your PROCLIB entries for Zowe, as enhancements and default parameters have changed throughout Zowe v2.
This can be performed with the unix command `zwe init stc`, by running the job ZWEISTC, or by copying the SZWESAMP members ZWESLSTC, ZWESISTC, and ZWESASTC into your desired PROCLIB.


### Migrating from Zowe v2.15.0 or Lower


If you are migrating from Zowe **v2.15.0** or a lower version, ensure thatZowe configuration is set up for keyring

### Migrating from Zowe v2.10.0 or Lower

If you are migrating from Zowe **v2.10.0** or a lower version, consider taking advantage of the new **sysMessages** feature.

The `zowe.sysMessages` is a new array that allows you to select messages that, when found by the launcher, will be duplicated into the system's log.

### Migrating from Zowe v2.9.0 or Lower

If you are migrating from Zowe **v2.9.0** or a lower version, it is recommended to delete the `<zowe.workspaceDirectory>/app-server/plugins` directory so that it can be regenerated on the next run of Zowe.
In this version and prior there were old and no longer used Application Framework plugins and references to them will complicate logs with harmless errors.

### Migrating from Zowe v2.3.0 or Lower

If you are running Zowe **v2.3.0** or a lower version, a **clean install** of Zowe v3 is highly recommended to avoid potential issues during the migration process.
