# Upgrade Zowe server-side components in high availability

As a systems programmer, it is necessary to upgrade Zowe server-side components regularly to ensure that you are using the latest features and  the latest security patches.

This article describes the requirements and procedure to perform an upgrade of a Zowe server-side components installation in high availability mode to a newer minor version with zero downtime.

## Installation assumptions

Review the following assumptions about the installation before you start the upgrade process. Other settings are supported with adapted instructions.

- Zowe is installed in a single shared zFS.
- Zowe is configured in high availability mode with a sysplex distributor and two instances (A and B).
- The upgraded instance is intended to replace one of the existing instances. (For the purposes of this procedure the replaced instance is instance B.)
- Instances A and B run the same Zowe version.

## Limitations

There is a known limitation with balancing traffic between different versions of the UI components, in particular regarding the API Catalog.
Only one API Catalog instance can be active in an installation with multiple maintainance levels.

## Pre-requisites before installation upgrade with HA

When upgrading an installation in high availability mode, one or more instances run at different maintainance levels. As such, a few restrictions apply:

- HA settings are the same across both installations.
- Each instance has its own configuration file (e.g. `zowe.yaml` file), and the HA and security settings are synchronized.
- Onboarded services must also be in high availability mode.

## Upgrading installation with HA

Upgrading installation to use high availability mode involves two general steps:

1. Install a new Zowe instance with the upgraded version.
2. Switch traffic to the new instance to avoid downtime.

### Installing a new Zowe instance

Use the following procedure to install a new Zowe instance:

1. Use one of the supported installation methods to perform a separate installation of the new version of Zowe. For more information about supported installation methods, see the [Installation roadmap](../install-zos.md).

    **Note:** When performing a separate installation of Zowe, ensure that datasets, STCs definitions, and the USS installation directory are distinct from the original installation.

2. Replicate the configuration of instance A into instance B.

    The settings across both instances must be the same, except for properties pointing to datasets and z/OS USS filesystems which are now separated.

    Ensure that the following properties are different between instances:

    ```yaml
    zowe.setup.datasets
    zowe.setup.security
    zowe.runtimeDirectory
    zowe.logDirectory
    zowe.workspaceDirectory
    zowe.job
    ```

3. Choose which instance you intend to run the UI services (API Catalog, Zowe Desktop), and disable these mentioned components in the other instance:

    ```yaml
    api-catalog:
        enabled: false

    app-server:
        enabled: false
    ```

You configured your installation for the two instances.

### Switching traffic

Switching traffic without incurring downtime involves the following general steps. Details of these steps are described later in this section.

1. Disable an application instance (`QUIESCE`) from the DVIPA of the sysplex distributor.
2. Stop this original instance.
3. Start the new instance.
4. Verify service replication.
5. Resume traffic to the instance.

**Note:** Only new connections can be re-routed to avoid the instance shutting down. A decision needs to be made on long-lived connections, such as long running requests and Web Socket sessions. These connections cannot be re-routed. As such, these connections are closed when the instance is stopped.

1. Verify access by running the `VARY` command. `CONTROL` access to the `MVS.VARY.TCPIP.SYSPLEX` profile is required.
For more information, see the article _VARY TCPIP,,SYSPLEX_ in the IBM documentation.

2. In the MVS console, run the `VARY TCPIP` MVS command to place instance B in quiescing mode.

    **Example:**

    ```mvs
    VARY TCPIP,,SYSPLEX,QUIESCE,PORT=<api gateway port>
    ```

3. Stop instance B.

4. Start the upgraded instance.

    **Note:** For more information about stopping and starting instances, see [Starting and stopping Zowe](./../start-zowe-zos.md).

5. Wait until instance B is up and synchronized with instance A, wherein services are registered in all Discovery Services. To verify that instance B is up and sychronized with instance A, check the following accessibility conditions:

    - Access to API Gateway through the LPAR URL is possible.
    - Access to the Discovery Service homepage in both instance A and instance B to compare registered services.

6. Resume connections from Sysplex Distributor to instance B by running the `VARY TCPIP` MVS command in the MVS console.

    **Example:**

    ```mvs
    VARY TCPIP,,SYSPLEX,RESUME,PORT=<api gateway port>
    ```

Successful completion of these steps enables Zowe to run in high availability mode, whereby traffic is balanced between instances running in different maintainance levels.

### Verifying the new connection

Use the following checks to verify Zowe is running correctly with the new configuration:

- Verify that Discovery Services contain all of the registered services from both instances.
- Check that the API Gateway home page shows the number of instances running simultaneously.
