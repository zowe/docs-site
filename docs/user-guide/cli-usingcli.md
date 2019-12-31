# Using Zowe CLI

## Displaying Zowe CLI help

Zowe&trade; CLI has a command-line help system that helps you to learn about the commands, actions, and options available in the product.

- [Top-level help](#top-level-help)
- [Group, action, and object help](#group-action-and-object-help)
- [Interactive web help](#interactive-web-help)
- [Zowe CLI command reference](#zowe-cli-command-reference)

### Top-level help

To view top-level help, open a command-line and issue the following command:

```
zowe --help
```

![Issuing the help command](../images/guides/CLI/GetHelp.gif)

**Tip:** All Zowe CLI commands begin with `zowe.`

### Group, action, and object help

You can append `--help` to learn about a specific command group, action, or object.

For example, issue the following command to learn more about the `create` action in the `zos-files` group:

```
zowe zos-files create --help
```

### Interactive web help

You can launch an interactive form of help in your Web browser. Web help is custom-generated to include commands for all currently installed plug-ins. Issue the following command:

```
zowe --help-web
```

**Tip:** Append `--help-web` to a specific command or action to launch directly into the appropriate Web help page.

### Zowe CLI command reference

Command reference is available for download in three formats: a static copy of the interactive Web help, a ZIP file that contains the HTML web help, and a static PDF:

- <a href="../web_help/index.html" target="_blank">Browse Online</a>
- <a href="../zowe_web_help.zip">Download (ZIP)</a>
- <a href="../CLIReference_Zowe.pdf">Download (PDF)</a>


## Using the prompt for sensitive options

Zowe CLI lets you enable a command-line "prompt" feature, which masks values on the screen as you type. You might choose to enable the prompt for sensitive credentials such as mainframe username or password.

You can enable the prompt on-demand, or choose to always prompt for a particular option.

### Enable prompt

Enable on-demand prompting for arguments and options.

**Follow these steps:**

1. Begin typing a Zowe CLI command.

2. For the option(s) that you want to mask, insert the value `"PROMPT*"`. For example, prompt for your password:

    ```
    zowe files list data-set "MY.DATASET.*" --host my.company.com --port 123 --user myusername123 --password "PROMPT*"
    ```

   The CLI prompts you to enter a value for the `--password` field.

3. Enter a value to complete the command.

    **Tip:** The backspace key doesn't work in prompt mode, so be sure to enter the value carefully.

### Always prompt

You can configure your environment so that the CLI *always* prompts for a particular option, such as `--password`.

To enable the feature, set an environment variable named `ZOWE_OPT_PASSWORD` with the value
`"PROMPT*"`. With the environment variable set, the CLI automatically enables the prompt when you omit a required `--password` value.

**Tip** The procedure for setting environment variables is dependent on your operating systems. Refer to documentation for your OS to learn about setting environment variables.

### Change the keyword for prompt

The default keyword that enables prompting in Zowe CLI is `"PROMPT*"`. You might want to change the keyword if there is a chance that `"PROMPT*"` could exist as a valid value for the field. For example, if you mask the `data-set` argument and are working with real mainframe data sets that begin with the characters `"PROMPT*"`.

To configure the keyword, choose a new value. Then define the value to to the environment variable on your computer named `ZOWE_PROMPT_PHRASE`.

## Zowe CLI command groups

Zowe CLI contains command groups that focus on specific business processes. For example, the `zos-files` command group provides the ability to interact with mainframe data sets. This article provides you with a brief synopsis of the tasks that you can perform with each group. For more information, see [Display Zowe CLI Help](#displaying-zowe-cli-help).

The commands available in the product are organized in a hierarchical structure. Command groups (for example, `zos-files`) contain actions (for example, `create`) that let you perform actions on specific objects (for example, a specific type of data set). For each action that you perform on an object, you can specify options that affect the operation of the command.

**Important!** Before you issue these commands, verify that you
completed the steps in [Create a Zowe CLI profile](cli-configuringcli.md#creating-zowe-cli-profiles) and [Test Connection to z/OSMF](cli-configuringcli.md#testing-zowe-cli-connection-to-z-osmf) to help ensure that Zowe CLI can communicate with z/OS systems.

Zowe CLI contains the following command groups:

### plugins

The plugins command group lets you install and manage third-party
plug-ins for the product. Plug-ins extend the functionality of Zowe CLI in the form of new commands.

With the plugins command group, you can perform the following tasks:

- Install or uninstall third-party plug-ins.
- Display a list of installed plug-ins.
- Validate that a plug-in integrates with the base product
properly.

**Note:** For more information about `plugins` syntax, actions, and options, open Zowe CLI and issue the following
command:

```
zowe plugins -h
```

### profiles
The profiles command group lets you create and manage profiles for use with other Zowe CLI command groups. Profiles allow you to issue commands to different mainframe systems quickly, without specifying your connection details with every command.

With the profiles command group, you can perform the following tasks:

- Create, update, and delete profiles for any Zowe CLI command group that supports profiles.
- Set the default profile to be used within any command group.
- List profile names and details for any command group, including the default active profile.

**Note:** For more information about `profiles` syntax, actions, and options, open Zowe CLI, and issue the following command:
```
zowe profiles -h
```
### provisioning

The provisioning command group lets you perform IBM z/OSMF provisioning tasks with templates and provisioned instances from Zowe CLI.

With the provisioning command group, you can perform the following
tasks:

- Provision cloud instances using z/OSMF Software Services templates.
- List information about the available z/OSMF Service Catalog published templates and the templates that you used to publish cloud instances.
- List summary information about the templates that you used to provision cloud instances. You can filter the information by
application (for example, DB2 and CICS) and by the external name of the provisioned instances.
- List detail information about the variables used (and their corresponding values) on named, published cloud instances.

**Note:** For more information about provisioning syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe provisioning -h
```

### zos-console

The zos-console command group lets you issue commands to the z/OS console by establishing an extended Multiple Console Support (MCS) console.

With the zos-console command group, you can perform the following
tasks:
**Important\!** Before you issue z/OS console commands with Zowe CLI, security administrators should ensure that
they provide access to commands that are appropriate for your
organization.
- Issue commands to the z/OS console.
- Collect command responses and continue to collect solicited command responses on-demand.

**Note:** For more information about `zos-console` syntax, actions, and options, open Zowe CLI and issue the following command:
```
zowe zos-console -h
```
### zos-files

The zos-files command group lets you interact with data sets on z/OS systems.

With the zos-files command group, you can perform the following tasks:

- Create partitioned data sets (PDS) with members, physical sequential data sets (PS), and other types of data sets from templates. You can specify options to customize the data sets you create.
- Download mainframe data sets and edit them locally in your preferred Integrated Development Environment (IDE).
- Upload local files to mainframe data sets.
- List available mainframe data sets.
- Interact with VSAM data sets directly, or invoke Access Methods Services (IDCAMS) to work with VSAM data sets.

**Note:** For more information about `zos-files` syntax, actions, and options, open Zowe CLI and issue the following command:
```
zowe zos-files -h
```
### zos-jobs

The zos-jobs command group lets you submit jobs and interact with jobs on z/OS systems.

With the zos-jobs command group, you can perform the following tasks:

- Submit jobs from JCL that resides on the mainframe or a local file.
- List jobs and spool files for a job.
- View the status of a job or view a spool file from a job.

**Note:** For more information about `zos-jobs` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe zos-jobs -h
```
### zos-uss

The zos-uss command group lets you issue Unix System Services shell commands by establishing an SSH connection to an SSH server.

With the zos-uss command group, you can perform the following task:
**Important\!** Before you issue z/OS UNIX System Services commands with Zowe CLI, security administrators must provide access for your user ID to login via SSH.
- Issue z/OS UNIX System Services shell commands over an SSH connection and stream back the response.

**Note:** For more information about `zos-uss` syntax, actions, and options, open Zowe CLI and issue the following command:
```
zowe zos-uss -h
```
### zos-workflows

The zos-workflows command group lets you create and manage z/OSMF workflows on a z/OS system.

With the zos-workflows command group, you can perform the following tasks:

- Create or register a z/OSMF workflow based on the properties on a z/OS system
- Start a z/OSMF workflow on a z/OS system.
- Delete or remove a z/OSMF workflow from a z/OS system.
- List the z/OSMF workflows for a system or sysplex.

**Note:** For more information about `zos-workflows` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe zos-workflows -h
```

### zos-tso

The zos-tso command group lets you issue TSO commands and interact with TSO address spaces on z/OS systems.

With the zos-tso command group, you can perform the following tasks:

- Excecute REXX scripts
- Create a TSO address space and issue TSO commands to the address space.
- Review TSO command response data in Zowe CLI.

**Note:** For more information about `zos-tso` syntax, actions, and options, open Zowe CLI and issue the following
command:
```
zowe zos-tso -h
```
### zosmf

The zosmf command group lets you work with Zowe CLI profiles and get general information about z/OSMF.

With the zosmf command group, you can perform the following tasks:

- Create and manage your Zowe CLI `zosmf` profiles. Profiles let you store configuration information for use on multiple commands. You can create a profile that contains your username, password, and connection details for a particular mainframe system, then reuse that profile to avoid typing it again on every command. You can switch between profiles to quickly target different mainframe subsystems. For more information, see [Creating profiles](cli-configuringcli.md#creating-zowe-cli-profiles).
- Verify that your profiles are set up correctly to communicate with z/OSMF on your system. For more information, see [Test Connection to z/OSMF](cli-configuringcli.md#testing-zowe-cli-connection-to-z-osmf).
- Get information about the current z/OSMF version, host, port, and plug-ins installed on your system.

**Note:** For more information about `zosmf` syntax, actions, and options, open Zowe CLI and issue the following command:

```
zowe zosmf -h
```

## Writing scripts to automate mainframe actions

You can combine multiple Zowe CLI commands in bash or shell scripts to automate actions on z/OS. You can implement scripts to enhance your development workflow, automate repetitive test or build tasks, and orchestrate mainframe actions from continuous integration/continuous deployment (CI/CD) tools such as Jenkins or TravisCI.

- [Writing a Script](#writing-a-script)
- [Example: Clean up Temporary Data Sets](#exampleOne)
- [Example: Submit Jobs and Save Spool Output](#exampleTwo)

### Writing a Script

Write a script that executes multiple CLI commands.

**Note:** The type of script that you write depends on the programming languages that you use and the environment where the script is executed. The following procedure is a general guide to Zowe CLI scripts, but you might need to refer to third-party documentation to learn more about scripting in general.

**Follow these steps:**

1. Create a new file on your computer with the extension .sh. For example, `testScript.sh`.

    **Note:** On Linux, an extension is not required. You make the file executable by issuing the command `chmod u+x testScript`.

2. At the top of the file, specify the interpreter that your script requires. For example, type `#!/bin/sh` or `#!/bin/sh`.

    **Note:** The command terminal that you use to execute the script depends on what you specify at the top of your script. Bash scripts require a bash interpreter (bash terminal), while shell scripts can be run from any terminal.

3. Write a script using a series of Zowe CLI commands.

    **Tip:** You can incorporate commands from other command-line tools in the same script. You might choose to "pipe" the output of one command into another command.

4. From the appropriate command terminal, issue a command to execute the script. The command you use to execute script varies by operating system.

The script runs and prints the output in your terminal. You can run scripts manually, or include them in your automated testing and delivery pipelines.

### <span id="exampleOne">Example: Clean up Temporary Data Sets</span>

The script in this example lists specified data sets, then loops through the list of data sets and deletes each file. You can use a similar script to clean up temporary data sets after use.

**Note:** This script must be run from a bash terminal.

```
#!/bin/bash
set -e
# Project cleanup script - deletes temporary project data sets
# Obtain the list of temporary project data sets
dslist=$(zowe files ls ds "my.project.ds*")
# Delete each data set in the list
IFS=$'\n'
for ds in $dslist
do
     echo "Deleting Temporary Project Dataset: $ds"
     zowe files delete ds "$ds" -f
done
```

### <span id="exampleTwo">Example: Submit Jobs and Save Spool Output</span>

The script in this example submits a job, waits for the job to enter output status, and saves the spool files to local files on your computer.

**Note:** This script must be run from a bash terminal.

```
#! /bin/env bash
#submit our job
jobid=$(zowe zos-jobs submit data-set "boech02.public.cntl(iefbr14)" --rff jobid --rft string)
echo "Submitted our job, JOB ID is $jobid"
#wait for job to go to output
status="UNKNOWN"
while [[ "$status" != "OUTPUT"]]; do
    echo "Checking
    status of job $jobid" status=$(zowe zos-jobs view job-status-by-jobid "$jobid" --rff status --rft string)
    echo "Current status is $status"
    sleep 5s
done;
echo "Job completed in OUTPUT status. Final result of job: "
zowe zos-jobs view job-status-by-jobid "$jobid"
# get a list of all of the spool files for our job now that it's in output
spool_ids=$(zowe zos-jobs list spool-files-by-jobid "$jobid" --rff id --rft table)
# save each spool ID to a custom file name
while read -r id; do
     zowe zos-jobs view spool-file-by-id "$jobid" "$id" > ./${jobid}_spool_${id}.txt
     echo "Saved spool DD to ./${jobid}_spool_${id}.txt"
done <<< "$spool_ids"
```

