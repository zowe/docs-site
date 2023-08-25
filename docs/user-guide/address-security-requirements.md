# Address security requirements

As a ... (Identify the role/roles who are addressing these requirements.)


Zowe implements comprehensive measures to secure mainframe services and data resources in transition and in rest:

- Zowe uses digital certificates to facilitate secure electronic communication and data exchange between people, systems, and devices online.
- User identity is authenticated through modern authentication methods such as OIDC/Oauth2, Multi-Factor Authentication (MFA), JWT, or Personal Access Token (PAT).
- User access is authorized by System Authorization Facility (SAF) / External Security Manager (ESM).

Before installing Zowe server-side components, it is practical to first learn about the core security features built into the Zowe architecture.

This document provides an overview of the security technologies and features implemented by Zowe and links to Zowe practical guides on how to achieve specific tasks and goals.

**Note:** If you are familiar with security technologies and concepts such as digital certificates, authentication, authorization, and z/OS security, 
you may prefer to skip the introductory sections, and see the [Additional resources section](#additional-resources) at the end of this article. Use this section to jump directly into the security related technical guidance provided on how to Set up Zowe, Use Zowe, or Extend Zowe.

Learn about the details of how Zowe leverages modern security concepts and technologies:
  - [Digital certificates](../getting-started/zowe-security-overview#digital-certificates)
  - [User Authentication](../getting-started/zowe-security-overview#user-authentication)
  - [Access Authorization](../getting-started/zowe-security-overview#access-authorization)

## User ID requirements and security permissions

Specific user IDs with sufficient permissions are required to run or access Zowe. 

<!--Identify the specific task and the role associated with it. -->

### ZWESVUSR

This is a started task ID for `ZWESLSTC`.  

The task starts a USS environment using `BPXBATSL` that executes the core Zowe Desktop (ZLUX) node.js server, the Java API Mediation Layer, and the Z Secure Services C component.  To work with USS, the user ID `ZWESVUSR` must have a valid OMVS segment.  


| Class    | ID                          | Access | Reason                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|----------|-----------------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CSFSERV  | `Multiple`                  | READ   | To generate symmetric keys using ICSF that is used by [Zowe Desktop cookies](./configure-zos-system.md#configure-an-icsf-cryptographic-services-environment). The list of IDs to enable include `CSF1TRD` , `CSF1TRC` , `CSF1SKE` , `CSF1SKD`. The full list of IDs is described in the z/OS Cryptographic Services user guide for your z/OS release level: [2.2](https://www.ibm.com/docs/en/zos/2.2.0?topic=ssl-racf-csfserv-resource-requirements), [2.3](https://www.ibm.com/docs/en/zos/2.3.0?topic=ssl-racf-csfserv-resource-requirements), [2.4](https://www.ibm.com/docs/en/zos/2.4.0?topic=ssl-racf-csfserv-resource-requirements) and [2.5](https://www.ibm.com/docs/en/zos/2.5.0?topic=ssl-racf-csfserv-resource-requirements). |
| FACILITY | `ZWES.IS`                   | READ   | To allow Zowe ZWESLSTC processes to access the Zowe ZIS cross memory server.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| FACILITY | `BPX.SERVER` + `BPX.DAEMON` | UPDATE | To allow Zowe to run code on behalf of the API requester's TSO user ID. For more information, see [Security Environment Switching](./configure-zos-system.md#configure-security-environment-switching).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| APPL     | `OMVSAPPL`                  | READ   | To allow Zowe to run code on behalf of the API requester's TSO user ID. This permission is also required from a requester's TSO user. You can skip this requirement when the resource `OMVSAPPL` in the `APPL` class is not defined. For more information, see [Security Environment Switching](./configure-zos-system.md#configure-security-environment-switching).                                                                                                                                                                                                                                                                                                                                                                        |
| FACILITY | `BPX.JOBNAME`               | READ   | To allow z/OS address spaces for unix processes to be renamed for [ease of identification](./configure-zos-system.md#configure-address-space-job-naming).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| FACILITY | `IRR.RADMIN.LISTUSER`       | READ   | To allow Zowe to obtain information about OMVS segment of the user profile using `LISTUSER` TSO command.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| FACILITY | `IRR.RUSERMAP`              | READ   | **Optional** To allow Zowe to [map an X.509 client certificate to a z/OS identity](./configure-zos-system.md#configure-main-zowe-server-to-use-client-certificate-identity-mapping).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| FACILITY | `IRR.IDIDMAP.QUERY`         | READ   | **Optional** To allow Zowe to [map an ditributed identity to a z/OS identity](./configure-zos-system.md#configure-main-zowe-server-to-use-distributed-identity-mapping).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| FACILITY | `IRR.RAUDITX`               | READ   | **Optional** To allow API Mediation Layer to issue [SMF 83 records](./api-mediation/api-mediation-smf) about activity of Personal Access Tokens.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

### ZWESIUSR

This is a started task ID used to run the PROCLIB `ZWESISTC` that launches the [cross memory server](./configure-xmem-server.md) (also known as ZIS).  It must have a valid OMVS segment.

### ZWEADMIN

This is a group that `ZWESVUSR` and `ZWESIUSR` should belong to. It must have a valid OMVS segment.  

### zowe_user

If z/OSMF is used for authentication and serving REST APIs for Zowe CLI and Zowe Explorer users, the TSO user ID for end users must belong to one or both of the groups `IZUUSER` or `IZUADMIN`.