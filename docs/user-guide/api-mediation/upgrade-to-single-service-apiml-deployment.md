# Upgrade to single-service API ML deployment

Enabling single-service API ML architecture for an existing multi-service API ML deployemt. This procedure is specifically designed for users upgrading from **Zowe v2.18** (the final v2 release) or **Zowe v3.3.x** multi-service deployments to the consolidated single-service deployment model.

Single-service deployment reduces the Zowe footprint by running the Gateway, Discovery, and API Catalog components within a single address space.

## 1. System Requirements & Prerequisites
Before transitioning to the single-service model, verify that your z/OS environment meets the minimum standards for Zowe v3:

* **Java:**  
Must be upgraded to **Java 17** or **Java 21**. Update the `java.home` parameter in your `zowe.yaml`.
* **Node.js:**  
Must be upgraded to **v18 or v20**. Update `node.home`.
* **z/OSMF:**  
Requires **V2R5** or **V3R1**. 
* **JWT Support:**  
Highly recommended. If JWT support is not available, set `jwtAutoconfiguration` to `ltpa`.


## 2. Enabling the ZAAS Component
In Zowe v3, the **Zowe Authentication and Authorization Service (ZAAS)** is a mandatory standalone component for the API Mediation Layer. In previous versions, this logic was embedded within the Gateway.

Ensure that your `zowe.yaml` contains the following section:

```yaml
components:
  zaas:
    enabled: true
    port: 7558
    debug: false
```
## 3. Transitioning to Single-Service  Mode
To migrate from the multi-service deployment to the consolidated architecture, apply these specific YAML changes:

**A. Enable single-service deployment**
Set the deploymentMode to single-service under the gateway configuration:

```yaml
components:
  gateway:
    apiml:
      deploymentMode: single-service
```

**B. Disable Standalone Components**
Because the Discovery Service, API Catalog, and Caching Service are now internal to the Gateway address space, they must be disabled as standalone components to prevent port conflicts and unnecessary address spaces:

```yaml
components:
  discovery:
    enabled: false
  api-catalog:
    enabled: false
  caching-service:
    enabled: false
```

## 4. Authentication & Gateway Updates
Update the Gateway’s security configuration to reflect the service ID changes in v3:

A. Service ID: Change to ibmzosmf.

B. JWT Config: Set `jwtAutoconfiguration` to `jwt` (preferred) or `ltpa`.

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

## 5. Refreshing Infrastructure & Cleanup

A. Update PROCLIB: 
Run the command zwe init stc (or use JCL ZWEISTC) to ensure your ZWESLSTC and ZWESISTC members are updated for v3.

B. APF Authorization: 
Re-run `zwe init apfauth` to ensure the ZIS load libraries are authorized.

## 6. References & Detailed Architecture
For comprehensive information about enabling single-servie deployement, performance improvements, and internal service consolidation, see the article, [Enabling Single-Service deployment of API Mediation Layer](../api-mediation/api-mediation-modulith.md).

