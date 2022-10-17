# Configuring Sysplex for high availability

To deploy Zowe high availability, you must set up the Parallel Sysplex® environment. A Parallel Sysplex is a collection of z/OS® systems that cooperatively use certain hardware and software components to achieve a high-availability workload processing environment.

## Sysplex environment requirements

Zowe high availability instances require a Sysplex environment that consists of the following:

- One or more central processor complexes (CPCs) that can attach to a coupling facility
- At least one coupling facility
- At least one Sysplex timer
- Connection to shared DASD
- Shared SAF database, see [Sharing a database with sysplex communication in data sharing mode](https://www.ibm.com/docs/en/zos/2.1.0?topic=sd-sharing-database-sysplex-communication-in-data-sharing-mode)
- Sysplex Distributor with configured Dynamic VIPA TCP/IP address, see [Configuring Sysplex Distributor](#configuring-sysplex-distributor) for instructions
- VSAM record-level sharing (RLS), see [Preparing for VSAM record-level sharing](https://www.ibm.com/docs/en/zos/2.4.0?topic=sharing-preparing-vsam-record-level)
- USS Shared file system, see [How to share file systems in a Sysplex](https://www.ibm.com/docs/en/zos/2.4.0?topic=planning-sharing-file-systems-in-sysplex)
- JESPlex/JES2 Multi-Access Spool (MAS) environment
- z/OSMF high availability, see [Configuring z/OSMF high availability in Sysplex](systemrequirements-zosmf-ha.md)
- Node.js v12.x, v14.x (except v14.17.2), or v16.x

  **Note:** It is highly recommended that Node.js installed on a shared file system.

## Configuring Sysplex Distributor

The following example DVIPA configuration ensures the availability of Zowe in Hot-Standby mode. For example, suppose that you have a Sysplex of two z/OS systems: A, B.

1. Enable dynamic XCF on each host by adding the following TCP/IP definitions:
   - `IPCONFIG SYSPLEXROUTING DYNAMICXCF x.x.x.A 255.255.255.0 1` for SYSA
   - `IPCONFIG SYSPLEXROUTING DYNAMICXCF x.x.x.B 255.255.255.0 1` for SYSB

2. Define a DVIPA for both systems:

   ```
    VIPADYNAMIC                                                      
     VIPADEFINE  255.255.255.0 x.x.x.V
     VIPADISTRIBUTE DEFINE DISTM HOTSTANDBY x.x.x.V 
       PORT 7554 DESTIP
        x.x.x.A  PREFERRED 
        x.x.x.B  BACKUP                                         
    ENDVIPADYNAMIC
   ```

   where, 
   - x.x.x.A is the home address for SYSA.
   - x.x.x.B is the home address for SYSB.
   - x.x.x.V is Dynamic VIP Address.
   - 7554 is the port number of you Zowe API Mediation Layer Gateway. This should be the same port number you configured for `zowe.externalPort` in `zowe.yaml`. See [Zowe YAML configuration file reference](../appendix/zowe-yaml-configuration) to learn more about `zowe.yaml`.

The `VIPADISTRIBUTE` statement with `PREFERRED` and `BACKUP` settings is used to enable automatic dynamic VIPA takeover to occur, if needed.

All Zowe instances are bound to the DVIPA x.x.x.V. With both z/OS systems active in the Sysplex, the preferred Zowe instance, SYSA receives all new incoming requests.
If SYSA fails, new work requests to Zowe are routed to the server on SYSB. When SYSA resumes normal operations, new work requests for Zowe are routed to SYSA again.  This is the default behavior because the `AUTOSWITCHBACK` parameter of the `VIPADISTRIBUTE` statement is in effect by default.

If you do not want the distributor to switch back to the preferred target when it becomes available, you can specify the `NOAUTOSWITCHBACK` parameter for the `VIPADISTRIBUTE` statement.

```
VIPADYNAMIC                                                      
  VIPADEFINE  255.255.255.0 x.x.x.V
  VIPADISTRIBUTE DEFINE DISTM HOTSTANDBY NOAUTOSWITCHBACK x.x.x.V 
     PORT 7554 DESTIP
        x.x.x.A  PREFERRED 
        x.x.x.B  BACKUP                                         
ENDVIPADYNAMIC
```
