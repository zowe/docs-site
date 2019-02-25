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

```npm config set @brightside:registry https://api.bintray.com/npm/ca/brightside```

```npm install @brightside/core@latest```

### Install plug-ins

```zowe plugins install @brightside/cics@latest```

For infomation about additional plug-ins, see [Extending Zowe CLI](../user-guide/extending.md).

## CLI usage

There are several scenarios/areas in which you might use Zowe CLI: 

- **Interactively, in a command prompt or bash terminal.** 
        
    Example: Performing one-off tasks such as submitting a batch job. 

- **Interactively, in an IDE** 
    For example, 
- **Writing automation scripts to simplify repetative tasks**
- **Writing automation scripts for automated pipelines**

## Issuing your first command


## Using profiles to store command options


## Writing a shell script