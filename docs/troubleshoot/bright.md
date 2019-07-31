# Troubleshooting Zowe through the Support Team

To help the Support Team effectively troubleshoot Zowe, Broadcom introduces a script that captures the diagnostics data that is required for successful troubleshooting. By running the UNIX script on your z/OS environment, you receive a set of output files, which contain all relevant diagnostics data necessary to start a troubleshooting process. You can find the `zowe-support.sh` script in the `ZOWEDIR/scripts` folder with the rest of Zowe scripts. The script captures the following data:

 - Started task output
    - Zowe server started task
    - Zowe Cross Memory started task (STC)
        - Zowe CLI or REXX (TSO output command, STATUS, capture all)
- Zowe Install log
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
    - /bin/ps -A -o pid,jobname,time,args grep $ (zowe_STC-prefix)
    - extra CPU data (will be added)

## Contact the Support Team to Troubleshoot Zowe

Contact the Support Team to address and troubleshoot a Zowe issue.

**Follow these steps:**

1. Reach to the Broadcom Support Team in [Case Management System](https://broadcomcsm.wolkenservicedesk.com/wolken/esd/dashboard) to address your issues.

2. Get instructions from the Support Team on whether you need to run the  script that collects diagnostics data. If you do not need to run the script, the Support Team will proceed with troubleshooting.

3. If the Support Team instructs you to run the `zowe-support.sh` script, issue the following commands:
   ```
   cd $ZOWE_ROOT_DIR/scripts
   ./zowe-support.sh
   ```
4. Send the .pax.Z output file to Support Team for further troubleshooting.

The Support Team starts to troubleshoot your issue.