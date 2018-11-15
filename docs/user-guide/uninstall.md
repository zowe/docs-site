# Uninstalling Zowe

You can uninstall Zowe if you no longer need to use it. Follow these procedures to uninstall each Zowe component.

- [Uninstalling the Zowe Application Framework](#uninstalling-the-zowe-application-framework)
- [Uninstalling explorer server](#uninstalling-explorer-server)
- [Uninstalling API Mediation Layer](#uninstalling-api-mediation-layer)
- [Uninstalling Zowe CLI](#uninstalling-zowe-cli)

## Uninstalling the Zowe Application Framework

**Follow these steps:**

1. The Zowe Application Server (`zlux-server`) runs under the ZOWESVR started task, so it should terminate when ZOWESVR is stopped.  If it does not, use one of the following standard process signals to stop the server:

    - `SIGHUP`
    - `SIGTERM`
    - `SIGKILL`

2. Delete or overwrite the original directories. If you modified the `zluxserver.json` file so that it points to directories other than the default directories, do not delete or overwrite those directories.

## Uninstalling explorer server

**Follow these steps:**

1.  Stop your Explorer Liberty server by running the following operator command:

    ```
    C ZOWESVR
    ```

2.  Delete the ZOWESVR member from your system PROCLIB data set.

    To do this, you can issue the following TSO DELETE command from the TSO READY prompt or from ISPF option 6:

    ```
    delete 'your.zowe.proclib(zowesvr)'
    ```

    Alternatively, you can issue the TSO DELETE command at any ISPF command line by prefixing the command with TSO:

    ```
    tso delete 'your.zowe.proclib(zowesvr)'
    ```

    To query which PROCLIB data set that ZOWESVR is put in, you can view the SDSF JOB log of ZOWESVR and look for the following message:  

    ```
    IEFC001I PROCEDURE ZOWESVR WAS EXPANDED USING SYSTEM LIBRARY your.zowe.proclib
    ```

    If no ZOWESVR JOB log is available, issue the `/$D PROCLIB` command at the SDSF COMMAND INPUT line and BROWSE each of the `DSNAME=some.jes.proclib` output lines in turn with ISPF option 1, until you find the first data set that contains member ZOWESVR. Then issue the DELETE command as shown above.

3.  Remove RACF® \(or equivalent\) definitions with the following command:

    ```
    RDELETE STARTED (ZOWESVR.*)
    SETR RACLIST(STARTED) REFRESH
    REMOVE (userid) GROUP(IZUUSER)
    ```

    where _userid_ indicates the user ID that is used to install Zowe.

4.  Delete the z/OS® UNIX™ System Services explorer server directory and files from the explorer server installation directory by issuing the following command:

    ```sh
    rm -R /var/zowe #*Explorer Server Installation Directory*
    ```

    Or

    ```sh
    rm -R /var/zowe/<v.r.m> #*Explorer Server Installation Directory*
    ```

    Where _<v.r.m>_ indicates the package version such as `0.9.0`.  

    **Notes:**

    -   You might need super user authority to run this command.
    -   You must identify the explorer server installation directory correctly. Running a recursive remove command with the wrong directory name might delete critical files.

## Uninstalling API Mediation Layer

**Note:** Be aware of the following considerations:

-   You might need super-user authority to run this command.
-   You must identify the API Mediation installation directory correctly. Running a recursive remove command with the incorrect directory name can delete critical files.

**Follow these steps:**

1.  Stop your API Mediation Layer services using the following command:

    ```
    C ZOWESVR
    ```

2.  Delete the `ZOWESVR` member from your system `PROCLIB` data set.

    To do this, you can issue the following TSO DELETE command from the TSO READY prompt or from ISPF option 6:

    ```
    delete 'your.zowe.proclib(zowesvr)'
    ```

    Alternatively, you can issue the TSO DELETE command at any ISPF command line by prefixing the command with TSO:

    ```
    tso delete 'your.zowe.proclib(zowesvr)'
    ```

    To query which PROCLIB data set that ZOWESVR is put in, you can view the SDSF JOB log of ZOWESVR and look for the following message:  

    ```
    IEFC001I PROCEDURE ZOWESVR WAS EXPANDED USING SYSTEM LIBRARY your.zowe.proclib
    ```

    If no ZOWESVR JOB log is available, issue the `/$D PROCLIB` command at the SDSF COMMAND INPUT line and BROWSE each of the `DSNAME=some.jes.proclib` output lines in turn with ISPF option 1, until you find the first data set that contains member ZOWESVR. Then issue the DELETE command as shown above.

3.  Remove RACF® \(or equivalent\) definitions using the following command:

    ```
    RDELETE STARTED (ZOWESVR.*)
    SETR RACLIST(STARTED) REFRESH
    REMOVE (userid) GROUP(IZUUSER)
    ```

    where _userid_ indicates the user ID that is used to install Zowe.

4.  Delete the z/OS® UNIX™ System Services API Mediation Layer directory and files from the API Mediation Layer installation directory using the following command:

    ```sh
    rm -R /var/zowe_install_directory/api-mediation #*Zowe Installation Directory*
    ```

## Uninstalling Zowe CLI

**Important\!** The uninstall process does not delete the profiles and credentials that you created when using the product from your computer. To delete the profiles from your computer, delete them before you uninstall Zowe CLI.

The following steps describe how to list the profiles that you created, delete the profiles, and uninstall Zowe CLI.

**Follow these steps:**

1.  Open a command line window. 

    **Note:** If you do not want to delete the Zowe CLI profiles from your computer, go to Step 5.

2.  List all profiles that you created for a [Command Group](cli-usingcli.html#zowe-cli-command-groups) by issuing the following command:

    ```
     zowe profiles list <profileType>
    ```
    **Example:**

    ```
    $ zowe profiles list zosmf
    The following profiles were found for the module zosmf:
    'SMITH-123' (DEFAULT)
    smith-123@SMITH-123-W7 C:\Users\SMITH-123
    $
    ```

3.  Delete all of the profiles that are listed for the command group by issuing the following command: 

    **Tip:** For this command, use the results of the `list`
    command.    

    **Note:** When you issue the `delete` command, it deletes the
    specified profile and its credentials from the credential vault in your computer's operating system.

    ```
    zowe profiles delete <profileType> <profileName> --force  
    ```
      **Example:**

    ```
    zowe profiles delete zosmf SMITH-123 --force
    ```

4.  Repeat Steps 2 and 3 for all Zowe CLI command groups and profiles.

5.  Uninstall Zowe CLI by issuing one of the following commands:

    - If you installed Zowe CLI from the package, issue the following command
        ```
        npm uninstall --global @brightside/core
        ```

    - If you installed Zowe CLI from the online registry, issue the following command:
        ```
        npm uninstall --global brightside
        ```

        The uninstall process removes all Zowe CLI installation directories and files from your computer.

6. Delete the `C:\Users\<user_name>\.brightside` directory on your computer. The directory contains the Zowe CLI log files and other miscellaneous files that were generated when you used the product.

    **Tip:** Deleting the directory does not harm your computer.

7.  If you installed Zowe CLI from the online registry, issue the following command to clear your scoped npm registry:

    ```
    npm config set @brightside:registry
    ```
