# API Mediation Layer as a standalone component

As a Zowe user, follow the procedure in this article to start the API Mediation Layer independently of other Zowe components. 
By default, the Gateway, Zowe System Services, and Virtual Desktop start when
 Zowe runs. To limit consumed resources when the Virtual Desktop or Zowe System
 Services are not required, it is possible to specify which components start in the
 context of Zowe. No change is required during the installation process to
 support this setup.
 
Once Zowe is installed, use the following procedure to limit which components start.

**Follow these steps:**

1. Open the file `<Zowe instance directory>/instance.env`.
2. Find the property `ZWE_LAUNCH_COMPONENTS` and set `discovery,gateway,api-catalog`
3. Restart Zowe&trade.   

To learn more about the related section of the environment file, see [Creating and configuring the Zowe instance directory](configure-instance-directory.md#component-groups). We recommend you open this page in a new tab.
