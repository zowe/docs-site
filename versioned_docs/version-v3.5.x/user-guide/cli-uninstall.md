# Uninstalling Zowe CLI and Zowe CLI plug-ins

You can uninstall Zowe&trade; CLI from the desktop if you no longer need to use it.

:::info Required roles: Systems administrator
:::

:::warning Important

The uninstall process does not delete the profiles and credentials that you created when using the product from your computer. To delete the profiles from your computer, delete them before you uninstall Zowe CLI.

:::

To list the profiles that you created, delete the profiles, and uninstall Zowe CLI.

1. Open a command line window.

    :::note
    
    If you do not want to delete the Zowe CLI profiles from your computer, proceed to Step 5.

    :::

2. List all configuration files that you created. Issue the following command:

    ```
    zowe config list --locations --root
    ```
    Example response for Windows:

    ```
    $ zowe config list --locations --root
    C:\Users\SMITH-123\.zowe\zowe.config.json
    $
    ```

    Example response for Linux and Mac OS:

    ```
    $ zowe config list --locations --root
    ~/.zowe/zowe.config.json
    $
    ```

    

3. Delete all of the configuration files that are listed. Issue the following command:

    :::tip
    
    For this command, use the results of the `zowe config list` command.

    :::

    For Windows:

        ```
        del C:\Users\SMITH-123\.zowe\zowe.config.json
        ```
    For Linux and Mac OS:

        ```
        rm ~/.zowe/zowe.config.json
        ```

4. Uninstall Zowe CLI by issuing the following command:

    ```
    npm uninstall --global @zowe/cli
    ```

    :::note 

    You might receive an `ENOENT` error when issuing this command if you installed Zowe CLI from a local package (.tgz) and the package was moved from its original location. To resolve this, add the `--force` option to the `npm uninstall --global @zowe/cli` command and to bypass any errors.

    :::

    The uninstall process removes all Zowe CLI installation directories and files from your computer.

5. Delete the `~/.zowe`  or `%homepath%\.zowe` directory on your computer. The directory contains the Zowe CLI log files and other miscellaneous files that were generated when you used the product.

    :::info
    
    Deleting the directory does not harm your computer.

    :::
