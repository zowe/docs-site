# User ID requirements

Specific User IDs with sufficient permissions are required to run or to access Zowe. 

## ZWESVUSR

This is a started task ID used to run the PROCLIB `ZWESVSTC`.  

The task starts a USS environment using `BPXBATSL` used to execute the core Zowe Desktop (ZLUX) node.js server, the Java API Mediation Layer, and the Z Secure Services C component.  In order to work with USS the user ID `ZWESVUSR` must have a valid OMVS segment.  

| Class  | ID     | Access |  Reason |
|--------|--------|--------|---------|
| CSFSERV | CSFRNGL | READ | For generating symmetric keys using ICSF used by [Zowe Desktop cookies](./configure-zos-system.md#configure-an-icsf-cryptographic-services-environment) |
| FACILITY | ZWES.IS | READ | To allow Zowe ZWESVSTC processes to access the Zowe ZIS cross memory server |
| FACILITY | BPX.SERVER + BPX.DEAMON | UPDATE | To allow the Zowe Desktop ZLUX server to run code on behalf of the API requester's TSO user ID, see [Security Environment Switching](./configure-zos-system.md#configure-security-environment-switching)). |
| FACILITY | IRR.RUSERMAP | READ | To allow Zowe to map an X.509 [client certificate to a z/OS identity](./configure-zos-system.md#configure-main-zowe-server-to-use-identity-mapping) | 
| FACILITY | BPX.JOBNAME | READ | Allows z/OS address spaces for unix processes to be renamed for [ease of identification](./configure-zos-system.md#configure-address-space-job-naming) |

## ZWESIUSR

This is a started task ID used to run the PROCLIB `ZWESISTC` that launches the [cross memory server](./configure-xmem-server.md) (also known as ZIS).  It must have a valid OMVS segment.

## ZWEADMIN

This is a group that `ZWESVUSR` and `ZWESIUSR` should belong to.  It must have a valid OMVS segment.  

## <zowe_user>

If z/OSMF is being used for authentication and serving REST APIs for Zowe CLI and Zowe Explorer users, the TSO user ID for end users must belong to one or both of the groups `IZUUSER` or `IZUADMIN`

