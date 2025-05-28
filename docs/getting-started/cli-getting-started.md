# Zowe CLI quick start

Get started with Zowe&trade; CLI quickly and easily.

This article presumes that your role is that of a systems administrator who manages software installation for a dev team, or you possess prerequisite knowledge of command-line tools and writing scripts. If you prefer more detailed instructions, see [Installing Zowe CLI](../user-guide/cli-installcli.md).

## Installing

The following topics describe the Zowe CLI system requirements and the various methods to use to install Zowe CLI.

### Supported platforms

Ensure your system is included in the list of [Support platforms](../user-guide/cli-using-usingcli.md#supported-platforms) for Zowe CLI.

### Mainframe requirements

To communicate with the mainframe, confirm that z/OSMF is active on your host:

1. Open a web browser and navigate to `https://<zosmfHost>:<zosmfPort>`.
2. Log in to the z/OSMF portal with your z/OSMF user ID and password.
3. Confirm that you are logged into z/OSMF.

### Software requirements

To install Zowe CLI, you need Node.js and npm.

Check whether Node.js and npm are already installed: 

```
node --version
```

```
npm --version
```
To install Node.js and npm, download both from [Node.js](https://nodejs.org/en). Use an LTS version of Node.js that is compatible with your version of npm. For a list of compatible versions, see [Node.js Previous Releases](https://nodejs.org/en/download/releases/).

#### Linux requirements

See [Requirements for headless Linux operating systems](../user-guide/cli-configure-scs-on-headless-linux-os.md#headless-linux-operating-systems).

### Installing Zowe CLI core from public npm

To install the core Zowe CLI:

```
npm install -g @zowe/cli@zowe-v3-lts
```

If an `EACCESS` error displays and you are running MacOS or Linux systems, there are workarounds available. See the instructions for using the `sudo` command in [Installing Zowe CLI and Zowe CLI plug-ins](../user-guide/cli-installcli).

### Installing Zowe CLI plug-ins

To install Zowe CLI plug-ins:

```
zowe plugins install @zowe/cics-for-zowe-cli@zowe-v3-lts @zowe/db2-for-zowe-cli@zowe-v3-lts @zowe/mq-for-zowe-cli@zowe-v3-lts @zowe/zos-ftp-for-zowe-cli@zowe-v3-lts
```

The preceding command installs [IBM® CICS® Plug-in for Zowe CLI](../user-guide/cli-cicsplugin), [IBM® Db2® Plug-in for Zowe CLI](../user-guide/cli-db2plugin), [IBM z/OS FTP Plug-in for Zowe CLI](../user-guide/cli-ftpplugin), and [IBM MQ Plug-in for Zowe CLI](../user-guide/cli-mqplugin). Remove a plug-in from the command to not install it.

For more information, see [Installing Zowe CLI plug-ins](../user-guide/cli-installplugins.md).

   :::note

   The IBM Db2 plug-in requires [additional configuration to install](../user-guide/cli-db2plugin.md#installing).

   :::

## Issuing your first commands

Issue `zowe --help` to display full command help. Append `--help` (alias `-h`) to any command to see available command actions and options.

*Optionally*, you can view the Zowe CLI web help in a browser window. For more information, see [Displaying help](../user-guide/cli-using-displaying-help.md). 

All Zowe CLI commands start with `zowe` followed by the name of the [core command group](../user-guide/cli-using-understanding-core-command-groups.md). For example, `zowe plugins --help`. 

To interact with the mainframe, type `zowe` followed by a command group, action, and object. Use options to specify your connection details such as password and system name.

### Listing all data sets under a high-level qualifier (HLQ) example

```
zowe zos-files list data-set "MY.DATASET.*" --host my.company.com --port 123 --user myusername123 --password mypassword123
```

- `host`

     Specifies the z/OSMF server host name.

- `port`

     Specifies the z/OSMF server port.

- `user`

     Specifies the user ID.

- `password`

     Specifies the user password.

### Downloading a partitioned data-set (PDS) member to local file example

```
zowe zos-files download data-set "MY.DATA.SET(member)" --file "mylocalfile.txt" --host my.company.com --port 123 --user myusername123 --password mypassword123
```

- `host`

     Specifies the z/OSMF server host name.

- `port`

     Specifies the z/OSMF server port.

- `user`

     Specifies the user ID.

- `password`

     Specifies the user password.

See [Understanding core command groups](../user-guide/cli-using-understanding-core-command-groups.md) for a list of available functionality.

## Team configuration

Zowe CLI V3-LTS supports [**team configuration**](../appendix/zowe-glossary.md#team-configuration) with profiles. The process of setting up team configuration is simple and can be rolled out easily across your organization. We highly recommend that you configure team profiles to support your Zowe CLI implementation. For more information, see [Team configurations](../user-guide/cli-using-using-team-profiles.md).

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

A series of prompts ask for connection information, such as host, username, and password.

A `zowe.config.json` file is saved in your home `~/.zowe` directory that includes a z/OSMF profile. Use a text editor to add or modify connection information in the profile.

:::note Notes 

- Use the preceding command only when a configuration file does not already exist.
- The z/OSMF profile includes port `443` as the default. If this is not the port you use, edit the configuration file.
- If z/OSMF is configured for high availability in Sysplex, create the CLI z/OSMF profile with a DVIPA address/hostname to ensure availability of REST services. For more information, see [Configuring z/OSMF high availability in Sysplex](../user-guide/systemrequirements-zosmf-ha.md).

:::

### Using z/OSMF profiles

```
zowe zos-files download data-set "MY.DATA.SET(member)" --file "mylocalfile.txt" --zosmf-profile myprofile123
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
dslist=$(zowe zos-files list data-set "my.project.ds*")

# Delete each data set in the list
for ds in $dslist
do
     echo "Deleting Temporary Project Dataset: $ds"
     zowe zos-files delete data-set "$ds" --for-sure
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
