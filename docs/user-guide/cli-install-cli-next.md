# Install the Zowe CLI @next version

<Badge text="Technical Preview"/> The Zowe CLI @next release is a technical preview. Technical previews are for testing only and are not ready for production. Your feedback is valued and appreciated.

Install the Zowe CLI `@next` version from the online registry. You can follow this procedure for a first-time installation, or to update a currently installed version.

***Prerequisites***
*  Meet the [software requirements for Zowe CLI](https://docs.zowe.org/stable/user-guide/systemrequirements.html#zowe-cli-requirements).
*  Meet the [software requirements for each plug-in](https://docs.zowe.org/stable/user-guide/cli-swreqplugins.html#software-requirements-for-zowe-cli-plug-ins).

***Follow these steps:***

1. To install or update the core CLI, open a command-line window:

   ```
   npm install -g @zowe/cli@next
   ```
   Zowe CLI is installed.


2. (Optional) Check [npmjs.com](https://www.npmjs.com/) for any Zowe plug-ins that have an `@next` version available. If an `@next` version is available, you can install it: 

    ```
    zowe plugins install @zowe/<plugin-name>@next
    ```
    
    If no `@next` version is available,  install the `@latest` version of the plug-in:

    ```
    zowe plugins install @zowe/<plugin-name>@latest
    ```
    
    Optional plug-ins are installed.

3. Issue the command:

   ```
   zowe scs revert --force
   ```

4. If you have the Secure Credential Store plug-in installed, uninstall it now to avoid unexpected behavior:

    ```
    zowe plugins uninstall @zowe/secure-credential-store-for-zowe-cli
    ```

    **Note:** If you have a previous instance of Zowe CLI installed, your current configuration files are ignored if zowe.config.json is found globally, at the project level, or up the directory structure.

5. Save the contents of the `/profiles` directory to another location on your computer so that you can reference or restore the profiles later.

     **Important!** Prior to deleting the contents of the `/profiles` directory, take note of any mainframe service details that you need.

6. Delete the following files from your local `.zowe/` directory:
   - `.zowe/settings/imperative.json`
   - `.zowe/profiles`
 
You can now try out the [technical preview features](cli-development-roadmap-next.md).