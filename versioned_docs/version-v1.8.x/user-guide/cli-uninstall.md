# Uninstalling Zowe CLI 

You can uninstall Zowe&trade; CLI from the desktop if you no longer need to use it.

**Important\!** The uninstall process does not delete the profiles and credentials that you created when using the product from your computer. To delete the profiles from your computer, delete them before you uninstall Zowe CLI.

The following steps describe how to list the profiles that you created, delete the profiles, and uninstall Zowe CLI.

**Follow these steps:**

1.  Open a command line window. 

    **Note:** If you do not want to delete the Zowe CLI profiles from your computer, go to Step 5.

2.  List all profiles that you created for a [Command Group](cli-usingcli#zowe-cli-command-groups) by issuing the following command:

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

5.  Uninstall Zowe CLI by issuing one of the following commands:

    - If you installed Zowe CLI from the package, issue the following command

        ```
        npm uninstall --global @brightside/core
        ```

    - If you installed Zowe CLI from the online registry, issue the following command:
    
        ```
        npm uninstall --global brightside
        ```

        The uninstall process removes all Zowe CLI installation directories and files from your computer.

6. Delete the `C:\Users\<user_name>\.brightside` directory on your computer. The directory contains the Zowe CLI log files and other miscellaneous files that were generated when you used the product.

    **Tip:** Deleting the directory does not harm your computer.

7.  If you installed Zowe CLI from the online registry, issue the following command to clear your scoped npm registry:

    ```
    npm config set @brightside:registry
    ```
