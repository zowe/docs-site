# Writing scripts

You can combine multiple Zowe CLI commands in bash or shell scripts to automate actions on z/OS. Implement scripts to enhance your development workflow, automate repetitive test or build tasks, and orchestrate mainframe actions from continuous integration/continuous deployment (CI/CD) tools such as Jenkins or TravisCI.

:::note

The type of script that you write depends on the programming languages that you use and the environment where the script is executed. The following is a general guide to Zowe CLI scripts. Refer to third-party documentation to learn more about scripting in general.

:::

To write a script:

1. Create a new file on your computer with the extension .sh. For example, `testScript.sh`.

    :::note
    
    On Mac and Linux, an extension is not required. To make the file executable, issue the command `chmod u+x testScript`.

    :::
2. For Mac and Linux only: At the top of the file, specify the interpreter that your script requires. For example, type `#!/bin/sh` or `#!/bin/bash`.

    :::note 
    
    The command terminal that you use to execute the script depends on what you specify at the top of your script. Bash scripts require a bash interpreter (bash terminal), while shell scripts can be run from any terminal.

    :::
3. Write a script using a series of Zowe CLI commands.

    :::tip
    
    You can incorporate commands from other command-line tools in the same script. You might choose to "pipe" the output of one command into another command.

    :::
4. From the appropriate command terminal, issue a command to execute the script. The command you use to execute script varies by operating system.

The script runs and prints the output in your terminal. You can run scripts manually, or include them in your automated testing and delivery pipelines.

### Sample script library

Refer to the [Zowe CLI Sample Scripts repository](https://github.com/zowe/zowe-cli-sample-scripts) for examples that cover a wide range of scripting languages and use cases.

### <span id="exampleOne">Example: Clean up Temporary Data Sets</span>

The script in this example lists specified data sets, then loops through the list of data sets and deletes each file. You can use a similar script to clean up temporary data sets after use.

:::note

Run this script from a bash terminal.

:::

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

:::note

Run this script from a bash terminal.

:::

```
#! /bin/env bash
#submit our job
jobid=$(zowe zos-jobs submit data-set "ibmuser.public.cntl(iefbr14)" --rff jobid --rft string)
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
