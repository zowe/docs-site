# Troubleshooting z/OS Startup

The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior starting Zowe's `ZWESVSTC` started task

## Unable to create BPXAS instances

**Symptom:**

When you start `ZWESVSTC` started task, either by running the `zowe-start.sh` script or by launching the started task directly, you encouter the error in the log

```
<ROOT_DIR>/bin/internal/run-zowe.sh 1: FSUM7726 cannot fork: reason code  = 094500f7: EDC5112I Resource temporarily unavailable.
```

You will also encounter the following messages in the SYSLOG

```
0290  S ZWESVSTC                                                               
0281  $HASP100 ZWESVSTC ON STCINRDR                                            
0290  IEF695I START ZWESVSTC WITH JOBNAME ZWESVSTC IS ASSIGNED TO USER         
      ZWESVUSR, GROUP ZWEADMIN                                                 
0281  $HASP373 ZWESVSTC STARTED                                                
0090  IEA602I ADDRESS SPACE CREATE FAILED.  MAXUSERS WOULD HAVE BEEN EXCEEDED  
0290  BPXP005I A FORK OR SPAWN ERROR WAS ENCOUNTERED.  RETURN CODE 00000070    
      REASON CODE 094500F7                                                     
0090  IEA602I ADDRESS SPACE CREATE FAILED.  MAXUSERS WOULD HAVE BEEN EXCEEDED  
0090  IEA602I ADDRESS SPACE CREATE FAILED.  MAXUSERS WOULD HAVE BEEN EXCEEDED  
0090  IEA602I ADDRESS SPACE CREATE FAILED.  MAXUSERS WOULD HAVE BEEN EXCEEDED  
```


**Solution:**

The problem is because the maximum number of `BPXAS` instances have been reached.  

This may be because when the Zowe instance directory was created it was generated in the same location as the Zowe root directory.  The Zowe instance directory is created using the script `<ROOT_DIR>/bin/zowe-configure-instance.sh -c <PATH_TO_INSTANCE_DIR>, see [Creating an instance directory](../user-guide/configure-instance-directory.html#creating-an-instance-directory). The Zowe runtime directory is replaced when new PTFs are applied and should be considered as a read only set of files. Zowe instance directories are designed to live outside the directory structure and are used to start a Zowe runtime.  

This problem will only occur with early Zowe drivers and has been resolved with 1.10 where the `zowe-configure-instance.sh` script will error if it detects the `-c` argument for the install directory location is an existeing Zowe runtime directory.  


