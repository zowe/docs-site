# Troubleshooting Zowe using Diagnostics Data
<!-- TODO -->
As a Zowe user, you can easily get access to diagnostics data that helps you troubleshoot issues. By running the UNIX script on z/OS, you receive a set of output files, which contain data necessary for successful troubleshooting. The output is compressed in a .pax.Z archive. The script captures the following set of diagnostics data:

 - Started task output
    - Zowe server started task
    - Zowe Cross Memory started task (STC)
        - Zowe CLI or REXX (TSO output command, STATUS, capture all)
 - Configuration parameters
     - Installation log
     - Scripts that are called from [run-zowe.sh] (link to the repo?)
     <!-- TODO, Do I have to insert a link to the .sh file? -->
 - Versions:
    - manifest.json
    - z/OS version
    - java version
    - node version
 - Additional logs
    - zowe app server 
    - zlux-app-server
 - Process list with CPU info
 - /bin/ps-A -opid,jobname,time,args grep $ (zowe_STC-prefix)
 - Certificates diagnostics - in install.log 

<!-- The script that will gather the diagnoistics is https://github.gwd.broadcom.net/ad670553/shell-scrips/blob/master/zowe-support.sh  -->

## Troubleshoot Zowe

Use the script to troubleshoot Zowe.

**Follow these steps:**

1. Run the `zowe-support.sh` script.
2. Send the output file to Zowe support team.
<!-- TODO What is Zowe support team? Slack Channel? Do we provide a link to some support channel here? -->
3. Troubleshoot Zowe using help from the Zowe support team.

You successfully troubleshooted Zowe.
