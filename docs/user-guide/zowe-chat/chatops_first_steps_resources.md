# Listing the resources on the system

After bnz shows the details of the system, you can check the resources on the system.

-   You can check the resources on the system by performing one of the following steps.
-   Click the **Show resources** button.

    ![Show resources button](bnz_resource_button.png "Show resources button")

-   Use SFS. Type and send, @bnz show systems in domain domain\_name to bnz, for example, @bnz show systems in domain "ESYSMVS INGXSG01".

    ![Show resources with SFS](bnz_resource_dn_sfs.png "Show resources sfs")

-   Use command. You must specify the domain name and system name to list more specific resources as either of the following two examples shows. Also, when there are many resources in the result, you can add `--limit number` as a filter, for example:

    -   `@bnz system list resource --domain-name "ESYSMVS INGXSG01" --system-name MVS1 --limit 5`
    -   `@bnz system list resource --dn "ESYSMVS INGXSG01" --sn MVS1 --limit 5`
    ![Show resource with command](bnz_show_resource_command.png "Show resource command")

    For more specific command usage, refer to [Zowe Chat Commands](chatops_cli_cli.md).


You can check the resources on the system.

**Parent topic:**[Using Zowe Chat](chatops_first_steps.md)

