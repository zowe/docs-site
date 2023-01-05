# Zowe CLI quick start

Get started with Zowe&trade; CLI quickly and easily.

**Note:** This section assumes some prerequisite knowledge of command-line tools and writing scripts. If you prefer more detailed instructions, see [Installing Zowe CLI](../user-guide/cli-installcli.md).

- [Installing](#installing)
- [Issuing your first commands](#issuing-your-first-commands)
- [Using profiles](#using-profiles)
- [Writing scripts](#writing-scripts)
- [Next Steps](#next-steps)

## Installing

### Software Requirements

Before you install Zowe CLI, download and install Node.js and npm. Use an LTS version of Node.js that is compatible with your version of npm. For a list of compatible versions, see [Node.js Previous Releases](https://nodejs.org/en/download/releases/).

**(Linux only):** On graphical Linux, install `gnome-keyring` and `libsecret` on your computer before you install the Secure Credential Store. On headless Linux, follow the procedure documented in the [SCS plug-in Readme](https://github.com/zowe/zowe-cli-scs-plugin/blob/master/README.md#software-requirements).

### Installing Zowe CLI core from public npm

Issue the following commands in sequence to install the core CLI.

The "core" includes Zowe CLI and Secure Credential Store, which enhances security by encrypting your username and password.

```
npm install @zowe/cli@zowe-v1-lts -g
```

```
zowe plugins install @zowe/secure-credential-store-for-zowe-cli@zowe-v1-lts
```

### Installing CLI plug-ins

```
zowe plugins install @zowe/cics-for-zowe-cli@zowe-v1-lts @zowe/db2-for-zowe-cli@zowe-v1-lts @zowe/ims-for-zowe-cli@zowe-v1-lts @zowe/mq-for-zowe-cli@zowe-v1-lts @zowe/zos-ftp-for-zowe-cli@zowe-v1-lts
```

The command installs most open-source plug-ins, but the IBM Db2 plug-in requires [additional configuration to install](../user-guide/cli-db2plugin.md#installing).

For more information, see [Installing plug-ins](../user-guide/cli-installplugins.md).

## Issuing your first commands

Issue `zowe --help` to display full command help. Append `--help` (alias `-h`) to any command to see available command actions and options.

To interact with the mainframe, type `zowe` followed by a command group, action, and object. Use options to specify your connection details such as password and system name.

### Listing all data sets under a high-level qualifier (HLQ)

```
zowe zos-files list data-set "MY.DATASET.*" --host my.company.com --port 123 --user myusername123 --pass mypassword123
```

### Downloading a partitioned data-set (PDS) member to local file

```
zowe zos-files download data-set "MY.DATA.SET(member)" -f "mylocalfile.txt" --host my.company.com --port 123 --user myusername123 --pass mypassword123
```

See [Command Groups](../user-guide/cli-usingcli.md#understanding-core-command-groups) for a list of available functionality.

## Using profiles

Zowe profiles let you store configuration details such as username, password, host, and port for a mainframe system. Switch between profiles to quickly target different subsystems and avoid typing connection details on every command.

### Profile types

Most command groups require a `zosmf-profile`, but some plug-ins add their own profile types. For example, the CICS plug-in has a `cics-profile`. The profile type that a command requires is defined in the `PROFILE OPTIONS` section of the help response.

**Tip:** The first `zosmf` profile that you create becomes your default profile. If you don't specify any options on a command, the default profile is used. Issue `zowe profiles -h` to learn about listing profiles and setting defaults.

### Creating a zosmf profile

```
zowe profiles create zosmf-profile myprofile123 --host my.company.com --port 123 --user myusername123 --password mypassword123
```

**Note:** The port defaults to 443 if you omit the `--port` option. Specify a different port if your host system does not use port 443.

### Using a zosmf profile

```
zowe zos-files download data-set "MY.DATA.SET(member)" -f "mylocalfile.txt" --zosmf-profile myprofile123
```

For detailed information about issuing commands, using profiles, and more, see [Using CLI](../user-guide/cli-usingcli.md).

## Writing scripts

You can write Zowe CLI scripts to streamline your daily development processes or conduct mainframe actions from an off-platform automation tool such as Jenkins or TravisCI.

### Example:

You want to delete a list of temporary datasets. Use Zowe CLI to download the list, loop through the list, and delete each data set using the `zowe zos-files delete` command.

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

For more information, see [Writing scripts](../user-guide/cli-usingcli.md#writing-scripts).

## Next Steps

You successfully installed Zowe CLI, issued your first commands, and wrote a simple script! Next, you might want to:

- Issue the `zowe --help` command to explore the product functionality, or review the online [web help](../user-guide/cli-usingcli.md#viewing-web-help).

- Learn about [using environment variables](../user-guide/cli-usingcli.md#using-environment-variables) to store configuration options.

- Learn about [integrating with API Mediation Layer](../user-guide/cli-usingcli.md#integrating-with-api-mediation-layer).

- Write scripts and integrate them with automation server, such as Jenkins.

- See what [plug-ins are available](../user-guide/cli-extending.md) for the CLI.

- Learn about [developing for the CLI](../extend/extend-cli/cli-developing-a-plugin.md) (contributing to core and developing plug-ins).
