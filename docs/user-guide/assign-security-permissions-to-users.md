# Assigning security permissions to users

Assign users (ZWESVUSR and ZWESIUSR) and the ZWEADMIN security group permissions required to perform specific tasks. Each TSO user ID that logs on to Zowe and uses Zowe services that use z/OSMF requires permission to access these z/OSMF services.

:::info Required roles:  security administrator
:::

### Overview of user categories and roles

Specific user IDs with sufficient permissions are required to run or access Zowe.
Your organization's security administrator is responsible to assign the following user IDs during Zowe z/OS component
configuration.

The following user IDs run Zowe:

* **ZWESVUSR**  
  This is the started task ID of the Zowe runtime user who runs most of the Zowe core
  components. 
  
* **ZWESIUSR**  
  This user runs the cross memory server (ZIS). This is a started task ID used to run the PROCLIB `ZWESISTC` that
  launches the [cross memory server (ZIS)](./configure-xmem-server.md). 

:::caution Important!
To work with USS, the user ID must have a valid OMVS segment. For more information about OMVS segments, see the article _The OMVS segment in user profiles_ in the IBM documentation. For detailed information about which permissions are required to run Zowe core services as well as specific individual components, see the [Security Permissions Reference Table](#security-permissions-reference-table) in this article.

:::

The security administrator also assigns permissions to the security group **ZWEADMIN**. `ZWEADMIN` is a group
consisting of `ZWESVUSR` and `ZWESIUSR`. This group must have a valid OMVS segment.

Additionally, the security administrator assigns permissions to individual Zowe users. If z/OSMF is used for
authentication and serving REST APIs for Zowe CLI and Zowe Explorer users, the TSO user ID for end users must belong to
one or both of the groups `IZUUSER` or `IZUADMIN`.

## Security Permissions Reference Table

The following reference table describes which permissions are required for the user ID `ZWESVUSR` to run Zowe core
services and specific individual components.

If you already successfully ran
the [`ZWESECUR`](/docs/user-guide/initialize-security-configuration.md#configuring-with-zwesecur-jcl) JCL either
separately or by running
the [`zwe init security`](/docs/user-guide/initialize-security-configuration.md#configuring-with-zwe-init-security-command)
command, you do not need to perform the steps described in this section. The TSO commands to create the user IDs and
groups are executed during the JCL sections of `ZWESECUR`. For more information about the `zwe init security` command,
see [zwe init security](../appendix/zwe_server_command_reference/zwe/init/zwe-init-security.md).

| Feature of a Zowe server-side component                    | Resource class | Resource name               | Type of access required | Reason                                                                                                                                                                                                                                                                                                                                                                                | Actions                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|------------------------------------------------------------|----------------|-----------------------------|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Core                                                       | FACILITY       | `BPX.JOBNAME`               | READ                    | Allow z/OS address spaces for unix processes to be renamed for [ease of identification](./configure-zos-system.md#configure-address-space-job-naming).                                                                                                                                                                                                                                | This parameter permits the Zowe main server to set the job name. Run the command that applies to your ESM. <br/>• [RACF](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L353) <br/>• [ACF2](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L586) <br/>• [Top Secret](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L801)                           |
| API Mediation Layer certificate mapping                    | FACILITY       | `IRR.RUSERMAP`              | READ                    | **Optional** Allow Zowe to [map an X.509 client certificate to a z/OS identity](./configure-zos-system.md#configure-main-zowe-server-to-use-client-certificate-identity-mapping).                                                                                                                                                                                                     | This parameter permits the Zowe main server to use the client certificate mapping service. Run the command that applies to your ESM. <br/>• [RACF](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L369) <br/>• [ACF2](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L606) <br/>• [Top Secret](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L811) |
| API Mediation Layer identity mapping                       | FACILITY       | `IRR.IDIDMAP.QUERY`         | READ                    | **Optional** Allow Zowe to [map a distributed identity to a z/OS identity](./configure-zos-system.md#configure-main-zowe-server-to-use-distributed-identity-mapping).                                                                                                                                                                                                                 | This parameter permits the Zowe main server to use distributed identity mapping service. Run the command that applies to your ESM. <br/>• [RACF](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L374) <br/>• [ACF2](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L611) <br/>• [Top Secret](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L815)   |
| API Mediation Layer SMF records                            | FACILITY       | `IRR.RAUDITX`               | READ                    | **Optional** Allow API Mediation Layer to issue [SMF 83 records](./api-mediation/api-mediation-smf) about activity of Personal Access Tokens. For more information about configuring the main Zowe server to issue SMF records, see [Configure the main Zowe server to issue SMF records](./address-authentication-requirements/#configure-the-main-zowe-server-to-issue-smf-records) | This parameter permits the Zowe main server to cut SMF records. Run the command that applies to your ESM. <br/>• [RACF](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L381) <br/>• [ACF2](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L616) <br/>• [Top Secret](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L820)                            |
| ZSS (required for API ML certificate and identity mapping) | FACILITY       | `BPX.SERVER` + `BPX.DAEMON` | UPDATE                  | Allow Zowe to run code on behalf of the API requester's TSO user ID. For more information, see [Security Environment Switching](./configure-zos-system.md#configure-security-environment-switching).                                                                                                                                                                                  | This parameter permits the Zowe main server to create a user's security environment. Run the command that applies to your ESM. <br/>• [RACF](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L333) <br/>• [ACF2](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L568) <br/>• [Top Secret](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L784)       |
| ZSS (required for API ML certificate and identity mapping) | APPL           | `OMVSAPPL`                  | READ                    | Allow Zowe to run code on behalf of the API requester's TSO user ID. This permission is also required from a requester's TSO user. You can skip this requirement when the resource `OMVSAPPL` in the `APPL` class is not defined. For more information, see [Security Environment Switching](./configure-zos-system.md#configure-security-environment-switching).                     | This parameter permits the Zowe main server to run the code on behalf of the user. Run the command that applies to your ESM. <br/>• [RACF](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L347) <br/>• [ACF2](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L579) <br/>• [Top Secret](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L796)         |
| ZSS                                                        | FACILITY       | `IRR.RADMIN.LISTUSER`       | READ                    | Allow Zowe to obtain information about OMVS segment of the user profile using `LISTUSER` TSO command.                                                                                                                                                                                                                                                                                 | This parameter permits the Zowe main server to obtain information about OMVS segment of the user profile. Run the command that applies to your ESM. <br/>• RACF <br/>• ACF2 <br/>• Top Secret                                                                                                                                                                                                                                                                                                                                                                                                    |
| ZSS                                                        | CSFSERV        | `Multiple`                  | READ                    | Generate symmetric keys using ICSF that is used by [Zowe Desktop cookies](./configure-zos-system.md#configure-an-icsf-cryptographic-services-environment).                                                                                                                                                                                                                            | The list of IDs to enable include `CSF1TRD` , `CSF1TRC` , `CSF1SKE` , `CSF1SKD`. The full list of IDs is described in the z/OS Cryptographic Services user guide for your z/OS release level: [2.2](https://www.ibm.com/docs/en/zos/2.2.0?topic=ssl-racf-csfserv-resource-requirements), [2.3](https://www.ibm.com/docs/en/zos/2.3.0?topic=ssl-racf-csfserv-resource-requirements), [2.4](https://www.ibm.com/docs/en/zos/2.4.0?topic=ssl-racf-csfserv-resource-requirements) and [2.5](https://www.ibm.com/docs/en/zos/2.5.0?topic=ssl-racf-csfserv-resource-requirements).                     |                |               |                         |                                                                                                                                                            |                                                                                                                                |
| Cross memory server (ZIS)                                  | FACILITY       | `ZWES.IS`                   | READ                    | Allow Zowe ZWESLSTC processes to access the Zowe ZIS cross memory server.                                                                                                                                                                                                                                                                                                             | This parameter permits the Zowe main server to use ZIS cross memory server. Run the command that applies to your ESM. <br/>• [RACF](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L329) <br/>• [ACF2](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L560) <br/>• [Top Secret](https://github.com/zowe/zowe-install-packaging/blob/79527166f34e28c205c5f60bf4b4bb7b630bc6a1/workflows/templates/ZWESECUR.vtl#L780)                |

## Granting users permission to access z/OSMF

Each TSO user ID that logs on to Zowe and uses Zowe services that use z/OSMF requires permission to access these z/OSMF services. It is necessary that every user ID be added to the group with the appropriate z/OSMF privileges, `IZUUSER` or `IZUADMIN` (default). 

:::info Required role:  security administrator
:::

This step is not included in the provided Zowe JCL because it must be done for every TSO user ID who wants to access Zowe's z/OS services.  The list of those user IDs will typically be the operators, administrators, developers, or anyone else in the z/OS environment who is logging in to Zowe.

:::note
You can skip this section if you use Zowe without z/OSMF.  Zowe can operate without z/OSMF but services that use z/OSMF REST APIs will not be available, specifically the USS, MVS, and JES Explorers and the Zowe Command Line Interface files, jobs, workflows, tso, and console groups.
:::

To grant permissions to the user ID to access z/OSMF, issue the command(s) that corresponds to your ESM.

<details>
<summary>Click here for command details for RACF.</summary>

- If you use RACF, issue the following command:

  ```
  CONNECT (userid) GROUP(IZUUSER)
  ```

</details>

<details>
<summary>Click here for command details for ACF2.</summary>

- If you use ACF2, issue the following commands:

  ```
  ACFNRULE TYPE(TGR) KEY(IZUUSER) ADD(UID(<uid string of user>) ALLOW)
  F ACF2,REBUILD(TGR)
  ```

</details>

<details>
<summary>Click here for command details for Top Secret.</summary>

- If you use Top Secret, issue the following commands:

  ```
  TSS ADD(userid)  PROFILE(IZUUSER)
  TSS ADD(userid)  GROUP(IZUUSRGP) 
  ```
</details>

## Next step

After you complete assigning security permissions, the next step is to [configure certificates](./configure-certificates).