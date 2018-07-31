# Uninstalling Project Zowe

You can uninstall Project Zowe if you no longer need to use the product. Follow these procedures to uninstall the components of Project Zowe.

## Uninstalling zLUX

1. The zLUX server is run under the ZOESVR started task, so it should terminate when ZOESVR is stopped.  If it does not, use one of the following standard process signals to stop the server:

    - SIGHUP
    - SIGTERM
    - SIGKILL

2. Delete the original folders (except in the case where you have customized the installation to point to folders other than the original folders).

## Uninstalling explorer server

To uninstall the explorer server, take the following steps:

1.  Stop your Explorer Liberty server by running the following operator command:

    ```
    C ZOESVR
    ```

2.  Delete the ZOESVR member from your system PROCLIB data set.
3.  Remove RACF® \(or equivalent\) definitions with the following command:

    ```
    RDELETE STARTED (ZOESVR.*)
    SETR RACLIST(STARTED) REFRESH
    REMOVE (userid) GROUP(IZUUSER)
    ```

4.  Delete the z/OS® UNIX™ System Services explorer server directory and files from the explorer server installation directory by issuing the following command:

    ```sh
    rm -R /var/atlas #*Atlas Installation Directory*
    ```

    **Notes:**

    -   You might need super user authority to run this command.
    -   You must identify the explorer server installation directory correctly. Running a recursive remove command with the wrong directory name might delete critical files.

## Uninstalling Zowe CLI
You can uninstall Zowe CLI when you no longer want to use the product.

**Important\!** The uninstall process does not delete the  profiles and credentials that you created when using the product from your PC. To delete the profiles from your PC, delete them before you uninstall Zowe CLI.

The following steps describe how to list the profiles that you created, delete the profiles, and uninstall Zowe CLI.

**Follow these steps:**

1.  Open a command line window. 

    **Note:** If you do not want to delete the Zowe CLI profiles from your PC, go to Step 5.

2.  List all profiles that you created for a [Command Group](cli-commandgroups.md) by issuing the following command:

    ```
     bright profiles list <profileType>
    ```
    **Example:**

    ```
    $ bright profiles list zosmf
    The following profiles were found for the module zosmf:
    'SMITH-123' (DEFAULT)
    smith-123@SMITH-123-W7 C:\Users\SMITH-123
    $
    ```

3.  Delete all of the profiles that are listed for the command group by issuing the following command: 

    **Tip:** For this command, use the results of the `list`
    command.    

    **Note:** When you issue the `delete` command, it deletes the
    specified profile and its credentials from the credential vault in your PC's operating system.

    ```
    bright profiles delete <profileType> <profileName> --force  
    ```
      **Example:**

    ```
    bright profiles delete zosmf SMITH-123 --force
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

        The uninstall process removes all Zowe CLI installation directories and files from your PC.

6. Delete the following directory on your PC. The directory contains the Zowe CLI log files and other miscellaneous files that were generated when you used the product.

    **Tip:** Deleting the `C:\Users\<user_name>\.brightside`  directory does not harm your PC.

1.  If you installed Zowe CLI from the online registry, issue the following command to clear your scoped npm registry:

    ```
    npm config set @brightside:registry
    ```

**More Information:**

  - [Installing Zowe CLI](cli-installcli.md)


## Uninstalling API Mediation Layer

You can uninstall API Mediation Layer when you no longer want to use the product.

**Note:** Be aware of the following considerations:

-   You might need super-user authority to run this command.
-   You must identify the API Mediation installation directory correctly. Running a recursive remove command with the incorrect directory name can delete critical files.

**Follow these steps:**

1.  Stop your API Mediation Layer services using the following command:

    ```
    C ZOESVR
    ```

2.  Delete the `ZOESVR` member from your system `PROCLIB` data set.
3.  Remove RACF® \(or equivalent\) definitions using the following command:

    ```
    RDELETE STARTED (ZOESVR.*)
    SETR RACLIST(STARTED) REFRESH
    REMOVE (userid) GROUP(IZUUSER)
    ```

4.  Delete the z/OS® UNIX™ System Services API Mediation Layer directory and files from the API Mediation Layer installation directory using the following command:

    ```sh
    rm -R /var/zoe_install_directory/api-mediation #*Zoe Installation Directory*
    ```
    
