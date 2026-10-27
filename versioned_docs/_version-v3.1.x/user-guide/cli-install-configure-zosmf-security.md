# Configuring z/OSMF Security

Review the tasks that security administrators must complete to configure z/OSMF security for your installation of Zowe client-side components.

:::info Required role: security administrator
:::

## Configuring z/OS REST services SAF security

:::note

If you are connecting to the mainframe with methods other than a z/OSMF profile, you do not need to configure z/OSMF security. Other connection options might include using FTP, or your custom API.

:::

A security administrator must configure security to allow z/OSMF System Authorization Facility (SAF) access to the resources that Zowe client-side components require. Zowe client-side components use REST endpoints that are associated with each z/OSMF REST API. After you complete all z/OSMF and z/OSMF cloud provisioning configurations, you can test your connection to z/OSMF to verify that your Zowe client-side components can communicate with z/OS systems.

:::caution

Before you allow users to issue z/OS console commands with Zowe client-side components, security administrators should ensure that they provide access to commands that are appropriate for their organization.

:::

The following table details the required z/OSMF REST services and examples of the features they enable.


| z/OSMF REST Service        | REST Endpoint | Description | More information |
| ----------- | ----------- | ---------- | ------------- |
| Cloud provisioning services | Endpoints that begin with: `/zosmf/provisioning/` | Cloud provisioning for development environments (`zowe provisioning list instance-info`). | <ul><li>Used by Zowe CLI</li><li>[Cloud provisioning services](https://www.ibm.com/docs/en/zos/2.5.0?topic=services-cloud-provisioning)</li></ul> |
| TSO/E address space services | Endpoints that begin with: `/zosmf/tsoApp` | TSO commands (`zowe zos-tso issue`). | <ul><li>Used by Zowe CLI, Zowe Explorer</li><li>[TSO/E address space services](https://www.ibm.com/docs/en/zos/2.5.0?topic=services-tsoe-address-space)</li><li>[Class activations that z/OSMF requires](https://www.ibm.com/docs/en/zos/2.5.0?topic=guide-security-structures-zosmf#DefaultSecuritySetupForZosmf__ResourceAuthorizationsForRESTapi__title__1)</li></ul> |
| z/OS console services | Endpoints that begin with: `/zosmf/restconsoles/`<br/> Example: `/zosmf/restconsoles/defcn` | Console commands (`zowe zos-console issue`). Any MVS console command such as MODIFY and DISPLAY. | <ul><li>Used by Zowe CLI, Zowe Explorer</li><li>[z/OS console services](https://www.ibm.com/docs/en/zos/2.5.0?topic=services-zos-console)</li><li>[Resource authorizations for the z/OS console services REST interface](https://www.ibm.com/docs/en/zos/2.5.0?topic=guide-security-structures-zosmf#DefaultSecuritySetupForZosmf__zOSConsolesRestAPI__title__1)</li></ul> |
| z/OS data set and file REST interface | Endpoints that begin with: `/zosmf/restfiles/` Example: `/zosmf/restfiles/ds/<dsname>` | Create data sets (`zowe zos-files create`), delete data sets (`zowe zos-files delete`), read (download) data sets (`zowe zos-files download`), and write (upload) data sets (`zowe zos-files upload`). <br/>Access to access method services (IDCAMS) (`zowe zos-files invoke access-method-services`). | <ul><li>Used by Zowe CLI, Zowe Explorer</li><li>[z/OS data set and file REST interface](https://www.ibm.com/docs/en/zos/2.5.0?topic=services-zos-data-set-file-rest-interface)</li><li>[Resource authorizations for the z/OS data set and file REST interface](https://www.ibm.com/docs/en/zos/2.5.0?topic=guide-security-structures-zosmf#DefaultSecuritySetupForZosmf__ResourceAuthorizationsForRESTdsfilesAPI__title__1)</li></ul> |
| z/OS jobs REST interface | Endpoints that begin with: `/zosmf/restjobs/` Example: `/zosmf/restjobs/jobs/<jobname>/<jobid>` | Submit jobs (`zowe zos-jobs submit`), purge jobs, and read job output. <br/>List jobs (`zowe zos-jobs list`). | <ul><li>Used by Zowe CLI, Zowe Explorer</li><li>[z/OS jobs REST interface](https://www.ibm.com/docs/en/zos/2.5.0?topic=services-zos-jobs-rest-interface)</li><li>[Resource authorizations for the z/OS jobs REST interface](https://www.ibm.com/docs/en/zos/2.5.0?topic=guide-security-structures-zosmf#DefaultSecuritySetupForZosmf__ResourceAuthorizationsForRESTapi__title__1)</li></ul> |
| z/OSMF workflow services | Endpoints that begin with: `/zosmf/workflow/` | Cloud provisioning for development environments (`zowe zos-workflows list active-workflows`). | <ul><li>Used by Zowe CLI</li><li>[z/OSMF workflow services](https://www.ibm.com/docs/en/zos/2.5.0?topic=services-zosmf-workflow)</li></ul> |

## Configuring z/OS console REST interface

Review the following recommendations for configuring the security for z/OS console REST services:

- Add the COMMON_TSO statement to the IZUPRMxx parmlib member to customize the z/OSMF options for the logon procedure.
- Define a value of at least 50000 KB as the size of the address space for the user's logon procedure. To help you prevent system memory exception errors from occurring, confirm that this value is acceptable in your environment.
- Ensure that the members in your z/OSMF user security group can issue TSO and CONSOLE commands. IBM provides RACF statements for user group IZUUSER. To prevent all z/OSMF users from issuing TSO and CONSOLE commands, you can create more z/OSMF user groups for more granular security.
- Ensure that the OPERCMD class is active and that your MVS commands are protected. MVS commands include, but are not limited to, the MVS and MVS.MCSOPER resource prefixes.
- Ensure that the z/OSMF user security groups can access (authorized) the logon procedure name and account number that is specified in the COMMON_TSO statement.
- Define a TSO segment for all the z/OSMF users.

## Configuring z/OS data set and file REST interface

Review the following recommendations for configuring the z/OS security for data set and file REST services:

- Add the COMMON_TSO statement to the RESTAPI_FILE parmlib member to customize the z/OSMF options for the logon procedure.
- Define a value of at least 65536 KB as the size of the address space for the user's logon procedure. To help you prevent system memory exception errors from occurring, confirm that this value is acceptable in your environment.
- Authorize z/OSMF user groups and the z/OSMF server to CEA TSO/E address space services.
- Ensure that the z/OSMF user security groups can access (authorized) the logon procedure name and account number that is specified on the COMMON_TSO statement.
- Define a TSO segment for all the z/OSMF users.
- Define at least 20971520 KB (20 MB) the IPCMSGQBYTES option of your parmlib member named BPXPRMxx. IBM recommends this value to let TSO and z/OSMF communicate using z/OS USS interprocess communications.

## Configuring z/OSMF plug-in security
Ensure that you implement all the required security for the plug-ins. For more information, see [Setting up structures for z/OSMF](https://www.ibm.com/docs/en/zos/2.5.0?topic=guide-security-structures-zosmf) in the IBM Documentation.

:::note

- For systems that are secured by RACF, ensure that the TRUSTED attribute is assigned to the CEA started task.
- To enable Zowe client-side components to authenticate to z/OSMF using certificates, security administrators can configure the certificates for users of Zowe client-side components. For more information, see [Using the z/OSMF REST services](https://www.ibm.com/docs/en/zos/2.2.0?topic=guide-using-zosmf-rest-services) in the IBM Documentation.

:::
