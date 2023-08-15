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

## Upgrade with HA procedure

Use the following procedure to perform the upgrade in high availability mode.

1. Install a new Zowe instance with the upgraded version.
2. Switch traffic to the new instance to avoid downtime.

### New installation

1. Use one of the supported installation methods to perform a separate installation of the new version of Zowe. For more information, see the [Installation roadmap](../user-guide/install-zos.md).

    **Note:** When performing a separate installation of Zowe, ensure that datasets, STCs definitions, and the USS installation directory are distinct from the original installation.

2. Replace the following properties in instance B installation's `zowe.yaml` configuration file. Use the values from the instance A's `zowe.yaml` file:

```yaml
externalDomains: <same external domain as instance A>

haInstances:
    A: <Same settings as original instance A>
    B: <Same settings as original instance B>
```

3. Choose which instance will run the UI services (API Catalog, Zowe Desktop), and disable these mentioned components in the remaining instance:

```yaml
api-catalog:
    enabled: false

app-server:
    enabled: false
```

### Switching traffic

Switch traffic without incurring downtime with the following steps:

1. Disable an application instance (`QUIESCE`) from the DVIPA of the sysplex distributor.
2. Stop this original instance.
3. Start the new instance.
4. Resume traffic to the instance.

**Note:** Only new connections can be routed to the right instance. A decision needs to be made on long-lived connections, such as long running requests and Web Socket sessions, these can't be re-routed and will be closed when the instance is stopped.

#### Procedure

1. Verify access to running the `VARY` command. It requires `CONTROL` access to the `MVS.VARY.TCPIP.SYSPLEX` profile.
For more information, see the article _VARY TCPIP,,SYSPLEX_ in the IBM documentation.

2. Put instance B in quiescing mode by running the `VARY TCPIP` MVS command in the MVS console.

    Example:

    ```mvs
    VARY TCPIP,,SYSPLEX,QUIESCE,PORT=<api gateway port>
    ```

3. Stop instance B

4. Start upgraded instance

    **Note:** For more information about stopping and starting instances, see [Starting and stopping Zowe](../user-guide/start-zowe-zos.md)

5. Wait until instance B is up and synchronized with instance A (services are registered in all Discovery Services)

    - Access to API Gateway through the LPAR URL is possible.
    - Access to the Discovery Service homepage in both instance A and instance B to compare registered services.

6. Resume connections from Sysplex Distributor to instance B by running the `VARY TCPIP` MVS command in the MVS console.

    Example:

    ```mvs
    VARY TCPIP,,SYSPLEX,RESUME,PORT=<api gateway port>
    ```

Successfully completion of these steps enables Zowe to run in high availability, balancing traffic between instances running in different maintainance levels.

### Verification

Use the following steps to verify the Zowe is running correctly with the new configuration:

- Verify Discovery Services contain all the registered services from both instances.
- The API Gateway home page should show the number of instances running simultaneously.
