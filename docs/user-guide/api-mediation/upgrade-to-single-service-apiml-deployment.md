# Upgrading to single-service API ML deployment

Enable the single-service deployment of API ML for an existing multi-service API ML deployment. This procedure is specifically designed for users upgrading from **Zowe v2.18** (the final v2 release) or **Zowe v3.3.x** multi-service deployments to the consolidated single-service deployment model.

:::info Required role: system administrator:::

Single-service deployment reduces the Zowe footprint by running the Gateway, Discovery, and API Catalog, the Caching service and ZAAS components within a single address space.

:::note
For comprehensive information about single-service deployment, performance improvements, and internal service consolidation, see [Enabling Single-Service deployment of API Mediation Layer](../api-mediation/api-mediation-modulith.md).
:::

## System Requirements & Prerequisites
Before transitioning to the single-service model, verify that your z/OS environment meets the minimum standards for Zowe v3:

* **Java** 
Must be upgraded to Java 17 or Java 21. Ensure the java.home parameter in your zowe.yaml points to the correct home location for one of these versions.

* **Node.js**  
Upgrading to v20 is recommended. Update the node.home parameter in your zowe.yaml accordingly.

* **Authentication**  
SAF (System Authorization Facility) is the recommended authentication provider for enterprise security. This ensures Zowe uses your existing security manager (ESM) for identity and access management.

* **z/OSMF**:**  
If you are using z/OSMF to communicate to SAF, the following versions are supported: V2R5, V3R1, or V3R2.

* **JWT Support**  
If JWT (JSON Web Token) support is not configured or available in your environment, set  `jwtAutoconfiguration` to `ltpa` to maintain SAF-backed authentication.

:::tip
Ensure that all Zowe address spaces are stopped before modifying configuration files.
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

## Authentication & Gateway Updates
The recommended Gateway configuration is to use System Authorization Facility (SAF) via LTPA and enable SAF resource checking.

1. Set `jwtAutoconfiguration` to `ltpa` to use SAF-backed tokens for z/OSMF.

  ```yaml
  components:
    gateway:
      apiml:
        security:
          auth:
            zosmf:
              jwtAutoconfiguration: ltpa
              serviceId: ibmzosmf
  ```

2. Enable SAF authorization.
  ```yaml
  components:
    gateway:
      apiml:
        security:
          authorization:
            saf:
              enabled: true
  ```

## Refreshing Infrastructure & Cleanup

Update PROCLIB. 
Run the command `zwe init stc` (or use JCL `ZWEISTC`) to ensure your `ZWESLSTC` and `ZWESISTC` members are updated for v3.

:::note
If using Zowe Cross-Memory Server (ZIS), ensure that you update APF Authorization. 
Re-run `zwe init apfauth` to ensure the ZIS load libraries are authorized.
:::

## Restarting Zowe

After completing the infrastructure refresh and mandatory cleanup, you can bring Zowe back online.

:::note
If you are using ZIS, start this component first. This server provides the authorized services required by Zowe. 

```
/S ZWESISTC 
```
For details about ZIS configuration, see [Configuring the Zowe cross memory server (ZIS)](../configure-xmem-server.md).
:::

Start the main Zowe task. The launcher now initializes the consolidated single-service instead of multiple separate address spaces for the API Mediation Layer.
    ```
    /S ZWESLSTC
    ```
