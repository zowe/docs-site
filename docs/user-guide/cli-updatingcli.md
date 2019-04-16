# Updating Zowe CLI

Zowe CLI is updated continuously. You can update Zowe CLI to the latest version using online registry method or the local package method. However, you can only update Zowe CLI using the method that you used to install Zowe CLI.

## (Optional) Identify the currently installed version of Zowe CLI

Issue the following command to identify the version of Zowe CLI that is currently installed on your computer:
```
zowe -V 
```

## Update Zowe CLI from the online registry

You can update Zowe CLI to the latest version from the online registry on Windows, Mac, and Linux computers.

**Note:** The following steps assume that you set the `npm` registries for the `@zowe` and `@brightside` scopes as described in [Installing Zowe CLI from an online registry](cli-installcli.md#installing-zowe-cli-from-an-online-registry).

**Follow these steps:**

1. Issue the following command to update Zowe CLI to the latest version:
   ```
   npm install -g @zowe/cli
   ```
2. Reinstall the plug-ins, and update existing plug-ins, using the following command:
   ```
   bright plugins install @zowe/db2 @zowe/cics
   ```
3. Recreate any user profiles that you created before you updated to the latest version of Zowe CLI.

## Update Zowe CLI from a local package

If you want to update Zowe CLI from an offline (`.tgz`), local package, uninstall your current package then reinstall from a new package using the Install CA Brightside from a Local Package instructions. For more information, see [Uninstalling Zowe CLI from the desktop](uninstall.md#uninstalling-zowe-cli-from-the-desktop) and [Installing Zowe CLI from a local package](cli-installcli.md#installing-zowe-cli-from-a-local-package).

**Note:** Recreate any user profiles that you created before you updated to the latest version of Zowe CLI.