# Getting started with Zowe CLI

Get started installing and using Zowe CLI quickly and easily.

**Note:** This section assumes some prerequisite knowledge of command-line tools and writing scripts. For more thorough instructions, see [Installing Zowe CLI](../user-guide/cli-installcli.md) and [Using Zowe CLI](../user-guide/cli-usingcli.md).

- [Installing](#installing)
- [Where can I use the CLI?](#where-can-i-use-the-cli)
- [Issuing your first commands](#issuing-your-first-commands)
- [Using profiles to store command options](#using-profiles-to-store-command-options)
- [Writing scripts](#writing-scripts)
- [Next steps](#next-steps)

## Installing

Before you install Zowe CLI, download and install [Node.js and npm.](https://nodejs.org/en/download/)

### Setting target registry and install Zowe CLI core

```
npm config set @brightside:registry https://api.bintray.com/npm/ca/brightside
```

```
npm install @brightside/core@latest -g
```

### Installing plug-ins 

```
zowe plugins install @brightside/cics@latest
```

For a list of available plug-ins, see [Extending Zowe CLI](../../user-guide/cli-extending.md). The IBM Db2 plug-in requires additional configuration. 

## Where can I use the CLI?

| **Usage Scenario**    | **Example**  |
|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Interactive use, in a command prompt or bash terminal. | Perform one-off tasks such as submitting a batch job.                                                            |
| Interactive use, in an IDE terminal                    | Issue a command to download a data set, make local changes in your editor, then upload the changed dataset back to the mainframe.                                  |
| Scripting, to simplify repetative tasks         | Write a shell script that submits a job, waits for the job to complete, then returns the output.                |
| Scripting, for use in automated pipelines       | Add a script to your Jenkins (or other automation tool) automated pipeline to move compiled artifacts on the mainframe from a development system to a test system. |


## Issuing your first commands

Issue `zowe --help` to display full command help. Append `--help` (alias `-h`) to any command to see available command actions and options.

To interact with the mainframe, type `zowe` followed by a command group, action, and object. Use options to specify your connection details such as password, system name, etc...

### Listing all data sets under a HLQ

```
zowe zos-files list data-set "MY.DATASET.*" --host my.company.com --port 123 --user myusername123 --pass mypassword123
```

### Downloading a partitioned data-set (PDS) to local file

```
zowe zos-files download data-set "user123.data.set(member)" -f "mylocalfile.txt" --user user123 --password pass --host host123

```

See [Command Groups](../user-guide/cli-usingcli#zowe-cli-command-groups) for a list of available functionality.

## Using profiles to store command options

Zowe profiles let you store configuration details such username, password, host, and port for a mainframe system, then reuse that profile to avoid typing it again on every command. You can switch between profiles to quickly target different mainframe subsystems.

### Creating a zosmf profile

```
zowe profiles create zosmf myprofile123 --host host123 --user ibmuser --password pass --zosmf-profile host123
```

### Calling the profile on a command

```
zowe zos-files download data-set "ibmuser.data.set(member)" -f "myfile.txt" --zosmf-profile myprofile123
```

For more information about issuing commands, using profiles, and storing variables as environment variables, see [Defining Zowe CLI connection details.](../user-guide/cli-usingcli.md#defining-zowe-cli-connection-details)

## Writing scripts

You can write scripts with Zowe CLI commands to automate a series of mainframe actions. Use the scripts to streamline your daily development processes, and/or implement scripts in an off-platform automation tool such as Jenkins automation server. 

In this example, you want to delete a list of temporary datasets. Use Zowe CLI to download the list and store it as a variable, then loop through the list and use the `zowe zos-files delete` command to delete each dataset:

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

For more information, see [Writing scripts to automate mainframe actions.](../user-guide/cli-usincli.md#writing-scripts-to-automate-mainframe-actions)

# Next Steps

You successfully installed Zowe CLI, issued your first commands, and wrote a simple script! Next, you might want to:

- Review [Command Groups](../user-guide/cli-usingcli#zowe-cli-command-groups) to learn what functionality is available, and explore the in-product help.

- Learn about [using environment variables]() to store configuration options.

- Integrate your scripts with an automation server like Jenkins.

- See what [plug-ins are available](..\user-guide\cli-developing-a-plugin.md) for the CLI.

- Learn about [developing for the CLI](..\extend\extend-cli\cli-extending.md) (adding to core, creating plug-ins)
