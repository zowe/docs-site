# Configuring security 

During the initial installation of Zowe server-side components, it is necessary for your organization's security administrator to perform a range of tasks that require elevated security permissions. As a security administrator, follow the procedures outlined in this article to configure Zowe and your z/OS system to run Zowe with z/OS.

:::info**Required roles:** system programmer, security administrator
:::

## Validate and re-run `zwe init` commands

:::note
During installation, the system programmer customizes values in the zowe.yaml file. However, due to insufficient permissions of the system programmer, the `zwe init security` command is likely to fail. Consult with your security administrator to review your `ZWESECUR` job content so that your security adminstrator can re-submit this command.
:::

## Initialize Zowe security configurations

Choose from the following methods to initialize Zowe security configurations:

* Configuring with `zwe init security`
* Configuring with `ZWESECUR` JCL

For more information about both of these methods, see [Initialize Zowe security configurations](./initialize-security-configuration).

## Perform APF authorization of load libraries

Zowe contains load modules that require access to make privileged z/OS security manager calls. These load modules are held in two load libraries which must be APF authorized. For more information about how to issue the `zwe init apfauth` command to perform APF authority commands, see [Performing APF authorization of load libraries](./apf-authorize-load-library).

## Configure the z/OS system for Zowe

Review and perform z/OS configuration steps based on your settings. For a detailed table of configuration procedures and associated purposes for performing these procedures, see [Configuring the z/OS system for Zowe](./configure-zos-system).

## Configure address space job naming

The user ID ZWESVUSR that is associated with the Zowe started task must have `READ` permission for the `BPX.JOBNAME` profile in the `FACILITY` class. For more information about permitting user to activate the `FACILITY` class for this profile, see [Configuring address space job naming](./configure-zos-system/#configure-address-space-job-naming).

## Assign security permissions to users

Assign users (ZWESVUSR and ZWESIUSR) and the ZWEADMIN security group permissions required to perform specific tasks. For more information see, [Assign security permissions to users](./assign-security-permissions-to-users).

## Zowe Feature specific configuration tasks

Depending on the specific Zowe server-side components that your organization is wishing to utilize, specific security configuration settings may apply. Review the following table of Zowe server-side component features and their associated configuration tasks, and perform the tasks that apply to your use case.

| Feature of a Zowe server-side component                                                                                                         | Configuration Task                                                                                                                                                                                                                                                                                                                                                         | 
|-------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| If using Top Secret as your security manager <br/>**Note:** No specific configuration is necessary for security managers other than Top Secret. | [Configuring multi-user address space (for TSS only)](./configure-zos-system.md#configure-multi-user-address-space-for-tss-only)                                                                                                                                                                                                                               |                                   
| High Availability                                                                                                                               | [Configuring ZWESLSTC to run Zowe high availability instances under ZWESVUSR user ID](./configure-zos-system.md#configure-zweslstc-to-run-zowe-high-availability-instances-under-zwesvusr-user-id)                                                                                                                                                             |
| z/OSMF authentication or onboarding of z/OSMF service                                                                                           | [Granting users permission to access z/OSMF](./grant-user-permission-zosmf)                                                                                                                                                                                                                                                                                 |
| ZSS component enabled (required for API ML certificate and identity mapping)                                                                    | [Configuring an ICSF cryptographic services environment](./configure-zos-system.md#configure-an-icsf-cryptographic-services-environment) <br />and<br /> [Configuring security environment switching](./configure-zos-system.md#configure-security-environment-switching)                                                                          |
| API Mediation Layer certificate mapping                                                                                                         | [Configuring main Zowe server to use client certificate identity mapping](./configure-zos-system.md#configure-main-zowe-server-to-use-client-certificate-identity-mapping)                                                                                                                                                                                     |
| API Mediation Layer identity mapping                                                                                                            | [Configuring main Zowe server to use distributed identity mapping](./configure-zos-system.md#configure-main-zowe-server-to-use-distributed-identity-mapping)                                                                                                                                                                                                   |
| API Mediation Layer Identity Tokens (IDT)                                                                                                       | [Configuring signed SAF Identity tokens (IDT)](./configure-zos-system.md#configure-signed-saf-identity-tokens-idt)                                                                                                                                                                                                                                             |
| Cross memory server (ZIS)                                                                                                                       | [Configuring the cross memory server for SAF](../user-guide/configure-zos-system.md#configure-the-cross-memory-server-for-saf)<br />and<br />[Configuring cross memory server load module](../user-guide/configure-xmem-server.md#load-module)<br />and<br />[Configuring cross-memory server SAF configuration](./configure-xmem-server.md/#saf-configuration) |





 