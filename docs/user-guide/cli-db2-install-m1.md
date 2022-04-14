# MacOS M1 processor installation

The IBM ODBC DB2 driver functions only on MacOS x86_64 architecture. 

To let you store your DB2 plug-in credentials securely in the credential manager of your MacOS operating system, configure the MacOS M1 processor to behave as MacOS x86_64 architecture. Use the following steps to perform the configuration.

1. Install Rosetta. Open a terminal window and issue the following command:

    ```
    softwareupdate --install-rosetta --agree-to-license
    ```
2.  Modify `~/.zshrc` to contain the following syntax:
    
    ```
    alias arm="env /usr/bin/arch -arm64 /bin/zsh --login"
    alias intel="env /usr/bin/arch -x86_64 /bin/zsh --login"
    ```

3. Source the new file by issuing the following command:
    
    ```
    ~/.zshrc
    ```

4. Switch to the x86_64 architecture by issuing the following command:

    ```
    intel
    ```

5. Reinstall Zowe CLI.
6. After you complete these steps, do one of the following:

    - If you are installing the plug-in from an online registry, continue with Step 2 in [Install from an online registry](.//cli-db2plugin.md#installing-from-an-online-registry).

    - If you are installing the plug-in from a local package, continue with Step 2 in [Installing from a local package](../user-guide/cli-db2plugin.md#installing-from-a-local-package). 

**Important!** You must issue the `intel` command to help ensure that Zowe CLI, Secure Credential Storage and the DB2 plug-in function properly on x86_64 architecture.