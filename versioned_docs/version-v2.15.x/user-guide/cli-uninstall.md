# Uninstalling Zowe CLI

You can uninstall Zowe&trade; CLI from the desktop if you no longer need to use it.

**Important\!** The uninstall process does not delete the profiles and credentials that you created when using the product from your computer. To delete the profiles from your computer, delete them before you uninstall Zowe CLI.

The following steps describe how to list the profiles that you created, delete the profiles, and uninstall Zowe CLI.

1. Open a command-line window.

    **Note:** If you do not want to delete the Zowe CLI profiles from your computer, go to Step 5.

2. List all configuration files that you created. Issue the following command:

    ```
    zowe config list --locations --root
    ```
    **Example:**

    ```
    $ zowe config list --locations --root
    C:\Users\SMITH-123\.zowe\zowe.config.json
    $
    ```

3. Delete all of the configuration files that are listed. Issue the following command:

    **Tip:** For this command, use the results of the `zowe config list`
    command.

    ```
    rm C:\Users\SMITH-123\.zowe\zowe.config.json
    ```

    <!-- **Note:** When you issue the `delete` command, it deletes the
    specified profile and its credentials from the credential vault in your computer's operating system. -->

4. Uninstall Zowe CLI by issuing the following command:

    ```
    npm uninstall --global @zowe/cli
    ```

    **Note:** You might receive an `ENOENT` error when issuing this command if you installed Zowe CLI from a local package (.tgz) and the package was moved from its original location. In the event that you receive the error, open an issue in the Zowe CLI GitHub repository.

    The uninstall process removes all Zowe CLI installation directories and files from your computer.

5. Delete the `~/.zowe`  or `%homepath%\.zowe` directory on your computer. The directory contains the Zowe CLI log files and other miscellaneous files that were generated when you used the product.

    **Tip:** Deleting the directory does not harm your computer.