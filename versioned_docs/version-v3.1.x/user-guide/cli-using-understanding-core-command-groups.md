# Understanding core command groups

Zowe CLI contains command groups that focus on specific business processes.

Zowe CLI commands are organized in a hierarchical structure. Command groups contain actions that let you perform actions on specific objects. For each action that you perform on an object, you can specify options that affect the operation of the command.

For example, the `zos-files` command group can let you perform actions on data sets such as `create`, `edit`, `rename`, and more.

Review the following Zowe CLI command groups to understand the actions available to them.

## auth

The `auth` command group lets you connect to the Zowe API Mediation Layer authentication service and obtain a token, or disconnect from the authentication service and revoke the token.

:::note

For more information about `auth` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe auth -h
```

:::

## config

The `config` command group lets you manage project and global team configurations, and JSON projects; and convert profiles (service profiles and base profiles) to team configs.

:::note

For more information about `config` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe config -h
```

:::

## daemon

The `daemon` command groups let you perform operations that control the daemon-mode functionality of the Zowe CLI. Daemon-mode runs the CLI command processor as a background process to improve performance.

:::note

For more information about `daemon` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe daemon -h
```

:::

:::info Important

Using daemon mode contains various limitations and configuration requirements, depending on the operating system where the daemon is running. For more information, see **Preparing for installation** in [Using daemon mode](../user-guide/cli-using-using-daemon-mode.md).

:::

## plugins

The `plugins` command group lets you install and manage third-party
plug-ins for the product. Plug-ins extend the functionality of Zowe CLI in the form of new commands.

With the `plugins` command group, you can perform the following tasks:

* Install or uninstall third-party plug-ins.
* Display a list of installed plug-ins.
* Validate that a plug-in integrates with the base product properly.

:::note

For more information about `plugins` syntax, actions, and options, open Zowe CLI and issue the following
command:

```
zowe plugins -h
```
:::

## provisioning

The `provisioning` command group lets you perform IBM z/OSMF provisioning tasks with templates and provisioned instances from Zowe CLI.

With the `provisioning` command group, you can perform the following
tasks:

* Provision cloud instances using z/OSMF Software Services templates.
* List information about the available z/OSMF Service Catalog published templates and the templates that you used to publish cloud instances.
* List summary information about the templates that you used to provision cloud instances. You can filter the information by application (for example, DB2 and CICS) and by the external name of the provisioned instances.
* List detail information about the variables used (and their corresponding values) on named, published cloud instances.

:::note

For more information about `provisioning` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe provisioning -h
```

:::

## zos-console

The `zos-console` command group lets you issue commands to the z/OS console by establishing an extended Multiple Console Support (MCS) console.

With the `zos-console` command group, you can perform the following
tasks:

:::info Important

Before you issue z/OS console commands with Zowe CLI, security administrators should ensure that
they provide access to commands that are appropriate for your organization.

:::

* Issue commands to the z/OS console.
* Collect command responses and continue to collect solicited command responses on demand.

:::note

For more information about `zos-console` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe zos-console -h
```

:::

## zos-files

The `zos-files` command group lets you interact with data sets on z/OS systems.

With the `zos-files` command group, you can perform the following tasks:

* Create partitioned data sets (PDS) with members, physical sequential data sets (PS), and other types of data sets from templates. You can specify options to customize the data sets you create.
* Download mainframe data sets and edit them locally in your preferred Integrated Development Environment (IDE).
* Upload local files to mainframe data sets.
* List available mainframe data sets.
* Interact with VSAM data sets directly, or invoke Access Methods Services (IDCAMS) to work with VSAM data sets.

:::note

For more information about `zos-files` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe zos-files -h
```

:::

## zos-jobs

The `zos-jobs` command group lets you submit jobs and interact with jobs on z/OS systems.

With the `zos-jobs` command group, you can perform the following tasks:

* Submit jobs from JCL that reside on the mainframe or a local file.
* List jobs and spool files for a job.
* View the status of a job or view a spool file from a job.

:::note

For more information about `zos-jobs` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe zos-jobs -h
```

:::

## zos-logs

The `zos-logs` command group retrieves the z/OS operations logs.

With the `zos-logs` command group, you can perform the following task:

* List z/OS operations logs within a specified time frame.

:::note

For more information about `zos-logs` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe zos-logs -h
```

:::

## zos-ssh

The `zos-ssh` command group lets you issue Unix System Services shell commands by establishing an SSH connection to an SSH server. The zos-ssh command group was previously named `zos-uss`.

With the `zos-ssh` command group, you can perform the following task:

:::info Important

Before you issue z/OS UNIX System Services commands with Zowe CLI, security administrators must provide access for your user ID to login via SSH.

:::

* Issue z/OS UNIX System Services shell commands over an SSH connection and stream back the response.

:::note

For more information about `zos-ssh` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe zos-ssh -h
```

:::

## zos-tso

The `zos-tso` command group lets you issue TSO commands and interact with TSO address spaces on z/OS systems.

With the `zos-tso` command group, you can perform the following tasks:

* Execute REXX scripts
* Create a TSO address space and issue TSO commands to the address space.
* Review TSO command response data in Zowe CLI.

:::note

For more information about `zos-tso` syntax, actions, and options, open Zowe CLI and issue the following
command:

```
zowe zos-tso -h
```

:::

## zos-workflows

The `zos-workflows` command group lets you create and manage z/OSMF workflows on a z/OS system.

With the `zos-workflows` command group, you can perform the following tasks:

* Create or register a z/OSMF workflow based on the properties on a z/OS system.
* Start a z/OSMF workflow on a z/OS system.
* Delete or remove a z/OSMF workflow from a z/OS system.
* List the z/OSMF workflows for a system or sysplex.

:::note

For more information about `zos-workflows` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe zos-workflows -h
```

:::

## zosmf

The `zosmf` command group lets you work with Zowe CLI profiles and get general information about z/OSMF.

With the `zosmf` command group, you can perform the following tasks:

* Verify that your profiles are set up correctly to communicate with z/OSMF on your system. For more information, see [Testing connections to z/OSMF](../user-guide/_cli-using-test-zosmf-connection.md).
* Get information about the current z/OSMF version, host, port, and plug-ins installed on your system.

:::note

For more information about `zosmf` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe zosmf -h
```

:::
