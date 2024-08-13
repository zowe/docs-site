# Addressing security requirements

:::info Roles required: security administrator
:::

During configuration of server-side components, it is necessary to configure various system security settings. Your
organization may require your security administrator to complete steps to configure Zowe security. As a system
administrator/programmer, first consult with your security administrator before you start the installation process.

:::note
This article addresses configuring Zowe security during the Zowe z/OS components installation process, and does not address security configuration to extend Zowe. For more information about security configuration to extend Zowe, see the following articles:

- [Digital certificates](../getting-started/zowe-security-overview#digital-certificates)
- [User Authentication](../getting-started/zowe-security-overview#user-authentication)
- [Access Authorization](../getting-started/zowe-security-overview#access-authorization)
:::

## Tasks performed by your security administrator

To configure Zowe security, your organization's security administrator is required to
perform various tasks. Some of the tasks apply to general Zowe configuration, while other tasks are required during
installation if you plan to use specific Zowe components or features.

The following required configuration tasks are performed by your organization's security administrator during the post-installation configuration:

* [Initialize Zowe security configurations](../user-guide/initialize-security-configuration.md)
* [Perform APF authorization of load libraries](../user-guide/apf-authorize-load-library.md)
* [Configure the z/OS system for Zowe](./configure-zos-system.md#configure-user-ids-and-groups-for-the-zowe-started-tasks)
* [Configure address space job naming](../user-guide/configure-zos-system.md#configure-address-space-job-naming)
* [Assign security permissions to users](#assign-security-permissions-to-users)

If your Zowe server-side installation includes the features listed in the following table, consult your 
security administrator to perform the associated security tasks after installation:

| Feature of a Zowe server-side component                                                                                                         | Configuration Task                                                                                                                                                                                                                                                                                                                                                         | 
|-------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| If using Top Secret as your security manager <br/>**Note:** No specific configuration is necessary for security managers other than Top Secret. | [Configuring multi-user address space (for TSS only)](../user-guide/configure-zos-system.md#configure-multi-user-address-space-for-tss-only)                                                                                                                                                                                                                               |                                   
| High Availability                                                                                                                               | [Configuring ZWESLSTC to run Zowe high availability instances under ZWESVUSR user ID](../user-guide/configure-zos-system.md#configure-zweslstc-to-run-zowe-high-availability-instances-under-zwesvusr-user-id)                                                                                                                                                             |
| z/OSMF authentication or onboarding of z/OSMF service                                                                                           | [Granting users permission to access z/OSMF](./assign-security-permissions-to-users/#granting-users-permission-to-access-zosmf)                                                                                                                                                                                                                                                                                 |
| ZSS component enabled (required for API ML certificate and identity mapping)                                                                    | [Configuring an ICSF cryptographic services environment](../user-guide/configure-zos-system.md#configure-an-icsf-cryptographic-services-environment) <br />and<br /> [Configuring security environment switching](../user-guide/configure-zos-system.md#configure-security-environment-switching)                                                                          |
| API Mediation Layer certificate mapping                                                                                                         | [Configuring main Zowe server to use client certificate identity mapping](../user-guide/configure-zos-system.md#configure-main-zowe-server-to-use-client-certificate-identity-mapping)                                                                                                                                                                                     |
| API Mediation Layer identity mapping                                                                                                            | [Configuring main Zowe server to use distributed identity mapping](../user-guide/configure-zos-system.md#configure-main-zowe-server-to-use-distributed-identity-mapping)                                                                                                                                                                                                   |
| API Mediation Layer Identity Tokens (IDT)                                                                                                       | [Configuring signed SAF Identity tokens (IDT)](../user-guide/configure-zos-system.md#configure-signed-saf-identity-tokens-idt)                                                                                                                                                                                                                                             |
| Cross memory server (ZIS)                                                                                                                       | [Configuring the cross memory server for SAF](../user-guide/configure-zos-system.md#configure-the-cross-memory-server-for-saf)<br />and<br />[Configuring cross memory server load module](../user-guide/configure-xmem-server.md#load-module)<br />and<br />[Configuring cross-memory server SAF configuration](../user-guide/configure-xmem-server.md#saf-configuration) |

### Assign security permissions to users

As a security administrator, assign users (`ZWESVUSR` and `ZWESIUSR`) and the `ZWEADMIN` security group permissions required to perform specific tasks.

For more information about assigning these permissions, see [Assigning security permissions to users](./assign-security-permissions-to-users).
