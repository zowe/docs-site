# Address security requirements

During configuration of server-side components, it is necessary to configure various system security settings. Your organization may require your security administrator to complete steps to configure Zowe security. As a system administrator/programmer, first consult with your security administrator before you start the installation process. 

**Note:** This article addresses configuring Zowe security during the installation process, and does not address security configuration to extend Zowe. For more information about security configuration to extend Zowe, see the following articles:

  - [Digital certificates](../getting-started/zowe-security-overview#digital-certificates)
  - [User Authentication](../getting-started/zowe-security-overview#user-authentication)
  - [Access Authorization](../getting-started/zowe-security-overview#access-authorization)

## Tasks performed by your security administrator

To configure Zowe security for production environments, it is likely that your organization's security administrator will be required to perform various tasks. Some of the tasks apply to general Zowe configuration, while other tasks are required during installation if you plan to use specific Zowe components or features. 

The following required configuration tasks are likely to be performed by your organization's security administrator:

* [Initialize Zowe security configurations](../user-guide/initialize-security-configuration.md)
* [Perform APF autorization of load libraries](../user-guide/apf-authorize-load-library.md)
* [Configure the z/OS system for Zowe](../user-guide/configure-zos-system.md/#configure-user-ids-and-groups-for-the-zowe-started-tasks)
* [Configure address space job naming](../user-guide/configure-zos-system.md/#configure-address-space-job-naming)
* [Assign security permissions of users](#assign-security-permissions-of-users)

If your Zowe server-side installation includes the features listed in the following table, your organization's security administrator may also need to perform the associated tasks:

| Feature of a Zowe server-side component  | Configuration Task  | 
| ---- | ---- | 
| Use of Top Secret as your security manager | [Configuring multi-user address space (for TSS only)](../user-guide/configure-zos-system.md/#configure-multi-user-address-space-for-tss-only) |
| High Availability | [Configuring ZWESLSTC to run Zowe high availability instances under ZWESVUSR user ID](../user-guide/configure-zos-system.md/#configure-zweslstc-to-run-zowe-high-availability-instances-under-zwesvusr-user-id) |
| z/OSMF authentication or onboarding of z/OSMF service | [Granting users permission to access z/OSMF](../user-guide/grant-user-permission-zosmf.md) |
| ZSS component enabled (required for API ML certificate and identity mapping) |[Configuring an ICSF cryptographic services environment](../user-guide/configure-zos-system.md/#configure-an-icsf-cryptographic-services-environment) <br />and<br /> [Configuring security environment switching](../user-guide/configure-zos-system.md/#configure-security-environment-switching)|
| API Mediation Layer certificate mapping | [Configuring main Zowe server to use client certificate identity mapping](../user-guide/configure-zos-system.md/#configure-main-zowe-server-to-use-client-certificate-identity-mapping) |
| API Mediation Layer identity mapping | [Configuring main Zowe server to use distributed identity mapping](../user-guide/configure-zos-system.md/#configure-main-zowe-server-to-use-distributed-identity-mapping) |
| API Mediation Layer Identity Tokens (IDT) | [Configuring signed SAF Identity tokens (IDT)](../user-guide/configure-zos-system.md/#configure-signed-saf-identity-tokens-idt) |
| Cross memory server (ZIS) | [Configuring the cross memory server for SAF](../user-guide/configure-zos-system.md/#configure-the-cross-memory-server-for-saf)<br />and<br />[Configuring cross memory server load module](../user-guide/configure-xmem-server.md/#load-module)<br />and<br />[Configuring cross-memory server SAF configuration](../user-guide/configure-xmem-server.md/#saf-configuration) |

## Assign security permissions of users

As a security administrator, assign users and the ZWEADMIN security group permissions required to perform specific tasks. 

### Overview of user categories and roles

Specific user IDs with sufficient permissions are required to run or access Zowe. 
Your organization's security administrator is responsible to assign the following user IDs during Zowe z/OS component configuration.

The following user IDs can run Zowe: 

* **[ZWESVUSR](#zwesvusr)**  
This user runs most of the Zowe core components.
* **[ZWESIUSR](#zwesiusr)**  
This user runs the cross memory server (ZIS)

The security administrator also assigns permissions to the security group [ZWEADMIN](#zweadmin), as well as permissions to individual Zowe users.

### ZWESVUSR

This is a started task ID for `ZWESLSTC`.  

The task starts a USS environment using `BPXBATSL` that executes the core Zowe Desktop (ZLUX) node.js server, the Java API Mediation Layer, and the Z Secure Services C component.  To work with USS, the user ID `ZWESVUSR` must have a valid OMVS segment.  

### ZWESIUSR

This is a started task ID used to run the PROCLIB `ZWESISTC` that launches the [cross memory server (ZIS)](./configure-xmem-server.md). This started task ID must have a valid OMVS segment.

### ZWEADMIN

ZWEADMIN is a group that `ZWESVUSR` and `ZWESIUSR` should belong to. This group must have a valid OMVS segment.  

### zowe_user

If z/OSMF is used for authentication and serving REST APIs for Zowe CLI and Zowe Explorer users, the TSO user ID for end users must belong to one or both of the groups `IZUUSER` or `IZUADMIN`.

## Security Permissions Reference Table 

The following reference table describes which permissions are required to run Zowe core services as well as specific individual components.

| Resource class    | Resource name                          | Type of access required | Reason                                                                                                                                                                                                                        |
|----------|-----------------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CSFSERV  | `Multiple`                  | READ   | To generate symmetric keys using ICSF that is used by [Zowe Desktop cookies](./configure-zos-system.md#configure-an-icsf-cryptographic-services-environment). The list of IDs to enable include `CSF1TRD` , `CSF1TRC` , `CSF1SKE` , `CSF1SKD`. The full list of IDs is described in the z/OS Cryptographic Services user guide for your z/OS release level: [2.2](https://www.ibm.com/docs/en/zos/2.2.0?topic=ssl-racf-csfserv-resource-requirements), [2.3](https://www.ibm.com/docs/en/zos/2.3.0?topic=ssl-racf-csfserv-resource-requirements), [2.4](https://www.ibm.com/docs/en/zos/2.4.0?topic=ssl-racf-csfserv-resource-requirements) and [2.5](https://www.ibm.com/docs/en/zos/2.5.0?topic=ssl-racf-csfserv-resource-requirements). |
| FACILITY | `ZWES.IS`                   | READ   | To allow Zowe ZWESLSTC processes to access the Zowe ZIS cross memory server.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| FACILITY | `BPX.SERVER` + `BPX.DAEMON` | UPDATE | To allow Zowe to run code on behalf of the API requester's TSO user ID. For more information, see [Security Environment Switching](./configure-zos-system.md#configure-security-environment-switching).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| APPL     | `OMVSAPPL`                  | READ   | To allow Zowe to run code on behalf of the API requester's TSO user ID. This permission is also required from a requester's TSO user. You can skip this requirement when the resource `OMVSAPPL` in the `APPL` class is not defined. For more information, see [Security Environment Switching](./configure-zos-system.md#configure-security-environment-switching).                                                                                                                                                                                                                                                                                                                                                                        |
| FACILITY | `BPX.JOBNAME`               | READ   | To allow z/OS address spaces for unix processes to be renamed for [ease of identification](./configure-zos-system.md#configure-address-space-job-naming).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| FACILITY | `IRR.RADMIN.LISTUSER`       | READ   | To allow Zowe to obtain information about OMVS segment of the user profile using `LISTUSER` TSO command.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| FACILITY | `IRR.RUSERMAP`              | READ   | **Optional** To allow Zowe to [map an X.509 client certificate to a z/OS identity](./configure-zos-system.md#configure-main-zowe-server-to-use-client-certificate-identity-mapping).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| FACILITY | `IRR.IDIDMAP.QUERY`         | READ   | **Optional** To allow Zowe to [map an ditributed identity to a z/OS identity](./configure-zos-system.md#configure-main-zowe-server-to-use-distributed-identity-mapping).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| FACILITY | `IRR.RAUDITX`               | READ   | **Optional** To allow API Mediation Layer to issue [SMF 83 records](./api-mediation/api-mediation-smf) about activity of Personal Access Tokens.                                                                                                                                                                                             For more information about configuring https://docs.zowe.org/stable/user-guide/systemrequirements-zos#multi-factor-authentication-mfa                                                                                                         


