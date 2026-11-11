# Verifying your Zowe CLI installation

Verify that Zowe CLI has been installed successfully by checking your connection to z/OSMF and accessing the in-product help.

:::info Required roles: systems administrator, devops architect
:::

:::note

Use these commands to validate connection to z/OSMF, not user credentials. To confirm credentials, issue any fully qualified command, such as `zowe zos-files list data-set <dataSetName> [options]`.

:::

## Testing connections to z/OSMF

Issue a command at any time to receive diagnostic information from the server and confirm that Zowe CLI can communicate with z/OSMF or other mainframe APIs.

Refer to the following sections for instructions on how to connect to z/OSMF with different types of profiles.

:::info Important

When z/OSMF receives a request via a Zowe CLI command, z/OSMF uses an SSL/TLS certificate to ensure a secure connection during the user session.

In the event that your z/OSMF instance does not have a SSL/TLS certificate registered with a Certificate Authority (CA), use the `--reject-unauthorized` (or `--ru`) `false` flag to the end of each command listed here to bypass this security check.

Determine the potential security risks. For the most secure environment, system administrators configure a server keyring with a server certificate signed by a CA. For more information, see [Working with certificates](../user-guide/cli-using-working-certificates.md).

:::

### Connecting to z/OSM without a profile

Follow these steps when you have installed Zowe CLI but have not yet created a configuration file, or the configuration file has an incomplete profile for z/OSMF.

1. Verify that your Zowe CLI instance can communicate with z/OSMF:

    ```
    zowe zosmf check status --host <host> --port <port> --user <username> --pass <password>
    ```

    - `<host>`

        Specifies the host.

    - `<port>`

        Specifies the port.

    - `<username>`

        Specifies the username.

    - `<password>`

        Specifies the password.

2. Verify that the installed z/OSMF services are plug-ins listed in the response.

    You have confirmed that Zowe CLI is connected to z/OSMF.

### Connecting to z/OSMF with a default profile

Follow these steps when you have created a default profile in a configuration file (such as a [global team config](../user-guide/cli-using-initializing-team-configuration/)):

1. Verify the default profile can communicate with z/OSMF:

    ```
    zowe zosmf check status
    ```

2. Check that the installed z/OSMF services and plug-ins are listed in the response.

    You have confirmed that Zowe CLI is connected to z/OSMF.

### Connecting to z/OSM with a specific profile

Follow these steps when you have created a custom profile in a configuration (such as a [global team configuration file](../user-guide/cli-using-initializing-team-configuration/)).

1. Verify that you can use that specific profile to communicate with z/OSMF:

    ```
    zowe zosmf check status --zosmf-profile <profile_name>
    ```

    - `<profile name>`

        Specifies the name of the custom profile.

2. Check that the installed z/OSMF services and plug-ins are listed in the response.

    You have confirmed that Zowe CLI is connected to z/OSMF.

### Troubleshooting Zowe CLI connection

The preceding commands return a success or failure message and display information about your z/OSMF server, such as the z/OSMF version number. Report failures to your systems administrator and use the response information for diagnostic purposes.

## Accessing Zowe CLI help

The in-product help is used as a reference of all the commands and plug-ins that are installed on the computer. If any part of the installation corrupts during installation, the help does not display.

### Viewing top level Zowe CLI help

1. To view top-level help:

    ```
    zowe --help
    ```

    Alternatively, to display a full list of all available commands:

    ```
    zowe --available-commands
    ```

2. Verify that the help content displays and includes installed plug-ins.

    You have confirmed that you successfully installed Zowe CLI.
