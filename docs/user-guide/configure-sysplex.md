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
- USS Shared file system, see [How to share file systems in a Sysplex](https://www.ibm.com/docs/en/zos/2.4.0?topic=planning-sharing-file-systems-in-sysplex)
- JESPlex/JES2 Multi-Access Spool (MAS) environment
- z/OSMF high availability, see [Configuring z/OSMF high availability in Sysplex](systemrequirements-zosmf-ha.md)
- Node.js v16.x or higher, required in case you enable Zowe Desktop

:::note
It is highly recommended that Node.js is installed on a shared file system.
:::

## Configuring Sysplex Distributor

The following example DVIPA configuration ensures the availability of Zowe in Hot-Standby mode. For example, suppose that you have a Sysplex of two z/OS systems: A, B.

1. Enable dynamic XCF on each host by adding the following TCP/IP definitions:
   - `IPCONFIG SYSPLEXROUTING DYNAMICXCF x.x.x.A 255.255.255.0 1` for SYSA
   - `IPCONFIG SYSPLEXROUTING DYNAMICXCF x.x.x.B 255.255.255.0 1` for SYSB

2. Define a DVIPA for both systems:

   ```plaintext
    VIPADYNAMIC                                                      
     VIPADEFINE  255.255.255.0 x.x.x.V
     VIPADISTRIBUTE DEFINE DISTM HOTSTANDBY x.x.x.V 
       PORT 7554 DESTIP
        x.x.x.A  PREFERRED 
        x.x.x.B  BACKUP                                         
    ENDVIPADYNAMIC
   ```

   where, 
   - **x.x.x.A**  
   Specifies the home address for SYSA.

   - **x.x.x.B**  
   Specifies the home address for SYSB.

   - **x.x.x.V**  
   Specifies the Dynamic VIP Address.

   - **7554**  
   Specifies the port number of you Zowe API Mediation Layer Gateway. This should be the same port number you configured for `zowe.externalPort` in `zowe.yaml`. See [Zowe YAML configuration file reference](../appendix/zowe-yaml-configuration.md) to learn more about `zowe.yaml`.

The `VIPADISTRIBUTE` statement with `PREFERRED` and `BACKUP` settings is used to enable automatic dynamic VIPA takeover to occur, if needed.

All Zowe instances are bound to the DVIPA x.x.x.V. With both z/OS systems active in the Sysplex, the preferred Zowe instance, SYSA receives all new incoming requests.
If SYSA fails, new work requests to Zowe are routed to the server on SYSB. When SYSA resumes normal operations, new work requests for Zowe are routed to SYSA again.  This is the default behavior because the `AUTOSWITCHBACK` parameter of the `VIPADISTRIBUTE` statement is in effect by default.

If you do not want the distributor to switch back to the preferred target when it becomes available, you can specify the `NOAUTOSWITCHBACK` parameter for the `VIPADISTRIBUTE` statement.

```plaintext
VIPADYNAMIC                                                      
  VIPADEFINE  255.255.255.0 x.x.x.V
  VIPADISTRIBUTE DEFINE DISTM HOTSTANDBY NOAUTOSWITCHBACK x.x.x.V 
     PORT 7554 DESTIP
        x.x.x.A  PREFERRED 
        x.x.x.B  BACKUP                                         
ENDVIPADYNAMIC
```

## Configuring API ML for DVIPA hot-standby

In a DVIPA hot-standby setup, all API ML Gateway instances in the Sysplex must listen on the same DVIPA address and port (so the Sysplex Distributor can route traffic to whichever LPAR is active). However, each instance must register with Eureka Discovery using a **unique, LPAR-specific address** so that all instances are independently discoverable.

To support this, API ML introduces a new configuration property `apiml.service.advertisedIpAddress` that decouples the listen (bind) address from the Eureka-advertised address:

| Property | Purpose |
|---|---|
| `apiml.service.ipAddress` | The network interface the server **binds to** for listening. In DVIPA hot-standby, this should be the DVIPA address. |
| `apiml.service.advertisedIpAddress` | The IP address **advertised to Eureka Discovery**. In DVIPA hot-standby, this should be the LPAR-specific home address. |

### Fallback behavior

When `advertisedIpAddress` is not explicitly set, the system falls back in this order:

1. `apiml.service.advertisedIpAddress` (if set, used as the Eureka-advertised address)
2. `apiml.service.ipAddress` (fallback — preserves backward compatibility)
3. `apiml.service.hostname` resolution (final fallback)

This means **existing non-HA configurations continue to work without any changes** — the system behaves identically to previous versions when `advertisedIpAddress` is not set.

### DVIPA hot-standby configuration example

Suppose you have two LPARs in a Sysplex with these addresses:

- **DVIPA:** `192.168.100.50` (shared, routes to the active Gateway)
- **LPAR A home address:** `192.168.10.1`
- **LPAR B home address:** `192.168.20.1`

Configure the Zowe YAML for each LPAR as follows:

**LPAR A (`zowe.yaml`):**
```yaml
haInstances:
  lparA:
    hostname: SYS1
    components:
      gateway:
        apiml:
          service:
            ipAddress: 192.168.100.50
            advertisedIpAddress: 192.168.10.1
        port: 7554
      discovery:
        apiml:
          service:
            ipAddress: 192.168.100.50
            advertisedIpAddress: 192.168.10.1
```

**LPAR B (`zowe.yaml`):**
```yaml
haInstances:
  lparB:
    hostname: SYS2
    components:
      gateway:
        apiml:
          service:
            ipAddress: 192.168.100.50
            advertisedIpAddress: 192.168.20.1
        port: 7554
      discovery:
        apiml:
          service:
            ipAddress: 192.168.100.50
            advertisedIpAddress: 192.168.20.1
```

**Key points:**
- `apiml.service.ipAddress` is set to the same DVIPA (`192.168.100.50`) on both LPARs — the Tomcat server binds to the DVIPA.
- `apiml.service.advertisedIpAddress` is set to each LPAR's **unique home address** (`192.168.10.1` for LPAR A, `192.168.20.1` for LPAR B) — Eureka receives distinct addresses and can track each instance independently.
- The port must match the port configured in the Sysplex Distributor (`7554` in this example).

### Verification

After starting Zowe on both LPARs, verify that both Gateway instances are registered in Eureka Discovery:

1. Open the Eureka Discovery dashboard at `https://<hostname>:<discovery-port>`.
2. Under **Instances currently registered with Eureka**, look for `GATEWAY` in the Application column.
3. You should see two Gateway instances listed with distinct instance IDs (e.g., `SYS1:gateway:7554` and `SYS2:gateway:7554`), confirming that both instances have successfully registered despite sharing the same DVIPA listen address.

### Zowe YAML configuration paths

The `advertisedIpAddress` property can be set per component at these YAML paths:

| Component | YAML path |
|---|---|
| Gateway | `components.gateway.apiml.service.advertisedIpAddress` |
| Discovery Service | `components.discovery.apiml.service.advertisedIpAddress` |
| API Catalog | `components.catalog.apiml.service.advertisedIpAddress` |
| ZAAS | `components.zaas.apiml.service.advertisedIpAddress` |
| Caching Service | `components.caching-service.apiml.service.advertisedIpAddress` |

For HA deployments, set these under the appropriate `haInstances.<instance>.components.<service>.apiml.service.advertisedIpAddress` path.
