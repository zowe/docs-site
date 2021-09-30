# Install the Zowe CLI @next version

<Badge text="Technical Preview"/> The Zowe CLI @next release is a technical preview. Technical previews are for testing only and are not ready for production. Your feedback is valued and appreciated.

***Prerequisites***
*  Meet the [software requirements](https://docs.zowe.org/stable/user-guide/systemrequirements.html#zowe-cli-requirements) for Zowe CLI.
*  Meet the [software requirements](https://docs.zowe.org/stable/user-guide/cli-swreqplugins.html#software-requirements-for-zowe-cli-plug-ins) for each plug-in.

**Note:** Linux users may need to prepend `sudo` to `npm` commands. For more information, see [Troubleshooting Zowe CLI](../troubleshoot/cli/troubleshoot-cli.md).

Install the Zowe CLI `@next` version from the online npm registry or download it from the Zowe Downloads site:
- [Install Zowe CLI from npm](#install-zowe-cli-from-npm)
- [Install Zowe CLI from a download](#install-zowe-cli-from-a-download)

## Install Zowe CLI from npm

**Note:** This method does not install the zowex native executable required to run [Zowe daemon mode](cli-using-daemon-mode.md). To install the zowex native executable, see [Install Zowe CLI from a download](#install-zowe-cli-from-a-download).

**Follow these steps:**

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
    zowe plugins install @zowe/<plugin-name>
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

## Install Zowe CLI from a download
**Follow these steps:**

1. Navigate to [Zowe Downloads](https://www.zowe.org/download.html) and click the **Zowe vNext CLI Core** button.
   
2. Read the End User License Agreement for Zowe and click **I agree** to download the core package.

    `zowe-cli-package-next-2021MMDD.zip` is downloaded to your computer (where MMDD indicates the month and day of the build).

3. **(Optional)** Navigate to [Zowe Downloads](https://www.zowe.org/download.html) and click the **Zowe vNext CLI Plugins** button to download the plugins.

4. **(Optional)** Read the End User License Agreement for Zowe plugins and click **I agree** to download the plugins package.

    `zowe-cli-plugins-next-2021MMDD.zip` is downloaded to your computer (where MMDD indicates the month and day of the build).

5. Unzip the contents of `zowe-cli-package-next-2021MMDD.zip` (and optionally `zowe-cli-plugins-2021MMDD.zip`) to a working directory.

6. Open a command-line window and issue the following commands to the working directory:

   ```
   npm install -g zowe-cli.tgz
   ```
   **Note:** If an `EACCESS` error is returned, refer to [Resolving EACCESS permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) in the npm documentation.

   **(Optional)**
   ```
   zowe plugins install zowe plugins install cics-for-zowe-cli.tgz db2-for-zowe-cli.tgz zos-ftp-for-zowe-cli.tgz  ims-for-zowe-cli.tgz mq-for-zowe-cli.tgz
   ```

7. **(Optional)** To use [daemon mode](cli-using-daemon-mode.md), unzip the zowex .tgz file and place the zowex (or zowex.exe) file into a directory which occurs on your PATH earlier than the directory containing the NodeJS zowe command.

9. If you have the Secure Credential Store plug-in installed, uninstall it now to avoid unexpected behavior:

   ```
   zowe plugins uninstall @zowe/secure-credential-store-for-zowe-cli
   ```

   **Note:** If you have a previous instance of Zowe CLI installed, your current configuration files are ignored if zowe.config.json is found globally, at the project level, or up the directory structure.

10. Save the contents of the `/profiles` directory to another location on your computer so that you can reference or restore the profiles later.

     **Important!** Prior to deleting the contents of the `/profiles` directory, take note of any mainframe service details that you need.

11. Delete the following files from your local `.zowe/` directory:
   - `.zowe/settings/imperative.json`
   - `.zowe/profiles`

You can now try out the [technical preview features](cli-development-roadmap-next.md).
