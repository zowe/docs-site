# TEST Zowe CLI quick start

Get started with Zowe CLI quickly and easily.

**Note:** This section assumes some prerequisite knowledge of command-line tools and writing scripts. If you prefer more detailed instructions, see [Installing Zowe CLI.](../user-guide/cli-installcli.md)

- [Installing](#installing)
- [Where can I use the CLI?](#where-can-i-use-the-cli)
- [Issuing your first commands](#issuing-your-first-commands)
- [Using profiles](#using-profiles)
- [Writing scripts](#writing-scripts)
- [Next steps](#next-steps)

## Installing 

Before you install Zowe CLI, download and install [Node.js and npm.](https://nodejs.org/en/download/)

### Installing Zowe CLI core

```
npm config set @brightside:registry https://api.bintray.com/npm/ca/brightside
```

```
npm install @brightside/core@lts-incremental -g
```

### Installing CLI plug-ins 

```
zowe plugins install @brightside/cics@lts-incremental
```

The command installs the IBM CICS plug-in, but the IBM Db2 plug-in requires [additional configuration to install.](../user-guide/cli-db2plugin.md#installing)

For a list of available plug-ins, see [Extending Zowe CLI](../user-guide/cli-extending.md).

## Where can I use the CLI?

| **Usage Scenario**    | **Example**  |
|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Interactive use, in a command prompt or bash terminal. | Perform one-off tasks such as submitting a batch job.                                                            |
| Interactive use, in an IDE terminal                    | Download a data set, make local changes in your editor, then upload the changed dataset back to the mainframe.                                  |
| Scripting, to simplify repetitive tasks         | Write a shell script that submits a job, waits for the job to complete, then returns the output.                |
| Scripting, for use in automated pipelines       | Add a script to your Jenkins (or other automation tool) pipeline to move artifacts from a mainframe development system to a test system. |

## Issuing your first commands

Issue `zowe --help` to display full command help. Append `--help` (alias `-h`) to any command to see available command actions and options.

To interact with the mainframe, type `zowe` followed by a command group, action, and object. Use options to specify your connection details such as password and system name.

### Listing all data sets under an HLQ

```
zowe zos-files list data-set "MY.DATASET.*" --host my.company.com --port 123 --user myusername123 --pass mypassword123
```

### Downloading a partitioned data-set (PDS) member to local file

```
zowe zos-files download data-set "MY.DATA.SET(member)" -f "mylocalfile.txt" --user user123 --pass mypassword123 --host host123
```

See [Command Groups](../user-guide/cli-usingcli.md#zowe-cli-command-groups) for a list of available functionality.

## Using profiles

Zowe profiles let you store configuration details such as username, password, host, and port for a mainframe system. Switch between profiles to quickly target different subsystems and avoid typing connection details on every command. 

### Profile types 

Most command groups require a `zosmf-profile`, but some plug-ins add their own profile types. For example, the CICS plug-in has a `cics-profile`. The profile type that a command requires is defined in the `PROFILE OPTIONS` section of the help response.

**Tip:** The first `zosmf` profile that you create becomes your default profile. If you don't specify any options on a command, the default profile is used. Issue `zowe profiles -h` to learn about listing profiles and setting defaults. 

### Creating a zosmf profile

```
zowe profiles create zosmf-profile myprofile123 --host host123 --port port123 --user ibmuser --password pass123
```

**Note:** The port defaults to 443 if you omit the `--port` option. Specify a different port if your host system does not use port 443.

### Using a zosmf profile

```
zowe zos-files download data-set "ibmuser.data.set(member)" -f "myfile.txt" --zosmf-profile myprofile123
```

For detailed information about issuing commands, using profiles, and storing variables as environment variables, see [Defining Zowe CLI connection details.](../user-guide/cli-configuringcli.md#defining-zowe-cli-connection-details)

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

For more information, see [Writing scripts to automate mainframe actions.](../user-guide/cli-usingcli.md#writing-scripts-to-automate-mainframe-actions)

## Next Steps

You successfully installed Zowe CLI, issued your first commands, and wrote a simple script! Next, you might want to:

- Review [Command Groups](../user-guide/cli-usingcli.md#zowe-cli-command-groups) to learn what functionality is available, and explore the in-product help.

- Learn about [using environment variables](../user-guide/cli-configuringcli.md#defining-environment-variables) to store configuration options.

- Integrate your scripts with an automation server like Jenkins.

- See what [plug-ins are available](../user-guide/cli-extending.md) for the CLI.

- Learn about [developing for the CLI](../extend/extend-cli/cli-developing-a-plugin.md) (contributing to core and developing plug-ins).
