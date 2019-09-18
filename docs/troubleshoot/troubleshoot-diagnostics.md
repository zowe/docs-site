# Troubleshooting Zowe through Zowe Open Community

To help Zowe Open Community effectively troubleshoot Zowe, we introduce a shell script that captures diagnostics data that is required for successful troubleshooting. By running the shell script on your z/OS environment, you receive a set of output files, which contain all relevant diagnostics data necessary to start a troubleshooting process. You can find the `zowe-support.sh` script in the `ZOWEDIR/scripts` folder with the rest of Zowe scripts. The script captures the following data:

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
 - Process list with CPU info with the following data points: 
   - Running command and all arguments of the command
   - Real time that has elapsed since the process started
   - Job name
   - Process ID as a decimal number
   - Parent process ID as a decimal number
   - Processor time that the process used
   - Process user ID (in a form of user name if possible, or as a decimal user ID if not possible)

## Contact Zowe Open Community to Troubleshoot Zowe

Contact Zowe Open Community to address and troubleshoot a Zowe issue.

**Follow these steps:**

1. Contact Open Zowe Community in [Slack](https://app.slack.com/client/T1BAJVCTY/C1BAK03LN) to address your issues.

2. Get instructions from the Community on whether you need to run the  script that collects diagnostics data. If you do not need to run the script, the Community will proceed with troubleshooting.

3. If the Community instructs you to run the `zowe-support.sh` script, issue the following commands:
   ```
   cd $ZOWE_ROOT_DIR/scripts
   ./zowe-support.sh
   ```
4. Send the .pax.Z output file to Community members for further troubleshooting.

Community members will help you troubleshoot an issue.
