# Updating Zowe CLI and Zowe CLI plug-ins

Zowe&trade; CLI is updated continuously. You can update Zowe CLI to a more recent version using either the online registry or the local package method.

:::info Required role: systems administrator
:::

You must update Zowe CLI using the method that you used to install Zowe CLI.

## Identifying the currently installed version of Zowe CLI and Zowe CLI plug-ins

For Zowe CLI core, open a command line window and issue the following command:

```
zowe --version
```

For Zowe CLI plug-ins, open a command line window and issue the following command:

```
zowe plugins list
```

## Updating to the Zowe CLI V3 Long-term Support (v3-lts) version

If you are running the Zowe CLI version included with Zowe release v2.0.0 to v2.15.x, you can update to `@zowe-v3-lts` (LTS version) to leverage the latest Zowe CLI and Zowe CLI plug-ins functionality.

### Updating from an npm online registry

1. To update and install Zowe CLI core, open a command line window and issue the following command:

   ```
   npm install -g @zowe/cli@zowe-v3-lts
   ```
2. To update and install all Zowe plug-ins, open a command line window and issue the following command:

   ```
   zowe plugins install @zowe/cics-for-zowe-cli@zowe-v3-lts @zowe/db2-for-zowe-cli@zowe-v3-lts @zowe/zos-ftp-for-zowe-cli@zowe-v3-lts @zowe/mq-for-zowe-cli@zowe-v3-lts 
   ```
   To install a subset of the plug-ins, remove the syntax for the plug-in(s) that you do not want to update. For example:

   ```
   zowe plugins install @zowe/db2-for-zowe-cli@zowe-v3-lts @zowe/zos-ftp-for-zowe-cli@zowe-v3-lts
   ```

3. When updating from Zowe V1 to Zowe V3, migrate your Zowe CLI profiles from your current installation to your V3 installation:

   ```
   zowe config convert-profiles
   ```
   Profile data is backed up in case you want to revert the profiles to your previous Zowe CLI installation.

4. When updating from Zowe V1 to Zowe V3, if you no longer require the profiles for your previous Zowe CLI installation, you can delete them:

   ```
   zowe config convert-profiles --delete
   ```

   :::info Important
   
   We do not recommend deleting the profiles from your previous Zowe CLI installation until you have tested your V3 installation and are satisfied.

   :::

   You have successfully updated to the Zowe CLI V3-LTS version.

5. See [Next steps](#next-steps) for recommended tasks after installation.

### Updating from a local package

To update Zowe CLI core and Zowe CLI plug-ins from an offline (`.tgz`), local package, uninstall your current package then reinstall from a new package.

1. To uninstall Zowe CLI and Zowe CLI plug-ins, follow the instructions in [Uninstalling Zowe CLI and Zowe CLI Plug-ins](../user-guide/cli-uninstall.md).

2. To install a new package for Zowe CLI and Zowe CLI plug-ins, follow the instructions in [Installing Zowe CLI and Zowe CLI plug-ins from a local package](../user-guide/cli-installcli.md#installing-zowe-cli-and-zowe-cli-plug-ins-from-a-local-package).

3. See [Next steps](#next-steps) for recommended tasks after installation.

## Updating or reverting Zowe CLI and Zowe CLI plug-ins to a specific version

If necessary, you can update or revert Zowe CLI to a known, previously released version.

### Updating or reverting from an npm online registry

1. To update or revert Zowe CLI and Zowe CLI plug-ins to a specific known version, open a command line window and issue the following command:

   ```
   npm install -g @zowe/cli@<X.Y.Z>
   ```

      - `<X.Y.Z>`

      Specifies release number that Zowe CLI or Zowe CLI plug-ins are to be updated or reverted to. For example, `npm install -g @zowe/cli@8.0.0`.

2. See [Next steps](#next-steps) for recommended tasks after installation.

### Updating or reverting from a local package

1. Uninstall Zowe CLI and Zowe CLI plug-ins. Follow the instructions in [Uninstalling Zowe CLI and Zowe CLI Plug-ins](../user-guide/cli-uninstall.md).

2. Navigate to [Download Zowe](https://www.zowe.org/download.html). Select the specific release you want to update or revert to from **All Zowe V2.x Releases** or **All Zowe V3.x Releases**.

   The End User License Agreement for Zowe displays.

3. Read the End User License Agreement for Zowe and click **I agree** to download the core package.

    `zowe-cli-package-next-<X.Y.Z>.zip` is downloaded to your computer (where `<X.Y.Z>` indicates the year, month, and day of the build).

4. If updating or reverting Zowe CLI plug-ins, navigate to [Download Zowe](https://www.zowe.org/download.html) and click the **Zowe \<X.Y.Z\> CLI Plugins** button (where \<X.Y.Z\> specifies the release number).

5. If updating or reverting Zowe CLI plug-ins, read the End User License Agreement for Zowe and click **I agree** to download the plug-ins package.

    `zowe-cli-plugins-next-<X.Y.Z>.zip` is downloaded to your computer.

6. Unzip the contents of `zowe-cli-package-<X.Y.Z>.zip` (and `zowe-cli-plugins-<X.Y.Z>.zip`, if downloaded) to a working directory.

7. To install Zowe CLI core, open a command-line window and issue the following command to the working directory that was used the previous step:

   ```
   npm install -g zowe-cli.tgz
   ```

   :::note
   
   If an `EACCESS` error displays, see [Resolving EACCESS permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) in npm Docs.

   :::

8. To update or revert all available Zowe CLI plug-ins, issue the following command to the working directory that was used in Step 6:

   ```
   zowe plugins install cics-for-zowe-cli.tgz db2-for-zowe-cli.tgz zos-ftp-for-zowe-cli.tgz mq-for-zowe-cli.tgz
   ```

   Zowe CLI and the optional plug-ins are installed on your computer.

   To update or revert a subset of the plug-ins, remove the syntax for the plug-in(s) that you do not want to update. For example:

   ```
   zowe plugins install db2-for-zowe-cli.tgz mq-for-zowe-cli.tgz
   ```

9. See [Next steps](#next-steps) for recommended tasks after installation.

## Next steps

Review the [release notes](../whats-new/release-notes/release-notes-overview.md) for the notable changes in the newly installed version.

Issue familiar commands and run scripts to ensure that your profiles/scripts are compatible. Take corrective action to address any breaking changes.
