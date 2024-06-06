# Initializing the z/OS system

After you install the Zowe runtime, you must initialize Zowe with proper security configurations and complete some configurations before you can start it. To do this, you run the `zwe init` command. This step is common for installing and configuring Zowe from either a convenience build or from an SMP/E build.

## About the `zwe init` command

The `zwe init` command is a combination of the following subcommands. Each subcommand defines a configuration. 

- **`mvs`**: Copy the data sets provided with Zowe to custom data sets.
- **`security`**: Create the user IDs and security manager settings.
- **`apfauth`**: APF authorize the LOADLIB containing the modules that need to perform z/OS privileged security calls. 
- **`certificate`**: Configure Zowe to use TLS certificates.
- **`vsam`**: Configure the VSAM files needed to run the Zowe caching service used for high availability (HA)
- **`stc`**: Configure the system to launch the Zowe started task.

You can type `zwe init --help` to learn more about the command or see the [`zwe init` command reference](../appendix/zwe_server_command_reference/zwe/init/zwe-init) for detailed explanation, examples, and parameters. 

`zwe init` command requires a [Zowe configuration file](installandconfig#zowe-configuration-file) to proceed. This configuration file instructs how Zowe should be initialized. You must create and review this file before proceeding. If you don't have the file already, you can copy from `example-zowe.yaml` located in the Zowe runtime directory.

:::tip
The following `zwe init` arguments might be useful:

- The `--update-config` argument allows the init process to update your configuration file based on automatic detection and your `zowe.setup` settings. For example, if `java.home` and `node.home` are not defined, they can be updated based on the information that is collected on the system. The `zowe.certificate` section can also be updated automatically based on your `zowe.setup.certificate` settings.
- The `--allow-overwrite` argument allows you to rerun the `zwe init` command repeatedly regardless of whether some data sets are already created.
- The `-v` or `--verbose` argument provides execution details of the `zwe` command. You can use it for troubleshooting purposes if the error message is not clear enough.
- The `-vv` or `--trace` argument provides you more execution details than the `--verbose` mode for troubleshooting purposes.
:::

## Procedure

To initialize the z/OS system and permissions that Zowe requires, run the following command. 

```
zwe init --config /path/to/zowe.yaml
```

## Next steps

The `zwe init` command runs the subcommands in sequence automatically. If you have successfully ran the above command, you can move on to [start Zowe](./start-zowe-zos.md).

You can choose to run the subcommands one by one to define each step based on your need, or if you encounter some failures with `zwe init` command, you can pick up the failed subcommands step specifically and rerun it.

1. [Prepare custom MVS data sets](initialize-mvs-datasets.md). Copy the data sets provided with Zowe to custom data sets.
1. [Initialize Zowe security configurations](initialize-security-configuration.md). Create the user IDs and security manager settings.

   If Zowe has already been launched on a z/OS system from a previous release of Zowe v2, you can skip this security configuration step unless told otherwise in the release documentation.

1. [APF authorize load libraries containing the modules that need to perform z/OS privileged security calls.](apf-authorize-load-library.md).
1. [Configure Zowe to use TLS certificates](configure-certificates-keystore.md).
1. (Required only if you are configuring Zowe for cross LPAR sysplex high availability): [Create the VSAM data sets used by the Zowe API Mediation Layer caching service](initialize-vsam-dataset.md). 
1. [Install Zowe main started tasks](install-stc-members.md).

To learn how to run the `zwe init` command step by step, type `zwe init <sub-command> --help`. For example, `zwe init stc --help`.

