# Limiting started Zowe services to API Mediation Layer

As a Zowe user, you can start API Mediation Layer independently of other Zowe components. 
By default, the Gateway, Zowe System Services, and Virtual Desktop start when
 Zowe runs. To limit consumed resources when the Virtual Desktop or Zowe System
 Services are not required, it is possible to specify which components start in the
 context of Zowe. No change is required during the installation process to
 support this setup.
 
Once Zowe is installed, use this procedure to limit which components start. 

:::note
Zowe System Services are required for some of functionalities of API Mediation Layer such as Client Certificates or OIDC.
:::

**Follow these steps:**

1. Open the file `zowe.yaml`.
2. Find or add the property `components.*.enabled` and set this property to `false` for all components that should not be started.
3. Restart Zowe.