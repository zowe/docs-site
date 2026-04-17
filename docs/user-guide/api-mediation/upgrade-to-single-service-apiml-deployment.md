# Upgrading to single-service API ML deployment

Enable the single-service deployment of API ML for an existing multi-service API ML deployment. This procedure is specifically designed for users upgrading from **Zowe v2.18** (the final v2 release) or **Zowe v3.3.x** multi-service deployments to the consolidated single-service deployment model.

:::info Required role: system administrator:::

Single-service deployment reduces the Zowe footprint by running the Gateway, Discovery, and API Catalog, the Caching service and ZAAS components within a single address space.

:::note
For comprehensive information about single-service deployment, performance improvements, and internal service consolidation, see [Enabling Single-Service deployment of API Mediation Layer](../api-mediation/api-mediation-modulith.md).
:::

## System Requirements & Prerequisites
Before transitioning to the single-service model, verify that your z/OS environment meets the minimum standards for Zowe v3:

* **Java:**  
Must be upgraded to **Java 17** or **Java 21**. Update the `java.home` parameter in your `zowe.yaml`.
* **Node.js:**  
Recommended to be upgraded to **v20**. Update `node.home`.
* **z/OSMF:**  
SAF is recommended as the authentication provider. If, however, you are using z/OSMF, the following versions are supported: **V2R5**, **V3R1**, or **V3R2**. 
* **JWT Support:**  
Highly recommended. If JWT support is not available, set `jwtAutoconfiguration` to `ltpa`.
:::tip
Ensure that all Zowe address spaces are stopped before modifying configuration files.
:::

## Enabling the ZAAS Component
In Zowe v3, the **Zowe Authentication and Authorization Service (ZAAS)** is a mandatory standalone component for API ML. In previous versions, this functionality was embedded within the Gateway.

Ensure that your `zowe.yaml` contains the following section with the specified parameter values:

```yaml
components:
  zaas:
    enabled: true
    port: 7558
    debug: false
```
:::note
Port `7558` was previously used by the `jobs-api`. Ensure the `jobs-api` component is removed to avoid a port conflict with ZAAS.
:::

## Transitioning to Single-Service Mode
To migrate from the multi-service deployment to the single-service deployment, apply these changes to your zowe.yaml file:

1. Enable single-service deployment.
Set `deploymentMode` to single-service under the gateway configuration:

```yaml
components:
  gateway:
    apiml:
      deploymentMode: single-service
```

2. Disable standalone components.
Because the Discovery Service, API Catalog, and Caching Service are now internal to the Gateway address space, these components must be disabled to prevent port conflicts and unnecessary address spaces:

```yaml
components:
  discovery:
    enabled: false
  api-catalog:
    enabled: false
  caching-service:
    enabled: false
```
3. Remove deprecated components. 
To prevent "component not found" errors, remove the configuration blocks for these services that no longer exist in v3:

* `metrics-service`
* `jobs-api`
* `files-api`

## Authentication & Gateway Updates
Update the Gateway’s security configuration to reflect the service ID changes in v3:

1. Update your service ID to `ibmzosmf`.

2. Set `jwtAutoconfiguration` to `jwt` (preferred) or `ltpa`.

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

## Refreshing Infrastructure & Cleanup

1. Update PROCLIB. 
Run the command `zwe init stc` (or use JCL `ZWEISTC`) to ensure your `ZWESLSTC` and `ZWESISTC` members are updated for v3.

2. Update APF Authorization. 
Re-run `zwe init apfauth` to ensure the ZIS load libraries are authorized.

## Restarting Zowe

After completing the infrastructure refresh and mandatory cleanup, you can bring Zowe back online.

1. If you use Zowe Cross-Memory Server (ZIS), start this component first. This server provides the authorized services required by Zowe. for more details, see [Configuring the Zowe cross memory server (ZIS)](../configure-xmem-server.md).

    ```
    /S ZWESISTC 
    ```

1. Start the main Zowe task. The launcher now initializes the consolidated single-service instead of multiple separate address spaces for the API Mediation Layer.
    ```
    /S ZWESLSTC
    ```
2. Verify the consolidated address spaces.
In a single-service deployment, your SDSF (or equivalent) should show a simplified list of address spaces. Specifically, you should see:

* `ZWESL` (or similar): The main launcher.
* `GW` suffix: The consolidated Gateway (now hosting Discovery and Catalog).
* `AZ` suffix: The new ZAAS (Zowe Authentication and Authorization Service).

    :::note
    You should no longer see separate address spaces for `DS` (Discovery) or `AC` (Catalog).
    :::
