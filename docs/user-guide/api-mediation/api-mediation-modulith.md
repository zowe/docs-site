# API Mediation Layer Single-Service deployment

Zowe version 3.3.0 introduces, as a technical preview, the option to switch the execution mode for API Mediation Layer (API ML) configuration from the current modularized scheme to a single-service option.

:::info
Required roles: System Programmer, Network Administrator
:::

This **single-service deployment mode** alternative to the modularized scheme brings the following performance benefits and simplification in configuration for new installations:

* **Performance Improvements**  
Enhanced performance, faster startup times, reduced CPU and memory consumption
* **Operational Efficiency**  
Simplified deployment processes, a single JVM process, decreased network traffic
* **Unified configuration options**

## Architecture

Review the following overview of the architecture of API ML single-service deployment.

![Zowe API ML Single-service Architecture Diagram](../../images/common/zowe-architecture-apiml-single-service.png)
<!-- TODO
Diagram
Data flows
Use the example from the current architecture diagram?
 -->

## Breaking Changes

:::note
The following single-service deployment procedure assumes the default address space prefix `ZWE1`. Update this prefix according to the `zowe.job.prefix` parameter from your `zowe.yaml` file.
:::

To run API ML as a single-service deployment, the system programmer is required to make configuration changes in the following areas:

* **Update ports to use a single port**  
In single-service deployment, all API ML components run in a single address space. 
* **Update log prefixes to a unified prefix**  
In single-service deployment, a single log prefix applies to all API ML components. Prefixes for individual components require manual updates to unify prefixes under a single prefix. 
* **Update AT-TLS rules**   
In single-service deployment, Job name filters require updating, and rules applying to handling require deletion. 

### Update port to use a single port

Single-service deployment runs all API ML components in a single JVM process. For backward compatibility reasons, this single JVM process handles connections to both the Gateway Service and the Discovery Service ports (defaults 7554 and 7553).

The single-service API ML address space uses ports defined in `components.gateway.port` and `components.discovery.port`.

Update the network permissions to reflect this change. Ensure that both ports are under z/OS address space `ZWE1AG`. 

### Update Log Prefix

In the single-service deployment, logs from internal API ML components such as the Discovery Service, API Catalog, and Caching Service appear under the prefix `ZWE1AG`.

For example, in the modularize scheme, the following message is printed under `ZWE1AC`:

```plaintext
2025-07-29 08:13:44.560 <ZWEAGW1:main:17171209> [35mZWESVUSR[0;39m [36mINFO [0;39m ((o.z.a.p.s.ServiceStartupEventHandler)) ZWEAM000I API Catalog Service started in 71.757 seconds
```

**Note:** This change affects only logs printed to spool or USS files. WTOs remain unchanged.

### Update AT-TLS rules

If the installation is configured with AT-TLS, rules need to be updated. Perform the following updates to the PAGENT rules:

1. Update job name filters to use `ZWE1AG`.
2. Remove unneeded rules that were performing the handling.

**Note:** TCP HTTP calls are still in use for high availability scenarios to maintain synchronization between instances accross LPARs.

## Limitations

The following features are not supported in the technical preview release of the API ML single-service deployment:

* Multi-tenancy deployment
* Docker container deployments

## Enable the Single-service API Mediation Layer

To switch the API ML into single-service deployment (modularized mode), perform the following changes to the installation's `zowe.yaml` file:

1. Add the component `apiml` and enable it:

    ```yaml
    components:
      apiml:
        enabled: true
    ```

    **Note:** If the Caching Service is not configured on your system, follow the steps described in [Using the Caching Service](./api-mediation-caching-service.md) to configure the Caching Service. The Caching Service is enabled by default in the modularized deployment of API Mediation Layer.

2. Start the Zowe started task.

### Rolling back changes

It is possible to revert to the original deployment mode by switching back the changes in `zowe.yaml`:

1. Disable the `apiml` component:
    Set `components.apiml.enabled` to `false`.

2. Start the Zowe started task.

## Planned updates to single-service deployment

* The modularized deployment is planned to be the default mode in Zowe v3.4.0
* The option to rollback to the modularized deployment will remain for the duration of the Zowe v3 lifecycle.
