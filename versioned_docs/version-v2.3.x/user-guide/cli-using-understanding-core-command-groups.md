# Understanding core command groups

Zowe CLI contains command groups that focus on specific business processes. For example, the `zos-files` command group lets you interact with mainframe data sets. This article provides a brief synopsis of the tasks that you can perform with each group. For more information, see [Displaying help](../user-guide/cli-using-displaying-help.md).

The commands available in the product are organized in a hierarchical structure. Command groups (for example, `zos-files`) contain actions (for example, `create`) that let you perform actions on specific objects (for example, a specific type of data set). For each action that you perform on an object, you can specify options that affect the operation of the command.
Zowe CLI contains the following command groups:

## auth

The auth command group lets you connect to Zowe API Mediation Layer authentication service and obtain a token, or disconnect from the authentication service and revoke the token.

**Note:** For more information about `auth` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe auth -h
```
## config

The config command group lets you manage JSON projects, global configuration, and convert profiles (service profiles and base profiles) to team profiles.

**Note:** For more information about `config` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe config -h
```
## daemon

The daemon command groups let you perform operations that control the daemon-mode functionality of the Zowe CLI. Daemon-mode runs the CLI command processor as a daemon to improve performance.

**Note:** For more information about `daemon` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe daemon -h
```

**Important!** Using daemon mode contains various limitations and configuration requirements, depending on the operating system where the daemon is running. For more information, see **Preparing for installation** in [Using daemon mode](../user-guide/cli-using-using-daemon-mode.md).

## plugins

The plugins command group lets you install and manage third-party
plug-ins for the product. Plug-ins extend the functionality of Zowe CLI in the form of new commands.
With the plugins command group, you can perform the following tasks:

* Install or uninstall third-party plug-ins.
* Display a list of installed plug-ins.
* Validate that a plug-in integrates with the base product
properly.

**Note:** For more information about `plugins` syntax, actions, and options, open Zowe CLI and issue the following
command:

```
zowe plugins -h
```

## profiles

The profiles command group lets you create and manage profiles for use with other Zowe CLI command groups. Profiles allow you to issue commands to different mainframe systems quickly, without specifying your connection details with every command.
With the profiles command group, you can perform the following tasks:

* Create, update, and delete profiles for any Zowe CLI command group that supports profiles.
* Set the default profile to be used within any command group.
* List profile names and details for any command group, including the default active profile.

**Note:** For more information about `profiles` syntax, actions, and options, open Zowe CLI, and issue the following command:

```
zowe profiles -h
```

## provisioning

The provisioning command group lets you perform IBM z/OSMF provisioning tasks with templates and provisioned instances from Zowe CLI.

With the provisioning command group, you can perform the following
tasks:

* Provision cloud instances using z/OSMF Software Services templates.
* List information about the available z/OSMF Service Catalog published templates and the templates that you used to publish cloud instances.
* List summary information about the templates that you used to provision cloud instances. You can filter the information by application (for example, DB2 and CICS) and by the external name of the provisioned instances.
* List detail information about the variables used (and their corresponding values) on named, published cloud instances.

**Note:** For more information about `provisioning` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe provisioning -h
```

## zos-console

The zos-console command group lets you issue commands to the z/OS console by establishing an extended Multiple Console Support (MCS) console.

With the zos-console command group, you can perform the following
tasks:

**Important\!** Before you issue z/OS console commands with Zowe CLI, security administrators should ensure that
they provide access to commands that are appropriate for your
organization.

* Issue commands to the z/OS console.
* Collect command responses and continue to collect solicited command responses on-demand.

**Note:** For more information about `zos-console` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe zos-console -h
```

## zos-files

The zos-files command group lets you interact with data sets on z/OS systems.

With the zos-files command group, you can perform the following tasks:

* Create partitioned data sets (PDS) with members, physical sequential data sets (PS), and other types of data sets from templates. You can specify options to customize the data sets you create.
* Download mainframe data sets and edit them locally in your preferred Integrated Development Environment (IDE).
* Upload local files to mainframe data sets.
* List available mainframe data sets.
* Interact with VSAM data sets directly, or invoke Access Methods Services (IDCAMS) to work with VSAM data sets.

**Note:** For more information about `zos-files` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe zos-files -h
```
## zos-jobs

The zos-jobs command group lets you submit jobs and interact with jobs on z/OS systems.

With the zos-jobs command group, you can perform the following tasks:

* Submit jobs from JCL that resides on the mainframe or a local file.
* List jobs and spool files for a job.
* View the status of a job or view a spool file from a job.

**Note:** For more information about `zos-jobs` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe zos-jobs -h
```

## zos-ssh

The zos-ssh command group lets you issue Unix System Services shell commands by establishing an SSH connection to an SSH server. The zos-ssh command group was previously named `zos-uss`. 

With the zos-uss command group, you can perform the following task:

**Important\!** Before you issue z/OS UNIX System Services commands with Zowe CLI, security administrators must provide access for your user ID to login via SSH.
* Issue z/OS UNIX System Services shell commands over an SSH connection and stream back the response.

**Note:** For more information about `zos-ssh` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe zos-ssh -h
```

## zos-workflows

The zos-workflows command group lets you create and manage z/OSMF workflows on a z/OS system.

With the zos-workflows command group, you can perform the following tasks:

* Create or register a z/OSMF workflow based on the properties on a z/OS system
* Start a z/OSMF workflow on a z/OS system.
* Delete or remove a z/OSMF workflow from a z/OS system.
* List the z/OSMF workflows for a system or sysplex.

**Note:** For more information about `zos-workflows` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe zos-workflows -h
```

## zos-tso

The zos-tso command group lets you issue TSO commands and interact with TSO address spaces on z/OS systems.

With the zos-tso command group, you can perform the following tasks:

* Execute REXX scripts
* Create a TSO address space and issue TSO commands to the address space.
* Review TSO command response data in Zowe CLI.

**Note:** For more information about `zos-tso` syntax, actions, and options, open Zowe CLI and issue the following
command:

```
zowe zos-tso -h
```

## zosmf

The zosmf command group lets you work with Zowe CLI profiles and get general information about z/OSMF.

With the zosmf command group, you can perform the following tasks:

* Create and manage your Zowe CLI `zosmf` profiles. Profiles let you store configuration information for use on multiple commands. You can create a profile that contains your username, password, and connection details for a particular mainframe system, then reuse that profile to avoid typing it again on every command. You can switch between profiles to quickly target different mainframe subsystems. For more information, see [Using profiles](cli-using-using-profiles).
* Verify that your profiles are set up correctly to communicate with z/OSMF on your system. For more information, see [Test Connection to z/OSMF](cli-using-using-profiles#testing-connection-to-zosmf).
* Get information about the current z/OSMF version, host, port, and plug-ins installed on your system.

**Note:** For more information about `zosmf` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe zosmf -h
```
