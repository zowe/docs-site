# Enabling Single-Service deployment of API Mediation Layer

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

## Breaking Changes

:::note
The following single-service deployment procedure assumes the default address space prefix `ZWE1`. Update this prefix according to the `zowe.job.prefix` parameter from your `zowe.yaml` file.
:::

To run API ML as a single-service deployment, the system programmer is required to make configuration changes in the following areas:

* **Update network configuration**  
In single-service deployment, all API ML components run in a single address space.
* **Update log prefixes to a unified prefix**  
In single-service deployment, a single log prefix applies to all API ML components. Prefixes for individual components require manual updates to unify prefixes under a single prefix.
* **Update AT-TLS rules**
In single-service deployment, Job name filters require updating, and rules applying to handling require deletion.

### Update network configuration

Single-service deployment runs all API ML components in a single JVM process. For backward compatibility reasons, this single JVM process handles connections to both the Gateway Service and the Discovery Service ports.

The single-service API ML address space uses ports defined in `components.gateway.port` and `components.discovery.port` (defaults 7554 and 7553).

Update the network permissions to reflect this change. Ensure that both ports are under z/OS address space `ZWE1AG`.

The remaining ports described under `API Mediation Layer` category in the [Address Network Requirements](../address-network-requirements.md#component-ports) article (defaults 7552, 7555 and 7558) are no longer used in the single-service deployment mode.

### Update Log Prefix

In the single-service deployment, logs from internal API ML components such as the Discovery Service, API Catalog, and Caching Service appear under the prefix `ZWE1AG`.

For example, in the modularize scheme, the following message is printed under `ZWE1AC`:

```plaintext
2025-07-29 08:13:44.560 <ZWE1AC:main:17171209> [35mZWESVUSR[0;39m [36mINFO [0;39m ((o.z.a.p.s.ServiceStartupEventHandler)) ZWEAM000I API Catalog Service started in 71.757 seconds
```

In the single-service deployment mode, the message is printed under `ZWE1AG`:

```plaintext
2025-07-29 08:13:44.560 <ZWE1AC:main:17171209> [35mZWESVUSR[0;39m [36mINFO [0;39m ((o.z.a.p.s.ServiceStartupEventHandler)) ZWEAM000I API Catalog Service started in 71.757 seconds
```

Note that the message code `ZWEAM000I` remains unchanged.

**Note:** This change affects only logs printed to spool or USS files. WTOs remain unchanged.

### Update AT-TLS rules

If the installation is configured with AT-TLS, rules need to be updated. Perform the following updates to the PAGENT rules:

1. Update job name filters to use `ZWE1AG`.
2. Remove unneeded rules that were performing the handling.

If the following [outbound rule for z/OSMF](https://docs.zowe.org/stable/user-guide/configuring-at-tls-for-zowe-server/#outbound-rule-for-zosmf) is set in your system, authentication may not work by default in single-service deployment mode. Update the rule to apply to jobname `ZWE1AG` instead.

**Note:** In general, the rules for AT-TLS are now simplified, wherein API ML uses a single z/OS address space prefix and uses only two ports. Update the rules to remove the ports no longer used.

**Note:** TCP HTTP calls are still in use for high availability scenarios to maintain synchronization between instances accross LPARs.

Once you complete updates to your ports, log prefixes, and AT-TLS rules (if applicable), you have enabled single-service deployment mode.

## Limitations

The following features are not supported in the technical preview release of the API ML single-service deployment:

* Multi-tenancy deployment
* Docker container deployments

## Enable the Single-service API Mediation Layer

To switch API ML into single-service deployment (modularized mode), perform the following changes to the installation's `zowe.yaml` file:

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
