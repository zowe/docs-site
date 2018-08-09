# Using Zowe CLI

This section contains the following articles about using Zowe CLI.

## Displaying Zowe CLI help
Zowe CLI contains a help system that is embedded directly into the command-line interface. When you want help with Zowe CLI, you issue help commands that provide you with information about the product, syntax, and usage.

### Displaying top-level help
To begin using the product, open a command line window and issue the following command to view the top-level help descriptions:

```
zowe --help
```
**Tip:** The command `zowe` initiates the product on a command line. All Zowe CLI commands begin with `zowe.`

### Help structure
The help displays the following types of information:

- **Description:** An explanation of the functionality for the command group, action, or option that you specified in a `--help` command.

-  **Usage:** The syntax for the command. Refer to usage to determine the expected hierarchical structure of a command.    

- **Options:** Flags that you can append to the end of a command to specify particular values or booleans. For example, the volume size for a data set that you want to create.    

- **Global Options:** Flags that you can append to any command in Zowe CLI. For example, the `--help` flag is a global option. 

### Displaying command group, action, and object help
You can use the `--help` global option get more information about a specific command group, action, or object. Use the following syntax to display group-level help and learn more about specific command groups (for example, *zos-jobs* and *zos-files*):

```
zowe <group, action, or object name> --help
```
```
zowe zos-files create --help
```


## Zowe CLI command groups
Zowe CLI contains command groups that focus on specific business processes. For example, the `zos-files` command group
provides the ability to interact with mainframe data sets. This article provides you with a brief synopsis of the tasks that you can perform with each group. For more information, see [Display Zowe CLI Help](#displaying-zowe-cli-help). 

The commands available in the product are organized in a hierarchical structure. Command groups (for example, `zos-files`) contain actions (for example, `create`) that let you perform actions on specific objects (for example, a specific type of data set). For each action that you perform on an object, you can specify options that affect the operation of the command.

**Important\!** Before you issue these commands, verify that you
completed the steps in [Create a Zowe CLI profile](cli-installcli.md#creating-a-zowe-cli-profile) and [Test Connection to z/OSMF](cli-installcli.md#testing-zowe-cli-connection-to-zosmf) to help ensure that Zowe CLI can communicate with z/OS systems.

Zowe CLI contains the following command groups:

### plugins

The plugins command group lets you install and manage third-party
plug-ins for the product. Plug-ins extend the functionality of Zowe CLI in the form of new commands. 

With the plugins command group, you can perform the following tasks:

- Install or uninstall third-party plug-ins. 
- Display a list of installed plug-ins. 
- Validate that a plug-in integrates with the base product
properly. 

**Note:** For more information about `plugins` syntax, actions, and options, open Zowe CLI and issue the following
command:

```
zowe plugins -h
```

### profiles
The profiles command group lets you create and manage profiles for use with other Zowe CLI command groups. Profiles allow you to issue commands to different mainframe systems quickly, without specifying your connection details with every command.

With the profiles command group, you can perform the following tasks:

- Create, update, and delete profiles for any Zowe CLI command group that supports profiles.
- Set the default profile to be used within any command group.
- List profile names and details for any command group, including the default active profile.

**Note:** For more information about `profiles` syntax, actions, and options, open Zowe CLI, and issue the following command:
```
zowe profiles -h
```
### provisioning

The provisioning command group lets you perform IBM z/OSMF provisioning tasks with templates and provisioned instances from Zowe CLI.

With the provisioning command group, you can perform the following
tasks:

- Provision cloud instances using z/OSMF Software Services templates.
- List information about the available z/OSMF Service Catalog published templates and the templates that you used to publish cloud instances.
- List summary information about the templates that you used to provision cloud instances. You can filter the information by
application (for example, DB2 and CICS) and by the external name of the provisioned instances.
- List detail information about the variables used (and their corresponding values) on named, published cloud instances.

**Note:** For more information about provisioning syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe provisioning -h
```

### zos-console

The zos-console command group lets you issue commands to the z/OS console by establishing an extended Multiple Console Support (MCS) console.

With the zos-console command group, you can perform the following
tasks:
**Important\!** Before you issue z/OS console commands with Zowe CLI, security administrators should ensure that
they provide access to commands that are appropriate for your
organization.
- Issue commands to the z/OS console.
- Collect command responses and continue to collect solicited command responses on-demand.

**Note:** For more information about `zos-console` syntax, actions, and options, open Zowe CLI and issue the following command:
```
zowe zos-console -h
```
### zos-files

The zos-files command group lets you interact with data sets on z/OS systems.

With the zos-files command group, you can perform the following tasks:

- Create partitioned data sets (PDS) with members, physical sequential data sets (PS), and other types of data sets from templates. You can specify options to customize the data sets you create.
- Download mainframe data sets and edit them locally in your preferred Integrated Development Environment (IDE).
- Upload local files to mainframe data sets.
- List available mainframe data sets.
- Interact with VSAM data sets directly, or invoke Access Methods Services (IDCAMS) to work with VSAM data sets.

**Note:** For more information about `zos-console` syntax, actions, and options, open Zowe CLI and issue the following command:
```
zowe zos-files -h
```
### zos-jobs

The zos-jobs command group lets you submit jobs and interact with jobs on z/OS systems.

With the zos-jobs command group, you can perform the following tasks:

- Submit jobs from JCL that resides on the mainframe or a local file.
- List jobs and spool files for a job.
- View the status of a job or view a spool file from a job. 

**Note:** For more information about `zos-jobs` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe zos-jobs -h
```

### zos-tso

The zos-tso command group lets you issue TSO commands and interact with TSO address spaces on z/OS systems.

With the zos-tso command group, you can perform the following tasks:

- Excecute REXX scripts
- Create a TSO address space and issue TSO commands to the address space.
- Review TSO command response data in Zowe CLI.

**Note:** For more information about `zos-tso` syntax, actions, and options, open Zowe CLI and issue the following
command:
```
zowe zos-tso -h
```
### zosmf

The zosmf command group lets you work with Zowe CLI profiles and get general information about z/OSMF.

With the zosmf command group, you can perform the following tasks:

- Create and manage your Zowe CLI zosmf profiles. You must have at least one zosmf profile to issue most commands. Issue the `zowe help explain profiles` command in Zowe CLI to learn more about using profiles.
- Verify that your profiles are set up correctly to communicate with z/OSMF on your system. For more information, see [Test Connection to z/OSMF](cli-installcli.md#testing-zowe-cli-connection-to-zosmf).
- Get information about the current z/OSMF version, host, port, and plug-ins installed on your system.

**Note:** For more information about `zosmf` syntax, actions, and
options, open Zowe CLI and issue the following command:
```
zowe zosmf -h
```
