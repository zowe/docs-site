# Updating Zowe CLI <!-- omit in toc -->

Zowe&trade; CLI is updated continuously. You can update Zowe CLI to a more recent version using online registry method or the local package method. However, you can only update Zowe CLI using the method that you used to install Zowe CLI.

- [Migrating to Long-term Support (LTS) version](#migrating-to-long-term-support-lts-version)
- [Identify the currently installed version of Zowe CLI](#identify-the-currently-installed-version-of-zowe-cli)
- [Identify the currently installed versions of Zowe CLI plug-ins](#identify-the-currently-installed-versions-of-zowe-cli-plug-ins)
- [Update Zowe CLI from the online registry](#update-zowe-cli-from-the-online-registry)
- [Update or revert Zowe CLI to a specific version](#update-or-revert-zowe-cli-to-a-specific-version)
- [Update Zowe CLI from a local package](#update-zowe-cli-from-a-local-package)

## Migrating to Long-term Support (LTS) version

If you have an `@lts-incremental` version of Zowe CLI (Zowe v1.0.x - v1.8.x), you can update to `@zowe-v1-lts` (LTS version) to leverage new functionality and plug-ins.

**Follow these steps:**

1. Perform *one* of the following steps:

   **a.** Delete the `~/.zowe/profiles` directory from your computer. You can recreate the profiles manually after you update the CLI.

   **b.** If you want to preserve your existing profiles, copy the contents of `~/.zowe/profiles` or `%homepath%\.zowe\profiles` to another directory on your computer.

2. Delete the `~/.zowe/plugins` or `%homepath%\.zowe\plugins` directory to uninstall all plug-ins.

3. Issue the following command to uninstall the pre-LTS version of core CLI

    ```
    npm uninstall -g @brightside/core
    ```

    **Note:** You might receive an `ENOENT` error when issuing this command if you installed Zowe CLI from a local package (.tgz) and the package was moved from its original location. In the event    that you receive the error, open an issue in the   Zowe CLI GitHub repository.

4. Install the most recent `@zowe-v1-lts` version CLI and optional plug-ins. For more information, see [Installing CLI](./cli-installcli.md).

5. **(Optional)** If you deleted your profiles in Step 1, recreate the profiles that you need manually.

6. **(Optional)** If you copied your profiles to a local directory in Step 1, follow these steps:

   **a.**  Move the profile configuration files that you saved in Step 1 back to the `~/.zowe/profiles` or `%homepath%\.zowe\profiles` folder on your computer.

   **b.** Issue the `zowe scs update` command to update profiles that are secured with the Secure Credential Store Plug-in.

   **c.** Issue the command `zowe profiles update zosmf <my-profile-name> --user <my-username> --password <my-password>` to update z/osmf profiles to use the current option names.

You updated to the Zowe CLI LTS version!

Ensure that you review the [Release Notes](../getting-started/summaryofchanges.md), which describes **Notable Changes** in this version. We recommend issuing familiar commands and running scripts to ensure that your profiles/scripts are compatible. You might need to take corrective action to address the breaking changes.

## Identify the currently installed version of Zowe CLI

Issue the following command:

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

**Follow these steps:**

1. To update Zowe CLI to the most recent `@zowe-v1-lts` version, issue the following command:

   ```
   npm install -g @zowe/cli@zowe-v1-lts
   ```

2. To update existing plug-ins and install new plug-ins, issue the following command:

   ```
   zowe plugins install @zowe/cics-for-zowe-cli@zowe-v1-lts @zowe/db2-for-zowe-cli@zowe-v1-lts @zowe/ims-for-zowe-cli@zowe-v1-lts @zowe/mq-for-zowe-cli@zowe-v1-lts @zowe/zos-ftp-for-zowe-cli@zowe-v1-lts @zowe/secure-credential-store-for-zowe-cli@zowe-v1-lts
   ```

3. Recreate any user profiles that you created before you updated to the latest version of Zowe CLI.

## Update or revert Zowe CLI to a specific version

Optionally, you can update Zowe CLI (or revert) to a known version. The following example illustrates the syntax to update Zowe CLI to version 6.1.2:

```
npm install -g @zowe/cli@6.1.2
```

## Update Zowe CLI from a local package

To update Zowe CLI from an offline (`.tgz`), local package, uninstall your current package then reinstall from a new package using the Install from a Local package instructions. For more information, see [Uninstalling Zowe CLI from the desktop](cli-uninstall.md) and [Installing Zowe CLI from a local package](cli-installcli.md#installing-zowe-cli-from-a-local-package).

**Important!** Recreate any user profiles that you created before the update.