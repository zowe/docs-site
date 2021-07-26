# Uninstalling Zowe from z/OS

You can uninstall Zowe&trade; from z/OS if you no longer need to use it.  

**Follow these steps:**

1.  Stop the Zowe started task which stops all of its microservices by using the following command:

    ```
    /C ${ZOWE_PREFIX}${ZOWE_INSTANCE}SV
    ```
    Where ZOWE_PREFIX and ZOWE_INSTANCE are specified in your configuration (and default to ZWE and 1), see [Zowe instance directory](configure-instance-directory.md#address-space-names)

    Aftter Zowe has been stopped its subcomponents will end which include the API Mediation Layer and the Zowe desktop.  

2.  Delete the `ZWESVSTC` member from your system `PROCLIB` data set.

    To do this, you can issue the following TSO DELETE command from the TSO READY prompt or from ISPF option 6:

    ```
    delete 'your.zowe.proclib(zwesvstc)'
    ```

    Alternatively, you can issue the TSO DELETE command at any ISPF command line by prefixing the command with TSO:

    ```
    tso delete 'your.zowe.proclib(zwesvstc)'
    ```

    To query which PROCLIB data set that ZWESVSTC is put in, you can view the SDSF JOB log of ZWESVSTC and look for the following message:  

    ```
    IEFC001I PROCEDURE ZWESVSTC WAS EXPANDED USING SYSTEM LIBRARY your.zowe.proclib
    ```

    If no ZWESVSTC JOB log is available, issue the `/$D PROCLIB` command at the SDSF COMMAND INPUT line and BROWSE each of the `DSNAME=some.jes.proclib` output lines in turn with ISPF option 1, until you find the first data set that contains member ZWESVSTC. Then, issue the DELETE command as shown above.

    After you have removed `ZWESVSTC` from the `PROCLIB` data set it will no longer be possible to start Zowe instances.  

3.  Remove the USS folders containing the Zowe artifacts

    Remove the USS folders containing the Zowe runtime,  the Zowe keystore-directory,  and the Zowe instance directories.

4.  Reverse the z/OS security and environment updates from `ZWESECUR` job

    As part of installing Zowe the z/OS environment will have been altered to allow Zowe to operate, see [Configuring the z/OS System for Zowe](configure-zos-system.md#configuring-the-z/os-system-for-zowe).  You may leave the environment configured which allows you to install and operate a Zowe instance at a point in the future, or you may undo the configuration steps to your z/OS environment.  A JCL member `ZWENOSEC` is provided with Zowe that contains the commands needed to reset a z/OS environment and undo the steps that were performed in `ZWESECUR` when the environment was configured for Zowe operation.   