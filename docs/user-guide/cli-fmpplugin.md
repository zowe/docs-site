# Zoe Brightside plug-in for CA File Master Plus

The Zoe Brightside plug-in for CA File Master Plus is a file management
and data manipulation tool. Zoe Brightside speeds up file creation and
manipulates virtual storage access method (VSAM), sequential and
partitioned data sets. Zoe Brightside also supports symbolic access to
data with layouts, and data manipulation such as selection of records in
data sets.

Zoe Brightside allows you to perform commands on multiple mainframe
applications at once from one command line window, without the need to
establish several mainframe sessions.

## Plug-in overview

Modern application developers and DevOps administrators can use a CLI to script DevOps processes that include VSAM file functions to enable continuous testing. The file functions that the CLI plug-in can invoke include copying, renaming and deleting files, and populating files with data.

## Use cases

As a developer or DevOps admin, you can use the Zoe Brightside plug-in for CA File
Master Plus to:

  - **Populate:** Populate a VSAM file with newly constructed test data from the CLI interactively.
  - **Copy:** Select desired parts of the source and copy only those parts over to
    a new VSAM file.
  - **Copy:** Make an exact copy of VSAM file A using only one CLI command.
  - **Rename:** Rename the VSAM file A and B with ARCHIVE as the second qualifier
  - **Delete:** Delete VSAM file A using the CLI.

## Prerequisites

To use the Zoe Brightside plug-in for CA File Master Plus, ensure that the CA File
Master Plus REST API is installed, configured, and running.

**More information:**

  - [Installing the Eclipse User Interface and REST API](https://docops.ca.com/display/FMPLUS11/Installing+the+Eclipse+User+Interface+and+REST+API)
  - [Using the REST API](https://docops.ca.com/display/FMPLUS11/Using+the+REST+API)

## Installing

For information about how to install a plug-in to Zoe Brightside,
see [Installing Plug-ins](cli-installplugins.md).

## Profile setup

Before you start to use Zoe Brightside for CA File Master Plus, complete
the following steps:

  - [Creating a profile](#creating-a-profile)
  - [Validating a profile](#validating-a-profile)

### Creating a profile

The `profiles create fmp` command lets you create a Zoe Brightside profile for CA File Master Plus.

**Note:** For more information about `profiles create fmp` syntax,
actions, and options, open Zoe Brightside, and issue the following
command:

```
bright profiles create fmp -h
```

### Validating a profile

The `profiles validate fmp` command lets you validate a Zoe
Brightside profile.

**Note:** For more information about `profiles validate fmp` syntax,
actions, and options, open Zoe Brightside, and issue the following
command:

```
bright profiles validate fmp -h
```

## Commands

Zoe Brightside allows you to perform the following actions using CA File
Master Plus for MVS.

### Copying a data set

The `fmp copy ds` command lets you copy a data set with or without
applying layout or selection
criteria.

**Note:** For more information about `fmp copy ds` syntax, actions, and
options, open Zoe Brightside, and issue the following command:

```
bright fmp copy ds -h
```

### Deleting a data set

The `fmp delete ds` command lets you delete a data set.

**Note:** For more information about `fmp delete ds` syntax, actions,
and options, open Zoe Brightside, and issue the following command:

```
bright fmp delete ds -h
```

### Populating a data set

The `fmp populate ds` command lets you populate a data set with
records.

**Note:** For more information about `fmp populate ds` syntax, actions,
and options, open Zoe Brightside, and issue the following command:

```
bright fmp populate ds -h
```

### Renaming a data set

The `fmp rename ds` command lets you rename a data
set.

**Note:** For more information about `fmp rename ds` syntax, actions,
and options, open Zoe Brightside, and issue the following command:

```
bright fmp rename ds -h
```