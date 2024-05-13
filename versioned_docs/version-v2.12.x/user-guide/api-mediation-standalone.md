# Starting API Mediation Layer as a standalone component

As a Zowe user, follow the procedure in this article to start the API Mediation Layer independently of other Zowe components. 
By default, the Gateway, Zowe System Services, and Virtual Desktop start when
 Zowe runs. To limit consumed resources when the Virtual Desktop or Zowe System
 Services are not required, it is possible to specify which components start in the
 context of Zowe. No change is required during the installation process to
 support this setup.
 
Once Zowe is installed, use the following procedure to limit which components start.

**Follow these steps:**

1. Open the file `zowe.yaml`.
2. Find or add the property `components.*.enabled` and set this property to `false` for all components that should not be started.
3. Restart `Zowe&trade`.

:::note
- If you plan to use API ML with basic authentication and JSON web token authentication, you need to run only `ZWESLSTC`. No need to run `ZWESISTC` and `ZWESASTC`.  
- If you plan to use API ML with x509 client-side certificate authentication, you need to run `ZWESISTC` and `ZWESLSTC`.
:::