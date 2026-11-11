# Initializing Zowe security configurations


<!-- The content from this article has been added to Configuring security. This file will be deprecated after this Pull Request is reviewed. -->

This security configuration step is required for first time setup of Zowe. If Zowe has already been launched on a z/OS system from a previous release of Zowe v2, and the `zwe init security` subcommand successfully ran when initializing the z/OS subsystem, you can skip this step unless told otherwise in the release documentation.

:::info Required roles: system programmer, security administrator

Consult with your security administrator before you proceed with initializing Zowe security configurations.
:::

The JCL member `.SZWESAMP(ZWESECUR)` is provided to assist with the security configuration. Before submitting the `ZWESECUR` JCL member, you should customize it to match site security rules. For script driven scenarios, you can run the command `zwe init security` which uses `ZWESECUR` as a template to create a customized member in `.CUST.JCLLIB` which contains the commands needed to perform the security configuration.

:::note
Zowe supports TLS versions 1.2 and 1.3.
:::

## Configuring with `zwe init security` command

The `zwe init security` command reads data from `zowe.yaml` and constructs a JCL member using `ZWESECUR` as a template which is then submitted. This is a convenience step to assist with driving Zowe configuration through a pipeline or when you prefer to use USS commands rather than directly edit and customize JCL members.

:::note
If you do not have permissions to update your security configurations, use the `security-dry-run`. We recommend you inform your security administrator to review the `ZWESECUR` job content.
:::

### Using `security-dry-run`

Specify the parameter `--security-dry-run` to construct a JCL member containing the security commmands without running it.  This is useful for previewing commands and can also be used to copy and paste commands into a TSO command prompt for step by step manual execution. 

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

## Configuring with `ZWESECUR` JCL

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

### Undo security configurations

To undo all of the z/OS security configuration steps performed by the JCL member `ZWESECUR`, use the reverse member `ZWENOSEC`. This member contains steps that reverse steps performed by `ZWESECUR`.  This is useful in the following situations: 

- You are configuring z/OS systems as part of a build pipeline that you want to undo, and redo configuration and installation of Zowe using automation.
- You configured a z/OS system for Zowe that you no longer want to use, and you prefer to delete the Zowe user IDs and undo the security configuration settings rather than leave them enabled.  

If you run `ZWENOSEC` on a z/OS system, it is necessary to rerun `ZWESECUR` to reinitialize the z/OS security configuration. Zowe cannot be run until `ZWESECUR` is rerun. 

## Next step

After you successfully initalize Zowe security configurations, the next step is to [perform APF authorization of load libraries](./apf-authorize-load-library.md).


