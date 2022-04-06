# Updating Zowe CLI

Zowe&trade; CLI is updated continuously. You can update Zowe CLI to a more recent version using online registry method or the local package method. However, you can only update Zowe CLI using the method that you used to install Zowe CLI.

## Updating to the Zowe CLI V2 Long-term Support (v2-lts) version

If you are running Zowe CLI version v1.8.x to v1.27.x, you can update to `@zowe-v2-lts` (LTS version) to leverage new CLI functionality and plug-ins.

1. Install Zowe CLI. Open a command line window and issue the following command:

   ```
   npm install -g @zowe/cli@zowe-v2-lts
   ```
2. Install Zowe CLI plug-ins. Issue the following command:

   ```
   zowe plugins install @zowe/cics-for-zowe-cli@zowe-v2-lts @zowe/db2-for-zowe-cli@zowe-v2-lts @zowe/ims-for-zowe-cli@zowe-v2-lts @zowe/mq-for-zowe-cli@zowe-v2-lts @zowe/zos-ftp-for-zowe-cli@zowe-v2-lts
   ```
3. (Optional) Migrate your Zowe CLI profiles from your current installation to your V2 installation. Issue the following command:

   ```
   zowe config convert-profiles
   ```

   **Note:** Profile data is backed up in case you want to revert the profiles to your previous Zowe CLI installation.

4. (Optional) If you no longer require the profiles for your previous Zowe CLI installation, you can delete them. Issue the following command:

   ```
   zowe config convert-profiles --delete
   ```

   _Important:_ We do not recommend deleting the profiles for your previous Zowe CLI installation until you have tested your V2 installation and are satisfied with its performance.

You updated to the Zowe CLI V2-LTS version!

Ensure that you review the [Release Notes](../getting-started/summaryofchanges.md), which describes **Notable Changes** in this version. We recommend issuing familiar commands and running scripts to ensure that your profiles/scripts are compatible. You might need to take corrective action to address the breaking changes.

## Identify the currently installed version of Zowe CLI

Issue the following command (case-sensitive):

```
zowe -V
```

## Identify the currently installed versions of Zowe CLI plug-ins

Issue the following command:

```
zowe plugins list
```

## Update Zowe CLI from the online registry

You can update Zowe CLI to the latest version from the online registry on Windows, Mac, and Linux computers.

**Note:** The following steps assume that you previously installed the CLI as described in [Installing Zowe CLI from an online registry](cli-installcli.md#installing-zowe-cli-from-an-online-registry).

1. To update Zowe CLI to the most recent `@zowe-v2-lts` version, issue the following command:

   ```
   npm install -g @zowe/cli@zowe-v2-lts
   ```

2. To update existing plug-ins and install new plug-ins, issue the following command:

   ```
   zowe plugins install @zowe/cics-for-zowe-cli@zowe-v2-lts @zowe/db2-for-zowe-cli@zowe-v2-lts @zowe/ims-for-zowe-cli@zowe-v2-lts @zowe/mq-for-zowe-cli@zowe-v2-lts @zowe/zos-ftp-for-zowe-cli@zowe-v2-lts
   ```

3. Recreate any user profiles that you created before you updated to the latest version of Zowe CLI.

## Update or revert Zowe CLI to a specific version

Optionally, you can update Zowe CLI (or revert) to a known version. The following example illustrates the syntax to update Zowe CLI to version 7.0.0:

```
npm install -g @zowe/cli@7.0.0
```

## Update Zowe CLI from a local package

To update Zowe CLI from an offline (`.tgz`), local package, uninstall your current package then reinstall from a new package using the Install from a Local package instructions. For more information, see [Uninstalling Zowe CLI from the desktop](cli-uninstall.md) and [Installing Zowe CLI from a local package](cli-installcli.md#installing-zowe-cli-from-a-local-package).

**Important!** Recreate any user profiles that you created before the update.