# Upgrade Zowe in high availability

As a systems programmer, it is necessary to upgrade Zowe regularly to ensure that you are using the latest features and  the latest security patches.

This article describes the requirements and procedure to perform an upgrade of a Zowe installation in high availability mode to a newer minor version with zero downtime.

## Assumptions

Review the following assumptions about the installation before starting the upgrade process. Other settings are supported with adapted instructions.

- Zowe is installed in a single shared zFS.
- Zowe is configured in high availability mode with a sysplex distributor and two instances (A and B).
- The upgraded instance will replace one of the existing instances. (For the purposes of this procedure the replaced instance is instance B.)
- Instances A and B run the same Zowe version.

## Requirements

When upgrading an installation in high availability, one or more instances run at different maintainance levels. As such, a few restrictions apply:

- Only one API Catalog can be active at any moment.
- HA settings are the same across both installations.
- Each intance has its own configuration file (e.g. `zowe.yaml` file), and the HA and security settings are synchronized.
- Onboarded services must be also in high availability mode.

## Steps

Use the following procedure to perform the upgrade in high availability mode.

1. Install a new Zowe instance with the upgraded version.
2. Switch traffic to the new instance to avoid downtime.

### New installation

1. Use one of the supported installation methods to perform a separate installation of the new version of Zowe. For more information, see the [Installation roadmap](../user-guide/install-zos.md).

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

1. Put instance B in quiescing mode

Example:

```mvs
VARY TCPIP,,SYSPLEX,QUIESCE,PORT=<port>
```

2. Stop instance B
   
3. Start upgraded instance
   
4. Wait until instance B is up and synchronized with instance A (services are registered in all Discovery Services)

5. Resume instance B

Example:

```mvs
VARY TCPIP,,SYSPLEX,RESUME,PORT=<port>
```

At this time, Zowe is running in high availability balancing the traffic between instances running in different maintainance levels.

### Verification

Verifying if Zowe is running correctly with the new configuration involves the following steps:

- Verify Discovery Services contain all the registered services from both instances.
- API Gateway home page should show the number of instances running simultaneously.
- Depending on the DVIPA configuration, accessing the API Gateway home page should interchangeably show both versions.
