# Installing Overview

Review this article for an overview of the methods available to install Zowe z/OS server-side components. Choose the installation method that best fits your environment, your organization's processes, and your level of experience with z/OS. More details about each method are provided in the articles in this section.

:::info Required roles: system programmer
:::

After you install Zowe z/OS components, you must configure the Zowe runtime and the z/OS system. For more information, see the [Configuring Overview](./configuring-overview.md).

## Installation methods

Zowe server-side components can be installed using any of the following methods:

* **Zowe Server Install Wizard**  
Use the Zowe Server Install Wizard for a guided, streamlined installation experience from Microsoft Windows, macOS, or Linux. The Wizard can be used as an alternative to manual installation steps, or if you are new to installing Zowe. Use the Wizard to  install either the pax or SMP/E edition of Zowe and perform initial configuration with `zwe init`. 

    For more information, see [Installing the z/OS Build via Zowe Server Install Wizard](./install-zowe-server-install-wizard.md).

* **SMP/E**  
Use SMP/E installation if your organization manages z/OS software with SMP/E, which provides standard z/OS tracking, service, and maintenance of installed products. This method is intended for system programmers who are responsible for program installation and maintenance.

    For more information, see [Installing the z/OS Build via SMP/E](./install-zowe-smpe-overview.md).

* **z/OSMF from PSWI and SMP/E workflow**  
Use z/OSMF if you want to install Zowe through z/OSMF Portable Software Instance (PSWI) deployment or by running the SMP/E workflow. This method is useful if z/OSMF is already part of your software management process and you prefer to use workflows to drive installation.

    For more information, see [Installing the z/OS Build via z/OSMF from PSWI and SMP/E workflow](./zosmf-install.md).

* **Convenience build (pax file)**  
Use the convenience build to install Zowe quickly from a pax file that you download and transfer to z/OS. This method is well suited to evaluation, development, and test environments, or to installations that do not require SMP/E. You install, configure, and start Zowe with the `zwe` command.

    For more information, see [Installing the z/OS Build via Convenience Build (PAX file)](./install-zowe-zos-convenience-build.md).

* **Container build with Kubernetes**  
Use the container build if you want to run Zowe servers in containers on platforms other than z/OS, such as Linux on Z or your PC. This method is useful for rapid local development, scaling capacity with redundant copies of servers, and utilizing container monitoring tools.

    For more information, see [Installing the Container Build with Kubernetes](./k8s-introduction.md).

:::tip
If you are unsure which method to use, the Zowe Server Install Wizard is the simplest starting point. Consult your organization's system programmers to determine which installation methods align with your site's software management standards.
:::
