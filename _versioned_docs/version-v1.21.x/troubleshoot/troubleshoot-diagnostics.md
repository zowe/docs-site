# Capturing diagnostics to assist problem determination 

To help Zowe&trade; Open Community effectively troubleshoot Zowe, a shell script `zowe-support.sh` captures diagnostics data that is required for successful problem determination. By running the shell script on your z/OS environment, you receive a set of output files, which contain all relevant diagnostics data necessary to start a troubleshooting process. You can find the `zowe-support.sh` script in the `<INSTANCE_DIRECTORY>/bin` directory.  To determine the `<INSTANCE_DIRECTORY>` for a Zowe started task, open the `JESJCL` step in the `ZWESVSTC` task and navigate to the line including `//STARTING EXEC ZWESVSTC,INSTANCE=`.  The `<INSTANCE_DIRECTORY>/bin/zowe-support.sh` script captures the following data:

 - Started task output
    - Zowe server started task
    - Zowe Cross Memory started task (STC)
        - Zowe CLI or REXX (TSO output command, STATUS, capture all)
    
    **Note:** You will need to install the TSO exit IKJEFF53 to permit the TSO OUTPUT command to collect the Zowe started task output.  If this exit is not enabled, you will see an error message when you run `zowe-support.sh`:
    
    ```
    IKJ56328I JOB jobname REJECTED - JOBNAME MUST BE YOUR USERID OR MUST START WITH YOUR USERID
    ```
    For how to correct this error, see the [TSO/E installation exit IKJEFF53](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.2.0/com.ibm.zos.v2r2.e0ze100/ikjeff53.htm) topic in IBM Knowledge Center.  
    The above is the authoritative description, and will be the first to reflect changes.  To assist you, a summary of the situation and actions you could take to allow TSO OUTPUT to work in your installation are provided in [IKJ56328I JOB job name REJECTED](#ikj56328i-job-job-name-rejected).
    
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

## Running the diagnostic support script

To run the `zowe-support.sh` script, issue the following commands:
```
<INSTANCE_DIRECTORY>/bin/zowe-support.sh [-l <install_logs_directory>]
```
where the `-l` optional parameter points to the custom directory supplied during the installation and setup scripts (zowe-install.sh, zowe-setup-certificates.sh, zowe-install-xmem.sh, zowe-install-proc.sh) if applicable.

## Problems that may occur running the diagnostic script

### IKJ56328I JOB job name REJECTED

**Audience:** Zowe users or the personnel who collects support logs.  These individuals should also inform their z/OS system programmer.  

The `zowe-support.sh` script collects logs that your support team needs to assist you with problem determination.  One of the logs it collects is the JES job log for Zowe tasks.  The `zowe-support.sh` script uses the TSO OUTPUT command to collect these logs.  On an unmodified z/OS system, the TSO OUTPUT command is restricted to jobs starting with your user ID, and the Zowe tasks will typically have a different job name.  You will know that the TSO OUTPUT command is restricted if you see the following message when you issue the TSO OUTPUT command for a job whose job name does not start with your user ID.   

```
IKJ56328I JOB job name REJECTED - JOB NAME MUST BE YOUR USERID OR MUST START WITH YOUR USERID
```

Job name filtering is controlled by an exit that is called by the TSO OUTPUT command.  The exit is named IKJEFF53.  IBM provides the source code for a replacement exit that can remove this restriction in SYS1.SAMPLIB(IKJEFF53) which you can tailor and use instead.  Review this exit and if it meets your needs, assemble it and replace it in your LINKLIB concatenation.  

**Warning:**  You are strongly advised to take great care before attempting to modify LINKLIB directly. You could easily corrupt your entire z/OS system and require an IPL or reinstallation of z/OS.  Consult your system programmer before you continue.  You should also read the TSO/E installation exit IKJEFF53 topic in the IBM Knowledge Center.  

The original exit load module has the following attributes:

```
DSLIST            SYS1.LINKLIB                          
Command ===>                                                  Scroll ===> CSR 
           Name     Prompt        Alias-of     Size      TTR     AC   AM   RM 
_________ IKJEFF53                           000002A0   03A91D   00    24   24 
```
The replacement exit load module has the following attributes when assembled and linked:

```
DSLIST            SYS1.LINKLIB                          
Command ===>                                                  Scroll ===> CSR 
           Name     Prompt        Alias-of     Size      TTR     AC   AM   RM 
_________ IKJEFF53                           00000380   0CF015   00    24   24 
```
It is safer to add a module to a private dataset further down the LINKLIST concatenation than to modify SYS1.LINKLIB directly.  You can display the LINKLIST with this command at the operator console
```
D PROG,LNKLST
```
The private dataset or the exit itself does not have to be APF-authorized.

Whichever library you choose, rename IKJEFF53 in SYS1.LINKLIB  (or its first occurrence in the LINKLIST concatenation) and add the assembled load module IKJEFF53 to your chosen library.  

To activate your changes, refresh the link-list lookaside list with this command
```
F LLA,REFRESH    
``` 
Now your TSO OUTPUT command will work as described in SYS1.SAMPLIB(IKJEFF53). 

Note that this change will affect all users of the TSO OUTPUT command on LPARS sharing the SYS1.LINKLIB dataset.  It is not limited to Zowe users.  Consult your system programmer to ensure that this change does not impact your site rules about the OUTPUT command, because the specified jobs will be PURGED from the JES output queue if this exit is implemented as described above. 
