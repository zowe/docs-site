# Upgrading to single-service API ML deployment

Enable the single-service deployment of API ML for an existing multi-service API ML deployment. This procedure is specifically designed for users upgrading from **Zowe v2.18** (the final v2 release) or **Zowe v3.3.x** multi-service deployments to the consolidated single-service deployment model.

:::info Required role: system administrator
:::

Single-service deployment reduces the Zowe footprint by running the Gateway, Discovery, and API Catalog, the Caching service, and ZAAS components within a single address space.

:::note
For comprehensive information about single-service deployment, performance improvements, and internal service consolidation, see [Enabling Single-Service deployment of API Mediation Layer](../api-mediation/api-mediation-modulith.md).
:::

## System Requirements & Prerequisites
Before transitioning to the single-service model, verify that your z/OS environment meets the minimum standards for Zowe v3:

* **Java**  
Must be upgraded to Java 17 or Java 21. Ensure the `java.home` parameter in your zowe.yaml points to the correct home location for one of these versions.

* **Node.js**  
Upgrading to v20 is recommended. Update the `node.home` parameter in your zowe.yaml accordingly.

* **Authentication**  
SAF (System Authorization Facility) is the recommended authentication provider for enterprise security. Enabling SAF ensures that Zowe uses your existing security manager (ESM) for identity and access management.

* **z/OSMF**  
If you are using z/OSMF as the authentication provider, the following versions are supported: V2R5, V3R1, or V3R2.

* **JWT Support**  
Zowe v3 uses JWT as the primary mechanism for session management and Single Sign-On (SSO), while SAF is the recommended provider for identity and resource authorization. 

:::tip
Ensure that all Zowe address spaces are stopped before modifying configuration files.
:::


## Transitioning to Single-Service Mode
To migrate from the multi-service deployment to the single-service deployment, apply these changes to your zowe.yaml file:

Enable single-service deployment.
Set `components.apiml.enabled` to `true` under the `components.gateway` configuration:

:::note
All standalone components from the multi-service API ML deployment including the Discovery Service, API Catalog, and Caching Service are internal to the Gateway address space in the single-service deployent and are disabled when `apiml.enabled` is configured.
:::

  ```yaml
  components:
    gateway:
      apiml:
        enabled: true
  ```

:::note Alternative authentication with z/OSMF
While SAF is the recommended authentication provider, it is possible to use z/OSMF  authentication with a Java Web Token (JWT) if you cannot use SAF.

<details>
<summary>Click here for details about using z/OSMF as your authentication provider.</summary>

**z/OSMF-Based Authentication (Not Recommended)** 

1. To use z/OSMF as authentication provider, set `auth.provider` to `zosmf`, and `jwtAutoconfiguration` to `jwt`:
  
```yaml
  components:
    gateway:
      apiml:
        security:
          auth:
            provider: zosmf
            zosmf:
              jwtAutoconfiguration: jwt
              serviceId: ibmzosmf
```

2. Disable SAF resource checking: 

```yaml
  components:
    gateway:
      apiml:
        security:
          authorization:
            saf:
              enabled: false              
```

For details about using JWT and the token lifecycle, see [Authenticating with a JWT token](../authenticating-with-jwt-token.md).
  
</details>

:::

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

Start the main Zowe task. 
    ```
    /S ZWESLSTC
    ```
The launcher now initializes the API Mediation Layer in a single address space instead of multiple address spaces.