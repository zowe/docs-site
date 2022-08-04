# Initialize Zowe security configurations

This security configuration step is required for first time setup of Zowe. If Zowe has already been launched on a z/OS system from a previous release of Zowe v2, you can skip this step unless told otherwise in the release documentation.

The JCL member `.SZWESAMP(ZWESECUR)` is provided to assist with the security configuration. Before submitting the `ZWESECUR` JCL member, you should customize it to match site security rules. For script driven scenarios, you can run the command `zwe init security` which uses `ZWESECUR` as a template to create a customized member in `.CUST.JCLLIB` which contains the commands needed to perform the security configuration.

## Configuring with `zwe init security` command

The `zwe init security` command reads data from `zowe.yaml` and will construct a JCL member using `ZWESECUR` as a template which is then submitted.  This is a convenience step to assist with driving Zowe configuration through a pipeline or when you prefer to use USS commands rather than directly edit and customize JCL members.

Specify the parameter `--security-dry-run` to construct a JCL member containing the security commmands without running it.  This is useful for previewing commands and can also be used to copy and paste commands into a TSO command prompt for step by step manual execution. Here is an example:

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

You may skip using `zwe init security` to prepare a JCL member to configure the z/OS system, and edit `ZWESECUR` directly to make changes.  

The JCL allows you to vary which security manager you use by setting the _PRODUCT_ variable to be one of `RACF`, `ACF2`, or `TSS`.  

```
//         SET PRODUCT=RACF          * RACF, ACF2, or TSS
```

If `ZWESECUR` encounters an error or a step that has already been performed, it will continue to the end, so it can be run repeatedly in a scenario such as a pipeline automating the configuration of a z/OS environment for Zowe installation.  

It is expected that the security administrator at a site will want to review, edit where necessary, and either execute `ZWESECUR` as a single job or else execute individual TSO commands one by one to complete the security configuration of a z/OS system in preparation for installing and running Zowe.

The following video shows how to locate the `ZWESECUR` JCL member and execute it.

<iframe class="embed-responsive-item" id="youtubeplayer" title="Zowe ZWESECUR configure system for security (one-time)" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/-7PZFVESitI" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"> </iframe>

### Undo security configurations

If you want to undo all of the z/OS security configuration steps performed by the JCL member `ZWESECUR`, Zowe provides a reverse member `ZWENOSEC` that contains the inverse steps that `ZWESECUR` performs.  This is useful in the following situations: 

- You are configuring z/OS systems as part of a build pipeline that you want to undo and redo configuration and installation of Zowe using automation.
- You have configured a z/OS system for Zowe that you no longer want to use and you prefer to delete the Zowe user IDs and undo the security configuration settings rather than leave them enabled.  

If you run `ZWENOSEC` on a z/OS system, then you will no longer be able to run Zowe until you rerun `ZWESECUR` to reinitialize the z/OS security configuration.

## Next steps

The `ZWESECUR` JCL does not perform the following initialization steps so after you run `ZWESECUR`, you must complete these steps manually to further configure your z/OS environment.

- [Perform APF authorization of Zowe load libraries that require access to make privileged calls](apf-authorize-load-library.md)
- [Copy the JCL members for Zowe's started tasks to a PDS on proclib concatenation path](install-stc-members.md)
- [Create VSAM data sets used by the Zowe caching service](initialize-vsam-dataset.md)
- [Grant users permission to access z/OSMF](grant-user-permission-zosmf.md)
- [Configure an ICSF cryptographic services environment](configure-zos-system#configure-an-icsf-cryptographic-services-environment)
- [Configure multi-user address space (for TSS only)](configure-zos-system#configure-multi-user-address-space-for-tss-only) 

The `ZWESECUR` JCL performs the following initialization steps so you do not need to perform them manually if you have successfully run the JCL. However, if you prefer to manually configure the z/OS environment, you must complete the following steps next.  

- [User IDs and groups for the Zowe started tasks](configure-zos-system#user-ids-and-groups-for-the-zowe-started-tasks)
- [Configure ZWESLSTC to run high availability instances under ZWESVUSR user ID](configure-zos-system#configure-zweslstc-to-run-under-zwesvusr-user-ID)
- [Configure the cross memory server for SAF](configure-zos-system#configure-the-cross-memory-server-for-saf)


