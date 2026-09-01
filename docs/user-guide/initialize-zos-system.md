# Configuring Zowe with `zwe init`

Once you complete the installation of the Zowe runtime, begin configuration by initializing Zowe with proper security configurations. To simplify this configuration process, one option is to run the `zwe init` command. This step is common for installing and configuring Zowe from either a convenience build or from an SMP/E build.

:::info Required roles: system programmer, security administrator
:::

## About the `zwe init` command
 Each subcommand defines a configuration.
The `zwe init` command is a combination of the following subcommands. Except the generate, each subcommand defines a configuration.
- (Optional) **generate**
Used when [configuring with JCL is enabled](./configuring-zowe-via-jcl.md#getting-started-with-zwe-and-jcl). Generates ready to execute JCL samples from YAML configuration values.
- **mvs**
Copies the data sets provided with Zowe to custom data sets.
- (Deprecated) **vsam**
Configures the VSAM files needed if the Caching service is set to VSAM mode. This is not required nor the default, and exists for compatibility.
- **apfauth**
APF authorizes the LOADLIB containing the modules that need to perform z/OS privileged security calls.
- **security**
Creates the user IDs and security manager settings.
- **certificate**
Configures Zowe to use TLS certificates.
- **stc**
Configures the system to launch the Zowe started task.

:::info Recommendation:
We recommend you to run these sub commands one by one to clearly see the output of each step, and submit them in the order given above. To successfully run `zwe init security`, `zwe init apfauth`, and `zwe init certificate`, it is likely that your organization requires elevated permissions. We recommend you consult with your security administrator to run these commands. For more information about tasks for the security administrator, and details about the `zwe init security` command, see the section [Configuring security](./configuring-security.md) in this configuration documentation

:::

:::tip
Enter `zwe init --help` to learn more about the command or see the [`zwe init` command reference](../appendix/zwe_server_command_reference/zwe/init/zwe-init-vsam.md) for detailed explanation, examples, and parameters.
:::

## Zowe initialization command

The `zwe init` command runs the subcommands in sequence automatically. If you have the Zowe configuration file prepared and have security administrator privileges, or security and certificates setup was already completed on the system, you can run the following command:

```
zwe init --config /path/to/zowe.yaml
```

:::note
For more information about the individual `zwe init` subcommands, see [zwe init subcommand overview](./zwe-init-subcommand-overview.md).
:::

:::caution Validate successful initialization
Output from the execution of this command indicates the command ran successfully. However, to determine if each of the subcommands ran successfully, check the full output log. Failed execution of some subcommands may be the result of insufficient user permissions. Consult with your security administrator to find out if elevated permissions are required to successfully execute some of the `zwe init` subcommands.

For more information about security administrator tasks, see:
* [Addressing security requirements](./address-security-requirements.md)
* [Configuring security](./configuring-security.md)
* [Configuring certificates](./configure-certificates.md)
:::

## Next steps

For detailed information about individual `zwe init` subcommands, see [zwe init subcommand overview](./zwe-init-subcommand-overview.md).
