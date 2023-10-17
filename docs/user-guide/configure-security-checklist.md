# Configuring security checklist

During the initial installation of Zowe server-side components, it is necessary for your organization's security administrator to perform a range of tasks that require elevated security permissions. As a security administrator, follow the procedures outlined in this checklist to configure Zowe and your z/OS system to run Zowe with z/OS.

**Tip:** We recommend that you consult with your security administrator who has the necessary permissions to perform the following security configuration procedures. 

## Validate and re-run `zwe init` commands

**Important!** During installation, the system programmer customizes values in the zowe.yaml file. However, due to insufficient permissions of the system programmer, the `zwe init security` command fails without notification. 

<!-- ADD INSTRUCTIONS FOR HOW THE SECURITY ADMIN CHECKS FOR FAILED RUNS OF zwe init. -->

<!-- ADD PROCEDURE FOR RE-RUNNING THE `zwe init security` COMMAND -->

## Initialize Zowe security configurations

Choose from the following methods to initialize Zowe security configurations:

* Configuring with `zwe init security`
* Configuring with `ZWESECUR` JCL

For more information about both of these methods, see [Initialize Zowe security configurations](./initialize-security-configuration.md).

## Perform APF authorization of load libraries

Zowe contains load modules that require access to make privileged z/OS security manager calls. These load modules are held in two load libraries which must be APF authorized. For more information about how to issue the `zwe init apfauth` command to perform APF authority commands, see [Make z/OS security manager calls with APF authority commands](./apf-authorize-load-library.md).

## Configure the z/OS system for Zowe

Review and perform z/OS configuration steps based on your settings. For a detailed table of configuration procedures and associated purposes for performing these procedures, see [Configuring the z/OS system for Zowe](./configure-zos-system.md).

## Configure address space job naming

The user ID ZWESVUSR that is associated with the Zowe started task must have `READ` permission for the `BPX.JOBNAME` profile in the `FACILITY` class. For more information about permitting user to activate the `FACILITY` class for this profile, see [Configuring addrss space job naming](./configure-zos-system/#configure-address-space-job-naming).

## Assign security permissions of users

Assign users (ZWESVUSR and ZWESIUSR) and the ZWEADMIN security group permissions required to perform specific tasks. For more information see, [Assign security permissions to users]().

## Feature specific configuration tasks

Depending on the specific Zowe server-side components that your organization is wishing to utilize, specific security configuration settings may apply. Review the following table of Zowe server-side component features and their associated configuration tasks, and perform the tasks that apply to your use case.

| Feature of a Zowe server-side component                                                                                                         | Configuration Task                                                                                                                                                                                                                                                                                                                                                         | 
|-------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| If using Top Secret as your security manager <br/>**Note:** No specific configuration is necessary for security managers other than Top Secret. | [Configuring multi-user address space (for TSS only)](../user-guide/configure-zos-system.md#configure-multi-user-address-space-for-tss-only)                                                                                                                                                                                                                               |                                   
| High Availability                                                                                                                               | [Configuring ZWESLSTC to run Zowe high availability instances under ZWESVUSR user ID](../user-guide/configure-zos-system.md#configure-zweslstc-to-run-zowe-high-availability-instances-under-zwesvusr-user-id)                                                                                                                                                             |
| z/OSMF authentication or onboarding of z/OSMF service                                                                                           | [Granting users permission to access z/OSMF](../user-guide/grant-user-permission-zosmf.md)                                                                                                                                                                                                                                                                                 |
| ZSS component enabled (required for API ML certificate and identity mapping)                                                                    | [Configuring an ICSF cryptographic services environment](../user-guide/configure-zos-system.md#configure-an-icsf-cryptographic-services-environment) <br />and<br /> [Configuring security environment switching](../user-guide/configure-zos-system.md#configure-security-environment-switching)                                                                          |
| API Mediation Layer certificate mapping                                                                                                         | [Configuring main Zowe server to use client certificate identity mapping](../user-guide/configure-zos-system.md#configure-main-zowe-server-to-use-client-certificate-identity-mapping)                                                                                                                                                                                     |
| API Mediation Layer identity mapping                                                                                                            | [Configuring main Zowe server to use distributed identity mapping](../user-guide/configure-zos-system.md#configure-main-zowe-server-to-use-distributed-identity-mapping)                                                                                                                                                                                                   |
| API Mediation Layer Identity Tokens (IDT)                                                                                                       | [Configuring signed SAF Identity tokens (IDT)](../user-guide/configure-zos-system.md#configure-signed-saf-identity-tokens-idt)                                                                                                                                                                                                                                             |
| Cross memory server (ZIS)                                                                                                                       | [Configuring the cross memory server for SAF](../user-guide/configure-zos-system.md#configure-the-cross-memory-server-for-saf)<br />and<br />[Configuring cross memory server load module](../user-guide/configure-xmem-server.md#load-module)<br />and<br />[Configuring cross-memory server SAF configuration](../user-guide/configure-xmem-server.md#saf-configuration) |





 