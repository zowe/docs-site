# Enabling Single-Service deployment of API Mediation Layer

Zowe version 3.3.0 introduced the option to switch the execution mode for API Mediation Layer (API ML) configuration from the previous multiple-service option to a single-service option based on "[modulith](https://medium.com/@harsard/understanding-monolith-modulith-and-microservices-f96555545c0c)" architecture. From Zowe version 3.4.0 onwards, we recommend the single-service option. 

:::info
Required roles: System Programmer, Network Administrator
:::

This **single-service deployment mode** (which is recommended by Broadcom, and also referred to as modulith mode) is an alternative to the multi-service scheme which brings the following performance benefits and simplification in configuration for new installations:

* **Performance Improvements**  
Enhanced performance, faster startup times, reduced CPU and memory consumption
* **Operational Efficiency**  
Simplified deployment processes, a single JVM process, decreased network traffic
* **Unified configuration options**
* **Simplified debugging**  
Tracking communication between the API ML services to determine the cause and source of issues not required 

## Architecture

Review the following architecture of API ML single-service deployment mode.

![Zowe API ML Single-service Architecture Diagram](../../images/common/zowe-architecture-apiml-single-service.png)

## Breaking Changes

:::note
The following single-service deployment procedure assumes the default address space prefix `ZWE1`. Update this prefix according to the `zowe.job.prefix` parameter from your `zowe.yaml` file.
:::

To run API ML as a single-service deployment, a system programmer is required to make configuration changes in the following areas:

* **Update network configuration**  
In single-service deployment mode, all API ML components run in a single address space.
* **Update log prefixes to a unified prefix**  
In single-service deployment mode, a single log prefix applies to all API ML components. Prefixes for individual components require manual updates to unify prefixes under a single prefix.
* **Update AT-TLS rules**  
In single-service deployment mode, jobname filters require updating, and rules applying to handling require deletion.

### Update network configuration

Single-service deployment mode runs all API ML components in a single JVM process. For backward compatibility reasons, this single JVM process handles connections to both the Gateway Service and the Discovery Service ports.

The single-service API ML address space uses ports defined in `components.gateway.port` and `components.discovery.port` (defaults 7554 and 7553).

Update the network permissions to reflect this change. Ensure that both ports are under z/OS address space `ZWE1AG`.

The remaining ports described under the `API Mediation Layer` category in the multi-service deployment section of article [Address Network Requirements](../address-network-requirements.md#component-ports) (defaults 7552, 7555, and 7558) are no longer used in single-service deployment mode. 

:::note
The Caching Service is enabled in single-service deployment mode and the default is `infinispan`. Note that the  `infinispan` storage solution requires additional ports. For more information, see [Caching Service Infinispan ports](../address-network-requirements.md#caching-service-infinispan-ports).
:::

### Update log prefix

In single-service deployment mode, logs from internal API ML components such as the Discovery Service, API Catalog, and Caching Service appear under the prefix `ZWE1AG`.

**Example:**  
In multi-service deployment, the following message is printed under `ZWE1AC`:

```plaintext
2025-07-29 08:13:44.560 <ZWE1AC:main:17171209> [35mZWESVUSR[0;39m [36mINFO [0;39m ((o.z.a.p.s.ServiceStartupEventHandler)) ZWEAM000I API Catalog Service started in 71.757 seconds
```

In single-service deployment mode, the message is printed under `ZWE1AG`:

```plaintext
2025-07-29 08:13:44.560 <ZWE1AG:main:17171209> [35mZWESVUSR[0;39m [36mINFO [0;39m ((o.z.a.p.s.ServiceStartupEventHandler)) ZWEAM000I API Catalog Service started in 71.757 seconds
```

Note that the message code `ZWEAM000I` remains unchanged.

:::note
This change affects only logs printed to spool or USS files. WTOs remain unchanged.
:::

### Update AT-TLS rules

If your installation is configured with AT-TLS, rules need to be updated. Perform the following updates to the PAGENT rules:

1. Update job name filters to use `ZWE1AG`.
   
   Verify if the [outbound rule for z/OSMF](https://docs.zowe.org/stable/user-guide/configuring-at-tls-for-zowe-server/#outbound-rule-for-zosmf) is set in your system. Update the rule to apply to jobname `ZWE1AG` instead of `ZWE1AZ` as authentication may not work by default in single-service deployment mode.
2. Remove unneeded rules that handle communication between core components in multi-service deployment.

    * Remove rules that apply to communication between Gateway, Discovery Service, API Catalog, and Caching Service.
    * Remove all rules that apply to the core components except for rules that apply to the Gateway Service (`ZWE1AG`).
    * Remove ports which are no longer used from the server rules. See [Enabling AT-TLS rules](../../user-guide/configuring-at-tls-for-zowe-server#inbound-rules). 

:::note Notes:
* In High Availability scenarios, TCP communication still exists between LPARs for the Discovery Service port.

* TCP HTTP calls are still in use for High Availability scenarios to maintain synchronization between instances across LPARs.
  
* In general, rules for AT-TLS in single-service deployment are now simplified, wherein API ML uses a single z/OS address space prefix and uses only two ports. Update rules to remove ports are no longer used.
:::

Once you complete updates to your ports, log prefixes, and AT-TLS rules (if applicable), you are ready to enable single-service deployment mode.

## Enable single-service deployment of API Mediation Layer

To enable single-service deployment mode for API ML, perform the following changes to the installation's `zowe.yaml` file:

1. Add the component `apiml` and enable it:

    ```yaml
    components:
      apiml:
        enabled: true
    ```

    **Note:** If the Caching Service is not configured on your system, follow the steps described in [Using the Caching Service](./api-mediation-caching-service.md) to configure the Caching Service. The Caching Service is enabled by default in the single-service deployment of API Mediation Layer.

2. Start the Zowe started task.

### Roll back changes from single to multi-service deployment

It is possible to revert to the original multi-service deployment by reverting changes in the `zowe.yaml` file:

1. Disable the `apiml` component:
    Set `components.apiml.enabled` to `false`.

2. Start the Zowe started task.

## Planned updates to single-service deployment mode

* Single-service deployment is the recommended mode in Zowe v3.4.0, and is planned to be the default mode in Zowe v3.5.0.
* The option to roll back to multi-service deployment will remain for the duration of the Zowe v3 lifecycle.
