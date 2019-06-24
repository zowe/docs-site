# Troubleshooting Zowe through the Support Team

To ensure that the Zowe Support Team can effectively troubleshoot Zowe, the Brightside team introduces a script that captures the diagnostics data that is required for successful troubleshooting. By running the UNIX script on your z/OS environment, you receive a set of output files, which contain all relevant diagnostics data necessary to start a troubleshooting process. You can find the script in the folder with the rest of Zowe scripts. The script captures the following data:

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

## Contact the Support Team to Troubleshoot Zowe

Contact the Zowe Support Team to address and troubleshoot a Zowe issue.

**Follow these steps:**

1. Contact the Zowe Support Team at the [Broadcom Case Management System](link.here) to address your issues.

2. Get instructions from the Support Team on whether you need to run the  script that collects diagnostics data. 

3. If the Support team instructs you, run the `zowe-support.sh` script by issuing the following commands:
   ```
   cd $ZOWE_ROOT_DIR/scripts
   ./zowe-support.sh
   ```
4. Send the .pax.Z output file to Zowe Support Team for further troubleshooting.

The Zowe Support Team then starts to troubleshoot your issue, using the data you provided. 