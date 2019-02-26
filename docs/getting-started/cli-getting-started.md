# Getting started with Zowe CLI

Get started installing and using Zowe CLI quickly and easily.

**Note:** This section assumes some prerequisite knowledge of command-line tools and writing scripts. For more thorough instructions, see [Installing Zowe CLI](../user-guide/cli-installcli.md) and [Using Zowe CLI](../user-guide/cli-usingcli.md).

- [Installing](#installing)
- [Where can I use the CLI?](#where-can-i-use-the-cli)
- [Issuing your first command](#issuing-your-first-command)
- [Using profiles to store command options](#using-profiles-to-store-command-options)
- [Writing a shell script](#writing-a-shell-script)

## Installing

Before you install Zowe CLI, download and install [Node.js and npm.](https://nodejs.org/en/download/)

### Setting target registry and install Zowe CLI core

```
npm config set @brightside:registry https://api.bintray.com/npm/ca/brightside
```

```
npm install @brightside/core@latest
```

### Installing plug-ins

```
zowe plugins install @brightside/cics@latest
```

For a list of available plug-ins, see [Extending Zowe CLI](../user-guide/extending.md). The IBM Db2 plug-in requires additional configuration. 

## Where can I use the CLI?

There are several scenarios/areas in which you can use Zowe CLI:

| **Usage Scenario**    | **Example**  |
|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Interactive use, in a command prompt or bash terminal. | Perform one-off tasks such as submitting a batch job.                                                            |
| Interactive use, in an IDE terminal                    | Issue a command to download a data set, make local changes in your editor, then upload the changed dataset back to the mainframe.                                  |
| Scripting, to simplify repetative tasks         | Write a shell script that submits a job, waits for the job to complete, then returns the output.                |
| Scripting, for use in automated pipelines       | Add a script to your Jenkins (or other automation tool) automated pipeline to move compiled artifacts on the mainframe from a development system to a test system. |
|||

## Issuing your first commands

Issue `zowe --help` to display the full command help. Append `--help` (alias `-h`) to any command to see available command actions and options.

To interact with the mainframe, type `zowe` followed by a command group, action, and object. Use options to specify your connection details such as password, system name, etc... For example:

### Listing all data sets under a HLQ

```
zowe zos-files list data-set "MY.DATASET.*" --host my.company.com --port 123 --user myusername123 --pass mypassword123
```

### Downloading a PDS to local file

```
zowe zos-files download data-set "user123.data.set(member)" -f "mylocalfile.txt" --user user123 --password pass --host host123

```

For information about available functionality, see Zowe CLI Command Groups groups, see [](). 

## Using profiles to store command options

Zowe profiles let you store configuration details such username, password, host, and port for particular mainframe system, then reuse that profile to avoid typing it again on every command. You can switch between profiles to quickly target different mainframe subsystems.

## Creating a zosmf profile

```
zowe profiles create zosmf myprofile123 --host host123 --user ibmuser --password pass --zosmf-profile host123
```

## Calling the profile on a command

```
zowe zos-files download data-set "ibmuser.data.set(member)" -f "myfile.txt" --zosmf-profile myprofile123
```

For more information about issuing commands, using profiles, and storing variables as environment variables, see []().

## Writing a shell script

You can write scripts with Zowe CLI commands to automate a series of mainframe actions. Use the scripts to streamline your daily development processes, and/or implement scripts in an off-platform automation tool such as Jenkins automation server. 

This example script 

```

```