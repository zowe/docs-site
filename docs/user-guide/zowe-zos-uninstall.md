# Uninstalling Zowe from z/OS

You can uninstall Zowe&trade; from z/OS if you no longer need to use it.

**Follow these steps:**

1.  Stop the Zowe started task which stops all of its microservices by using the following command:

    ```
    /C ${ZOWE_PREFIX}${ZOWE_INSTANCE}SV
    ```
    Where ZOWE_PREFIX and ZOWE_INSTANCE are specified in your configuration (and default to ZWE and 1)
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

    If no ZWESVSTC JOB log is available, issue the `/$D PROCLIB` command at the SDSF COMMAND INPUT line and BROWSE each of the `DSNAME=some.jes.proclib` output lines in turn with ISPF option 1, until you find the first data set that contains member ZWESVSTC. Then issue the DELETE command as shown above.

3.  Remove RACF® \(or equivalent\) definitions using the following command:

    ```
    RDELETE STARTED (ZWESVSTC.*)
    SETR RACLIST(STARTED) REFRESH
    REMOVE (userid) GROUP(IZUUSER)
    ```

    where _userid_ indicates the user ID that is used to install Zowe.