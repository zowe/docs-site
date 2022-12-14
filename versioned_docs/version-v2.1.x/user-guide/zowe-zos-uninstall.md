# Uninstalling Zowe from z/OS

You can uninstall Zowe&trade; from z/OS if you no longer need to use it.  

**Follow these steps:**

1.  Stop the Zowe started task which stops all of its microservices. See [Stopping Zowe Server started task](start-zowe-zos.md)

    After Zowe has been stopped, its subcomponents will end which include API Mediation Layer and the Zowe desktop.
    
    To make sure that all Zowe subcomponents are ended, you can check either SDSF, DA (Active users) or SDSF, PS (Processes) panel for `ZWE*` address spaces. If any Zowe zombie processe is still running, cancel them either from SDSF, DA panel or from USS command line by using the following commands:

    ```
    su
    ps -elf | grep ZWESVUSR | awk '{print $2}' | xargs kill -9
    ```

2.  Delete the Zowe PROCLIB member from your system `PROCLIB` data set.

    To do this, you can issue the following TSO DELETE command from the TSO READY prompt or from ISPF option 6:

    ```
    delete 'your.zowe.proclib(zowe-proclib-member)' 
    ```

    Alternatively, you can issue the TSO DELETE command at any ISPF command line by prefixing the command with TSO:

    ```
    tso delete 'your.zowe.proclib(zowe-proclib-member)'
    ```  

    Where `zowe-proclib-member` can be either `ZWESVSTC` or `ZWESLSTC`

    To query which PROCLIB data set that Zowe PROCLIB member is put in, you can view the SDSF JOB log of Zowe started task and look for the following message:  

    ```
    IEFC001I PROCEDURE `zowe-proclib-member` WAS EXPANDED USING SYSTEM LIBRARY `your.zowe.proclib`
    ```

    If no Zowe started task JOB log is available, issue the JES2 command `$D PROCLIB` at SDSF COMMAND INPUT line and BROWSE each of the `DSNAME=some.jes.proclib` output lines in turn with ISPF option 1, until you find the first data set that contains Zowe PROCLIB member. Then, issue the DELETE command as shown above.

    After you have removed PROCLIB member from the `PROCLIB` data set it will no longer be possible to start Zowe instances.  

3.  Remove the USS folders containing the Zowe artifacts.

    Remove the USS folders containing the Zowe runtime, the Zowe keystore-directory, and the Zowe instance directories.

4.  Reverse the z/OS security and environment updates from `ZWESECUR` job.

    As part of Zowe installation, the z/OS environment is altered to allow Zowe to operate. See [Configuring the z/OS System for Zowe](configure-zos-system.md#configuring-the-z-os-system-for-zowe) for details. You may leave the environment configured which allows you to install and operate a Zowe instance at a point in the future, or you may undo the configuration steps to your z/OS environment.  Zowe provides a JCL member `ZWENOSEC` that contains the commands needed to reset a z/OS environment and undo the steps that were performed in `ZWESECUR` when the environment was configured for Zowe operation.

5.  Reverse the z/OS key ring updates from `ZWEKRING` job.

    The `ZWEKRING` JCL member provided in the `SZWESAMP` member can be used to create a key ring that contains the Zowe certificate(s) and certificate authority. If you want to remove the key ring and its certificate(s) and certificate authority, you can use the JCL member `ZWENOKYR` that contains the undo steps to reverse the configuration performed in `ZWEKRING`.