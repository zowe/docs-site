# Configuring security 

During the initial installation of Zowe server-side components, it is necessary for your organization's security administrator to perform a range of tasks that require elevated security permissions. As a security administrator, follow the procedures outlined in this article to configure Zowe and your z/OS system to run Zowe with z/OS.

:::info Required role: security administrator (elevated permissions required)
:::

:::note
For initial tasks to be performed by the security administrator before Zowe server-side installation, see [Addressing security requirements](./address-security-requirements.md).

:::

## Validate and re-run `zwe init` commands

During installation, the system programmer customizes values in the zowe.yaml file. However, due to insufficient permissions of the system programmer, the `zwe init security` command may fail without sufficient user authorization. 

## Initialize Zowe security configurations

This security configuration step is required for first time setup of Zowe and may require security authorization. If Zowe has already been launched on a z/OS system from a previous release of Zowe v2, and the `zwe init security` subcommand successfully ran when initializing the z/OS subsystem, you can skip this step unless told otherwise in the release documentation.

Choose from the following methods to initialize Zowe security configurations:

<details>
<summary>Click here to configure with the `zwe init security` command.</summary>

**Configure with `zwe init security` command**

The `zwe init security` command reads data from `zowe.yaml` and constructs a JCL member using `ZWESECUR` as a template which is then submitted. This is a convenience step to assist with driving Zowe configuration through a pipeline or when you prefer to use USS commands rather than directly edit and customize JCL members.

:::note
If you do not have permissions to update your security configurations, use the `security-dry-run` described in the following tip. We recommend you inform your security administrator to review the `ZWESECUR` job content.
:::

:::tip

To avoid having to run the `init security` command, you can specify the parameter `--security-dry-run`. This parameter enables you to construct a JCL member containing the security commmands without running the member. This is useful for previewing commands and can also be used to copy and paste commands into a TSO command prompt for step by step manual execution. 

**Example:**

```
#>zwe init security -c ./zowe.yaml --security-dry-run
-------------------------------------------------------------------------------
>> Run Zowe security configurations

Modify ZWESECUR
- IBMUSER.ZWEV2.CUST.JCLLIB(ZW134428) is prepared

Dry-run mode, security setup is NOT performed on the system.
Please submit IBMUSER.ZWEV2.CUST.JCLLIB(ZW134428) manually.
>> Zowe security configurations are applied successfully.

#>
```
:::

</details>

<!-- Validate is the following section should be removed -->

<details>
<summary>Click here to configure with `ZWESECUR` JCL.<!-- Validate if this method should be removed --> </summary>
 

**Configure with `ZWESECUR` JCL**

An alternative to using `zwe init security` is to prepare a JCL member to configure the z/OS system, and edit `ZWESECUR` to make changes.  

The JCL allows you to vary which security manager you use by setting the _PRODUCT_ variable to be one of the following ESMs:
* `RACF`
* `ACF2`
* `TSS`.  

**Example:**
```
//         SET PRODUCT=RACF          * RACF, ACF2, or TSS
```

If `ZWESECUR` encounters an error or a step that has already been performed, it continues to the end, so it can be run repeatedly in a scenario such as a pipeline automating the configuration of a z/OS environment for Zowe installation.  

:::info Important
It is expected that your security administrator will be required to review, edit where necessary, and either execute `ZWESECUR` as a single job, or execute individual TSO commands to complete the security configuration of a z/OS system in preparation for installing and running Zowe.
:::

The following video shows how to locate the `ZWESECUR` JCL member and execute it.

<iframe class="embed-responsive-item" id="youtubeplayer" title="Zowe ZWESECUR configure system for security (one-time)" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/-7PZFVESitI" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"> </iframe>

</details>

<!-- Validate if the following section should be revised or removed -->
:::tip

If an error occured in performing security configuration, these configurations can be undone. 
<details>
<summary>Click here for details about undoing security configurations.</summary>


To undo all of the z/OS security configuration steps performed by the JCL member `ZWESECUR`, use the reverse member `ZWENOSEC`. This member contains steps that reverse steps performed by `ZWESECUR`.  This is useful in the following situations: 

