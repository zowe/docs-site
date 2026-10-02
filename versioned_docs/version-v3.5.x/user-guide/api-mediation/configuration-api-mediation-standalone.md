# Limiting started Zowe services to API Mediation Layer

As a Zowe user, you can start API Mediation Layer (API ML) independently of other Zowe components. 
By default, the Gateway, Zowe System Services (ZSS), and Virtual Desktop start when
 Zowe runs. To limit consumed resources when the Virtual Desktop or ZSS are not required, it is possible to specify which Zowe components start.  No change is required during the installation process to
 support this setup.
 
Once Zowe is installed, use this procedure to limit which components start. 

:::note
ZSS is only required for API ML functionalities like Client Certificates or OIDC when API ML is deployed outside of z/OS.
:::

**Follow these steps:**

1. Open the file `zowe.yaml`.
2. Find or add the property `components.*.enabled` and set this property to `false` for all components that should not be started.
3. Restart Zowe.