# Zowe CLI quick start

Get started with Zowe&trade; CLI quickly and easily.

This article presumes that your role is that of a systems administrator or you possess prerequisite knowledge of command-line tools and writing scripts. If you prefer more detailed instructions, see [Installing Zowe CLI](../user-guide/cli-installcli.md).

## Installing

The following topics describe the Zowe CLI system requirements and the various methods to use to install Zowe CLI.

### Software Requirements

Before you install Zowe CLI, download and install Node.js and npm. Use an LTS version of Node.js that is compatible with your version of npm. For a list of compatible versions, see [Node.js Previous Releases](https://nodejs.org/en/download/releases/).

#### Linux requirements

On headless Linux, follow the procedure documented in the [SCS plug-in Readme](https://github.com/zowe/zowe-cli-scs-plugin/blob/master/README.md#software-requirements).

### Installing Zowe CLI core from public npm

To install the core Zowe CLI:

```
npm install -g @zowe/cli@zowe-v3-lts
```

### Installing CLI plug-ins

To install Zowe CLI plug-ins:

```
zowe plugins install @zowe/cics-for-zowe-cli@zowe-v3-lts @zowe/db2-for-zowe-cli@zowe-v3-lts @zowe/mq-for-zowe-cli@zowe-v3-lts @zowe/zos-ftp-for-zowe-cli@zowe-v3-lts
```

The preceding command installs most open-source plug-ins, but the IBM Db2 plug-in requires [additional configuration to install](../user-guide/cli-db2plugin.md#installing).

For more information, see [Installing Zowe CLI plug-ins](../user-guide/cli-installplugins.md).

## Issuing your first commands

Issue `zowe --help` to display full command help. Append `--help` (alias `-h`) to any command to see available command actions and options.

*Optionally*, you can view the Zowe CLI web help in a browser window. For more information, see [Displaying help](../user-guide/cli-using-displaying-help.md). 

All Zowe CLI commands start with `zowe` followed by the name of the [core command group](../user-guide/cli-using-understanding-core-command-groups.md). For example, `zowe plugins -h`. To interact with the mainframe, type `zowe` followed by a command group, action, and object. Use options to specify your connection details such as password and system name.

### Example: Listing all data sets under a high-level qualifier (HLQ)

```
zowe zos-files list data-set "MY.DATASET.*" --host my.company.com --port 123 --user myusername123 --pass mypassword123
```

### Example: Downloading a partitioned data-set (PDS) member to local file

```
zowe zos-files download data-set "MY.DATA.SET(member)" -f "mylocalfile.txt" --host my.company.com --port 123 --user myusername123 --pass mypassword123
```

See [Understanding core command groups](../user-guide/cli-using-understanding-core-command-groups.md) for a list of available functionality.

## Team profiles

Zowe CLI V3-LTS supports **team** profiles. The process of setting up team profiles is simple and can be rolled out easily across your organization. We highly recommend that you configure team profiles to support your Zowe CLI implementation. For more information, see [Using team profiles](../user-guide/cli-using-using-team-profiles.md).

## Using profiles

Zowe profiles let you store configuration details such as the username, password, host, and port for a mainframe system. Switch between profiles to quickly target different subsystems and avoid typing connection details on every command.

### Profile types

Most command groups require a `zosmf-profile`, but some plug-ins add their own profile types. For example, the CICS plug-in has a `cics-profile`.

The profile type that a command requires is defined in the `PROFILE OPTIONS` section of the `--help` response.

:::tip

The first `zosmf` profile that you create becomes your default profile. If you do not specify any options on a command, the default profile is used. Issue `zowe config list --help` to learn about listing profiles and setting defaults.

:::

### Creating z/OSMF profiles

Create a global configuration file:

```
zowe config init --global-config
```

A `zowe.config.json` file is saved in your home `~/.zowe` directory that includes a z/OSMF profile. Use a text editor to add or modify connection information in the profile.

:::note Notes 

- Use the preceding command only when a configuration file does not already exist.
- If z/OSMF is configured for high availability in Sysplex, create the CLI z/OSMF profile with a DVIPA address/hostname to ensure availability of REST services. For more information, see [Configuring z/OSMF high availability in Sysplex](../user-guide/systemrequirements-zosmf-ha.md).

:::

### Using z/OSMF profiles

```
zowe zos-files download data-set "MY.DATA.SET(member)" -file "mylocalfile.txt" --zosmf-profile myprofile123
```

For detailed information about issuing commands, using profiles, and more, see [Using Zowe CLI](../user-guide/cli-using-usingcli.md).

## Writing scripts

You can write Zowe CLI scripts to streamline your daily development processes or conduct mainframe actions from an off-platform automation tool such as Jenkins or TravisCI.

### Example

In this example scenario, you want to delete a list of temporary data sets.

Use Zowe CLI to download the list, loop through the list, and delete each data set using the `zowe zos-files delete` command:

```
#!/bin/bash

set -e

# Obtain the list of temporary project data sets
dslist=$(zowe zos-files list dataset "my.project.ds*")

# Delete each data set in the list
IFS=$'\n'
for ds in $dslist
do
     echo "Deleting Temporary Project Dataset: $ds"
     zowe files delete ds "$ds" -f
done
```

For more information, see [Writing scripts](../user-guide/cli-using-writing-scripts.md).

## Next steps

You successfully installed Zowe CLI, issued your first commands, and wrote a simple script! 

Next, you might want to perform the following tasks:

- Issue the `zowe --help` command to explore the product functionality, or review the online [web help](../user-guide/cli-using-displaying-help.md).
- Learn how to configure Zowe CLI [to run in daemon mode](../user-guide/cli-using-using-daemon-mode.md). **Daemon mode** significantly improves the performance of Zowe CLI commands by running Zowe CLI as a persistent background process.
- Learn about [configuring environment variables](../user-guide/cli-configuringcli-ev.md) to store configuration options.
- Learn about [using API Mediation Layer](../user-guide/cli-using-integrating-apiml.md).
- Learn about how to [write scripts](../user-guide/cli-using-writing-scripts.md) and integrate them with automation server, such as Jenkins.
- See what [plug-ins are available](../user-guide/cli-extending.md) for the CLI.
- Learn about [developing for the CLI](../extend/extend-cli/cli-devTutorials.md) by contributing to core Zowe CLI and developing plug-ins.
