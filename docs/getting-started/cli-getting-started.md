# Getting started with Zowe CLI

Welcome to the getting started guide for installing and using Zowe CLI.

**Note:** This section assumes some prerequisite knowledge of command-line tools and writing scripts. For more thorough instructions, see [Installing Zowe CLI](../user-guide/cli-installcli.md) and [Using Zowe CLI](../user-guide/cli-usingcli.md).

- [Installing](#installing)
- [CLI usage](#cli-usage)
- [Issuing your first command](#issuing-your-first-command)
- [Using profiles to store command options](#using-profiles-to-store-command-options)
- [Writing a shell script](#writing-a-shell-script)

## Installing

Before you install Zowe CLI, download and install [Node.js and npm.](https://nodejs.org/en/download/)

### Set target registry and install Zowe CLI core

```
npm config set @brightside:registry https://api.bintray.com/npm/ca/brightside
```

```
npm install @brightside/core@latest
```

### Install plug-ins

```
zowe plugins install @brightside/cics@latest
```

For infomation about additional plug-ins, see [Extending Zowe CLI](../user-guide/extending.md).

## CLI usage

There are several scenarios/areas in which you can use Zowe CLI:

- **Interactively, in a command prompt or bash terminal.**
        
    Example: Perform one-off tasks such as submitting a batch job.

- **Interactively, in an IDE**

    Example: Issue a command to download a data set, make local changes in your editor, then upload the changed dataset back to the mainframe.

- **Writing automation scripts to simplify repetative tasks**
 
    Example: Write a shell script that submits a job, waits for the job to complete, then returns the output.

- **Writing automation scripts for automated pipelines**

    Example: Add a script to your Jenkins (or other automation tool) automated pipeline to move compiled artifacts on the mainframe from a development system to a test system.

## Issuing your first commands

Issue `zowe --help` to display the full command help. Append `--help` (alias `-h`) to any command to see available command actions and options.

To interact with the mainframe, type `zowe` followed by a command group, action, and object. Then use options to specify your connection details such as password, system name, etc... 

### List Data Sets

```
zowe zos-files list --
```

### Download a Data Set

```
zowe zos-files download dataset
``` 

## Using profiles to store command options


## Writing a shell script