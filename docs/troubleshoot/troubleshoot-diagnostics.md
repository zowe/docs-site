# Troubleshooting Zowe using Diagnostics Data

As a Zowe user, you can get access to diagnostics data that helps to troubleshoot Zowe issues. By running the UNIX script on z/OS, you receive a set of output files, which contain diagnostics data necessary for successful troubleshooting of Zowe. The script is located in the folder with the rest of scripts, and the output file the diagnostics data is compressed in a .pax.Z archive. The script captures the following set of diagnostics data:

 - Started task output
    - Zowe server started task
    - Zowe Cross Memory started task (STC)
        - Zowe CLI or REXX (TSO output command, STATUS, capture all)
 - Configuration parameters
     - Installation log
     - Scripts that are called from `run-zowe.sh`
 - Versions:
    - manifest.json
    - z/OS version
    - Java version
    - Node version
 - Additional logs
    - Zowe app server 
    - zLUX app server
 - Process list with CPU info
 - /bin/ps-A -opid,jobname,time,args grep $ (zowe_STC-prefix)
 - Certificates diagnostics - in install.log 

## Troubleshoot Zowe

Use the `zowe-support.sh` script to troubleshoot Zowe with the help of Zowe support team.

**Follow these steps:**

1. Run the script by issuing the following commands:
   ```
   cd $ZOWE_ROOT_DIR/scripts
   ./zowe-support.sh
   ```
2. Send the .pax.Z output file to Zowe support team.
3. Let the Zowe support team help you Troubleshoot Zowe.

You successfully troubleshooted Zowe.