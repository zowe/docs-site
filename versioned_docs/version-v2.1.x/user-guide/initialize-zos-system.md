# Initializing the z/OS system

After you install the Zowe runtime, you must initialize Zowe with proper security configurations, certificates, and so on before you can start it. To do this, you run the `zwe init` command. This step is common for installing and configuring Zowe from either a convenience build or from an SMP/E build.

## About the `zwe init` command

The `zwe init` command is a combination of the following sub-commands. Each sub-command defines a configuration. 

- **`mvs`**: Copy the data sets provided with Zowe to custom data sets.
- **`security`**: Create the user IDs and security manager settings.
- **`apfauth`**: APF authorize the LOADLIB containing the modules that need to perform z/OS priviledged security calls. 
- **`certificate`**: Configure Zowe to use TLS certificates.
- **`vsam`**: Configure the VSAM files needed to run the Zowe caching service used for high availability (HA)
- **`stc`**: Configure the system to launch the Zowe started task.

You can type `zwe init --help` to learn more about the command or see the [`zwe init` command reference](../appendix/zwe_server_command_reference/zwe/init/zwe-init) for detailed explanation, examples, and parameters. 

`zwe init` command requires a [Zowe configuration file](installandconfig#zowe-configuration-file) to proceed. This configuration file instructs how Zowe should be initialized. Please create and review this file before proceeding.

## Procedure

To initialize the z/OS system and permissions that Zowe requires, run the following command. 

```
zwe init --config /path/to/zowe.yaml
```

## Next steps

The `zwe init` command runs the sub-commands in sequence automatically. If you have successfully ran the above command, you can move on to [start Zowe](./start-zowe-zos.md).

You can choose to run the sub-commands one by one to define each step based on your need, or if you encounter some failures with `zwe init` command, you can pick up the failed sub-commands step specifically and re-run it.

1. [Prepare custom MVS data sets](initialize-mvs-datasets.md). Copy the data sets provided with Zowe to custom data sets.
1. [Initialize Zowe security configurations](initialize-security-configuration.md). Create the user IDs and security manager settings.

   If Zowe has already been launched on a z/OS system from a previous release of Zowe v2 you can skip this security configuration step unless told otherwise in the release documentation.

1. [APF authorize load libraries containing the modules that need to perform z/OS privileged security calls.](apf-authorize-load-library.md).
1. [Configure Zowe to use TLS certificates](configure-certificates-keystore.md).
1. (Required only if you are configuring Zowe for cross LPAR sysplex high availability): [Create the VSAM data sets used by the Zowe API Mediation Layer caching service](initialize-vsam-dataset.md). 
1. [Install Zowe main started tassks](install-stc-members.md).

To learn how to run the `zwe init` command step by step, type `zwe init <sub-command> --help`. For example, `zwe init stc --help`.

