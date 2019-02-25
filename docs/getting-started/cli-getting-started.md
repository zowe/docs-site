# Getting started with Zowe CLI

Welcome to the getting started guide for installing and using Zowe CLI.

**Note:** This section assumes some prerequisite knowledge of command-line tools and writing scripts. For more thorough instructions, see [Installing Zowe CLI](../user-guide/cli-installcli.md) and [Using Zowe CLI](../user-guide/cli-usingcli.md).

- []()
- []()
- []()
- []()
- []()

## Installing

Before you install Zowe CLI and plug-ins download and install [Node.js and npm.](https://nodejs.org/en/download/)

### Set target registry and install Zowe CLI core

```npm config set @brightside:registry https://api.bintray.com/npm/ca/brightside```

```npm install @brightside/core@latest```

### Install plug-ins

```zowe plugins install @brightside/cics@latest```

For infomation about additional plug-ins, see [](../user-guide/extending.md).

## CLI usage

There are several scenarios/areas in which you might use Zowe CLI: 

- **Interactively, in a command prompt or bash terminal**
- **Interactively, in an IDE**
- **Writing automation scripts to simplify repetative tasks**
- **Writing automation scripts for automated pipelines**

## Issuing your first command


## Using profiles to store command options


## Writing a shell script