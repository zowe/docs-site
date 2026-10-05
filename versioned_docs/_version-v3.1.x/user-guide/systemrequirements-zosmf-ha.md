# Configuring z/OSMF for high availability in Sysplex

z/OSMF high availability (HA) should be configured in Hot Standby mode to ensure availability of REST services. The goal of this configuration is to ensure that one z/OSMF server is always available to provide the REST services.

In Hot Standby mode, there is at least one backup (hot-standby) server and a preferred target server. Both targets are active, and both z/OSMF servers are bound to the DVIPA. The preferred z/OSMF server receives all new incoming requests. When the preferred z/OSMF server fails or the system becomes down, new requests are routed to the backup (hot-standby) server. The distributing DVIPA does not perform load balancing of requests across multiple systems. For more information, read the following articles in IBM Documentation:

- [Configuring z/OSMF for availability](https://www.ibm.com/docs/en/zos/2.2.0?topic=environment-configuring-zosmf-availability)
- [Configuring z/OSMF for high availability](https://www.ibm.com/docs/en/zos/2.4.0?topic=configurations-configuring-zosmf-high-availability)


## Sysplex environment requirements 

Before you begin, ensure that the Sysplex environment meets the following requirements for z/OSMF REST services:

- Shared SAF database. See [Sharing a database with sysplex communication in data sharing mode](https://www.ibm.com/docs/en/zos/2.1.0?topic=sd-sharing-database-sysplex-communication-in-data-sharing-mode) in IBM Documentation.
- USS Shared file system. See [How to share file systems in a Sysplex](https://www.ibm.com/docs/en/zos/2.4.0?topic=planning-sharing-file-systems-in-sysplex) in IBM Documentation.
- JESPlex/JES2 Multi-Access Spool (MAS) environment
- Sysplex distributor, configured Dynamic VIPA TCP/IP address
- Extended MCS console (EMCS)

## Setting up z/OSMF nucleus

**This information is intended for a first-time z/OSMF setup.** Follow these high-level steps to create a z/OSMF nucleus on your system. 

For detailed information about each step, see [Create a z/OSMF nucleus on your system](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.4.0/com.ibm.zos.v2r4.izua300/izulite_CreateTheNucleus.htm) in IBM Documentation.

1. Create the z/OSMF security authorizations by running the sample JCL **SYS1.SAMPLIB(IZUSEC)**. z/OSMF security authorizations will be used by all z/OSMF servers across multiple systems.

2. Create a shared file system per z/OSMF server by running the sample JCL **SYS1.SAMPLIB(IZUMKFS)**. It holds configuration settings and the persistence data.

3. Copy the Sample Parmlib Member **SYS1.SAMPLIB(IZUPRM00)** to PARMLIB and modify it according to [requirements of z/OSMF HA parmlib member in Sysplex](#requirements-of-zosmf-ha-parmlib-member-in-sysplex). Each system uses a different IZUPRMxx member. For example, IZUPRM0A and IZUPRM0B.

4. Copy the following z/OSMF procedures from **SYS1.PROCLIB** into your JES concatenation:
   - IZUSVR1  (Each z/OSMF server should use the different started procedure. For example, IZUSVRA and IZUSVRB.)
   - IZUANG1
   - IZUFPROC

5. Define different STARTED profiles for z/OSMF servers. 


### Requirements of z/OSMF HA parmlib member in Sysplex

- _AUTOSTART_GROUP_, more than one z/OSMF server (independent z/OSMF instances) is to be autostarted in a Sysplex. For instance, System A will autostart a server and similarly, System B will autostart the second z/OSMF server.
  
   z/OSMF has a default autostart group (IZUDFLT) which is used in monoplex or single z/OS image. To have more z/OSMF servers autostarted in a Sysplex, you must associate each server and the systems it serves with a unique autostart group name. For example, `AUTOSTART_GROUP('IZUDFLA')` for System A and `AUTOSTART_GROUP('IZUDFLB')` for System B

- _AUTOSTART(LOCAL)_ should be used by all z/OSMF instances.

- _HOSTNAME_, the DVIPA address will be used as the z/OSMF host name for all instances.

- _HTTP_SSL_PORT_, all servers are listening on the same port.

- _KEYRING_NAME_, all servers should use the same key ring such as `IZUKeyring.IZUDFLT`.

- _SERVER_PROC_, each z/OSMF server should use the different started procedure. For example, IZUSVRA and IZUSVRB.

- _ANGEL_PROC_, all z/OSMF servers can connect to the same z/OSMF angel process such as IZUANG1.

- _SAF_PREFIX_, they should use the same SAF profile prefix such as IZUDFLT.

- _USER_DIR_, each instance uses a shared file system with a unique mount point for each AUTOSTART group that be automatically started. For example, `/global/zosmf/zosmfa` and `/global/zosmf/zosmfb`.

## Configuring z/OSMF for high availability 

The following DVIPA configuration ensures the availability of z/OSMF for Hot-Standby. For example, suppose that you have a Sysplex of two z/OS systems: A, B.

1. Enable dynamic XCF on each host by adding the following TCP/IP definitions:
   - `IPCONFIG SYSPLEXROUTING DYNAMICXCF x.x.x.A 255.255.255.0 1` for SYSA
   - `IPCONFIG SYSPLEXROUTING DYNAMICXCF x.x.x.B 255.255.255.0 1` for SYSB

2. Define a dynamic VIPA (DVIPA) for both systems:
   ```
    VIPADYNAMIC                                                      
     VIPADEFINE  255.255.255.0 x.x.x.V
     VIPADISTRIBUTE DEFINE DISTM HOTSTANDBY x.x.x.V 
       PORT 443 DESTIP
        x.x.x.A  PREFERRED 
        x.x.x.B  BACKUP                                         
    ENDVIPADYNAMIC
   ```

   where, 
   - x.x.x.A is the home address for SYSA.
   - x.x.x.B is the home address for SYSB.
   - x.x.x.V is Dynamic VIP Address.

   ![](../images/zosmf/zOSMF-HA.png)

The `VIPADISTRIBUTE` statement with `PREFERRED` and `BACKUP` settings is used to enable automatic dynamic VIPA takeover to occur, if needed.

Both z/OSMF servers are bound to the DVIPA x.x.x.V. With both z/OS systems active in the Sysplex, the preferred z/OSMF server, SYSA receives all new incoming requests.
If SYSA fails, new work requests for z/OSMF are routed to the server on SYSB. When SYSA resumes normal operations, new work requests for z/OSMF are routed to SYSA again.  This is the default behavior because the `AUTOSWITCHBACK` parameter of the `VIPADISTRIBUTE` statement is in effect by default.

If you do not want the distributor to switch back to the preferred target when it becomes available, you can specify the `NOAUTOSWITCHBACK` parameter for the `VIPADISTRIBUTE` statement.
```
VIPADYNAMIC                                                      
  VIPADEFINE  255.255.255.0 x.x.x.V
  VIPADISTRIBUTE DEFINE DISTM HOTSTANDBY NOAUTOSWITCHBACK x.x.x.V 
     PORT 443 DESTIP
        x.x.x.A  PREFERRED 
        x.x.x.B  BACKUP                                         
ENDVIPADYNAMIC
```