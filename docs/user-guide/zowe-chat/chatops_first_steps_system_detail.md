# Checking details of the system

After bnz lists all the systems of the domain, you can check the details of each one of them.

-   You can check the details of the system by performing one of the following steps.
-   Click the **Show details** drill-down menu.

    ![System details](bnz_system_detail.png "System details")

-   Type and send, for example, @bnz show me the system that name is MVS1 to bnz.

-   Use command: `@bnz system list status your-system-name`.

    ![System details](bnz_system_detail_command.png "System details")

    You can also specify the automation domain name to list the system details of this automation domain as either one of the following two examples shows:

    -   `@bnz system list status MVS1 --domain-name "ESYSMVS INGXSG01"`
    -   `@bnz system list status MVS1 --dn "ESYSMVS INGXSG01"`

You can check the details of the system.

**Parent topic:**[Using Zowe Chat](chatops_first_steps.md)

