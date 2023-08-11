# Upgrade Zowe in High availability

As a systems programmer, you will need to upgrade Zowe regularly, to make sure you are using the latest features and to make sure you are using the latest security patches.

This article describes the requirements and procedure to perform an upgrade of a Zowe installation in high availability mode, avoiding downtime.

## Assumptions

The following are assumptions about the installation prior to starting the upgrade process. Other settings are supported with adapted instructions.

- Zowe is installed in a single shared zFS.
- Zowe is setup in high availability mode with a sysplex distributor and two instances (A and B)
- The upgraded instance will replace one of the existing instances (for the purposes of this procedure this will be instance B)
- Instance A and B runs Zowe 2.4.0 and the upgraded instance will run a newer minor version (i.e. 2.10.0)

## Restrictions

Upgrading an installation in high availability means that for a period of time, one or more instances will run at different maintainance levels. This possibility comes with a few restrictions:

- Only one API Catalog can be active at any moment
- HA Settings need to be the same across both installations
- Each intance has its own configuration file (e.g. `zowe.yaml` file) and the HA and security settings need to be kept in sync.

## Procedure

The following procedure to perform the upgrade in high availability mode is divided in two stages, first installing a new Zowe instance with the upgraded version and then the procedure to switch traffic without incurring downtime.

### New installation

1. Perform a separate installation of the new version of Zowe to be upgraded to, using convenience or SMP/E builds. Follow the instructions in <!-- TODO link to existing installation process --> to perform this installation

A separate installation of Zowe means datasets, STCs definitions and USS installation directory have to be different than the original installation.

2. Replace the following properties in instance B instalation's `zowe.yaml` configuration file, taking the values from the instance A's `zowe.yaml` file:

```yaml
externalDomains: <same external domain as instance A>

haInstances:
    A: <Same settings as original instance A>
    B: <Same settings as original instance B>
```

3. Choose which instance will run the UI services (API Catalog, Zowe Desktop), disable the mentioned components in the remaining instance:

```yaml
api-catalog:
    enabled: false

app-server:
    enabled: false
```

### Switching traffic

Switching traffic without incurring downtime involves disabling an application instance (quiescing) from the sysplex distributor's DVIPA, stopping this instance, and starting the new one. <!-- TODO: try what happens when the new instance finally starts, is it automatically resuming traffic? or does it wait for the manual resume command -->

**Note:** Only new connections can be routed to the right instance. A decision needs to be made on long-lived connections, such as long running requests and Web Socket sessions.

#### Required access

Running the `VARY` command requires `CONTROL` access to the `MVS.VARY.TCPIP.SYSPLEX` profile.
More information available in <https://www.ibm.com/docs/en/zos/2.5.0?topic=space-vary-tcpipsysplex>

#### Procedure

<!-- TODO link to existing IBM article about the VARY command, explicitly state which access is required in order to run such commands -->

Upgrading the instances without downtime requires quescing the instance that's going to be replaced in the sysplex distributor until the new instance is available.

Quiescing the Zowe instance: https://www.ibm.com/docs/en/zos/2.5.0?topic=distributor-manually-quiescing-dvipa-sysplex-server-applications
With VARY command: https://www.ibm.com/docs/en/zos/2.5.0?topic=space-vary-tcpipsysplex

During the quescing period, only one instance will be responding. An alternative for this is to set up the new instance as a third instance.

1. Quiesce the instance `B`, to avoid keep sending traffic to it.
2. Stop instance B.
3. Start new instance `C`, wait until it's up and responding. Verify services are replicated into this instance's Discovery Service.
4. Re-enable traffic to new instance `C`.

At this time, Zowe is running in High Availability balancing the traffic between an instance running in v2.4.0 and another one in 2.10.0

After testing is completed, the options are to switch to the new installation or perform a similar procedure of upgrading the instance `A` to the new version and keeping this one.