- You are configuring z/OS systems as part of a build pipeline that you want to undo, and redo configuration and installation of Zowe using automation.
- You configured a z/OS system for Zowe that you no longer want to use, and you prefer to delete the Zowe user IDs and undo the security configuration settings rather than leave them enabled.  

If you run `ZWENOSEC` on a z/OS system, it is necessary to rerun `ZWESECUR` to reinitialize the z/OS security configuration. Zowe cannot be run until `ZWESECUR` is rerun. 

</details>

:::

## Perform APF authorization of load libraries

Zowe contains load modules that require access to make privileged z/OS security manager calls. These load modules are held in two load libraries which must be APF authorized. For more information about how to issue the `zwe init apfauth` command to perform APF authority commands, see [Performing APF authorization of load libraries](./apf-authorize-load-library.md).

## Customize security of your z/OS system

Review and perform z/OS configuration steps based on your settings. For a detailed table of configuration procedures and associated purposes for performing these procedures, see [Customizing z/OS system security](./configure-zos-system.md).

## Assign security permissions to users

Assign users (ZWESVUSR and ZWESIUSR) and the ZWEADMIN security group permissions required to perform specific tasks. For more information see, [Assigning security permissions to users](./assign-security-permissions-to-users.md).

## Zowe Feature specific configuration tasks

Depending on the specific Zowe server-side components that your organization is wishing to utilize, specific security configuration settings may apply. Review the following table of Zowe server-side component features and their associated configuration tasks, and perform the tasks that apply to your use case.

| Feature of a Zowe server-side component                                                                                                         | Configuration Task                                                                                                                                                                                                                                                                                                                                                         | 
|-------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| If using Top Secret as your security manager <br/>**Note:** No specific configuration is necessary for security managers other than Top Secret. | [Configuring multi-user address space (for TSS only)](./configure-zos-system.md#configure-multi-user-address-space-for-tss-only)                                                                                                                                                                                                                               |                                   
| High Availability                                                                                                                               | [Configuring ZWESLSTC to run Zowe high availability instances under ZWESVUSR user ID](./configure-zos-system.md#configure-zweslstc-to-run-zowe-high-availability-instances-under-zwesvusr-user-id)                                                                                                                                                             |
| z/OSMF authentication or onboarding of z/OSMF service                                                                                           | [Granting users permission to access z/OSMF](./assign-security-permissions-to-users/#granting-users-permission-to-access-zosmf)                                                                                                                                                                                                                                                                                 |
| ZSS component enabled (required for API ML certificate and identity mapping)                                                                    | [Configuring an ICSF cryptographic services environment](./configure-zos-system.md#configure-an-icsf-cryptographic-services-environment) <br />and<br /> [Configuring security environment switching](./configure-zos-system.md#configure-security-environment-switching)                                                                          |
| API Mediation Layer certificate mapping                                                                                                         | [Configuring main Zowe server to use client certificate identity mapping](./configure-zos-system.md#configure-main-zowe-server-to-use-client-certificate-identity-mapping)                                                                                                                                                                                     |
| API Mediation Layer identity mapping                                                                                                            | [Configuring main Zowe server to use distributed identity mapping](./configure-zos-system.md#configure-main-zowe-server-to-use-distributed-identity-mapping)                                                                                                                                                                                                   |
| API Mediation Layer Identity Tokens (IDT)                                                                                                       | [Configuring signed SAF Identity tokens (IDT)](./configure-zos-system.md#configure-signed-saf-identity-tokens-idt)                                                                                                                                                                                                                                             |
| Cross memory server (ZIS)                                                                                                                       | [Configuring the cross memory server for SAF](../user-guide/configure-zos-system.md#configure-the-cross-memory-server-for-saf)<br />and<br />[Configuring cross memory server load module](../user-guide/configure-xmem-server.md#load-module)<br />and<br />[Configuring cross-memory server SAF configuration](./configure-xmem-server.md#saf-configuration) |


## Next steps

After Zowe z/OS runtime is initialized, and you complete other procedures in the Configuring security section, the next step is [Configuring certificates](./configure-certificates.md).
